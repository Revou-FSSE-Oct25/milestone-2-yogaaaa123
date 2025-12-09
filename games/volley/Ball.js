import { CANVAS_WIDTH, CANVAS_HEIGHT, GRAVITY, FRICTION } from './constants.js';

export class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = 0;
        this.vy = 0;
        this.color = '#ef4444'; // red-500
    }

    update() {
        this.vy += GRAVITY;
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off floor
        if (this.y + this.radius > CANVAS_HEIGHT) {
            this.y = CANVAS_HEIGHT - this.radius;
            this.vy *= -0.85; // Bounce with energy loss
            this.vx *= FRICTION;
        }

        // Bounce off walls
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -0.8;
        }
        if (this.x + this.radius > CANVAS_WIDTH) {
            this.x = CANVAS_WIDTH - this.radius;
            this.vx *= -0.8;
        }

        // Net collision (simple)
        const netX = CANVAS_WIDTH / 2;
        const netH = 150;
        const netW = 10;

        // Check if ball is within net height range
        if (this.y + this.radius > CANVAS_HEIGHT - netH) {
            // Check horizontal collision
            if (this.x + this.radius > netX - netW / 2 && this.x - this.radius < netX + netW / 2) {
                // Hit net
                // Determine side
                if (this.x < netX) {
                    this.x = netX - netW / 2 - this.radius;
                    this.vx *= -0.8;
                } else {
                    this.x = netX + netW / 2 + this.radius;
                    this.vx *= -0.8;
                }
            }
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
