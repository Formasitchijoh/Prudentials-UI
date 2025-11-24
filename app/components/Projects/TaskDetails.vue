<template>
    <v-navigation-drawer v-model="drawerModel" temporary location="end" width="500" class="drawer-fullscreen"
        :scrim="true" @click:outside="drawerModel = false">
        <v-list :items="items1" density="comfortable" class="pt-6">
            <v-list-item v-for="item in items1" :key="item.value" :title="item.title" />
        </v-list>

        <template v-slot:append>
            <div class="pa-4">
                <v-btn variant="text" block @click="drawerModel = false">
                    Close
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script setup>
import { computed, watch, nextTick } from 'vue'

const props = defineProps({
    isDialogVisible: Boolean
})

const emit = defineEmits(['update:isDialogVisible'])

const drawerModel = computed({
    get: () => props.isDialogVisible,
    set: (val) => emit('update:isDialogVisible', val)
})

const items1 = [
    { title: 'Foo', value: 'foo' },
    { title: 'Bar', value: 'bar' },
    { title: 'Fizz', value: 'fizz' },
    { title: 'Buzz', value: 'buzz' },
]

// The scroll-closing logic has been removed as per your revised requirements.
// The drawer should stay open when scrolling the *main* page.

// CRITICAL: Force drawer to full height when opened
watch(drawerModel, async (isOpen) => {
    if (isOpen) {
        await nextTick()

        const drawer = document.querySelector('.drawer-fullscreen .v-navigation-drawer__content')
        if (drawer) {
            console.log("Value of the drawer top position \n", drawer.scrollTop);
            
            drawer.scrollTop = 0 // Reset drawer scroll
        }

        // Optional: Prevent background scroll entirely while the drawer is open.
        // This is the cleanest way to ensure the main content doesn't move.
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = '' // Restore scroll
    }
})
</script>

<style scoped>
/* Target the top-level drawer element */
.drawer-fullscreen {
    /* Forces the drawer to be fixed to the browser viewport, ignoring page scroll */
    position: fixed !important;
    height: 100vh !important;
    height: 100dvh !important;
    /* Modern viewport units */
    max-height: 100dvh !important;
    top: 0 !important;
    /* Align it to the top edge of the viewport */
}

/* Ensure the internal content area uses the full height and is scrollable internally */
.drawer-fullscreen .v-navigation-drawer__content {
    height: 100% !important;
    overflow-y: auto !important;
    /* Allows internal scrolling if content overflows the viewport height */
}
</style>
