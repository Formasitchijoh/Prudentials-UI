<template>
    <v-container class="d-flex justify-center">

        <v-card class="pa-8" max-width="400" title="User Registration" width="100%">
            <v-form v-model="valid" @submit.prevent="submit">
                <v-text-field variant="underlined" v-model="form.name" label="Name"
                    :rules="[rules.required, rules.minName]" class="mb-4" />

                <v-text-field variant="underlined" v-model="form.email" label="Email" type="email"
                    :rules="[rules.required, rules.email]" class="mb-4" />

                <v-text-field variant="underlined" v-model="form.password" label="Password" type="password"
                    :rules="[rules.required, rules.minPassword]" class="mb-4" />

                <v-text-field variant="underlined" v-model="form.password_confirmation" label="Confirm Password"
                    type="password" :rules="[rules.required, rules.matchPassword]" class="mb-6" />

                <v-btn color="primary" type="submit" :disabled="!valid" block>
                    Register
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'

const valid = ref(false)
const authStore = useAuthStore()

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const rules = {
    required: v => !!v || 'Required',
    minName: v => v.length >= 3 || 'Name must be at least 3 characters',
    email: v => /.+@.+\..+/.test(v) || 'Valid email required',
    minPassword: v => v.length >= 8 || 'Password must be at least 8 characters',
    matchPassword: v => v === form.password || 'Passwords must match'
}

const submit = () => {
    if (valid.value) {
        authStore.register(form)
    }
}
</script>