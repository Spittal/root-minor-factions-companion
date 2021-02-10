<script lang="ts">
import { computed, defineComponent } from 'vue';
import MinorFaction from './minor-faction/MinorFaction.vue';
import InfluenceDie from './InfluenceDie.vue';
import { MinorFactionState, useGameState } from './useGameState';

export default defineComponent({
  components: {
    MinorFaction,
    InfluenceDie,
  },
  setup () {
    const { gameState, addMinorFaction } = useGameState();

    const controlledMinorFactionsByPosition = computed(() => {
      return gameState.value.minorFactions.reduce((accumulator, minorFaction) => {
        if (!minorFaction.controllingPosition) return accumulator;

        const position = minorFaction.controllingPosition;
        if (accumulator.has(position)) {
          const existingStates = accumulator.get(position);
          if (!existingStates) return accumulator;
          accumulator.set(position, [ ...existingStates, minorFaction ])
        } else {
          accumulator.set(position, [ minorFaction ]);
        }
        return accumulator;
      }, new Map<number, MinorFactionState[]>());
    });

    const uncontrolledMinorFactions = computed(() => {
      return gameState.value.minorFactions.filter(minorFaction => {
        return minorFaction.status === 'UNCONTROLLED';
      });
    });

    function getPositionClass (minorFaction: MinorFactionState) {
      if (minorFaction.controllingPosition === 2) {
        return 'p2';
      }
    }

    addMinorFaction(1);
    addMinorFaction(6);
    addMinorFaction(3);
    addMinorFaction(2);

    return {
      gameState,
      addMinorFaction,
      getPositionClass,
      controlledMinorFactionsByPosition,
      uncontrolledMinorFactions,
    }
  }
});
</script>

<template>
  <main>
    <div
      class="position-grid"
      v-for="[ position, minorFactions ] in controlledMinorFactionsByPosition"
      :class="`position-${position}`"
    >
      <MinorFaction
        v-for="minorFaction in minorFactions"
        :key="minorFaction.minorFactionId"
        :minorFactionId="minorFaction.minorFactionId"
      />
    </div>

    <div class="uncontrolled-grid">
      <MinorFaction
        v-for="minorFaction in uncontrolledMinorFactions"
        :key="minorFaction.minorFactionId"
        :minorFactionId="minorFaction.minorFactionId"
      />
    </div>

    <div class="influence-die">
      <InfluenceDie />
    </div>
  </main>
</template>

<style lang="postcss">
@import './app.css';

main {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  max-width: 80rem;
}

.position-grid {
  display: grid;
  position: absolute;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  height: 45%;

  & *:first-child {
    grid-row-start: 2;
  }

  & *:nth-child(2) {
    grid-row-start: 2;
  }

  &.position-1 {
    top: 55%;
    left: 0;
  }

  &.position-2 {
    top: 0;
    left: 0;
    transform-origin: center;
    transform: rotate(180deg);
  }
}

.uncontrolled-grid {
  position: absolute;
  top: 50%;
  left: 10%;
  width: 90%;
  height: auto;
  transform: translate(0, -50%);
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;

  & > * {
    width: 50%;
    height: 50%;
  }
}

.influence-die {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 10%;
  width: 10%;
}
</style>
