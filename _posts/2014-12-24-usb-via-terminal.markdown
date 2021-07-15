---
layout: post
title: "USB Disk via Terminal"
date: 2014-12-24 15:19:19 -0500
comments: true
categories:
---
Achievement unlocked: accessing a USB disk via terminal!

Accessing a flash drive from terminal seems like it ought to be simple, but it's varying degrees of a pain on different OS's. It also seems like something I should have learned ages ago--especially considering that when I first started terminal-ing, [Allison Kaptur](//akaptur.com/)'s advice to me was to quit Finder cold-turkey until I could do everything I wanted to do via terminal. Anyway, for anyone who's a little confused by this, it's actually pretty easy.<!--more-->

### Mac
Look for your disk in `/Volumes/[diskname]`. A bit obscure, but actually super simple!

### Linux
More of a pain. You have to create a directory in which to 'mount' the drive. Then you can work with the content of your drive through that directory, and when you're done, just unmount. This set of instructions was found on [Ask Ubuntu](//askubuntu.com/questions/37767/how-to-access-a-usb-flash-drive-from-the-terminal-how-can-i-mount-a-flash-driv).

1. Find what the disk is called using `sudo fdisk -l`. (Probably something like `/dev/sdb1`.)
2. Create director in `/media`: `sudo mkdir /media/usb`
3. Mount it: `sudo mount /dev/sdb1 /media/usb`. Your drive now lives in `/media/usb`, congratulations!
4. When you're done, unmount: `sudo umount /media/usb`
(Note that the command is `umount`, NOT `unmount`. This one had me scratching my head for way longer than it should have.)