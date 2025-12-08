<script setup>
import NavBar from './components/NavBar.vue';
</script>

<style>
  footer p a {
    text-decoration: underline;
  }
</style>

<template>
  <NavBar />
  <router-view></router-view>
  <footer class="w-[75%] mx-auto text-sm py-4">
    <p>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>
  </footer>
</template>