<template>
  <div class="container">

    <div class="seachPanel">
      <el-select v-model="state" style="width:180px;" @change="query">
        <el-option value="0" label="待付款"></el-option>
        <el-option value="1" label="待发货"></el-option>
        <el-option value="2" label="已发货"></el-option>
        <el-option value="3" label="待评价"></el-option>
        <el-option value="9" label="已完成"></el-option>
        <el-option value="5" label="售后"></el-option>
      </el-select>
      订单编号:
      <el-input v-model="orderNo" style="width:180px;" placeholder="订单编号" />
      产品名称:
      <el-input v-model="goodsName" style="width:180px;" placeholder="产品名称" />
      下单时间：
      <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
        value-format="yyyy-MM-dd yyyy-MM-dd" />
     <el-button style="float:right;margin-left:10px;" type="primary" @click="outXls">导出</el-button>

      <el-button style="float:right;" type="primary" @click="query">搜索</el-button>

    </div>


    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="orderNo" label="订单编号" align="center" width="250" />
      <el-table-column prop="total" label="金额" align="center" />

      <el-table-column prop="createTime" label="下单时间" align="center" />
      <el-table-column label="用户" align="center">
        <template slot-scope="scope">
          {{ scope.row.userAccount }}
        </template>
      </el-table-column>

      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone}}
        </template>
      </el-table-column>


      <el-table-column prop="deliveryNo" label="物流单号" align="center" />

      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          {{ states[scope.row.status] }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" :min-width="state==1?'150':''">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="show(scope.row)"> 详情</el-button>
          <el-button v-if="state==1" type="primary" @click="uploadKd(scope.row)" plain size="mini">快递单</el-button>

          <el-button v-if="state==2" type="primary" @click="show2(scope.row)" plain size="mini"> 物流</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination background :current-page.sync="currentPage" style="margin-top:10px;margin-left:-10px;float:right;"
      layout="total,  prev, pager, next, jumper" :page-size="10" :total="records" @current-change="query" />

    <el-dialog title="详情" :visible.sync="isShow" width="60%" center>
      <Orderinfo ref="orderinfo" />
    </el-dialog>

    <el-dialog title="详情" :visible.sync="isShow2" width="60%" center>
      <div style="height: 300px;overflow-y: scroll;">
        <el-steps direction="vertical" :active="1" finish-status="success">

          <el-step v-for="(item,idx) in dList" :title="item.desc" icon="el-icon-arrow-up" :description="item.date" />

        </el-steps>
      </div>
    </el-dialog>

    <el-dialog title="填写快递单号" :visible.sync="isShow3" width="30%" center :modal=false>
      <el-input type="textarea" placeholder="请输入快递单号" v-model="reasonTxt"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow3 = false">取 消</el-button>
        <el-button type="primary" @click="editKdd()">发 货</el-button>
      </span>
    </el-dialog>

    <form id="xls" action="/mall/manager/excel/excelExportOrder" style="display:none;" method="post">
      <input name="goodsName" :value="goodsName">
      <input name="status" :value="state">
      <input name="orderNo" :value="orderNo">
      <input v-if="time.length>0" name="searchStarttime" :value="time[0]+' 00:00:00'">
      <input v-if="time.length>0" name="searchEndtime" :value="time[1]+' 00:00:00'">

    </form>
  </div>
</template>

<script>
  import Orderinfo from './orderinfo'
  import {
    getOrderList,
    getDeliveryInfo,
    updateDeliveryNo,
    getOrderBackInfoByOrderId
  } from '@/api/ordermanage.js'
  export default {
    name: 'Audit',
    components: {
      Orderinfo
    },
    data() {
      return {
        states: ['待支付', '待发货', '已发货', '待评价', '已取消', '申请退货', '同意退货', '拒绝退货', '已退货', '已完成'],
        orderNo: '',
        goodsName: '',

        time: [],
        records: 100,
        state: "0",
        currentPage: 1,
        list: [],
        isShow: false,
        isShow2: false,
        isShow3: false,
        dList: [],
        reasonTxt: '',

        kdd: {
          id: 0
        },
        form: {
          id: '',
          username: '',
          idCard: '',
          state: '',
          truename: '',
          auditor: '昨日黄瓜',
          auditTime: '2020-02-02 11:12',
          reason: '无理由',
          phone: '',
          img1: '',
          img2: '',
          img3: '',
          srcList: []
        }
      }
    },
    mounted() {
      this.query()
    },
    methods: {
      outXls() {
        document.getElementById('xls').submit()
      },
      uploadKd(item) {
        this.kdd.id = item.id
        this.isShow3 = true
      },
      editKdd() {
        this.kdd.deliveryNo = this.reasonTxt
        updateDeliveryNo(this.kdd).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.query()
          this.isShow2 = false

        })
      },
      show2(item) {
        debugger
        this.isShow2 = true
        const that = this
        getDeliveryInfo({
          orderNo: item.id
        }).then(res => {
          that.dList = res.data.list
        })
      },
      show(item) {
        this.isShow = true
        const that = this
        getOrderBackInfoByOrderId({
          id: item.id
        }).then(res => {
          item.orderBack = res.data
          item.hideBtns = true
          that.$refs.orderinfo.show(item)
        })
      },
      reset() {
        this.orderNo = ''
        this.goodsName = ''
        this.time = []
      },
      noPass() {
        this.isShow = false
        this.isShow2 = false
      },
      pass() {
        this.isShow = false
      },
      query() {
        const pars = {}
        pars.orderNo = this.orderNo
        pars.goodsName = this.goodsName
        pars.status = this.state
        pars.currentPage = this.currentPage
        if (this.time.length > 0) {
          pars.searchStarttime = this.time[0] + ' 00:00:00'
          pars.searchEndtime = this.time[1] + ' 00:00:00'
        }
        pars.pageSize = 10
        getOrderList(pars).then(res => {
          this.list = res.data
          this.list.sort()
          this.records = res.records
        })
      }
    }
  }
</script>
<style>
  .container {
    padding: 10px;

    height: 100%;
  }

  .seachPanel {
    height: 60px;
    padding-top: 10px;
    border: 1px solid #ECECEC;
    background: white;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
