/**
 * Verified Historical & Educational Data
 * SACRED JOURNEY: Buddhist Sacred Places
 * 
 * Sources & Historical Grounding:
 * - Archaeological Survey of India (ASI) Bodh Gaya Excavation Records
 * - UNESCO World Heritage Centre (Mahabodhi Temple Complex, Inscribed 2002, Ref 1056)
 * - Cunningham, Alexander. "Mahâbodhi: or the Great Buddhist Temple Under the Bodhi Tree at Buddha-Gaya" (1892)
 * - The Edicts of King Ashoka (3rd Century BCE)
 */
import { CharacterProfile, Quest, NPC, InteractiveObject, Relic, JournalSection, QuizQuestion } from '../types/game';

export const CHARACTERS: CharacterProfile[] = [
  {
    id: 'ananya',
    name: 'Ananya',
    title: 'Heritage Archaeologist Apprentice',
    age: 14,
    origin: 'New Delhi, India',
    specialty: 'Ancient Mauryan Inscriptions & Epigraphy',
    bio: 'Curious and detail-oriented, Ananya loves deciphering ancient Brahmi scripts and understanding how Emperor Ashoka built stone pillars across India.',
    clothingColor: '#e06d3b', // Saffron ochre
    accentColor: '#1d4e89',
    backpackColor: '#5c4033',
    hairColor: '#1c1b18',
    skinColor: '#a67c52'
  },
  {
    id: 'tenzin',
    name: 'Tenzin',
    title: 'Himalayan Explorer & Field Sketcher',
    age: 13,
    origin: 'Leh, Ladakh',
    specialty: 'Sacred Architecture & Living Traditions',
    bio: 'Growing up in the high Himalayas surrounded by ancient gompas, Tenzin carries a leatherbound sketchbook to draw temple rooflines and prayer wheels.',
    clothingColor: '#8a2828', // Maroon robe trim
    accentColor: '#f4c430',
    backpackColor: '#3d3a37',
    hairColor: '#121212',
    skinColor: '#bd8c61'
  },
  {
    id: 'liam',
    name: 'Liam',
    title: 'Global Youth Fellow & Geographer',
    age: 14,
    origin: 'Melbourne, Australia',
    specialty: 'Ancient Trade Routes & Mapmaking',
    bio: 'Liam is captivated by how Buddhist teachings traveled along the ancient Silk Road and Maritime routes, connecting distant civilizations across Asia.',
    clothingColor: '#2b5876', // Deep cobalt blue
    accentColor: '#e0a96d',
    backpackColor: '#204051',
    hairColor: '#4a3728',
    skinColor: '#f1c27d'
  },
  {
    id: 'meiling',
    name: 'Mei-Ling',
    title: 'Museum Scholar & Art Historian',
    age: 15,
    origin: 'Singapore',
    specialty: 'Lotus Motifs & Buddhist Sculptural Art',
    bio: 'Mei-Ling studies how Buddhist symbols like the lotus, wheel, and stupa evolved across Gandhara, Mathura, and Southeast Asian traditions.',
    clothingColor: '#3a7d44', // Forest jade green
    accentColor: '#d4af37',
    backpackColor: '#493829',
    hairColor: '#1a1918',
    skinColor: '#f7d2b2'
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q1',
    title: 'Gateway to Bodh Gaya',
    description: 'Welcome to Bodh Gaya! Walk toward the eastern torana gateway and speak with Venerable Ananda to understand the history of this holy site.',
    location: 'Eastern Entrance Torana',
    objective: 'Speak with Venerable Ananda at the entrance [Press E]',
    completed: false,
    xpReward: 100,
    unlockedFact: 'Bodh Gaya is regarded as the most sacred of the four primary Buddhist pilgrimage sites, marking where Siddhartha Gautama attained enlightenment.'
  },
  {
    id: 'q2',
    title: 'The Diamond Seat of Ashoka',
    description: 'Behind the grand Mahabodhi Temple lies the ancient Vajrasana (Diamond Throne). Locate it under the Bodhi Tree and inspect its carvings.',
    location: 'Rear of Mahabodhi Temple',
    objective: 'Inspect the ancient Vajrasana stone slab [Press E]',
    completed: false,
    xpReward: 150,
    unlockedFact: 'The Vajrasana is a polished sandstone slab placed by Emperor Ashoka in the 3rd century BCE to commemorate the exact spot of the Buddha\'s meditation.'
  },
  {
    id: 'q3',
    title: 'Offering of Light',
    description: 'For over two millennia, pilgrims have lit oil and butter lamps as symbols of wisdom dispelling ignorance. Light the 4 ritual brass lamps in the sacred courtyard.',
    location: 'Courtyard & Bodhi Tree Garden',
    objective: 'Ignite all 4 sacred butter lamps (0/4 lit) [Press E]',
    completed: false,
    xpReward: 200,
    unlockedFact: 'Light represents the illumination of knowledge and understanding (Prajna) overcoming delusion (Moha).'
  },
  {
    id: 'q4',
    title: 'Voice of the Mauryan Emperor',
    description: 'Locate the Ashoka Pillar south of the main temple. Consult with archaeologist Dr. Maya Sen to decipher its polished sandstone surface.',
    location: 'South Pillar Court',
    objective: 'Examine the Ashoka Pillar and talk to Dr. Maya Sen [Press E]',
    completed: false,
    xpReward: 150,
    unlockedFact: 'Emperor Ashoka\'s pillars were carved from single blocks of Chunar sandstone, celebrated for their mirror-like polish and edicts promoting non-violence (ahimsa).'
  },
  {
    id: 'q5',
    title: 'Sacred Heritage Scholar',
    description: 'Put your archaeological and historical knowledge to the test! Complete the Bodh Gaya Heritage Quiz to earn your official Junior Scholar Certificate.',
    location: 'Temple Pavilion / Quiz Terminal',
    objective: 'Score at least 80% on the Sacred Heritage Quiz',
    completed: false,
    xpReward: 250,
    unlockedFact: 'The Mahabodhi Temple was inscribed as a UNESCO World Heritage Site in 2002 for its outstanding universal value in human history and sacred architecture.'
  }
];

export const NPCS: NPC[] = [
  {
    id: 'npc_ananda',
    name: 'Venerable Ananda',
    role: 'Resident Monk & Temple Historian',
    title: 'Elder Guardian of the Bodhi Grove',
    position: [0, 0, 16],
    rotationY: Math.PI,
    modelType: 'monk',
    robeColor: '#c85a17', // Saffron monk robe
    initialDialogueId: 'ananda_welcome',
    dialogueTree: {
      ananda_welcome: {
        id: 'ananda_welcome',
        speaker: 'Venerable Ananda',
        speakerRole: 'Resident Monk & Temple Historian',
        avatarIcon: '☸️',
        text: 'Peace be with you, young explorer. You stand before the Mahabodhi Temple, the heart of the Buddhist world. Around 2,500 years ago, Prince Siddhartha sat beneath the sacred ficus tree right behind this temple and attained Enlightenment.',
        historicalNote: 'HISTORICAL FACT: Siddhartha Gautama sat in deep meditation for 49 days beneath the Bodhi tree before attaining supreme enlightenment (Bodhi) at age 35, becoming the Buddha.',
        options: [
          { text: 'Why is this place called Bodh Gaya?', nextNodeId: 'ananda_name' },
          { text: 'What should I explore first here?', nextNodeId: 'ananda_quest_hint' },
          { text: 'Thank you, I will begin exploring.', nextNodeId: 'ananda_farewell' }
        ]
      },
      ananda_name: {
        id: 'ananda_name',
        speaker: 'Venerable Ananda',
        speakerRole: 'Resident Monk & Temple Historian',
        avatarIcon: '☸️',
        text: '"Bodhi" means awakening or supreme wisdom in Pali and Sanskrit. The ancient town was known as Uruvela, near the Phalgu River. After the Buddha’s awakening, the sacred grove became known as Bodh Gaya, distinguishing it from nearby Gaya.',
        historicalNote: 'GEOGRAPHICAL FACT: Bodh Gaya is situated on the banks of the Neranjara (now Phalgu) River in the state of Bihar, India.',
        options: [
          { text: 'Where is the sacred Bodhi Tree located?', nextNodeId: 'ananda_tree' },
          { text: 'What is the tall tower made of?', nextNodeId: 'ananda_tower' }
        ]
      },
      ananda_tree: {
        id: 'ananda_tree',
        speaker: 'Venerable Ananda',
        speakerRole: 'Resident Monk & Temple Historian',
        avatarIcon: '☸️',
        text: 'Follow the circumambulation path around to the western side directly behind the main sanctum. There you will find the venerable Bodhi tree, with the ancient Vajrasana (Diamond Seat) beneath its branches. You may also light our ritual butter lamps as a sign of respect.',
        options: [
          { text: 'I will go inspect the Diamond Seat now!', action: 'COMPLETE_Q1' }
        ]
      },
      ananda_tower: {
        id: 'ananda_tower',
        speaker: 'Venerable Ananda',
        speakerRole: 'Resident Monk & Temple Historian',
        avatarIcon: '☸️',
        text: 'The grand central Shikhara rises 55 meters into the sky! It is built primarily of burnt brick and plaster, dating from the classical Gupta era (5th–6th century CE), making it one of the oldest all-brick grand temples in India.',
        historicalNote: 'ARCHITECTURAL FACT: The Mahabodhi spire influenced temple architecture across Southeast Asia, including Bagan in Myanmar and Chiang Mai in Thailand.',
        options: [
          { text: 'Fascinating! Let me continue my journey.', action: 'COMPLETE_Q1' }
        ]
      },
      ananda_quest_hint: {
        id: 'ananda_quest_hint',
        speaker: 'Venerable Ananda',
        speakerRole: 'Resident Monk & Temple Historian',
        avatarIcon: '☸️',
        text: 'Begin by honoring the four corners of the temple. Look for the ancient stone railing medallions, visit the Diamond Throne, and speak with Dr. Maya Sen near the Ashoka Pillar.',
        options: [
          { text: 'Thank you, Venerable Ananda!', action: 'COMPLETE_Q1' }
        ]
      },
      ananda_farewell: {
        id: 'ananda_farewell',
        speaker: 'Venerable Ananda',
        speakerRole: 'Resident Monk & Temple Historian',
        avatarIcon: '☸️',
        text: 'May your journey through these ancient grounds fill your mind with peace and clarity.',
        options: [
          { text: 'Farewell!', action: 'COMPLETE_Q1' }
        ]
      }
    }
  },
  {
    id: 'npc_maya',
    name: 'Dr. Maya Sen',
    role: 'Senior ASI Field Archaeologist',
    title: 'Archaeological Survey of India',
    position: [14, 0, -4],
    rotationY: -Math.PI / 2,
    modelType: 'archaeologist',
    initialDialogueId: 'maya_intro',
    dialogueTree: {
      maya_intro: {
        id: 'maya_intro',
        speaker: 'Dr. Maya Sen',
        speakerRole: 'Senior ASI Field Archaeologist',
        avatarIcon: '🔍',
        text: 'Hello there, young explorer! I am Dr. Maya from the Archaeological Survey of India. We are documenting the Mauryan stonework and 3rd-century BCE Brahmi inscriptions on this pillar.',
        historicalNote: 'HISTORICAL FACT: Emperor Ashoka visited Bodh Gaya around 260 BCE (the 10th year of his reign), as recorded in his Rock Edict VIII, replacing royal pleasure hunts with Dharma pilgrimages.',
        options: [
          { text: 'What is this pillar made of?', nextNodeId: 'maya_pillar_material' },
          { text: 'Can you teach me how to read the Brahmi script?', nextNodeId: 'maya_brahmi' },
          { text: 'Why is Ashoka so important to this site?', nextNodeId: 'maya_ashoka_legacy' }
        ]
      },
      maya_pillar_material: {
        id: 'maya_pillar_material',
        speaker: 'Dr. Maya Sen',
        speakerRole: 'Senior ASI Field Archaeologist',
        avatarIcon: '🔍',
        text: 'Notice the astonishing glass-like sheen? This is carved from a single monolith of Chunar sandstone, quarried hundreds of kilometers away near Varanasi. The Mauryan polish technique was so advanced that it remains glossy after more than 2,200 years!',
        historicalNote: 'MATERIAL SCIENCE: Mauryan polish on Chunar sandstone is famous among global archaeologists for its mirror-like finish, created through meticulous abrasive rubbing.',
        options: [
          { text: 'Tell me about the inscriptions!', nextNodeId: 'maya_brahmi' }
        ]
      },
      maya_brahmi: {
        id: 'maya_brahmi',
        speaker: 'Dr. Maya Sen',
        speakerRole: 'Senior ASI Field Archaeologist',
        avatarIcon: '🔍',
        text: 'The script is Brahmi, the ancestral script of almost all modern South and Southeast Asian writing systems! King Ashoka wrote edicts promoting kindness to all living beings, mutual religious respect, and the construction of rest houses and herbal medicine dispensaries.',
        historicalNote: 'EPIGRAPHY FACT: The Brahmi script was deciphered in 1837 by British scholar and mint master James Prinsep.',
        options: [
          { text: 'Incredible! I will record this in my journal.', action: 'COMPLETE_Q4' }
        ]
      },
      maya_ashoka_legacy: {
        id: 'maya_ashoka_legacy',
        speaker: 'Dr. Maya Sen',
        speakerRole: 'Senior ASI Field Archaeologist',
        avatarIcon: '🔍',
        text: 'Before Ashoka built the first shrine and Diamond Throne here in the 3rd century BCE, the site had only the living tree. Ashoka also sent his daughter Sanghamitta to Sri Lanka with a cutting of this Bodhi tree, which still thrives in Anuradhapura today!',
        options: [
          { text: 'That connected the whole ancient world!', action: 'COMPLETE_Q4' }
        ]
      }
    }
  },
  {
    id: 'npc_tashi',
    name: 'Tashi',
    role: 'Pilgrim Apprentice & Guide',
    title: 'Himalayan Pilgrim',
    position: [-13, 0, 8],
    rotationY: Math.PI / 4,
    modelType: 'pilgrim',
    robeColor: '#962d3e',
    initialDialogueId: 'tashi_lamps',
    dialogueTree: {
      tashi_lamps: {
        id: 'tashi_lamps',
        speaker: 'Tashi',
        speakerRole: 'Pilgrim Apprentice',
        avatarIcon: '🪔',
        text: 'Tashi delek! Welcome to the sacred courtyard! My teacher told me that lighting brass butter lamps is an offering of inner clarity. But the evening breeze has put out several lamps around the grounds. Could you help rekindle all four of them?',
        options: [
          { text: 'I would be happy to help light them!', nextNodeId: 'tashi_directions' },
          { text: 'What does circumambulation mean?', nextNodeId: 'tashi_pradaksina' }
        ]
      },
      tashi_directions: {
        id: 'tashi_directions',
        speaker: 'Tashi',
        speakerRole: 'Pilgrim Apprentice',
        avatarIcon: '🪔',
        text: 'Wonderful! You will find two golden lamp stands near the main temple steps and two more in the serene Bodhi Tree garden. Approach each lamp and press [E] to illuminate it!',
        options: [
          { text: 'On my way!', action: 'START_LAMPS' }
        ]
      },
      tashi_pradaksina: {
        id: 'tashi_pradaksina',
        speaker: 'Tashi',
        speakerRole: 'Pilgrim Apprentice',
        avatarIcon: '🪔',
        text: 'In Sanskrit it is called "Pradaksina". Pilgrims walk in a clockwise direction around the temple and stupas, keeping the sacred shrine on their right side as a gesture of deep reverence.',
        historicalNote: 'RITUAL TRADITION: Clockwise circumambulation (Pradaksina) is a foundational pilgrimage practice across ancient Indian traditions and Buddhist sanctuaries.',
        options: [
          { text: 'I will walk clockwise around the temple!', nextNodeId: 'tashi_directions' }
        ]
      }
    }
  }
];

export const INTERACTIVE_OBJECTS: InteractiveObject[] = [
  {
    id: 'obj_vajrasana',
    name: 'The Vajrasana (Diamond Throne)',
    type: 'throne',
    position: [0, 0.4, -14],
    interactionRadius: 3.5,
    prompt: 'Inspect Ancient Vajrasana [E]',
    discovered: false,
    factTitle: 'Vajrasana: The Unshakeable Seat of Awakening',
    factDescription: 'A polished grey sandstone slab carved with geese (hamsa) and honeysuckle palmette motifs, established by Emperor Ashoka c. 250 BCE directly beneath the Bodhi tree. Tradition calls it the center of the world that remained motionless while Siddhartha sought supreme truth.',
    historicalEra: 'Mauryan Empire, c. 250 BCE',
    relicId: 'relic_sandstone'
  },
  {
    id: 'obj_bodhi_tree',
    name: 'The Sacred Bodhi Tree (Ficus Religiosa)',
    type: 'tree',
    position: [0, 0, -18],
    interactionRadius: 4.5,
    prompt: 'Examine Sacred Bodhi Tree [E]',
    discovered: false,
    factTitle: 'Living Lineage of the Bodhi Tree',
    factDescription: 'This venerable Peepal tree (Ficus religiosa) is a direct botanical descendant of the original tree under which the Buddha sat. In the 3rd century BCE, Emperor Ashoka’s daughter Princess Sanghamitta carried a sacred sapling from this tree to Sri Lanka (the Jaya Sri Maha Bodhi), which survives as the oldest historically documented planted tree in the world!',
    historicalEra: 'Living Heritage (Descendant of 6th Century BCE Tree)',
    relicId: 'relic_bodhi_leaf'
  },
  {
    id: 'obj_ashoka_pillar',
    name: 'Ashoka Pillar & Lion Capital',
    type: 'pillar',
    position: [14, 0, 0],
    interactionRadius: 3.5,
    prompt: 'Read Ashoka Pillar Edict [E]',
    discovered: false,
    factTitle: 'Royal Edict of Emperor Ashoka',
    factDescription: 'Erected around 250 BCE during Ashoka\'s imperial visit to Bodh Gaya. Carved from fine-grained Chunar sandstone, the pillar once stood over 30 feet tall topped by a lion capital. Ashoka’s edicts commanded ethical conduct (Dharma), religious tolerance, and kindness to animals.',
    historicalEra: 'Mauryan Period, 3rd Century BCE',
    relicId: 'relic_ashoka_fragment'
  },
  {
    id: 'obj_prayer_wheel',
    name: 'Tibetan Mani Prayer Wheel',
    type: 'wheel',
    position: [-14, 0.5, 0],
    interactionRadius: 3.0,
    prompt: 'Spin Tibetan Prayer Wheel [E]',
    discovered: false,
    factTitle: 'The Wheel of Compassion (Mani Wheel)',
    factDescription: 'Inscribed with the sacred mantra "Om Mani Padme Hum" in Ranjana script, invoking the jewel of wisdom blooming within the lotus of the compassionate heart. Revolving the wheel in a clockwise direction is considered equivalent to reciting thousands of prayers for world peace.',
    historicalEra: 'Living Pilgrimage Tradition',
    relicId: 'relic_prayer_wheel'
  },
  {
    id: 'obj_lotus_pond',
    name: 'Mucalinda Lotus Pond',
    type: 'pond',
    position: [16, 0, 16],
    interactionRadius: 5.0,
    prompt: 'Reflect at Mucalinda Lotus Pond [E]',
    discovered: false,
    factTitle: 'Shelter of the Serpent King Mucalinda',
    factDescription: 'According to sacred accounts, during the sixth week after enlightenment, a ferocious torrential storm engulfed Bodh Gaya. The serpent king Mucalinda emerged from this pond and spread his giant multi-hooded canopy over the Buddha to shield him from wind and cold.',
    historicalEra: 'Ancient Sacred Geography'
  },
  {
    id: 'obj_vedika_railing',
    name: 'Ancient Carved Stone Railing (Vedika)',
    type: 'stupa',
    position: [-8, 0.8, -10],
    interactionRadius: 3.2,
    prompt: 'Inspect Vedika Lotus Medallions [E]',
    discovered: false,
    factTitle: 'Sunga & Gupta Carved Railings (Vedika)',
    factDescription: 'These stone railings surrounded the sacred circumambulation path. The earlier sandstone pillars date to the Sunga period (c. 1st century BCE) with carvings of astronomical signs, winged centaurs, and blooming lotus rosettes; the later granite pillars date to the Gupta period (c. 4th-5th century CE).',
    historicalEra: '1st Century BCE – 5th Century CE',
    relicId: 'relic_lotus_medallion'
  },
  {
    id: 'obj_lamp_1',
    name: 'Northeast Sacred Butter Lamp',
    type: 'lamp',
    position: [7, 0.5, 9],
    interactionRadius: 2.5,
    prompt: 'Light Golden Butter Lamp [E]',
    discovered: false,
    factTitle: 'The Flame of Understanding',
    factDescription: 'Butter lamps burn purified ghee or plant oil, symbolizing the destruction of dark ignorance through the gentle light of wisdom.',
    historicalEra: 'Ancient Pilgrim Ritual'
  },
  {
    id: 'obj_lamp_2',
    name: 'Northwest Sacred Butter Lamp',
    type: 'lamp',
    position: [-7, 0.5, 9],
    interactionRadius: 2.5,
    prompt: 'Light Golden Butter Lamp [E]',
    discovered: false,
    factTitle: 'The Lamp of Diligence (Viriya)',
    factDescription: 'Represents persistent effort and joyful courage in the pursuit of knowledge.',
    historicalEra: 'Ancient Pilgrim Ritual'
  },
  {
    id: 'obj_lamp_3',
    name: 'West Bodhi Tree Lamp (South Stand)',
    type: 'lamp',
    position: [5, 0.5, -16],
    interactionRadius: 2.5,
    prompt: 'Light Golden Butter Lamp [E]',
    discovered: false,
    factTitle: 'The Lamp of Loving-Kindness (Metta)',
    factDescription: 'Offering warmth and gentle light without partiality to all beings.',
    historicalEra: 'Ancient Pilgrim Ritual'
  },
  {
    id: 'obj_lamp_4',
    name: 'West Bodhi Tree Lamp (North Stand)',
    type: 'lamp',
    position: [-5, 0.5, -16],
    interactionRadius: 2.5,
    prompt: 'Light Golden Butter Lamp [E]',
    discovered: false,
    factTitle: 'The Lamp of Serenity (Upekkha)',
    factDescription: 'Represents an unshakeable mind in the presence of life’s changing tides.',
    historicalEra: 'Ancient Pilgrim Ritual'
  }
];

export const RELICS: Relic[] = [
  {
    id: 'relic_bodhi_leaf',
    name: 'Fallen Sacred Bodhi Leaf',
    era: 'Current Botanical Lineage',
    material: 'Natural Ficus Religiosa Leaf',
    description: 'A genuine fallen heart-shaped leaf from the Mahabodhi Ficus religiosa, featuring an elongated drip tip that channels monsoon rains away from the leaf surface.',
    culturalSignificance: 'Revered worldwide by pilgrims as a sacred keepsake of enlightenment and natural symbiosis.',
    icon: '🍃',
    collected: false
  },
  {
    id: 'relic_sandstone',
    name: 'Vajrasana Rubbing Reproduction',
    era: 'Mauryan Era (c. 250 BCE)',
    material: 'Polished Chunar Sandstone Motif',
    description: 'An epigraphic rubbing showing the geese (hamsa) and stylized honeysuckle flowers carved along the edge of the Diamond Throne.',
    culturalSignificance: 'Proves the monumental patronage of Emperor Ashoka at the primary enlightenment sanctuary.',
    icon: '💎',
    collected: false
  },
  {
    id: 'relic_ashoka_fragment',
    name: 'Ashokan Brahmi Inscription Seal',
    era: '3rd Century BCE',
    material: 'Glazed Terracotta Impression',
    description: 'An impression stamp of the ancient Brahmi characters spelling "Devanampiya Piyadasi" (Beloved of the Gods, King Ashoka).',
    culturalSignificance: 'Essential document linking imperial patronage to universal ethics and welfare.',
    icon: '📜',
    collected: false
  },
  {
    id: 'relic_lotus_medallion',
    name: 'Carved Lotus Rosette Replica',
    era: 'Sunga Period (c. 100 BCE)',
    material: 'Carved Sandstone Relief',
    description: 'A circular relief carving of a 16-petal blooming lotus with beaded border, originally ornamenting the stone Vedika railings.',
    culturalSignificance: 'Demonstrates the sophisticated decorative stonemasonry developed by early Indian guilds.',
    icon: '🌸',
    collected: false
  },
  {
    id: 'relic_prayer_wheel',
    name: 'Miniature Brass Mani Wheel',
    era: 'Traditional Craftsmanship',
    material: 'Embossed Brass and Copper',
    description: 'A handheld prayer cylinder with lead weight, containing a tightly rolled sacred scroll inscribed with thousands of mantras.',
    culturalSignificance: 'Emblematic of Tibetan Buddhist pilgrims who travel thousands of miles to circumambulate Bodh Gaya.',
    icon: '☸️',
    collected: false
  }
];

export const JOURNAL_SECTIONS: JournalSection[] = [
  {
    id: 'bodhgaya',
    title: 'Bodh Gaya: Place of Enlightenment',
    subtitle: 'Mahabodhi Temple Complex • Bihar, India • UNESCO 2002',
    era: '6th c. BCE (Historical Event) / 3rd c. BCE (First Shrine) / 5th-6th c. CE (Current Main Temple)',
    content: [
      'Bodh Gaya is the most sanctified and holy pilgrimage center for Buddhists around the globe. It is here that Siddhartha Gautama, after six years of austere seeking, recognized the Middle Way and achieved Sambodhi (complete awakening).',
      'The majestic Mahabodhi Temple stands 55 meters (180 feet) high. Built almost entirely of burnt brick and lime mortar in the classical Gupta period, it is considered one of the earliest surviving brick temples in the Indian subcontinent.',
      'Beneath the sacred Bodhi Tree on the western facade of the temple rests the Vajrasana ("Diamond Throne"), erected by Emperor Ashoka. Stone railings (vedika) from the 1st century BCE to 5th century CE encircle the holy enclosure with rich sculptural reliefs.'
    ],
    keyFacts: [
      'Exact site of Siddhartha Gautama\'s enlightenment at age 35.',
      'One of the oldest brick structures in eastern India.',
      'Features the Sacred Bodhi Tree (Ficus religiosa) and Ashoka\'s Diamond Throne.',
      'Inscribed on the UNESCO World Heritage List in 2002.'
    ],
    imageType: 'bodhgaya'
  },
  {
    id: 'four_sites',
    title: 'The Four Principal Buddhist Sacred Places',
    subtitle: 'The Core Pilgrimage Circuit Prescribed in the Mahaparinibbana Sutta',
    era: 'Ancient India (Magadha, Kosala, Shakya, and Malla Realms)',
    content: [
      'In the Mahaparinibbana Sutta, the Buddha mentioned four sacred places that an earnest seeker should visit with inspiration and spiritual joy:',
      '1. LUMBINI (Nepal): The garden where Queen Maya gave birth to Prince Siddhartha around the 6th–5th century BCE. Commemorated by Emperor Ashoka\'s famous Rummindei pillar.',
      '2. BODH GAYA (India): Where Siddhartha attained Supreme Enlightenment beneath the Bodhi tree.',
      '3. SARNATH (India): The Deer Park near Varanasi where the Buddha preached his First Discourse (Dhammacakkappavattana Sutta), setting the Wheel of Dharma in motion.',
      '4. KUSHINAGAR (India): The tranquil sal grove of the Mallas where the Buddha passed into Mahaparinirvana (final unconditioned peace) at the age of 80.'
    ],
    keyFacts: [
      'Lumbini = Birth',
      'Bodh Gaya = Enlightenment (Bodhi)',
      'Sarnath = First Sermon (Dharmachakra Pravartana)',
      'Kushinagar = Final Passing (Parinirvana)'
    ],
    imageType: 'symbols'
  },
  {
    id: 'ashoka',
    title: 'Emperor Ashoka the Great',
    subtitle: 'Mauryan Emperor & Catalyst for Sacred Buddhist Heritage (Reigned c. 268–232 BCE)',
    era: 'Mauryan Empire, 3rd Century BCE',
    content: [
      'King Ashoka ruled the vast Mauryan Empire across almost the entirety of the Indian subcontinent. Deeply remorseful over the bloodshed of the Kalinga War, he embraced the teachings of the Buddha and replaced imperial conquest by military force (Vijaya) with conquest by Dharma (Dhammavijaya).',
      'Ashoka made a sacred pilgrimage to Bodh Gaya in his tenth regnal year (c. 260 BCE). He established the first shrine at Bodh Gaya, placed the polished Vajrasana, and erected monumental monolithic sandstone pillars throughout his empire.',
      'His stone pillars were crowned with symbolic animal capitals, most famously the Four Lions of Sarnath, which stands today as the official National Emblem of modern India.'
    ],
    keyFacts: [
      'Renounced war after the Kalinga conflict to champion non-violence (ahimsa).',
      'Erected monumental pillars of Chunar sandstone across ancient India.',
      'Dispatched diplomatic and cultural missions across Asia, the Mediterranean, and Sri Lanka.',
      'Commissioned the Diamond Throne at Bodh Gaya.'
    ],
    imageType: 'ashoka'
  },
  {
    id: 'architecture',
    title: 'Architectural Anatomy: Shikhara & Stupa',
    subtitle: 'Elements of Sacred Buddhist Monuments',
    era: 'Gupta, Post-Gupta, and Classical Indian Architecture',
    content: [
      'The architecture of Bodh Gaya bridges the transition from circular stupa mounds to soaring rectilinear temple shikharas.',
      'SHIKHARA: The stepped pyramid tower rising toward the heavens, symbolizing Mount Meru (the cosmological cosmic axis). Each horizontal tier features rows of decorative arches called "kudus" or "chaitya arches".',
      'AMALAKA & KALASHA: The crowning stone disc resembling an Indian amla fruit, topped by a vase finial (kalasha) and a crowning stupa spire.',
      'VEDIKA: The protective stone railing that demarcates the sacred circumambulation court from the mundane world, carved with lotus medallions and guardian figures.'
    ],
    keyFacts: [
      'Shikhara = Mountain-like sanctuary tower pointing to enlightenment.',
      'Amalaka = Ribbed circular cushion stone representing cosmic fruit.',
      'Kudus = Horseshoe-shaped decorative niches.',
      'Vedika = Sacred enclosure railing with lotus medallions.'
    ],
    imageType: 'architecture'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What world-historic event occurred at Bodh Gaya under the Bodhi tree?',
    options: [
      'Prince Siddhartha was born in a palace garden',
      'Siddhartha Gautama attained supreme Enlightenment (Bodhi)',
      'The Buddha delivered his First Sermon to five disciples',
      'Emperor Ashoka was crowned the ruler of Magadha'
    ],
    correctAnswer: 1,
    explanation: 'Bodh Gaya is the sacred place where Siddhartha Gautama meditated beneath the Ficus religiosa tree and attained complete awakening (Bodhi), becoming known as the Buddha.',
    historicalSource: 'UNESCO World Heritage Citation 2002; Buddhist Canon (Majjhima Nikaya)'
  },
  {
    id: 2,
    question: 'Which ancient Indian emperor established the stone "Vajrasana" (Diamond Throne) at Bodh Gaya in the 3rd century BCE?',
    options: [
      'King Chandragupta Maurya',
      'Emperor Harsha of Kannauj',
      'Emperor Ashoka the Great',
      'King Kanishka of the Kushans'
    ],
    correctAnswer: 2,
    explanation: 'Emperor Ashoka visited Bodh Gaya around 260 BCE and commissioned the carved, polished sandstone slab known as the Vajrasana to mark the Buddha’s meditation seat.',
    historicalSource: 'Ashokan Major Rock Edict VIII; Archaeological Survey of India (ASI)'
  },
  {
    id: 3,
    question: 'What is the sacred practice of walking clockwise around a temple or stupa called in ancient Sanskrit?',
    options: [
      'Pradaksina (Circumambulation)',
      'Ahimsa (Non-violence)',
      'Dharmachakra (Wheel of Law)',
      'Samadhi (Concentration)'
    ],
    correctAnswer: 0,
    explanation: 'Pradaksina is the reverent practice of circumambulating a sacred monument clockwise, keeping the holy structure on the devotee’s right side.',
    historicalSource: 'Classical Buddhist Ritual Literature; Monastic Vinaya Texts'
  },
  {
    id: 4,
    question: 'What distinctive building material makes the 55-meter tall Mahabodhi Temple spire rare and architecturally significant?',
    options: [
      'Solid white Makrana marble blocks',
      'Carved granite megaliths like south Indian temples',
      'Burnt red brick and mortar dating to the classical Gupta era',
      'Teak wood framework covered with bronze shingles'
    ],
    correctAnswer: 2,
    explanation: 'The Mahabodhi Temple is one of the earliest and tallest surviving brick architectural masterpieces in India, dating largely from the Gupta and post-Gupta eras (5th–6th centuries CE).',
    historicalSource: 'Archaeological Survey of India & UNESCO Architectural Survey'
  },
  {
    id: 5,
    question: 'Which of the following is ONE of the four primary Buddhist sacred sites associated with the Buddha\'s life?',
    options: [
      'Sarnath (Site of the First Sermon)',
      'Takshashila (Ancient University)',
      'Ajanta (Rock-cut Caves)',
      'Hampi (Vijayanagara Capital)'
    ],
    correctAnswer: 0,
    explanation: 'The Four Principal Sites are Lumbini (Birth), Bodh Gaya (Enlightenment), Sarnath (First Discourse), and Kushinagar (Parinirvana).',
    historicalSource: 'Mahaparinibbana Sutta (Digha Nikaya 16)'
  }
];
