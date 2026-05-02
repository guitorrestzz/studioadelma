// Variáveis globais
let currentTestimonialIndex = 0;
const testimonialItems = [];
let isMenuOpen = false;

// Função para inicializar a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar elementos
    initThemeToggle();
    initMobileMenu();
    initTestimonialSlider();
    initWhatsAppIntegration();
    initMapIntegration();
    initContactForm();
    
    // Adicionar evento de scroll para animar elementos quando visíveis
    window.addEventListener('scroll', animateOnScroll);
    
    // Inicializar animações iniciais
    animateOnScroll();
});

// Função para alternar entre modo claro e escuro
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Verificar se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }
    
    // Adicionar evento de clique ao botão de alternar tema
    themeToggleBtn.addEventListener('click', function() {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Função para inicializar o menu mobile
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    // Adicionar evento de clique ao botão do menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navList.classList.add('active');
            mobileMenuBtn.classList.add('active');
            
            // Animar spans do botão para formar um X
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            navList.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            
            // Restaurar spans do botão
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                isMenuOpen = false;
                navList.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                // Restaurar spans do botão
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

// Função para inicializar o slider de depoimentos
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    testimonialItems.push(...document.querySelectorAll('.testimonial-item'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    // Configurar estado inicial
    updateTestimonialSlider();
    
    // Adicionar eventos aos botões de navegação
    prevBtn.addEventListener('click', function() {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
        updateTestimonialSlider();
    });
    
    nextBtn.addEventListener('click', function() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        updateTestimonialSlider();
    });
    
    // Adicionar eventos aos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentTestimonialIndex = index;
            updateTestimonialSlider();
        });
    });
    
    // Configurar autoplay
    setInterval(function() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        updateTestimonialSlider();
    }, 5000);
}

// Função para atualizar o slider de depoimentos
function updateTestimonialSlider() {
    // Atualizar classes dos itens
    testimonialItems.forEach((item, index) => {
        if (index === currentTestimonialIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Atualizar dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentTestimonialIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Função para inicializar a integração com WhatsApp
function initWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    const whatsappDirect = document.getElementById('whatsapp-direct');
    
    // Número de WhatsApp (substitua pelo número real)
    const whatsappNumber = '5511971044653';
    
    // Adicionar evento aos botões de serviço
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const service = this.getAttribute('data-service');
            const message = `Olá! Gostaria de agendar horário para ${service}. Poderia me informar sobre disponibilidade e valores?`;
            
            // Criar URL do WhatsApp com mensagem pré-definida
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            // Abrir WhatsApp em nova aba
            window.open(whatsappUrl, '_blank');
        });
    });
    
    // Adicionar evento ao botão direto de WhatsApp
    if (whatsappDirect) {
        whatsappDirect.addEventListener('click', function(e) {
            e.preventDefault();
            
            const message = 'Olá! Gostaria de mais informações sobre os serviços do Studio Adelma Silva.';
            
            // Criar URL do WhatsApp com mensagem pré-definida
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            // Abrir WhatsApp em nova aba
            window.open(whatsappUrl, '_blank');
        });
    }
}

// Função para inicializar a integração com mapa
 function initMapIntegration() {
            const mapPlaceholder = document.querySelector('.map-placeholder');
            
            if (mapPlaceholder) {
                // Usando o link do maps fornecido
                mapPlaceholder.innerHTML = `
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d544.5378639065067!2d-46.82848329252754!3d-23.344785708928985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf1f00723c637d%3A0xddef2f8c30524757!2sADELMA%20SILVA%20MICRO!5e0!3m2!1spt-BR!2sbr!4v1756772392079!5m2!1spt-BR!2sbr"
                        width="100%" 
                        height="100%" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                `;
            }
        }
        
        // Inicializar o mapa quando a página carregar
        document.addEventListener('DOMContentLoaded', initMapIntegration);
// Função para inicializar o formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Aqui você pode adicionar a lógica para enviar o formulário
            // Por enquanto, vamos apenas mostrar uma mensagem de sucesso
            alert(`Obrigado ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
            
            // Limpar formulário
            contactForm.reset();
        });
    }
}

// Função para animar elementos quando visíveis durante o scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .certificado-card, .timeline-item, .section-header');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.8) {
            element.classList.add('animate');
            
            // Adicionar classe de animação específica com base no tipo de elemento
            if (element.classList.contains('service-card')) {
                element.style.animation = 'fadeInUp 0.8s ease forwards';
                element.style.opacity = '1';
            } else if (element.classList.contains('certificado-card')) {
                element.style.animation = 'fadeInUp 0.8s ease forwards';
                element.style.opacity = '1';
            } else if (element.classList.contains('timeline-item')) {
                element.style.animation = 'fadeIn 1s ease forwards';
                element.style.opacity = '1';
            } else if (element.classList.contains('section-header')) {
                element.style.animation = 'fadeIn 1s ease forwards';
                element.style.opacity = '1';
            }
        }
    });
}

// Adicionar estilos de animação ao documento
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.service-card, .certificado-card, .timeline-item, .section-header {
    opacity: 0;
}

.animate {
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
}
</style>
`);
