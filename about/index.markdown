---
layout: page
title: "About Me"
comments: false
sharing: false
footer: false
sidebar: false
---
<script type="text/javascript">
    window.bios = {
        small: "<p>Maia holds a B.A. in music from Williams College, learned to program at <a href='//www.recurse.com/' target='_blank'>The Recurse Center</a>, and now earns a living making ones and zeros do the thing. When she’s not writing code (or wasting time on the internet), she’s usually singing, dancing, or eating good food.</p>",
        med: "<p>Maia is currently building developer tools for <a href='//payroll.toasttab.com/CompanyCode?ReturnUrl=%2f' target='_blank'>Toast Payroll</a>, the payroll app on the other side of Toast's <a href='//pos.toasttab.com/' target='_blank'>restaurant point-of-sale system</a>. Before that, she spent three years building <a href='//tilt.dev/' target='_blank'>Tilt</a> (a tool that makes microservice development not suck) and three years on the backend at <a href='//www.shopspring.com/' target='_blank'>Spring</a> (a mobile shopping app). Her primary languages are Go and Python.</p><p>Maia graduated from Williams College in 2014 with a B.A. in music. From there, she went to <a href='//www.recurse.com/' target='_blank'>The Recurse Center</a> in NYC, a 3-month self-directed programmers’ retreat. At RC, she taught herself Python and pursued a handful of personal projects. Outside of programming, her interests include singing, dancing, and good food. Maia was born and raised in New York City, where she is currently based.</p>",
        large: "<p>Maia first started programming in an Intro CS class her senior year at Williams College, and got really excited about programming later that year, when she participated in the Williams College Game Jam (for which she made <a href='/projects/gravity/play.html' target='_blank'>this goofy little thing</a>). After graduating from Williams in 2014 with a B.A. in music, she went to <a href='//www.recurse.com/' target='_blank'>The Recurse Center</a>, a 3-month self-directed programmers’ retreat in New York City. There she taught herself Python and hacked on various things.</p><p>After her stint at RC, Maia spent three years working on the product catalog and related systems at <a href='//www.shopspring.com/' target='_blank'>Spring</a>, three years building microservice/Kubernetes dev tools at <a href='//tilt.dev/' target='_blank'>Tilt</a>. Now she's building developer tools for <a href='//payroll.toasttab.com/CompanyCode?ReturnUrl=%2f' target='_blank'>Toast Payroll</a>, the payroll app on the other side of Toast's <a href='//pos.toasttab.com/' target='_blank'>restaurant point-of-sale system</a>. Her primary languages are Go and Python.</p><p>Side projects? Who has time for those?! When not at work, Maia can usually be found singing, conducting, dancing, cooking, or eating. She was born and raised in New York City, where she is currently based (don't try to talk to her about \"bagels\" from anywhere else).</p>",
    };
</script>

<script type="text/javascript" language="javascript" class="init">
  $(document).ready(function() {
    processURLHash()
  } );

  window.onhashchange = function() {
    processURLHash()
  };

  function processURLHash(){
    curHash = location.hash.slice(1);
    if (curHash == ""){
      loadBio("med")
    }
    else {
      loadBio(curHash)
    }
  }

  function loadBio(bioName){
    $('#biotext').html("") // clear
    $('#biotext').html(window.bios[bioName]) // populate
    selectOne(bioName) // highlight link as selected
  }

  function selectOne(bioName){
    $('ul li').removeClass("selected") // de-select all
    $('#'+bioName).toggleClass("selected") // select given bio
  }

</script>

<div id="biocontainer">
  <div id="bionav">
    <ul>
      <li id="small">
        <a href="#small" onclick="loadBio(this.hash.slice(1))">Small Bio</a>
      </li>
      <div class="spacer">
        |
      </div>
      <li id="med">
        <a href="#med" onclick="loadBio(this.hash.slice(1))">Medium Bio</a>
      </li>
      <div class="spacer">
        |
      </div>
      <li id="large">
        <a href="#large" onclick="loadBio(this.hash.slice(1))">Large Bio</a>
      </li>
    </ul>
  </div>
  <div id="biotext"></div>
</div>

<div class="singlespaced">
  <p><strong>Pronouns</strong>: she/her/hers (<a href="//www.mypronouns.org/what-and-why" target="_blank">what's this?</a>)</p>
  <p><strong>Email</strong>: maia [dot] mcc [at] gmail [dot] com</p>
  <p><strong>Github</strong>: <a href="//github.com/maiamcc/" target="_blank">maiamcc</a></p>
  <p><strong>LinkedIn</strong>: <a href="//https://www.linkedin.com/in/maia-mccormick-45790221/" target="_blank">Maia McCormick</a></p>
  <p><strong>Other Hats</strong>:</p>
    <ul>
      <li>I moonlight as a <a href="//contra.maiamccormick.com" target="_blank">contradance caller</a> in and around the Northeast</li>
      <li>I direct the <a href="//www.chamberchoirs.nyc/welcome" target="_blank">New York Chamber Choirs</a></li>
      <li>I dabble in <a href="//code.maiamccormick.com/crosswords" target="_blank">constructing crossword puzzles</a></li>
    </ul>
</div>

