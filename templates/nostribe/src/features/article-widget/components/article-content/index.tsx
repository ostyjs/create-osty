import { Badge } from '@/shared/components/ui/badge';
import { NDKEvent } from '@nostr-dev-kit/ndk';

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export const ArticleContent = ({ event }: { event: NDKEvent }) => {
  const titleTag = event.tags.find((tag) => tag[0] === 'title');
  const title = titleTag ? titleTag[1] : 'Untitled';
  const summaryTag = event.tags.find((tag) => tag[0] === 'summary');
  const summary = summaryTag ? summaryTag[1] : undefined;
  const imageTag = event.tags.find((tag) => tag[0] === 'image');
  const image = imageTag ? imageTag[1] : undefined;
  const tags = event.tags.filter((tag) => tag[0] === 't').map((tag) => tag[1]);
  const readingTime = estimateReadingTime(event.content);

  return (
    <div className="flex flex-row gap-4 w-full">
      <div className="flex flex-col flex-1 min-w-0 justify-center">
        <h3 className="text-2xl font-bold mb-1 line-clamp-2">{title}</h3>
        <div className="text-base text-muted-foreground mb-3 line-clamp-2">
          {summary || event.content.slice(0, 120)}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          <Badge variant="secondary">{readingTime} minute read</Badge>
          {tags.slice(0, 4).map((tag, i) => (
            <Badge key={i} variant="outline">
              {tag}
            </Badge>
          ))}
          {tags.length > 4 && <Badge variant="outline">+ {tags.length - 4}</Badge>}
        </div>
      </div>
      {image && (
        <div className="flex-shrink-0 flex items-center">
          <img src={image} alt="cover" className="w-40 h-32 object-cover rounded-md" />
        </div>
      )}
    </div>
  );
};
