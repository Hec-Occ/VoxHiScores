<template>
  <button v-for="item in bossNameArray" :key="item">
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
    :messages="table.messages"
    @do-search="doSearch"
    @is-finished="tableLoadingFinish"
    @return-checked-rows="updateCheckedRows"
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
    return { d: true, table, bossNameArray, currentBossName }
  }
}

const test = hiScores.memberKcDictionary
console.log(test)
const bossNameArray = Object.keys(test)
console.log(bossNameArray)
const currentBossName = test[bossNameArray[0]]
console.log(currentBossName)
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
          '<a href="#" data-id="' + row.value + '" class="name-btn">' + row.name + '</button>'
        )
      }
    },
    {
      label: 'Email',
      field: 'email',
      width: '15%',
      sortable: true
    },
    {
      label: '',
      field: 'quick',
      width: '10%',
      display: function (row) {
        return (
          '<button type="button" data-id="' + row.user_id + '" class="quick-btn">Button</button>'
        )
      }
    }
  ],
  rows: test[currentBossName],
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
