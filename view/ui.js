
export function showMessage(element, msg, type = "error") {
  element.textContent = msg;
  element.style.display = "block";
  element.style.padding = "12px 18px";
  element.style.borderRadius = "8px";
  element.style.marginBottom = "15px";
  element.style.fontWeight = "500";
  element.style.textAlign = "center";
  element.style.transition = "all 0.3s ease";

  switch(type) {
    case "error":
      element.style.backgroundColor = "#e74c3c";
      element.style.color = "#fff";
      element.style.border = "1px solid #c0392b";
      break;
    case "success":
      element.style.backgroundColor = "#67cd5aff";
      element.style.color = "#fff";
      element.style.border = "1px solid #267050ff";
      break;
  }
}
