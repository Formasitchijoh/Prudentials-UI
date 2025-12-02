<script setup lang="ts">
import type { TaskItem } from '../../utils/types'

const props = defineProps({
    task: {
        type: Object as PropType<TaskItem>,
        required: true
    }
})

const emit = defineEmits<{
    (e: 'openDrawer'): void
}>()

</script>

<template>
    <v-card @click="() => emit('openDrawer')" flat max-width="340"
        class="mx-auto px-2 py-0 rounded-lg mr-2 py-2 border border-1">
        <div class="d-flex justify-space-between mb-2 align-center">
            <v-chip size="x-small" class="" color="primary" label>
                <v-icon icon="mdi-circle-medium" start></v-icon>
                {{ task.status }} </v-chip>
            <v-icon color="gray" size="20">mdi-dots-horizontal</v-icon>
        </div>
        <v-card-title class="pa-0">
            <div class="mb-2">
                <div class="text-subtitle-2 font-weight-bold text-pre-wrap">{{ task.title }}</div>
                <div class="text-caption text-medium-emphasis text-pre-wrap">{{ task.description }}</div>
            </div>

            <div class="d-flex mb-2 justify-space-between align-centers">
                <div class="text-caption font-weight-medium text-high-emphasis">Assignees:</div>
                <shared-avatar-stack/>
            </div>
            <div class="d-flex justify-space-between items-center">
                <!-- Make this a reusbale component -->
                <div class="d-flex space-x-1 text-medium-emphasis text-xs items-center justify-start align-center">
                    <v-icon size="15">mdi-flag-variant-outline</v-icon>
                    <div>02 Nov 2023</div>
                </div>
                <v-chip size="x-small" class="ma-1 text-caption text-medium-emphasis" color="primary">{{ task.priority }}</v-chip>
            </div>
        </v-card-title>
        <div class="h-[1px] bg-black/20 mx-auto my-2"></div>
        <v-card-action>
            <div class="d-flex justify-start items-start align-center space-x-1  text-medium-emphasis text-[10px]">
                <div class="d-flex space-x-1 items-center justify-start align-center">
                    <v-icon size="15">mdi-comment-multiple-outline</v-icon>
                    <div>12 Comments</div>
                </div>
                <div class="d-flex space-x-1 items-center justify-start align-center">
                    <v-icon size="15">mdi-link-variant</v-icon>
                    <div>Links</div>
                </div>
                <div class="d-flex space-x-1 items-center justify-start align-center">
                    <v-icon size="15">mdi-file-table-outline</v-icon>
                    <div>0/3</div>
                </div>
            </div>

        </v-card-action>
    </v-card>
</template>
