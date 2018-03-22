$(document).ready(function(){

    // Button ADD
    var detect   = $("button[id='button_detect']");
    
    detect.click(function(){
        //khai báo các biến
        let urlImage = $("input[name='urlImage']").val();

        if(urlImage == ''){
            alert('Please input URL Image');
            return false;
        }
        
        $.ajax({
            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
            //   For example, if you obtained your subscription keys from westus, replace "westcentralus" in the
            //   URL below with "westus".
            url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false",
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
                   alert('Successfully detect face');
                },
                409: function (response) {
                    alert('Person ID is conflict');
                 }
            },
            success: function(data) {
                data.forEach(function(obj) {
                    // console.log('success');
                    //console.log(obj);
                    var rowCount = $('#myTableFace tr').length;
                    if (rowCount > 1){
                        $("#myTableFace").find("tr:not(:first)").remove();
                    }
                    // Find a <table> element with id="myTable":
                    var table = document.getElementById("myTableFace");
        
                    // Create an empty <tr> element and add it to the 1st position of the table:
                    var row = table.insertRow(-1);
        
                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    var cell1 = row.insertCell(0);
        
                    // Add some text to the new cells:
                    cell1.innerHTML = obj.faceId ;
                    
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