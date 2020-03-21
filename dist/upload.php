<?php
session_start();


if(isset($_POST)){
  if(isset($_POST['upload'])){

    $poster = $_POST['upload'];

    if(!empty($poster)){
      //code
    }else{
      $_SESSION['error'] = 'poster not found';
      return false;
    }

  }
}

