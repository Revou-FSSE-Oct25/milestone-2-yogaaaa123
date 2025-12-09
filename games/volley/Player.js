import { CANVAS_WIDTH, CANVAS_HEIGHT, GRAVITY } from './constants.js';

export class Player {
    constructor(x, y, isLeft, color) {
        this.x = x;
        this.y = y;
        this.radius = 40; // Semicircle radius
        this.vx = 0;
        this.vy = 0;
        this.speed = 6;
        this.jumpForce = -12;
        this.isLeft = isLeft; // true for left player, false for right
        this.color = color;
        this.grounded = false;
    }

    update(input) {
        // Controls
        if (this.isLeft) {
            if (input.isDown('a')) this.vx = -this.speed;
            else if (input.isDown('d')) this.vx = this.speed;
            else this.vx = 0;

            if (input.isDown('w') && this.grounded) {
                this.vy = this.jumpForce;
                this.grounded = false;
            }
        } else {
            // Player 2 controls
            if (input.isDown('ArrowLeft')) this.vx = -this.speed;
            else if (input.isDown('ArrowRight')) this.vx = this.speed;
            else this.vx = 0;

            if (input.isDown('ArrowUp') && this.grounded) {
                this.vy = this.jumpForce;
                this.grounded = false;
            }
        }

        // Physics
        this.vy += GRAVITY;
        this.x += this.vx;
        this.y += this.vy;

        // Floor collision
        if (this.y > CANVAS_HEIGHT) {
            this.y = CANVAS_HEIGHT;
            this.vy = 0;
            this.grounded = true;
        }

        // Wall collision
        if (this.x - this.radius < 0) this.x = this.radius;
        if (this.x + this.radius > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.radius;

        // Net collision
        const netX = CANVAS_WIDTH / 2;
        const netW = 10;
        const netH = 150;

        // Simple net collision for player
        if (this.y > CANVAS_HEIGHT - netH) {
            if (this.isLeft) {
                if (this.x + this.radius > netX - netW / 2) {
                    this.x = netX - netW / 2 - this.radius;
                }
            } else {
                if (this.x - this.radius < netX + netW / 2) {
                    this.x = netX + netW / 2 + this.radius;
                }
            }
        }
    }

    draw(ctx) {
        ctx.beginPath();
        // Draw semicircle (slime shape)
        ctx.arc(this.x, this.y, this.radius, Math.PI, 0);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Eye
        const eyeX = this.isLeft ? this.x + 20 : this.x - 20;
        const eyeY = this.y - 25;
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        // Pupil
        const pupilX = this.isLeft ? eyeX + 3 : eyeX - 3;
        ctx.beginPath();
        ctx.arc(pupilX, eyeY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
    }
}
