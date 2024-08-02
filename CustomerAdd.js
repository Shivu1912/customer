import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CustomerAdd.css";
import {
  getCustomerById,
  updateCustomer,
  addCustomer,
  getCustomers,
} from "../services/Customer-API";

export function CustomerAdd() {
  const navigate = useNavigate();
  const { recordId } = useParams();

  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [buttonLabel, setButtonLabel] = useState("Add");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (recordId) {
          await loadCustomer(recordId);
        } else {
          await loadItems();
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, [recordId]);

  const loadCustomer = async (id) => {
    try {
      const customerSelect = await getCustomerById(id);
      setCustomer({ ...customerSelect });
      setButtonLabel("Update");
    } catch (error) {
      console.error("Error loading customer:", error);
    }
  };

  const loadItems = async () => {
    try {
      const data = await getCustomers();
      setItems(data);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  const reset = () => {
    setCustomer({
      username: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    });
    setButtonLabel("Add");
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer.username) {
      alert("Name is required");
      return;
    }
    try {
      if (recordId) {
        await updateCustomer(customer);
      } else {
        await addCustomer(customer);
      }

      navigate("/customer/list");
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  return (
    <div className="add-container">
      <h2>Customer Add</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={customer.username}
            type="text"
            autocomplete="username"
          />
        </div>
        <div className="input-group">
          <input
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={customer.email}
            type="email"
            autocomplete="email"
          />
        </div>
        <div className="input-group">
          <input
            placeholder="Phone"
            name="phone"
            onChange={handleChange}
            value={customer.phone}
            type="tel"
            autoComplete="tel"
          />
        </div>
        <div className="input-group">
          <input
            placeholder="Address"
            name="address"
            onChange={handleChange}
            value={customer.address}
            type="text"
            autocomplete="street-address"
          />
        </div>
        <div className="input-group">
          <input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={customer.password}
            type="password"
            autocomplete="current-password"
          />
        </div>
        <div className="input-group">
          <input value={buttonLabel} type="submit" />
          <input type="button" onClick={reset} value="Cancel" />
        </div>
      </form>
    </div>
  );
}

export default CustomerAdd;
