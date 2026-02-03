// src/services/chatService.ts

export const sendMessageToBot = async (message: string): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate network delay (1 second)
      setTimeout(() => {
        const lowerMsg = message.toLowerCase();
        
        // Simple Logic for immediate responses
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
          resolve("Hello! I'm your urCV AI assistant. Ready to polish your resume?");
        } else if (lowerMsg.includes('resume') || lowerMsg.includes('cv')) {
          resolve("I can help with that! Are you looking for formatting tips or content improvement?");
        } else if (lowerMsg.includes('help')) {
          resolve("Sure! I can assist with resume writing, cover letters, and interview prep.");
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('support')) {
          resolve("You can reach our human support team at support@urcv.ai.");
        } else {
          resolve("That's interesting! Tell me more about your career goals so I can help better.");
        }
      }, 1000);
    });
  };