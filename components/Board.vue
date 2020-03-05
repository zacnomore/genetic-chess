<template>
  <div class="board-container">
    <div class="board">
      <div v-for="location in (rows * columns)" :key="location" class="square" :class="calculateColor(location, columns)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.component('board', {
  data () {
    return {
      rows: 8,
      columns: 8
    }
  },
  methods: {
    calculateColor (location: number, numPerRow: number) {
      const zeroIndexedLocation = location - 1
      const alternateRow = (loc: number) => Math.floor(loc / numPerRow) % 2
      const isDark = (zeroIndexedLocation + alternateRow(zeroIndexedLocation)) % 2 !== 0
      return {
        dark: isDark,
        light: !isDark
      }
    }
  }
})
</script>

<style lang="scss" scoped>
$board-dark: rgb(40, 40, 40);
$board-light: rgb(240, 240, 240);

.board-container {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}

.board {
  border: 2px solid $board-dark;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-columns: repeat(8, 1fr);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.square {

  &.light {
    background: $board-light;
  }

  &.dark {
    background: $board-dark;
  }

}
</style>
