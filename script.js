// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Search Functionality
const searchableContent = [
    // Portfolio items
    { type: 'portfolio', title: 'Brand Identity', description: 'Complete branding package including logo and guidelines', keywords: ['brand', 'identity', 'logo', 'branding', 'package'] },
    { type: 'portfolio', title: 'Social Media Campaign', description: 'Engaging graphics for multi-platform social media', keywords: ['social', 'media', 'graphics', 'campaign'] },
    { type: 'portfolio', title: 'Video Production', description: 'Professional promotional video editing and production', keywords: ['video', 'editing', 'production', 'promotional'] },
    { type: 'portfolio', title: 'Poster Design', description: 'Eye-catching posters for events and promotions', keywords: ['poster', 'design', 'events', 'promotions'] },
    { type: 'portfolio', title: 'Logo Concepts', description: 'Creative logo designs tailored to brand vision', keywords: ['logo', 'design', 'concepts', 'creative'] },
    { type: 'portfolio', title: 'UI/UX Design', description: 'User-centered design for digital products', keywords: ['ui', 'ux', 'design', 'digital', 'user-centered'] },
    
    // Services
    { type: 'service', title: 'Logo & Brand Design', description: 'Create memorable logos and complete brand identities that represent your vision', keywords: ['logo', 'brand', 'design', 'branding', 'identity'] },
    { type: 'service', title: 'Video Editing', description: 'Professional video editing and production for promotional content', keywords: ['video', 'editing', 'production', 'professional'] },
    { type: 'service', title: 'Graphic Design', description: 'Custom graphics for social media, flyers, posters, and more', keywords: ['graphic', 'design', 'social', 'media', 'flyers', 'posters'] },
    { type: 'service', title: 'Brand Identity', description: 'Comprehensive branding packages including guidelines and assets', keywords: ['brand', 'identity', 'branding', 'guidelines', 'assets'] },
    
    // Pages
    { type: 'page', title: 'Home', description: 'Welcome to MTGODSON portfolio', keywords: ['home', 'welcome', 'mtgodson'] },
    { type: 'page', title: 'About', description: 'Learn about MTGODSON creative designer', keywords: ['about', 'designer', 'creator', 'graphic'] },
    { type: 'page', title: 'Contact', description: 'Get in touch with MTGODSON', keywords: ['contact', 'email', 'phone', 'message'] },
    { type: 'page', title: 'Admin Panel', description: 'Manage portfolio and services', keywords: ['admin', 'manage', 'control', 'panel'] }
];

// Search input handler
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length > 0) {
            performSearch(query);
        } else {
            document.getElementById('searchResults').innerHTML = '';
        }
    });
    
    // Clear search on Escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            document.getElementById('searchResults').innerHTML = '';
        }
    });
}

function performSearch(query = null) {
    const searchQuery = query || document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    
    if (!searchQuery) {
        resultsContainer.innerHTML = '';
        return;
    }
    
    const results = searchableContent.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(searchQuery);
        const descriptionMatch = item.description.toLowerCase().includes(searchQuery);
        const keywordMatch = item.keywords.some(keyword => keyword.includes(searchQuery));
        return titleMatch || descriptionMatch || keywordMatch;
    });
    
    if (results.length > 0) {
        resultsContainer.innerHTML = results.map((result, index) => `
            <div class="search-result-item" onclick="handleSearchClick('${result.type}', '${result.title}')">
                <i class="fas fa-${getIcon(result.type)}"></i>
                <div class="result-content">
                    <h4>${result.title}</h4>
                    <p>${result.description}</p>
                    <span class="result-type">${result.type}</span>
                </div>
            </div>
        `).join('');
    } else {
        resultsContainer.innerHTML = '<div class="search-no-results"><p>No results found for "' + searchQuery + '"</p></div>';
    }
}

function getIcon(type) {
    switch(type) {
        case 'portfolio': return 'image';
        case 'service': return 'briefcase';
        case 'page': return 'file';
        default: return 'search';
    }
}

function handleSearchClick(type, title) {
    const sectionMap = {
        'portfolio': '#portfolio',
        'service': '#services',
        'page': '#' + title.toLowerCase()
    };
    
    const target = document.querySelector(sectionMap[type]);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('searchResults').innerHTML = '';
        document.getElementById('searchInput').value = '';
    }
}

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
        document.getElementById('searchResults').innerHTML = '';
    }
});

// Form submission with EmailJS integration
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const subject = this.querySelector('input[name="subject"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        // For now, show success message
        alert(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`);
        
        // Reset form
        this.reset();
    });
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close menu when link is clicked
if (navMenu) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio items and service cards
document.querySelectorAll('.portfolio-item, .service-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Admin Functions

// Portfolio Management
function openAddPortfolioModal() {
    document.getElementById('portfolioModal').style.display = 'block';
    document.getElementById('portfolioForm').reset();
}

function closePortfolioModal() {
    document.getElementById('portfolioModal').style.display = 'none';
}

function editPortfolio(index) {
    alert('Edit functionality for portfolio item ' + (index + 1) + ' - Coming soon!');
}

function deletePortfolio(index) {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
        alert('Portfolio item deleted! (In a real app, this would update the database)');
    }
}

document.getElementById('portfolioForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('portfolioTitle').value;
    const description = document.getElementById('portfolioDescription').value;
    alert('Portfolio item added: ' + title);
    closePortfolioModal();
});

// Service Management
function openAddServiceModal() {
    document.getElementById('serviceModal').style.display = 'block';
    document.getElementById('serviceForm').reset();
}

function closeServiceModal() {
    document.getElementById('serviceModal').style.display = 'none';
}

function editService(index) {
    alert('Edit functionality for service ' + (index + 1) + ' - Coming soon!');
}

function deleteService(index) {
    if (confirm('Are you sure you want to delete this service?')) {
        alert('Service deleted! (In a real app, this would update the database)');
    }
}

document.getElementById('serviceForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('serviceTitle').value;
    alert('Service added: ' + title);
    closeServiceModal();
});

// Export data as JSON
function exportData() {
    const data = {
        portfolio: [
            { title: 'Brand Identity', description: 'Complete branding package...' },
            { title: 'Social Media Campaign', description: 'Engaging graphics...' }
        ],
        services: [
            { title: 'Logo & Brand Design', description: 'Create memorable logos...' },
            { title: 'Video Editing', description: 'Professional video editing...' }
        ],
        contact: {
            email: 'goodluckp290@gmail.com',
            phone: '+255765481200'
        }
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mtgodson-portfolio-data.json';
    link.click();
    alert('Data exported successfully!');
}

// Reset all data
function resetAllData() {
    if (confirm('Are you sure? This will reset all portfolio and service data to defaults.')) {
        alert('Data reset to defaults! (In a real app, this would reset the database)');
        location.reload();
    }
}

// Sitemap toggle
function toggleSitemap() {
    const sitemapData = `
    MTGODSON Portfolio Sitemap:
    
    Pages:
    - Home: #home
    - About: #about
    - Portfolio: #portfolio
    - Services: #services
    - Contact: #contact
    - Admin: #admin
    
    Portfolio Items:
    - Brand Identity
    - Social Media Campaign
    - Video Production
    - Poster Design
    - Logo Concepts
    - UI/UX Design
    
    Services:
    - Logo & Brand Design
    - Video Editing
    - Graphic Design
    - Brand Identity
    
    Full sitemap available at: sitemap.xml
    `;
    alert(sitemapData);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const portfolioModal = document.getElementById('portfolioModal');
    const serviceModal = document.getElementById('serviceModal');
    
    if (event.target == portfolioModal) {
        portfolioModal.style.display = 'none';
    }
    if (event.target == serviceModal) {
        serviceModal.style.display = 'none';
    }
}

// Print website statistics for SEO
console.log('%c MTGODSON Portfolio Website', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('Portfolio Items: 6');
console.log('Services: 4');
console.log('SEO Optimized: Yes');
console.log('Mobile Friendly: Yes');
console.log('Search Enabled: Yes');
console.log('Admin Panel: Enabled');
console.log('Contact: goodluckp290@gmail.com');
console.log('Website: https://Goodlucj.github.io/MTGODSON-');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('MTGODSON Portfolio loaded successfully!');
});