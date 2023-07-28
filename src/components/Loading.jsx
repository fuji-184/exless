// components/Loading.jsx

import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-16">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-8 w-8"></div>
    </div>
  );
};

export default Loading;
