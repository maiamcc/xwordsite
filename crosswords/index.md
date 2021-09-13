---
layout: page
title: "Crosswords By Maia"
sidebar: true
---
I write crossword puzzles sometimes (using <a href="http://beekeeperlabs.com/crossfire/" target="_blank">Crossfire</a>).

<div class="puzzle-container">
    {% for puzzle in site.data.crosswords %}
        {% unless puzzle.hide %}
            <div class="puzzle">
                <h3 class="title">
                    <a href="/crosswords/{{puzzle.slug}}.html">{{ puzzle.title }}</a>
                </h3>

                <div class="info completed"><em>Completed</em>: {{ puzzle.date }}</div>
                <div class="info notes"><em>Constructor notes</em>: {{ puzzle.notes }}</div>
                {% if puzzle.dimensions %}
                    <div class="info dimensions"><em>Dimensions</em>: {{ puzzle.dimensions }}</div>
                {% endif %}
                {% if puzzle.day_of_week %}
                    <div class="info difficulty"><em>Approx. difficulty</em>: NYT {{ puzzle.day_of_week }}</div>
                {% endif %}
                <div class="info files"><em>Files</em>:
                    <a href="/crosswords/{{puzzle.slug}}/{{puzzle.slug}}.pdf">PDF</a> |
                    <a href="/crosswords/{{puzzle.slug}}/{{puzzle.slug}}.puz" download>PUZ</a> |
                    <a href="/crosswords/{{puzzle.slug}}/{{puzzle.slug}}.ipuz" download>IPUZ</a> |
                    <a href="/crosswords/{{puzzle.slug}}/{{puzzle.slug}}-solution.pdf">solution</a>
                </div>
            </div>
        {% endunless %}
    {% endfor %}
</div>
