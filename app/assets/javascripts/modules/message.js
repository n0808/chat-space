$(function(){
  function buildHTML(message){
    if (message.image){
      let html = `<div class="MessageBox" data-message-id=${message.id}>
                    <div class="MessageInfo">
                      <div class="MessageInfo__userName">
                        ${message.user_name}
                      </div>
                      <div class="MessageInfo__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Message">
                      <p class="Message__content">
                        ${message.content}
                      </p>
                      <img class="Message__image" src="${message.image}">
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="MessageBox" data-message-id=${message.id}>
                    <div class="MessageInfo">
                      <div class="MessageInfo__userName">
                        ${message.user_name}
                      </div>
                      <div class="MessageInfo__date">
                        ${message.created_at}
                      </div>
                   </div>
                   <div class="Message">
                      <p class="Message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }
  $('.Form').on('submit',function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      $('.main__contents').append(html);
      $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
      $('.Form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false);
    });
  });
});
