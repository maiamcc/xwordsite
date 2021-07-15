---
layout: post
title: "Taming the Octopress"
date: 2014-09-02 17:59:40 -0400
comments: true
categories: [recurse center, git]
---
I was messing around with my website yesterday, and trying to make two sub-websites for my 'Music' and 'Programming' hats in a single Octopress install, and I _really was going to be on time to my dinner plans_ except once my website experiment was borked and I tried to restore my previous site... well, long story short, it was the borked-est, and I spent an hour then and an hour today hunting around with [Allison](http://akaptur.github.io/) trying to fix the problem. Turns out that in trying to roll back my changes, I'd introduced some discrepancy between my `master` and `gh-pages` branches, and I could get around all of this on github with force pushes (`-f`), but not so easily with actually deploying my site (`rake deploy`). In the end, I had to go into my Rakefile and add a plus sign somewhere that tells Octopress not to worry whether it's doing fast-forward commits[^1] and just commit anyway.<!--more-->

So, my website is alive, I have lost hours of my life to the jaws of the Octopress, and I may be switching to Jekyll or Pelican soon. But in the meantime, all of this made me intensely curious about git! I hit up [Mary](http://maryrosecook.com/) for a mini-seminar, and I wrote it all out on my blog to make sure I understood it. See: [my post on the inner workings of git](/blog/2014/09/02/all-about-git/).

[^1]: To quote from the Git docs: "When you try to merge one commit with a commit that can be reached by following the first commit’s history, Git simplifies things by moving the pointer forward because there is no divergent work to merge together — this is called a 'fast forward'." Or, look at this [explanation in pretty pictures](https://sandofsky.com/images/fast_forward.pdf). By default, Octopress will only deploy (which includes a commit) on a fast-forward, to avoid accidentally messing up any intermediate branched stuff.
