let notifIsShowing = false;

function playSoundEffect(soundSource) {
  let audio = document.getElementById("audio-player");
  audio.src = soundSource;
  audio.play();
}

function showNotif(text, color) {
  if (!notifIsShowing) {
    notifIsShowing = true;
    let notif = document.createElement("p");
    notif.innerText = text;
    notif.classList.add("notification");
    if (color == "red") {
      notif.style.backgroundColor = "rgb(255,71,71,0.85)";
    } else if (color == "green") {
      notif.style.backgroundColor = "rgb(81,219,123,0.85)";
    }
    document.body.appendChild(notif);
    playSoundEffect("sounds/notif.mp3");
    setTimeout(() => document.body.appendChild(notif), 100)
    setTimeout(() => {
      notif.remove();
      notifIsShowing = false;
    }, 3000);
  }
}