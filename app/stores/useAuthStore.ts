import { defineStore } from "pinia";

type User = {
    name: string;
    email: string;
    password: string;
}

type RegistrationInfo = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;

}

export const useAuthStore = defineStore('auth', () => {
  const errorMessage = ref("");

    async function register(info:RegistrationInfo){
        errorMessage.value = ""
        await useApiFetch("/sanctum/csrf-cookie");

        const { data, error } = await useApiFetch("/api/register", {
            method:"POST",
            body:info
        })
        console.log('Register:', info, data.value )

        if(error){
            errorMessage.value = "Registration Failed. Please try again"
        }else {
            errorMessage.value = ""
        }
    }
      return { register }

})