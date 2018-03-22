$(document).ready(function(){

    $(".show-comments").on('click', function(){

        $(".response-comments").empty();

        var tweet_id = this.id;

        $.ajax({
            type: 'GET',
            // headers: {
            //     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            // },
            url : BASE_URL + "/comments",
            _token : TOKEN,
            // url: "http://localhost/clone/public/comments",
            data: {
                id : tweet_id
            },
            success: function (response) {
                console.log(response);
                var text = "";
                if (response.length>0){
                    $.each(response, function(index, value){
                        console.log(value['body']);
                        text+=`<a href="${BASE_URL}user/${value['user']['id']}">${value['user']['name']}</a> on
                                ${value['created_at']}

                        <div class='col-lg-8 tweet-body'>
                            ${value['body']}
                        </div>`;
                    });
                }
                else {
                    text += "There are no comments for this tweet";
                }
                $("#tweetid_"+tweet_id).html(text);

            }
        })
    });

    $(".vote").on('click', function(){
        var tweet_id = this.id;
        var value = this.value;
        var parent = $(this).parent();
        $.ajax({
           url: BASE_URL + 'vote/' +tweet_id +'/value/'+ value,
            type: "GET",
            data: {
               tweet_id : tweet_id,
                value : value,
                _token : TOKEN
            },
            success: function(response){
               var text = '<i>Rating: ' +response+ '</i>';
               parent.html(text);
            }
        });
    });

    document.getElementById("uploadBtn").addEventListener('change', function(){
        document.getElementById("uploadFile").value = this.value;
    });

});

function mail(){
    var mail = document.getElementById('email');
    var regMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(!regMail.test(mail.value)) {
        mail.style.borderColor='red';
    }
    else {
        mail.style.borderColor='green';
    }
}

