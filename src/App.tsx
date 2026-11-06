/**
 * SACRED JOURNEY: Buddhist Sacred Places
 * Main Game Coordinator Application
 */
import React, { useState, useEffect, useCallback } from 'react';
import { CharacterProfile, Quest, NPC, InteractiveObject, Relic, DialogueNode } from './types/game';
import {
  CHARACTERS,
  INITIAL_QUESTS,
  NPCS,
  INTERACTIVE_OBJECTS,
  RELICS
} from './data/buddhistSacredPlaces';
import { soundManager } from './utils/audio';

import { World3D } from './components/3d/World3D';
import { MainMenu } from './components/ui/MainMenu';
import { CharacterSelectModal } from './components/ui/CharacterSelectModal';
import { HUD } from './components/ui/HUD';
import { DialogueModal } from './components/ui/DialogueModal';
import { JournalModal } from './components/ui/JournalModal';
import { QuestModal } from './components/ui/QuestModal';
import { QuizModal } from './components/ui/QuizModal';
import { InspectModal } from './components/ui/InspectModal';
import { PauseMenu } from './components/ui/PauseMenu';
import { MobileControls } from './components/ui/MobileControls';

export default function App() {
  // Screen state
  const [currentScreen, setCurrentScreen] = useState<'menu' | 'playing'>('menu');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showCharacterSelect, setShowCharacterSelect] = useState<boolean>(false);

  // Character selection
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterProfile>(CHARACTERS[0]);

  // Game data state
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [activeQuestId, setActiveQuestId] = useState<string>('q1');
  const [discoveredObjectIds, setDiscoveredObjectIds] = useState<string[]>([]);
  const [collectedRelicIds, setCollectedRelicIds] = useState<string[]>([]);
  const [litLamps, setLitLamps] = useState<string[]>([]);

  // Explorer XP & Level
  const [playerXP, setPlayerXP] = useState<number>(50);
  const [playerLevel, setPlayerLevel] = useState<number>(1);

  // Audio settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [ambientVolume, setAmbientVolume] = useState<number>(0.35);
  const [sfxVolume, setSfxVolume] = useState<number>(0.65);

  // Modals state
  const [activeModal, setActiveModal] = useState<
    'none' | 'journal' | 'quests' | 'quiz' | 'relics' | 'dialogue' | 'inspect'
  >('none');
  const [activeDialogue, setActiveDialogue] = useState<{ npc: NPC; currentNode: DialogueNode } | null>(null);
  const [inspectedObject, setInspectedObject] = useState<InteractiveObject | null>(null);
  const [newlyDiscoveredRelic, setNewlyDiscoveredRelic] = useState<Relic | undefined>(undefined);

  // Mobile virtual joystick vector
  const [mobileMoveVector, setMobileMoveVector] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update level based on XP
  useEffect(() => {
    const level = Math.floor(playerXP / 200) + 1;
    setPlayerLevel(level);
  }, [playerXP]);

  // Audio sync
  useEffect(() => {
    soundManager.setVolumes(ambientVolume, sfxVolume, !soundEnabled);
  }, [soundEnabled, ambientVolume, sfxVolume]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentScreen !== 'playing') return;

      if (e.key.toLowerCase() === 'j') {
        soundManager.playClick();
        setActiveModal((cur) => (cur === 'journal' ? 'none' : 'journal'));
      } else if (e.key.toLowerCase() === 'q') {
        soundManager.playClick();
        setActiveModal((cur) => (cur === 'quests' ? 'none' : 'quests'));
      } else if (e.key === 'Escape') {
        soundManager.playClick();
        if (activeModal !== 'none') {
          setActiveModal('none');
          setActiveDialogue(null);
          setInspectedObject(null);
        } else {
          setIsPaused((p) => !p);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, activeModal]);

  // Complete a quest helper
  const completeQuest = useCallback((questId: string, nextQuestId?: string) => {
    setQuests((prevQuests) =>
      prevQuests.map((q) => {
        if (q.id === questId && !q.completed) {
          soundManager.playQuestCompleteFanfare();
          setPlayerXP((xp) => xp + q.xpReward);
          return { ...q, completed: true };
        }
        return q;
      })
    );

    if (nextQuestId) {
      setActiveQuestId(nextQuestId);
    }
  }, []);

  // Handle NPC interaction
  const handleInteractNPC = useCallback((npc: NPC) => {
    const startNode = npc.dialogueTree[npc.initialDialogueId];
    if (startNode) {
      setActiveDialogue({ npc, currentNode: startNode });
      setActiveModal('dialogue');
    }
  }, []);

  // Handle Dialogue Option Click
  const handleSelectDialogueOption = (option: { text: string; nextNodeId?: string; action?: string }) => {
    if (!activeDialogue) return;

    // Perform game action if present
    if (option.action === 'COMPLETE_Q1') {
      completeQuest('q1', 'q2');
    } else if (option.action === 'COMPLETE_Q4') {
      completeQuest('q4', 'q5');
    } else if (option.action === 'START_LAMPS') {
      setActiveQuestId('q3');
    }

    if (option.nextNodeId && activeDialogue.npc.dialogueTree[option.nextNodeId]) {
      setActiveDialogue({
        npc: activeDialogue.npc,
        currentNode: activeDialogue.npc.dialogueTree[option.nextNodeId],
      });
    } else {
      // Close dialogue
      setActiveDialogue(null);
      setActiveModal('none');
    }
  };

  // Handle Interactive Object Click / Inspection
  const handleInteractObject = useCallback(
    (obj: InteractiveObject) => {
      // If it's a butter lamp:
      if (obj.type === 'lamp') {
        if (!litLamps.includes(obj.id)) {
          const updatedLamps = [...litLamps, obj.id];
          setLitLamps(updatedLamps);
          soundManager.playDiscoveryChime();
          setPlayerXP((xp) => xp + 40);

          // If all 4 lamps are lit, complete Quest 3!
          if (updatedLamps.length >= 4) {
            completeQuest('q3', 'q4');
          }
        }
      }

      // Check if this object contains a relic
      let relicObj: Relic | undefined;
      let newlyFound = false;
      if (obj.relicId) {
        relicObj = RELICS.find((r) => r.id === obj.relicId);
        if (relicObj && !collectedRelicIds.includes(relicObj.id)) {
          setCollectedRelicIds((prev) => [...prev, relicObj!.id]);
          newlyFound = true;
          soundManager.playDiscoveryChime();
          setPlayerXP((xp) => xp + 60);
        }
      }

      // Mark object as discovered
      if (!discoveredObjectIds.includes(obj.id)) {
        setDiscoveredObjectIds((prev) => [...prev, obj.id]);
        setPlayerXP((xp) => xp + 50);
      }

      // Special quest trigger for Vajrasana
      if (obj.id === 'obj_vajrasana') {
        completeQuest('q2', 'q3');
      }

      // Open inspection modal
      setInspectedObject(obj);
      setNewlyDiscoveredRelic(relicObj);
      setActiveModal('inspect');
    },
    [litLamps, collectedRelicIds, discoveredObjectIds, completeQuest]
  );

  // Handle Quiz completion
  const handleQuizComplete = (scorePct: number) => {
    if (scorePct >= 80) {
      completeQuest('q5');
      setPlayerXP((xp) => xp + 150);
    }
  };

  const activeQuest = quests.find((q) => q.id === activeQuestId);
  const completedQuestsCount = quests.filter((q) => q.completed).length;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-stone-950 font-sans text-stone-100 select-none">
      {/* 1. MAIN MENU SCREEN */}
      {currentScreen === 'menu' && (
        <MainMenu
          selectedCharacter={selectedCharacter}
          onStartGame={() => setCurrentScreen('playing')}
          onOpenCharacterSelect={() => setShowCharacterSelect(true)}
          onOpenJournal={() => setActiveModal('journal')}
          onOpenQuiz={() => setActiveModal('quiz')}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />
      )}

      {/* 2. PLAYING 3D EXPEDITION WORLD */}
      {currentScreen === 'playing' && (
        <>
          {/* The 3D Canvas Scene */}
          <World3D
            character={selectedCharacter}
            npcs={NPCS}
            interactiveObjects={INTERACTIVE_OBJECTS}
            litLamps={litLamps}
            onInteractNPC={handleInteractNPC}
            onInteractObject={handleInteractObject}
            movementVector={mobileMoveVector}
          />

          {/* In-Game HUD (Collapsible bottom dock, active quest tracker) */}
          <HUD
            character={selectedCharacter}
            activeQuest={activeQuest}
            completedQuestsCount={completedQuestsCount}
            totalQuestsCount={quests.length}
            playerLevel={playerLevel}
            playerXP={playerXP}
            litLampsCount={litLamps.length}
            relicsCount={collectedRelicIds.length}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            onOpenJournal={() => setActiveModal('journal')}
            onOpenQuests={() => setActiveModal('quests')}
            onOpenQuiz={() => setActiveModal('quiz')}
            onOpenRelics={() => setActiveModal('journal')}
            onOpenPause={() => setIsPaused(true)}
          />

          {/* Touch / Mobile Controls */}
          <MobileControls
            onDirectionChange={(v) => setMobileMoveVector(v)}
            onInteract={() => {
              // Trigger interaction with closest object or NPC
              const closestObj = INTERACTIVE_OBJECTS[0];
              if (closestObj) handleInteractObject(closestObj);
            }}
          />
        </>
      )}

      {/* 3. MODALS & OVERLAYS */}
      {/* Character Selection Modal */}
      {showCharacterSelect && (
        <CharacterSelectModal
          selectedCharacter={selectedCharacter}
          onSelectCharacter={(c) => setSelectedCharacter(c)}
          onClose={() => setShowCharacterSelect(false)}
        />
      )}

      {/* NPC Dialogue Modal */}
      {activeModal === 'dialogue' && activeDialogue && (
        <DialogueModal
          npc={activeDialogue.npc}
          currentNode={activeDialogue.currentNode}
          onSelectOption={handleSelectDialogueOption}
          onClose={() => {
            setActiveDialogue(null);
            setActiveModal('none');
          }}
        />
      )}

      {/* Object Inspection Modal */}
      {activeModal === 'inspect' && inspectedObject && (
        <InspectModal
          object={inspectedObject}
          relic={newlyDiscoveredRelic}
          isRelicNewlyCollected={
            newlyDiscoveredRelic ? collectedRelicIds.includes(newlyDiscoveredRelic.id) : false
          }
          onClose={() => {
            setInspectedObject(null);
            setActiveModal('none');
          }}
        />
      )}

      {/* Knowledge Journal Modal */}
      {activeModal === 'journal' && (
        <JournalModal
          collectedRelicIds={collectedRelicIds}
          onClose={() => setActiveModal('none')}
        />
      )}

      {/* Quests Log Modal */}
      {activeModal === 'quests' && (
        <QuestModal
          quests={quests}
          activeQuestId={activeQuestId}
          onClose={() => setActiveModal('none')}
        />
      )}

      {/* Sacred Heritage Quiz Modal */}
      {activeModal === 'quiz' && (
        <QuizModal
          onQuizComplete={handleQuizComplete}
          onClose={() => setActiveModal('none')}
        />
      )}

      {/* Pause Menu */}
      {isPaused && (
        <PauseMenu
          soundEnabled={soundEnabled}
          ambientVolume={ambientVolume}
          sfxVolume={sfxVolume}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onChangeAmbientVolume={(v) => setAmbientVolume(v)}
          onChangeSfxVolume={(v) => setSfxVolume(v)}
          onResume={() => setIsPaused(false)}
          onRestart={() => {
            setLitLamps([]);
            setQuests(INITIAL_QUESTS);
            setActiveQuestId('q1');
            setDiscoveredObjectIds([]);
            setCollectedRelicIds([]);
            setPlayerXP(50);
            setIsPaused(false);
          }}
          onReturnToMainMenu={() => {
            soundManager.stopMeditationDrone();
            setIsPaused(false);
            setCurrentScreen('menu');
          }}
        />
      )}
    </div>
  );
}
