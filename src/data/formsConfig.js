// src/data/formsConfig.js

export const formsConfig = {
// 1) 🔹 فورم روج مشروعك
"promote-project": {
  slug: "promote-project",
  title: "استمارة تسجيل خدمة روج لمشروعك لدى الهيئة العامة لتنمية المشاريع الصغيرة والأصغر",
  description: "يمكنك التسجيل في قائمة الراغبين في هذه الخدمة",
  fields: [
    {
      name: "projectName",
      type: "text",
      label: "اسم المشروع",
      placeholder: "اكتب اسم المشروع",
      required: true,
    },
    {
      name: "projectDescription",
      type: "textarea",
      label: "وصف المشروع",
      placeholder: "اكتب وصفاً مختصراً عن مشروعك ومنتجاتك",
      required: true,
    },
    {
      name: "price",
      type: "text",
      label: "سعر المنتج (اختياري)",
      placeholder: "أدخل السعر التقريبي إن رغبت",
      required: false, // اختياري
    },
    {
      name: "files",
      type: "file",
      label: "يرجى إرفاق صور لمنتجاتك (حتى 3 صور)",
      description: "يمكنك رفع حتى 3 ملفات — صور فقط — الحد الأقصى 10MB للملف الواحد",
      maxFiles: 3,          // تحتاج تستخدمها في BaseFileUpload لو حبيت تطبّق الحد
      accept: '.jpg,.jpeg,.png',
    },
  ],
},

  // -----------------------------
    // أولاً: بيانات صاحب المشروع
    // -----------------------------
    {
      name: "ownerFullName",
      type: "text",
      label: "الاسم الرباعي",
      placeholder: "اكتب الاسم الرباعي",
      required: true,
    },
    {
      name: "governorate",
      type: "text",
      label: "المحافظة",
      placeholder: "اكتب اسم المحافظة",
      required: true,
    },
    {
      name: "district",
      type: "text",
      label: "المديرية",
      placeholder: "اكتب اسم المديرية",
      required: true,
    },
    {
      name: "neighborhood",
      type: "text",
      label: "الحي",
      placeholder: "اكتب اسم الحي",
      required: true,
    },
    {
      name: "street",
      type: "text",
      label: "الشارع",
      placeholder: "اكتب اسم الشارع",
      required: true,
    },
    {
      name: "age",
      type: "text",
      label: "العمر",
      placeholder: "اكتب عمرك",
      required: true,
    },
    {
      name: "primaryPhone",
      type: "tel",
      label: "رقم التواصل الأول",
      placeholder: "أدخل رقم الهاتف الأساسي",
      required: true,
    },
    {
      name: "secondaryPhone",
      type: "tel",
      label: "رقم التواصل الثاني أو رقم أقرب شخص",
      placeholder: "أدخل رقم تواصل آخر",
      required: false,
    },
    {
      name: "email",
      type: "email",
      label: "البريد الإلكتروني",
      placeholder: "example@mail.com",
      required: false,
    },
    {
      name: "educationPlace",
      type: "text",
      label: "المؤسسة التعليمية (جامعة / معهد / مدرسة)",
      placeholder: "اكتب اسم الجامعة أو المعهد أو المدرسة",
      required: false,
    },
    {
      name: "educationMajor",
      type: "text",
      label: "التخصص",
      placeholder: "اكتب التخصص",
      required: false,
    },
    {
      name: "graduationYear",
      type: "text",
      label: "سنة التخرج",
      placeholder: "اكتب سنة التخرج",
      required: false,
    },

    // -----------------------------
    // ثانياً: بيانات المشروع
    // -----------------------------
    {
      name: "projectName",
      type: "text",
      label: "اسم المشروع",
      placeholder: "اكتب اسم المشروع",
      required: true,
    },
    {
      name: "projectStatus",
      type: "radio",
      label: "حالة المشروع",
      options: ["قيد الفكرة", "قيد التنفيذ", "قائم"],
      required: true,
    },
    {
      name: "capital",
      type: "text",
      label: "رأس المال",
      placeholder: "أدخل رأس مال المشروع",
      required: true,
    },
    {
      name: "workersCount",
      type: "text",
      label: "عدد العمال",
      placeholder: "أدخل عدد العمال",
      required: true,
    },
    {
      name: "startDate",
      type: "text",
      label: "تاريخ بدء المشروع",
      placeholder: "مثال: 2020-01-01 أو سنة البدء",
      required: true,
    },
    {
      name: "products",
      type: "textarea",
      label: "ما الذي ينتجه مشروعك؟",
      placeholder: "اذكر المنتجات أو الخدمات التي يقدمها المشروع",
      required: true,
    },
    {
      name: "projectDescription",
      type: "textarea",
      label: "أوصف مشروعك بإختصار",
      placeholder: "اكتب وصفًا مختصرًا عن فكرة المشروع ونشاطه",
      required: true,
    },
    {
      name: "idCardImage",
      type: "file",
      label: "أرسل صورة البطاقة الشخصية",
      description: "قم برفع صورة واضحة للبطاقة الشخصية",
      required: true,
    },
  ],
},

  // ======================================================
  // 3) 🔹 فورم انضم لبرنامج التدريب
  // ======================================================
  "training-program": {
    slug: "training-program",
    title: "استمارة طلب الالتحاق ببرنامج تدريبي",
    description: "يرجى تعبئة البيانات التالية للتسجيل",
    fields: [
      { name: "fullName", type: "text", label: "الاسم الكامل", required: true },
      { name: "phone", type: "tel", label: "رقم الهاتف", required: true },
      { name: "city", type: "text", label: "مكان الإقامة", required: true },
      { name: "age", type: "number", label: "العمر", required: true },
      { name: "reason", type: "textarea", label: "سبب الرغبة في الالتحاق", required: false },
    ],
  },

  // ======================================================
  // 4) 🔹 فورم طلب الانضمام للتطوع
  // ======================================================
  "volunteer-program": {
    slug: "volunteer-program",
    title: "استمارة طلب الانضمام لبرنامج التطوع",
    description: "",
    fields: [
      { name: "fullName", type: "text", label: "الاسم الكامل", required: true },
      { name: "phone", type: "tel", label: "رقم الهاتف", required: true },
      { name: "city", type: "text", label: "مكان الإقامة", required: true },
      { name: "age", type: "number", label: "العمر", required: true },
      { name: "favField", type: "text", label: "مجال التطوع المفضل", required: true },
      {
        name: "summary",
        type: "textarea",
        label: "نبذة مختصرة عن الخبرة",
      },
    ],
  },

  // ======================================================
  // 5) 🔹 فورم خدمة التدريب (مخصص للخدمة فقط)
  // ======================================================
  "training-service": {
    slug: "training-service",
    title: "استمارة طلب خدمة التدريب لدى الهيئة العامة لتنمية المشاريع الصغيرة والأصغر",
    description: "يمكنك التسجيل في قائمة الراغبين في هذه الخدمة.",
    fields: [
      { name: "fullName", type: "text", label: "الاسم الكامل", required: true },
      { name: "phone", type: "tel", label: "رقم الهاتف", required: true },
      { name: "city", type: "text", label: "مكان الإقامة", required: true },
      { name: "age", type: "number", label: "العمر", required: true },
      {
        name: "trainingFields",
        type: "checkbox",
        label: "مجالات التدريب التي ترغب في الانضمام لها",
        options: [
          "تصنيع غذائي",
          "خياطة",
          "حرف",
          "ريادة أعمال",
          "تدريب مهني ومعرفي لأصحاب المشاريع الصغيرة",
        ],
        required: true,
      },
      {
        name: "reason",
        type: "textarea",
        label: "سبب رغبتك في التدريب",
        placeholder: "اكتب سبب رغبتك في الالتحاق بالتدريب...",
      },
    ],
  },

  // ======================================================
  // 6) 🔹 استمارة خدمة طلب مذكرة المواصفات والمقاييس
  // ======================================================
  "specs-memo-request": {
    slug: "specs-memo-request",
    title: "استمارة تسجيل خدمة طلب مذكرة المواصفات والمقاييس",
    description:
      "نحن هنا لدعمك والإجابة على استفساراتك حول المشاريع الصغيرة والأصغر. بملء هذه الاستمارة يمكنك طلب مذكرة المواصفات والمقاييس لمشروعك.",
    fields: [
      {
        name: "projectType",
        type: "radio",
        label: "نوع المشروع:",
        options: ["صغير", "متناهي الصغر", "مشروع صغير قيد التأسيس"],
        required: true,
      },
      {
        name: "projectName",
        type: "text",
        label: "اسم المشروع:",
        placeholder: "اكتب اسم المشروع",
        required: true,
      },
      {
        name: "projectStatus",
        type: "radio",
        label: "حالة المشروع:",
        options: ["نشط", "غير نشط"],
        required: true,
      },
      {
        name: "startDate",
        type: "text",
        label: "تاريخ بدء المشروع:",
        placeholder: "مثال: 2022-01-01",
        required: true,
      },
      {
        name: "capital",
        type: "text",
        label: "رأس مال المشروع:",
        placeholder: "أدخل رأس المال بالتقريب",
        required: true,
      },
      {
        name: "location",
        type: "text",
        label: "مكان المشروع:",
        placeholder: "اسم المدينة / المنطقة",
        required: true,
      },
      {
        name: "ownerName",
        type: "text",
        label: "اسم صاحب المشروع الثلاثي:",
        placeholder: "اكتب الاسم الثلاثي",
        required: true,
      },
      {
        name: "gender",
        type: "radio",
        label: "الجنس:",
        options: ["ذكر", "أنثى"],
        required: true,
      },
      {
        name: "birthDate",
        type: "text",
        label: "تاريخ الميلاد:",
        placeholder: "مثال: 1995-05-10",
        required: true,
      },
      {
        name: "educationLevel",
        type: "radio",
        label: "المؤهل التعليمي:",
        options: ["مدرسة", "جامعة", "معهد"],
        required: true,
      },
      {
        name: "qualification",
        type: "text",
        label: "المؤهل:",
        placeholder: "اكتب تخصصك أو مؤهلك",
        required: false,
      },
      {
        name: "graduationYear",
        type: "text",
        label: "سنة التخرج:",
        placeholder: "مثال: 2018",
        required: false,
      },
      {
        name: "currentAddress",
        type: "text",
        label: "عنوان الإقامة الحالية:",
        placeholder: "اكتب عنوانك الحالي",
        required: true,
      },
      {
        name: "phone",
        type: "tel",
        label: "رقم الهاتف:",
        placeholder: "أدخل رقم هاتفك",
        required: true,
      },
      {
        name: "relativePhone",
        type: "tel",
        label: "رقم أقرب شخص:",
        placeholder: "أدخل رقم هاتف أحد الأقارب للتواصل عند الحاجة",
        required: false,
      },
    ],
  },

  // 7) 🔹 فورم إعلان التدريب
  "training-ad": {
    slug: "training-ad",
    title: "استمارة إعلان برنامج التدريب",
    description: "يرجى تعبئة البيانات التالية للتسجيل في برنامج التدريب.",
    fields: [
      { name: "fullName", type: "text", label: "الاسم الكامل", placeholder: "اكتب اسمك الكامل", required: true },
      { name: "phone", type: "tel", label: "رقم الهاتف", placeholder: "أدخل رقم الهاتف", required: true },
      { name: "city", type: "text", label: "مكان الإقامة", placeholder: "اكتب المدينة / المنطقة", required: true },
      { name: "age", type: "number", label: "العمر", placeholder: "اكتب عمرك", required: true },
      {
        name: "reason",
        type: "textarea",
        label: "سبب الرغبة في الالتحاق بالبرنامج",
        placeholder: "اكتب سبب رغبتك في الالتحاق بالبرنامج...",
        required: false,
      },
    ],
  },

  // 8) 🔹 فورم فرصة التعاقد
  "contract-opportunity": {
    slug: "contract-opportunity",
    title: "استمارة التقديم على فرصة التعاقد",
    description: "يرجى تعبئة البيانات التالية وإرفاق السيرة الذاتية للتقديم على فرصة التعاقد.",
    fields: [
      { name: "fullName", type: "text", label: "الاسم الكامل", placeholder: "اكتب اسمك الثلاثي", required: true },
      { name: "phone", type: "tel", label: "رقم الهاتف", placeholder: "أدخل رقم هاتفك", required: true },
      { name: "email", type: "email", label: "البريد الإلكتروني", placeholder: "example@mail.com", required: true },
      { name: "specialization", type: "text", label: "التخصص", placeholder: "اكتب تخصصك", required: true },
      { name: "experienceYears", type: "number", label: "سنوات الخبرة", placeholder: "مثال: 5", required: true },
      {
        name: "field",
        type: "text",
        label: "مجال التعاقد المطلوب",
        placeholder: "اكتب المجال (تدريب، استشارات، تنفيذ برامج...)",
        required: true,
      },
      {
        name: "cvFile",
        type: "file",
        label: "رفع السيرة الذاتية",
        description: "يرجى إرفاق ملف السيرة الذاتية (PDF أو Word)، الحد الأقصى 10MB",
        required: true,
      },
      {
        name: "coverLetter",
        type: "textarea",
        label: "رسالة توضيحية عن الخبرة السابقة",
        placeholder: "اكتب نبذة عن خبراتك السابقة في المجال المستهدف...",
        required: false,
      },
      {
        name: "notes",
        type: "textarea",
        label: "ملاحظات إضافية",
        placeholder: "أي معلومات إضافية تود ذكرها...",
        required: false,
      },
    ],
  },
    // 9) 🔹 فورم نموذج تواصل
  "contact-form": {
    slug: "contact-form",
    title: "نموذج تواصل مع الهيئة",
    description: "املأ البيانات التالية ليتمكن فريق الهيئة من التواصل معك.",
    fields: [
      {
        name: "fullName",
        type: "text",
        label: "الاسم الكامل",
        placeholder: "اكتب اسمك الكامل",
        required: true,
      },
      {
        name: "phone",
        type: "tel",
        label: "رقم الهاتف",
        placeholder: "أدخل رقم هاتفك",
        required: true,
      },
      {
        name: "email",
        type: "email",
        label: "البريد الإلكتروني",
        placeholder: "example@mail.com",
        required: false,
      },
      {
        name: "subject",
        type: "text",
        label: "موضوع الرسالة",
        placeholder: "اكتب عنواناً قصيراً للرسالة",
        required: true,
      },
      {
        name: "message",
        type: "textarea",
        label: "نص الرسالة",
        placeholder: "اكتب رسالتك أو استفسارك هنا...",
        required: true,
      },
    ],
  },
}


