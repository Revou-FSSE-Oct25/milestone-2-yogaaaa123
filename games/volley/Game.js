import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';
import { Player } from './Player.js';
import { Ball } from './Ball.js';
import { InputHandler } from './InputHandler.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        this.input = new InputHandler();

        this.reset();

        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    reset() {
        this.player1 = new Player(200, CANVAS_HEIGHT, true, '#3b82f6'); // blue-500
        this.player2 = new Player(600, CANVAS_HEIGHT, false, '#eab308'); // yellow-500
        this.ball = new Ball(200, 200, 15);
        this.score1 = 0;
        this.score2 = 0;
    }

    checkCollision(circle, rect) {
        // Simple circle-circle collision for player-ball
        // Treat player as circle for collision for simplicity first
        const dx = circle.x - rect.x;
        const dy = circle.y - rect.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circle.radius + rect.radius) {
            // Collision detected
            // Calculate angle
            const angle = Math.atan2(dy, dx);

            // Push ball out
            const overlap = circle.radius + rect.radius - distance;
            circle.x += Math.cos(angle) * overlap;
            circle.y += Math.sin(angle) * overlap;

            // Bounce
            // Add some upward force and transfer velocity
            // Simple physics approximation
            const speed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
            const force = 12; // Bounce force

            circle.vx = Math.cos(angle) * force + rect.vx * 0.5;
            circle.vy = Math.sin(angle) * force + rect.vy * 0.5;

            // Cap max speed
            const maxSpeed = 15;
            if (circle.vx > maxSpeed) circle.vx = maxSpeed;
            if (circle.vx < -maxSpeed) circle.vx = -maxSpeed;
            if (circle.vy > maxSpeed) circle.vy = maxSpeed;
            if (circle.vy < -maxSpeed) circle.vy = -maxSpeed;
        }
    }

    checkScore() {
        if (this.ball.y + this.ball.radius >= CANVAS_HEIGHT) {
            // Ball hit ground
            if (this.ball.x < CANVAS_WIDTH / 2) {
                // Left side (Player 1 side) -> Player 2 scores
                this.score2++;
                this.resetBall(false);
            } else {
                // Right side (Player 2 side) -> Player 1 scores
                this.score1++;
                this.resetBall(true);
            }
        }
    }

    resetBall(toLeft) {
        this.ball.x = toLeft ? 200 : 600;
        this.ball.y = 200;
        this.ball.vx = 0;
        this.ball.vy = 0;
    }

    update() {
        this.player1.update(this.input);
        this.player2.update(this.input);
        this.ball.update();

        this.checkCollision(this.ball, this.player1);
        this.checkCollision(this.ball, this.player2);

        this.checkScore();
    }

    draw() {
        // Clear
        this.ctx.fillStyle = '#f0f9ff'; // sky-50
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw Net
        this.ctx.fillStyle = '#94a3b8'; // slate-400
        this.ctx.fillRect(CANVAS_WIDTH / 2 - 5, CANVAS_HEIGHT - 150, 10, 150);

        // Draw Score
        this.ctx.font = 'bold 48px sans-serif';
        this.ctx.fillStyle = '#3b82f6';
        this.ctx.fillText(this.score1, 50, 60);

        this.ctx.fillStyle = '#eab308';
        this.ctx.fillText(this.score2, CANVAS_WIDTH - 80, 60);

        this.player1.draw(this.ctx);
        this.player2.draw(this.ctx);
        this.ball.draw(this.ctx);
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.loop);
    }
}
