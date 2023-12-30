
export const determineFontColor = (backgroundHex: string): string => {
    const hexToRGB = (hex: string): [number, number, number] => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
        hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result
            ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
            ]
            : [0, 0, 0]
    }
  
    const calculateRelativeLuminance = ([red, green, blue]: [
      number,
      number,
      number
    ]): number => {
        const sRGBColor = (color: number) => color / 255
        const adjustedColor = (color: number) =>
            color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4)
  
        const normalizedRed = adjustedColor(sRGBColor(red))
        const normalizedGreen = adjustedColor(sRGBColor(green))
        const normalizedBlue = adjustedColor(sRGBColor(blue))
  
        return (
            0.2126 * normalizedRed +
        0.7152 * normalizedGreen +
        0.0722 * normalizedBlue
        )
    }
  
    const calculateContrastRatio = (
        backgroundLuminance: number,
        fontLuminance: number
    ): number =>
        backgroundLuminance > fontLuminance
            ? (backgroundLuminance + 0.05) / (fontLuminance + 0.05)
            : (fontLuminance + 0.05) / (backgroundLuminance + 0.05)
  
    const backgroundRGB = hexToRGB(backgroundHex)
    const relativeLuminance = calculateRelativeLuminance(backgroundRGB)
    const contrastRatioWithWhite = calculateContrastRatio(relativeLuminance, 1)
    const contrastRatioWithBlack = calculateContrastRatio(relativeLuminance, 21)
  
    return contrastRatioWithWhite >= 4.5 && contrastRatioWithBlack >= 4.5
        ? contrastRatioWithWhite > contrastRatioWithBlack
            ? '#ffffff'
            : '#000000'
        : contrastRatioWithWhite >= 4.5
            ? '#ffffff'
            : '#000000'
}