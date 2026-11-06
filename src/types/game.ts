/**
 * SACRED JOURNEY: Buddhist Sacred Places
 * Core Game Type Definitions
 */

export interface CharacterProfile {
  id: string;
  name: string;
  title: string;
  age: number;
  origin: string;
  specialty: string;
  bio: string;
  clothingColor: string;
  accentColor: string;
  backpackColor: string;
  hairColor: string;
  skinColor: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  location: string;
  objective: string;
  completed: boolean;
  xpReward: number;
  unlockedFact: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerRole: string;
  avatarIcon: string;
  text: string;
  historicalNote?: string;
  options: {
    text: string;
    nextNodeId?: string;
    action?: string;
  }[];
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  title: string;
  position: [number, number, number];
  rotationY: number;
  modelType: 'monk' | 'archaeologist' | 'pilgrim';
  robeColor?: string;
  dialogueTree: Record<string, DialogueNode>;
  initialDialogueId: string;
}

export interface InteractiveObject {
  id: string;
  name: string;
  type: 'throne' | 'tree' | 'pillar' | 'wheel' | 'lamp' | 'pond' | 'stupa';
  position: [number, number, number];
  interactionRadius: number;
  prompt: string;
  discovered: boolean;
  factTitle: string;
  factDescription: string;
  historicalEra: string;
  relicId?: string;
}

export interface Relic {
  id: string;
  name: string;
  era: string;
  material: string;
  description: string;
  culturalSignificance: string;
  icon: string;
  collected: boolean;
}

export interface JournalSection {
  id: string;
  title: string;
  subtitle: string;
  era: string;
  content: string[];
  keyFacts: string[];
  imageType: 'bodhgaya' | 'lumbini' | 'sarnath' | 'kushinagar' | 'ashoka' | 'architecture' | 'symbols';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  historicalSource: string;
}

export interface GameState {
  currentScreen: 'menu' | 'character_select' | 'playing' | 'paused';
  selectedCharacter: CharacterProfile;
  activeQuestId: string;
  quests: Quest[];
  discoveredObjects: string[];
  collectedRelics: string[];
  litLamps: string[];
  playerScore: number;
  playerLevel: number;
  playerXP: number;
  journalUnlocked: boolean;
  quizCompleted: boolean;
  quizScore: number;
  soundEnabled: boolean;
  ambientVolume: number;
  sfxVolume: number;
  activeDialogue: {
    npc: NPC;
    currentNode: DialogueNode;
  } | null;
  inspectedObject: InteractiveObject | null;
  activeModal: 'none' | 'journal' | 'quests' | 'quiz' | 'relics' | 'dialogue' | 'inspect';
}
