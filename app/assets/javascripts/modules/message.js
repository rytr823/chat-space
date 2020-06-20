$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="wrapper__chat-main__message-list__messages" data-message-id=${message.id}>
          <div class="wrapper__chat-main__message-list__messages__post-info">
            <div class="wrapper__chat-main__message-list__messages__post-info__message-info">
              <div class="wrapper__chat-main__message-list__messages__post-info__message-info__name">
                ${message.user_name}
              </div>
              <div class="wrapper__chat-main__message-list__messages__post-info__message-info__date">
                ${message.created_at}
              </div>
            </div>
            <div class="wrapper__chat-main__message-list__messages__post-info__message">
              <p class="Message__content">
                ${message.content}
              </p>
              <img class="Message__image" src="${message.image}">
            </div>
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="wrapper__chat-main__message-list__messages" data-message-id=${message.id}>
      <div class="wrapper__chat-main__message-list__messages__post-info">
        <div class="wrapper__chat-main__message-list__messages__post-info__message-info">
          <div class="wrapper__chat-main__message-list__messages__post-info__message-info__name">
            ${message.user_name}
          </div>
          <div class="wrapper__chat-main__message-list__messages__post-info__message-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="wrapper__chat-main__message-list__messages__post-info__message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>
    </div>`
    return html;
    };
  }

  $('.wrapper__chat-main__message-form').on('submit', function(e){
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
    .done(function(data){
      let html = buildHTML(data);
      $('.wrapper__chat-main__message-list').append(html);
      $('.wrapper__chat-main__message-form')[0].reset();
      $('.wrapper__chat-main__message-list').animate({ scrollTop: $('.wrapper__chat-main__message-list')[0].scrollHeight});
      $('.submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit').prop('disabled', false);
    })
  });
});