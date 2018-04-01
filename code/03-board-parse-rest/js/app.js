// Azat's app, change these values to your own keys
const parseAppID = 'APPLICATION_ID'
const parseRestKey = 'MASTER_KEY'
const apiBase = `http://localhost:1337/parse`

$(document).ready(function(){
  getMessages()
  $('#send').click(function(){
    const $sendButton = $(this)
    $sendButton.html('<img src="img/spinner.gif" width="20"/>')
    const username = $('input[name=username]').val()
    const message = $('input[name=message]').val()
    $.ajax({
      url: `${apiBase}/classes/MessageBoard`,
      headers: {
        'X-Parse-Application-Id': parseAppID,
        'X-Parse-REST-API-Key': parseRestKey
      },
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify({
        'username': username,
        'message': message
      }),
      type: 'POST',
      success: function() {
        console.log('sent')
        getMessages()
        $sendButton.html('SEND')
      },
      error: function() {
        console.log('error')
        $sendButton.html('SEND')
      }
    })
  })
})

function getMessages() {
  $.ajax({
    url: `${apiBase}/classes/MessageBoard?limit=1000`,
    headers: {
      'X-Parse-Application-Id': parseAppID,
      'X-Parse-REST-API-Key': parseRestKey
    },
    contentType: 'application/json',
    dataType: 'json',
    type: 'GET',
    success: (data) => {
      console.log('get')
      updateView(data)
    },
    error: () => {
      console.log('error')
    }
  })
}

function updateView(messages) {
  // messages.results = messages.results.reverse()
  const table = $('.table tbody')
  table.html('')
  $.each(messages.results, (index, value) => {
    const trEl = (`<tr><td>
      ${value.username}
      </td><td>
      ${value.message}
      </td></tr>`)
    table.append(trEl)
  })
  console.log(messages)
}
