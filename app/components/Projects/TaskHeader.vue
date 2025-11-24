<template>
    <div class="d-flex justify-space-between mb-2 align-center items-center">
        <div class="">
            <v-icon color="orange" class="mx-0 px-0" start>mdi-circle-medium</v-icon>
            <span class="text-subtitle-1">{{ props.title }}</span>
            <v-avatar color="#1867C0" class="text-caption ml-2" size="20">{{ props.count }}</v-avatar>
        </div>
        <div class="d-flex justify-end items-center align-center">
            <v-icon icon="mdi-plus" start></v-icon>
            <v-icon icon="mdi-dots-horizontal" start></v-icon>

        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    count:{
        type: Number,
        required: true
    }
})

</script>