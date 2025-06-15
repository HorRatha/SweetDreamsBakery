// Snowflake Cursor Effect
        class SnowflakeCursor {
            constructor(options = {}) {
                this.element = options.element || document.body;
                this.canvas = null;
                this.context = null;
                this.particles = [];
                this.canvImages = [];
                this.animationFrame = null;
                this.possibleEmoji = ['❄️'];
                this.prefersReducedMotion = null;
                
                this.init();
            }
            
            init() {
                // Check for reduced motion preference
                this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
                
                if (this.prefersReducedMotion.matches) {
                    return;
                }
                
                this.createCanvas();
                this.setCanvasSize();
                this.createEmojiImages();
                this.bindEvents();
                this.animationLoop();
                
                // Handle reduced motion changes
                this.prefersReducedMotion.onchange = () => {
                    if (this.prefersReducedMotion.matches) {
                        this.destroy();
                    } else {
                        this.init();
                    }
                };
            }
            
            createCanvas() {
                this.canvas = document.getElementById('snowflake-effect-canvas') || document.createElement('canvas');
                if (!this.canvas.id) {
                    this.canvas.id = 'snowflake-effect-canvas';
                    this.canvas.style.position = 'fixed';
                    this.canvas.style.top = '0';
                    this.canvas.style.left = '0';
                    this.canvas.style.pointerEvents = 'none';
                    this.canvas.style.zIndex = '9999';
                    document.body.appendChild(this.canvas);
                }
                
                this.context = this.canvas.getContext('2d');
                if (!this.context) {
                    console.error('Canvas context not supported');
                    return;
                }
            }
            
            setCanvasSize() {
                if (!this.canvas) return;
                
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }
            
            createEmojiImages() {
                if (!this.context) return;
                
                this.context.font = '12px serif';
                this.context.textBaseline = 'middle';
                this.context.textAlign = 'center';
                
                this.possibleEmoji.forEach(emoji => {
                    const measurements = this.context.measureText(emoji);
                    const bgCanvas = document.createElement('canvas');
                    const bgContext = bgCanvas.getContext('2d');
                    
                    if (!bgContext) return;
                    
                    bgCanvas.width = measurements.width;
                    bgCanvas.height = measurements.actualBoundingBoxAscent * 2;
                    
                    bgContext.textAlign = 'center';
                    bgContext.font = '12px serif';
                    bgContext.textBaseline = 'middle';
                    bgContext.fillText(
                        emoji,
                        bgCanvas.width / 2,
                        measurements.actualBoundingBoxAscent
                    );
                    
                    this.canvImages.push(bgCanvas);
                });
            }
            
            addParticle(x, y) {
                if (this.canvImages.length === 0) return;
                
                const randomImage = this.canvImages[
                    Math.floor(Math.random() * this.canvImages.length)
                ];
                this.particles.push(new Particle(x, y, randomImage));
            }
            
            onMouseMove(e) {
                const rect = this.element.getBoundingClientRect();
                const x = e.clientX - (this.element === document.body ? 0 : rect.left);
                const y = e.clientY - (this.element === document.body ? 0 : rect.top);
                this.addParticle(x, y);
            }
            
            updateParticles() {
                if (!this.context || !this.canvas) return;
                
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                for (let i = this.particles.length - 1; i >= 0; i--) {
                    const particle = this.particles[i];
                    particle.update(this.context);
                    
                    if (particle.lifeSpan < 0) {
                        this.particles.splice(i, 1);
                    }
                }
            }
            
            animationLoop() {
                this.updateParticles();
                this.animationFrame = requestAnimationFrame(() => this.animationLoop());
            }
            
            bindEvents() {
                this.boundMouseMove = (e) => this.onMouseMove(e);
                this.boundResize = () => this.setCanvasSize();
                
                this.element.addEventListener('mousemove', this.boundMouseMove);
                window.addEventListener('resize', this.boundResize);
            }
            
            destroy() {
                if (this.canvas && this.canvas.parentNode) {
                    this.canvas.parentNode.removeChild(this.canvas);
                }
                
                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                }
                
                if (this.boundMouseMove) {
                    this.element.removeEventListener('mousemove', this.boundMouseMove);
                }
                
                if (this.boundResize) {
                    window.removeEventListener('resize', this.boundResize);
                }
                
                this.particles = [];
                this.canvImages = [];
            }
        }
        
        class Particle {
            constructor(x, y, canvasItem) {
                this.position = { x, y };
                this.velocity = {
                    x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                    y: 1 + Math.random()
                };
                this.lifeSpan = Math.floor(Math.random() * 60 + 80);
                this.initialLifeSpan = this.lifeSpan;
                this.canv = canvasItem;
            }
            
            update(context) {
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                this.lifeSpan--;
                
                this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
                this.velocity.y -= Math.random() / 300;
                
                const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
                
                context.save();
                context.translate(this.position.x, this.position.y);
                context.scale(scale, scale);
                context.drawImage(this.canv, -this.canv.width / 2, -this.canv.height / 2);
                context.restore();
            }
        }
        
        // Initialize the snowflake cursor effect when the page loads
        document.addEventListener('DOMContentLoaded', function() {
            new SnowflakeCursor();
        });
        
        // Handle page visibility changes to pause/resume animation
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                // Page is hidden, you could pause animations here if needed
            } else {
                // Page is visible again
            }
        });
