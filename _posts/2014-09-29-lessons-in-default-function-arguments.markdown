---
layout: post
title: "Lessons in Default Function Arguments"
date: 2014-09-29 18:16:56 -0400
comments: true
categories: [recurse center, tech, python]
---
Today on "Bugs that everyone already knew about but Maia found out about for the first time so will write up anyway", we're going to talk about the perils and pitfalls of using mutable objects as default arguments for functions in Python. (This episode brought to you by Maia's contradance database and the letter Y.)

No, nothing went wrong in my code that caused me to learn this lesson, but multiple code reviewers raised red flags about this line in my code: `def resolve_query_dict(d, moves_list=Move.objects.all())`. `Move.objects.all()`, by the way, is a fancy Django function that returns a list of all of the `Move` objects in your database, and since I would likely never be running this code over an extended period of time while things were added to the database, accidentally freezing the value of "all of the moves in my database" wouldn't have really been an issue, but the dangers of writing code like the above are still whacky and interesting. Basically, odd things happen when you use mutable objects or called functions as default variables in your functions.<!-- more -->

Let's define a helper function:

```python
>>> def make_a_list():
    ... print "Making a list..."
    ... return [1,2,3]
```

and then some random function that takes a (called) function as a default value:

```python
>>> def list_length(mylist = make_a_list()):
...     return len(mylist)
Making a list...
```

The thing that's odd about the code that we just ran is that it printed "Making a list...", which implies that the `make_a_list` function got *called*, even though all we did was assign it as a default variable. Interesting. Now what happens if we run `list_length`?

```python
>>> list_length([1,2,3,4,5])
5
>>> list_length()
3
```

If you pass it an argument, it runs just as you'd expect it to. If you don't pass it arguments, it returns the value you'd expect, but notice that it doesn't print "Making a list..."---which implies that it hasn't run the `make_a_list` function! The conclusion we draw here is that when you use a function as a default argument, that function is called (and the value bound) *at assignment*, *not* whenever you run its container function. So that means that if you want your default-value-function to run every time you call its container function... well, it won't! If you needed more convincing:

```python
>>> from random import randint
>>> def plus_one(num=randint(1,1000)):
...     return num+1
>>> plus_one(5)
6
>>> # that worked as we expected it to
>>> plus_one()
42
>>> plus_one()
42
>>> plus_one()
42
>>> plus_one()
42
>>> plus_one()
42
>>> plus_one()
42
```

Hmm. It would appear that we aren't getting a new random number every time we run this function.

That's not the only weird thing about default arguments, though. Things can get messy even when you're not setting functions as default args---really, all it takes to break things is a mutable object.

```python
>>> def append_one(mylist = []):
...     mylist.append(1)
...     return mylist
>>> append_one()
[1]
>>> append_one()
[1, 1]
>>> append_one()
[1, 1, 1]
>>> append_one()
[1, 1, 1, 1]
>>> append_one()
[1, 1, 1, 1, 1]
```

As with the function-as-default-arg example, your default argument binds *at definition*---and what's more, it binds to a specific object in memory. So every time you call `append_one`, you're not appending one to a new empty list, you're appending one to *that exact empty list that you created in memory, which now has more and more things in it*. It's the same as if you passed in an existing, named list as your default:

```python
>>> stuff = [1,3,5,7]
>>> def append_one(mylist = stuff):
...     mylist.append(1)
...     return mylist
>>> append_one()
[1, 3, 5, 7, 1]
>>> append_one()
[1, 3, 5, 7, 1, 1]
>>> append_one()
[1, 3, 5, 7, 1, 1, 1]
```

Perhaps it's a bit more intuitive this way, but the exact same thing is happening in the previous example; the function is modifying a distinct object in memory, whether it was named before it got passed as a default argument or not.

Whacky fun! And a valuable lesson learned: *don't use mutable objects or functions as default values in your functions* unless you want a whole lot of hilarious code hijinks. (Which, hey, maybe you do, no judgments here!)
