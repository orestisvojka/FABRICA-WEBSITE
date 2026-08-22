import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Sub-component dedicated to the matrix code scramble effect
const CodeTextReveal = ({ targetText }) => {
  const [displayText, setDisplayText] = useState("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!<>{}[]";

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(() =>
          targetText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return targetText[index];
              }
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("")
        );

        if (iteration >= targetText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 40);
    }, 200);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [targetText]);

  return (
    <span
      style={{
        fontSize: "clamp(48px, 8vw, 76px)",
        fontWeight: 800,
        letterSpacing: "-0.05em",
        color: "#ffffff",
        fontFamily: "var(--font-display, sans-serif)",
        display: "inline-block",
        lineHeight: 1,
      }}
    >
      {displayText || Array(targetText.length).fill("0").join("")}
    </span>
  );
};

export default function QuolyTechPreloader({ pathname, onComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING_CORE");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    const duration = 2000;
    const intervalTime = 25;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(
        Math.round((currentStep / totalSteps) * 100),
        100
      );
      setProgress(currentProgress);

      if (currentProgress < 25) setStatusText("INITIALIZING_CORE");
      else if (currentProgress < 55) setStatusText("FETCHING_ASSETS");
      else if (currentProgress < 85) setStatusText("DECODING_UI");
      else setStatusText("SYSTEM_READY");

      if (currentStep >= totalSteps) {
        clearInterval(progressInterval);
      }
    }, intervalTime);

    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onComplete) onComplete();
    }, duration + 300);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [pathname]);

  const wipeMaskTransition = {
    initial: { y: 0 },
    exit: {
      y: "-100vh",
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const accessibleFadeTransition = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: "linear" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key={`preloader-${pathname}`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#09090b",
            color: "#ffffff",
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 32px",
            pointerEvents: "all",
            userSelect: "none",
          }}
          variants={shouldReduceMotion ? accessibleFadeTransition : wipeMaskTransition}
          initial="initial"
          exit="exit"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          {/* Main Container */}
          <div
            style={{
              width: "100%",
              maxWidth: "440px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
            aria-hidden="true"
          >
            {/* The Brand Reveal */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              style={{ overflow: "hidden", paddingBottom: "8px", textAlign: "center" }}
            >
              <CodeTextReveal targetText="QuolyTech" />
            </motion.div>

            {/* The Progress Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                paddingTop: "14px",
                fontFamily: "monospace, sans-serif",
                fontSize: "12px",
                color: "#a1a1aa",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="preloader-dot"></span>
                {statusText}...
              </span>
              <span style={{ fontWeight: 700, color: "#ffffff" }}>{progress}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
