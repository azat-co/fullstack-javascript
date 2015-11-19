/*
Rapid Prototyping with JS is a JavaScript and Node.js book that will teach you how to build mobile and web apps fast. — Read more at
http://rapidprototypingwithjs.com.
*/

// var URL = 'http://localhost:5000/'
var URL ='http://your-app-name.herokuapp.com/'

require([
	'libs/text!header.html',
	'libs/text!home.html',
	'libs/text!footer.html'],
	function (
		headerTpl,
		homeTpl,
		footerTpl) {

	var ApplicationRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'*actions': 'home'
		},
		initialize: function() {
			this.headerView = new HeaderView()
			this.headerView.render()
			this.footerView = new FooterView()
			this.footerView.render()
		},
		home: function() {
			this.homeView = new HomeView()
			this.homeView.render()
		}
	})

	HeaderView = Backbone.View.extend({
		el: '#header',
		templateFileName: 'header.html',
		template: headerTpl,
		initialize: function() {
		},
		render: function() {
			$(this.el).html(_.template(this.template))
		}
	})

	FooterView = Backbone.View.extend({
		el: '#footer',
		template: footerTpl,
		render: function() {
			this.$el.html(_.template(this.template))
		}
	})
	Message = Backbone.Model.extend({
		url: URL + 'messages/create.json'
	})
	MessageBoard = Backbone.Collection.extend ({
		model: Message,
		url: URL + 'messages/list.json'
	})

	HomeView = Backbone.View.extend({
		el: '#content',
		template: homeTpl,
		events: {
			'click #send': 'saveMessage'
		},

		initialize: function() {
			this.collection = new MessageBoard()
			this.collection.bind('all', this.render, this)
			this.collection.fetch()
			this.collection.on('add', function(message) {
				message.save(null, {
					success: function(message) {
						console.log('saved '+message)
					},
					error: function(message) {
						console.log('error')
					}
				})
				console.log('saved'+message)
			})
		},
		saveMessage: function(){
			var newMessageForm=$('#new-message')
			var username=newMessageForm.find('[name="username"]').val()
			var message=newMessageForm.find('[name="message"]').val()
			this.collection.add({
				'username': username,
				'message': message
				})
		},
		render: function() {
			console.log(this.collection)
			$(this.el).html(_.template(this.template, this.collection))
		}
	})

	app = new ApplicationRouter()
	Backbone.history.start()
})
