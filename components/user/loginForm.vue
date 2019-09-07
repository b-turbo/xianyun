<template>
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <el-form-item class="form-item" prop="username">
            <el-input 
            v-model="form.username"
            placeholder="用户名/手机">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            v-model="form.password"
            placeholder="密码" 
            type="password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
export default {
    data(){
        return{
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    {
                        required:true,
                        message:'请输入用户名',
                        trigger:'blur'
                    }
                ],
                password:[
                    {
                        required:true,
                        message:'请输入密码',
                        trigger:'blur'
                    }
                ]
            }
        }
    },
    methods:{
        handleLoginSubmit(){
            // console.log(this.form)
            this.$refs.form.validate(valid=>{
                if(valid){
                    this.$axios({
                        url:'/accounts/login',
                        method:'POST',
                        data:this.form
                    }).then(res=>{
                       this.$store.commit('user/setUserInfo',res.data)
                       this.$router.push('/')
                    }).catch(()=>{
                        this.$message.error('用户名或者密码无效')
                    })
                }else{
                    this.$message.error('验证失败')
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
.form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>