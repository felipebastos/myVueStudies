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

let data = {val : 0};
Vue.component('calculator', {
    template: '<div><input type="text" v-bind:value="val"><br><div><button class="btn btn-primary" @click="one">1</button><button class="btn btn-primary" @click="two">2</button><button class="btn btn-primary" @click="three">3</button></div></div>',
    data: function() {
		return data
	},
    methods:{
        one() {
            data.val++;
        },
        two() {
            data.val += 2;
        },
        three() {
            data.val +=3;
        }
    }
})
new Vue({
    el: '#app3'
})