<template>
  <div class="app-container">
    <!-- 表格头部操作 -->
    <div class="filter-container">

    </div>
    <!-- 表格 -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100px;">
     
      <el-table-column min-width="150px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>

     <!-- <el-table-column min-width="100px" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag>{{scope.row.disable | disableText}}</el-tag>
        </template>
      </el-table-column> -->

      <el-table-column min-width="200px" align="center" label="角色名">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.roleList" v-bind:key="index">{{item.role?item.role.name:''}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="center" label="操作">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.leave">已离职</el-tag>
            <el-button v-if="!scope.row.leave" type="primary" size="mini" @click="updateDialog(scope.row)">编辑</el-button>
          <!--  <el-button v-if="!scope.row.leave" type="danger" size="mini" @click="handleLeaveoffice(scope.row)">离职</el-button> -->
          </template>
      </el-table-column>
    </el-table>


    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 增/改弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :rules="valids" ref="dataForm" label-position="left" :model="form" label-width="80px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="用户名" >
          <!-- <el-input type="text" :rows="2" placeholder="请输入用户名" v-model="form.username"></el-input> -->
          {{form.nickname}}
        </el-form-item>

        <el-form-item label="用户名" >
         <!-- <el-input type="text" :rows="2" placeholder="请输入真实姓名" v-model="form.truename"></el-input> -->
         {{form.username}}
        </el-form-item>

       <!-- <el-form-item label="状态">
          <el-radio-group v-model="form.disable">
            <el-radio label="false">启用</el-radio>
            <el-radio label="true">禁用</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="角色" prop="menuRoleId">
          <el-select v-model="form.menuRoleId" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if='dialogStatus==="create"' type="primary" @click="handleCreateData" :loading="btnLoading">确定</el-button>
        <el-button v-else type="primary" @click="handleUpdateData" :loading="btnLoading">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import roleData from '@/api/role'
  import {getUserList,addUserRole} from '@/api/sys'
  const disableType = [
    { key: 'false', display_name: '启用' },
    { key: 'true', display_name: '禁用' }
  ]
  const disableTypeKeyValue = disableType.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})
  export default {
    name: 'manager',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        btnLoading: false,
        listLoading: true,
        showclosese: false,
        dialogTitle: '创建用户',
        baseImgUrl: process.env.BASE_IMG_API,
        list: null,
        total: null,
        disableType,
        roles: null,
        form: {
          username: '',
          truename: '',
          disable: 'false',
          menuRoleId: ''
        },
        listQuery: {
          currentPage: 1,
          pageSize: 20,
          username: null,
          truename: null,
          xszPass: null
        },
        dialogFormVisible: false,
        dialogStatus: 'create',
        downloadLoading: false,
        valids: {

        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      disableText(type) {
        return disableTypeKeyValue[type]
      }
    },
    created() {
      this.getList()
      this.getRoles()
    },
    methods: {
      getList() {
        this.listLoading = true

        getUserList(this.listQuery).then(response => {
          this.list = response.data
          this.listLoading = false
        })
      },
      getRoles() {
        roleData.getRoleList().then(response => {
          const data = response.data
          this.roles = []
          data.map((item) => {
            this.roles.push({ id: item.id, name: item.name })
          })
        })
      },
      handleFilter() {
        this.listQuery.currentPage = 1
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
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      createDialog() {
        this.resetForm()
        this.dialogTitle = '创建用户'
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateDialog(data) {
        this.form = {
          id: data.id,
          username: data.username,
          truename: data.truename,
          disable: String(data.disable),
          menuRoleId: data.menuRole && data.menuRole.id
        }
        this.dialogTitle = '更新用户'
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      handleCreateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            console.log(this.form)
            peruserData.createPeruser(this.form).then((res) => {
              this.dialogFormVisible = false
              this.btnLoading = false
              this.$notify({
                title: '成功',
                message: '增加成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      handleUpdateData() {


            this.btnLoading = true
            console.log(this.form)
            var pars = {};
            pars.userId = this.form.id;
            pars.roleId = this.form.menuRoleId;
            addUserRole(pars).then((res) => {
              this.dialogFormVisible = false
              this.btnLoading = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })


      },
      resetForm() {
        this.form = {
          username: '',
          truename: '',
          disable: 'false',
          menuRoleId: ''
        }
      },
      handleLeaveoffice(data) {
        this.$confirm('此操作将永久禁用 "' + data.username + '" 账号且无法恢复，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          peruserData.leavePeruser({ id: data.id }).then(() => {
            this.$message({
              type: 'success',
              message: '离职成功!'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
