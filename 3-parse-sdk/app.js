$(document).ready(function() {
	var parseApplicationId = 'GET-YOUR-KEYS-AT-PARSE.COM'
	var parseJavaScriptKey = 'GET-YOUR-KEYS-AT-PARSE.COM'

	// Azat's app, please don't use it! Get your own keys at Parse.com

	parseApplicationId = 'Zc36GIp6WyzKIB9HvqRBEGnIeMO0X21rDbVwGPvp'
	parseJavaScriptKey = 'r5zTZ9eydAcnRhAUI6k3XazS1JSnOPLbiaT1cWY6'

	//change parseApplicationId and parseJavaScriptKey to values from Parse.com application dashboard
	Parse.initialize(parseApplicationId, parseJavaScriptKey)

	var Test = Parse.Object.extend('Test')
	var test = new Test()
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

})
