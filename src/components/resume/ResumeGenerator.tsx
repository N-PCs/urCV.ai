import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResumeData } from '@/pages/Builder';
import { generateWordDocument, generatePDFFromElement, downloadFile } from '@/services/documentService';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, Image, Link as LinkIcon } from 'lucide-react';
import html2canvas from 'html2canvas';

import ResumePreview from './ResumePreview';

interface ResumeGeneratorProps {
  data: ResumeData;
  templateName: 'default' | 'modern' | 'professional' | 'creative';
}

type PreparedPreview = {
  element: HTMLDivElement;
  cleanup: () => void;
};

const ResumeGenerator = ({ data, templateName }: ResumeGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const preparePreviewForCapture = async (): Promise<PreparedPreview | null> => {
    if (!resumePreviewRef.current) {
      return null;
    }

    const element = resumePreviewRef.current;
    const originalStyle = element.getAttribute('style');

    Object.assign(element.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '800px',
      height: 'auto',
      opacity: '1',
      pointerEvents: 'auto',
      zIndex: '9999',
    });

    await new Promise(resolve => setTimeout(resolve, 400));

    return {
      element,
      cleanup: () => {
        if (originalStyle) {
          element.setAttribute('style', originalStyle);
        } else {
          element.removeAttribute('style');
        }
      },
    };
  };

  const generateWordResume = async () => {
    setIsGenerating(true);
    try {
      const wordBlob = await generateWordDocument(data);
      downloadFile(wordBlob, `${data.personalInfo.fullName || 'resume'}.docx`);
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
        throw new Error('Unable to access resume preview for PDF generation');
      }

      const pdfBlob = await generatePDFFromElement(prepared.element);

      downloadFile(pdfBlob, `${data.personalInfo.fullName || 'resume'}.pdf`);
      toast({
        title: "PDF Generated",
        description: "Your resume has been downloaded as a PDF!",
      });
    } catch (error) {
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
        throw new Error('Unable to access resume preview for image generation');
      }

      const canvas = await html2canvas(prepared.element, {
        useCORS: true,
        allowTaint: true,
        background: '#ffffff'
      });

      await new Promise<void>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            downloadFile(blob, `${data.personalInfo.fullName || 'resume'}.png`);
            toast({
              title: "Image Generated",
              description: "Your resume has been downloaded as an image!",
            });
            resolve();
          } else {
            reject(new Error('Unable to export resume preview as image'));
          }
        }, 'image/png');
      });
    } catch (error) {
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
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Generate & Download Resume</h3>

        {/* Hidden Resume Preview for PDF/Image Generation */}
        <div ref={resumePreviewRef} className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none">
          <div className="w-[800px] bg-white">
            <ResumePreview data={data} templateName={templateName} />
          </div>
        </div>

        {/* Download Options */}
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

        {
          shareableLink && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-medium">
                Shareable link copied to clipboard!
              </p>
              <p className="text-xs text-green-600 mt-1 break-all">
                {shareableLink}
              </p>
            </div>
          )
        }
      </div >
    </Card >
  );
};

export default ResumeGenerator;
