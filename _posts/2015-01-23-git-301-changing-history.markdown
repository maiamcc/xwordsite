---
layout: post
title: "Git 301: Changing History"
date: 2015-01-23 23:53:50 -0500
comments: true
categories: [tech, git]
---
Congratulations, you've made it through Git 101 (`init`, `add`, `commit`, `log`, `status`) and its slightly more difficult companion course, Git 201 (`branch`, `checkout`, `pull`).[^1] Are you ready to pull out the big guns? Here are a handful of commands I've been using lately, which I will now write about on the off-chance that they're useful to someone else. Welcome to Git 301.

#### Selective Checkouts with `checkout -p`
Okay, this isn't really changing history. But it IS a fancy bit of next-level gittery that I've found useful as I try to make my git history useful to others and actually move in a logical feature-by-feature progression, instead of reflecting my all-over-the-place, distracted workflow.<!--more-->

`git commit -p` (for `--patch`) takes you chunk by chunk through all of your unstaged changes and asks, "Do you want to commit this piece?" So if you've changed 3 things in `foo.py` but they're all part of different features, you can commit them all separately!

#### Change the Past with `rebase -i`
Remember when you learned that you could revise the commit you’d just made with `git commit --amend` (as long as you hadn’t pushed anything to your remote repo yet cuz then stuff would get borked and you’d probably have to force push), and it was super cool? Rebase is like that, but 50x cooler.

Rebase is the git tool that allows you to rewrite the past. You can use it to pull together commits from different branches, change commit orders, keep some and ignore others, modify messages, modify content… it’s crazy! I won’t bore you here with the plain ‘ol `rebase` command and how you might use it to smoothly interweave multiple branches’ worth of commits into a single branch of commit history. I totally could if I wanted to because I totally know the details of how rebasing works off the top of my head and don't just blindly run commands whenever I need to rebase stuff. Totally for sure.

But even better than `rebase` is this excellent new thing I learned about today, `git rebase -i` (for `--interactive`)! `git rebase -i [hash]` will pop up your text editor with a bunch[^2] of your commits in it, all preceded by the word `pick`. And… y’know, it’s actually pretty pointless for me to explain this here, because interactive rebase explains it all to you in the text file! (Yay easy-to-read documentation! Unlike most of the git man pages, but oh well…) Here you can change the order of the commits if you want, delete commits you want to get rid of, and do a couple of other neat things.

In particular, the feature that I’ve found to be a lifesaver is the ability to revise a past commit (not just the message, but the content as well).[^3] Change `pick` to `edit` next to the commit(s) you want to revise, then save and close the text file. Git will drop you in your project directory just after the time of the first commit marked with `edit`. Make any changes you want to make, commit them with `git commit --amend`, and then go ahead with your rebase with `git rebase —continue`. Magically, the commit has been revised to include any changes you just made! Huzzah!

#### Fix Your Mistakes the _Responsible_ Way with `revert`
Rebasing and fixup-ing and pretending you never made any boo-boos in your commits---and then probably force pushing (`git push origin master -f`) to your remote repo---is all well and good, but if anyone else is working in the same remote repo as you, your tampering with the past will cause a terrible time paradox that will result in you never being born. Okay, not really, but it _will_ royally mess things up for anyone else pulling from this repo. Good version control etiquette demands that you _not_ actually change your commit history, but sometimes you look at your last commit and go "...crap, I need to totally change my approach to this feature and _none_ of this code is valid anymore."

While it would be easy to `git reset --hard [hash-of-commit-to-return-to]` and `git push origin master -f` and pretend that last commit never happened, the responsible thing to do is `git revert [hash-of-commit-to-get-rid-of]`---which makes a _new_ commit that just undoes everything your mistake-commit did. (The two commits are inverses of each other.) Now your repo is back in the state you want it to be in, but you haven't tinkered with timeline at all, leaving all of your collaborators safe from time paradoxes for another day. Good job.

Tune in for the next episode of Git 301[^4] (and possibly some retroactive episodes of Git 201 and Git 101). Possible topics to cover (read: things Maia just learned and got excited about): `git stash` and `git stash pop`, `git cherrypick`.

[^1]: Unfortunately, these courses are not currently being offered at the University of Maia. However, you may still enroll in [Theory of Git pt. 1](/blog/2014/09/02/all-about-git/). The University of Maia accepts deposits at all times, regardless of enrollment status

[^2]: The `[hash]` in `git rebase -i [hash]` is the commit after which git will start showing you commits. To put it another way, you should give the hash of _the newest commit you want to leave as-is_. (Instead of finding the exact hash, you can use `HEAD^^^…` to go back a handful of commits from your most recent one---assuming that’s where your HEAD is located at the moment. # of ^’s = # of commits that will be shown to you in the rebase.)

[^3]: (There are whispered rumors that you can achieve the same thing even more fastly by making the changes in HEAD that you wanted to have made a few commits ago, adding them and committing with `git commit --fixup [hash of commit these changes should have belonged to]` and then running `git rebase -i [starting hash]` (or possibly `git rebase -i --autosquash [starting hash]`---[see this post](//fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html), for instance, for details). But I’ve been playing with this and am finding it more complicated than I’d hoped. Everything goes to pot, for instance, if the edits you wanted to make to a previous commit happen within a line, instead of being a clean line addition or subtraction… So, I’ll figure that one out on a later date and report back!)

[^4]: Mixed metaphor alert! Danger, Will Robinson! Abort, abort!!
