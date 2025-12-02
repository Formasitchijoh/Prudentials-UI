<template>
        <div class="d-flex justify-start align-center ga-2">
            <v-icon size="20">{{ iconName }}</v-icon>
            <div class="text-caption">{{ label }}</div>
        </div>
</template>

<script setup lang="ts">

const props = defineProps({
    iconName:{
        type:String,
        required:true
    },
    label:{
        String,
        required:true
    }
})

</script>