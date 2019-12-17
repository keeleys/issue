import github from "@/image/github.svg";
import weixin from "@/image/weixin.svg";
import weibo from "@/image/weibo.svg";
import facebook from "@/image/facebook.svg";
import { getAllIssues, getSingleIssue, convertMarkdown} from "@/util/api";
const state = {
  issues: [],
  issue: {}
};
const mutations = {
  setIssues: function(state, issues) {
    console.log("setIssues", issues);
    state.issues = issues;
  },
  setIssue: function(state, issue) {
    console.log("setIssue", issue);
    
    state.issue = issue;
  }
};
const actions = {
  async findAllIssues(context) {
    let issues = await getAllIssues();
    issues = issues.data.map(issue => {
      return {
        number: issue.number,
        user_name: issue.user.login,
        title: issue.title,
        labels: issue.labels,
        state: issue.state,
        locked: issue.locked,
        created_at: issue.created_at,
        updated_at: issue.updated_at
      };
    });
    context.commit("setIssues", issues);
  },
  async getSingleIssue(context, num) {
    let issue = await getSingleIssue(num);
    let bodyHtml = await convertMarkdown(issue.data.body);
    issue.data.bodyHtml = bodyHtml.data;
    context.commit("setIssue", issue.data);
  }
};
const getters = {
  issues(state) {
    console.log("getter");
    return state.issues;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
