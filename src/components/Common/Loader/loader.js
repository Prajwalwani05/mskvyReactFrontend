import React, { useEffect, useState } from 'react'
const Loader = () => {
  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    const body = document.querySelector('body');
    if (loader) {
      body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      body.style.overflow = 'auto'; // Enable scrolling
    }
  
    // Cleanup function to reset overflow when component unmounts
    return () => {
      body.style.overflow = 'auto';
    };
  }, [loader]);
  
  return (
    <div className='loadingDiv'>
<div class="loader l1"></div>
<div class="loader l2"></div>
<div class="loader l3"></div>
<div class="loader l4"></div>
<div class="loader l5"></div>
<div class="loader l6"></div>
<div class="loader l7"></div>

    </div>
    
  )
}

export default Loader;