import { ResumeData } from "@/pages/Builder";

interface TemplateProps {
  data: ResumeData;
}

const MinimalistTemplate = ({ data }: TemplateProps) => {
  return (
    <div
      className="bg-white min-h-[1200px] p-12 font-sans"
      style={{ overflow: "visible" }}
    >
      {/* Header - Clean and Simple */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-2">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>•</span>}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
        {data.personalInfo.linkedin && (
          <div className="text-sm text-gray-500 mt-1">
            {data.personalInfo.linkedin}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed text-justify">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6 font-medium">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {exp.company} • {exp.location}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6 font-medium">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{edu.school}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {edu.graduationDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{edu.degree}</p>
                {edu.gpa && (
                  <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 ||
        data.skills.languages.length > 0) && (
        <div className="mb-10">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6 font-medium">
            Skills
          </h2>
          <div className="space-y-3">
            {data.skills.technical.length > 0 && (
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  Technical:
                </span>
                <p className="text-sm text-gray-700 mt-1">
                  {data.skills.technical.join(" • ")}
                </p>
              </div>
            )}
            {data.skills.languages.length > 0 && (
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  Languages:
                </span>
                <p className="text-sm text-gray-700 mt-1">
                  {data.skills.languages.join(" • ")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Coding Profiles */}
      {Object.entries(data.codingProfiles || {}).filter(([_, url]) => url)
        .length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6 font-medium">
            Coding Profiles
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(data.codingProfiles || {}).map(
              ([platform, url]) => {
                if (!url) return null;
                return (
                  <div key={platform} className="text-sm">
                    <span className="text-gray-500">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}:
                    </span>
                    <span className="text-gray-700 ml-2">{url}</span>
                  </div>
                );
              },
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate;
