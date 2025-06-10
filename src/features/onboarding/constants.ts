import { indianLanguages, Language } from "@/constants/languages";

export const stepperDefaultValues = {
  dob: null,
  age: undefined,
  gender: undefined,
  country: undefined,
  mobileNumber: undefined,
  highestQualificationId: undefined,
  streamId: undefined,
  preferredLanguage: undefined,
  aboutMe: undefined,
  certificateId: undefined
};

export const stepperFormLabels = {
  1: {
    label: "Personal Details",
    subLabel: "Your information helps us connect you better",
  },
  2: {
    label: "Educational Details",
    subLabel: "This will help us find the right scribe/student for you.",
  },
  3: {
    label: "Certifications Details",
    subLabel:
      "Upload required documents for verification. This step ensures a smotth process ahead",
  },
};

export const genderList = ["male", "female"];
export const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

export const steps: { value: number; label: string }[] = [
  { value: 1, label: "Personal Details" },
  { value: 2, label: "Educational Details" },
  { value: 3, label: "Certification Details" },
];

export const languageOptions = indianLanguages.map((language: Language) => {
  return {
    label: language.name,
    value: language.name.toLowerCase(),
  };
});

export const CERTIFICATE_LABELS = {
  student: "Disability Certificate",
  scribe: "Educational Qualification Certificate"
}