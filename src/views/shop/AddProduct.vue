<template>
    <div class="addProduct">
        <el-card class="form-container" shadow="never">
            <!-- <el-steps :active="active" finish-status="success" align-center>
                <el-step title="填写商品信息"></el-step>
                <el-step title="填写商品属性"></el-step>
            </el-steps> -->
            <span>填写商品信息</span>
            <product-info></product-info>
        </el-card>
    </div>
</template>

<script>
import ProductInfo from './ProductInfo.vue'
export default{
    name: 'addProduct',
    components: {ProductInfo},
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            active: 0,
            showStatus: [true, false]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>