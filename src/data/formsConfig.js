// src/data/formsConfig.js

export const formsConfig = {
  // 1) 🔹 فورم روج مشروعك
  "promote-project": {
    slug: "promote-project",
    title:
      "استمارة تسجيل خدمة روج لمشروعك لدى الهيئة العامة لتنمية المشاريع الصغيرة والأصغر",
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
        required: false,
      },
      {
        name: "files",
        type: "file",
        label: "يرجى إرفاق صور لمنتجاتك (حتى 3 صور)",
        description:
          "يمكنك رفع حتى 3 ملفات — صور فقط — الحد الأقصى 10MB للملف الواحد",
        maxFiles: 3,
        accept: ".jpg,.jpeg,.png",
      },
    ],
  },

  // 2) 🔹 فورم طلب تسجيل مشروع صغير
  "small-project-register": {
    slug: "small-project-register",
    title: "طلب تسجيل مشروع صغير",
    description: "نرجو تعبئة البيانات التالية حول صاحب المشروع ومشروعه.",
    fields: [
      // ===== بيانات عن المشروع / الجهة =====
      {
        name: "projectType",
        type: "select",
        label: "نوع المشاريع",
        placeholder: "نوع المشاريع",
        options: [
          "صغيرة",
          "متناهية الصغر",
          "مشاريع صغيرة / أسر منتجة",
        ],
        required: false,
      },

     {
  name: "entity",
  type: "select",
  label: "الجهة",
  
  options: [
    "الهيئة العامة لتنمية المشاريع الصغيرة والأصغر",
    "وزارة الصناعة والتجارة",
    "الغرفة التجارية",
  ],
  required: false,
},


      // ===== حالة المشروع =====
      {
        name: "projectStatus",
        type: "select",
        label: "الحالة",
        placeholder: "الحالة",
        options: [], // Will be populated dynamically
        dynamicOptions: "project_status", // Indicates this field uses dynamic options
        required: false,
      },

      // ===== بيانات صاحب المشروع =====
      {
        name: "firstName",
        type: "text",
        label: "الاسم الأول *",
        placeholder: "الاسم الأول",
        required: true,
      },
      {
        name: "middleName",
        type: "text",
        label: "الاسم الأوسط",
        placeholder: "الاسم الأوسط",
        required: false,
      },
      {
        name: "lastName",
        type: "text",
        label: "اسم العائلة",
        placeholder: "اسم العائلة",
        required: false,
      },

      {
        name: "gender",
        type: "select",
        label: "جنس *",
        placeholder: "جنس",
        options: [], // Will be populated dynamically
        dynamicOptions: "gender", // Indicates this field uses dynamic options
        required: true,
      },
{
  name: "birthDate",
  type: "date",
  label: "تاريخ الميلاد *",
  placeholder: "تاريخ الميلاد",
  required: true,
},

{
  name: "workJoinDate",
  type: "date",
  label: "تاريخ الالتحاق بالعمل",
  placeholder: "تاريخ الالتحاق بالعمل",
  required: false,
},


      {
        name: "idNumber",
        type: "text",
        label: "رقم البطاقة",
        placeholder: "رقم البطاقة",
        required: false,
      },

      // ===== الاتصال في حالات الطوارئ =====
      {
        name: "emergencyContactName",
        type: "text",
        label: "الطوارئ اسم الاتصال",
        placeholder: "الطوارئ اسم الاتصال",
        required: false,
      },
      {
        name: "emergencyContactPhone",
        type: "tel",
        label: "هاتف حالات الطوارئ",
        placeholder: "هاتف حالات الطوارئ",
        required: false,
      },
      {
        name: "emergencyRelation",
        type: "text",
        label: "علاقة",
        placeholder: "علاقة",
        required: false,
      },

      // ===== Contact Details =====
      {
        name: "mobile",
        type: "tel",
        label: "التليفون المحمول",
        placeholder: "التليفون المحمول",
        required: true,
      },
      {
        name: "email",
        type: "email",
        label: "البريد الإلكتروني الشخصية",
        placeholder: "البريد الإلكتروني الشخصية",
        required: false,
      },
      {
        name: "familyInfo",
        type: "textarea",
        label: "معلومات عن العائلة",
        placeholder: "معلومات عن العائلة",
        required: false,
      },

      // ===== المؤهلات العلمية (جدول) =====
      {
        name: "educations",
        type: "table",
        label: "المؤهلات العلمية",
        columns: [
          { key: "qualification", label: "المؤهل", type: "text" },
          { key: "school_univ", label: "مدرسة / جامعة / معهد", type: "textarea" },
          { key: "level", label: "المستوى", type: "select", options: [], dynamicOptions: "education_level" },
          { key: "year_of_passing", label: "سنة التخرج", type: "number" },
          { key: "class_per", label: "الدرجة / النسبة المئوية", type: "text" },
          { key: "maj_opt_subj", label: "المواد الرئيسية/الاختيارية", type: "textarea" },
        ],
        required: false,
      },

      // ===== تفاصيل المشروع (جدول) =====
      {
        name: "projects",
        type: "table",
        label: "تفاصيل المشروع",
        columns: [
          { key: "project_name", label: "اسم المشروع", type: "text" },
          { key: "project_detials", label: "تفاصيل المشروع", type: "text" },
          { key: "sector_name", label: "القطاع", type: "select", options: [], dynamicOptions: "sector_name" },
          { key: "sector_type_name", label: "نوع القطاع", type: "select", options: [], dynamicOptions: "sector_type_name" },
          { key: "sector_type_nam_info", label: "معلومات نوع القطاع", type: "text" },
          { key: "sector_type_details_name", label: "تفاصيل نوع القطاع", type: "select", options: [], dynamicOptions: "sector_type_details_name" },
          { key: "sector_type_details_name_info", label: "معلومات تفاصيل نوع القطاع", type: "text" },
          { key: "number_of_workers", label: "عدد العمال", type: "number" },
          { key: "amount_capital", label: "رأس المال", type: "number" },
        ],
        required: false,
      },

      // ===== الإنتاج (جدول) =====
      {
        name: "productions",
        type: "table",
        label: "الإنتاج",
        columns: [
          { key: "quantity", label: "الكمية", type: "number" },
          { key: "unit", label: "الوحدة", type: "select", options: [], dynamicOptions: "unit" },
        ],
        required: false,
      },

      // ===== العنوان (جدول) =====
      {
        name: "addresses",
        type: "table",
        label: "العنوان",
        columns: [
          { key: "city_name", label: "المحافظة", type: "select", options: [], dynamicOptions: "city_name" },
          { key: "directorate_name", label: "المديرية", type: "select", options: [], dynamicOptions: "directorate_name" },
          { key: "district_name", label: "المنطقة", type: "select", options: [], dynamicOptions: "district_name" },
          { key: "district_name_info", label: "اسم المنطقة", type: "text" },
          { key: "village_name", label: "القرية/الحي", type: "select", options: [], dynamicOptions: "village_name" },
          { key: "village_name_info", label: "اسم القرية/الحي", type: "text" },
          { key: "accommodation_type", label: "نوع السكن", type: "select", options: [], dynamicOptions: "accommodation_type" },
        ],
        required: false,
      },

      // ===== مرفقات =====
      {
        name: "idCardImage",
        type: "file",
        label: "أرفق صورة البطاقة الشخصية",
        description:
          "قم برفع صورة واضحة للبطاقة الشخصية (JPG/PNG, حتى 5MB)",
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
      {
        name: "favField",
        type: "text",
        label: "مجال التطوع المفضل",
        required: true,
      },
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
        placeholder: "أدخل رقم الهاتف",
        required: true,
      },
      {
        name: "city",
        type: "text",
        label: "مكان الإقامة",
        placeholder: "اكتب المدينة / المنطقة",
        required: true,
      },
      {
        name: "age",
        type: "number",
        label: "العمر",
        placeholder: "اكتب عمرك",
        required: true,
      },
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
      {
        name: "fullName",
        type: "text",
        label: "الاسم الكامل",
        placeholder: "اكتب اسمك الثلاثي",
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
        required: true,
      },
      {
        name: "specialization",
        type: "text",
        label: "التخصص",
        placeholder: "اكتب تخصصك",
        required: true,
      },
      {
        name: "experienceYears",
        type: "number",
        label: "سنوات الخبرة",
        placeholder: "مثال: 5",
        required: true,
      },
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