<template>
  <div class="app-container">

    <!-- 表格头部操作 -->
    <div class="filter-container">

        <el-select class="filter-item" v-model="listQuery.object" placeholder="请选择">
          <el-option v-for="item in  objs" :key="item.key" :label="item.display_name" :value="item.key">
          </el-option>
        </el-select>

      <el-date-picker
        class="filter-item filter-date"
        v-model="searchRegisterDate"
        type="daterange"
        range-separator="至"
        @change="pickerRegisterChange"
        value-format="yyyy-MM-dd HH:mm:ss"
        format="yyyy 年 MM 月 dd 日"
        start-placeholder="入住开始日期"
        end-placeholder="入住结束日期">
      </el-date-picker>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item"  type="primary" v-waves icon="el-icon-edit" @click="createHeadDialog">添加</el-button>

    </div>
    <!-- 表格 -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100px;">
      <el-table-column align="center" label="banner类型" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.object|objFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.type|typeFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="排序" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.sort}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="图片路径" min-width="150px">
        <template slot-scope="scope">
            <img :src="scope.row.imgServer+scope.row.banner" class="xszImg" style="width:100px;height:50px;">
        </template>
      </el-table-column>

      <el-table-column align="center" label="跳转路径" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.action}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="settingDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 增/改弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible"  v-loading='dialogLoading'>
      <div slot="title" class="dialog-footer">
        <h3 class="full-dialog-title">{{dialogTitle}}</h3>
      </div>
      <el-form :rules="valids" ref="dataForm" label-position="left" :model="form" label-width="150px" style=''>
        <!--<el-form-item :label="$t('banner.object')" prop="object">-->
          <!--<el-input type="text" :rows="2"  class="input-name" v-model="form.object"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="对象属性" prop="object">
          <el-select class="filter-item" v-model="form.object" placeholder="请选择">
            <el-option v-for="item in  objs" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select class="filter-item" v-model="form.type" placeholder="请选择">
            <el-option v-for="item in  typeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input type="text" :rows="2"  class="input-name" v-model="form.sort"></el-input>
        </el-form-item>

        <el-form-item label="图片路径" prop="banner">
         <!-- <el-input type="text" :rows="2" disabled class="input-name input-file-image" v-model="form.banner"></el-input>
          <span class="file-show file-page file-image" :style="imageBg" v-loading="fileBtnLoading">{{fileIconText}}</span>
          <input type="file" class="file-update file-page input-image" v-on:change="updateIcon($event)"> -->

          <el-upload

            class="avatar-uploader"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="upload"
          >
            <img v-if="form.banner" :src="form.imgServer+form.banner" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="跳转路径" prop="action">
          <el-input type="text" :rows="2"  class="input-name" v-model="form.action"></el-input>
        </el-form-item>
        <el-form-item label="数据" prop="data">
          <el-input type="text" :rows="2"  class="input-name" v-model="form.data"></el-input>
        </el-form-item>

        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateBanner" :loading="btnLoading">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import banner from '@/api/banner'
  import {imgPath} from '@/utils/imgUploadPath'
  const typeOptions = [
    { key: 1, display_name: '跳转到产品详情页面' },
    { key: 2, display_name: 'app内部打开URL' },
    { key: 3, display_name: '外部浏览器打开URL' },
    { key: 4, display_name: '无操作' },
    { key: 5, display_name: '拖拉机A页面' },
    { key: 6, display_name: '拖拉机B页面' },
    { key: 7, display_name: '跳转APP内页面' },
  ]

  const objs = [
     { key: 'back', display_name: '背景图' },
    { key: 'white', display_name: '白市坊' },
    { key: 'grid', display_name: '九宫格' },
  ]

  const objsOptionsFilter = objs.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  const typeOptionsFilter = typeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})
  export default {
    name: 'category',
    directives: {
      waves
    },
    data() {
      return {
        uploadPath: imgPath,
        tableKey: 0,
        total: 0,
        list: null,
        listLoading: false,
        typeOptions,
        objs,
        btnLoading: false,
        dialogFormVisible: false,
        dialogLoading: false,
        dialogTitle: '修改banner',
        fileIconText: '上传banner',
        fileBtnLoading: false,
        imageBg: null,
        valids: {
          banner: [{ required: true, message: '请选择banner图' }]
        },
        searchRegisterDate: null,
        form: {
          id: '',
          imgServer:'',
          banner:'',
          object: null
        },
        listQuery: {
          currentPage: 1,
          pageSize: 10,
          object:'back',
          name: null,
          id: null,
          searchStarttime: null,
          searchEndtime: null
        }
      }
    },
    filters: {
      typeFilter(type) {
        return typeOptionsFilter[type]
      },
      objFilter(type){
        return objsOptionsFilter[type]
      }
    },
    created() {
   
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        banner.getBannerList(this.listQuery).then(response => {
          this.list = response.data
          this.listLoading = false
          this.total = response.total
        }).catch((error) => {
          console.log(error)
          this.listLoading = false
        })
      },
      upload(res, file) {
         this.form.banner = res.data.path;
         this.from.imgServer = res.data.server;
      },
      pickerRegisterChange() {
        this.listQuery.searchStarttime = this.searchRegisterDate ? this.searchRegisterDate[0] : null
        this.listQuery.searchEndtime = this.searchRegisterDate ? this.searchRegisterDate[1] : null
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.currentPage = val
        this.getList()
      },
      createHeadDialog() {
        this.dialogFormVisible = true
        this.btnLoading = false
        this.form = {
          id: '',
          object: '',
          type: '',
          sort: '',
          banner: '',
          action: ''
        }
        this.imageBg = ''
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      settingDialog(data) {
        this.form = {
          id: data.id,
          object: data.object,
          type: data.type,
          sort: data.sort,
          banner: data.banner,
          imgServer:data.imgServer,
          action: data.action
        }


        this.dialogFormVisible = true
      },
      updateBanner() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            if (this.form.id === null || this.form.id === '') {
              banner.addBanner(this.form).then((res) => {
                this.dialogFormVisible = false
                this.btnLoading = false
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              }).catch((error) => {
                console.log(error)
                this.btnLoading = false
              })
            } else {
              banner.updateBanner(this.form).then((res) => {
                this.dialogFormVisible = false
                this.btnLoading = false
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              }).catch((error) => {
                console.log(error)
                this.btnLoading = false
              })
            }
          }
        })
      },
      updateIcon(e) {
        const file = e.target.files
        const formdata = new FormData()
        formdata.append('file', file[0], file[0].name)
        this.fileBtnLoading = true
        this.$updateFile.uploadBannerNoCache(formdata).then(respones => {
          this.fileIconText = ''
          this.fileBtnLoading = false
          this.imageBg = 'background: url(' + respones.path + ') no-repeat;background-size:100% 100%;'
          this.form.banner = respones.path
        }).catch(err => {
          this.fileBtnLoading = false
          console.log(err)
        })
      },
      handleDelete(id) {
        banner.delBanner(id).then((res) => {
          this.$notify({
            title: '成功',
            message: '已删除',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }).catch((error) => {
          console.log(error)
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
