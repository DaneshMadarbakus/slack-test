const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const app = express();
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

const axios = require("axios");
var FormData = require('form-data');
var data = new FormData();

app.use(cors())
app.use(bodyParser.json())

const jar = new CookieJar();

const slackMagicAxiosClient = wrapper(axios.create({
  jar
}));

app.post("/login", (req, res) => {
  console.log("Danesh /login");
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

      console.log(JSON.stringify(response.data));
    })
    .catch(err => {
      console.log(err);
    });

  res.sendStatus(200)
})

app.post("/confirm-email", (req, res) => {
  console.log("/confirm-email")
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

  console.log("/confirm-email 1", config);

  slackMagicAxiosClient(config)
    .then(response => {
      console.log("/confirm-email 2")
      console.log(JSON.stringify(response.data));
      response.headers['set-cookie'];
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });

})

app.get("/workspaces", (req, res) => {
  slackMagicAxiosClient({
    method: 'post',
    url: 'https://slack.com/api/signin.findWorkspaces',
  })
    .then(response => {
      const workspaces = response.data.current_teams[0].teams.map(team => {
        return { id: team.id, name: team.name, url: team.url }
      })
      res.send({ status: 200, workspaces });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
})

app.post("/send-message", (req, res) => {

  // const message = req.body.message;
  // console.log("Danesh /send-message 0")

  // data.append('blocks', `[{"type":"rich_text","elements":[{"type":"rich_text_section","elements":[{"type":"text","text":"${message}"}]}]}]`);

  // var config = {
  //   method: 'post',
  //   url: 'https://techpeople-world.slack.com/api/chat.postMessage',
  //   headers: {

  //     ...data.getHeaders()
  //   },
  //   data: data
  // };

  // slackMagicAxiosClient(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });


  // res.sendStatus(200)
});

app.listen(8001, () => {
  console.log("Server running on port 8001");
});
