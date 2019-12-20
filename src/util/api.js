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
  const url = `/repos/${config.resp}/issues`;
  const headers = getHeaders();
  return axiosGithub.get(url, { headers });
};

export const getSingleIssue = issue_number => {
  const url = `/repos/${config.resp}/issues/${issue_number}`;
  const headers = getHeaders();
  return axiosGithub.get(url, { headers });
};

export const getSingleIssueCommits = issue_number => {
  const url = `/repos/${config.resp}/issues/${issue_number}/comments`;
  const headers = getHeaders();
  return axiosGithub.get(url, { headers });
};
export const createIssue = payload => {
  const url = `/repos/${config.resp}/issues`;
  const headers = getHeaders();
  return axiosGithub.post(url, payload, { headers });
}
export const updateIssue = payload => {
  const url = `/repos/${config.resp}/issues/${payload.number}`;
  const headers = getHeaders();
  return axiosGithub.patch(url, payload, { headers });
}
export const createCommit = ({ number, body }) => {
  const url = `/repos/${config.resp}/issues/${number}/comments`;
  const headers = getHeaders();
  return axiosGithub.post(url, { body }, { headers });
}
export const deleteCommit = commitId => {
  const url = `/repos/${config.resp}/issues/comments/${commitId}`;
  const headers = getHeaders();
  return axiosGithub.delete(url, { headers });
}
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
