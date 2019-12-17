import axios from "axios";
import config from "./config";

const axiosGithub = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/json"
  }
});

export const getAllIssues = () => {
  const GET_ALL_ISSUES = `/repos/${config.resp}/issues`;
  return axiosGithub.get(GET_ALL_ISSUES);
};

export const getSingleIssue = issue_number => {
  const GET_SINGLE_ISSUES = `/repos/${config.resp}/issues/${issue_number}`;
  return axiosGithub.get(GET_SINGLE_ISSUES);
};
export const convertMarkdown = text => {
  const CONVERT_MARKDOWN = `/markdown`;
  return axiosGithub.post(CONVERT_MARKDOWN, {
    mode: "gfm",
    context: "github/gollum",
    text
  });
};