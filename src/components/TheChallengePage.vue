<template>
  <div :id="[$style.challenge]">
    <img v-if="game !== null" :id="[$style.gameBanner]" :src="game.GameBackgroundUrl" />
    <h1>CHALLENGE!</h1>
    <div :id="[$style.contestants]">
      <PlayerTile
        v-if="challenger !== null"
        :name="challenger.DisplayName"
        :avatarUrl="challenger.LogoUrl"
      />
      <PlayerTile
        v-if="rival !== null"
        :name="rival.DisplayName"
        :avatarUrl="rival.LogoUrl"
      />
    </div>
    <div :id="[$style.challengeButtonWrapper]">
      <div :id="[$style.challengeButton]" v-on:click="$_clickChallenge">Challenge!</div>
    </div>
    <div :id="[$style.screen]"></div>
  </div>
</template>

<script>
import MogulApi from "../api/mogul-api";
import PlayerTile from "./PlayerTile";

export default {
  name: "TheChallengePage",
  components: {
    PlayerTile
  },
  data() {
    return {
      game: null,
      challenger: null,
      rival: null
    };
  },
  mounted() {
    this.mogulApi = new MogulApi();
    this.mogulApi.getGameByShortCode(this.$route.params.game).then(response => {
      this.game = response.data.Response;
    });
    this.mogulApi
      .getPlayerByEntityName(JSON.parse(localStorage.user).EntityName)
      .then(response => {
        this.challenger = response.data.Response;
      });
    this.mogulApi
      .getPlayerByEntityName(this.$route.params.entityName)
      .then(response => {
        this.rival = response.data.Response;
      });
  },
  methods: {
    $_clickChallenge: function() {
      this.mogulApi
        .createTeamChallenge(
          `${this.challenger.DisplayName}-VS-${this.rival.DisplayName}`
        )
        .then(response => {
          this.mogulApi
            .inviteToTeam(response.data.Response, this.challenger.EntityName)
            .then();
        });
    }
  }
};
</script>

<style module>
#challenge {
  height: 100%;
  overflow: hidden;
}

#screen {
  height: 100%;
  background: linear-gradient(90deg, #101e29, #112331);
  z-index: 1;
  position: absolute;
  width: -webkit-calc(100% - 20rem);
  top: 0%;
  left: 0%;
  opacity: 0.7;
  margin: 0 10rem 0 10rem;
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

#gameBanner {
  width: 100%;
  z-index: 0;
}

#challengeButtonWrapper {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
}

#challengeButton {
  background: linear-gradient(90deg, #1571df, #05b6e8);
  color: white;
  font-family: Montserrat;
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-weight: 500;
  font-size: 0.8rem;
  margin: auto;
  cursor: pointer;
}
</style>
