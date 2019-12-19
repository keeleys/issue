<template>
  <div class="dialog">
    <!--外层的遮罩 点击事件用来关闭弹窗，isShow控制弹窗显示 隐藏的props-->
    <div class="dialog-cover back" v-if="isShow" @click="closeMyself"></div>
    <!-- transition 这里可以加一些简单的动画效果 -->
    <transition name="drop">
      <!--style 通过props 控制内容的样式  -->
      <div class="dialog-content" v-if="isShow">
        <div class="dialog_head back">
          <!--弹窗头部 title-->
          <slot name="header">提示信息</slot>
        </div>
        <div class="dialog_main">
          <!--弹窗的内容-->
          <slot name="main">弹窗内容</slot>
        </div>
        <!--弹窗关闭按钮-->
        <div class="foot_close" @click="closeMyself">
          <div class="close_img back"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
// 最外层 设置position定位
.dialog {
  position: relative;
  color: #2e2c2d;
  font-size: 16px;
}
// 遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩
.dialog-cover {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
// 内容层 z-index要比遮罩大，否则会被遮盖，
.dialog-content {
  position: fixed;
  width: 40vw;
  height: auto;
  margin:auto;
  left:0;
  right:0;
  top:5vh;
  z-index: 300;
  background: #fff;
  .dialog_head {
    background-color: #f9f9f9;
    padding: 10px 20px;
    border-bottom: 1px solid #e2e2e2;
  }
  .dialog_main {
    padding: 10px 20px;
  }
}
</style>
<script>
export default {
  props: {
    isShow: {
      //弹窗组件是否显示 默认不显示
      type: Boolean,
      default: false,
      required: true //必须
    }
  },
  methods: {
    closeMyself() {
      this.$emit("on-close");
    }
  }
};
</script>
