<template>
    <header class="flex">
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
        <nav>
            <router-link :to="{ name: 'forecast' }">5-Day Forecast</router-link>
        </nav>
    </header>
</template>