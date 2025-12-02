import { defineStore } from "pinia";
import type { Document, Comment } from './../utils/types'

interface State {
    document: Document,
    comments: Comment,
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
        comments: {
            tenant_id: 0,
            body: '',
            commentable_id: 0,
            commentable_type: '',
            user_id: 0
        },
        loader: false

    }),
    actions: {
        async uploadDocument(formData: FormData) {
            const { data, status } = await useApiFetch('/api/documents/upload', {
                method: 'POST',
                body: formData
            });
            console.log(data);

            if (data) {
                this.message = data.value.message;
            }
        },

        async saveComment(comment: Comment) {
            this.loader = true
            const { data, status } = await useApiFetch('/api/comments', {
                method: 'POST',
                body: comment
            })

            if (data) {

                this.message = data.value.message
                console.log("Comment Saved \n", this.message);
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