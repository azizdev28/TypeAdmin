export type TeacherType = {
  id: number;
  name: string;
  username: string;
  email: string;
  level: string;
};

export type TeacherStoreType = {
  loading: boolean;
  teacher: TeacherType[];
  error: any;
  getTeachers: () => void;
};

export type TeacherInfo = {
  name: string;
  username: string;
  email: string;
  level: string;
};
