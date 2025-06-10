import countries from "i18n-iso-countries";

// Load English locale for country names
import en from "i18n-iso-countries/langs/en.json";
countries.registerLocale(en);

const getCountryOptions = () => {
  const countryObj = countries.getNames("en", { select: "official" });
  return Object.entries(countryObj).map(([code, name]) => ({
    value: code,
    label: `${code} - ${name}`,
  }));
};

export const countryOptions = getCountryOptions();
