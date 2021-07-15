---
layout: post
title: "Truthiness"
date: 2015-04-16 21:13:19 -0400
comments: true
categories: [tech, python, humor]
---
Truthiness in Python is occasionally confusing. Obviously, `False` is false and `True` is true, but beyond that, what then?

`None` is always false--though this doesn't mean that `False == None`, which is a mistake I made early in my Python career. I was confused by how a nonexistant list and an empty list were both falsey, and somewhere in my mind I thought that they were both `None` as well. Not so much.<!--more-->

```python
>>> a = None
>>> bool(a)
False
>>> b = []
>>> bool(b)
False
>>> bool(a is None)
True
>>> bool(b is None)
False
```

A stylistic note here: since `None` is a singleton (i.e. there exists only one instance of it), the proper syntax is `foo is None`, rather than `foo == None`. But I digress.

The empty values of data structures are always falsey. Hence:

```python
>>> bool([])
False
>>> bool("")
False
>>> bool({})
False
```

And perhaps most confusingly:

```python
>>> bool(0)
False
>>> bool(1)
True
>>> bool(2)
True
>>> bool(-31.4)
True
```

I mean, this makes sense because we know that 0 is false and 1 is true... but if you think about it, this also means that `0` is the empty value of an `int` (which means that `0` is false, but every other value of `int` or `float` is true) This doesn't mean much in Python, of course, but I've been playing with Go lately, in which you have to initialize your variables before you can do anything with them, and suddenly the idea of an empty value makes a lot more sense (and the empty value for an int is indeed zero).

Conversely, every non-zero value of a data structure is true. That means that a string with stuff in it, a dict. with stuff in it, a list with stuff in it, etc. is true no matter what the stuff is. And so:

```python
>>> hip = False
>>> bool(hip)
False
>>> bool([hip, hip])
True
```

Proving conclusively, as we all knew, that *hips don't lie*.

([Ba-bm-psh](//instantrimshot.com/index.php?sound=rimshot&play=true).)

Extra credit: do you know what `["hip", "hip"]` is?

...(wait for it)...

It's a *hip hip array*.

([Womp womp](//wompwompwomp.com/).)
