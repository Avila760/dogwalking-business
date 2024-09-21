const sections = document.querySelectorAll("section[id].content");

function scrollTracker() {
    const currentYScroll = window.scrollY;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const id = section.getAttribute("id");
        const currentNavLink = document.querySelector(`.navbar a[href*="#${id}"]`);
        if(
            currentYScroll > sectionTop &&
            currentYScroll <= sectionTop + sectionHeight 
        ) {
            currentNavLink.classList.add("active");
        } else {
            currentNavLink.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", scrollTracker);



function message(){
    var Name = document.getElementById('name');
    var email = document.getElementById('email');
    var msg = document.getElementById('msg');
    const success = document.getElementById('success');

    if(Name.value === '' || email.value === '' || msg.value === ''){

    }
    else{
        setTimeout(() => {
            Name.value = '';
            email.value = '';
            msg.value = '';
        }, 2000);

        success.style.display = 'block';
    }

    setTimeout(() => {
        success.style.display = 'none';
    }, 8000);
}