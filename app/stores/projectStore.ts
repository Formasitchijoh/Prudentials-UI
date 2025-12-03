import { defineStore } from "pinia";
import type { Project, TaskItem } from './../utils/types'

interface State {
    project: Project
    tasks: TaskItem[],
    message:string
}

export const useProjectStore = defineStore('project', {

    state: (): State => ({
        project: {
            id: 0,
            tenant_id: 0,
            name: "",
            slug: "",
            description: null,
            owner_id: 0,
            status: "approved",
            start_date: "",
            end_date: "",
            budget_allocated: "",
            spent_amount: "",
            meta: undefined
        },
        tasks:[],
        message : ''
    }),

    actions: {
        async fetchProjects() {
            const { data, status } = await useApiFetch('/api/projects')
            if (data) {
                this.project = data.value
            }
        },

        async fetTasks() {
            const { data, status } = await useApiFetch('/api/tasks')
            if (data) {
                this.tasks = data.value as TaskItem[]
            }
        },

        async addTask(task:Partial<TaskItem>) {

            const { data, status } = await useApiFetch('/api/tasks', {
                method: "POST",
                body: task
            })

            if(data) {
                this.message = data.value.message // displayed the successfull message
            }

        }
    }
})