"use client";

import { useInView } from "@/lib/useInView";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideInRight" | "slideInLeft" | "scaleIn";
  delay?: number;
}

export default function AnimatedSection({ 
  children, 
  className = "", 
  animation = "fadeIn",
  delay = 0
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-800 ${
        inView
          ? `animate-${animation} opacity-100`
          : "opacity-0 translate-y-8"
      }`}
      style={{
        animationDelay: inView ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}