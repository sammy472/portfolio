const navSlide = () => {
    const bg = document.querySelector(".burger");
    const nav = document.querySelector(".navlinks");
    const navlinks = document.querySelectorAll("li");


    bg.addEventListener("click", () => {
        //toggle
        nav.classList.toggle("nav-active");
        //animate
        const width = window.innerWidth;
        nav.style.width = width + "px";

        navlinks.forEach((links, index) => {
            if (links.style.animation) {
                links.style.animation = '';
            } else {
                links.style.animation = `navLinkFade 0.5s ease forwards ${index/5+1.5}s`;
            };
        });
        document.body.classList.toggle('hide-scroll');
        //burger animation
        bg.classList.toggle("toggle");
    });



}
navSlide();