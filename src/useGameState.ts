import { ref } from "vue";

export type MinorFaction = {
  id: number;
  title: string;
  imageUrl: string;
  imageUrlDiminished: string;
}

export type MinorFactionState = {
  minorFactionId: MinorFaction['id'];
  diminished: boolean;
  status: 'UNCONTROLLED' | 'CONTROLLED' | 'SECURED';
  controllingPlayer?: number;
}

export type GameState = {
  minorFactions: MinorFactionState[];
  numberOfPlayers?: number;
};

const blankState: GameState = { minorFactions: [] }
const gameState = ref<GameState>(blankState);

export function useGameState () {
  function setPlayers (numberOfPlayers: number) {
    gameState.value.numberOfPlayers = numberOfPlayers;
  }

  function addMinorFaction (minorFactionId: number, diminished = false) {
    gameState.value.minorFactions.push({
      minorFactionId,
      diminished: false,
      status: 'UNCONTROLLED',
    });
  }

  return {
    gameState,

    setPlayers,
    addMinorFaction,
  };
}
