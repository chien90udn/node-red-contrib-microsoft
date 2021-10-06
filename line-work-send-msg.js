module.exports = function (RED) {
  function LineWorkSendMessge(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg) {
      // msg.payload = msg.payload.events[0].replyToken;
      // msg.replyToken = msg.payload.events[0].replyToken;
      let roomId = config.roomid;
      let apiId = config.apiid;
      let botId = config.botid;
      let message = config.message;
      let consumerKey = config.consumerkey;
      let token = config.token;
      let url = `https://apis.worksmobile.com/r/${apiId}/message/v1/bot/${botId}/message/push`;
      msg.url = url;
      msg.headers = {
        consumerKey,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      msg.payload = {
        roomId,
        "content": {
          "type": "text",
          "text": message
        }
      };
      node.send(msg);
    });
  }
  RED.nodes.registerType("line-work-send-msg", LineWorkSendMessge);
};
