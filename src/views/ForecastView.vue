<template>
    <main id="app" class="lg:w-[75%] mx-auto">
        <!-- Search -->
        <div>
            <SearchInput @place-data="addPlace" />
        </div>

        <!-- Weather card -->
        <div class="grid">
            <div class="grid grid-cols-5 gap-2" v-for="(place, idx) in places" :key="idx">
                <div class="flex items-center justify-center gap-2 col-span-5 my-5">
                    <h1 class="text-3xl">5-Day Forecast for <i class="fa-solid fa-location-dot"></i> {{
                        place.location.name }}</h1>
                </div>
                <div class="bg-day text-white py-10 rounded-lg shadow-lg gap-3 mb-6 relative overflow-hidden"
                    v-for="(day, idx) in place.forecast.forecastday" :key="idx">
                    <div>
                        <div class="text-center flex-1">
                            <p class="text-2xl">
                                {{ new Date(day.date).toLocaleDateString('en-us', { weekday: 'long' }) }}
                            </p>
                            <p class="text-xl">
                                {{ new Date(day.date).toLocaleDateString('en-us', {
                                    month: 'short',
                                    day: 'numeric'
                                }) }}
                            </p>

                            <img :src="day.day.condition.icon" alt="icon" width="50" class="mx-auto my-4" />

                            <h1 class="text-4xl mb-2">{{ Math.round(day.day.maxtemp_f) }}&deg;</h1>
                            <h1 class="text-3xl mb-2">{{ Math.round(day.day.mintemp_f) }}&deg;</h1>

                            <p class="text-lg mb-2 lowercase">{{ day.day.condition.text }}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import SearchInput from '../components/SearchInput.vue'
// import WeatherCard from '../components/WeatherCard.vue'

const places = ref([])
const addPlace = (data) => {
    places.value.push(data)
}

// const deletePlace = (name) => {
//     if (confirm('Are you sure?')) {
//         places.value = places.value.filter((p) => p.location.name !== name)
//     }
// }
</script>

<style scoped>
.bg-day {
    background-color: #54a9ff;
}

.bg-night {
    background-color: #07223d;
}
</style>