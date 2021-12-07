interface Key {

    name: string;
    keyId: string;
    type: 'aes' | 'rsa';

    publicKeyPEM: string;
    privateKeyPEM: string;

}

export {
    Key
};