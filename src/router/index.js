import Vue from 'vue'
import Router from 'vue-router'
import Games from '../components/Games'
import Challenge from '../components/Challenge'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'games',
      component: Games
    },
    {
      path: '/challenge/:game/:entityName',
      name: 'challenge',
      component: Challenge
    }
  ]
})