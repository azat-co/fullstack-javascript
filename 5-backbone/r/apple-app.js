requirejs.config({
  urlArgs: "bust=" +  (new Date()).getTime()
}); 
  require([
    'apple-item.tpl', //shim, change to test files
    'apple-home.tpl',
    'apple-spinner.tpl',
    'apple.tpl',
    'apple-item.view',
    'apple-home.view',
    'apple.view',
    'apples'  
  ],function(
    appleItemTpl,
    appleHomeTpl,
    appleSpinnerTpl,
    appleTpl,
    appelItemView,
    homeView,
    appleView,
    Apples
    ){
   var appleData = [
      {
        name: "fuji",
        url: "img/fuji.jpg"
      },
      {
        name: "gala",
        url: "img/gala.jpg"
      }      
    ];
    var app;
    var router = Backbone.Router.extend({ //check if need to be required
      routes: {
        '': 'home',
        'apples/:appleName': 'loadApple'
      },
      initialize: function(){
        var apples = new Apples();
        apples.reset(appleData);
        this.homeView = new homeView({collection: apples});
        this.appleView = new appleView({collection: apples});
      },
      home: function(){        
        this.homeView.render();
      },
      loadApple: function(appleName){
        this.appleView.loadApple(appleName);

      }
    });

    $(document).ready(function(){
      app = new router;
      Backbone.history.start();      
    })
});    