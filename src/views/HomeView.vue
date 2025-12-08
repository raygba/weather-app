<script setup>
import { ref } from 'vue'
import SearchInput from '../components/SearchInput.vue'
import WeatherCard from '../components/WeatherCard.vue'

const places = ref([])
const addPlace = (data) => {
    places.value.push(data)
}

const deletePlace = (name) => {
    if (confirm('Are you sure?')) {
        places.value = places.value.filter((p) => p.location.name !== name)
    }
}
</script>

<template>
    <main id="app" class="lg:w-[75%] mx-auto">
        <!-- Search -->
        <div>
            <SearchInput @place-data="addPlace" />
        </div>

        <!-- Weather card -->
        <div class="grid grid-cols-2 gap-4 mt-8 mb-16">
            <div v-for="(place, idx) in places" :key="idx">
                <WeatherCard :place="place" @delete-place="deletePlace" />
            </div>
        </div>
    </main>
</template>