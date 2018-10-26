<template>
<div>
  <Card>
    <Input search enter-button placeholder="输入钱包地址..." />
    <Tabs value="name1">
      <TabPane label="钱包收益" name="name1">
        <Card>
          <tables ref="tables" size="small" border searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
        </Card>
      </TabPane>
      <TabPane label="标签二" name="name2">
        <Card>
          <tables ref="tables" size="small" border searchable search-place="top" v-model="EtableData" :columns="Ecolumns" @on-delete="handleDelete" />
        </Card>
      </TabPane>
      <TabPane label="标签三" name="name3">
        <Card>
          <tables ref="tables" size="small" border searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
        </Card>
      </TabPane>
    </Tabs>
  </Card>
</div>
</template>

<script>
import Tables from '_c/tables'
import {
  Wallent, // 获取所有的钱包信息
  Expense
} from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [{
        title: '钱包地址',
        key: 'wallet',
        width: 400
      },
      {
        title: '实时算力',
        key: 'hr1',
        width: 100
      },
      {
        title: '24小时平均算力',
        key: 'hr2',
        width: 100
      },
      {
        title: '在线矿工',
        key: 'online',
        width: 200
      },
      {
        title: '离线矿工',
        key: 'offline',
        width: 200
      },
      {
        title: '总收益',
        key: 'paid',
        width: 200
      },
      {
        title: '最后提交时间',
        key: 'lastshare',
        width: 200
      },
      {
        title: '操作',
        key: 'lastshare',
        width: 300,
        render: (h, params) => {
          return h('Button', {
            props: {
              type: 'success'
            }
          }, '查看交易记录')
        }
      }
      ],
      Ecolumns: [{
        title: '区块数',
        key: 'num',
        width: 200
      },
      {
        title: '区块收益',
        key: 'reward',
        width: 200
      },
      {
        title: '昨日支出',
        key: 'amount_s',
        width: 200
      },
      {
        title: '时间',
        key: 'time',
        width: 200
      }
      ],
      tableData: [],
      EtableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    }
  },
  mounted () {
    Wallent().then(res => {
      console.log(res)
      res.data.forEach((item) => {
        this.tableData.push({
          'hr1': item.hr1,
          'hr2': item.hr2,
          'offline': item.offline,
          'online': item.online,
          'paid': item.paid,
          'wallet': item.wallet,
          'lastshare': item.lastshare
        })
      })
    })
    Expense().then(res => {
      console.log(res)
      res.data.data.forEach((item) => {
        this.EtableData.push({
          'id': item.id,
          'num': item.num,
          'reward': item.reward,
          'amount_s': item.amount_s,
          'amount': item.amount,
          'time': item.time
        })
      })
    })
  }
}
</script>

<style>

</style>
