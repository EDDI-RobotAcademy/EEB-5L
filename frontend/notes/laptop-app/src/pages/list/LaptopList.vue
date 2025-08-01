<template>
  <v-container fluid class="pa-4">
    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="auto">
        <h2>💻 노트북 목록</h2>
      </v-col>
      <v-col cols="auto">
        <router-link :to="{ name: 'LaptopRegister' }">
          <v-btn :class="['btn-primary']" :style="registerBtnStyle" elevation="2"
                 @mouseover="hoverRegister = true"
                 @mouseleave="hoverRegister = false">
            노트북 등록
          </v-btn>
        </router-link>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>

    <v-row v-else-if="laptopStore.laptopList.length === 0">
      <v-col cols="12" class="text-center">등록된 노트북이 없습니다.</v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="laptop in pagedLaptopList" :key="laptop.laptopId" cols="3">
        <v-card @click="goToDetail(laptop.laptopId)" class="hoverable" elevation="3">
          <v-img
              :src="laptop.thumbnailImageUrl"
              height="125px"
              cover
          />
          <v-card-title>{{ laptop.title }}</v-card-title>
          <v-card-subtitle>₩ {{ laptop.price.toLocaleString() }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4" justify="center">
      <v-pagination
          v-model="page"
          :length="totalPages"
          @input="fetchLaptops"
          color="primary"
      />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLaptopStore } from "../../stores/laptopStore.ts";

const laptopStore = useLaptopStore()
const router = useRouter()

const page = ref(1)
const perPage = 8
const totalPages = computed(() => laptopStore.totalPages)
const loading = ref(false)

const hoverRegister = ref(false)
const registerBtnStyle = computed(() => ({
  backgroundColor: hoverRegister.value ? '#1565c0' : '#1976d2',
  color: 'white',
  transition: 'background-color 0.3s ease',
}))

const fetchLaptops = async () => {
  loading.value = true
  try {
    await laptopStore.requestLaptopListToSpring(page.value, perPage)
  } catch (error) {
    console.error('노트북 목록 불러오기 실패:', error)
  } finally {
    loading.value = false
  }
}

const pagedLaptopList = computed(() => {
  return laptopStore.laptopList.slice(0, perPage)
})

const goToDetail = (id: number) => {
  router.push({
    name: 'LaptopRead',
    params: { id: id.toString() }
  })
}

onMounted(fetchLaptops)
</script>
