var github = (function(){
  function escapeHtml(str) {
    return $('<div/>').text(str).html();
  }
  function render(target, repos, count, skip) {
    var added_to_page = 0;
    if (count === undefined) {
      count = repos.length;
    }

    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < repos.length; i++) {
      if (skip.has(repos[i].name)) {
        continue;
      }
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+escapeHtml(repos[i].description||'')+'</p></li>';
      added_to_page += 1;
      if (added_to_page >= count) {
        break;
      }
    }
    t.innerHTML = fragment;
  }
  return {
    showRepos: function(options){
      $.ajax({
          url: "https://api.github.com/users/"+options.user+"/repos?sort=pushed&callback=?"
        , dataType: 'jsonp'
        , error: function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); }
        , success: function(data) {
          var repos = [];
          if (!data || !data.data) { return; }
          for (var i = 0; i < data.data.length; i++) {
            if (options.skip_forks && data.data[i].fork) { continue; }
            repos.push(data.data[i]);
          }
          render(options.target, repos, options.count, options.repos_to_skip);
        }
      });
    }
  };
})();
