const LoadingScreen = () => {
  const size = 100;
  return (
    <>
      <div className="border border-purple-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div
            style={{ width: `${size}px`, height: `${size}px` }}
            className="animate-spin"
          >
            <div
              className="h-full w-full border-2 border-t-purple-500 border-b-purple-700 rounded-[50%]"
            ></div>
          </div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-purple-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-purple-700 rounded col-span-1"></div>
                <div className="h-2 bg-purple-700 rounded col-span-2"></div>
              </div>
              <div className="h-2 bg-purple-700 rounded"></div>
              <div className="h-2 bg-purple-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
