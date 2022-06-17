<template>
    <div class="productInfo" style="margin-top: 50px">
        <el-form :model="value" rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
            <el-form-item label="商品分类：" prop="productCategoryId">
                <el-cascader v-model="selectProductCateValue" :options="productCateOptions"></el-cascader>
            </el-form-item> 
            <el-form-item label="商品名称：" prop="name">
                <el-input v-model="value.name"></el-input>
            </el-form-item>
            <el-form-item label="商品介绍：">
                <el-input
                    :autosize="true"
                    v-model="value.description"
                    type="textarea"
                    placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="商品货号：">
                <el-input v-model="value.productSn"></el-input>
            </el-form-item>
            <el-form-item label="商品售价：">
                <el-input v-model="value.price"></el-input>
            </el-form-item>
            <el-form-item label="商品库存：">
                <el-input v-model="value.stock"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-upload
                    action=""
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="productImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button type="primary" size="medium" @click="handleNext('productInfo')">下一步，填写商品属性</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'productInfo',
    props: {
        value: Object,
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            productImageUrl: '',
            dialogVisible: false,
            selectProductCateValue: [],
            productCateOptions: [],
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
                productCategoryId: [
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
                ]
            }
        };
    },
    methods: {
        handleRemove(file, fileList){
            console.log(file, fileList);
        },
        handlePictureCardPreview(file){
            this.productImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleNext(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.$emit('nextStep');
                }else {
                    this.$message({
                        message: '验证失败',
                        type: 'error',
                        duration: 1000
                    });
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>