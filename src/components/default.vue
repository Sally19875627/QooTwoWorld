<template>
    
    <el-container>
      <el-header>
        <headerCom/>
      </el-header>

      <el-main>
        
        <router-view/>
      </el-main>

      <el-footer>Footer</el-footer>
    </el-container>

</template>

<script>
import headerCom from './components/header/index.vue'
export default {
    data() {
        return {
            isMain:false
        }
    },
  methods:{
    loadLogo(){
      var h = window.location.href;
      if(h.substring(h.indexOf('#')) === '#/'){
        return true
      }else{
        return  false
      }
    }
  },
  components:{
    headerCom,
  }
}
</script>