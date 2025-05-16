// Types for the student registration data

export interface StudentRegistration {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  secondary_school: string;
  programme: string;
  academic_year: number;
  registration_date: string;
}

export interface ProgrammeCount {
  programme: string;
  count: number;
}

export interface YearCount {
  year: number;
  count: number;
}

export interface SchoolCount {
  school: string;
  count: number;
}

export interface GenderCount {
  gender: string;
  count: number;
}

export interface Filters {
  academicYear: string;
  programme: string;
}

export interface TotalRegistrations {
  total: number;
}
