import React from 'react';

// Hook
function useWindowSize() {

  let resizeID;

  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = React.useState(getSize);

  React.useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      
      clearTimeout(resizeID);

      resizeID = setTimeout(() => {
        setWindowSize(getSize());  
      }, 150)
      
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize