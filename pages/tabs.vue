<template>
  <div class="box">
      <div class="tabs">
          <span  v-for="(item,index) in ['新闻','体育','娱乐']" :key="index" @click="handleClick(index)" :class="{active:current===index}">{{item}}</span>
      </div>
      <div>
          <ul v-show="current===0">
              <li>中秋将至</li>
              <li>中秋将至</li>
              <li>中秋将至</li>
          </ul>
      </div>
      <div>
          <ul v-show="current===1">
              <li>中国男篮世界杯</li>
              <li>中国男篮世界杯</li>
              <li>中国男篮世界杯</li>
          </ul>
      </div><div>
          <ul v-show="current===2">
              <li>娱乐至死</li>
              <li>娱乐至死</li>
              <li>娱乐至死</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        current:0
    }
},
methods:{
    handleClick(index){
        this.current=index
    }
}
}
</script>

<style lang="less" scoped>
    .tabs{
        margin-bottom:20px;

        span{
            cursor: pointer;
            margin-left:10px;
        }
    }
    .active{
        color:red;
    }
</style>