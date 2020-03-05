<template>
  <div class="board-container">
    <div class="board">
      <div
        v-for="location in (rows * columns)"
        :key="location"
        class="square"
        :class="[colorClasses(location), pieceClasses(location)]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

enum Pieces {
  White = 'W',
  Black = 'B'
}

const rows = 8
const columns = 8
export default Vue.component('board', {
  data () {
    return {
      rows,
      columns,
      pieces: Array(rows).fill(null).map(
        () => Array(columns).fill(null)
      )
    }
  },
  created () {
    // In lieu of a declarative approach :/
    this.pieces[1].fill(Pieces.Black)
    this.pieces[6].fill(Pieces.White)
  },
  methods: {
    locationToGridPosition (location: number): [number, number] {
      const zeroIndexedLocation = location - 1
      return [Math.floor(zeroIndexedLocation / rows), zeroIndexedLocation % columns]
    },
    colorClasses (location: number): {[key: string]: boolean} {
      const zeroIndexedLocation = location - 1
      const alternateRow = (loc: number) => Math.floor(loc / rows) % 2
      const isDark = (zeroIndexedLocation + alternateRow(zeroIndexedLocation)) % 2 !== 0
      return {
        dark: isDark,
        light: !isDark
      }
    },
    pieceClasses (location: number): {[key: string]: boolean} {
      const position = this.locationToGridPosition(location)
      return {
        'contains-black': this.pieces[position[0]][position[1]] === Pieces.Black,
        'contains-white': this.pieces[position[0]][position[1]] === Pieces.White
      }
    }
  }
})
</script>

<style lang="scss" scoped>
$board-dark: rgb(216, 152, 99);
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

  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;

  &.contains-black {
    background-image: url("~assets/pieces/black-pawn.svg");
  }

  &.contains-white {
    background-image: url("~assets/pieces/white-pawn.svg");
  }

  &.light {
    background-color: $board-light;
  }

  &.dark {
    background-color: $board-dark;
  }

}
</style>
