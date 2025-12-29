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
        
        .sidebar-nav > ul > li.sidebar-group > span:hover,
        .sidebar-nav > ul > li.sidebar-group > span:focus {
          text-decoration-color: var(--sidebar-link-color-active);
          translate: 0;
          outline: none;
        }
        
        .sidebar-nav > ul > li.sidebar-group > span:focus-visible {
          outline: 2px solid var(--theme-color, #42b983);
          outline-offset: 2px;
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
      document.querySelectorAll(".sidebar-nav > ul > li").forEach(function(node, index) {
        // Skip if already processed
        if (node.classList.contains('sidebar-group')) {
          return;
        }
        
        var span = document.createElement("span");
        var ul = node.querySelector('ul');
        var sectionId = 'sidebar-section-' + index;
        
        span.innerHTML = node.firstChild.data;
        span.setAttribute('role', 'button');
        span.setAttribute('tabindex', '0');
        span.setAttribute('aria-expanded', 'false');
        span.setAttribute('aria-controls', sectionId);
        
        if (ul) {
          ul.id = sectionId;
        }
        
        var toggleSection = function() {
          var isCurrentlyCollapsed = (ul.style.display === "none");
          
          // Close all sections first
          document.querySelectorAll(".sidebar-nav > ul > li.sidebar-group").forEach(function(otherNode) {
            var otherUl = otherNode.querySelector('ul');
            var otherSpan = otherNode.querySelector('span[role="button"]');
            otherUl.style.display = "none";
            otherNode.classList.remove('expanded');
            otherSpan.setAttribute('aria-expanded', 'false');
          });
          
          // Then open this section if it was collapsed
          if (isCurrentlyCollapsed) {
            ul.style.display = "block";
            node.classList.add('expanded');
            span.setAttribute('aria-expanded', 'true');
          }
        };
        
        span.onclick = toggleSection;
        span.onkeydown = function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSection();
          }
        };
        
        node.firstChild.replaceWith(span);
        node.lastChild.style.display = "none";
        node.classList.add('sidebar-group');
      });
      
      var active = document.querySelector(".sidebar-nav li.active");
      if (active) {
        active.parentElement.style.display = "block";
        var parentNode = active.parentElement.parentElement;
        parentNode.classList.add('expanded');
        var parentSpan = parentNode.querySelector('span[role="button"]');
        if (parentSpan) {
          parentSpan.setAttribute('aria-expanded', 'true');
        }
      }
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(sidebarCollapsePlugin, window.$docsify.plugins || []);
})();