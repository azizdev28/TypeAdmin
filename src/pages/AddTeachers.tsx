import { Alert, Button, Label, Select, TextInput } from "flowbite-react";
import { useState, FormEvent } from "react";
import { TeacherInfo } from "../types/Teacher.type";
import { useNavigate } from "react-router-dom";
import { useFormik, FormikProps } from "formik";

type TeacherFormType = {
  initialValues: TeacherInfo;
  validate: (values: TeacherInfo) => {
    name: string;
    username: string;
    email: string;
  };
  onSubmit: (value: TeacherInfo) => void;
};

const AddTeachers = () => {
  const formik: FormikProps<TeacherInfo> = useFormik<TeacherInfo>({
    initialValues: {
      name: "",
      email: "",
      username: "",
      level: "Middle",
    },
    validate: (values) => {
      const errors: {
        name: string;
        username: string;
        email: string;
      } = {
        name: "",
        email: "",
        username: "",
      };
      if (values.name === "") {
        errors.name = "Name is required";
      }
      if (values.email === "") {
        errors.email = "Email is required";
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
        errors.email = "Invalid email format";
      }
      if (values.username === "") {
        errors.username = "Username is required";
      }
      return errors;
    },
  } as TeacherFormType);

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formik.values.name ||
        !formik.values.username ||
        !formik.values.email
      ) {
        setErrorMsg("Please fill all required fields");
      } else {
        setErrorMsg("");
        const response = await fetch("http://localhost:3000/teachers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formik.values),
        });

        if (!response.ok) {
          setErrorMsg("Failed to add student");
        } else {
          formik.setValues({
            name: "",
            email: "",
            username: "",
            level: "Middle",
          });
          navigate("/teachers");
        }
      }
    } catch (error) {
      setErrorMsg("Failed to add student");
    }
  };

  return (
    <div>
      <h2 className="text-center text-5xl	my-4">Add Teachers</h2>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md flex-col gap-4 m-auto"
      >
        <div>
          <Label htmlFor="name">Name:</Label>
          <TextInput
            type="text"
            id="name"
            name="name"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="text-red-500 pt-2">{formik.errors.name}</span>
          )}
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <TextInput
            type="text"
            id="username"
            name="username"
            onBlur={formik.handleBlur}
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username && (
            <span className="text-red-500 pt-2">{formik.errors.username}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <TextInput
            type="email"
            id="email"
            name="email"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 pt-2">{formik.errors.email}</span>
          )}
        </div>
        <div>
          <Label htmlFor="group">Level</Label>
          <Select
            id="group"
            name="group"
            value={formik.values.level}
            onChange={formik.handleChange}
          >
            <option value=" Junior">Junior</option>
            <option value="Middle">Middle</option>
            <option value="Senior">Senior</option>
          </Select>
        </div>
        <Button type="submit">Add Student</Button>
        {errorMsg && (
          <Alert color="failure" className="mt-5">
            {errorMsg}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default AddTeachers;
