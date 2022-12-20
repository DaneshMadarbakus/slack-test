const express = require("express");
const cors = require("cors");
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

const axios = require("axios");
var FormData = require('form-data');

const bodyParser = require('body-parser')
const app = express();

app.use(cors())
app.use(bodyParser.json())

const jar = new CookieJar();

const slackMagicAxiosClient = wrapper(axios.create({
  jar
}));

app.post("/login", (req, res) => {
  console.log("Logging in", req.body.email);

  const data = new FormData();
  data.append('email', req.body.email);

  slackMagicAxiosClient({
    method: 'post',
    url: 'https://slack.com/api/signup.confirmEmail',
    headers: {
      ...data.getHeaders()
    },
    data: data
  })
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {
      console.log(err);
    });

  res.sendStatus(200);
})

app.post("/confirm-email", (req, res) => {
  console.log("Confirming email with code")

  const data = new FormData();
  data.append('code', req.body.code);
  data.append('email', req.body.email);

  var config = {
    method: 'post',
    url: 'https://slack.com/api/signin.confirmCode',
    headers: {
      ...data.getHeaders()
    },
    data: data
  };

  slackMagicAxiosClient(config)
    .then(response => {
      response.headers['set-cookie'];
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
})

app.get("/workspaces", (req, res) => {
  console.log("Retrieving workspaces");

  slackMagicAxiosClient({
    method: 'post',
    url: 'https://slack.com/api/signin.findWorkspaces',
  })
    .then(response => {
      const workspaces = response.data.current_teams[0].teams.map(team => {
        return { id: team.id, name: team.name, url: team.url, magicUrl: team.magic_login_url, magicLoginCode: team.magic_login_code }
      })

      res.send({ status: 200, workspaces });;
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
})

let token = "";

app.post("/join-workspace", async (req, res) => {
  console.log("Joining workspace with magic url");

  await slackMagicAxiosClient({
    method: 'get',
    url: `${req.body.magicUrl}`
  }).then(response => {
    console.log("Slack API token: ", response.data.match(/\"api_token\":\"(.*?)\"/)[1]);
    token = response.data.match(/\"api_token\":\"(.*?)\"/)[1];
    res.sendStatus(200);
  }).catch(err => {
    console.log(JSON.stringify(err));
    res.sendStatus(500);
  })

  await slackMagicAxiosClient({
    method: 'get',
    url: `${req.body.url}${req.body.magicLoginCode}`
  }).catch(err => {
    console.log(JSON.stringify(err));
    res.sendStatus(500);
  })
})

app.post("/send-message", (req, res) => {
  console.log("Sending message");

  const message = req.body.message;
  const channel = req.body.channel;
  const workspaceURL = req.body.workspaceUrl;
  const data = new FormData();

  data.append('blocks', `[{"type":"rich_text","elements":[{"type":"rich_text_section","elements":[{"type":"text","text":"${message}"}]}]}]`);
  data.append('token', token);
  data.append('channel', channel);

  var config = {
    method: 'post',
    url: `${workspaceURL}api/chat.postMessage`,
    headers: {
      ...data.getHeaders()
    },
    data: data
  };

  slackMagicAxiosClient(config)
    .then((response) => {
      console.log(response.data);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      res.sendStatus(500);
    });
});

app.listen(8001, () => {
  console.log("Server running on port 8001");
});
