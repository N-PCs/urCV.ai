import { describe, it, expect } from 'vitest';
import { cleanJsonResponse, generateFallbackAnalysis } from '../groqService';

// TODO: Add full integration tests mocking Groq SDK properly.
// Currently mocking Groq via 'groq-sdk' module mock is complex due to ESM/CJS interop.

describe('groqService helpers', () => {
    describe('cleanJsonResponse', () => {
        it('should remove markdown code blocks', () => {
            const input = '```json\n{"score": 80}\n```';
            expect(cleanJsonResponse(input)).toBe('{"score": 80}');
        });

        it('should handle plain backticks', () => {
            const input = '`{"score": 80}`';
            expect(cleanJsonResponse(input)).toBe('{"score": 80}');
        });

        it('should extract JSON from mixed text', () => {
            const input = 'Here is the result: {"score": 80} Hope this helps!';
            expect(cleanJsonResponse(input)).toBe('{"score": 80}');
        });
    });

    describe('generateFallbackAnalysis', () => {
        it('should generate analysis for empty data', () => {
            const emptyData = {};
            const result = generateFallbackAnalysis(emptyData);
            expect(result.score).toBe(50);
            expect(result.improvements).toContain("Missing full name");
        });

        it('should give higher score for data with summary', () => {
            const data = {
                personalInfo: {
                    fullName: "Name",
                    summary: "This is a very long summary that should count towards a higher score definitely."
                }
            };
            const result = generateFallbackAnalysis(data);
            expect(result.score).toBeGreaterThan(50);
            expect(result.strengths).toContain("Contact information is present");
            expect(result.strengths).toContain("Has a professional summary");
        });
    });
});
