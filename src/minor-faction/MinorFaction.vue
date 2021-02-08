<script lang="ts">
import { defineComponent, ref } from 'vue';
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
      swayToPosition,
      toggleDimished,
    } = useMinorFaction(props.minorFactionId);

    const expanded = ref(false);
    function toggleExpanded () {
      expanded.value = !expanded.value;
    }

    return {
      minorFaction,
      imageUrl,
      statusImageUrl,
      swayToPosition,
      toggleDimished,
      expanded,
      toggleExpanded
    };
  },
});
</script>

<template>
  <div @click="toggleExpanded" class="minor-faction">
    <img class="card" :src="imageUrl">
    <img class="marker" v-if="statusImageUrl" :src="statusImageUrl" />
  </div>

  <teleport v-if="expanded" to="body">
    <div @click="toggleExpanded" class="modal">
      <button @click="swayToPosition(2)">Position 2</button>
      <div class="rotate-wrapper" :class="`-position-${minorFaction.state?.controllingPosition}`">
        <h2 v-if="minorFaction.state?.controllingPosition">OWNED BY {{ minorFaction.state?.controllingPosition }}</h2>
        <img class="marker" v-if="statusImageUrl" :src="statusImageUrl" />
        <img class="card" :src="imageUrl">
      </div>
      <button @click="swayToPosition(1)">Position 1</button>
    </div>
  </teleport>
</template>

<style lang="postcss" scoped>
.minor-faction {
  position: relative;
  display: inline-block;
  cursor: pointer;

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

.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000AA;

  & h2 {
    color: white;
  }

  & img {
    width: 100%;
  }

  & .marker {
    width: 30%;
  }

  & .rotate-wrapper {
    text-align: center;

    &.-position-2 {
      transform-origin: center;
      transform: rotate(180deg);
    }
  }
}
</style>
