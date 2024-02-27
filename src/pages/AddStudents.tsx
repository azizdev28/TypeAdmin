import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface StudentInfo {
  name: string;
  username: string;
  email: string;
  group: string;
}

const AddStudents: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: "",
    username: "",
    email: "",
    group: "A", // Default group value
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudentInfo({
      ...studentInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      console.log("Student added successfully");
      // Reset form fields
      setStudentInfo({
        name: "",
        username: "",
        email: "",
        group: "A",
      });
    } catch (error: string) {
      console.error("Error adding student:", error.message);
    }
  };

  return (
    <div>
      <h2 className="text-center text-5xl	my-4">Add Students</h2>
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
            value={studentInfo.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <TextInput
            type="text"
            id="username"
            name="username"
            value={studentInfo.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <TextInput
            type="email"
            id="email"
            name="email"
            value={studentInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="group">Group:</Label>
          <Select
            id="group"
            name="group"
            value={studentInfo.group}
            onChange={handleChange}
          >
            <option value="React N32">React N32</option>
            <option value="React N25">React N25</option>
            <option value="React N2">React N2</option>
          </Select>
        </div>
        <Button type="submit">Add Student</Button>
      </form>
    </div>
  );
};

export default AddStudents;
