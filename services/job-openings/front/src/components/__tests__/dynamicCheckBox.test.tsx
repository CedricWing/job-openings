import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import DynamicCheckBox from '../DynamicCheckBox';

const myMock = jest.fn();

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
        <DynamicCheckBox
          label={'DevOps Engineer'}
          checked={false}
          value={2}
          onChange={() => {
            /* */
          }}
        />,
        container,
      );
    });
    expect(container.querySelector('.form-check-text')?.textContent).toEqual(
      'DevOps Engineer',
    );
    expect(container.querySelector('.form-check-count')?.textContent).toEqual(
      '2',
    );
  });
  it('Should trigger a callback when clicked', () => {
    act(() => {
      render(
        <DynamicCheckBox
          label={'DevOps Engineer'}
          checked={false}
          value={2}
          onChange={() => {
            myMock();
          }}
        />,
        container,
      );
    });
    const input = container.querySelector('.form-check-input');
    act(() => {
      input?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(myMock.mock.calls.length).toBe(1);
  });
});
