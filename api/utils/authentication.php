<?php

function get_authentication_key()
{
    $key = "";

    if (file_exists("key.secret"))
    {
        $key = file_get_contents("key.secret");
    }
    else
    {
        $config = array(
            "digest_alg" => "sha512",
            "private_key_bits" => 4096,
            "private_key_type" => OPENSSL_KEYTYPE_RSA,
        );

        $res =  openssl_pkey_new($config);
        openssl_pkey_export($res, $key);

        file_put_contents("key.secret", $key);
    }

    return $key;
}


function create_authentication_token($userId){
    $content = Array(
        "userId" => $userId,
        "userIp" => $_SERVER['REMOTE_ADDR'],
        "time" => date('Y-m-d H:i:s')
    );

    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-128-CBC'));
    $token = openssl_encrypt(json_encode($content), 'AES-128-CBC', get_authentication_key(), OPENSSL_RAW_DATA, $iv);

    return base64_encode($iv . $token);
}


function decode_authentication_token($token){

    $token = base64_decode($token);

    $iv_size = openssl_cipher_iv_length('AES-128-CBC');
    $iv = substr($token, 0, $iv_size);

    $data = openssl_decrypt(substr($token, $iv_size), 'AES-128-CBC', get_authentication_key(), OPENSSL_RAW_DATA, $iv);

    if ($data) {
        $token = json_decode($data);

        if ($token->userIp != $_SERVER['REMOTE_ADDR'])
        {
            return false;
        }

        return $token->userId;
    }

    return false;
}
