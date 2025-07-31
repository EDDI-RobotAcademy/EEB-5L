<template>
  <v-container>
    <h2>안녕 Vue3 TypeScript 기반 Board App이야</h2>
    <div style="text-align: left; margin: 15px;">
      <router-link :to="{ name: 'VueBoardRegister' }">
        게시물 작성
      </router-link>
    </div>
<!--    <v-data-table-->
<!--        v-model:items-per-page="perPage"-->
<!--        :headers="headerTitle"-->
<!--        :items="pagedItems"-->
<!--        class="elevation-1"-->
<!--        item-value="boardId"-->
<!--    />-->
      <v-data-table
              v-model:items-per-page="perPage"
              :headers="headerTitle"
              :items="boardStore.boardList"
              class="elevation-1"
              item-value="boardId"
              @click:row="readRow"
              hide-default-footer
      />

      <v-pagination
              v-model="pagination.page"
              :length="totalPages"
              color="primary"
              @update:modelValue="updateItems"
      />
  </v-container>
</template>

<script setup lang="ts">
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBoardStore } from "../../stores/boardStore.ts";

const boardStore = useBoardStore()
const router = useRouter()

const perPage = ref(5)
const pagination = ref({
  page: 1
})

const headerTitle = [
  { title: 'No', align: 'start', sortable: true, key: 'boardId' },
  { title: '제목', align: 'end', key: 'title' },
  { title: '작성자', align: 'end', key: 'nickname' },
  { title: '작성일자', align: 'end', key: 'createDate' }
]

const pagedItems = computed(() => boardStore.boardList)
const totalPages = computed(() => boardStore.totalPages)

const readRow = (_event: any, { item }: any) => {
  console.log('_event:', _event)
  console.log('item:', item)
  console.log('item.selectable:', item.boardId)
  const selectedBoardId = item.boardId
  console.log('selectedBoardId:', selectedBoardId)
  router.push({
    name: 'VueBoardRead',
    params: { boardId: selectedBoardId.toString() }
  })
}

const updateItems = () => {
    boardStore.requestBoardListToSpring(pagination.value.page, perPage.value)
}

onMounted(() => {
    boardStore.requestBoardListToSpring(pagination.value.page, perPage.value)
})
</script>

<style scoped>
</style>