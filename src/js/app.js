// $(() => {
//   $('#select1').change(function() {
//     if ($(this).data('options') === undefined) {
//       /*Taking an array of all options-2 and kind of embedding it on the select1*/
//       $(this).data('options', $('#select2 option').clone());
//     }
//     var id = $(this).val();
//     var options = $(this).data('options').filter('[value=' + id + ']');
//     $('#select2').html(options);
//   });
// });


$(() => {
  $('#category').change(function() {
    if ($(this).data('options') === undefined) {
      /*Taking an array of all options-2 and kind of embedding it on the select1*/
      $(this).data('options', $('#name option').clone());
    }
    var id = $(this).val();
    var options = $(this).data('options').filter('[class=' + id + ']');
    $('#name').html(options);
  });
});
