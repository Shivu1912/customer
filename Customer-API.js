const apiEndPoint = "http://localhost:4000/api/customer";

export const getCustomers = async () => {
  try {
    const response = await fetch(apiEndPoint);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const addCustomer = async (customer) => {
  try {
    const response = await fetch(apiEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const response = await fetch(`${apiEndPoint}/${customerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

export const updateCustomer = async (customer) => {
  try {
    const response = await fetch(`${apiEndPoint}/${customer._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

// export const authenticate = async (username, password) => {
//   console.log(username, password);
//   let userData = {
//     username: username,
//     password: password,
//   };
//   try {
//     const response = await fetch(`${apiEndPoint}/authentication`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       console.error(`HTTP error! Status: ${response.status}`);
//       return `Error: ${response.status} ${response.statusText}`;
//     }

//     try {
//       const data = await response.json();
//       console.log(data);
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         return data;
//       } else {
//         return "Authentication failed: No token received";
//       }
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//       return "Error parsing JSON";
//     }
//   } catch (error) {
//     console.error("Network error:", error);
//     return "Network error";
//   }
// };

export const authenticate = async (username, password) => {
  console.log(username, password);

  let userData = {
    username: username,
    password,
  };

  try {
    const response = await fetch(`${apiEndPoint}/authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userData),
    });
    console.log("hoooooooo", response);
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return `Error: ${response.status} ${response.statusText}`;
    }

    try {
      const data = await response.json();
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return "Authentication failed: No token received";
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return "Error parsing JSON";
    }
  } catch (error) {
    console.error("Network error:", error);
    return "Network error";
  }
};

// export const registerUser = async (username, password) => {
//   try {
//     const response = await fetch(`${apiEndPoint}/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error registering customer:", error);
//     throw error;
//   }
// };

export const getCustomerById = async (id) => {
  try {
    const response = await fetch(`${apiEndPoint}/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};
