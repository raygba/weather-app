<template>
    <main id="app" class="lg:w-[75%] mx-auto">
        <!-- Search -->
        <div>
            <SearchInput @place-data="addPlace" />
        </div>

        <!-- Chart -->
        <div>
            <LineChart :place="place" />
        </div>
    </main>
</template>

<script setup>
import LineChart from '../components/LineChart.vue'
import { ref } from 'vue'
import SearchInput from '../components/SearchInput.vue'

const places = ref([])
const addPlace = (data) => {
    places.value.push(data)
}

// const deletePlace = (name) => {
//     if (confirm('Do you want to remove ' + name + '?')) {
//         places.value = places.value.filter((p) => p.location.name !== name)
//     }
// }
</script>
