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
</script>


<template>
    <main id="app" class="lg:w-[75%] mx-auto">
        <!-- Search -->
        <div>
            <SearchInput @place-data="setPlace" />
        </div>

        <!-- Chart -->
        <div class="mt-8 mb-16" style="min-height: 400px">
            <div>
                <LineChart class="md:mt-16 mb-32" :place="currentPlace" />
            </div>
        </div>
    </main>
</template>