import React from 'react';

const cardsData = [
  { id: 1, front: '/portfolio_agricolaguerreschi.png', back: null }, // Using image for back if no video
  { id: 2, front: '/portfolio_xstro.png', back: '/portfolio_ag_group.png' },
  { id: 3, front: '/service_business_expansion.png', back: '/portfolio_artsguerreschi.png' },
  { id: 4, front: '/service_digital_marketing.png', back: '/service_web_tech.png' },
];

export default function CardFlipSection() {
  return (
    <section className="card-flip-section">
      <div className="card-flip-container">
        <div className="cards-wrapper">
          
          <div className="cards-group main-card">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={cardsData[0].front} alt="Card 1 front" />
                </div>
                <div className="flip-card-back">
                  <img src={cardsData[0].front} alt="Card 1 back fallback" />
                </div>
              </div>
            </div>
          </div>

          <div className="cards-group small-cards">
            {cardsData.slice(1).map((card) => (
              <div key={card.id} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={card.front} alt={`Card ${card.id} front`} />
                  </div>
                  <div className="flip-card-back">
                    <img src={card.back} alt={`Card ${card.id} back`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
