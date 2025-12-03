<script setup>
import { ref } from 'vue';
import BorderLine from './BorderLine.vue'
import WeatherForecastDay from './WeatherForecastDay.vue';
import WeatherInfo from './WeatherInfo.vue';

defineProps({
    place: Object
})

const emit = defineEmits(['delete-place'])

const showDetail = ref(false)

const removePlace = (placeName) => {
    emit('delete-place', placeName)
    showDetail.value = false
}

</script>

<template>
    <div :class="place.current.is_day === 1 ? 'bg-day' : 'bg-night'" class="text-white p-10 rounded-lg shadow-lg gap-6 mb-6 relative overflow-hidden">
        <!-- Location & time -->
        <div class="mb-2 flex justify-between items-center">
            <div class="flex items-center justify-center gap-2">
                <i class="fa-solid fa-location-dot"></i>
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
            <button @click="showDetail = true">
                More <i class="fa-solid fa-arrow-up text-sm -mb-px"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
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