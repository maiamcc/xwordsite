---
layout: post
title: "Reflections on my First Open-Source Contribution"
date: 2014-10-22 15:52:38 -0400
comments: true
categories: opw
---
Having successfully submitted my [OPW](//gnome.org/opw/) application, and in the process submitting my first open-source contribution, I have lots of thoughts and feelings.

### Part 1: Setting up the environment

Setting up your environment is *awful*. You think, "how long can it take to set up a virtual machine and install this software?" The answer? *Longer than you could ever imagine.* Especially if your project is on a platform you're not familiar with, ask for advice early and often---because inevitably, something will go wrong and you'll need to ask someone wiser for help anyway, and you might as well not a bunch of junk to undo by the time you do. (Like when I tried to install VirtualBox Guest Additions and it destroyed by VM's video driver, and in fact all video drivers on any VMs I later installed. I had to wipe VirtualBox and start over. No fun.)<!--more-->

For those curious, my long and arduous process involved several buggy installations of Ubuntu and much wrestling with VirtualBox; eventually installing Fedora 21 on the recommendation of the project mentor. (Fedora 21, incidentally, is still in alpha and thus moderately scary.) I "quick&dirty" built GNOME Music, the program I intended to work on, and it *worked*... sort of. None of my music files would play, and none of the metadata/durations were showing up---all of them were by Unknown Artist on Unknown Album and had duration 0:00.

Turns out I was missing lots of GStreamer plugins. I installed various plugins, until I quite literally installed *all of the GStreamer plugins* (`sudo yum install gstreamer1-plugins-*`, I kid you not), and mp3's would still not play. I eventually figured out what was wrong by taking a step back from the application and attempting to play the file directly from Terminal, with `gst-launch-1.0 playbin uri=file:///home/joe/random-media-file.mp3`. The error message I got told me I needed a MPEG-1 Layer 3 Decoder, but more importantly, this step reminded me how debugging works. When in doubt, take away as many of the confounding variables as possible---like for instance, the borked program install---and see how much you can accomplish in its barest form, ideally from Terminal because then you will likely get useful error messages.

Oh, and another important thing? Making sure you have valid media. When in doubt, always check the validity of the files you're trying to do stuff to---can save you a lot of time! Like when I got mp3's working but then spent an hour tearing my hair out about the ogg's that weren't working? Turns out they were just somehow messed up because I'd converted them from mp3 myself with VLC on my machine. At least, I can only assume that something was funky about those files, because opening [an ogg file off the interwebs](//www.gnu.org/music/FreeSWSong.ogg) worked just fine!

So now, the only problem was that GNOME Music wasn't showing me any metadata about the tracks (including their duration). Having learned my lesson, I checked on my input---did the files actually have metadata? According to [EasyTAG](https://wiki.gnome.org/Apps/EasyTAG), yes they did. Vadim helped me decipher some error message gibberish and concluded that the problem was something with Tracker. In my limited understanding, indexes the files on your machine and stores all of that data in a database---GNOME Music looks at that database, using SPARQL queries, to get data about the songs. If that database is all messed up, then so is the data (or lack thereof) that GNOME Music shows.

After wrestling with all manner of resets and diagnostics, I ended up resetting to one of my VM snapshots from the beginning of this whole process and just building the thing via [JHBuild](//wiki.gnome.org/HowDoI/Jhbuild). Hit some snags, but ultimately it worked. It was more of a pain than the "quick&dirty" build would have been, had it actually worked... but given the amount of pain that the "quick&dirty" way brought me, JHBuild was *infinitely* preferable in the end. I don't know what went on in my JHBuild build that mitigated my Tracker problem, but there was something, and it meant that (exactly a week after I'd started this process) I *finally* had a working, hackable version of GNOME Music!

So, lessons?

* Write it down or you will forget it (which is what I'm doing here!)
* Check your input media
* IRC doesn't automatically keep logs!
* Back up early and often. (VirtualBox lets you take snapshots of the state of your VM. DO THIS LOTS!)
* There are lots of very friendly, knowledgeable folks on IRC, and nearly every thing you run into in the FOSS world has its own IRC channel. So *ask for help*!
* Test things as piecemeal as you can. The more components are involved, the more likely it is that one of them is broken and the harder it is to pinpoint the error. When possible, do things directly from Terminal.
* VMs are baffling because they shortcut keys are totally different. My brain is bent. I keep wondering why shortcuts on OSX aren't doing anything, only to realize that I'm hitting `ctrl` instead of `cmd`. Oops.
* Sometimes the "easy" way is easier. Sometimes it's much, much harder.
* Sometimes the best thing to do is to reset and start over with another tack.

What about writing the actual code, you say? That is, I believe, a post for another day!