export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        portfolio: string;
        summary: string;
        photoUrl: string;
    };
    education: Array<{
        id: string;
        degree: string;
        school: string;
        location: string;
        graduationDate: string;
        gpa?: string;
    }>;
    experience: Array<{
        id: string;
        title: string;
        company: string;
        location: string;
        startDate: string;
        endDate: string;
        current: boolean;
        description: string;
    }>;
    skills: {
        technical: string[];
        languages: string[];
        certifications: string[];
    };
    hobbies?: string[];
    codingProfiles: {
        github?: string;
        leetcode?: string;
        hackerrank?: string;
        codeforces?: string;
        kaggle?: string;
        codechef?: string;
    };
}
