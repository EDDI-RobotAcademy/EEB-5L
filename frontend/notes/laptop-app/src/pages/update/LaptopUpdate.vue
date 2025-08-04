<template>
  <v-container fluid class="pa-4" style="height: calc(100vh - 64px); overflow-y: auto;">
    <v-row>
      <v-col cols="12">
        <h2>💻 노트북 수정</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
            v-model="title"
            label="제목"
            outlined
            :color="hoverTitle ? 'primary' : undefined"
            @mouseover="hoverTitle = true"
            @mouseleave="hoverTitle = false"
            dense
            required
        />
      </v-col>
    </v-row>

    <!-- 가격 -->
    <v-row>
      <v-col cols="12">
        <v-text-field
            v-model.number="price"
            label="가격"
            type="number"
            outlined
            :color="hoverPrice ? 'primary' : undefined"
            @mouseover="hoverPrice = true"
            @mouseleave="hoverPrice = false"
            dense
            required
        />
      </v-col>
    </v-row>

    <!-- 설명 -->
    <v-row>
      <v-col cols="12">
        <v-textarea
            v-model="description"
            label="설명"
            outlined
            :color="hoverDescription ? 'primary' : undefined"
            auto-grow
            rows="3"
            @mouseover="hoverDescription = true"
            @mouseleave="hoverDescription = false"
            required
        />
      </v-col>
    </v-row>

    <!-- CPU / RAM / Storage -->
    <v-row>
      <v-col cols="4">
        <v-select
            v-model="cpu"
            :items="cpuOptions"
            item-text="label"
            item-value="value"
            label="CPU"
            outlined
            :color="hoverCpu ? 'primary' : undefined"
            @mouseover="hoverCpu = true"
            @mouseleave="hoverCpu = false"
            required
        />
      </v-col>

      <v-col cols="4">
        <v-select
            v-model="ram"
            :items="ramOptions"
            item-text="label"
            item-value="value"
            label="RAM"
            outlined
            :color="hoverRam ? 'primary' : undefined"
            @mouseover="hoverRam = true"
            @mouseleave="hoverRam = false"
            required
        />
      </v-col>

      <v-col cols="4">
        <v-select
            v-model="storage"
            :items="storageOptions"
            item-text="label"
            item-value="value"
            label="저장소"
            outlined
            :color="hoverStorage ? 'primary' : undefined"
            @mouseover="hoverStorage = true"
            @mouseleave="hoverStorage = false"
            required
        />
      </v-col>
    </v-row>

    <!-- 썸네일 미리보기 및 삭제 -->
    <v-row v-if="thumbnailUrl" class="mb-4">
      <v-col cols="12">
        <h4>현재 썸네일</h4>
        <v-img :src="thumbnailUrl" height="150" contain />
        <v-btn color="error" small @click="removeThumbnail">썸네일 삭제</v-btn>
      </v-col>
    </v-row>

    <!-- 썸네일 파일 업로드 -->
    <v-row>
      <v-col cols="12">
        <v-file-input
            v-model="thumbnailFile"
            accept="image/*"
            label="썸네일 이미지 업로드 (1개)"
            clearable
            prepend-icon="mdi-camera"
            outlined
            dense
            :color="hoverThumbnail ? 'primary' : undefined"
            @mouseover="hoverThumbnail = true"
            @mouseleave="hoverThumbnail = false"
            @click:clear="removeThumbnail"
        />
      </v-col>
    </v-row>

    <!-- 추가 이미지 업로드 -->
    <v-row>
      <v-col cols="12">
        <v-file-input
            v-model="imageFiles"
            multiple
            accept="image/*"
            label="추가 이미지 업로드 (여러 개 가능)"
            clearable
            prepend-icon="mdi-camera"
            outlined
            dense
            :color="hoverAddImage ? 'primary' : undefined"
            @mouseover="hoverAddImage = true"
            @mouseleave="hoverAddImage = false"
        />
      </v-col>
    </v-row>

    <!-- 추가 이미지 미리보기 및 삭제 버튼 -->
    <v-row v-if="imagePreviews.length > 0" class="mb-4">
      <v-col cols="12">
        <h4>추가 이미지 미리보기</h4>
        <v-row>
          <v-col
              v-for="(src, idx) in imagePreviews"
              :key="src + '-' + idx"
              cols="3"
          >
            <v-img :src="src" aspect-ratio="1" contain>
              <template #append>
                <v-btn
                    icon
                    color="error"
                    small
                    @click.stop="removeImage(idx)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- 버튼 그룹 -->
    <v-row justify="end" class="mt-4">
      <v-col cols="auto">
        <v-btn
            color="primary"
            dark
            @mouseover="hoverPrimary = true"
            @mouseleave="hoverPrimary = false"
            @click="onSubmit"
        >
          수정 완료
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
            color="error"
            dark
            @mouseover="hoverError = true"
            @mouseleave="hoverError = false"
            @click="onCancel"
        >
          취소
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLaptopStore } from '../../stores/laptopStore'

import {
  cpuOptions,
  ramOptions,
  storageOptions
} from '../../constants/laptopOptions'

const title = ref('')
const description = ref('')
const price = ref<number | null>(null)
const cpu = ref('')
const ram = ref('')
const storage = ref('')

const thumbnailFile = ref<File | null>(null)
const thumbnailUrl = ref('')

const imageFiles = ref<File[]>([])
const imagePreviews = ref<string[]>([])

const hoverTitle = ref(false)
const hoverPrice = ref(false)
const hoverDescription = ref(false)
const hoverCpu = ref(false)
const hoverRam = ref(false)
const hoverStorage = ref(false)
const hoverThumbnail = ref(false)
const hoverAddImage = ref(false)
const hoverPrimary = ref(false)
const hoverError = ref(false)

const router = useRouter()
const route = useRoute()
const laptopStore = useLaptopStore()

const laptopId = ref<number | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  if (isNaN(id)) {
    alert('잘못된 요청입니다.')
    router.push({ name: 'LaptopList' })
    return
  }

  laptopId.value = id

  try {
    await laptopStore.requestLaptopToSpring(id)
    const data = laptopStore.laptop
    if (!data) throw new Error('노트북 데이터를 불러오지 못했습니다.')

    title.value = data.title
    description.value = data.description
    price.value = data.price
    cpu.value = data.cpu
    ram.value = data.ram
    storage.value = data.storage
    thumbnailUrl.value = data.thumbnailImageUrl

    imagePreviews.value = data.detailImageUrls ?? []
    imageFiles.value = []
  } catch (e) {
    alert('데이터 로드 실패')
    console.error(e)
    router.push({ name: 'LaptopList' })
  }
})

function removeThumbnail() {
  thumbnailFile.value = null
  thumbnailUrl.value = ''
}

function removeImage(idx: number) {
  imageFiles.value.splice(idx, 1)
  imagePreviews.value.splice(idx, 1)
}

watch(thumbnailFile, (file) => {
  if (!file) {
    thumbnailUrl.value = ''
    return
  }
  thumbnailUrl.value = URL.createObjectURL(file)
})

watch(imageFiles, (files) => {
  imagePreviews.value.forEach(url => URL.revokeObjectURL(url))
  imagePreviews.value = files.map(file => URL.createObjectURL(file))
})

async function onSubmit() {
  if (!title.value.trim()) return alert('제목을 입력하세요.')
  if (!description.value.trim()) return alert('설명을 입력하세요.')
  if (!price.value || price.value <= 0) return alert('가격을 입력하세요.')
  if (!cpu.value) return alert('CPU를 선택하세요.')
  if (!ram.value) return alert('RAM을 선택하세요.')
  if (!storage.value) return alert('저장소를 선택하세요.')

  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('description', description.value)
  formData.append('price', price.value.toString())
  formData.append('cpu', cpu.value)
  formData.append('ram', ram.value)
  formData.append('storage', storage.value)

  if (thumbnailFile.value) {
    formData.append('thumbnailImage', thumbnailFile.value)
  } else if (!thumbnailUrl.value) {
    formData.append('thumbnailImage', '')
  }

  imageFiles.value.forEach(file => formData.append('detailImages', file))

  try {
    if (!laptopId.value) throw new Error('유효하지 않은 노트북 ID입니다.')
    await laptopStore.requestUpdateLaptopToSpring(laptopId.value, formData)
    alert('수정 완료')
    router.push({ name: 'LaptopRead', params: { id: laptopId.value } })
  } catch (e) {
    alert('수정 실패')
    console.error(e)
  }
}

function onCancel() {
  router.push({ name: 'LaptopRead', params: { id: laptopId.value } })
}
</script>
