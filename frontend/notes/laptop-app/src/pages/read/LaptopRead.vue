<template>
  <v-container
      fluid
      class="pa-4"
      style="height: calc(100vh - 64px); overflow-y: auto;"
  >
    <v-row>
      <v-col cols="12">
        <h2>💻 노트북 정보</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field :model-value="title" label="제목" readonly />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field :model-value="price.toLocaleString() + '원'" label="가격" readonly />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-textarea :model-value="description" label="설명" readonly auto-grow />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-text-field :model-value="cpuType" label="CPU" readonly />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field :model-value="ramSize" label="RAM" readonly />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field :model-value="storageType" label="저장소" readonly />
      </v-col>
    </v-row>

    <v-row v-if="thumbnailUrl">
      <v-col cols="12">
        <h4>썸네일</h4>
        <v-img :src="thumbnailUrl" height="150" contain />
      </v-col>
    </v-row>

    <v-row v-if="detailImageUrlList.length > 0">
      <v-col cols="12">
        <h4>상세 이미지</h4>
        <v-row>
          <v-col
              v-for="(url, index) in detailImageUrlList"
              :key="url + '-' + index"
              cols="3"
          >
            <v-img :src="url" aspect-ratio="1" contain />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- 버튼 그룹 -->
    <v-row justify="end" class="mt-4">
      <v-col cols="auto">
        <v-btn
            @mouseover="hoverEdit = true"
            @mouseleave="hoverEdit = false"
            :style="editBtnStyle"
            @click="onEdit"
        >
          수정
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
            @mouseover="hoverDelete = true"
            @mouseleave="hoverDelete = false"
            :style="deleteBtnStyle"
            @click="onDelete"
        >
          삭제
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
            outlined
            @mouseover="hoverBack = true"
            @mouseleave="hoverBack = false"
            :style="backBtnStyle"
            @click="goBack"
        >
          뒤로가기
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLaptopStore } from '../../stores/laptopStore'

const route = useRoute()
const router = useRouter()
const laptopStore = useLaptopStore()

const title = ref('')
const description = ref('')
const price = ref(0)
const cpuType = ref('')
const ramSize = ref('')
const storageType = ref('')
const thumbnailUrl = ref('')
const detailImageUrlList = ref<string[]>([])
const laptopId = ref<number | null>(null)

// 버튼 hover 상태
const hoverEdit = ref(false)
const hoverDelete = ref(false)
const hoverBack = ref(false)

// 버튼 스타일 computed
const editBtnStyle = computed(() => ({
  backgroundColor: hoverEdit.value ? '#1565c0' : '#1976d2',
  color: 'white',
  transition: 'background-color 0.3s ease',
}))

const deleteBtnStyle = computed(() => ({
  backgroundColor: hoverDelete.value ? '#b71c1c' : '#d32f2f',
  color: 'white',
  transition: 'background-color 0.3s ease',
}))

const backBtnStyle = computed(() => ({
  backgroundColor: hoverBack.value ? '#00796b' : '#009688',
  color: 'white',
  transition: 'background-color 0.3s ease',
}))

onMounted(async () => {
  const id = Number(route.params.id)

  if (isNaN(id)) {
    alert('잘못된 요청입니다.')
    router.push({ name: 'LaptopList' })
    return
  }

  laptopId.value = id
  const fromRegister = route.query.fromRegister === 'true'

  if (fromRegister && laptopStore.loadedFromRegister && laptopStore.laptop?.laptopId === id) {
    const data = laptopStore.laptop
    console.log('✅ laptop read from Register:', data)

    title.value = data.title
    description.value = data.description
    price.value = data.price
    cpuType.value = data.cpu
    ramSize.value = data.ram
    storageType.value = data.storage
    thumbnailUrl.value = data.thumbnailImageUrl
    detailImageUrlList.value = data.detailImageUrlList ?? []

    // 일회성 플래그니까 바로 초기화
    laptopStore.loadedFromRegister = false
    return
  }

  // 그 외에는 항상 서버 요청
  try {
    await laptopStore.requestLaptopToSpring(id)
    const data = laptopStore.laptop
    console.log('laptop read from Spring:', data)

    title.value = data.title
    description.value = data.description
    price.value = data.price
    cpuType.value = data.cpu
    ramSize.value = data.ram
    storageType.value = data.storage
    thumbnailUrl.value = data.thumbnailImageUrl
    detailImageUrlList.value = data.detailImageUrlList ?? []
  } catch (e) {
    alert('조회 실패')
    console.error(e)
    router.push({ name: 'LaptopList' })
  }
})

function onEdit() {
  if (!laptopId.value) return
  router.push({ name: 'LaptopUpdate', params: { id: laptopId.value } })
}

async function onDelete() {
  if (!laptopId.value) return
  if (!confirm('정말 삭제하시겠습니까?')) return

  try {
    await laptopStore.requestDeleteLaptopToSpring(laptopId.value)
    alert('삭제 완료')
    router.push({ name: 'LaptopList' })
  } catch (e) {
    alert('삭제 실패')
    console.error(e)
  }
}

function goBack() {
  router.push({ name: 'LaptopList' })
}
</script>
