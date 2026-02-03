// Platform Stats Service
// Handles API calls to LeetCode and Codeforces

export interface LeetCodeStats {
    username: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    acceptanceRate: number;
    ranking: number;
    contributionPoints: number;
    reputation: number;
}

export interface CodeforcesStats {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    contribution: number;
    friendOfCount: number;
    avatar: string;
}

export interface PlatformStats {
    leetcode: LeetCodeStats | null;
    codeforces: CodeforcesStats | null;
    lastFetched: number;
    errors: {
        leetcode?: string;
        codeforces?: string;
    };
}

const CACHE_KEY = "platform_stats_cache";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// LeetCode API via alfa-leetcode-api
export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
    if (!username.trim()) return null;

    try {
        // Fetch basic profile info
        const profileResponse = await fetch(
            `https://alfa-leetcode-api.onrender.com/${username.trim()}`
        );

        if (!profileResponse.ok) {
            throw new Error(`User not found: ${username}`);
        }

        const profileData = await profileResponse.json();

        // Check if user exists
        if (profileData.errors || !profileData.username) {
            throw new Error("Invalid username or no data available");
        }

        // Fetch solved problems data
        const solvedResponse = await fetch(
            `https://alfa-leetcode-api.onrender.com/${username.trim()}/solved`
        );

        if (!solvedResponse.ok) {
            throw new Error("Failed to fetch solved problems data");
        }

        const solvedData = await solvedResponse.json();

        // Check if solved data is valid
        if (solvedData.errors) {
            throw new Error("Invalid username or no data available");
        }

        return {
            username: profileData.username || username.trim(),
            totalSolved: solvedData.solvedProblem || 0,
            easySolved: solvedData.easySolved || 0,
            mediumSolved: solvedData.mediumSolved || 0,
            hardSolved: solvedData.hardSolved || 0,
            acceptanceRate: profileData.acceptanceRate || 0,
            ranking: profileData.ranking || 0,
            contributionPoints: profileData.contributionPoint || 0,
            reputation: profileData.reputation || 0,
        };
    } catch (error) {
        console.error("LeetCode API error:", error);
        throw error;
    }
}

// Codeforces Official API
export async function fetchCodeforcesStats(handle: string): Promise<CodeforcesStats | null> {
    if (!handle.trim()) return null;

    try {
        const response = await fetch(
            `https://codeforces.com/api/user.info?handles=${handle.trim()}`
        );

        if (!response.ok) {
            throw new Error(`User not found: ${handle}`);
        }

        const data = await response.json();

        if (data.status !== "OK" || !data.result || data.result.length === 0) {
            throw new Error("Invalid handle or no data available");
        }

        const user = data.result[0];

        return {
            handle: user.handle,
            rating: user.rating || 0,
            maxRating: user.maxRating || 0,
            rank: user.rank || "unrated",
            maxRank: user.maxRank || "unrated",
            contribution: user.contribution || 0,
            friendOfCount: user.friendOfCount || 0,
            avatar: user.avatar || user.titlePhoto || "",
        };
    } catch (error) {
        console.error("Codeforces API error:", error);
        throw error;
    }
}

// Cache management
export function getCachedStats(): PlatformStats | null {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const stats: PlatformStats = JSON.parse(cached);
        const now = Date.now();

        // Check if cache is still valid
        if (now - stats.lastFetched < CACHE_DURATION) {
            return stats;
        }

        return null;
    } catch {
        return null;
    }
}

export function setCachedStats(stats: PlatformStats): void {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error("Failed to cache stats:", error);
    }
}

export function getCachedUsernames(): { leetcode: string; codeforces: string } {
    try {
        const leetcode = localStorage.getItem("leetcode_username") || "";
        const codeforces = localStorage.getItem("codeforces_handle") || "";
        return { leetcode, codeforces };
    } catch {
        return { leetcode: "", codeforces: "" };
    }
}

export function setCachedUsernames(leetcode: string, codeforces: string): void {
    try {
        localStorage.setItem("leetcode_username", leetcode);
        localStorage.setItem("codeforces_handle", codeforces);
    } catch (error) {
        console.error("Failed to cache usernames:", error);
    }
}

// Get Codeforces rank color
export function getCodeforcesRankColor(rank: string): string {
    const rankColors: Record<string, string> = {
        "newbie": "#808080",
        "pupil": "#008000",
        "specialist": "#03a89e",
        "expert": "#0000ff",
        "candidate master": "#aa00aa",
        "master": "#ff8c00",
        "international master": "#ff8c00",
        "grandmaster": "#ff0000",
        "international grandmaster": "#ff0000",
        "legendary grandmaster": "#ff0000",
    };

    return rankColors[rank.toLowerCase()] || "#808080";
}

// Get difficulty color for charts
export function getDifficultyColor(difficulty: string): string {
    const colors: Record<string, string> = {
        easy: "#00b8a3",
        medium: "#ffc01e",
        hard: "#ff375f",
    };

    return colors[difficulty.toLowerCase()] || "#808080";
}
