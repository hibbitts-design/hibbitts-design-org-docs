// Original source kindly shared by @Wsine on GitHub
// Code generated/assisted by Anthropic Claude AI
(function() {
  function sidebarExpandCollapsePlugin(hook, vm) {
    var options = vm.config.sidebarExpandCollapse || {};
    var accordion = options.accordion !== false;
    
    hook.init(function() {
      var style = document.createElement('style');
      style.textContent = `
        .sidebar-nav > ul > li.sidebar-group {
          cursor: pointer;
        }
        
        .sidebar-nav > ul > li.sidebar-group ul.collapsed {
          display: none;
        }
      `;
      document.head.appendChild(style);
    });
    
    hook.doneEach(function() {
      document.querySelectorAll(".sidebar-nav > ul > li").forEach(function(node, index) {
        if (node.classList.contains('sidebar-group')) {
          return;
        }
        
        var ul = node.querySelector('ul');
        
        if (!ul) {
          return;
        }
        
        var span = document.createElement("span");
        var sectionId = 'sidebar-section-' + index;
        
        // Handles both text nodes and elements like <strong>
        span.textContent = node.firstChild.textContent || node.firstChild.data || '';
        span.setAttribute('role', 'button');
        span.setAttribute('tabindex', '0');
        span.setAttribute('aria-expanded', 'false');
        span.setAttribute('aria-controls', sectionId);
        
        ul.id = sectionId;
        
        var toggleSection = function() {
          var isCurrentlyCollapsed = ul.classList.contains('collapsed');
          
          if (accordion) {
            // Close all sections first
            document.querySelectorAll(".sidebar-nav > ul > li.sidebar-group").forEach(function(otherNode) {
              var otherUl = otherNode.querySelector('ul');
              var otherSpan = otherNode.querySelector('span[role="button"]');
              
              if (!otherUl || !otherSpan) {
                return;
              }
              
              otherUl.classList.add('collapsed');
              otherNode.classList.remove('expanded');
              otherSpan.setAttribute('aria-expanded', 'false');
            });
            
            if (isCurrentlyCollapsed) {
              ul.classList.remove('collapsed');
              node.classList.add('expanded');
              span.setAttribute('aria-expanded', 'true');
            }
          } else {
            // Toggle without closing other sections
            if (isCurrentlyCollapsed) {
              ul.classList.remove('collapsed');
              node.classList.add('expanded');
              span.setAttribute('aria-expanded', 'true');
            } else {
              ul.classList.add('collapsed');
              node.classList.remove('expanded');
              span.setAttribute('aria-expanded', 'false');
            }
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
        
        if (parentList && parentNode && parentSpan) {
          parentList.classList.remove('collapsed');
          parentNode.classList.add('expanded');
          parentSpan.setAttribute('aria-expanded', 'true');
        }
      }
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(sidebarExpandCollapsePlugin, window.$docsify.plugins || []);
})();