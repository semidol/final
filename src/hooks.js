import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}

function useBlockWidth(nameClass) {
  const [blockWidth, setBlockWidth] = useState(0);

  useEffect(() => {
    let elem = document.getElementsByClassName(nameClass)[0];

    function handleResize() {
      setBlockWidth(elem?.offsetWidth);
    }

    setBlockWidth(elem?.offsetWidth)

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return blockWidth;
}

export {useWindowWidth, useBlockWidth}