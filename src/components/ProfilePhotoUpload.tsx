
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string;
  onPhotoChange: (file: File) => void;
}

const ProfilePhotoUpload = ({
  currentPhotoUrl,
  onPhotoChange,
}: ProfilePhotoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState(currentPhotoUrl);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please choose an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please choose an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onPhotoChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="w-32 h-32">
        <AvatarImage src={previewUrl} />
        <AvatarFallback>
          <Camera className="w-8 h-8 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => document.getElementById("photo-upload")?.click()}
        >
          Change Photo
        </Button>
        <input
          type="file"
          id="photo-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
