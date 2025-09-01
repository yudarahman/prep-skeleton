import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import IntersectionObserverMock from '@/mocks/IntersectionObserverMock.ts';

import { MobileList } from '@/compounds/MobileList';

describe('@/compounds/MobileList/index.tsx', () => {
  let intersectionObserver: any = null;
  
  beforeAll(() => {
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: any) {
        intersectionObserver = new IntersectionObserverMock(callback);
        return intersectionObserver;
      }
    });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
  
  it('should render correct element when "isFetching" is true', () => {
    const mockSearch = vi.fn();
    const mockOnIntersect = vi.fn();

    render(
      <MobileList
        isFetching
        listData={[{ id: 'some-id-1', name: 'Some Name 1', isActive: false }]}
        onIntersecting={mockOnIntersect}
        onSearch={mockSearch}
      >
        {
          (item) => {
            return (
              <div key={item.id}>{item.name}</div>
            );
          }
        }
      </MobileList>
    );
    
    const imageLoading = screen.getByTestId('test-loading-image');
    expect(imageLoading).toBeInTheDocument();
  });
  
  it('should render correct element when "isFetching" is false', () => {
    const mockSearch = vi.fn();
    const mockOnIntersect = vi.fn();

    render(
      <MobileList
        isFetching={false}
        listData={[{ id: 'some-id-1', name: 'Some Name 1', isActive: false }]}
        onIntersecting={mockOnIntersect}
        onSearch={mockSearch}
      >
        {
          (item) => {
            return (
              <div key={item.id}>{item.name}</div>
            );
          }
        }
      </MobileList>
    );

    const spanName = screen.getByText('Some Name 1');
    expect(spanName).toBeInTheDocument();
  });

  it('should render correct element when "listData" is empty', () => {
    const mockSearch = vi.fn();
    const mockOnIntersect = vi.fn();

    render(
      <MobileList
        isFetching={false}
        listData={[]}
        onIntersecting={mockOnIntersect}
        onSearch={mockSearch}
      >
        {
          () => {
            return (
              <div data-testid="test-div-empty-container" />
            );
          }
        }
      </MobileList>
    );

    const inputSearch = screen.getByTestId('test-search-input');
    expect(inputSearch).toBeInTheDocument();
  });

  it('should do nothing when search and "Enter" was pressed', () => {
    const mockSearch = vi.fn();
    const mockOnIntersect = vi.fn();

    render(
      <MobileList
        isFetching={false}
        listData={[{ id: 'some-id-1', name: 'Some Name 1', isActive: false }]}
        onIntersecting={mockOnIntersect}
        onSearch={mockSearch}
      >
        {
          (item) => {
            return (
              <div key={item.id}>{item.name}</div>
            );
          }
        }
      </MobileList>
    );

    const inputSearch = screen.getByTestId('test-search-input');

    fireEvent.change(inputSearch, { target: { value: 'test' } });
    fireEvent.keyDown(inputSearch, { key: 'Enter'});
    expect(mockSearch).toHaveBeenCalledWith('test');
  });

  it('should do nothing when search and other key was pressed', () => {
    const mockSearch = vi.fn();
    const mockOnIntersect = vi.fn();

    render(
      <MobileList
        isFetching={false}
        listData={[{ id: 'some-id-1', name: 'Some Name 1', isActive: false }]}
        onIntersecting={mockOnIntersect}
        onSearch={mockSearch}
      >
        {
          (item) => {
            return (
              <div key={item.id}>{item.name}</div>
            );
          }
        }
      </MobileList>
    );

    const inputSearch = screen.getByTestId('test-search-input');

    fireEvent.keyDown(inputSearch, { key: 'Shift'});
    expect(inputSearch).toBeInTheDocument();
  });
});