<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup () {
    const currentSide = ref('/die/0-1.png');
    function getSide () {
      const number = Math.floor(Math.random() * 6);
      console.log(`Rolled side ${number}`);
      switch (number) {
        default:
        case 1:
        case 2:
          return '/die/0-1.png';
        case 3:
          return '/die/1-2.png';
        case 4:
          return '/die/3-2.png';
        case 5:
          return '/die/5-3.png';
        case 6:
          return '/die/7-3.png';
      }
    }

    function rollThemBones () {
      currentSide.value = getSide();
    }

    return {
      currentSide,
      rollThemBones,
    };
  },
});
</script>

<template>
  <button>
    <img @click="rollThemBones" :src="currentSide">
  </button>
</template>

<style lang="postcss" scoped>
button {
  all: unset;

  & img {
    width: 100%;
  }
}
</style>
