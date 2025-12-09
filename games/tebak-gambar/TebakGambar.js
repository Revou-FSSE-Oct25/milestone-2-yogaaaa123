export class TebakGambar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        // Format: 
        // puzzle: gambar soal (ada angka 1)
        // answerImg: gambar jawaban/hint (tidak ada angka)
        // answer: jawaban teks
        this.questions = [
            {
                puzzle: "assets/ayam1.jpg",
                answerImg: "assets/ayam.jpg",
                answer: "ayam"
            },
            {
                puzzle: "assets/kucing1.jpg",
                answerImg: "assets/kucing.jpg",
                answer: "kucing"
            },
            {
                puzzle: "assets/serigala1.jpg",
                answerImg: "assets/serigala.jpg",
                answer: "serigala"
            }
        ];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.attempts = 0; // Track attempts per question
        this.init();
    }

    init() {
        this.render();
    }

    render() {
        this.container.innerHTML = '';

        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResult();
            return;
        }

        const q = this.questions[this.currentQuestionIndex];

        const card = document.createElement('div');
        card.className = 'bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full';

        // Image Container
        const imgContainer = document.createElement('div');
        imgContainer.className = 'mb-8 flex justify-center items-center h-64 bg-slate-100 rounded-lg overflow-hidden';

        const img = document.createElement('img');
        // Logic: If attempts >= 2, show the "answerImg" (hint), otherwise show "puzzle"
        img.src = this.attempts >= 2 ? q.answerImg : q.puzzle;
        img.alt = 'Tebak Gambar';
        img.className = 'max-h-full max-w-full object-contain transition-all duration-500';

        imgContainer.appendChild(img);

        const title = document.createElement('h3');
        title.className = 'text-xl font-bold text-slate-700 mb-4';
        title.textContent = this.attempts >= 2 ? 'Hint Unlocked!' : 'Guess the Hybrid Animal!';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Type your answer...';
        input.className = 'w-full p-3 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500';

        const btn = document.createElement('button');
        btn.textContent = 'Submit';
        btn.className = 'w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors';

        const feedback = document.createElement('p');
        feedback.className = 'mt-4 font-bold hidden';

        btn.onclick = () => {
            const val = input.value.toLowerCase().trim();
            if (val === q.answer) {
                this.score++;
                feedback.textContent = 'Correct! 🎉';
                feedback.className = 'mt-4 font-bold text-green-600 block';
                setTimeout(() => {
                    this.currentQuestionIndex++;
                    this.attempts = 0; // Reset attempts for next question
                    this.render();
                }, 1000);
            } else {
                this.attempts++;
                feedback.textContent = 'Wrong! Try again.';
                feedback.className = 'mt-4 font-bold text-red-600 block';

                // If attempts reached 2, re-render to show the hint image
                if (this.attempts === 2) {
                    setTimeout(() => {
                        this.render();
                    }, 1000);
                }
            }
        };

        // Allow Enter key
        input.onkeypress = (e) => {
            if (e.key === 'Enter') btn.click();
        };

        card.appendChild(imgContainer);
        card.appendChild(title);
        card.appendChild(input);
        card.appendChild(btn);
        card.appendChild(feedback);

        // Score display
        const scoreDisplay = document.createElement('div');
        scoreDisplay.className = 'mt-6 text-slate-500 text-sm';
        scoreDisplay.textContent = `Score: ${this.score} / ${this.questions.length}`;
        card.appendChild(scoreDisplay);

        this.container.appendChild(card);
        input.focus();
    }

    showResult() {
        const card = document.createElement('div');
        card.className = 'bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full';

        const title = document.createElement('h2');
        title.className = 'text-3xl font-bold text-slate-800 mb-4';
        title.textContent = 'Game Over!';

        const score = document.createElement('p');
        score.className = 'text-xl text-slate-600 mb-8';
        score.textContent = `Final Score: ${this.score} / ${this.questions.length}`;

        const btn = document.createElement('button');
        btn.textContent = 'Play Again';
        btn.className = 'bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors';
        btn.onclick = () => {
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.attempts = 0;
            this.render();
        };

        card.appendChild(title);
        card.appendChild(score);
        card.appendChild(btn);
        this.container.appendChild(card);
    }
}
