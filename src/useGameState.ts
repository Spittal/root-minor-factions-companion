import { ref } from "vue";

export type MinorFaction = {
  id: number;
  title: string;
  titleDimished: string;
  imageUrl: string;
  imageUrlDiminished: string;
}

export type MinorFactionState = {
  minorFactionId: MinorFaction['id'];
  diminished: boolean;
  status: 'UNCONTROLLED' | 'CONTROLLED' | 'SECURED';
  controllingPosition?: number;
}

export type GameState = {
  minorFactions: MinorFactionState[];
  numberOfPositions?: number;
};

const blankState: GameState = { minorFactions: [], numberOfPositions: 2 }
const gameState = ref<GameState>(blankState);

export function useGameState () {
  function setPositions(numberOfPositions: number) {
    gameState.value.numberOfPositions = numberOfPositions;
  }

  function addMinorFaction(minorFactionId: number, diminished = false) {
    if (gameState.value.minorFactions.find(minorFaction => minorFaction.minorFactionId === minorFactionId)) {
      console.error('Minor faction already added');
      return;
    }

    gameState.value.minorFactions.push({
      minorFactionId,
      diminished: false,
      status: 'UNCONTROLLED',
    });
  }

  return {
    gameState,

    setPositions,
    addMinorFaction,
  };
}
