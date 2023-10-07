import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/ManageAuctions.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const backendUrl = "https://auction-management-system.vercel.app";

const ManageAccounts = () => {
  const auth = getAuthUser();
  const [users, setUsers] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setUsers({ ...users, loading: true });
    axios
      .get("${backendUrl}/users")
      .then((resp) => {
        setUsers({ ...users, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setUsers({
          ...users,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [users.reload]);

  const deleteUser = (id) => {
    axios
      .delete("${backendUrl}/users/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setUsers({ ...users, reload: users.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="manage-auctions p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage Accounts</h3>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {users.results.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td>{user.type}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteUser(user.id);
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageAccounts;
