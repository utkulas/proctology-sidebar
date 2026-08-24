(function initHubSidebar() {
  const originalSidebar = document.getElementById("mainHubSidebar");
  if (!originalSidebar) return;

  const existingMenu = document.querySelector(".hub-mobile-menu-system");
  if (existingMenu) existingMenu.remove();

  const mobileMenuWrapper = document.createElement("div");
  mobileMenuWrapper.classList.add("hub-mobile-menu-system");
  document.body.appendChild(mobileMenuWrapper);

  mobileMenuWrapper.innerHTML = `
    <div class="hub-mobile-overlay-bg" id="hubOverlayBg"></div>
    <button class="hub-mobile-toggle-btn" id="hubMobileToggleBtn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      Tüm Konular
    </button>
    <div class="hub-sidebar hub-mobile-cloned" id="hubMobileClonedMenu">
      <button class="hub-mobile-close-btn" id="hubMobileCloseBtn">&times;</button>
      <div id="hubMobileContentContainer"></div>
    </div>
  `;

  const contentContainer = document.getElementById("hubMobileContentContainer");
  contentContainer.innerHTML = originalSidebar.innerHTML;

  const currentPath = window.location.pathname;
  const allSidebarLinks = document.querySelectorAll(".hub-sidebar a");
  let hasActiveLink = false;

  allSidebarLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    
    if (linkPath && currentPath === linkPath) {
      hasActiveLink = true;
      
      const listItem = link.closest("li");
      if (listItem) {
        listItem.classList.add("active");
      }
      
      const accordionGroup = link.closest(".hub-sidebar__group");
      if (accordionGroup) {
        accordionGroup.classList.add("is-expanded");
      }
    }
  });

  if (!hasActiveLink) {
    const firstGroups = document.querySelectorAll(".hub-sidebar__group:first-of-type");
    firstGroups.forEach(group => group.classList.add("is-expanded"));
    
    const mainTitles = document.querySelectorAll(".hub-sidebar__title");
    mainTitles.forEach(title => title.classList.add("active-root"));
  }

  const toggleBtn = document.getElementById("hubMobileToggleBtn");
  const closeBtn = document.getElementById("hubMobileCloseBtn");
  const clonedMenu = document.getElementById("hubMobileClonedMenu");
  const overlayBg = document.getElementById("hubOverlayBg");

  function openMenu() {
    clonedMenu.classList.add("is-open");
    overlayBg.classList.add("is-visible");
    document.body.style.overflow = "hidden"; 
  }

  function closeMenu() {
    clonedMenu.classList.remove("is-open");
    overlayBg.classList.remove("is-visible");
    document.body.style.overflow = ""; 
  }

  toggleBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlayBg.addEventListener("click", closeMenu); 
  
  const siteFooter = document.querySelector("footer"); 
  let isScrolling = false;

  function checkFooterCollision() {
    if (window.innerWidth <= 768 && siteFooter) {
      const footerRect = siteFooter.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (footerRect.top < windowHeight) {
        const overlap = windowHeight - footerRect.top;
        toggleBtn.style.bottom = overlap + "px";
      } else {
        toggleBtn.style.bottom = "0px";
      }
    }
    isScrolling = false;
  }

  window.addEventListener("scroll", function() {
    if (!isScrolling) {
      window.requestAnimationFrame(checkFooterCollision);
      isScrolling = true;
    }
  });
  
  window.addEventListener("resize", function() {
    window.requestAnimationFrame(checkFooterCollision);
  });
  
  checkFooterCollision();

  document.addEventListener("click", function(e) {
    const accordionToggle = e.target.closest(".hub-sidebar__group-toggle");
    if (!accordionToggle) return;
    
    const group = accordionToggle.closest(".hub-sidebar__group");
    if (group) {
      group.classList.toggle("is-expanded");
    }
  });
})();