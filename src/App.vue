<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    localStorage.user = JSON.stringify({ EntityName: 'paulmedeiros' });
  }
}
</script>

<style>

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  background-color: #182835;
  font-family: Montserrat;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: #303f50;
  width: 15px;
}

::-webkit-scrollbar-track {
  background: #0c1218;
}

#app {
  height: 100%;
  margin: 0 10rem 0 10rem;
}
</style>
