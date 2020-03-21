<?php
require 'init.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Croppie + Webp + Php</title>


  <!-- bootstrap -->
  <link rel="stylesheet" href="public/bootstrap/bootstrap.min.css">
  <!-- bootstrap -->

  <script
    src="https://code.jquery.com/jquery-1.9.1.min.js"
    integrity="sha256-wS9gmOZBqsqWxgIVgA8Y9WcQOa7PgSIX+rPA0VL2rbQ="
    crossorigin="anonymous"></script>

  <link rel="stylesheet" href="public/css/style.css">
  <script src="public/js/app.min.js"></script>

</head>
<body style="min-height: 1000px">

<!-- wrapper -->
<div class="wrapper">

  <div class="container">

    <div class="card-header mb-5">
      <h5>Croppie + Webp + Php</h5>
    </div>

    <!-- form -->
    <form id="form" action="php/upload.php" method="post">

      <center>
        <!-- left -->
        <div class="content">
          <div class="poster window">

            <div class="image">

              <div class="preview"></div>

              <div class="overlay">
                <div id="delete" class="" style="color: white">close</div>
              </div>

              <input type="hidden" name="poster" value="">
            </div>

            <div class="no-image">

              <div id="no-image"></div>

              <div class="link">
                <i class="icon-plus-circled"></i>
              </div>

            </div>

          </div>

          <!-- poster end -->

        </div>
        <!-- left end -->
        <? if (isset($_SESSION['upload']) and $_SESSION['upload'] != ''): ?>
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Well done!</h4>
            <p><? echo $_SESSION['upload']; unset($_SESSION['upload']); ?></p>
          </div>
        <? endif; ?>


        <input type="submit" name="upload" value="upload" class="btn btn-success w-50">

      </center>


    </form>
    <!-- form end -->
  </div>

</div>
<!-- wrapper end -->

<!-- modal -->

<!-- croppie -->

<div id="modal-poster" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Загрузка постера</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="sm">

          <div class="form-group preview">
          </div>

          <div class="form-group text-center">
            <button type="button" class="btn-parsing btn btn-warning w-100">Парсить</button>
          </div>

          <div class="form-group text-center">
            <input type="file" id="btn-upload-file" class="d-none">
            <label for="btn-upload-file" class="btn btn-primary w-100">Выбрать</label>
          </div>

          <div class="form-group">
            <input class="form-control btn-upload-url" type="text" name="url"
                   placeholder="http://site.com/image.jpg">
          </div>

          <div class="form-group error"></div>

        </div>
        <div class="lg">
          <div class="form-group croppie"></div>

          <div class="form-group text-center">
            <button class="croppie-upload btn btn-success w-25 yes">Загрузить</button>
            <button type="button" class="modal-close btn btn-danger w-25 no" data-dismiss="modal">Отменить</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- modal end -->
<script>
  $(function () {
    /*
    jQuery
     */


    /*
    jQuery
     */
  });
</script>

</body>
</html>