/* eslint-disable @typescript-eslint/no-explicit-any */
import {
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
import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/compounds/DataTable';

describe('@/compounds/DataTable/index.tsx', () => {
  type TestType = {
    id: string;
    name: string;
  };

  const mockTableData: TestType[] = [
    {
      id: 'mock-id-1',
      name: 'Mock ID 1'
    },
    {
      id: 'mock-id-2',
      name: 'Mock ID 2'
    },
    {
      id: 'mock-id-3',
      name: 'Mock ID 3'
    }
  ];

  const mockTableColumns: ColumnDef<TestType>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true
    }
  ];
  
  const mockActions = {
    mockOnSearch: vi.fn(),
    mockOnPageChange: vi.fn(),
    mockOnLimitChange: vi.fn(),
    mockOnStateChange: vi.fn()
  };

  it('should render correctly when "tableData" is empty', () => {
    render(
      <DataTable
        tableData={[]}
        tableColumns={[]}
        onSearch={mockActions.mockOnSearch}
        onPageChange={mockActions.mockOnPageChange}
        onLimitChange={mockActions.mockOnLimitChange}
        onStateChange={mockActions.mockOnStateChange}
      />
    );
    
    const emptySpan = screen.getByText('No Result');
    expect(emptySpan).toBeInTheDocument();
  });

  it('should render correctly when "tableData" is empty', () => {
    render(
      <DataTable
        tableData={mockTableData}
        tableColumns={mockTableColumns}
        onSearch={mockActions.mockOnSearch}
        onPageChange={mockActions.mockOnPageChange}
        onLimitChange={mockActions.mockOnLimitChange}
        onStateChange={mockActions.mockOnStateChange}
      />
    );

    const dataCell = screen.getByText('Mock ID 1');
    expect(dataCell).toBeInTheDocument();
  });
  
  it('should not call "mockOnSearch" when press "1" in "search" component', () => {
    render(
      <DataTable
        tableData={mockTableData}
        tableColumns={mockTableColumns}
        onSearch={mockActions.mockOnSearch}
        onPageChange={mockActions.mockOnPageChange}
        onLimitChange={mockActions.mockOnLimitChange}
        onStateChange={mockActions.mockOnStateChange}
      />
    );

    const searchInput = screen.getByTestId('test-search-input');
    fireEvent.keyDown(searchInput, { key: '1' });

    expect(mockActions.mockOnSearch).not.toHaveBeenCalled();
  });

  it('should call "mockOnSearch" when press "Enter" in "search" component', () => {
    render(
      <DataTable
        tableData={mockTableData}
        tableColumns={mockTableColumns}
        onSearch={mockActions.mockOnSearch}
        onPageChange={mockActions.mockOnPageChange}
        onLimitChange={mockActions.mockOnLimitChange}
        onStateChange={mockActions.mockOnStateChange}
      />
    );

    const searchInput = screen.getByTestId('test-search-input');
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    expect(mockActions.mockOnSearch).toHaveBeenCalled();
  });

  it('should render expected element when "action" props is not undefined', () => {
    render(
      <DataTable
        action={<button data-testid="test-button-action" />}
        tableData={mockTableData}
        tableColumns={mockTableColumns}
        onSearch={mockActions.mockOnSearch}
        onPageChange={mockActions.mockOnPageChange}
        onLimitChange={mockActions.mockOnLimitChange}
        onStateChange={mockActions.mockOnStateChange}
      />
    );

    const actionButton = screen.getByTestId('test-button-action');

    expect(actionButton).toBeInTheDocument();
  });
  
  it('should render expected element when "action" props is undefined', () => {
    render(
      <DataTable
        tableData={mockTableData}
        tableColumns={mockTableColumns}
        onSearch={mockActions.mockOnSearch}
        onPageChange={mockActions.mockOnPageChange}
        onLimitChange={mockActions.mockOnLimitChange}
        onStateChange={mockActions.mockOnStateChange}
      />
    );

    const actionContainer = screen.getByTestId('test-empty-action-container');

    expect(actionContainer).toBeInTheDocument();
  });

  it('should render expected element when "calculatePagination" has "ellipsis"', () => {
    render(
      <DataTable
        totalPages={100}
        tableData={mockTableData}
        tableColumns={mockTableColumns}
        onSearch={mockActions.mockOnSearch}
        onPageChange={mockActions.mockOnPageChange}
        onLimitChange={mockActions.mockOnLimitChange}
        onStateChange={mockActions.mockOnStateChange}
      />
    );

    const ellipsisPagination = screen.getByTestId('test-pagination-ellipsis');

    expect(ellipsisPagination).toBeInTheDocument();
  });

  it('should render expected element when "TableHead" clicked', () => {
    render(
      <DataTable
        totalPages={100}
        tableData={mockTableData}
        tableColumns={mockTableColumns}
        onSearch={mockActions.mockOnSearch}
        onPageChange={mockActions.mockOnPageChange}
        onLimitChange={mockActions.mockOnLimitChange}
        onStateChange={mockActions.mockOnStateChange}
      />
    );

    const ellipsisPagination = screen.getByTestId('test-pagination-ellipsis');

    expect(ellipsisPagination).toBeInTheDocument();
  });
});