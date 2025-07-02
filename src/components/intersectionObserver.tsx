"use client"
import React, { useEffect, useState, useRef, ElementType, ComponentProps } from "react";

type ScrollEffectProps<T extends ElementType> = {
    as?: T;
    children: React.ReactNode;
    delay?: number;
    threshold?: number;
    className?: string;
} & ComponentProps<T>;

export default function ScrollEffect<T extends ElementType = "div">({
    as: Component = "div",
    children,
    className = "",
    delay = 0,
    threshold = 0.1,
    ...props
}: ScrollEffectProps<T>) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<any>(null); // Using any here to simplify

    useEffect(() => {
        const currentElement = elementRef.current;
        if (!currentElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin: "0px" }
        );

        observer.observe(currentElement);

        return () => observer.unobserve(currentElement);
    }, [threshold]);

    return (
        <Component
            ref={elementRef}
            className={`
        transition-all 
        duration-500 
        ease-out 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        ${className}
      `}
            style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
            {...props}
        >
            {children}
        </Component>
    );
}