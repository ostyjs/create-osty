import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Chunk } from '../types';
import { parseChunks } from '../utils';

export const useNoteContent = (content: string) => {
  const [chunks, setChunks] = useState<Chunk[]>([]);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    setChunks(parseChunks(content));
  }, [content]);

  return { chunks, ref, inView };
};
