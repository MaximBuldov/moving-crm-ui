import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export function useDebounceState() {
  const [input, setInput] = useState<string | null>(null);
  const [debInput] = useDebounce(input, 1000);

  return { input: debInput, setInput };
}
