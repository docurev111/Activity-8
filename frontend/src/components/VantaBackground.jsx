import { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const VantaBackground = ({ children, darkMode }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const effectInstanceRef = useRef(null);

  useEffect(() => {
    // Only initialize if not already initialized
    if (!vantaEffect && vantaRef.current) {
      try {
        const effect = NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: darkMode ? 0x0000f0 : 0x0077ff, // Deep Blue for dark mode, Bright Blue for light mode
          backgroundColor: darkMode ? 0x00001b : 0xf0f2f5,
          points: 10.00,
          maxDistance: 20.00,
          spacing: 15.00
        });
        setVantaEffect(effect);
        effectInstanceRef.current = effect;
      } catch (err) {
        console.error("Failed to init Vanta:", err);
      }
    }

    // Cleanup function
    return () => {
      if (effectInstanceRef.current) {
        effectInstanceRef.current.destroy();
        effectInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Separate effect for handling updates to avoid re-initialization
  useEffect(() => {
    if (vantaEffect) {
      try {
        vantaEffect.setOptions({
          color: darkMode ? 0x0000f0 : 0x0077ff,
          backgroundColor: darkMode ? 0x00001b : 0xf0f2f5
        });
      } catch (error) {
        console.error("Failed to update Vanta options:", error);
      }
    }
  }, [darkMode, vantaEffect]);

  return (
    <div ref={vantaRef} style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export default VantaBackground;