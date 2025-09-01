const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center border-2 rounded-full">
        <div
          data-testid="test-loading-image"
          className="size-16 bg-gray-500 animate-spin"
        />
      </div>
    </div>
  );
};

export { Loading };