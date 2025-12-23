document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (!header) return;

  let clicks = 0;
  const logoSrc = "assets/img/logo/logo-celestia.png";

  header.addEventListener("click", () => {
    clicks++;
    if (clicks === 7) {
      clicks = 0;

      // Sauvegarde du background initial du header
      const initialBg = header.style.background;

      // Change background du header avec le logo
      header.style.background = `url('${logoSrc}') center center / 120px 120px no-repeat`;
      header.style.transition = "background 0.5s ease";

      // Glitter overlay sur le header
      const glitter = document.createElement("div");
      glitter.style.position = "absolute";
      glitter.style.top = "0";
      glitter.style.left = "0";
      glitter.style.width = "100%";
      glitter.style.height = "100%";
      glitter.style.pointerEvents = "none";
      glitter.style.zIndex = "9998";
      glitter.style.background = "radial-gradient(circle, rgba(255,215,0,0.1) 1px, transparent 1px)";
      glitter.style.backgroundSize = "20px 20px";
      header.appendChild(glitter);

      // Popup
      const popup = document.createElement("div");
      popup.style.position = "fixed";
      popup.style.top = "50%";
      popup.style.left = "50%";
      popup.style.transform = "translate(-50%, -50%) scale(0) rotate(0deg)";
      popup.style.padding = "20px";
      popup.style.background = "black";
      popup.style.borderRadius = "12px";
      popup.style.textAlign = "center";
      popup.style.zIndex = "9999";
      popup.style.transition = "transform 0.5s ease-out, opacity 0.5s";
      popup.style.opacity = "1";

      // Logo
      const img = document.createElement("img");
      img.src = logoSrc;
      img.style.width = "120px";
      img.style.display = "block";
      img.style.margin = "0 auto";

      // Text with glitter effect
      const text = document.createElement("p");
      text.textContent = "✨ Eva rules ✨";
      text.style.marginTop = "10px";
      text.style.color = "gold";
      text.style.fontWeight = "bold";
      text.style.textShadow = "0 0 5px gold, 0 0 10px orange, 0 0 15px yellow";

      popup.appendChild(img);
      popup.appendChild(text);
      document.body.appendChild(popup);

      // Sparks around logo
      const sparks = [];
      for (let i = 0; i < 20; i++) {
        const s = document.createElement("div");
        s.style.position = "absolute";
        s.style.width = "6px";
        s.style.height = "6px";
        s.style.background = "gold";
        s.style.borderRadius = "50%";
        s.style.top = `${Math.random() * 80 + 10}%`;
        s.style.left = `${Math.random() * 80 + 10}%`;
        s.style.opacity = Math.random() * 0.8 + 0.2;
        s.style.pointerEvents = "none";
        popup.appendChild(s);
        sparks.push(s);
      }

      // Animate pop + rotation
      setTimeout(() => {
        popup.style.transform = "translate(-50%, -50%) scale(1) rotate(360deg)";
      }, 10);

      // Animate sparks with twinkle
      sparks.forEach(s => {
        const dx = (Math.random() - 0.5) * 100;
        const dy = (Math.random() - 0.5) * 100;

        const animation = s.animate([
          { transform: "translate(0,0)", opacity: s.style.opacity },
          { transform: `translate(${dx}px, ${dy}px)`, opacity: 0.3 },
          { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
        ], {
          duration: 2000,
          easing: "ease-out",
          fill: "forwards"
        });

        animation.onfinish = () => s.remove();
      });

      // Fade out popup & glitter & restore header background
      setTimeout(() => {
        popup.style.opacity = "0";
        glitter.style.opacity = "0";
        header.style.background = initialBg;
        setTimeout(() => {
          popup.remove();
          glitter.remove();
        }, 500);
      }, 3000);
    }
  });
});
