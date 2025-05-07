import { useMemo } from 'react';
import { ReactionEvent } from '../../types';
import { normalizeReactionContent } from '../../utils';

export const useReactionCount = (reactions: ReactionEvent[]) => {
  return useMemo(() => {
    const counts: Record<string, number> = {};

    reactions.forEach((reaction) => {
      const content = normalizeReactionContent(reaction.content);
      counts[content] = (counts[content] || 0) + 1;
    });

    return counts;
  }, [reactions]);
};
