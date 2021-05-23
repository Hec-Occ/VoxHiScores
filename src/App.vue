<template>
  <button v-for="item in bossNameArray" :key="item" v-on:click="onClick(item)">
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
    return { d: true, table, bossNameArray, currentBossRows, memberKcDictionary, onClick }
  }
}

const memberKcDictionary = hiScores.memberKcDictionary
// console.log(memberKcDictionary)
const bossNameArray = Object.keys(memberKcDictionary)
// console.log(bossNameArray)
const currentBossRows = memberKcDictionary[bossNameArray[0]]
currentBossRows.map((item, index) => { item.index = index + 1 })
// console.log('currentBossRows ' + currentBossRows)
console.log(memberKcDictionary)
const table = reactive({
  isLoading: false,
  isReSearch: false,
  columns: [
    {
      label: 'Rank',
      field: 'index',
      width: '20%'
    },
    {
      label: 'Member',
      field: 'key',
      width: '40%',
      sortable: true,
      isKey: true
    },
    {
      label: 'Kill Count',
      field: 'value',
      width: '40%',
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
  },
  messages: {
    pagingInfo: 'Showing {0}-{1} of {2}',
    pageSizeChangeLabel: 'Row count:',
    gotoPageLabel: 'Go to page:',
    noDataAvailable: 'No data'
  }
})

function onClick (item) {
  const obj = memberKcDictionary[item]
  obj.map((item, index) => { item.index = index + 1 })
  table.rows = memberKcDictionary[item]
}</script>

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
