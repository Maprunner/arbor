<?php
$f3 = require('./lib/f3/base.php');

$s = $f3->get('SERVER');
if (strpos($s['SERVER_NAME'], 'localhost') !== FALSE) {
  $f3->set('DEBUG', 3);
  error_reporting(E_ALL);
} else {
  $f3->set('DEBUG', 0);
  error_reporting(0);
}
$f3->config('arbor.ini');
$f3->config('arbor-routes.ini');

$db = new DB\SQL($f3->get('db.type').':'.$f3->get('db.file'));
$f3->set("db.instance", $db);

$f3->run();