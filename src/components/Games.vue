<template>
  <div id="games">
    <div id="game-selector">
      <div v-for="game in games" :key="game.GameName">
        <GamePortrait
          :name=game.GameName
          :imageUrl=game.GameImageLargeUrl
          :shortCode=game.GameShortCode
          :selectedGame=selectedGameShortCode
          v-on:click="clickGame"
        />
      </div>
    </div>
    <div id="top-players" v-if="players">
      <div v-for="player in players" :key="player.Profile.EntityId">
        <Player
          :name=player.Profile.DisplayName
          :avatarUrl=player.Profile.LogoUrl
          :rank=player.Rank
          :entityName=player.Profile.EntityName
          :game=selectedGameShortCode
        />
      </div>
    </div>
  </div>
</template>

<script>
import MogulApi from '../api/mogul-api.js';
import GamePortrait from './GamePortrait';
import Player from './Player';

export default {
  name: 'Games',
  components: {
    GamePortrait,
    Player,
  },
  data() {
    return {
      mogulApi: null,
      games: null,
      selectedGameShortCode: null,
      players: null,
    }
  },
  mounted() {
    this.mogulApi = new MogulApi();
    this.mogulApi.getAllGames().then(response => {
      this.games = response.data.Response;
      this.selectedGameShortCode = this.games[0].GameShortCode;
      this.mogulApi.getTopPlayersFromGame(this.selectedGameShortCode).then(response => {
        this.players = response.data.Response.Leaderboard;
      });
    });
  },
  methods: {
    clickGame: function(shortCode) {
      this.selectedGameShortCode = shortCode;
      this.mogulApi.getTopPlayersFromGame(shortCode).then(response => {
        this.players = response.data.Response ? response.data.Response.Leaderboard : null;
      });
    }
  }
}
</script>

<style>
#game-selector {
  display: flex;
  overflow-x: scroll;
  background-color: #101b24;
}

#top-players {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #101b24;
  padding: 2rem;
}
</style>
