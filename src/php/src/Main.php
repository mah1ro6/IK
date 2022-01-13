<?php

require_once('vendor/autoload.php');

Dotenv\Dotenv::createImmutable(__DIR__)->load();

$client = new \Microcms\Client(
  "ikgroup",
  $_ENV["X_MICROCMS_API_KEY"]
);

// $result = $client->list("wine");
$result = $client->delete("wine", "zc_-ddpcsr");
var_dump($result);