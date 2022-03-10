function updateDelivery() {
  $('#delivery_selected').show();

  if ( $('#deliveryModeCourier').is(':checked') ) {
    $('#delivery_mode_selected').html('Доставка');
  }

  if ( $('#deliveryModePickup').is(':checked') ) {
    $('#delivery_mode_selected').html('Самовывоз');
  }

  var delivery_date = new Date( $('#delivery_date').val() );
  var delivery_date_str = delivery_date.getDate() + '/' + ( delivery_date.getMonth() + 1 ) + '/' + delivery_date.getFullYear();
  $('#delivery_date_selected').html( delivery_date_str );
}

function updateLogo() {
  if ( $('#need_logo').is(':checked') ) {
    $('#logo_selected').show();
    $('#delivery_mode_selected').html('Доставка');
  }
  else {
    $('#logo_selected').hide();
  }
}


function updateResultDetailsTable() {
    if ( $('#symbol_height').val() > 60 ) {
      $('#calcResultDetailsTable').hide();
      $('#calcIndividualMsg').show();
    }
    else {
      $('#calcResultDetailsTable').show();
      $('#calcIndividualMsg').hide();
      var updateEls = $('[data-update]');
      updateEls.each(function() {
        var id_name = $(this).data('update');
        var id_val = $('#'+id_name).val();
        if ( $('#'+id_name).attr('type') == 'checkbox' ) {
          $('#'+id_name).is(':checked') ? ( id_val = 'да' ) : ( id_val = 'нет' );
        }
        $(this).html( id_val );
      });
    }
}

function viewColors() {
  $('#face_color_view').removeClass().addClass( $('select#face_color option:selected').data('color-class') );
  $('#side_color_view').removeClass().addClass( $('select#side_color option:selected').data('color-class') );
}

function calc_all() {
    var symbol_height = $('#symbol_height').val();
    var symbols_count = $('#symbols_count').val();
    // get <option data-price values
    var price_by_light   = $('select#light_type option:selected').data('price');
    var price_face_color = $('select#face_color option:selected').data('price');
    var price_side_color = $('select#side_color option:selected').data('price');

    var price_font = 0;

    if ( $('#is_non_standart_font').is(':checked') ) {
      if ( symbol_height < 21 ) {
        price_font = 10;
      }
      else if ( symbol_height >= 21 && symbol_height <= 40 ) {
        price_font = 7;
      }
      else if ( symbol_height > 40 && symbol_height <= 60 ) {
        price_font = 5;
      }
      else {
        console.log("Font is too large, need to calc manually!");
      }
    }

    if (symbol_height < 12 ) {
      symbol_height = 12;
    }

    var price_frame = (symbol_height/100)*1.5*symbols_count*1000;
    var price_est = (price_by_light + price_face_color + price_side_color + price_font ) * symbol_height * symbols_count + price_frame;
    $('#calcResultTotal').html(price_est);
    console.log(price_est);
}

function updateView() {
  updateResultDetailsTable();
  updateDelivery();
  updateLogo();
  viewColors();
  calc_all();
}


$(document).ready(function() {
  var min_date = new Date();
  min_date.setDate(min_date.getDate()+3);
  min_date = min_date.toISOString().slice(0,10);
  $("#delivery_date").attr("min", min_date );
  $("#delivery_date").val( min_date );

  updateView();

  $("#need_logo").click(function() {
    var dyn_field_selector = "#dynLogoSquareInput";
    if ( $(this).is(":checked") ) {
      $(dyn_field_selector).show();
    }
    else {
      $(dyn_field_selector).hide();
    }
  });

  $( "form :input" ).change( function() {
    updateView();
  });
});
