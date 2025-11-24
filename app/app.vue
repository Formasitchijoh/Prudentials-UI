<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useAuthStore } from '#imports';
const router = useRouter()
const items = ref([{ icon: 'mdi-home-outline', text: 'Dashboard' }, { icon: 'mdi-mail', text: 'Projects' }, { icon: 'mdi-calendar-check-outline', text: 'Task' }, { icon: 'mdi-finance', text: 'Finance' },])
const items1 = ref([{ icon: 'mdi-file-outline', text: 'Documents' }, { icon: 'mdi-mail', text: 'Mettings' }])


const route = useRoute();
const authStore = useAuthStore()
const projectSore = useProjectStore()
const { user, getUserToken } = storeToRefs(authStore)
const currentPathname = computed(() =>{
  route.path;
})

const isAuthLayout = computed(() =>{
  return route.path === '/auth/register' || route.path === '/auth/login'
})

watch(getUserToken, (token) =>{

  if(token != '') {
    projectSore.fetchProjects()
    projectSore.fetTasks()
  }
})


</script>

<template>
  <v-app>
    <v-navigation-drawer v-if="!isAuthLayout" permanent class="fill-width ml-4">
      <v-list>
        <v-list-item flat class="mx-auto px-2 rounded-lg mr-2 border border-1" max-width="500"
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" :subtitle="user.email" :title="user.name"
          append-icon="mdi-dots-vertical">
          <template v-slot:prepend>
            <v-avatar size="35" class="mr-2">
              <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>


      <v-divider></v-divider>

      <v-list v-for="(item, i) in items" :key="i" :value="item" density="compact" nav>
        <v-list-item :title="item.text" :value="item.icon">
          <template v-slot:prepend>
            <v-icon color="black" :icon="item?.icon"></v-icon>
          </template>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <NuxtLink to="/auth/register">
            <v-btn block>
              {{ currentPathname }}
            </v-btn>
          </NuxtLink>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main :class="isAuthLayout ? 'hero-section' : ''">
      <NuxtPage />
    </v-main>
    <!-- 
    <v-footer color="#51A687" height="10">
      <v-container class="text-center text-caption">
        © {{ new Date().getFullYear() }} My Application - All Rights Reserved
      </v-container>
    </v-footer> -->
  </v-app>
</template>

<style scoped>
/* Target the top-level drawer element */
    .hero-section {
        background-image: url('/background.jpg'); /* Relative path to your image */
        height: 400px; /* Example height for visibility */
        background-size: cover; /* Ensures the image covers the entire element */
        background-position: center; /* Centers the image within the element */
        background-repeat: no-repeat; /* Prevents the image from repeating */
        color: white; /* Example text color for readability */
        padding: 20px;
    }
</style>
