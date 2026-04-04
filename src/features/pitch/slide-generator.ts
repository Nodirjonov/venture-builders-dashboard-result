import type { SlideData } from './index'

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function generateTemplateSlides(name: string, _prompt: string, images: string[], themeColor?: string): SlideData[] {
  const safeImg = (i: number) => images[i % images.length]
  const isDark = themeColor ? ['#0f1e3a', '#0d1b2a', '#1c1c1c', '#1a1a1a', '#1a1a2e', '#c0392b'].includes(themeColor.toLowerCase()) : false
  const textColor = isDark ? '#ffffff' : '#111827'
  const subTextColor = isDark ? 'rgba(255,255,255,0.7)' : '#6B7280'
  const brandRed = isDark ? '#ff6b6b' : '#E53E3E'
  const lineColor = isDark ? 'rgba(255,255,255,0.2)' : '#111827'

  return [
    // Slide 1: Cover Slide
    {
      id: uid(), title: 'Cover', type: 'blank',
      elements: [
        { id: uid(), type: 'shape', shapeType: 'circle', shapeVariant: 'filled', fillColor: 'rgba(0,0,0,0.1)', x: -10, y: -20, width: 40, height: 60 },
        { id: uid(), type: 'shape', shapeType: 'circle', shapeVariant: 'filled', fillColor: 'rgba(0,0,0,0.05)', x: 70, y: 60, width: 50, height: 80 },
        { id: uid(), type: 'text', x: 10, y: 35, width: 80, height: 10, content: 'Company name', fontSize: 36, fontColor: '#ffffff', textAlign: 'center' },
        { id: uid(), type: 'text', x: 5, y: 48, width: 90, height: 30, content: name || 'Pitch Deck', fontSize: 90, fontColor: '#ffffff', bold: true, textAlign: 'center' },
        { id: uid(), type: 'text', x: 10, y: 85, width: 80, height: 10, content: 'Name • Date', fontSize: 24, fontColor: '#ffffff', textAlign: 'center', bold: true },
      ]
    },
    // Slide 2: Mission / Tagline
    {
      id: uid(), title: 'Mission', type: 'blank',
      elements: [
        { id: uid(), type: 'image', x: 0, y: 0, width: 40, height: 100, imageUrl: safeImg(0) },
        { id: uid(), type: 'shape', shapeType: 'square', shapeVariant: 'filled', fillColor: lineColor, x: 45, y: 15, width: 8, height: 1 },
        { id: uid(), type: 'text', x: 45, y: 25, width: 50, height: 30, content: 'Your mission or tagline', fontSize: 65, fontColor: textColor, bold: true },
        { id: uid(), type: 'text', x: 45, y: 60, width: 48, height: 30, content: 'This opening slide puts the rest of the presentation in context. Make it clear what problems you are solving.', fontSize: 24, fontColor: subTextColor },
      ]
    },
    // Slide 3: Section Title White
    {
      id: uid(), title: 'Section Title 1', type: 'blank',
      elements: [
        { id: uid(), type: 'text', x: 10, y: 40, width: 80, height: 20, content: 'Section title', fontSize: 90, fontColor: textColor, bold: true, textAlign: 'center' },
        { id: uid(), type: 'text', x: 10, y: 65, width: 80, height: 10, content: 'Section overview', fontSize: 32, fontColor: brandRed, bold: true, textAlign: 'center' },
      ]
    },
    // Slide 4: Title + Image Dark
    {
      id: uid(), title: 'Title Image', type: 'blank',
      elements: [
        { id: uid(), type: 'image', x: 50, y: 0, width: 50, height: 100, imageUrl: safeImg(1) },
        { id: uid(), type: 'shape', shapeType: 'square', shapeVariant: 'filled', fillColor: 'rgba(255,255,255,0.2)', x: 0, y: 0, width: 50, height: 100 },
        { id: uid(), type: 'text', x: 5, y: 40, width: 40, height: 30, content: 'Section title', fontSize: 60, fontColor: '#ffffff', bold: true },
        { id: uid(), type: 'text', x: 5, y: 65, width: 40, height: 25, content: 'This opening slide puts the rest of the presentation in context.', fontSize: 24, fontColor: 'rgba(255,255,255,0.8)' },
      ]
    },
    // Slide 5: Section Title 2
    {
      id: uid(), title: 'Section Title 2', type: 'blank',
      elements: [
        { id: uid(), type: 'shape', shapeType: 'square', shapeVariant: 'filled', fillColor: lineColor, x: 5, y: 15, width: 8, height: 1.5 },
        { id: uid(), type: 'text', x: 5, y: 25, width: 40, height: 15, content: 'Section title', fontSize: 55, fontColor: textColor, bold: true },
        { id: uid(), type: 'text', x: 5, y: 45, width: 35, height: 40, content: 'List your key objectives or milestones that directly impact the market and showcase absolute structural dominance.', fontSize: 22, fontColor: subTextColor },
        { id: uid(), type: 'image', x: 45, y: 15, width: 50, height: 70, imageUrl: safeImg(2) },
      ]
    },
    // Slide 6: Big Image Focus
    {
      id: uid(), title: 'Showcase', type: 'blank',
      elements: [
        { id: uid(), type: 'image', x: 0, y: 0, width: 100, height: 75, imageUrl: safeImg(3) },
        { id: uid(), type: 'text', x: 5, y: 82, width: 60, height: 15, content: 'Section title', fontSize: 60, fontColor: brandRed, bold: true },
        { id: uid(), type: 'text', x: 65, y: 84, width: 30, height: 15, content: 'Strategic metrics derived from global analytics.', fontSize: 18, fontColor: subTextColor },
      ]
    },
    // Slide 7: Big Stats
    {
      id: uid(), title: 'Big Stats', type: 'blank',
      elements: [
        { id: uid(), type: 'text', x: 10, y: 15, width: 80, height: 20, content: 'Market Opportunity', fontSize: 75, fontColor: textColor, bold: true },
        { id: uid(), type: 'text', x: 10, y: 45, width: 25, height: 20, content: 'TAM', fontSize: 36, fontColor: subTextColor, bold: true },
        { id: uid(), type: 'text', x: 10, y: 55, width: 25, height: 25, content: '$48B', fontSize: 90, fontColor: textColor, bold: true },
        
        { id: uid(), type: 'text', x: 38, y: 45, width: 25, height: 20, content: 'SAM', fontSize: 36, fontColor: subTextColor, bold: true },
        { id: uid(), type: 'text', x: 38, y: 55, width: 25, height: 25, content: '$12B', fontSize: 90, fontColor: textColor, bold: true },
        
        { id: uid(), type: 'text', x: 66, y: 45, width: 25, height: 20, content: 'SOM', fontSize: 36, fontColor: subTextColor, bold: true },
        { id: uid(), type: 'text', x: 66, y: 55, width: 25, height: 25, content: '$2.5B', fontSize: 90, fontColor: textColor, bold: true },
      ]
    },
    // Slide 8: 3 Column Text
    {
      id: uid(), title: 'Core Layout', type: 'blank',
      elements: [
        { id: uid(), type: 'text', x: 5, y: 15, width: 90, height: 20, content: 'Core Capabilities', fontSize: 75, fontColor: textColor, bold: true },
        { id: uid(), type: 'text', x: 5, y: 45, width: 28, height: 15, content: 'Scale', fontSize: 45, fontColor: textColor, bold: true },
        { id: uid(), type: 'text', x: 5, y: 58, width: 28, height: 30, content: 'Rapid deployment with mass concurrency.', fontSize: 24, fontColor: subTextColor },
        
        { id: uid(), type: 'text', x: 36, y: 45, width: 28, height: 15, content: 'Security', fontSize: 45, fontColor: textColor, bold: true },
        { id: uid(), type: 'text', x: 36, y: 58, width: 28, height: 30, content: 'Enterprise encryption natively integrated.', fontSize: 24, fontColor: subTextColor },
        
        { id: uid(), type: 'text', x: 67, y: 45, width: 28, height: 15, content: 'AI Engine', fontSize: 45, fontColor: textColor, bold: true },
        { id: uid(), type: 'text', x: 67, y: 58, width: 28, height: 30, content: 'Predictive analytics & intelligent modeling.', fontSize: 24, fontColor: subTextColor },
      ]
    },
    // Slide 9: Team 
    {
      id: uid(), title: 'Team', type: 'blank',
      elements: [
        { id: uid(), type: 'text', x: 10, y: 25, width: 80, height: 20, content: 'The Team', fontSize: 80, fontColor: '#ffffff', bold: true, textAlign: 'center' },
        { id: uid(), type: 'image', x: 30, y: 50, width: 40, height: 40, imageUrl: safeImg(4) },
      ]
    },
    // Slide 10: Thank You
    {
      id: uid(), title: 'Thank You', type: 'blank',
      elements: [
        { id: uid(), type: 'text', x: 5, y: 25, width: 60, height: 25, content: 'Thank You', fontSize: 100, fontColor: textColor, bold: true },
        { id: uid(), type: 'shape', shapeType: 'square', shapeVariant: 'filled', fillColor: lineColor, x: 5, y: 55, width: 10, height: 1 },
        { id: uid(), type: 'text', x: 5, y: 65, width: 40, height: 15, content: 'hello@company.com', fontSize: 32, fontColor: subTextColor, bold: true },
        { id: uid(), type: 'text', x: 5, y: 76, width: 40, height: 15, content: 'company.com', fontSize: 32, fontColor: subTextColor },
        { id: uid(), type: 'image', x: 55, y: 20, width: 40, height: 60, imageUrl: safeImg(5) },
      ]
    },
  ]
}
