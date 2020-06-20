$(function () {
  function buildHTML(message) {
    if (message.image) {
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

  let reloadMessages = function () {
    let last_message_id = $('.wrapper__chat-main__message-list__messages__post-info:last').data('message-id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
      .done(function (messages) {
        if (messages.length !== 0) {
          let insertHTML = '';
          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message)
          });
          $('.wrapper__chat-main__message-list').append(insertHTML);
          $('.wrapper__chat-main__message-list').animate({ scrollTop: $('.wrapper__chat-main__message-list')[0].scrollHeight });
        }
      })
      .fail(function () {
        alert('error');
      });
  };
  setInterval(reloadMessages, 15000);
});