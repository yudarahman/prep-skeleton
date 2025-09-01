/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';

import { withPresenter } from '@/compounds/DataTable/Presenter';

describe('@/compounds/DataTable/Presenter.tsx', () => {
  const mockOnSearch = vi.fn();
  const mockOnPageChange = vi.fn();
  const mockOnLimitChange = vi.fn();
  const mockOnSortsChange = vi.fn();
  const mockOnStateChange = vi.fn();

  beforeEach(() => {
    vi.resetModules();
    vi.mock('@/compounds/DataTable/config', () => {
      return {
        initialState: {
          limits: [5, 10, 20, 30, 40, 50],
          currentPage: 1,
          pageSize: 10,
          search: '',
          sorts: []
        }
      };
    });
  });
  
  const TestComponent = withPresenter(({ data, actions }) => {
    const {
      limits,
      currentPage,
      pageSize,
      sorts,
      search
    } = data;
    const {
      onInnerLimitChange,
      onInnerPageChange,
      onInnerSortsChange,
      onInnerSearch,
      onSearchEnter
    } = actions;
    
    return (
      <>
        <select
          data-testid="test-select"
          value={pageSize}
          onChange={(ev) => onInnerLimitChange(ev.target.value)}
        >
          {
            limits.map((item) => (
              <option
                key={`opt-item-${item}`}
                value={item}
              >
                {item}
              </option>
            ))
          }
        </select>
        <input
          data-testid="test-input"
          onChange={(ev) => onInnerSearch(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              onSearchEnter();
            }
          }}
        />
        <button
          data-testid="test-button-change-page"
          onClick={() => onInnerPageChange('3')}
        />
        <button
          data-testid="test-button-change-sorts"
          onClick={() => onInnerSortsChange('name')}
        />
        <span>
          {search}
        </span>
        <span data-testid="test-span-page-size">
          {pageSize}
        </span>
        <span>
          {currentPage}
        </span>
        <span>
          {sorts.toString()}
        </span>
      </>
    );
  });

  it('should render expected element when "onInnerSearch" triggered', async () => {
    render(
      <TestComponent
        tableData={[]}
        tableColumns={[]}
        onSearch={mockOnSearch}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
        onStateChange={mockOnStateChange}
      />
    );
    
    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'test something here' } });
    
    await waitFor(() => {
      const searchSpan = screen.getByText('test something here');
      
      expect(searchSpan).toBeInTheDocument();
    });
  });

  it('should render expected element when "onInnerSearch" triggered and "Enter" pressed', () => {
    render(
      <TestComponent
        tableData={[]}
        tableColumns={[]}
        onSearch={mockOnSearch}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
        onStateChange={mockOnStateChange}
      />
    );

    const input = screen.getByTestId('test-input');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('should render expected element when "onInnerLimitChange" triggered', async () => {
    render(
      <TestComponent
        tableData={[]}
        tableColumns={[]}
        onSearch={mockOnSearch}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
        onStateChange={mockOnStateChange}
      />
    );

    const select = screen.getByTestId('test-select');
    fireEvent.change(select, { target: { value: '20' } });

    await waitFor(() => {
      expect(select).toHaveValue('20');

      const selectSpan = screen.getByTestId('test-span-page-size');
      expect(selectSpan).toBeInTheDocument();
      expect(selectSpan).toHaveTextContent('20');
      expect(mockOnLimitChange).toHaveBeenCalled();
    });
  });

  it('should render expected element when "onInnerPageChange" triggered', async () => {
    render(
      <TestComponent
        totalPages={100}
        tableData={[]}
        tableColumns={[]}
        onSearch={mockOnSearch}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
        onStateChange={mockOnStateChange}
      />
    );

    const button = screen.getByTestId('test-button-change-page');
    fireEvent.click(button);

    await waitFor(() => {
      const pageSpan = screen.getByText('3');
      expect(pageSpan).toBeInTheDocument();
      expect(mockOnPageChange).toHaveBeenCalled();
    });
  });

  it('should render expected element when "onInnerSortsChange" triggered and "sorts" is empty', async () => {
    render(
      <TestComponent
        totalPages={100}
        tableData={[]}
        tableColumns={[]}
        onSearch={mockOnSearch}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
        onSortsChange={mockOnSortsChange}
        onStateChange={mockOnStateChange}
      />
    );

    const button = screen.getByTestId('test-button-change-sorts');
    fireEvent.click(button);

    await waitFor(() => {
      const sortSpan = screen.getByText('name');
      expect(sortSpan).toBeInTheDocument();
      expect(mockOnSortsChange).toHaveBeenCalled();
    });
  });
});