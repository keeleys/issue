const env = process.env.NODE_ENV
console.log("env",env)
export default {
  resp: "keeleys/issue",
  clientId: "87092eb83254d1129580",
  clientSecret: "fca9d7d76ca30872b72bb6514b12561b410170fe",
  homeUrl: env === 'production' ? "https://www.sitec.cc/issue": "http://localhost:8081",
  token_key:"KEELEY_GITHUB_ACCOUNT_TOKEN"
}
