/* -----------------------------------------------------------------------------
   Enrich the repo ledger with live GitHub data (stars, language, last update).
   Falls back silently to the _config.yml list already rendered server-side, so
   the page is never blank and works even if the API is rate-limited or offline.

   The GitHub public API allows ~60 unauthenticated requests/hour per IP — fine
   for a personal site. No token is sent (never put a token in client JS).
--------------------------------------------------------------------------------*/
(function () {
  "use strict";

  var script = document.currentScript;
  var user = script && script.getAttribute("data-user");
  var ledger = document.getElementById("repo-ledger");
  var countEl = document.getElementById("repo-count");

  if (!user || user === "your-github-username" || !ledger) return;

  // Preserve the order and blurbs already in the DOM (from _config.yml).
  var blurbs = {};
  ledger.querySelectorAll(".repo").forEach(function (row) {
    var link = row.querySelector(".repo-name a");
    var blurb = row.querySelector(".repo-blurb");
    if (link) {
      var name = link.textContent.trim();
      blurbs[name.toLowerCase()] = blurb ? blurb.textContent.trim() : "";
    }
  });
  var order = Object.keys(blurbs);

  function timeAgo(iso) {
    var d = (Date.now() - new Date(iso)) / 86400000;
    if (d < 1) return "today";
    if (d < 30) return Math.floor(d) + "d ago";
    if (d < 365) return Math.floor(d / 30) + "mo ago";
    return Math.floor(d / 365) + "y ago";
  }

  fetch("https://api.github.com/users/" + user + "/repos?per_page=100&sort=updated")
    .then(function (r) {
      if (!r.ok) throw new Error("gh " + r.status);
      return r.json();
    })
    .then(function (repos) {
      if (!Array.isArray(repos)) return;

      var byName = {};
      repos.forEach(function (repo) { byName[repo.name.toLowerCase()] = repo; });

      // Keep the curated order; append any not-yet-listed public repos after.
      var keep = order.filter(function (n) { return byName[n]; });
      // (Uncomment the next block to auto-append every other public repo.)
      // Object.keys(byName).forEach(function (n) {
      //   if (keep.indexOf(n) === -1 && !byName[n].fork) keep.push(n);
      // });

      if (!keep.length) return;

      var html = keep.map(function (n) {
        var repo = byName[n];
        var blurb = blurbs[n] || repo.description || "";
        var lang = repo.language ? '<span class="lang">' + repo.language + "</span>" : "";
        var stars = repo.stargazers_count
          ? '<span class="stat">★ ' + repo.stargazers_count + "</span>" : "";
        var updated = '<span class="stat">' + timeAgo(repo.updated_at) + "</span>";
        return (
          '<div class="repo">' +
            '<div class="repo-head">' +
              '<span class="repo-name"><a href="' + repo.html_url + '">' + repo.name + "</a></span>" +
              '<span class="repo-meta">' + lang + stars + updated + "</span>" +
            "</div>" +
            (blurb ? '<p class="repo-blurb">' + blurb + "</p>" : "") +
          "</div>"
        );
      }).join("");

      ledger.innerHTML = html;
      if (countEl) countEl.textContent = keep.length + " shown";
    })
    .catch(function () { /* keep the server-rendered fallback */ });
})();
