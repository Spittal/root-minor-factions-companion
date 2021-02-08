<script lang="ts">
import { defineComponent } from 'vue';
import MinorFaction from './minor-faction/MinorFaction.vue';
import { useGameState } from './useGameState';

export default defineComponent({
  components: {
    MinorFaction,
  },
  setup () {
    const { gameState, addMinorFaction } = useGameState();

    addMinorFaction(1);

    return {
      gameState,
    }
  }
});
</script>

<template>
  <MinorFaction
    v-for="minorFaction in gameState.minorFactions"
    :key="minorFaction.minorFactionId"
    :minorFactionId="minorFaction.minorFactionId"
  />
</template>

<style lang="postcss">
@import 'app.css';
</style>
