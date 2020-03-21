<?php

function redirect($http = false)
{

  if ($http) $redirect = $http;
  else $redirect = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : DOMEN;
  header("Location: $redirect");
  exit;
}

function msg($type, $message)
{

  $language = require CONF.'ini/language.php';

  $msg = '';

  if ($type == 0 or $type == 'error') {

    $msg = $language['error'][$message];

  } elseif ($type == 1 or $type == 'success') {
    $msg = $language['success'][$message];
  }

  return $msg;
}


function pr6($arr = null)
{
    echo '<pre>' . print_r($arr, true) . '</pre>';
}

function pr7($arr = null)
{
    echo '<pre>' . print_r($arr, true) . '</pre>';
    exit;
}

function pr1($arr = null)
{
  dump($arr);

  //echo '<pre style="font-size: 18px;font-weight: bold;font-family: Tahoma">' . htmlspecialchars( print_r($arr, true) ). '</pre>';
  exit;
}

function pr($arr = null)
{

  dump($arr);
  //echo '<pre style="font-size: 18px;font-weight: bold;font-family: Tahoma">' . htmlspecialchars( print_r($arr, true) ). '</pre>';
}

function pr2($arr = null)
{
    echo '<pre>' , var_dump($arr) , '</pre>';
}

function pr3($arr = null)
{
    echo '<pre>' , var_dump($arr) , '</pre>';
    exit;
}

function varName( $v = null ) {

    if(!$v) return false;

    $trace = debug_backtrace();



    $vLine = file( __FILE__ );
    $fLine = $vLine[ $trace[0]['line'] - 1 ];


    preg_match( "#\\$(\w+)#", $fLine, $match );

    pr1($match);
}

