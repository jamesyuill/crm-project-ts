import Project from '@/types/Project';
import React from 'react';

type Props = {
  cardContents: Project;
};

export default function MiniImageDisplay({ cardContents }: Props) {
  if (
    Array.isArray(cardContents.projectImages) &&
    cardContents.projectImages.length > 0
  ) {
    return (
      <div className="flex flex-row gap-1">
        {cardContents.projectImages?.map((image) => {
          return (
            <div key={image}>
              <img src={image} width={100} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <p>add an image</p>;
  }
}
