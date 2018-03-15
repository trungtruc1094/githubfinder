$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;
        
        // Make request to Github
        // $.ajax({
        //     url:'https://api.github.com/users/'+username,
        //     data: {
        //         client_id:'03ceba21e685f3318b0a',
        //         client_secret:'e5a20c0e48ef17060dec66a898485c204dab6fe1'
        //     }
        // }).done(function(user,b){
        //     
        //     console.log(user);
        // });

        $.getJSON('https://api.github.com/users/' + username,
                    {
                        client_id:'03ceba21e685f3318b0a',
                        client_secret:'e5a20c0e48ef17060dec66a898485c204dab6fe1'
                    },
                function(result){
                    console.log(result.name);
                });
        });
    });