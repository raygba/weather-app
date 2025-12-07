<script setup>
import LineChart from '../components/LineChart.vue'
import { ref } from 'vue'
import SearchInput from '../components/SearchInput.vue'


// track the currently selected place
const currentPlace = ref(null)

// called when SearchInput emits 'place-data'
const setPlace = (placeData) => {
  currentPlace.value = placeData
}

// const deletePlace = (name) => {
//     if (confirm('Do you want to remove ' + name + '?')) {
//         places.value = places.value.filter((p) => p.location.name !== name)
//     }
// }
</script>


<template>
    <main id="app" class="lg:w-[75%] mx-auto">
        <!-- Search -->
        <div>
            <SearchInput @place-data="setPlace" />
        </div>

        <!-- Chart -->
        <!-- <div v-for="(place, idx) in places" :key="idx"> -->
        <div>
            <LineChart :place="currentPlace" />
        </div>
    </main>
</template>