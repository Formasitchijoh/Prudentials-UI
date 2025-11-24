<script setup lang="ts">
import { useProjectStore } from '#imports'

// Donot call composables in a function it is used in the top level of the script 
const callCount = ref(0)
const projectStore = useProjectStore();
const { tasks } = storeToRefs(projectStore)


const email = ref('email@gmail.com')
const password = ref('')

const body = computed(() => ({
    email: email.value,
    password: password.value
}))

onMounted(() =>{
    projectStore.fetchProjects();
    projectStore.fetTasks()
})

import { shallowRef } from 'vue'

const tab = shallowRef('tab-1')
const tabs = [
    {
        text: 'Overview',
        value: 'tab-1',
    },
    {
        icon: 'mdi-file-table-outline',
        text: 'Board',
        value: 'tab-2',
    },
    {
        icon: 'mdi-format-list-bulleted',
        text: 'List',
        value: 'tab-3',
    },
    {
        icon: 'mdi-clock-time-eight-outline',
        text: 'Timeline',
        value: 'tab-4',
    },
]

const drawer = ref(false)

  const group = ref(null)

  watch(group, () => {
    drawer.value = false
  })

</script>

<template>
    <VLayout fluid class="fill-height pl-10 d-flex flex-column text-start">
        <div class="w-100"> 
            <div class="text-h4">Tasks</div>
            <div class="text-subtitle-1">Some text about the text will be placed here </div>
        </div>
        <v-tabs width="100%" v-model="tab" :items="tabs" align-tabs="start" height="60" class="mt-10 flex-grow-1"
            slider-color="#6f78c9">
            <template v-slot:tab="{ item }">
                <v-tab :prepend-icon="item.icon" :text="item.text" active-color="#6f78c9" density="comfortable"
                    :value="item.value" class="text-none"></v-tab>
            </template>

            <template v-slot:item="{ item }">
                <v-tabs-window-item width="100%" class="mx-10" :value="item.value">
                    <v-row class="space-x-2 mt-4">
                        <v-col class="d-flex flex-column justify-start space-y-2 bg-[#1867C0]/5 rounded-lg">
                            <projects-task-header title="Todo" :count="5" /> 
                            <template v-if="tasks.length > 0"   v-for="(task, i) in tasks" :key="i" :value="item" >
                            <projects-task-card :task="task" />
                            </template>
                        </v-col>
                        <v-col class="d-flex flex-column justify-start space-y-2 bg-[#1867C0]/5 rounded-lg">
                            <projects-task-header title="Triage" :count="10" />
                            <template   v-for="(task, i) in tasks" :key="i" :value="item" >
                            <projects-task-card :task="task"/>
                            </template>
                        </v-col>
                        <v-col class="d-flex flex-column justify-start space-y-2 bg-[#1867C0]/5 rounded-lg">
                            <projects-task-header title="Progress" :count="12" />
                            <template   v-for="(task, i) in tasks" :key="i" :value="item" >
                            <projects-task-card :task="task"/>
                            </template>

                        </v-col>
                    </v-row>
                </v-tabs-window-item>
            </template>
        </v-tabs>
        <ProjectsTaskDetails v-model:is-dialog-visible="drawer"/>
    </VLayout>
</template>
