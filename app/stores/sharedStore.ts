import { defineStore } from "pinia";
import type { Document } from './../utils/types'

interface State {
    document: Document,
    message:string
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
        message: ''
    }),
    actions:{
        async uploadDocument(formData:FormData){
            const { data, status } = await useApiFetch('/api/documents/upload', {
                method: 'POST',
                body: formData
            });
            console.log(data);
            
            if(data){
                this.message = data.value.message;
            }
        }
    }
})