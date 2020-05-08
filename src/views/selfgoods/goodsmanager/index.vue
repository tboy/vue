<template>
  <div class="container">
    <div class="seachPanel">
      <el-select v-model="state" style="width:180px;">
        <el-option value="0" label="待审核"></el-option>
        <el-option value="1" label="已上架"></el-option>
        <el-option value="2" label="不通过"></el-option>

      </el-select>
      产品名称：
      <el-input v-model="name" style="width:180px;" placeholder="产品名称"></el-input>
      创建时间：
      <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
        value-format="yyyy-MM-dd">
      </el-date-picker>

      <el-button style="float:right;" type="primary" @click="query">搜索</el-button>

    </div>



    <el-table :data="list" border style="width: 100%">
      <el-table-column label="用户名" align="center" width='100'>
        <template slot-scope="scope">
          {{scope.row.usersVo.nickname}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" width='100'>
        <template slot-scope="scope">
          {{scope.row.usersVo.username}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="产品名称" align="center">
      </el-table-column>

      <el-table-column label="销售价" align="center">
        <template slot-scope="scope">
          {{scope.row.specificationsList.length>0?scope.row.specificationsList[0].commission:0}}

        </template>

      </el-table-column>
      <el-table-column label="显示价" align="center">
        <template slot-scope="scope">

          {{scope.row.specificationsList.length>0?scope.row.specificationsList[0].retailPrice:0}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="审核人" align="center">
        <template slot-scope="scope">
          {{scope.row.reviewUser?scope.row.reviewUser.username:''}}
        </template>
      </el-table-column>
      <el-table-column  prop="reviewdate" label="审核时间" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" v-if="state==0" @click="audit(scope.row)"> 详情</el-button>
          <el-button type="primary" plain size="mini" v-if="state==1" @click="show(scope.row)">详情</el-button>
          <el-button type="primary" plain size="mini" v-if="state==3" @click="show(scope.row)"> 详情</el-button>
          <el-button type="primary" plain size="mini" v-if="state==2" @click="show(scope.row)"> 详情</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="query" :current-page.sync="currentPage" style="margin-top:10px;margin-left:-10px;float:right;"
      layout="total,  prev, pager, next, jumper" :page-size=10 :total="records">
    </el-pagination>


    <el-dialog title="编辑产品" :visible.sync="isShow" width="88%" height="100%" center>
      <Edit ref="edit" :callback='callback' style="width: 100%;height: 600px;border: 0;overflow-x: hidden;" />
    </el-dialog>

    <el-dialog title="原因" :visible.sync="isShow2" width="30%" center :modal=false>
      <el-input type="textarea" placeholder="请输入原因" v-model="reasonTxt" rows="10" maxlength="500" show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow2 = false">取 消</el-button>
        <el-button type="primary" @click="freezenHandel()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getGoodsVoList,
    auditGoods
  } from '@/api/categorymargin.js'
  import Edit from '../../business/selfgoods/goodsadd/eidt'
  export default {
    name: 'Audit',
    components: {
      Edit
    },
    data() {

      return {
        id: null,
        youduNum: '',
        isShow: false,
        isShow2: false,
        name: '',
        reasonTxt: '',
        time: [],
        records: 100,
        state: "0",
        currentPage: 1,
        freezenObj: {},
        list: []
      }
    },
    mounted() {
      this.query();
    },
    methods: {
      callback() {
        this.query()
        this.isShow = false
      },
      audit(item) {

        this.isShow = true
        let that = this
        setTimeout(function() {
          that.$refs.edit.setAudit(item)
        }, 100);
      },
      freezen(item, status) {
        this.reasonTxt = ''
        this.freezenObj.status = status
        this.freezenObj.id = item.id
        this.isShow2 = true
      },
      freezenHandel() {
        this.freezenObj.reason = this.reasonTxt
        auditGoods(this.freezenObj).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.query()
          this.isShow2 = false
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
        this.youduNum = ''
        this.time = []
      },
      query() {
        let pars = {}
        pars.currentPage = this.currentPage
        pars.youduNum = this.youduNum
        pars.name = this.name
        pars.pageSize = 10
        if (this.time.length > 0) {
          pars.searchStarttime = this.time[0] + " 00:00:00"
          pars.searchEndtime = this.time[1] + " 00:00:00"
        }
        pars.status = this.state
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
