import { REAL_DATA_ENABLED } from "./flag";

export const splitFullName = (fullName: string) => {
  const nameParts = fullName.trim().split(" ");
  if (nameParts.length < 2) {
    return nameParts;
  }
  const names = nameParts.slice(0, -1).join(" ");
  const surname = nameParts.at(-1);
  return [names, surname];
};

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const removeDuplicates = <T>(array: T[], excludeArray: T[]): T[] =>
  array.filter(
    (value, index, self) =>
      self.indexOf(value) === index && !excludeArray.includes(value)
  );

export const determineFontColor = (backgroundHex: string): string => {
  const hexToRGB = (hex: string): [number, number, number] => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  };

  const calculateRelativeLuminance = ([red, green, blue]: [
    number,
    number,
    number
  ]): number => {
    const sRGBColor = (color: number) => color / 255;
    const adjustedColor = (color: number) =>
      color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4);

    const normalizedRed = adjustedColor(sRGBColor(red));
    const normalizedGreen = adjustedColor(sRGBColor(green));
    const normalizedBlue = adjustedColor(sRGBColor(blue));

    return (
      0.2126 * normalizedRed +
      0.7152 * normalizedGreen +
      0.0722 * normalizedBlue
    );
  };

  const calculateContrastRatio = (
    backgroundLuminance: number,
    fontLuminance: number
  ): number =>
    backgroundLuminance > fontLuminance
      ? (backgroundLuminance + 0.05) / (fontLuminance + 0.05)
      : (fontLuminance + 0.05) / (backgroundLuminance + 0.05);

  const backgroundRGB = hexToRGB(backgroundHex);
  const relativeLuminance = calculateRelativeLuminance(backgroundRGB);
  const contrastRatioWithWhite = calculateContrastRatio(relativeLuminance, 1);
  const contrastRatioWithBlack = calculateContrastRatio(relativeLuminance, 21);

  return contrastRatioWithWhite >= 4.5 && contrastRatioWithBlack >= 4.5
    ? contrastRatioWithWhite > contrastRatioWithBlack
      ? "#ffffff"
      : "#000000"
    : contrastRatioWithWhite >= 4.5
    ? "#ffffff"
    : "#000000";
};

export const getPhoto = async () => (await import(`./assets/photo-${REAL_DATA_ENABLED ? "real" : "example"}.jpg`)).default

export const getData = async (module: string) => (await import(`./components/${module}/data-${REAL_DATA_ENABLED ? "real" : "example"}`)).default
