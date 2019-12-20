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
          <a href="#" @click="createIssue">新建</a>
        </div>
      </nav>
      <section v-for="issue in issues" :key="issue.id">
        <div class="avatar">
          <img
            :src="issue.user.avatar_url+'&s=64'"
          />
        </div>
        <div class="middle">
          <div class="title">
            <a href="javascript:void(0);" @click="openDetail(issue.number)">{{
              issue.title
            }}</a>
          </div>
          <div class="more" v-if="issue.user">
            <span class="author node">{{ issue.user.login }}</span>
            <span class="time"> {{ issue.created_at | formatDate}} </span>
          </div>
        </div>
        <div>
        <div>
          <button @click="editIssue(issue.number)">修改</button>
          <button @click="deleteIssue(issue.number)">删除</button>
          回复数:<span class="commit"> {{ issue.comments }}</span>
        </div>
        </div>
        
      </section>
    </article>
    <Dialog :is-show="showDialog" @on-close="closeDialog">
      <div slot="header">{{ model.number ? "修改" : "创建" }}主题</div>
      <div slot="main">
        <div id="dialog_title">
          <input
            type="text"
            name="title"
            placeholder="请输入标题"
            v-model="model.title"
          />
        </div>
        <div class="spe20"></div>
        <div id="dialog_body">
          <textarea
            name="body"
            placeholder="请输入内容"
            v-model="model.body"
          ></textarea>
        </div>
        <div>
          <button @click="saveIssue">{{ model.number ? "修改" : "发布" }}</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { log } from 'util';
let initDate = {
        number: null,
        title: null,
        body: null
      }
export default {
  name: "index",
  data() {
    return {
      model : initDate
    }
  },
  computed: {
    showDialog() {
      return this.$store.state.showDialog;
    },
    ...mapState("home", ["issues"])
  },
  methods: {
    createIssue() {
      this.model = {...initDate };
      this.$store.commit("setShowDialog", true);
    },
    editIssue(number) {
      let issue = this.issues.find(it=>it.number == number);
      console.log(issue);
      this.model = { title: issue.title, body: issue.body, number: number}
      this.$store.commit("setShowDialog", true);
    },
    async deleteIssue(number){
      this.$store.commit("isLoading", true);
      await this.$store.dispatch("home/deleteIssue", number)
      this.$store.commit("isLoading", false);
    },
    closeDialog() {
      this.$store.commit("setShowDialog", false);
    },
    openDetail(number) {
      this.$router.push({ path: `/detail/${number}` });
    },
    async saveIssue() {
      this.$store.commit("isLoading", true);
      if(this.model.number){
        await this.$store.dispatch("home/updateIssue", {
          title: this.model.title,
          body: this.model.body,
          number: this.model.number
        });
      } else {
        await this.$store.dispatch("home/insertIssue", {
          title: this.model.title,
          body: this.model.body
        });
      }
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
