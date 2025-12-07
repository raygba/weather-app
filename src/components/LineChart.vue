<script setup>
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
import { ref, onMounted } from 'vue'

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
)

const chartData = ref({
    labels: [],
    datasets: []
})

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
}

async function fetchWeather() {
    const res = await fetch(
        'http://api.weatherapi.com/v1/forecast.json?key=355022d7f3db4659a6e181723250212&q=id:${searchTerm.query}&days=1'
    )
    const data = await res.json()
    const hourly = data.forecast.forecastday[0].hour
    const times = hourly.map(h => h.time)
    const tempsArray = hourly.map(h => h.temp_f)

    chartData.value = {
        labels: times,
        datasets: [
            {
                label: "Temperature (°F)",
                data: tempsArray,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.3)",
                tension: 0.3
            }
        ]
    }

}

onMounted(fetchWeather)
</script>

<template>
    <div style="height: 400px">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>