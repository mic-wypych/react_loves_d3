const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

const LINE_COUNT = 10;
const RHOMBUS_SIZE = 9;
const LINE_LENGTH = 80;
const LINE_COLOR = 'rgba(0, 0, 0, 0.25)';
const RHOMBUS_COLOR = '#386641';

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Build lines - alternate direction, stagger starting positions
const lines = Array.from({ length: LINE_COUNT }, (_, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    return {
        y: dir === 1
            ? Math.random() * canvas.height
            : canvas.height - Math.random() * canvas.height,
        speed: 0.8 + Math.random() * 1.2,
        dir,
    };
});

function drawRhombus(x, y) {
    ctx.beginPath();
    ctx.moveTo(x,                  y - RHOMBUS_SIZE);
    ctx.lineTo(x + RHOMBUS_SIZE,   y);
    ctx.lineTo(x,                  y + RHOMBUS_SIZE);
    ctx.lineTo(x - RHOMBUS_SIZE,   y);
    ctx.closePath();
    ctx.fillStyle = RHOMBUS_COLOR;
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const spacing = canvas.width / (LINE_COUNT + 1);

    lines.forEach((line, i) => {
        const x = spacing * (i + 1);

        // short line trailing behind the rhombus
        const lineStart = line.y - line.dir * RHOMBUS_SIZE;
        const lineEnd   = line.y - line.dir * (RHOMBUS_SIZE + LINE_LENGTH);
        ctx.beginPath();
        ctx.moveTo(x, lineStart);
        ctx.lineTo(x, lineEnd);
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();

        // rhombus at the leading end
        drawRhombus(x, line.y);

        // advance position
        line.y += line.speed * line.dir;

        // wrap around when off-screen
        if (line.dir === 1 && line.y > canvas.height + RHOMBUS_SIZE) {
            line.y = -RHOMBUS_SIZE;
        } else if (line.dir === -1 && line.y < -RHOMBUS_SIZE) {
            line.y = canvas.height + RHOMBUS_SIZE;
        }
    });

    requestAnimationFrame(draw);
}

draw();


