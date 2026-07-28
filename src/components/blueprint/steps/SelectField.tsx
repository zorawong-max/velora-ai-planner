"use client";

import { useId, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OTHER = "Other";

export function SelectField({
  label,
  value,
  options,
  allowOther = false,
  otherPlaceholder = "Please specify",
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  allowOther?: boolean;
  otherPlaceholder?: string;
  onChange: (value: string) => void;
}) {
  const selectId = useId();
  const otherId = useId();
  const [showOther, setShowOther] = useState(() => allowOther && !!value && !options.includes(value));

  return (
    <div className="space-y-2">
      <Label htmlFor={selectId}>{label}</Label>
      <Select
        value={showOther ? OTHER : value || null}
        onValueChange={(next) => {
          if (next === OTHER) {
            setShowOther(true);
            onChange("");
          } else {
            setShowOther(false);
            onChange(next as string);
          }
        }}
      >
        <SelectTrigger id={selectId} className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showOther && (
        <div className="space-y-2">
          <Label htmlFor={otherId} className="sr-only">
            {label} ({OTHER})
          </Label>
          <Input
            id={otherId}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={otherPlaceholder}
          />
        </div>
      )}
    </div>
  );
}
