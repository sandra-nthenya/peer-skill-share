
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { skillOptions, industryOptions, experienceLevels } from "@/constants/skills";
import type { MatchFiltersType } from "@/pages/SkillMatching";

interface MatchFiltersProps {
  filters: MatchFiltersType;
  onFilterChange: (filters: MatchFiltersType) => void;
}

const MatchFilters = ({ filters, onFilterChange }: MatchFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    onFilterChange(localFilters);
  }, [localFilters, onFilterChange]);

  const handleFilterChange = (key: keyof MatchFiltersType, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Skill to Learn</Label>
        <Select
          value={localFilters.skillToLearn}
          onValueChange={(value) => handleFilterChange("skillToLearn", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a skill" />
          </SelectTrigger>
          <SelectContent>
            {skillOptions.map((skill) => (
              <SelectItem key={skill} value={skill}>
                {skill}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Industry</Label>
        <Select
          value={localFilters.industry}
          onValueChange={(value) => handleFilterChange("industry", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            {industryOptions.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Experience Level</Label>
        <Select
          value={localFilters.experienceLevel}
          onValueChange={(value) => handleFilterChange("experienceLevel", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Availability</Label>
        <Select
          value={localFilters.availability}
          onValueChange={(value) => handleFilterChange("availability", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekdays">Weekdays</SelectItem>
            <SelectItem value="weekends">Weekends</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MatchFilters;
