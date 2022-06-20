<template>
    <div class="productInfo" style="margin-top: 50px">
        <el-form :model="ruleForm" rules="rules" ref="ruleForm" label-width="120px" style="width: 600px" size="small">
            <el-form-item label="商品名称：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类：" prop="category">
                <!-- <el-cascader v-model="ruleForm.category" :options="productCateOptions"></el-cascader> -->
                <el-select v-model="ruleForm.category" placeholder="请选择商品分类">
                </el-select>
            </el-form-item> 
            <el-form-item label="商品介绍：">
                <el-input
                    :autosize="true"
                    v-model="ruleForm.description"
                    type="textarea"
                    placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="商品货号：">
                <el-input v-model="ruleForm.productId"></el-input>
            </el-form-item>
            <el-form-item label="商品售价：">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品库存：">
                <el-input v-model="ruleForm.stock"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-upload
                    action="http://127.0.0.1:4523/m1/1074270-0-default/upload/commodityPic"
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
                <el-button type="primary" size="medium" @click="submitProduct('ruleForm')">提交</el-button>
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
            ruleForm: {
                name: '',
                category: '',
                description: '',
                productId: '',
                price: '',
                stock: '',

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
                productId: [
                    {
                        required: true,
                        message: '请输入商品货号',
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
        // handleNext(formName){
        //     this.$refs[formName].validate((valid) => {
        //         if(valid){
        //             this.$emit('nextStep');
        //         }else {
        //             this.$message({
        //                 message: '验证失败',
        //                 type: 'error',
        //                 duration: 1000
        //             });
        //             return false;
        //         }
        //     });
        // },
        submitProduct(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    alert('submit!');
                }else{
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>