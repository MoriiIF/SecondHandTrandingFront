<template>
    <div class="register">
        <article class="header">
            <header>
                <el-avatar icon="el-icon-user-solid" shape="circle" style="left"></el-avatar>
                <span class="login">
                    <em class="bold">已有账号？</em>
                    <a href="/login">
                        <el-button type="primary" size="small">登录</el-button>
                    </a>
                </span>
            </header>
        </article>
        <el-steps :active="active" finish-status="success" align-center="">
            <el-step title="验证手机号"></el-step>
            <el-step title="填写账号信息"></el-step>
            <el-step title="注册成功"></el-step>
        </el-steps>

        <section>
            <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
                autocomplete="off"
            >

            <div v-if="active == 0">
                <div>
                    <el-input placeholder="请输入手机号" v-model="ruleForm.phone" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="11" show-word-limit clearable>
                        <template slot="prepend">中国+86</template>
                    </el-input>
                </div>

                <div slot="content" class="reg-body">
                    <div class="main-content">
                        <el-form ref="form" :model="form" :rules="rules" label-width="125px" label-position="left">
                            <el-form-item label="验证码" class="my-item" prop="code">
                                <el-input
                                    v-model.trim="form.code"
                                    placeholder="请输入图中验证码"
                                    size="small"
                                    style="width: 200px"
                                />
                                <span class="register-code" style="position: absolute; right: 0; top: 4px; left: 257px">
                                    <!--<Verify :verifyCode="verifyCode"></Verify>-->
                                    <SIdentify :identifyCode="identifyCode"></SIdentify>
                                </span>
                                <span
                                    class="el-icon-refresh-right"
                                    style="position: absolute; left: 394px; top: 13px; cursor: pointer"
                                    @click="refreshCode"
                                />
                            </el-form-item>
                        </el-form>
                        <div style="text-align: center">
                            <el-button
                                v-if="form.agreement"
                                style="background:#6BC6A1; color: white; border-radius:2px; width: 200px; height: 30px; line-height: 5px; border: none;margin-bottom: 10px"
                                @click="submitForm()"
                                :loading="loading"
                            >提交</el-button>
                        </div>
                    </div>
                </div>
            </div>


            <div v-if="active == 1">
                <el-form-item label="注册类型" prop="register_type">
                    <el-radio @click="checkRadio($event)" v-model="ruleForm.type_radio" label="1">个人用户</el-radio>
                    <el-radio @click="checkRadio($event)" v-model="ruleForm.type_radio" label="2">商家</el-radio>
                </el-form-item>
              <el-form-item label="用户ID" prop="id">
                <el-input v-model="ruleForm.id" />
              </el-form-item>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" onkeyup="this.value=this.value.replace(/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;" clearable />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio @click="checkRadio($event)" v-model="ruleForm.sex_radio" label="male">男</el-radio>
                    <el-radio @click="checkRadio($event)" v-model="ruleForm.sex_radio" label="female">女</el-radio>
                </el-form-item>
                <el-form-item label="所属省市" prop="place">
                    <td>
                    <el-select v-model="province" placeholder="请选择省份（直辖市）" @change="renderCity" clearable>
                        <el-option
                            v-for="item in provinceListAll"
                            :key="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                    </td>
                    <td>
                    <el-select v-model="city" placeholder="请选择城市" v-if="citySelectAble" clearable>
                        <el-option
                            v-for="item in cityListAll"
                            :key="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                    </td>
                </el-form-item>
                <el-form-item label="银行账号" prop="bank">
                    <el-input v-model="ruleForm.bank" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="16" show-word-limit clearable />
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" type="password" />
                </el-form-item>
                <el-form-item label="确认密码" prop="cpwd">
                    <el-input v-model="ruleForm.cpwd" type="password" />
                </el-form-item>
            </div>
            <div v-if="active == 2">
                <h2>即将跳转登录界面</h2>
                {{toLogin()}}
            </div>
            </el-form>
        </section>

        <!--<el-button style="margin-top: 12px;" @click="next">下一步</el-button>-->
        <div class="footer">
            <el-button
                v-if="active>0 && active<2"
                type="primary"
                icon="el-icon-arrow-left"
                @click="prev"
            >上一步</el-button>
            <el-button
                v-if="active<step-2"
                type="primary"
                icon="el-icon-arrow-right"
                @click="nextFlag"

            >下一步</el-button>
            <el-button
                v-if="active == step-2"
                type="primary"
                @click="nextFlag"
            >注册</el-button>
        </div>
        <!--disabled="nextFlag(ruleForm)"-->
        <!--<div style="display:none">{{existVal}}</div>-->
    </div>

</template>

<script>
import axios from 'axios';
import SIdentify from '../components/identify.vue';
export default{
    name: 'regiSter',
    //mixins: [region],
    components: {SIdentify},
    data(){
        return{
            step: 3,
            active: 0,
            //nextFlag: 'true',
            //请输入手机号
            //phone: '',
            province: '',
            city: '',
            mapApiKey: '59e6f88d346d37f0f7200b7b562d4f2d',
            formSetting: {
                contentWidth: 340,
            },
            form: {
                logoUrl: "",
                licenseUrl: "",
                description: [],
                account: "",
                name: ""
            },
            code: this.$route.query.code,
            identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            identifyCode: "1234",
            picList: [],
            props: {label: "name", value: "id", children: "children"},
            /*rules:{
                code: [{required: true, message: "请输入验证码", trigger: "change"}]
            },*/
            formList: [],
            ruleForm:{
                id:'',
                name: '',
                pwd: '',
                cpwd: '',
                email: '',
                phone: '',
                place: '',
                bank: '',
                sex_radio: 'null',
                type_radio: '1',
            },
            rules: {
                phone: [{
                    required: true,
                    message:"请输入手机号",
                    trigger: "blur"
                }],
                code: [{
                    required: true,
                    message: "请输入验证码",
                    trigger: "change"
                }],
                register_type: [{
                    //required: true,
                    message: '请选择注册类型',
                    trigger: 'blur'
                }],
                id: [{
                    required: true,
                    type: 'string',
                    message: '请输入ID',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    type: 'string',
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    type: 'email',
                    message: '请输入正确的邮箱',
                    trigger: 'blur'
                }],
                sex: [{
                    //required: true,
                    message: '请选择性别',
                    trigger: 'blur'
                }],
                bank: [{
                    required: true,
                    message: '请填写银行账号',
                    trigger: 'blur'
                }],
                place:[{
                    //required: true,
                    message: '请选择所属省份（或直辖市）',
                    trigger: 'blur'
                }],
                pwd: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur',
                }],
                cpwd: [{
                    required: true,
                    message: '请再输入一次密码',
                    trigger: 'blur'
                }, {
                    validator: (rule, value, callback) => {
                        if(value === ''){
                            callback(new Error('请再输入一次密码'))
                        } else if(value !== this.ruleForm.pwd){
                            callback(new Error('两次输入的密码不一致'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'

                }]

            },
            provinceListAll: [],
            cityListAll: [],
            citySelectAble: false
        }
    },

    created(){
        //this.getAllDict()
        this.refreshCode();
        //页面加载时调用的函数
        this.getAllProvinceAndCityList();
    },

    mounted(){
        this.getRegion();
        //初始化验证码
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        localStorage.setItem("code", this.code);
    },

    watch: {
        // watch 监听 merchant.province，当城市选择后，再次换省份时，能清空已选择的城市
        province(){
            this.city = '';
        }
    },

    layout: 'blank',

    methods:{
        openHtml(){
            this.visible = true;
        },
        //刷新验证码
        refreshCode(){
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        //生成验证随机数，验证码中的数从identifyCodes中取
        makeCode(o, l){
            for(let i = 0; i < l; i++){
                this.identifyCode += o[this.randomNum(0, o.length - 1)];
            }
        },
        //生成随机数,这里是生成
        //Math.random()方法返回大于等于0小于1的一个随机数
        //随机数 = Math.floor(Math.random() * 可能的总数 + 第一个可能的值)
        randomNum(min, max){
            return Math.floor(Math.random() * (max - min) + min);
        },
        //提交表单
        submitForm(){
            this.$refs["form"].validate((valid) => {
                if(valid){
                    if(this.loading){
                        return;
                    }
                    this.loading = true;
                    this.submit();
                }else {
                    return false;
                }
            });
        },
        submit: async function(){
            if(this.form.code.toLowerCase() != this.identifyCode.toLowerCase()){
                this.$msg({type: "error", message: "请填写正确的验证码"});
                this.refreshCode();
                this.loading = false;
                return;
            }else{
                //验证码校验成功就可以调接口提交表单了
                this.submitForm();
            }
        },

        //模拟登录
        registerr: function(){
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    setTimeout(this.$router.push('/login'), 2000)
                }
            })
        },

        toLogin: function(){
            setTimeout(this.$router.push('/login'), 3000)
            var _this = this;
            var url = 'http://49.232.81.174:8080/users/register';
            var postData = {
            "id": this.ruleForm.id,
            "name": this.ruleForm.name,
            "phone": this.ruleForm.phone,
            "sex": this.ruleForm.sex_radio,
            "bank": this.ruleForm.bank,
            "password":this.ruleForm.pwd,
            "type": this.ruleForm.type_radio,
            "admin": false
            };
            _this.$http.post(url, _this.$qs.stringify(postData))
                       .then(function(res){
                        if(res.data.code == 200){

                        }
                       })

        },

    //   toLogin: function(){
    //     setTimeout(this.$router.push('/login'), 3000)
    //     var url = 'http://49.232.81.174:8080/users/register';
    //     var postData = {
    //       "id": this.ruleForm.id,
    //       "name": this.ruleForm.name,
    //       "phone": this.ruleForm.phone,
    //       "sex": this.ruleForm.sex_radio,
    //       "bank": this.ruleForm.bank,
    //       "password":this.ruleForm.pwd,
    //       "type": this.ruleForm.type_radio,
    //       "admin": false
    //     }

    //     this.$http.post(url, JSON.stringify(postData), {emulateJSON: true}).then(result => {
    //       console.log(result.data)
    //     })
    //   },

        // toLogin: function(){
        //     setTimeout(this.$router.push('/login'), 3000)
        //     const _this = this
        //     console.log(this.ruleForm);
        //     var url = 'http://49.232.81.174:8080/users/register';
        //   this.$http.post(url, {
        //     "id": "12131414",
        //     "name": this.ruleForm.name,
        //     "phone": this.ruleForm.phone,
        //     "sex": this.ruleForm.sex_radio,
        //     "bank": this.ruleForm.bank,
        //     "password": this.ruleForm.password,
        //     "type": 1,
        //     "admin": false
        //   }, { emulateJSON: true }).then(res => {
        //     console.log(res.body);
        //   });
        // },

        checkRadio($event){
            let _this = this
            let objVal = _this.ruleForm[$event.target.name];
            window.setTimeout(() => {
                if(!!objVal && objVal == $event.target.value){
                    $event.target.checked = false
                    _this.ruleForm[$event.target.name] = ''
                }
            }, 0)
        },

        //获取全国所有省份和城市的列表
        getAllProvinceAndCityList(){
            var that = this;
            this.$http.get('https://restapi.amap.com/v3/config/district',{
                params:{
                    key: this.mapApiKey,
                    keywords: '中国',
                    subdistrict: 3,
                    extensions: 'base'
                }
            }).then((response) => {
                that.provinceListAll = response.data.districts[0].districts;
                for(let i = 0; i < response.data.districts[0].districts.length; i++){
                    for(let j = 0; j <response.data.districts[0].districts[i].districts.length; j++){
                        that.cityListAll.push(response.data.districts[0].districts[i].districts[j]);
                    }
                }
                console.log('省份', that.provinceListAll);
                console.log('城市',that.cityListAll);
            })
        },

        //根据选择的省份，展示该省份相对应的城市列表，未选择省份时，不能选择城市
        renderCity(){
            if(this.province.length > 0){
                this.cityListAll = this.provinceListAll.filter(item => item.name == this.province)[0].districts;
                this.citySelectAble = true;
            } else if(!this.province){
                this.citySelectAble = false;
                this.city='';
            }
        },

        //下一步
        next() {
        if (this.active++ > 2) this.active = 0;
        },
        //上一步
        prev(){
            if(--this.active < 0) this.active = 0;
        },

        nextFlag: function(){
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    this.active++
                }
            })
        }


    }
}
</script>

<style lang="scss" scoped>

.register{
    .header{
        min-width: 980px;
        color: #666;
        header {
            margin: 0 auto;
            padding: 10px 0;
            width: 980px;

            .login{
                float: right;
            }

            .bold {
                font-style: normal;
            }
        }
    }

    .registerr{
        color: #1890ff;
    }

    a {
        color: #1890ff;
        text-decoration: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        transition: color 0.3s;
    }

    .el-steps{
        text-align: left;
    }

    > section{
        margin: 0 auto 30px;
        padding-top: 30px;
        width: 980px;
        min-height: 300px;
        padding-right: 550px;
        box-sizing: border-box;

        .status {
            font-size: 12px;
            margin-left: 20px;
            color: #e6a23c;
        }
    }

    .verification-slide{
        .slide-verify{
            left: 50%;
            top: 0;
            transform: translate(-50%);
        }
    }

    .el-select .el-input{
        width: 130 px;
    }

    .input-with-select .el-input-group_prepend{
        background-color: #fff;
    }


}

</style>

