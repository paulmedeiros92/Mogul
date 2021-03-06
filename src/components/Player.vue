<template>
  <router-link class="router" :to="{ name: 'challenge', params: { entityName: entityName , game}}">
    <div class="player">
      <div v-if="rank" class="rank">#{{ rank }}</div>
      <img class="player-avatar" :src=avatarUrl alt="no-image" />
      <div class="name">{{ name }}</div>
    </div>
  </router-link>
</template>

<script>

export default {
  name: 'Player',
  props: {
    name: String,
    rank: Number,
    avatarUrl: String,
    entityName: String,
    game: String,
  },
}
</script>

<style>
.router {
  text-decoration: none;
  color: white;
}

.player {
  height: 8rem;
  width: 8rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  background-image: radial-gradient(farthest-corner at 80% 50%,#2d4860 0,#182a3a 100%);
  border-radius: .25rem;
  margin: .5rem;
  padding: .25rem;
}

.player:hover {
  transform: translateY(-4px);
  transition: all .15s ease;
}

.player-avatar {
  height: 4rem;
  width: 4rem;
  border-radius: .25rem;
  margin: auto;
}

.name {
  font-size: .75rem;
  font-family: Montserrat;
  margin: auto;
}

.rank {
  position: relative;
  right: -75%;
}
</style>
