CHAPTER 4
---------

Intro to Backbone.js
====================

> *Code is not an asset. It's a liability. The more you write, the more
> you'll have to maintain later.*
>
> — Unknown

This chapter will demonstrate:

-   Setting up a Backbone.js app from scratch and installing
    dependencies
-   Working with Backbone.js collections
-   Backbone.js event binding
-   Backbone.js views and subviews with Underscore.js
-   Refactoring Backbone.js code
-   AMD and Require.js for Backbone.js development
-   Require.js for Backbone.js production
-   A simple Backbone.js starter kit

Backbone.js has been around for a while so it's very mature and can be trusted to be used in serious front-end development projects. This framework is decidedly minimalistic and un-opinionated. You can use Backbone.js with a lot of other libraries and modules. I think of Backbone.js as the foundation to build a custom framework that will be tightly suited to your particular use case.

Some people are turned off by the fact that Backbone.js is un-opinionated and minimalistic. They prefer frameworks that do more for them and enforce a particular way of doing things (e.g., the Angular's best practices <https://github.com/johnpapa/angular-styleguide>). This is totally fine with me, and you can pursue the study of a more complex front-end framework. They all fit nicely into the Node.js stack and the ecosystem. For the purpose of this book, Backbone.js is ideal because it provides some much needed sanity to the plain non-framework jQuery code, and at the same time it doesn't have a steep learning curve. All you need to know is a few classes and methods, which we cover in this book. Everything else is JavaScript, not a domain-specific language.

Setting Up a Backbone.js App from Scratch
=======================================

We're going to build a typical starter Hello World application using Backbone.js and Model-View-Controller (MVC) architecture. It might sound like overkill in the beginning, but as we go along we'll add more and more complexity, including models, subviews, and collections.

Full source code for the Hello World app is available under `code/04-backbone/hello-world` and on GitHub at <http://bit.ly/2LgXOVp>.

Backbone.js Dependencies
------------------------

Download the following libraries:

-   jQuery development source file: <http://code.jquery.com>
-   Underscore.js development source file: <http://underscorejs.org/underscore.js>
-   Backbone.js development source file: <http://backbonejs.org/backbone.js>

Obviously by the time this book is in print, these versions won't be the most recent. I recommend sticking with the versions in this book, because that's what I used to test all the examples and projects. Using different, newer versions might cause some unexpected conflicts.

Create an `index.html` file, and include these frameworks in this file like this:

```html
<!DOCTYPE>
<html>
<head>
  <script src="jquery.js"></script>
  <script src="underscore.js"></script>
  <script src="backbone.js"></script>

  <script>
    // TODO write some awesome JS code!
  </script>

</head>
<body>
</body>
</html>
```

We can also put `<script>` tags right before the `</body>` tag at the end of the file. This will change the order in which scripts and the rest of the HTML is loaded, and affect performance in large files.

Let's define an empty Backbone.js router object  `router` inside of a `<script>` tag using the `extend()`:

```js
// ...
const router = Backbone.Router.extend({
})
// ...
```

For now, to keep it simple (KISS-keep it stupid simple), we'll be putting all of our JavaScript code right into the `index.html` file. This is not a good idea for real development or production code, so we'll refactor it later.

Next, set up a special `routes` property inside of an `extend` call:

```js
const router = Backbone.Router.extend({
  routes: {
  }
})
```

The Backbone.js `routes` property needs to be in the following format:

```js
'path/:param':'action'
```

This will result in the `filename#path/param` URL triggering a function named `action` (defined in the `Router` object). For now, we'll add a single `home` route:

```js
const router = Backbone.Router.extend({
  routes: {
    '': 'home'
  }
})
```

This is good, but now we need to add a `home` function:

```js
const router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
  home: function() {
    // TODO render HTML
  }
})
```

We'll come back to the `home` function later to add more logic for creating and rendering of a view (instance of a `View` class in Backbone). Right now we should define our `homeView`:

```js
const homeView = Backbone.View.extend({
})
```

It looks familiar, right? Backbone.js uses similar syntax for all of its components: the `extend` function and a JSON object as a parameter to it.

There are a multiple ways to proceed from now on, but the best practice is to use the `el` and `template` properties, which are special in Backbone.js:

```js
const homeView = Backbone.View.extend({
  el: 'body',
  template: _.template('Hello World')
})
```

The property `el` is just a string that holds the jQuery selector (you can use class name with '.' and id name with '\#'). The `template` property has been assigned an `Underscore.js` function `template` with just a plain text 'Hello World'.

To render our `homeView` we use `this.$el`, which is a compiled jQuery object referencing an element in an `el` property, and the jQuery `.html()` function to replace HTML with the `this.template()` value. Here is what the full code for our Backbone.js View looks like:

```js
const homeView = Backbone.View.extend({
  el: 'body',
  template: _.template('Hello World'),
  render: function() {
    this.$el.html(this.template({}))
  }
})
```

Now, if we go back to the `router` we can add these two lines to the `home` function:

```js
const router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
  initialize: function() {
  },
  home: function() {
    this.homeView = new homeView
    this.homeView.render()
  }
})
```

The first line creates the `homeView` object and assigns it to the `homeView` property of the router object `router`. The second line will call the `render()` method in the `homeView` object, triggering the "Hello World" output.

Finally, to start a Backbone app, we call `new Router` inside of a document-ready wrapper to make sure that the file's DOM is fully loaded:

```js
let app
$(document).ready(function(){
  app = new router
  Backbone.history.start()
})
```

This time, I won't list the full source code of the `index.html` file because it's rather simple.

Open `index.html` in the browser to see if it works; that is, the "Hello World" message should be on the page.

Working with Backbone.js Collections
====================================

The full source code of this example is under `04-backbone/collections`. It's built on top of the "Hello World" example from the "Setting Up a Backbone.js App from Scratch" exercise, which is available for download at [GitHub](https://github.com/azat-co/fullstack-javascript/tree/master/code/04-backbone/collections) (https://github.com/azat-co/fullstack-javascript/tree/master/code/04-backbone/collections).

We should add some data to play around with, and to hydrate our views. To do this, add this right after the `<script>` tag and before the other code:

```js
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
```

This is our apple *database,* or to be more correct, our REST API endpoint substitute, which provides us with names and image URLs of the apples (data models).  Note that this mock data set can be easily substituted by assigning REST API endpoints of your backend to `url` properties in Backbone.js collections, models, or both, and calling the `fetch()` method on them.

Now to make the user experience a little bit better, we can add a new route to the `routes` object in the Backbone `route`:

```js
// ...
routes: {
  '': 'home',
  'apples/:appleName': 'loadApple'
},
// ...
```

This will allow users to go to `index.html#apples/SOMENAME` and expect to see some information about an apple. This information will be fetched and rendered by the `loadApple` function in the Backbone router definition:

```js
loadApple: function(appleName) {
  this.appleView.render(appleName)
}
```

Have you noticed an `appleName` variable? It's exactly the same name as the one that we've used in `route`. This is how we can access query string parameters (e.g., `?param=value&q=search`) in Backbone.js.

Now we'll need to refactor some more code to create a Backbone collection, populate it with data in our `appleData` variable, and pass the collection to `homeView` and `appleView`. Conveniently enough, we do it all in the router constructor method `initialize`:

```js
initialize: function(){
  const apples = new Apples()
  apples.reset(appleData)
  this.homeView = new homeView({collection: apples})
  this.appleView = new appleView({collection: apples})
},
```

At this point, we're pretty much done with the `Router` class and it should look like this:

```js
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
    this.appleView.render(appleName)
  }
})
```

Let's modify our `homeView` a bit to see the whole database:

```js
const homeView = Backbone.View.extend({
  el: 'body',
  template: _.template('Apple data: <%= data %>'),
  render: function(){
    this.$el.html(this.template({data: JSON.stringify(this.collection.models)}))
  }
  // TODO subviews
})
```

For now, we just output the string representation of the JSON object in the browser. This is not user-friendly at all, but later we'll improve it by using a list and subviews.

Our apple Backbone `Collection` `Apples` is very clean and simple:

```js
const Apples = Backbone.Collection.extend({
})
```

Backbone automatically creates models inside of a collection when we use the `fetch()` or `reset()` functions from its API. I find using these functions to be very useful.

`appleView` is not any more complex; it has only two properties: `template` and `render`. In a template, we want to display `figure`, `img`, and `figcaption` tags with specific values. The Underscore.js template engine is handy at this task:

```js
const appleView = Backbone.View.extend({
  template: _.template(
    '<figure>\
        <img src="<%= attributes.url %>"/>\
        <figcaption><%= attributes.name %></figcaption>\
      </figure>'),
  // ...
})
```

To make a JavaScript string that has HTML tags in it more readable, we can use the backslash line breaker escape (`\`) symbol, or close strings and concatenate them with a plus sign (`+`). This is an example of `appleView` introduced earlier, which is refactored using the latter approach:

```js
const appleView = Backbone.View.extend({
  template: _.template(
    '<figure>'+
      +'<img src="<%= attributes.url %>"/>'+
      +'<figcaption><%= attributes.name %></figcaption>'+
    +'</figure>'),
// ...
})
```

Please note the `<%=` and `%>` symbols; they are the instructions for Undescore.js to print values in properties `url` and `name` of the `attributes` object.

Finally, we're adding the `render` function to the `appleView` class.

```js
render: function(appleName) {
```

To get the list of apples filtered by name, there's a `where` method on the `Collection` class. We just need the very first item in that array, and because arrays in JavaScript are zero-based (they start with a 0 rather than 1 index), the syntax to get the apple model by name is this:

```js
const appleModel = this.collection.where({name: appleName})[0]
```

Once we have our model, all we need to do is to pass the model to the template (also called hydrating templates). The result is some HTML that we inject into the `<body>`:

```js
  const appleHtml = this.template(appleModel)
  $('body').html(appleHtml)
}
```

So we find a model within the collection via the `where()` method and use `[]` to pick the first element. Right now, the `render` function is responsible for both loading the data and rendering it. Later we'll refactor the function to separate these two functionalities into different methods.

For your convenience, here's the whole app, which is in the `04-backbone/collections/index.html` file and on GitHub at <http://bit.ly/2Lee1L9>:

```html
<!DOCTYPE>
<html>
<head>
  <script src="jquery.js"></script>
  <script src="underscore.js"></script>
  <script src="backbone.js"></script>

  <script>
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
      home: function() {
        this.homeView.render()
      },
      loadApple: function(appleName) {
        this.appleView.render(appleName)
      }
    })

    const homeView = Backbone.View.extend({
      el: 'body',
      template: _.template('Apple data: <%= data %>'),
      render: function() {
        this.$el.html(this.template({data: JSON.stringify(this.collection.models)}))
      }
    })

    const Apples = Backbone.Collection.extend({

    })
    const appleView = Backbone.View.extend({
      template: _.template('<figure>\
                              <img src="<%= attributes.url%>"/>\
                              <figcaption><%= attributes.name %></figcaption>\
                            </figure>'),
      render: function(appleName) {
        const appleModel = this.collection.where({name: appleName})[0]
        const appleHtml = this.template(appleModel)
        $('body').html(appleHtml)
      }
    })
    $(document).ready(function() {
      app = new router
      Backbone.history.start()
    })

  </script>
</head>
<body>
  <div></div>
</body>
</html>
```

Open the `collections/index.html` file in your browser. You should see the data from our database:

```
Apple data: [{"name":"fuji","url":"img/fuji.jpg"},{"name":"gala","url":"img/gala.jpg"}]
```

Now let's go to `collections/index.html#apples/fuji` or `collections/index.html#apples/gala` in your browser. We expect to see an image with a caption. It's a detailed view of an item, which in this case is an apple. Nice work!

Backbone.js Event Binding
==================================================================================================================================

In real life, getting data does not happen instantaneously, so let's refactor our code to simulate it. For a better user experience (UX), we'll also have to show a loading icon (a spinner or AJAX loader) to users to notify them that the information is being loaded.

It's a good thing that we have event binding in Backbone. Without it, we would have to pass a function that renders HTML as a callback to the data loading function, to make sure that the rendering function is not executed before we have the actual data to display.

Therefore, when a user goes to detailed view (`apples/:id`) we only call the function that loads the data. Then, with the proper event listeners, our view will automagically (this is not a typo) update itself when there is new data (or on a data change; Backbone.js supports multiple and even custom events).

For your information, if you don't feel like typing out the code (which I recommend), it's in the `code/04-backbone/binding/index.html` file and on GitHub at <http://bit.ly/2LhBNpx>.

Let's change the code in the router:

```js
// ...
  loadApple: function(appleName){
    this.appleView.loadApple(appleName)
  }
// ...
```

Everything else remains the same until we get to the `appleView` class. We'll need to add a constructor or an `initialize` method, which is a special word or property in the Backbone.js framework. It's called each time we create an instance of an object, such as `const someObj = new SomeObject()`. We can also pass extra parameters to the `initialize` function, as we did with our views (we passed an object with the key `collection` and the value of `apples` Backbone Collection). Read more on Backbone.js constructors at <http://backbonejs.org/#View-constructor>.

```js
// ...
const appleView = Backbone.View.extend({
  initialize: function(){
    // TODO: create and setup model (aka an apple)
  },
// ...
```

We have our `initialize` function; now we need to create a model that will represent a single apple and set up proper event listeners on the model. We'll use two types of events, `change` and a custom event called `spinner`. To do that, we are going to use the `on()` function, which takes these properties: `on(event, actions, context)`. You can read more about it at <http://backbonejs.org/#Events-on>.

```js
// ...
const appleView = Backbone.View.extend({
  initialize: function(){
    this.model = new (Backbone.Model.extend({}))
    this.model.bind('change', this.render, this)
    this.bind('spinner', this.showSpinner, this)
  },
  // ...
})
// ...
```

The preceding code basically boils down to two simple things:

1.  Call the `render()` function of the `appleView` object when the model has changed.
2.  Call the `showSpinner()` method of the `appleView` object when event `spinner` has been fired.

So far, so good, right? But what about the spinner, a GIF icon? Let's create a new property in `appleView`:

```js
// ...
  templateSpinner: '<img src="img/spinner.gif" width="30"/>',
// ...
```

Remember the `loadApple` call in the router? This is how we can implement the function in `appleView`:

```js
...
loadApple:function(appleName) {
```

To show the spinner GIF image, use `this.trigger` to make Backbone call the `showSpinner`:

```js
  this.trigger('spinner')
```

Next, we'll need to access the context inside of a closure. Sometimes I like to use a meaningful name instead of `_this` or `self`, so:

```js
  const view = this
```

Next, you would have an XHR call (e.g., `$.ajax()`) to the server to get the data. We'll simulate the real time lag when fetching data from the remote server with:

```js
  setTimeout(function() {
    view.model.set(view.collection.where({
      name:appleName
    })[0].attributes)
  }, 1000)
},
// ...
```

The `attributes` is a Backbone.js model property that gives a normal JavaScript object with the model's properties. To summarize, the line with `this.trigger('spinner')` will trigger the `spinner` event. We still have to write the function for this event.

The line `const view = this` after that is just for scoping issues. This give us the ability to use `appleView` inside of the subsequent callbacks/closures. And the `setTimeout` function is simulating a time lag of a real remote server response. Inside of it, we assign attributes of a selected model to our view's model by using a `model.set()` function and a `model.attributes` property (which returns the properties of a model).

Now we can remove extra code from the `render` method and implement the `showSpinner` function:

```js
render: function(appleName) {
  const appleHtml = this.template(this.model)
  $('body').html(appleHtml)
},
showSpinner: function() {
  $('body').html(this.templateSpinner)
}
...
```

That's all! Open `index.html#apples/gala` or `index.html#apples/fuji` in your browser and enjoy the loading animation while waiting for an apple image to load.

Here is the full code of the `index.html` file (also in `04-backbone/binding/index.html` and at <http://bit.ly/2LhBNpx>):

```html
<!DOCTYPE>
<html>
<head>
  <script src="jquery.js"></script>
  <script src="underscore.js"></script>
  <script src="backbone.js"></script>

  <script>
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

    const homeView = Backbone.View.extend({
      el: 'body',
      template: _.template('Apple data: <%= data %>'),
      render: function(){
        this.$el.html(this.template({data: JSON.stringify(this.collection.models)}))
      }
    })

    const Apples = Backbone.Collection.extend({
    })
    const appleView = Backbone.View.extend({
      initialize: function(){
        this.model = new (Backbone.Model.extend({}))
        this.model.on('change', this.render, this)
        this.on('spinner', this.showSpinner, this)
      },
      template: _.template('<figure>\
                              <img src="<%= attributes.url%>"/>\
                              <figcaption><%= attributes.name %></figcaption>\
                            </figure>'),
      templateSpinner: '<img src="img/spinner.gif" width="30"/>',
      loadApple:function(appleName){
        this.trigger('spinner')
        const view = this
        setTimeout(function() {
          view.model.set(view.collection.where({name: appleName})[0].attributes)
        }, 1000)
      },
      render: function(appleName){
        const appleHtml = this.template(this.model)
        $('body').html(appleHtml)
      },
      showSpinner: function(){
        $('body').html(this.templateSpinner)
      }
    })

    $(document).ready(function(){
      app = new router
      Backbone.history.start()
    })

  </script>
</head>
<body>
  <div></div>
</body>
</html>
```

Backbone.js Views and Subviews with Underscore.js
=================================================

The example for this section is available in `code/04-backbone/subview` and at <http://bit.ly/2LhEOWH>.

Subviews are Backbone Views that are created and used inside of another Backbone View. A subviews concept is a great way to abstract (separate) UI events (e.g., clicks), and templates for similarly structured elements (e.g., apples).

A use case of a Subview might include a row in a table, an item in a list, a paragraph, or a new line.

We'll refactor our home page to show a nice list of apples. Each list item will have an apple name and a Buy link with an `onClick` event. Let's start by creating a subview for a single apple with our standard Backbone `extend()` function:

```js
  // ...
  const appleItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template(''
            +'<a href="#apples/<%=name%>" target="_blank">'
          +'<%=name%>'
          +'</a>&nbsp;<a class="add-to-cart" href="#">buy</a>'),
    events: {
      'click .add-to-cart': 'addToCart'
    },
    render: function() {
      this.$el.html(this.template(this.model.attributes))
    },
    addToCart: function() {
      this.model.collection.trigger('addToCart', this.model)
    }
  })
  // ...
```

Now we can populate the object with `tagName`, `template`, `events`, `render`, and `addToCart` properties and methods.

```js
// ...
tagName: 'li',
// ...
```

`tagName` automatically allows Backbone.js to create an HTML element with the specified tag name, in this case `<li>` for list item. This will be a representation of a single apple, a row in our list.

```js
// ...
template: _.template(''
        +'<a href="#apples/<%=name%>" target="_blank">'
      +'<%=name%>'
      +'</a>&nbsp;<a class="add-to-cart" href="#">buy</a>'),
// ...
```

The template is just a string with Underscore.js instructions. They are wrapped in `<%` and `%>` symbols. `<%=` simply means print a value. The same code can be written with backslash escapes:

```js
// ...
template: _.template('\
        <a href="#apples/<%=name%>" target="_blank">\
      <%=name%>\
      </a>&nbsp;<a class="add-to-cart" href="#">buy</a>\
      '),
// ...
```

Each `<li>` will have two anchor elements (`<a>`), links to a detailed apple view (`#apples/:appleName`), and a Buy button. Now we're going to attach an event listener to the Buy button:

```js
// ...
events: {
  'click .add-to-cart': 'addToCart'
},
// ...
```

The syntax follows this rule:

```js
event + jQuery element selector: function name
```

Both the key and the value (right and left parts separated by the colon) are strings. For example:

```js
'click .add-to-cart': 'addToCart'
```

or

```js
'click #load-more': 'loadMoreData'
```

To render each item in the list, we'll use the jQuery `html()` function on the `this.$el` jQuery object, which is the `<li>` HTML element based on our `tagName` attribute:

```js
// ...
render: function() {
  this.$el.html(this.template(this.model.attributes))
},
// ...
```

`addToCart` will use the `trigger()` function to notify the collection that this particular model (apple) is up for purchase by the user:

```js
// ...
addToCart: function(){
  this.model.collection.trigger('addToCart', this.model)
}
// ...
```

Here is the full code of the `appleItemView` Backbone View class:

```js
// ...
const appleItemView = Backbone.View.extend({
  tagName: 'li',
  template: _.template(''
          + '<a href="#apples/<%=name%>" target="_blank">'
        + '<%=name%>'
        + '</a>&nbsp;<a class="add-to-cart" href="#">buy</a>'),
  events: {
    'click .add-to-cart': 'addToCart'
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes))
  },
  addToCart: function(){
    this.model.collection.trigger('addToCart', this.model)
  }
})
// ...
```

Easy peasy! But what about the master view, which is supposed to render all of our items (apples) and provide a wrapper `<ul>` container for `li` HTML elements? We need to modify and enhance our `homeView`.

To begin with, we can add extra properties of `string` type understandable by jQuery as selectors to `homeView`:

```js
// ...
el: 'body',
listEl: '.apples-list',
cartEl: '.cart-box',
// ...
```

We can use properties from earlier in the template, or just hard-code them (we'll refactor our code later) in `homeView`:

```js
// ...
template: _.template('Apple data: \
  <ul class="apples-list">\
  </ul>\
  <div class="cart-box"></div>'),
// ...
```

The `initialize` function will be called when `homeView` is created (`new homeView()`). There we render our template (with our favorite `html()` function), and attach an event listener to the collection, which is a set of apple models:

```js
// ...
initialize: function() {
  this.$el.html(this.template)
  this.collection.on('addToCart', this.showCart, this)
},
// ...
```

The syntax for the binding event is covered in the previous section. In essence, it is calling the `showCart()` function of `homeView`. In this function, we append `appleName` to the cart (along with a line break, a `<br/>` element):

```js
// ...
showCart: function(appleModel) {
  $(this.cartEl).append(appleModel.attributes.name + '<br/>')
},
// ...
```

Finally, here is our long-awaited `render()` method, in which we iterate through each model in the collection (each apple), create an `appleItemView` for each apple, create an `<li>` element for each apple, and append that element to `view.listEl` — `<ul>` element with a class `apples-list` in the DOM:

```js
// ...
render: function() {
  view = this
  // So we can use view inside of closure
  this.collection.each(function(apple){
    const appleSubView = new appleItemView({model:apple})
    // Creates subview with model apple
    appleSubView.render()
    // Compiles template and single apple data
    $(view.listEl).append(appleSubView.$el)
    // Append jQuery object from single
    // Apple to apples-list DOM element
  })
}
// ...
```

Let's make sure we didn't miss anything in the `homeView` Backbone View. Here's the full code sans the inline comments:

```js
// ...
const homeView = Backbone.View.extend({
  el: 'body',
  listEl: '.apples-list',
  cartEl: '.cart-box',
  template: _.template('Apple data: \
    <ul class="apples-list">\
    </ul>\
    <div class="cart-box"></div>'),
  initialize: function() {
    this.$el.html(this.template)
    this.collection.on('addToCart', this.showCart, this)
  },
  showCart: function(appleModel) {
    $(this.cartEl).append(appleModel.attributes.name + '<br/>')
  },
  render: function() {
    view = this
    this.collection.each(function(apple) {
      const appleSubView = new appleItemView({model: apple})
      appleSubView.render()
      $(view.listEl).append(appleSubView.$el)
    })
  }
})
// ...
```

You should be able to click the Buy button and populate the cart with the apples of your choice. Looking at an individual apple does not require typing its name in the URL address bar of the browser anymore. We can click the name to open a new window with a detailed view.

By using subviews, we reused the template for all of the items (apples) and attached a specific event to each of them (see Figure 4-1). Those events are smart enough to pass the information about the model to other objects: views and collections.

![](media/image1.png)

***Figure 4-1.*** *The list of apples rendered by subviews*

Just in case, here is the full code for the subviews example, which is also available at <http://bit.ly/2LhEOWH>:

```html
<!DOCTYPE>
<html>
<head>
  <script src="jquery.js"></script>
  <script src="underscore.js"></script>
  <script src="backbone.js"></script>

  <script>
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
    const appleItemView = Backbone.View.extend({
      tagName: 'li',
      template: _.template('\
              <a href="#apples/<%=name%>" target="_blank">\
            <%=name%>\
            </a>&nbsp;<a class="add-to-cart" href="#">buy</a>\
            '),

      events: {
        'click .add-to-cart': 'addToCart'
      },
      render: function() {
        this.$el.html(this.template(this.model.attributes))
      },
      addToCart: function(){
        this.model.collection.trigger('addToCart', this.model)
      }
    })

    const homeView = Backbone.View.extend({
      el: 'body',
      listEl: '.apples-list',
      cartEl: '.cart-box',
      template: _.template('Apple data: \
        <ul class="apples-list">\
        </ul>\
        <div class="cart-box"></div>'),
      initialize: function() {
        this.$el.html(this.template)
        this.collection.on('addToCart', this.showCart, this)
      },
      showCart: function(appleModel) {
        $(this.cartEl).append(appleModel.attributes.name + '<br/>')
      },
      render: function(){
        view = this
        this.collection.each(function(apple){
          const appleSubView = new appleItemView({model: apple})
          appleSubView.render()
          $(view.listEl).append(appleSubView.$el)
        })
      }
    })
    const Apples = Backbone.Collection.extend({
    })
    const appleView = Backbone.View.extend({
      initialize: function(){
        this.model = new (Backbone.Model.extend({}))
        this.model.on('change', this.render, this)
        this.on('spinner', this.showSpinner, this)
      },
      template: _.template('<figure>\
                              <img src="<%= attributes.url%>"/>\
                              <figcaption><%= attributes.name %></figcaption>\
                            </figure>'),
      templateSpinner: '<img src="img/spinner.gif" width="30"/>',
      loadApple:function(appleName){
        this.trigger('spinner')
        const view = this
        setTimeout(function(){
          view.model.set(view.collection.where({name: appleName})[0].attributes)
        }, 1000)
      },
      render: function(appleName){
        const appleHtml = this.template(this.model)
        $('body').html(appleHtml)
      },
      showSpinner: function(){
        $('body').html(this.templateSpinner)
      }
    })

    $(document).ready(function(){
      app = new router
      Backbone.history.start()
    })

  </script>
</head>
<body>
  <div></div>
</body>
</html>
```

The link to an individual item, for example, `collections/index.html#apples/fuji`, also should work independently, by typing it in the browser address bar.

Refactoring Backbone.js Code
=======================================================================================================================================

At this point you are probably wondering what the benefit is of using the framework and still having multiple classes, objects, and elements with different functionalities in one single file. This was done for the purpose of adhering to the idea of keeping things simple.

The bigger your application is, the more pain there is in an unorganized code base. Let's break down our application into multiple files where each file will be one of these types:

-   View
-   Template
-   Router
-   Collection
-   Model

Let's write these scripts to include tags into our `index.html` head, or body, as noted previously:

```html
<script src="apple-item.view.js"></script>
<script src="apple-home.view.js"></script>
<script src="apple.view.js"></script>
<script src="apples.js"></script>
<script src="apple-app.js"></script>
```

The names don't have to follow the convention of dashes and dots, as long as it's easy to tell what each file is supposed to do.

Now, let's copy our objects and classes into the corresponding files.

Our main `index.html` file should look very minimalistic:

```html
<!DOCTYPE>
<html>
<head>
  <script src="jquery.js"></script>
  <script src="underscore.js"></script>
  <script src="backbone.js"></script>

  <script src="apple-item.view.js"></script>
  <script src="apple-home.view.js"></script>
  <script src="apple.view.js"></script>
  <script src="apples.js"></script>
  <script src="apple-app.js"></script>

</head>
<body>
  <div></div>
</body>
</html>
```

The other files just have the code that corresponds to their file names.

The content of `apple-item.view.js` will have the `appleView` object:

```js
const appleView = Backbone.View.extend({
  initialize: function(){
    this.model = new (Backbone.Model.extend({}))
    this.model.on('change', this.render, this)
    this.on('spinner', this.showSpinner, this)
  },
  template: _.template('<figure>\
            <img src="<%= attributes.url %>"/>\
            <figcaption><%= attributes.name %></figcaption>\
          </figure>'),
  templateSpinner: '<img src="img/spinner.gif" width="30"/>',

  loadApple:function(appleName){
    this.trigger('spinner')
    const view = this
    // We'll need to access that inside of a closure
    setTimeout(function(){
    // Simulates real time lag when fetching
    // data from the remote server
      view.model.set(view.collection.where({
        name: appleName
      })[0].attributes)
    }, 1000)
  },

  render: function(appleName){
    const appleHtml = this.template(this.model)
    $('body').html(appleHtml)
  },
  showSpinner: function(){
    $('body').html(this.templateSpinner)
  }
})

The `apple-home.view.js` file has the `homeView` object:

const homeView = Backbone.View.extend({
  el: 'body',
  listEl: '.apples-list',
  cartEl: '.cart-box',
  template: _.template('Apple data: \
    <ul class="apples-list">\
    </ul>\
    <div class="cart-box"></div>'),
  initialize: function() {
    this.$el.html(this.template)
    this.collection.on('addToCart', this.showCart, this)
  },
  showCart: function(appleModel) {
    $(this.cartEl).append(appleModel.attributes.name + '<br/>')
  },
  render: function(){
    view = this // So we can use view inside of closure
    this.collection.each(function(apple){
      const appleSubView = new appleItemView({model:apple})
      // Create subview with model apple
      appleSubView.render()
      // Compiles template and single apple data
      $(view.listEl).append(appleSubView.$el)
      // Append jQuery object from
      // single apple to apples-list DOM element
    })
  }
})
```

The `apple.view.js` file contains the master apples list:

```js
const appleView = Backbone.View.extend({
  initialize: function() {
    this.model = new (Backbone.Model.extend({}))
    this.model.on('change', this.render, this)
    this.on('spinner',this.showSpinner, this)
  },
  template: _.template('<figure>\
          <img src="<%= attributes.url %>"/>\
          <figcaption><%= attributes.name %></figcaption>\
        </figure>'),
  templateSpinner: '<img src="img/spinner.gif" width="30"/>',
  loadApple:function(appleName) {
    this.trigger('spinner')
    const view = this
    // We'll need to access that inside of a closure
    setTimeout(function() {
    // Simulates real time lag when
    // fetching data from the remote server
      view.model.set(view.collection.where({
        name:appleName
      })[0].attributes)
    }, 1000)
  },
  render: function(appleName) {
    const appleHtml = this.template(this.model)
    $('body').html(appleHtml)
  },
  showSpinner: function() {
    $('body').html(this.templateSpinner)
  }
})
```

`apples.js` is an empty collection:

```js
const Apples = Backbone.Collection.extend({
})
```

`apple-app.js` is the main application file with the data, the router, and the starting command:

```js
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
  initialize: function() {
    const apples = new Apples()
    apples.reset(appleData)
    this.homeView = new homeView({collection: apples})
    this.appleView = new appleView({collection: apples})
  },
  home: function() {
    this.homeView.render()
  },
  loadApple: function(appleName) {
    this.appleView.loadApple(appleName)
  }
})
$(document).ready(function() {
  app = new router
  Backbone.history.start()
})
```

Now let's try to open the application. It should work exactly the same as in the previous Subviews example.

It's a far better code organization, but it's still far from perfect, because we still have HTML templates directly in the JavaScript code. The problem is that designers and developers can't work on the same files, and any change to the presentation requires a change in the main code base.

We can add a few more JS files to our `index.html` file:

```html
<script src="apple-item.tpl.js"></script>
<script src="apple-home.tpl.js"></script>
<script src="apple-spinner.tpl.js"></script>
<script src="apple.tpl.js"></script>
```

Usually, one Backbone View has one template, but in the case of our `appleView`—a detailed view of an apple in a separate window—we also have a spinner, a "loading" GIF animation.

The contents of the files are just global variables that are assigned some string values. Later we can use these variables in our views, when we call the Underscore.js helper method `_.template()`.

Here is the `apple-item.tpl.js` file:

```js
const appleItemTpl = '\
      <a href="#apples/<%=name%>" target="_blank">\
    <%=name%>\
    </a>&nbsp;<a class="add-to-cart" href="#">buy</a>\
    '
```

This is the `apple-home.tpl.js` file:

```js
const appleHomeTpl = 'Apple data: \
        <ul class="apples-list">\
        </ul>\
        <div class="cart-box"></div>'
```

Here is the `apple-spinner.tpl.js` file:

```js
const appleSpinnerTpl = '<img src="img/spinner.gif" width="30"/>'
```

This is the `apple.tpl.js` file:

```js
const appleTpl = '<figure>\
                <img src="<%= attributes.url %>"/>\
                <figcaption><%= attributes.name %></figcaption>\
              </figure>'
```

Try to start the application now. The full code is at <http://bit.ly/2LdEtEy>.

As you can see in the previous example, we used global scoped variables (without the keyword `window`).

Be careful when you introduce a lot of variables into the global namespace (`window` keyword). There might be conflicts and other unpredictable consequences. For example, if you wrote an open source library and other developers started using the methods and properties directly, instead of using the interface, what would happen later when you decide to finally remove or deprecate those global leaks? To prevent this, properly written libraries and applications use [JavaScript closures](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Closures) (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).

Here is an example of using closure and a global variable module definition:

```js
;(function() {
  const apple = function() {
  ...// Do something useful like return apple object
  }
  window.Apple = apple
}())
```

In a case when we need to access the `app` object (which creates a dependency on that object):

```js
;(function() {
  let app = this.app
  // Equivalent of window.application
  // in case we need a dependency (app)
  this.apple = function() {
    ...
    // Return apple object/class
    // Use app variable
  }
  // Equivalent of window.apple = function(){...}
}())
```

As you can see, we've created the function and called it immediately while also wrapping everything in parentheses `()`.

AMD and Require.js for Backbone.js Development
==============================================

AMD allows us to organize development code into modules, manage dependencies, and load them asynchronously. The article ["Why AMD"](http://requirejs.org/docs/whyamd.html) does a great job at explaining benefits of AMD: <http://requirejs.org/docs/whyamd.html>.

Start your local HTTP server, for example, [MAMP](https://www.mamp.info/en) (<https://www.mamp.info>) or `node-static` (<https://npmjs.com/node-static>).

Let's enhance our code by using the Require.js library.

Our `index.html` will shrink even more:

```html
<!DOCTYPE>
<html>
  <head>
    <script src="jquery.js"></script>
    <script src="underscore.js"></script>
    <script src="backbone.js"></script>
    <script src="require.js"></script>
    <script src="apple-app.js"></script>
  </head>
  <body>
    <div></div>
  </body>
</html>
```

We only included libraries and the single JavaScript file with our application. This file has the following structure:

```js
require([...],function(...){...})
```

In a more explanatory way:

```js
require([
  'name-of-the-module',
  ...
  'name-of-the-other-module'
  ],function(referenceToModule, ..., referenceToOtherModule){
  // Some useful code...
  referenceToModule.someMethod()
})
```

Basically, we tell a browser to load the files from the array of file names—the first parameter of the `require()` function—and then pass our modules from those files to the anonymous callback function (second argument) as variables. Inside of the main function (anonymous callback) we can use our modules by referencing those variables. Therefore, our `apple-app.js` metamorphoses into:

```js
require([
  'apple-item.tpl', // Can use shim plug-in
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
  appleItemView,
  homeView,
  appleView,
  Apples
  ){
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
  // Check if need to be required
    routes: {
      '': 'home',
      'apples/:appleName': 'loadApple'
    },
    initialize: function() {
      const apples = new Apples()
      apples.reset(appleData)
      this.homeView = new homeView({collection: apples})
      this.appleView = new appleView({collection: apples})
    },
    home: function() {
      this.homeView.render()
    },
    loadApple: function(appleName) {
      this.appleView.loadApple(appleName)
    }
  })

  $(document).ready(function() {
    app = new router
    Backbone.history.start()
  })
})
```

We put all of the code inside the function that is a second argument of `require()`, mentioned modules by their file names, and used dependencies via corresponding parameters. Now we should define the module itself. This is how we can do it with the `define()` method:

```js
define([...],function(...) {...})
```

The meaning is similar to the `require()` function: Dependencies are strings of file names (and paths) in the array that is passed as the first argument. The second argument is the main function that accepts other libraries as parameters (the order of parameters and modules in the array is important):

```js
define(['name-of-the-module'],function(nameOfModule) {
  const b = nameOfModule.render()
  return b
})
```

Note that there is no need to append `.js` to file names. Require.js does it automatically. The Shim plug-in is used for importing text files such as HTML templates.

Let's start with the templates and convert them into the Require.js modules.

Here is the new `apple-item.tpl.js` file:

```js
define(function() {
  return '\
              <a href="#apples/<%=name%>" target="_blank">\
            <%=name%>\
            </a>&nbsp;<a class="add-to-cart" href="#">buy</a>\
            '
})
```

This is the `apple-home.tpl` file:

```js
define(function() {
  return 'Apple data: \
        <ul class="apples-list">\
        </ul>\
        <div class="cart-box"></div>'
})
```

Here is the `apple-spinner.tpl.js` file:

```js
define(function() {
  return '<img src="img/spinner.gif" width="30"/>'
})
```

This is the `apple.tpl.js` file:

```js
define(function() {
  return '<figure>\
          <img src="<%= attributes.url %>"/>\
          <figcaption><%= attributes.name %></figcaption>\
        </figure>'
  })
```

Here is the `apple-item.view.js` file:

```js
define(function() {
  return '\
              <a href="#apples/<%=name%>" target="_blank">\
            <%=name%>\
            </a>&nbsp;<a class="add-to-cart" href="#">buy</a>\
            '
})
```

In the `apple-home.view.js` file, we need to declare dependencies on
`apple-home.tpl` and `apple-item.view.js` files:

```js
define(['apple-home.tpl', 'apple-item.view'], function(
  appleHomeTpl,
  appleItemView){
return  Backbone.View.extend({
      el: 'body',
      listEl: '.apples-list',
      cartEl: '.cart-box',
      template: _.template(appleHomeTpl),
      initialize: function() {
        this.$el.html(this.template)
        this.collection.on('addToCart', this.showCart, this)
      },
      showCart: function(appleModel) {
        $(this.cartEl).append(appleModel.attributes.name + '<br/>')
      },
      render: function() {
        view = this // So we can use view inside of closure
        this.collection.each(function(apple){
          const appleSubView = new appleItemView({model:apple})
          // Create subview with model apple
          appleSubView.render()
          // Compiles template and single apple data
          $(view.listEl).append(appleSubView.$el)
          // Append jQuery object from
          // a single apple to apples-list DOM element
        })
      }
    })
})
```

The `apple.view.js` file depends on two templates:

```js
define([
  'apple.tpl',
  'apple-spinner.tpl'
], function(appleTpl,appleSpinnerTpl){
  return  Backbone.View.extend({
    initialize: function(){
      this.model = new (Backbone.Model.extend({}))
      this.model.on('change', this.render, this)
      this.on('spinner',this.showSpinner, this)
    },
    template: _.template(appleTpl),
    templateSpinner: appleSpinnerTpl,
    loadApple:function(appleName){
      this.trigger('spinner')
      const view = this
      // We'll need to access that inside of a closure
      setTimeout(function(){
      // Simulates real time lag when
      // fetching data from the remote server
        view.model.set(view.collection.where({
          name:appleName
        })[0].attributes)
      }, 1000)
    },
    render: function(appleName){
      const appleHtml = this.template(this.model)
      $('body').html(appleHtml)
    },
    showSpinner: function(){
      $('body').html(this.templateSpinner)
    }
  })
})
```

This is the `apples.js` file:

```js
define(function() {
  return Backbone.Collection.extend({})
})
```

I hope you can see the pattern by now. All of our code is split into the separate files based on the logic (e.g., view class, collection class, template). The main file loads all of the dependencies with the `require()` function. If we need some module in a non-main file, then we can ask for it in the `define()` method. Usually, in modules we want to return an object; for example, in templates we return strings and in views we return Backbone View classes and objects.

Try launching the example located in `code/04-backbone/amd` and at <http://bit.ly/2LhEmb9>. Visually, there shouldn't be any changes. If you open the Network tab in the Developers Tool, you can see a difference in how the files are loaded.

The old file shown in Figure 4-2 (`code/04-backbone/refactor/index.html` and <http://bit.ly/2Lfi7lT>) loads our JavaScript scripts in a serial manner, whereas the new file shown in Figure 4-3 (`code/04-backbone/amd/index.html`) loads them in parallel.

![](media/image2.png)

***Figure 4-2.*** *The old 04-backbone/refactor/index.html file*

![](media/image3.png)

***Figure 4-3.*** *The new 04-backbone/amd/index.html file*

Require.js has a lot of configuration options that are defined through the `requirejs.config()` call in the top level of an HTML page. More information can be found at <http://requirejs.org/docs/api.html#config>.

Let's add a bust parameter to our example. The bust argument will be appended to the URL of each file, preventing a browser from caching the files. This is perfect for development and terrible for production.

Add this to the `apple-app.js` file in front of everything else:

```js
requirejs.config({
  urlArgs: 'bust=' +  (new Date()).getTime()
})
require([
// ...
```

Notice in Figure 4-4 that each file request now has status 200 instead of 304 (not modified).

![](media/image4.png)

***Figure 4-4.*** *Network tab with bust parameter added*

Require.js for Backbone.js Production
=====================================

We'll use the Node.js package manager (npm) to install the `requirejs` library (it's not a typo; there's no period in the name). In your project folder, run this command in a terminal:

    $ npm init

Then run

    $ npm install requirejs

or add `-g` for global installation:

    $ npm install -g requirejs

Create a file named `app.build.js`:

    ({
        appDir: "./js",
        baseUrl: "./",
        dir: "build",
        modules: [
            {
                name: "apple-app"
            }
        ]
    })

Move the script files into the `js` folder (`appDir` property). The builded files will be placed in the `build` folder (`dir` parameter). For more information on the build file, check out the extensive example with comments available at <http://bit.ly/2LdFSuO>.

Now everything should be ready for building one gigantic JavaScript file that will include all of our dependencies and modules:

    $ r.js -o app.build.js

or

    $ node_modules/requirejs/bin/r.js -o app.build.js

You should get a list of the `r.js` processed files, as shown in Figure 4-5.

![](media/image5.png)

***Figure 4-5.*** *A list of the r.js processed files*

Open `index.html` from the build folder in a browser window, and check if the Network tab shows any improvement now with just one request or file to load (Figure 4-6).

![](media/image6.png)

***Figure 4-6.*** *Performance improvement with one request or file to load*

For more information, check out the official `r.js` documentation at <http://requirejs.org/docs/optimization.html>.

The example code is available at <http://bit.ly/2LiMuYM> and <http://bit.ly/2Lg6efx>.

For uglification of JS files (which decreases the file sizes), we can use the [Uglify2](https://github.com/mishoo/UglifyJS2) module. To install it with npm, use:

    $ npm install uglify-js

Then update the `app.build.js` file with the `optimize: "uglify2"` property:

    ({
        appDir: "./js",
        baseUrl: "./",
        dir: "build",
        optimize: "uglify2",
        modules: [
            {
                name: "apple-app"
            }
        ]
    })

Run r.js with:

    $ node_modules/requirejs/bin/r.js -o app.build.js

You should get something like this:

    define("apple-item.tpl",[],function(){return'             <a href="#apples/<%=name%>" target="_blank">            <%=name%>            </a>&nbsp;<a class="add-to-cart" href="#">buy</a>            '}),define("apple-home.tpl",[],function(){return 'Apple data:         <ul class="apples-list">        </ul>        <div class="cart-box"></div>'}),define("apple-spinner.tpl",[],function(){return'<img src="img/spinner.gif" width="30"/>'}),define("apple.tpl",[],function(){return'<figure>                              <img src="<%= attributes.url %>"/>                              <figcaption><%= attributes.name %></figcaption>                            </figure>'}),define("apple-item.view",["apple-item.tpl"],function(e){return Backbone.View.extend({tagName:"li",template:_.template(e),events:{"click .add-to-cart":"addToCart"},render:function(){this.$el.html(this.template(this.model.attributes))},addToCart:function(){this.model.collection.trigger("addToCart",this.model)}})}),define("apple-home.view",["apple-home.tpl","apple-item.view"],function(e,t){return Backbone.View.extend({el:"body",listEl:".apples-list",cartEl:".cart-box",template:_.template(e),initialize:function(){this.$el.html(this.template),this.collection.on("addToCart",this.showCart,this)},showCart:function(e){$(this.cartEl).append(e.attributes.name+"<br/>")},render:function(){view=this,this.collection.each(function(e){const i=new t({model:e});i.render(),$(view.listEl).append(i.$el)})}})}),define("apple.view",["apple.tpl","apple-spinner.tpl"],function(e,t){return Backbone.View.extend({initialize:function(){this.model=new(Backbone.Model.extend({})),this.model.on("change",this.render,this),this.on("spinner",this.showSpinner,this)},template:_.template(e),templateSpinner:t,loadApple:function(e){this.trigger("spinner");const t=this;setTimeout(function(){t.model.set(t.collection.where({name:e})[0].attributes)},1e3)},render:function(){const e=this.template(this.model);$("body").html(e)},showSpinner:function(){$("body").html(this.templateSpinner)}})}),define("apples",[],function(){return Backbone.Collection.extend({})}),requirejs.config({urlArgs:"bust="+(new Date).getTime()}),require(["apple-item.tpl","apple-home.tpl","apple-spinner.tpl","apple.tpl","apple-item.view","apple-home.view","apple.view","apples"],function(e,t,i,n,a,l,p,o){const r,s=[{name:"fuji",url:"img/fuji.jpg"},{name:"gala",url:"img/gala.jpg"}],c=Backbone.Router.extend({routes:{"":"home","apples/:appleName":"loadApple"},initialize:function(){const e=new o;e.reset(s),this.homeView=new l({collection:e}),this.appleView=new p({collection:e})},home:function(){this.homeView.render()},loadApple:function(e){this.appleView.loadApple(e)}});$(document).ready(function(){r=new c,Backbone.history.start()})}),define("apple-app",function(){});

The file is intentionally not formatted to show how Uglify2 works (<https://npmjs.com/uglify-js> and <http://lisperator.net/uglifyjs>). Without the line break escape symbols, the code is on one line. Also notice that variables’ and objects’ names are shortened.

Super Simple Backbone.js Starter Kit
====================================

To jump-start your Backbone.js development, consider using Super Simple Backbone Starter Kit (<http://bit.ly/2LhjDE4>) or similar projects:

-   [Backbone Boilerplate](http://backboneboilerplate.com) available at <http://backboneboilerplate.com>
-   [Sample App with Backbone.js and Bootstrap](http://coenraets.org/blog/2012/02/sample-app-with-backbone-js-and-twitter-bootstrap) available at <http://coenraets.org/blog/2012/02/sample-app-with-backbone-js-and-twitter-bootstrap>
-   More Backbone.js tutorials available at <http://bit.ly/2LfBifE>

Summary
=======

So far we've covered how to:

-   Build a Backbone.js application from scratch.
-   Use views, collections, subviews, models, and event binding.
-   Use AMD and Require.js on the example of the apple
    database application.

In this chapter, you've learned enough about Backbone.js to make sure you can start using it in your web or mobile apps. Without a framework like Backbone, your code will become exponentially more complex as it grows. On the other hand, with Backbone or a similar MVC architecture, you can scale the code better.
