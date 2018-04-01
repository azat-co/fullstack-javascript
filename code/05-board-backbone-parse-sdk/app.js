require([
	'libs/text!header.html',
	'libs/text!home.html',
	'libs/text!footer.html'], function (
		headerTpl,
		homeTpl,
		footerTpl) {
	

	// Define them when you start the Parse server
	const parseAppID = 'APPLICATION_ID'
	const parseMasterKey = 'MASTER_KEY'
	const apiBase = `http://localhost:1337/parse`

	Parse.initialize(parseAppID, parseMasterKey)
	Parse.serverURL = apiBase
	
	const ApplicationRouter = Backbone.Router.extend({
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

	const HeaderView = Backbone.View.extend({
		el: '#header',
		templateFileName: 'header.html',
		template: headerTpl,
		initialize: function() {
		},
		render: function() {
			$(this.el).html(_.template(this.template))
		}
	})

	const FooterView = Backbone.View.extend({
		el: '#footer',
		template: footerTpl,
		render: function() {
			this.$el.html(_.template(this.template))
		}
	})
	const Message = Parse.Object.extend({
		className: 'MessageBoard'
	})
	const MessageBoard = Parse.Collection.extend ({
		model: Message
	})

	const HomeView = Backbone.View.extend({
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
						console.log('saved ' + message)
					},
					error: function(message) {
						console.log('error')
					}
				})
				console.log('saved' + message)
			})
		},
		saveMessage: function(){
			const newMessageForm = $('#new-message')
			const username = newMessageForm.find('[name="username"]').val()
			const message = newMessageForm.find('[name="message"]').val()
			this.collection.add({
				'username': username,
				'message': message
				})
		},
		render: function() {
		  $(this.el).html(_.template(this.template)(this.collection))
		}
	})

	window.app = new ApplicationRouter()
	Backbone.history.start()
})
