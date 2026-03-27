let items = JSON.parse(localStorage.getItem("items")) || [];
const itemsList = document.getElementById("itemsList");

// Initial render
renderItems();

/* ================= ADD ITEM ================= */
function addItem() {
    const name = document.getElementById("itemName").value.trim();
    const location = document.getElementById("location").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const secret = document.getElementById("secret").value.trim();
    const type = document.getElementById("type").value;
    const imageFile = document.getElementById("itemImage").files[0];

    if (!name || !location || !contact || !secret || !imageFile) {
        alert("Please fill all fields and upload an image.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        const item = {
            id: Date.now(),
            name,
            location,
            contact,
            secret,
            type,
            image: reader.result
        };

        items.push(item);
        saveToLocal();
        renderItems();
        clearForm();
    };

    reader.readAsDataURL(imageFile);
}

/* ================= RENDER ITEMS ================= */
function renderItems() {
    itemsList.innerHTML = "";

    if (items.length === 0) {
        itemsList.innerHTML = `<p style="text-align:center;color:#64748b;">No items yet</p>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.image}" alt="item">

            <div class="card-content">
                <h3>${item.name}</h3>
                <div class="location">📍 ${item.location}</div>

                <span class="status ${item.type.toLowerCase()}">
                    ${item.type}
                </span>

                <div class="actions">
                    <button class="action-btn contact-btn" onclick="showContact(this)">
                        📞 Contact
                    </button>

                    <button class="action-btn remove-btn" onclick="removePost(${item.id})">
                        🗑 Remove
                    </button>
                </div>

                <p class="contact" style="display:none;">📱 ${item.contact}</p>
            </div>
        `;

        itemsList.appendChild(card);
    });
}

/* ================= SHOW CONTACT ================= */
function showContact(btn) {
    const contact = btn.parentElement.nextElementSibling;
    contact.style.display = "block";
    btn.remove();
}

/* ================= REMOVE POST ================= */
function removePost(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const code = prompt("Enter your secret code to remove this post:");

    if (code === item.secret) {
        items = items.filter(i => i.id !== id);
        saveToLocal();
        renderItems();
        alert("Post removed successfully.");
    } else {
        alert("Invalid secret code!");
    }
}

/* ================= SAVE ================= */
function saveToLocal() {
    localStorage.setItem("items", JSON.stringify(items));
}

/* ================= CLEAR FORM ================= */
function clearForm() {
    document.getElementById("itemName").value = "";
    document.getElementById("location").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("secret").value = "";
    document.getElementById("itemImage").value = "";
}

/* ================= CLEAR ALL DATA ================= */
function clearAllData() {
    if (confirm("Are you sure you want to delete all items?")) {
        localStorage.removeItem("items");
        items = [];
        renderItems();
    }
}