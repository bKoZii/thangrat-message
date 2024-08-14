<template>
  <div>
    <div
      class="bg-primary-800 fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:42px_42px] dark:bg-neutral-950"
    ></div>
    <UContainer class="w-screen max-w-[900px] p-3 sm:p-5">
      <div class="flex w-full flex-col gap-3">
        <UCard>
          <template #header>
            <div class="flex justify-between">
              <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
              <ColorScheme><USelectMenu v-model="$colorMode.preference" :options="['system', 'light', 'dark']"></USelectMenu></ColorScheme>
            </div>
          </template>
          <div>
            <UForm :state="state" :schema="schema" class="space-y-3">
              <UCheckbox v-model="selected" name="notifications" label="แสดงหัวเรื่อง " />
              <UFormGroup label="หัวเรื่อง" v-if="selected">
                <UInput v-model="headerText" label="ข้อความหัวเรื่อง" />
              </UFormGroup>
              <UFormGroup label="ข้อความของคุณ" name="statusText" required eager-validation>
                <UInput placeholder="ป้อนข้อความ" v-model="state.statusText" />
              </UFormGroup>

              <ClientOnly>
                <div class="mt-3 grid gap-2 sm:grid-cols-2">
                  <UButton
                    :disabled="!state.statusText"
                    type="submit"
                    label="บันทึกภาพ"
                    block
                    icon="ph:floppy-disk-duotone"
                    @click="saveImage()"
                    :loading="isLoading"
                  />
                  <UButton
                    :disabled="!state.statusText"
                    type="submit"
                    label="คัดลอกภาพ"
                    block
                    icon="ph:clipboard-duotone"
                    @click="copyImage()"
                    :loading="isLoading"
                  />
                </div>
              </ClientOnly>
            </UForm>
          </div>
        </UCard>
        <ClientOnly>
          <section ref="imgElement" class="relative mx-auto flex h-fit w-full items-center justify-center">
            <div class="absolute top-1/2 z-10 text-balance break-words px-8 text-center text-xs font-bold text-red-600 sm:px-12 sm:text-2xl">
              <h1 class="text-lg sm:text-4xl" v-if="selected">{{ headerText }}</h1>
              <p class="mt-3 font-medium">{{ state.statusText ? state.statusText : "เนื่องจาก..." }}</p>
            </div>
            <NuxtImg class="" width="100%" height="100%" src="/mainImage.png" />
          </section>
          <template #fallback>
            <span>Loading...</span>
          </template>
        </ClientOnly>
        <Footer />
      </div>
    </UContainer>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const headerText = ref("ขออภัย โครงการนี้กำลังจะถูกยกเลิก")
const statusText = ref("เนื่องจาก...")
const isLoading = ref(false)
const imgElement = ref<HTMLElement>()
const toast = useToast()
const pageTitle = "ทางรัฐ - แกไม่มีสิทธิ์!!"
const selected = ref(true)

import { z } from "zod"
import { toPng } from "html-to-image"
import { copyImageToClipboard } from "copy-image-clipboard"

useSeoMeta({
  title: pageTitle,
})

const saveImage = async () => {
  if (imgElement.value) {
    try {
      isLoading.value = true
      const dataUrl = await toPng(imgElement.value)
      const link = document.createElement("a")
      link.download = `ทางรัฐ-${statusText.value}.png`
      link.href = dataUrl
      link.click()
      toast.add({ title: "บันทึกภาพเรียบร้อย", icon: "ph:floppy-disk-duotone" })
    } catch (error) {
      console.error("Error capturing image:", error)
      toast.add({ title: "เกิดข้อผิดพลาด", color: "red", icon: "ph:warning-circle-duotone" })
    } finally {
      isLoading.value = false
    }
  }
}

const copyImage = async () => {
  isLoading.value = true
  if (imgElement.value) {
    await toPng(imgElement.value)
      .then((dataUrl) => {
        const img = new Image()
        img.src = dataUrl
        copyImageToClipboard(img.src)
        toast.add({ title: "คัดลอกรูปภาพสำเร็จ", description: `ข้อความ: ${state.statusText}`, icon: "ph:clipboard-duotone" })
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error)
        console.log(error.message)
        toast.add({ title: "เกิดข้อผิดพลาด", color: "red", icon: "ph:warning-circle-duotone" })
      })
  }
  isLoading.value = false
}

const schema = z.object({
  statusText: z.string().min(1, { message: "กรุณากรอกข้อความ" }).max(120, { message: "ข้อความยาวเกินไป ไม่แนะนำ" }),
})
const state = reactive({
  statusText: "เนื่องจาก...",
})

useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
    ogDescription: "Custom ข้อความ 'ท่านไม่มีสิทธิ์' จากแอพทางรัฐ ได้ตามใจ! ",
    description: "Custom ข้อความ 'ท่านไม่มีสิทธิ์' จากแอพทางรัฐ ได้ตามใจ! ",
    ogImage: "/mainLogo.png",
    ogUrl: "https://thangrat.konkamon.live"
})
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/mainLogo.png'
    }
  ]
})
</script>
