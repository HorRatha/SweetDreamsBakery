
        // Optimized Performance JavaScript
        const sweetCreationsCakeImages = [
            './image/c1.jpg',
            './image/c2.jpg',
            './image/c3.jpg',
            './image/c4.jpg',
            './image/c5.jpg',
            './image/c6.jpg',
            './image/c7.jpg',
            './image/c8.jpg',
            './image/c9.jpg',
            './image/c10.jpg',
            './image/c11.jpg',
            './image/c12.jpg'
        ];

        class OptimizedMouseImageTrail {
            constructor() {
                this.images = sweetCreationsCakeImages;
                this.renderImageBuffer = 60;
                this.rotationRange = 25;
                this.lastRenderPosition = { x: 0, y: 0 };
                this.imageRenderCount = 0;
                this.heroSection = document.getElementById('sweetCreationsHeroSection');
                this.customCursor = document.querySelector('.sweet-creations-custom-cursor');
                this.isInHeroSection = false;
                this.sectionElement = document.querySelector('.sweet-creations-section');
                
                // Performance optimization: Throttle mouse events
                this.isThrottled = false;
                this.throttleDelay = 16;
                
                // Track active animations to prevent conflicts
                this.activeAnimations = new Map();
                
                if (this.heroSection && this.customCursor) {
                    this.init();
                }
            }

            init() {
                this.preloadImages();
                this.createImageElements();
                this.bindEvents();
            }

            preloadImages() {
                this.images.forEach(src => {
                    const img = new Image();
                    img.src = src;
                });
            }

            createImageElements() {
                this.images.forEach((src, index) => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = `Sweet Creations Cake ${index + 1}`;
                    img.className = 'sweet-creations-mouse-trail-image';
                    img.setAttribute('data-sc-mouse-move-index', index);
                    this.resetImagePosition(img);
                    this.sectionElement.appendChild(img);
                });
            }

            resetImagePosition(img) {
                // Clear any existing timeouts
                const index = img.getAttribute('data-sc-mouse-move-index');
                if (this.activeAnimations.has(index)) {
                    clearTimeout(this.activeAnimations.get(index).fadeTimeout);
                    clearTimeout(this.activeAnimations.get(index).resetTimeout);
                    this.activeAnimations.delete(index);
                }
                
                // Reset to initial state
                img.style.transition = '';
                img.style.transform = 'translate(-50%, -50%) scale(0.3) rotate(0deg) translateZ(0)';
                img.style.opacity = '0';
                img.style.left = '-500px';
                img.style.top = '-500px';
                img.style.zIndex = '1000';
            }

            bindEvents() {
                document.addEventListener('mousemove', (e) => {
                    if (!this.isThrottled) {
                        this.isThrottled = true;
                        requestAnimationFrame(() => {
                            this.updateCustomCursor(e);
                            if (this.isInHeroSection) {
                                this.handleMouseMove(e);
                            }
                            this.isThrottled = false;
                        });
                    }
                });

                this.heroSection.addEventListener('mouseenter', () => {
                    this.isInHeroSection = true;
                    this.customCursor.style.opacity = '1';
                    this.heroSection.classList.add('sc-show-custom-cursor');
                });

                this.heroSection.addEventListener('mouseleave', () => {
                    this.isInHeroSection = false;
                    this.customCursor.style.opacity = '0';
                    this.heroSection.classList.remove('sc-show-custom-cursor');
                    this.cleanupAllImages();
                });

                this.sectionElement.addEventListener('mouseleave', () => {
                    this.customCursor.style.opacity = '0';
                    this.isInHeroSection = false;
                    this.heroSection.classList.remove('sc-show-custom-cursor');
                    this.cleanupAllImages();
                });
            }

            cleanupAllImages() {
                // Clean up all images when leaving the section
                this.images.forEach((_, index) => {
                    const img = this.sectionElement.querySelector(`[data-sc-mouse-move-index="${index}"]`);
                    if (img) {
                        this.resetImagePosition(img);
                    }
                });
            }

            handleMouseMove(e) {
                const { clientX, clientY } = e;
                const distance = this.calculateDistance(
                    clientX,
                    clientY,
                    this.lastRenderPosition.x,
                    this.lastRenderPosition.y
                );

                if (distance >= this.renderImageBuffer) {
                    this.lastRenderPosition.x = clientX;
                    this.lastRenderPosition.y = clientY;
                    this.renderNextImage();
                }
            }

            updateCustomCursor(e) {
                this.customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translateZ(0)`;
            }

            calculateDistance(x1, y1, x2, y2) {
                const deltaX = x2 - x1;
                const deltaY = y2 - y1;
                return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            }

            renderNextImage() {
                const imageIndex = this.imageRenderCount % this.images.length;
                const img = this.sectionElement.querySelector(`[data-sc-mouse-move-index="${imageIndex}"]`);
                
                if (!img) return;

                // Reset image first to ensure clean state
                this.resetImagePosition(img);

                const rotation = Math.random() * this.rotationRange;
                const rotationDirection = imageIndex % 2 ? rotation : -rotation;

                // Set initial position immediately
                img.style.left = this.lastRenderPosition.x + 'px';
                img.style.top = this.lastRenderPosition.y + 'px';
                img.style.zIndex = (1000 + this.imageRenderCount).toString();

                // Use requestAnimationFrame for smooth animations
                requestAnimationFrame(() => {
                    img.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    img.style.opacity = '1';
                    img.style.transform = `translate(-50%, -50%) scale(1) rotate(${-rotationDirection}deg) translateZ(0)`;
                });

                // Set up cleanup timeouts
                const fadeTimeout = setTimeout(() => {
                    img.style.transition = 'opacity 0.8s ease-out';
                    img.style.opacity = '0';
                }, 3000);

                const resetTimeout = setTimeout(() => {
                    this.resetImagePosition(img);
                    this.activeAnimations.delete(imageIndex.toString());
                }, 4000);

                // Track active animations
                this.activeAnimations.set(imageIndex.toString(), {
                    fadeTimeout,
                    resetTimeout
                });

                this.imageRenderCount++;
            }
        }

        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            new OptimizedMouseImageTrail();
        });

        // Optimized CTA button handler
        const sweetCreationsCTAButton = document.querySelector('.sweet-creations-cta-button');
        if (sweetCreationsCTAButton) {
            sweetCreationsCTAButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigate to Sweet Creations shop page');
            });
        }

        // Optimized floating elements interaction
        const scFloatingElements = document.querySelectorAll('.sweet-creations-floating-element');
        scFloatingElements.forEach((element) => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.5) rotate(360deg) translateZ(0)';
                element.style.opacity = '0.3';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1) rotate(0deg) translateZ(0)';
                element.style.opacity = '0.1';
            });
        });
 