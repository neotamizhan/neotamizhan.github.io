/* -----------------------------------------------------------------------------
   Client-side filtering for the writing feed.

   Chips carry a data-filter value:
     - "all"        → show everything
     - "lang:ta"    → show posts whose data-lang is "ta"
     - anything else → match against a post's data-category

   Pure DOM show/hide, no build step — works on GitHub Pages.
--------------------------------------------------------------------------------*/
(function () {
  "use strict";

  var filters = document.getElementById("filters");
  var feed = document.getElementById("feed");
  var empty = document.getElementById("feed-empty");
  if (!filters || !feed) return;

  var posts = Array.prototype.slice.call(feed.querySelectorAll(".post-item"));

  function apply(filter) {
    var shown = 0;
    posts.forEach(function (post) {
      var match;
      if (filter === "all") {
        match = true;
      } else if (filter.indexOf("lang:") === 0) {
        match = post.getAttribute("data-lang") === filter.slice(5);
      } else {
        match = post.getAttribute("data-category") === filter;
      }
      post.classList.toggle("is-hidden", !match);
      if (match) shown++;
    });
    if (empty) empty.classList.toggle("is-visible", shown === 0);
  }

  filters.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    filters.querySelectorAll(".chip").forEach(function (c) {
      c.classList.remove("is-active");
    });
    chip.classList.add("is-active");
    apply(chip.getAttribute("data-filter"));
  });
})();
