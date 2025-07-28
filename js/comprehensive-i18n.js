/**
 * 完整的多语言翻译数据库
 * 支持8种语言的全页面内容翻译
 */

// 语言配置
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

// 完整的翻译数据
const TRANSLATIONS = {
    // 网站标题和描述
    'site.title': {
        en: 'OptimizeMyResume.pro - Professional Resume Optimization Service | ATS-Friendly Resumes',
        de: 'OptimizeMyResume.pro - Professioneller Lebenslauf-Optimierungsservice | ATS-freundliche Lebensläufe',
        it: 'OptimizeMyResume.pro - Servizio Professionale di Ottimizzazione CV | CV compatibili ATS',
        fr: 'OptimizeMyResume.pro - Service Professionnel d\'Optimisation de CV | CV compatibles ATS',
        es: 'OptimizeMyResume.pro - Servicio Profesional de Optimización de CV | CVs compatibles con ATS',
        ja: 'OptimizeMyResume.pro - プロフェッショナル履歴書最適化サービス | ATS対応履歴書',
        ko: 'OptimizeMyResume.pro - 전문 이력서 최적화 서비스 | ATS 친화적 이력서',
        zh: 'OptimizeMyResume.pro - 专业简历优化服务 | ATS友好简历'
    },
    'site.description': {
        en: 'Professional resume optimization that gets results. ATS-friendly resumes written by certified experts. 60-day interview guarantee. Starting at $149.',
        de: 'Professionelle Lebenslauf-Optimierung, die Ergebnisse erzielt. ATS-freundliche Lebensläufe von zertifizierten Experten. 60 Tage Interview-Garantie. Ab $149.',
        it: 'Ottimizzazione professionale del CV che porta risultati. CV compatibili ATS scritti da esperti certificati. Garanzia colloqui 60 giorni. A partire da $149.',
        fr: 'Optimisation professionnelle de CV qui obtient des résultats. CV compatibles ATS rédigés par des experts certifiés. Garantie entretien 60 jours. À partir de $149.',
        es: 'Optimización profesional de CV que obtiene resultados. CVs compatibles con ATS escritos por expertos certificados. Garantía de entrevista de 60 días. Desde $149.',
        ja: '結果を出すプロフェッショナル履歴書最適化。認定エキスパートによるATS対応履歴書。60日間面接保証。$149から。',
        ko: '결과를 내는 전문 이력서 최적화. 인증 전문가가 작성한 ATS 친화적 이력서. 60일 면접 보장. $149부터.',
        zh: '获得结果的专业简历优化。由认证专家撰写的ATS友好简历。60天面试保证。149美元起。'
    },

    // 导航栏
    'nav.home': {
        en: 'Home', de: 'Startseite', it: 'Home', fr: 'Accueil',
        es: 'Inicio', ja: 'ホーム', ko: '홈', zh: '首页'
    },
    'nav.services': {
        en: 'Services', de: 'Dienstleistungen', it: 'Servizi', fr: 'Services',
        es: 'Servicios', ja: 'サービス', ko: '서비스', zh: '服务'
    },
    'nav.pricing': {
        en: 'Pricing', de: 'Preise', it: 'Prezzi', fr: 'Tarifs',
        es: 'Precios', ja: '料金', ko: '가격', zh: '价格'
    },
    'nav.samples': {
        en: 'Samples', de: 'Beispiele', it: 'Esempi', fr: 'Exemples',
        es: 'Ejemplos', ja: 'サンプル', ko: '샘플', zh: '样本'
    },
    'nav.testimonials': {
        en: 'Reviews', de: 'Bewertungen', it: 'Recensioni', fr: 'Avis',
        es: 'Reseñas', ja: 'レビュー', ko: '리뷰', zh: '评价'
    },
    'nav.faq': {
        en: 'FAQ', de: 'FAQ', it: 'FAQ', fr: 'FAQ',
        es: 'FAQ', ja: 'FAQ', ko: 'FAQ', zh: '常见问题'
    },
    'nav.contact': {
        en: 'Contact', de: 'Kontakt', it: 'Contatto', fr: 'Contact',
        es: 'Contacto', ja: 'お問い合わせ', ko: '연락처', zh: '联系'
    },
    'nav.get-started': {
        en: 'Get Started', de: 'Loslegen', it: 'Inizia', fr: 'Commencer',
        es: 'Empezar', ja: '始める', ko: '시작하기', zh: '开始'
    },

    // 首页主标题区域
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

    // 统计数据
    'stats.resumes.number': {
        en: '15,000+', de: '15.000+', it: '15.000+', fr: '15 000+',
        es: '15.000+', ja: '15,000+', ko: '15,000+', zh: '15,000+'
    },
    'stats.resumes.label': {
        en: 'Resumes Optimized', de: 'Lebensläufe Optimiert', it: 'CV Ottimizzati', fr: 'CV Optimisés',
        es: 'CVs Optimizados', ja: '最適化された履歴書', ko: '최적화된 이력서', zh: '优化的简历'
    },
    'stats.interview.number': {
        en: '94%', de: '94%', it: '94%', fr: '94%',
        es: '94%', ja: '94%', ko: '94%', zh: '94%'
    },
    'stats.interview.label': {
        en: 'Interview Rate', de: 'Interview-Rate', it: 'Tasso di Colloqui', fr: 'Taux d\'Entretien',
        es: 'Tasa de Entrevistas', ja: '面接率', ko: '면접률', zh: '面试率'
    },
    'stats.satisfaction.number': {
        en: '98%', de: '98%', it: '98%', fr: '98%',
        es: '98%', ja: '98%', ko: '98%', zh: '98%'
    },
    'stats.satisfaction.label': {
        en: 'Client Satisfaction', de: 'Kundenzufriedenheit', it: 'Soddisfazione Cliente', fr: 'Satisfaction Client',
        es: 'Satisfacción del Cliente', ja: '顧客満足度', ko: '고객 만족도', zh: '客户满意度'
    },
    'stats.guarantee.number': {
        en: '60', de: '60', it: '60', fr: '60',
        es: '60', ja: '60', ko: '60', zh: '60'
    },
    'stats.guarantee.label': {
        en: 'Days Guarantee', de: 'Tage Garantie', it: 'Giorni di Garanzia', fr: 'Jours de Garantie',
        es: 'Días de Garantía', ja: '日間保証', ko: '일 보증', zh: '天保证'
    },

    // 服务部分
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

    // 功能特点
    'feature.ats.title': {
        en: 'ATS-Optimized', de: 'ATS-Optimiert', it: 'Ottimizzato ATS', fr: 'Optimisé ATS',
        es: 'Optimizado para ATS', ja: 'ATS最適化', ko: 'ATS 최적화', zh: 'ATS优化'
    },
    'feature.ats.description': {
        en: 'Your resume will pass through Applicant Tracking Systems and reach human recruiters every time.',
        de: 'Ihr Lebenslauf wird jedes Mal durch Applicant Tracking Systems gelangen und menschliche Recruiter erreichen.',
        it: 'Il tuo CV passerà sempre attraverso i sistemi di tracciamento dei candidati e raggiungerà i recruiter umani.',
        fr: 'Votre CV passera toujours à travers les systèmes de suivi des candidats et atteindra les recruteurs humains.',
        es: 'Tu CV siempre pasará a través de los sistemas de seguimiento de candidatos y llegará a los reclutadores humanos.',
        ja: 'あなたの履歴書は常に応募者追跡システムを通過し、人間の採用担当者に届きます。',
        ko: '귀하의 이력서는 항상 지원자 추적 시스템을 통과하여 인간 채용담당자에게 도달합니다.',
        zh: '您的简历将始终通过申请人跟踪系统并到达人力招聘人员。'
    },

    'feature.experts.title': {
        en: 'Certified Experts', de: 'Zertifizierte Experten', it: 'Esperti Certificati', fr: 'Experts Certifiés',
        es: 'Expertos Certificados', ja: '認定エキスパート', ko: '인증 전문가', zh: '认证专家'
    },
    'feature.experts.description': {
        en: 'Written by certified professional resume writers with years of industry experience.',
        de: 'Geschrieben von zertifizierten professionellen Lebenslauf-Autoren mit jahrelanger Branchenerfahrung.',
        it: 'Scritto da scrittori professionali di CV certificati con anni di esperienza nel settore.',
        fr: 'Rédigé par des rédacteurs de CV professionnels certifiés avec des années d\'expérience dans l\'industrie.',
        es: 'Escrito por escritores profesionales de CV certificados con años de experiencia en la industria.',
        ja: '業界経験豊富な認定プロフェッショナル履歴書ライターによって作成されます。',
        ko: '수년간의 업계 경험을 가진 인증된 전문 이력서 작가들이 작성합니다.',
        zh: '由具有多年行业经验的认证专业简历撰写人员撰写。'
    },

    'feature.guarantee.title': {
        en: '60-Day Guarantee', de: '60 Tage Garantie', it: 'Garanzia 60 Giorni', fr: 'Garantie 60 Jours',
        es: 'Garantía de 60 Días', ja: '60日間保証', ko: '60일 보증', zh: '60天保证'
    },
    'feature.guarantee.description': {
        en: 'Get an interview within 60 days or receive a full refund. We stand behind our work.',
        de: 'Erhalten Sie innerhalb von 60 Tagen ein Vorstellungsgespräch oder bekommen Sie eine vollständige Rückerstattung. Wir stehen hinter unserer Arbeit.',
        it: 'Ottieni un colloquio entro 60 giorni o ricevi un rimborso completo. Garantiamo il nostro lavoro.',
        fr: 'Obtenez un entretien dans les 60 jours ou recevez un remboursement complet. Nous garantissons notre travail.',
        es: 'Consigue una entrevista en 60 días o recibe un reembolso completo. Respaldamos nuestro trabajo.',
        ja: '60日以内に面接を受けるか、全額返金を受け取ります。私たちは自分の仕事に責任を持ちます。',
        ko: '60일 이내에 면접을 받거나 전액 환불을 받으세요. 우리는 우리의 작업을 뒷받침합니다.',
        zh: '在60天内获得面试或获得全额退款。我们对我们的工作负责。'
    },

    // 定价部分
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
    'pricing.subtitle': {
        en: 'Professional resume optimization packages designed for every career level and budget',
        de: 'Professionelle Lebenslauf-Optimierungspakete für jedes Karrierelevel und Budget',
        it: 'Pacchetti di ottimizzazione CV professionale progettati per ogni livello di carriera e budget',
        fr: 'Forfaits d\'optimisation de CV professionnels conçus pour chaque niveau de carrière et budget',
        es: 'Paquetes de optimización de CV profesional diseñados para cada nivel de carrera y presupuesto',
        ja: 'あらゆるキャリアレベルと予算に対応したプロフェッショナル履歴書最適化パッケージ',
        ko: '모든 경력 수준과 예산을 위해 설계된 전문 이력서 최적화 패키지',
        zh: '为每个职业水平和预算设计的专业简历优化套餐'
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

    // 套餐特点
    'feature.ats-resume': {
        en: 'ATS-Optimized Resume',
        de: 'ATS-optimierter Lebenslauf',
        it: 'CV Ottimizzato ATS',
        fr: 'CV Optimisé ATS',
        es: 'CV Optimizado para ATS',
        ja: 'ATS最適化履歴書',
        ko: 'ATS 최적화 이력서',
        zh: 'ATS优化简历'
    },
    'feature.professional-formatting': {
        en: 'Professional Formatting',
        de: 'Professionelle Formatierung',
        it: 'Formattazione Professionale',
        fr: 'Formatage Professionnel',
        es: 'Formato Profesional',
        ja: 'プロフェッショナル書式',
        ko: '전문 서식',
        zh: '专业格式'
    },
    'feature.keyword-optimization': {
        en: 'Keyword Optimization',
        de: 'Keyword-Optimierung',
        it: 'Ottimizzazione Parole Chiave',
        fr: 'Optimisation des Mots-clés',
        es: 'Optimización de Palabras Clave',
        ja: 'キーワード最適化',
        ko: '키워드 최적화',
        zh: '关键词优化'
    },
    'feature.revisions': {
        en: '2 Rounds of Revisions',
        de: '2 Überarbeitungsrunden',
        it: '2 Giri di Revisioni',
        fr: '2 Tours de Révisions',
        es: '2 Rondas de Revisiones',
        ja: '2回の修正ラウンド',
        ko: '2회 수정',
        zh: '2轮修改'
    },
    'feature.delivery-48h': {
        en: '48-Hour Delivery',
        de: '48-Stunden-Lieferung',
        it: 'Consegna in 48 Ore',
        fr: 'Livraison en 48 Heures',
        es: 'Entrega en 48 Horas',
        ja: '48時間配送',
        ko: '48시간 배송',
        zh: '48小时交付'
    },
    'feature.interview-guarantee': {
        en: '60-Day Interview Guarantee',
        de: '60 Tage Interview-Garantie',
        it: 'Garanzia Colloquio 60 Giorni',
        fr: 'Garantie Entretien 60 Jours',
        es: 'Garantía de Entrevista 60 Días',
        ja: '60日間面接保証',
        ko: '60일 면접 보증',
        zh: '60天面试保证'
    },

    // 联系表单
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
    'contact.subtitle': {
        en: 'Fill out the form below and our expert writers will create a resume that gets you noticed',
        de: 'Füllen Sie das Formular unten aus und unsere Experten-Autoren werden einen Lebenslauf erstellen, der Sie bemerkt macht',
        it: 'Compila il modulo qui sotto e i nostri scrittori esperti creeranno un CV che ti farà notare',
        fr: 'Remplissez le formulaire ci-dessous et nos rédacteurs experts créeront un CV qui vous fera remarquer',
        es: 'Llena el formulario a continuación y nuestros escritores expertos crearán un CV que te haga notar',
        ja: '以下のフォームに記入すると、専門ライターがあなたを目立たせる履歴書を作成します',
        ko: '아래 양식을 작성하시면 전문 작가들이 당신을 주목받게 하는 이력서를 작성해드립니다',
        zh: '填写下面的表格，我们的专家撰写人员将创建一份让您脱颖而出的简历'
    },

    // 表单字段
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

    // 页脚
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

// 完整的国际化类
class ComprehensiveI18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || this.detectBrowserLanguage() || 'en';
        this.init();
    }

    getStoredLanguage() {
        return localStorage.getItem('preferredLanguage');
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        return LANGUAGES[langCode] ? langCode : 'en';
    }

    init() {
        this.updateDocumentLanguage();
        this.createLanguageSwitcher();
        this.updateAllContent();
        this.setupEventListeners();
    }

    updateDocumentLanguage() {
        document.documentElement.lang = this.currentLanguage;
        document.documentElement.dir = LANGUAGES[this.currentLanguage].dir;
        
        // 更新页面标题和描述
        const titleElement = document.querySelector('title');
        const descElement = document.querySelector('meta[name="description"]');
        
        if (titleElement && TRANSLATIONS['site.title']) {
            titleElement.textContent = this.translate('site.title');
        }
        if (descElement && TRANSLATIONS['site.description']) {
            descElement.content = this.translate('site.description');
        }
    }

    setLanguage(langCode) {
        if (!LANGUAGES[langCode]) return;
        
        this.currentLanguage = langCode;
        localStorage.setItem('preferredLanguage', langCode);
        this.updateDocumentLanguage();
        this.updateAllContent();
        this.updateLanguageSwitcher();
    }

    translate(key) {
        const translation = TRANSLATIONS[key];
        if (!translation) return key;
        return translation[this.currentLanguage] || translation.en || key;
    }

    updateAllContent() {
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                }
            } else {
                element.textContent = translation;
            }
        });

        // 更新带有 data-i18n-attr 的属性
        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const attrData = element.getAttribute('data-i18n-attr');
            const [attr, key] = attrData.split(':');
            const translation = this.translate(key);
            element.setAttribute(attr, translation);
        });

        // 更新带有 data-i18n-html 的HTML内容
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.translate(key);
            element.innerHTML = translation;
        });

        // 触发语言变更事件
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
    }

    createLanguageSwitcher() {
        const nav = document.querySelector('nav.container');
        if (!nav) return;

        // 移除现有的语言切换器
        const existingSwitcher = nav.querySelector('.language-switcher');
        if (existingSwitcher) {
            existingSwitcher.remove();
        }

        const switcherHTML = `
            <div class="language-switcher" style="position:relative;display:inline-block;margin-left:1rem;">
                <button class="language-current" id="languageButton" style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 1rem;background:#fff;border:2px solid #e5e7eb;border-radius:8px;cursor:pointer;font-size:0.9rem;font-weight:500;color:#374151;transition:all 0.3s ease;white-space:nowrap;min-width:120px;">
                    <span class="flag">${LANGUAGES[this.currentLanguage].flag}</span>
                    <span class="name">${LANGUAGES[this.currentLanguage].name}</span>
                    <span style="font-size:0.75rem;color:#9ca3af;">▼</span>
                </button>
                <div class="language-dropdown" id="languageDropdown" style="position:absolute;top:calc(100% + 8px);left:0;right:0;background:#fff;border:2px solid #e5e7eb;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);display:none;z-index:1000;overflow:hidden;">
                    ${Object.entries(LANGUAGES).map(([code, lang]) => `
                        <button class="language-option" data-lang="${code}" style="display:flex;align-items:center;gap:0.75rem;width:100%;padding:0.75rem 1rem;background:none;border:none;color:#374151;font-size:0.9rem;font-weight:500;cursor:pointer;transition:all 0.2s ease;text-align:left;${code === this.currentLanguage ? 'background:#eff6ff;color:#3b82f6;' : ''}">
                            <span class="flag">${lang.flag}</span>
                            <span class="name">${lang.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        nav.insertAdjacentHTML('beforeend', switcherHTML);
    }

    updateLanguageSwitcher() {
        const currentButton = document.getElementById('languageButton');
        const dropdown = document.getElementById('languageDropdown');
        
        if (currentButton) {
            currentButton.innerHTML = `
                <span class="flag">${LANGUAGES[this.currentLanguage].flag}</span>
                <span class="name">${LANGUAGES[this.currentLanguage].name}</span>
                <span style="font-size:0.75rem;color:#9ca3af;">▼</span>
            `;
        }

        if (dropdown) {
            dropdown.querySelectorAll('.language-option').forEach(option => {
                const lang = option.getAttribute('data-lang');
                if (lang === this.currentLanguage) {
                    option.style.cssText += 'background:#eff6ff;color:#3b82f6;font-weight:600;';
                } else {
                    option.style.cssText = option.style.cssText.replace(/background:#eff6ff;color:#3b82f6;font-weight:600;/g, '');
                }
            });
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const languageButton = document.getElementById('languageButton');
            const languageDropdown = document.getElementById('languageDropdown');

            if (e.target.closest('#languageButton')) {
                e.preventDefault();
                if (languageDropdown) {
                    languageDropdown.style.display = languageDropdown.style.display === 'none' ? 'block' : 'none';
                }
            } else if (e.target.closest('.language-option')) {
                e.preventDefault();
                const langCode = e.target.closest('.language-option').getAttribute('data-lang');
                this.setLanguage(langCode);
                if (languageDropdown) {
                    languageDropdown.style.display = 'none';
                }
            } else {
                if (languageDropdown) {
                    languageDropdown.style.display = 'none';
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const languageDropdown = document.getElementById('languageDropdown');
                if (languageDropdown) {
                    languageDropdown.style.display = 'none';
                }
            }
        });
    }
}

// 自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.i18n = new ComprehensiveI18n();
    });
} else {
    window.i18n = new ComprehensiveI18n();
}

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ComprehensiveI18n, LANGUAGES, TRANSLATIONS };
}