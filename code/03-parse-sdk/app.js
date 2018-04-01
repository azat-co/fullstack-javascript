$(document).ready(function() {
	
	// You define them when you start the Parse server
	const parseApplicationId = 'APPLICATION_ID'
	const parseJavaScriptKey = 'MASTER_KEY'
	
	//change parseApplicationId and parseJavaScriptKey to values from Parse.com application dashboard
	Parse.initialize(parseApplicationId, parseJavaScriptKey)
	Parse.serverURL = 'http://localhost:1337/parse'

	var Test = Parse.Object.extend('Test')
	var test = new Test()
	var query = new Parse.Query(Test);

	$('.btn-save').click(function(){
		try {
			var data = JSON.parse($('textarea').val())
		} catch (e) {
			alert('Invalid JSON')
		}
		if (!data) return false
		test.save(data, {
	    success: function(object) {
	      console.log('Parse.com object is saved: ', object)
				$('.log').html(JSON.stringify(object, null, 2))
	      //alternatively you could use alert('Parse.com object is saved')
	    },
	    error: function(object) {
	      console.log('Error! Parse.com object is not saved: ', object)
	    }
		})
	})

	$('.btn-get').click(function(){
		query.find({
			success: function(results) {
				$('.log').html(JSON.stringify(results, null, 2))
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});		
	})
})
