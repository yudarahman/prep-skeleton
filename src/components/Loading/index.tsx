const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center border-2 rounded-full">
        <img
          data-testid="test-loading-image"
          src="/assets/images/icon_gik_without_words.svg"
          className="w-16 animate-spin"
        />
      </div>
    </div>
  );
};

export { Loading };