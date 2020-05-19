<template>
  <div class="container">
    <div style="font-size:18px;color:#000000">订单号：{{item.orderNo}}</div>
    <div style="">
      <table>
        <tr>
          <td>
            <div class="col">
              <div class="titl">订单详情</div>

              <div>下单时间:{{item.createTime}}</div>
              <div>产品名称:{{item.orderItemList?item.orderItemList[0].goodsName:''}}</div>
              <div>产品规格:{{item.orderItemList?item.orderItemList[0].specName:''}}</div>
              <div>产品数量:{{item.num}}</div>
              <div>订单状态:{{states[item.status]}}</div>
              <div>
                <div>支付方式:{{item.payType==1?'微信':'支付宝'}}</div>
                <div>实付金额:{{item.total}}元</div>
                <div>买家留言:{{item.orderItemList?item.orderItemList[0].message:''}}</div>
                <div>配送方式:{{item.deliveryType==1?'快递':(item.deliveryType==2?'跑腿':'自提')}}</div>
              </div>
            </div>
          </td>
          
          <td>
            <div class="col">
              <div class="titl">买家信息</div>
              <div>用户名称:{{item.usersVo?item.usersVo.nickname:''}}</div>
              <div>用户ID号:{{item.usersVo?item.usersVo.youduNum:''}}</div>
              <div class="titl">收货详情</div>
              <div>收货人:{{item.tblReceiveAddress?item.tblReceiveAddress.name:''}}</div>
              <div>联系方式:{{item.tblReceiveAddress?item.tblReceiveAddress.phoneNumber:''}}</div>
              <div>收货地址:{{item.tblReceiveAddress?item.tblReceiveAddress.detailAddress:''}}</div>
            </div>
            
          </td>
        </tr>
      </table>


   
      <div style="width: 50%;height: 20rem;"></div>
      <div class="col" v-if="item.orderBack!=null">
        <div class="titl">申请退货理由</div>
        <div>{{item.orderBack.backReason}}:{{item.orderBack.backInfo}}</div>
        <div v-if="item.orderBack.piccenterList.length>0" style="display: flex;width: 963px;flex-flow: row wrap;margin-bottom: 1rem;">



          <img v-for="(item,idx) in item.orderBack.piccenterList" :src="item.imgServer+item.fileaddr" class="avatar"
            style="width:300px;margin-right:1rem;">

        </div>
      </div>
    </div>
    <div v-if="item.orderBack?(item.orderBack.status == 3?true:false):false" style="border-bottom: 1px dashed #dedede;width:80%;margin:auto;"></div>
    <el-card v-if="item.orderBack?(item.orderBack.status == 3?true:false):false" class="box-card" style="width:80%;margin:auto;margin-top:10px;">
      <div slot="header" class="clearfix">
        <span>审核人：{{item.orderBack.reViewUser.username}}</span>
        <span style="float: right; padding: 3px 0" type="text">审核时间：{{item.orderBack.reviewDate}}</span>
      </div>
      <div class="text item">
        {{item.orderBack.reason}}
      </div>
    </el-card>

    <span v-if="item.orderBack?(item.orderBack.status == 0?true:false):false" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="isShow = true">确定退款</el-button>
    </span>

    <el-dialog title="退款原因" :visible.sync="isShow" width="30%" center :modal=false>
      <el-input type="textarea" placeholder="请输入退款原因" v-model="reasonTxt"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow=false">取 消</el-button>
        <el-button type="primary" @click="backMoney">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    checkOrderBack
  } from '@/api/ordermanage.js'
  export default {
    name: 'Orderinfo',
    data() {
      return {
        shop: false,
        states: ['待支付', '待发货', '已发货', '待评价', '已取消', '申请退货', '同意退货', '拒绝退货', '已退货', '已完成'],
        item: {},
        reasonTxt: '',
        isShow: false
      }
    },
    props: {
      callback: Function
    },
    mounted() {

    },
    methods: {
      show(item) {
        this.item = item
        this.shop = false
      },
      backMoney() {
        let pars = {}
        pars.id = this.item.orderBack.id
        pars.reason = this.reasonTxt
        pars.status = 3
        let that = this
        that.isShow = false
        checkOrderBack(pars).then(res => {
          that.$props.callback();
        })
      },
      shopShow(item) {
        this.item = item
        this.shop = true
      }
    }
  }
</script>
<style>
  .col {
    float: left;
    width: 100%;
    margin-right: 10px;
  }

  .col div {
    line-height: 28px;
    font-size: 15px;
  }

  .titl {
    font-size: 16px !important;
    color: #000000;
    line-height: 50px !important;
  }
</style>
