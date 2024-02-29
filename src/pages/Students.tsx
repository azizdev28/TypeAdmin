import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Select, Table, TextInput } from "flowbite-react";
import useStudent from "../app/useStudent";
import { StudentType } from "../types/Student.type";
// import "./Students.css"; // Import CSS file for additional styling

const Students: React.FC = () => {
  const { loading, error, students, getStudents } = useStudent();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [editingStudent, setEditingStudent] = useState<StudentType | null>(
    null
  );
  const [editedName, setEditedName] = useState<string>("");
  const [editedUserName, setEditedUserName] = useState<string>("");
  const [editedEmail, setEditedEmail] = useState<string>("");
  const [editedGroup, setEditedGroup] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 4;

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

  const handleEdit = (student: StudentType) => {
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
    (student: StudentType) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGroup === "" || student.group === selectedGroup)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {loading ? <h2>Loading...</h2> : null}
      <div className="flex justify-between p-3">
        <TextInput
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={darkMode ? "dark" : "light"}
        />
        <Select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className={darkMode ? "dark" : "light"}
        >
          <option value="">All Groups</option>
          <option value="React N32">React N32</option>
          <option value="React N25">React N25</option>
          <option value="React N2">React N2</option>
        </Select>
        <Button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
      {currentItems.length > 0 ? (
        <Table hoverable className={darkMode ? "dark" : "light"}>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>UserName</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Group</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentItems.map((student: StudentType) => (
              <Table.Row
                key={student.id}
                className={darkMode ? "dark" : "light"}
              >
                <Table.Cell>
                  {editingStudent === student ? (
                    <TextInput
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className={darkMode ? "dark" : "light"}
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
                      className={darkMode ? "dark" : "light"}
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
                      className={darkMode ? "dark" : "light"}
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
                      className={darkMode ? "dark" : "light"}
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
                    <Button
                      onClick={saveEditedStudent}
                      className={darkMode ? "dark" : "light"}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleEdit(student)}
                      className={darkMode ? "dark" : "light"}
                    >
                      Edit
                    </Button>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="failure"
                    onClick={() => handleDelete(student.id)}
                    className={`font-medium ${darkMode ? "dark" : "light"}`}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : null}
      <div className="flex justify-center items-center mt-4">
        {filteredStudents.length > itemsPerPage && (
          <ul className="flex list-none">
            {Array.from({
              length: Math.ceil(filteredStudents.length / itemsPerPage),
            }).map((_, index) => (
              <li key={index} className="mx-1">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } ${darkMode ? "dark" : "light"}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        className={`text-center m-auto my-5 ${darkMode ? "dark" : "light"}`}
      >
        <Link to="/addstudent" className={darkMode ? "dark" : "light"}>
          Add Student
        </Link>
      </Button>
      {error ? <h2>{error.message}</h2> : null}
    </div>
  );
};

export default Students;
