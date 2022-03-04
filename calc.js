var human_form_names = {
  symbol_count: "Количество букв, шт",
  symbol_height: "Высота букв, см",
  light_type: "Тип подсветки",
  face_color: "Цвет корпуса букв Лицо",
  side_color: "Цвет корпуса букв Борт",
  is_non_standart_font: "Cложный шрифт или шрифт с засечками",
  need_installation: "Нужен монтаж"
};

$(document).ready(function() {

  $("#isLogo").click(function() {
    var dyn_field_selector = "#dynLogoSquareInput";
    if ( $(this).is(":checked") ) {
      $(dyn_field_selector).show();
    }
    else {
      $(dyn_field_selector).hide();
    }
  });


  $("#btnCalc").click(function() {
    var form = $('#mainForm').serializeJSON();
    console.log(form);

    // var price_by_light = $('select#inputLightType option[value="' + form.light_type + '"]').data('price');
    var price_by_light = $('select#inputLightType option:selected').data('price');
    var price_face_color = $('select#inputFaceColor option:selected').data('price');
    var price_side_color = $('select#inputSideColor option:selected').data('price');

    var price_font = 0;

    if ( form.is_non_standart_font) {
      if ( form.symbol_height < 21 ) {
        price_font = 8;
      }
      else if ( form.symbol_height >= 21 && form.symbol_height <= 40 ) {
        price_font = 5;
      }
      else if ( form.symbol_height > 40 && form.symbol_height <= 60 ) {
        price_font = 3;
      }
      else {
        console.log("Font is too large, need to calc manually!");
      }
    }

    if (form.symbol_height < 12 ) {
      form.symbol_height = 12;
    }

    var price_frame = (form.symbol_height/100)*1.5*form.symbol_count*1000;
    var price_est = (price_by_light + price_face_color + price_side_color + price_font ) * form.symbol_height * form.symbol_count + price_frame;

    // $("#calcResult").html('<h2>Предварительная стоимость вашей вывески: <b>' + price_est + '</b>₽<h2>');


    var table = $('#calcResultDetailsTable');
    table.empty();
    var tbody = $('<tbody>');
    $.each(human_form_names, function(key, human_field_name) {
      var value = form[key];
      console.log(value);

      if ( value == 'on' ) {
        value = "да "
      }
      if (typeof value === 'undefined') {
        value = "нет"
      }
      tbody.append( $('<tr>').append( $('<td>').text(human_field_name) ).append( $('<td>').text(value) ) );
    });

    if ( $('#deliveryModeCourier').is(':checked') ) {
      tbody.append( $('<tr>').append( $('<td>').text('Доставка') ).append( $('<td>').text( $('#inputDeliveryDate').val() ) ) );
    }

    if ( $('#deliveryModePickup').is(':checked') ) {
      tbody.append( $('<tr>').append( $('<td>').text('Самовывоз') ).append( $('<td>').text( $('#inputDeliveryDate').val() ) ) );
    }

    tbody.append( $('<tr>').append( $('<td>').append('<b>ИТОГО, руб</b>') ).append( $('<td>').append( '<b>'+ price_est + '</b>' ) ) );
    table.append( $('<table>').addClass('table table-bordered').append(tbody) );

    if ( $('#isLogo').is(':checked') ) {
      tbody.append( $('<tr>').append( $('<td>').text('Логотип, м2') ).append( $('<td>').text( $('input#inputLogoSquare').val() ) ) );
      tbody.append( $('<tr>').append( $('<td>') ).append( $('<td>').append("<i>Стоимость логотипа будет расчитана индивидуально</i>") ) );
    }
  });
});
