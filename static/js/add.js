// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"; // Thêm thư viện Firebase Realtime Database

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB1Cmz_hrf5UL2kKia-WZuMX4FKdFHcURg",
    authDomain: "test-1544c.firebaseapp.com",
    databaseURL: "https://test-1544c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-1544c",
    storageBucket: "test-1544c.appspot.com",
    messagingSenderId: "546342325481",
    appId: "1:546342325481:web:29c64adec0add76ca17478",
    measurementId: "G-YGFM26RYBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Khởi tạo Firebase Realtime Database

const addProfileForm = document.getElementById("add-profile-form");
const backToDetailButton = document.getElementById("back-to-detail");

addProfileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const imageFile = addProfileForm.elements["image"].files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function () {
            const imageData = reader.result;

            const profile = {
                image: imageData,
                name: addProfileForm.elements["name"].value,
                phone: addProfileForm.elements["phone"].value,
                roleUser: addProfileForm.elements["role-user"].value, // Thêm trường RoleUser
                description: addProfileForm.elements["description"].value, // Thêm trường Description
                facebook: addProfileForm.elements["facebook"].value,
                linkedin: addProfileForm.elements["linkedin"].value, // Thay đổi trường zalo thành linkedin
            };

            // Lưu dữ liệu vào Firebase Realtime Database
            const profilesRef = ref(database, 'profiles'); // Tham chiếu đến 'profiles' trong cơ sở dữ liệu
            push(profilesRef, profile)
                .then(() => {
                    console.log("Dữ liệu đã được lưu vào Firebase thành công.");
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.error("Lỗi khi lưu dữ liệu vào Firebase:", error);
                });
        };

        reader.readAsDataURL(imageFile);
    } else {
        alert("Vui lòng chọn một tệp hình ảnh.");
    }
});

backToDetailButton.addEventListener("click", () => {
    window.location.href = "index.html";
});
