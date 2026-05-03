import React, { useState } from 'react';

const faqs = [
  {
    question: "1. Where is VALOR located?",
    answer: "VALOR is based in the UAE, with operations connected to SAIF Zone (Sharjah Airport International Free Zone). Our team brings more than a decade of experience working within SAIF Zone, giving us strong insight into business setup, operations, and regional market dynamics."
  },
  {
    question: "2. Does VALOR support business expansion and distribution?",
    answer: "Yes. VALOR actively supports companies in expanding into Asia, Africa, and the Middle East. We assist with distribution strategies, partner identification, and market entry execution, helping brands establish a strong and sustainable presence."
  },
  {
    question: "3. Can VALOR collaborate as a long-term business partner?",
    answer: "Absolutely. We position ourselves not just as a service provider, but as a strategic partner. VALOR works closely with clients on a long-term basis, supporting growth planning, execution, and continuous optimization."
  },
  {
    question: "4. What industries does VALOR work with?",
    answer: "VALOR works across multiple industries including F&B, luxury goods, retail, and services. Our flexible approach allows us to adapt strategies based on each sector’s specific market and audience."
  },
  {
    question: "5. What makes VALOR different from other digital agencies?",
    answer: "VALOR combines digital expertise with real operational and business development experience. We go beyond marketing by offering end-to-end support — from branding and digital presence to distribution and project management, ensuring measurable and scalable results."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <h2 id="faq-title" className="faq-title">FAQ</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
              <button 
                className="faq-question" 
                aria-expanded={isOpen} 
                onClick={() => toggleFAQ(index)}
              >
                <span className="q-icon">Q</span>
                <span className="question-text">{faq.question}</span>
                <span className={`arrow-icon ${isOpen ? 'open' : ''}`}>▼</span>
              </button>
              
              <div 
                className={`faq-answer ${isOpen ? 'open' : ''}`}
                role="region"
                hidden={!isOpen}
              >
                <div className="answer-inner">
                  <span className="a-icon">A</span>
                  <p className="answer-text">{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
