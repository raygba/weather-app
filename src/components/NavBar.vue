<template>
    <header class="flex flex-1 justify-around w-[75%] mx-auto">
        <div>
            <router-link id="logo" to="/" class="text-3xl mb-3">The Weather</router-link>
            <!-- Date -->
            <div class="text-lg mb-6">
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
            <router-link :to="{ name: 'forecast' }">5-Day Forecast</router-link>
            <router-link :to="{ name: 'hourly' }">Hourly</router-link>
        </nav>
    </header>
</template>