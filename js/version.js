
        class VisionCarousel {
            constructor() {
                this.currentSlide = 0;
                this.totalSlides = 5;
                this.isAutoPlaying = false;
                this.autoInterval = null;
                this.track = document.getElementById('visionCarouselTrack');
                this.slides = document.querySelectorAll('.vision-carousel-slide');
                this.indicators = document.querySelectorAll('.vision-indicator');
                this.prevBtn = document.getElementById('visionPrevBtn');
                this.nextBtn = document.getElementById('visionNextBtn');
                this.autoBtn = document.getElementById('visionAutoBtn');
                this.wheelTimeout = null;
                
                this.init();
                this.createParticles();
            }
            
            init() {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                this.autoBtn.addEventListener('click', () => this.toggleAutoPlay());
                
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => this.goToSlide(index));
                });
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prevSlide();
                    if (e.key === 'ArrowRight') this.nextSlide();
                    if (e.key === ' ') {
                        e.preventDefault();
                        this.toggleAutoPlay();
                    }
                });
                
                // Touch/swipe support
                let startY = 0;
                let startX = 0;
                
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                });
                
                this.track.addEventListener('touchend', (e) => {
                    const endX = e.changedTouches[0].clientX;
                    const endY = e.changedTouches[0].clientY;
                    const deltaX = endX - startX;
                    const deltaY = endY - startY;
                    
                    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                        if (deltaX > 0) {
                            this.prevSlide();
                        } else {
                            this.nextSlide();
                        }
                    }
                });
                
                // Mouse wheel support with throttling
                this.track.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    
                    if (this.wheelTimeout) {
                        clearTimeout(this.wheelTimeout);
                    }
                    
                    this.wheelTimeout = setTimeout(() => {
                        if (Math.abs(e.deltaY) > 10) {
                            if (e.deltaY > 0) {
                                this.nextSlide();
                            } else {
                                this.prevSlide();
                            }
                        }
                    }, 50);
                }, { passive: false });
            }
            
            updateCarousel() {
                const rotation = -this.currentSlide * 72; // 360 / 5 slides = 72 degrees
                this.track.style.transform = `rotateY(${rotation}deg)`;
                
                // Update active states
                this.slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === this.currentSlide);
                });
                
                this.indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentSlide);
                });
            }
            
            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateCarousel();
            }
            
            prevSlide() {
                this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.updateCarousel();
            }
            
            goToSlide(index) {
                this.currentSlide = index;
                this.updateCarousel();
            }
            
            toggleAutoPlay() {
                if (this.isAutoPlaying) {
                    this.stopAutoPlay();
                } else {
                    this.startAutoPlay();
                }
            }
            
            startAutoPlay() {
                this.isAutoPlaying = true;
                this.autoBtn.innerHTML = '<i class="fas fa-pause"></i>';
                this.autoInterval = setInterval(() => {
                    this.nextSlide();
                }, 2000);
            }
            
            stopAutoPlay() {
                this.isAutoPlaying = false;
                this.autoBtn.innerHTML = '<i class="fas fa-play"></i>';
                if (this.autoInterval) {
                    clearInterval(this.autoInterval);
                    this.autoInterval = null;
                }
            }
            
            createParticles() {
                const particlesContainer = document.getElementById('visionParticles');
                const particleCount = 20; // Reduced for better performance
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'vision-particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 8 + 's';
                    particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
                    particlesContainer.appendChild(particle);
                }
            }
        }
        
        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new VisionCarousel();
            
            // Preload images for better performance
            const images = [
                'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
            ];
            
            images.forEach(src => {
                const img = new Image();
                img.src = src;
            });
            
            // Add smooth scroll behavior
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
            
            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);
            
            // Observe elements for animation
            document.querySelectorAll('.vision-content-col, .vision-carousel-col').forEach(el => {
                observer.observe(el);
            });
            
            // Performance optimization: Reduce animations on low-end devices
            const isLowEndDevice = () => {
                return navigator.hardwareConcurrency <= 2 || 
                       navigator.deviceMemory <= 2 ||
                       /Android/.test(navigator.userAgent) && screen.width < 768;
            };
            
            if (isLowEndDevice()) {
                document.body.classList.add('reduce-motion');
                // Disable particle effects on low-end devices
                const particles = document.getElementById('visionParticles');
                if (particles) {
                    particles.style.opacity = '0.3';
                }
            }
            
            // Add resize handler for carousel optimization
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    // Reinitialize carousel dimensions if needed
                    const carousel = document.querySelector('.vision-carousel-container');
                    if (carousel) {
                        carousel.style.height = getComputedStyle(carousel).height;
                    }
                }, 250);
            });
            
            // Add focus management for accessibility
            const carouselButtons = document.querySelectorAll('.vision-control-btn, .vision-indicator');
            carouselButtons.forEach(button => {
                button.addEventListener('focus', () => {
                    button.style.outline = '2px solid var(--vision-caramel)';
                    button.style.outlineOffset = '2px';
                });
                
                button.addEventListener('blur', () => {
                    button.style.outline = 'none';
                });
            });
            
            // Add ARIA labels for better accessibility
            const prevBtn = document.getElementById('visionPrevBtn');
            const nextBtn = document.getElementById('visionNextBtn');
            const autoBtn = document.getElementById('visionAutoBtn');
            
            if (prevBtn) prevBtn.setAttribute('aria-label', 'Previous slide');
            if (nextBtn) nextBtn.setAttribute('aria-label', 'Next slide');
            if (autoBtn) autoBtn.setAttribute('aria-label', 'Toggle autoplay');
            
            // Add live region for screen readers
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
            
            // Update live region when carousel changes
            const originalUpdateCarousel = VisionCarousel.prototype.updateCarousel;
            VisionCarousel.prototype.updateCarousel = function() {
                originalUpdateCarousel.call(this);
                liveRegion.textContent = `Slide ${this.currentSlide + 1} of ${this.totalSlides}`;
            };
            
            // Add error handling for image loading
            document.querySelectorAll('.vision-slide-card').forEach((card, index) => {
                const bgImage = getComputedStyle(card).backgroundImage;
                const imageUrl = bgImage.slice(5, -2); // Remove 'url("' and '")'
                
                if (imageUrl && imageUrl !== 'none') {
                    const img = new Image();
                    img.onload = () => {
                        card.classList.add('image-loaded');
                    };
                    img.onerror = () => {
                        card.style.backgroundImage = 'linear-gradient(45deg, var(--vision-chocolate-light), var(--vision-chocolate-medium))';
                        card.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 1.2rem;"><i class="fas fa-image"></i></div>';
                    };
                    img.src = imageUrl;
                }
            });
            
            // Add theme toggle functionality (if needed)
            const createThemeToggle = () => {
                const themeToggle = document.createElement('button');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                themeToggle.className = 'theme-toggle-btn';
                themeToggle.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: none;
                    background: var(--vision-gradient);
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: var(--vision-shadow);
                `;
                
                themeToggle.addEventListener('click', () => {
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    
                    document.documentElement.setAttribute('data-theme', newTheme);
                    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                    
                    // Save theme preference
                    localStorage.setItem('vision-theme', newTheme);
                });
                
                // Load saved theme
                const savedTheme = localStorage.getItem('vision-theme') || 'light';
                document.documentElement.setAttribute('data-theme', savedTheme);
                themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                
                document.body.appendChild(themeToggle);
            };
            
            // Uncomment the line below to enable theme toggle
            // createThemeToggle();
            
            // Add keyboard navigation instructions
            const addKeyboardInstructions = () => {
                const instructions = document.createElement('div');
                instructions.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px 15px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                `;
                instructions.innerHTML = `
                    <div><strong>Keyboard Navigation:</strong></div>
                    <div>← → Arrow keys to navigate</div>
                    <div>Space to toggle autoplay</div>
                `;
                
                let hideTimeout;
                const showInstructions = () => {
                    instructions.style.opacity = '1';
                    clearTimeout(hideTimeout);
                    hideTimeout = setTimeout(() => {
                        instructions.style.opacity = '0';
                    }, 3000);
                };
                
                document.addEventListener('keydown', showInstructions, { once: true });
                document.body.appendChild(instructions);
            };
            
            addKeyboardInstructions();
            
            // Performance monitoring
            const performanceMonitor = {
                startTime: performance.now(),
                
                logMetric: function(name, value) {
                    console.log(`[Vision Carousel] ${name}: ${value}ms`);
                },
                
                measureInitTime: function() {
                    const initTime = performance.now() - this.startTime;
                    this.logMetric('Initialization Time', initTime);
                },
                
                measureFrameRate: function() {
                    let frameCount = 0;
                    let lastTime = performance.now();
                    
                    const measureFrame = () => {
                        frameCount++;
                        const currentTime = performance.now();
                        
                        if (currentTime - lastTime >= 1000) {
                            this.logMetric('Frame Rate', frameCount);
                            frameCount = 0;
                            lastTime = currentTime;
                        }
                        
                        requestAnimationFrame(measureFrame);
                    };
                    
                    requestAnimationFrame(measureFrame);
                }
            };
            
            // Enable performance monitoring in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                performanceMonitor.measureInitTime();
                performanceMonitor.measureFrameRate();
            }
            
            // Add loading animation
            const addLoadingAnimation = () => {
                const carousel = document.querySelector('.vision-carousel-container');
                if (carousel) {
                    carousel.style.opacity = '0';
                    carousel.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        carousel.style.transition = 'all 0.8s ease';
                        carousel.style.opacity = '1';
                        carousel.style.transform = 'translateY(0)';
                    }, 100);
                }
            };
            
            addLoadingAnimation();
            
            // Add CSS animations for better user experience
            const addAnimationStyles = () => {
                const style = document.createElement('style');
                style.textContent = `
                    .animate-in {
                        animation: slideInUp 0.8s ease forwards;
                    }
                    
                    @keyframes slideInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .image-loaded {
                        animation: imageLoad 0.5s ease forwards;
                    }
                    
                    @keyframes imageLoad {
                        from {
                            filter: blur(5px);
                            opacity: 0.7;
                        }
                        to {
                            filter: blur(0);
                            opacity: 1;
                        }
                    }
                    
                    .reduce-motion * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                    
                    .theme-toggle-btn:hover {
                        transform: scale(1.1);
                        box-shadow: var(--vision-shadow-hover);
                    }
                    
                    @media (prefers-reduced-motion: reduce) {
                        * {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                        }
                    }
                `;
                document.head.appendChild(style);
            };
            
            addAnimationStyles();
        });
