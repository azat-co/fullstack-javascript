define(['apple-home.tpl','apple-item.view'],function(appleHomeTpl,appleItemView){
return  Backbone.View.extend({
      el: 'body',
      listEl: '.apples-list',
      cartEl: '.cart-box',
      template: _.template(appleHomeTpl),
      initialize: function() {
        this.$el.html(this.template);
        this.collection.on('addToCart', this.showCart, this);
      },
      showCart: function(appleModel) {
        $(this.cartEl).append(appleModel.attributes.name+'<br/>');
      },      
      render: function(){
        view = this; //so we can use view inside of closure
        this.collection.each(function(apple){
          var appleSubView = new appleItemView({model:apple}); // create subview with model apple
          appleSubView.render(); // compiles tempalte and single apple data
          $(view.listEl).append(appleSubView.$el);   //append jQuery object from single apple to apples-list DOM element
        });
      }


    });
})
