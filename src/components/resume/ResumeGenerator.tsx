import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResumeData } from "@/pages/Builder";
import { generateWordDocument, generatePDF } from "@/services/documentService";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Image, Link as LinkIcon } from "lucide-react";
import html2canvas from "html2canvas";

import ResumePreview from "./ResumePreview";

// Updated to include all template types
export type TemplateType =
  | "default"
  | "modern"
  | "professional"
  | "creative"
  | "minimalist"
  | "bold";

interface ResumeGeneratorProps {
  data: ResumeData;
  templateName: TemplateType;
}

interface ResumeDownloadOptionsProps extends ResumeGeneratorProps {
  showHeading?: boolean;
}

type PreparedPreview = {
  element: HTMLDivElement;
  cleanup: () => void;
};

const ResumeDownloadOptions = ({
  data,
  templateName,
  showHeading = true,
}: ResumeDownloadOptionsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const preparePreviewForCapture =
    async (): Promise<PreparedPreview | null> => {
      if (!resumePreviewRef.current) {
        return null;
      }

      const element = resumePreviewRef.current;
      const originalStyle = element.getAttribute("style");

      Object.assign(element.style, {
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "800px",
        height: "auto",
        opacity: "1",
        pointerEvents: "auto",
        zIndex: "99999",
        visibility: "visible",
        display: "block",
        margin: "0",
        padding: "0",
        border: "none",
        boxShadow: "none",
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        element,
        cleanup: () => {
          if (originalStyle) {
            element.setAttribute("style", originalStyle);
          } else {
            element.removeAttribute("style");
          }
        },
      };
    };

  const generateWordResume = async () => {
    setIsGenerating(true);
    try {
      const wordBlob = await generateWordDocument(data, templateName);
      downloadFile(wordBlob, `${data.personalInfo.fullName || "resume"}.docx`);
      toast({
        title: "Word Document Generated",
        description: "Your resume has been downloaded as a Word document!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate Word document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDFResume = async () => {
    setIsGenerating(true);
    let prepared: PreparedPreview | null = null;

    try {
      prepared = await preparePreviewForCapture();
      if (!prepared) {
        throw new Error("Unable to access resume preview for PDF generation");
      }

      const pdfBlob = generatePDF(data, templateName);

      downloadFile(pdfBlob, `${data.personalInfo.fullName || "resume"}.pdf`);

      toast({
        title: "PDF Generated",
        description: `Your resume has been downloaded in the ${templateName} style!`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      prepared?.cleanup();
      setIsGenerating(false);
    }
  };

  const generateImageResume = async () => {
    setIsGenerating(true);
    let prepared: PreparedPreview | null = null;

    try {
      prepared = await preparePreviewForCapture();
      if (!prepared) {
        throw new Error("Unable to access resume preview for image generation");
      }

      const innerDiv = prepared.element.querySelector("div") as HTMLElement;
      const targetElement = innerDiv || prepared.element;

      if (targetElement.style) {
        targetElement.style.width = "800px";
        targetElement.style.height = "auto";
        targetElement.style.overflow = "visible";
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(targetElement, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        logging: false,
        ignoreElements: (element) => {
          return false;
        },
      } as any);

      await new Promise<void>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              downloadFile(
                blob,
                `${data.personalInfo.fullName || "resume"}.png`,
              );
              toast({
                title: "Image Generated",
                description: "Your resume has been downloaded as an image!",
              });
              resolve();
            } else {
              reject(new Error("Unable to export resume preview as image"));
            }
          },
          "image/png",
          1.0,
        );
      });
    } catch (error) {
      console.error("Image generation error:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      prepared?.cleanup();
      setIsGenerating(false);
    }
  };

  const generateShareableLink = () => {
    const resumeDataEncoded = btoa(JSON.stringify(data));
    const link = `${window.location.origin}/resume/${resumeDataEncoded}`;
    setShareableLink(link);
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Shareable link has been copied to clipboard!",
    });
  };

  return (
    <div className="space-y-6">
      {showHeading && (
        <div>
          <h3 className="text-xl font-bold">Generate & Download Resume</h3>
        </div>
      )}

      <div
        ref={resumePreviewRef}
        className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none"
        style={{
          width: "800px",
          height: "auto",
          display: "block",
          overflow: "visible",
          position: "fixed",
        }}
      >
        <div
          className="w-[800px] bg-white"
          style={{
            margin: 0,
            padding: 0,
            overflow: "visible",
            height: "auto",
            minHeight: "1000px",
          }}
        >
          <ResumePreview data={data} templateName={templateName} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={generateWordResume}
          disabled={isGenerating}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
        >
          <FileText className="w-4 h-4" />
          <span>Download Word</span>
        </Button>

        <Button
          onClick={generatePDFResume}
          disabled={isGenerating}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </Button>

        <Button
          onClick={generateImageResume}
          disabled={isGenerating}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Image className="w-4 h-4" />
          <span>Download Image</span>
        </Button>

        <Button
          onClick={generateShareableLink}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <LinkIcon className="w-4 h-4" />
          <span>Share Link</span>
        </Button>
      </div>

      {shareableLink && (
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            Shareable link copied to clipboard!
          </p>
          <p className="text-xs text-green-600 mt-1 break-all">
            {shareableLink}
          </p>
        </div>
      )}
    </div>
  );
};

const ResumeGenerator = ({ data, templateName }: ResumeGeneratorProps) => (
  <Card className="p-6">
    <ResumeDownloadOptions data={data} templateName={templateName} />
  </Card>
);

export { ResumeDownloadOptions };
export default ResumeGenerator;
