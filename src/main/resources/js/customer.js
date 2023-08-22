

const API_CUSTOMER = "http://localhost:8080/api/customers"
const API_DEPOSIT = "http://localhost:8080/api/deposits"
const API_WITHDRAW = "http://localhost:8080/api/withdraws"
const API_TRANSFER = "http://localhost:8080/api/transfers"
const API_PROVINCE = "https://vapi.vnappmob.com/api/province/"
const API_DISTRICT = "https://vapi.vnappmob.com/api/province/district/"
const API_WARD = "https://vapi.vnappmob.com/api/province/ward/"
let customer = {}

function renderCustomer (){
    $.ajax({
        url: API_CUSTOMER,
        method: "GET"
    }).done((data) => {

        let str = '';
        data.forEach((customer) => {
            locationRegion = customer.locationRegion;
            str += `
            <tr id="row-${customer.id}">
    <th>${customer.id}</th>
    <td>${customer.fullName}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.balance}</td>
    <td>${locationRegion.provinceName}</td>
    <td>${locationRegion.districtName}</td>
    <td>${locationRegion.wardName}</td>
    <td>${locationRegion.address}</td>
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

function createCustomer(){
    customer = {
        fullName: document.getElementById("fullNameCre").value,
        email : document.getElementById("emailCre").value,
        phone : document.getElementById("phoneCre").value, locationRegion : {
            provinceId : document.getElementById("selectProvince").value,
            provinceName : document.getElementById("selectProvince")
                .options[document.getElementById("selectProvince").selectedIndex].text,

            districtId : document.getElementById("selectDistrict").value,
            districtName : document.getElementById("selectDistrict")
                .options[document.getElementById("selectDistrict").selectedIndex].text,

            wardId : document.getElementById("selectWard").value,
            wardName : document.getElementById("selectWard")
                .options[document.getElementById("selectWard").selectedIndex].text,

            address : document.getElementById("addressCre").value,
        }
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

function createProvince (){
    $.ajax({
        url : API_PROVINCE
    }).done (data => {
        const provinces = data.results;
        let strProvince = '<option>--Vui Lòng Chọn--</option>';
        provinces.forEach ((province) => {
            strProvince += `<option value="${province.province_id}">${province.province_name}</option>`
        })
        document.getElementById("selectProvince").innerHTML = strProvince ;


        let selectProvince = document.getElementById("selectProvince");
        selectProvince.onchange = function (){
            let provinceId = selectProvince.value;

            $.ajax({
                url : API_DISTRICT + provinceId
            }).done(data => {
                const districts = data.results;
                let strDistrict = '';
                districts.forEach(district => {
                    strDistrict += `<option value="${district.district_id}">${district.district_name}</option>`
                })
                document.getElementById("selectDistrict").innerHTML = strDistrict;


                let selectDistrict = document.getElementById("selectDistrict");
                selectDistrict.onchange = function (){
                    let districtId = selectDistrict.value;

                    $.ajax({
                        url : API_WARD + districtId
                    }).done (data => {
                        const wards = data.results;
                        let strWard = '';
                        wards.forEach(ward => {
                            strWard += `<option value="${ward.ward_id}">${ward.ward_name}</option>`
                        })
                        document.getElementById("selectWard").innerHTML = strWard;
                    })
                }
                selectDistrict.onchange();
            })
        }
        selectProvince.onchange();
    })
        .fail(error => {
            console.log(error)
        })
}
createProvince();


function updateProvince (){
    $.ajax({
        url : API_PROVINCE
    }).done (data => {
        const provinces = data.results;
        let strProvince = '';
        provinces.forEach ((province) => {
            strProvince += `<option value="${province.province_id}">${province.province_name}</option>`
        })
        document.getElementById("provinceUp").innerHTML = strProvince ;

        let updateProvince = document.getElementById("provinceUp");
        updateProvince.onchange = function (){
            let provinceId = updateProvince.value;

            $.ajax({
                url : API_DISTRICT + provinceId
            }).done(data => {
                const districts = data.results;
                let strDistrict = '';
                districts.forEach(district => {
                    strDistrict += `<option value="${district.district_id}">${district.district_name}</option>`
                })
                document.getElementById("districtUp").innerHTML = strDistrict;


                let updateDistrict = document.getElementById("districtUp");
                updateDistrict.onchange = function (){
                    let districtId = updateDistrict.value;

                    $.ajax({
                        url : API_WARD + districtId
                    }).done (data => {
                        const wards = data.results;
                        let strWard = '';
                        wards.forEach(ward => {
                            strWard += `<option value="${ward.ward_id}">${ward.ward_name}</option>`
                        })
                        document.getElementById("wardUp").innerHTML = strWard;
                    })
                }
                updateDistrict.onchange();
            })
        }
        updateProvince.onchange();
    })
        .fail(error => {
            console.log(error)
        })
}
updateProvince();

function showUpdateCustomer(id){
    $.ajax({
        url : API_CUSTOMER + "/" + id,
        method : "GET",
    }).done(data => {
        console.log(data)

           document.getElementById("fullNameUp").value = data.fullName;
          document.getElementById("emailUp").value = data.email;
          document.getElementById("phoneUp").value = data.phone;
          document.getElementById("addressUp").value = data.locationRegion.address;
          document.getElementById("provinceUp").value = data.locationRegion.provinceId;
          document.getElementById("districtUp").value = data.locationRegion.districtId;
        document.getElementById("wardUp").value = data.locationRegion.wardId;
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
        locationRegion : {
            provinceId : document.getElementById("provinceUp").value,
            provinceName : document.getElementById("provinceUp")
                .options[document.getElementById("provinceUp").selectedIndex].text,

            districtId : document.getElementById("districtUp").value,
            districtName : document.getElementById("districtUp")
                .options[document.getElementById("districtUp").selectedIndex].text,

            wardId : document.getElementById("wardUp").value,
            wardName : document.getElementById("wardUp")
                .options[document.getElementById("wardUp").selectedIndex].text,

            address : document.getElementById("addressUp").value,
        }
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
        columns[8].innerText = data.locationRegion.address;
        $("#closeUpdate").click();
        renderCustomer();
        webToast.Success({
            status:'Sửa Thông Tin Thành Công ',
            message:'',
            delay: 5000
        });

    })
}









