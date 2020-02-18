<template>
  <article ref="box">
    <img
      :ref="'itemHeight'+index"
      :style="{'left':item.left+'px','top':item.top+'px'}"
      :src="item.url"
      v-for="(item,index) in temImgList"
      :key="index"
    />
  </article>
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        require("@/assets/imgs/welcome/1.jpg"),
        require("@/assets/imgs/welcome/2.jpg"),
        require("@/assets/imgs/welcome/3.jpg"),
        require("@/assets/imgs/welcome/4.jpg"),
        require("@/assets/imgs/welcome/5.jpg"),
        require("@/assets/imgs/welcome/6.jpg"),
        require("@/assets/imgs/welcome/7.jpg"),
        require("@/assets/imgs/welcome/8.jpg"),
        require("@/assets/imgs/welcome/9.jpg"),
        require("@/assets/imgs/welcome/10.jpg"),
        require("@/assets/imgs/welcome/11.jpg"),
        require("@/assets/imgs/welcome/12.jpg"),
        require("@/assets/imgs/welcome/13.jpg"),
        require("@/assets/imgs/welcome/14.jpg"),
        require("@/assets/imgs/welcome/15.jpg"),
        require("@/assets/imgs/welcome/16.jpg"),
        require("@/assets/imgs/welcome/17.jpg"),
        require("@/assets/imgs/welcome/18.jpg"),
        require("@/assets/imgs/welcome/19.jpg"),
        require("@/assets/imgs/welcome/20.jpg")
      ],
      temImgList: [],
      heightList: []
    };
  },

  mounted() {
    const boxWidth = this.$refs.box.getBoundingClientRect().width;
    this.waterfall(200, boxWidth, 20);
  },

  methods: {
    /**瀑布流 */
    waterfall(imgWidth, boxWidth, itemRowGap) {
      console.log(itemRowGap);
      const column = Math.floor(boxWidth / imgWidth); //向下取整 求得列数
      console.log(column);
      const gap = boxWidth % imgWidth; //总共留下的空隙
      console.log(gap);
      const itemColGap = Math.floor(gap / (column - 1)); //每个图片之间的 列间隙
      console.log(itemColGap);

      //先排出第一行的图片
      for (let i = 0; i < column; i++) {
        this.temImgList.push({
          url: this.imgList[i],
          left: 0 + imgWidth * i + itemColGap * i,
          top: 0
        });
      }

      this.$nextTick(() => {
        for (let i = 0; i < column; i++) {
          this.heightList.push(
            Math.floor(
              this.$refs["itemHeight" + i][0].getBoundingClientRect().height
            )
          );
        }
        console.log(this.heightList);

        //找出数组中最小的数
        console.log(Math.min(...this.heightList));
      });
    }
  }
};
</script>
<style lang="less" scoped>
article {
  position: relative;
}

img {
  width: 200px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>