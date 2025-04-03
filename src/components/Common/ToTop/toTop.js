import React, { useState } from 'react';
import "./style.css";

const useScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Function to scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Function to handle scroll position and button visibility
    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Add scroll event listener when component mounts
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        isVisible,
        scrollToTop
    };
};

const ToTop = () => {
    const { isVisible, scrollToTop } = useScrollToTop();

    return (
        <div className='toTop'>
             
                <button className="button" onClick={scrollToTop}>
                    <svg className="svgIcon" viewBox="0 0 384 512">
                <path
                d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                ></path>
            </svg>
                </button>
        </div>
    );
};

export default ToTop;
