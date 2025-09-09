const dishes = [
  { name: "Pasta", ingredients: [
      {item: "Pasta", category: "Pasta/Rijst"},
      {item: "Tomatensaus", category: "Sauzen"},
      {item: "Kaas", category: "Zuivel"}
    ]
  },
  { name: "Salade", ingredients: [
      {item: "Sla", category: "Groente"},
      {item: "Tomaat", category: "Groente"},
      {item: "Komkommer", category: "Groente"}
    ]
  },
  { name: "Omelet", ingredients: [
      {item: "Eieren", category: "Zuivel"},
      {item: "Spek", category: "Vlees"},
      {item: "Paprika", category: "Groente"}
    ]
  }
];

const selectedDishes = new Set();
let shoppingCart = [];

const dishesDiv = document.getElementById("dishes");
dishes.forEach((dish, idx) => {
  const div = document.createElement("div");
  div.className = "dish";
  div.id = "dish-" + idx;
  div.innerHTML = `<h3>${dish.name}</h3><ul>${dish.ingredients.map(i=>`<li>${i.item}</li>`).join("")}</ul>`;
  div.onclick = () => {
    div.classList.toggle("selected");
    if(selectedDishes.has(idx)) selectedDishes.delete(idx);
    else selectedDishes.add(idx);
  };
  dishesDiv.appendChild(div);
});

function addToCart() {
  shoppingCart = [];
  selectedDishes.forEach(idx => {
    shoppingCart.push(...dishes[idx].ingredients);
  });
  alert("Ingrediënten toegevoegd aan de boodschappenwagen!");
}

function showCart() {
  const cartDiv = document.getElementById("cart");
  if(shoppingCart.length === 0) {
    cartDiv.innerHTML = "<p>Boodschappenwagen is leeg.</p>";
    return;
  }

  const categories = {};
  shoppingCart.forEach(i => {
    if(!categories[i.category]) categories[i.category] = [];
    if(!categories[i.category].includes(i.item)) categories[i.category].push(i.item);
  });

  let html = "<h2>Boodschappenwagen</h2>";
  for(const cat in categories){
    html += `<h3>${cat}</h3><ul>`;
    categories[cat].forEach(item => { html += `<li>${item}</li>`; });
    html += "</ul>";
  }
  cartDiv.innerHTML = html;
}

function exportPDF() {
  if(shoppingCart.length === 0){
    alert("Boodschappenwagen is leeg!");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Boodschappenlijst", 10, 20);
  let y = 30;

  const categories = {};
  shoppingCart.forEach(i => {
    if(!categories[i.category]) categories[i.category] = [];
    if(!categories[i.category].includes(i.item)) categories[i.category].push(i.item);
  });

  for(const cat in categories){
    doc.setFontSize(14);
    doc.text(cat, 10, y);
    y += 8;
    doc.setFontSize(12);
    categories[cat].forEach(item => { doc.text("- " + item, 15, y); y += 7; });
    y += 5;
  }

  doc.save("boodschappenlijst.pdf");
}
