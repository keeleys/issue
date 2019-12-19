<template>
  <div id="app">
    <header></header>
    <main>
      <router-view v-if="token"></router-view>
      <!-- 个人信息 -->
      <aside>
        <div class="user_info box">
          你好
        </div>
      </aside>
    </main>
    <footer></footer>
    
    <transition name="fade">
      <loading v-if="loading"></loading>
    </transition>
  </div>
</template>
<script>
import Loading from "@/components/loading/Index.vue";
import { getToken, authorHandler } from "@/util/util";
import config from "@/util/config";
export default {
  components: { Loading},
  computed: {
    loading() {
        return this.$store.state.loading;
    },
    token: getToken
  },
  methods: {
    handleLogin() {
      const githubOauthUrl = "http://github.com/login/oauth/authorize";
      const query = {
        client_id: config.clientId,
        redirect_uri: config.homeUrl,
        scope: "public_repo"
      };
      let loginLink = `${githubOauthUrl}?redirect_uri=${query.redirect_uri}&scope=${query.scope}&client_id=${query.client_id}`;
      window.location.href = loginLink;
    }
  },
  async created() {
    await authorHandler();
    var token = getToken();
    console.log(token);
    if (!token) {
        var r=confirm("您没有登陆，即将跳转到登陆界面");
        if(r) {
            this.handleLogin();
        }
    }
  }
};
</script>
