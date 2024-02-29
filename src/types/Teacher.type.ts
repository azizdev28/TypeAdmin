export type TeacherType = {
  id: number;
  name: string;
  username: string;
  email: string;
  level: string; // Changed property name from "level" to "level"
};

export type TeacherStoreType = {
  loading: boolean;
  teachers: TeacherType[]; // Corrected property name from "teacher" to "teachers"
  error: any;
  getTeachers: () => void;
};

export type TeacherInfo = {
  name: string;
  username: string;
  email: string;
  level: string; // Changed property name from "level" to "level"
};
