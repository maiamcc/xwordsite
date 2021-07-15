---
layout: post
title: "Observations from Phonebook Code Review"
date: 2014-09-12 15:38:52 -0400
comments: true
categories: [recurse center, code review]
---
Here are some gleanings from Amy's code review of [my phonebook applet](https://github.com/maiamcc/phonebook), and some self-study. Mostly for my own records and so I actually absorb all of this by writing out, but if anyone has comments, additions, disagreements with anything I've written here, fire away!

* misc. layout stuff, like putting import statements in alphabetical order
* avoid global vars when possible. I already knew this, but it's good to remember. For example, if you've assuming your program will be run on the command line, you can put global vars in the `main()` function.
* functions that only incidentally return stuff are _bad news_. I had a function called `phonebook_exists` that checked to see if the phonebook you were trying to look up existed; if it didn't exist, the func. would throw an error, and if it did, it would return the data of the phonebook. Which in retrospect was super weird because nothing the function name indicated that it was what you should use to get the contents of a saved phonebook. A much more sensible way to do this is to have a function called `read_phonebook` which attempts to return the contents of the saved phonebook, but if it fails (which you figure out with a try/except), then it throws an error. (Incidentally, I had a similar confusion with when things should and shouldn't be returned in another project I'm working on, my bootleg homemade git. I had a function called `save_at_hash` that would hash a file, save it at its hash, and then return the hash. Why did this function return the hash? I assumed it would be useful. Couldn't really tell you why. I ended up refactoring it into two functions, `make_hash`---which took a file and returned a hash---and `save_at_hash`---which took a file and a hash and saved a copy of the file at that hash.)<!-- more -->
* relatedly, try/except is your friend. I suspect that if you need a function that checks something's validity before running another function on it, if the check is simple, that checking func is probably unnecessary and you can handle that behavior with a try/except in the function that actually does stuff. Pydocs puts it wonderfully:

    > [EAFP](https://docs.python.org/2/glossary.html#term-eafp) (Easier to Ask for Forgiveness than Permission):

    > This common Python coding style assumes the existence of valid keys or attributes and catches exceptions if the assumption proves false. This clean and fast style is characterized by the presence of many `try` and `except` statements. The technique contrasts with the [LBYL](https://docs.python.org/2/glossary.html#term-lbyl) style common to many other languages such as C.

* but even though try/except is great, be wary! It can make debugging a mess---had something in here that caught TypeErrors, which exploded on Amy when she made a change that caught a type error, but my program printed "more arguments needed" instead of anything helpful like, y'know, a stacktrace.
* if you're defining a dict., it looks prettiest to put spaces on both sides of the colon
* string concat. is a) ugly and b) not very efficient. Use string interpolation (or in a pinch, `join`) instead.
* you can search for substrings with `"substring" in "string"`! Who knew? I wrote a whole human-written-input parser using `if string.find(substring) > -1`. My life has just changed.
* in `for` loops, explicit var names are the way to go. I'm usually decent about this when looping through lists, strings, whatever, but for some reason I tend to look through dictionaries with a very nondescript `for key in mydict`.
* `.txt` extensions are totally unnecessary. Text files don't even need extensions.
* streamlined, logical, one-thing-per-commit git histories are awesome!
* `str.startswith` and `str.endswith` are a thing! (Are both things?) Exciting! Now I want to go through all of the code I've been writing recently and use these to replace any hard-coded integers in string manipulation, because that stuff's gross, man.
* tests. Tests are good. Write them.
