import { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate import qilinadi
import useStudent from "../app/useStudent";

const Students = () => {
  const navigate = useNavigate(); // useNavigate hookini ishlatish

  const { loading, error, students, getStudents } = useStudent();

  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = async (id) => {
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

  const handleEdit = (id) => {
    // Redirect to edit student page with the student ID
    navigate(`/editstudent/${id}`); // navigate funktsiyasidan foydalanish
  };

  return (
    <div>
      {loading ? <h2>Loading...</h2> : null}
      {students.length > 0 ? (
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
            {students.map((student) => (
              <Table.Row
                key={student.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.username}</Table.Cell>
                <Table.Cell>{student.email}</Table.Cell>
                <Table.Cell>{student.group}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Delete
                  </button>
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
