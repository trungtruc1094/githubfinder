$(document).ready(function(){

    // Button ADD
    var identify   = $("button[id='button_identify']");
    
    identify.click(function(){
        //khai báo các biến
        let groupID= $("input[name='groupId']").val(); //lấy giá trị input tài khoản
        let faceId = $("input[name='faceId']").val(); //lấy giá trị input mật khẩu

        //kiem tra xem da nhap tai khoan chua
        if(groupID == ''){
            alert('Please input Group ID');
            return false;
        }
         

        if(faceId == ''){
            alert('Please input Face IDs');
            return false;
        }
        var arrFaceIds = jQuery.makeArray( faceId );
        
        $.ajax({
            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
            //   For example, if you obtained your subscription keys from westus, replace "westcentralus" in the
            //   URL below with "westus".
            url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify",
            dataType: "json",
            type: "POST",
            // Request body
            data: JSON.stringify({
                "personGroupId": groupID,
                "faceIds": arrFaceIds,
                "maxNumOfCandidatesReturned": 1,
                "confidenceThreshold": 0.5
            }),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");

                // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8d2c8f0ad2cf4b2ea9305f04162efb93");
            },
            statusCode: {
                200: function (response) {
                   alert('Successfully Identify');
                },
                409: function (response) {
                    alert('Person ID is conflict');
                 }
            },
            success: function(data) {
                data.forEach(function(obj) {
                    // console.log('success');
                    // console.log(obj);
                    var rowCount = $('#myTableIdentify tr').length;
                    if (rowCount > 1){
                        $("#myTableIdentify").find("tr:not(:first)").remove();
                    }
                    var can = obj.candidates;
                    can.forEach(function(ob){
                        // console.log(ob);
                        var person = ob.personId;
                        console.log(person);

                        $.ajax({
                            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
                            //   For example, if you obtained your subscription keys from westus, replace "westcentralus" in the
                            //   URL below with "westus".
                            url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + groupID + "/persons/" + person,
                            dataType: "json",
                            type: "GET",
                            // Request body
                            beforeSend: function(xhrObj){
                                // Request headers
                                xhrObj.setRequestHeader("Content-Type","application/json");
                
                                // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
                                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8d2c8f0ad2cf4b2ea9305f04162efb93");
                            },
                            statusCode: {
                                // 200: function (response) {
                                //    alert('Successfully Identify');
                                // },
                                409: function (response) {
                                    alert('Person ID is conflict');
                                    }
                                },
                        
                            success: function(dulieu){
                                console.log(dulieu);
                                // Find a <table> element with id="myTable":
                                var table = document.getElementById("myTableIdentify");
                
                                // Create an empty <tr> element and add it to the 1st position of the table:
                                var row = table.insertRow(-1);
                
                                // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                
                                // Add some text to the new cells:
                                cell1.innerHTML = dulieu.personId ;
                                cell2.innerHTML = dulieu.name;
                            }
                        }) 
                        
                    });   
                });
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