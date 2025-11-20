<script setup lang="ts">

// Donot call composables in a function it is used in the top level of the script 
const callCount = ref(0)


const email = ref('email@gmail.com')
const password = ref('')

const body = computed(() => ({
    email: email.value,
    password: password.value
}))
const didItwork = ref(false)
const { data, error, execute, refresh } = await useFetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body,
    immediate: false,
    watch: false,
    onResponse() {
        callCount.value++
    }
})

async function onSubmit() {
    await execute();
    if (!error.value) {
        didItwork.value = true
    }
}
const items = [
    {
        title: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard',
    },
    {
        title: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1',
    },
    {
        title: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2',
    },
]

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

</script>

<template>
    <v-container class="fill-height d-flex flex-column align-start justify-start text-start">
        <div>
            <div class="text-h4">Tasks</div>
            <div class="text-subtitle-1">Some text about the text will be placed here </div>
        </div>
        <v-tabs v-model="tab" :items="tabs" align-tabs="center" height="60" class="mt-10" slider-color="#6f78c9">
            <template v-slot:tab="{ item }">
                <v-tab :prepend-icon="item.icon" :text="item.text" active-color="#6f78c9" density="comfortable"
                    :value="item.value" class="text-none"></v-tab>
            </template>

            <template v-slot:item="{ item }">
                <v-tabs-window-item :value="item.value">
                    <v-row class="space-x-2">
                        <v-col class="d-flex flex-column justify-start space-y-2 bg-[#1867C0]/10 rounded-lg">
                            <projects-task-header />
                            <projects-task-card />
                            <projects-task-card />
                            <projects-task-card />
                            <projects-task-card />
                            <projects-task-card />

                        </v-col>
                        <v-col class="d-flex flex-column justify-start space-y-2 bg-[#1867C0]/10 rounded-lg">
                            <projects-task-header />
                            <projects-task-card />
                            <projects-task-card />
                            <projects-task-card />
                            <projects-task-card />
                            <projects-task-card />

                        </v-col>
                        <v-col class="d-flex flex-column justify-start space-y-2 bg-[#1867C0]/10 rounded-lg">
                            <projects-task-header />
                            <projects-task-card />
                            <projects-task-card />
                            <projects-task-card />
                            <projects-task-card />
                            <projects-task-card />

                        </v-col>
                    </v-row>


                </v-tabs-window-item>
            </template>
        </v-tabs>
    </v-container>
</template>
