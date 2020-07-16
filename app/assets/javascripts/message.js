$(function(){
  $(".Form").on("submit",function(e){
    e.preventDefault();
    let formDate = new FormData(this)
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formDate,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
});