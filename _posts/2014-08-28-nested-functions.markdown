---
layout: post
title: "Nested Functions"
date: 2014-08-28 11:20:16 -0400
comments: true
categories: [recurse center, tech, python]
---
Know what's cool? Nested functions.

The other day, as I was making this craaaazy dance parser (that's getting more and more convoluted by the minute), Alan suggested a really baller way of organizing it: using a bunch of little mini-parser functions that all look for something specific in your text, and smooshing related parsers together into one macro-parser that runs all of them in turn until one returns something. In Alan's lovely mock-up code that I'm shamelessly copying over here, that might look like this:

```python
def contains_an_a(input):
    return input.find("a") > -1

def contains_a_b(input):
    return input.find("b") > -1

def one_of(parsers):
    def parser(input):
        for p in parsers:
            result = p(input)
            if result:
                return result
    return parser

contains_an_a_or_a_b = one_of([contains_an_a, contains_a_b])
```

The handy thing about having all of these bite-size functions is that none of them gets too crazy bulky, and also, since they're functions (and not dicts like I was using earlier), I can use regexes in them! I'm also jamming on the idea of passing functions to other functions, so I made an even bigger function called `use_parser` that takes a parser, a default value, and an 'ask', which it uses to ask the user (via raw_input) what the value should be. This way, I can take a single parser and customize it in a variety of ways. Say for example I have a distance parser: for do-si-dos and gypsies it should default to False (because those moves don't necessarily need to take a distance) and for allemandes it should ask the user, "what's the value of 'dist' here?"<!-- more -->

But there's something odd going on here that initially threw me for a loop. (...No lie, it kind of still does.) And that's defining a function INSIDE of another function!

I got tripped up the first time when I tried to check if the parser returned anything, with code that looked like this:

```python
def one_of(parsers):
    def parser(input):
        for p in parsers:
            result = p(input)
            if result:
                return result
    if parser:
        return parser
    else:
        print "Your parser didn't return anything!"
```

But even when the parser returned None, my print statement didn't get tripped. What's happening here is that `return parser` isn't returning a value, _it's returning a function_, and that function, by virtue of existing, will always evaluate to `True`. That's the reason `contains_an_a_or_a_b = one_of([contains_an_a, contains_a_b])` makes a new function rather that returning a value: because `one_of` returns a function _without calling it_. That's why this works:

```python
>>> def math(x):
...     def add(y):
...         return x+y
...     return add

>>> add_to_5 = math(5)
>>> add_to_5
<function add at 0x104502f50>
>>> # Look: Python recognizes this thing that I just defined as a function
>>> add_to_5(100)
105
>>> # and it takes arguments just like a normal function.
>>> # since math(x) returns a function, we can do
>>> # weird-lookin' stuff like this:
>>> math(30)(40)
70
```

In Python, functions are first-class objects, which means they can be passed as arguments and manipulated just like other data types. Which lets you do neat things like define functions inside other functions, and return functions from functions which you can then call later with the arguments that you choose, etc. etc. Cool stuff!
