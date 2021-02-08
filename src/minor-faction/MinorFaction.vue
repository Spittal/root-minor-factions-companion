<script lang="ts">
import { defineComponent } from 'vue';
import { useMinorFaction } from './useMinorFaction';

export default defineComponent({
  props: {
    minorFactionId: {
      type: Number,
      required: true,
    },
  },
  setup (props) {
    const {
      minorFaction,
      imageUrl,
      statusImageUrl,
      swayToPlayer,
      toggleDimished,
    } = useMinorFaction(props.minorFactionId);
    return {
      minorFaction,
      imageUrl,
      statusImageUrl,
      swayToPlayer,
      toggleDimished,
    };
  },
});
</script>

<template>
  <div class="minor-faction">
    <img class="card" :src="imageUrl">
    <img class="marker" v-if="statusImageUrl" :src="statusImageUrl" />
    <button @click="swayToPlayer(1)">Sway P1</button>
    <button @click="swayToPlayer(2)">Sway P2</button>
    <p>Owned by Player {{ minorFaction.state?.controllingPlayer }}</p>
  </div>
</template>

<style lang="postcss" scoped>
.minor-faction {
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 50%;

  & .card {
    display: block;
    width: 100%;
    height: 100%;
    box-shadow: 1px 1px 3px #AAAAAA;
    object-fit: fill;
  }

  & .marker {
    position: absolute;
    width: 25%;
    top: 25%;
    right: 0;
    transform: translate(50%, -50%);
    border-radius: 100%;
    box-shadow: 0px 4px 3px #777777;
  }
}
</style>
