<template>
  <el-container>
    <el-header class="home-header">
      <p>客官，欢迎光临</p>
      <p class="logout">[退出]</p>
    </el-header>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/home/goods/goodsList">我的商品</el-menu-item>
          <el-menu-item index="/home/chart/echart">图表</el-menu-item>
          <el-menu-item index="/home/test">测试</el-menu-item>
        </el-menu></el-header
      >
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// @ is an alias to /src
import Test from "../test/Test";
import Goods from "../../components/goods/Goods";

export default {
  name: "Home",
  data() {
    return {
      activeIndex: "/home/goods/goodsList",
      pageList: ["/home/goods/goodsList", "/home/goods/goodsList", "/home/test"]
    };
  },
  created(){

     this.activeIndex = this.$router.history.current.path;
     console.log(this.$router.history.current.path)

  },
  components: {
    Goods
  },
  methods: {
    handleSelect(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #409eff;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.el-container {
  background-color: pink;
  color: #333;
  text-align: center;
  height: 100%;
}
::v-deep .el-tabs__header {
  line-height: 30px;
  margin: 0;
}
.home-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 13px;
}
.logout {
  margin-left: 20px;
}
.el-menu-demo {
  width: 100%;
}
::v-deep .el-main {
  padding: 0;
}
.main {
  height: 100%;
}
</style>
