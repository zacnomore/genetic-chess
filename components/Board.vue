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
import { Chess } from 'chess.js'

const rows = 8
const columns = 8
export default Vue.component('board', {
  props: {
    position: {
      type: Object,
      default () {
        return new Chess('8/pppppppp/8/8/8/8/PPPPPPPP/8 w - - 0 1')
      }
    }
  },
  data () {
    return {
      rows,
      columns
    }
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
    pieceClasses (location: number): {[key: string]: boolean } {
      const board = this.position.board()
      const gridPosition = this.locationToGridPosition(location)
      const piece = board[gridPosition[0]][gridPosition[1]]
      if (piece) {
        const isWhite = piece.color === 'w'
        return {
          'contains-black': !isWhite,
          'contains-white': isWhite
        }
      }
      return {}
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

{t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAABHNCSVQICAgIfAhkiAAAAP9JREFUaIHt1MENwjAMhWGXCTICIzACo2QzODEACzACzNAFOHF+HGgkK5SSNqYO0vvvcT5FrUUYY4wxxt4DEADsfjB3bz1TDw8ArgDulngAEa8OpWc2C+7pRCSIyMUCDyCKSAJ3tfOmLgoAbsMLVb28emkAOFo6P11YjV8drS5ejHdDK8BsvDtaQYrxzaAV6Cu+OXRqCt8sOjWGbx6dyvCPv0CnBnyv0GdvU1HZ51G8Kl3L0KfSVena2I9Ysipdm9oezeJLVl5z+Dl7uhn8HLQ644tfglZnffA1aDVjXbwFWs1aBw9ga4VWM3N8sJg7dlG0QquZCR8t5zLGGGMs9QTh98tvN/AqDAAAAABJRU5ErkJggg=="},function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjYgKDY3NDkxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5VSS9jaGVja2JveCsgQ29weSAzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlByb21vX0JpbGxib2FyZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlByb21vLUJpbGxib2FyZC12MWItLS0xOTIwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQxMi4wMDAwMDAsIC04MDMuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJVSS9jaGVja2JveCstTEctQWN0aXZlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDEyLjAwMDAwMCwgODAzLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9ImJveCI+CiAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLjUsMC41IEwwLjUsMzkuNSBMMzkuNSwzOS41IEwzOS41LDAuNSBMMC41LDAuNSBaIiBpZD0iUmVjdGFuZ2xlLTIiIHN0cm9rZT0iIzI2MjMyMyIgZmlsbD0iIzAwN0U3RSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuMjc0NjExNCwxNC4wMDA1ODU5IEMyNC4zODM0MTk3LDE0LjU2MTM0OTYgMjMuMjIyNzk3OSwxNS43Mjc3MzgyIDIyLjQ1NTk1ODUsMTYuNDY3OTQ2NCBDMjAuOTIyMjc5OCwxNy45NDgzNjI3IDE5LjQ1MDc3NzIsMTkuNDk2MDcwNyAxOCwyMS4wNjYyMDkyIEwxNS4wOTg0NDU2LDE4LjMyOTY4MjEgTDE0LDE5LjQ5NjA3MDcgQzE1LjU5NTg1NDksMjEuMjIzMjIzIDE3LjMxNjA2MjIsMjMuMDg0OTU4NyAxOC43MjUzODg2LDI1LjAxMzk4NiBDMjAuNTI4NDk3NCwyMS44MDY0MTczIDIzLjQ3MTUwMjYsMTcuMjA4MTU0NSAyNiwxNC43ODU2NTUxIEMyNS45MTcwOTg0LDE0LjYwNjIxMDcgMjUuNTY0NzY2OCwxMy45NzgxNTUzIDI1LjI3NDYxMTQsMTQuMDAwNTg1OSBaIiBpZD0iVHJ1ZS1Db3B5LTQiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="},function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjYgKDY3NDkxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5VSS9jaGVja2JveCsgTEc8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUHJvbW9fQmlsbGJvYXJkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iUHJvbW8tQmlsbGJvYXJkLXYxYS0tLTE5MjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNDEyLjAwMDAwMCwgLTgwMy4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IlVJL2NoZWNrYm94Ky1MRyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQxMi4wMDAwMDAsIDgwMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJib3giIHN0cm9rZT0iIzk5OTk5OSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAuNSwwLjUgTDAuNSwzOS41IEwzOS41LDM5LjUgTDM5LjUsMC41IEwwLjUsMC41IFoiIGlkPSJSZWN0YW5nbGUtMiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMi4wMDAwMDAsIDEyLjAwMDAwMCkiIGZpbGw9IiMwMDgwODAiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtNTgiIHg9IjAiIHk9IjciIHdpZHRoPSIxNiIgaGVpZ2h0PSIyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS01OC1Db3B5IiB4PSI3IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="},function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjYgKDY3NDkxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5hcnJvd3MvNTAtY2lyY2xlLXJpZ2h0LWJyYW5kPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlByb21vX0JpbGxib2FyZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlByb21vLUJpbGxib2FyZC12MWEtLS0xOTIwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgxNC4wMDAwMDAsIC04MTYuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJQcm9tby1CaWxsYm9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xLjAwMDAwMCwgMTQ0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlByb21vLVRpbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzODQuMDAwMDAwLCAxNTMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTE2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzIuMDAwMDAwLCA1MTcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJhcnJvd3MvMjAwLWNpcmNsZS1yaWdodC1icmFuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTkuMDAwMDAwLCAyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9ImFycm93cy8yMDAtY2lyY2xlLWxlZnQtYnJhbmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtOC4wMDAwMDAsIC04LjAwMDAwMCkgIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMTgiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMiIgZmlsbD0iIzAwN0U3RSIgY3g9IjgiIGN5PSI4IiByPSI4Ij48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik03LDUgTDcsMTAgTDEyLDEwIEwxMiwxMSBMNiwxMSBMNiw1IEw3LDUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlLUNvcHkiIHN0cm9rZT0iI0ZGRkZGRiIgZmlsbD0iI0ZGRkZGRiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOS4wMDAwMDAsIDguMDAwMDAwKSByb3RhdGUoLTMxNS4wMDAwMDApIHRyYW5zbGF0ZSgtOS4wMDAwMDAsIC04LjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA7CAYAAAATgCjWAAAABHNCSVQICAgIfAhkiAAAAeBJREFUaIHtmLFNA0EQAPcRGQkdQAe4A1yCS3AHuARnuAJTAUQEJASQE0FAaAQNQGIkw9svIQ3Br+E4Dvb9fmyCHcmSX7rbnd3bv+BFGgDYBrabiLU0wJCSqf5fj5h25RqY8EkBjFYuBbSAe2DGd3LgFWitSqajSUOKhNwM6P61zIEmD5mqZEtFQ7EJMPwrmeOoMzPgITwanau7SHqis9bMXGmSUSLJzU9JgJOE/OPSc6XH8KrHEsocVdjbSxzvGOjUlelqgNqDCrRJvwCHi8oMtTMheZ2Wa5cfom7lwIU5VzovF1FVBeWg7i4qE8W9TMQd/RgX2KW87OJKTn6rRPftm9WWawd8vdnRk2jHC9uJIyqAgZHgSBOMgZcqXaSczedEru58QYvvt+wzFd6GxD7z7QtyPkX7c6AnlPfJnJkuNIeXci7i9p9WEQr230Qnk0sU9IkFblTKQZ0HnFYpJBHjPKxIogpvawTsAP06Mrq/Hwps1gkSkmXZmYicLRtnzkZTgZrChSxcyMKFLFzIwoUsXMjChSxcyMKFLFzIwoUsXMjChSxcyMKFLFzIwoUs/p1Q/NFzC9hfscNO+JABBM8vIvK2Wh8REfn4Np7pt+m9NUgk2RCRvogU+lsnuYhcvQOGw5S4vsqhFQAAAABJRU5ErkJggg=="},function(t,e){},f
