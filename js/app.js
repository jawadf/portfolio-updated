
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        console.log(entry);

        if (entry.isIntersecting) {
            entry.target.classList.add('visibile-element');
        } else {
            entry.target.classList.remove('visibile-element');
        }

    });
});


// const hiddenElements = document.querySelectorAll('.fundamentals-lottie-container');
const hiddenElements = document.querySelectorAll('.hidden-element');

hiddenElements.forEach(el => observer.observe(el));