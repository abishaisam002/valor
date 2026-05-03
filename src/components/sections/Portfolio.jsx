import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

const portfolioItems = [
  { id: 1, name: 'Agricola Guerreschi', img: '/portfolio_agricolaguerreschi.png', link: 'http://agricolaguerreschi.it' },
  { id: 2, name: 'Xstro', img: '/portfolio_xstro.png', link: 'http://xstro.it' },
  { id: 3, name: 'Arts Guerreschi', img: '/portfolio_artsguerreschi.png', link: 'http://artsguerreschi.com' },
  { id: 4, name: 'AG Group', img: '/portfolio_ag_group.png', link: 'http://ag-group.it' },
]

export default function Portfolio() {
  const scroll = useScroll()
  const horizontalRef = useRef()

  useFrame(() => {
    if (horizontalRef.current) {
      // Portfolio section spans roughly offset 0.5 to 0.75 in the total scroll space.
      // We will calculate local progress.
      // To make it robust, we just use the scroll offset directly to drive horizontal transform.
      
      // Let's assume total pages = 7. 
      // Portfolio is around page 4 to 5.
      // 1 page = 1/7 of total scroll.
      const pageUnit = 1 / 7
      const portfolioStart = pageUnit * 4
      const portfolioEnd = pageUnit * 5.5
      
      if (scroll.offset >= portfolioStart && scroll.offset <= portfolioEnd) {
        // Calculate progress from 0 to 1 within this section
        const progress = (scroll.offset - portfolioStart) / (portfolioEnd - portfolioStart)
        // Translate from 0vw to -300vw (since there are 4 items, 100vw each)
        horizontalRef.current.style.transform = `translateX(-${progress * 300}vw)`
      } else if (scroll.offset < portfolioStart) {
        horizontalRef.current.style.transform = `translateX(0vw)`
      } else {
        horizontalRef.current.style.transform = `translateX(-300vw)`
      }
    }
  })

  return (
    <section className="portfolio-section" style={{ height: '150vh' }}>
      <div className="portfolio-sticky">
        <h2 className="portfolio-title">Featured <span className="text-gradient">Work</span></h2>
        <div className="portfolio-horizontal" ref={horizontalRef}>
          {portfolioItems.map((item) => (
            <div key={item.id} className="portfolio-item">
              <div className="portfolio-card glass-panel">
                <img src={item.img} alt={item.name} />
                <div className="portfolio-info">
                  <h3>{item.name}</h3>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">View Site →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
