import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import DynamicForm from '../DynamicForm';

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
        <DynamicForm
          values={['AAA', 'BBB', 'CCC']}
          label={'DevOps Engineer'}
          placeholder={'This is a placeholder'}
          callback={() => {
            /**/
          }}
        />,
        container,
      );
    });
    expect(container.querySelector('span')?.textContent).toEqual(
      'DevOps Engineer',
    );
  });
});
