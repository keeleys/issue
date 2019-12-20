import { getSingleIssue, getSingleIssueCommits, convertMarkdown,createCommit } from "@/util/api";
const state = {
  issue: {},
  commits: []
};
const mutations = {
  setIssue: function(state, issue) {
    state.issue = issue;
  },
  eidtIssue: function(state, issue) {
    state.issue = issue;
  },
  setCommits: function(state, commits) {
    state.commits = commits;
  },
  addCommit: function(state, commit) {
    state.commits.push(commit);
  }
};
const actions = {
  async getSingleIssue(context, num) {
    let issue = await getSingleIssue(num);
    let bodyHtml = await convertMarkdown(issue.data.body);
    issue.data.bodyHtml = bodyHtml.data;
    context.commit("setIssue", issue.data);
  },
  async getSingleIssueCommits(context, num) {
    let commits = await getSingleIssueCommits(num);
    for (const commit of commits.data) {
      let bodyHtml = await convertMarkdown(commit.body);
      commit.bodyHtml = bodyHtml.data;
    }
    context.commit("setCommits", commits.data);
  },
  async createCommit(context, payload) {
    let response = await createCommit(payload);
    let bodyHtml = await convertMarkdown(response.data.body);
    response.data.bodyHtml = bodyHtml.data;
    context.commit("addCommit", response.data);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
