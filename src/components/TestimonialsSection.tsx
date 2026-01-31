// src/components/TestimonialsSection.tsx
import { useEffect, useState } from "react";
import { Quote, TrendingUp, Award, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { fetchReviews, Review } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialsSectionProps {
  refreshTrigger?: number;
}

const TestimonialsSection = ({ refreshTrigger }: TestimonialsSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    fiveStarCount: 0,
  });

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      const data = await fetchReviews();
      setReviews(data);
      
      // Calculate stats
      if (data.length > 0) {
        const avgRating = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
        const fiveStars = data.filter(r => r.rating === 5).length;
        setStats({
          totalReviews: data.length,
          averageRating: Math.round(avgRating * 10) / 10,
          fiveStarCount: fiveStars,
        });
      }
      
      setLoading(false);
    };
    loadReviews();
  }, [refreshTrigger]);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/10 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            Trusted by Professionals
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loved by Job Seekers Worldwide
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Join thousands who found their dream role using urCV.ai
          </p>
        </motion.div>

        {/* Stats Cards */}
        {!loading && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            <Card className="p-6 bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalReviews}+
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Total Reviews
              </p>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.averageRating}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Average Rating
              </p>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {Math.round((stats.fiveStarCount / stats.totalReviews) * 100)}%
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                5-Star Reviews
              </p>
            </Card>
          </motion.div>
        )}

        {/* Reviews Carousel */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-900 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
              </div>
            </div>
          </div>
        ) : reviews.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-7xl px-4"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {reviews.map((review, index) => (
                  <CarouselItem
                    key={review.id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-1 h-full"
                    >
                      <Card className="h-full p-8 rounded-2xl border-2 border-slate-200 dark:border-gray-800 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col bg-white dark:bg-gray-900 group relative overflow-hidden">
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10">
                          {/* Quote Icon */}
                          <div className="mb-4 relative">
                            <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" />
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="mb-4 flex items-center justify-between">
                            <StarRating rating={review.rating} readonly size="sm" />
                            {review.rating === 5 && (
                              <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-semibold">
                                Top Rated
                              </span>
                            )}
                          </div>

                          {/* Review Text */}
                          <p className="text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                            "{review.content}"
                          </p>

                          {/* Reviewer Info */}
                          <div className="mt-auto pt-6 border-t border-slate-200 dark:border-gray-800 flex items-center gap-4">
                            <img
                              alt={review.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/20 dark:border-blue-400/20 ring-2 ring-blue-100 dark:ring-blue-900/30"
                              src={review.avatar}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random&size=128`;
                              }}
                            />
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                                {review.name}
                              </h4>
                              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                                {review.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 opacity-50 hover:opacity-100" />
              <CarouselNext className="hidden md:flex -right-12 opacity-50 hover:opacity-100" />
            </Carousel>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Quote className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No reviews yet. Be the first to share your story!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;