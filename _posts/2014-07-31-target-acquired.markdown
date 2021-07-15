---
layout: post
title: "Target: Acquired"
date: 2014-07-31 18:42:31 -0400
comments: true
categories: [recurse center, code review]
---
At the end of Week 2, I'm still overwhelmed, but a bit less, and with a bit more conviction that I can in fact write code. I finished my first project in Python yesterday, and spent this morning implementing some code review I got. Here are some things I learned, mainly for my own reference but perhaps other beginning Python folks will find it useful as well:<!-- more -->

* 4x spaces instead of tabs (Sublime will do this for you really easily! Sublime is magic!)
* instead of a million "or's" in some truth statement, ask if it's in a list instead. So for instance, instead of `if a == 1 or a == True or a == true`, use `if a in [1, "True", "true"]`.
* next time I write a program that makes the user pick among options from the command line (dear God, hopefully never again), instead of a giant string of if/elif's, consider a dictionary that maps user responses to the functions they execute.
* if I did this again, I'd have made better use of classes, both as a) a way to group related methods and b) a way to keep track of the objects I was modifying. (Had a hell of a time trying to change some global variable, only to find that I'd somehow modified it as a local variable instead. Calling a method ON that object would eliminate that problem.)
* modular code is useful. Next time.
* you can do way more in `return` statements than I ever thought you could (like funky if statements and for loops).

I've figured out my next project! I'll be doing fun stuff with the English language (always a hoot) and [Markov Chains](http://setosa.io/blog/2014/07/26/markov-chains/). More specifically, I'm gonna write a program that will generate moderately-intelligible English text, based on patterns it learns from a sample text that I feed it. I'll start simple (just learning patterns of the words themselves), and if that works, I'll build a more complicated version (that recognizes syntactical patterns as well). Maybe if I have great success, I'll be able to do something whacky like a haiku generator!
