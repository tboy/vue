<template>
  <div class="content">
    <div class="titl">当月数据统计</div>
    <div class="top">
      <div class="rect">
        <icon class="el-icon-data-line icon"></icon>
        <div class="info">
          <div>{{item.data1.userNum}}</div>
          <div>新增用户数</div>
        </div>
      </div>
      <div class="rect">
        <icon class="el-icon-data-line icon"></icon>
        <div class="info">
          <div>{{item.data1.vodNum}}</div>
          <div>新增作品数</div>
        </div>
      </div>
      <div class="rect">
        <icon class="el-icon-data-line icon"></icon>
        <div class="info">
          <div>{{item.data1.orderNum}}</div>
          <div>当月订单数</div>
        </div>
      </div>
      <div class="rect">
        <icon class="el-icon-data-line icon"></icon>
        <div class="info">
          <div>{{item.data1.goodsNum}}</div>
          <div>新增产品数</div>
        </div>
      </div>
      <div class="rect">
        <icon class="el-icon-data-line icon"></icon>
        <div class="info">
          <div>{{item.data1.shopNum}}</div>
          <div>新增店铺数</div>
        </div>
      </div>
    </div>


    <div class='top22'>
      <div class='outBox'>
        <div class="titl">用户统计</div>
        <div class="box">
          <div class="boxLeft">
            <div>用户总数</div>
            <div>{{item.data4.usersNum}}</div>
          </div>
          <div class="boxRight">
            <div class="inBox">
              <div>{{item.data4.verifyNum}}</div>
              <div>已实名认证用户数</div>
            </div>
            <div class="inBox">
              <div>{{item.data4.noVerifyNum}}</div>
              <div>未实名认证用户数</div>
            </div>
          </div>
        </div>
      </div>

      <div class='outBox'>
        <div class="titl">作品统计</div>
        <div class="box">
          <div class="boxLeft">
            <div>作品总数</div>
            <div>{{item.data3.vod+item.data3.image+item.data3.AUDIO+item.data3.ARTICLE}}</div>
          </div>
          <div class="boxRight">
            <div class="inBox2">
              <div>视频</div>
              <div>{{item.data3.vod}}</div>
            </div>
            <div class="inBox2">
              <div>图文</div>
              <div>{{item.data3.image}}</div>
            </div>
            <div class="inBox2">
              <div>音频</div>
              <div>{{item.data3.AUDIO}}</div>
            </div>
            <div class="inBox2">
              <div>文章</div>
              <div>{{item.data3.ARTICLE}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class='outBox'>
        <div class="titl">商家认证统计</div>
        <div class="box">
          <div class="boxLeft">
            <div>商家总数</div>
            <div>{{item.data2.enterpriseNum+item.data2.supplierNum}}</div>
          </div>
          <div class="boxRight">
            <div class="inBox">
              <div>{{item.data2.enterpriseNum}}</div>
              <div>实体店商家数</div>
            </div>
            <div class="inBox">
              <div>{{item.data2.supplierNum}}</div>
              <div>供应商数</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-bottom:20px;">
      <div class="titl">最近30天订单统计</div>
      <div class="charts" id='c1'>

      </div>
    </div>

    <div style="margin-bottom:20px;">
      <div class="titl">当前产品统计</div>
      <div class="charts" id='c2'>

      </div>
    </div>

    <div class='endBox'>
      <div class="titl">平台业务金额数据</div>
      <div class="endCont">
        <div class="endBoxRect">
          <div style="font-size:18px;">平台业务总额</div>
          <div style="font-size:30px;color:#c00">{{(item.data7.all+item.data8.all+item.data9.all).toFixed(2)}}</div>
          <div><span>{{item.data7.yearStr}}年</span><span>{{(item.data7.year+item.data8.year+item.data9.year).toFixed(2)}}</span></div>
          <div><span>{{item.data7.monthStr}}月</span><span>{{(item.data7.month+item.data8.month+item.data9.month).toFixed(2)}}</span></div>
        </div>
        <div class="endBoxRect">
          <div>{{item.data7.all}}</div>
          <div>平台用户认证和年费额</div>
          <div><span>{{item.data7.yearStr}}年</span><span>{{item.data7.year}}</span></div>
          <div><span>{{item.data7.monthStr}}月</span><span>{{item.data7.month}}</span></div>
        </div>
        <div class="endBoxRect">
          <div>{{item.data8.all}}</div>
          <div>平台基础产品销售额</div>
          <div><span>{{item.data8.yearStr}}年</span><span>{{item.data8.year}}</span></div>
          <div><span>{{item.data8.monthStr}}月</span><span>{{item.data8.month}}</span></div>
        </div>
        <div class="endBoxRect">
           <div>{{item.data9.all}}</div>
          <div>产品佣金额</div>
          <div><span>{{item.data9.yearStr}}年</span><span>{{item.data9.year}}</span></div>
          <div><span>{{item.data9.monthStr}}月</span><span>{{item.data9.month}}</span></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    getCountInfoByType
  } from '@/api/datacenter.js'
  import echarts from 'echarts'
  export default {
    name: 'Datacenter',
    data() {
      return {
        chart1: null,
        chart2: null,
        option1: {},
        option2: {},
        item: {
          data1: {
            userNum: 0,
            vodNum: 0,
            orderNum: 0,
            goodsNum: 0,
            shopNum: 0
          },
          data2: {
            enterpriseNum: 0,
            supplierNum: 0
          },
          data3: {
            vod: 0,
            image: 0,
            AUDIO: 0,
            ARTICLE: 0
          },
          data4: {
            usersNum: 0,
            verifyNum: 0,
            noVerifyNum: 0
          },
          data5: [],
          data7: {all:0,year:0,month:0,yearStr:'',monthStr:''},
          data8: {all:0,year:0,month:0,yearStr:'',monthStr:''},
          data9: {all:0,year:0,month:0,yearStr:'',monthStr:''},

        }
      }
    },
    watch: {

    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)

    },
    mounted() {

      this.option1 = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '订单总笔数', '订单总金额'],
            ['总订单量', 0, 0],
            ['待付款订单', 0, 0],
            ['待发货订单', 0, 0],
            ['待收货订单', 0, 0],
            ['退货退款订单', 100, 100],
            ['待评价订单', 0, 0],
          ]
        },
        xAxis: {
          type: 'category',

        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{

            type: 'bar',
            label: {
              show: true,
              position: 'top'
            },
          },
          {
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            },
          }
        ]
      };
      this.option2 = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [

            ['总产品数', 0],
            ['已上架产品数', 0],
            ['未上架产品数', 0],
            ['待发货产品数', 0],
            ['待收货产品数', 0],
            ['退货退款产品数', 100],
          ]
        },
        xAxis: {
          type: 'category',

        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{

          type: 'bar',
          label: {
            show: true,
            position: 'top'
          },

        }]
      };


      if (!this.chart1) {
        this.chart1 = echarts.init(document.getElementById('c1'))
        this.chart1.setOption(this.option1)
      }
      if (!this.chart2) {
        this.chart2 = echarts.init(document.getElementById('c2'))
        this.chart2.setOption(this.option2)
      }
      this.getData()
      this.getDataEnd()

    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      getData() {
        let that = this;
        getCountInfoByType({
          type: 1
        }).then(res => {
          that.item.data1 = res.data;
          getCountInfoByType({
            type: 2
          }).then(res => {
            that.item.data2 = res.data;
            getCountInfoByType({
              type: 3
            }).then(res => {
              that.item.data3 = res.data;
              getCountInfoByType({
                type: 4
              }).then(res => {
                that.item.data4 = res.data;
                getCountInfoByType({
                  type: 5
                }).then(res => {
                  let totalNum = 0
                  let totalPrice = 0
                  res.data.map((item) => {
                    that.item.data5[item.status] = item
                    totalNum += item.num
                    totalPrice += item.price
                  })
                  that.option1.dataset.source[1][1] = totalNum
                  that.option1.dataset.source[1][2] = totalPrice.toFixed(2)

                  that.option1.dataset.source[2][1] = that.item.data5[0] ? that.item.data5[0].num :
                    0
                  that.option1.dataset.source[2][2] = that.item.data5[0] ? that.item.data5[0].price :
                    0

                  that.option1.dataset.source[3][1] = that.item.data5[1] ? that.item.data5[1].num :
                    0
                  that.option1.dataset.source[3][2] = that.item.data5[1] ? that.item.data5[1].price :
                    0

                  that.option1.dataset.source[4][1] = that.item.data5[2] ? that.item.data5[2].num :
                    0
                  that.option1.dataset.source[4][2] = that.item.data5[2] ? that.item.data5[2].price :
                    0

                  that.option1.dataset.source[5][1] = that.item.data5[8] ? that.item.data5[8].num :
                    0
                  that.option1.dataset.source[5][2] = that.item.data5[8] ? that.item.data5[8].price :
                    0

                  that.option1.dataset.source[6][1] = that.item.data5[3] ? that.item.data5[3].num :
                    0
                  that.option1.dataset.source[6][2] = that.item.data5[3] ? that.item.data5[3].price :
                    0

                  that.chart1.setOption(that.option1)


                  getCountInfoByType({
                    type: 6
                  }).then(res => {
                    that.option2.dataset.source[0][1] = res.data.goodsNum
                    that.option2.dataset.source[1][1] = res.data.upGoodsNum
                    that.option2.dataset.source[2][1] = res.data.noUpGoodsNum
                    that.option2.dataset.source[3][1] = res.data.delivery
                    that.option2.dataset.source[4][1] = res.data.receive
                    that.option2.dataset.source[5][1] = res.data.back
                    that.chart2.setOption(that.option2)
                  })

                })
              })

            })
          })
        })
      },
      getDataEnd() {
        let that = this
        getCountInfoByType({
          type: 7
        }).then(res => {
          that.item.data7=res.data
        })
        getCountInfoByType({
          type: 8
        }).then(res => {
           that.item.data8=res.data
        })
        getCountInfoByType({
          type: 9
        }).then(res => {
           that.item.data9=res.data
        })

      }
    }
  }
</script>
<style>
  .content {
    width: 98%;
    margin-top: 20px;
    margin-left: 1%;
  }

  .titl {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .top {

    width: 100%;
    height: 100px;
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: space-between;
  }

  .rect {
    background: #f2f2f2;
    display: flex;
    width: 19%;
    align-items: center;
    flex-direction: row;
  }

  .icon {
    font-size: 51px;
    width: 50px;
    margin: 0 20px;
    height: 50px;
    border-radius: 100%;
  }

  .info div:nth-child(1) {
    font-size: 28px;
  }

  .info div:nth-child(2) {
    font-size: 16px;
    color: #aaa;
  }

  .datacenter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .leftCharts {
    width: 70%;
  }

  .top2 {
    background: #f2f2f2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 33px;
  }

  .top2_left {
    margin-right: 200px;
    color: #999999;
  }

  .top2_left div:nth-child(1) {
    font-size: 25px;
  }

  .top2_left div:nth-child(2) {
    font-size: 35px;
    color: #cc0000;
  }

  .top2_right div:nth-child(1) {
    font-size: 25px;
    color: #999999;
  }

  .top2_right div:nth-child(2) {
    font-size: 35px;
    color: #cc0000;
  }

  .charts1 {
    height: 400px;
    background: #f2f2f2;
  }


  .right_charts {
    width: 28%;
  }

  .tb {
    background: #F2F2F2;
    width: 100%;

  }

  .tb table {
    width: 100%;
    height: 500px;
  }

  .tb td {
    font-size: 23px;
    text-align: center;
  }

  .charts {
    width: 100%;
    height: 500px;
    background: #F2F2F2;
  }


  .top22 {
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .outBox {
    width: 30%;
  }

  .box {
    background: #f2f2f2;
    height: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    padding: 20px;
  }

  .boxLeft {
    font-size: 28px;
    width: 50%;
  }

  .boxLeft div:nth-child(1) {
    font-size: 20px;
    color: #999999;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .boxRight {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 90%;
    width: 50%;
    align-items: center;
  }

  .inBox {
    background: #d7d7d7;
    height: 40%;
    width: 100%;

    border-radius: 20px;
  }

  .inBox div:nth-child(1) {
    font-size: 20px;
    margin-top: 15%;
  }

  .inBox div:nth-child(2) {
    font-size: 12px;
    margin-top: 10px;
  }

  .inBox2 {
    background: #d7d7d7;
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-left: 10px;
    padding-top: 10px;
    border-radius: 20px;
  }

  .inBox2 div:nth-child(1) {
    font-size: 12px;
    line-height: 30px;
    padding-right: 10px;

  }

  .inBox2 div:nth-child(2) {
    line-height: 30px;
    font-size: 20px;

  }

  .endBox {
    width: 100%;
    margin-bottom: 20px;
  }

  .endCont {
    background: #f2f2f2;
    height: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .endBoxRect {
    padding-top: 50px;
    width: 20%;
    border-radius: 20px;
    background: #d7d7d7;
    height: 70%;
    text-align: center;
  }

  .endBoxRect:nth-child(1) {
    background: #f2f2f2;
  }

  .endBoxRect div:nth-child(1) {
    font-size: 30px;
  }

  .endBoxRect div:nth-child(2) {
    font-size: 18px;
    line-height: 50px;
  }

  .endBoxRect div:nth-child(3) {
    font-size: 13px;

  }

  .endBoxRect div:nth-child(3) span:nth-child(1) {
    margin-right: 10px;

  }

  .endBoxRect div:nth-child(4) {
    font-size: 13px;
    line-height: 30px;
  }

  .endBoxRect div:nth-child(4) span:nth-child(1) {
    padding-left: 20px;
    margin-right: 10px;

  }
</style>
