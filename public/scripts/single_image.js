'use strict';
$(document).ready(() => {
  const escape = (str) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $('#comment').on('submit', (event) => {
    event.preventDefault()

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
          if ($('.container').attr('id') == comment.user_id) {
            $('.commentList').append(`<div class="panel panel-default">
                                        <div class="panel-heading">
                                          <a href="/users/${comment.user_id}"><strong>${escape(comment.username)}</strong></a>
                                          <button type="submit" class="btn btn-xs btn-danger remove-comment" id="${escape(comment.id)}">Remove</button>
                                        </div>
                                        <div class="panel-body">
                                          ${escape(comment.content)}
                                        </div>
                                      </div>`)
          } else {
            $('.commentList').append(`<div class="panel panel-default">
                                        <div class="panel-heading">
                                          <a href="/users/${comment.user_id}"><strong>${escape(comment.username)}</strong></a>
                                        </div>
                                        <div class="panel-body">
                                          ${escape(comment.content)}
                                        </div>
                                      </div>`)
          }
        })
      }
    })

    $('#commentTextarea').val('')
  })

  $('#like').on('click', () => {

    const id = $('.jumbotron img').attr('id')

    if ($('#like').text() === "Like") {
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

      $('#like').removeClass('btn-primary').addClass('btn-danger').text('Unlike')

    } else if ($('#like').text() === "Unlike") {

      $.ajax({
        method: 'POST',
        url: `/api/images/${id}/unlike`
      })

      $.ajax({
        method: 'GET',
        url: `/api/images/${id}/likes`,
        success: (response) => {
          $('#likes').text('')
          $('#likes').text(`${response.length} likes`)
        }
      })

      $('#like').removeClass('btn-danger').addClass('btn-primary').text('Like')

    }
  })

  $('.commentList').on('click', '.remove-comment', (event) => {
    const id = $('.jumbotron img').attr('id')

    $.ajax({
      method: 'POST',
      url: `/api/images/${id}/uncomment`,
      data: {commentid: event.target.id}
    })

    $.ajax({
      method: 'GET',
      url: `/api/images/${id}/comments`,
      success: (response) => {
        $('.commentList').html('')

        response.forEach((comment) => {
          if ($('.container').attr('id') == comment.user_id) {
            $('.commentList').append(`<div class="panel panel-default">
                                        <div class="panel-heading">
                                          <a href="/users/${comment.user_id}"><strong>${escape(comment.username)}</strong></a>
                                          <button type="submit" class="btn btn-xs btn-danger remove-comment" id="${escape(comment.id)}">Remove</button>
                                        </div>
                                        <div class="panel-body">
                                          ${escape(comment.content)}
                                        </div>
                                      </div>`)
          } else {
            $('.commentList').append(`<div class="panel panel-default">
                                        <div class="panel-heading">
                                          <a href="/users/${comment.user_id}"><strong>${escape(comment.username)}</strong></a>
                                        </div>
                                        <div class="panel-body">
                                          ${escape(comment.content)}
                                        </div>
                                      </div>`)
          }
        })
      }
    })
  })
})
