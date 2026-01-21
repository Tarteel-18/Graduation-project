#!/usr/bin/env python3
"""Comprehensive test suite for the chatbot."""
import time
import json
import requests
from typing import Dict, List
from datetime import datetime

API_BASE_URL = "http://localhost:8001"

# Test questions - different formulations, not copy-paste from FAQ
TEST_QUESTIONS = [
    # Category: About the Authority (different formulations)
    {"question": "ماذا تفعل هذه الهيئة بالضبط؟", "category": "about", "expected_topic": "services", "in_scope": True},
    {"question": "ما هي مهمة الهيئة العامة لتنمية المشاريع؟", "category": "about", "expected_topic": "objectives", "in_scope": True},
    {"question": "أريد معرفة أهداف هذه المؤسسة", "category": "about", "expected_topic": "objectives", "in_scope": True},
    {"question": "من يستطيع الحصول على مساعدة منكم؟", "category": "about", "expected_topic": "beneficiaries", "in_scope": True},
    {"question": "أين مكتبكم الرئيسي؟", "category": "about", "expected_topic": "location", "in_scope": True},
    
    # Category: Funding (different formulations)
    {"question": "كم أكبر مبلغ يمكن أن أحصل عليه كتمويل؟", "category": "funding", "expected_topic": "max_funding", "in_scope": True},
    {"question": "ما أصغر قرض متاح؟", "category": "funding", "expected_topic": "min_funding", "in_scope": True},
    {"question": "هل تفرضون فوائد على القروض؟", "category": "funding", "expected_topic": "interest", "in_scope": True},
    {"question": "كم المدة المسموحة لسداد القرض؟", "category": "funding", "expected_topic": "repayment", "in_scope": True},
    {"question": "هل يمكنني الحصول على تمويل بدون ضمانات؟", "category": "funding", "expected_topic": "guarantees", "in_scope": True},
    
    # Category: Training (different formulations)
    {"question": "ما أنواع التدريبات المتوفرة؟", "category": "training", "expected_topic": "training_types", "in_scope": True},
    {"question": "هل التدريب بدون مقابل؟", "category": "training", "expected_topic": "training_free", "in_scope": True},
    {"question": "كم تستغرق الدورات التدريبية؟", "category": "training", "expected_topic": "training_duration", "in_scope": True},
    {"question": "هل تحصل على شهادة بعد التدريب؟", "category": "training", "expected_topic": "certificates", "in_scope": True},
    {"question": "هل لديكم برامج تدريب خاصة بالنساء؟", "category": "training", "expected_topic": "women_training", "in_scope": True},
    
    # Category: Projects (different formulations)
    {"question": "هل تساعدون في بدء مشروع جديد من الصفر؟", "category": "projects", "expected_topic": "new_projects", "in_scope": True},
    {"question": "هل تدعمون المشاريع الزراعية؟", "category": "projects", "expected_topic": "agricultural", "in_scope": True},
    {"question": "هل يمكن للأسر المحتاجة الاستفادة من خدماتكم؟", "category": "projects", "expected_topic": "poor_families", "in_scope": True},
    {"question": "هل تدعمون المشاريع المنزلية؟", "category": "projects", "expected_topic": "home_projects", "in_scope": True},
    {"question": "هل يمكنني تسجيل مشروعي القائم حالياً؟", "category": "projects", "expected_topic": "existing_projects", "in_scope": True},
    
    # Category: Consultations (different formulations)
    {"question": "ما أنواع الاستشارات التي تقدمونها؟", "category": "consultations", "expected_topic": "consultation_types", "in_scope": True},
    {"question": "هل الاستشارات مجانية؟", "category": "consultations", "expected_topic": "consultation_free", "in_scope": True},
    {"question": "هل تساعدون في التسويق للمشاريع؟", "category": "consultations", "expected_topic": "marketing", "in_scope": True},
    
    # Category: Registration (different formulations)
    {"question": "كيف أقدم طلب للحصول على قرض؟", "category": "registration", "expected_topic": "loan_application", "in_scope": True},
    {"question": "هل التسجيل يكلف مالاً؟", "category": "registration", "expected_topic": "registration_fee", "in_scope": True},
    {"question": "كم يستغرق الرد على طلبي؟", "category": "registration", "expected_topic": "response_time", "in_scope": True},
    
    # Category: Coverage (different formulations)
    {"question": "هل توجد فروع في محافظة الحديدة؟", "category": "coverage", "expected_topic": "hodeidah_branch", "in_scope": True},
    {"question": "هل يمكن التقديم من محافظة تعز؟", "category": "coverage", "expected_topic": "taiz_coverage", "in_scope": True},
    
    # Out-of-scope questions (should say "I don't know")
    {"question": "ما هي عاصمة باريس؟", "category": "out_of_scope", "expected_topic": None, "in_scope": False},
    {"question": "ما هو الطقس اليوم؟", "category": "out_of_scope", "expected_topic": None, "in_scope": False},
    {"question": "كيف أطبخ الكبسة؟", "category": "out_of_scope", "expected_topic": None, "in_scope": False},
]


def test_question(question_data: Dict) -> Dict:
    """Test a single question and return results."""
    question = question_data["question"]
    start_time = time.time()
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/api/chat",
            json={"message": question},
            timeout=30
        )
        elapsed_time = time.time() - start_time
        
        if response.status_code == 200:
            data = response.json()
            return {
                "question": question,
                "category": question_data["category"],
                "in_scope": question_data["in_scope"],
                "response": data.get("response", ""),
                "response_time": round(elapsed_time, 2),
                "num_sources": data.get("num_sources", 0),
                "sources": data.get("sources", []),
                "status": "success",
                "error": None
            }
        else:
            return {
                "question": question,
                "category": question_data["category"],
                "in_scope": question_data["in_scope"],
                "response": "",
                "response_time": round(elapsed_time, 2),
                "num_sources": 0,
                "sources": [],
                "status": "error",
                "error": f"HTTP {response.status_code}"
            }
    except Exception as e:
        elapsed_time = time.time() - start_time
        return {
            "question": question,
            "category": question_data["category"],
            "in_scope": question_data["in_scope"],
            "response": "",
            "response_time": round(elapsed_time, 2),
            "num_sources": 0,
            "sources": [],
            "status": "error",
            "error": str(e)
        }


def evaluate_accuracy(result: Dict, question_data: Dict) -> str:
    """Evaluate if the response is accurate."""
    if result["status"] != "success":
        return "error"
    
    response = result["response"].lower()
    
    # For out-of-scope questions, should say "don't know"
    if not question_data["in_scope"]:
        dont_know_phrases = ["لم أجد", "لا أعرف", "لا أعلم", "غير متوفر", "لا يوجد"]
        if any(phrase in response for phrase in dont_know_phrases):
            return "correct"
        else:
            return "hallucination"
    
    # For in-scope questions, check if response is not empty and not an error
    if not response or "خطأ" in response or "error" in response.lower():
        return "error"
    
    # Check if response seems relevant (not hallucination)
    if len(response) < 10:
        return "too_short"
    
    # If we got sources, it's likely accurate
    if result["num_sources"] > 0:
        return "likely_accurate"
    
    return "uncertain"


def run_tests():
    """Run all tests and generate report."""
    print("=" * 80)
    print("CHATBOT COMPREHENSIVE TEST SUITE")
    print("=" * 80)
    print(f"Testing {len(TEST_QUESTIONS)} questions...")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    results = []
    total_time = 0
    
    for i, question_data in enumerate(TEST_QUESTIONS, 1):
        print(f"[{i}/{len(TEST_QUESTIONS)}] Testing: {question_data['question']}")
        result = test_question(question_data)
        result["accuracy"] = evaluate_accuracy(result, question_data)
        results.append(result)
        total_time += result["response_time"]
        
        # Print result summary
        status_icon = "✓" if result["status"] == "success" else "✗"
        accuracy_icon = "✓" if result["accuracy"] in ["correct", "likely_accurate"] else "?"
        print(f"  {status_icon} Time: {result['response_time']}s | Sources: {result['num_sources']} | Accuracy: {accuracy_icon} {result['accuracy']}")
        if result["response"]:
            preview = result["response"][:60] + "..." if len(result["response"]) > 60 else result["response"]
            print(f"  Response: {preview}")
        print()
    
    # Generate summary report
    print("=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    
    successful = sum(1 for r in results if r["status"] == "success")
    errors = len(results) - successful
    
    in_scope_results = [r for r in results if r["in_scope"]]
    out_of_scope_results = [r for r in results if not r["in_scope"]]
    
    correct_out_of_scope = sum(1 for r in out_of_scope_results if r["accuracy"] == "correct")
    hallucinations = sum(1 for r in out_of_scope_results if r["accuracy"] == "hallucination")
    
    avg_time = total_time / len(results) if results else 0
    avg_sources = sum(r["num_sources"] for r in results) / len(results) if results else 0
    
    print(f"Total Questions: {len(results)}")
    print(f"Successful: {successful} ({successful/len(results)*100:.1f}%)")
    print(f"Errors: {errors} ({errors/len(results)*100:.1f}%)")
    print(f"\nAverage Response Time: {avg_time:.2f}s")
    print(f"Average Sources Retrieved: {avg_sources:.2f}")
    print(f"\nIn-Scope Questions: {len(in_scope_results)}")
    print(f"Out-of-Scope Questions: {len(out_of_scope_results)}")
    print(f"  - Correctly rejected: {correct_out_of_scope}/{len(out_of_scope_results)}")
    print(f"  - Hallucinations: {hallucinations}/{len(out_of_scope_results)}")
    
    # Category breakdown
    print(f"\nBy Category:")
    categories = {}
    for r in results:
        cat = r["category"]
        if cat not in categories:
            categories[cat] = {"total": 0, "success": 0, "avg_time": 0}
        categories[cat]["total"] += 1
        if r["status"] == "success":
            categories[cat]["success"] += 1
        categories[cat]["avg_time"] += r["response_time"]
    
    for cat, stats in categories.items():
        avg = stats["avg_time"] / stats["total"]
        print(f"  {cat}: {stats['success']}/{stats['total']} success, avg {avg:.2f}s")
    
    # Save detailed results to JSON
    report_file = f"test_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump({
            "summary": {
                "total_questions": len(results),
                "successful": successful,
                "errors": errors,
                "avg_response_time": round(avg_time, 2),
                "avg_sources": round(avg_sources, 2),
                "correct_out_of_scope": correct_out_of_scope,
                "hallucinations": hallucinations
            },
            "results": results
        }, f, ensure_ascii=False, indent=2)
    
    print(f"\nDetailed results saved to: {report_file}")
    print("=" * 80)


if __name__ == "__main__":
    run_tests()

