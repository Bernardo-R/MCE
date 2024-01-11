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

                <UFormGroup label="Estado" name="location">
                    <USelectMenu v-model="state.location" :options="cities" />
                </UFormGroup>

                <UFormGroup label="Para:" name="service">
                    <USelectMenu v-model="state.service" :options="service" />
                </UFormGroup>

                <!-- <URadioGroup v-model="state.selected" legend="Elija una de nuestras opiones:" :options="options" /> -->

                <UButton type="submit"
                    class="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                    Submit
                    <!-- <Alert /> -->
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

const cities = ['New York', 'New Jersey', 'Connecticut']
const service = ['Recojer', 'Estimado', 'Mudanza']
// const selected = [
//     'recojer',
//     'estimado',
//     'mudanza'
// ];


const schema = z.object({
    name: z.string().min(3, 'Muy corto'),
    location: z.enum(cities),
    zipcode: z.string().min(5, 'Must be 5 characters'),
    phone: z.string().min(8, 'Must be at least 8 characters'),
    service: z.enum(service)
})

type Schema = z.output<typeof schema>

const initialState = {
    name: undefined,
    zipcode: undefined,
    location: 'New York',
    phone: undefined,
    service: 'Recojer'
}
const state = ref({
    ...initialState
})

async function onSubmit(event: FormSubmitEvent<Schema>) {

    await postPeople({
        name: event.data.name,
        zipcode: event.data.zipcode,
        location: event.data.location,
        phone: event.data.phone,
        service: event.data.service
    })

    // console.log(event.data);
    state.value = {
        ...initialState
    }

}

</script>