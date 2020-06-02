const {
  MONGODB_URI,
  APP_ID,
  SERVER_URL,
  MASTER_KEY,
  JS_KEY,
  ADMIN_USER,
  ADMIN_PASS,
} = process.env;

module.exports = {
  apps: [
    {
      databaseURI: MONGODB_URI,
      cloud: "./cloud/main.js",
      serverURL: SERVER_URL,
      appId: APP_ID,
      masterKey: MASTER_KEY,
      javascriptKey: JS_KEY,
      appName: "shell",
    },
  ],
  users: [
    {
      user: ADMIN_USER,
      pass: ADMIN_PASS,
    },
  ],
};
