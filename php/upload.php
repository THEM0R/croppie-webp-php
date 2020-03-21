<?php

require '../init.php';

use Spatie\Image\Image;
use Spatie\Image\Manipulations;

if (isset($_POST)) {
  if (isset($_POST['upload'])) {

    $poster = $_POST['poster'];

    if (!empty($poster)) {
      //code

      // Получаем расширение файла
      $mime = 'jpg';
      //$mime = 'webp';

      // Выделим данные
      $data = explode(',', $poster);

      // Декодируем данные, закодированные алгоритмом MIME base64
      $encodedData = str_replace(' ', '+', $data[1]);
      $decodedData = base64_decode($encodedData);

      // Вы можете использовать данное имя файла, или создать произвольное имя.
      // Мы будем создавать произвольное имя!
      $random = substr_replace(sha1(microtime(true)), '', 12);
      $randomName = $random . '.' . $mime;

      // Создадим папку если её нет
      if (!is_dir(CACHE)) if (!mkdir(CACHE)) exit('не удалось создать папку');
      if (!chmod(CACHE, 0777)) exit ('не удалось задать права 0777');

      // Создаем изображение на сервере
      if (file_put_contents(CACHE . '/' . $randomName, $decodedData)) {


        // https://docs.spatie.be/image/v1/usage/saving-images/#saving-in-a-different-image-format
        Image::load(CACHE . '/' . $randomName)
          ->format(Manipulations::FORMAT_JPG)
          ->optimize()
          ->save();

        Image::load(CACHE . '/' . $randomName)
          ->format(Manipulations::FORMAT_WEBP)
          ->optimize()
          ->save(CACHE . '/' . $random.'.webp');

        $_SESSION['upload'] = 'upload success open upload folder';
        redirect(DOMEN);

      } else {
        $_SESSION['upload'] = 'upload error';
        redirect(DOMEN);
      }

    } else {
      $_SESSION['upload'] = 'poster not found';
      redirect(DOMEN);
    }

  }
}

$_SESSION['upload'] = 'method is not post';
redirect(DOMEN);

