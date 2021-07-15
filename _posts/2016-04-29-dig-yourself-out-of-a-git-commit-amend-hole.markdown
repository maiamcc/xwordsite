---
layout: post
title: "Dig Yourself Out of a 'Git Commit Amend' Hole With Reflog"
date: 2016-04-29 22:59:25 -0400
comments: true
categories: [tech, git]
---
Raise your hand if you’ve ever `git commit`’d something you shouldn’t have. (It’s okay, this is a judgement-free space.)

And raise your hand if you’ve ever used `git commit --amend --no-edit`[^1] to try and hide your terrible, terrible shame. (We’re not even gonna _talk_ about `git push -f origin master`. Don’t do it, kids.)

And raise your hand one last time if you’ve ever `git commit --amend --no-edit`’d and then paused and looked at your computer and were suddenly struck by the realization that you’d ruined everything.

That last one might be just me, but I’m going to pretend it happens to other people to make myself feel better. (Like all of those times I thought I was fixing a slightly incorrect commit, only to realize I had instead wiped out all of my latest work. Whoooops.) <!-- more -->

Well, I put in an appearance at [Git Merge 2016](http://git-merge.com) (an all-around delightful event), and this gem was among the many things I learned there. This gem, friends, is the `reflog` and `HEAD@{x}`.

The reflog is… well, it’s a log of your refs. Refs being references to commits, which might be things like branch names (because recall that branch names are just human-readable references to commits) or this `HEAD` thing, which is a pointer to _the commit you’re on right now_. In fact, if you went into a folder that was a git repo and looked at `.git/refs/heads/master`, you’d see a file with a single commit hash in it--that’s the current tip of `master`, i.e. _the commit that your “master” ref is pointing to_.

Now, refs in and of themselves aren’t gonna solve your `git commit --amend` debacle, but it turns out that git is really smart sometimes. In this particular case, the smart thing that git does is keep track of everywhere your `HEAD` has been pointing. This info is stored in `.git/logs/HEAD`, and looks something like this:

```
0000000000000000000000000000000000000000 5a90f86dbb681f914790fbe494cbc5680ce372cc Maia <maia.mcc@gmail.com> 1461979447 -0400    commit (initial): add a file with some stuff
5a90f86dbb681f914790fbe494cbc5680ce372cc fdaec86d18b70bf8b9f87e74b473dcdb53d5b814 Maia <maia.mcc@gmail.com> 1461979493 -0400    commit: totally innocuous change
fdaec86d18b70bf8b9f87e74b473dcdb53d5b814 d77508cfe5df412158ad8a19540aca0ba195348f Maia <maia.mcc@gmail.com> 1461979518 -0400    commit (amend): totally innocuous change
d77508cfe5df412158ad8a19540aca0ba195348f fdaec86d18b70bf8b9f87e74b473dcdb53d5b814 Maia <maia.mcc@gmail.com> 1461979572 -0400    reset: moving to HEAD@{1}
fdaec86d18b70bf8b9f87e74b473dcdb53d5b814 514dd505826ddc1276823506e7682b33b64547b6 Maia <maia.mcc@gmail.com> 1461980303 -0400    commit (merge): Merge commit 'd77508c'
```

If you find that a little hard to parse (and you probably do), you can (and should) get at it in a more human-readable form with the command `git reflog show`:

```
fdaec86 HEAD@{2}: commit (merge): Merge commit 'd77508c'514dd505826ddc1276823506e7682b33b64547b6 fdaec86d18b70bf8b9f87e74b473dcdb53d5b814 Maia <maia.mcc@gmail.com> 1461982854 -0400    checkout: moving from master to head^
fdaec86 HEAD@{3}: checkout: moving from d77508cfe5df412158ad8a19540aca0ba195348f to master
d77508c HEAD@{4}: checkout: moving from master to HEAD@{3}
fdaec86 HEAD@{5}: reset: moving to HEAD@{1}
d77508c HEAD@{6}: checkout: moving from fdaec86d18b70bf8b9f87e74b473dcdb53d5b814 to master
fdaec86 HEAD@{7}: checkout: moving from master to fdaec86d18b70bf8b9f87e74b473dcdb53d5b814
d77508c HEAD@{8}: commit (amend): totally innocuous change
fdaec86 HEAD@{9}: commit: totally innocuous change
5a90f86 HEAD@{10}: commit (initial): add a file with some stuff
```


So I had always thought that `git commit --amend` _amended your current commit_--wrote all of your changes onto the same commit and called it a day. But it turns out that it doesn’t; rather, it creates a _whole new commit_ in which to store your amended changes. Like, look, you can see it right there in the reflog: the same commit message, before and after amend, with two different hashes, whoadamn! So Whatever my commit looked liked before I mistakenly amended is still out there somewhere in the void, and with reflog, I can get that hash! From here, getting back your lost work is simple: `git checkout [lost-commit-hash]`, `git reset --hard [lost-commit-hash]`, what have you.

But there’s one more nifty thing here: all the `HEAD@{x}` numbers in the reflog are shortcuts to those commits. Much the same way that you can use `HEAD^^^` to point to the commit three generations up from your current head, you can use `HEAD@{3}` to point to the commit _from three movements of `HEAD` ago_. That makes “oh crap, I need  to get back to the last commit I was on before I did [stupid thing]” even easier--instead of having to go to the reflog and find the commit, you can just `git checkout HEAD@{1}` to get to whatever commit your head was previously on. (The commit your head is currently on, of course, being `HEAD@{0}`.)

So, there you go: a cool git thing I learned recently. Nothing earth-shattering, but hopefully a useful tip for someone out there. Happy gitting!

[^1]: For those of you who don’t know, this is `git commit --amend`’s older and better-looking cousin: it’s `git commit --amend` except that it automatically reuses the commit message of the commit you’re amending, rather than prompting you for a new one.
