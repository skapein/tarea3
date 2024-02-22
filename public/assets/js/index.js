document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const acceptBtn = document.getElementById("acceptBtn");
    const context = canvas.getContext("2d");

    let stream;

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(startVideo)
        .catch(handleError);

    acceptBtn.addEventListener("click", captureImage);

    function startVideo(mediaStream) {
        stream = mediaStream;
        video.srcObject = mediaStream;
        video.onloadedmetadata = (e) => video.play();
    }

    function captureImage() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/jpeg");
        registerAttendance(imageData);
    }

    function registerAttendance(imageData) {
        const formData = new FormData();
        formData.append("image", imageData);

        $.ajax({
            url: "usuario.controllers.php",
            type: "post",
            data: formData,
            processData: false,
            contentType: false,
            success: handleSuccess,
            error: handleError
        });
    }

    function handleSuccess(response) {
        console.log("Se guardo la imagen");
        console.log(response);
        
    }

    function handleError(error) {
        console.error("Error:", error);
        alert("Error al acceder a la camara web");
    }
}