const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Liga Korupsi Indonesia",
  "description": "Platform visualisasi data interaktif tentang kasus-kasus korupsi di Indonesia",
  "url": "https://liga-korupsi-indo.vercel.app",
  "logo": "https://liga-korupsi-indo.vercel.app/og-image.png",
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Liga Korupsi Indonesia",
  "description": "Platform visualisasi data interaktif tentang kasus-kasus korupsi di Indonesia. Meningkatkan kesadaran publik dan transparansi dalam pemberantasan korupsi.",
  "url": "https://liga-korupsi-indo.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://liga-korupsi-indo.vercel.app/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export { organizationSchema, websiteSchema };