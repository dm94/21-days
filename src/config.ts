const {
  VITE_PLAUSIBLE_URL,
} = import.meta.env;

export const config = {
  PLAUSIBLE_URL: VITE_PLAUSIBLE_URL,
};

export const DEFAULT_LANGUAGE = "en";
