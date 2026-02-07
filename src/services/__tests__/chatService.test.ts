import { describe, it, expect, vi } from 'vitest';
import { sendMessageToBot } from '../chatService';

describe('chatService', () => {
    // Because of the timeout, we use fake timers or just wait. 
    // Since it's 1 second, waiting is okay but fake timers are better.

    it('should respond to hello', async () => {
        const response = await sendMessageToBot('Hello there');
        expect(response).toContain("urCV AI assistant");
    });

    it('should respond to resume queries', async () => {
        const response = await sendMessageToBot('I need resume help');
        expect(response).toContain("formatting tips");
    });

    it('should respond to help queries', async () => {
        const response = await sendMessageToBot('help me');
        expect(response).toContain("resume writing");
    });

    it('should provide contact info', async () => {
        const response = await sendMessageToBot('contact support');
        expect(response).toContain("support@urcv.ai");
    });

    it('should default response for unknown queries', async () => {
        const response = await sendMessageToBot('random text');
        expect(response).toContain("career goals");
    });
});
