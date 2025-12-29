// Original source kindly shared by @Wsine on GitHub
(function() {
  function sidebarCollapsePlugin(hook, vm) {
    hook.doneEach(function() {
        document.querySelectorAll(".sidebar-nav > ul > li").forEach(
        function(node, index, nodelist) {
            var span = document.createElement("span");
            span.innerHTML = node.firstChild.data;
            span.style.cursor = "pointer";
            span.onclick = function(event) {
            var ul = event.target.nextElementSibling;
            if (ul.style.display === "none") {
                ul.style.display = "block";
            } else {
                ul.style.display = "none";
            }
            };
            node.firstChild.replaceWith(span);
            node.lastChild.style.display = "none";
        });
        var active = document.querySelector(".sidebar-nav li.active");
        if (active) {
        active.parentElement.style.display = "block";
        }
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(
    sidebarCollapsePlugin,
    window.$docsify.plugins || []
  );
})();