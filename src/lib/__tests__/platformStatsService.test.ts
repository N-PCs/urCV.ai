import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    fetchLeetCodeStats,
    fetchCodeforcesStats,
    getCachedStats,
    setCachedStats,
    getCachedUsernames,
    setCachedUsernames,
} from '../platformStatsService';

// Mock fetch
const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        clear: vi.fn(() => {
            store = {};
        }),
    };
})();
vi.stubGlobal('localStorage', localStorageMock);

describe('platformStatsService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorageMock.clear();
    });

    describe('fetchLeetCodeStats', () => {
        it('should return null for empty username', async () => {
            const result = await fetchLeetCodeStats('');
            expect(result).toBeNull();
        });

        it('should fetch stats successfully', async () => {
            fetchMock
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ username: 'user1', ranking: 100 }),
                }) // Profile
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ solvedProblem: 50, easySolved: 10, mediumSolved: 20, hardSolved: 20 }),
                }); // Solved

            const result = await fetchLeetCodeStats('user1');
            expect(result).toEqual({
                username: 'user1',
                totalSolved: 50,
                easySolved: 10,
                mediumSolved: 20,
                hardSolved: 20,
                acceptanceRate: 0,
                ranking: 100,
                contributionPoints: 0,
                reputation: 0,
            });
        });

        it('should handle API errors', async () => {
            fetchMock.mockResolvedValueOnce({ ok: false });
            await expect(fetchLeetCodeStats('user1')).rejects.toThrow('User not found');
        });
    });

    describe('fetchCodeforcesStats', () => {
        it('should return null for empty handle', async () => {
            const result = await fetchCodeforcesStats('');
            expect(result).toBeNull();
        });

        it('should fetch stats successfully', async () => {
            fetchMock.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    status: 'OK',
                    result: [{ handle: 'user1', rating: 1500, rank: 'specialist' }],
                }),
            });

            const result = await fetchCodeforcesStats('user1');
            expect(result).toMatchObject({
                handle: 'user1',
                rating: 1500,
                rank: 'specialist',
            });
        });
    });

    describe('Cache management', () => {
        it('should set and get cached stats', () => {
            const stats = {
                leetcode: null,
                codeforces: null,
                lastFetched: Date.now(),
                errors: {},
            };
            setCachedStats(stats);
            expect(localStorageMock.setItem).toHaveBeenCalledWith('platform_stats_cache', JSON.stringify(stats));

            const cached = getCachedStats();
            expect(cached).toEqual(stats);
        });

        it('should expire cache after duration', () => {
            const oldStats = {
                leetcode: null,
                codeforces: null,
                lastFetched: Date.now() - 6 * 60 * 1000, // 6 minutes ago
                errors: {},
            };
            localStorageMock.getItem.mockReturnValue(JSON.stringify(oldStats));

            const cached = getCachedStats();
            expect(cached).toBeNull();
        });
    });
});
