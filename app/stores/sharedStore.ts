import { defineStore } from "pinia";
import type { Document, Comment } from './../utils/types'

interface State {
    document: Document,
    comments: Comment[],
    message: string,
    loader: boolean
}

export const useSharedStore = defineStore('shared', {
    state: (): State => ({
        document: {
            name: '',
            user_id: '',
            documentable_id: 0,
            documentable_type: '',
            tenant_id: 0,
            document_file: null
        },
        message: '',
        comments: [],
        loader: false

    }),
    actions: {
        async uploadDocument(formData: FormData) {
            this.loader = true
            const { data, status } = await useApiFetch('/api/documents/upload', {
                method: 'POST',
                body: formData
            });
            if (data) {
                this.message = data.value.message;
            }
            this.loader = false

        },

        async saveComment(comment: Comment) {
            this.loader = true
            const { data, status } = await useApiFetch('/api/comments', {
                method: 'POST',
                body: comment
            })

            if (data) {
                this.message = data.value.message
            }

            this.loader = false
        },

        async getComments() {
            this.loader = true
            const { data } = await useApiFetch('/api/comments');
            if (data) {
                this.comments = data.value
            }
            this.loader = false

        }
    }
})