window.onload = function() {
    let c = document.getElementById('c');
    let w = (c.width = window.innerWidth),
        h = (c.height = window.innerHeight),
        ctx = c.getContext("2d");

    let particles = [];
    let animationFrame;

    function createFirework(x, y) {
        for (let i = 0; i < 150; i++) { // Увеличено количество для большего эффекта
            particles.push({
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 5,
                dy: (Math.random() - 0.5) * 5,
                life: Math.random() * 100,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, w, h);
        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            p.life--;

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    function animate() {
        drawParticles();
        animationFrame = requestAnimationFrame(animate);
    }

    function startFireworks() {
        setInterval(() => {
            let randomX = Math.random() * w;
            let randomY = Math.random() * (h - 200) + 100; // Смещаем вверх, чтобы не взрывалось только в центре
            createFirework(randomX, randomY);
        }, 500); // Частота фейерверков
    }

    // Запуск анимации фейерверков
    startFireworks();
    animate();
};
