// Original source kindly shared by @Wsine on GitHub
// Code generated/assisted by Anthropic Claude AI
(function() {
  function sidebarCollapsePlugin(hook, vm) {
    hook.init(function() {
      var style = document.createElement('style');
      style.textContent = `
        .sidebar-nav > ul > li.sidebar-group {
          cursor: pointer;
        }
        
        .sidebar-nav > ul > li.sidebar-group > span {
          display: block;
          padding-right: calc(var(--_sidebar-inset, 20px) + 15px);
          border-radius: var(--border-radius);
          text-decoration-line: underline;
          text-decoration-style: solid;
          text-decoration-thickness: var(--link-underline-thickness, 2px);
          text-decoration-color: transparent;
          text-underline-offset: 2px;
          background: no-repeat calc(100% - var(--_sidebar-inset, 20px)) calc(50% - 2.5px) / 6px 5px
              linear-gradient(45deg, transparent 2.75px, var(--color-mono-3, #ccc) 2.75px 4.25px, transparent 4px),
            no-repeat calc(100% - var(--_sidebar-inset, 20px)) calc(50% + 2.5px) / 6px 5px
              linear-gradient(135deg, transparent 2.75px, var(--color-mono-3, #ccc) 2.75px 4.25px, transparent 4px);
        }
        
        .sidebar-nav > ul > li.sidebar-group > span:hover {
          text-decoration-color: var(--sidebar-link-color-active);
          translate: 0;
        }
        
        .sidebar-nav > ul > li.sidebar-group.expanded > span {
          background: no-repeat calc(100% - var(--_sidebar-inset, 20px) - 4px) center / 5px 6px
              linear-gradient(225deg, transparent 2.75px, var(--color-mono-3, #ccc) 2.75px 4.25px, transparent 4.25px),
            no-repeat calc(100% - var(--_sidebar-inset, 20px) + 1px) center / 5px 6px
              linear-gradient(135deg, transparent 2.75px, var(--color-mono-3, #ccc) 2.75px 4.25px, transparent 4.25px);
        }
      `;
      document.head.appendChild(style);
    });
    
    hook.doneEach(function() {
      document.querySelectorAll(".sidebar-nav > ul > li").forEach(function(node) {
        // Skip if already processed
        if (node.classList.contains('sidebar-group')) {
          return;
        }
        
        var span = document.createElement("span");
        span.innerHTML = node.firstChild.data;
        span.onclick = function() {
          var ul = span.nextElementSibling;
          var isCurrentlyCollapsed = (ul.style.display === "none");
          
          // Close all sections first
          document.querySelectorAll(".sidebar-nav > ul > li.sidebar-group").forEach(function(otherNode) {
            otherNode.querySelector('ul').style.display = "none";
            otherNode.classList.remove('expanded');
          });
          
          // Then open this section if it was collapsed
          if (isCurrentlyCollapsed) {
            ul.style.display = "block";
            node.classList.add('expanded');
          }
        };
        node.firstChild.replaceWith(span);
        node.lastChild.style.display = "none";
        node.classList.add('sidebar-group');
      });
      
      var active = document.querySelector(".sidebar-nav li.active");
      if (active) {
        active.parentElement.style.display = "block";
        active.parentElement.parentElement.classList.add('expanded');
      }
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(sidebarCollapsePlugin, window.$docsify.plugins || []);
})();