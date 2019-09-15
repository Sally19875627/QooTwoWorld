<template id="default">
    <el-container>
      <el-header>
        <headerCom/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
    <!-- <div>ajioejisnioejio</div> -->
</template>

<script>
import headerCom from '@/components/header/index.vue'
export default {
    data() {
        return {
        }
    },
  methods:{
  },
  components:{
    headerCom,
  }
}
</script>