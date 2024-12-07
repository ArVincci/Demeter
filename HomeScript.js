//Animation for the image, missionText and Newsletter section at Home.html
document.addEventListener('DOMContentLoaded', () => {
    const image = document.querySelector('.mission img');
    const missionText = document.querySelector('.mission-text');
    const newsletter = document.querySelector('.mission .newsletter'); 

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {

                image.classList.add('visible');

                setTimeout(() => {
                    missionText.classList.add('visible');
                }, 1000); 

                setTimeout(() => {
                    newsletter.classList.add('visible');
                }, 1500); 

                observer.unobserve(image);
            }
        },
        { threshold: 0.5 }
    );

    observer.observe(image);
});

//Animations for the button group on the donations.html
document.querySelectorAll('.button-group, .amount-group').forEach(group => {
    const buttons = group.querySelectorAll('button');
    const highlight = group.querySelector('.highlight');
    const otherInput = group.querySelector('.other-amount'); 

    //click event for buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            //Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            if (otherInput) otherInput.classList.remove('active'); 
            
            //Add active class to the clicked button
            button.classList.add('active');

            //Needed for the highlight
            //Get the position and width of the clicked button
            const buttonRect = button.getBoundingClientRect();
            const groupRect = group.getBoundingClientRect();
            const offsetLeft = buttonRect.left - groupRect.left;
            const buttonWidth = buttonRect.width;

            //Move the highlight
            highlight.style.width = `${buttonWidth}px`;
            highlight.style.left = `${offsetLeft}px`;
        });
    });

    //Adds focus event for the "Other" input
    if (otherInput) {
        otherInput.addEventListener('focus', () => {
            //Remove active class from buttons
            buttons.forEach(btn => btn.classList.remove('active'));

            //Adds active class to the input
            otherInput.classList.add('active');

            //Get the position and width of the input field
            const inputRect = otherInput.getBoundingClientRect();
            const groupRect = group.getBoundingClientRect();
            const offsetLeft = inputRect.left - groupRect.left;
            const inputWidth = inputRect.width;

            //Move the highlight
            highlight.style.width = `${inputWidth}px`;
            highlight.style.left = `${offsetLeft}px`;
        });
    }

    //Initialize highlight for the active button once the page loads
    const activeButton = group.querySelector('button.active');
    if (activeButton) {
        const activeRect = activeButton.getBoundingClientRect();
        const groupRect = group.getBoundingClientRect();
        highlight.style.width = `${activeRect.width}px`;
        highlight.style.left = `${activeRect.left - groupRect.left}px`;
    }
});