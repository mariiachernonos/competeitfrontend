<template>
    <div>
        <event
                v-for="(event, index) in events.length"
                :key="event.title"
                :index="index"
                :events-array="events.map(e => e.title)"
        />
    </div>
</template>

<script>
    import app from '../scripts/session-data.js'
    import event from '../components/event.vue';
    export default {
        name: "all-events-area",
        components:{
            event
        }
    }
</script>

<style scoped>

</style>