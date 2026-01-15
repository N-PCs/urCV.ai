import { ResumeData } from '@/pages/Builder';

interface TemplateProps {
    data: ResumeData;
}

const ModernTemplate = ({ data }: TemplateProps) => {
    return (
        <div className="bg-white p-8 h-full min-h-[1000px] font-sans text-gray-800">
            <header className="border-b-4 border-blue-600 pb-6 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900">
                    {data.personalInfo.fullName || "Your Name"}
                </h1>
                <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium text-gray-600">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
                    {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                </div>
            </header>

            {data.personalInfo.summary && (
                <section className="mb-8">
                    <p className="text-gray-700 leading-relaxed text-lg">
                        {data.personalInfo.summary}
                    </p>
                </section>
            )}

            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-8">
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-blue-600 mb-4 uppercase tracking-wide">Experience</h2>
                            <div className="space-y-6">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                                        <div className="flex justify-between items-center text-gray-600 mb-2">
                                            <span className="font-semibold">{exp.company}</span>
                                            <span className="text-sm">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                                        </div>
                                        {exp.description && <p className="text-gray-700">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-blue-600 mb-4 uppercase tracking-wide">Education</h2>
                            <div className="space-y-4">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="text-lg font-bold text-gray-900">{edu.school}</h3>
                                        <div className="flex justify-between text-gray-600">
                                            <span>{edu.degree}</span>
                                            <span>{edu.graduationDate}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-1 space-y-8 border-l border-gray-100 pl-8">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.technical.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    {(data.codingProfiles?.github || data.codingProfiles?.leetcode || data.codingProfiles?.hackerrank || data.codingProfiles?.codeforces || data.codingProfiles?.kaggle) && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase">Coding Profiles</h2>
                            <ul className="space-y-2">
                                {Object.entries(data.codingProfiles || {}).map(([platform, url]) => {
                                    if (!url) return null;
                                    const link = url.startsWith('http') ? url : `https://${url}`;
                                    return (
                                        <li key={platform} className="text-gray-700 flex flex-col">
                                            <span className="font-semibold text-sm capitalize">{platform}</span>
                                            <a 
                                                href={link}
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="text-blue-600 text-xs hover:underline break-all"
                                            >
                                                {url.replace(/^https?:\/\//, '')}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    )}

                    {data.skills.languages.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase">Languages</h2>
                            <ul className="space-y-2">
                                {data.skills.languages.map((lang, index) => (
                                    <li key={index} className="text-gray-700">{lang}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.skills.certifications.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase">Certifications</h2>
                            <ul className="space-y-2">
                                {data.skills.certifications.map((cert, index) => (
                                    <li key={index} className="text-gray-700 text-sm">{cert}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;
