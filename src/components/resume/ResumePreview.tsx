import { ResumeData } from "@/pages/Builder";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import BoldTemplate from "./templates/BoldTemplate";

interface ResumePreviewProps {
  data: ResumeData;
  templateName?:
    | "default"
    | "modern"
    | "professional"
    | "creative"
    | "minimalist"
    | "bold";
}

const ResumePreview = ({
  data,
  templateName = "default",
}: ResumePreviewProps) => {
  if (templateName === "modern") return <ModernTemplate data={data} />;
  if (templateName === "professional")
    return <ProfessionalTemplate data={data} />;
  if (templateName === "creative") return <CreativeTemplate data={data} />;
  if (templateName === "minimalist") return <MinimalistTemplate data={data} />;
  if (templateName === "bold") return <BoldTemplate data={data} />;

  // Default Template (Original Design)
  return (
    <div
      className="bg-white p-8 shadow-lg rounded-lg min-h-full"
      style={{ overflow: "visible" }}
    >
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
          {/* FIXED CODE */}
          {data.personalInfo.email && (
            <a
              href={`mailto:${data.personalInfo.email}`}
              className="hover:text-blue-600 hover:underline transition-colors"
            >
              {data.personalInfo.email}
            </a>
          )}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
          {data.personalInfo.linkedin && (
            <a
              href={
                data.personalInfo.linkedin.startsWith("http")
                  ? data.personalInfo.linkedin
                  : `https://${data.personalInfo.linkedin}`
              }
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 hover:underline transition-colors"
            >
              {data.personalInfo.linkedin}
            </a>
          )}
          {data.personalInfo.portfolio && (
            <a
              href={
                data.personalInfo.portfolio.startsWith("http")
                  ? data.personalInfo.portfolio
                  : `https://${data.personalInfo.portfolio}`
              }
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 hover:underline transition-colors"
            >
              {data.personalInfo.portfolio}
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.title}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{exp.location}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-1">
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
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.school}</p>
                  </div>
                  <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                </div>
                <p className="text-sm text-gray-600">{edu.location}</p>
                {edu.gpa && (
                  <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 ||
        data.skills.languages.length > 0 ||
        data.skills.certifications.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>

          {data.skills.technical.length > 0 && (
            <div className="mb-3">
              <h3 className="font-medium text-gray-800 text-sm">
                Technical Skills
              </h3>
              <p className="text-sm text-gray-700">
                {data.skills.technical.join(", ")}
              </p>
            </div>
          )}

          {data.skills.languages.length > 0 && (
            <div className="mb-3">
              <h3 className="font-medium text-gray-800 text-sm">Languages</h3>
              <p className="text-sm text-gray-700">
                {data.skills.languages.join(", ")}
              </p>
            </div>
          )}

          {data.skills.certifications.length > 0 && (
            <div className="mb-3">
              <h3 className="font-medium text-gray-800 text-sm">
                Certifications
              </h3>
              <p className="text-sm text-gray-700">
                {data.skills.certifications.join(", ")}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hobbies Section */}
      {data.hobbies && data.hobbies.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Interests
          </h2>
          <p className="text-sm text-gray-700">{data.hobbies.join(", ")}</p>
        </div>
      )}

      {Object.entries(data.codingProfiles || {}).filter(([_, url]) => url)
        .length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Coding Profiles
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data.codingProfiles || {}).map(
              ([key, value]) =>
                value && (
                  <div key={key}>
                    <span className="font-medium text-gray-800 capitalize block">
                      {key}
                    </span>
                    <a
                      href={
                        value.startsWith("http") ? value : `https://${value}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-sm hover:underline break-all"
                    >
                      {value}
                    </a>
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!data.personalInfo.fullName &&
        data.experience.length === 0 &&
        data.education.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Your resume preview will appear here as you fill in the form.</p>
          </div>
        )}
    </div>
  );
};

export default ResumePreview;
