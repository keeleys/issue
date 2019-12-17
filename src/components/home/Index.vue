<template>
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
      <div class="middle" v-for="issue in issues" :key="issue.id">
        <div class="title">
          <a href="javascript:void(0);" @click="detail(issue.number)">{{ issue.title }}</a>
        </div>
        <div class="more">
          <span class="author node">{{ issue.user_name }}</span>
          <span class="time"> {{ issue.created_at }} </span>
        </div>
      </div>
      <div class="commit">7</div>
    </section>
  </article>
</template>
<script>
import Link from "./Link.vue";
import { mapState } from "vuex";
import { log } from "util";
export default {
  name: "index",
  components: { Link },
  data() {
    return {
      name: "凉水",
      status: {
        isShowPublish: false
      }
    };
  },
  computed: {
    ...mapState("home", ["issues"])
  },
  methods: {
    openDialog() {
      this.$store.commit("setShowDialog", true);
    },
    detail(number) {
      this.$router.push({ path: `/detail/${number}` })
    }
  },
  async created() {
    await this.$store.dispatch("home/findAllIssues");
  }
};
</script>
