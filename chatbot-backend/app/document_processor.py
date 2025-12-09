"""Document processing utilities for FAQ documents."""
import logging
import re
from pathlib import Path
from typing import List, Dict, Tuple
import PyPDF2
from docx import Document

logger = logging.getLogger(__name__)


class DocumentProcessor:
    """Process documents (PDF, DOCX, TXT) into chunks."""
    
    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        """
        Initialize document processor.
        
        Args:
            chunk_size: Size of each chunk in characters
            chunk_overlap: Overlap between chunks in characters
        """
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
    
    def read_pdf(self, file_path: str) -> str:
        """
        Read text from PDF file.
        
        Args:
            file_path: Path to PDF file
            
        Returns:
            Extracted text
        """
        logger.info(f"Reading PDF: {file_path}")
        text = ""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
            logger.info(f"Extracted {len(text)} characters from PDF")
            return text
        except Exception as e:
            logger.error(f"Error reading PDF: {e}")
            raise
    
    def read_docx(self, file_path: str) -> str:
        """
        Read text from DOCX file.
        
        Args:
            file_path: Path to DOCX file
            
        Returns:
            Extracted text
        """
        logger.info(f"Reading DOCX: {file_path}")
        try:
            doc = Document(file_path)
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
            logger.info(f"Extracted {len(text)} characters from DOCX")
            return text
        except Exception as e:
            logger.error(f"Error reading DOCX: {e}")
            raise
    
    def read_txt(self, file_path: str) -> str:
        """
        Read text from TXT file.
        
        Args:
            file_path: Path to TXT file
            
        Returns:
            File contents
        """
        logger.info(f"Reading TXT: {file_path}")
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                text = file.read()
            logger.info(f"Extracted {len(text)} characters from TXT")
            return text
        except Exception as e:
            logger.error(f"Error reading TXT: {e}")
            raise
    
    def read_document(self, file_path: str) -> str:
        """
        Read document based on file extension.
        
        Args:
            file_path: Path to document
            
        Returns:
            Extracted text
        """
        path = Path(file_path)
        extension = path.suffix.lower()
        
        if extension == '.pdf':
            return self.read_pdf(file_path)
        elif extension == '.docx':
            return self.read_docx(file_path)
        elif extension == '.txt':
            return self.read_txt(file_path)
        else:
            raise ValueError(f"Unsupported file type: {extension}")
    
    def chunk_text(self, text: str) -> List[str]:
        """
        Split text into chunks with overlap.
        
        Args:
            text: Input text
            
        Returns:
            List of text chunks
        """
        if not text:
            return []
        
        chunks = []
        start = 0
        text_length = len(text)
        
        while start < text_length:
            # Calculate end position
            end = start + self.chunk_size
            
            # Extract chunk
            chunk = text[start:end]
            
            # Try to break at sentence or paragraph boundary
            if end < text_length:
                # Look for sentence endings
                for break_char in ['\n\n', '\n', '. ', '? ', '! ']:
                    last_break = chunk.rfind(break_char)
                    if last_break > self.chunk_size * 0.5:  # Don't break too early
                        chunk = chunk[:last_break + len(break_char)]
                        end = start + len(chunk)
                        break
            
            chunks.append(chunk.strip())
            
            # Move start position with overlap
            start = end - self.chunk_overlap
            if start >= text_length:
                break
        
        logger.info(f"Split text into {len(chunks)} chunks")
        return chunks
    
    def chunk_faq_document(self, text: str) -> Tuple[List[str], List[Dict]]:
        """
        Chunk FAQ document by Q&A pairs.
        Optimized for structured FAQ format with numbered questions.
        
        Args:
            text: FAQ document text
            
        Returns:
            Tuple of (chunks, metadatas) where each chunk is a Q&A pair
        """
        logger.info("Chunking FAQ document by Q&A pairs...")
        
        chunks = []
        metadatas = []
        current_section = "عام"
        current_section_num = 0
        
        # Split by sections (القسم الأول, القسم الثاني, etc.)
        # Pattern: "القسم" followed by Arabic ordinal + ":"
        section_pattern = r'القسم\s+[الأولالثانيالثالثالرابعالخامسالسادسالسابعالثامنتاسععاشر]+:\s*(.+?)(?=القسم\s+[الأولالثانيالثالثالرابعالخامسالسادسالسابعالثامنتاسععاشر]+:|$)'
        
        # Split by lines and process sequentially
        lines = text.split('\n')
        current_question = None
        current_answer = []
        question_num = None
        
        for i, line in enumerate(lines):
            line = line.strip()
            if not line:
                # Empty line - if we have a question, continue collecting answer
                # If answer is complete, we'll save it when we hit next question/section
                continue
            
            # Check if it's a section header
            if line.startswith('القسم'):
                # Save previous Q&A if exists
                if current_question and current_answer:
                    answer_text = ' '.join(current_answer).strip()
                    if answer_text:
                        qa_text = f"س: {current_question}\nج: {answer_text}"
                        chunks.append(qa_text)
                        metadatas.append({
                            "section": current_section,
                            "section_num": current_section_num,
                            "question_num": question_num
                        })
                
                # Extract section name
                section_match = re.match(r'القسم\s+[^:]+:\s*(.+)', line)
                if section_match:
                    current_section = section_match.group(1).strip()
                    current_section_num += 1
                    logger.info(f"Found section: {current_section}")
                
                current_question = None
                current_answer = []
                question_num = None
                continue
            
            # Check if it's a question (starts with number followed by period)
            question_match = re.match(r'^(\d+)\.\s*(.+)$', line)
            if question_match:
                # Save previous Q&A if exists
                if current_question and current_answer:
                    answer_text = ' '.join(current_answer).strip()
                    if answer_text:
                        qa_text = f"س: {current_question}\nج: {answer_text}"
                        chunks.append(qa_text)
                        metadatas.append({
                            "section": current_section,
                            "section_num": current_section_num,
                            "question_num": question_num
                        })
                
                # Start new Q&A
                question_num = int(question_match.group(1))
                current_question = question_match.group(2).strip()
                current_answer = []
                continue
            
            # If we have a current question, this line is part of the answer
            if current_question:
                current_answer.append(line)
        
        # Save last Q&A
        if current_question and current_answer:
            answer_text = ' '.join(current_answer).strip()
            if answer_text:
                qa_text = f"س: {current_question}\nج: {answer_text}"
                chunks.append(qa_text)
                metadatas.append({
                    "section": current_section,
                    "section_num": current_section_num,
                    "question_num": question_num
                })
        
        logger.info(f"Extracted {len(chunks)} Q&A pairs from FAQ document")
        return chunks, metadatas

