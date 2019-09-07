<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span
            v-for="(item,index) in tabs" :key="index"
            @click="handleSearchTab(index)"
            :class="{active:index==current}"
            >
                <i :class="item.icon">{{item.name}}</i>
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                v-model="form.departDate"
                @change="handleDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>
<script>
 import moment from 'moment'
export default {
   
    data(){
        return{
            tabs:[
                {
                    icon:"iconfont icondancheng",name:"单程"
                },
                {
                    icon:"iconfont iconshuangxiang" ,name:'往返'
                }
            ],
            form:{
                departCity:'',
                destCity:'',
                departDate:'',
                departCode:'',
                destCode:''
            },
            current:0
        }
    },
    methods:{
        handleSearchTab(index){
            if(index===1){
                this.$alert('目前暂不支持往返','提示')
            }
        },
        queryDepartSearch(value,cb){
            if(!value){
                cb([])
                return
            }
            this.$axios({
                url:"/airs/city",
                params:{
                    name:value
                }
            }).then(res=>{
                console.log(res)
                const {data} =res.data;
                const newData=[];
                data.forEach(v => {
                    v.value=v.name.replace('市','')
                    newData.push(v)
                });
                cb(newData)
            })
        },
        queryDestSearch(value,cb){
            if(!value){
                cb([]);
                return
            }
            this.$axios({
                url:"/airs/city",
                params:{
                    name:value
                }
            }).then(res=>{
                
                const {data} =res.data
                const newData= [];
                data.forEach(v=>{
                    v.value=v.name.replace('市','')
                    newData.push(v)
                })
                cb(newData)
            })
        },
        handleDepartSelect(item){
            this.form.departCode=item.sort
            this.form.departCity=item.value
        },
        handleDestSelect(item){
            this.form.destCity=item.value
            this.form.destCode=item.sort
        },
        handleDate(value){
            this.form.departDate=moment(value).format('YYYY-MM-DD')
            console.log(value)
        },
        handleReverse(){
            const{departCity,departCode,destCode,destCity}=this.form
            this.form.departCity=destCity
            this.form.departCode=destCode
            this.form.destCity=departCity
            this.form.destCode=departCode
        },
        handleSubmit(){
            const{departCity,destCity,departDate}=this.form

            if(!departCity){
                this.$alert('出发城市不能为空','提示')
                return
            }
            if(!destCity){
                this.$alert('到达不能为空','提示')
                return
            }
            if(!departDate){
                this.$alert('出发日期不能为空','提示')
                return
            }
            this.$router.push({
                path:'/air/flights',
                query:this.form
                })           
        }
    }
}
</script>
<style lang="less" scoped>
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}

</style>