import { describe, it, expect } from 'vitest';
import { personalInfoSchema, experienceSchema, educationSchema } from '../validations';

describe('validations', () => {
    describe('personalInfoSchema', () => {
        it('should validate valid personal info', () => {
            const valid = {
                fullName: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                location: 'City, Country',
                linkedin: 'https://linkedin.com/in/johndoe',
                summary: 'Experienced software engineer with a proven track record of building reliable systems.',
            };
            expect(personalInfoSchema.safeParse(valid).success).toBe(true);
        });

        it('should fail with short summary', () => {
            const invalid = {
                fullName: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                location: 'City',
                summary: 'Too short',
            };
            const result = personalInfoSchema.safeParse(invalid);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('at least 50 characters');
            }
        });
    });

    describe('experienceSchema', () => {
        it('should validate current job without end date', () => {
            const valid = {
                title: 'Engineer',
                company: 'Tech Co',
                location: 'Remote',
                startDate: '2020-01',
                current: true,
                description: 'Working on interesting projects.',
            };
            expect(experienceSchema.safeParse(valid).success).toBe(true);
        });

        it('should require end date if not current', () => {
            const invalid = {
                title: 'Engineer',
                company: 'Tech Co',
                location: 'Remote',
                startDate: '2020-01',
                current: false,
                endDate: '', // invalid
                description: 'Working on interesting projects.',
            };
            const result = experienceSchema.safeParse(invalid);
            expect(result.success).toBe(false);
        });
    });

    describe('educationSchema', () => {
        it('should validate valid education', () => {
            const valid = {
                degree: 'BS CS',
                school: 'University',
                location: 'City',
                graduationDate: '2020',
                gpa: '3.8',
            };
            expect(educationSchema.safeParse(valid).success).toBe(true);
        });
    });
});
