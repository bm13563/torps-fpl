<template>
  <router-view />
</template>

<script setup></script>

<style>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  background-color: #fffefd;
  height: 100vh;

  @media (min-width: 768px) {
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    ::-webkit-scrollbar-track {
      background: var(--lightestgrey);
    }

    ::-webkit-scrollbar-thumb {
      background: #e0e0e0;
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
}

#app {
  display: flex;
  justify-content: center;
}
</style>
