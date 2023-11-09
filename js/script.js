const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector("#closeIcon");
const menuIcon = document.querySelector("#menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);


function hideHamburgerMenuOnLargeScreens() {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
  
    function checkScreenWidth() {
      if (window.innerWidth > 599) {
        // Hide the hamburger menu
        menu.classList.remove("showMenu");
        hamburger.style.display = "none";
      } else {
        // Show the hamburger menu
        hamburger.style.display = "block";
      }
    }
  
    checkScreenWidth();
  
    window.addEventListener("resize", checkScreenWidth);
  }
  
  hideHamburgerMenuOnLargeScreens();
