$(document).ready(function() {
  
  // You define them when you start the Parse server
  const parseApplicationId = 'APPLICATION_ID'
  const parseJavaScriptKey = 'MASTER_KEY'
  
  Parse.initialize(parseApplicationId, parseJavaScriptKey)
  Parse.serverURL = 'http://localhost:1337/parse'

  const Test = Parse.Object.extend('Test')
  const test = new Test()
  const query = new Parse.Query(Test)

  $('.btn-save').click(function(){
    let data
    try {
       data = JSON.parse($('textarea').val())
    } catch (e) {
      alert('Invalid JSON')
    }
    if (!data) return false
    test.save(data, {
    success: (result) => {
      console.log('Parse.com object is saved: ', result)
      $('.log').html(JSON.stringify(result, null, 2))
      //alternatively you could use alert('Parse object is saved')
    },
    error: (error) => {
      console.log(`Error! Parse.com object is not saved: ${error}`)
    }
    })
  })

  $('.btn-get').click(function(){
    query.find({
      success: function(results) {
        $('.log').html(JSON.stringify(results, null, 2))
      },
      error: function(error) {
        alert(`Error: ${error.code} ${error.message}`)
      }
    })
  })

})
