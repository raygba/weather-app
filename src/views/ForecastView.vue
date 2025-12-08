<script setup>
import { ref } from 'vue'
import SearchInput from '../components/SearchInput.vue'

// const props = defineProps({
//     place: Object
// })

const places = ref([])
const addPlace = (data) => {
    places.value.push(data)
}

const deletePlace = (name) => {
    if (confirm('Do you want to remove ' + name + '?')) {
        places.value = places.value.filter((p) => p.location.name !== name)
    }
}

// conditional backgrounds
// console.log(places.value)
// const name = places.value.location.name
// const condition = places.value.forecastday.condition.text
// console.log(name + ': ' + condition)

// let rainy = condition.toLowerCase().includes('rain')
// let thundery = condition.toLowerCase().includes('thunder')
// let drizzly = condition.toLowerCase().includes('drizzle')

// let cloudy = condition.toLowerCase().includes('cloud')
// let overcasty = condition.toLowerCase().includes('overcast')

// let foggy = condition.toLowerCase().includes('fog')
// let misty = condition.toLowerCase().includes('mist')

// let sleety = condition.toLowerCase().includes('sleety')
// let icy = condition.toLowerCase().includes('ice')

// let snowy = condition.toLowerCase().includes('snow')
// let blizzardy = condition.toLowerCase().includes('blizzard')
</script>


<style scoped>
#content {
    min-height: 400px;
}

.bg-day {
    background-color: #54a9ff;
}

.bg-night {
    background-color: #07223d;
}

#forecastCard:hover {
    scale: 1.05;
    box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.315);
}
</style>

<template>
    <main id="app" class="lg:w-[75%] mx-auto">
        <!-- Search -->
        <div>
            <SearchInput @place-data="addPlace" />
        </div>

        <!-- Forecast cards -->
        <div id="content" class="grid mt-8 mb-16">
            <div class="grid grid-cols-5 gap-2" v-for="(place, idx) in places" :key="idx">
                <div class="flex items-center justify-center gap-2 col-span-5 my-5">
                    <h1 class="text-3xl">5-Day Forecast for <i class="fa-solid fa-location-dot"></i> {{
                        place.location.name }}</h1>
                    <div>
                        <button @click="deletePlace(place.location.name)" class="text-2xl ms-16">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div id="forecastCard" :class="[
                    rainy || thundery || drizzly ? 'bg-rain' : 'bg-clear',
                    cloudy || overcasty ? 'bg-cloudy' : 'bg-clear',
                    foggy || misty ? 'bg-fog' : 'bg-clear',
                    sleety || icy ? 'bg-hail' : 'bg-clear',
                    snowy || blizzardy ? 'bg-snow' : 'bg-clear'
                ]" class="bg-day text-white py-10 rounded-lg shadow-lg gap-3 mb-6 relative overflow-hidden"
                    v-for="(day, idx) in place.forecast.forecastday" :key="idx">
                    <div>
                        <div class="text-center flex-1">
                            <p class="text-2xl">
                                <!-- T00:00:00 fixes issue with timezones causing dates to display 1 day behind -->
                                {{ new Date(day.date + 'T00:00:00').toLocaleDateString('en-us', { weekday: 'long' }) }}
                            </p>
                            <p class="text-xl">
                                {{ new Date(day.date + 'T00:00:00').toLocaleDateString('en-us', {
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