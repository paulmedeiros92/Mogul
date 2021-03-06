<template>
  <div class="game-portrait" v-on:click="$emit('click', shortCode)">
    <img class="game-cover" :src=imageUrl />
    <div class="title">{{ name }}</div>
    <div v-if="!selected" id="game-screen"></div>
  </div>
</template>

<script>

export default {
  name: 'GamePortrait',
  props: {
    name: String,
    imageUrl: String,
    shortCode: String,
    selectedGame: String,
  },
  data() {
    return {
      selected: false,
    }
  },
  mounted() {
    this.isSelected();
  },
  methods: {
    isSelected() {
      this.selected = this.shortCode === this.selectedGame;
    }
  },
  watch: {
    'selectedGame': function() {
      this.isSelected();
    }
  },
}
</script>

<style>
.game-portrait {
  margin: 0 1rem 0 1rem;
  background-color: #1e2d3a;
  border-radius: .25rem;
  box-shadow: 0 3px 6px rgb(0 0 0 / 8%);
  width: 8rem;
  height: 100%;
}

.game-cover {
  height: 10rem;
  width: 8rem;
  border-radius: .25rem;
}
.title {
  font-size: .5rem;
  max-width: 8rem;
  overflow: hidden;
  color: white;
  font-family: Montserrat;
  padding: 0 0 .5rem .5rem;
}

#game-screen {
  height: 100%;
  background: linear-gradient(90deg,#101e29,#112331);
  z-index: 1;
  position: relative;
  width: 100%;
  top: -100%;
  opacity: .7;
}
</style>
