const appleData = [
  {
    name: 'fuji',
    url: 'img/fuji.jpg'
  },
  {
    name: 'gala',
    url: 'img/gala.jpg'
  }
]
let app
const router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'apples/:appleName': 'loadApple'
  },
  initialize: function(){
    const apples = new Apples()
    apples.reset(appleData)
    this.homeView = new homeView({collection: apples})
    this.appleView = new appleView({collection: apples})
  },
  home: function(){
    this.homeView.render()
  },
  loadApple: function(appleName){
    this.appleView.loadApple(appleName)
  }
})

$(document).ready(function(){
  app = new router
  Backbone.history.start()
})
