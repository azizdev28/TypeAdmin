import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Select, Table, TextInput } from "flowbite-react";
import useStudent, { Student } from "../app/useStudent";

const Students: React.FC = () => {
  const { loading, error, students, getStudents } = useStudent();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedUserName, setEditedUserName] = useState<string>("");
  const [editedEmail, setEditedEmail] = useState<string>("");
  const [editedGroup, setEditedGroup] = useState<string>("");

  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      // Perform delete operation
      await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
      });
      // After successful deletion, fetch updated students list
      getStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setEditedName(student.name);
    setEditedUserName(student.username);
    setEditedEmail(student.email);
    setEditedGroup(student.group);
  };

  const saveEditedStudent = async () => {
    try {
      if (editingStudent) {
        // Perform update operation
        await fetch(`http://localhost:3000/students/${editingStudent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editedName,
            username: editedUserName,
            email: editedEmail,
            group: editedGroup,
          }),
        });
        // After successful update, fetch updated students list
        getStudents();
        // Reset editing state
        setEditingStudent(null);
      }
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  const filteredStudents = students.filter(
    (student: Student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGroup === "" || student.group === selectedGroup)
  );

  return (
    <div>
      {loading ? <h2>Loading...</h2> : null}
      <div className="flex justify-between p-3">
        <TextInput
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="">All Groups</option>
          <option value="React N32">React N32</option>
          <option value="React N25">React N25</option>
          <option value="React N2">React N2</option>
        </Select>
      </div>
      {filteredStudents.length > 0 ? (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>UserName</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Group</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredStudents.map((student: Student) => (
              <Table.Row
                key={student.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  {editingStudent === student ? (
                    <TextInput
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    student.name
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingStudent === student ? (
                    <TextInput
                      value={editedUserName}
                      onChange={(e) => setEditedUserName(e.target.value)}
                    />
                  ) : (
                    student.username
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingStudent === student ? (
                    <TextInput
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  ) : (
                    student.email
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingStudent === student ? (
                    <Select
                      value={editedGroup}
                      onChange={(e) => setEditedGroup(e.target.value)}
                    >
                      <option value="React N32">React N32</option>
                      <option value="React N25">React N25</option>
                      <option value="React N2">React N2</option>
                    </Select>
                  ) : (
                    student.group
                  )}
                </Table.Cell>
                <Table.Cell>
                  {editingStudent === student ? (
                    <Button onClick={saveEditedStudent}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEdit(student)}>Edit</Button>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="failure"
                    onClick={() => handleDelete(student.id)}
                    className="font-medium dark:text-red-500"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : null}
      <Button className="text-center m-auto my-5">
        <Link to="/addstudent">Add Student</Link>
      </Button>
      {error ? <h2>{error.message}</h2> : null}
    </div>
  );
};

export default Students;
