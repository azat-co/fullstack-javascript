var parseID="your-parse-app-id";
var parseKey="your-rest-api-key";

// Azat's app, change these values to your own keys
parseID="Zc36GIp6WyzKIB9HvqRBEGnIeMO0X21rDbVwGPvp";
parseKey="1LKZVd4KG6PFpldvCha5RDY8Z5EZeJhy2Bl4vgJ3";

$(document).ready(function(){
	getMessages();
	$("#send").click(function(){
		var username = $("input[name=username]").val();
		var message = $("input[name=message]").val();
		$.ajax({
			url: " https://api.parse.com/1/classes/MessageBoard",
			headers: {
				"X-Parse-Application-Id": parseID,
				"X-Parse-REST-API-Key": parseKey
			},
			contentType: "application/json",
			dataType: "json",
			processData: false,
			data: JSON.stringify({
				"username": username,
				"message": message
			}),
			type: 'POST',
			success: function() {
				console.log("sent");
				getMessages();
			},
			error: function() {
				console.log("error");
			}
		});

	});
})
function getMessages() {
	$.ajax({
		url: " https://api.parse.com/1/classes/MessageBoard?limit=1000",
		headers: {
			"X-Parse-Application-Id": parseID,
			"X-Parse-REST-API-Key": parseKey
		},
		contentType: "application/json",
		dataType: "json",
		type: 'GET',
		success: function(data) {
			console.log("get");
			updateView(data);
		},
		error: function() {
			console.log("error");
		}
	});
}

function updateView(messages) {
	// messages.results = messages.results.reverse()
	var table=$(".table tbody");
	table.html('');
	$.each(messages.results, function (index, value) {
		var trEl=('<tr><td>'+value.username+'</td><td>'+value.message+'</td></tr>');
		table.append(trEl);
	});

	console.log(messages);
}
