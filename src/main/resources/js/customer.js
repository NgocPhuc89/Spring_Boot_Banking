

const API_CUSTOMER = "http://localhost:8080/api/customers"
const API_DEPOSIT = "http://localhost:8080/api/deposits"
const API_WITHDRAW = "http://localhost:8080/api/withdraws"
const API_TRANSFER = "http://localhost:8080/api/transfers"

function renderCustomer (){
    $.ajax({
        url: API_CUSTOMER,
        method: "GET"
    }).done((data) => {

        let str = '';
        data.forEach((customer) => {
            str += `
            <tr id="row-${customer.id}">
    <th>${customer.id}</th>
    <td>${customer.fullName}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.address}</td>
    <td>${customer.balance}</td>
    <td>
      <button type="button" class="btn btn-outline-success" onclick="showUpdateCustomer(${customer.id})" data-bs-toggle="modal" data-bs-target="#modalUpdate">
        <i class="fas fa-user-edit"></i>
      </button>
    </td>
    <td>
      <button type="button" class="btn btn-outline-primary" onclick="showDeposit(${customer.id})" data-bs-toggle="modal" data-bs-target="#modalPlus">
        <i class="fas fa-plus"></i>
      </button>
    </td>
    <td>
      <button type="button" class="btn btn-outline-warning" onclick="showWithdraw(${customer.id})" data-bs-toggle="modal" data-bs-target="#modalWithdraw">
        <i class="fas fa-minus"></i>
      </button>
    </td>
    <td>
      <button type="button" class="btn btn-outline-primary" onclick="showTransfer(${customer.id})" data-bs-toggle="modal" data-bs-target="#modalTransfer">
        <i class="fas fa-exchange-alt"></i>
      </button>
    </td>
    <td>
      <button type="button" class="btn btn-outline-danger">
        <i class="fas fa-user-slash"></i>
      </button>
    </td>
  </tr>  `
        })
        $('#customer').html(str) ;
    })
        .fail((error) => {
            console.log(error)
        })

}
renderCustomer();

let customer = {
}

function createCustomer(){
    customer = {
        fullName: document.getElementById("fullNameCre").value,
        email : document.getElementById("emailCre").value,
        phone : document.getElementById("phoneCre").value,
        address : document.getElementById("addressCre").value
    }
    $.ajax({
        url : API_CUSTOMER,
        method: "POST",
        headers : {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        data: JSON.stringify(customer)
    }).done((data) => {
        // const str = renderNewCustomer(data);
        // $('#customer').prepend(str);
        document.getElementById("formCreate").reset();
        document.getElementById("closeCreate").click();
        renderCustomer();
        webToast.Success({
            status:'Tạo Tài Khoản Thành Công ',
            message:'',
            delay: 5000
        });
    })

    }
// const renderNewCustomer = (customer) => {
//     return `
//                <tr id="row-${customer.id}">
//     <th>${customer.id}</th>
//     <td>${customer.fullName}</td>
//     <td>${customer.email}</td>
//     <td>${customer.phone}</td>
//     <td>${customer.address}</td>
//     <td>${customer.balance}</td>
//     <td>
//       <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#modalUpdate">
//         <i class="fas fa-user-edit"></i>
//       </button>
//     </td>
//     <td>
//       <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalPlus">
//         <i class="fas fa-plus"></i>
//       </button>
//     </td>
//     <td>
//       <button type="button" class="btn btn-outline-warning">
//         <i class="fas fa-minus"></i>
//       </button>
//     </td>
//     <td>
//       <button type="button" class="btn btn-outline-primary">
//         <i class="fas fa-exchange-alt"></i>
//       </button>
//     </td>
//     <td>
//       <button type="button" class="btn btn-outline-danger">
//         <i class="fas fa-user-slash"></i>
//       </button>
//     </td>
//   </tr>
//             `;
// }

function showUpdateCustomer(id){
    $.ajax({
        url : API_CUSTOMER + "/" + id,
        method : "GET",
    }).done(data => {
           document.getElementById("fullNameUp").value = data.fullName;
          document.getElementById("emailUp").value = data.email;
          document.getElementById("phoneUp").value = data.phone;
          document.getElementById("addressUp").value = data.address;
          document.getElementById("btnUpdate").onclick = function() {
              updateCustomer(data.id);
          };
    })
}

function updateCustomer(id){
    customer = {
        fullName: document.getElementById("fullNameUp").value,
        email : document.getElementById("emailUp").value,
        phone : document.getElementById("phoneUp").value,
        address : document.getElementById("addressUp").value
    }
    $.ajax({
        url : API_CUSTOMER + "/" + id,
        method : "PUT",
        headers: {
            'accept' : 'application/json',
            'content-type' : 'application/json'
        },
        data : JSON.stringify(customer)
    }).done (data => {
         const row = document.getElementById("row-"+ data.id);
        let columns = row.querySelectorAll("td");
        columns[0].innerText = data.fullName;
        columns[1].innerText = data.email;
        columns[2].innerText = data.phone;
        columns[3].innerText = data.address;
        $("#closeUpdate").click();
        webToast.Success({
            status:'Sửa Thông Tin Thành Công ',
            message:'',
            delay: 5000
        });

    })
}








