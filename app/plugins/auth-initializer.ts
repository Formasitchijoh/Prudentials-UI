import { defineNuxtPlugin } from "#app";
import { useAuthStore } from "#imports";


export default defineNuxtPlugin(async (nuxtApp) =>{
    const authStore = useAuthStore();
    await authStore.fetchUser();// refetch user
})