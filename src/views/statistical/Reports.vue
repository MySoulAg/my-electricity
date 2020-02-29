<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="echarts"></div>
    </el-card>
  </article>
</template>
<script>
import request from "@/api/statistical/index.js";
export default {
  data() {
    return {};
  },

  created() {
    this.getReports();
  },

  methods: {
    /**获取数据 */
    getReports() {
      request.getReports().then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          res.data.title = {
            text: "用户来源"
          };
          res.data.xAxis[0].boundaryGap = false;
          res.data.tooltip = {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          };
          this.drawChart(res.data);
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    drawChart(opt) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("echarts"));
      // 指定图表的配置项和数据
      let option = opt;

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
article {
  flex-shrink: 0;
  width: 100%;
}

.el-breadcrumb {
  padding-bottom: 20px;
}

#echarts {
  width: 70%;
  height: 400px;
}
</style>