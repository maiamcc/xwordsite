---
layout: post
title: "Slicing is Not Enough (or, Adventures in Deep Copy)"
date: 2014-08-26 11:56:57 -0400
comments: true
categories: [recurse center, tech, python]
---
The sudoku solver that I'm working on with [Miriam](https://mlauter.github.io/) was nearly finished before it started when we were playing around with ways to draw a board to terminal. I came to the table with some initial code I had written---

```python
def draw_board(board):
    for i in range(0,9):
        board[i].insert(6, "|")
        board[i].insert(3, "|")
        row_string = "  ".join(map(str, board[i]))
        if i in [2, 5]:
            print row_string
            print "________________________________"
        else:
            print row_string

def newboard():
    return [[0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]]
```

and the shiny output!

```python
>>> myboard = newboard()
>>> draw_board(myboard)

0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
________________________________
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
________________________________
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
```

Everything was awesome! Or so I thought. But look what happened when I ran the code again.<!-- more -->

```python
>>> draw_board(myboard)

0  0  0  |  |  0  0  |  0  |  0  0  0
0  0  0  |  |  0  0  |  0  |  0  0  0
0  0  0  |  |  0  0  |  0  |  0  0  0
________________________________
0  0  0  |  |  0  0  |  0  |  0  0  0
0  0  0  |  |  0  0  |  0  |  0  0  0
0  0  0  |  |  0  0  |  0  |  0  0  0
________________________________
0  0  0  |  |  0  0  |  0  |  0  0  0
0  0  0  |  |  0  0  |  0  |  0  0  0
0  0  0  |  |  0  0  |  0  |  0  0  0
```

And again.

```python
>>> draw_board(myboard)

0  0  0  |  |  |  0  |  0  |  0  |  0  0  0
0  0  0  |  |  |  0  |  0  |  0  |  0  0  0
0  0  0  |  |  |  0  |  0  |  0  |  0  0  0
________________________________
0  0  0  |  |  |  0  |  0  |  0  |  0  0  0
0  0  0  |  |  |  0  |  0  |  0  |  0  0  0
0  0  0  |  |  |  0  |  0  |  0  |  0  0  0
________________________________
0  0  0  |  |  |  0  |  0  |  0  |  0  0  0
0  0  0  |  |  |  0  |  0  |  0  |  0  0  0
0  0  0  |  |  |  0  |  0  |  0  |  0  0  0
```

AAAAAHHHH!!! THE VERTICAL LINES ARE ATTACKING! RUN FOR YOUR LIVES!

At this point, being a clever programmer, I realized that I was changing the myboard array every time, inserting more and more vertical lines every time at indeces 3 and 6 every time I called `draw_board`.

```python
>>> myboard
[[0, 0, 0, '|', '|', '|', 0, '|', 0, '|', 0, '|', 0, 0, 0], [0, 0, 0, '|', '|',
'|', 0, '|', 0, '|', 0, '|', 0, 0, 0], [0, 0, 0, '|', '|', '|', 0, '|', 0, '|',
0, '|', 0, 0, 0], [0, 0, 0, '|', '|', '|', 0, '|', 0, '|', 0, '|', 0, 0, 0], [0,
 0, 0, '|', '|', '|', 0, '|', 0, '|', 0, '|', 0, 0, 0], [0, 0, 0, '|', '|', '|',
 0, '|', 0, '|', 0, '|', 0, 0, 0], [0, 0, 0, '|', '|', '|', 0, '|', 0, '|', 0, '
|', 0, 0, 0], [0, 0, 0, '|', '|', '|', 0, '|', 0, '|', 0, '|', 0, 0, 0], [0, 0,
0, '|', '|', '|', 0, '|', 0, '|', 0, '|', 0, 0, 0]]
```

So I handily revised my code:

```python
def draw_board(board):
    copyboard = board[:]
    for i in range(0,9):
        copyboard[i].insert(6, "|")
        copyboard[i].insert(3, "|")
        row_string = "  ".join(map(str, copyboard[i]))
        if i in [2, 5]:
            print row_string
            print "________________________________"
        else:
            print row_string
```

Instead of modifying `board`, I was modifying `copyboard`, a _new_ object made by slicing `board`. Since it wasn't point back to the original array passed into the function, I reasoned, the original array wouldn't be modified, and I could continue calling `draw_board(myboard)` to my heart's content.

But, horror of horrors! The vertical lines kept attacking! I thought I knew how slicing worked! At this point I brought to code to Miriam, stumped. We did a sanity check:

```python
>>> a = [1,2,3]
>>> b = a
>>> b
[1, 2, 3]
>>> a is b
True
>>> c = a[:]
>>> c
[1, 2, 3]
>>> a is c
False
>>> a.append(4)
>>> a
[1, 2, 3, 4]
>>> b
[1, 2, 3, 4]
>>> c
[1, 2, 3]
```

If you point a new object back to an existing object, then they're identical and the new object always refers back to the old one, _but_ you can create a new list (via slicing) that is identical to the old list but doesn't refer back to it, has a separate identity, can be called and modified separately, etc. What was going onnn???

The problem, we eventually discovered, was with nested lists. Turns out that slicing is not enough: you get a _new_ list of lists, but all the lists inside point back to the old lists.

```python
>>> a = [[1,2,3],[1,2,3],[1,2,3]]
>>> c = a[:]
>>> a
[[1, 2, 3], [1, 2, 3], [1, 2, 3]]
>>> c
[[1, 2, 3], [1, 2, 3], [1, 2, 3]]
>>> a is c
False
>>> a[0] is c[0]
True
```

So even though we copied the board with slicing---`copyboard = board[:]`---all of the rows in `copyboard` still pointed at the rows in `board`: copyboard[i]` and `board[i] were the same thing, so modifying `copyboard` changed `board` as well, leading to the endless insertion of vertical lines observed above.

Miriam hit upon this really excellent thing called _deep copy_; as opposed to regular 'ol shallow copying like that above, deep copy would make a _new list_ populated by _new lists_. And hallelujah, the problem was solved! The vertical line monsters were vanquished, and the people of Sudoku-Land could live in peace once more!

```python
>>> import copy

>>> def draw_board(board):
...     copyboard = copy.deepcopy(board)
...     for i in range(0,9):
...         copyboard[i].insert(6, "|")
...         ...etc.

>>> myboard = newboard()
>>> draw_board(myboard)

0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
________________________________
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
________________________________
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0

>>> draw_board(myboard)

0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
________________________________
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
________________________________
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0

>>> draw_board(myboard)

0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
________________________________
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
________________________________
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
0  0  0  |  0  0  0  |  0  0  0
```
