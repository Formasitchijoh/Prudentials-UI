import { defineStore } from "pinia";
import { useRouter } from "nuxt/app";
import { useCookie } from '#app';

type User = {
    id:number | null,
    name: string;
    email: string;
    password: string;
    token: string
}

type RegistrationInfo = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;

}

interface State {
    user: User,
    message: string
}

export const useAuthStore = defineStore('auth', {
    state: (): State => ({
        user: {
            id: null,
            name: "",
            email: "",
            password: "",
            token: ""
        },
        message: ''
    }),

    getters: {
        getUserToken: (state) => { return state.user.token }
    },

    actions: {


        async fetchUser() {
            if (this.user.token) return;            
            const accessToken = useCookie('access_token');
            if (!accessToken.value) return;

            try {
                const { data } = await useApiFetch("/api/auth_user");

                if (data.value) {
                    this.user = data.value;
                }
            } catch (error) {
                console.error("Failed to fetch user with existing token:", error);
                accessToken.value = null; // Log them out
            }
        },

        async register(info: RegistrationInfo) {
            this.message = ""
            // await useApiFetch("/sanctum/csrf-cookie");

            const { data, status } = await useApiFetch("/api/register", {
                method: "POST",
                body: info
            })

            if (status.value == 'success') {
                this.message = "";
                const router = useRouter();
                // Use the push function
                await router.push('/auth/login');
            } else if (status.value === 'error') {
                this.message = "Registration Failed. Please try again";
            }
        },
        async login(info: Partial<RegistrationInfo>) {
            this.message = ""
            // await useApiFetch("/sanctum/csrf-cookie");

            const { data, status } = await useApiFetch("/api/login", {
                method: "POST",
                body: info
            })

            if (status.value == 'success') {
                this.user = data.value.user; 

                this.user.token = data.value.token
                const accessTokenCookie = useCookie('access_token');

                accessTokenCookie.value = data.value.token;

                this.message = "";
                const router = useRouter();
                // Use the push function
                await router.push('/');
            } else if (status.value === 'error') {
                this.message = data.value.message;
            }
        }
    }


})