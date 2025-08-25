<template>
  <router-view v-slot="{ Component, route }">
    <transition 
      :name="route.name === 'team-picker' ? 'modal' : 'page'"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup></script>

<style>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  background-color: #fffefd;
  height: 100vh;

  --p-text-color: #000;

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

/* Modal-like transitions */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.page-enter-active, .page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
}
</style>
