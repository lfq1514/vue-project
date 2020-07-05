<template>
  <div class="echartPage">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Echart",
  data() {
    return {};
  },
  mounted() {
    let myChart = echarts.init(document.getElementById("main"));
    let option = {
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          areaStyle: {}
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echartPage {
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas {
  border: 1px solid #ccc;
}
</style>
