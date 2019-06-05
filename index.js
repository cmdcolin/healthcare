const main = {
  nodes: [
    { data: { id: '1', name: 'So you had unprotected sex...' } },
    { data: { id: '3', name: 'What are your reproductive organs?' } },
    { data: { id: '4.1', name: 'Bodies with Uterus' } },
    { data: { id: '4.2', name: 'Bodies with Prostate' } },
    { data: { id: '4.3', name: 'Bodies with Intersex' } },
  ],
  edges: [
    { data: { source: '1', target: '3' } },
    { data: { source: '3', target: '4.1' } },
    { data: { source: '3', target: '4.2' } },
    { data: { source: '3', target: '4.3' } },
  ],
};

const bodies_with_uterus = {
  nodes: [
    { data: { id: '4', name: 'What you concerned with?' } },
    { data: { id: '5.1', name: 'Pregnancy' } },
    { data: { id: '5.2', name: 'STI' } },
  ],
  edges: [
    { data: { source: '4', target: '5.1' } },
    { data: { source: '4', target: '5.2' } },
  ],
};

const pregnancy = {
  nodes: [
    { data: { id: '5.1', name: 'Pregnancy' } },
    { data: { id: '6.2', name: 'Abortion' } },
    { data: { id: '6.2', name: 'Emergency contraception' } },
  ],
  edges: [
    { data: { source: '5.1', target: '6.1' } },
    { data: { source: '5.1', target: '6.2' } },
  ],
};

const layoutOpts = {
  name: 'dagre',
  nodeDimensionsIncludeLabels: true,
};
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
  }));

  cy.nodes().on('click', e => {
    const elt = e.target
    console.log(clickedNode.data('name'));
    if (elt.id() === '4.1') {
      cy.elements().remove();
      cy.add(bodies_with_uterus);
      cy.layout(layoutOpts).run();
    } else if (elt.id() === '5.1') {
      cy.elements().remove();
      cy.add(pregnancy);
      cy.layout(layoutOpts).run();
    }
  });
});
