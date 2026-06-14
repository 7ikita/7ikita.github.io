// Music Player Interactivity
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time');
    const durationDisplay = document.querySelector('.duration');
    
    let duration = 0; // Will be set by loadedmetadata event
    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        audioPlayer.volume = parseFloat(volumeSlider.value);
        volumeSlider.addEventListener('input', function() {
            audioPlayer.volume = parseFloat(this.value);
        });
    }

    function updatePlayIcon() {
        const icon = playBtn.querySelector('i');
        if (audioPlayer.paused) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        } else {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
    }

    audioPlayer.autoplay = true;
    audioPlayer.muted = true;
    audioPlayer.volume = parseFloat(volumeSlider ? volumeSlider.value : 0.2);
    audioPlayer.loop = true;

    function attemptAutoplay() {
        if (!volumeSlider) return;
        audioPlayer.volume = parseFloat(volumeSlider.value);
        audioPlayer.play().then(() => {
            updatePlayIcon();
            audioPlayer.muted = false;
        }).catch((error) => {
            console.warn('Autoplay wurde vom Browser blockiert:', error);
        });
    }

    audioPlayer.addEventListener('canplaythrough', attemptAutoplay);
    audioPlayer.addEventListener('loadeddata', attemptAutoplay);
    attemptAutoplay();
    audioPlayer.load();
    
    // Play/Pause Button
    playBtn.addEventListener('click', function() {
        const icon = playBtn.querySelector('i');
        
        if (audioPlayer.paused) {
            audioPlayer.muted = false;
            audioPlayer.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        } else {
            audioPlayer.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    });
    
    // Prev / Next: restart current song and play
    const prevBtnEl = document.getElementById('prevBtn');
    const nextBtnEl = document.getElementById('nextBtn');
    function restartAndPlay() {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
        const icon = playBtn.querySelector('i');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }

    if (prevBtnEl) {
        prevBtnEl.addEventListener('click', function() {
            restartAndPlay();
        });
    }

    if (nextBtnEl) {
        nextBtnEl.addEventListener('click', function() {
            restartAndPlay();
        });
    }
        // Audio Events
        audioPlayer.addEventListener('timeupdate', function() {
            const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progress.style.width = percentage + '%';
            timeDisplay.textContent = formatTime(Math.floor(audioPlayer.currentTime));
        });
    
        audioPlayer.addEventListener('loadedmetadata', function() {
            duration = audioPlayer.duration;
            durationDisplay.textContent = formatTime(Math.floor(audioPlayer.duration));
        });
    
        audioPlayer.addEventListener('play', updatePlayIcon);
        audioPlayer.addEventListener('pause', updatePlayIcon);
        audioPlayer.addEventListener('ended', function() {
            // restart automatically when the track ends
            audioPlayer.currentTime = 0;
            audioPlayer.play();
            updatePlayIcon();
        });
    
    
    // Progress Bar Interaction
    progressBar.addEventListener('click', function(e) {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = (clickX / rect.width) * 100;
        audioPlayer.currentTime = (percentage / 100) * audioPlayer.duration;
    });
    
    // Format Time HH:MM or M:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Duration will be set when metadata is loaded
    
    // ============== SOCIAL LINKS HANDLING ==============
    const socialLinks = document.querySelectorAll('.social-links a');
    const socialConfig = {
        0: { // Twitch
            url: 'https://www.twitch.tv/7iklta',
            action: 'open'
        },
        1: { // Modchecker
            url: 'https://roles.tv/u/7iklta',
            action: 'open'
        },
        2: { // Discord
            url: 'https://discord.gg/5Qa6gY2uCX',
            action: 'open'
        },
        3: { // Twitter
            url: 'https://x.com/7ikita',
            action: 'open'
        }
    };
    
    socialLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const config = socialConfig[index];
            
            if (config.action === 'open') {
                window.open(config.url, '_blank');
            } else if (config.action === 'email') {
                openEmailModal();
            }
        });
    });
    
    // ============== JOIN BUTTON ==============
    const joinBtn = document.querySelector('.join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', function() {
            alert('Vielen Dank für dein Interesse! Du wurdest zur Community hinzugefügt.');
        });
    }
    
    // ============== EMAIL MODAL HANDLING ==============
    const emailModal = document.getElementById('emailModal');
    const emailForm = document.getElementById('emailForm');
    const modalClose = document.querySelector('.modal-close');
    
    function openEmailModal() {
        emailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeEmailModal() {
        emailModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        emailForm.reset();
    }
    
    modalClose.addEventListener('click', closeEmailModal);
    
    // Close modal when clicking outside
    emailModal.addEventListener('click', function(e) {
        if (e.target === emailModal) {
            closeEmailModal();
        }
    });
    
    // Handle email form submission
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const senderName = document.getElementById('senderName').value;
        const senderEmail = document.getElementById('senderEmail').value;
        const message = document.getElementById('messageText').value;
        
        // Compose mailto link
        const subject = encodeURIComponent(`Nachricht von ${senderName}`);
        const body = encodeURIComponent(
            `Absender: ${senderName}\nEmail: ${senderEmail}\n\n${message}`
        );
        
        // Open default email client
        window.location.href = `mailto:business.glownikitaa@gmail.com?subject=${subject}&body=${body}`;
        
        // Close modal after a short delay
        setTimeout(() => {
            closeEmailModal();
        }, 500);
    });
});

// Add animations on page load
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.profile-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Typewriter effect for moderator card
    (function() {
        const el = document.getElementById('typewriter');
        const cursor = document.querySelector('.typewriter .cursor');
        if (!el) return;

        const phrases = [
            { text: 'Twitch Moderator / Chatter', hold: 1000 },
            { text: 'Contact - Discord: 7ikita', hold: 2000 }
        ];

        const typeSpeed = 60; // ms per char
        const deleteSpeed = 40; // ms per char

        function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

        async function typeText(text) {
            for (let i = 0; i < text.length; i++) {
                el.textContent += text.charAt(i);
                await wait(typeSpeed);
            }
        }

        async function deleteText() {
            while (el.textContent.length > 0) {
                el.textContent = el.textContent.slice(0, -1);
                await wait(deleteSpeed);
            }
        }

        (async function run() {
            while (true) {
                // Type first phrase
                await typeText(phrases[0].text);
                await wait(phrases[0].hold);
                // Delete first phrase
                await deleteText();
                await wait(200);
                // Type second phrase
                await typeText(phrases[1].text);
                await wait(phrases[1].hold);
                // Delete second phrase before repeating
                await deleteText();
                await wait(400);
            }
        })();
    })();
});
