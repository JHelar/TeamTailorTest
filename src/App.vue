<template>
  <transition name="main" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
import Loader from "./components/LoaderComponent";

export default {
  name: "App",
  components: {
    Loader
  },
  computed: {}
};
</script>

<style lang="scss">
.main-enter-active,
.main-leave-active {
  transition: opacity 0.3s ease;
}
.main-enter,
.main-leave-to {
  opacity: 0;
}
</style>

