<template>
    <el-row>
        <el-col :span="24">
                <el-input class="input"
                    placeholder="请输入一个数字"
                    v-model="elCount"
                    clearable
                    >
                </el-input>
                <el-col :span="24">
                    <el-button type="success" @click="StartDrawWithoutCache()" :span="8">画圈圈 无缓存</el-button>
                    <el-button type="success" @click="StartDrawWithCache()" :span="8">画圈圈 带缓存</el-button>
                    <el-button type="success" @click="StartDrawB()" :span="8">螺旋圈圈</el-button>
                    <el-button type="success" @click="StartDrawC()" :span="8">测试画图</el-button>
                </el-col>
                
            <canvas :span="20" :offset="2" id="cas" width="800px" height="500px"  style="border: 1px solid #aaaaaa; display: block; margin: 50px auto;">您的浏览器不支持 HTML5 canvas 标签。</canvas>
        </el-col>
    </el-row>            
</template>

<script>
import A from '../../js/circle'
export default {
    data() {
        return {
            elCount : 0,
            oCas:null,
            circles:null,
            ctx:null,
            w:0,
            h:0,
            size:0
        }
    },
    methods:{
        StartDrawWithoutCache(){
            this.oCas = null;
            this.oCas = document.getElementById("cas")
            A.CircleA.testBox(this.oCas,4, false, ~~this.elCount).start(); 
        },
        StartDrawWithCache(){
            this.oCas = null;
            this.oCas = document.getElementById("cas");
            A.CircleA.testBox(this.oCas,4, true, ~~this.elCount).start(); 
        },
        StartDrawB(){
            this.oCas = document.getElementById("cas")    
            A.CircleB.CircleInitFn(this.oCas, 1);
        },
        StartDrawC(){
            this.oCas = document.getElementById("cas");
            // let c = 
            A.circleC(this.oCas, ~~this.elCount);
            // let d = new A.circleC(this.oCas, 50, 10);
            // c();
            // d();
        }    
    }
}
</script>
<style scoped>
.input{
    display: inline-block;
}
canvas{
    display:block;
    margin: 0 auto;
}
</style>