interface Secret {

    encryptionKeyId: string;
    encryptionAlgorithm: 'RSA-OAEP';

    encryptionTimestamp: Date;

    encryptedPayload: string;

}

export default Secret;