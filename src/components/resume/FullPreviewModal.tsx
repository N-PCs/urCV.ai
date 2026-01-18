import { ResumeData } from "@/pages/Builder";
import ResumePreview from "./ResumePreview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, Printer } from "lucide-react";

interface FullPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  templateName?: 'default' | 'modern' | 'professional' | 'creative' | 'minimalist' | 'bold';
}

const FullPreviewModal = ({ isOpen, onClose, data, templateName = 'default' }: FullPreviewModalProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Resume Preview - {templateName.charAt(0).toUpperCase() + templateName.slice(1)} Template
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="flex justify-center">
            <div className="bg-white shadow-2xl" style={{ width: '210mm', minHeight: '297mm' }}>
              <ResumePreview data={data} templateName={templateName} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullPreviewModal;
