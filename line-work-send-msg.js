module.exports = function (RED) {
  function LineWorkSendMessge(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg) {
      let roomId = config.roomid;
      let apiId = config.apiid;
      let botId = config.botid;
      let message = msg.payload;
      let accountId = config.accountid;
      let consumerKey = config.consumerkey;
      let token = config.token;
      let url = `https://apis.worksmobile.com/r/${apiId}/message/v1/bot/${botId}/message/push`;
      msg.url = url;
      msg.headers = {
        consumerKey,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      // check position send message
      // accountId prioritized
      if(accountId){
        msg.payload = {
          accountId,
          "content": {
            "type": "text",
            "text": message
          }
        };
      }else{
        msg.payload = {
          roomId,
          "content": {
            "type": "text",
            "text": message
          }
        };
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("line-work-send-msg", LineWorkSendMessge);
};
