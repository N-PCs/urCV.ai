import { useEffect, useState } from 'react';
import { Users, Quote } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { fetchReviews, Review } from '@/lib/api';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const TestimonialsSection = ({ refreshTrigger }: { refreshTrigger?: number }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadReviews = async () => {
            setLoading(true);
            const data = await fetchReviews();
            setReviews(data);
            setLoading(false);
        };
        loadReviews();
    }, [refreshTrigger]);

    return (
        <section className="py-24 bg-slate-50 dark:bg-[#030a1c] transition-colors duration-300">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Loved by Professionals</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-16">Join thousands of job seekers who found their dream role using urCV.ai</p>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="mx-auto max-w-6xl px-4">
                        {reviews.length > 0 ? (
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-2 md:-ml-4">
                                    {reviews.map((review) => (
                                        <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1 h-full">
                                                <Card
                                                    className="h-full p-8 rounded-2xl border-slate-200 dark:border-gray-800 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center bg-white dark:bg-gray-900"
                                                >
                                                    <div className="mb-6 relative">
                                                        <img
                                                            alt={review.name}
                                                            className="w-20 h-20 rounded-full object-cover border-4 border-blue-500/10"
                                                            src={review.avatar}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`;
                                                            }}
                                                        />
                                                        <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 border-2 border-white dark:border-gray-900">
                                                            <Quote className="w-3 h-3 text-white" fill="currentColor" />
                                                        </div>
                                                    </div>

                                                    <p className="text-slate-600 dark:text-slate-400 italic mb-8 leading-relaxed">
                                                        "{review.content}"
                                                    </p>

                                                    <div className="mt-auto">
                                                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">{review.name}</h4>
                                                        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">{review.role}</p>
                                                    </div>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="hidden md:flex -left-12 opacity-50 hover:opacity-100" />
                                <CarouselNext className="hidden md:flex -right-12 opacity-50 hover:opacity-100" />
                            </Carousel>
                        ) : (
                            <div className="text-slate-500">No reviews yet. Be the first to share your story!</div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestimonialsSection;
