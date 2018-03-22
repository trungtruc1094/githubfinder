$(document).ready(function(){

    // Button ADD
    var add   = $("button[id='button_add']");
    
    add.click(function(){
        //khai báo các biến
        let groupID= $("input[name='groupId']").val(); //lấy giá trị input tài khoản
        let personID = $("input[name='personId']").val(); //lấy giá trị input mật khẩu
        let urlImage = $("input[name='urlImage']").val();

        //kiem tra xem da nhap tai khoan chua
        if(groupID == ''){
            alert('Please input Group ID');
            return false;
        }
         
        //kiem tra xem da nhap mat khau chua
        if(personID == ''){
            alert('Please input Person ID');
            return false;
        }

        if(urlImage == ''){
            alert('Please input URL Image');
            return false;
        }
        
        $.ajax({
            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
            //   For example, if you obtained your subscription keys from westus, replace "westcentralus" in the
            //   URL below with "westus".
            url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + groupID + "/persons/" + personID + "/persistedFaces",
            dataType: "json",
            type: "POST",
            // Request body
            data: JSON.stringify({
                "url": urlImage
            }),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");

                // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8d2c8f0ad2cf4b2ea9305f04162efb93");
            },
            statusCode: {
                200: function (response) {
                   alert('Successfully add Face to Person in Group');
                },
                409: function (response) {
                    alert('Person ID is conflict');
                 }
            }
        })
    });
    

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
})