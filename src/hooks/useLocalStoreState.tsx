import { useEffect, useState } from 'react'

export function useLocalStoreState<Movie>(initialState: Movie, key: string): [Movie, React.Dispatch<React.SetStateAction<Movie>>] {
    const [value, setValue] = useState<Movie>(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
  }
  
