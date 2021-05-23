<template>
  <button v-for="item in bossNameArray" :key="item" v-on:click="table.rows=memberKcDictionary[item]">
    {{item}}
  </button>
  <table-lite
    :has-checkbox="false"
    :is-loading="table.isLoading"
    :is-re-search="table.isReSearch"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
  ></table-lite>
</template>

<script>
import TableLite from 'vue3-table-lite'
import { reactive } from '@vue/reactivity'
import hiScores from '@/hiscores'

export default {
  name: 'App',
  components: {
    TableLite
  },
  data: function () {
    return { d: true, table, bossNameArray, currentBossRows, memberKcDictionary }
  }
}

const memberKcDictionary = hiScores.memberKcDictionary
// console.log(memberKcDictionary)
const bossNameArray = Object.keys(memberKcDictionary)
// console.log(bossNameArray)
const currentBossRows = memberKcDictionary[bossNameArray[0]]
// console.log('currentBossRows ' + currentBossRows)
const table = reactive({
  isLoading: false,
  isReSearch: false,
  columns: [
    {
      label: 'Member',
      field: 'key',
      width: '50%',
      sortable: true,
      isKey: true
    },
    {
      label: 'Kill Count',
      field: 'value',
      width: '50%',
      sortable: true,
      display: function (row) {
        return (
          row.value
        )
      }
    }
  ],
  rows: currentBossRows,
  totalRecordCount: 2,
  sortable: {
    order: 'id',
    sort: 'asc'
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
