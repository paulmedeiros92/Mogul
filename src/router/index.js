import Vue from "vue";
import Router from "vue-router";
import TheGamesPage from "../components/TheGamesPage";
import TheChallengePage from "../components/TheChallengePage";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "games",
      component: TheGamesPage
    },
    {
      path: "/challenge/:game/:entityName",
      name: "challenge",
      component: TheChallengePage
    }
  ]
});
