import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import DynamicModal from '../DynamicModal';

let container: Element;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});
describe('components-DynamicCheckBox-test', () => {
  it('Renders without crashing', () => {
    act(() => {
      render(
        <DynamicModal
          value={{ name: 'DevOps Engineer', count: 2, active: true }}
          id={`testid`}
          callback={() => {
            /**/
          }}
        />,
        container,
      );
    });
    expect(container.querySelector('.modal')?.id).toEqual(
      `modify-modal-testid`,
    );
    expect(
      container.querySelector('.form-control')?.getAttribute('value'),
    ).toEqual('DevOps Engineer');
  });
});
