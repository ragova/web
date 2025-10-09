if (window.matchMedia("(pointer: fine) and (hover: hover)").matches) {
    const triangle1 = document.querySelector('.triangle.one');

    document.addEventListener('mousemove', (e) => {
        const rotationFactor = 2;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 2; 
        const rotate = 180 + yPos * rotationFactor;
        triangle1.style.transform = `rotate(${rotate}deg)`;
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia("(pointer: fine) and (hover: hover)").matches) {
    document.getElementById('email').focus();
    }
});

const form = document.getElementById('subscribeForm');

const overlay = form.querySelector('.overlay');
const spinner = overlay.querySelector('.spinner');
const checkmark = overlay.querySelector('.checkmark');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
    form.classList.add('jiggle');
    form.addEventListener('animationend', () => {
        form.classList.remove('jiggle');
    }, { once: true });
    return;
    }

    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
    spinner.style.display = 'block';
    checkmark.style.display = 'none';
    form.querySelector('input').disabled = true;
    form.querySelector('button').disabled = true;

    try {
    const res = await fetch('/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const data = await res.json();

    spinner.style.display = 'none';

    if (!data.error) {
        checkmark.style.display = 'block';
        form.reset();

        setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        checkmark.style.display = 'none';
        form.querySelector('input').disabled = false;
        form.querySelector('button').disabled = false;
        message.textContent = 'Notify Me';
        }, 5000);
    } else {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        form.querySelector('input').disabled = false;
        form.querySelector('button').disabled = false;
        message.textContent = 'Notify Me';
    }

    } catch (err) {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    form.querySelector('input').disabled = false;
    form.querySelector('button').disabled = false;
    message.textContent = 'Notify Me';
    }
});