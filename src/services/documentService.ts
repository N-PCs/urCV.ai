
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

export const generatePDFFromElement = async (element: HTMLElement): Promise<Blob> => {

  await new Promise(resolve => setTimeout(resolve, 200));
  
  const rect = element.getBoundingClientRect();
  const width = rect.width || element.scrollWidth || 800;
  const height = rect.height || element.scrollHeight || 1000;
  
  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    background: '#ffffff',
    width: width,
    height: height
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // A4 size
  const pdfWidth = 210;
  const pdfHeight = 297;
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  
  const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), pdfHeight / (imgHeight * 0.264583));
  const pdfImgWidth = imgWidth * 0.264583 * ratio;
  const pdfImgHeight = imgHeight * 0.264583 * ratio;
  
  const x = (pdfWidth - pdfImgWidth) / 2;
  const y = 10;
  
  pdf.addImage(imgData, 'PNG', x, y, pdfImgWidth, pdfImgHeight);

  return pdf.output('blob');
};

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
