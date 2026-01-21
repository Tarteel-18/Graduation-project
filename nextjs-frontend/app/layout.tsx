import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "الهيئة العامة لتنمية المشاريع الصغيرة والأصغر",
  description: "الهيئة العامة لتنمية المشاريع الصغيرة والأصغر",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = sessionStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#F6F9F9] dark:bg-[#020617] text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
