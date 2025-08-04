<template>
  <v-container
      fluid
      class="pa-4"
      style="height: calc(100vh - 64px); overflow-y: auto;"
  >
    <v-row>
      <v-col cols="12">
        <h2>💻 노트북 등록</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div
            :style="textfieldStyle(hoverTitle)"
            @mouseover="hoverTitle = true"
            @mouseleave="hoverTitle = false"
        >
          <label style="display: block; margin-bottom: 4px;">제목</label>
          <input
              v-model="title"
              type="text"
              :style="inputInnerStyle"
          />
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div :style="textfieldStyle(hoverPrice)" @mouseover="hoverPrice = true" @mouseleave="hoverPrice = false">
          <label style="display: block; margin-bottom: 4px;">가격</label>
          <input v-model.number="price" type="number" :style="inputInnerStyle" />
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div
            :style="textfieldStyle(isHovered)"
            @mouseover="isHovered = true"
            @mouseleave="isHovered = false"
        >
          <label :style="labelStyle">설명</label>
          <textarea
              v-model="description"
              ref="textarea"
              :style="[textareaStyle, isFocused ? focusStyle : {}]"
              @input="autoGrow"
              @focus="isFocused = true"
              @blur="isFocused = false"
          />
        </div>
      </v-col>
    </v-row>

    <!-- 드롭다운 옵션 -->
    <v-row>
      <v-col cols="4">
        <div :style="dropdownStyle(hoverCpu)" @mouseover="hoverCpu = true" @mouseleave="hoverCpu = false">
          <label style="display: block; margin-bottom: 4px;">CPU</label>
          <select v-model="cpu" :style="selectInnerStyle">
            <option disabled value="">선택하세요</option>
            <option v-for="option in cpuOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </v-col>

      <v-col cols="4">
        <div :style="dropdownStyle(hoverRam)" @mouseover="hoverRam = true" @mouseleave="hoverRam = false">
          <label style="display: block; margin-bottom: 4px;">RAM</label>
          <select v-model="ram" :style="selectInnerStyle">
            <option disabled value="">선택하세요</option>
            <option v-for="option in ramOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </v-col>

      <v-col cols="4">
        <div :style="dropdownStyle(hoverStorage)" @mouseover="hoverStorage = true" @mouseleave="hoverStorage = false">
          <label style="display: block; margin-bottom: 4px;">Storage</label>
          <select v-model="storage" :style="selectInnerStyle">
            <option disabled value="">선택하세요</option>
            <option v-for="option in storageOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </v-col>
    </v-row>

    <!-- 썸네일 미리보기 -->
    <v-row v-if="thumbnailUrl" class="mb-2">
      <v-col cols="12">
        <h4>현재 썸네일</h4>
        <v-img :src="thumbnailUrl" height="150" contain />
        <v-btn color="error" small @click="removeThumbnail">썸네일 삭제</v-btn>
      </v-col>
    </v-row>

    <!-- 썸네일 업로드 -->
      <v-row>
          <v-col cols="12">
              <div
                      :style="textfieldStyle(hoverThumbnail)"
                      @mouseover="hoverThumbnail = true"
                      @mouseleave="hoverThumbnail = false"
                      class="thumbnail-upload-wrapper"
              >
                  <label :style="labelStyle">
                      썸네일 이미지 업로드 (1개)
                  </label>

                  <div
                          :style="thumbnailUploaderStyle"
                          @click="onFileInputClick"
                  >
                      <v-icon icon="mdi-camera" class="camera-icon" />
                      <span :style="thumbnailFileLabelStyle">
          {{ thumbnailInputValue?.name || '파일 선택' }}
        </span>
                  </div>

                  <input
                          ref="fileInputRef"
                          type="file"
                          accept="image/*"
                          @change="onFileChange"
                          style="display: none"
                  />
              </div>
          </v-col>
      </v-row>

      <!-- 추가 이미지 업로드 -->
    <v-row>
      <v-col cols="12">
          <div
                  :style="textfieldStyle(hoverAddImage)"
                  @mouseover="hoverAddImage = true"
                  @mouseleave="hoverAddImage = false"
          >
              <label style="display: block; margin-bottom: 4px;">추가 이미지 업로드 (여러 개 가능)</label>

              <div
                      :style="thumbnailUploaderStyle"
                      @click="onAddImagesClick"
              >
                  <v-icon icon="mdi-camera" />
                  <span :style="thumbnailFileLabelStyle">
          {{ addImageInputValue && addImageInputValue.length > 0
                      ? `${addImageInputValue.length}개 선택됨`
                      : '파일 선택' }}
        </span>
              </div>

              <input
                      ref="addFileInputRef"
                      type="file"
                      multiple
                      accept="image/*"
                      @change="onAddFilesChange"
                      style="display: none"
              />
          </div>
      </v-col>
    </v-row>

    <!-- 추가 이미지 목록 -->
    <v-row v-if="imageFiles.length > 0" class="mb-2">
      <v-col cols="12">
        <h4>선택한 추가 이미지 목록</h4>
        <v-chip-group column>
          <v-chip
              v-for="(file, index) in imageFiles"
              :key="file.name + '-' + index"
              class="ma-1"
              close
              @click:close="removeImage(index)"
          >
            {{ file.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <!-- 추가 이미지 미리보기 -->
    <v-row v-if="imagePreviews.length > 0" class="mb-4">
      <v-col cols="12">
        <h4>추가 이미지 미리보기</h4>
        <v-row>
          <v-col
              v-for="(src, idx) in imagePreviews"
              :key="src + '-' + idx"
              cols="3"
              class="position-relative"
              style="position: relative;"
          >
            <v-img :src="src" aspect-ratio="1" contain />

            <!-- 삭제 버튼 -->
            <v-btn
                icon
                small
                color="red"
                style="position: absolute; top: 4px; right: 4px; z-index: 10;"
                @click="removeImage(idx)"
            >
              <v-icon icon="mdi-close" />
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- 버튼 -->
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn
            :style="primaryBtnStyle"
            class="btn-primary"
            @mouseover="hoverPrimary = true"
            @mouseleave="hoverPrimary = false"
            @click="onSubmit"
        >
          등록 완료
        </v-btn>

        <v-btn
            :style="errorBtnStyle"
            class="btn-error ml-2"
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useLaptopStore } from '../../stores/laptopStore.ts'

import {
  cpuOptions,
  ramOptions,
  storageOptions
} from '../../constants/laptopOptions'

// 드롭다운 값
const cpu = ref('')
const ram = ref('')
const storage = ref('')

// 입력값
const title = ref('')
const description = ref('')
const price = ref(0)

const thumbnailInputValue = ref<File[] | null>(null)
const thumbnailFile = ref<File | null>(null)
const thumbnailUrl = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

const thumbnailFileLabelStyle = {
    fontSize: '14px',
    color: '#555',
    marginLeft: '8px', // ← 여기 추가
}

const addImageInputValue = ref<File[] | null>(null)
const imageFiles = ref<File[]>([])
const imagePreviews = ref<string[]>([])

const hoverAddImage = ref(false)
const addFileInputRef = ref<HTMLInputElement | null>(null)

function onAddImagesClick() {
    addFileInputRef.value?.click()
}

function onAddFilesChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.files) return
    addImageInputValue.value = Array.from(target.files)
}

const hoverPrimary = ref(false)
const hoverError = ref(false)

const router = useRouter()
const laptopStore = useLaptopStore()

const hoverTitle = ref(false)
const hoverPrice = ref(false)
const hoverDescription = ref(false)

const hoverCpu = ref(false)
const hoverRam = ref(false)
const hoverStorage = ref(false)

const isHovered = ref(false)
const isFocused = ref(false)
const textarea = ref<HTMLTextAreaElement | null>(null)

const autoGrow = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${textarea.value.scrollHeight}px`
  }
}

onMounted(() => {
  autoGrow()
})

watch(description, () => {
  autoGrow()
})

const hoverThumbnail = ref(false)

const onThumbnailClick = () => {
    (thumbnailInput.value as HTMLInputElement)?.click()
}

const thumbnailInput = ref<HTMLInputElement | null>(null)

const onThumbnailSelected = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    thumbnailFile.value = file
    thumbnailUrl.value = URL.createObjectURL(file)
    thumbnailInputValue.value = [file] // 단일 파일
}

const inputInnerStyle = {
    width: '100%',
    fontSize: '14px',
    padding: '8px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    boxSizing: 'border-box'
}

const fileInputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    border: '1px dashed #aaa',
    borderRadius: '6px',
    backgroundColor: '#fafafa',
}

function onFileInputClick() {
    fileInputRef.value?.click()
}


function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    const files = target.files ? Array.from(target.files) : null
    thumbnailInputValue.value = files
}

const labelStyle = {
  display: 'block',
  marginBottom: '4px',
  fontSize: '14px',
  color: '#555'
}

const textareaStyle = {
  width: '100%',
  fontSize: '16px',
  padding: '12px 0 8px 0',
  border: 'none',
  borderBottom: 'none',
  outline: 'none',
  resize: 'none',
  backgroundColor: 'transparent',
  transition: 'border-color 0.2s'
}

const focusStyle = {
  // borderBottom: '2px solid #1976d2'
  borderBottom: 'none'
}

const textfieldStyle = (hover: boolean) => ({
  backgroundColor: hover ? '#f5f5f5' : '#fafafa',
  border: `1px solid ${hover ? '#1976d2' : '#c0c0c0'}`, // 파란색 강조 / 기본 테두리
  borderRadius: '4px',
  padding: '12px 12px 8px 12px', // 텍스트필드 특성에 맞게 약간 다르게 설정 가능
  marginBottom: '16px',
  fontSize: '14px',
  color: '#212121',
  boxShadow: hover ? '0 0 8px rgba(25, 118, 210, 0.3)' : 'none',
  cursor: 'text',
  outline: 'none',
  transition: 'all 0.3s ease',
  userSelect: 'text'
})

const dropdownStyle = (hover: boolean) => ({
  backgroundColor: hover ? '#f5f5f5' : '#fafafa',
  border: `1px solid ${hover ? '#1976d2' : '#c0c0c0'}`,  // 외부 테두리 담당
  borderRadius: '4px',
  padding: '4px 12px',   // select와 적절한 간격 유지
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  userSelect: 'none',
  fontSize: '14px',
  color: '#212121',
  boxShadow: hover ? '0 0 8px rgba(25, 118, 210, 0.3)' : 'none',
  outline: 'none',
})

const selectInnerStyle = {
  width: '100%',
  fontSize: '14px',
  padding: '8px 4px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  appearance: 'none',
  cursor: 'pointer',
  outline: 'none',
  color: '#212121',
}

// 버튼 스타일
const primaryBtnStyle = computed(() => ({
  backgroundColor: hoverPrimary.value ? '#1565c0' : '#1976d2',
  color: 'white',
  transition: 'background-color 0.3s ease',
}))
const errorBtnStyle = computed(() => ({
  backgroundColor: hoverError.value ? '#b71c1c' : '#d32f2f',
  color: 'white',
  transition: 'background-color 0.3s ease',
}))

let observer: MutationObserver | null = null

// 드롭다운 배경 투명 문제 해결
onMounted(() => {
  observer = new MutationObserver(() => {
    const menus = document.querySelectorAll<HTMLElement>('.v-menu__content')

    menus.forEach(menu => {
      // 배경색 흰색으로 강제 지정
      menu.style.backgroundColor = 'white'
      menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)'
      menu.style.borderRadius = '4px'
    })
  })

  // body 자식 변화 감시: v-menu__content는 동적으로 추가됨
  observer.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

// 썸네일 파일 변경 시
watch(thumbnailInputValue, (newFiles) => {
    if (!newFiles || newFiles.length === 0) {
        thumbnailFile.value = null
        thumbnailUrl.value = ''
        return
    }
    const file = newFiles[0]
    thumbnailFile.value = file
    thumbnailUrl.value = URL.createObjectURL(file)
})

// 썸네일 제거
function removeThumbnail() {
  thumbnailFile.value = null
  thumbnailUrl.value = ''
  thumbnailInputValue.value = null
}

// 추가 이미지 파일 변경 시
watch(addImageInputValue, (newFiles) => {
  if (!newFiles) return
  const files = Array.from(newFiles)
  const uniqueFiles = files.filter(
      (file) => !imageFiles.value.some((existing) => existing.name === file.name)
  )
  imageFiles.value = [...imageFiles.value, ...uniqueFiles]
  addImageInputValue.value = null
})

// 이미지 미리보기
watch(imageFiles, (files) => {
  imagePreviews.value.forEach((url) => URL.revokeObjectURL(url))
  imagePreviews.value = files.map((file) => URL.createObjectURL(file))
}, { immediate: true })

// 개별 이미지 삭제
function removeImage(index: number) {
  console.log('removeImage called:', index, imageFiles.value[index]?.name)
  imageFiles.value.splice(index, 1)
  imageFiles.value = [...imageFiles.value] // 강제 갱신
}

// 등록 요청
async function onSubmit() {
  if (!title.value.trim()) return alert('제목을 입력하세요.')
  if (!description.value.trim()) return alert('설명을 입력하세요.')
  if (!price.value || price.value <= 0) return alert('가격을 입력하세요.')
  if (!thumbnailFile.value) return alert('썸네일 이미지를 선택하세요.')
  if (!cpu.value) return alert('CPU를 선택하세요.')
  if (!ram.value) return alert('RAM을 선택하세요.')
  if (!storage.value) return alert('Storage를 선택하세요.')

  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('description', description.value)
  formData.append('price', price.value.toString())
  formData.append('thumbnailFile', thumbnailFile.value)
  formData.append('cpuType', cpu.value)
  formData.append('ramSize', ram.value)
  formData.append('storageType', storage.value)
  imageFiles.value.forEach((file) => {
    formData.append('imageFileList', file)
  })

  try {
    const id = await laptopStore.requestCreateLaptopToSpring(formData)

    console.log('id:', id)

    router.push({
      name: 'LaptopRead',
      params: { id },
      query: { fromRegister: 'true' }
    })
  } catch (error) {
    alert('등록 실패!')
    console.error(error)
  }
}

// 취소
function onCancel() {
  router.go(-1)
}
</script>
