<template>
  <div class="app-container">

    <!-- 表格 -->
    <el-table  :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100px;">

      <el-table-column align="center" label="变量名" min-width="150px">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>

        </template>
      </el-table-column>

      <el-table-column align="center" label="变量" min-width="150px">
       <template slot-scope="scope">
          <el-input v-model="scope.row.subName"></el-input>

       </template>
      </el-table-column>
      <el-table-column align="center" label="单位类型" min-width="150px">
       <template slot-scope="scope">
          <el-input v-model="scope.row.unitType"></el-input>

       </template>
      </el-table-column>
      <el-table-column align="center" label="数值" min-width="150px">
       <template slot-scope="scope">
         <el-input v-model="scope.row.data"></el-input>
       </template>
      </el-table-column>
      <el-table-column align="center" label="单位" min-width="150px">
       <template slot-scope="scope">
          <el-input v-model="scope.row.unit"></el-input>

       </template>
      </el-table-column>
      <el-table-column align="center" label="备注" min-width="150px">
       <template slot-scope="scope">
          <el-input v-model="scope.row.remark"></el-input>
       </template>
      </el-table-column>


     <el-table-column min-width="200px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="save(scope.row)">保存</el-button>
        </template>
      </el-table-column>

    </el-table>



  </div>
</template>

<script>
  import {getBaseSet,addOrUpdateBaseSet} from '@/api/dataSet'
  export default {
    name: 'category',
    data() {
      return {
        list:[]
        }
    },
    created() {

      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
       getBaseSet().then(response => {
          this.list = response.data
          this.listLoading = false
        }).catch((error) => {
          console.log(error)
          this.listLoading = false
        })
      },
      save(item){
        this.listLoading = true
        addOrUpdateBaseSet(item).then(response => {

          this.listLoading = false
        }).catch((error) => {
          console.log(error)
          this.listLoading = false
        })
      }
    }
  }
</script>



<style scoped>
  .file-page {
    position: absolute;
    top: 0;
    right: 0;
    width: 100PX;
    text-align: center;
  }
  .file-show{
    background: #bfc1c5;
    color: #fff;
    border-left: 1px solid #c0c4cc;
    cursor: pointer;
  }
  .file-update{
    opacity: 0;
    height: 100%;
    cursor: pointer;
    z-index: 2;
  }
  .file-image-page {
    position: relative;
    width: 220px;
    float: left;
  }
  .file-show.file-image{
    position: inherit;
    padding: 56px 0;
    display: inline-block;
    width: 100%;
    background: rgb(245, 247, 250);
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    color: #909399;
  }
  .input-image{
    left: 0;
    width: 100%;
  }
  .input-file-image{
    width: 100%;
    position:absolute;
    opacity: 0;
  }
</style>
