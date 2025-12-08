<script setup>
import { ref } from 'vue';
import BorderLine from './BorderLine.vue'
import WeatherForecastDay from './WeatherForecastDay.vue';
import WeatherInfo from './WeatherInfo.vue';

const props = defineProps({
    place: Object
})

const emit = defineEmits(['delete-place'])

const showDetail = ref(false)

const removePlace = (placeName) => {
    emit('delete-place', placeName)
    showDetail.value = false
}

// conditional backgrounds
const condition = props.place.current.condition.text

let rainy = condition.toLowerCase().includes('rain')
let thundery = condition.toLowerCase().includes('thunder')
let drizzly = condition.toLowerCase().includes('drizzle')

let cloudy = condition.toLowerCase().includes('cloud')
let overcasty = condition.toLowerCase().includes('overcast')

let foggy = condition.toLowerCase().includes('fog')
let misty = condition.toLowerCase().includes('mist')

let sleety = condition.toLowerCase().includes('sleety')
let icy = condition.toLowerCase().includes('ice')


let snowy = condition.toLowerCase().includes('snow')
let blizzardy = condition.toLowerCase().includes('blizzard')

</script>

<template>
<div :class="[
    rainy || thundery || drizzly ? 'bg-rain' : 'bg-clear', 
    cloudy || overcasty ? 'bg-cloudy' : 'bg-clear',
    foggy || misty ? 'bg-fog' : 'bg-clear',
    sleety || icy ? 'bg-hail' : 'bg-clear',
    snowy || blizzardy ? 'bg-snow' : 'bg-clear'
    ]" 
    class="weather-card text-white p-10 rounded-lg shadow-lg gap-6 my-6 relative overflow-hidden">
        <!-- Location & time -->
        <div class="mb-2 flex justify-between items-center">
            <div class="flex items-center justify-center gap-2">
                <i class="fa-solid fa-location-dot text-3xl"></i>
                <h1 class="text-3xl">{{ place.location.name }}</h1>
            </div>
            <div class="flex items-center justify-center gap-2">
                <h1 class="text-3xl">{{new Date(place.location.localtime).toLocaleTimeString([], {hour12: true, hour: 'numeric', minute:'numeric'})}}</h1>
            </div>
        </div>

        <!-- current weather -->
        <div class="text-center flex-1">
            <img :src="place.current.condition.icon" alt="icon" width="175" class="mx-auto -mb-2" />
            <h1 class="text-9xl mb-2 -mr-8">{{ Math.round(place.current.temp_f) }}&deg;</h1>
            <p class="text-2xl lowercase">{{ place.current.condition.text }}</p>
        </div>

        <BorderLine />

        <!-- forecast -->
        <div v-for="(day, idx) in place.forecast.forecastday" :key="idx">
            <WeatherForecastDay :day="day" />
        </div>

        <!-- info -->
        <Transition name="fade">
            <div v-show="showDetail">
                <WeatherInfo :place="place" @close-info="showDetail = false"
                    @remove-place="removePlace(place.location.name)" />
            </div>
        </Transition>

        <!-- forecast btn -->
        <div class="flex justify-end items-center gap-1 mt-10">
            <button @click="showDetail = true" class="text-xl items-center">
                info <i class="fa-solid fa-arrow-up text-lg"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
.weather-card {
    text-shadow: 2px 2px 6px #0000009d;
}

.bg-clear {
    background-image: url('../assets/images/clear.jpg');
    background-size: cover;
}

.bg-rain {
    background-image: url('../assets/images/rain.jpg');
    background-size: cover;
}

.bg-cloudy {
    background-image: url('../assets/images/cloudy.jpg');
    background-size: cover;
}

.bg-fog {
    background-image: url('../assets/images/fog.jpg');
    background-size: cover;
}

.bg-hail {
    background-image: url('../assets/images/hail.jpg');
    background-size: cover;
}

.bg-snow {
    background-image: url('../assets/images/snow.jpg');
    background-size: cover;
}

.bg-day {
    background-color: #54a9ff;
}

.bg-night {
    background-color: #07223d;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>