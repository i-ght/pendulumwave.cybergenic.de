function codex() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const SCREEN_WIDTH = canvas.height; // Swap width and height
    const SCREEN_HEIGHT = canvas.width; // Swap width and height
    
    const PENDULUM_LENGTHS = [100, 120, 140, 160, 180, 200, 220];
    const PENDULUM_COLORS = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"].reverse();

    const AMPLITUDE = 45; // Maximum angle (in degrees) from the vertical position
    const PHASE_OFFSET = Math.PI / 2; // Phase offset to start pendulums facing southward


    const FREQUENCIES = new Array(9);
    for (let i = 0; i < 9; i++) {
        FREQUENCIES[i] = 0.009 + (0.001 * i);
    }
    // Define an array of slightly different frequencies
    /* const FREQUENCIES = [0.010, 0.011, 0.012, 0.013, 0.014, 0.015, 0.016, 0.017, 0.018]; */

    function calculatePendulumPosition(length, angle, offset_x, offset_y) {
        const x = length * Math.cos(angle); // Swap sin and cos
        const y = length * Math.sin(angle); // Swap sin and cos
        return [x + offset_x, y + offset_y];
    }

    let timeElapsed = 0;

    function drawPendulumWave() {
        ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        const Y = 100;

        for (let i = 0; i < PENDULUM_LENGTHS.length; i++) {
            const length = PENDULUM_LENGTHS[i];
            const angle = AMPLITUDE * Math.sin(2 * Math.PI * FREQUENCIES[i] * timeElapsed + i * 0.2 + PHASE_OFFSET);
            const [x, y] = calculatePendulumPosition(length, Math.radians(90 - angle), SCREEN_WIDTH / 2, Y);
            const color = PENDULUM_COLORS[i % PENDULUM_COLORS.length];

            ctx.beginPath();
            ctx.moveTo(SCREEN_WIDTH / 2, Y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        timeElapsed++;

        requestAnimationFrame(drawPendulumWave);
    }

    Math.radians = function (degrees) {
        return degrees * (Math.PI / 180);
    };

    drawPendulumWave();
}