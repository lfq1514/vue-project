<template>
  <div class="hello">
    <el-button type="primary" @click="test">demo按钮</el-button>
    {{ mydata }}
    <Test1 :msg="testData"></Test1>
    <input type="text" v-model="ipt" />
    <div>
      <input type="text" v-model="n1" />+<input type="text" v-model="n2" />={{
        total
      }}
    </div>
  </div>
</template>

<script>
import Test1 from "./Test1";
export default {
  name: "Demo",
  components: {
    Test1
  },
  data() {
    return {
      testData: "123",
      mydata: "hello",
      ipt: "",
      n1: 0,
      n2: 0
    };
  },
  computed: {
    total: {
      get: function() {
        return this.n1 + this.n2;
      }
    }
  },
  watch: {
    ipt: {
      handler: function() {
        console.log("111");
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  updated() {},
  methods: {
    test() {
      this.testData = "world";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
