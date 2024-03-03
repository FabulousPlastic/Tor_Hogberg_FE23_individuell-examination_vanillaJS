// Parallax.js
export function updateParallax() {
    const spaceView = document.getElementById('space-view');
    const scrollLeft = spaceView.scrollLeft;
    document.querySelectorAll('.parallax-layer').forEach(layer => {
        const depth = parseFloat(layer.style.getPropertyValue('--depth'));
        const movement = -(scrollLeft * depth);
        layer.style.transform = `translateX(${movement}px) scale(calc(1 + ${depth}))`;
    });
}
