<template>
  <!-- 正文列表 -->
  <div>
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
    <section v-for="issue in issues" :key="issue.id">
      <div class="avatar">
        <img
          src="https://cdn.v2ex.com/gravatar/3f23935e2f4a4c86e07944f5c12073d6?s=48&d=retro"
        />
      </div>
      <div class="middle">
        <div class="title">
          <a href="javascript:void(0);" @click="openDetail(issue.number)">{{
            issue.title
          }}</a>
        </div>
        <div class="more">
          <span class="author node">{{ issue.user_name }}</span>
          <span class="time"> {{ issue.created_at }} </span>
        </div>
      </div>
      <div class="commit">{{ issue.comments }}</div>
    </section>
  </article>
  <Dialog :is-show="showDialog" @on-close="closeDialog">
      <div slot="header">创建新主题</div>
      <div slot="main">
        <div id="dialog_title">
          <input type="text" name="title" placeholder="请输入标题" v-model="model.title"/>
        </div>
        <div class="spe20"></div>
        <div id="dialog_body">
          <textarea name="body" placeholder="请输入内容" v-model="model.body"></textarea>
        </div>
      <div>
        <button @click="saveIssue">发布</button>
      </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { log } from 'util';
export default {
  name: "index",
  data() {
    return {
      model : {
        title: null,
        body: null
      }
    }
  },
  computed: {
    showDialog() {
      return this.$store.state.showDialog;
    },
    ...mapState("home", ["issues"])
  },
  methods: {
    openDialog() {
      this.$store.commit("setShowDialog", true);
    },
    closeDialog() {
      this.$store.commit("setShowDialog", false);
    },
    openDetail(number) {
      this.$router.push({ path: `/detail/${number}` });
    },
    async saveIssue() {
      this.$store.commit("isLoading", true);
      await this.$store.dispatch("home/insertIssue", {
        title: this.model.title,
        body: this.model.body
      });
      this.$store.commit("isLoading", false);
      this.closeDialog();
    }
  },
  async mounted() {
    this.$store.commit("isLoading", true);
    await this.$store.dispatch("home/findAllIssues");
    this.$store.commit("isLoading", false);
  }
};
</script>
