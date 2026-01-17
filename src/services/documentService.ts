
import { Document, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, BorderStyle, AlignmentType } from 'docx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '@/pages/Builder';

// Template-specific styling configs
const templateStyles = {
  default: {
    nameSize: 14,
    nameBold: true,
    headingSize: 12,
    headingBold: true,
    bodySize: 11,
    titleColor: undefined,
    accentColor: undefined,
  },
  modern: {
    nameSize: 16,
    nameBold: true,
    headingSize: 13,
    headingBold: true,
    bodySize: 11,
    titleColor: '2563EB',
    accentColor: '1E40AF',
  },
  professional: {
    nameSize: 18,
    nameBold: true,
    headingSize: 13,
    headingBold: true,
    bodySize: 11,
    titleColor: '000000',
    accentColor: '374151',
  },
  creative: {
    nameSize: 16,
    nameBold: true,
    headingSize: 12,
    headingBold: true,
    bodySize: 10,
    titleColor: '7C3AED',
    accentColor: '6D28D9',
  },
};

export const generateWordDocument = async (resumeData: ResumeData, templateName: string = 'default'): Promise<Blob> => {
  const template = templateStyles[templateName as keyof typeof templateStyles] || templateStyles.default;
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header - Name
        new Paragraph({
          children: [
            new TextRun({
              text: resumeData.personalInfo.fullName,
              bold: template.nameBold,
              size: template.nameSize * 2,
              color: template.titleColor,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        
        // Contact Info
        new Paragraph({
          children: [
            new TextRun({
              text: `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`,
              size: template.bodySize * 2,
              color: template.accentColor,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 50 },
        }),
        
        // LinkedIn
        ...(resumeData.personalInfo.linkedin ? [
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo.linkedin,
                size: template.bodySize * 2,
                color: template.accentColor,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 50 },
          }),
        ] : []),

        // Portfolio
        ...(resumeData.personalInfo.portfolio ? [
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo.portfolio,
                size: template.bodySize * 2,
                color: template.accentColor,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
        ] : []),

        // Summary
        ...(resumeData.personalInfo.summary ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL SUMMARY",
                bold: template.headingBold,
                size: template.headingSize * 2,
                color: template.titleColor,
              }),
            ],
            spacing: { after: 100 },
            border: templateName === 'modern' ? {
              bottom: { color: '2563EB', space: 1, style: BorderStyle.SINGLE, size: 6 },
            } : undefined,
          }),
          new Paragraph({
            text: resumeData.personalInfo.summary,
            spacing: { after: 200 },
          }),
        ] : []),

        // Experience
        ...(resumeData.experience.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "EXPERIENCE",
                bold: template.headingBold,
                size: template.headingSize * 2,
                color: template.titleColor,
              }),
            ],
            spacing: { after: 100 },
            border: templateName === 'modern' ? {
              bottom: { color: '2563EB', space: 1, style: BorderStyle.SINGLE, size: 6 },
            } : undefined,
          }),
          ...resumeData.experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.title}`,
                  bold: true,
                  size: 11 * 2,
                  color: template.titleColor,
                }),
              ],
              spacing: { after: 50 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.company} | ${exp.location}`,
                  italics: true,
                  size: 10 * 2,
                  color: template.accentColor,
                }),
              ],
              spacing: { after: 50 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                  size: 10 * 2,
                  color: template.accentColor,
                }),
              ],
              spacing: { after: 50 },
            }),
            ...(exp.description ? [
              new Paragraph({
                text: exp.description,
                spacing: { after: 150 },
              }),
            ] : []),
          ]),
        ] : []),

        // Education
        ...(resumeData.education.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "EDUCATION",
                bold: template.headingBold,
                size: template.headingSize * 2,
                color: template.titleColor,
              }),
            ],
            spacing: { after: 100 },
            border: templateName === 'modern' ? {
              bottom: { color: '2563EB', space: 1, style: BorderStyle.SINGLE, size: 6 },
            } : undefined,
          }),
          ...resumeData.education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.degree}`,
                  bold: true,
                  size: 11 * 2,
                  color: template.titleColor,
                }),
              ],
              spacing: { after: 50 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.school}`,
                  italics: true,
                  size: 10 * 2,
                  color: template.accentColor,
                }),
              ],
              spacing: { after: 50 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.location} | ${edu.graduationDate}`,
                  size: 10 * 2,
                  color: template.accentColor,
                }),
              ],
              spacing: { after: edu.gpa ? 50 : 150 },
            }),
            ...(edu.gpa ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `GPA: ${edu.gpa}`,
                    size: 10 * 2,
                  }),
                ],
                spacing: { after: 150 },
              }),
            ] : []),
          ]),
        ] : []),

        // Skills
        ...(resumeData.skills.technical.length > 0 || resumeData.skills.languages.length > 0 || resumeData.skills.certifications.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "SKILLS",
                bold: template.headingBold,
                size: template.headingSize * 2,
                color: template.titleColor,
              }),
            ],
            spacing: { after: 100 },
            border: templateName === 'modern' ? {
              bottom: { color: '2563EB', space: 1, style: BorderStyle.SINGLE, size: 6 },
            } : undefined,
          }),
          ...(resumeData.skills.technical.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Technical: ",
                  bold: true,
                  color: template.titleColor,
                }),
                new TextRun(resumeData.skills.technical.join(", ")),
              ],
              spacing: { after: 100 },
            }),
          ] : []),
          ...(resumeData.skills.languages.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Languages: ",
                  bold: true,
                  color: template.titleColor,
                }),
                new TextRun(resumeData.skills.languages.join(", ")),
              ],
              spacing: { after: 100 },
            }),
          ] : []),
          ...(resumeData.skills.certifications.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Certifications: ",
                  bold: true,
                  color: template.titleColor,
                }),
                new TextRun(resumeData.skills.certifications.join(", ")),
              ],
              spacing: { after: 150 },
            }),
          ] : []),
        ] : []),

        // Hobbies/Interests
        ...(resumeData.hobbies && resumeData.hobbies.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "INTERESTS",
                bold: template.headingBold,
                size: template.headingSize * 2,
                color: template.titleColor,
              }),
            ],
            spacing: { after: 100 },
            border: templateName === 'modern' ? {
              bottom: { color: '2563EB', space: 1, style: BorderStyle.SINGLE, size: 6 },
            } : undefined,
          }),
          new Paragraph({
            children: [
              new TextRun(resumeData.hobbies.join(", ")),
            ],
            spacing: { after: 150 },
          }),
        ] : []),

        // Coding Profiles
        ...(Object.entries(resumeData.codingProfiles || {}).length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "CODING PROFILES",
                bold: template.headingBold,
                size: template.headingSize * 2,
                color: template.titleColor,
              }),
            ],
            spacing: { after: 100 },
            border: templateName === 'modern' ? {
              bottom: { color: '2563EB', space: 1, style: BorderStyle.SINGLE, size: 6 },
            } : undefined,
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
                    color: template.titleColor,
                  }),
                  new ExternalHyperlink({
                    children: [
                      new TextRun({
                        text: url,
                        style: "Hyperlink",
                        color: "0563C1",
                      }),
                    ],
                    link: cleanUrl,
                  }),
                ],
                spacing: { after: 100 },
              }),
            ];
          }),
        ] : []),
      ],
    }],
  });

  return await Packer.toBlob(doc);
};

export const generatePDF = (resumeData: ResumeData, templateName: string = 'default'): Blob => {
  const doc = new jsPDF();

  switch (templateName) {
    case 'modern':
      renderModernTemplate(doc, resumeData);
      break;
    case 'professional':
      renderProfessionalTemplate(doc, resumeData);
      break;
    case 'creative':
      renderCreativeTemplate(doc, resumeData);
      break;
    default:
      renderDefaultTemplate(doc, resumeData);
      break;
  }

  return doc.output('blob');
};
const renderDefaultTemplate = (doc: jsPDF, data: ResumeData) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  const addText = (text: string, fontSize: number = 10, isBold: boolean = false, maxWidth?: number) => {
    if(!text) return;

    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");

    const lines = doc.splitTextToSize(text, maxWidth || (pageWidth - margin * 2));
    doc.text(lines, margin, yPos);
    yPos += (lines.length * fontSize * 0.5) + 2;
  };

  addText(data.personalInfo.fullName, 22, true);
  const contact = [
    data.personalInfo.email, 
    data.personalInfo.phone, 
    data.personalInfo.location, 
    data.personalInfo.linkedin,
    data.personalInfo.portfolio]
    .filter(Boolean)
    .join(" | ");

  addText(contact, 10);
  yPos += 5;

  if (data.personalInfo.summary) {
    addText("Professional Summary", 14, true);
    doc.line(margin, yPos - 6, pageWidth - margin, yPos - 6);
    addText(data.personalInfo.summary, 10);
    yPos += 5;
  }

  if (data.experience.length > 0) {
    addText("Experience", 14, true);
    doc.line(margin, yPos - 6, pageWidth - margin, yPos - 6);
    data.experience.forEach(exp => {
      addText(`${exp.title} - ${exp.company}`, 11, true);
      addText(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate} | ${exp.location}`, 9);
      if (exp.description) addText(exp.description, 10);
      yPos += 3;
    });
  }

  if (data.education.length > 0) {
    addText("Education", 14, true);
    doc.line(margin, yPos - 6, pageWidth - margin, yPos - 6);
    data.education.forEach(edu => {
      addText(`${edu.degree} - ${edu.school}`, 11, true);
      addText(`${edu.graduationDate} | ${edu.location}`, 9);
      if (edu.gpa) addText(`GPA: ${edu.gpa}`, 10);
      yPos += 3;
    });
  }

  const skillsList = [
      ...data.skills.technical, 
      ...data.skills.languages, 
      ...data.skills.certifications
  ];
  
  if (skillsList.length > 0) {
      addText("Skills", 14, true);
      doc.line(margin, yPos - 6, pageWidth - margin, yPos - 6);
      
      if(data.skills.technical.length) addText("Technical: " + data.skills.technical.join(", "), 10);
      if(data.skills.languages.length) addText("Languages: " + data.skills.languages.join(", "), 10);
      if(data.skills.certifications.length) addText("Certifications: " + data.skills.certifications.join(", "), 10);
  }

  // Hobbies/Interests
  if (data.hobbies && data.hobbies.length > 0) {
    yPos += 5;
    addText("Interests", 14, true);
    doc.line(margin, yPos - 6, pageWidth - margin, yPos - 6);
    addText(data.hobbies.join(", "), 10);
  }

  // Coding Profiles
  const codingProfilesEntries = Object.entries(data.codingProfiles || {}).filter(([_, url]) => url);
  if (codingProfilesEntries.length > 0) {
    yPos += 5;
    addText("Coding Profiles", 14, true);
    doc.line(margin, yPos - 6, pageWidth - margin, yPos - 6);
    codingProfilesEntries.forEach(([platform, url]) => {
      addText(`${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`, 10);
    });
  }
};

const renderModernTemplate = (doc: jsPDF, data: ResumeData) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Header
  doc.setTextColor(37, 99, 235); // Blue
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(data.personalInfo.fullName.toUpperCase(), margin, yPos);
  yPos += 8;
  
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(1);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 6;

  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const contact = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean).join("  •  ");
  doc.text(contact, margin, yPos);
  yPos += 5;

  // LinkedIn and Portfolio
  const links = [data.personalInfo.linkedin, data.personalInfo.portfolio].filter(Boolean).join("  •  ");
  if (links) {
    doc.text(links, margin, yPos);
    yPos += 5;
  }
  yPos += 5;

  if (data.personalInfo.summary) {
    const lines = doc.splitTextToSize(data.personalInfo.summary, pageWidth - margin * 2);
    doc.text(lines, margin, yPos);
    yPos += (lines.length * 5) + 10;
  }

  // Two Column Layout
  const colGap = 10;
  const leftColWidth = (pageWidth - margin * 2) * 0.65;
  const rightColX = margin + leftColWidth + colGap;
  const rightColWidth = (pageWidth - margin * 2) * 0.35;
  
  let leftY = yPos;
  let rightY = yPos;

  // LEFT COLUMN: Experience & Education
  if (data.experience.length > 0) {
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("EXPERIENCE", margin, leftY);
    leftY += 6;
    doc.setTextColor(0, 0, 0);

    data.experience.forEach(exp => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(exp.title, margin, leftY);
      leftY += 5;
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(`${exp.company} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, margin, leftY);
      leftY += 5;
      
      doc.setTextColor(0, 0, 0);
      if (exp.description) {
         const lines = doc.splitTextToSize(exp.description, leftColWidth);
         doc.text(lines, margin, leftY);
         leftY += (lines.length * 4) + 6;
      } else {
        leftY += 4;
      }
    });
  }

  if (data.education.length > 0) {
    leftY += 5;
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", margin, leftY);
    leftY += 6;
    doc.setTextColor(0, 0, 0);

    data.education.forEach(edu => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(edu.school, margin, leftY);
      leftY += 5;
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`${edu.degree}`, margin, leftY);
      leftY += 5;
      doc.setTextColor(80, 80, 80);
      doc.text(`${edu.graduationDate}`, margin, leftY);
      leftY += 8;
      doc.setTextColor(0, 0, 0);
    });
  }

  // RIGHT COLUMN: Skills
  if (data.skills.technical.length > 0 || data.skills.languages.length > 0) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("SKILLS", rightColX, rightY);
    rightY += 6;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const techSkills = doc.splitTextToSize(data.skills.technical.join(", "), rightColWidth);
    doc.text(techSkills, rightColX, rightY);
    rightY += (techSkills.length * 5) + 6;

    if (data.skills.languages.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("LANGUAGES", rightColX, rightY);
        rightY += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        data.skills.languages.forEach(lang => {
            doc.text(`• ${lang}`, rightColX, rightY);
            rightY += 5;
        });
    }

    // Hobbies/Interests
    if (data.hobbies && data.hobbies.length > 0) {
        rightY += 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("INTERESTS", rightColX, rightY);
        rightY += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        data.hobbies.forEach(hobby => {
            doc.text(`• ${hobby}`, rightColX, rightY);
            rightY += 5;
        });
    }
  }

  // Check if we need a new page for coding profiles
  if (Object.entries(data.codingProfiles || {}).filter(([_, url]) => url).length > 0) {
    if (leftY > rightY ? leftY > 270 : rightY > 270) {
      doc.addPage();
      leftY = 20;
    }
    
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("CODING PROFILES", margin, leftY);
    leftY += 6;
    doc.setTextColor(0, 0, 0);

    Object.entries(data.codingProfiles || {}).forEach(([platform, url]) => {
      if (!url) return;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`, margin, leftY);
      leftY += 5;
    });
  }
};

const renderProfessionalTemplate = (doc: jsPDF, data: ResumeData) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;

    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text(data.personalInfo.fullName.toUpperCase(), pageWidth / 2, yPos, { align: "center" });
    yPos += 6;

    doc.setFont("times", "normal");
    doc.setFontSize(10);
    const contact = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean).join(" | ");
    doc.text(contact, pageWidth / 2, yPos, { align: "center" });
    if(data.personalInfo.linkedin) {
        yPos += 5;
        doc.text(data.personalInfo.linkedin, pageWidth / 2, yPos, { align: "center" });
    }
    if(data.personalInfo.portfolio) {
        yPos += 5;
        doc.text(data.personalInfo.portfolio, pageWidth / 2, yPos, { align: "center" });
    }
    yPos += 10;

    const addSection = (title: string) => {
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text(title.toUpperCase(), margin, yPos);
        yPos += 2;
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 6;
    };

    if (data.personalInfo.summary) {
        addSection("Professional Summary");
        doc.setFont("times", "normal");
        doc.setFontSize(11);
        const lines = doc.splitTextToSize(data.personalInfo.summary, pageWidth - margin * 2);
        doc.text(lines, margin, yPos);
        yPos += (lines.length * 5) + 6;
    }

    if (data.experience.length > 0) {
        addSection("Work Experience");
        data.experience.forEach(exp => {
            doc.setFont("times", "bold");
            doc.setFontSize(11);
            doc.text(exp.title, margin, yPos);
            doc.setFont("times", "italic");
            doc.text(`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`, pageWidth - margin, yPos, { align: "right" });
            yPos += 5;

            doc.setFont("times", "bold"); // Company bold in professional usually
            doc.text(exp.company, margin, yPos);
            doc.setFont("times", "normal");
            doc.text(exp.location, pageWidth - margin, yPos, { align: "right" });
            yPos += 5;

            if (exp.description) {
                doc.setFont("times", "normal");
                const lines = doc.splitTextToSize(exp.description, pageWidth - margin * 2);
                doc.text(lines, margin, yPos);
                yPos += (lines.length * 5) + 4;
            } else {
                yPos += 4;
            }
        });
    }

    if (data.education.length > 0) {
        addSection("Education");
        data.education.forEach(edu => {
            doc.setFont("times", "bold");
            doc.text(edu.school, margin, yPos);
            doc.setFont("times", "normal");
            doc.text(edu.graduationDate, pageWidth - margin, yPos, { align: "right" });
            yPos += 5;

            doc.setFont("times", "italic");
            doc.text(edu.degree, margin, yPos);
            doc.setFont("times", "normal");
            doc.text(edu.location, pageWidth - margin, yPos, { align: "right" });
            yPos += 8;
        });
    }

    if(data.skills.technical.length > 0) {
        addSection("Skills");
        doc.setFont("times", "normal");
        const lines = doc.splitTextToSize(`Technical: ${data.skills.technical.join(", ")}`, pageWidth - margin * 2);
        doc.text(lines, margin, yPos);
        yPos += (lines.length * 5) + 6;
    }

    // Coding Profiles
    const codingProfilesEntries = Object.entries(data.codingProfiles || {}).filter(([_, url]) => url);
    if (codingProfilesEntries.length > 0) {
        addSection("Coding Profiles");
        codingProfilesEntries.forEach(([platform, url]) => {
            doc.setFont("times", "normal");
            doc.setFontSize(11);
            doc.text(`${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`, margin, yPos);
            yPos += 5;
        });
    }
};

const renderCreativeTemplate = (doc: jsPDF, data: ResumeData) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Sidebar Background
    const sidebarWidth = pageWidth * 0.35;
    doc.setFillColor(15, 23, 42); // Slate 900
    doc.rect(0, 0, sidebarWidth, pageHeight, 'F');

    // Sidebar Content (White text)
    doc.setTextColor(255, 255, 255);
    let sideY = 30;
    const sideMargin = 10;

    // Initials Circle
    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(1);
    doc.circle(sidebarWidth/2, sideY + 10, 15, 'S');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.text(data.personalInfo.fullName.charAt(0) || "U", sidebarWidth/2, sideY + 13, { align: "center" });
    sideY += 40;

    // Contact
    doc.setFontSize(12);
    doc.text("CONTACT", sideMargin, sideY);
    sideY += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    if(data.personalInfo.email) { doc.text(data.personalInfo.email, sideMargin, sideY); sideY += 5; }
    if(data.personalInfo.phone) { doc.text(data.personalInfo.phone, sideMargin, sideY); sideY += 5; }
    if(data.personalInfo.location) { doc.text(data.personalInfo.location, sideMargin, sideY); sideY += 5; }
    sideY += 10;

    // Skills Sidebar
    if(data.skills.technical.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("SKILLS", sideMargin, sideY);
        sideY += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        data.skills.technical.forEach(skill => {
            doc.text(`• ${skill}`, sideMargin, sideY);
            sideY += 5;
        });
        sideY += 10;
    }

    // MAIN CONTENT (Right side)
    const mainMargin = sidebarWidth + 15;
    const mainWidth = pageWidth - mainMargin - 15;
    let mainY = 30;
    doc.setTextColor(15, 23, 42); // Slate 900 for headings

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    const nameLines = doc.splitTextToSize(data.personalInfo.fullName, mainWidth);
    doc.text(nameLines, mainMargin, mainY);
    mainY += (nameLines.length * 10) + 10;

    if (data.personalInfo.summary) {
        doc.setFontSize(14);
        doc.text("Profile", mainMargin, mainY);
        mainY += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(data.personalInfo.summary, mainWidth);
        doc.text(lines, mainMargin, mainY);
        mainY += (lines.length * 5) + 10;
    }

    if (data.experience.length > 0) {
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Experience", mainMargin, mainY);
        mainY += 8;

        data.experience.forEach(exp => {
            doc.setFontSize(12);
            doc.text(exp.title, mainMargin, mainY);
            mainY += 5;
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(100, 116, 139);
            doc.text(`${exp.company} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, mainMargin, mainY);
            mainY += 5;

            doc.setTextColor(60, 60, 60);
            if(exp.description) {
                const lines = doc.splitTextToSize(exp.description, mainWidth);
                doc.text(lines, mainMargin, mainY);
                mainY += (lines.length * 5) + 6;
            }
        });
    }

    // Coding Profiles
    const codingProfilesEntries = Object.entries(data.codingProfiles || {}).filter(([_, url]) => url);
    if (codingProfilesEntries.length > 0) {
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Coding Profiles", mainMargin, mainY);
        mainY += 8;

        codingProfilesEntries.forEach(([platform, url]) => {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(100, 116, 139);
            doc.text(`${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`, mainMargin, mainY);
            mainY += 5;
        });
    }
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
