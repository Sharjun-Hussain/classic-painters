import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const topTextRef = useRef<HTMLDivElement>(null);
    const bottomTextRef = useRef<HTMLDivElement>(null);
    const upperCurtainRef = useRef<HTMLDivElement>(null);
    const lowerCurtainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // 1. Setup
            gsap.set(lineRef.current, { scaleX: 0 });
            gsap.set([topTextRef.current, bottomTextRef.current], { yPercent: 100 }); // Start hidden below/above mask

            // Adjust bottom text initial position (it needs to come DOWN from the line)
            gsap.set(bottomTextRef.current, { yPercent: -100 });

            // 2. The Line Draws (The "Horizon")
            tl.to(lineRef.current, {
                scaleX: 1,
                duration: 1.2,
                ease: "expo.out",
                delay: 0.2
            });

            // 3. Text Reveals (emerging from the line)
            tl.to(topTextRef.current, {
                yPercent: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.8")
                .to(bottomTextRef.current, {
                    yPercent: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "<"); // Simultaneous

            // 4. Hold/Pause for readability
            tl.to({}, { duration: 0.5 });

            // 5. The "Split" Exit
            // The line expands or fades, curtains move apart
            tl.to(lineRef.current, {
                scaleX: 0,
                duration: 0.4,
                ease: "power2.in"
            })
                .to(upperCurtainRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut"
                }, "split")
                .to(lowerCurtainRef.current, {
                    yPercent: 100,
                    duration: 1,
                    ease: "power4.inOut"
                }, "split")

                // 6. Cleanup container (hide it so it doesn't block clicks)
                .set(containerRef.current, { display: "none" });

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        >
            {/* Upper Curtain (White Background) */}
            <div
                ref={upperCurtainRef}
                className="absolute top-0 left-0 w-full h-[50%] bg-white flex items-end justify-center overflow-hidden z-10 border-b border-slate-50"
            >
                {/* Mask Container for Text */}
                <div className="overflow-hidden pb-4 px-4">
                    <h1 ref={topTextRef} className="text-4xl md:text-7xl font-bold tracking-tight text-slate-900 uppercase">
                        Classic
                    </h1>
                </div>
            </div>

            {/* The Horizon Line (Painter's Tape/Level) */}
            <div
                ref={lineRef}
                className="absolute top-1/2 left-0 w-full h-[2px] bg-blue-600 z-20 origin-center"
            />

            {/* Lower Curtain (White Background) */}
            <div
                ref={lowerCurtainRef}
                className="absolute bottom-0 left-0 w-full h-[50%] bg-white flex items-start justify-center overflow-hidden z-10 border-t border-slate-50"
            >
                {/* Mask Container for Text */}
                <div className="overflow-hidden pt-4 px-4">
                    <h1 ref={bottomTextRef} className="text-4xl md:text-7xl font-bold tracking-tight text-slate-900 uppercase">
                        Painters
                    </h1>
                </div>
            </div>
        </div>
    );
};