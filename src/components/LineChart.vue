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
    maintainAspectRatio: false,
    scales: {
        y: {
            type: 'linear',
            display: 'true',
            position: 'left',
        },
        y1: {
            type: 'linear',
            display: 'true',
            position: 'right',
            suggestedMin: '0',
            suggestedMax: '1',

            // grid line settings
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            }
        }
    }
}

// get weather from search query
async function fetchWeather(place) {
    if (!place) return

    // using latitude & longitude for API URL to avoid showing wrong data for places with the same name. 
    // sometimes shows a nearby location instead i.e. chapel hill instead of hillsborough. 
    // so not perfect but it's closer than hillsborough CA instead of hillsborough NC.
    const query = place.location.lat + ',' + place.location.lon
    const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=355022d7f3db4659a6e181723250212&q=${query}&days=1`
    )
    // console.log(`http://api.weatherapi.com/v1/forecast.json?key=355022d7f3db4659a6e181723250212&q=${query}&days=1`)
    const data = await res.json()
    const hourly = data.forecast.forecastday[0].hour

    // map times and temperatures to arrays
    const times = hourly.map(h => {
        // convert time to 1 hour format i.e. 1 PM
        const date = new Date(h.time);
        return date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    });
    const temps = hourly.map(h => h.temp_f)

    // get precipitation
    const precip = hourly.map(h => Math.round(h.precip_in * 10) / 10)

    // chart data object
    chartData.value = {
        labels: times,
        datasets: [
            {
                label: `Temperature (°F)`,
                data: temps,
                borderColor: "hsl(164, 100%, 40%)",
                backgroundColor: "hsl(164, 100%, 40%)",
                tension: 0.3
            },
            {
                label: `Precipitation (in.)`,
                data: precip,
                borderColor: "hsl(198, 100%, 40%)",
                backgroundColor: "hsl(198, 100%, 40%)",
                tension: 0.3,
                yAxisID: 'y1'
            }
        ]
    }
}

// refresh chart for new search
watch(() => props.place, (newPlace) => {
    fetchWeather(newPlace)
}, { immediate: true }) // immediate ensures it fetches initially if place is set
</script>

<template>
    <div style="height: 400px" v-if="props.place">
        <h1 class="text-3xl text-black w-fit mx-auto mb-6">Hourly Forecast for <i class="fa-solid fa-location-dot"></i>
            {{
                place.location.name }}</h1>
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>