
        // Testimonial data
        const testimonials = [
            {
                name: "Hor Ratha",
                title: "Founder of BAC",
                description: "Amazing service and incredible attention to detail. The team exceeded all our expectations and delivered outstanding results.",
                image: "./image/01.png"
            },
            {
                name: "G-Devith",
                title: "Marketing Director",
                description: "Professional, reliable, and innovative. They transformed our vision into reality with exceptional quality and creativity.",
                image: "https://i.pinimg.com/736x/74/2b/be/742bbe98268e497ebc0d4f64aa20a228.jpg"
            },
            {
                name: "Mann VanDa",
                title: "Tech Lead",
                description: "Outstanding work ethic and remarkable results. Their dedication to excellence is evident in every project they undertake.",
                image: "https://i.pinimg.com/736x/64/e5/17/64e51736047d6acd05c5ebcdc79d284a.jpg"
            },
            {
                name: "Selena Gomez",
                title: "Product Manager",
                description: "Incredible team with amazing skills. They brought fresh ideas and delivered beyond our wildest expectations.",
                image: "https://i.pinimg.com/736x/25/7e/e4/257ee4f12372bafd61c69a61f92144f1.jpg"
            },
            {
                name: "Justin Bieber",
                title: "CEO",
                description: "Exceptional quality and timely delivery. Their commitment to customer satisfaction is truly remarkable and inspiring.",
                image: "https://i.pinimg.com/736x/49/92/09/4992097bcf4ce629b34f3496267ec089.jpg"
            },
            {
                name: "Cristiano Ronaldo",
                title: "Design Director",
                description: "Creative solutions and expert execution. They understand client needs and deliver solutions that perfectly match our requirements.",
                image: "https://i.pinimg.com/736x/2f/4f/e6/2f4fe642fd209bdd0177a948535e9bec.jpg"
            },
            {
                name: "Leo Messi",
                title: "CTO",
                description: "Top-notch service with incredible attention to detail. Their professionalism and expertise made the entire process smooth.",
                image: "https://i.pinimg.com/736x/e9/f1/ac/e9f1ac1be3e35d62c72f2118af3da92d.jpg"
            },
            {
                name: "Antony",
                title: "Operations Manager",
                description: "Innovative approach and excellent results. They brought creativity and technical expertise that exceeded our expectations.",
                image: "https://i.pinimg.com/736x/05/8c/48/058c484f65f43e8a2ba13b7ce0d2a9ee.jpg"
            },
            {
                name: "Mr. Beast",
                title: "Strategy Director",
                description: "Exceptional collaboration and brilliant execution. Their strategic thinking and attention to detail made all the difference.",
                image: "https://i.pinimg.com/736x/3b/82/df/3b82df2f5d2d5142a22e8703bb7ee864.jpg"
            },
            {
                name: "P Diddy",
                title: "Creative Director",
                description: "Outstanding creativity and flawless delivery. They understand the vision and execute with precision and passion.",
                image: "https://i.pinimg.com/736x/fd/8e/ce/fd8ece8388da49831581d3f86e610ec5.jpg"
            }
        ];

        // Create testimonial card HTML
        function createTestimonialCard(testimonial) {
            return `
                <div class="testimonial-card">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">
                    <div class="testimonial-content">
                        <div class="testimonial-name">${testimonial.name}</div>
                        <div class="testimonial-title">${testimonial.title}</div>
                        <div class="testimonial-description">${testimonial.description}</div>
                    </div>
                </div>
            `;
        }

        // Carousel class for smooth infinite scrolling
        class TestimonialCarousel {
            constructor(trackElement, direction = 'left', speed = 30) {
                this.track = trackElement;
                this.direction = direction;
                this.speed = speed;
                this.isPaused = false;
                this.currentOffset = 0;
                this.cardWidth = 24 * 16 + 24; // 24rem + 1.5rem gap in pixels
                this.init();
            }

            init() {
                // Create enough cards to fill screen + buffer
                const cardsNeeded = Math.ceil(window.innerWidth / this.cardWidth) + 4;
                const cardsToCreate = Math.max(cardsNeeded, testimonials.length * 2);
                
                // Fill track with testimonial cards
                for (let i = 0; i < cardsToCreate; i++) {
                    const testimonial = testimonials[i % testimonials.length];
                    this.track.innerHTML += createTestimonialCard(testimonial);
                }

                // Set initial position for right-to-left
                if (this.direction === 'right') {
                    this.currentOffset = -this.cardWidth * (cardsToCreate / 2);
                    this.track.style.transform = `translateX(${this.currentOffset}px)`;
                }

                this.startAnimation();
                this.addEventListeners();
            }

            startAnimation() {
                const animate = () => {
                    if (!this.isPaused) {
                        const moveDistance = this.direction === 'left' ? -1 : 1;
                        this.currentOffset += moveDistance * (this.speed / 60);

                        // Reset position when needed
                        const trackWidth = this.track.scrollWidth / 2;
                        if (this.direction === 'left' && this.currentOffset <= -trackWidth) {
                            this.currentOffset = 0;
                        } else if (this.direction === 'right' && this.currentOffset >= 0) {
                            this.currentOffset = -trackWidth;
                        }

                        this.track.style.transform = `translateX(${this.currentOffset}px)`;
                    }
                    requestAnimationFrame(animate);
                };
                animate();
            }

            addEventListeners() {
                this.track.addEventListener('mouseenter', () => {
                    this.isPaused = true;
                });

                this.track.addEventListener('mouseleave', () => {
                    this.isPaused = false;
                });

                // Handle window resize
                window.addEventListener('resize', () => {
                    this.handleResize();
                });
            }

            handleResize() {
                // Recalculate card width on resize
                this.cardWidth = window.innerWidth <= 768 ? 20 * 16 + 24 : 24 * 16 + 24;
            }
        }

        // Theme toggle functionality
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }

        // Initialize theme from localStorage
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initTheme();
            
            // Create carousel instances
            const track1 = document.getElementById('track1');
            const track2 = document.getElementById('track2');
            
            new TestimonialCarousel(track1, 'left', 30);
            new TestimonialCarousel(track2, 'right', 25);
        });

        // Add click functionality to testimonial cards
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.testimonial-card');
            if (card) {
                const name = card.querySelector('.testimonial-name').textContent;
                console.log(`Clicked on ${name}'s testimonial`);
                // Add your click handler logic here
            }
        });
