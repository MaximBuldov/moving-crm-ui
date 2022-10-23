import { useState } from 'react';
import { useDebounce } from 'use-debounce';

function useDebounceState() {
  const [input, setInput] = useState<string | null>(null);
  const [debInput] = useDebounce(input, 1000);

  return { input: debInput, setInput };
}

export default useDebounceState;