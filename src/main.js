import Vue from "vue/dist/vue.js"

Vue.config.productionTip = false;

new Vue({
  data: {
    n: 0,
    //历史记录：'string'
    history: [],
    //使用变量来阻止watch的侦听
    inUndoMode: false
  },
  watch:{
    n(newValue,oldValue){
      console.log(this.inUndoMode )
    if (this.inUndoMode === false){
      this.history.push({from:oldValue, to:newValue})
    }}
  },
  // 不如用 computed 来计算 displayName
  template: `
    <div>
      {{n}}
      <hr />
      <button @click="add1">+1</button>
      <button @click="add2">+2</button>
      <button @click="minus1">-1</button>
      <button @click="minus2">-2</button>
      <hr/>
      <button @click="undo">撤销</button>
      <hr/>

      {{history}}
    </div>
  `,
  methods: {
    add1() {
      this.n += 1;
    },
    add2() {
      this.n += 2;
    },
    minus1() {
      this.n -= 1;
    },
    minus2() {
      this.n -= 2;
    },
    undo() {
      const last = this.history.pop()
      console.log(last)
      this.inUndoMode = true

      //历史记录中的字符串from，即上一次操作的值
      //但是watch也侦听到了新的变化from: to:
      this.n = last.from//因为watch 是异步的，下面的nextTick肯定会比watch更晚执行
this.$nextTick(()=>{
  this.inUndoMode = false
},0)


    }
  }
}).$mount("#app");
