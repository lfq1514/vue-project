<template>
  <div class="echartPage">
    <canvas class="canvas" width="600" height="400" ref="canvas"></canvas>
  </div>
</template>

<script>
import { LineChart } from "../../utils/public.js";

export default {
  name: "Canvas",
  data() {
    return {
      detailData: [
        { x: 100, y: 120 },
        { x: 200, y: 160 },
        { x: 300, y: 240 },
        { x: 400, y: 120 },
        { x: 500, y: 200 }
        ]
    };
  },
  mounted() {
    let canvas = this.$refs.canvas;
    let ctx = canvas.getContext("2d");
    let draw = new LineChart(ctx);
    draw.init(this.detailData);
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
