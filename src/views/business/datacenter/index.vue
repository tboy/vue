<template>
  <div class="content">
    <div class="titl">当月数据统计</div>
    <div class="top">
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
          <div>{{item.data1.fShopNum}}</div>
          <div>新增用户收藏店铺数</div>
        </div>
      </div>
      <div class="rect">
        <icon class="el-icon-data-line icon"></icon>
        <div class="info">
          <div>{{item.data1.fGoodsNum}}</div>
          <div>新增用户收藏商品数</div>
        </div>
      </div>
      <div class="rect">
        <icon class="el-icon-data-line icon"></icon>
        <div class="info">
          <div>{{item.data1.vodNum}}</div>
          <div>新增社交作品数</div>
        </div>
      </div>
    </div>


    <div class="datacenter">
      <div class="leftCharts">
        <div class="titl">年销售统计</div>
        <div class="top2">
          <div class="top2_left">
            <div>年销售额</div>
            <div>{{item.data3[0].price}}</div>
          </div>
          <div class="top2_right">
            <div>年退货额</div>
            <div>{{item.data3[0].back}}</div>
          </div>
        </div>
        <div class="charts1" id='c1'>

        </div>
      </div>

      <div class="right_charts">
        <div class="titl">总销售统计</div>
        <div class="tb">
          <table>
            <tr style="color:#999;font-size:25px;">
              <td>总销售额</td>
              <td></td>
              <td>总退货额</td>
            </tr>
            <tr>
              <td style="color:#c00;font-size:35px;">{{item.totalSell}}</td>
              <td></td>
              <td style="color:#c00;font-size:35px;">{{item.totalBack}}</td>
            </tr>
            <tr v-for="item2 in item.data3">
              <td>{{item2.price}}</td>
              <td style='color:#999999'>{{item2.title}}</td>
              <td>{{item2.back}}</td>
            </tr>

          </table>

        </div>
      </div>

    </div>


    <div>
      <div class="titl">最近30天订单统计</div>
      <div class="charts" id='c2'>

      </div>
    </div>


  </div>
</template>

<script>
  import {
    getCountShopData
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
            orderNum: 0,
            fGoodsNum: 0,
            vodNum: 0,
            fShopNum: 0
          },
          data3: [{
            num: null,
            price: 0,
            status: null,
            title: "2020-03",
            back: 0
          }],
          totalSell: 0,
          totalBack: 0,
        }
      }
    },
    watch: {

    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
      this.option1.dataset.source
    },
    mounted() {
      this.option1 = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '年退货额', '年销售额'],
            ['4月', 0, 0],
            ['5月', 0, 0],
            ['6月', 0, 0],
            ['7月', 0, 0],
            ['8月', 0, 0],
            ['9月', 0, 0],
            ['10月', 0, 0],
            ['11月', 0, 0],
            ['12月', 0, 0],
            ['1月', 0, 0],
            ['2月', 0, 0],
            ['3月', 0, 0],
          ]
        },
        xAxis: {
          type: 'category'
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
            ['product', '订单总笔数', '订单总金额'],
            ['总订单量', 0, 0],
            ['待付款订单', 0, 0],
            ['待发货订单', 0, 0],
            ['待收货订单', 0, 0],
            ['退货退款订单', 0, 0],
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


      if (!this.chart1) {
        this.chart1 = echarts.init(document.getElementById('c1'))
        this.chart1.setOption(this.option1)
      }
      if (!this.chart2) {
        this.chart2 = echarts.init(document.getElementById('c2'))
        this.chart2.setOption(this.option2)
      }

      this.getData()
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      getData() {
        let that = this;
        getCountShopData({
          type: 1
        }).then(res => {
          that.item.data1 = res.data
          getCountShopData({
            type: 2
          }).then(res => {
            let data = res.data.reverse()
            for (let i = 0; i < data.length; i++) {
              this.option1.dataset.source[i + 1][0] = data[i].title
              this.option1.dataset.source[i + 1][1] = data[i].price
              this.option1.dataset.source[i + 1][2] = data[i].back
            }
            this.chart1.setOption(this.option1)


            getCountShopData({
              type: 3
            }).then(res => {
              that.item.data3 = res.data.reverse()
              res.data.map(item => {
                that.item.totalSell += item.price
                that.item.totalBack += item.back
              })
              getCountShopData({
                type: 4
              }).then(res => {
                let num = 0;
                let price = 0;
                res.data.map(item => {
                  num += item.num;
                  price += item.price
                  switch (item.status) {
                    case 0:
                      this.option2.dataset.source[2][1] = item.num
                      this.option2.dataset.source[2][2] = item.price
                      break;
                    case 1:
                      this.option2.dataset.source[3][1] = item.num
                      this.option2.dataset.source[3][2] = item.price
                      break;
                    case 2:
                      this.option2.dataset.source[4][1] = item.num
                      this.option2.dataset.source[4][2] = item.price
                      break;
                    case 8:
                      this.option2.dataset.source[5][1] = item.num
                      this.option2.dataset.source[5][2] = item.price
                      break;
                    case 3:
                      this.option2.dataset.source[6][1] = item.num
                      this.option2.dataset.source[6][2] = item.price
                      break;
                  }
                })

                this.option2.dataset.source[1][1] = num
                this.option2.dataset.source[1][2] = price
                this.chart2.setOption(this.option2)

              })
            })
          })
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
    width: 23%;
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
</style>
