import { describe, it, expect, vi, beforeEach } from 'vitest';
import { parseResumeFile, extractResumeDataFromText } from '../fileParserService';
import mammoth from 'mammoth';

const { extractRawTextMock } = vi.hoisted(() => ({
    extractRawTextMock: vi.fn().mockResolvedValue({ value: 'Extracted DOCX Text' }),
}));

vi.mock('mammoth', () => ({
    default: {
        extractRawText: extractRawTextMock,
    },
    extractRawText: extractRawTextMock,
}));

describe('fileParserService', () => {
    describe('parseResumeFile', () => {
        it('should parse text/plain files', async () => {
            const file = new File(['Hello World'], 'resume.txt', { type: 'text/plain' });
            const result = await parseResumeFile(file);
            expect(result).toBe('Hello World');
        });

        it('should parse application/pdf files (mocked simple extraction)', async () => {
            // In the implementation, PDF is handled same as text for now
            const file = new File(['PDF Content'], 'resume.pdf', { type: 'application/pdf' });
            const result = await parseResumeFile(file);
            expect(result).toBe('PDF Content');
        });

        it.skip('should parse docx files using mammoth', async () => {
            const file = new File(['DOCX Content'], 'resume.docx', {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });


            // Mock handled in factory


            const result = await parseResumeFile(file);
            expect(result).toBe('Extracted DOCX Text');
            expect(extractRawTextMock).toHaveBeenCalled();
        });

        it('should return placeholder for image files', async () => {
            const file = new File(['Image Content'], 'resume.png', { type: 'image/png' });
            const result = await parseResumeFile(file);
            expect(result).toContain('Image file detected');
        });

        it('should throw error for unsupported file types', async () => {
            const file = new File(['Binary'], 'resume.exe', { type: 'application/octet-stream' });
            await expect(parseResumeFile(file)).rejects.toThrow('Unsupported file type');
        });
    });

    describe('extractResumeDataFromText', () => {
        const sampleText = `
      John Doe
      john.doe@example.com
      john.doe@test.co.uk
      (123) 456-7890
      linkedin.com/in/johndoe
      
      Summary: Experienced software engineer.
    `;

        it('should extract simple personal info', async () => {
            const data = await extractResumeDataFromText(sampleText);
            expect(data.personalInfo.fullName).toBe('John Doe');
            expect(data.personalInfo.email).toBe('john.doe@example.com');
            expect(data.personalInfo.phone).toBe('(123) 456-7890');
            expect(data.personalInfo.linkedin).toBe('linkedin.com/in/johndoe');
        });

        it('should handle missing info gracefully', async () => {
            const data = await extractResumeDataFromText('Just a name');
            expect(data.personalInfo.fullName).toBe('Just a name');
            expect(data.personalInfo.email).toBe('');
            expect(data.personalInfo.phone).toBe('');
        });
    });
});
