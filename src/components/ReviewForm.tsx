// src/components/ReviewForm.tsx
import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { submitReview } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewFormProps {
  onReviewSubmitted?: () => void;
}

const ReviewForm = ({ onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !comment) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and review.",
        variant: "destructive",
      });
      return;
    }

    if (comment.length < 10) {
      toast({
        title: "Review Too Short",
        description: "Please write at least 10 characters.",
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

      setShowSuccess(true);
      
      // Reset form after short delay
      setTimeout(() => {
        setName("");
        setTitle("");
        setComment("");
        setRating(5);
        setShowSuccess(false);
        
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      }, 2000);

      toast({
        title: "Thank You!",
        description: "Your review has been submitted successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission Failed",
        description:
          "We couldn't submit your review. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 dark:bg-gray-950 border-t border-slate-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Share Your Success Story
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            How has urCV.ai helped your career journey? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 border-2 border-slate-200 dark:border-gray-800 shadow-2xl bg-white dark:bg-gray-900 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 -z-10" />
            
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-green-500 mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Your review has been submitted successfully.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Rating Section */}
                  <div className="text-center">
                    <label className="block text-sm font-semibold mb-4 text-slate-700 dark:text-slate-300">
                      Rate Your Experience
                    </label>
                    <div className="flex items-center justify-center">
                      <StarRating
                        rating={rating}
                        onRatingChange={setRating}
                        size="lg"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {rating === 5 && "Excellent! ⭐"}
                      {rating === 4 && "Very Good! 👍"}
                      {rating === 3 && "Good 😊"}
                      {rating === 2 && "Fair 🤔"}
                      {rating === 1 && "Needs Improvement 💭"}
                    </p>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label
                      htmlFor="review-comment"
                      className="block text-left text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300"
                    >
                      Your Review *
                    </label>
                    <Textarea
                      id="review-comment"
                      placeholder="Share your experience with urCV.ai... What did you like? How did it help you?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full min-h-[140px] bg-slate-50 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 resize-none"
                      required
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Minimum 10 characters
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {comment.length}/500
                      </p>
                    </div>
                  </div>

                  {/* Name and Title */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                        Your Name *
                      </label>
                      <Input
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-slate-50 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                        Job Title (Optional)
                      </label>
                      <Input
                        placeholder="Software Engineer"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-slate-50 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Review
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Privacy Note */}
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                    By submitting, you agree to display your review publicly on our website.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewForm;