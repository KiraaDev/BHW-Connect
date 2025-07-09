export type Resident = {
  _id: string;
  firstName: string;
  lastName: string;
  suffix?: string;
  gender: "Male" | "Female";
  birthdate: string;
  areaId: string;
  householdId?: string;
  createdAt: string;
  updatedAt: string;
};

export type NewResidentInput = Omit<
  Resident,
  "_id" | "createdAt" | "updatedAt" | "areaId"
>;
