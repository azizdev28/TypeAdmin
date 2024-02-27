export type StudentType = {
  id: string;
  name: string;
  username: string;
  email: string;
  group: string;
};

export type StudentStoreType = {
  loading: boolean;
  students: StudentType[];
  error: any;
  getStudents: () => void;
};
