import Stats from './stats'
import Vector from './vector'
var CircleA = (function (){
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );

    function getRandom(a , b){
        return Math.random()*(b-a)+a;
    }
    function testBox(canvas, borderWidth, useCache, count){
        var self = this;
        var ctx = canvas.getContext('2d'),
            Balls = [];
        var ball = function(x , y , vx , vy , useCache){
            console.log("useCache : ", useCache);
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.r = getZ(self.getRandom(20,40));
            this.color = [];
            this.cacheCanvas = document.createElement("canvas");
            this.cacheCtx = this.cacheCanvas.getContext("2d");
            this.cacheCanvas.width = 2*this.r;
            this.cacheCanvas.height = 2*this.r;
            var num = getZ(this.r/borderWidth);
            for(var j=0;j<num;j++){
                let red = self.getRandom(0,255);
                let g = self.getRandom(0,255);
                let b = self.getRandom(0,255);
                this.color.push("rgba("+getZ(red)+","+getZ(g)+","+getZ(b)+",1)");
            }
            this.useCache = useCache;
            if(useCache){
                this.cache();
            }
        }
        function getZ(num){
            var rounded;
            rounded = (0.5 + num) | 0;
            // A double bitwise not.
            rounded = ~~ (0.5 + num);
            // Finally, a left bitwise shift.
            rounded = (0.5 + num) << 0;

            return rounded;
        }

        ball.prototype = {
            paint:function(ctx){
                if(!this.useCache){
                    ctx.save();
                    var j=0;
                    ctx.lineWidth = borderWidth;
                    for(var i=1;i<this.r;i+=borderWidth){
                        ctx.beginPath();
                        ctx.strokeStyle = this.color[j];
                        ctx.arc(this.x , this.y , i , 0 , 2*Math.PI);
                        ctx.stroke();
                        j++;
                    }
                    ctx.restore();
                } else{
                    ctx.drawImage(this.cacheCanvas , this.x-this.r , this.y-this.r);
                }
            },

            cache:function(){
                this.cacheCtx.save();
                var j=0;
                this.cacheCtx.lineWidth = borderWidth;
                for(var i=1;i<this.r;i+=borderWidth){
                    this.cacheCtx.beginPath();
                    this.cacheCtx.strokeStyle = this.color[j];
                    this.cacheCtx.arc(this.r , this.r , i , 0 , 2*Math.PI);
                    this.cacheCtx.stroke();
                    j++;
                }
                this.cacheCtx.restore();
            },

            move:function(){
                this.x += this.vx;
                this.y += this.vy;
                if(this.x>(canvas.width-this.r)||this.x<this.r){
                    this.x=this.x<this.r?this.r:(canvas.width-this.r);
                    this.vx = -this.vx;
                }
                if(this.y>(canvas.height-this.r)||this.y<this.r){
                    this.y=this.y<this.r?this.r:(canvas.height-this.r);
                    this.vy = -this.vy;
                }

                this.paint(ctx);
            }
        }

        var Game = {
            init:function(){
                for(var i=0;i<count;i++){
                    let x = self.getRandom(0,canvas.width);
                    let y = self.getRandom(0,canvas.height);
                    let vx = self.getRandom(-10 , 10);
                    let vy = self.getRandom(-10 , 10)
                    var b = new ball(x , y , vx ,  vy , useCache)
                    Balls.push(b);
                }
            },

            update:function(){
                ctx.clearRect(0,0,canvas.width,canvas.height);
                for(var i=0;i<Balls.length;i++){
                    Balls[i].move();
                }
            },

            loop:function(){
                var _this = this;
                this.update();
                stats.update();
                RAF(function(){
                    _this.loop();
                })
            },

            start:function(){
                this.init();
                this.loop();
            }
        }

        window.RAF = (function(){
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {window.setTimeout(callback, 1000 / 60); };
        })();
        return Game;
    }
    return {getRandom, testBox}
})();


var CircleB = (function (){
    let size = 10, oCas, ctx, circles;
    
    class Circle {
        constructor(r, nrOfPoints) {
            this.r = r;
            this.nrOfPoints = nrOfPoints;
            this.points = [];
            for(let circlePoint = 0; circlePoint < nrOfPoints; circlePoint++) {
                let angle = Math.PI * 2 / nrOfPoints * circlePoint;
                let x = Math.cos(angle) * r;
                let y = Math.sin(angle) * r;
                this.points.push(new Vector(x, y));
            }
        }
        
        move() {
            let deltaAngle = 0.05 * this.r / size;
            this.points.forEach(p => {
                // https://en.wikipedia.org/wiki/Rotation_matrix
                // 𝑥2=cos𝛽𝑥1−sin𝛽𝑦1
                // 𝑦2=sin𝛽𝑥1+cos𝛽𝑦1
                let x2 = Math.cos(deltaAngle) * p.x - Math.sin(deltaAngle) * p.y;
                let y2 = Math.sin(deltaAngle) * p.x + Math.cos(deltaAngle) * p.y;
                p.x = x2;
                p.y = y2;
            });
        }
    }

    class Circles {
        constructor(nrOfCircles, cs) {
            this.init(nrOfCircles, cs);
        }
        
        init(nrOfCircles, cs) {
            size = cs;
            this.circles = new Array(nrOfCircles);
            let s = size / nrOfCircles * 0.45;
            var nrOfPoints =  ~~ (Math.random() * 7 + 5);
            for(let i = 0; i < nrOfCircles; i++) {
                let r = i * s + s;                
                this.circles[i] = new Circle(r, nrOfPoints);
            }
        }
        
        move() {
            this.circles.forEach(c => c.move());
        }
        
        draw(ctx) {
            for(let circle = 0; circle < this.circles.length - 1; circle++) {
                let nrOfPoints = Math.min(this.circles[circle].points.length, this.circles[circle + 1].points.length);
                for(let i = 0; i < nrOfPoints; i++) {
                    ctx.beginPath();
                    ctx.moveTo(this.circles[circle].points[i].x, this.circles[circle].points[i].y);
                    ctx.lineTo(this.circles[circle + 1].points[i].x, this.circles[circle + 1].points[i].y)
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(this.circles[circle].points[i].x, this.circles[circle].points[i].y, 3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(this.circles[circle + 1].points[i].x, this.circles[circle + 1].points[i].y, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }

    function reset(i) {
        console.log("size : ", size, "====== i : ", i)
        var w = Math.random() * (oCas.width);
        var h = Math.random() * (oCas.height);
        console.log("w :", w, ":::::: h : ", h)
        ctx.translate(w, h);
        setupCircles();
        
    }
    function setupCircles() {        
        var nrOfCircles = ~~ (Math.random() * 3 + 3);
        size = ~~ (Math.random() * 450 + 50)
        circles = new Circles(nrOfCircles, size);
    }
    function draw() {
        requestAnimationFrame(draw);
        console.log("oCas.width, oCas.height", oCas.width, oCas.height)
        ctx.clearRect(- oCas.width, - oCas.height, oCas.width, oCas.height);
        circles.draw(ctx);
        circles.move();
    }    
    var circleOptions = {        
        CircleInitFn(_oCas, cc){
            oCas = _oCas;
            ctx = oCas.getContext('2d')
            for(let i = 0 ; i < cc; i++){
                reset(i);
            }
            draw();
        }
    }
    return circleOptions;


})();


var circleC = (function(){
    var balls = [];
    var ctx;
    var count = 0;
    var oCas;
    var ball = function(x , y , vx , vy , useCache){
        this.right = true;
        this.down = true;
        this.x = x; //圆心点x轴坐标
        this.y = y; //圆心点y轴坐标
        this.vx = vx; 
        this.vy = vy;
        this.r = random(10, 80); //圆半径
        this.spd = random(1, 15);
        this.lineWidth = random(10, 30); //圆线条宽度
        let red = random(0,255);
        let g = random(0,255);
        let b = random(0,255);
        this.color = ("rgba(" + red + ","+ g +"," + b + ",1)");
    }
    function move(b,bs){
        window.requestAnimationFrame(function(){
            move(b, bs);
        })
        if(b.right){
            b.x += b.spd;
        }else{
            b.x -= b.spd;
        }
        
        if(b.down){
            b.y += b.spd;
        }else{
            b.y -= b.spd;
        }
        
        if(b.x > (oCas.width - b.lineWidth)){
            b.right = false;
        }else if(b.x < b.lineWidth){
            b.right = b;
        }

        if(b.y > (oCas.height - b.lineWidth)){
            b.down = false;
        }else if(b.y < b.lineWidth){
            b.down = true;
        }
        paint(bs);
    }
    function paint(bs){
        // console.log(bs)        
        ctx.clearRect(0, 0, oCas.width, oCas.height)
        ctx.save();
        for(var i = 0;i < count ;i++){
            ctx.beginPath();
            ctx.strokeStyle = bs[i].color;
            ctx.lineWidth = bs[i].lineWidth;
            ctx.arc(bs[i].x , bs[i].y , bs[i].r , 0 , 2*Math.PI);  
            ctx.stroke();              
        }
        
        ctx.restore();
    }

    function addBalls(_oCas, ballCount){
        oCas = _oCas;
        // console.log(oCas.width)
        ctx = oCas.getContext('2d')
        count = ballCount;
        for(let i = 0; i< ballCount; i++){
            let x = random(0, oCas.width);
            let y = random(0, oCas.height)
            balls.push(new ball(x, y))
        }

        for(var i = 0; i< count; i++){
            move(balls[i], balls);
        }
    }
    
    function random(a, b){
        return Math.random() * (b - a) + a;
    }

    {
    /*PracticeCircle
    function PracticeCircle(oCas, lw, spd){
        this.x = 30 , this.y = 30;
        this.spd = spd || 10;
        this.oCas = oCas;
        this.ctx = oCas.getContext("2d");
        this.lineWidth = lw;
        this.oWidth = this.oCas.width;
        this.oHeight = this.oCas.height;
        let self = this;
        this.right = true;
        this.down = true;
        function paint(){
            self.ctx.save();
            self.ctx.lineWidth = self.lineWidth;
            self.ctx.beginPath();
            self.ctx.strokeStyle = "#f40";
            self.ctx.arc(self.x , self.y , 10 , 0 , 2*Math.PI);
            self.ctx.stroke();
        }

        function move(){
            console.log(requestAnimationFrame)
            console.log("self.oWidth : ", self.oWidth, ":::: self.oHeight : ", self.oHeight)
            
            window.requestAnimationFrame(move)
            
            self.ctx.clearRect(0, 0, self.oWidth, self.oHeight)
            if(self.right){
                self.x += self.spd;
            }else{
                self.x -= self.spd;
            }
            
            if(self.down){
                self.y += self.spd;
            }else{
                self.y -= self.spd;
            }
            
            if(self.x > (self.oWidth - self.lineWidth)){
                self.right = false;
            }else if(self.x < self.lineWidth){
                self.right = true;
            }

            if(self.y > (self.oHeight - self.lineWidth)){
                self.down = false;
            }else if(self.y < self.lineWidth){
                self.down = true;
            }

            paint();
        }
        // window.RAF = (function(){
        //     return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {window.setTimeout(callback, 1000 / 60); };
        // })();
        // window.RAF(move)
        return move;
    }

     */
    }
    return addBalls;
})();
export default {CircleA, CircleB, circleC}