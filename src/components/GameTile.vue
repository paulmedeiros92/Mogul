<template>
  <div :class="[$style.gameTile]" v-on:click="$emit('click', shortCode)">
    <img :class="[$style.gameCover]" :src="imageUrl" />
    <div :class="[$style.title]">{{ name }}</div>
    <div v-if="!selected" :id="[$style.gameScreen]"></div>
  </div>
</template>

<script>
export default {
  name: "GameTile",
  props: {
    name: String,
    imageUrl: String,
    shortCode: String,
    selectedGame: String
  },
  data() {
    return {
      selected: false
    };
  },
  mounted() {
    this.$_isSelected();
  },
  methods: {
    $_isSelected() {
      this.selected = this.shortCode === this.selectedGame;
    }
  },
  watch: {
    selectedGame: function() {
      this.$_isSelected();
    }
  }
};
</script>

<style module>
.gameTile {
  margin: 0 1rem 0 1rem;
  background-color: #1e2d3a;
  border-radius: 0.25rem;
  box-shadow: 0 3px 6px rgb(0 0 0 / 8%);
  width: 8rem;
  height: 100%;
}

.gameCover {
  height: 10rem;
  width: 8rem;
  border-radius: 0.25rem;
}
.title {
  font-size: 0.5rem;
  max-width: 8rem;
  overflow: hidden;
  color: white;
  font-family: Montserrat;
  padding: 0 0 0.5rem 0.5rem;
}

#gameScreen {
  height: 100%;
  background: linear-gradient(90deg, #101e29, #112331);
  z-index: 1;
  position: relative;
  width: 100%;
  top: -100%;
  opacity: 0.7;
}
</style>
