<template>
<div>
  <Card>
    <!-- <Row type="flex">
      <Col :lg="{span:8,offset:16}">
      <Input search enter-button placeholder="输入钱包地址..." />
      </Col>
    </Row> -->
    <Tabs value="name1" type="card" :animated="false">
      <TabPane label="( HC端口 ) 矿池收益" name="name1">
        <Tag type="dot" color="primary">总暴块数 : {{HtableDataBlockSum}}</Tag>
        <Tag type="dot" color="success">总区块收益 : {{HtableDataQuKuaiSum}}</Tag>
        <Tag type="dot" color="error">总支付的矿工费 : {{HtableDataMillerSum}}</Tag>
        <Tag type="dot" color="warning">总矿池盈利 : {{HtableDataEarningsSum}}</Tag>
        <Row type="flex" justify="center" style="margin-top:1rem">
          <Col span="24">
          <Card>
            <tables ref="tables" :loading="loading" size="small" border searchable search-place="top" v-model="HtableDataSmall" :columns="Hcolumns" />
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="HtableData.length" :current="current3" :page-size-opts="[10,50,100]" placement="top" @on-change="changePage3" show-sizer :page-size="pageSize3" @on-page-size-change="changeSize3"></Page>
              </div>
            </div>
          </Card>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="钱包收益" name="name2">
        <Row type="flex" justify="center">
          <Col span="24">
          <Card>
            <tables ref="tables" :loading="loading" size="small" border searchable search-place="top" v-model="tableDataSmall" :columns="columns" />
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
import {
  Wallent, // 获取所有的钱包信息
  Expense, // 矿池收益信息
  HC_Expense, // 火池矿池收益信息
  HC_Wallent, // 火池矿池收益信息
  HC_ExpenseTotal, //火池总收益信息
} from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data() {
    return {
      loading: true,
      columns: [{
          title: '序号',
          type: 'index',
          key: 'wallet',
          width: 70,
          fixed: 'left'
        },
        {
          title: '最后提交时间',
          key: 'lastshare',
          width: 200
        },
        {
          title: '钱包地址',
          key: 'wallet',
          width: 350
        },
        {
          title: '实时算力',
          key: 'hr1',
          width: 200
        },
        {
          title: '24小时平均算力',
          key: 'hr2',
          width: 150
        },
        {
          title: '在线矿工',
          key: 'online',
          width: 100
        },
        {
          title: '离线矿工',
          key: 'offline',
          width: 100
        },
        {
          title: '总收益',
          key: 'paid',
          width: 150
        },
        {
          title: '操作',
          key: 'lastshare',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                on: {
                  'click': () => {
                    this.show(params.row.payments, params.row.wallet)
                  }
                }
              }, '查看收益')
            ])
          }
        }
      ],
      Ecolumns: [{
          title: '序号',
          type: 'index',
          key: 'num',
          width: 70,
          fixed: 'left',
        }, {
          title: '时间',
          key: 'time',
          width: 300
        }, {
          title: '区块数',
          key: 'num',
          width: 200,
        },
        {
          title: '区块收益',
          key: 'reward',
          width: 250
        },
        {
          title: '昨日支出',
          key: 'amount_s',
          width: 250
        },
        {
          title: '盈利值',
          key: 'earnings',
          width: 300,
          render: (h, params) => {
            const row = params.row;
            const color = row.earnings > 0 ? 'success' : 'error';
            const text = row.earnings > 0 ? '盈利' : '亏损';
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, row.earnings + ' ' + text);
          }
        },

      ],
      Hcolumns: [{
          title: '序号',
          type: 'index',
          key: 'num',
          width: 70,
          fixed: 'left',
        }, {
          title: '开始时间',
          key: 'Stime',
          width: 180
        },
        {
          title: '结束时间',
          key: 'Etime',
          width: 180
        }, {
          title: '区块数',
          key: 'num',
          width: 100,
        },
        {
          title: '矿工数',
          key: 'workers',
          width: 100
        },
        {
          title: '区块收益',
          key: 'reward',
          width: 100
        },
        {
          title: '昨日支出',
          key: 'amount',
          width: 100
        },
        {
          title: '手续费',
          key: 'service',
          width: 100
        },
        {
          title: '盈利值',
          key: 'balance',
          width: 200,
          render: (h, params) => {
            const row = params.row;
            const color = row.balance > 0 ? 'success' : 'error';
            const text = row.balance > 0 ? '盈利' : '亏损';
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, row.balance + ' ' + text);
          }
        },
      ],
      Pcolumns: [{
          title: '序号',
          type: 'index',
          key: 'num',
          width: 70,
          fixed: 'left',
        }, {
          title: '交易hash值',
          key: 'txid',
          width: 550
        },
        {
          title: '转账金额',
          key: 'amount',
          width: 150
        },
        {
          title: '转账时间',
          key: 'time',
          width: 200
        },
      ],
      // 钱包收益
      tableData: [],
      tableDataSmall: [],
      current: 1,
      pageSize: 10,
      //矿池收益详情
      EtableData: [],
      EtableDataSmall: [],
      current1: 1,
      pageSize1: 10,
      //火池矿池收益详情
      HtableData: [],
      HtableDataSmall: [],
      current3: 1,
      pageSize3: 10,
      HtableDataBlockSum: 0,
      HtableDataQuKuaiSum: 0,
      HtableDataMillerSum: 0,
      HtableDataEarningsSum: 0,
      //钱包收益详情
      title: '',
      PtableData: [],
      PtableDataSmall: [],
      current2: 1,
      pageSize2: 10,
      modal: false
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
      this.pageSize = val
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
    changePage3(val) {
      this.current3 = val
    },
    changeSize3(val) {
      this.pageSize3 = val
    },
    checkDataMax(a, b, c, d) { //a:当前显示的表格信息b:当前表格对应的所有信息c:当前的页数d:当前的每页显示数量
      a.splice(0, a.length) //清空当前的显示数据
      for (let i = d * (c - 1) + 1; i <= ((b.length > d * c) ? (d * c) : (b.length)); i++) {
        a.push(b[i - 1]);
      }
    },
    show(data, wallet) {
      this.modal = true
      this.PtableData = data
      this.title = '钱包: ' + wallet + ' 收益明细'
      if (this.PtableData.length > 0) {
        for (let i = 0; i < (this.PtableData.length >= this.pageSize ? this.pageSize : this.PtableData.length); i++) {
          this.PtableDataSmall.push(this.PtableData[i]);
        };
      };
      console.log(data);
    },
    ok() {
      this.$Message.info('确定');
    },
    cancel() {
      this.$Message.info('取消');
      this.PtableDataSmall = [];
      this.PtableData = [];
      this.current2 = 1;
      this.pageSize2 = 10;
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
    },
    current3: function() {
      this.checkDataMax(this.HtableDataSmall, this.HtableData, this.current3, this.pageSize3)
    },
    pageSize3: function() {
      this.checkDataMax(this.HtableDataSmall, this.HtableData, this.current3, this.pageSize3)
    },
  },
  mounted() {
    HC_Expense().then(res => {
        console.log(res, "火池");
        let BlockSum = []
        let QuKuaiSum = []
        let MillerSum = []
        console.log(res)
        res.data.forEach((item) => {
          this.HtableData.push({
            'num': item.num,
            'reward': item.reward,
            'balance': item.balance_s,
            'amount': item.amount,
            'Stime': item.start_time,
            'Etime': item.end_time,
            'workers': item.workers,
            'service': item.poundage,
            'earnings': (item.reward - item.amount).toFixed(6)
          })
          this.loading = false
        })
        if (this.HtableData.length > 0) {
          for (let i = 0; i < (this.HtableData.length >= this.pageSize1 ? this.pageSize1 : this.HtableData.length); i++) {
            this.HtableDataSmall.push(this.HtableData[i])
          }
        }
      }),
      HC_ExpenseTotal().then(res => {
        console.log(res, "火池总收益信息");
        this.HtableDataBlockSum = res.data.msg.num
        this.HtableDataQuKuaiSum = res.data.msg.reward
        this.HtableDataMillerSum = res.data.msg.amount
        this.HtableDataEarningsSum = res.data.msg.profit
      }),
      HC_Wallent().then(res => {
        console.log(res, "火池钱包")
        res.data.forEach((item) => {
          this.tableData.push({
            'hr1': item.hr1,
            'hr2': item.hr2,
            'offline': item.offline,
            'online': item.online,
            'paid': item.paid,
            'wallet': item.wallet,
            'lastshare': item.lastshare,
            'payments': item.payments,
          })
        })
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

<style>

</style>
