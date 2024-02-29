import { create } from "zustand";
import { TeacherStoreType } from "../types/Teacher.type";

const useTeacher = create<TeacherStoreType>((set) => ({
  loading: false,
  teachers: [],
  error: null,
  getTeachers: async () => {
    try {
      set(() => ({
        loading: true,
      }));
      const res = await fetch("http://localhost:3000/teachers");
      const data = await res.json();
      set(() => ({
        loading: false,
        students: data,
        error: null,
      }));
    } catch (err: any) {
      set(() => ({
        loading: false,
        error: err.message,
      }));
    }
  },
}));

export default useTeacher;
