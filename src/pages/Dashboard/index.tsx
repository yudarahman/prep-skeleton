import { withPresenter } from './Presenter';

const Dashboard = withPresenter(() => {
    
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <img
        src="/assets/images/undraw_under_construction.svg"
        alt="dashboard-placeholder-image"
        className="w-56"
      />
      <span className="mt-5">
        Coming Soon...
      </span>
    </div>
  );
});

export default Dashboard;