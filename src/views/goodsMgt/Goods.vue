<template>
  <article>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索 添加 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            @clear="getGoodsList"
            @keyup.enter.native="search"
            placeholder="请输入搜索内容"
            v-model="getOrdersParams.query"
          >
            <el-button @click="search" slot="append" :icon="searchObj.icon">{{searchObj.text}}</el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="goodsTableData" stripe border style="width: 100%" :max-height="tableMaxHeight">
        <el-table-column align="center" type="index" :index="1" label="#"></el-table-column>
        <el-table-column align="center" prop="goods_name" label="商品名称" min-width="480"></el-table-column>
        <el-table-column align="center" prop="goods_price" label="商品价格(元)" min-width="110"></el-table-column>
        <el-table-column align="center" prop="goods_weight" label="商品重量" min-width="85"></el-table-column>
        <el-table-column align="center" label="创建时间" min-width="170">
          <template slot-scope="scope">{{handleDate(scope.row.add_time)}}</template>
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
              type="danger"
              icon="el-icon-delete"
              @click="handleDetele(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="getOrdersParams.pagenum"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="getOrdersParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </article>
</template>
<script>
import request from "@/api/goodsMgt/goods.js";
import format from "@/utils/format.js";
export default {
  data() {
    return {
      searchObj: {
        icon: "el-icon-search",
        text: "搜索"
      },
      goodsTableData: [], //商品表格列表
      tableMaxHeight: 0, //表格的最大高度，根据浏览器的窗体大小而定
      getOrdersParams: {
        query: "", //搜索参数
        pagenum: 1, //当前页码数
        pagesize: 10 //每页显示条数
      },
      total: 0 //表格数据总页数
    };
  },

  created() {
    this.getGoodsList();
    this.tableMaxHeight = window.innerHeight - 290; //表格的最大高度，根据浏览器的窗体大小而定
  },

  methods: {
    /**获取商品列表 */
    async getGoodsList() {
      await request.getGoodsList(this.getOrdersParams).then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          this.goodsTableData = res.data.goods;
          this.total = res.data.total;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },

    /**点击 添加商品 */
    addGoods() {
      this.$router.push("/addGoods");
    },

    /**点击操作栏的 编辑 */
    handleEditor() {
      this.$message.error("待开发编辑");
    },

    /**点击操作栏的 删除 */
    handleDetele(row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request.deleteGoods(row.goods_id).then(res => {
            console.log(res);
            if (res.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getGoodsList();
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    /**
     * 点击搜索
     */
    search() {
      (this.searchObj.icon = "el-icon-loading"),
        (this.searchObj.text = "搜索中");

      this.getGoodsList().then(() => {
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
      this.getOrdersParams.pagesize = val;
      this.getGoodsList();
    },

    /**改变页数 */
    handleCurrentChange(val) {
      this.getOrdersParams.pagenum = val;
      this.getGoodsList();
    }
  }
};
</script>
<style lang="less" scoped>
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