import React, { useEffect, useState } from 'react';

const useCanva = (forceInit) => {
  const [apiCanva, setApiCanva] = useState(undefined);

  const removeLastScript = () => {
    const canvaLayer = document.querySelector('._6cWMPA');
    if (canvaLayer) {
      document.body.removeChild(canvaLayer);
    }
    const linkCss = document.querySelector(
      '[href="https://sdk.canva.com/designbutton/v2/api.css"]'
    );
    if (linkCss) {
      document.body.removeChild(linkCss);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.canva.com/designbutton/v2/api.js';
    script.onload = async function () {
      // API initialization
      if (window.Canva && window.Canva.DesignButton) {
        const api = await window.Canva.DesignButton.initialize({
          apiKey: process.env.REACT_APP_CANVA_KEY,
        });
        setApiCanva(api);
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      removeLastScript();
    };
  }, [forceInit]);
  return { apiCanva, setApiCanva };
};

export default useCanva;
