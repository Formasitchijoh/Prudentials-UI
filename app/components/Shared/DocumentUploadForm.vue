<template>
    <v-card class="pa-4">
        <v-card-title>Upload Document</v-card-title>
        <v-card-text>
            <v-form ref="form" @submit.prevent="submitForm">

                <!-- File Input -->
                <v-file-input v-model="file" label="Select Document File" accept=".pdf,.jpg,.png,.doc,.docx"
                    :rules="[v => !!v || 'File is required']" prepend-icon="mdi-paperclip" show-size
                    clearable></v-file-input>

                <!-- Submit Button -->
                <v-btn color="primary" type="submit" :loading="loading" block class="mt-4">
                    Upload Document
                </v-btn>

                <!-- Status Messages -->
                <v-alert v-if="successMessage" type="success" class="mt-4">{{ successMessage }}</v-alert>
                <v-alert v-if="errorMessage" type="error" class="mt-4">{{ errorMessage }}</v-alert>

            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { morphType } from './../../utils/helper';

// State variables (Updated type: single File object or null)
const file = ref<File | null>(null);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const form = ref<HTMLFormElement | null>(null);

const sharedStore = useSharedStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore);
const { message } = storeToRefs(sharedStore)


// Hardcoded sample data for 
const tenantId = 1;
const userId = user.value.id;
const documentableId = 1;
const documentableType = morphType('Comment', 'Shared');


async function submitForm() {
    const { valid } = await form.value!.validate();

    // Check if the form is valid and a file object exists
    if (!valid || !file.value) {
        errorMessage.value = 'Please select a file to upload.';
        return;
    }

    // The file object is directly in file.value now
    const uploadedFileObject = file.value;

    loading.value = true;
    successMessage.value = '';
    errorMessage.value = '';

    const formData = new FormData();
    // Use the file object directly
    formData.append('document_file', uploadedFileObject);

    formData.append('tenant_id', String(tenantId));
    formData.append('user_id', String(userId));
    formData.append('name', uploadedFileObject.name);
    formData.append('documentable_id', String(documentableId));
    formData.append('documentable_type', documentableType);


    try {
        await sharedStore.uploadDocument(formData)

        successMessage.value = message.value;
        form.value?.reset();
        file.value = null; // Manually reset the file input binding

    } catch (error: any) {
        console.error('Upload Error:', error);
        errorMessage.value = 'Failed to upload document. Check console for details.';
    } finally {
        loading.value = false;
    }
}
</script>
