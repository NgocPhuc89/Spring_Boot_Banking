
function showDeposit(id){

    $.ajax({
        url : API_CUSTOMER + "/" + id,
        method : "GET",
    }).done (data => {
        console.log(data)
        document.getElementById("fullNamePlus").value = data.fullName;
        document.getElementById("btnDeposits").onclick = function (){
            deposit(data.id);
        };
    })
    document.getElementById("deposits").value = "";
}

function deposit (id){
    const amount =  + document.getElementById("deposits").value;
    console.log(amount)
    if(amount <= 0){
        webToast.Danger({
            status:'Số Tiền Nạp Phải Lớn Hơn 0',
            message:''
        });
    }
    else {
        customer = {
            depositAmount : amount
        }
        $.ajax({
            url: API_DEPOSIT + "/" + id,
            method : "POST",
            headers : {
                'accept' : 'application/json',
                'content-type': 'application/json'
            },
            data : JSON.stringify(customer)
        }).done(data => {
            const row = document.getElementById("row-"+ data.id);
            let columns = row.querySelectorAll("td");
            columns[4].innerText = data.balance;
            $("#closePlus").click();

            webToast.Success({
                status:'Nạp Tiền Thành Công ',
                message:'',
                delay: 5000
            });
        })
    }
}