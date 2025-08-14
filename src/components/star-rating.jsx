"use client";
import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({
  rating,
  onRatingChange,
  className
}) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className={cn("flex gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="p-1 hover:scale-110 transition-transform"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRatingChange(star)}>
          <Star
            className={cn("w-6 h-6 transition-colors", (hoverRating || rating) >= star
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 hover:text-yellow-400")} />
        </button>
      ))}
    </div>
  );
}
