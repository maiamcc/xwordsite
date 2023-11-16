---
layout: page
title: "Crosswords By Maia"
sidebar: false
no_header: true
---
<script src="/assets/javascripts/hide_puzzles.js"></script>
Here's where I post my crossword puzzles. Have a solve and enjoy!

{% assign puzzles = site.data.crosswords | where: 'dont_index', empty %}

<div class="puzzle-container">
    {% for puzzle in puzzles %}
        <div class="puzzle">
            <h3 class="title">
                <a href="/crosswords/{{puzzle.slug}}.html">{{ puzzle.title }}</a>
            </h3>

            <div class="info completed"><em>Completed</em>: {{ puzzle.date }}</div>
            <div class="info notes"><em>Constructor notes</em>: {{ puzzle.notes }}</div>
            {% if puzzle.dimensions %}
                <div class="info dimensions"><em>Dimensions</em>: {{ puzzle.dimensions }}</div>
            {% endif %}
            <!--
            {% if puzzle.day_of_week %}
                <div class="info difficulty"><em>Approx. difficulty</em>: NYT {{ puzzle.day_of_week }}</div>
            {% endif %}
            -->
            <div class="info files"><em>Files</em>:
                <a href="/crosswords/{{puzzle.slug}}/{{puzzle.slug}}.pdf">PDF</a> |
                <a href="/crosswords/{{puzzle.slug}}/{{puzzle.slug}}.puz" download>PUZ</a> |
                <a href="/crosswords/{{puzzle.slug}}/{{puzzle.slug}}.ipuz" download>IPUZ</a> |
                <a href="/crosswords/{{puzzle.slug}}/{{puzzle.slug}}-solution.pdf">solution</a>
            </div>
        </div>
    {% endfor %}
</div>

<!-- to hide puzzles:
<div class="puzzle{% if puzzle.hide %} hidden{% endif %}">
 -->
