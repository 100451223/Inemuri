let notifIsShowing = false;

function playSoundEffect(soundSource) {
  let audio = document.getElementById("audio-player");
  audio.src = soundSource;
  audio.play();
}

function showNotif(title, text, color) {
  /* Create a notification, show it, and remove it after 3 seconds */

  if (!notifIsShowing) {
    notifIsShowing = true;

    let notifContainer = document.createElement("div");
    notifContainer.classList.add("notifications");
    // <span id="closeNotif" class="material-symbols-outlined">close</span>

    let closeNotif = document.createElement("span");
    closeNotif.id = "closeNotif";
    closeNotif.className = "material-symbols-outlined";
    closeNotif.innerText = "close";

    let notifTitle = document.createElement("h2");
    notifTitle.innerText = title;

    let notifBody = document.createElement("p");
    notifBody.innerText = text;
    notifBody.style.marginTop = "10px";

    if (color == "red") {
      notifContainer.style.backgroundColor = "rgb(255,71,71,0.85)";
    } else if (color == "green") {
      notifContainer.style.backgroundColor = "rgb(81,219,123,0.85)";
    }

    notifContainer.appendChild(closeNotif);
    notifContainer.appendChild(notifTitle);
    notifContainer.appendChild(notifBody);
    //document.body.appendChild(notifContainer);

    playSoundEffect("sounds/notif.mp3");

    setTimeout(() => {
      document.body.appendChild(notifContainer)
      notifIsShowing = false;
      notifContainer.addEventListener("click", ()=>{
        notifContainer.remove();
      })
    }, 100);
  }
}