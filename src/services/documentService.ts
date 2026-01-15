
import { Document, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink } from 'docx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '@/pages/Builder';

export const generateWordDocument = async (resumeData: ResumeData): Promise<Blob> => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        new Paragraph({
          text: resumeData.personalInfo.fullName,
          heading: HeadingLevel.TITLE,
        }),
        new Paragraph({
          children: [
            new TextRun(`${resumeData.personalInfo.email} | `),
            new TextRun(`${resumeData.personalInfo.phone} | `),
            new TextRun(`${resumeData.personalInfo.location}`),
          ],
        }),
        new Paragraph({
          text: resumeData.personalInfo.linkedin,
        }),
        new Paragraph({
          text: "",
        }),
        

        // Summary
        ...(resumeData.personalInfo.summary ? [
          new Paragraph({
            text: "Professional Summary",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: resumeData.personalInfo.summary,
          }),
          new Paragraph({
            text: "",
          }),
        ] : []),

        // Experience
        ...(resumeData.experience.length > 0 ? [
          new Paragraph({
            text: "Experience",
            heading: HeadingLevel.HEADING_1,
          }),
          ...resumeData.experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.title} - ${exp.company}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              text: `${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
            }),
            new Paragraph({
              text: exp.description,
            }),
            new Paragraph({
              text: "",
            }),
          ]),
        ] : []),

        // Education
        ...(resumeData.education.length > 0 ? [
          new Paragraph({
            text: "Education",
            heading: HeadingLevel.HEADING_1,
          }),
          ...resumeData.education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.degree} - ${edu.school}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              text: `${edu.location} | ${edu.graduationDate}`,
            }),
            ...(edu.gpa ? [
              new Paragraph({
                text: `GPA: ${edu.gpa}`,
              }),
            ] : []),
            new Paragraph({
              text: "",
            }),
          ]),
        ] : []),

        // Skills
        new Paragraph({
          text: "Skills",
          heading: HeadingLevel.HEADING_1,
        }),
        ...(resumeData.skills.technical.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "Technical Skills: ",
                bold: true,
              }),
              new TextRun(resumeData.skills.technical.join(", ")),
            ],
          }),
        ] : []),
        ...(resumeData.skills.languages.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "Languages: ",
                bold: true,
              }),
              new TextRun(resumeData.skills.languages.join(", ")),
            ],
          }),
        ] : []),
        ...(resumeData.skills.certifications.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "Certifications: ",
                bold: true,
              }),
              new TextRun(resumeData.skills.certifications.join(", ")),
            ],
          }),
        ] : []),
        new Paragraph({
          text: "Coding Profiles",
          heading: HeadingLevel.HEADING_1,
        }),
        ...Object.entries(resumeData.codingProfiles || {}).flatMap(([platform, url]) => {
            if (!url) return [];
            const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
            
            return [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${platform.charAt(0).toUpperCase() + platform.slice(1)}: `,
                            bold: true,
                        }),
                        new ExternalHyperlink({
                            children: [
                                new TextRun({
                                    text: url,
                                    style: "Hyperlink",
                                }),
                            ],
                            link: cleanUrl,
                        }),
                    ],
                    spacing: {
                        after: 100,
                    },
                }),
            ];
        }),
      ],
    }],
  });

  return await Packer.toBlob(doc);
};

export const generatePDF = (resumeData: ResumeData): Blob => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxLineWidth = pageWidth - margin*2;
  let yPos = 20;
  
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    if(!text) return;

    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");

    const splitText = doc.splitTextToSize(text, maxLineWidth);
    const lineHeight = fontSize * 0.5;
    
    if(yPos + (splitText.length * lineHeight) > pageHeight - margin){
      doc.addPage();
      yPos = margin;
    }

    doc.text(splitText, margin,yPos);
    yPos += (splitText.length * lineHeight) + 2;
  }

  const addSectionTitle = (title: string) => {
    yPos += 5;
    addText(title, 14, true);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos - 5, pageWidth - margin, yPos - 5);
    yPos += 1;
  }

  addText(resumeData.personalInfo.fullName, 22, true);

  const contactParts = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location,
    resumeData.personalInfo.linkedin
  ].filter(Boolean);

  if (contactParts.length > 0) {
    addText(contactParts.join(" | "), 10);
  }
  yPos += 5;

  if (resumeData.personalInfo.summary) {
    addSectionTitle("Professional Summary");
    addText(resumeData.personalInfo.summary, 10);
  }

  if (resumeData.experience.length > 0) {
    addSectionTitle("Experience");
    resumeData.experience.forEach(exp => {
      addText(`${exp.title} at ${exp.company}`, 11, true);
      addText(`${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 9);
      if (exp.description) {
        addText(exp.description, 10);
      }
      yPos += 3;
    });
  }

  if (resumeData.education.length > 0) {
    addSectionTitle("Education");
    resumeData.education.forEach(edu => {
      addText(`${edu.degree} - ${edu.school}`, 11, true);
      addText(`${edu.location} | ${edu.graduationDate}`, 9);
      if (edu.gpa) {
        addText(`GPA: ${edu.gpa}`, 10);
      }
      yPos += 3;
    });
  }

  const hasSkills = resumeData.skills.technical.length > 0 || 
                    resumeData.skills.languages.length > 0 || 
                    resumeData.skills.certifications.length > 0;

  if (hasSkills) {
    addSectionTitle("Skills");
    
    if (resumeData.skills.technical.length > 0) {
      addText("Technical Skills: " + resumeData.skills.technical.join(", "), 10);
    }
    if (resumeData.skills.languages.length > 0) {
      addText("Languages: " + resumeData.skills.languages.join(", "), 10);
    }
    if (resumeData.skills.certifications.length > 0) {
      addText("Certifications: " + resumeData.skills.certifications.join(", "), 10);
    }
  }
  
  if (resumeData.codingProfiles) {
    const profiles = Object.entries(resumeData.codingProfiles).filter(([_, url]) => url);
    if (profiles.length > 0) {
      addSectionTitle("Coding Profiles");
      profiles.forEach(([platform, url]) => {
        addText(`${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`, 10);
      });
    }
  }

  return doc.output('blob')
}


export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
