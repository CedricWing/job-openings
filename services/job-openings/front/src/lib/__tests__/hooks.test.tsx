import React, { useEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useLoading } from '../hooks';
import '@testing-library/jest-dom/extend-expect';

const TestComponent = () => {
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const [loading, getFn] = useLoading(async () => {
    await sleep(1000);
  }, true);
  useEffect(() => {
    getFn();
  }, []);
  if (loading) return <div>loading</div>;
  return <div>loaded</div>;
};
describe('lib-hooks-test : useLoading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should get loaded after timeout', async () => {
    const { result, waitForValueToChange } = renderHook(() => TestComponent());
    jest.useFakeTimers();
    expect(result.current.props.children).toEqual('loading');
    await waitForValueToChange(() => result.current.props.children);
    expect(result.current.props.children).toEqual('loaded');
  });
});
