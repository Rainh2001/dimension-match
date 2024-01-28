import { useLayoutEffect, useState } from "react";

function useSize(element: Element | null | undefined) {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    let resizeObserver: ResizeObserver | undefined;

    if (element) {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      resizeObserver = new ResizeObserver((entries) => {
        setSize({
          width: entries[0].contentRect.width,
          height: entries[0].contentRect.height,
        });
      });

      resizeObserver.observe(element);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [element]);

  return size;
}

export default useSize;
