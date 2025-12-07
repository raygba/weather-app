<script setup>
// get place-data emit from SearchInput -> HourlyView -> LineChart
const props = defineProps({
    place: Object
})
console.log(props.place)

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
    // doesnt work right if 2 places have the same name ie Hillsborough CA and Hillsborough NC
    const query = place.location.name
    console.log(query)
    const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=355022d7f3db4659a6e181723250212&q=id:${query}&days=1`
    )
    const data = await res.json()
    const hourly = data.forecast.forecastday[0].hour

    // map times and temperatures to arrays
    // convert time to 1 hour format i.e. 1 PM
    const times = hourly.map(h => {
        const date = new Date(h.time);
        return date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    });
    const temps = hourly.map(h => h.temp_f)
    console.log(times)
    console.log(temps)

    chartData.value = {
        labels: times,
        datasets: [
            {
                label: `Temperature (°F) for ${query}`,
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