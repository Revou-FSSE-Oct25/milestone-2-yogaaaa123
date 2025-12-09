export class WhackAMole {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = 600;
        this.height = 400;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.score = 0;
        this.timeLeft = 30;
        this.gameOver = false;

        // Grid 3x2
        this.holes = [
            { x: 100, y: 150 }, { x: 300, y: 150 }, { x: 500, y: 150 },
            { x: 100, y: 300 }, { x: 300, y: 300 }, { x: 500, y: 300 }
        ];
        this.radius = 40;

        this.mole = null; // { index: 0, timer: 0 }
        this.moleTimer = 0;
        this.moleInterval = 60; // Frames

        this.canvas.addEventListener('mousedown', (e) => this.handleClick(e));

        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);

        // Timer countdown
        setInterval(() => {
            if (!this.gameOver && this.timeLeft > 0) {
                this.timeLeft--;
                if (this.timeLeft <= 0) this.gameOver = true;
            }
        }, 1000);
    }

    spawnMole() {
        const index = Math.floor(Math.random() * this.holes.length);
        this.mole = { index, yOffset: this.radius };
    }

    handleClick(e) {
        if (this.gameOver || !this.mole) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const hole = this.holes[this.mole.index];
        // Check distance to mole center
        // Mole is at hole.x, hole.y - yOffset
        // But simplified: check if click is near hole when mole is up
        const dx = x - hole.x;
        const dy = y - (hole.y - 20); // Approx mole center
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.radius) {
            this.score++;
            this.mole = null; // Whacked!
            this.moleTimer = 0; // Reset timer for next spawn
        }
    }

    update() {
        if (this.gameOver) return;

        if (!this.mole) {
            this.moleTimer++;
            if (this.moleTimer > 30) { // Wait a bit before spawning
                this.spawnMole();
                this.moleTimer = 0;
            }
        } else {
            this.moleTimer++;
            if (this.moleTimer > 60) { // Mole stays for ~1 sec
                this.mole = null; // Missed
                this.moleTimer = 0;
            }
        }
    }

    draw() {
        // Background
        this.ctx.fillStyle = '#86efac'; // green-300
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Holes
        this.holes.forEach(hole => {
            this.ctx.beginPath();
            this.ctx.ellipse(hole.x, hole.y, 50, 20, 0, 0, Math.PI * 2);
            this.ctx.fillStyle = '#3f2c22'; // dark brown
            this.ctx.fill();
        });

        // Mole
        if (this.mole) {
            const hole = this.holes[this.mole.index];
            this.ctx.beginPath();
            this.ctx.arc(hole.x, hole.y - 20, this.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#713f12'; // brown-900
            this.ctx.fill();

            // Eyes
            this.ctx.fillStyle = 'black';
            this.ctx.beginPath();
            this.ctx.arc(hole.x - 15, hole.y - 30, 5, 0, Math.PI * 2);
            this.ctx.arc(hole.x + 15, hole.y - 30, 5, 0, Math.PI * 2);
            this.ctx.fill();

            // Nose
            this.ctx.fillStyle = 'pink';
            this.ctx.beginPath();
            this.ctx.arc(hole.x, hole.y - 20, 8, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // UI
        this.ctx.fillStyle = 'black';
        this.ctx.font = 'bold 24px sans-serif';
        this.ctx.fillText(`Score: ${this.score}`, 20, 40);
        this.ctx.fillText(`Time: ${this.timeLeft}`, this.width - 120, 40);

        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 48px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.width / 2, this.height / 2);
            this.ctx.font = '24px sans-serif';
            this.ctx.fillText(`Final Score: ${this.score}`, this.width / 2, this.height / 2 + 40);
        }
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.loop);
    }
}
