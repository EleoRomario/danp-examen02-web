const admin = require("firebase-admin");

function initFirebase() {
    const serviceAccount = require(__dirname +
		"/keys/examen-02-danp-firebase-adminsdk-zloyf-f4ce621870.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

initFirebase();

function sendPushNotification(notification) {
    const message = {
        token: notification.tokenId,
        data: {
            titulo: notification.titulo,
            mensaje: notification.mensaje
        }
    }
    sendMessage(message);
}


module.exports = { sendPushNotification };

function sendMessage(message) {
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        })
}