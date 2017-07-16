<span id="basics" class="anchor"></span>

CHAPTER 1
---------

Basics
======

> *I think everyone should learn how to program a computer, because it
> teaches you how to think. I view computer science as a liberal art,
> something everyone should learn to do.*
>
> — Steve Jobs

In this chapter, we'll cover these topics:

-   Overview of HTML, CSS, and JavaScript syntaxes
-   Brief introduction to Agile methodology
-   Advantages of cloud computing, Node.js, and MongoDB
-   Descriptions of HTTP requests/responses and RESTful API concepts

If you are an experienced web developer, I don't recommend it, but feel free to skip this chapter. It's important to brush up on the fundamental concepts before moving forward. Why? Maybe you have heard and are familiar with some terms, but wonder what they actually mean. Another good reason is that this chapter will cover the RESTful API in a very beginner-friendly manner. REST is used in virtually all modern web architectures, and we'll use it in the book a lot. There is one last reason: You'll look smart at a cocktail party or in front of your colleagues and your boss by acing the hodpodge of web acronyms.

Front-End Definitions
=====================

*Front end* is a term for browser applications. In some conversations, it could mean servers facing the requests first. However, for this book we assume that all front end is limited to the browser and mobile apps and their code.

Front-end development, or front-end web development, implies the usage of various technologies. Each of them individually is not too complex, but the sheer number of them makes beginners timid. For example, there are Cascading Style Sheets (CSS), Hypertext Markup Language (HTML), Extensible Markup Language (XML), JavaScript, JavaScript Object Notation (JSON), Uniform Resource Identifier (URI), Hypertext Transfer Protocol (HTTP), and many other abbreviations.

In addition to the low-level technologies, there are numerous frameworks, tools, and libraries; for example, jQuery, Backbone.js, Angular.js, Grunt, and so on. Please don't confuse front-end frameworks with back-end frameworks: The latter run on the server whereas the former run on the browser.

Front-end web development consists of these components:

1.  HTML or templates that compile to HTML
2.  Stylesheets to make HTML pretty
3.  JavaScript to add interactivity or some business logic to the browser app
4.  Some hosting (AWS, Apache, Heroku, etc.)
5.  Build scripts to prepare code, manage dependencies, and do pretty much anything that's needed
6.  Logic to connect to the server (typically via XHR requests and RESTful API)

Now you know what a job that has the title of front-end developer entails. The great payback to mastering this hodgepodge is the ability to express your creativity by building beautiful and useful apps.

Before we start building, let's cover a bird's-eye view of the web request cycle.

Web Request Cycle
-----------------

This is important for someone very new to the web development. The whole World Wide Web or the Internet is about communication between clients and servers. This communication happens by sending requests and receiving responses. Typically browsers (the most popular web clients) send requests to servers. Behind the scenes, servers send their own requests to other servers. Those requests are similar to the browser requests. The language of requests and responses is HTTP(S). Let's explore the browser request in more details.

The web request consists of the following steps:

1.  A user types a URL or follows a link in his or her browser (also called the client).
2.  The browser makes an HTTP request to the server.
3.  The server processes the request, and if there are any parameters in a query string or body of the request, it takes them into account.
4.  The server updates, gets, and transforms data in the database.
5.  The server responds with an HTTP response containing data in HTML, JSON, or other formats.
6.  The browser receives the HTTP response.
7.  The browser renders an HTTP response to the user in HTML or any other format (e.g., JPEG, XML, JSON).

Mobile applications act in the same manner as regular web sites, only
instead of a browser there is a native app. Mobile apps (native or
HTML5) are just another client. Other minor differences between mobile
and web include data transfer limitation due to carrier bandwidth,
smaller screens, and the more efficient use of local storage. Most
likely you, my reader, are a web developer aspiring to use your web
chops in mobile. With JavaScript and HTML5 it's possible, so it's worth
covering web development closer.

Mobile Development
------------------

<span id="mobile" class="anchor"></span>Is mobile going to overtake web
and desktop platforms? Maybe. For now the mobile development field is
extremely immature and new. It's good if you are a pioneer, but most of
us are not. This is a bigger gap in tooling and libraries compared to
web. The gap is closing. With HTML5, you can write once and reuse code
on mobile. There are other approaches as well.

These are the approaches to mobile development, each with its own
advantages and disadvantages:

1.  *Native:* Native iOS, Android, Blackberry apps built with
    Objective-C and Java.

2.  Abstracted native: Native apps built with JavaScript in
    [Appcelerator](http://www.appcelerator.com) (http://www.appcelerator.com), [Xamarin](https://xamarin.com), (https://xamarin.com), [Smartface](http://www.smartface.io) (http://www.smartface.io) React Native or similar tools, and then compiled into native Objective-C or Java.

3.  *Responsive*: Mobile websites tailored for smaller screens with
    responsive design, CSS frameworks like Twitter
    [Bootstrap](http://twitter.github.io/bootstrap/) (http://twitter.github.io/bootstrap/) or [Foundation](http://foundation.zurb.com/) (http://foundation.zurb.com/), regular CSS, or different templates.
    You might use some JavaScript frameworks for the development like
    Backbone.js, Angular.js, Ember.js, or React.js.

4.  *Hybrid*: HTML5 apps which consist of HTML, CSS, and JavaScript, and
    are usually built with frameworks like [Sencha Touch](http://www.sencha.com/products/touch) (http://www.sencha.com/products/touch), [Trigger.io](https://trigger.io) (https://trigger.io), [JO](http://joapp.com) (http://joapp.com), [React Native](https://facebook.github.io/react-native) (https://facebook.github.io/react-native), or
    [Ionic](http://ionicframework.com) (http://ionicframework.com) and then wrapped into a native app
    with [PhoneGap](http://phonegap.com) (http://phonegap.com). As in the third approach, you
    probably will want to use a JavaScript framework for the development
    such as Backbone.js, Angular.js, Ember.js or React.js.

My personal favorites are the second and fourth approaches. The second
approach doesn't require a different code base. A minimal viable product
(MVP) can be built by just adding a single link to the CSS library. The
fourth approach is more powerful and provides more scalable (in a
development sence) UIs. This is better suited for complex apps. Code
reuse between cross-platform mobile and web is easy because most of the
times you're writing in JavaScript.

<span id="hypertext-markup-language" class="anchor"><span id="HTML" class="anchor"></span></span>HyperText Markup Language
--------------------------------------------------------------------------------------------------------------------------

HTML is not a programming language in itself. It is a set of markup tags
that describe the content and present it in a structured and formatted
way. HTML tags consist of a tag name inside of the angle brackets
(`<>`). In most cases, tags surround the content, with the end tag
having forward slash before the tag name.

In this example, each line is an HTML element:

```html
<h2>Overview of HTML</h2>
<div>HTML is a …</div>
<link rel="stylesheet" type="text/css" href="style.css" />
```

An HTML document itself is an element of the &lt;html&gt; tag, and all
other elements are children of that &lt;html&gt; tag:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
    <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
    <h2>Overview of HTML</h2>
    <p>HTML is a …</p>
</body>
</html>
```

There are different flavors and versions of HTML, such as DHTML, XHTML
1.0, XHTML 1.1, XHTML 2, HTML 4, and HTML 5. This article does a good
job of explaining the differences: [Misunderstanding Markup: XHTML
2/HTML 5 Comic
Strip](http://coding.smashingmagazine.com/2009/07/29/misunderstanding-markup-xhtml-2-comic-strip/)
(http://coding.smashingmagazine.com/2009/07/29/misunderstanding-markup-xhtml-2-comic-strip/).

Any HTML element can have attributes. The most important of them are
class, id, style, data-name, onclick, and other event attributes such as
onmouseover, onkeyup, and so on.

### `class`

The class attribute defines a class that is used for styling in CSS or
Domain Object Model (DOM) manipulation; for example:

```html
<p class="normal">…</p>
```

### `id`

The id attribute defines an ID that is similar in purpose to element
class, but it has to be unique; for example:

```html
<div id="footer">...</div>
```

### `style`

The style attribute defines inline CSS to style an element; for example:

```html
<font style="font-size:20px">…</font>
```

### `title`

The title attribute specifies additional information that is usually
presented in tooltips by most browsers; for example:

```html
<a title="Up-vote the answer">…</a>
```

### `data-name`

The data-name attribute allows for metadata to be stored in the DOM; for
example:

```html
<tr data-token="fa10a70c–21ca–4e73-aaf5-d889c7263a0e">…</tr>
```

### `onclick`

The onclick attribute calls inline JavaScript code when a click event
happens; for example:

```html
<input type="button"
  onclick="validateForm();">…</a>
```

### `onmouseover`

The onmouseover attribute is similar to onclick but for mouse hover
events; for example:

```html
<a onmouseover="javascript:
  this.setAttribute(‘css’,‘color:red’)">
  …
</a>
```

Other HTML element attributes for inline JavaScript code are as follows:

-   onfocus: When the browser focuses on an element

-   onblur: When the browser focus leaves an element

-   onkeydown: When a user presses a keyboard key

-   ondblclick: When a user double-clicks the mouse

-   onmousedown: When a user presses a mouse button

-   onmouseup: When a user releases a mouse button

-   onmouseout: When a user moves mouse out of the element area

-   oncontextmenu: When a user opens a context menu

The full list of such events and a browser compatibility table are
presented in [Event compatibility
tables](http://www.quirksmode.org/dom/events/index.html)
(http://www.quirksmode.org/dom/events/index.html).

We'll use classes extensively with Twitter Bootstrap framework, but the
use of inline CSS and JavaScript code is generally a bad idea, so we'll
try to avoid it. However, it's good to know the names of the JavaScript
events because they are used all over the place in jQuery, Backbone.js,
and, of course, plain JavaScript. To convert the list of attributes to a
list of JS events, just remove the prefixes on; for example, onclick
attribute means click event.

More information is available at Example: [Catching a mouse click](https://developer.mozilla.org/en-US/docs/JavaScript/Getting\_Started\#Example:\_Catching\_a\_mouse\_click) (https://developer.mozilla.org/en-US/docs/JavaScript/Getting\_Started\#Example:\_Catching\_a\_mouse\_click),
[Wikipedia](http://en.wikipedia.org/wiki/HTML) (http://en.wikipedia.org/wiki/HTML) and
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)(https://developer.mozilla.org/en-US/docs/Web/HTML).

Cascading Style Sheets
----------------------

<span id="css" class="anchor"></span>CSS provides a way to format and
present content. An HTML document can have an external stylesheet
included in it by a `<link>` tag, as shown in the previous examples, or
it can have CSS code directly inside of a `<style>` tag:

```html
<style>
  body {
    padding-top: 60px; /* 60px to make some space */
  }
</style>
```

Each HTML element can have id attributes, class attributes, or both:

```html
<div id="main" class="large">
  Lorem ipsum dolor sit amet,
  Duis sit amet neque eu.
</div>
```

In CSS we access elements by their id, class, tag name, and in some edge
cases, by parent–child relationships or element attribute value.

This sets the color of all the paragraphs (&lt;p&gt; tag) to gray
(\#999999):

```css
p {
  color: #999999;
}
```

This sets padding of a <div> element with the id attribute of
main:

```css
div#main {
  padding-bottom: 2em;
  padding-top: 3em;
}
```

This sets the font size to 14 pixels for all elements with a class
large:

```css
.large {
  font-size: 14pt;
}
```

This hides `<div>`, which are direct children of the `<body>`
element:

```css
body > div {
  display: none;
}
```

This sets the width to 150 pixels for input which the name attribute is
email:

```css
input[name="email"] {
  width: 150px;
}
```


More information is available at Wikipedia
(http://en.wikipedia.org/wiki/Cascading\_Style\_Sheets) and MDN
(https://developer.mozilla.org/en-US/docs/Web/CSS).

CSS3 is an upgrade to CSS that includes new ways of doing things such as
rounded corners, borders, and gradients, which were possible in regular
CSS only with the help of PNG/GIF images and by using other tricks.

For more information refer to CSS3.info (http://css3.info), w3school
(<http://www.w3schools.com/css3/default.asp>), and CSS3 vs. CSS
comparison article on Smashing
(http://coding.smashingmagazine.com/2011/04/21/css3-vs-css-a-speed-benchmark).

JavaScript
----------

<span id="JavaSCRIPTS" class="anchor"></span>JavaScript (JS) was started
in 1995 at Netscape as LiveScript. It has the same relationship with
Java as a hamster has with a ham, so please don't confuse one with
another.

These days, JavaScript is used for both client-side and server-side web,
as well as in desktop application development, drones, Internet of
Things (IoT), and other things. This is the main focus of this book
because with JavaScript you can develop across all the layers. You don't
need any other languages!

Let's start with JavaScript in HTML. Putting JS code into a
&lt;script&gt; tag is the easiest way to use JavaScript in an HTML
document:

```html
<script type="text/javascript" language="javascript">
  alert("Hello world!") //simple alert dialog window
</script>
```

Be advised that mixing HTML and JS code is not a good idea, so to
separate them we can move the code to an external file, and include it
by setting source attribute `src="filename.js"` on a `<script/>` tag, for
example, for the app.js resource:

```html
<script src="js/app.js" type="text/javascript"
  language="javascript">
</script>
```

Note that the closing `<script/>` tag is mandatory even with an
empty element like we have where we include the external source file.
Type and language attributes over the years became optional in modern
browsers due to the overwhelming dominance of JavaScript.

Other ways to run JavaScript include the following:

-   The inline approach already covered

-   WebKit browser Developer Tools and FireBug consoles

-   The interactive Node.js shell

One of the advantages of the JavaScript language is that it's loosely
typed. This loose or weak typing, as opposed to strong typing
(http://en.wikipedia.org/wiki/Strong\_typing) in languages like C and
Java, makes JavaScript a better programming language for prototyping.
Here are some of the main types of JavaScript objects or classes (there
are not classes per se; objects inherit from objects).

### Number Primitives

Number primitives are numerical values; for example:

```js
var num = 1
```

### Number Object

This is the
[Number](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number)
https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global\_Objects/Number

object and its methods; for example:

```js
var numObj = new Number('123') // Number object
var num = numObj.valueOf() // number primitive  
var numStr = numObj.toString() // string representation
```

### String Primitives

String primitives are sequences of characters inside of single or double
quotes; for example:

```js
var str = 'some string'
var newStr = "abcde".substr(1,2)
```

For convenience, JavaScript automatically wraps string primitives with
String object methods, but they are not quite the same
(https://developer.mozilla.org/enUS/docs/JavaScript/Reference/Global\_Objects/String\#Distinction\_between\_string\_primitives\_and\_String\_objects).

### String Object

The String object has a lot of useful methods, like length, match, and
so on; for example:

```js
var strObj = new String("abcde") // String object
var str = strObj.valueOf() // string primitive 
strObj.match(/ab/)
str.match(/ab/) // both call will work
```

### RegExp Object

Regular Expressions or RegExps are patterns of characters used in
finding matches, replacing, and testing of strings.

```js
var pattern = /[A-Z]+/
'ab'.match(pattern) // null
'AB'.match(pattern) // ["AB"]
```

The match() method returns an array of matches (\["AB"\]). If all you
need is a Boolean true/false, then simply use pattern.test(str). For
example:

```js
var str = 'A'
var pattern = /[A-Z]+/
pattern.test(str) // true
```

### Special Types

When in doubt (when debugging), you can always call typeof obj. Here are
some of the special types used in JS:

-   NaN: Not a number
-   null: Null, nada, zip
-   undefined: Undeclared variable
-   function: Function

### JSON

The JSON library allows us to parse and serialize JavaScript objects;
for example:

```js
var obj = JSON.parse('{a: 1, b: "hi"}')  
var stringObj = JSON.stringify({a: 1, b: 'hi'})
```

### Array Object

[Arrays](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array) (https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array)
are zero-index-based lists. For example, to create an array:

```js
var arr = new Array()
var arr = ['apple', 'orange', 'kiwi']
```

The Array object has a lot of nice methods, like indexOf, slice, and
join. Make sure that you're familiar with them, because if used
correctly, they'll save a lot of time.

### Data Object

```js
var obj = {name: 'Gala', url: 'img/gala100x100.jpg', price: 129}
```

or

```js
var obj = new Object()
```

We provide more on inheritance patterns later.

### Boolean Primitives and Objects

Just as with String and Number, [Boolean](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Boolean) (https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Boolean)
can be a primitive and an object.

```js
var bool1 = true  
var bool2 = false
var boolObj = new ``Boolean``(false)
```

### Date Object

[Date](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date) (https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date)
objects allow us to work with dates and time; for example:

```js
var timestamp = Date.now() // 1368407802561
var d = new Date() //Sun May 12 2013 18:17:11 GMT-0700 (PDT)
```

### Math Object

These are used for mathematical constants and functions
https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global\_Objects/Math;
for example:

```js
var x = Math.floor(3.4890)
var ran = Math.round(Math.random()*100)
```

### Browser Objects

Browser objects give us access to a browser and its properties like
URLs; for example:

```js
window.location.href = 'http://rapidprototypingwithjs.com'  
console.log('test')
```

### DOM Objects

DOM objects or DOM (https://developer.mozilla.org/en/docs/Web/API/Node)
nodes are the browser interface to the DOM elements rendered on the
page. They have properties such as width, height, position, and so on,
and, of course, inner content, which can be another element or text. To
get a DOM node, you can use its ID; for example:

```js
var transactionsContainer = document.createElement('div')  
transactionsContainer.setAttribute('id', 'main')  
var content = document.createTextNode('Transactions')  
transactionsContainer.appendChild(content)  
document.body.appendChild(transactionsContainer)  
var main = document.getElementById('main')  
console.log(main, main.offsetWidth, main.offsetHeight)
```

### Globals

In addition to classes such as `String`, `Array`, `Number`, and `Math`, which
have a lot of useful methods, you can call the following methods known
as globals, meaning you can invoke them from anywhere in your code:

-   encodeURI (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/encodeURI):
    Encodes a Uniform Resource Identifier (URI) to give you a URL, e.g.,
    encodeURI ('http://www.webapplog.com/js is awesome')

-   decodeURI
    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/decodeURI):
    Decodes a URI

-   encodeURIComponent
    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/encodeURIComponent):
    Encode URI for URL parameters (don’t use it for the entire
    URL string)

-   decodeURIComponent
    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/decodeURIComponent):
    Decodes the fragment

-   isNaN (
    <https://developer.mozilla.org/en/docs/Web/>JavaScript/Reference/Global\_Objects/  
    isNaN): Determines whether a value is a number or not

-   [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/JSON):
    Parsing (parse()) and serializing (stringify()) of JSON data

-   [parseFloat](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
    (
    https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global\_Objects/parseFloat):
    Converts a string to a floating number

-   [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/parseInt):
    Converts a string to a number

-   [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Intl):
    Language-specific string comparison methods

-   Error
    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Error):
    An error object that you can use to instantiate your own error
    objects; for example, throw new Error('This book rocks!')

-   [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
    (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Date): Various methods to work with dates

### Conventions

JavaScript uses a number of style conventions. One of them is camelCase, in which you type multiple words as one word, capitalizing the first characters of the each word starting from the second one.

Semicolons are optional. Names starting with an underscore are private methods or attributes, but not because they are protected by the language. We use `_` to simply to alert the developers not to use them because they might change in the future.

JavaScript supports numbers only up to 53 bits in size. Check out large numbers' libraries if you need to deal with numbers larger than that.

The full references for JavaScript and DOM objects are available at [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/JavaScript/Reference) (https://developer.mozilla.org/en-US/docs/JavaScript/Reference) and w3school (http://www.w3schools.com/jsref/default.asp).

For JS resources such as ECMA specs, check out the list at JavaScript Language Resources (<https://developer.mozilla.org/en-US/docs/JavaScript/Language_Resources>). As of this writing, the latest JavaScript specification is ECMA-262 Edition 5.1 (<http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf>) and HTML (<http://www.ecma-international.org/ecma-262/5.1>).

Another important distinction of JS is that it's a functional and prototypal language. Typical syntax for function declaration looks like this:

```js
function Sum(a,b) {  
  var sum = a + b  
  return sum  
}  
console.log(Sum(1, 2))
```

Functions in JavaScript are first-class citizens (http://en.wikipedia.org/wiki/First-class\_function) due to the functional programming (http://en.wikipedia.org/wiki/Functional\_programming) nature of the language. Therefore, functions can be used as other variables or objects; for example, functions can be passed to other functions as arguments:

```js
var f = function (str1){
  return function(str2){  
  return str1 + ' ' + str2  
  }  
}  
var a = f('hello')  
var b = f('goodbye')  
console.log((a('Catty'))  
console.log((b('Doggy'))
```

It's good to know that there are several ways to instantiate an object in JS:

-   [Classical inheritance](http://www.crockford.com/javascript/inheritance.html) (http://www.crockford.com/javascript/inheritance.html) pattern
-   [Pseudo-classical inheritance](http://javascript.info/tutorial/pseudo-classical-pattern)
    (http://javascript.info/tutorial/pseudo-classical-pattern) pattern
-   Functional inheritance pattern

For further reading on inheritance patterns, check out Inheritance Patterns in JavaScript (http://bolinfest.com/javascript/inheritance.php) and Inheritance revisited (https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Inheritance\_Revisited).

More information about browser-run JavaScript is available at Mozilla Developer Network (https://developer.mozilla.org/en-US/docs/JavaScript/Reference), Wikipedia (http://en.wikipedia.org/wiki/JavaScript), and w3schools (http://www.w3schools.com/js/default.asp).

Agile Methodologies
===================

The Agile software development methodology evolved due to the fact that traditional methods like Waterfall weren't good enough in situations of high unpredictability; that is, when [the solution is unknown](http://www.startuplessonslearned.com/2009/03/combining-agile-development-with.html (http://www.startuplessonslearned.com/2009/03/combining-agile-development-with.html). Agile methodology includes Scrum/sprint, test-driven development, continuous deployment, paired programming, and other practical techniques, many of which were borrowed from extreme programming.

Scrum
-----

In regard to management, the Agile methodology uses the Scrum approach. More about Scrum can be read at the following sources:

-   [Scrum Guide in PDF](http://www.scrumguides.org/docs/scrumguide/v1/scrum-guide-us.pdf) (http://www.scrumguides.org/docs/scrumguide/v1/scrum-guide-us.pdf)
-   [Scrum.org](http://www.scrum.org/) (http://www.scrum.org)
-   [Scrum development Wikipedia article](http://en.wikipedia.org/wiki/Scrum_(development))(http://en.wikipedia.org/wiki/Scrum_(development))

The Scrum methodology is a sequence of short cycles, and each cycle is called a *sprint.* One sprint usually lasts from one to two weeks. A typical sprint starts and ends with a sprint planning meeting where new tasks are assigned to team members. New tasks cannot be added to the sprint in progress; they can be added only at the sprint meetings.

An essential part of the Scrum methodology is the daily scrum meeting, hence the name. Each scrum is a 5- to 15-minute-long meeting, often conducted in a hallway. In scrum meetings, each team member answers three questions:

1.  What have you done since yesterday?
2.  What are you going to do today?
3.  Do you need anything from other team members?

Flexibility makes Agile an improvement over the Waterfall methodology, especially in situations of high uncertainty (i.e., in startups).

The advantage of Scrum methodology is that it is effective where it is hard to plan ahead of time, and also in situations where a feedback loop is used as the main decision-making authority.

Test-Driven Development
-----------------------

<span id="TDD" class="anchor"></span>Test-driven development (TDD) consists of the following steps:

1.  Write failing automated test cases for new features, tasks, or
    enhancement by using assertions that are either true or false.
2.  Write code to successfully pass the test cases.
3.  Refactor code if needed, and add functionality while keeping the
    test cases passed.
4.  Repeat until all tasks are complete.

Tests can be split into functional and unit testing. The latter is when a system tests individual units, methods, and functions with dependencies mocked up, whereas the former (also called integration testing) is when a system tests a slice of a functionality, including dependencies.

There are several advantages of TDD:

-   Fewer bugs and defects
-   More efficient codebase
-   Confidence that code works and doesn't break the old functionality

Continuous Deployment and Integration
-------------------------------------

Continuous deployment (CD) is a set of techniques to rapidly deliver new features, bug fixes, and enhancements to the customers. CD includes automated testing and automated deployment. Using CD, manual overhead is decreased and feedback loop time is minimized. Basically, the faster a developer can get the feedback from the customers, the sooner the product can pivot, which leads to more advantages over the competition. Many startups deploy multiple times in a single day in comparison to the 6-to 12-month release cycle that is still typical for corporations and big companies.

The advantages of the CD approach include decreased feedback loop time and manual labor overhead.

The difference between CD and continuous integration is outlined in the post Continuous Delivery vs. Continuous Deployment vs. Continuous Integration - Wait huh? ( <http://blog.assembla.com/assemblablog/tabid/12618/bid/92411/Continuous-Delivery-vs-Continuous-Deployment-vs-Continuous-Integration-Wait-huh.aspx>)

Some of the most popular solutions for continuous integration include the following:

-   [*Jenkins*](http://jenkins-ci.org) (http://jenkins-ci.org): An extendable open source continuous integration server
-   [*CircleCI*](https://circleci.com) (https://circleci.com): Ship better code, faster
-   [*Travis CI*](https://travis-ci.org) (https://travis-ci.org): A hosted continuous integration service for the open source community

Pair Programming
----------------

Pair programming is a technique when two developers work together in one environment. One of the developers is a driver, and the other is an observer. The driver writes code, and the observer assists by watching and making suggestions. Then they switch roles. The driver has a more tactical role of focusing on the current task. In contrast, the observer has a more strategic role, overseeing "the bigger picture" and finding bugs and ways to improve an algorithm.

The following are the advantages of paired programming:

-   Pairs result in shorter and more efficient codebase, and introduce fewer bugs and defects.
-   As an added bonus, knowledge is passed among programmers as they work together. However, conflicts between developers are possible, and not uncommon at all.

Back-End Definitions
====================

The back end is another name for the server. It's everything after the browser. It includes server platforms like PHP, Python, Java, Ruby, and of course Node.js, as well as databases and other technologies.

Luckily, with modern back-end-as-a-service solutions you can bypass the back-end development entirely. With just a single &lt;script&gt; tag included, you can get a real-time database with the ability to put some logic into it like access level control (ALC), validation, and so on. I'm talking about Firebase.com and Parse.com.

In those cases where you still need your own custom server code, Node.js is the weapon of choice!

Node.js
-------

Node.js is an open source, event-driven asynchronous I/O technology for building scalable and efficient web servers. Node.js consists of Google’s V8 JavaScript engine (http://en.wikipedia.org/wiki/V8\_(JavaScript\_engine)). It was maintained by cloud company Joyent (http://joyent.com), but moved to the Technical Steering Committee governance.

The purpose and use of Node.js is similar to Twisted (<http://twistedmatrix.com/trac>) for Python and EventMachine (<http://rubyeventmachine.com>) for Ruby. The JavaScript implementation of Node was the third one after attempts at using Ruby and C++ programming languages languages.

Node.js is not in itself a framework like Ruby on Rails; it's more comparable to the pair of PHP and Apache. I'll provide a list of the top Node.js frameworks chapter 6.

The following are the advantages of using Node.js:

-   Developers have high likelihood of familiarity with JavaScript due to its status as a de facto standard for web and mobile development
-   Using one language for front-end and back-end development speeds up the coding process. A developer's brain doesn't have to switch between different syntaxes, a so-called context switch. The learning of methods and classes goes faster.
-   With Node.js, you could prototype quickly and go to market to do your customer development and customer acquisition early. This is an important competitive advantage over other companies that use less agile technologies (e.g., PHP and MySQL).
-   Node.js is built to support real-time applications by utilizing web sockets.

For more information go to Wikipedia (http://en.wikipedia.org/wiki/Nodejs), Nodejs.org (http://nodejs.org/about/ ), and articles on ReadWrite (http://readwrite. com/2011/01/25/wait-whats-nodejs-good-for-aga) and O’Reilly (<http://radar.oreilly.com/2011/07/what-is-node.html>).

For the current state of Node.js (as of this writing), refer to the official Node.js blog (<https://nodejs.org/en/blog>).

NoSQL and MongoDB
-----------------

MongoDB, from huMONGOus, is a high-performance, no-relationship database for huge quantities of data. The NoSQL concept came out when traditional relational database management systems (RDBMSs) were unable to meet the challenges of huge amounts of data.

Here are the advantages of using MongoDB:

-   *Scalability:* Due to a distributed nature, multiple servers and data centers can have redundant data.
-   *High performance:* MongoDB is very effective for storing and retrieving data, partially owing to the absence of relationships between elements and collections in the database.
-   *Flexibility:* A key-value store is ideal for prototyping because it doesn't require developers to know the schema and there is no need for fixed data models or complex migrations.

Cloud Computing
---------------

Cloud computing consists of the following components:

-   Infrastructure as a Service (IaaS), including Rackspace and Amazon Web Services
-   Platform as a Service (PaaS), including Heroku and Windows Azure
-   Back end as a Service (BaaS), the newest, coolest kid on the block, including Parse.com and Firebase
-   Software as a Service (SaaS), including Google Apps and Salesforce.com

Cloud application platforms provide the following advantages:

-   Scalability; for example, they can spawn new instances in a matter of minutes
-   Ease of deployment; for example, to push to Heroku you can just use `$ git push`
-   Pay-as-you-go plans where users add or remove memory and disk space based on demands
-   Add-ons for easier installation and configuration of databases, app servers, packages, and so on
-   Security and support

PaaS and BaaS are ideal for prototyping, building minimal viable products (MVP), and for early-stage startups in general.

Here is the list of the most popular PaaS solutions:

-   [Heroku](http://heroku.com) (http://heroku.com )
-   [Windows Azure](http://windowsazure.com)(http://windowsazure.com )
-   [Nodejitsu](http://nodejitsu.com) (http://nodejitsu.com )
-   [Nodester](http://nodester.com) (http://nodester.com)

HTTP Requests and Responses
---------------------------

Each HTTP Request and Response consists of the following components:

-   *Header:* Information about encoding, length of the body, origin, content type, and so on
-   *Body:* Content, usually parameters or data, that is passed to the server or sent back to a client

In addition, the HTTP Request contains these elements:

-   *Method:* There are several methods with the most common being GET, POST, PUT`,` and DELETE
-   *URL:* Host, port, path; for example, https://graph.facebook.com/498424660219540
-   *Query string:* Everything after a question mark in the URL (e.g., ?q=rpjs&page=20)

RESTful API
-----------

RESTful (REpresentational State Transfer) API became popular due to the demand in distributed systems whereby each transaction needs to include enough information about the state of the client. In a sense, this standard is stateless because no information about the clients' states is stored on the server, thus making it possible for each request to be served by a different system.

Here are some of the distinct characteristics of RESTful API:

-   It has better scalability support due to the fact that different components can be independently deployed to different servers.
-   It replaced Simple Object Access Protocol (SOAP) because of the simpler verb and noun structure.
-   It uses HTTP methods such as GET, POST, DELETE, PUT, OPTIONS, and so on.

Table 1-1 is an example of a simple Create, Read, Update and Delete (CRUD) RESTful API for Message Collection.

***Table 1-1.** An Example of a CRUD RESTful API*

| **Method** | **URL**         | **Meaning**                                                                       
|--------|---------------------|-------------------------------------------------------------------------------|
| GET    | /messages.json      | Return list of messages in JSON format                                        |
| PUT    | /messages.json      | Update/replace all messages and return status/error in JSON                   |
| POST   | /messages.json      | Create new message and return its ID in JSON format                           |
| GET    | /messages/{id}.json | Return message with ID {id} in JSON format                                    |
| PUT    | /messages/{id}.json | Update/replace message with ID {id}, if {id} message doesn't exist, create it |
| DELETE | /messages/{id}.json | Delete message with *id* {id}, return status/error in JSON format             |

REST is not a protocol; it is an architecture in the sense that it's more flexible than SOAP, which is a protocol. Therefore, REST API URLs could look like /messages/list.html or /messages/list.xml in case we want to support these formats.

PUT and DELETE are idempotent methods (http://en.wikipedia.org/wiki/Hypertext\_Transfer\_Protocol\#Idempotent\_methods\_and\_web\_applications),
which means that if the server receives two or more similar requests, the end result will be the same.

GET is nullipotent and POST is not idempotent and might affect state and cause side effects.

Further reading on REST API can be found at Wikipedia (http://en.wikipedia. org/wiki/Representational\_state\_transfer) and A Brief Introduction to REST article(http://www.infoq.com/articles/rest-introduction).

Summary
=======

This concludes the first chapter. In this chapter we've covered some of the core concepts of web development. They'll be a solid foundation for the rest of the book. I'm sure some of the concepts were familiar to you:

-   HTML
-   CSS
-   JavaScript types and objects
-   Agile
-   Node.js
-   NoSQL
-   HTTP Request
-   RESTful API

Nevertheless, it's good to brush up on them because they are numerous and vast. Theory is not that useful or interesting without understanding how it appl<span id="Editing" class="anchor"></span>ies and benefits the actual code. Therefore, we'll move swiftly to the technical setup to get you to the coding projects fast.
