import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { submitReview } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const ReviewForm = ({
  onReviewSubmitted,
}: {
  onReviewSubmitted?: () => void;
}) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitReview({
        name,
        role: title || "User",
        content: comment,
        rating,
      });

      toast({
        title: "Success!",
        description: "Your review has been submitted.",
      });

      // Reset form
      setName("");
      setTitle("");
      setComment("");
      setRating(5);

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "Failed to submit review. Please ensure the backend server is running.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 dark:bg-gray-950 border-t border-slate-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Share Your Success Story
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-10">
          How has urCV.ai helped your career journey? We'd love to hear from
          you.
        </p>

        <Card className="p-8 md:p-10 border-slate-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-4 text-slate-700 dark:text-slate-300">
                Your Overall Rating
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="group transition-transform hover:scale-110 focus:outline-none"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 dark:text-slate-700"
                      } transition-colors`}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="review-comment"
                className="block text-left text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300 px-1"
              >
                Write your review
              </label>
              <Textarea
                id="review-comment"
                placeholder="Share how urCV.ai helped you land your next role..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full min-h-[120px] bg-slate-50 dark:bg-gray-950 border-slate-200 dark:border-gray-800 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <Input
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 dark:bg-gray-950 border-slate-200 dark:border-gray-800"
                  required
                />
              </div>
              <div>
                <Input
                  placeholder="Job Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-slate-50 dark:bg-gray-950 border-slate-200 dark:border-gray-800"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Submit Review <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewForm;
