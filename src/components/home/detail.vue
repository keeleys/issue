<template>
<div>
    <div class="title">
        {{issue.title}}
    </div>
    <div class="content" >
        <div class = "markdown-body" v-html="issue.bodyHtml"></div>
    </div>
</div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "detail",
    computed: {
        ...mapState('home',['issue'])
    },
    async created() {
        const number = this.$route.params.number;
        await this.$store.dispatch("home/getSingleIssue", number);
    }
}
</script>
<style>

</style>