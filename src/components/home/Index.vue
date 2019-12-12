<template>
  <div id="app">
    <header></header>
    <main>
      <!-- 正文列表 -->
      <article class="box">
        <!-- 标签 -->
        <nav id="tag">
          <div class="menu">
            <a href="#">技术</a>
            <a href="#">创意</a>
            <a href="#">全部</a>
          </div>
          <div class="menu-btn">
            <a href="#" @click="openDialog">新建</a>
          </div>
        </nav>
        <section>
          <div class="avatar">
            <img
              src="https://cdn.v2ex.com/gravatar/3f23935e2f4a4c86e07944f5c12073d6?s=48&d=retro"
            />
          </div>
          <div class="middle">
            <div class="title">
              <a href="#">4G 网速越来越慢,好像大家只能默默忍受</a>
            </div>
            <div class="more">
              <span class="author node">GeT1t</span>
              <span class="time"> 4 分钟前 </span>
            </div>
          </div>
          <div class="commit">7</div>
        </section>
      </article>
      <!-- 个人信息 -->
      <aside>
        <div class="user_info box">
          你好
        </div>
      </aside>
    </main>
    <footer></footer>
    <Dialog :is-show="status.isShowPublish" @on-close="closeDialog">
      <div slot="header">创建新主题</div>
      <div slot="main">
        请输入内容
      </div>
    </Dialog>
  </div>
</template>
<script>
import logoImg from "@/image/logo.jpeg";
import Link from "./Link.vue";
import Dialog from "./Dialog.vue";
export default {
  components: { Link, Dialog },
  data() {
    return {
      name: "凉水",
      logoImg: logoImg,
      signText: "明明如月，何时可掇",
      status: {
        isShowPublish: false
      }
    };
  },
  methods: {
    closeDialog() {
      this.status.isShowPublish = false;
    },
    openDialog() {
      this.status.isShowPublish = true;
    }
  }
};
</script>
