<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="move" ref="event"></div>


    <div class="mask" ref="mask"></div>

    <div class="big">
      <img :src="bigUrl" ref="big" />
    </div>
    
</template>

<script>
  export default {
    name: "Zoom",

    props:{
      bigUrl:String,
      imgUrl:String
    },

    methods:{
      move(event){
        // 初始化left和top
        let left = 0
        let top = 0

        //取出相关数据
        //事件的坐标(相对于事件源div的左上角)

        const {offsetX, offsetY} = event
        console.log(offsetX, offsetY)
        // mask的宽度
        // const maskWidth = this.$ref.mask.clientWidth
        const maskWidth = this.maskWidth

        // 计算left
        left = offsetX - maskWidth/2
        // left值必须在什么区间[0,maskWidth]
        if (left) {
          left = 0
        } else if (left>maskWidth){
          left = maskWidth
        }

        // 计算top
        top = offsetY - maskWidth/2
        // top 值必须在什么区间[0，maskWidth]
        if (top<0){
          top = 0
        } else if (top > maskWidth){
          top = maskWidth
        }

        // 指定左侧遮罩的样式坐标
        const maskDiv = this.$refs.mask
        maskDiv.style.left = left + 'px'
        maskDiv.style.top = left + 'px'

        // 指定右侧大图标的样式坐标
        const bigImg = this.$refs.big
        bigImg.style.left = -2*left + 'px'
        bigImg.style.top = -2*top + 'px'
      }
    },

    mounted(){
      //mask div 初始显示时是隐藏的
      // this.maskWidth = this.$refs.clientWidth
      this.maskWidth = this.$refs.event.clientWidth
      console.log(this.maskWidth)
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;

    img {
      width: 100%;
      height: 100%
    }

    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }

    .small {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #ccc;
      overflow: hidden;
      z-index: 998;
      display: none;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .mask:hover~.small,
    .mask:hover~.big {
      display: block;
    }
  }
</style>