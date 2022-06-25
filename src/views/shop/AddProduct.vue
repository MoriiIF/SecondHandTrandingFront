<template>
    <div class="addProduct">
        <el-card class="form-container" shadow="never">
            <span>填写商品信息</span>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" style="width: 600px" size="small">
                <el-form-item label="商品名称：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商品分类：" prop="category">
                    <!-- <el-cascader v-model="ruleForm.category" :options="productCateOptions"></el-cascader> -->
                    <el-select v-model="ruleForm.category" placeholder="请选择商品分类">
                    <el-option label="数码" value="数码"></el-option>
                    <el-option label="生活" value="生活"></el-option>
                    <el-option label="家用电器" value="家用电器"></el-option>
                    <el-option label="男/女装" value="男/女装"></el-option>
                    <el-option label="食品" value="食品"></el-option>
                    <el-option label="医药保健" value="医药保健"></el-option>
                    <el-option label="图书" value="图书"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="商品介绍：" prop="description">
                    <el-input
                        :autosize="true"
                        v-model="ruleForm.description"
                        type="textarea"
                        placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="商品售价：" prop="price">
                    <el-input v-model="ruleForm.price"></el-input>
                </el-form-item>
                <el-form-item label="商品库存：" prop="stock">
                    <el-input v-model="ruleForm.stock"></el-input>
                </el-form-item>
                <el-form-item label="商品图片：">
                    <el-upload
                        action="http://49.232.81.174:8080/upload/commodityPic"
                        list-type="picture-card"
                        :data="uploadData"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="productImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" size="medium" @click="submitProduct(ruleForm)">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { timeouts } from 'retry';

export default{
    name: 'addProduct',
    data(){
        return {
            productImageUrl: '',
            dialogVisible: false,
            selectProductCateValue: [],
            productCateOptions: [],
            uploadData: {},
            picUrl: "",
            ruleForm: {
                sku: '',
                name: '',
                category: '',
                description: '',
                price: '',
                stock: '',
                picture: '',
                shop: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入商品名称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 140,
                        message: '长度在2到140个字符',
                        trigger: 'blur'
                    }
                ],
                category: [
                    {
                        required: true,
                        message: '请选择商品分类',
                        trigger: 'blur'
                    }
                ],
                description: [
                    {
                        required: true,
                        message: '请输入商品介绍',
                        trigger: 'blur'
                    }
                ],
                price: [
                    {
                        required: true,
                        message: '请输入商品价格',
                        trigger: 'blur'
                    }
                ],
                stock: [
                    {
                        required: true,
                        message: '请输入商品库存',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        handleRemove(file, fileList){
            console.log(file, fileList);
        },
        handlePictureCardPreview(file){
            this.productImageUrl = file.url;
            this.dialogVisible = true;
        },
        uploadSuccess(response) {
           this.ruleForm.picture = response.data['url']
        },
        getCommoditySku() {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            this.axios.get("http://49.232.81.174:8080/commodity/getCommoditySku").then(result => {
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                if (result.data['message'] == '操作成功') {
                    this.uploadData = {
                        sku: result.data['data']
                    }
                }
            })
        },
        submitProduct(ruleForm){
            ruleForm.shop = localStorage.getItem('userId')
            this.axios.post("http://49.232.81.174:8080/commodity/add", ruleForm).then(function(response) {
                setTimeout(location.reload(), 5000)
            }).catch(function(error) {
                console.log(error)
            })
        }
    },
    mounted: function() {
        this.getCommoditySku()
    }
}
</script>

<style lang="scss" scoped>

</style>