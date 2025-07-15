import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorCircleRef = useRef(null);

  useEffect(() => {
    // Check if device supports hover (desktop)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return; // Don't show cursor on mobile
    }

    const cursorDot = cursorDotRef.current;
    const cursorCircle = cursorCircleRef.current;

    if (!cursorDot || !cursorCircle) return;

    const handleMouseMove = (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorCircle.style.left = `${e.clientX}px`;
      cursorCircle.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      cursorCircle.classList.add('grow');
    };

    const handleMouseLeave = () => {
      cursorCircle.classList.remove('grow');
    };

    // Add event listeners for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor dot"></div>
      <div ref={cursorCircleRef} className="cursor circle"></div>
    </>
  );
};

export default CustomCursor;
