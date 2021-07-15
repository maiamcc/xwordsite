---
layout: post
title: "Javascript/JQuery 101"
date: 2014-09-24 16:28:38 -0400
comments: true
categories: [Recuse Center, javascript, tech]
---
Funnily enough, when you're teaching yourself how to do stuff pretty much from scratch, sans tutorials or guidance, you miss a few crucial points. Weird, right? Here (mostly for my own records, but you can read it if you want!) are the things I learned this afternoon from some code review of my Javascript/JQuery/Datatables code for my contra database:

JS != JQuery!!! They're different things! They each have different sets of methods, and you need to keep track of whether any given thing you're dealing with in web scripting is a JQuery or DOM (and therefore JS) object. <!-- more -->If it's avoidable, don't mix JS and JQuery---be consistent within one document. Usually, JQuery is more precise and prettier. Consider using dollar signs at the beginning of your variable names to indicate that they point to JQuery objects, so you don't get confused. Most if not all JS functions have (generally shorter, prettier) JQuery equivalents. Here are some that I replaced in my code today:

<table><tr><td>
    <strong>JS</strong>
</td><td>
    <strong>JQuery</strong>
</td></tr>
<tr><td>
<code>
    getElementByID("foo")
</code>
</td><td>
<code>
    $('#foo')
</code>
</td></tr>

<tr><td>
<code>
    getElementsByClassName("bar")
</code>
</td><td>
<code>
    $('.bar')
</code>
</td></tr>

<tr><td>
<code>
    this
</code>
</td><td>
<code>
    $(this)
</code>
</td></tr>

<tr><td>
<code>
    .setAttribute("foo","bar")
</code>
</td><td>
<code>
    .attr("foo", "bar")
</code>
</td></tr>

<tr><td>
<code>
    .getAttribute("foo")
</code>
</td><td>
<code>
    .attr("foo")
</code>
</td></tr>

<tr><td>
<code>
    .value
</code>
</td><td>
<code>
    .val()
</code>
</td></tr>

<tr><td>
<code>
    .parentNode
</code>
</td><td>
<code>
    .parent()
</code>
</td></tr>
</table>
<p>
JQuery functions like `$(".bar")` or `$(".mytag")` (which gets all elements matching class "bar" and html tag "mytag", respectively) return arrays of DOM elements. If you want to get something from this array, it can be tempting to pluck it from its index, a la `$(".bar")[2]`. *Be warned*: this returns a DOM element, and therefore you can't do shiny JQuery stuff to it. Instead, get that same element as a JQuery object with `$(".bar").eq(2)` (where the `eq` function takes as an argument the index of the thing you want to get out of the array). I can't tell you how much pain this would have saved me if I had known this at the beginning of my project.

On the "pesky formatting details" front, JS indents with only two spaces, and puts semicolons after every line that doesn't end in a curly brace. I swear, this will take me another three years to do properly and consistently. And when I master it, it will ruin my Python. Yeargh. Also, Javascript pitches possibly the least helpful errors ever. Okay, complaining over.

Anyway, I have a working (if ugly) search page that magically sprouts new search fields everywhere, and a working (if ugly) datatable that displays the dances in my database with collapsible child rows for additional information, and a understand a little bit more about Javascript/JQuery for web work! Huzzah!
