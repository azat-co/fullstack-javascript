define([    
  'apple.tpl',
  'apple-spinner.tpl'
],function(appleTpl,appleSpinnerTpl){
  return  Backbone.View.extend({
    initialize: function(){
      this.model = new (Backbone.Model.extend({}));
      this.model.on('change', this.render, this);
      this.on('spinner',this.showSpinner, this);
    },
    template: _.template(appleTpl),
    templateSpinner: appleSpinnerTpl,

    loadApple:function(appleName){
      this.trigger('spinner');
      var view = this; //we'll need to access that inside of a closure
      setTimeout(function(){ //simulates real time lag when fetching data from the remote server
        view.model.set(view.collection.where({name:appleName})[0].attributes);  
      },1000);
      
    },

    render: function(appleName){
      var appleHtml = this.template(this.model);
      $('body').html(appleHtml);
    },
    showSpinner: function(){
      $('body').html(this.templateSpinner);        
    }

  });
});