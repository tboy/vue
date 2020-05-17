<template>
  <div class="container">

    <div class="seachPanel">
      <el-select v-model="status" style="width:180px;" @change="query">
        <el-option value="0" label="未审核"></el-option>
        <el-option value="1" label="通过"></el-option>
        <el-option value="2" label="不通过"></el-option>

      </el-select>
      创建时间：
      <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
        value-format="yyyy-MM-dd">
      </el-date-picker>

      <el-button style="float:right;" type="primary" icon="el-icon-search" @click="query">搜索</el-button>

    </div>



    <el-table :data="list" border style="width: 100%">

      <el-table-column label="申请人" align="center">
        <template slot-scope="scope">
          {{scope.row.usersVo.nickname}}
        </template>
      </el-table-column>
      <el-table-column label="申请人手机" align="center">
        <template slot-scope="scope">
          {{scope.row.usersVo.username}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" align="center">
      </el-table-column>
      <el-table-column label="提现金额" align="center">
        <template slot-scope="scope">
          {{scope.row.money}}
        </template>

      </el-table-column>
      <el-table-column label="手续费" align="center">
        <template slot-scope="scope">
          {{scope.row.handlingFee}}
        </template>
      </el-table-column>
      <el-table-column label="实际到帐金额" align="center">
        <template slot-scope="scope">
          {{scope.row.actualMoney}}
        </template>
      </el-table-column>

      <el-table-column label="审核人" align="center">
        <template slot-scope="scope">
          {{scope.row.reviewUser?scope.row.reviewUser.nickname:''}}
        </template>
      </el-table-column>
      <el-table-column prop="reviewDate" label="审核时间" align="center">

      </el-table-column>
      <el-table-column prop="reason" label="原因" align="center">

      </el-table-column>


      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" v-if="status==0" @click="show(scope.row)"> 审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="query" :current-page.sync="currentPage" style="margin-top:10px;margin-left:-10px;float:right;"
      layout="total,  prev, pager, next, jumper" :page-size=10 :total="records">
    </el-pagination>


    <el-dialog title="审核" :visible.sync="isShow" width="88%" height="100%" right>
      <el-input type="textarea" placeholder="请输入原因" v-model="reason" rows="10" maxlength="500" show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="audit(1)">通 过</el-button>
        <el-button type="primary" @click="audit(2)">不通过</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
  import {
    getApplyCashList,
    auditApplyCash
  } from '@/api/user.js'

  export default {
    name: 'Audit',

    data() {

      return {
        status: "0",
        reason: '',
        item: null,
        time: [],
        isShow:false,
        records: 100,
        currentPage: 1,
        list: []
      }
    },
    mounted() {
      this.query();
    },
    methods: {

      show(item) {
        this.item = item;
        this.isShow = true
      },

      audit(state) {
        this.item.status = state;
        this.item.reason = this.reason;
        let that = this;
        this.$alert('审核通过后，用户会收到资金', '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          callback: action => {
            auditApplyCash(that.item).then(res => {
              that.$message({
                message: res.msg,
                type: 'success'
              });
              that.isShow = false
              that.query();
            })
          }
        });

      },
      query() {
        let pars = {}
        pars.currentPage = this.currentPage
        pars.status = this.status
        if (this.time.length > 0) {
          pars.searchStarttime = this.time[0] + " 00:00:00"
          pars.searchEndtime = this.time[1] + " 00:00:00"
        }
        pars.pageSize = 10
        getApplyCashList(pars).then(res => {
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
