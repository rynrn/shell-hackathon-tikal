const url = require("url");
const path = require("path");
const gateway = require("express-gateway");
const { isEmpty } = require("lodash");
const express = require("express");
const Parse = require("parse/node");
const ParseServer, { ParseGraphQLServer } = require("parse-server").ParseServer;
const ParseDashboard = require("parse-dashboard");
const config = require("./parse-server-config");
const app = express();

const port = process.env.PORT || 1337;
const isProd = !process.env.PORT;

Parse.initialize(process.env.APP_ID, process.env.JS_KEY);
Parse.serverURL = process.env.SERVER_URL;

const proxy = require("proxy-middleware");

const api = new ParseServer(config.apps[0]);

const options = { allowInsecureHTTP: isProd };
const dashboard = new ParseDashboard(config, options);

app.use(express.static("public"));

app.use("/parse", api);

app.use("/dashboard", dashboard);

app.listen(port, function() {
  console.log(`parse-server running on port ${port}.`);
});

app.use("/app/:name", async (req, res, next) => {
  const Application = Parse.Object.extend("Application");
  const query = new Parse.Query(Application);
  query.equalTo("name", req.params.name);
  console.log(".....");
  console.log("app name: ", req.params.name);
  let result;
  try {
    result = await query.first();
  } catch (e) {
    result = null;
  }
  console.log("result src: ", result.get("src"));
  if (isEmpty(result)) {
    res.send("App is not exist!");
  } else {
    return proxy(url.parse(result.get("src")))(req, res, next);
  }
});

// app.use("/app/:name/*", async (req, res, next) => {
//   const Application = Parse.Object.extend("Application");
//   const query = new Parse.Query(Application);
//   query.equalTo("name", req.params.name);
//   console.log("app name: ", req.params.name);
//   let result;
//   try {
//     result = await query.first();
//   } catch (e) {
//     result = null;
//   }
//   console.log("result: ", result);
//   if (isEmpty(result)) {
//     res.send("App is not exist!");
//   } else {
//     return proxy(url.parse(result.get("src")))(req, res, next);
//   }
// });

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

app.use(
  "/static",
  proxy(url.parse("https://market-chart.herokuapp.com/static"))
);
