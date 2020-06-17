<template>
  <div class="goodsPage">
    <el-container class="container">
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">商品列表</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">商品分组</span>
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
  name: "Goods",
  methods: {
    handleSelect(key) {
        switch(key){
            case '1':
                this.$router.push('/home/goods/goodsList')
                break
            case '2':
                this.$router.push('/home/goods/goodsGroup')
                break
        }
    }
  }
};
</script>
<style lang="scss" scoped>
.goodsPage {
  height: 100%;
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
