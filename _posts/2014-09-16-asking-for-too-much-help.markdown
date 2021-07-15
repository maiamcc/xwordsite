---
layout: post
title: "Asking for TOO MUCH Help?"
date: 2014-09-16 12:47:54 -0400
comments: true
categories: [recurse center, writing about coding]
---
(Apparently some people at Hacker School think I'm an Iron Blogger, despite me being nothing of the sort. There's no money riding on whether or not I make consistent blog posts---but I figure I should do what I can to sustain this favorable impression of me!)

Since my HS halfway check-in, I've resolved to ask more questions and not let myself get stuck banging my head against problems that could be solved in a hot second by any of the three people sitting next to me. I think that I've done a pretty good job with this resolution; I ask for help way more frequently, and as a result, I think I get more done. However, I feel the need to remind myself that there is such a thing as _asking for too much help_.

Take this example: I was sitting down with Tristan, a fellow HSer, attempting to set up virtualenv and get all of my permissions and installs un-borked. I was totally in over my head, having never used virtualenv before, and he was helping me sort it out. There was some funky stuff that needed fixing having to do with my $PATH being invalid because one of the folder names contained a space. We dealt with that issue, and now most of the stuff worked, but I still couldn't manage to run bpython from inside my virtualenv. I showed Tristan the error message my computer was spewing, and asked him, "What's going on?"

His response: "What do you think is going on?"

Me: "Well, it won't run bpython!"

Him: "Come on, you can do better than that."<!-- more -->

When he said this, I was somewhat shocked to realize that I hadn't even fully read the text of the error message---I assumed that it would be gibberish to me, as such messages often are, and that I would need to find someone with greater terminal-fu to help me decipher it.

I can't remember now what exactly the problem was, but it was something having to do with the fact that my shiny new un-borked $PATH wasn't finding bpython because I had sudo installed it somewhere outside the virtualenv... (That sounds kind of illogical now that I write it, but I promise it was a real problem.) Regardless, by carefully reading the error message and talking it through with Tristan, I was able to figure out what had to be done pretty much on my own. It was super exciting, of course, because for most of Hacker School the terminal has remained an almost entirely opaque black box of sorcery (and possibly gnomes), but more than that, it made me sit up and realize that it _is_ within my power to solve a lot of the problems that I come across.

Now I have two things to balance. Obviously, I want to keep asking questions, learning new things, keeping myself from getting stuck in ruts. But there's also something to be said for that fifteen-minute window to work on a problem before I turn to Zulip or the person next to me. I tend to assume that anything I don't know is a result of my limited programming background, and is something that I can learn _massively_ faster from a person than from hunting around on StackOverflow. And yes, this is often the case, but when it's not---or even when it is---the trouble-shooting and debugging and StackOverflow-ing and playing around in the REPL are all supremely valuable skills. I can solve my own problems more often than I expect, and should remember that!
