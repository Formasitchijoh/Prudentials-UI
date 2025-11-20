<script setup lang="ts">
const items = ref([{ icon: 'mdi-home-outline', text: 'Dashboard' }, { icon: 'mdi-mail', text: 'Projects' }, { icon: 'mdi-calendar-check-outline', text: 'Task' }, { icon: 'mdi-finance', text: 'Finance' },])
const items1 = ref([{ icon: 'mdi-file-outline', text: 'Documents' }, { icon: 'mdi-mail', text: 'Mettings' }])

</script>
<template class="">
  <v-app>
    <v-navigation-drawer  permanent class="fill-width m-4 bg-[#1e3A8A]">
      <v-card flat class="mx-auto px-2 rounded-lg mr-2 py-2 border border-1" max-width="500">
        <v-card-title class="pa-0 d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-avatar size="45" class="mr-2">
              <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
            </v-avatar>
            <div>
              <div class="text-body-1 font-weight-bold">David donin</div>
              <div class="text-caption text-medium-emphasis">daviddonin@gmail.com</div>
            </div>
          </div>
          <v-icon size="20">mdi-dots-vertical</v-icon>
        </v-card-title>
      </v-card>

      <ul v-for="(item, i) in items" :key="i" :value="item">
        <li class="flex items-center m-4 space-x-2 cursor-pointer">
          <v-icon color="grey-darken-3" :icon="item?.icon"></v-icon>
          <span class="text-caption text-large-emphasis">{{ item?.text }}</span>
        </li>
      </ul>

      <div class="h-[1px] w-[90%] bg-black/50 mx-auto"></div>

      <ul v-for="(item, i) in items1" :key="i" :value="item">
        <li class="flex items-center m-4 space-x-2 cursor-pointer">
          <v-icon color="grey-darken-3" :icon="item?.icon"></v-icon>
          <span class="text-caption text-large-emphasis">{{ item?.text }}</span>
        </li>
      </ul>
      <template v-slot:append>
        <div class="pa-2">
          <NuxtLink to="/auth/register">
            <v-btn block>
              SignUp
            </v-btn>
          </NuxtLink>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="">
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
