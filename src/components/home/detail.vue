<template>
<div class="detail">
    <div class="header box" v-if="issue">
        <div class="nav">
            <router-link to="/">Home</router-link>
        </div>
        <h1>{{issue.title}}</h1>
        <small v-if="issue.user">
            <span>{{issue.user.login}}</span>
            <span>{{issue.updated_at}}</span>
        </small>
        <div class="cell">
            <div class = "markdown-body" v-html="issue.bodyHtml"></div>
        </div>
    </div>
    <div class="spe20"></div>
    <div class="box" v-if="commits">
        <div class="cell">
            {{issue.comments}} 回复
        </div>
        <div class="cell" v-for="commit in commits" :key="commit.id">
            <div class="commit_login">
                <span>{{commit.user.login}}</span>
                <span>{{commit.created_at}}</span>
            </div>
            <div>
                <div class = "markdown-body" v-html="commit.bodyHtml"></div>
            </div>
        </div>
    </div>
    
</div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "Detail",
    computed: {
        ...mapState('home',['issue',"commits"])
    },
    async mounted() {
        this.$store.commit("isLoading", true);
        const number = this.$route.params.number;
        await this.$store.dispatch("home/getSingleIssue", number);
        await this.$store.dispatch("home/getSingleIssueCommits", number);
        this.$store.commit("isLoading", false);
    }
}
</script>
<style scoped>

</style>