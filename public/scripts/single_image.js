'use strict';
$(document).ready(() => {
  $('#comment').on('submit', (event) => {
    event.preventDefault()

    const escape = (str) => {
      const div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    const id = $('.jumbotron img').attr('id')

    $.ajax({
      method: 'POST',
      url: `/api/images/${id}/comments`,
      data: {comment: $('#commentTextarea').val()}
    })

    $.ajax({
      method: 'GET',
      url: `/api/images/${id}/comments`,
      success: (response) => {
        $('.commentList').html('')
        response.forEach((comment) => {
          $('.commentList').append(`<div class="panel panel-default">
                                      <div class="panel-heading">
                                        <a><strong>${escape(comment.username)}</strong></a> <span class="text-muted">commented 5 days ago</span>
                                      </div>
                                      <div class="panel-body">
                                        ${escape(comment.content)}
                                      </div>
                                    </div>`)
        })
      }
    })

    $('#commentTextarea').val('')
  })

  $('#like').on('click', () => {

    const id = $('.jumbotron img').attr('id')

    $.ajax({
      method: 'POST',
      url: `/api/images/${id}/likes`
    })

    $.ajax({
      method: 'GET',
      url: `/api/images/${id}/likes`,
      success: (response) => {
        $('#likes').text('')
        $('#likes').text(`${response.length} likes`)
      }
    })
  })
})
