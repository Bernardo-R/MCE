<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <!-- <img class="mx-auto h-10 w-auto" src="../assets/imgs/MCE_logo.png" alt="Your Company" /> -->
            <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Agrega tus datos
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Nombre Completo" name="name">
                    <UInput v-model="state.name" type="text" />
                </UFormGroup>

                <UFormGroup label="Telefono" name="phone">
                    <UInput v-model="state.phone" type="text" />
                </UFormGroup>

                <UFormGroup label="Zipcode" name="zipcode">
                    <UInput v-model="state.zipcode" type="text" />
                </UFormGroup>

                <UFormGroup label="Locacion" name="location">
                    <USelect v-model="state.location" :options="cities" />
                </UFormGroup>

                <URadioGroup v-model="state.selected" legend="Elija una de nuestras opiones:" :options="options" />

                <UButton type="submit"
                    class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                    Submit
                </UButton>
            </UForm>

            <p class="mt-2 text-center text-sm text-gray-500">
                Puedes tambien llamar al
                {{ ' ' }}
                <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">347-406-8005
                </a>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { postPeople } = useFirestore()

const cities = ['NY', 'NJ', 'CT']
const options = [{
    value: 'recojer',
    label: 'Recojer'
}, {
    value: 'estimado',
    label: 'Estimado'
}, {
    value: 'mudanza',
    label: 'Mudanza'
}]


const schema = z.object({
    name: z.string().min(3, 'Muy corto'),
    location: z.enum(cities),
    zipcode: z.string().min(5, 'Must be at least 5 characters'),
    phone: z.string().min(8, 'Must be at least 8 characters'),
    selected: z.enum(options)
})

type Schema = z.output<typeof schema>

const state = ref({
    name: undefined,
    zipcode: undefined,
    location: undefined,
    phone: undefined,
    selected: 'recojer'
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        console.log("button clicked")
        await postPeople({
            name: event.data.name,
            zipcode: event.data.zipcode,
            location: event.data.location,
            phone: event.data.phone,
            selected: event.data.selected
        })
    } catch (error) {
        console.error("Error submitting form:", error);
    }
}
</script>