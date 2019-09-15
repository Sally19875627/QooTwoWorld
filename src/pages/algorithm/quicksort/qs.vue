<template>
    <el-row>
        <el-col :span="24">
            <div>
                <el-input class="input"
                    placeholder="请输入内容"
                    v-model="elCount"
                    clearable
                    :span="16">
                </el-input>
                <el-button type="success" @click="createEl()" :span="8">生成随机数</el-button>
                <ul>
                    <li v-for="(item, index) in this.arr" :key="index" :style="liStyle(item,index)">
                        {{item}}
                    </li>
                </ul>
                <div class="qs_button_wrapper" >
                    <el-button type="success" @click="startQS()">启动快排（左小右大）</el-button>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            elCount: '',
            arr:[],
            count:0,
            low:0,
            high:0,
            newLow:0,
            newHigh:0
        }
    },
    computed:{
        
    },
    methods:{
        liStyle(item, index){
            var h = item * 5 + 'px'
            var bgColor = "#FF44AA";
            if(index == this.low){
                bgColor = "#FFFF33";
            }else if(index == this.high){
                bgColor = "#FF3333";
            }

            if(this.index == this.newLow){
                bgColor = "#FFCC22"
            }else if(this.index == this.newHigh){
                bgColor = "#FFAA33"
            }
            
            var s = {
                "flex-grow":1,
                "min-width":"10px",
                "display":"inline-block",
                "height":h,
                "background-color":bgColor,
                "margin-left":"10px",
            };
            
            return s
        },
        createEl(){
            this.arr=[]
            var n = parseInt(this.elCount)
            
            while(this.arr.length < n){
                var r = Math.floor(Math.random(0, n) * 100) +1;
                this.arr.push(r)
            }
            return this.arr;
        },
        startQS(){
            let rIndex = this.arr.length - 1;
            this.quicksort(this.arr, 0 ,rIndex);
        },
        quicksort(arr, low, high){
            this.newLow = low;
            this.newHigh = high;
            console.log(this.newHigh)
            setTimeout(()=>{
                this.arr = arr;
                this.$forceUpdate();
                if(low<high){
                    var mid = this.partition(arr,low,high);
                    this.quicksort(arr,low,mid-1);
                    this.quicksort(arr,mid+1,high);
                }
            },200);
            
        },
        partition(arr, low, high){
            var temp = arr[low];
            this.low = low;
            this.high = high;
            while(low<high){
                while(low<high && arr[high]>=temp){
                    high--;
                }
                arr[low]=arr[high];  
                while(low<high && arr[low]<=temp){
                    low++;
                }
                arr[high]=arr[low];
            }
            arr[low]=temp;
            this.newLow = low;
            this.newHigh = high;
            this.arr = arr;
            this.count ++;
            console.log(this.count)
            this.$forceUpdate();
            
            return low;
        }
    }
}
</script>
<style scoped>
ul{
    display:flex;
    flex-wrap:nowrap;
    align-content:space-between;
    align-items:flex-end;
}

.qs_button_wrapper{
  text-align: center;
}

.input{
    display:inline-block;
    width:66%;
}

</style>