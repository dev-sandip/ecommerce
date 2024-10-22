import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
}

export const StarRating = ({ rating }: StarRatingProps) => (
  <div className="flex items-center space-x-2">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-current text-yellow-400' : 'text-gray-300'
          }`}
      />
    ))}
    <span className="text-gray-600">({rating})</span>
  </div>
);