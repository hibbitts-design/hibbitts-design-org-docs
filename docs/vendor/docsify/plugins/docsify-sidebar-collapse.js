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
        
        .sidebar-nav > ul > li.sidebar-group > span:focus {
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
        
        .sidebar-nav > ul > li.sidebar-group ul.collapsed {
          display: none;
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
        
        var ul = node.querySelector('ul');
        
        // Error handling: Skip if no child list exists
        if (!ul) {
          return;
        }
        
        var span = document.createElement("span");
        var sectionId = 'sidebar-section-' + index;
        
        span.innerHTML = node.firstChild.data;
        span.setAttribute('role', 'button');
        span.setAttribute('tabindex', '0');
        span.setAttribute('aria-expanded', 'false');
        span.setAttribute('aria-controls', sectionId);
        
        ul.id = sectionId;
        
        var toggleSection = function() {
          var isCurrentlyCollapsed = ul.classList.contains('collapsed');
          
          // Close all sections first
          document.querySelectorAll(".sidebar-nav > ul > li.sidebar-group").forEach(function(otherNode) {
            var otherUl = otherNode.querySelector('ul');
            var otherSpan = otherNode.querySelector('span[role="button"]');
            
            // Error handling: Skip if elements don't exist
            if (!otherUl || !otherSpan) {
              return;
            }
            
            otherUl.classList.add('collapsed');
            otherNode.classList.remove('expanded');
            otherSpan.setAttribute('aria-expanded', 'false');
          });
          
          // Then open this section if it was collapsed
          if (isCurrentlyCollapsed) {
            ul.classList.remove('collapsed');
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
        ul.classList.add('collapsed');
        node.classList.add('sidebar-group');
      });
      
      var active = document.querySelector(".sidebar-nav li.active");
      if (active) {
        var parentList = active.parentElement;
        var parentNode = parentList.parentElement;
        var parentSpan = parentNode.querySelector('span[role="button"]');
        
        // Error handling: Only proceed if all elements exist
        if (parentList && parentNode && parentSpan) {
          parentList.classList.remove('collapsed');
          parentNode.classList.add('expanded');
          parentSpan.setAttribute('aria-expanded', 'true');
        }
      }
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(sidebarCollapsePlugin, window.$docsify.plugins || []);
})();