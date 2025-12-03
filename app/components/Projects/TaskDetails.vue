<template>
    <v-navigation-drawer v-model="drawerModel" temporary location="end" width="500" class="drawer-fullscreen"
        :scrim="true" @click:outside="drawerModel = false">

        <!-- Place fixed top content here -->
        <div class="d-flex justify-space-between align-center ma-4">
            <v-icon @click="drawerModel = false" size="20">mdi-close</v-icon>

            <div class="d-inline-flex justify-space-between ga-2">
                <v-icon size="20">mdi-clock-outline</v-icon>
                <v-icon size="20">mdi-star-outline</v-icon>
                <v-icon size="20">mdi-dots-vertical</v-icon>
            </div>
        </div>
        <div class="pa-4">
            <h1 class="text-h6 text-high-emphasis text-start text-break font-weight-semibold">{{ task?.title }}</h1>
        </div>

        <v-row class="w-90 ps-4">
            <v-col cols="12" md="6">
                <shared-task-item-label icon-name="mdi-clock-outline" label="Created Time" />
            </v-col>
            <v-col cols="12" md="6">
                <div class="text-caption">
                    {{ moment(task?.created_at).format('MMMM DD, YYYY HH:mm').split(' ').slice(0, -1).join(' ') }}
                    <span class="text-caption text-medium-emphasis">
                        {{ moment(task?.created_at).format('MMMM DD, YYYY HH:mm').split(' ').pop() }}
                    </span>
                </div>
            </v-col>
        </v-row>

        <v-row class="w-90 ps-4">
            <v-col cols="12" md="6">
                <shared-task-item-label icon-name="mdi-progress-helper" label="Status" />
            </v-col>
            <v-col cols="12" md="6">
                <v-chip size="x-small" class="" color="orange" label>
                    <v-icon icon="mdi-circle-medium" start></v-icon>
                    In Research </v-chip>
            </v-col>
        </v-row>
        <v-row class="w-90 ps-4">
            <v-col cols="12" md="6">
                <shared-task-item-label icon-name="mdi-check-circle-outline" label="Priority" />
            </v-col>
            <v-col cols="12" md="6">
                <v-chip size="x-small" class="" color="primary" label>
                    <v-icon icon="mdi-circle-medium" start></v-icon>
                    Low </v-chip>
            </v-col>
        </v-row>
        <v-row class="w-90 ps-4">
            <v-col cols="12" md="6">
                <shared-task-item-label icon-name="mdi-calendar-range" label="Due Date" />
            </v-col>
            <v-col cols="12" md="6">
                <div class="text-caption">October 10 2025 - October 15 2025
                </div>
            </v-col>
        </v-row>
        <v-row class="w-90 ps-4 ">
            <v-col cols="12" md="6">
                <shared-task-item-label icon-name="mdi-tag-outline" label="Tags" />
            </v-col>
            <v-col cols="12" md="6">
                <div class="d-flex justify-space-between text-break align-center">
                    <v-chip size="x-small" class="" color="primary" label>
                        <v-icon icon="mdi-circle-medium" start></v-icon>
                        Task </v-chip>
                    <v-chip size="x-small" class="" color="primary" label>
                        <v-icon icon="mdi-circle-medium" start></v-icon>
                        WireFrame </v-chip>
                    <v-chip size="x-small" class="" color="primary" label>
                        <v-icon icon="mdi-circle-medium" start></v-icon>
                        HomePage </v-chip>
                </div>
            </v-col>
        </v-row>

        <v-row class="w-90 ps-4">
            <v-col cols="12" md="6">
                <shared-task-item-label icon-name="mdi-account-group-outline" label="Assignees" />
            </v-col>
            <v-col cols="12" class="d-flex justify-start pl-14" md="6">
                <shared-avatar-stack />
            </v-col>
        </v-row>
        <v-card class="ma-4 bg-grey-lighten-5 rounded-lg" flat rounded="lg">
            <v-card-title class="text-h6 font-weight-semibold">Project Description</v-card-title>
            <v-card-item class="">
                <p class="text-caption">
                    {{ task?.description }}
                </p>

            </v-card-item>
        </v-card>

        <v-tabs width="100%" v-model="tab" :items="tabs" align-tabs="start" height="60" class="mt-10 flex-grow-1">

            <template v-slot:tab="{ item }">
                <v-tab :text="item.text" active-color="#6f78c9" density="comfortable" :value="item.value"
                    class="text-none">
                </v-tab>
            </template>

            <template v-slot:item="{ item }">
                <v-tabs-window-item width="100%" class="mx-100" :value="item.value">
                    <v-card>
                        <v-card-text v-for="comment in comments">
                            <v-list-item class="w-100">
                                <template v-slot:prepend>
                                    <v-avatar size="25" color="grey-darken-3"
                                        image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-avatar>
                                </template>

                                <v-list-item-title>{{ user.name }} @ {{ moment(task?.created_at).format('MMMM DD,HH:mm')
                                }}</v-list-item-title>

                                <v-list-item-subtitle>{{ comment.body }}</v-list-item-subtitle>
                            </v-list-item>
                        </v-card-text>
                    </v-card>
                </v-tabs-window-item>
            </template>
        </v-tabs>



        <template v-slot:append>
            <v-card class="pa-4">
                <!-- <div class="d-flex align-start"> -->
                <v-card-text>
                    <!-- Status Messages -->
                    <v-alert v-if="successMessage" type="success" class="mt-4">{{ successMessage }}</v-alert>
                    <v-alert v-if="errorMessage" type="error" class="mt-4">{{ errorMessage }}</v-alert>
                    <v-form ref="form">
                        <div class="flex-grow-1" bg-color="#f8fafb">
                            <v-textarea placeholder="Add a comment..." class="h-10 mb-2" v-model="body" rows="3" variant="solo"
                                hide-details auto-grow></v-textarea>

                            <div class="d-flex justify-end align-center">

                                <v-file-input variant="plain" v-model="file" accept=".pdf,.jpg,.png,.doc,.docx"
                                    prepend-icon="mdi-paperclip" show-size clearable></v-file-input>
                                <v-btn color="primary" variant="flat" size="small" @click="handleSummit">
                                    Comment
                                </v-btn>
                            </div>
                        </div>
                    </v-form>
                </v-card-text>
                <!-- </div> -->
            </v-card>
        </template>
    </v-navigation-drawer>
</template>


<script setup lang="ts">
import { computed, watch, nextTick } from 'vue'
import type { TaskItem } from '../../utils/types'
import moment from 'moment'
const props = defineProps({
    isDialogVisible: Boolean,
    task: {
        type: Object as PropType<TaskItem>,
        required: true
    }
})
const emit = defineEmits(['update:isDialogVisible'])
const sharedStore = useSharedStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { comments, loader, message } = storeToRefs(sharedStore);


//State Variables
const file = ref<File | null>(null)
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const form = ref<HTMLFormElement | null>(null);
const body = ref<String>('')
const tab = shallowRef('tab-1')


// Hardcoded sample data for 
const tenantId = 1;
const userId = user.value.id;
const documentableId = 1;
const documentableType = morphType('Comment', 'Shared');

const comment = computed(() => (
    {
        tenant_id: 1,
        body: body.value,
        commentable_id: props.task?.id,
        commentable_type: morphType('Task', 'Projects'),
        user_id: user.value?.id

    }
))
const drawerModel = computed({
    get: () => props.isDialogVisible,
    set: (val) => emit('update:isDialogVisible', val)
})

onMounted(() => {
    sharedStore.getComments()
})

// watch([drawerModel, loader], (newValue, newLoader) => {
//     if(newValue || newLoader) {
//         sharedStore.getComments()
//         console.log("This is the comment for the task \n", comment.value);
//     }

// })

// The scroll-closing logic has been removed as per your revised requirements.
// The drawer should stay open when scrolling the *main* page.

// CRITICAL: Force drawer to full height when opened

watch(drawerModel, async (isOpen) => {
    if (isOpen) {
        await nextTick()

        const drawer = document.querySelector('.drawer-fullscreen .v-navigation-drawer__content')
        if (drawer) {
            drawer.scrollTop = 0 // Reset drawer scroll
        }

        // Optional: Prevent background scroll entirely while the drawer is open.
        // This is the cleanest way to ensure the main content doesn't move.
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = '' // Restore scroll
    }
})

const handleSummit = (data: Comment) => {
    // this operation needs a roolback mechanism if a document is not saved then the comment should not be saved
    sharedStore.saveComment(comment.value);
    submitForm()
}

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

const tabs = [
    {
        text: 'Comments',
        value: `tab-1`,
    },
    {
        text: 'Attachements',
        value: `tab-2`,
    },
    {
        text: 'Updates',
        value: `tab-3`,
    },
]
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
