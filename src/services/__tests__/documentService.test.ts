import { describe, it, expect, vi } from 'vitest';
import { generateWordDocument } from '../documentService';
import { ResumeData } from '@/types/resume';

const mockResume: ResumeData = {
    personalInfo: {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        location: "NY",
        linkedin: "",
        portfolio: "",
        summary: "A summary.",
        photoUrl: ""
    },
    experience: [],
    education: [],
    skills: { technical: [], languages: [], certifications: [] },
    codingProfiles: {}
};

describe('documentService', () => {
    it('should generate a Word document blob', async () => {
        // We mock URL.createObjectURL since it's not in jsdom/node
        global.URL.createObjectURL = vi.fn();

        const blob = await generateWordDocument(mockResume);
        expect(blob).toBeDefined();
        expect(blob.type).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    });
});
