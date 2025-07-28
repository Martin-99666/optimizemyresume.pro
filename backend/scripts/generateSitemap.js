const fs = require('fs');
const path = require('path');

class SitemapGenerator {
    constructor(baseUrl = 'https://optimizemyresume.pro') {
        this.baseUrl = baseUrl;
        this.urls = [];
        this.lastmod = new Date().toISOString().split('T')[0];
    }

    addUrl(url, priority = 0.5, changefreq = 'monthly', lastmod = null) {
        this.urls.push({
            url: url.startsWith('http') ? url : `${this.baseUrl}${url}`,
            priority,
            changefreq,
            lastmod: lastmod || this.lastmod
        });
    }

    generateXML() {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

        this.urls.forEach(urlData => {
            xml += `    <url>
        <loc>${urlData.url}</loc>
        <lastmod>${urlData.lastmod}</lastmod>
        <changefreq>${urlData.changefreq}</changefreq>
        <priority>${urlData.priority}</priority>
    </url>

`;
        });

        xml += '</urlset>';
        return xml;
    }

    generateHTML() {
        const sections = {
            'Main Services': [
                { url: '/', title: 'Homepage', description: 'Professional resume optimization service with ATS-friendly resumes and interview guarantee.' },
                { url: '/#services', title: 'Our Services', description: 'Complete overview of our resume optimization, writing, and career services.' },
                { url: '/#pricing', title: 'Pricing Plans', description: 'Professional, Executive, and Premium packages starting at $149.' },
                { url: '/#contact', title: 'Contact & Order', description: 'Start your resume optimization project and get in touch with our team.' }
            ],
            'Professional Services': [
                { url: '/professional-resume-optimization', title: 'Professional Resume Optimization', description: 'Comprehensive resume optimization with ATS formatting and keyword optimization.' },
                { url: '/ats-resume-writing', title: 'ATS Resume Writing', description: 'Specialized resume writing designed to pass Applicant Tracking Systems.' },
                { url: '/executive-resume-services', title: 'Executive Resume Services', description: 'Premium resume services for C-level executives and senior management.' },
                { url: '/linkedin-optimization', title: 'LinkedIn Optimization', description: 'Professional LinkedIn profile optimization to attract recruiters and opportunities.' },
                { url: '/cover-letter-writing', title: 'Cover Letter Writing', description: 'Compelling cover letters tailored to your target position and industry.' }
            ],
            'Industry Specializations': [
                { url: '/tech-resume-optimization', title: 'Technology Resume Optimization', description: 'Specialized resume services for software engineers, developers, and IT professionals.' },
                { url: '/healthcare-resume-services', title: 'Healthcare Resume Services', description: 'Professional resume writing for doctors, nurses, and healthcare professionals.' },
                { url: '/finance-resume-writing', title: 'Finance Resume Writing', description: 'Expert resume services for banking, investment, and financial services professionals.' },
                { url: '/marketing-resume-optimization', title: 'Marketing Resume Optimization', description: 'Creative and strategic resume services for marketing and advertising professionals.' }
            ],
            'Resources & Information': [
                { url: '/resume-samples', title: 'Resume Samples', description: 'Professional resume examples and templates across various industries.' },
                { url: '/testimonials', title: 'Client Testimonials', description: 'Success stories and reviews from satisfied customers.' },
                { url: '/faq', title: 'Frequently Asked Questions', description: 'Common questions about our services, process, and guarantees.' },
                { url: '/about', title: 'About Us', description: 'Learn about our team of certified resume writers and career experts.' }
            ],
            'Career Resources': [
                { url: '/blog', title: 'Career Blog', description: 'Latest articles on resume writing, job search strategies, and career advice.' },
                { url: '/resume-tips', title: 'Resume Writing Tips', description: 'Expert tips and best practices for creating effective resumes.' },
                { url: '/ats-guide', title: 'ATS Optimization Guide', description: 'Complete guide to optimizing your resume for Applicant Tracking Systems.' },
                { url: '/interview-preparation', title: 'Interview Preparation', description: 'Tips and strategies to ace your job interviews and land your dream job.' }
            ],
            'Legal & Support': [
                { url: '/privacy-policy', title: 'Privacy Policy', description: 'How we collect, use, and protect your personal information.' },
                { url: '/terms-of-service', title: 'Terms of Service', description: 'Terms and conditions for using our services and website.' },
                { url: '/refund-policy', title: 'Refund Policy', description: 'Our 60-day interview guarantee and refund process.' },
                { url: '/api', title: 'API Documentation', description: 'Technical documentation for developers integrating with our services.' }
            ]
        };

        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitemap - OptimizeMyResume.pro</title>
    <meta name="description" content="Complete sitemap of OptimizeMyResume.pro - Professional resume optimization services, pricing, samples, and resources.">
</head>
<body>
    <h1>Site Map</h1>
    <p>Complete overview of all pages and services on OptimizeMyResume.pro</p>
`;

        Object.entries(sections).forEach(([sectionTitle, links]) => {
            html += `
    <h2>${sectionTitle}</h2>
    <ul>`;
            links.forEach(link => {
                html += `
        <li>
            <a href="${link.url}">${link.title}</a>
            <p>${link.description}</p>
        </li>`;
            });
            html += `
    </ul>`;
        });

        html += `
</body>
</html>`;
        
        return html;
    }

    build() {
        // Add main pages
        this.addUrl('/', 1.0, 'weekly');
        this.addUrl('/#services', 0.9, 'monthly');
        this.addUrl('/#pricing', 0.9, 'monthly');
        this.addUrl('/#contact', 0.8, 'monthly');

        // Add service pages
        const servicePages = [
            '/professional-resume-optimization',
            '/ats-resume-writing',
            '/executive-resume-services',
            '/linkedin-optimization',
            '/cover-letter-writing'
        ];
        
        servicePages.forEach(page => {
            this.addUrl(page, 0.8, 'monthly');
        });

        // Add industry pages
        const industryPages = [
            '/tech-resume-optimization',
            '/healthcare-resume-services',
            '/finance-resume-writing',
            '/marketing-resume-optimization'
        ];
        
        industryPages.forEach(page => {
            this.addUrl(page, 0.7, 'monthly');
        });

        // Add resource pages
        const resourcePages = [
            { url: '/resume-samples', priority: 0.7, changefreq: 'weekly' },
            { url: '/testimonials', priority: 0.6, changefreq: 'weekly' },
            { url: '/faq', priority: 0.6, changefreq: 'monthly' },
            { url: '/about', priority: 0.6, changefreq: 'monthly' },
            { url: '/blog', priority: 0.6, changefreq: 'weekly' },
            { url: '/resume-tips', priority: 0.7, changefreq: 'weekly' },
            { url: '/ats-guide', priority: 0.8, changefreq: 'monthly' },
            { url: '/interview-preparation', priority: 0.6, changefreq: 'monthly' }
        ];
        
        resourcePages.forEach(page => {
            this.addUrl(page.url, page.priority, page.changefreq);
        });

        // Add legal pages
        const legalPages = [
            { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
            { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
            { url: '/refund-policy', priority: 0.4, changefreq: 'yearly' }
        ];
        
        legalPages.forEach(page => {
            this.addUrl(page.url, page.priority, page.changefreq);
        });

        // Add other pages
        this.addUrl('/api', 0.4, 'monthly');
        this.addUrl('/sitemap.html', 0.5, 'monthly');
    }

    save(outputDir = '.') {
        this.build();
        
        // Save XML sitemap
        const xmlContent = this.generateXML();
        fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), xmlContent);
        
        // Save HTML sitemap
        const htmlContent = this.generateHTML();
        fs.writeFileSync(path.join(outputDir, 'sitemap.html'), htmlContent);
        
        console.log('✅ Sitemap files generated successfully!');
        console.log(`📁 XML Sitemap: ${path.join(outputDir, 'sitemap.xml')}`);
        console.log(`📁 HTML Sitemap: ${path.join(outputDir, 'sitemap.html')}`);
        console.log(`📊 Total URLs: ${this.urls.length}`);
    }
}

// Generate sitemaps if run directly
if (require.main === module) {
    const generator = new SitemapGenerator();
    const outputDir = process.argv[2] || '.';
    generator.save(outputDir);
}

module.exports = SitemapGenerator;