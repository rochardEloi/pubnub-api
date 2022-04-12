const PubNub = require("pubnub");
const uuid = require("uuid")

let pubnub = []
/* const pubnub = new PubNub({
  publishKey: "pub-c-403be690-b51f-4f75-aa60-0cd7a00b6721",
  subscribeKey: "sub-c-065bb750-b755-11ec-8697-fe86d55faee6",
  uuid: uuid.v4(),
});



pubnub.addListener({
   status: function (statusEvent) {
     //console.log(statusEvent)
    if (statusEvent.category !== "PNConnectedCategory") {
      publishSampleMessage();
    } 
  },
  message: function (messageEvent) { 
   // console.log(messageEvent.message.title);
   // console.log(messageEvent.message.description);
   console.log(messageEvent)
  },
  presence: function (presenceEvent) {
    // handle presence
    console.log(presenceEvent)
  },
});
console.log("Subscribing..");

pubnub.subscribe({
  channels: ["my_test_channel"],
}); */


exports.listenner = (req,res) => {

  if(pubnub[req.body.subKey])
    return res.send({message : "ok"})
  

  pubnub[req.body.subKey] = new PubNub({
    publishKey: "pub-c-403be690-b51f-4f75-aa60-0cd7a00b6721",
    subscribeKey: req.body.subKey,
    uuid: uuid.v4(),
  });
  
  
  
  pubnub[req.body.subKey].addListener({
     status: function (statusEvent) {
       //console.log(statusEvent)
      if (statusEvent.category !== "PNConnectedCategory") {
        publishSampleMessage();
      } 
    },
    message: function (messageEvent) { 
     // console.log(messageEvent.message.title);
     // console.log(messageEvent.message.description);
     console.log(messageEvent)
    },
    presence: function (presenceEvent) { 
      // handle presence
      console.log(presenceEvent)
    },
  });
  console.log("Subscribing..");
  
  pubnub[req.body.subKey].subscribe({
    channels: [req.body.channel],
  });
  
  res.send({message : "ok"})
}
 

exports.sendMessage = async (req, res) => {
        console.log(
          "Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish."
        );
        const result = await pubnub.publish({
          channel: req.body.channel,
          message: {
            title: req.body.title,
            description: req.body.message,
          },
        });
        console.log(result);
        res.send(result);
}
