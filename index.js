const main = {
  nodes: [
    { data: { id: '1', name: 'So you had unprotected sex...' } },
    { data: { id: '3', name: 'What are your reproductive organs?' } },
    {
      data: {
        id: 'uterus',
        name: 'Bodies with Uterus',
      },
    },
    { data: { id: '42', name: 'Bodies with Prostate' } },
    { data: { id: '43', name: 'Bodies with Intersex' } },
  ],
  edges: [
    { data: { source: '1', target: '3' } },
    { data: { source: '3', target: 'uterus' } },
    { data: { source: '3', target: '42' } },
    { data: { source: '3', target: '43' } },
  ],
}

const bodiesWithUterus = {
  nodes: [
    { data: { id: '4', name: 'What you concerned with?' } },
    { data: { id: 'pregnancy', name: 'Pregnancy' } },
    { data: { id: '5.2', name: 'STI' } },
  ],
  edges: [
    { data: { source: '4', target: 'pregnancy' } },
    { data: { source: '4', target: '5.2' } },
  ],
}

const pregnancy = {
  nodes: [
    { data: { id: '5.1', name: 'Are you taking birth control?' } },
    { data: { id: 'birth_control', name: 'Yes' } },
    { data: { id: '6.2', name: 'No' } },
  ],
  edges: [
    { data: { source: '5.1', target: 'birth_control' } },
    { data: { source: '5.1', target: '6.2' } },
  ],
}

const when = {
  nodes: [
    { data: { id: '7.1', name: 'When did sex occur?' } },
    { data: { id: 'over', name: 'Over 5 days (120 hours) ago' } },
    { data: { id: 'under', name: 'More than one week ago' } },
  ],
  edges: [
    { data: { source: '7.1', target: 'over' } },
    { data: { source: '7.1', target: 'under' } },
  ],
}

const under = `<div class='message'>
<p class='important'>Emergency contraception</p>
<ul>
<li>Paragard IUD aka copper IUD. This IUD can be added as an emergency contraceptive</li>
<li>Emergency Contraceptive Pill - Levonorgestrel [Plan B One Step, Take Action, My Way, AfterPill, and others]. Works best when taken within 72 hours (3 days) but can work up to 120 hours (5 days). <b>Can be purchased over the counter without a Rx</b></li>
</ul>`

const over = `<div class='message'>
<p class='important'>Abortion</p>
<p>After one week it is important to talk to your doctor. A list of abortion care providers is available at http://google.com</p>
</div>`

const layoutOpts = {
  name: 'dagre',
  nodeDimensionsIncludeLabels: true,
}
document.addEventListener('DOMContentLoaded', () => {
  const cy = (window.cy = cytoscape({
    container: document.getElementById('cy'),

    // demo your layout
    layout: layoutOpts,
    userZoomingEnabled: false,

    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#dd4de2',
          content: 'data(name)',
        },
      },

      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'line-color': '#dd4de2',
          'target-arrow-color': '#dd4de2',
          opacity: 0.5,
        },
      },
    ],

    elements: main,
  }))

  cy.$('#uterus').on('tap', () => {
    cy.elements().remove()
    cy.add(bodiesWithUterus)
    cy.layout(layoutOpts).run()
    cy.$('#pregnancy').on('tap', () => {
      cy.elements().remove()
      cy.add(pregnancy)
      cy.layout(layoutOpts).run()
      cy.$('#birth_control').on('tap', () => {
        cy.elements().remove()
        cy.add(when)
        cy.layout(layoutOpts).run()
        cy.$('#over').on('tap', () => {
          console.log('here')
          document.getElementById('cy').style.display = 'none'
          document.getElementById('moreinfo').innerHTML = over
        })
        cy.$('#under').on('tap', () => {
          document.getElementById('cy').style.display = 'none'
          document.getElementById('moreinfo').innerHTML = under
        })
      })
    })
  })
})
