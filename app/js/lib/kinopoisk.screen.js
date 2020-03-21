$(function() {
    // modal
    var modal_selector                = $('#kinopoisk-screen');
    var modal_inputs                  = $('#kinopoisk-screen .inputs');
    var modal_preview                 = $('#kinopoisk-screen .preview');
    var modal_pars_button             = $('#kinopoisk-screen #screen-pars');
    var modal_url_button              = $('#kinopoisk-screen-url');
    var modal_input_button            = $('#kinopoisk-screen-input');
    var modal_croppie                 = $('#kinopoisk-screen-croppie');
    var modal_ajax_result             = $('#kinopoisk-screen .ajax #ajax');
    var modal_ajax                    = $('#kinopoisk-screen .ajax');
    var modal_ajax_two                = $('#kinopoisk-screen .ajax.two');
    var modal                         = $('#kinopoisk-screen.modal');
    // view
    var view_kpid                     = $('[name=kpid]');
    var view_count                    = $('.screens #screens .screen').length;
    var view_add_screen               = $('.screens #add');
    var view_screens                  = $('#screens');
    // action
    if(view_count > 5){
        view_add_screen.hide();
    }else{
        view_add_screen.show();
    }

    view_add_screen.click(function(event) {
        event.preventDefault();
        modal.modal({
            fadeDuration: 250,
            showClose: false
        });
    });
    modal_preview.hide().html('');
    modal_ajax_two.hide();
    modal_croppie.hide();
    // pars
    modal_pars_button.click(function () {

        if( view_kpid.val().length <= 2 ){
            alert('не мение 2 символов!!!')
        }else {


            $.ajax({
                type: 'POST',
                url: '/admin/kinopoisk/film/screen',
                data: {
                    kp_id: view_kpid.val()
                },
                dataType: 'json',
                success: function (response) {

                    var data = response.data;

                    modal_inputs.hide();

                    modal_selector.addClass('modal-900');

                    modal_preview.append(data);

                    modal_preview.show();


                    modal_preview.children('img').click(function () {

                        modal_preview.hide().html('');

                        modal_selector.removeClass('modal-900');

                        var img = $(this);
                        var url = img.attr('src');
                        var format = url.split('.').pop().toLowerCase();

                        if( $.inArray(format, ['gif','png','jpg','jpeg']) == -1 ) {

                            this.val('');
                            alert('Недопустимый формат файла');

                        }else {

                            $.ajax({
                                type: 'POST',
                                url: '/upload/image/url',
                                data: {
                                    url: url
                                },
                                dataType: 'json',
                                success: function (response) {

                                    if (response.type != 'error') {

                                        modal_croppie.croppie('bind', {
                                            url: response.data
                                        }).then(function(){
                                            console.log('jQuery bind complete');
                                        });

                                        modal_selector.addClass('modal-900');

                                        modal_inputs.hide();

                                        modal_ajax_two.show();

                                        modal_ajax_two.addClass('url');

                                        modal_croppie.show();

                                    }else{

                                    }
                                }
                            });

                            $(this).val('');
                        }

                    });

                }
            });



        }

    });
    // url
    modal_url_button.change(function () {

        var url = $(this).val();

        var format = url.split('.').pop().toLowerCase();

        if( $.inArray(format, ['gif','png','jpg','jpeg']) == -1 ) {

            this.val('');
            alert('Недопустимый формат файла');

        }else {

            $.ajax({
                type: 'POST',
                url: '/upload/image/url',
                data: {
                    url: url
                },
                dataType: 'json',
                success: function (response) {

                    if (response.type != 'error') {

                        modal_croppie.croppie('bind', {
                            url: response.data
                        }).then(function(){
                            console.log('jQuery bind complete');
                        });

                        modal_selector.addClass('modal-900');

                        modal_inputs.hide();

                        modal_ajax.show();

                        modal_ajax.addClass('url');

                        modal_croppie.show();

                    }else{

                    }
                }
            });

            $(this).val('');
        }



    });
    // input
    modal_input_button.change(function () {

        var file = this.files[0];
        var format = file.name.split('.').pop().toLowerCase();

        if( $.inArray(format, ['gif','png','jpg','jpeg']) == -1 ) {

            this.val('');
            alert('Недопустимый формат файла');

        }else {
            var reader = new FileReader();

            reader.onload = function (e) {

                modal_croppie.croppie('bind', {
                    url: e.target.result
                }).then(function(){
                    console.log('jQuery bind complete');
                });

                modal_selector.addClass('modal-900');

                modal_inputs.hide();

                modal_ajax.show();

                modal_croppie.show();

            };

            reader.readAsDataURL(file);
        }

    });
    // ajax
    modal_ajax_result.click(function () {

        modal_croppie.croppie('result', {

            type: 'base64',
            size: 'viewport',
            format: 'jpeg'

        }).then(function (resp) {

            $(".screens #screens")
                .append('<div class="screen">' +
                    '<input name="screen[]" type="hidden" value="'+resp+'">' +
                    '<div class="preview" style="background-image: url('+resp+');"></div>' +
                    '<div class="overlay"><div id="delete" class="icon-cancel-2"></div></div></div>');

            var count = $('.screens #screens .screen').length;

            if(count > 5){
                view_add_screen.hide();
            }else{
                view_add_screen.show();
            }

            modal_input_button.val('');
            modal_croppie.children().children('img').attr('src','');

            modal_selector.removeClass('modal-900');

            modal_inputs.show();

            modal_ajax.hide();

            modal_croppie.hide();

            $.modal.close();


            $('.screen .overlay #delete').click(function(){

                $(this).parent().parent().remove();

                var count = $('.screens #screens .screen').length;

                if(count > 5){
                    view_add_screen.hide();
                }else{
                    view_add_screen.show();
                }

            });

        });
    });
    // others

    $('.screen .overlay #delete').click(function(){

        $(this).parent().parent().remove();

        var count = $('.screens #screens .screen').length;

        if(count > 5){
            view_add_screen.hide();
        }else{
            view_add_screen.show();
        }

    });

    $('.screen .preview').mouseover(function () {
        $('.screen .overlay').css({'opacity':'1'});
    });
    $('.screen .preview').mouseout(function () {
        $('.screen .overlay').css({'opacity':'0'});
    });
    $('.screen .overlay').mouseover(function () {
        $(this).css({'opacity':'1'});
    });
    $('.screen .overlay').mouseout(function () {
        $(this).css({'opacity':'0'});
    });

    modal_selector.on($.modal.CLOSE,function () {

        modal_input_button.val('');
        modal_croppie.children().children('img').attr('src','');
        modal_croppie.hide();
        modal_inputs.show();
        modal_ajax.hide();

        modal_preview.hide().html('');

        modal_selector.removeClass('modal-900');

    });

    $('#screen .ajax #no').click(function(){
        $.modal.close();
    });

    modal_croppie.croppie({

        enableExif: true,
        viewport: {
            width: 800,
            height: 330,
            type: 'canvas'
        },
        boundary: {
            width: 820,
            height: 350
        }

    });
});