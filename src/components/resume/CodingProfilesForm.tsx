import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ResumeData } from "@/pages/Builder";
import { Card } from "@/components/ui/card";

interface CodingProfilesFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const CodingProfilesForm = ({ data, updateData }: CodingProfilesFormProps) => {
  const handleInputChange = (field: string, value: string) => {
    updateData('codingProfiles', {
      ...data.codingProfiles,
      [field]: value
    });
  };

  const openLink = (url: string) => {
    if (!url) return;
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(fullUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Coding Profiles</h3>
        <p className="text-sm text-gray-500">
          Showcase your problem-solving skills by linking your coding profiles.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        {[
          { id: 'github', label: 'GitHub', placeholder: 'github.com/username' },
          { id: 'leetcode', label: 'LeetCode', placeholder: 'leetcode.com/username' },
          { id: 'hackerrank', label: 'HackerRank', placeholder: 'hackerrank.com/username' },
          { id: 'codeforces', label: 'CodeForces', placeholder: 'codeforces.com/profile/username' },
          { id: 'kaggle', label: 'Kaggle', placeholder: 'kaggle.com/username' }
        ].map((platform) => (
          <div key={platform.id} className="grid w-full items-center gap-1.5">
            <Label htmlFor={platform.id}>{platform.label}</Label>
            <div className="flex gap-2">
              <Input
                id={platform.id}
                value={data.codingProfiles?.[platform.id as keyof typeof data.codingProfiles] || ''}
                onChange={(e) => handleInputChange(platform.id, e.target.value)}
                placeholder={platform.placeholder}
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => openLink(data.codingProfiles?.[platform.id as keyof typeof data.codingProfiles] || '')}
                disabled={!data.codingProfiles?.[platform.id as keyof typeof data.codingProfiles]}
                title={`Visit ${platform.label} Profile`}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default CodingProfilesForm;