import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResumeData } from '@/pages/Builder';
import { generateWordDocument, generatePDF, downloadFile } from '@/services/documentService';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, Image, Link as LinkIcon } from 'lucide-react';
import html2canvas from 'html2canvas';

import ResumePreview from './ResumePreview';

interface ResumeGeneratorProps {
  data: ResumeData;
  templateName: 'default' | 'modern' | 'professional' | 'creative';
}

const ResumeGenerator = ({ data, templateName }: ResumeGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
    try{
      const pdfBlob = generatePDF(data);
      downloadFile(pdfBlob, `${data.personalInfo.fullName || 'resume'}.pdf`);

      toast({
        title: "PDF Generated",
        description: "Your resume has been downloaded as a text-based PDF!",
      });
    }catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImageResume = async () => {
    if (!resumePreviewRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(resumePreviewRef.current, {
        useCORS: true,
        allowTaint: true,
        background: '#ffffff'
      });

      canvas.toBlob((blob) => {
        if (blob) {
          downloadFile(blob, `${data.personalInfo.fullName || 'resume'}.png`);
          toast({
            title: "Image Generated",
            description: "Your resume has been downloaded as an image!",
          });
        }
      }, 'image/png');
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
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
