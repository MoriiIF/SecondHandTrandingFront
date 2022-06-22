<template>
    <div class="userInfo">
        <el-divider content-position="left">
            <span style="font-weight: bold;">
            基本信息</span>
        </el-divider>
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button class="modifyBtn" type="primary" size="small" ref="modifybtn" @click="modifyorSave($event)">修改基本信息</el-button>
        <el-form ref="form" :model="form" label-width="80px" style="margin-top: 80px">
            <el-form-item label="昵称">
                <el-col span="6">
                    <el-input v-model="form.name" :disabled="inputUsable()"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="性别" >
                <el-col span="3">
                    <el-radio-group v-model="form.sex" :disabled="inputUsable()">
                        <el-radio :label="'male'" >男</el-radio>
                        <el-radio :label="'female'" >女</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-col span="6">
                    <el-input v-model="form.mail" placeholder="请输入邮箱" :disabled="inputUsable()" onkeyup="this.value=this.value.replace(/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="个人简介">
                <el-col span="11">
                    <el-input type="textarea" v-model="form.profile" placeholder="这个人很懒，什么都没有留下~" :disabled="inputUsable()"></el-input>
                </el-col>
            </el-form-item>
        </el-form>
        <el-divider content-position="left">
            <span style="font-weight: bold;">
            安全信息</span>
        </el-divider>
        <el-form ref="form" :model="form" label-width="80px" style="margin-top: 80px">
            <el-form-item label="登录密码">
                <el-col :span="3">
                    <!-- <el-link type="primary" :underline="false">修改密码</el-link> -->
                    <el-button type="text" @click="updatePwdDialog = true">修改密码</el-button>
                </el-col>
                
            </el-form-item>
        </el-form>
        <el-dialog title="修改密码" :visible.sync="updatePwdDialog">
            <el-form :model="form" :rules="rules" ref="pass">
                <el-form-item label="原密码" prop="oldpwd" :label-width="formLabelWidth">
                    <el-input v-model="form.oldpwd" auto-complete="off" placeholder="请输入原密码" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpwd" :label-width="formLabelWidth">
                    <el-input v-model="form.newpwd" auto-complete="off" placeholder="请输入新密码" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="cnewpwd" :label-width="formLabelWidth">
                    <el-input v-model="form.cnewpwd" auto-complete="off" placeholder="请输入新密码" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updatePwdDialog = false">取消</el-button>
                <el-button type="primary" @click="changePassword">保存</el-button>
            </div>
        </el-dialog>
        <el-divider content-position="left">
            <span style="font-weight: bold;">
            收货地址</span>
        </el-divider>
        <el-card class="box-card" shadow="always">
            <template #header>
                <div class="card-header" style="text-align: left">
                    <span>管理地址</span>
                    <el-button class="addressBtn" type="text" @click="addAddress">新增</el-button>
                </div>
                <el-table
                    :data="addressData"
                    style="width: 100%">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="adname" label="收货人" width="100">
                        <template #default="scope">
                            <el-input size="medium" v-model="scope.row.adname" v-if="addressEdit[scope.$index]"></el-input>
                            <span v-else>{{scope.row.adname}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="adphone" label="联系方式" width="140">
                        <template #default="scope">
                            <el-input size="medium" v-model="scope.row.adphone" v-if="addressEdit[scope.$index]"></el-input>
                            <span v-else>{{scope.row.adphone}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="adpca" label="收货地址" width="240" align="center">
                        <template #default="scope">
                            <el-cascader
                                v-model="scope.row.adpca"
                                :options="pcaOptions"
                                :props="addressProps"
                                placeholder="请选择"
                                @change="handleAddressNode"
                                filterable
                                :disabled="!addressEdit[scope.$index]"
                            ></el-cascader>
                        </template>
                    </el-table-column>
                    <el-table-column prop="addetail" label="详细地址" width="180">
                        <template #default="scope">
                            <el-input size="medium" v-model="scope.row.addetail" v-if="addressEdit[scope.$index]"></el-input>
                            <span v-else>{{scope.row.addetail}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="adisdefault" label="默认地址" width="100">\
                        <template #default="scope">
                            <div v-if="addressEdit[scope.$index]">
                                <el-checkbox v-model="scope.row.adisdefault" :true-label="1" :false-label="0" @change="changtest">
                                    设为默认</el-checkbox>
                            </div>
                            <div v-else>
                                <el-tag v-if="scope.row.adisdefault==1" type="success" size="mini">默认</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="180">
                        <template #default="scope">
                            <el-button size="small" icon="el-icon-edit" v-if="!addressEdit[scope.$index]" @click="editAddress(scope.$index)">
                                编辑</el-button>
                            <el-button size="small" icon="el-icon-check" v-else @click="saveAddress(scope.$index, scope.row)">
                                保存</el-button>
                            <el-popconfirm
                                title="确定删除该地址？"
                                @click.native.prevent="deleteAddress(scope.$index, addressData)">
                                <template #reference>
                                    <el-button size="small" icon="el-icon-delete">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
    </div>
</template>

<script>
import { result } from 'lodash'

const pca = require('@/assets/address/pca-code.json')
export default{
    name: 'userInfo',
    data(){
        return {
            imageUrl: '',
            btnText: '保存修改',
            form: {
                name: '',
                sex: '',
                profile: '',
                mail: '',
                oldpwd: '',
                newpwd: '',
                cnewpwd: '',

            },
            rules:{
                oldpwd: [{
                    required: true,
                    message: '请输入原密码',
                    trigger: 'blur'
                }],
                newpwd: [{
                    required: true,
                    message: '请输入新密码',
                    trigger: 'blur'
                }],
                cnewpwd: [{
                    required: true,
                    message: '请输入新密码',
                    trigger: 'blur'
                }, {
                    validator: (rule, value, callback) => {
                        if(value === ''){
                            callback(new Error('请再输入一次密码'))
                        } else if(value !== this.form.newpwd){
                            callback(new Error('两次输入的密码不一致'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }],
            },
            updatePwdDialog: false,
            formLabelWidth: '120px',
            addressData: [],
            addressEdit: [],
            addressInput: {
                adname: '',
                adphone: '',
                adpca: '',
                addetail: '',
                adisdefault: 0,
            },
            pcaOptions: pca,
            addressProps: {
                label: 'name',
                children: 'children',
                value: 'code'
            }
        }
    },

    created(){
        this.loadAddressData()
    },
    mounted() {
        this.getUserInfo()
    },

    methods: {
        getUserInfo() {
            var url = "http://49.232.81.174:8080/users/getUserInfo"
            this.axios.get(url, {
                params: {
                id: localStorage.getItem('userId')
            }
            }).then(result => {
                console.log(result)
                if (result.data['message'] == '操作成功') {
                    this.form.name = result.data['data']['name']
                    this.form.sex = result.data['data']['sex']
                    this.form.mail = result.data['data']['email']
                    console.log(this.form)
                }
            })
        },
        modifyorSave(){
            var savetext = this.btnText;
            this.btnText = this.$refs.modifybtn.$el.innerText;
            this.$refs.modifybtn.$el.innerText = savetext;
        },
        inputUsable(){
            if(this.btnText === '修改基本信息'){
                //this.flag = true;
                console.log(this.form)
                return false;
                
            } else if(this.btnText === '保存修改'){
                //this.flag = false;
                return true;
            }
        },
        // savePwd(){
        //     if(this.form.newpwd === this.form.cnewpwd){
        //         this.$message.success("修改成功")
        //         return true
        //     } else {
        //         this.$message.warning("两次输入的密码不一致，请重新输入")
        //         return false
        //     }
        // },
        handleAvatarSuccess(res, file){
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file){
            const isJPG = file.type === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if(!isJPG){
                this.$message.error('上传头像图片只能是JPG格式！');
            }
            if(!isLt2M){
                this.$message.error('上传头像图片大小不能超过2MB！');
            }
            return isJPG && isLt2M;
        },
        loadAddressData(){
            request;
            for(let i in this.addressData){
                this.addressEdit[i] = false
            }
        },
        addAddress(){
            this.addressData.push({})
            this.addressEdit[this.addressData.length-1] = true
        },
        handleAddressNode(value){ //value为数组
            this.addressData.adpca = value[2]
        },
        changetest(val){
            console.log(typeof(val))
            console.log(val)
        },
        editAddress(index){
            this.addressEdit[index] = !this.addressEdit[index]
        },
        saveAddress(index, value){
            this.addressEdit[index] = !this.addressEdit[index]
        },
        deleteAddress(index, rows){
            rows.splice(index,1)
        },
        changePassword() {
            
        }
    }
}
</script>

<style lang="scss" scoped>

.el-divider{
    background-color: black;
    //height: 2px;
    margin: 8px 0;
    border-top: .5px solid #E6EBF5;
}
.el-divider__text {
    position: absolute;
    background-color: #F8F8FF;
    padding: 0 20px;
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}
.el-divider__text.is-left {
    left: 20px;
    transform: translateY(-50%);
}
.modifyBtn{
    position: absolute;
    left: 250px;
    top: 125px;
}
.avatar-uploader .el-upload{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover{
    border-color: #409eff;
}
.avatar-uploader-icon{
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    line-height: 80px;
    text-align: center;
}
.avatar{
    width: 80px;
    height: 80px;
    display: block;
}
.card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>