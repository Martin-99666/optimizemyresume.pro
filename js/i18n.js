/**
 * OptimizeMyResume.pro - Internationalization (i18n) System
 * Multi-language support for 8 languages
 */

// Language configuration
const LANGUAGES = {
    en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
    de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    it: { name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
    fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    ja: { name: '日本語', flag: '🇯🇵', dir: 'ltr' },
    ko: { name: '한국어', flag: '🇰🇷', dir: 'ltr' },
    zh: { name: '中文', flag: '🇨🇳', dir: 'ltr' }
};

// Translation data structure
const TRANSLATIONS = {
    // Navigation & Header
    'nav.services': {
        en: 'Services',
        de: 'Dienstleistungen',
        it: 'Servizi',
        fr: 'Services',
        es: 'Servicios',
        ja: 'サービス',
        ko: '서비스',
        zh: '服务'
    },
    'nav.pricing': {
        en: 'Pricing',
        de: 'Preise',
        it: 'Prezzi',
        fr: 'Tarifs',
        es: 'Precios',
        ja: '料金',
        ko: '가격',
        zh: '价格'
    },
    'nav.samples': {
        en: 'Samples',
        de: 'Beispiele',
        it: 'Esempi',
        fr: 'Exemples',
        es: 'Ejemplos',
        ja: 'サンプル',
        ko: '샘플',
        zh: '样本'
    },
    'nav.contact': {
        en: 'Contact',
        de: 'Kontakt',
        it: 'Contatto',
        fr: 'Contact',
        es: 'Contacto',
        ja: 'お問い合わせ',
        ko: '연락처',
        zh: '联系'
    },
    'nav.get-started': {
        en: 'Get Started',
        de: 'Loslegen',
        it: 'Inizia',
        fr: 'Commencer',
        es: 'Empezar',
        ja: '始める',
        ko: '시작하기',
        zh: '开始'
    },

    // Hero Section
    'hero.title': {
        en: 'Professional Resume Optimization That Gets Results',
        de: 'Professionelle Lebenslauf-Optimierung, die Ergebnisse erzielt',
        it: 'Ottimizzazione Professionale del CV che Porta Risultati',
        fr: 'Optimisation Professionnelle de CV qui Obtient des Résultats',
        es: 'Optimización Profesional de CV que Obtiene Resultados',
        ja: '結果を出すプロフェッショナルな履歴書最適化',
        ko: '결과를 내는 전문 이력서 최적화',
        zh: '获得结果的专业简历优化'
    },
    'hero.subtitle': {
        en: 'ATS-friendly resumes written by certified experts. 60-day interview guarantee. Get more interviews, land better jobs.',
        de: 'ATS-freundliche Lebensläufe von zertifizierten Experten. 60 Tage Interview-Garantie. Mehr Vorstellungsgespräche, bessere Jobs.',
        it: 'CV compatibili ATS scritti da esperti certificati. Garanzia colloqui 60 giorni. Più colloqui, lavori migliori.',
        fr: 'CV compatibles ATS rédigés par des experts certifiés. Garantie entretien 60 jours. Plus d\'entretiens, meilleurs emplois.',
        es: 'CVs compatibles con ATS escritos por expertos certificados. Garantía de entrevista de 60 días. Más entrevistas, mejores empleos.',
        ja: '認定エキスパートによるATS対応履歴書。60日間面接保証。より多くの面接、より良い仕事。',
        ko: '인증 전문가가 작성한 ATS 친화적 이력서. 60일 면접 보장. 더 많은 면접, 더 나은 직업.',
        zh: '由认证专家撰写的ATS友好简历。60天面试保证。更多面试，更好工作。'
    },
    'hero.cta': {
        en: 'Get Your Optimized Resume',
        de: 'Holen Sie sich Ihren optimierten Lebenslauf',
        it: 'Ottieni il Tuo CV Ottimizzato',
        fr: 'Obtenez Votre CV Optimisé',
        es: 'Obtén Tu CV Optimizado',
        ja: '最適化された履歴書を取得',
        ko: '최적화된 이력서 받기',
        zh: '获取您的优化简历'
    },

    // Stats Section
    'stats.resumes': {
        en: 'Resumes Optimized',
        de: 'Lebensläufe Optimiert',
        it: 'CV Ottimizzati',
        fr: 'CV Optimisés',
        es: 'CVs Optimizados',
        ja: '最適化された履歴書',
        ko: '최적화된 이력서',
        zh: '优化的简历'
    },
    'stats.interviews': {
        en: 'Interview Rate',
        de: 'Interview-Rate',
        it: 'Tasso di Colloqui',
        fr: 'Taux d\'Entretien',
        es: 'Tasa de Entrevistas',
        ja: '面接率',
        ko: '면접률',
        zh: '面试率'
    },
    'stats.satisfaction': {
        en: 'Client Satisfaction',
        de: 'Kundenzufriedenheit',
        it: 'Soddisfazione Cliente',
        fr: 'Satisfaction Client',
        es: 'Satisfacción del Cliente',
        ja: '顧客満足度',
        ko: '고객 만족도',
        zh: '客户满意度'
    },
    'stats.guarantee': {
        en: 'Interview Guarantee',
        de: 'Interview-Garantie',
        it: 'Garanzia Colloquio',
        fr: 'Garantie Entretien',
        es: 'Garantía de Entrevista',
        ja: '面接保証',
        ko: '면접 보증',
        zh: '面试保证'
    },

    // Services Section
    'services.title': {
        en: 'Professional Resume Services',
        de: 'Professionelle Lebenslauf-Services',
        it: 'Servizi Professionali per CV',
        fr: 'Services Professionnels de CV',
        es: 'Servicios Profesionales de CV',
        ja: 'プロフェッショナル履歴書サービス',
        ko: '전문 이력서 서비스',
        zh: '专业简历服务'
    },
    'services.subtitle': {
        en: 'Comprehensive resume optimization designed to get you noticed by both ATS systems and human recruiters',
        de: 'Umfassende Lebenslauf-Optimierung, die darauf ausgelegt ist, sowohl von ATS-Systemen als auch von menschlichen Recruitern bemerkt zu werden',
        it: 'Ottimizzazione completa del CV progettata per farti notare sia dai sistemi ATS che dai recruiter umani',
        fr: 'Optimisation complète de CV conçue pour vous faire remarquer par les systèmes ATS et les recruteurs humains',
        es: 'Optimización integral de CV diseñada para que te noten tanto los sistemas ATS como los reclutadores humanos',
        ja: 'ATSシステムと人間の採用担当者の両方に注目されるように設計された包括的な履歴書最適化',
        ko: 'ATS 시스템과 인간 채용담당자 모두에게 주목받도록 설계된 포괄적인 이력서 최적화',
        zh: '全面的简历优化，旨在让ATS系统和人力招聘人员都注意到您'
    },

    // Pricing Section
    'pricing.title': {
        en: 'Choose Your Package',
        de: 'Wählen Sie Ihr Paket',
        it: 'Scegli il Tuo Pacchetto',
        fr: 'Choisissez Votre Forfait',
        es: 'Elige Tu Paquete',
        ja: 'パッケージを選択',
        ko: '패키지 선택',
        zh: '选择您的套餐'
    },
    'pricing.professional': {
        en: 'Professional',
        de: 'Professional',
        it: 'Professionale',
        fr: 'Professionnel',
        es: 'Profesional',
        ja: 'プロフェッショナル',
        ko: '프로페셔널',
        zh: '专业版'
    },
    'pricing.executive': {
        en: 'Executive',
        de: 'Executive',
        it: 'Esecutivo',
        fr: 'Exécutif',
        es: 'Ejecutivo',
        ja: 'エグゼクティブ',
        ko: '임원',
        zh: '高管版'
    },
    'pricing.premium': {
        en: 'Premium',
        de: 'Premium',
        it: 'Premium',
        fr: 'Premium',
        es: 'Premium',
        ja: 'プレミアム',
        ko: '프리미엄',
        zh: '高级版'
    },
    'pricing.most-popular': {
        en: 'Most Popular',
        de: 'Am beliebtesten',
        it: 'Più Popolare',
        fr: 'Le Plus Populaire',
        es: 'Más Popular',
        ja: '最も人気',
        ko: '가장 인기',
        zh: '最受欢迎'
    },
    'pricing.select-package': {
        en: 'Select This Package',
        de: 'Dieses Paket wählen',
        it: 'Seleziona Questo Pacchetto',
        fr: 'Sélectionner ce Forfait',
        es: 'Seleccionar Este Paquete',
        ja: 'このパッケージを選択',
        ko: '이 패키지 선택',
        zh: '选择此套餐'
    },

    // Contact Form
    'contact.title': {
        en: 'Get Your Optimized Resume Today',
        de: 'Holen Sie sich heute Ihren optimierten Lebenslauf',
        it: 'Ottieni Oggi il Tuo CV Ottimizzato',
        fr: 'Obtenez Votre CV Optimisé Aujourd\'hui',
        es: 'Obtén Tu CV Optimizado Hoy',
        ja: '今日最適化された履歴書を取得',
        ko: '오늘 최적화된 이력서 받기',
        zh: '今天获取您的优化简历'
    },
    'form.full-name': {
        en: 'Full Name',
        de: 'Vollständiger Name',
        it: 'Nome Completo',
        fr: 'Nom Complet',
        es: 'Nombre Completo',
        ja: 'フルネーム',
        ko: '성명',
        zh: '全名'
    },
    'form.email': {
        en: 'Email Address',
        de: 'E-Mail-Adresse',
        it: 'Indirizzo Email',
        fr: 'Adresse Email',
        es: 'Dirección de Email',
        ja: 'メールアドレス',
        ko: '이메일 주소',
        zh: '邮箱地址'
    },
    'form.phone': {
        en: 'Phone Number',
        de: 'Telefonnummer',
        it: 'Numero di Telefono',
        fr: 'Numéro de Téléphone',
        es: 'Número de Teléfono',
        ja: '電話番号',
        ko: '전화번호',
        zh: '电话号码'
    },
    'form.package': {
        en: 'Select Package',
        de: 'Paket auswählen',
        it: 'Seleziona Pacchetto',
        fr: 'Sélectionner le Forfait',
        es: 'Seleccionar Paquete',
        ja: 'パッケージを選択',
        ko: '패키지 선택',
        zh: '选择套餐'
    },
    'form.choose-package': {
        en: 'Choose a package',
        de: 'Wählen Sie ein Paket',
        it: 'Scegli un pacchetto',
        fr: 'Choisissez un forfait',
        es: 'Elige un paquete',
        ja: 'パッケージを選択してください',
        ko: '패키지를 선택하세요',
        zh: '选择一个套餐'
    },
    'form.target-industry': {
        en: 'Target Industry',
        de: 'Zielbranche',
        it: 'Settore Target',
        fr: 'Secteur Cible',
        es: 'Industria Objetivo',
        ja: 'ターゲット業界',
        ko: '목표 업계',
        zh: '目标行业'
    },
    'form.target-position': {
        en: 'Target Position',
        de: 'Zielposition',
        it: 'Posizione Target',
        fr: 'Poste Cible',
        es: 'Posición Objetivo',
        ja: 'ターゲットポジション',
        ko: '목표 직책',
        zh: '目标职位'
    },
    'form.upload-resume': {
        en: 'Upload Current Resume (PDF/DOC)',
        de: 'Aktuellen Lebenslauf hochladen (PDF/DOC)',
        it: 'Carica CV Attuale (PDF/DOC)',
        fr: 'Télécharger CV Actuel (PDF/DOC)',
        es: 'Subir CV Actual (PDF/DOC)',
        ja: '現在の履歴書をアップロード (PDF/DOC)',
        ko: '현재 이력서 업로드 (PDF/DOC)',
        zh: '上传当前简历 (PDF/DOC)'
    },
    'form.click-upload': {
        en: 'Click to upload your current resume',
        de: 'Klicken Sie, um Ihren aktuellen Lebenslauf hochzuladen',
        it: 'Clicca per caricare il tuo CV attuale',
        fr: 'Cliquez pour télécharger votre CV actuel',
        es: 'Haz clic para subir tu CV actual',
        ja: '現在の履歴書をアップロードするにはクリック',
        ko: '현재 이력서를 업로드하려면 클릭',
        zh: '点击上传您的当前简历'
    },
    'form.file-format': {
        en: 'PDF, DOC, or DOCX (Max 10MB)',
        de: 'PDF, DOC oder DOCX (Max 10MB)',
        it: 'PDF, DOC o DOCX (Max 10MB)',
        fr: 'PDF, DOC ou DOCX (Max 10MB)',
        es: 'PDF, DOC o DOCX (Max 10MB)',
        ja: 'PDF、DOC、またはDOCX（最大10MB）',
        ko: 'PDF, DOC 또는 DOCX (최대 10MB)',
        zh: 'PDF、DOC 或 DOCX（最大 10MB）'
    },
    'form.additional-info': {
        en: 'Additional Information',
        de: 'Zusätzliche Informationen',
        it: 'Informazioni Aggiuntive',
        fr: 'Informations Supplémentaires',
        es: 'Información Adicional',
        ja: '追加情報',
        ko: '추가 정보',
        zh: '附加信息'
    },
    'form.industry-placeholder': {
        en: 'e.g., Technology, Healthcare, Finance',
        de: 'z.B. Technologie, Gesundheitswesen, Finanzen',
        it: 'es. Tecnologia, Sanità, Finanza',
        fr: 'ex. Technologie, Santé, Finance',
        es: 'ej. Tecnología, Salud, Finanzas',
        ja: '例：テクノロジー、ヘルスケア、金融',
        ko: '예: 기술, 헬스케어, 금융',
        zh: '例如：科技、医疗、金融'
    },
    'form.position-placeholder': {
        en: 'e.g., Software Engineer, Marketing Manager',
        de: 'z.B. Software-Ingenieur, Marketing-Manager',
        it: 'es. Ingegnere Software, Manager Marketing',
        fr: 'ex. Ingénieur Logiciel, Responsable Marketing',
        es: 'ej. Ingeniero de Software, Gerente de Marketing',
        ja: '例：ソフトウェアエンジニア、マーケティングマネージャー',
        ko: '예: 소프트웨어 엔지니어, 마케팅 매니저',
        zh: '例如：软件工程师、市场经理'
    },
    'form.tell-us-more': {
        en: 'Tell us about your career goals, specific requirements, or any questions you have...',
        de: 'Erzählen Sie uns von Ihren Karrierezielen, spezifischen Anforderungen oder Fragen...',
        it: 'Raccontaci i tuoi obiettivi di carriera, requisiti specifici o domande...',
        fr: 'Parlez-nous de vos objectifs de carrière, exigences spécifiques ou questions...',
        es: 'Cuéntanos sobre tus objetivos profesionales, requisitos específicos o preguntas...',
        ja: 'キャリア目標、特定の要件、または質問について教えてください...',
        ko: '경력 목표, 특정 요구사항 또는 질문에 대해 알려주세요...',
        zh: '告诉我们您的职业目标、具体要求或任何问题...'
    },
    'form.submit': {
        en: 'Start My Resume Optimization',
        de: 'Meine Lebenslauf-Optimierung starten',
        it: 'Inizia la Mia Ottimizzazione CV',
        fr: 'Commencer Mon Optimisation CV',
        es: 'Comenzar Mi Optimización de CV',
        ja: '履歴書最適化を開始',
        ko: '이력서 최적화 시작',
        zh: '开始我的简历优化'
    },

    // Footer
    'footer.copyright': {
        en: '© 2025 OptimizeMyResume.pro. All rights reserved.',
        de: '© 2025 OptimizeMyResume.pro. Alle Rechte vorbehalten.',
        it: '© 2025 OptimizeMyResume.pro. Tutti i diritti riservati.',
        fr: '© 2025 OptimizeMyResume.pro. Tous droits réservés.',
        es: '© 2025 OptimizeMyResume.pro. Todos los derechos reservados.',
        ja: '© 2025 OptimizeMyResume.pro. 全著作権所有。',
        ko: '© 2025 OptimizeMyResume.pro. 모든 권리 보유.',
        zh: '© 2025 OptimizeMyResume.pro. 版权所有。'
    },
    'footer.tagline': {
        en: 'Professional resume optimization that gets results.',
        de: 'Professionelle Lebenslauf-Optimierung, die Ergebnisse erzielt.',
        it: 'Ottimizzazione professionale del CV che porta risultati.',
        fr: 'Optimisation professionnelle de CV qui obtient des résultats.',
        es: 'Optimización profesional de CV que obtiene resultados.',
        ja: '結果を出すプロフェッショナルな履歴書最適化。',
        ko: '결과를 내는 전문 이력서 최적화.',
        zh: '获得结果的专业简历优化。'
    }
};

// Internationalization class
class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || this.detectBrowserLanguage() || 'en';
        this.init();
    }

    init() {
        this.createLanguageSwitcher();
        this.updatePageLanguage();
        this.setupEventListeners();
    }

    getStoredLanguage() {
        return localStorage.getItem('preferredLanguage');
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        return LANGUAGES[langCode] ? langCode : 'en';
    }

    setLanguage(langCode) {
        if (!LANGUAGES[langCode]) return;
        
        this.currentLanguage = langCode;
        localStorage.setItem('preferredLanguage', langCode);
        this.updatePageLanguage();
        this.updateLanguageSwitcher();
    }

    translate(key) {
        const translation = TRANSLATIONS[key];
        if (!translation) return key;
        return translation[this.currentLanguage] || translation.en || key;
    }

    updatePageLanguage() {
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
        document.documentElement.dir = LANGUAGES[this.currentLanguage].dir;

        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update translatable attributes
        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const attrData = element.getAttribute('data-i18n-attr');
            const [attr, key] = attrData.split(':');
            const translation = this.translate(key);
            element.setAttribute(attr, translation);
        });

        // Trigger custom event for page-specific translations
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
    }

    createLanguageSwitcher() {
        const switcherHTML = `
            <div class="language-switcher">
                <button class="language-current" id="languageButton">
                    <span class="flag">${LANGUAGES[this.currentLanguage].flag}</span>
                    <span class="name">${LANGUAGES[this.currentLanguage].name}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="language-dropdown" id="languageDropdown">
                    ${Object.entries(LANGUAGES).map(([code, lang]) => `
                        <button class="language-option ${code === this.currentLanguage ? 'active' : ''}" 
                                data-lang="${code}">
                            <span class="flag">${lang.flag}</span>
                            <span class="name">${lang.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Add to navigation
        const nav = document.querySelector('nav');
        if (nav) {
            const switcherContainer = document.createElement('div');
            switcherContainer.innerHTML = switcherHTML;
            nav.appendChild(switcherContainer.firstElementChild);
        }
    }

    updateLanguageSwitcher() {
        const currentButton = document.getElementById('languageButton');
        const dropdown = document.getElementById('languageDropdown');
        
        if (currentButton) {
            currentButton.innerHTML = `
                <span class="flag">${LANGUAGES[this.currentLanguage].flag}</span>
                <span class="name">${LANGUAGES[this.currentLanguage].name}</span>
                <i class="fas fa-chevron-down"></i>
            `;
        }

        if (dropdown) {
            dropdown.querySelectorAll('.language-option').forEach(option => {
                const lang = option.getAttribute('data-lang');
                option.classList.toggle('active', lang === this.currentLanguage);
            });
        }
    }

    setupEventListeners() {
        // Language switcher click
        document.addEventListener('click', (e) => {
            const languageButton = document.getElementById('languageButton');
            const languageDropdown = document.getElementById('languageDropdown');

            if (e.target.closest('#languageButton')) {
                e.preventDefault();
                languageDropdown?.classList.toggle('show');
            } else if (e.target.closest('.language-option')) {
                e.preventDefault();
                const langCode = e.target.closest('.language-option').getAttribute('data-lang');
                this.setLanguage(langCode);
                languageDropdown?.classList.remove('show');
            } else {
                languageDropdown?.classList.remove('show');
            }
        });

        // Close dropdown on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.getElementById('languageDropdown')?.classList.remove('show');
            }
        });
    }
}

// Initialize when DOM is ready - but avoid double initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.i18n) {
            window.i18n = new I18n();
        }
    });
} else {
    // DOM already loaded
    if (!window.i18n) {
        window.i18n = new I18n();
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { I18n, LANGUAGES, TRANSLATIONS };
}