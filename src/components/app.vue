<template>
  <div id="app">
    <header></header>
    <main>
      <router-view></router-view>
      <!-- 个人信息 -->
      <aside>
        <div class="user_info box">
          你好
        </div>
      </aside>
    </main>
    <footer></footer>
    <Dialog :is-show="showDialog" @on-close="closeDialog">
      <div slot="header">创建新主题</div>
      <div slot="main">
        请输入内容
      </div>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "./home/Dialog";

export default {
  components: { Dialog },
  computed: {
    showDialog() {
      return this.$store.state.showDialog;
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("setShowDialog", false);
    }
  }
};
</script>
