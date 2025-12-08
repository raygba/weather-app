<script setup>
import NavBar from './components/NavBar.vue';
</script>

<style>
  main {
    min-height: 400px;
  }

  footer p a {
    text-decoration: underline;
  }
</style>

<template>
  <NavBar />
  <router-view></router-view>
  <footer class="w-[75%] mx-auto text-sm">
    <p>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>
  </footer>
</template>