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

    var key = (location.host + location.pathname)
        .replace(/index\.html$/, "")  // remove "index.html"
        .replace(/\/$/, "");          // remove trailing slash "/"

    var img = document.createElement("img");
    img.alt = "View count";

    var link = document.createElement("a");
    link.href = "https://hits.sh/" + key + "/";
    link.appendChild(img);

    img.onload = function () {  // swap the placeholder for the badge once it's ready
        target.textContent = "";
        target.appendChild(link);
    };
    img.src = "https://hits.sh/" + key + ".svg?style=flat-square&label=views";
})();