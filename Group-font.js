
let fonts = [];
let fontGroups = [];
function addRow() {
    const container = document.getElementById("fontGroupContainer");
    const row = document.createElement("div");
    row.className = "flex gap-2 mb-2";
    row.innerHTML = `
        <input type="text" placeholder="Font Name" class="border p-2 flex-1">
        <select class="border p-2 flex-1">
            <option>Select a Font</option>
            ${fonts.map(font => `<option>${font}</option>`).join("")}
        </select>
        <button class="text-red-500" onclick="removeRow(this)">✖</button>
    `;
    container.appendChild(row);
}

function removeRow(button) {
    button.parentElement.remove();
}

function createGroup() {
    const title = document.getElementById("groupTitle").value;
    const rows = document.querySelectorAll("#fontGroupContainer div");
    if (rows.length < 2) {
        alert("You must select at least two fonts.");
        return;
    }

    const selectedFonts = [];
    rows.forEach(row => {
        const select = row.querySelector("select");
        if (select.value !== "Select a Font") {
            selectedFonts.push(select.value);
        }
    });

    if (selectedFonts.length < 2) {
        alert("You must select at least two fonts.");
        return;
    }

    fontGroups.push({ id: Date.now(), name: title, fonts: selectedFonts });
    renderFontGroups();
}

function renderFontGroups() {
    const table = document.getElementById("fontGroups");
    table.innerHTML = "";
    fontGroups.forEach(group => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="border border-gray-300 p-2 font-semibold cursor-pointer text-blue-600" contenteditable="true" onblur="editGroup(${group.id}, this.innerText)">${group.name}</td>
            <td class="border border-gray-300 p-2">${group.fonts.join(", ")}</td>
            <td class="border border-gray-300 p-2">${group.fonts.length}</td>
            <td class="border border-gray-300 p-2">
                <button class="text-red-500" onclick="deleteGroup(${group.id})">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });
}

function editGroup(id, newName) {
    const group = fontGroups.find(g => g.id === id);
    if (group) group.name = newName;
}

function deleteGroup(id) {
    fontGroups = fontGroups.filter(g => g.id !== id);
    renderFontGroups();
}