import keySkillsData from '../KeySkills/data-example'

const keySkillsNames = (keySkillsData.skills as { name: string }[]).map(
    (skill) => skill.name.toLowerCase()
)

const keySkillsSynonyms = (keySkillsData.skills as { synonym?: string[] }[])
    .flatMap((skill) => skill.synonym)
    .filter((synonym) => synonym !== undefined)

const data = {
    tech: [
        'Wand.js',
        'BroomstickDB',
        'EnchantedIDE',
        'SpellCheckAI',
        'CauldronDB',
        'WizardCI/CD',
        'CrystalBall',
        'Wandify',
        'PotionX',
        'Unicornize',
        'CauldronDB',
        'MystiLint',
        'CrystalAnalytics',
        'ElixirMagic',
        'SparkleJS',
        'MagicScript',
        'WitchyML',
        'RainbowMage',
        'EnchantedForestVR',
        'MagicWand SDK',
        'ArcaneSpells API',
        'WizardlyBot',
        'EtherealUI',
        'CharmCrafter',
        'MythicalMaps',
        'WitchcraftAI'
    ],
    excludedTech: [...keySkillsNames, ...keySkillsSynonyms],
    synonyms: [...keySkillsSynonyms, 'magicwandsdk', 'sparkle.js']
}

export default data
