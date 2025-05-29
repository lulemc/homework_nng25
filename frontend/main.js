const helpTexts = {
  mathService: `#Fibonacci sequence for 10th number:
{
  "method": "Fibonacci",
  "parameters": 10
}

#Matrix multiplication of two 2x2 matrices:
{
  "method": "multiplyMatrices",
  "parameters": [[1, 2, 3, 4], [2, 3, 4, 5]]
}`,

  userService: `#Get user information by ID:
{
  "method": "getUserProfile",
  "parameters": 1
}`,

  imageService: `#Get image by Name:
{
  "method": "getImageByName",
  "parameters": "cat1.jpg"
}`,
};

function calculateTheme({ localStorageTheme, systemSettingDark }) {
  return localStorageTheme ?? (systemSettingDark.matches ? "dark" : "light");
}

function updateThemeButton(buttonEl, isDark) {
  buttonEl.html(isDark ? "☀️" : "🌙");
}

function applyTheme(theme) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

function toggleTheme() {
  const button = $("#theme-toggle");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

  const currentTheme = calculateTheme({ localStorageTheme, systemSettingDark });
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateThemeButton(button, newTheme === "dark");
  applyTheme(newTheme);
}

function toggleAlign() {
  const button = $("#align-toggle");
  const currentAlign = localStorage.getItem("align") || "left";
  const newAlign = currentAlign === "left" ? "right" : "left";

  localStorage.setItem("align", newAlign);
  button.html(
    newAlign === "left"
      ? "<span>➡️</span> Right Align"
      : "<span>⬅️</span> Left Align"
  );

  $(".control-buttons").css(
    "justify-content",
    newAlign === "left" ? "start" : "end"
  );
}

function selectApi() {
  const selectedService = $("#apis-select").val();
  $("#editor").val(helpTexts[selectedService] || "");
}

function run() {
  const editor = $("#editor");
  const selectedService = $("#apis-select").val();
  const spinner = $(".loader");
  const resultBlock = document.getElementById("result");
  const resultContainer = $(".result-container");
  const showResult = $("#show-result");
  const result = $("#result");

  try {
    spinner.show();
    const apiObject = JSON.parse(editor.val());
    apiObject.service = selectedService;
    showResult.css({ width: "22vw", color: "var(--color-fg)" });

    fetch("http://localhost:3000/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiObject),
    })
      .then((res) => {
        if (!res.ok) {
          resultContainer.css("display", "flex");
          result.css({ width: "48vw", color: "#a5243d" });
          showResult.html("<div></div>");
          console.log("Request failed.");
        }
        return res.json();
      })
      .then((data) => {
        const pretty = JSON.stringify(data, null, 2);
        resultBlock.textContent = pretty;
        hljs.highlightElement(resultBlock);

        if (selectedService !== "mathService") {
          displayResult(data);
        } else {
          showResult.html("<div></div>");
        }

        resultContainer.css("display", "flex");
        showResult.css({ width: "22vw", color: "var(--color-fg)" });
        spinner.hide();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        spinner.hide();
      });
  } catch (error) {
    spinner.hide();
    alert("Please enter a valid JSON object.");
  }
}

function displayResult(data) {
  const showResult = $("#show-result");
  const result = data.result;

  if (result?.url) {
    showResult.html(`
      <div class="profile-picture">
        <img src="${result.url}" alt="profile-picture">
      </div>
    `);
  } else if (result?.picture && result?.user_name && result?.email) {
    showResult.html(`
      <div class="user-card">
        <img src="${result.picture}" alt="profile-picture">
        <div>
          <div class="label">${result.user_name}</div>
          <div class="label">${result.email}</div>
        </div>
      </div>
    `);
  } else {
    showResult.html("<div>No visual result to display.</div>");
  }
}

$(document).ready(function () {
  localStorage.setItem("align", "left");
  $("#editor").val(helpTexts.mathService);
});
