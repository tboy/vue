<template>
  <div class="container">
    <div class="seachPanel">

      订单编号:
      <el-input v-model="orderNo" style="width:180px;" placeholder="订单编号"></el-input>
      商品名称:
      <el-input v-model="goodsName" style="width:180px;" placeholder="商品名称"></el-input>
      买家ID:
      <el-input v-model="youduNum" style="width:180px;" placeholder="买家ID"></el-input>
      订单时间：
      <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
        value-format="yyyy-MM-dd yyyy-MM-dd">
      </el-date-picker>
      <el-button style="float:right;margin-left:10px;" @click="reset">重置</el-button>
      <el-button style="float:right;" type="primary" icon="el-icon-search" @click="query">搜索</el-button>

    </div>
    <el-radio-group v-model="state" @change="query" style="margin-bottom: 10px;">
      <el-radio-button label="1">待发货</el-radio-button>
      <el-radio-button label="2">已发货</el-radio-button>
      <el-radio-button label="0">待付款</el-radio-button>
      <el-radio-button label="3">待评价</el-radio-button>
      <el-radio-button label="9">已完成</el-radio-button>
      <el-radio-button label="5">售后商品</el-radio-button>
    </el-radio-group>

    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="orderNo" label="订单编号" align="center" width="250">
      </el-table-column>
      <el-table-column v-if="state!=5 && state!=0" prop="total" label="实付金额" align="center">

      </el-table-column>
      <el-table-column v-if="state!=5 && state!=0" label="支付方式" align="center">
        <template slot-scope="scope">
          {{scope.row.payType==1?'微信':'支付宝'}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="下单时间" align="center">
      </el-table-column>
      <el-table-column v-if="state==5" prop="orderNo" label="退款金额" align="center">
      </el-table-column>
      <el-table-column v-if="state==5" prop="orderNo" label="申请退货理由" align="center">
      </el-table-column>

      <el-table-column label="买家ID" align="center">
        <template slot-scope="scope">
          {{scope.row.usersVo.youduNum}}
        </template>
      </el-table-column>
      <el-table-column label="卖家ID" align="center">
        <template slot-scope="scope">
          {{scope.row.tblShopVo.usersVo.youduNum}}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          {{states[scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column prop="deliveryNo" v-if="state==2" label="物流单号" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center" :min-width="(state==1 || state==2)?'150':''">
        <template slot-scope="scope">
          <el-button type="primary" @click="show(scope.row)" plain size="mini"> 查看详情</el-button>
          <el-button v-if="state==1" type="primary" @click="uploadKd(scope.row)" plain size="mini">上传快递单号</el-button>

          <el-button v-if="state==2" type="primary" @click="show3(scope.row)" plain size="mini"> 查看物流</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="query" :current-page.sync="currentPage" style="margin-top:10px;margin-left:-10px;float:right;"
      layout="total,  prev, pager, next, jumper" :page-size=10 :total="records">
    </el-pagination>


    <el-dialog title="查看详情" :visible.sync="isShow" width="60%" center>
      <Orderinfo ref="orderinfo" :callback="callback"></Orderinfo>
    </el-dialog>
    <el-dialog title="查看详情" v-if="isShow3" width="60%" center>
      <div style="height: 300px;overflow-y: scroll;">
        <el-steps direction="vertical" :active="1" finish-status="success">

          <el-step v-for="(item,idx) in dList" :title="item.desc" icon="el-icon-arrow-up" :description="item.date"></el-step>

        </el-steps>
      </div>
    </el-dialog>

    <el-dialog title="上传快递单号" :visible.sync="isShow2" width="30%" center :modal=false>
      <el-input type="textarea" placeholder="请输入快递单号" v-model="reasonTxt"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow2 = false">取 消</el-button>
        <el-button type="primary" @click="editKdd()">发 货</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import Orderinfo from '../../../selfgoods/ordermanager/orderinfo'
  import {
    getOrderList,
    updateDeliveryNo,
    getDeliveryInfo,
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
        youduNum: '',
        time: [],
        records: 100,
        state: 1,
        currentPage: 1,
        list: [],
        isShow: false,
        isShow2: false,
        isShow3: false,
        reasonTxt: '',
        kdd: {},
        dList:[],
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
      this.query();
    },
    methods: {
      callback(){
        this.isShow3=false
        this.query()
      },
      uploadKd(item) {
        this.kdd.id = item.id
        this.isShow2 = true
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
      show3(item){
        this.isShow3 = true
        let that = this
        getDeliveryInfo({orderNo:item.id}).then(res=>{
         that.dList = res.data.list
        })
      },
      show(item) {
        this.isShow = true
        let that = this

         getOrderBackInfoByOrderId({id:item.id}).then(res=>{
           item.orderBack = res.data
            that.$refs.orderinfo.shopShow(item)
         })

      },
      reset() {
        this.orderNo = ''
        this.goodsName = ''
        this.youduNum = ''
        this.time = []
      },
      noPass() {
        this.isShow = false;
        this.isShow2 = false;
      },
      pass() {
        this.isShow = false;
      },
      query() {

        let pars = {};
        pars.pageSize = 10
        pars.orderNo = this.orderNo
        pars.goodsName = this.goodsName
        pars.youduNum = this.youduNum
        pars.status = this.state
        pars.currentPage = this.currentPage
        if (this.time.length > 0) {
          pars.searchStarttime = this.time[0] + " 00:00:00"
          pars.searchEndtime = this.time[1] + " 00:00:00"
        }
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
