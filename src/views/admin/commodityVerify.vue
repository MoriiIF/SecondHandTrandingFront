<template>
    <div class="productInfo">
        <el-divider content-position="left">
            <span style="font-weight: bold;">
            商品上架审核</span>
        </el-divider>
        <el-table :data="commodityVerifyData" border style="width: 100%">
          <el-table-column fixed prop="shop" label="卖家" width="120"></el-table-column>
          <el-table-column fixed prop="category" label="商品分类" width="120"></el-table-column>
          <el-table-column fixed prop="picture" label="商品图片" width="100">
            <template slot-scope="scope"><img style="height: 80px" :src="scope.row.picture"></template>
          </el-table-column>
          <el-table-column fixed prop="name" label="商品名称" width="170"></el-table-column>
          <el-table-column fixed prop="description" label="商品描述" width="240"></el-table-column>
          <el-table-column fixed prop="price" label="价格" width="120"></el-table-column>
          <el-table-column fixed prop="stock" label="库存" width="120"></el-table-column>
          <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="commodityVerify(scope.row, true)" type="text" size="small">通过</el-button>
        <el-button @click="commodityVerify(scope.row, false)" type="text" size="small">拒绝</el-button>
      </template>
    </el-table-column>
        </el-table>        

    </div>
</template>

<script>
import axios from 'axios'

  export default {
    inject: ['reload'],
    methods: {
      commodityVerify(row, result) {
          var url="http://49.232.81.174:8080/admin/commodityVerify"
        axios.get(url, {
            params: {
                id: row['commodityId'],
                result: result
            }
        }).then(function(response) {
            console.log(response)
            if (response.data['message'] == '操作成功') {
                location.reload()
            }
        }).catch(function(error) {
            console.log(error)
        })
      }
    },

    data() {
      return {
        commodityVerifyData: []
      }
    },
    mounted: function() {
        var url = "http://49.232.81.174:8080/admin/listCommodity"
        this.$http.get(url).then(result => {
            if (result.data['message'] == '操作成功') {
                this.commodityVerifyData = result.data['data']
            }
        })
    }
  }
</script>