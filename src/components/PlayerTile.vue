<template>
  <router-link
    :class="[$style.linkWrapper]"
    :to="{ name: 'challenge', params: { entityName: entityName, game } }"
  >
    <div :class="[$style.player]">
      <div v-if="rank" :class="[$style.rank]">#{{ rank }}</div>
      <img :class="[$style.playerAvatar]" :src="avatarUrl" alt="no-image" />
      <div :class="[$style.name]">{{ name }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "PlayerTile",
  props: {
    name: String,
    rank: Number,
    avatarUrl: String,
    entityName: String,
    game: String
  }
};
</script>

<style module>
.linkWrapper {
  text-decoration: none;
  color: white;
}

.player {
  height: 8rem;
  width: 8rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  background-image: radial-gradient(
    farthest-corner at 80% 50%,
    #2d4860 0,
    #182a3a 100%
  );
  border-radius: 0.25rem;
  margin: 0.5rem;
  padding: 0.25rem;
}

.player:hover {
  transform: translateY(-4px);
  transition: all 0.15s ease;
}

.playerAvatar {
  height: 4rem;
  width: 4rem;
  border-radius: 0.25rem;
  margin: auto;
}

.name {
  font-size: 0.75rem;
  font-family: Montserrat;
  margin: auto;
}

.rank {
  position: relative;
  right: -75%;
}
</style>
