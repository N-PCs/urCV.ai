import { ResumeData } from "@/pages/Builder";

interface TemplateProps {
  data: ResumeData;
}

const BoldTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="bg-white min-h-[1200px]" style={{ overflow: "visible" }}>
      {/* Bold Header with Accent */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8">
        <h1 className="text-4xl font-black uppercase mb-3 tracking-tight">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm font-medium opacity-95">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>|</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>|</span>}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
            <h2 className="text-lg font-black uppercase text-orange-600 mb-3">
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-black uppercase text-orange-600 mb-4 pb-2 border-b-4 border-orange-500">
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.title}
                      </h3>
                      <p className="text-md font-semibold text-orange-600">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-gray-600 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Column Layout for Education and Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-black uppercase text-orange-600 mb-4 pb-2 border-b-4 border-orange-500">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-orange-600 font-semibold">
                      {edu.school}
                    </p>
                    <p className="text-sm text-gray-600">
                      {edu.graduationDate}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.technical.length > 0 && (
            <div>
              <h2 className="text-lg font-black uppercase text-orange-600 mb-4 pb-2 border-b-4 border-orange-500">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coding Profiles */}
        {Object.entries(data.codingProfiles || {}).filter(([_, url]) => url)
          .length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-black uppercase text-orange-600 mb-4 pb-2 border-b-4 border-orange-500">
              Coding Profiles
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(data.codingProfiles || {}).map(
                ([platform, url]) => {
                  if (!url) return null;
                  return (
                    <div key={platform} className="flex items-center gap-2">
                      <span className="font-bold text-orange-600">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}:
                      </span>
                      <span className="text-gray-700 text-sm break-all">
                        {url}
                      </span>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoldTemplate;
