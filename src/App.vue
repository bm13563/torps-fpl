<template>
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
  <div id="app">
    <router-view />
  </div>
</template>

<script setup></script>

<style>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  background-color: #2D3250;
  color: white;
}

#app {
  display: flex;
  justify-content: center;
}
</style>
