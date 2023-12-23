<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
    middleware: 'auth'
})

const { getPeoples, peoples } = useFirestore()

await getPeoples()

// function select(row) {
//     const index = selected.value.findIndex((item) => item.id === row.id)
//     if (index === -1) {
//         selected.value.push(row)
//     } else {
//         selected.value.splice(index, 1)
//     }
// }

const selected = ref([])
</script>


<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
                <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title,
                    email and role.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button"
                    class="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
                    user</button>
            </div>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="relative">
                        <UTable :rows="peoples" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>