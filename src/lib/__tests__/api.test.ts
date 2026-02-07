import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchReviews, submitReview } from '../api';

describe('api', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    describe('fetchReviews', () => {
        it('should fetch reviews successfully', async () => {
            const mockReviews = [{ id: 1, name: 'John' }];
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => mockReviews
            } as Response);

            const result = await fetchReviews();
            expect(result).toEqual(mockReviews);
        });

        it('should return empty array on failure', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false
            } as Response);

            const result = await fetchReviews();
            expect(result).toEqual([]);
        });

        it('should return empty array on network error', async () => {
            vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

            const result = await fetchReviews();
            expect(result).toEqual([]);
        });
    });

    describe('submitReview', () => {
        it('should submit review successfully', async () => {
            const mockResponse = { success: true };
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            } as Response);

            const result = await submitReview({ name: 'John', role: 'Dev', content: 'Good', rating: 5 });
            expect(result).toEqual(mockResponse);
        });

        it('should throw error on failure', async () => {
            vi.mocked(fetch).mockResolvedValueOnce({
                ok: false
            } as Response);

            await expect(submitReview({ name: 'John', role: 'Dev', content: 'Good', rating: 5 }))
                .rejects.toThrow('Failed to submit review');
        });
    });
});
