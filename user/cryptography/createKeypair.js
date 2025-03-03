const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function genKeyPair() {
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });

    // Create the public key file
    console.log("Saving public key...");
    fs.writeFileSync(path.join(__dirname, '../pub.pem'), keyPair.publicKey);
    // Create the private key file
    console.log("Saving private key...");
    fs.writeFileSync(path.join(__dirname, '../priv.pem'), keyPair.privateKey);
    console.log("Keys generated and saved");
}

genKeyPair();

