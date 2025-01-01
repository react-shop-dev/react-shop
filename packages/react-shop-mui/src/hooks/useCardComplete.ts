import { useEffect, useRef } from 'react';
import { eventEmitter } from 'react-shop';

type Fields = Record<string, boolean>;

const emptyObject = {};

export const useCardComplete = (elementType?: string) => {
  const fieldsRef = useRef<Fields>(emptyObject);

  if (elementType) {
    fieldsRef.current[elementType] = false;
  }

  useEffect(() => {
    const handleComplete = (elementType: string) => {
      if (fieldsRef.current[elementType] !== undefined) {
        fieldsRef.current[elementType] = true;
      }
      if (Object.values(fieldsRef.current).every(Boolean)) {
        eventEmitter.emit('cardComplete');
      }
    };
    eventEmitter.on('elementComplete', handleComplete);

    return () => {
      eventEmitter.off('elementComplete', handleComplete);
    };
  }, [fieldsRef.current]);

  const completeCardInput = (elementType: string) => {
    if (fieldsRef.current[elementType] !== undefined) {
      eventEmitter.emit('elementComplete', elementType);
    }
  };

  return completeCardInput;
};
