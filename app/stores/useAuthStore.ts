import { defineStore } from "pinia";
import { useRouter } from "nuxt/app";
import { useCookie } from '#app';

type User = {
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
            console.log("Fetching 11");
            
            const accessToken = useCookie('access_token');
            if (!accessToken.value) return;
            console.log("Fetching 22");

            try {
                const { data } = await useApiFetch("/api/auth_user");

                if (data.value) {
                    console.log("Fetched \n", data.value);
                    this.user = data.value;
                }
            } catch (error) {
                console.error("Failed to fetch user with existing token:", error);
                accessToken.value = null; // Log them out
            }
        },

        async register(info: RegistrationInfo) {
            this.message = ""
            await useApiFetch("/sanctum/csrf-cookie");

            const { data, status } = await useApiFetch("/api/register", {
                method: "POST",
                body: info
            })

            console.log('Request Status:', status.value);
            console.log('Register Data:', info, data.value);

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
            await useApiFetch("/sanctum/csrf-cookie");

            const { data, status } = await useApiFetch("/api/login", {
                method: "POST",
                body: info
            })

            console.log('Request Login Status:', status.value);
            console.log('Register Login Data:', info, data.value);

            if (status.value == 'success') {
                this.user = data.value.user; 

                this.user.token = data.value.token
                const accessTokenCookie = useCookie('access_token');

                accessTokenCookie.value = data.value.token;

                console.log("Token Saved \n", accessTokenCookie.value);

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