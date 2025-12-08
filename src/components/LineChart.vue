<script setup>
const props = defineProps({
    place: Object
})

// imports
import { ref, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js'
ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
)

// initialize chart
const chartData = ref({
    labels: [],
    datasets: []
})
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
}

// get weather from search query
async function fetchWeather(place) {
    if (!place) return

    // using latitude & longitude for API URL to avoid showing wrong data for places with the same name. 
    // sometimes shows a nearby location instead i.e. chapel hill instead of hillsborough. 
    // so not perfect but it's closer than hillsborough CA instead of hillsborough NC.
    const query = place.location.lat + ',' + place.location.lon
    // const placeName = place.location.name + ', ' + place.location.region
    console.log(query)
    // console.log(placeName)
    const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=355022d7f3db4659a6e181723250212&q=${query}&days=1`
    )
    console.log(`http://api.weatherapi.com/v1/forecast.json?key=355022d7f3db4659a6e181723250212&q=${query}&days=1`)
    const data = await res.json()
    const hourly = data.forecast.forecastday[0].hour

    // map times and temperatures to arrays
    const times = hourly.map(h => {
        // convert time to 1 hour format i.e. 1 PM
        const date = new Date(h.time);
        return date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    });
    const temps = hourly.map(h => h.temp_f)
    // console.log(times)
    // console.log(temps)

    chartData.value = {
        labels: times,
        datasets: [
            {
                label: `Temperature (°F) for ${place.location.name}`,
                data: temps,
                borderColor: "hsl(164, 100%, 40%)",
                backgroundColor: "hsl(164, 100%, 40%)",
                tension: 0.3
            }
        ]
    }

}
// Watch for prop changes
watch(() => props.place, (newPlace) => {
    fetchWeather(newPlace)
}, { immediate: true }) // immediate ensures it fetches initially if place is set
</script>

<template>
    <div style="height: 400px">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>