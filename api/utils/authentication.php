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
        "time" => date('Y-m-d H:i:s')
    );

    $token = openssl_encrypt(json_encode($content), 'aes128', get_authentication_key());

    return $token;
}


function decode_authentication_token($token){
    $data = openssl_decrypt($token, 'aes128', get_authentication_key());

    if ($data){
        $userId = json_decode()["userId"];
    }

    return -1;
}
