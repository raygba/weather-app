<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar />
  <router-view></router-view>

  <footer>
    <p>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>
  </footer>
</template>