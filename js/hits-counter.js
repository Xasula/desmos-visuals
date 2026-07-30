/* Adds a per-page hits.sh view badge, derived automatically from the current
 * page URL, so no counter URL is hard-coded on any page.
 *
 * Usage (in each page, near the footer):
 *   <span id="view-count"></span>
 *   <script src="../../../js/hits-counter.js"></script>
 */
(function () {
    "use strict";

    var target = document.getElementById("view-count");
    if (!target) return;

    // hits.sh keys the count by URL path. Normalize so "/page/",
    // "/page/index.html", and "/page" all map to the same counter.
    var key = (location.host + location.pathname)
        .replace(/index\.html$/, "")
        .replace(/\/$/, "");

    var badge = "https://hits.sh/" + key + ".svg?style=flat-square&label=views";
    var stats = "https://hits.sh/" + key + "/";

    var img = document.createElement("img");
    img.alt = "View count";
    img.src = badge;

    var link = document.createElement("a");
    link.href = stats;               // click through to the stats page
    link.appendChild(img);
    target.appendChild(link);
})();