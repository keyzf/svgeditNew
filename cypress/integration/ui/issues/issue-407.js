import {
  visitAndApproveStorage
} from '../../../support/ui-test-helper.js';

// See https://github.com/SVG-Edit/svgedit/issues/407
describe('Fix issue 407', function () {
  beforeEach(() => {
    visitAndApproveStorage();
  });

  it('can enter edit on text child', function () {
    cy.get('#tool_source').click();
    cy.get('#svg_source_textarea')
      .type('{selectall}')
      .type(`<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg">
      <g class="layer">
       <title>Layer 1</title>
       <g>
        <rect fill="#ffff00" height="70" width="165" x="179.5" y="146.5"/>
        <text fill="#000000" id="a_text" text-anchor="middle" x="260.5" xml:space="preserve" y="192.5">hello</text>
       </g>
      </g>
     </svg>`, {parseSpecialCharSequences: false});
    cy.get('#tool_source_save').click();
    cy.get('#svg_1').click().dblclick();
    cy.get('#a_text').should('exist');
    cy.get('#a_text').trigger('mousedown', {which: 1}).trigger('mouseup').dblclick().type('1234');
    cy.get('#a_text').should('have.text', 'he1234llo');
  });
});
