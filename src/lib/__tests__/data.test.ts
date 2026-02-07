import { describe, it, expect } from 'vitest';
import * as codingContent from '../codingContent';
import * as softSkillsContent from '../softSkillsContent';

describe('data constants', () => {
    it('should load coding content', () => {
        expect(codingContent).toBeDefined();
    });

    it('should load soft skills content', () => {
        expect(softSkillsContent).toBeDefined();
    });
});
