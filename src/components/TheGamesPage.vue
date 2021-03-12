<template>
  <div id="games">
    <div :id="[$style.gameSelector]">
      <div v-for="game in games" :key="game.GameName">
        <GameTile
          :name="game.GameName"
          :imageUrl="game.GameImageLargeUrl"
          :shortCode="game.GameShortCode"
          :selectedGame="selectedGameShortCode"
          v-on:click="$_clickGame"
        />
      </div>
    </div>
    <div :id="[$style.topPlayers]" v-if="players">
      <div v-for="player in players" :key="player.Profile.EntityId">
        <PlayerTile
          :name="player.Profile.DisplayName"
          :avatarUrl="player.Profile.LogoUrl"
          :rank="player.Rank"
          :entityName="player.Profile.EntityName"
          :game="selectedGameShortCode"
        />
      </div>
    </div>
    <div :id="[$style.topPlayers]" v-else>
      <h5>NO PLAYERS FOUND</h5>
    </div>
  </div>
</template>

<script>
import MogulApi from "../api/mogul-api.js";
import GameTile from "./GameTile";
import PlayerTile from "./PlayerTile";

export default {
  name: "TheGamesPage",
  components: {
    GameTile,
    PlayerTile
  },
  data() {
    return {
      mogulApi: null,
      games: null,
      selectedGameShortCode: null,
      players: null
    };
  },
  mounted() {
    this.mogulApi = new MogulApi();
    this.mogulApi.getAllGames().then(response => {
      this.games = response.data.Response;
      this.selectedGameShortCode = this.games[0].GameShortCode;
      this.mogulApi
        .getTopPlayersFromGame(this.selectedGameShortCode)
        .then(response => {
          this.players = response.data.Response.Leaderboard;
        });
    });
  },
  methods: {
    $_clickGame: function(shortCode) {
      this.selectedGameShortCode = shortCode;
      this.mogulApi.getTopPlayersFromGame(shortCode).then(response => {
        this.players = response.data.Response
          ? response.data.Response.Leaderboard
          : null;
      });
    }
  }
};
</script>

<style module>
#gameSelector {
  display: flex;
  overflow-x: scroll;
  background-color: #101b24;
}

#topPlayers {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #101b24;
  padding: 2rem;
  font-family: Montserrat;
  color: white;
}
</style>
