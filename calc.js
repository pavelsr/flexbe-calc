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

  var price_frame = (form.symbol_height/100)*1.5*form.symbol_count*1000;
  var price_est = (price_by_light + price_face_color + price_side_color + price_font ) * form.symbol_height * form.symbol_count + price_frame;

  $("#calcResult").html('Предварительная стоимость вашей вывески: <b>' + price_est + '</b>₽');


});
