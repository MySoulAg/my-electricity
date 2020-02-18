<template>
  <article ref="container" class="container">
    <div class="img-box" ref="imgBoxRef" v-for="(item,index) in imgList" :key="index">
      <img :src="item" />
    </div>
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
      heightList: []
    };
  },

  mounted() {
    // this.waterfall();
    
    // console.log(document.getElementsByClassName('img-box')[0].offsetHeight)
    // console.log(this.$refs.imgBoxRef);
    // window.setTimeout(() => {
    //   console.log(document.getElementsByClassName('img-box')[0].offsetHeight)
    // }, 1);
    // console.log(this.$refs.imgBoxRef[2].offsetHeight)
  },

  methods: {
    /**瀑布流 */
    waterfall() {
      const imgWidth = this.$refs.imgBoxRef[0].offsetWidth; //获取图片的宽度
      console.log(imgWidth);
      const containerWidth = this.$refs.container.offsetWidth; //获取container的宽度
      console.log(containerWidth);
      const column = Math.floor(containerWidth / imgWidth); //向下取整 求得列数
      console.log(column);

      //遍历所有图片
      this.$refs.imgBoxRef.forEach((item, index) => {
        window.setTimeout(()=>{
console.log(item.offsetHeight)
        },10)


        
        if (index < column) {
          //第一列
          item.style.position = "absolute";
          item.style.left = `${imgWidth * index}px`;
          item.style.top = `0px`;

          // window.setTimeout(() => {
          //   console.log(item.offsetHeight);
          //   this.heightList.push(item.offsetHeight)
          // console.log(Math.min(...this.heightList))
          // }, 1000);
          
        }else {
          
          return
        }
      });
      console.log(this.heightList);

      // this.$nextTick(() => {
      //   for (let i = 0; i < column; i++) {
      //     this.heightList.push(
      //       Math.floor(
      //         this.$refs["itemHeight" + i][0].getBoundingClientRect().height
      //       )
      //     );
      //   }
      //   console.log(this.heightList);

      //   //找出数组中最小的数
      //   console.log(Math.min(...this.heightList));
      // });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
}

.img-box {
  padding: 20px;
  display: inline-block;
}

.img-box img {
  width: 175px;
}
</style>