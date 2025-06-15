
        // Cake images for the trail effect
        const sweetCreationsCakeImages = [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop'
        ];

        class SweetCreationsMouseImageTrail {
            constructor() {
                this.images = sweetCreationsCakeImages;
                this.renderImageBuffer = 80;
                this.rotationRange = 25;
                this.lastRenderPosition = { x: 0, y: 0 };
                this.imageRenderCount = 0;
                this.heroSection = document.getElementById('sweetCreationsHeroSection');
                this.customCursor = document.querySelector('.sweet-creations-section .sweet-creations-custom-cursor');
                this.isInHeroSection = false;
                this.sectionElement = document.querySelector('.sweet-creations-section');
                
                if (this.heroSection && this.customCursor) {
                    this.init();
                }
            }

            init() {
                this.createImageElements();
                this.bindEvents();
            }

            createImageElements() {
                this.images.forEach((src, index) => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = `Sweet Creations Cake ${index + 1}`;
                    img.className = 'sweet-creations-mouse-trail-image';
                    img.setAttribute('data-sc-mouse-move-index', index);
                    // Append to the Sweet Creations section instead of body
                    this.sectionElement.appendChild(img);
                });
            }

            bindEvents() {
                document.addEventListener('mousemove', (e) => {
                    this.updateCustomCursor(e);
                    if (this.isInHeroSection) {
                        this.handleMouseMove(e);
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
                });

                // Only hide cursor when leaving the entire section
                this.sectionElement.addEventListener('mouseleave', () => {
                    this.customCursor.style.opacity = '0';
                    this.isInHeroSection = false;
                    this.heroSection.classList.remove('sc-show-custom-cursor');
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
                this.customCursor.style.left = e.clientX + 'px';
                this.customCursor.style.top = e.clientY + 'px';
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

                const rotation = Math.random() * this.rotationRange;
                const rotationDirection = imageIndex % 2 ? rotation : -rotation;

                img.style.left = `${this.lastRenderPosition.x}px`;
                img.style.top = `${this.lastRenderPosition.y}px`;
                img.style.zIndex = (1000 + this.imageRenderCount).toString();

                img.style.opacity = '0';
                img.style.transform = `translate(-50%, -50%) scale(0.3) rotate(${rotationDirection}deg)`;

                setTimeout(() => {
                    img.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    img.style.opacity = '1';
                    img.style.transform = `translate(-50%, -50%) scale(1) rotate(${-rotationDirection}deg)`;
                }, 10);

                setTimeout(() => {
                    img.style.transition = 'opacity 0.8s ease-out';
                    img.style.opacity = '0';
                }, 4000);

                setTimeout(() => {
                    img.style.transition = '';
                    img.style.transform = `translate(-50%, -50%) scale(0.3) rotate(0deg)`;
                }, 5000);

                this.imageRenderCount++;
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            new SweetCreationsMouseImageTrail();
        });

        // CTA button click handler - scoped to Sweet Creations section only
        const sweetCreationsCTAButton = document.querySelector('.sweet-creations-section .sweet-creations-cta-button');
        if (sweetCreationsCTAButton) {
            sweetCreationsCTAButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigate to Sweet Creations shop page');
            });
        }

        // Floating elements interaction - scoped to Sweet Creations section only
        const scFloatingElements = document.querySelectorAll('.sweet-creations-section .sweet-creations-floating-element');
        scFloatingElements.forEach((element) => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.5) rotate(360deg)';
                element.style.opacity = '0.3';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1) rotate(0deg)';
                element.style.opacity = '0.1';
            });
        });
