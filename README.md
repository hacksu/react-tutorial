# React

React is a library written in JavaScript that tries to and usually succeeds at making it easier to make interactive web pages. React combines the descriptive markup of HTML, which we examined during our first meeting, with the dynamic code execution that we saw in our Python lesson, so i'm going to have to assume some background coding knowledge from you to avoid doing those lessons again at 3x speed. While you are all going to this Codepen.io link: https://codepen.io/tobeofuse/pen/MWBqqPX?editors=1010 , I am going to briefly explain how React makes coding simpler.

Let's look at [this checkout form](https://hacksu.github.io/react-tutorial/checkout-example/checkout-js.html), \[note to presenter: go to that site and show them these things] which I created using just the tools from our first lesson (HTML, CSS, and JavaScript.) The idea is that you can pay for a purchase at Mitch Mart using any combination of these three payment options: your existing account credit, a new credit card, or just trust me bro, come on, I'll pay you back, just trust me. If you're using an existing account, the login part is enabled; if you're entering a new card, the new card part is enabled, but if you're playing the bro card, you never need to enter anything.

So it's very simple to state the logic of when each form field should be enabled. The login fields should be enabled if the first checkbox is checked and the third one isn't; and the new card fields should be enabled if the second checkbox is checked and the third one isn't. Does that logic make sense to everyone?

So, in JavaScript, the thing that makes pages interactive are event listeners, which are functions that are automatically called when the user interacts with something on the page. To implement the functionality we have here, we basically have to write three event listeners 
- one for each checkbox 
- and they have to make changes to keep the page logically consistent. The event listener for the "existing account" checkbox has to enable or disable the login fields, but to know if it's allowed to enable them, it has to find the "trust me bro" checkbox using its ID or something similar and see if that is checked, because it's not allowed to enable these fields if it is. The event listener for the "new card" checkbox has to do the same thing with these other fields. And while the "trust me bro" checkbox's event listener has a really simple job to do when it gets checked (it just disables everything), when it gets unchecked, it has to retrieve the other two checkboxes and then enable the form fields that correspond to them only if they say so.

So, in short, we have three different event listener functions, they have to find and read from these other checkbox elements to find out what changes they need to make to the page, and the rules they have to follow to enforce our simple rules take some thinking about. We've gone from simple logic that I could get you all agree on to a long description that you'd probably want to double-check. Now let's visit [the version of this form that I made with React](https://hacksu.github.io/react-tutorial/checkout-example/checkout-react.html) [it's also linked at the bottom of the vanilla JS version] and see what's different.

The functionality of this page is exactly the same. The first difference in the implementation is that generally, in the world of React, you have variables that store the state of the page, which you can use in your code directly. Without React, you have to run code the find the checkboxes to read out whether they're checked or not when you're figuring out whether to disable or enable form fields. With React, you can easily use these variables that I am basically printing out here so that you can see them. Right now, since none of the checkboxes are checked, they're all storing "false".

And for the second difference, let's see what React does when we change whether a checkbox is checked.

So, yeah. Instead of having three fiddly little event listeners that update the page over time, when a state variable changes in React, there's an explosion and the form is rebuilt from scratch. That's a bit of a simplification, there's some reuse of stuff, but the idea is: you only have to write one function, which will create your form, and it will automatically be re-run [toggle checkbox] when something changes, and in the function you can just use that simple logic we started with when creating these elements. [Reiterate logic.] So things are a lot easier.

\~~then, i gave up on writing complete paragraphs~~

- so now we've seen how using React makes a difference in the process of updating a web page. basically, the code that comes packaged with react takes care of the job of "doing updates." your job is just to write the code that outputs what stuff should look like, and react will re-run that code when the variables that you're using in your code change.

(again, https://codepen.io/tobeofuse/pen/MWBqqPX?editors=1010 )

```javascript
// boring template stuff:

import React, { useState } from "https://esm.sh/react@18.2.0?dev";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client?dev";
import useFetch from "https://esm.sh/react-fetch-hook@1.9.5?dev";

const rootElement = document.querySelector("#root");
const component = React.createElement(MyComponent);
createRoot(rootElement).render(component);


function MyComponent(){
  // create content here:
  
}
```

- btw, while on codepen, try not to refresh or close the page, or you will lose your progress, unless you're signed into a codepen account and can thus save things.

- so we're starting with a basic template here. don't worry too much about this code because like i said, it's a standard template. but, it first uses import statements to give you access to variables that are declared in the react code; then, it makes use of some of them and makes the react code start updating the page based on the output of a function called MyComponent.

- so we need to write the code that goes in MyComponent, and make it return (output) the stuff we want on our page. a function is a reusable segment of code that probably contains some local variables; in react, a "component" is a reusable set of html elements whose contents are determined by a set of variables. so you can see how these things go together. when we write this function, we're really creating a component.

- let's do the simplest version of that now.

```jsx
return <p>Hello, world</p>;
```

- we are using an extension to javascript called jsx that lets you create and use html elements in javascript code exactly as you would use numbers or strings or other data types. this syntax is not technically 100% tied to react, but it's very convenient to use it here. if you just write a start tag, some content, and an end tag, you get an html element, just like if you type a quotation mark, some text, and then another quotation mark, you get a string.

- so does everyone see the hello, world? is codepen, like, working? and is everyone processing what we're doing here? bc i guess this looks kind of weird.

- okay great. the next thing we're going to do is create a variable and use it so we can see how to integrate variables into our html elements.

- first we're going to declare a variable called place. to declare a variable in javascript, you can use the keyword "let"; so this will become

```js
let place = "texas";
```

- then, we can use it in our html element just by enclosing the variable name in curly braces. replace "world" with that:

```jsx
return <p>Hello, {place}</p>;
```

- so, now we're creating an html element and incorporating the value of a variable. go us. if you want, you can change this string in the code and see how the result changes. however, to make a real web page, we're going to need to have a way to change the value based on something the user does; we need something the user can click, like a button or something. also, if we're doing that, we do have to update the variables in a way that prompts the react library code that's running in the background to update the page.

- let's handle that first problem first. we need to create both a variable and a way to update it. this can be done with the react-provided function "use state". this involves more weird syntax.

```js
const [greeting, setGreeting] = useState("Hello");
```


- while you copy that down: this is the intricate clockwork part of react. react updates the page over and over again by running this function over and over again. however, normally, variables get reset to their initial values when functions get re-run. if we updated our "place" variable by saying, like, `place="mars"`, it wouldn't update things properly; because to create the updated version of this page, the function needs to be re-run, and every time this function runs, place gets set to "texas" by that line of code. so it would never output anything containing "mars" in the return value down here. that's the most basic reason why we can't update our variables the normal way and have our page update.

- so, the values of our variables actually need to be stored outside of our component-creating function, and react will do this for us. we have all the tools we need for that on this line of code here (the one with "useState".)

- we are calling the function "useState" and giving it the input string "Hello". that input defines the initial value for our "greeting" variable.

- then, later, we can call the function setGreeting to update the value to something other than "Hello". after that, when this function re-runs, and this new line of code executes, greeting will be updated to its latest version by the return value of useState.

![](usestate.svg)

- so, this overall situation might sound tricky, but if you understand it even a little, the actual code we need to write will seem pretty simple. first, let's create a button under our paragraph.

```html
<button>full cowboy</button>
```

- when we have multiple HTML elements in a row, we need to group them, kind of like how you group strings and numbers into arrays when you want to treat multiple as a single thing. to do that in jsx, we put an empty start tag before and an empty close tag after the elements we have. so, our return statement will look like this:

```jsx
return <>
    <p>Hello, {place}</p>
    <button>full cowboy</button>
  </>;
```

- to add code that will run when the button is clicked, we have to add an onClick attribute. because its value contains javascript code, this attribute will need to use curly braces instead of quotation marks. (for normal html attributes, you would still use quotation marks; if you don't know what those are, don't worry about it.)

```jsx
return <>
    <p>Hello, {place}</p>
    <button onClick={}>full cowboy</button>
  </>;
```

- inside the curly braces, we can put the code we want to run when the button is clicked. i'm thinking something like `setGreeting("howdy")`. we can't just put that in the curly braces, though, because that constitutes calling the function in our code and the greeting will be set to howdy immediately, instead of that happening when the user clicks the button. to fix this, we just have to add the characters `()=>` right in front of the call to setGreeting. the resulting construct is called an arrow function; and this is what you do when you want to store a function call in your code for later instead of making it happen immediately.

- so do that. also, let's use the variable "greeting" in the HTML elements we're creating so we can see what it's storing, live. our completed function will look like this:

```jsx
function MyComponent(){
  // create elements here:
  let place = "texas";
  const [greeting, setGreeting] = useState("hello");
  return <>
    <p>{greeting}, {place}</p>
    <button onClick={()=>setGreeting("howdy")}>full cowboy</button>
  </>;
}
```

- so yeah. this is pretty much as simple as a react app gets. i will now pause so that everyone can catch up, ask questions, or opine that this code looks weird.
