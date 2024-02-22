export const intro = (
  title = "السيد",
  name,
  max,
  currency
) => `عناية ${title}/ ${name}
  
يمثل هذا المستند وثيقة التأمين الخاصة بك والذي يمنحك نبذة مختصرة عن خطتك التأمينية. يمكنك الإطلاع على كافة التفاصيل 
المتعلقة بالمزايا والحدود والإستثناءات المطبقة على خطة التأمين الخاصة بك في كتيب المزايا والإستثناءات. 
  
نؤكد بموجب هذه الوثيقة أن الأشخاص المذكورين أدناه عملاء بخطة بوبا إيجيبت للتأمين الطبي. تغطي الخطة التأمينية تكاليف
العلاج المستحق وتكاليف الإقامة في المستشفى وتكاليف العلاج الفعال بحد سنوي أقصى قدره ${max} ${currency}
في التغطية العالمية بأستثناء الواليات المتحدة الأمريكية
برجاء ملاحظة أن هناك بعض المزايا التي تطبق عليها الحدود الجزئية. 
  
وتفضلوا بقبول وافر الاحترام، 
  
بوبا إيجيبت للتأمين`;

export const tableDescriptionPrefix = (title) =>
  `البيانات الخاصة ${title === "mr" ? "بالسيد/" : "بالسيدة/"}`;

export const tableDescription = (
  name,
  membershipNumber,
  birthDate,
  country
) => ` ${name} ، رقم عضوية/ ${membershipNumber}
    تاريخ الميلاد ${birthDate} ، محل الإقامة/${country}`;

export const contractInfoPrefix = () => `معلومات العقد`;
export const contractInfo = () =>
  `تتولى شركة بوبا إيجيبت للتأمين توفير التغطية التأمينية لخطة التأمين الخاصة بك.`;

export const lastSectionP1 = () =>
  "يمكنك االطالع والحصول على نسخة من دليل حماية المتعاملين المصدر من قبل الهيئة العامة للرقابة المالية عن طريق التواصل مع فريق خدمة العمالء لدينا أو زيارة موقع الهيئة العامة للرقابة المالية على";
export const lastSectionP2 = () => "لتحميل نسخة من الدليل.";

export const phone = "هاتف: 24003600 (02) + أو (16816)";
export const phax = "فاكس: 24003749 (02) + 2";

export const notCoveredText = (
  title,
  name,
  cover_start,
  is_outpatient,
  disease,
  tail
) => {
  const tailGenerator = tail?.length > 0 ? `(ينطبق على ${tail})` : "";
  const titleGenerator = title === "mr" ? "للسيد" : "للسيدة";
  const intro = is_outpatient
    ? `علاجات العيادات الخارجي لكل ماله علاقة/ ناتج عن /ناجم عن أو مرتبط بمرض`
    : `كل ماله علاقة/ ناتج عن /ناجم عن أو مرتبط بمرض`;

  return `
  تفاصيل الحالة المرضية السابقة للتعاقد المستثناه من التغطية : ${intro} ${disease} ${titleGenerator}/ ${name} و ذلك اعتبارا من ${cover_start} ${tailGenerator}
  `;
};

export const convertDateFormat = (dateString) => {
  // Split the date string into day, month, and year
  var parts = dateString.split("-");

  // Map month abbreviations to their numeric values
  var months = {
    jan: "01",
    feb: "02",
    mar: "03",
    apr: "04",
    may: "05",
    jun: "06",
    jul: "07",
    aug: "08",
    sep: "09",
    oct: "10",
    nov: "11",
    dec: "12",
  };

  // Convert month abbreviation to numeric value
  var month = months[parts[1].toLowerCase()];

  // Return the converted date format
  return parts[0] + "/" + month + "/" + parts[2];
};

// Example usage:
var inputDate = "01-jan-2022";
var convertedDate = convertDateFormat(inputDate);
console.log(convertedDate); // Output: 01/01/2022
