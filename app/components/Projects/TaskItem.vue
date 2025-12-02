<template>
    <v-row class="w-90 ps-4">
        <v-col cols="12" md="6">
            <div class="d-flex justify-start align-center ga-2">
                <v-icon size="15">mdi-clock-outline</v-icon>
                <div class="text-caption">Created Time</div>
            </div>
        </v-col>
        <v-col cols="12" md="6">
            <div class="text-caption">September 24, 2025
                <span class="text-caption text-medium-emphasis">10:35</span>

            </div>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">

const props = defineProps({
    iconName:{
        type:String,
        required:true
    },
    iconText:{
        type:String,
        require:true
    },
    
})
</script>