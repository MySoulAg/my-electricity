<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索 添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            @clear="getOrdersList"
            @keyup.enter.native="search"
            placeholder="请输入搜索内容"
            v-model="getGoodsParams.query"
          >
            <el-button @click="search" slot="append" :icon="searchObj.icon">{{searchObj.text}}</el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="ordersTableData"
        stripe
        border
        style="width: 100%"
        :max-height="tableMaxHeight"
      >
        <el-table-column align="center" type="index" :index="1" label="#"></el-table-column>
        <el-table-column align="center" prop="order_number" label="订单编号" min-width="300"></el-table-column>
        <el-table-column align="center" prop="order_price" label="订单价格" min-width="110"></el-table-column>
        <el-table-column align="center" label="是否付款" min-width="85">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.order_pay=='1'?'success':'danger'"
            >{{scope.row.order_pay=='1'?'已付款':'未付款'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="is_send" label="是否发货" min-width="85"></el-table-column>
        <el-table-column align="center" label="下单时间" min-width="170">
          <template slot-scope="scope">{{handleDate(scope.row.update_time)}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEditor(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-map-location"
              @click="handleLocation(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="getGoodsParams.pagenum"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="getGoodsParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </article>
</template>
<script>
import request from "@/api/orderMgt/orderMgt.js";
import format from "@/utils/format.js";
export default {
  data() {
    return {
      searchObj: {
        icon: "el-icon-search",
        text: "搜索"
      },
      getGoodsParams: {
        query: "", //搜索参数
        pagenum: 1, //当前页码数
        pagesize: 10 //每页显示条数
      },
      tableMaxHeight: 0, //表格的最大高度，根据浏览器的窗体大小而定
      ordersTableData: [], //订单表格列表
      total: 0 //表格数据总页数
    };
  },

  created() {
    this.getOrdersList();
    this.tableMaxHeight = window.innerHeight - 290; //表格的最大高度，根据浏览器的窗体大小而定
  },

  methods: {
    /**获取订单列表 */
    async getOrdersList() {
      await request.getOrdersList(this.getGoodsParams).then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          this.ordersTableData = res.data.goods;
          this.total = res.data.total;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**点击操作栏的 编辑 */
    handleEditor() {
      this.$message.error("待开发编辑");
    },

    /**点击操作栏的 定位 */
    handleLocation() {
      this.$message.error("待开发物流");
    },

    /**
     * 点击搜索
     */
    search() {
      (this.searchObj.icon = "el-icon-loading"),
        (this.searchObj.text = "搜索中");

      this.getOrdersList().then(() => {
        (this.searchObj.icon = "el-icon-search"),
          (this.searchObj.text = "搜索");
      });
    },

    /**时间格式化 */
    handleDate(time) {
      return format.handleDate("yyyy-MM-DD hh:mm:ss", time);
    },

    /**改变每页条数 */
    handleSizeChange(val) {
      this.getGoodsParams.pagesize = val;
      this.getOrdersList();
    },

    /**改变页数 */
    handleCurrentChange(val) {
      this.getGoodsParams.pagenum = val;
      this.getOrdersList();
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

.el-table {
  margin-top: 20px;
}

.el-pagination {
  margin-top: 20px;
}
</style>