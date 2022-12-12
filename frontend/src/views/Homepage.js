import React, { useState } from "react";

const sendSlackMessage = (message) => {
  console.log("Danesh make request to api here", message)

  const myHeaders = new Headers();
  console.log("Danesh HEADERS: ", myHeaders);
  myHeaders.append("authority", "techpeople-world.slack.com");
  myHeaders.append("Content-type", "application/json");
  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "en-GB,en;q=0.9,ar-EG;q=0.8,ar;q=0.7,en-US;q=0.6");
  myHeaders.append("cookie", "OptanonAlertBoxClosed=2022-12-08T18:26:37.888Z; _gcl_au=1.1.2076542397.1670523998; _cs_c=1; _rdt_uuid=1670523998419.9c63290b-73b6-45ff-9b1f-4b7ffde1a002; __qca=P0-1045545757-1670523998209; _li_dcdm_c=.slack.com; _lc2_fpi=e00b11ac9c9b--01gksgn4qvrjceq3qnwqjc453f; b=.19a3e0229ffa87239c303eb5a4ec0b7d; shown_ssb_redirect_page=1; PageCount=10; _ga_QTJQME5M5D=GS1.1.1670528484.2.1.1670528991.60.0.0; _cs_id=86a13be8-4bc7-a082-ebbb-44bb7e034d5c.1670523998.3.1670583467.1670583467.1.1704687998302; _ga=GA1.2.1563194233.1670523998; _gid=GA1.2.140865249.1670786053; shown_download_ssb_modal=1; show_download_ssb_banner=1; no_download_ssb_banner=1; ec=enQtNDUwMjUwMzU2NjkxNi02ZDVkMjFhZGM5MWE2OGIxYzRjZmU1ZmYwYTYwY2I0NDcwMDdjMzhiM2NiZDUzMTdiNDUwZGIwNmM0YTBiODcz; d=xoxd-M8jyiri%2Bz0ZF67MNbyF3juiSTo9ufrNoP4N5OdPLQYpG3Nen3xw66R%2Beoo0qnbSkFg2homNwY1sYMGVdOfEolowd%2BvuiNkXexLcZKgNWHxzYnP3W8FXdJSt8AmGjXu7ch2jS7ZtcYQemxQmRdIjD8hvTFePr3bWxeHmaWHcJXW%2BFLhH1fywlQZPE3A%3D%3D; d-s=1670793708; lc=1670793708; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Dec+11+2022+21%3A21%3A51+GMT%2B0000+(Greenwich+Mean+Time)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=22faadb8-3796-43d8-be76-834aff5ee77c&interactionCount=2&landingPath=NotLandingPage&groups=1%3A1%2C3%3A0%2C2%3A0%2C4%3A0&AwaitingReconsent=false&geolocation=GB%3BENG; d=xoxd-lZMPVopbq1ijtlkneZqEGT1iD1P3qPV64mIRNHqGb5LC%2FjxzEhHL2vxvuejzIVATtJaN8eZTFSFih6u1lbflMrRCBwirfu4DGV0ePak9z%2BlRW0u3cgF%2FSR3%2BcXqpdnfK62EJ53nANvk%2FbKaipq72IPHokrnFLpVUXQ5Po4rN6B%2BIiRsDy9kCd1XZZg%3D%3D; d-s=1670794001; lc=1670794001");
  myHeaders.append("origin", "https://app.slack.com");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"");
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-site");
  myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36");

  var formdata = new FormData();
  formdata.append("token", "xoxc-4502394662036-4523637168656-4485527954935-39b52cabd5087d62e5126985c6f04a7380e6ed4ea74d105b44fed5e0007368d9");
  formdata.append("channel", "D04F2GV46RX");
  formdata.append("ts", "1670796156.xxxxx6");
  formdata.append("type", "message");
  formdata.append("xArgs", "{\"draft_id\":\"4e420122-a3e4-439f-b22d-b047997db23c\"}");
  formdata.append("unfurl", "[]");
  formdata.append("blocks", "[{\"type\":\"rich_text\",\"elements\":[{\"type\":\"rich_text_section\",\"elements\":[{\"type\":\"text\",\"text\":\"POSTTEST-REACT\"}]}]}]");
  formdata.append("draft_id", "4e420122-a3e4-439f-b22d-b047997db51b");
  formdata.append("include_channel_perm_error", "true");
  formdata.append("client_msg_id", "6c679141-fc59-49b0-b95b-95acd36106g9");
  formdata.append("_x_reason", "webapp_message_send");
  formdata.append("_x_mode", "online");
  formdata.append("_x_sonic", "true");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    mode: 'no-cors',
    redirect: 'follow'
  };

  fetch("https://techpeople-world.slack.com/api/chat.postMessage?_x_id=bfbcb3c9-1670796321.123&_x_csid=EVNC9YWuqnU&slack_route=T04ESBLKG12&_x_version_ts=1670693848&_x_gantry=true&fp=1c", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const Homepage = () => {
  const [message, setMessage] = useState("");

  return <main style={{
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }}>
    <h1 style={{ margin: 0 }}>Slack Magic</h1>
    <input type="text" onChange={(e) => { setMessage(e.target.value) }} />
    <button
      style={{
        cursor: "pointer"
      }}
      onClick={() => {
        sendSlackMessage(message)
      }}>SEND MESSAGE</button>
  </main>
}

export default Homepage;