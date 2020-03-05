<template>
  <div class="container">
    <div class="board-set" :style="gridStyle">
      <board
        v-for="boardCount in numBoards"
        :key="boardCount"
      />
    </div>
  </div>
</template>

<script>
import Board from '~/components/Board'

export default {
  components: {
    Board
  },
  data () {
    return {
      numBoards: 16
    }
  },
  computed: {
    gridStyle () {
      const cols = Math.floor(Math.sqrt(this.numBoards))
      return `grid-template-columns: repeat(${cols}, 1fr)`
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.board-set {
  width: 80vw;
  display: grid;
  gap: 10px;

}
</style>
