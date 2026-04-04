import type { Guide, GuideStatus, MarketingTactic, LicenseCardData } from '@/types'

export const guides: Guide[] = [
  {
    id: 'small-business-grants',
    title: 'Unlocking Small Grants for STEM Advancement',
    description:
      'Discover practical strategies and valuable insights into small-scale funding opportunities tailored for STEM-focused educational institutions like Innovatech Academy.',
    status: 'locked',
    imageUrl: 'https://flagcdn.com/w1280/kz.png',
    imageGradient: 'bg-gradient-to-br from-blue-700 to-blue-900',
    route: '/guides/small-business-grants',
  },
  {
    id: 'marketing-strategies',
    title: 'Shaping STEM Success: Marketing Strategies for Innovatech Academy',
    description:
      "Discover a variety of scalable and creative marketing tactics tailored to Innovatech Academy's STEM focus in Tashkent and beyond, designed to enhance community engagement and elevate brand awareness.",
    status: 'preview',
    imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=500',
    imageGradient: 'bg-gradient-to-br from-amber-600 to-orange-700',
    route: '/guides/marketing-strategies',
  },
  {
    id: 'licenses-permits',
    title: 'Licenses and Permits for Innovatech Academy: A Complete Compliance Guide',
    description:
      "An in-depth overview of forms, fees, and official channels, specifically tailored to ensure full compliance for your Tashkent-based educational institution. Explore all the key steps to maintain legal operations in Uzbekistan's regulatory environment without listing any specific licenses.",
    status: 'free',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500',
    imageGradient: 'bg-gradient-to-br from-slate-400 to-slate-600',
    route: '/guides/licenses-permits',
  },
]

export const marketingTactics: MarketingTactic[] = [
  {
    title: 'Educational Blog Series',
    description:
      "Develop a series of in-depth articles discussing emerging trends in science and technology, along with tips for parents on nurturing kids' interest in STEM. Incorporate references to the Academy's teaching approach, but maintain a value-driven angle. Publish these on the school's website and share via social channels, establishing the institution as a knowledge hub for STEM enthusiasts.",
    category: 'Content Marketing',
    budget: 200,
  },
  {
    title: 'Local STEM Workshops',
    description:
      'Partner with libraries or youth centers in Tashkent to host free, introductory STEM workshops. By offering practical sessions (e.g., robotics basics or simple coding lessons), Innovatech Academy can build trust and position itself as a community-focused institution. These sessions can act as a stepping stone, encouraging participants to enroll in longer-term programs at the Academy.',
    category: 'Partnership Marketing',
    budget: 500,
  },
  {
    title: 'STEM Career Talks',
    description:
      'Invite professionals prominent in local industries—engineering, IT, healthcare—to share their experiences and career insights with Innovatech Academy students and parents. Arrange these talks monthly, positioning the Academy as a vital connector between aspiring students and experts who can provide invaluable real-world perspectives.',
    category: 'Community Outreach',
    budget: 700,
  },
  {
    title: 'STEM Open House Event',
    description:
      "Organize an immersive open house for families, featuring interactive demonstrations, lab experiments, and sample classes. This event allows parents and prospective students to experience the academy's teaching methods firsthand. Create buzz by inviting local educators and media representatives to discover the school's modern approach to learning.",
    category: 'Community Outreach',
    budget: 800,
  },
  {
    title: 'Social Media Campaign',
    description:
      "Launch a targeted Facebook and Instagram promotion with engaging videos and photo content that highlights the Academy's facilities, success stories, and behind-the-scenes glimpses of innovative projects. Use campaign-specific hashtags and track engagement metrics to focus on high-performing content types, ensuring maximum reach among local families and stakeholders interested in STEM education.",
    category: 'Digital Marketing',
    budget: 300,
  },
]

export const nationalLicenses: LicenseCardData[] = [
  {
    title: 'Ministry of Public Education License',
    level: 'National',
    description:
      "A national-level education license required for all schools in Uzbekistan, ensuring compliance with academic standards, staffing requirements, and approved curricula. This license confirms the institution's right to operate as an educational facility and issue recognized certificates.",
    link: 'Ministry of Public Education',
  },
  {
    title: 'State Tax Committee Registration',
    level: 'National',
    description:
      'Mandatory tax registration for legal entities to obtain a taxpayer identification number. This facilitates proper payroll administration, tax returns filing, and regular financial audits, ensuring alignment with Uzbek tax laws.',
    link: 'State Tax Committee',
  },
]

export const localLicenses: LicenseCardData[] = [
  {
    title: 'Tashkent City Education Board Registration',
    level: 'Local',
    description:
      "A municipal registration for educational entities, certifying compliance with local administrative policies and approval of operational plans specific to Tashkent's regulations. Necessary for extracurricular programs and local recognition.",
    link: 'Tashkent City Administration',
  },
  {
    title: 'Local Sanitary-Epidemiological Certificate',
    level: 'Local',
    description:
      'Official approval verifying that the school environment meets health and safety standards for students and staff. Involves on-site inspections to assess cleanliness, ventilation, and overall operational hygiene.',
    link: 'Sanitary-Epidemiological Agency',
  },
  {
    title: 'Building Safety and Fire Compliance Permit',
    level: 'Local',
    description:
      'Permit required to confirm that the facility meets all engineering, fire safety, and evacuation requirements. Typically obtained through inspections by city fire departments and building authorities.',
    link: 'Municipal Fire Department',
  },
]
