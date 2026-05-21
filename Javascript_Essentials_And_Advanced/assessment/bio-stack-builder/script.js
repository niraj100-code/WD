// Select Elements
const form = document.getElementById("linkForm");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const preview = document.getElementById("preview");
const error = document.getElementById("error");
const themeBtn = document.getElementById("themeBtn");

// Array
let links = JSON.parse(localStorage.getItem("links")) || [];

// Render Links
function renderLinks() {

    preview.innerHTML = "";

    links.forEach((link, index) => {

        preview.innerHTML += `
            <div class="link-card">

                <a href="${link.url}" target="_blank">
                    ${link.title}
                </a>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteLink(${index})"
                >
                    Remove
                </button>

            </div>
        `;
    });

    localStorage.setItem("links", JSON.stringify(links));
}

// URL Validation
function isValidURL(url) {

    const pattern = /^https:\/\/.+/;

    return pattern.test(url);
}

// Form Submit
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = titleInput.value.trim();
    const url = urlInput.value.trim();

    // Validation
    if (title === "" || url === "") {

        error.innerText = "All fields are required!";
        return;
    }

    if (!isValidURL(url)) {

        error.innerText =
            "URL must start with https://";
        return;
    }

    error.innerText = "";

    // Object
    const newLink = {
        title,
        url
    };

    // Push Data
    links.push(newLink);

    // Render
    renderLinks();

    // Clear Input
    titleInput.value = "";
    urlInput.value = "";
});

// Delete Function
function deleteLink(index) {

    links.splice(index, 1);

    renderLinks();
}

// Theme Toggle
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const darkMode =
        document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", darkMode);

    if (darkMode) {
        themeBtn.innerText = "Light Mode";
    } else {
        themeBtn.innerText = "Dark Mode";
    }
});

// Load Theme
window.addEventListener("DOMContentLoaded", () => {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "true") {

        document.body.classList.add("dark-mode");

        themeBtn.innerText = "Light Mode";
    }

    renderLinks();
});