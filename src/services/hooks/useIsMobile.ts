"use client";
import { useEffect, useState } from "react";

interface IUseIsMobileOptions {
  breakpoint?: number;
  debounceMS?: number;
}

interface IUseIsMobileReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

export function useIsMobile(
  options: IUseIsMobileOptions = {}
): IUseIsMobileReturn {
  const { breakpoint = 768, debounceMS = 100 } = options;
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, debounceMS);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutID);
    };
  }, [debounceMS]);

  const isMobile = dimensions.width < breakpoint;
  const isTablet = dimensions.width >= breakpoint && dimensions.width < 1024;
  const isDesktop = dimensions.width >= 1024;

  return {
    isMobile,
    isTablet,
    isDesktop,
    width: dimensions.width,
    height: dimensions.height,
  };
}
