document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Video Modal & Hover Logic ---
    const videoItems = document.querySelectorAll('.video-item');
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeVideoModalBtn = document.querySelector('.close-video-modal');

    videoItems.forEach(item => {
        const video = item.querySelector('video');
        if(video) video.preload = "metadata";

        // HOVER: Play silently
        item.addEventListener('mouseenter', () => {
            if(video) {
                let playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => console.log("Autoplay waiting for interaction."));
                }
            }
        });

        // LEAVE HOVER: Pause
        item.addEventListener('mouseleave', () => {
            if(video) video.pause();
        });

        // CLICK: Open Modal with Sound
        item.addEventListener('click', () => {
            const videoSrc = video.getAttribute('src');
            modalVideo.src = videoSrc;
            videoModal.classList.add('show');
            
            let playPromise = modalVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => console.log("Autoplay prevented in modal"));
            }

            video.pause(); 
        });
    });

    const closeVideoModal = () => {
        videoModal.classList.remove('show');
        setTimeout(() => {
            modalVideo.pause();
            modalVideo.src = ''; 
        }, 300);
    };

    closeVideoModalBtn.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal();
    });


    // --- 2. Image Modal Logic ---
    const zoomableImages = document.querySelectorAll('.zoomable-image');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeImageModalBtn = document.querySelector('.close-image-modal');

    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            modalImage.src = img.src; // Copy the exact image source
            imageModal.classList.add('show');
        });
    });

    const closeImageModal = () => {
        imageModal.classList.remove('show');
        setTimeout(() => {
            modalImage.src = ''; 
        }, 300);
    };

    closeImageModalBtn.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) closeImageModal();
    });


    // --- 3. Smooth Scroll Reveal Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((element) => {
        observer.observe(element);
    });


    // --- 4. Navbar Sticky Border Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.borderBottom = "1px solid var(--border-color)";
        } else {
            navbar.style.borderBottom = "1px solid transparent";
        }
    });
});
