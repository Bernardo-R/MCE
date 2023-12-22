<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                    <UInput v-model="state.password" type="password" />
                </UFormGroup>

                <UButton type="submit"
                    class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    log In
                </UButton>
            </UForm>

            <!-- <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                {{ ' ' }}
                <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free
                    trial</a>
            </p> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { ref } from 'vue'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

const { login } = useFirebaseAuth()

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = ref({
    email: undefined,
    password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)

    try {
        await login(event.data.email, event.data.password)
        toast.add({
            title: 'log in successful',
            timeout: 1000,
            callback: async () => {
                await navigateTo('/admin')
            }
        })

    } catch (error) {
        console.log(error)
    }
}

</script>

