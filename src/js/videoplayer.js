const videoPlayer = document.body.querySelector(".video");

videoPlayer.addEventListener("click", function () {
  videoPlayer.play();
  videoPlayer.controls = true;
});
