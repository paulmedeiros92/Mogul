<template>
  <div id="challenge">
    <img v-if="game !==null" id="game-banner" :src=game.GameBackgroundUrl />
    <h1>CHALLENGE!</h1>
    <div id="contestants">
      <Player 
        v-if="challenger !== null"
        :name=challenger.DisplayName
        :avatarUrl=challenger.LogoUrl
      />
      <Player
        v-if="rival !== null"
        :name=rival.DisplayName
        :avatarUrl=rival.LogoUrl
      />
    </div>
    <div id="challenge-button-wrapper">
      <div id="challenge-button" v-on:click="clickChallenge">Challenge!</div>
    </div>
    <div id="screen"></div>
  </div>
</template>

<script>
import MogulApi from '../api/mogul-api';
import Player from './Player';

export default {
  name: 'Challenge',
  components: {
    Player,
  },
  data() {
    return {
      game: null,
      challenger: null,
      rival: null,
    }
  },
  mounted() {
    this.mogulApi = new MogulApi();
    this.mogulApi.getGameByShortCode(this.$route.params.game).then((response) => {
      this.game = response.data.Response;
    });
    this.mogulApi.getPlayerByEntityName(JSON.parse(localStorage.user).EntityName).then((response) => {
      this.challenger = response.data.Response;
    });
    this.mogulApi.getPlayerByEntityName(this.$route.params.entityName).then((response) => {
      this.rival = response.data.Response;
    });
  },
  methods: {
    clickChallenge: function() {
      this.mogulApi.createTeamChallenge(`${this.challenger.DisplayName}-VS-${this.rival.DisplayName}`).then((response) => {
        this.mogulApi.inviteToTeam(response.data.Response, this.challenger.EntityName).then();
      })
    }
  }
}
</script>

<style>
#challenge {
  height: 100%;
  overflow: hidden;
}

#screen {
  height: 120%;
  background: linear-gradient(90deg,#101e29,#112331);
  z-index: 1;
  position: relative;
  width: 100%;
  top: -50%;
  opacity: .7;
}

h1 {
  color: white;
  display: flex;
  justify-content: center;
  position: relative;
  top: -10%;
  z-index: 2;
}

#contestants {
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 2;
}

#game-banner {
  width: 100%;
  z-index: 0;
}

#challenge-button-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
}

#challenge-button {
  background: linear-gradient(90deg,#1571df,#05b6e8);
  color: white;
  font-family: Montserrat;
  padding: .25rem;
  border-radius: .25rem;
  font-weight: 500;
  font-size: .8rem;
  margin: auto;
  cursor: pointer;
}
</style>
