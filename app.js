'use strict';

const express = require("express");
const Notification = require("./notifications.js")
const GenerateToken = require("./generateToken.js") 

const app = express();
const PORT = process.env.PORT || 3000;

GenerateToken.getAccessToken()
    .then((token) => console.log("This token expires in 1 hour: " + token))
    .catch((err) => console.log("Error: ", err))


app.get("/notificacion", function(req, res) {
    res.send("Notificacion enviada...");
    const data = {
		tokenId:
			"ffudtpLQS3KDZbNjquSTHH:APA91bF-3lOO2NRYJ1dpI4jTlJ0AlmBO6vF_k8X0mRiRLofYphtUjwEewniYn6ajaduSpc5pbjTtWdgLeiEsIb79_uV8bZcnvQBMty9yHMiBVV2GR8NRLig2s_bOs9TXwY-FAJUeVbhM",
		titulo: "Accidente",
		mensaje: "Se ha detectado un accidente de trafico en la zona",
	};
    Notification.sendPushToOneUser(data);
});

app.get("/topic", function(req, res) {
    res.send("Sending Notification to a Topic...");
    const data = {
        topic: "test",
        titulo: "prueba",
        mensaje: "Message from Nodejs to Topic test"
    }
    Notification.sendPushToTopic(data);
});

app.get("/", function(req, res) {
    res.send("Success")
});

app.listen(PORT, () => {
    console.log("Server started on port 3000");
});