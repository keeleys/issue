<template>
<div class="detail">
    <div class="header box" v-if="issue.user">
        <div class="nav">
            <router-link to="/">Home</router-link>
        </div>
        <h1>{{issue.title}}</h1>
        <div class="commit_header">
            <span>{{issue.user.login}}</span>
            <span>{{issue.updated_at | formatDate}}</span>
        </div>
        <div class="cell">
            <div class = "markdown-body" v-html="issue.bodyHtml"></div>
        </div>
    </div>
    <div class="spe20"></div>
    <div class="box">
        <div class="cell commit_header">
            <span>{{issue.comments}} 条留言</span>
            <span>
               <button @click="createCommit">发表留言</button>
            </span>
        </div>
        <div class="cell commit" v-for="commit in commits" :key="commit.id">
            <div class="commit_login">
                <span>{{commit.user.login}}</span>
                <span>{{commit.created_at | formatDate }}</span>
            </div>
            <div>
                <div class = "markdown-body" v-html="commit.bodyHtml"></div>
            </div>
        </div>
    </div>
    <Dialog :is-show="showDialog" @on-close="closeDialog">
      <div slot="header">发表留言</div>
      <div slot="main">
        <div id="dialog_body">
          <textarea
            name="body"
            placeholder="请输入内容"
            v-model="model.body"
          ></textarea>
        </div>
        <div>
          <button @click="saveCommit">提交</button>
        </div>
      </div>
    </Dialog>
</div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "Detail",
    data() {
    return {
      model : {
          body: null
      }
    }
  },
    computed: {
        showDialog() {
      return this.$store.state.showDialog;
    },
        ...mapState('detail',['issue',"commits"])
    },
    async mounted() {
        this.$store.commit("isLoading", true);
        const number = this.$route.params.number;
        await this.$store.dispatch("detail/getSingleIssue", number);
        await this.$store.dispatch("detail/getSingleIssueCommits", number);
        this.$store.commit("isLoading", false);
    },
    methods:{
        createCommit() {
            this.$store.commit("setShowDialog", true);
        },
        closeDialog() {
            this.$store.commit("setShowDialog", false);
        },
        saveCommit() {
            this.$store.commit("isLoading", true);
            this.$store.dispatch("detail/createCommit", {
                number: this.issue.number,
                body: this.model.body
            });
            this.$store.commit("setShowDialog", false);
            this.$store.commit("isLoading", false);
        }
    }
}
</script>
<style scoped>

</style>