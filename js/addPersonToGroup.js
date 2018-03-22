$(document).ready(function(){
    // Button ADD
    var add   = $("button[id='button_add']");
    // Button List
    var list = $("button[id='button_list']");

    add.click(function(){
        //khai báo các biến
        let groupID= $("input[name='groupId']").val(); //lấy giá trị input tài khoản
        let personName = $("input[name='personName']").val(); //lấy giá trị input mật khẩu

        //kiem tra xem da nhap tai khoan chua
        if(groupID == ''){
            alert('Please input Group ID');
            return false;
        }
         
        //kiem tra xem da nhap mat khau chua
        if(personName == ''){
            alert('Please input Person Name');
            return false;
        }
        
        $.ajax({
            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
            //   For example, if you obtained your subscription keys from westus, replace "westcentralus" in the
            //   URL below with "westus".
            url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + groupID + "/persons",
            dataType: "json",
            type: "POST",
            // Request body
            data: JSON.stringify({
                "name": personName,
                "userData": "User-provided data attached to the person."
            }),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");

                // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8d2c8f0ad2cf4b2ea9305f04162efb93");
            },
            statusCode: {
                200: function (response) {
                   alert('Successfully add Person to group');
                },
                409: function (response) {
                    alert('Group ID is conflict');
                 }
            }
        })
    });
    //----------
    

    // $('#groupID').on('keyup', function(e){
    //     let username = e.target.value;
        
    //     //Make request to Github
    //     $.ajax({
    //         url:'https://api.github.com/users/'+username,
    //         data: {
    //             client_id:'03ceba21e685f3318b0a',
    //             client_secret:'e5a20c0e48ef17060dec66a898485c204dab6fe1'
    //         }
    //     }).done(function(user,b){
            
    //         console.log(user);
    //     });
    // })

    // BUTTON LIST
    list.click(function(){
        //alert('Clicked');
        let groupID= $("input[name='groupId']").val(); //lấy giá trị input tài khoản
        $.ajax({
            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
            //   For example, if you obtained your subscription keys from westus, replace "westcentralus" in the
            //   URL below with "westus".
            url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + groupID + "/persons?top=1000",
            dataType: "json",
            type: "GET",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");

                // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8d2c8f0ad2cf4b2ea9305f04162efb93");
            },
            statusCode: {
                200: function (response) {
                   alert('Success');
                },
                409: function (response) {
                    alert('Group ID is conflict');
                 }
            }
        })
        .done(function(data){
            
            var rowCount = $('#myTable tr').length;
            if (rowCount > 1){
                $("#myTable").find("tr:not(:first)").remove();
            }
            data.forEach(function(obj) {
                // Find a <table> element with id="myTable":
                var table = document.getElementById("myTable");

                // Create an empty <tr> element and add it to the 1st position of the table:
                var row = table.insertRow(-1);

                // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);

                // Add some text to the new cells:
                cell1.innerHTML = obj.personId ;
                cell2.innerHTML = obj.name;
            });
        });
    });

    //----
})