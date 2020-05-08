<template>
  <div class="app-container">

    <!-- 表格头部操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-edit" @click="addCategory">添加</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="list" stripe border fit highlight-current-row style="width: 100%;min-height:100px;">
      <el-table-column prop="list.name" label="一级目录" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="list.categoryMarginList.name" label="二级类目" min-width="100px" align="center">
        <template slot-scope="scope">
          <p v-for="item in scope.row.categoryMarginList">{{item.name}}</p>
        </template>
      </el-table-column>


      <el-table-column label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <p>
            <el-button type="primary" size="mini" @click="updatecategoryMargin(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deteleCategoryMargin(scope.row)">删除</el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>

    <!-- 增/改弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" label-position="center" label-width="150px" :model="form">
        <span>
          <h3>添加一级目录</h3>
        </span>
        <el-input type="hidden" :rows="2" v-model="form.id"></el-input>
        <el-form-item label="一级目录" prop="name">
          <el-input type="text" :rows="2" v-model="form.name" placeholder="请输入一级目录"></el-input>
        </el-form-item>

        <span>
          <h3>二级</h3>
        </span>
        <el-col v-for="(item,index) in form.categoryMarginList" v-bind:key="item.index">
            <el-form-item label="二级类目" prop="name">
               <el-input type="text" style="width:150px;float:left;margin-right:20px;" :rows="2" v-model="form.categoryMarginList[index].name" placeholder="请输入二级类目"></el-input>
            <el-upload  :before-upload="selImg" :id="index" class="avatar-uploader"
              :action="uploadPath" :show-file-list="false" :on-success="upload">
              <img v-if="form.categoryMarginList[index].img" :src="form.categoryMarginList[index].imageServer+form.categoryMarginList[index].img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>



          </el-form-item>

        </el-col>
      </el-form>
      <el-button type="primary" @click="addCate">增加</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import supplier from '@/api/supplier'
  import {imgPath} from '@/utils/imgUploadPath'
  export default {
    directives: {
      waves
    },
    data() {
      return {
        imgIdx:0,
         uploadPath: imgPath,
        list: [{
          id: null,
          name: null,
          categoryMarginList: [{
            id: null,
            name: null,
            tmallNub: null,
            deduction: null,
            commission: null,
            margin: null
          }]
        }],
        dialogFormVisible: false,
        form: {
          id: null,
          name: null,
          categoryMarginList: [{
            id: null,
            name: null,
            tmallNub: null,
            deduction: null,
            commission: null,
            margin: null
          }]
        }
      }
    },
    filters: {},
    created() {
      this.findAllCategoryMargin()
    },
    methods: {
      selImg(val) {
        this.imgIdx = event.target.parentElement.parentElement.getAttribute("id");

      },
      upload(res, file) {
        this.form.categoryMarginList[this.imgIdx].img = res.data.path;
        this.form.categoryMarginList[this.imgIdx].imageServer = res.data.server;



      },
      findAllCategoryMargin() {
        supplier.findAllCategoryMargin().then(response => {
          this.list = response.data
          console.log(this.list)
        }).catch((error) => {
          console.log(error)
        })
      },
      addCategory() {
        this.form = {
          id: null,
          name: null,
          categoryMarginList: [{
            id: null,
            name: null,
            tmallNub: null,
            deduction: null,
            commission: null,
            margin: null
          }]
        }
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      addCate() {
        const addObj = {
          id: null,
          name: null,
          tmallNub: null,
          deduction: null,
          commission: null,
          margin: null
        }
        this.form.categoryMarginList.push(addObj)
      },
      add() {
        if (this.form.id === null) {
          supplier.addCategoryMargin(this.form).then(response => {
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.findAllCategoryMargin()
          }).catch((error) => {
            console.log(error)
          })
        } else {
          supplier.updateCategoryMargin(this.form).then(response => {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.findAllCategoryMargin()
          }).catch((error) => {
            console.log(error)
            this.listLoading = false
          })
        }
      },
      deteleCategoryMargin(data) {
        this.$confirm('确定要删除该产品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          supplier.deteleCategoryMargin(data).then((respone) => {
            this.findAllCategoryMargin()
          }).catch((error) => {
            console.log(error)
          })
        }).catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      updatecategoryMargin(data) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        supplier.findCategoryMarginById(data).then(response => {
          this.form = response.data
        }).catch((error) => {
          this.dialogFormVisible = false
          console.log(error)
        })
      }
    }
  }
</script>


<style scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-right: 20px;
    width: 178px !important;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px !important;
    height: 178px;
    display: block;
  }
  .file-page {
    position: absolute;
    top: 0;
    right: 0;
    width: 100PX;
    text-align: center;
  }

  .file-show {
    background: #bfc1c5;
    color: #fff;
    border-left: 1px solid #c0c4cc;
    cursor: pointer;
  }

  .file-update {
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

  .file-show.file-image {
    position: inherit;
    padding: 56px 0;
    display: inline-block;
    width: 100%;
    background: rgb(245, 247, 250);
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    color: #909399;
  }

  .input-image {
    left: 0;
    width: 100%;
  }

  .input-file-image {
    width: 100%;
    position: absolute;
    opacity: 0;
  }
</style>
