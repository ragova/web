if (window.matchMedia("(pointer: fine) and (hover: hover)").matches) {
    const triangle1 = document.querySelector('.triangle.one');

    document.addEventListener('mousemove', (e) => {
        const rotationFactor = 2;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 2; 
        const rotate = 180 + yPos * rotationFactor;
        triangle1.style.transform = `rotate(${rotate}deg)`;
    });
}
