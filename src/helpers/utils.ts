export const splitFullName = (fullName: string) => {
    const nameParts = fullName.trim().split(' ')
    if (nameParts.length < 2) {
        return nameParts
    }
    const names = nameParts.slice(0, -1).join(' ')
    const surname = nameParts.at(-1)
    return [names, surname]
}

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min
}

export const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const removeDuplicates = <T>(array: T[], excludeArray: T[]): T[] =>
    array.filter(
        (value, index, self) =>
            self.indexOf(value) === index && !excludeArray.includes(value)
    )
    
export function shuffle<T>(array: T[]) {
    let currentIndex = array.length
      
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;
      
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }
}