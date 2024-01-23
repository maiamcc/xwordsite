# Maia's Crossword Website

This website lives at [crosswords.maiamccormick.com](https://crosswords.maiamccormick.com/).

It's built with [Jekyll](https://jekyllrb.com/) on top of the [classic-martinb](https://github.com/martinbjeldbak/classic-martinb) theme, and deployed via GitHub Actions / Cloudbuild on push.

To preview the site, run `bundle exec jekyll serve` and navigate to `http://localhost:4000/`.

## TODO
- [ ] retheme
	- [x] colors
	- [x] favicon
	- [ ] fonts
	- [ ] header height at smaller widths
	- [ ] style Squares embed to match site theme? (see: https://stackoverflow.com/questions/217776/how-to-apply-css-to-iframe)
- [ ] responsive nav
	- NB: currently nav is just hidden on small widths b/c there's nothing interesting elsewhere on the site yet.
- [ ] clean-up: make sure puzzles are actually ordered by date
- [ ] subscribable
	- [x] mailing list signup form
	- [x] instead of a data yml, make each crossword a "post" so that they can be RSS'd, tagged etc.
	- [ ] link to RSS feed
	- [x] posts automatically get description set as "content" in rss feed (instead of manually having to put a body in the post)
- [ ] make it shiny
	- [ ] tag puzzles, have tag indexes etc.
