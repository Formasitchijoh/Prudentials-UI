<template>
    <!-- <VDialog fullscreen v-model="dialog"> -->

        <VContainer class="d-flex justify-center">

            <v-alert v-if="message !== ''" type="success" class="mt-4">{{ message }}</v-alert>

            <VCard class="pa-8" max-width="800" title="Add New Task" width="100%">
                <VForm v-model="valid" @submit.prevent="submit">
                    <VTextField variant="underlined" v-model="form.title" label="Title" class="mb-4" />
                    <VTextField variant="underlined" class="h-15 mb-4" hide-details auto-grow placeholder="Description"
                        v-model="form.description" label="Description" />
                    <VTextField variant="underlined" v-model="form.assignee_id" label="Assignee" class="mb-4" />
                    <VTextField variant="underlined" v-model="form.reporter_id" label="Reporter" class="mb-4" />

                    <VSelect item-title="title" item-value="value" v-model:model-value="form.type" variant="underlined"
                        label="Type"
                        :items="type" />
                    <VSelect v-model:model-value="form.status" variant="underlined" label="Status"
                        :items="['todo', 'in_progress', 'review', 'done']" />
                    <VSelect v-model:model-value="form.priority" variant="underlined" label="Priority"
                        :items="['low', 'medium', 'high', 'urgent']" />

                    <VTextField variant="underlined" v-model="form.estimated_hours" label="RepEstimated Hours"
                        class="mb-4" />

                    <VTextField variant="underlined" v-model="form.actual_hours" label="Actual Hours" class="mb-4" />


                    <v-btn color="primary" type="submit" :disabled="!valid" block>
                        Save
                    </v-btn>
                </VForm>
            </VCard>

        </VContainer>
    <!-- </VDialog> -->
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const valid = ref(false)
const dialog = ref(true)
const router = useRouter()
const projectStore = useProjectStore()
const { message } = storeToRefs(projectStore)

const form = ref<Partial<TaskItem>>({
    tenant_id: 1,
    project_id: 2,
    milestone_id: null,
    title: '',
    description: '',
    type: 'bug',
    // assignee_id: 1,
    // reporter_id: 1,
    status: 'in_progress',
    priority: 'medium',
    estimated_hours: 10,
    actual_hours: 14,
})

const task = computed(() => (
    form.value
))

const submit = () => {
    if (valid.value) {
        projectStore.addTask(task.value)
        router.replace('/tasks')
    }
}

const type = ref([
    { title: 'Task', value: 'task' }, 
    { title: 'Bug', value: 'bug' }, 
    { title: 'Feature', value: 'feature' }, 
    { title: 'Feature', value: 'story' }])

</script>