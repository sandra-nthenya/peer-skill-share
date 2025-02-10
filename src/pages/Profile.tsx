
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navigation from "@/components/Navigation";
import ProfilePhotoUpload from "@/components/ProfilePhotoUpload";
import {
  skillOptions,
  industryOptions,
  experienceLevels,
} from "@/constants/skills";

const profileSchema = z.object({
  skillsToLearn: z.array(z.string()).min(1, "Select at least one skill to learn"),
  skillsToTeach: z.array(z.string()).min(1, "Select at least one skill to teach"),
  industry: z.string().min(1, "Please select your industry"),
  experienceLevel: z.string().min(1, "Please select your experience level"),
  availability: z.enum(["weekdays", "weekends", "both"]),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  // Mock authentication check - replace with real auth check later
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access your profile.",
        variant: "destructive",
      });
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      skillsToLearn: [],
      skillsToTeach: [],
      industry: "",
      experienceLevel: "",
      availability: "weekdays",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    // Mock API call - replace with real API call later
    console.log("Form data:", data);
    console.log("Profile photo:", profilePhoto);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Your Profile
        </h1>
        <Card className="max-w-2xl mx-auto p-6">
          <div className="mb-8">
            <ProfilePhotoUpload
              currentPhotoUrl={undefined}
              onPhotoChange={(file) => setProfilePhoto(file)}
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="skillsToLearn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills to Learn</FormLabel>
                    <Select
                      value={field.value?.[0] || ""}
                      onValueChange={(value) => field.onChange([value])}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a skill to learn" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {skillOptions.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skillsToTeach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills to Teach</FormLabel>
                    <Select
                      value={field.value?.[0] || ""}
                      onValueChange={(value) => field.onChange([value])}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a skill to teach" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {skillOptions.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {industryOptions.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
