import axios from "axios";
import config from "@/util/config";
import { getToken } from "@/util/util";

let getHeaders = function() {
  const token = getToken();
  return {
    Accept: "application/json",
    Authorization: `token ${token}`
  };
};
const axiosGithub = axios.create({
  baseURL: "https://api.github.com"
});

export const getAllIssues = () => {
  const GET_ALL_ISSUES = `/repos/${config.resp}/issues`;
  const headers = getHeaders();
  return axiosGithub.get(GET_ALL_ISSUES, { headers });
};

export const getSingleIssue = issue_number => {
  const GET_SINGLE_ISSUES = `/repos/${config.resp}/issues/${issue_number}`;
  const headers = getHeaders();
  return axiosGithub.get(GET_SINGLE_ISSUES, { headers });
};

export const getSingleIssueCommits = issue_number => {
  const GET_SINGLE_ISSUES = `/repos/${config.resp}/issues/${issue_number}/comments`;
  const headers = getHeaders();
  return axiosGithub.get(GET_SINGLE_ISSUES, { headers });
};

export const accessToken = payload => {
  const accessTokenUrl =
    "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token";
  const headers = {
    Accept: "application/json"
  };
  return axiosGithub.post(
    accessTokenUrl,
    {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code: payload.code
    },
    { headers }
  );
};

export const convertMarkdown = text => {
  const CONVERT_MARKDOWN = `/markdown`;
  const headers = getHeaders();
  return axiosGithub.post(
    CONVERT_MARKDOWN,
    {
      mode: "gfm",
      context: "github/gollum",
      text
    },
    { headers }
  );
};
