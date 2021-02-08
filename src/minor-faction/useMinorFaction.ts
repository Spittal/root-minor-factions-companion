import { computed } from 'vue';
import minorFactions from '../minorFactions.json';
import { useGameState } from '../useGameState';

export function useMinorFaction (minorFactionid: number) {
  const { gameState } = useGameState();

  const state = computed(() => {
    return gameState.value.minorFactions.find(minorFaction => minorFaction.minorFactionId === minorFactionid);
  });
  const minorFaction = computed(() => {
    return {
      ...minorFactions.find(minorFaction => state.value?.minorFactionId === minorFaction.id),
      state: state.value,
    };
  });

  const imageUrl = computed(() => {
    return (state.value?.diminished) ? minorFaction.value.imageUrlDiminished : minorFaction.value.imageUrl;
  });

  const statusImageUrl = computed(() => {
    if (state.value?.status === 'SECURED') return '/secured.png';
    if (state.value?.status === 'CONTROLLED') return '/controlled.png';
  });

  function swayToPlayer (player: number) {
    if (!state.value) return;

    if (state.value.controllingPlayer === player) {
      if (state.value.status === 'CONTROLLED') state.value.status = 'SECURED';
      else if (state.value.status === 'SECURED') console.warn(`Player ${player} already has secured ${minorFaction.value?.title}`);
    } else {
      if (state.value.status === 'SECURED') {
        state.value.status = 'CONTROLLED';
      } else if (state.value.status === 'CONTROLLED') {
        state.value.controllingPlayer = player;
        state.value.status = 'CONTROLLED';
      } else if (state.value.status === 'UNCONTROLLED') {
        state.value.controllingPlayer = player;
        state.value.status = 'CONTROLLED';
      }
    }
  }

  function toggleDimished () {
    if (!state.value) return;
    state.value.diminished = !state.value.diminished;
  }

  return {
    minorFaction,
    imageUrl,
    statusImageUrl,
    swayToPlayer,
    toggleDimished,
  }
}
