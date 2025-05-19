// darkmood

const classMap = {
    "bg-white": "bg-night",
    "text-dark": "text-light",
    "body": "body-night",
    "text-muted": "text-muted-night",
    "text-secondary": "text-secondary-night",
    "btn-light": "btn-light-night",
    "modal_ave": "modal_ave-night",
    "bg-secondary": "bg-secondary-night",
    "table": "table-night",
    "text-black": "text-light",
    "link-dark": "link-light",
};
  
// تغییر رنگ متن دکمه‌ها
function updateButtonTextColor(toDark) {
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.classList.remove(toDark ? 'text-dark' : 'text-white-night');
    btn.classList.add(toDark ? 'text-white-night' : 'text-dark');
});
}

// سوییچ کردن کلاس‌ها به حالت دارک یا لایت
function switchThemeClasses(toDark) {
for (const [light, dark] of Object.entries(classMap)) {
    document.querySelectorAll(`.${toDark ? light : dark}`).forEach(el => {
    el.classList.remove(toDark ? light : dark);
    el.classList.add(toDark ? dark : light);
    });
}

updateButtonTextColor(toDark);
}

// وضعیت اولیه تم از localStorage
let isDark = localStorage.getItem("theme") === "dark";

// تابع سوییچ تم
function toggleTheme() {
isDark = !isDark;
localStorage.setItem("theme", isDark ? "dark" : "light");
switchThemeClasses(isDark);

// ست یا حذف کردن data-bs-theme روی تگ html
if (isDark) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
} else {
    document.documentElement.removeAttribute("data-bs-theme");
}
}

// اعمال حالت دارک موقع لود صفحه
window.addEventListener("DOMContentLoaded", () => {
if (isDark) {
    switchThemeClasses(true);
    document.documentElement.setAttribute("data-bs-theme", "dark");
}
});