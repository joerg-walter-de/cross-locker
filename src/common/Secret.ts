interface Secret {


    encryptionKeyId: string;
    encryptionAlgorithm: 'RSA-OAEP';

    encryptionTimestamp: Date;

    encryptedPayload_base64: string;

    relativeSyncTargetPath: string;

}

//--------------------------------------------------------------------------------------------------

function secretToYaml(secret: Secret): string
{
    const yaml = '';
    return yaml;
}

//--------------------------------------------------------------------------------------------------

function yamlToSecret(yaml: string): Secret | null
{

    return null;
}

//--------------------------------------------------------------------------------------------------

export {
    Secret,
    secretToYaml,
    yamlToSecret
};

//--------------------------------------------------------------------------------------------------
