<style>



</style>

<template>
<div>
  <Card>
    <!-- <Row type="flex">
      <Col :lg="{span:8,offset:16}">
      <Input search enter-button placeholder="输入钱包地址..." />
      </Col>
    </Row> -->
    <Tabs value="name1" type="card" :animated="false">
      <TabPane label="( UU端口 ) 矿池收益" name="name1">
        <Tag type="dot" color="primary">总暴块数 : {{EtableDataBlockSum}}</Tag>
        <Tag type="dot" color="success">总区块收益 : {{EtableDataQuKuaiSum}}</Tag>
        <Tag type="dot" color="error">总支付的矿工费 : {{EtableDataMillerSum}}</Tag>
        <Tag type="dot" color="warning">总矿池盈利 : {{EtableDataEarningsSum}}</Tag>
        <Row type="flex" justify="center" style="margin-top:1rem">
          <Col span="24">
          <Card>
            <tables ref="tables" :loading="loading" size="small" border searchable search-place="top" v-model="EtableDataSmall" :columns="Ecolumns" />
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="EtableData.length" :current="current1" :page-size-opts="[10,50,100]" placement="top" @on-change="changePage1" show-sizer :page-size="pageSize1" @on-page-size-change="changeSize1"></Page>
              </div>
            </div>
          </Card>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="钱包收益" name="name3">
        <Card title="导出EXCEL" style="marginBottom:1rem">
          <Row>
            <Button type="success" size="large" icon="md-download" :loading="exportLoading" @click="exportExcel" style="marginRight:1rem">导出所有数据</Button>
            <Button type="primary" size="large" icon="md-download" :loading="exportLoading" @click="exportExcelFilter">导出排序数据</Button>
          </Row>
        </Card>
        <Row type="flex" justify="center">
          <Col span="24">
          <Card>
            <tables v-if="filterList" ref="tables_earning" @on-filter-change="filterChange" :loading="loading" size="small" border searchable search-place="top" v-model="tableDataSmall" :columns="columns" />
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="tableData.length" :current="current" :page-size-opts="[10,50,100]" placement="top" @on-change="changePage" show-sizer :page-size="pageSize" @on-page-size-change="changeSize"></Page>
              </div>
            </div>
          </Card>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </Card>
  <Modal v-model="modal" :title="title" @on-ok="ok" @on-cancel="cancel" width="1000px">
    <Row type="flex" justify="center">
      <Col span="24">
      <Card>
        <tables ref="tables" :loading="loading" size="small" border searchable search-place="top" v-model="PtableDataSmall" :columns="Pcolumns" />
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="PtableData.length" :current="current2" :page-size-opts="[10,50,100]" placement="top" @on-change="changePage2" show-sizer :page-size="pageSize2" @on-page-size-change="changeSize2"></Page>
          </div>
        </div>
      </Card>
      </Col>
    </Row>
  </Modal>
</div>
</template>

<script>
import Tables from '_c/tables'
import excel from '@/libs/excel'
import {
  Wallent, // 获取所有的钱包信息
  Expense, // 矿池收益信息
  ExpenseTotal, // uu矿池总收益信息
  HC_Expense // 火池矿池收益信息
}
from '@/api/data'
Array.prototype.reArr = function() {
  var newArr = []
  for (var i = 0; i < this.length; i++) {
    if (newArr.indexOf(this[i]) == -1) {
      newArr.push(this[i])
    }
  }
  return newArr
}
export default {
  name: 'uu_page',
  components: {
    Tables
  },
  data() {
    return {
      loading: true,
      columns: [{
        title: '序号',
        type: 'index',
        width: 70,
        fixed: 'left'
      }, {
        title: '最后提交时间',
        key: 'lastshare',
        width: 200,
        filters: [],
        filterMultiple: true,
        filterMethod(value, row) {
          console.log(row)
          console.log(value)
          if (value === this.filters[value].value) {
            return (row.lastshare).substr(0, 10) === this.filters[value].label
          }
        }
      }, {
        title: '钱包地址',
        key: 'wallet',
        width: 400
      }, {
        title: '实时算力',
        key: 'hr1',
        width: 100
      }, {
        title: '24小时平均算力',
        key: 'hr2',
        width: 150
      }, {
        title: '在线矿工',
        key: 'online',
        width: 100
      }, {
        title: '离线矿工',
        key: 'offline',
        width: 100
      }, {
        title: '总收益',
        key: 'paid',
        width: 150
      }, {
        title: '操作',
        key: 'lastshare',
        width: 100,
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              on: {
                'click': () => {
                  this.show(params.row.payments, params.row.wallet)
                }
              }
            }, '查看收益')
          ])
        }
      }],
      Ecolumns: [{
        title: '序号',
        type: 'index',
        key: 'num',
        width: 70,
        fixed: 'left'
      }, {
        title: '时间',
        key: 'time',
        width: 170
      }, {
        title: '区块数',
        key: 'num',
        width: 80
      }, {
        title: '区块收益',
        key: 'reward',
        width: 130
      }, {
        title: '昨日支出',
        key: 'amount_s',
        width: 130
      }, {
        title: '盈利值',
        key: 'earnings',
        width: 180,
        render: (h, params) => {
          const row = params.row
          const color = row.earnings > 0 ? 'success' : 'error'
          const text = row.earnings > 0 ? '盈利' : '亏损'
          return h('Tag', {
            props: {
              type: 'dot',
              color: color
            }
          }, row.earnings + ' ' + text)
        }
      }, {
        title: '24H百兆收益',
        key: 'est_reward',
        width: 130,
        render: (h, params) => {
          return h('div', params.row.est_reward)
        }
      }, {
        title: '焱猫矿池算力',
        key: 'hr1',
        width: 130,
        render: (h, params) => {
          return h('div', params.row.hr1)
        }
      }, {
        title: '焱猫矿池算力占比',
        key: 'proportion',
        width: 150,
        render: (h, params) => {
          return h('div', params.row.proportion)
        }
      }, {
        title: 'UU矿池支出',
        key: 'uu_amount',
        width: 150,
        render: (h, params) => {
          return h('div', params.row.uu_amount)
        }
      }, {
        title: 'UU矿池算力',
        key: 'uu_hr1',
        width: 150,
        render: (h, params) => {
          return h('div', params.row.uu_hr1)
        }
      }, {
        title: 'UU矿池结余',
        key: 'uu_profit',
        width: 150,
        render: (h, params) => {
          return h('div', params.row.uu_profit)
        }
      }, {
        title: 'UU矿池收益',
        key: 'uu_reward',
        width: 150,
        render: (h, params) => {
          return h('div', params.row.uu_reward)
        }
      }],
      Pcolumns: [{
        title: '序号',
        type: 'index',
        key: 'num',
        width: 70,
        fixed: 'left'
      }, {
        title: '交易hash值',
        key: 'txid',
        width: 550
      }, {
        title: '转账金额',
        key: 'amount',
        width: 150
      }, {
        title: '转账时间',
        key: 'time',
        width: 200
      }],
      // 钱包收益
      tableData: [],
      tableDataSmall: [],
      current: 1,
      pageSize: 10,
      // 矿池收益详情
      EtableData: [],
      EtableDataSmall: [],
      current1: 1,
      pageSize1: 10,
      EtableDataBlockSum: 0,
      EtableDataQuKuaiSum: 0,
      EtableDataMillerSum: 0,
      EtableDataEarningsSum: 0,
      // 钱包收益详情
      title: '',
      PtableData: [],
      PtableDataSmall: [],
      current2: 1,
      pageSize2: 10,
      modal: false,
      exportLoading: false, // 导出表格读取动画
      filterDate: [], // 筛选过后的数据
      filterList: []
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    changePage(val) {
      this.current = val
    },
    changeSize(val) {
      this.pageSize = 5000
    },
    changePage1(val) {
      this.current1 = val
    },
    changeSize1(val) {
      this.pageSize1 = val
    },
    changePage2(val) {
      this.current2 = val
    },
    changeSize2(val) {
      this.pageSize2 = val
    },
    checkDataMax(a, b, c, d) { // a:当前显示的表格信息b:当前表格对应的所有信息c:当前的页数d:当前的每页显示数量
      a.splice(0, a.length) // 清空当前的显示数据
      for (let i = d * (c - 1) + 1; i <= ((b.length > d * c) ? (d * c) : (b.length)); i++) {
        a.push(b[i - 1])
      }
    },
    show(data, wallet) {
      this.modal = true
      this.PtableData = data
      this.title = '钱包: ' + wallet + ' 收益明细'
      if (this.PtableData.length > 0) {
        for (let i = 0; i < (this.PtableData.length >= this.pageSize ? this.pageSize : this.PtableData.length); i++) {
          this.PtableDataSmall.push(this.PtableData[i])
        };
      };
      console.log(data)
    },
    ok() {
      this.$Message.info('确定')
      this.PtableDataSmall = []
      this.PtableData = []
      this.current2 = 1
      this.pageSize2 = 10
    },
    cancel() {
      this.$Message.info('取消')
      this.PtableDataSmall = []
      this.PtableData = []
      this.current2 = 1
      this.pageSize2 = 10
    },
    exportExcel() {
      if (this.tableData.length) {
        this.exportLoading = true
        const params = {
          title: ['最后提交时间', '钱包地址', '实时算力', '24小时平均算力', '在线矿工', '离线矿工', '总收益'],
          key: ['lastshare', 'wallet', 'hr1', 'hr2', 'online', 'offline', 'paid'],
          data: this.tableData,
          autoWidth: true,
          filename: '全部收益表格'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
    },
    exportExcelFilter() {
      this.$refs.tables_earning.exportCsv({
        filename: '筛选收益表格' + (new Date().toLocaleString()),
        original: false,
        autoWidth: true
      })
    },
    filterChange() {
      this.pageSize = 100
    }
  },
  watch: {
    current: function() {
      this.checkDataMax(this.tableDataSmall, this.tableData, this.current, this.pageSize)
    },
    pageSize: function() {
      this.checkDataMax(this.tableDataSmall, this.tableData, this.current, this.pageSize)
    },
    current1: function() {
      this.checkDataMax(this.EtableDataSmall, this.EtableData, this.current1, this.pageSize1)
    },
    pageSize1: function() {
      this.checkDataMax(this.EtableDataSmall, this.EtableData, this.current1, this.pageSize1)
    },
    current2: function() {
      this.checkDataMax(this.PtableDataSmall, this.PtableData, this.current2, this.pageSize2)
    },
    pageSize2: function() {
      this.checkDataMax(this.PtableDataSmall, this.PtableData, this.current2, this.pageSize2)
    }
  },
  mounted() {
    Expense().then(res => {
        function sum(a, b) {
          return a + b
        }
        let BlockSum = []
        let QuKuaiSum = []
        let MillerSum = []
        console.log(res)
        res.data.data.forEach((item) => {
          this.EtableData.push({
            'id': item.id,
            'num': item.num,
            'reward': item.reward,
            'amount_s': item.amount_s,
            'amount': item.amount,
            'time': item.time,
            'earnings': (item.reward - item.amount_s).toFixed(6),
            'est_reward': item.est_reward,
            'hr1': item.hr1,
            'proportion': item.proportion,
            'uu_amount': item.uu_amount,
            'uu_hr1': item.uu_hr1,
            'uu_profit': item.uu_profit,
            'uu_reward': item.uu_reward
          })
          this.loading = false
        })
        if (this.EtableData.length > 0) {
          for (let i = 0; i < (this.EtableData.length >= this.pageSize1 ? this.pageSize1 : this.EtableData.length); i++) {
            this.EtableDataSmall.push(this.EtableData[i])
          }
        }
      }),
      ExpenseTotal().then(res => {
        console.log(res, '总收益信息')
        this.EtableDataBlockSum = res.data.msg.num
        this.EtableDataQuKuaiSum = res.data.msg.reward
        this.EtableDataMillerSum = res.data.msg.amount
        this.EtableDataEarningsSum = res.data.msg.profit
      }),
      Wallent().then(res => {
        console.log(res)
        res.data.forEach((item) => {
          this.filterDate.push((item.lastshare).substr(0, 10)) // 获取日期的年月日
          this.filterDate = (this.filterDate).reArr() // 数组去重
          this.tableData.push({
            'hr1': item.hr1,
            'hr2': item.hr2,
            'offline': item.offline,
            'online': item.online,
            'paid': item.paid,
            'wallet': item.wallet,
            'lastshare': item.lastshare,
            'payments': item.payments
          })
        })
        this.filterDate.forEach((item, index) => {
          this.filterList.push({
            label: item,
            value: index
          })
        })
        this.$set(this.columns[1], 'filters', this.filterList) // 强制修改数据
        console.log(this.filterDate)
        console.log(this.filterList)
        if (this.tableData.length > 0) {
          for (let i = 0; i < (this.tableData.length >= this.pageSize ? this.pageSize : this.tableData.length); i++) {
            this.tableDataSmall.push(this.tableData[i])
          }
        }
        this.loading = false
      })
  }
}
</script>
