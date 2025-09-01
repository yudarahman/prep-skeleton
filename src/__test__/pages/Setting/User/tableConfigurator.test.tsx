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
import { DataTable } from '@/compounds/DataTable';

import { generateColumns } from '@/pages/Setting/User/tableConfigurator';

describe('@/pages/Setting/User/tableConfigurator.tsx', () => {
  const mockOnEdit = vi.fn();
  const mockUpdateStatus = vi.fn();
  const mockData = [
    { id: 'some-id-1', fullname: 'Some Full Name 1', username: 'username_1', email: 'some_email_1@email.com', isActive: false  },
    { id: 'some-id-2', fullname: 'Some Full Name 2', username: 'username_2', email: 'some_email_2@email.com', isActive: false  },
    { id: 'some-id-3', fullname: 'Some Full Name 3', username: 'username_3', email: 'some_email_3@email.com', isActive: false  }
  ];
  
  const TestComponent = (props: { isLoading: boolean }) => {
    const { isLoading } = props;
    const { columns } = generateColumns(
      isLoading,
      mockOnEdit,
      mockUpdateStatus
    );
    
    return (
      <DataTable
        tableColumns={columns}
        tableData={mockData}
        onStateChange={vi.fn()}
        onSearch={vi.fn()}
      />
    );
  };

  it('should render correctly when "isLoading" is true', () => {
    render(<TestComponent isLoading />);

    const loadingActionIcon = screen.getAllByTestId('test-loading-action-column-icon');
    const loadingStatusIcon = screen.getAllByTestId('test-loading-status-column-icon');

    expect(loadingActionIcon[0]).toBeInTheDocument();
    expect(loadingActionIcon[1]).toBeInTheDocument();
    expect(loadingActionIcon[2]).toBeInTheDocument();

    expect(loadingStatusIcon[0]).toBeInTheDocument();
    expect(loadingStatusIcon[1]).toBeInTheDocument();
    expect(loadingStatusIcon[2]).toBeInTheDocument();
  });

  it('should render correctly when "isLoading" is false', () => {
    render(<TestComponent isLoading={false} />);

    const editActionIcon = screen.getAllByTestId('test-edit-column-icon');
    const switchStatus = screen.getAllByTestId('test-update-status-column-switch');

    expect(editActionIcon[0]).toBeInTheDocument();
    expect(editActionIcon[1]).toBeInTheDocument();
    expect(editActionIcon[2]).toBeInTheDocument();

    expect(switchStatus[0]).toBeInTheDocument();
    expect(switchStatus[1]).toBeInTheDocument();
    expect(switchStatus[2]).toBeInTheDocument();
  });

  it('should call expected function when edit icon clicked', () => {
    render(<TestComponent isLoading={false} />);

    const editActionIcon = screen.getAllByTestId('test-edit-column-icon');

    fireEvent.click(editActionIcon[0]);

    expect(mockOnEdit).toHaveBeenCalledWith({ id: 'some-id-1', fullname: 'Some Full Name 1', username: 'username_1', email: 'some_email_1@email.com', isActive: false });
  });

  it('should call expected function when switch status clicked', () => {
    render(<TestComponent isLoading={false} />);

    const switchStatus = screen.getAllByTestId('test-update-status-column-switch');

    fireEvent.click(switchStatus[0]);

    expect(mockUpdateStatus).toHaveBeenCalledWith({ id: 'some-id-1', isActive: true });
  });
});