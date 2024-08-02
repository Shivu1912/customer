// let customers = [
//     {id:1,name:'Vivek',email:'vivek@abc.com',phone:'98982982',address:'India'},
//     {id:2,name:'Sunil',email:'sunil@abc.com',phone:'98982982',address:'India'},
// ];

// export const getCustomers = ()=>(customers);

// export const addCustomer = (record)=>{
//     customers.push(record);
// }

// export const deleteCustomer = (record)=>{
//     let tempArray = customers.filter((item)=>(item.id !== record.id));
//     customers = tempArray;
// }

// // export const copyCustomer = (record)=>{
// //     customers = {id,name,email,phone,address}
// //     customers.push(record)
// // }

// export const updateCustomer = ({id,name,email,phone,address})=>{
//     let tempArray = customers.filter((item)=>(item.id === id));
//     if(tempArray.length > 0){
//         let editCustomer = tempArray[0];
//         editCustomer.name = name;
//         editCustomer.email = email;
//         editCustomer.phone = phone;
//         editCustomer.address = address;
//     }
//  }

//  export const getCustomerById = (record)=>{
//     let tempArray = customers.filter((item)=>(item.id == record.id));
//     customers = tempArray;
// }
