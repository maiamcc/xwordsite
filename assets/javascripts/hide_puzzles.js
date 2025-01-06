// If url params includes ?hidden=anything (presumably ?hidden=true)
//   but it doesn't actually matter, display hidden puzzles

$(function() {
	let urlParams = new URLSearchParams(window.location.search);
	let hidden = urlParams.get('hidden');

	if (hidden !== null) {
		return;
	}

	let containers = document.getElementsByClassName("puzzle hidden");
	for (let i = 0; i < containers.length; i++) {
		containers[i].style.display = "none";
	}

});
