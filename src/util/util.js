import { accessToken } from "@/util/api";
import config from "@/util/config";
const token_key = "KEELEY_GITHUB_ACCOUNT_TOKEN";

const getParam = function(param) {
  let uri = window.location.search.substring(1);
  let params = new URLSearchParams(uri);
  return params.get(param);
};
const codeHandler = function() {
  let code = getParam("code");
  if (code == null) {
    return false;
  }
  return code;
};
const authorHandler = async function() {
  let code = codeHandler();
  let replacedUrl = config.homeUrl;
  if (code) {
    let tokenResponse = null;
    try {
      tokenResponse = await accessToken({ code: code });
      window.localStorage.setItem(token_key, tokenResponse.data.access_token);
      console.log("token 设置成功")
      window.location.replace(replacedUrl)
    } catch (err) {
      console.log("获取token失败", err);
    }
  } else {
    console.log("路径没有检测到code");
  }
  
};
const getToken = function() {
  return window.localStorage.getItem(token_key);
};

export {
    getToken,
    authorHandler
}