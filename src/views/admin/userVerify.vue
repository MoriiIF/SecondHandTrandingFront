<template>
    <div class="userInfo">
        <el-divider content-position="left">
            <span style="font-weight: bold;">
            新用户审核</span>
        </el-divider>
        <el-table :data="userVerifyData" border style="width: 100%">
          <el-table-column fixed prop="id" label="ID" width="120"></el-table-column>
          <el-table-column fixed prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column fixed prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column fixed prop="email" label="电子邮箱" width="120"></el-table-column>
          <el-table-column fixed prop="city" label="城市" width="120"></el-table-column>
          <el-table-column fixed prop="sex" label="性别" width="120"></el-table-column>
          <el-table-column fixed prop="bank" label="银行卡号" width="120"></el-table-column>
          <el-table-column fixed prop="password" label="密码" width="120"></el-table-column>
          <el-table-column fixed prop="type" label="用户类型" width="120"></el-table-column>
          <el-table-column fixed prop="admin" label="是否管理员" width="120"></el-table-column>
          <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="userVerify(scope.row, true)" type="text" size="small">通过</el-button>
        <el-button @click="userVerify(scope.row, false)" type="text" size="small">拒绝</el-button>
      </template>
    </el-table-column>
        </el-table>        

    </div>
</template>

<script>
import axios from 'axios'

  export default {
    methods: {
      userVerify(row, result) {
          var url="http://49.232.81.174:8080/admin/userVerify"
        axios.get(url, {
            params: {
                id: row['id'],
                result: result
            }
        }).then(function(response) {
            console.log(response)
            if (response.data['message'] == '操作成功') {
                this.reload()
            }
        }).catch(function(error) {
            console.log(error)
        })
      }
    },

    data() {
      return {
        userVerifyData: []
      }
    },
    mounted: function() {
        var url = "http://49.232.81.174:8080/admin/list"
        this.$http.get(url).then(result => {
            if (result.data['message'] == '操作成功') {
                this.userVerifyData = result.data['data']
            }
        })
    }
  }
</script>