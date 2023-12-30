import keySkillsData from '../KeySkills/data-example'

const keySkillsNames = (keySkillsData.skills as { name: string}[]).map((skill) => skill.name.toLowerCase())

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
        'WitchcraftAI',
    ],
    excludedTech: [...keySkillsNames],
}

export default data
