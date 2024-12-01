import { capitalizeFirstLetter } from './../../../../helpers/utils'
import dayjs from 'dayjs'

const startDate = '2023-03-01'

const numberStrings: Record<number, string> = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
}

function buildDateString() {
    const now = dayjs()
    const startedProgrammingAt = dayjs(startDate)
    const months = now.diff(startedProgrammingAt, 'months')
    const fullYears = Math.floor(months / 12)
    const remainingMonths = months % 12

    const yearInContent = remainingMonths >= 8 ? fullYears + 1 : fullYears
    const keyWordInContent = remainingMonths >= 8 ? 'almost' : 'over'
    const numberString = numberStrings[yearInContent]

    if (!numberString) {
        throw new Error('Invalid numberString')
    }

    if (!yearInContent) {
        return ''
    }

    return `for ${keyWordInContent} ${numberString} ${yearInContent > 1 ? 'years' : 'year'} now, `
}

const hobbies = ['glitter brewing', 'stardust sculpting', 'moonbeam painting']

function buildHobbiesString() {
    if (hobbies.length === 1) {
        return hobbies[0]
    }

    const allHobbiesButLast = hobbies.slice(0, -1)
    const lastHobby = hobbies[hobbies.length - 1]

    return [allHobbiesButLast.join(', '), lastHobby].join(' and ')
}

const data = {
    content:
  `I am a Rainbow Unicorn Enchanter, an alchemist of web technologies, weaving spells of innovation with a palette of rainbow hues. ${capitalizeFirstLetter(buildDateString())}I’ve conjured code that radiates the colors of the rainbow, infusing each project with a touch of unicorn magic. In this journey, I believe that collaboration and the sharing of magical ideas can create wonders beyond imagination. So, that’s me, ready to craft digital enchantments that sparkle with the magic of unicorns and rainbows. My magical rainbow hobbies include ${buildHobbiesString()}.`
}

export default data
