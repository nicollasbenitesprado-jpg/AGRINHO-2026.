/**
 * PROJETO AGRINHO 2026
 * Arquivo: script.js
 * Descrição: Lógica de interatividade, animações e comportamento dinâmico.
 * 
 * IMPORTANTE: Este arquivo centraliza todo o JavaScript do projeto.
 * Não utilize scripts inline no HTML ou CSS.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- CONFIGURAÇÕES E SELETORES ---
    const header = document.querySelector('.main-header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    const revealElements = document.querySelectorAll('.reveal');
    const statNumbers = document.querySelectorAll('.stat-number');

    // --- 1. NAVEGAÇÃO E HEADER ---
    
    // Efeito de Scroll no Header
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    };

    // Menu Mobile Toggle
    const toggleMobileMenu = () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    // Smooth Scroll para links internos
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Fecha menu mobile se estiver aberto
                    if (navLinks.classList.contains('active')) {
                        toggleMobileMenu();
                    }

                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // --- 2. ANIMAÇÕES DE REVELAÇÃO (SCROLL) ---
    
    const revealOnScroll = () => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    };

    // --- 3. CONTADORES ANIMADOS ---
    
    const animateCounters = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-count'));
                    let currentCount = 0;
                    const duration = 2000; // 2 segundos
                    const increment = countTo / (duration / 16); // 60fps

                    const updateCount = () => {
                        currentCount += increment;
                        if (currentCount < countTo) {
                            target.innerText = Math.floor(currentCount);
                            requestAnimationFrame(updateCount);
                        } else {
                            target.innerText = countTo;
                        }
                    };

                    updateCount();
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => observer.observe(num));
    };

    // --- 4. VALIDAÇÃO DE FORMULÁRIO ---
    
    const setupFormValidation = () => {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const formData = new FormData(contactForm);
            const feedbackMsg = document.getElementById('form-feedback');

            // Validação simples
            for (let [key, value] of formData.entries()) {
                const input = contactForm.querySelector(`[name="${key}"]`);
                if (!value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            }

            if (isValid) {
                // Simulação de envio
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                
                submitBtn.disabled = true;
                submitBtn.innerText = 'Enviando...';

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    
                    if (feedbackMsg) {
                        feedbackMsg.innerText = 'Mensagem enviada com sucesso! Agrinho 2026 agradece.';
                        feedbackMsg.className = 'feedback-success';
                    }
                    alert('Obrigado pelo seu contato! Em breve retornaremos.');
                }, 1500);
            }
        });
    };

    // --- INICIALIZAÇÃO ---
    
    const init = () => {
        window.addEventListener('scroll', handleHeaderScroll);
        if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        setupSmoothScroll();
        revealOnScroll();
        animateCounters();
        setupFormValidation();
        
        console.log('Agrinho 2026: JavaScript carregado com sucesso.');
    };

    init();
});

