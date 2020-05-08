<template>
  <div class="app-container" v-loading="listLoading">
    <el-button class="filter-item" style="margin-bottom: 30px;" @click="createDialog" >+</el-button>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="8" v-for="(item,index) in list" :key="index">
        <div class="role-wrapper" style="background-color: #13CE66;width:200px;" @mouseover="show(index)" @mouseout="hide(index)">
          <p class="role-name">{{item.name}}</p>
          <div v-show="item.show" class="role-act-btn">
            <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="9"><div class="grid-content bg-purple" @click="deleteDialog(item)">删除</div></el-col>
              <el-col :span="9"><div class="grid-content bg-purple-light" @click="updateDialog(item)">编辑</div></el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="600px">
      <el-form :rules="valids" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="权限"  prop="permissionIds">
          <el-input type="hidden" v-model="permissionIdStr"></el-input>
          <el-tree
            :data="menuList"
            node-key="id"
            show-checkbox
            v-loading="treeLoading"
            :default-expand-all="true"
            @check="checkChange"
            ref="tree"
            :default-checked-keys="checkedKey"
            :expand-on-click-node="false">
            <span class='custom-tree-node' slot-scope="{ node, data}">
              <span>{{ data.title }}</span>
            </span>
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" :loading="btnLoading" @click="handleCreate">确认</el-button>
        <el-button v-else type="primary" :loading="btnLoading" @click="handleUpdate">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import roleData from '@/api/role'
  import { getMenusList } from '@/api/menu'
  export default {
    name: 'sysrole',
    directives: {
      waves
    },
    data() {
      return {
        listLoading: false,
        btnLoading: false,
        treeLoading: false,
        dialogTitle: '角色编辑',
        dialogStatus: 'create',
        dialogFormVisible: false,
        temp: {
          name: '',
          id: '',
          permissionIds: []
        },
        list: null,
        menuList: null,
        valids: {
          name: [{ required: true, message: '名称是必须的' }],
          permissionIds: [{ required: true, message: '请至少选择一个权限', trigger: 'change' }]
        },
        checkedKey: [],
        btnShow: false,
        permissionIdStr: ''
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
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(callback) {
        this.listLoading = true
        roleData.getRoleList().then(response => {
          const data = response.data
          data.map((item) => {
            item.show = false
          })
          this.list = this.roleFilter(data)
          this.listLoading = false
        })
      },
      roleFilter(data) {
        if (!data) return
        const res = []
        data.map((item) => {
          res.push(item)
        })
        return res
      },
      getMenuList(callback) {
        getMenusList().then(response => {
          const data = response.data
          data.map((item)=>{
            item.children = item.childList
          })
          this.menuList = data
          callback && callback(data)
        })
      },
      createDialog() {
        this.temp = {
          name: '',
          permissionIds: []
        }
        this.treeLoading = true
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.defaultCheckKey(this.temp.permissionIds)
        this.getMenuList((data) => {
          this.treeLoading = false
        })
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateDialog(data) {
        this.checkedKey = []
        this.dialogFormVisible = true
        this.defaultCheckKey(data.permissionList)
        this.temp = {
          id: data.id,
          name: data.name,
          permissionIds: this.checkedKey
        }
        this.permissionIdStr = this.checkedKey.join(',')
        this.dialogStatus = 'update'
        this.treeLoading = true
        this.getMenuList((data) => {
          this.treeLoading = false
        })
      },
      handleUpdate() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            roleData.updateRole(this.temp).then((res) => {
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
          }
        })
      },
      handleCreate() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            roleData.createRole(this.temp).then((res) => {
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
      deleteDialog(data) {
        this.$confirm('此操作将删除 "' + data.name + '" 角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          roleData.deleteRole({ id: data.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      defaultCheckKey(data) {
        if (!data) return
        const res = []
        data.map((item) => {
          res.push(item.id)
          if (item.children) {
            item.children.map((child) => {
              res.push(child.id)
            })
          }
        })
        this.checkedKey = res
      },
      checkChange(data, tree) {
        this.temp.permissionIds = tree.checkedKeys
        const _this = this
        if (tree.halfCheckedKeys.length > 0) {
          tree.halfCheckedKeys.forEach(function(item) {
            _this.temp.permissionIds.push(item)
          })
        }
        console.log(this.temp.permissionIds)

        this.permissionIdStr = tree.checkedKeys.join(',')
      },
      show(i) {
        this.list[i].show = true
      },
      hide(i) {
        this.list[i].show = false
      }
    }
  }
</script>
<style scope>
  .el-tree{
    max-height:500px;
    overflow:auto;
  }
  .role-wrapper {
    border: 1px solid #409eff;
    margin-bottom: 15px;
    padding: 20px 20px 40px 20px;
    border-radius: 5px;
    background: #20b6f9;
    color: #fff;
    position: relative;
  }
  .role-name{
    text-align: center;
    font-weight: 600;
  }
  .role-act-btn {
    position: absolute;
    width: 100%;
    left: 0;
  }
  .grid-content{
    text-align: center;
    cursor:pointer;
    padding: 10px 0;
  }
</style>
