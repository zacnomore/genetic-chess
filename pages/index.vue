<template>
  <div class="container">
    <div class="board-area">
      <board />
    </div>
  </div>
</template>

<script>
import Board from '~/components/Board'

export default {
  components: {
    Board
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.board-area {
  width: 80%;
}

@media screen and (min-width: 800px){
  .board-area {
    width: 40%;
  }
}

</style>
