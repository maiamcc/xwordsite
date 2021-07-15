---
layout: post
title: "So Much for That Project"
date: 2014-09-17 12:22:01 -0400
comments: true
categories: [recurse center]
---
Alas, it seems that my dreams of writing a chorale harmonizer in the style of J.S. Bach have to be put to bed until another day. Susan and I have been taking various stabs at this, trying out a few ineffective Python midi programs (one of these, incidentally, had ZERO documentation and was THE MOST FRUSTRATING THING EVER) before settling on [mingus](https://code.google.com/p/mingus/), a midi/music theory Python library. Unfortunately, it seems like no one's addressed any bug reports since 2011, so when we realized that midi read-in was totally borked, we were a little stymied. Specifically, if we gave it this file as input:

![Input file](/images/mingusbug_input.png)

It returned this mess here:

![Output file](/images/mingusbug_output.png)

<!-- more -->For the record, what seems to be going on here, as far as we can tell, is that while the notes have been preserved, the rhythms have all shifted over by one. The first note has been magically converted into a quarter note, and each note after that has the duration that ought to have belonged to the note before it. (To explain it another way: assume that we have a list of original notes and we're making a list of new notes, where each new note OUGHT to be identical to its corresponding original note. Instead, we get `newnote[0].duration == quarter`, `newnote[1].duration == orignote[0].duration`, `newnote[2].duration == orignote[1].duration`, etc.)

So, [we've submitted a bug report](https://code.google.com/p/mingus/issues/detail?id=125) but we're not optimistic since, like I mentioned, the last answered bug is from 2011. But one day, when my heart has healed, I'll go off looking for ways to fix this or for other Python midi libraries that are suitable for this project, and then I'll take another swing at the choral generator! (Any suggestions? Send them my way! I'm looking for a lib that can read, inspect, write, and output midi.)

Until then, as I near the end of HS, it's actually surprisingly freeing to have one less thing to worry about getting done. Obviously I'm not going to finish all of this stuff before HS ends, but here's what's on my docket at the moment:

* contradance database (search logic, and eventually expanding and populating database)
* sudoku solver (so close...!)
* more work on the fabulous [Leigh Honeywell](http://hypatia.ca/)'s [Virtuoso Project](https://github.com/hypatia/virtuoso), which will soon be a web app that doles out writing exercises to fight imposter syndrome, and is also a fabulous excuse for me to learn Bootstrap and play with design.
* goob.py, a fake git
