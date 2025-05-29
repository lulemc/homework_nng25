const mathServiceHelpText = `
    { 
    "method": "Fibonacci",
    "parameters": 10
    }
`;

const mathServiceHelpTextes = `#Fibonacci sequence for 10th number:
    { 
    "method": "Fibonacci",
    "parameters": 10
    }

#Matrix multiplication of two 2x2 matrices:
    {
    "method": "multiplyMatrices",
    "parameters": 
        [[1,2,3,4], [2,3,4,5]]
    }`;

const userServiceHelpText = `#Get user information by ID:
    {
    "method": "getUserProfile",
    "parameters": 1
    }`;

const imageServiceHelpText = `#Get image by Name:
    {
    "method": "getImageByName",
    "parameters": "cat1.jpg"
    }`;

function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

function updateButton({ buttonEl, isDark }) {
  const newIcon = isDark ? "☀️" : "🌙";
  buttonEl.html(newIcon);
}

function updateTheme({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

function toggleTheme() {
  const button = $("#theme-toggle");

  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

  let currentThemeSetting = calculateSettingAsThemeString({
    localStorageTheme,
    systemSettingDark,
  });

  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateTheme({ theme: newTheme });
  currentThemeSetting = newTheme;
}

function toggleAlign() {
  const button = $("#align-toggle");
  const currentAlign = localStorage.getItem("align");
  const newAlign = currentAlign === "left" ? "right" : "left";

  localStorage.setItem("align", newAlign);
  button.html(
    newAlign === "left"
      ? "<span>➡️</span> Right Align"
      : "<span>⬅️</span> Left Align"
  );

  if (newAlign === "left") {
    $(".control-buttons").css("justify-content", "start");
  } else {
    $(".control-buttons").css("justify-content", "end");
  }
}

function selectApi() {
  const select = $("#apis-select").find(":selected").val();
  if (select === "mathService") {
    $("#editor").val(mathServiceHelpText);
  }
  if (select === "userService") {
    $("#editor").val(userServiceHelpText);
  }
  if (select === "imageService") {
    $("#editor").val(imageServiceHelpText);
  }
}

function run() {
  const editor = $("#editor");
  const selectedService = $("#apis-select").find(":selected").val();
  const spinner = $(".loader");
  const resultBlock = document.getElementById("result");
  const apiText = editor.val();

  try {
    spinner.css("display", "block");
    const apiObject = JSON.parse(apiText);
    apiObject["service"] = selectedService;

    fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiObject),
    })
      .then((response) => {
        if (!response.ok) {
          $(".result-container").css("display", "flex");
          $("#result").css("width", "48vw");
          $("#result").css("color", "#a5243d");
          $("#show-result").html(`<div></div>`);
        }
        console.log("nem ok");
        return response.json();
      })
      .then((data) => {
        const pretty = JSON.stringify(data, null, 2);
        resultBlock.textContent = pretty;
        hljs.highlightElement(resultBlock);

        if (selectedService !== "mathService") {
          showResult(data);
        } else {
          $("#show-result").html(`<div></div>`);
        }

        $(".result-container").css("display", "flex");
        $("#result").css("width", "20vw");
        $("#result").css("color", "var(--color-fg)");

        spinner.css("display", "none");
      })
      .catch((error) => {
        spinner.css("display", "none");
      });
  } catch (error) {
    spinner.css("display", "none");
    alert("Please enter a valid JSON object.");
  }
}

function showResult(data) {
  const showResult = $("#show-result");

  if (data.result && data.result.url) {
    showResult.html(
      `<div class="profile-picture">
          <img src="${data.result.url}" alt="profile-picture">
        </div>`
    );
  } else {
    showResult.html(
      `<div class="user-card">
          <img src="${data.result.picture}" alt="profile-picture">
          <div>
            <div class="label">${data.result.user_name}</div>
            <div class="label">${data.result.email}</div>
          </div>
        </div>`
    );
  }
}

$(document).ready(function () {
  localStorage.setItem("align", "left");
  const editor = $("#editor");
  editor.val(mathServiceHelpText);
});
