  //Upload Font
        document.getElementById("fileInput").addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file && file.name.endsWith(".ttf")) {
                fonts.push(file.name);
                updateFontList();
            } else {
                alert("Only TTF files are allowed.");
            }
        });

        function updateFontList() {
            const fontList = document.getElementById("fontList");
            fontList.innerHTML = "";
            fonts.forEach((font, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="border border-gray-300 p-2">${font}</td>
                    <td class="border border-gray-300 p-2" style="font-family: ${font};">Example</td>
                    <td class="border border-gray-300 p-2 text-red-500 cursor-pointer" onclick="removeFont(${index})">Delete</td>
                `;
                fontList.appendChild(row);
            });
        }

        function removeFont(index) {
            fonts.splice(index, 1);
            updateFontList();
        }
