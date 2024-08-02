import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerList.css";
import {
  getCustomers,
  getCustomerById,
  deleteCustomer,
  addCustomer,
} from "../services/Customer-API";

export function CustomerList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const loadCustomers = async () => {
    try {
      const items = await getCustomers();
      setItems(items);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const recordDelete = async (id) => {
    try {
      await deleteCustomer(id);
      console.log("Deleted customer with ID:", id);
      loadCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const doEdit = (id) => {
    navigate("/customer/edit/" + id);
  };

  return (
    <div className="list-container">
      <h2>CustomerList</h2>
      <input
        type="button"
        value={"Add"}
        onClick={() => navigate("/customer/add")}
      />
      <br />
      <br />
      <List items={items} onDelete={recordDelete} doEdit={doEdit} />
    </div>
  );
}


function List({ items, onDelete, doEdit }) {
  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>
                <button onClick={() => doEdit(item._id)}>Edit</button>
              </td>
              <td>
                <button className="delete" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
