<template>
  <div class="container">
    <div class="seachPanel">

      商品名称：
      <el-input v-model="name" style="width:180px;" placeholder="商品名称"></el-input>
      创建时间：
      <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
        value-format="yyyy-MM-dd">
      </el-date-picker>

      <el-button style="float:right;margin-left:10px;" @click="reset">重置</el-button>
      <el-button style="float:right;" type="primary" icon="el-icon-search" @click="query">搜索</el-button>

    </div>

    <el-radio-group v-model="state" @change="query" style="margin-bottom: 10px;">
      <el-radio-button label="1">已上架</el-radio-button>
      <el-radio-button label="-1">未上架</el-radio-button>
      <el-radio-button label="3">已冻结</el-radio-button>
      <el-radio-button label="2">不通过</el-radio-button>
    </el-radio-group>

    <el-table :data="list" border style="width: 100%">

      <el-table-column prop="name" label="商品名称" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column prop="goodsWeight" label="重量" align="center">
      </el-table-column>
      <el-table-column label="零售价" align="center">
        <template slot-scope="scope">
          {{scope.row.specificationsList.length>0?scope.row.specificationsList[0].retailPrice:0}}

        </template>
      </el-table-column>

      <el-table-column v-if="state>1" label="审核人" align="center">
        <template slot-scope="scope">
          {{scope.row.reviewUser.username}}
        </template>
      </el-table-column>
      <el-table-column v-if="state>1" prop="reviewdate" label="审核时间" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" v-if="state==1" @click="show(scope.row)"> 预览</el-button>
          <el-button type="primary" plain size="mini" v-if="state==1" @click="down(scope.row)"> 下架</el-button>

          <el-button type="primary" plain size="mini" v-if="state==-1" @click="edit(scope.row)"> 编辑</el-button>
          <el-button type="primary" plain size="mini" v-if="state==-1" @click="up(scope.row)"> 上架</el-button>
          <el-button type="primary" plain size="mini" v-if="state==-1" @click="del(scope.row)"> 删除</el-button>

          <el-button type="primary" plain size="mini" v-if="state==3" @click="show(scope.row)"> 预览</el-button>
          <el-button type="primary" plain size="mini" v-if="state==3" @click="apply"> 解冻申请</el-button>

          <el-button type="primary" plain size="mini" v-if="state==2" @click="show(scope.row)"> 预览</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="query" :current-page.sync="currentPage" style="margin-top:10px;margin-left:-10px;float:right;"
      layout="total,  prev, pager, next, jumper" :page-size=10 :total="records">
    </el-pagination>


    <el-dialog title="编辑商品" :visible.sync="isShow" width="88%" height="100%" right>
      <Edit ref="edit" :callback='callback' style="width: 100%;height: 600px;border: 0;overflow-x: hidden;" />
    </el-dialog>



  </div>
</template>

<script>
  import {
    getGoodsVoList,
    upOrDelGoods,
    downGoodsById
  } from '@/api/categorymargin.js'
  import Edit from '../goodsadd/eidt'
  export default {
    name: 'Audit',
    components: {
      Edit
    },
    data() {

      return {
        id: null,
        isShow: false,
        name: '',
        time: [],
        records: 100,
        state: 1,
        currentPage: 1,
        list: []
      }
    },
    mounted() {
      this.query();
    },
    methods: {
      apply() {
        this.$alert('申请商品解冻，请详细说明原因，截图或照片发邮件给我们，便于工作人员审核，谢谢你的配合。<br>邮箱：raywu@eprosale.com', '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          callback: action => {

          }
        });
      },
      callback() {
        this.query()
        this.isShow = false
      },

      edit(item) {

        this.isShow = true
        let that = this
        setTimeout(function() {
          that.$refs.edit.setEdit(item)
        }, 100);
      },
      up(item) {
        let pars = {}
        pars.id = item.id
        pars.status = 0
        upOrDelGoods(pars).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.query()
        })
      },
      down(item) {
        let pars = {
          id: item.id
        }
        downGoodsById(item).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.query()
        })
      },
      del(item) {
        let pars = {}
        pars.id = item.id
        pars.status = 4
        upOrDelGoods(pars).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.query()
        })
      },
      show(item) {
        this.isShow = true
        let that = this
        setTimeout(function() {
          that.$refs.edit.show(item)
        }, 100);

      },
      reset() {
        this.name = ''
        this.time = []

      },
      query() {
        let pars = {}
        pars.currentPage = this.currentPage
        pars.name = this.name
        if (this.time.length > 0) {
          pars.searchStarttime = this.time[0] + " 00:00:00"
          pars.searchEndtime = this.time[1] + " 00:00:00"
        }
        pars.status = this.state
        pars.pageSize = 10
        getGoodsVoList(pars).then(res => {
          console.log(res)
          this.list = res.data
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
