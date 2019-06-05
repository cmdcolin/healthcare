document.addEventListener('DOMContentLoaded', function(){

        var cy = window.cy = cytoscape({
          container: document.getElementById('cy'),

          // demo your layout
          layout: {
            name: 'dagre',
            nodeDimensionsIncludeLabels: true
          },

          style: [
            {
              selector: 'node',
              style: {
                'background-color': '#dd4de2',
                'content': 'data(name)',
              }
            },

            {
              selector: 'edge',
              style: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'line-color': '#dd4de2',
                'target-arrow-color': '#dd4de2',
                'opacity': 0.5
              }
            }
          ],

    elements: {
      nodes: [
        { data: { id: '1', name: 'So you had unprotected sex...' } },
        { data: { id: '2', name: 'Where are you? (click)' } },
        { data: { id: '3', name: 'What are your reproductive organs?' } },
        { data: { id: '4.1', name: 'Bodies with Uterus' } },
        { data: { id: '4.2', name: 'Bodies with Prostate' } },
        { data: { id: '4.3', name: 'Bodies with Intersex' } }
      ],
      edges: [
        { data: { source: '1', target: '2' } },
        { data: { source: '2', target: '3' } },
        { data: { source: '3', target: '4.1' } },
        { data: { source: '3', target: '4.2' } },
        { data: { source: '3', target: '4.3' } }
      ]
    },
        })
})
