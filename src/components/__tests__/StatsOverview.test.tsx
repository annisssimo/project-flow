import { render, screen } from '@testing-library/react';
import { StatsOverview } from '../dashboard/StatsOverview';
import { useProjectStore } from '../../store/useProjectStore';

jest.mock('../../store/useProjectStore');

const mockAnalytics = {
  projectStats: {
    total: 5,
    active: 3,
    completed: 1,
    overdue: 1,
  },
  taskStats: {
    total: 20,
    completed: 8,
    inProgress: 7,
    overdue: 2,
  },
  teamStats: {
    totalMembers: 8,
    activeMembers: 6,
    productivity: 85,
  },
  timeTracking: {
    totalHours: 200,
    thisWeek: 40,
    lastWeek: 35,
    trend: 'up' as const,
  },
};

describe('StatsOverview', () => {
  beforeEach(() => {
    (useProjectStore as jest.Mock).mockReturnValue({
      analytics: mockAnalytics,
    });
  });

  it('renders all stat cards', () => {
    render(<StatsOverview />);
    
    expect(screen.getByText('Active Projects')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
    expect(screen.getByText('Hours This Week')).toBeInTheDocument();
  });

  it('displays correct values', () => {
    render(<StatsOverview />);
    
    expect(screen.getByText('3')).toBeInTheDocument(); // Active projects
    expect(screen.getByText('6')).toBeInTheDocument(); // Active team members
    expect(screen.getByText('8')).toBeInTheDocument(); // Completed tasks
    expect(screen.getByText('40')).toBeInTheDocument(); // Hours this week
  });

  it('shows progress bars', () => {
    render(<StatsOverview />);
    
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars).toHaveLength(4);
  });

  it('renders without analytics', () => {
    (useProjectStore as jest.Mock).mockReturnValue({
      analytics: null,
    });
    
    const { container } = render(<StatsOverview />);
    expect(container.firstChild).toBeNull();
  });
});
