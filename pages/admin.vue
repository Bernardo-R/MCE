<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
    middleware: 'auth'
})

const { getPeoples, deletePeople, peoples } = useFirestore()
const { signout, currentUser } = useFirebaseAuth()

await getPeoples()

// function select(row) {
//     const index = selected.value.findIndex((item) => item.id === row.id)
//     if (index === -1) {
//         selected.value.push(row)
//     } else {
//         selected.value.splice(index, 1)
//     }
// }

const columns = [{
    key: 'name',
    label: 'Nombre',
    class: "bg-gray-50"
}, {
    key: 'phone',
    label: 'Phone',
    class: "bg-gray-50"
}, {
    key: 'location',
    label: 'Estado',
    class: "bg-gray-50"
}, {
    key: 'zipcode',
    label: 'Zip Code',
    class: "bg-gray-50"
}, {
    key: 'service',
    label: 'Servicio',
    class: "bg-gray-50"
}, {
    key: 'actions',
    label: 'Actions',
    class: "bg-gray-50"
}]

const items = (row) => [
    // [{
    //     label: 'Edit',
    //     icon: 'i-heroicons-pencil-square-20-solid',
    //     click: () => console.log('Edit', row.id)
    // }],
    [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: async () => await deletePeople(row.id)
    }]
]

const selected = ref([])
</script>


<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Administracion</h1>
                <p class="mt-2 text-sm text-gray-700">Por el momento para mayor eficienia, elimina el cliente de la tabla
                    una ves contactado.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <UButton
                    class="block rounded-md bg-blue-700 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                    @click="signout">Log out</UButton>
            </div>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <div class="relative">
                            <UTable :rows="peoples" :columns="columns">
                                <template #actions-data="{ row }">

                                    <UButton :items="items(row)" color="gray" variant="ghost"
                                        icon="i-heroicons-trash-20-solid" @click="deletePeople(row.id)" />

                                </template>
                            </UTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>