module.exports = function (RED) {
  const fs = require("fs");

  function MicrosoftCreateTask(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg) {
      var access_token = msg.access_token; 
      var planId = config.planId;
      var title = config.title;
      var startDateTime = config.startDateTime;

      let url = `https://graph.microsoft.com/v1.0/planner/tasks`;
      msg.url = url;
      msg.headers = {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      };
      // accountId prioritized
      msg.payload = {
        "planId": planId,
        "title": title,
        "startDateTime": startDateTime,
        "assignments": {}
      };
      node.send(msg);
        
    });
      
  }
  RED.nodes.registerType("microsoft-create-task", MicrosoftCreateTask);
};
