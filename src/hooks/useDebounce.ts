/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

export default <T>(
  value: any,
  delay: number,
): [debouncedValue: T, handler: NodeJS.Timeout] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [handler, setHandler] = useState<any | null>(null);

  useEffect(() => {
    if (handler) {
      clearTimeout(handler);
    }

    setHandler(
      setTimeout(() => {
        setDebouncedValue(value);
      }, delay),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return [debouncedValue, handler];
};
