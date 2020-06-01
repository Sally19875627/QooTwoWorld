<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { isFulfilled } from 'q';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your QooTwo小世界'
    }
  },
  mounted(){
    let f = function(){
      this.a = 1;
      this.b = 2;
    }
    let o = new f();
    f.prototype.b = 3;
    f.prototype.c = 4;

    console.log(o);
    console.log(o.a);
    console.log(o.b);
    console.log(o.c);
    console.log(o.d);

    let buz = {
      fog:"stack"
    }

    for(var name in buz){
      if(Object.prototype.hasOwnProperty.call(buz, name)){
        console.log('this is fog (' + name + ') for sure. Value : ' + buz[name]);
      }else{
        console.log('继承的属性或方法 : ' + name);
      }
    }

    let i1 = Infinity;
    let i2 = Infinity;
    console.log("i1/i2 : " , i1/i2);


    (function() {
      var undefined = 'foo';
      console.log(undefined, typeof undefined)
    })();

    (function(undefined){
      console.log(undefined, typeof undefined)
    })('foo');

    // let x = null;
    let x;
    // === 和 == 的区别1： == 会先判断是否是null；
    if(x === undefined){
      console.log("x === undefined")
    }else{
      console.log("x !== undefined")
    }

    console.log("void 0 : ", void 0)


    //null 与 undefined的区别
    console.log( typeof null ) //object
    console.log( typeof undefined ) //undefined
    console.log( 1 + null ) //1
    console.log( 1 + undefined ) // NaN
    console.log( null === undefined ) //false
    console.log( null == undefined ) //true
    console.log( null === null ) //true
    console.log( null == null ) //true

    //===================globalThis====================
    console.log("===================globalThis====================")
    console.log(globalThis)


    // function isF(n){
    //   console.log("isFinite(100/n) : ", isFinite(100/n))
    // }

    // isF(5);
    // isF(0);

    console.log("isNaN(undefined) : ", isNaN(undefined))
    console.log("isNaN('') : ", isNaN(''))
    console.log("isNaN(' ') : ", isNaN(' '))
    console.log("isNaN({}) : ", isNaN({}))
    console.log("isNaN([]) : ", isNaN([]))
    console.log("0 / 0 : ", (0 / 0))
    console.log("1 / 0 : ", (1 / 0))

    console.log("Number.isNaN(undefined) : ", Number.isNaN(undefined))
    console.log("Number.isNaN('') : ", Number.isNaN(''))
    console.log("Number.isNaN(' ') : ", Number.isNaN(' '))
    console.log("Number.isNaN(NaN) : ", Number.isNaN(NaN))
    console.log("0 / 0 : ", (0 / 0))
    console.log("1 / 0 : ", (1 / 0))


    isNaN(NaN);       // true
    isNaN(undefined); // true
    isNaN({});        // true

    isNaN(true);      // false
    isNaN(null);      // false
    isNaN(37);        // false

    // strings
    isNaN("37");      // false: 可以被转换成数值37
    isNaN("37.37");   // false: 可以被转换成数值37.37
    isNaN("37,5");    // true
    isNaN('123ABC');  // true:  parseInt("123ABC")的结果是 123, 但是Number("123ABC")结果是 NaN
    isNaN("");        // false: 空字符串被转换成0
    isNaN(" ");       // false: 包含空格的字符串被转换成0

    // dates
    isNaN(new Date());                // false
    isNaN(new Date().toString());     // true

    isNaN("blabla")   // true: "blabla"不能转换成数值
                      // 转换成数值失败， 返回NaN

    // function Person(){
    //   this.age = 0;
    //   var clouser = '124';
    //   setInterval(()=>{
    //     this.age ++;
    //     console.log(this.age)
    //     console.log(clouser)
    //   },1000)
    // }

    // var p = new Person();

    // [undefined, 5, 5, ':P', {value: '=^_^='}, arguments,'=^_^=']

    function go() {
      return ':P';
    }

    function withDefaults(a, b = 5, c = b, d = go(), e = this, 
                          f = arguments, g = this.value) {
      return [a, b, c, d, e, f, g];
    }

    console.log(withDefaults.call({value: '=^_^='}));
    console.log("git practice 111");

    // function sum(a, a, c){
    //   console.log(arguments)
    //   return a + a + c;
    // }
    // sum(20);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
