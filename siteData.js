/**
 * EPM Wealth — Site Content Configuration
 * ─────────────────────────────────────────
 * USAGE: Import individual data objects into the component that needs them.
 *   import { siteMetaData, navData, heroData } from './config/siteData.js';
 *
 * Replace any hardcoded copy, links, or assets here — no need to touch component files.
 */

/* ── Brand / Meta ── */
export const siteMetaData = {
  name:      'EPM Wealth',
  tagline:   'Bridging the gap between your reality & your Purpose',
  subline:   'Insight with integrity',
  logoSrc:   'logo-emp.png',
  logoAlt:   'EPM Wealth',
  founded:   2011,
  copyright: '© 2026 EPM Wealth. All Rights Reserved. AMFI Reg. 100255 | BSE Reg. 1197501',
  registrations: {
    amfi: 'AMFI 100255',
    bse:  'BSE 1197501',
    sebi: 'SEBI Reg.',
  },
};

/* ── Navigation ── */
export const navData = {
  links: [
    { label: 'About',             href: '#about'   },
    { label: 'Wealth Management', href: '#wealth'  },
    { label: 'Asset Management',  href: '#assets'  },
    { label: 'Vault',             href: '#vault'   },
  ],
  badge:   { text: 'New', label: 'UHNW Event Calendar 2026', href: '#vault' },
  contact: { label: 'Contact', href: '#contact' },
  mobileLinks: [
    { label: 'About',             href: '#about'   },
    { label: 'Wealth Management', href: '#wealth'  },
    { label: 'Asset Management',  href: '#assets'  },
    { label: 'Vault',             href: '#vault'   },
    { label: 'Careers',           href: '#careers' },
    { label: 'Contact',           href: '#contact', highlight: true },
  ],
};

/* ── Hero ── */
export const heroData = {
  eyebrow:    'Bridging the gap between your reality & your Purpose',
  videoSrc:   'EPM header theme.mp4',
  videoPoster: 'brige.jpg',
  infoLeft: {
    tag:     'Our Purpose',
    heading: 'Helping you create<br/>an enduring legacy',
    body:    "Wealth Advisory is beyond just building a portfolio. By serving some of India's most prominent business families since 2011, we have learnt the importance of taking a holistic, global yet personalised approach to meeting our clients' wealth management needs.",
    cta:     { label: 'Explore Wealth Services', href: '#about' },
  },
  infoRight: {
    tag:     'Our Reach',
    heading: '₹100 Cr+<br/>Assets Under Management',
    body:    'Trusted by over 1,000 clients across 25+ cities, our disciplined investment philosophy and personalised advisory have consistently delivered superior risk-adjusted returns across market cycles since 2011.',
    cta:     { label: 'Explore Asset Management', href: '#assets' },
  },
  stats: [
    { number: '15+',    label: 'Years of Excellence' },
    { number: '1,000+', label: 'Unique Clients'      },
    { number: '25+',    label: 'Cities Across India' },
    { number: '₹100 Cr', label: 'AUM'               },
  ],
};

/* ── Intro / About ── */
export const introData = {
  label:    'Solutions',
  heading:  'Helping you create an enduring legacy',
  cta:      { label: 'Start the conversation', href: '#contact' },
  paragraphs: [
    "Wealth Advisory is beyond just building a portfolio. By serving some of India's most prominent business families since 2011, we have learnt the importance of taking a holistic, global yet personalised approach to meeting our clients' wealth management needs.",
    "Combining our in-depth knowledge and innovative technology, we create a plan tailored to your complex needs. Your financial consultant — backed by an experienced team — can help you navigate every important decision.",
  ],
};

/* ── Wealth Management Cards ── */
export const wealthCards = [
  {
    title:    'Family\nBusinesses',
    desc:     'Investment advisory, succession, family governance solutions, and philanthropic advisory for family patriarchs and the next generation.',
    minLabel: 'Investable Asset',
    minAmt:   'Greater than INR 100 Crores',
    imgSrc:   'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=85&auto=format&fit=crop',
    imgAlt:   'Family Businesses',
    ctaLabel: 'Explore Service',
  },
  {
    title:    'Professionals\nand CXOs',
    desc:     'Holistic offerings for senior corporate leaders & professionals such as doctors, lawyers, designers, and more.',
    minLabel: 'Investable Asset',
    minAmt:   'Greater than INR 10 Crores',
    imgSrc:   'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Professionals and CXOs',
    ctaLabel: 'Explore Service',
  },
  {
    title:    'Founders &\nEntrepreneurs',
    desc:     "Comprehensive personal wealth planning for India's notable startup founders, from pre-liquidity to post-exit stage.",
    minLabel: 'Investable Asset',
    minAmt:   'Greater than INR 5 Crores',
    imgSrc:   'https://images.unsplash.com/photo-1553484771-371a605b060b?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Founders and Entrepreneurs',
    ctaLabel: 'Explore Service',
  },
  {
    title:    'Women\nClients',
    desc:     'Investment advisory, financial literacy, and community building for women leaders through our HERitage programme.',
    minLabel: 'Investable Asset',
    minAmt:   'Greater than INR 5 Crores',
    imgSrc:   'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop',
    imgAlt:   'Women Clients',
    ctaLabel: 'Explore Service',
  },
];

/* ── Asset Management Cards ── */
export const assetCards = [
  {
    title:    'Discretionary PMS',
    minAmt:   'INR 1 Crore',
    desc:     "Outsource your investment portfolio decision-making to EPM's expert advisors for superior risk-adjusted returns.",
    imgSrc:   'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=85&auto=format&fit=crop',
    imgAlt:   'Discretionary PMS',
    ctaLabel: 'Explore',
  },
  {
    title:    'EPM Fund of Funds',
    minAmt:   'INR 1 Crore',
    desc:     'Access top quartile private market fund managers via our Fund of Funds platform for enhanced diversification.',
    imgSrc:   'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=85&auto=format&fit=crop',
    imgAlt:   'EPM Fund of Funds',
    ctaLabel: 'Explore',
  },
  {
    title:    'Smart Beta',
    minAmt:   'INR 1 Crore',
    desc:     'Create consistent alpha at low cost with a unique 3rd strategy beyond active & passive investing approaches.',
    imgSrc:   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop',
    imgAlt:   'Smart Beta',
    ctaLabel: 'Explore',
  },
  {
    title:    'Global Investments',
    minAmt:   'INR 1 Crore',
    desc:     'Build a globally diversified portfolio with advice from a global investment manager for superior risk-adjusted returns.',
    imgSrc:   'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=900&q=85&auto=format&fit=crop',
    imgAlt:   'Global Investments',
    ctaLabel: 'Explore',
  },
];

/* ── Vault (Insights) ── */
export const vaultData = {
  label:    'Vault',
  heading:  'Your access to<br>rich insights',
  body:     "From experienced partners at the forefront of today's financial trends and beyond. Trusted by the top 0.01% of the country.",
  cta:      { label: 'Explore Vault', href: '#contact' },
  subscribe: {
    heading: 'Sign up for priority access',
    body:    'Get our insights delivered straight to your inbox.',
    placeholder: 'Email Address',
    btnLabel: 'Subscribe →',
  },
  featured: {
    imgSrc:   'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=900&q=80&auto=format&fit=crop',
    category: 'Article · CIO\'s Desk · 03 March 2026',
    title:    'Understanding the Iran–Israel–U.S. Conflict',
    excerpt:  'The unfolding geopolitical tensions and their impact on markets.',
  },
  articles: [
    {
      imgSrc:   'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=75&auto=format&fit=crop',
      category: 'Article',
      title:    'Union Budget 2026–27 Decoded',
      date:     '03 February 2026',
    },
    {
      imgSrc:   'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&q=75&auto=format&fit=crop',
      category: "Article · CIO's Desk",
      title:    'Where does gold go from here?',
      date:     '20 January 2026',
    },
    {
      imgSrc:   'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=75&auto=format&fit=crop',
      category: "Article · CIO's Desk",
      title:    'The GIFT City Advantage',
      date:     '20 January 2026',
    },
    {
      imgSrc:   'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=75&auto=format&fit=crop',
      category: "Article · CIO's Desk",
      title:    'Silver: Protecting Gains, Avoiding FOMO',
      date:     '20 January 2026',
    },
  ],
};

/* ── UHNW Banner ── */
export const uhnwData = {
  year:    '2026',
  label:   '2026',
  heading: 'UHNW Event Calendar',
  body:    'Stay ahead of top-drawer global events and experiences.',
  cta:     { label: 'Learn More', href: '#contact' },
  imgLeft: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=520&q=80&auto=format&fit=crop',
  imgRight:'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&q=80&auto=format&fit=crop',
};

/* ── Founder Quote ── */
export const founderData = {
  quote:      'The hallmark of our offering is professional and personalised wealth advisory services. Our clients rely on us to work with them on important and deeply personal issues around their financial well-being',
  name:       'Tanish Gupta',
  title:      'Additional & Director',
  imgSrc:     'mr-tanish-gupta.jpeg',
  imgAlt:     'Founder EPM Wealth',
};

/* ── Recognition / Awards ── */
export const recognitionData = {
  label:       'Awards',
  heading:     'Recognition driven by',
  highlight:   'Results',
  body:        "Our awards are a matter of great pride for us. Recognition is natural when our services and processes have added significant value to our clients' lives and businesses.",
  stats: [
    { number: '100+', label: 'Cr Total AUM'    },
    { number: '1000+', label: 'Unique Clients' },
    { number: '25+',  label: 'Cities Served'   },
  ],
  awards: [
    { year: '2026', name: 'Tanish Gupta — Forbes 50 over 50', source: 'Forbes Global',          icon: '🏆', active: true  },
    { year: '2025', name: 'ET Best Wealth Management Firms',  source: 'Economic Times',          icon: '🌟' },
    { year: '2024', name: 'CNBCTV18 Wealth Excellence Award', source: 'CNBC TV18',               icon: '🎖️' },
    { year: '2023', name: "Business Standard Elite Partner",  source: 'Business Standard',       icon: '💎' },
    { year: '2022', name: 'Mint Best Wealth Advisory Firm',   source: 'Mint',                    icon: '🥇' },
    { year: '2021', name: 'Forbes Best Financial Advisors',   source: 'Forbes India',            icon: '🏅' },
    { year: '2020', name: 'Outlook Money Best Wealth Manager',source: 'Outlook Money',           icon: '⭐' },
    { year: '2019', name: 'ET Wealth Investment Excellence',  source: 'ET Wealth',               icon: '🎗️' },
  ],
};

/* ── Press ── */
export const pressData = {
  label:   'Pressclub',
  heading: "What the press<br>has been saying",
  articles: [
    {
      source: 'Business Standard',
      title:  'Equity SIP inflows see rare dip as volatility tests investor patience',
      date:   '26 February 2026',
      imgSrc: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80&auto=format&fit=crop',
    },
    {
      source: 'The Economic Times',
      title:  '25 stocks that survived AI crash reveal what themes could work within Indian IT space',
      date:   '26 February 2026',
      imgSrc: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=600&q=80&auto=format&fit=crop',
    },
    {
      source: 'Mint',
      title:  "AI a secular, long-term theme; worst of earnings firmly behind us, says EPM Wealth MD",
      date:   '24 February 2026',
      imgSrc: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=600&q=80&auto=format&fit=crop',
    },
  ],
};

/* ── Careers ── */
export const careersData = {
  label:    'Careers',
  heading:  'If ethics and integrity<br>drive you,<br>look no further',
  body:     "Some of the most prominent business families in India place their trust in our wealth advisory services.",
  cta:      { label: 'View Open Positions', href: '#contact' },
  perks: [
    'Become a Financial Partner with EPM Wealth',
    'Access exclusive training & certification programs',
    'Build your own client portfolio from day one',
    'Earn passive income through referral networks',
    'Get mentored by industry veterans',
    'Scale with our proven frameworks & tools',
    'Unlock unlimited earning potential',
    'Join a high-prestige profession shaping tomorrow's wealth',
  ],
  slides: [
    { label: 'Wealth Creation',  imgSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=85&auto=format&fit=crop' },
    { label: 'Wealth Protection',imgSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=85&auto=format&fit=crop' },
    { label: 'Partner Programme',imgSrc: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85&auto=format&fit=crop' },
    { label: 'Training & Support',imgSrc:'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=85&auto=format&fit=crop' },
    { label: 'Our Culture',      imgSrc: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&q=85&auto=format&fit=crop' },
  ],
};

/* ── CSR / ESG ── */
export const csrData = {
  label:   'Responsible Investing',
  heading: 'Our responsible vision for a better & <em style="color:var(--gold2);font-style:italic">brighter future',
  body:    'As capital allocators, we recognize the impact of our investment advice on the world around us. We are committed to enabling our clients to allocate their capital in a manner that fully optimises opportunities and minimizes risks to environmental, social, and governance (ESG) factors.',
  cta:     { label: 'Explore ESG', href: '#contact' },
  bgImg:   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop',
};

/* ── Core Values (RISK) ── */
export const valuesData = {
  label:   'Core Values',
  heading: 'We believe in RISK',
  body:    'Our four core values form the foundation of every client relationship and every investment decision we make.',
  cards: [
    {
      letter: 'R', word: 'Relationship',
      desc:   'We build lasting partnerships grounded in trust, transparency, and a genuine commitment to long-term success.',
      imgSrc: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&auto=format&fit=crop',
    },
    {
      letter: 'I', word: 'Integrity',
      desc:   "Every recommendation is unbiased and fully aligned with the client's interest. Complete transparency, always.",
      imgSrc: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80&auto=format&fit=crop',
    },
    {
      letter: 'S', word: 'Simplicity',
      desc:   'We distil the complex world of finance into clear, actionable insights. Clarity over complexity, always.',
      imgSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    },
    {
      letter: 'K', word: 'Knowledge',
      desc:   'Deep expertise across asset classes, geographies, and generations drives our advice and research.',
      imgSrc: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80&auto=format&fit=crop',
    },
  ],
};

/* ── Why EPM ── */
export const whyEpmData = {
  label:   'Our Approach',
  heading: 'Why Choose EPM',
  points: [
    {
      title: 'SEBI Registered Investment Advisor',
      desc:  'Fully regulated, unbiased advice with no commission-driven recommendations',
    },
    {
      title: 'Holistic Family Office Services',
      desc:  "360° coverage of your family's financial needs across generations",
    },
    {
      title: 'Access to Global Markets',
      desc:  'Curated international investment opportunities from top-quartile managers',
    },
    {
      title: '₹100+ Crore AUM · 1000+ Clients · 25+ Cities',
      desc:  'A proven track record across market cycles since 2011',
    },
  ],
};

/* ── Contact ── */
export const contactData = {
  heading: 'Your legacy awaits here',
  address:     'Wave Silver Tower, 814,\nNoida Sector 18, Uttar Pradesh 201301, IN',
  phones:      ['+91 0120 426 4717', '+91 9899939333'],
  emails:      ['info@epmwealth.com', 'careers@epmwealth.com'],
  careerEmail: 'careers@epmwealth.com',
  offices: [
    'Mumbai','Noida','Bengaluru','Chennai',
    'Pune','Kolkata','Gujarat','Lucknow',
    'Kanpur','Gurugram',
  ],
  enquiryOptions: [
    'Personal Wealth Advisory (₹5 Cr to ₹100 Cr)',
    'Family Office Advisory (₹100 Cr & Above)',
    'HERitage — Wealth Advisory For Women (₹5 Cr & Above)',
    'Founders Circle (₹5 Cr & Above)',
    'Fund of Funds (₹1 Cr & Above)',
  ],
  discoverOptions: [
    'News Publication','Search Engine','UHNW Event Calendar 2026',
    'Recommended by friend or colleague','Social Media','YouTube','Other',
  ],
};

/* ── Footer ── */
export const footerData = {
  legalEntities: [
    {
      name:  'EPM Financial & Investment Advisors Pvt Ltd',
      lines: ['SEBI Registration No: INA000001811','CIN No: U74900MH2012PTC234921','PMS Registration No: INP000007818'],
    },
    {
      name:  'EPM Fund Managers Pvt Ltd',
      lines: ['CIN No: U65990MH2020PTC340389','FOF I — IN/AIF2/21-22/0876 (Category 2 AIF)'],
    },
    {
      name:  'Status of Complaints',
      lines: ['Beginning of the month: Nil','Received this month: Nil','Resolved during the month: Nil','Pending at end of month: Nil'],
    },
  ],
  columns: [
    {
      heading: 'About',
      links:   [['Overview','#about'],['Leadership','#about'],['Brand Story','#about'],['ESG','#contact']],
    },
    {
      heading: 'Wealth Management',
      links:   [['Family Business','#wealth'],['Professionals & CXOs','#wealth'],['Founders & Entrepreneurs','#wealth'],['Women Clients','#wealth']],
    },
    {
      heading: 'Asset Management',
      links:   [['Discretionary PMS','#assets'],['Fund of Funds','#assets'],['Smart Beta','#assets'],['Global Investments','#assets']],
    },
    {
      heading: 'Navigate',
      links:   [['Vault','#vault'],['Careers','#careers'],['Contact','#contact'],['+91 0120 426 4717','tel:+911204264717'],['info@epmwealth.com','mailto:info@epmwealth.com']],
    },
  ],
};

/* ── Social Links ── */
export const socialLinks = [
  { icon: 'fa-instagram',  href: 'https://www.instagram.com/epm_wealth/',         label: 'Instagram' },
  { icon: 'fa-youtube',    href: 'https://www.youtube.com/@epmwealth101',          label: 'YouTube'   },
  { icon: 'fa-linkedin-in',href: 'https://www.linkedin.com/company/epm-wealth/',  label: 'LinkedIn'  },
  { icon: 'fa-facebook-f', href: 'https://www.facebook.com/epmwealthadvisor',     label: 'Facebook'  },
  { icon: 'fa-whatsapp',   href: 'https://wa.me/919999939333',                    label: 'WhatsApp'  },
];
