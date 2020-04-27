<template>
  <div class="container">
    <div class="seachPanel">
 订单编号:
      <el-input v-model="orderNo" style="width:180px;" placeholder="订单编号"></el-input>
      ID号:
      <el-input v-model="youduNum" style="width:180px;" placeholder="ID号"></el-input>
      申请日期：
      <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
        value-format="yyyy-MM-dd">
      </el-date-picker>

      <el-button style="float:right;margin-left:10px;" @click="reset">重置</el-button>
      <el-button style="float:right;" type="primary" icon="el-icon-search" @click="query">搜索</el-button>

    </div>

    <el-radio-group v-model="states" @change="query" style="margin-bottom: 10px;">
      <el-radio-button label="0">待结算</el-radio-button>
      <el-radio-button label="1">已结算</el-radio-button>
      <el-radio-button label="8">已冻结</el-radio-button>
    </el-radio-group>
    <el-button style="float:right;" type="primary" icon="el-icon-download" @click="outXls">导出账单</el-button>

    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="orderNo" label="订单编号" width='250' align="center">

      </el-table-column>
      <el-table-column prop="total" label="实付金额" align="center">

      </el-table-column>
      <el-table-column label="支付方式" align="center">
        <template slot-scope="scope">
          {{scope.row.payType==1?'微信':'支付宝'}}
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="下单时间" align="center">

      </el-table-column>
      <el-table-column label="买家ID" align="center">
       <template slot-scope="scope">
         {{scope.row.userVo.youduNum}}
       </template>
      </el-table-column>
      <el-table-column label="卖家ID" align="center">
       <template slot-scope="scope">
          {{scope.row.tblShopVo.usersVo.youduNum}}
       </template>
      </el-table-column>
      <el-table-column prop="tblReconciliationCenter.commission" label="应付分销佣金" align="center">

      </el-table-column>
      <el-table-column prop="tblReconciliationCenter.rate" label="平台抽佣费率" align="center">

      </el-table-column>
      <el-table-column prop="tblReconciliationCenter.platCommission" label="应收平台佣金" align="center">

      </el-table-column>
      <el-table-column prop="deliveryPrice" label="应付跑腿费用" align="center">

      </el-table-column>
      <el-table-column prop="tblReconciliationCenter.realPrice" label="应付货款" align="center">

      </el-table-column>
      <el-table-column label="结算状态" align="center">
        <template slot-scope="scope">
           {{statesArr[states]}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="show(scope.row)"  plain size="mini"> 查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background @current-change="query" :current-page.sync="currentPage" style="margin-top:10px;margin-left:-10px;float:right;"
      layout="total,  prev, pager, next, jumper" :page-size=10 :total="records">
    </el-pagination>

     <el-dialog title="查看详情" :visible.sync="isShow" width="60%" height='600' center>
      <Orderinfo ref="orderinfo"></Orderinfo>
    </el-dialog>
    
   <form action="/youdu/mall/manager/excel/excelExportReconciliation" style="display: none;" method="post" id='xls'>
     <input name="status" :value="states" />
     <input name="shopUserVo.youduNum" :value="youduNum" />
     <input name="orderNo" :value="orderNo" />
     <input v-if="time.length>0" name="searchStarttime" :value="time[0] + ' 00:00:00'" />
     <input v-if="time.length>0" name="searchEndtime" :value="time[1] + ' 00:00:00'" />
   </form>

  </div>
</template>

<script>
  import Orderinfo from '../../reconciliation/orderinfo'
  import {
    getReconciliationList,
    excelExportReconciliation
  } from '@/api/datacenter.js'
  export default {
    name: 'Audit',
    components: {
      Orderinfo
    },
    data() {

      return {
        statesArr: {0:'待结算',1:'已结算',8:'已冻结'},
        orderNo:'',
        youduNum: '',
        reviewer: '',
        time2: [],
        time: [],
        records: 0,
        states: 0,
        currentPage: 1,
        list: [],
        isShow: false,
        isShow2: false,
        reasonTxt: '',
        form: {
          id: '',
          users: {
            nickname: ''
          },
          reviewUser: {
            username: ''
          },
          nickname: '',
          youduNum: '',
          idCard: '',
          states: '',
          truename: '',
          reviewer: '昨日黄瓜',
          reviewTime: '2020-02-02 11:12',
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
      show(item) {
        this.isShow = true
        let that = this
        item.states = this.states
        setTimeout(()=>{
           that.$refs.orderinfo.show(item)
        },200)
      },
      outXls(){
       document.getElementById("xls").submit()
      },
      reset() {

        this.youduNum = '';
        this.orderNo = '';
        this.time = [];
      },
      noPass() {
        this.form.id
        if (this.reasonTxt == '') {
          alert('请输入原因')
          return
        }

        var pars = {}
        pars.id = this.form.id
        pars.status = 2
        pars.reason = this.reasonTxt
        checkVerified(pars).then(res => {
          this.isShow = false;
          this.isShow2 = false;
          this.query()
        }).catch((err) => {
          console.log(err)
        })

      },
      pass() {
        var pars = {}
        pars.id = this.form.id
        pars.status = 1
        checkVerified(pars).then(res => {
          this.isShow = false
          this.query()
        }).catch((err) => {
          console.log(err)
        })

      },
      query() {

        let pars = {};
        pars.shopUserVo={youduNum:this.youduNum}
        pars.orderNo = this.orderNo
        pars.status = this.states
        pars.currentPage = this.currentPage


        if (this.time && this.time.length > 0) {
          pars.searchStarttime = this.time[0] + " 00:00:00"
          pars.searchEndtime = this.time[1] + " 00:00:00"
        }
        if (this.time2 && this.time2.length > 0) {
          pars.reviewUser.searchStarttime = this.time2[0] + " 00:00:00"
          pars.reviewUser.searchEndtime = this.time2[1] + " 00:00:00"
        }

        getReconciliationList(pars).then(res => {
          console.log(res)
          this.list = res.data
          this.records = res.records
        }).catch((err) => {
          console.log(err)
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
