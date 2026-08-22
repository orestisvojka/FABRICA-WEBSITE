import React from "react";
import { motion } from "framer-motion";

export function FloatingPaths({ position = 1 }) {
  const paths = Array.from({ length: 20 }, (_, i) => {
    const shift = i * 18 * position;
    const yStep = i * 22;
    return {
      id: i,
      d: `M -100 ${40 + yStep} C ${250 + shift} ${-50 + yStep}, ${550 - shift} ${280 + yStep}, ${1100} ${130 + yStep}`,
      width: 0.8 + i * 0.04,
      dashArray: `${180 + i * 12} ${240 + i * 16}`,
      duration: 16 + (i % 5) * 3,
    };
  });

  return (
    <div className="floating-paths-wrapper">
      <svg
        className="floating-paths-svg"
        viewBox="0 0 1000 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Floating Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#ffffff"
            strokeWidth={path.width}
            strokeDasharray={path.dashArray}
            strokeOpacity={0.06 + path.id * 0.012}
            animate={{
              strokeDashoffset: [0, -800],
              opacity: [0.25, 0.6, 0.25],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default FloatingPaths;
