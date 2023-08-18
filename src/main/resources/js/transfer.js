
function showTransfer(id){
    const row = document.getElementById("row-"+id);
    let columns = row.querySelectorAll("td");
    document.getElementById("fullNameTransfer").value = columns[0].innerText;
    document.getElementById("emailSender").value = columns[1].innerText;
    document.getElementById("oldBalanceTransfer").value = columns[4].innerText;

    document.getElementById("selectName").addEventListener("change", function() {
        const selectedOption = this.options[this.selectedIndex];
        const emailRecipientValue = selectedOption.getAttribute("data-email");
        document.getElementById("emailReceiver").value = emailRecipientValue;
    });


    $.ajax({
        url : API_CUSTOMER ,
        method : "GET"
    }).done(data => {
        const transferCus = data.filter(customer => customer.id !== id);
        let str = '<option>--Vui Lòng Chọn--</option>';
        transferCus.map(customer => {
            str += `<option value="${customer.id}" data-email="${customer.email}">${customer.fullName}</option>`
        })
        let senderId = row.querySelector("th").innerText;
        document.getElementById("selectName").innerHTML = str;
        document.getElementById("btnTransfer").onclick = function (){
            transferMoney(senderId)
        }
    })
}

function transferMoney(senderId){
    let oldBalance = +document.getElementById("oldBalanceTransfer").value;
    let amount = +document.getElementById("transfer").value ;
    if(amount <= 0){
        webToast.Danger({
            status:'Số Tiền Chuyển Phải Lớn Hơn 0',
            message:''
        });
    } else if(amount > oldBalance){
        webToast.Danger({
            status:'Số Dư Không Đủ',
            message:''
        });
    }
    else{
        let receiverId = document.getElementById("selectName").value;
        customer = {
            transferAmount : amount,
            receiverId : receiverId,
            senderId : senderId
        }
        $.ajax({
            url : API_TRANSFER ,
            method : "POST",
            headers : {
                'accept' : 'application/json',
                'content-type' : 'application/json'
            },
            data : JSON.stringify(customer)
        }).done(data => {
            webToast.Success({
                status:'Chuyển Tiền Thành Công ',
                message:'',
                delay: 5000
            });
            renderCustomer();
            document.getElementById("closeTransfer").click();
            document.getElementById("transfer").value = "";
        })
    }
}