interface Key {

    name: string;
    keyId: string;
    encryptionAlgorithm: 'RSA-OAEP';

    publicKeyPEM: string;
    privateKeyPEM: string;

}

export {
    Key
};