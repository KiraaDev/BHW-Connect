import { Types } from "mongoose";

export type Resident = HealthStatus & {
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  gender: "Male" | "Female";
  birthdate: Date;
  familyPosition: number;
  occupation: string;
  civilStatus: string;
  student?: EducationalStatus;
  garbageDisposal: "segregated" | "not segregated";
  waterSource: "deep well" | "LCWD";
  typeOfToilet: "faucet" | "sanitary" | "unsanitary";
  areaId: Types.ObjectId;
};

export type EducationalStatus =
  | "PS" // Pre-School
  | "EU" // Elementary Undergraduate
  | "ES" // Elementary Student
  | "EG" // Elementary Graduate
  | "HU" // High School Under Graduate
  | "HS" // High School Student
  | "HG" // High School Graduate
  | "SHS" // Senior High School
  | "ALS" // ALS Advance Learning System
  | "CU" // College Undergraduate
  | "CS" // College Student
  | "CG" // College Graduate
  | "PG" // Post Graduate/Masteral
  | "VOC" // Vocational Course
  | "NA"; // Not Applicable

export const EDUCATIONAL_STATUS_LABELS: Record<EducationalStatus, string> = {
  PS: "Pre-School",
  EU: "Elementary Undergraduate",
  ES: "Elementary Student",
  EG: "Elementary Graduate",
  HU: "High School Under Graduate",
  HS: "High School Student",
  HG: "High School Graduate",
  SHS: "Senior High School",
  ALS: "ALS Advance Learning System",
  CU: "College Undergraduate",
  CS: "College Student",
  CG: "College Graduate",
  PG: "Post Graduate / Masteral",
  VOC: "Vocational Course",
  NA: "Not Applicable",
};

type HealthStatus = {
  LMP: boolean | null;
  EDC?: boolean;
  GP?: boolean;
  TB?: boolean;
  HPN?: boolean;
  DM?: boolean;
  heartDisease?: boolean;
  disability?: boolean;
};
