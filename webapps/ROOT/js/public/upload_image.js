function uploadImage(file, onSuccess)
{
    var interfaceUrl = global.server + '/api/driver/imageUpload';
    console.log("file="+file);

    var formdata = new FormData();
    formdata.append("image", file);
    formdata.append("Authorization", $.cookie("accountId") + ":" + $.cookie("token"));
    $.ajax({
        url: interfaceUrl,
        type: 'POST',
        data: formdata,
        cache: false,
        async: false,
        contentType: false,
        processData: false,
        success: function(msg) {
            if (msg && msg.status && msg.status.statusCode == global.status.success) {
                onSuccess(global.imageServer + msg.data.iamgeId, msg.data.iamgeId);
            } else {
                console.log('upload occur error' + msg.status.errorMsg);
                if(msg.status.statusCode == "403")
                {
                    window.location = "login.htm";
                }
            }
        },
        error: function(msg) {
            console.log(msg.status);
            if(msg.status == 403)
            {
                window.location = "login.htm";
            }
        }
    });
}
