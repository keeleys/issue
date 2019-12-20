import {
  getAllIssues,
  getSingleIssue,
  getSingleIssueCommits,
  convertMarkdown,
  createIssue,
  updateIssue
} from "@/util/api";
const state = {
  issues: [],
  issue: {},
  commits: []
};
const mutations = {
  setIssues: function(state, issues) {
    state.issues = issues;
  },
  updateIssue: function(state, issue) {
    const index = state.issues.findIndex(it => it.id === issue.id);
    if (index !== -1) {
      state.issues[index] = issue;
    }
  },
  remoteIssue: function(state, id) {
    state.issues = state.issues.filter(function(issue) {
      return issue.id === id;
    });
  },
  insertIssue: function(state, issue) {
    state.issues.unshift(issue);
  }
};
const actions = {
  async findAllIssues(context) {
    let issues = await getAllIssues();
    context.commit("setIssues", issues.data);
  },
  async insertIssue(context, payload) {
    let data = { labels: ["documentation"], ...payload };
    let result = await createIssue(payload);
    context.commit("insertIssue", result.data);
  },
  async updateIssue(context, payload) {
    let result = await updateIssue(payload);
    context.commit("updateIssue", result.data);
  },
  async deleteIssue(context, number) {
    let result = await updateIssue({ number, state: "closed"});
    context.commit("remoteIssue", result.data);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
