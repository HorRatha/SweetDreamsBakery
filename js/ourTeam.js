
        // Sample team data
        const sampleTeam = [
            {
                name: "Mr. Ratha",
                role: "CEO & Founder",
                image: "./image/01.png",
                bio: "Visionary leader with 15+ years of experience in tech innovation. Passionate about building products that change lives.",
                email: "horratha4t5@gmail.com",
                linkedin: "https://linkedin.com/in/sarah-johnson",
                twitter: "https://twitter.com/sarahj",
                github: "https://github.com/michaelchen"
            },
            {
                name: "Michael Chen",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
                bio: "Full-stack developer and tech architect. Loves solving complex problems with elegant solutions.",
                email: "michael@company.com",
                linkedin: "https://linkedin.com/in/michael-chen",
                twitter: "https://twitter.com/sarahj",
                github: "https://github.com/michaelchen"
            },
            {
                name: "Emily Rodriguez",
                role: "Head of Design",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
                bio: "Creative designer with a passion for user experience. Believes great design should be invisible.",
                email: "emily@company.com",
                linkedin: "https://linkedin.com/in/emily-rodriguez",
                twitter: "https://twitter.com/emilydesign",
                github: "https://github.com/michaelchen"
            }
        ];

        // Store all team members
        let teamMembers = [...sampleTeam];

        // Create team member card HTML
        function createTeamCardHTML(member, index) {
            const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=d2691e&color=fff`;
            
            return `
                <div class="col-lg-4 col-md-6 col-12 fade-in">
                    <div class="team-card">
                        <img src="${member.image || defaultImage}" class="team-image" alt="${member.name}">
                        <div class="team-content">
                            <h3>${member.name}</h3>
                            <div class="team-role">${member.role}</div>
                            <p>${member.bio}</p>
                            <div class="team-social">
                                ${member.email ? `<a href="mailto:${member.email}" class="social-icon"><i class="bi bi-envelope"></i></a>` : ''}
                                ${member.linkedin ? `<a href="${member.linkedin}" target="_blank" class="social-icon"><i class="bi bi-linkedin"></i></a>` : ''}
                                ${member.twitter ? `<a href="${member.twitter}" target="_blank" class="social-icon"><i class="bi bi-twitter"></i></a>` : ''}
                                ${member.github ? `<a href="${member.github}" target="_blank" class="social-icon"><i class="bi bi-github"></i></a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Render all team members
        function renderTeam() {
            const container = document.getElementById('teamContainer');
            container.innerHTML = teamMembers.map((member, index) => createTeamCardHTML(member, index)).join('');
            
            // Re-apply fade-in animation
            setTimeout(() => {
                document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
                    el.classList.add('visible');
                });
            }, 100);
        }

        // Add new team member by editing the sampleTeam array above
        function addTeamMember() {
            // This function is now disabled - edit the sampleTeam array directly
            showToast('To add team members, edit the sampleTeam array in the JavaScript code', 'info');
        }

        // Show toast notification
        function showToast(message, type = 'success') {
            const toastColor = type === 'success' ? 'var(--strawberry)' : type === 'warning' ? 'var(--caramel)' : 'var(--chocolate-medium)';
            const icon = type === 'success' ? 'check-circle-fill' : type === 'warning' ? 'exclamation-triangle-fill' : 'info-circle-fill';
            
            const toast = document.createElement('div');
            toast.className = 'position-fixed top-0 end-0 p-3';
            toast.style.zIndex = '9999';
            toast.innerHTML = `
                <div class="toast show" role="alert" style="background: ${toastColor}; color: white; border: none;">
                    <div class="toast-header" style="background: ${toastColor}; color: white; border: none;">
                        <i class="bi bi-${icon} me-2"></i>
                        <strong class="me-auto">${type === 'success' ? 'Success' : type === 'warning' ? 'Warning' : 'Info'}</strong>
                        <button type="button" class="btn-close btn-close-white" onclick="this.closest('.position-fixed').remove()"></button>
                    </div>
                    <div class="toast-body">
                        ${message}
                    </div>
                </div>
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 4000);
        }

        // Scroll animation
        function handleScrollAnimation() {
            const elements = document.querySelectorAll('.fade-in:not(.visible)');
            elements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    el.classList.add('visible');
                }
            });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            renderTeam();
            handleScrollAnimation();
            
            // Listen for scroll events
            window.addEventListener('scroll', handleScrollAnimation);
        });

        // Dark mode support
        function checkTheme() {
            const theme = document.documentElement.getAttribute('data-theme') || 
                         document.body.getAttribute('data-theme') ||
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            
            document.documentElement.setAttribute('data-theme', theme);
        }

        checkTheme();
        
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
