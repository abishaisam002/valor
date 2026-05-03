import React, { createContext, useContext, useState, useEffect } from 'react';

const WPContext = createContext();

export const useWP = () => useContext(WPContext);

export const getAssetUrl = (path) => {
  // If in WordPress, prepend the theme URL
  if (window.valorConfig?.themeUrl) {
    // Ensure path starts with / if it doesn't already, to concatenate properly
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${window.valorConfig.themeUrl}${normalizedPath}`;
  }
  // Otherwise, use relative path for Vite dev/build
  return path;
};

// Default fallback data so the site works even if WP is down or not connected yet
const defaultData = {
  settings: {
    hero_title: 'VALUE STARTS WITH VALUES.',
    hero_subtitle: 'VALOR IS A MULTI SOLUTION PARTNER.',
    hero_tagline: 'Your strategic digital partner driving measurable value.',
    about_heading: 'Valor is a Multi solution Partner',
    about_text: 'Value solutions built on real operational experience and international market exposure. Established in the UAE in 2024, VALOR goes beyond traditional digital agencies by combining technology, strategy, and execution to help businesses grow across local and global markets.',
    cta_heading: 'Expand your footprint. Elevate your Value.',
    cta_text: 'For international investors and companies seeking a trusted distributor or partner in the UAE, VALOR provides the multidisciplinary strategy needed for scalable growth. Experience the impact of next-gen connections and elevated values.',
    contact_email: 'info@valor-ae.com',
    contact_linkedin: 'https://www.linkedin.com/company/valor-fze/',
    contact_location: 'Saifzone, Sharjah, AE',
    contact_copyright: 'Copyright © 2026 Valor. All rights reserved.',
  },
  services: [
    { title: 'Digital Solutions', items: ['Driving your digital transformation', 'Bespoke strategies', 'ROI focused implementation'] },
    { title: 'Market Strategy', items: ['Positioning your brand effectively', 'Local and global markets', 'Competitor analysis'] },
    { title: 'Technology Integration', items: ['Seamlessly embedding advanced tech', 'CRM & ERP setups', 'Automation workflows'] },
    { title: 'Creative Execution', items: ['Crafting compelling narratives', 'Visually stunning designs', 'Brand identity creation'] },
  ],
  faqs: [
    { question: 'What exactly is VALOR?', answer: 'We are a multi-solution digital agency focused on scalable growth.' },
    { question: 'How do you add value?', answer: 'Through next-gen connections and elevated strategic values.' }
  ]
};

export const WPProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false); // No loading time needed for static data

  return (
    <WPContext.Provider value={{ data, isLoading }}>
      {children}
    </WPContext.Provider>
  );
};
