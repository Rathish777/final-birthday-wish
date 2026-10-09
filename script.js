document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURATION ---
    const birthdayConfig = {
        name: "Pooja",
        heading: "Happy Birthday, Pooja! ❤️",
        introMessage: "Someone Special Has a Birthday Today...",
        birthdayMessage: "Today is all about you. You make ordinary moments feel magical, and I am so lucky to have you in my life. I hope your birthday brings you as much happiness as you bring into mine. You deserve all the love, laughter, and beautiful memories in the world. Happy Birthday, my favorite person! ❤️",
        extraLoveMessage: "If I could make one wish today, it would be to see you smile every single day. You are my favorite person, my happiest thought, and a very special part of my world. Happy Birthday, sweetheart! ❤️",
        letterHeading: "A Little Letter Just for You 💌",
        letterMessage: "Thank you for being such a special part of my life. I hope this year brings you endless happiness and beautiful surprises. You are truly one of a kind, and I treasure every second we spend together.",
        letterSignature: "With all my love, today and always. ❤️",
        giftMessage: "My biggest gift in life is YOU! 🎁 Thank you for being the wonderful person you are. I love you forever! ❤️",
        celebrationText: "HAPPY BIRTHDAY POOJA! 🎉✨",
        signature: "Forever Yours, Squirel"
    };

    // --- DOM ELEMENTS ---
    const introScreen = document.getElementById('intro-screen');
    const openSurpriseBtn = document.getElementById('openSurpriseBtn');
    const introText = document.getElementById('intro-text');
    const introCursor = document.getElementById('intro-cursor');

    const mainExperience = document.getElementById('main-experience');
    const bgMusic = document.getElementById('bgMusic');
    const muteBtn = document.getElementById('muteBtn');
    const birthdayMessageEl = document.getElementById('birthday-message');
    const messageCursor = document.getElementById('message-cursor');
    const loveBtn = document.getElementById('loveBtn');
    const celebrateBtn = document.getElementById('celebrateBtn');
    const giftBox = document.getElementById('giftBox');
    const envelope = document.getElementById('envelope');
    const letterPaper = document.getElementById('letterPaper');
    const loveModal = document.getElementById('loveModal');
    const giftModal = document.getElementById('giftModal');
    const imageModal = document.getElementById('imageModal');
    const loveMessage = document.getElementById('loveMessage');
    const giftMessage = document.getElementById('giftMessage');
    const fullImage = document.getElementById('fullImage');
    const closeModals = document.querySelectorAll('.close-modal');

    let isMuted = false;
    let extinguishedCandles = new Set();

    // --- SOUND MANAGER ---
    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        muteBtn.innerText = isMuted ? "🔇 Muted" : "🔊 Sound On";
        if (isMuted) bgMusic.pause(); else bgMusic.play().catch(() => {});
    });

    // --- INTRO SEQUENCE ---
    function typeIntro() {
        let i = 0;
        const text = birthdayConfig.introMessage;
        introText.innerHTML = "";
        function type() {
            if (i < text.length) {
                introText.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                introCursor.style.display = 'none';
            }
        }
        type();
    }

    function createIntroDecorations() {
        const container = document.getElementById('intro-decorations');
        if (!container) return;

        const types = ['❤️', '🌸', '✨', '💗', '⭐'];
        for (let i = 0; i < 30; i++) {
            const dec = document.createElement('div');
            dec.classList.add('intro-decoration');
            dec.innerHTML = types[Math.floor(Math.random() * types.length)];
            dec.style.left = Math.random() * 100 + 'vw';
            dec.style.top = Math.random() * 100 + 'vh';
            dec.style.fontSize = Math.random() * 20 + 10 + 'px';
            dec.style.opacity = Math.random() * 0.5 + 0.2;
            dec.style.animation = `floatUp ${Math.random() * 5 + 5}s linear infinite`;
            dec.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(dec);
        }
    }

    typeIntro();
    createIntroDecorations();

    // --- INTERACTIVE LOVE NOTES ---
    function createLoveNotes() {
        const notes = [
            "You're my everything! ❤️",
            "My heart beats for you 💓",
            "The most beautiful soul... ✨",
            "I love your smile! 😊",
            "Forever and always ♾️",
            "You are my sunshine ☀️",
            "Simply the best! 🌟",
            "My favorite person ❤️"
        ];

        const container = document.getElementById('main-experience');
        if (!container) return;

        // Create 8 random notes across the page
        for (let i = 0; i < 8; i++) {
            const note = document.createElement('div');
            note.classList.add('love-note');
            note.innerHTML = '❤️';

            // Position them randomly but within reasonable bounds
            note.style.left = Math.random() * 80 + 10 + 'vw';
            note.style.top = Math.random() * 80 + 10 + 'vh';
            note.style.animationDelay = Math.random() * 2 + 's';

            note.addEventListener('click', (e) => {
                e.stopPropagation();
                createHeartBurst();

                // Show tooltip
                const tooltip = document.createElement('div');
                tooltip.classList.add('note-tooltip');
                tooltip.innerText = notes[Math.floor(Math.random() * notes.length)];
                tooltip.style.left = e.clientX + 'px';
                tooltip.style.top = (e.clientY - 50) + 'px';
                tooltip.style.transform = 'translateX(-50%)';

                document.body.appendChild(tooltip);
                setTimeout(() => tooltip.remove(), 2000);
            });

            container.appendChild(note);
        }
    }

    // Add this call to the openSurpriseBtn event listener
    openSurpriseBtn.addEventListener('click', () => {
        bgMusic.play().catch(() => {});
        createConfetti();

        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.classList.remove('active');
            mainExperience.classList.add('active');
            setTimeout(() => {
                startHeroTypewriter();
                initScrollReveal();
                startAmbientAnimations();
                createLoveNotes(); // <--- Added this
            }, 100);
        }, 1000);
    });

    // --- HERO SECTION ---
    function startHeroTypewriter() {
        let i = 0;
        const text = birthdayConfig.birthdayMessage;
        birthdayMessageEl.innerHTML = "";

        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === '\\n') {
                    birthdayMessageEl.innerHTML += '<br>';
                } else {
                    birthdayMessageEl.innerHTML += char;
                }
                i++;
                setTimeout(type, 40);
            } else {
                messageCursor.style.display = 'none';
            }
        }
        type();
    }

    // --- CAKE INTERACTION ---
    document.querySelectorAll('.candle').forEach(candle => {
        candle.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = candle.getAttribute('data-index');
            const flame = candle.querySelector('.flame');

            if (!extinguishedCandles.has(index)) {
                extinguishedCandles.add(index);
                flame.classList.add('out');

                // Update counter if it exists
                const counter = document.getElementById('candle-counter');
                if (counter) {
                    counter.innerText = `${5 - extinguishedCandles.size} candles left ✨`;
                }

                if (extinguishedCandles.size === 5) {
                    triggerCakeCelebration();
                }
            }
        });
    });

    function triggerCakeCelebration() {
        document.getElementById('cake-msg').innerHTML = "Wish made! 💖 I love you!";
        const relightBtn = document.getElementById('relightBtn');
        if (relightBtn) relightBtn.style.display = 'inline-block';
        createConfetti();
        createHeartRain();
    }

    // Relight candles
    const relightBtn = document.getElementById('relightBtn');
    if (relightBtn) {
        relightBtn.addEventListener('click', () => {
            extinguishedCandles.clear();
            document.querySelectorAll('.flame').forEach(f => f.classList.remove('out'));
            document.getElementById('cake-msg').innerHTML = "Click the candles to blow them out! 🕯️";
            relightBtn.style.display = 'none';
            const counter = document.getElementById('candle-counter');
            if (counter) counter.innerText = "5 candles left ✨";
        });
    }

    // --- EXTRA LOVE BUTTON ---
    loveBtn.addEventListener('click', () => {
        createHeartBurst();
        loveMessage.innerHTML = `<h2 style="font-family: 'Dancing Script', cursive; color: var(--accent-color); font-size: 2rem; margin-bottom: 20px;">For My Love...</h2><p>${birthdayConfig.extraLoveMessage}</p>`;
        loveModal.style.display = 'flex';
    });

    // --- LOVE LETTER INTERACTION ---
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        letterPaper.classList.add('open');

        document.getElementById('letter-heading').innerText = birthdayConfig.letterHeading;
        document.getElementById('letter-text').innerText = birthdayConfig.letterMessage;
        document.getElementById('letter-sig').innerText = birthdayConfig.letterSignature;
    });

    // --- GIFT INTERACTION ---
    giftBox.addEventListener('click', () => {
        const lid = document.querySelector('.gift-lid');
        lid.style.transform = 'translateY(-50px) rotate(-10deg)';
        lid.style.opacity = '0';

        setTimeout(() => {
            giftMessage.innerHTML = `<h2 style="font-family: 'Dancing Script', cursive; color: var(--accent-color); font-size: 2rem; margin-bottom: 20px;">A Special Note 🎁</h2><p>${birthdayConfig.giftMessage}</p>`;
            giftModal.style.display = 'flex';
            createConfetti();
        }, 600);
    });

    // --- CELEBRATE MODE ---
    celebrateBtn.addEventListener('click', () => {
        createConfetti();
        createHeartRain();

        const h = document.createElement('h1');
        h.innerText = birthdayConfig.celebrationText;
        h.style.position = 'fixed';
        h.style.top = '50%';
        h.style.left = '50%';
        h.style.transform = 'translate(-50%, -50%)';
        h.style.fontSize = 'clamp(2rem, 8vw, 4rem)';
        h.style.fontFamily = 'Dancing Script, cursive';
        h.style.color = 'var(--accent-color)';
        h.style.zIndex = '10000';
        h.style.pointerEvents = 'none';
        h.style.textAlign = 'center';
        h.style.textShadow = '0 0 20px rgba(255,255,255,0.8)';
        h.style.width = 'auto';
        h.style.maxWidth = '90vw';
        h.style.margin = '0';
        h.style.padding = '0';
        h.style.boxSizing = 'border-box';
        h.style.whiteSpace = 'normal';
        h.style.wordWrap = 'break-word';
        h.style.animation = 'modalPopup 0.5s ease forwards';
        document.body.appendChild(h);

        setTimeout(() => h.remove(), 3000);
    });

    // --- MODAL CONTROLS ---
    window.openImage = (src) => {
        fullImage.src = src;
        imageModal.style.display = 'flex';
    };

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            loveModal.style.display = 'none';
            giftModal.style.display = 'none';
            imageModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loveModal) loveModal.style.display = 'none';
        if (e.target === giftModal) giftModal.style.display = 'none';
        if (e.target === imageModal) imageModal.style.display = 'none';
    });

    // --- AMBIENT ANIMATIONS ---
    function startAmbientAnimations() {
        setInterval(() => createHeart(), 500);
        setInterval(() => createBalloon(), 4000);
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = ['❤️', '💖', '💗', '💓', '💕'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.2;
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.innerHTML = ['🎈', '💖', '🎈'][Math.floor(Math.random() * 3)];
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.animationDuration = Math.random() * 5 + 7 + 's';
        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 12000);
    }

    function createConfetti() {
        const colors = ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#c9184a', '#ffd1dc', '#d4af37', '#fff'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }
    }

    function createHeartRain() {
        for(let i=0; i<50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = '-5vh';
                heart.style.animationDuration = Math.random() * 2 + 2 + 's';
                heart.style.fontSize = Math.random() * 30 + 20 + 'px';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 4000);
            }, i * 50);
        }
    }

    function createHeartBurst() {
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = '50vw';
            heart.style.top = '50vh';
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 150 + 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            heart.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], { duration: 1000, easing: 'ease-out' });
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    }

    // Mouse Sparkle Trail
    document.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.backgroundColor = ['#fff', '#ffccd5', '#ffb3c1'][Math.floor(Math.random() * 3)];
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    });

    // Scroll Reveal
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // Click to spawn heart
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn') || e.target.closest('.candle') || e.target.closest('.gift-container')) return;
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.position = 'fixed';
        heart.style.zIndex = '1000';
        heart.style.animation = 'floatUp 2s ease-out forwards';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    });

    // Photo frame rotation
    const frames = document.querySelectorAll('.photo-frame');
    frames.forEach(frame => {
        const randomRot = (Math.random() * 10 - 5).toFixed(2);
        frame.style.setProperty('--rotation', `${randomRot}deg`);
    });
});
