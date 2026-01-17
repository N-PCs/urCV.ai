import { ResumeData } from '@/pages/Builder';

interface TemplateProps {
    data: ResumeData;
}

const ProfessionalTemplate = ({ data }: TemplateProps) => {
    return (
        <div className="bg-white p-12 min-h-[1200px] font-serif text-gray-900 max-w-[850px] mx-auto" style={{ overflow: 'visible' }}>
            <div className="text-center border-b-2 border-gray-900 pb-6 mb-8">
                <h1 className="text-3xl font-bold tracking-widest uppercase mb-4">
                    {data.personalInfo.fullName || "Your Name"}
                </h1>
                <div className="flex justify-center flex-wrap gap-6 text-sm">
                    {data.personalInfo.email && (
                        <a href={`mailto:${data.personalInfo.email}`} className="hover:text-blue-600 hover:underline transition-colors">
                            {data.personalInfo.email}
                        </a>
                    )}
                    {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                    {data.personalInfo.linkedin && (
                        <a
                            href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-blue-600 hover:underline transition-colors"
                        >
                            {data.personalInfo.linkedin}
                        </a>
                    )}
                    {data.personalInfo.portfolio && (
                        <a
                            href={data.personalInfo.portfolio.startsWith('http') ? data.personalInfo.portfolio : `https://${data.personalInfo.portfolio}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-blue-600 hover:underline transition-colors"
                        >
                            {data.personalInfo.portfolio}
                        </a>
                    )}
                </div>
            </div>

            {data.personalInfo.summary && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-3 pb-1">Professional Summary</h2>
                    <p className="text-sm leading-relaxed text-justify">
                        {data.personalInfo.summary}
                    </p>
                </section>
            )}

            {data.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-4 pb-1">Work Experience</h2>
                    <div className="space-y-6">
                        {data.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-base">{exp.title}</h3>
                                    <span className="text-sm italic">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-sm font-semibold">{exp.company}</span>
                                    <span className="text-sm">{exp.location}</span>
                                </div>
                                {exp.description && <p className="text-sm text-gray-800 leading-relaxed text-justify">{exp.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-4 pb-1">Education</h2>
                    <div className="space-y-4">
                        {data.education.map((edu) => (
                            <div key={edu.id} className="flex justify-between items-end">
                                <div>
                                    <h3 className="font-bold text-base">{edu.school}</h3>
                                    <p className="text-sm italic">{edu.degree}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm block">{edu.location}</span>
                                    <span className="text-sm block">{edu.graduationDate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-8">
                {(data.skills.technical.length > 0 || data.skills.languages.length > 0) && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-4 pb-1">Skills</h2>
                        <div className="text-sm">
                            {data.skills.technical.length > 0 && (
                                <div className="mb-2">
                                    <span className="font-semibold">Technical: </span>
                                    {data.skills.technical.join(", ")}
                                </div>
                            )}
                            {data.skills.languages.length > 0 && (
                                <div>
                                    <span className="font-semibold">Languages: </span>
                                    {data.skills.languages.join(", ")}
                                </div>
                            )}

                            {(data.hobbies && data.hobbies.length > 0) && (
                                <section>
                                    <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-4 pb-1">Interests</h2>
                                    <p className="text-sm">
                                        {data.hobbies.join(", ")}
                                    </p>
                                </section>
                            )}
                        </div>
                    </section>
                )}

                {data.skills.certifications.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-4 pb-1">Certifications</h2>
                        <ul className="text-sm list-disc pl-4">
                            {data.skills.certifications.map((cert, index) => (
                                <li key={index}>{cert}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            {/* Coding Profiles */}
            {(Object.entries(data.codingProfiles || {}).filter(([_, url]) => url).length > 0) && (
                <section className="mt-8">
                    <h2 className="text-sm font-bold uppercase border-b border-gray-400 mb-4 pb-1">Coding Profiles</h2>
                    <div className="space-y-2 text-sm">
                        {Object.entries(data.codingProfiles || {}).map(([platform, url]) => {
                            if (!url) return null;
                            const link = url.startsWith('http') ? url : `https://${url}`;
                            return (
                                <div key={platform} className="flex justify-between">
                                    <span className="font-semibold">{platform.charAt(0).toUpperCase() + platform.slice(1)}:</span>
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:underline break-all"
                                    >
                                        {url}
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProfessionalTemplate;
