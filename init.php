<?php

require 'vendor/autoload.php';
require 'php/function.php';

use Symfony\Component\Debug\Debug;

Debug::enable();


session_start();
define('CACHE', __DIR__.'/public/upload');
define('CACHE2', __DIR__.'/public/upload/webp');

define('DOMEN','/croppie/');
