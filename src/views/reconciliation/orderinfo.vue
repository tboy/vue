<template>
  <div class="container">
    <div style="font-size:18px;color:#000000">订单号：{{item.orderNo}}</div>
    <div style="height:600px;">

      <div class="col">
        <div class="titl">订单详情</div>
        <div>下单时间:{{item.createTime}}</div>
        <div>产品名称:{{item.tblOrderItemList?item.tblOrderItemList[0].goodsName:''}}</div>
        <div>产品规格:{{item.tblOrderItemList?item.tblOrderItemList[0].specName:''}}</div>
        <div>产品数量:{{item.num}}</div>
        <div>订单状态:{{states[item.status]}}</div>
        <div>
          <div>支付方式:{{item.payType==1?'微信':'支付宝'}}</div>
          <div>实付金额:{{item.total}}元</div>
          <div>买家留言:{{item.tblOrderItemList?item.tblOrderItemList[0].message:''}}</div>
          <div>配送方式:{{item.deliveryType==1?'快递':(item.deliveryType==2?'跑腿':'自提')}}</div>
        </div>


          <div class="titl">结算情况</div>
          <div>结算状态:{{statesArr[item.states]}}</div>
          <div>应付分销佣金:{{item.tblReconciliationCenter?item.tblReconciliationCenter.commission:''}}元</div>
          <div>平台抽佣费率:{{item.tblReconciliationCenter?item.tblReconciliationCenter.rate:''}}%</div>
          <div>应收平台佣金:{{item.tblReconciliationCenter?item.tblReconciliationCenter.platCommission:''}}元</div>
          <div>应付货款:{{item.tblReconciliationCenter?item.tblReconciliationCenter.realPrice:''}}元</div>

      </div>

      <div class="col">
        <div class="titl">买家信息</div>
        <div>用户名称:{{item.userVo?item.userVo.nickname:''}}</div>
        <div>用户ID号:{{item.userVo?item.userVo.youduNum:''}}</div>
        <div class="titl">收货详情</div>
        <div>收货人:{{item.tblReceiveAddress?item.tblReceiveAddress.name:''}}</div>
        <div>联系方式:{{item.tblReceiveAddress?item.tblReceiveAddress.phoneNumber:''}}</div>
        <div>收货地址:{{item.tblReceiveAddress?item.tblReceiveAddress.detailAddress:''}}</div>
        
        <div  v-if="item.tblOrderBackVo!=null">
          <div class="titl">申请退货理由</div>
          <div>{{item.tblOrderBackVo.backReason}}:{{item.tblOrderBackVo.backInfo}}</div>
          <div v-if="item.tblOrderBackVo.piccenterList.length>0">
            <img v-for="(item,idx) in item.tblOrderBackVo.piccenterList" :src="form.imgServer+item.fileaddr" class="avatar">
          </div>
        </div>
      </div>
      <div class="col">
        <div class="titl">卖家信息</div>
        <div>店铺名称:{{item.tblShopVo?item.tblShopVo.name:''}}</div>
        <div>ID号:{{item.tblShopVo?item.tblShopVo.usersVo.youduNum:''}}</div>
        <div>联系人:{{item.tblShopVo?item.tblShopVo.contacts:''}}</div>
        <div>联系电话:{{item.tblShopVo?item.tblShopVo.phone:''}}</div>
        <div>联系地址:{{item.tblShopVo?item.tblShopVo.address:''}}</div>
        <div>邮箱:{{item.tblShopVo?(item.tblShopVo.type==0?item.tblShopVo.enterprise.email:item.tblShopVo.supplier.mailbox):''}}</div>

      </div>

    </div>
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
        statesArr: {0:'待结算',1:'已结算',8:'已冻结'},
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
    width: 32%;
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
