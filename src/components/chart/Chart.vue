<template>
  <div class="cartPage">
    <el-container style="height:100%" class="container">
      <el-aside width="200px">
        <el-menu
          :default-active="index"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            v-for="(item, index) in titleList"
            :key="index"
            :index="item.path"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Chart",
  data() {
    return {
      index: "",
      titleList: [
        { title: "echart图表", path: "/home/chart/echart" },
        { title: "cavnas图", path: "/home/chart/canvas" },
        { title: "map地图", path: "/home/chart/echartMap" }
      ]
    };
  },

  created() {
    //获取当前路由（相当于激活的导航）（解决刷新页面时，当前页面组件与激活导航菜单不一致问题）
    this.index = this.$router.history.current.path;
  },
  methods: {
    handleSelect(path) {
      this.index = path;
      this.$router.push(path);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cartPage {
  height: 100% !important;
  width: 100%;
  background: skyblue;
}
.container {
  height: 100%;
}
::v-deep .el-aside {
  width: 100px;
  background: #545c64;
  padding: 20px 0 20px;
}
::v-deep .el-container {
  text-align: left;
}
</style>
