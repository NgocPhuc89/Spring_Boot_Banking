
function showWithdraw (id){
    $.ajax({
        url : API_CUSTOMER + "/" + id,
        method : "GET"
    }).done(data => {
        document.getElementById("fullNameWithdraw").value = data.fullName;
        document.getElementById("oldBalance").value = data.balance;
        document.getElementById("btnWithdraw").onclick = function (){
            withdraw(data.id);
        }
    })
}

function withdraw (id){
    const amount = + document.getElementById("withdraw").value;
    const balance = + document.getElementById("oldBalance").value;
    if(amount <= 0){
        webToast.Danger({
            status:'Số Tiền Rút Phải Lớn Hơn 0',
            message:''
        });
    } else if(amount > balance){
        webToast.Danger({
            status:'Số Dư Không Đủ',
            message:''
        });
    }
    else {
        customer = {
            withdrawAmount : amount
        }
        $.ajax({
            url : API_WITHDRAW + "/" + id,
            method : "POST",
            headers : {
                'accept' : 'application/json',
                'content-type' : 'application/json'
            },
            data : JSON.stringify(customer)
        }).done(data => {
            const row = document.getElementById("row-"+ data.id);
            let columns = row.querySelectorAll("td");
            columns[4].innerText = data.balance;
            document.getElementById("closeWithdraw").click();
            document.getElementById("withdraw").value = "";

            webToast.Success({
                status:'Rút Tiền Thành Công ',
                message:'',
                delay: 5000
            });
        })
    }
}