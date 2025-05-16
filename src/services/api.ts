import axios from 'axios';
import { 
  TotalRegistrations, 
  ProgrammeCount, 
  YearCount, 
  SchoolCount, 
  GenderCount,
  StudentRegistration 
} from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const fetchTotalRegistrations = async (
  year?: string | number,
  programme?: string
): Promise<TotalRegistrations> => {
  const params: Record<string, any> = {};
  
  if (year && year !== 'all') params.year = year;
  if (programme && programme !== 'all') params.programme = programme;
  
  try {
    const response = await api.get<TotalRegistrations>('/api/total-registrations', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching total registrations:', error);
    throw new Error('Failed to fetch total registrations. Is the backend server running?');
  }
};

export const fetchRegistrationsByProgramme = async (
  year?: string | number
): Promise<ProgrammeCount[]> => {
  const params = year && year !== 'all' ? { year } : {};
  
  try {
    const response = await api.get<ProgrammeCount[]>('/api/registrations-by-programme', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching registrations by programme:', error);
    throw new Error('Failed to fetch programme data. Is the backend server running?');
  }
};

export const fetchRegistrationsByYear = async (
  programme?: string
): Promise<YearCount[]> => {
  const params = programme && programme !== 'all' ? { programme } : {};
  
  try {
    const response = await api.get<YearCount[]>('/api/registrations-by-year', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching registrations by year:', error);
    throw new Error('Failed to fetch year data. Is the backend server running?');
  }
};

export const fetchTopSchools = async (
  year?: string | number,
  programme?: string,
  limit: number = 10
): Promise<SchoolCount[]> => {
  const params: Record<string, any> = { limit };
  
  if (year && year !== 'all') params.year = year;
  if (programme && programme !== 'all') params.programme = programme;
  
  try {
    const response = await api.get<SchoolCount[]>('/api/top-schools', { params });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching top schools:', error);
    throw new Error('Failed to fetch top schools data. Is the backend server running?');
  }
};

export const fetchRegistrationsByGender = async (
  year?: string | number,
  programme?: string
): Promise<GenderCount[]> => {
  const params: Record<string, any> = {};
  
  if (year && year !== 'all') params.year = year;
  if (programme && programme !== 'all') params.programme = programme;
  
  try {
    const response = await api.get<GenderCount[]>('/api/registrations-by-gender', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching registrations by gender:', error);
    throw new Error('Failed to fetch gender data. Is the backend server running?');
  }
};

export const fetchRegistrations = async (
  year?: string | number,
  programme?: string,
  school?: string,
  skip: number = 0,
  limit: number = 100
): Promise<StudentRegistration[]> => {
  const params: Record<string, any> = { skip, limit };
  
  if (year && year !== 'all') params.year = year;
  if (programme && programme !== 'all') params.programme = programme;
  if (school) params.school = school;
  
  try {
    const response = await api.get<StudentRegistration[]>('/api/registrations', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw new Error('Failed to fetch registrations data. Is the backend server running?');
  }
};

export const fetchStudentRecords = async (filters: any) => {
  try {
    const response = await api.get('/api/students', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching student records:', error);
    throw new Error('Failed to fetch student records. Is the backend server running?');
  }
};

export const fetchAcademicCalendar = async (filters: any) => {
  try {
    const response = await api.get('/api/calendar', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching academic calendar:', error);
    throw new Error('Failed to fetch academic calendar. Is the backend server running?');
  }
};

export default api;
