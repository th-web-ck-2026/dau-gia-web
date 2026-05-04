import { useCallback } from 'react';
import { useFeedback } from './useFeedback';

export const useErrorHandler = () => {
  const { notification } = useFeedback();

  const handleError = useCallback((error: Error | unknown, context?: string) => {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);
    
    const message = error instanceof Error ? error.message : 'Có lỗi xảy ra';
    
    notification.error({
      message: 'Lỗi',
      description: message,
      duration: 5,
    });
  }, [notification]);

  return { handleError };
};


