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
    updateData("codingProfiles", {
      ...data.codingProfiles,
      [field]: value,
    });
  };

  const getPlatformUrl = (platformId: string, username: string) => {
    if (!username) return "";

    // Remove any protocol or domain part if user entered full URL
    let cleanUsername = username.trim();

    // Extract username from URL if full URL is provided
    if (cleanUsername.includes(".")) {
      // Extract the username part from various URL formats
      const urlParts = cleanUsername.split("/");
      cleanUsername =
        urlParts[urlParts.length - 1] ||
        urlParts[urlParts.length - 2] ||
        cleanUsername;
    }

    // Construct platform-specific URLs
    switch (platformId) {
      case "github":
        return `https://github.com/${cleanUsername}`;
      case "leetcode":
        return `https://leetcode.com/${cleanUsername}`;
      case "hackerrank":
        return `https://hackerrank.com/${cleanUsername}`;
      case "codeforces":
        return `https://codeforces.com/profile/${cleanUsername}`;
      case "kaggle":
        return `https://kaggle.com/${cleanUsername}`;
      case "codechef":
        return `https://codechef.com/users/${cleanUsername}`;
      default:
        return `https://${cleanUsername}`;
    }
  };

  const openLink = (platformId: string, username: string) => {
    if (!username) return;

    const url = getPlatformUrl(platformId, username);
    window.open(url, "_blank");
  };

  const platforms = [
    {
      id: "github",
      label: "GitHub",
      placeholder: "username or github.com/username",
    },
    {
      id: "leetcode",
      label: "LeetCode",
      placeholder: "username or leetcode.com/username",
    },
    {
      id: "hackerrank",
      label: "HackerRank",
      placeholder: "username or hackerrank.com/username",
    },
    {
      id: "codeforces",
      label: "CodeForces",
      placeholder: "username or codeforces.com/profile/username",
    },
    {
      id: "kaggle",
      label: "Kaggle",
      placeholder: "username or kaggle.com/username",
    },
    {
      id: "codechef",
      label: "CodeChef",
      placeholder: "username or codechef.com/users/username",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Coding Profiles
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showcase your problem-solving skills by linking your coding profiles.
          Enter your username or full profile URL.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        {platforms.map((platform) => {
          const value =
            data.codingProfiles?.[
              platform.id as keyof typeof data.codingProfiles
            ] || "";
          return (
            <div key={platform.id} className="grid w-full items-center gap-1.5">
              <Label 
                htmlFor={platform.id} 
                className="dark:text-gray-300"
              >
                {platform.label}
              </Label>
              <div className="flex gap-2">
                <Input
                  id={platform.id}
                  value={value}
                  onChange={(e) =>
                    handleInputChange(platform.id, e.target.value)
                  }
                  placeholder={platform.placeholder}
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openLink(platform.id, value)}
                  disabled={!value}
                  title={`Visit ${platform.label} Profile`}
                  className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              {value && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Will open: {getPlatformUrl(platform.id, value)}
                </p>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default CodingProfilesForm;
