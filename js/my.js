new Vue({
    el: '#app',
    data: {
        nome: 'VueJS'
    }
});

Vue.component('my-tag', {
    props: ['property'],
    template: '<div>This is our own {{property}}</div>'
})
new Vue({
    el: '#app2'
})

let data = {
    val: 0
};
Vue.component('calculator', {
    template: '<div><input type="text" v-bind:value="val"><br><div><button class="btn btn-primary" @click="one">1</button><button class="btn btn-primary" @click="two">2</button><button class="btn btn-primary" @click="three">3</button></div></div>',
    data: function () {
        return data
    },
    methods: {
        one() {
            data.val++;
        },
        two() {
            data.val += 2;
        },
        three() {
            data.val += 3;
        }
    }
})
new Vue({
    el: '#app3'
})


// Draw tests.

let ox = [0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5];
let oy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let cvs, ctx, g_data = {
    x: ox,
    y: oy,
    h: 200,
    w: 200,
    coefh: 0,
    coefw: 0
};
let vg = Vue.component('teia-graph', {
    template: '<canvas id="tgraph" v-bind:width="w" v-bind:height="h"></canvas>',
    data: function () {
        return g_data;
    },
    methods: {
        genY() {
            let pos = 0;
            for (x of this.x) {
                this.y[pos] = x * x + 2 * x + 0;
                this.x[pos] = pos;
                pos++;
            }
        },
        height() {
            return this.h;
        },
        width() {
            return this.w;
        },
        draw() {
            cvs = document.getElementById('tgraph');
            ctx = cvs.getContext('2d');

            ctx.clearRect(0, 0, this.w, this.h);

            ctx.beginPath();
            ctx.moveTo(this.coefw, this.h - this.coefh);
            ctx.lineTo(this.w - this.coefw, this.h - this.coefh);
            ctx.lineTo(this.w - this.coefw - 3, this.h - this.coefh - 3);
            ctx.lineTo(this.w - this.coefw - 3, this.h - this.coefh + 3);
            ctx.lineTo(this.w - this.coefw, this.h - this.coefh);
            ctx.moveTo(this.coefw, this.h - this.coefh);
            ctx.lineTo(this.coefw, this.coefh);
            ctx.lineTo(this.coefw - 3, this.coefh + 3);
            ctx.lineTo(this.coefw + 3, this.coefh + 3);
            ctx.lineTo(this.coefw, this.coefh);
            ctx.strokeStyle = 'black';
            ctx.stroke();

            ctx.beginPath();
            this.drawData();
            ctx.strokeStyle = '#FF0000';
            ctx.stroke();

            requestAnimationFrame(this.draw);
        },
        drawData() {
            let x = this.x;
            let y = this.y;
            let pos = 0;

            ctx.moveTo(this.coefw + x[pos], (this.h - this.coefh) - y[pos]);
            for (let xi of x) {
                ctx.lineTo(this.coefw + xi * this.coefw, (this.h - this.coefh) - y[pos] * this.coefh);
                pos++;
            }
        }
    },
    mounted: function () {
        this.genY();
        this.coefw = this.w / this.x.length;
        this.coefh = this.h / this.y.length;
        this.draw();
    }
})
new Vue({
    el: '#app4'
})