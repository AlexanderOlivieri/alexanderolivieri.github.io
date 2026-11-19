// Busqueda de seccion por imput search huvito de pascua #2
const input = document.getElementById("search");
const secciones = document.querySelectorAll("section");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const consulta = input.value.trim().toLowerCase();
    if (!consulta) return;

    const encontrada = Array.from(secciones).find((sec) => {
      const id = sec.id.toLowerCase();
      const texto = sec.textContent.toLowerCase();
      return id.includes(consulta) || texto.includes(consulta);
    });

    if (encontrada) {
      encontrada.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("No se encontró ninguna sección.");
    }
  }
});

