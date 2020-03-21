<?php

use Spatie\Image\Image;

session_start();
define('CACHE','upload/');

if(isset($_POST)){
  if(isset($_POST['upload'])){

    $poster = $_POST['upload'];

    if(!empty($poster)){
      //code

      // Получаем расширение файла
      $mime = 'jpg';

      // Выделим данные
      $data = explode(',', $poster);

      // Декодируем данные, закодированные алгоритмом MIME base64
      $encodedData = str_replace(' ', '+', $data[1]);
      $decodedData = base64_decode($encodedData);

      // Вы можете использовать данное имя файла, или создать произвольное имя.
      // Мы будем создавать произвольное имя!
      $randomName = substr_replace(sha1(microtime(true)), '', 12) . '.' . $mime;

      // Создадим папку если её нет
      if (!is_dir(CACHE)) {
        if (!mkdir(CACHE)) {
          exit('не удалось создать папку');
        }
      }
      if (!chmod(CACHE, 0777)) {
        exit('не удалось задать права 0777');
      }


      // Создаем изображение на сервере
      if (file_put_contents(CACHE .'/'. $randomName, $decodedData)) {

        //Image::load(CACHE .'/'. $randomName)->optimize()->save();

        return $randomName;

      } else {
        // Показать сообщение об ошибке, если что-то пойдет не так.
        return false;
      }

    }else{
      $_SESSION['error'] = 'poster not found';
      return false;
    }

  }
}

