<script setup lang="ts">
const title = ref("Prudentials");
useHead({
    meta: [{ content: title }],
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `${titleChunk} - Enterprise Management System`
            : "Prudentials";
    },
});


</script>

<template>
    <v-app>
        <LayoutMain />
        <v-main class="grey-background" style="position:relative;">
            <v-container fluid class="page-wrapper">
                <slot />
            </v-container>
        </v-main>
    </v-app>
</template>

<style>
.sticky-page-top {
    position: sticky;
    top: 48px;
    z-index: 2;
    background-color: #EEEEEE;
}

.grey-background {
    background-color: #EEEEEE;
    /* background-color: rgba(var(--v-theme-primary), var(--v-border-opacity)) */
    /* background-color: rgba(var(--v-theme-primary), 0.05) */
}


.position-sticky {
    position: sticky;
}

.no-wrap {
    white-space: nowrap !important;
}
</style>
