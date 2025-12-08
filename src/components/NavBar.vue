<template>
    <header class="flex flex-1 justify-between items-center w-[75%] mx-auto mb-8">
        <div class="h-fit">
            <router-link to="/" class="text-3xl mb-3 fw-bold" id="logo">The Weather</router-link>
            <!-- Date -->
            <div class="text-lg">
                {{ new Date().toLocaleDateString('en-us', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                }}
            </div>
        </div>
        <nav class="flex flex-1 justify-evenly">
            <router-link :to="{ name: 'home' }">Current Weather</router-link>
            <router-link :to="{ name: 'forecast' }">5-Day Forecast</router-link>
            <router-link :to="{ name: 'hourly' }">Hourly</router-link>
        </nav>
    </header>
</template>