// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, onValue, remove, child } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"; // Thêm thư viện Firebase Realtime Database

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

const profileTable = document.getElementById("profile-table").getElementsByTagName('tbody')[0];
const addProfileButton = document.getElementById("add-profile");

addProfileButton.addEventListener("click", () => {
    window.location.href = "add.html";
});

// Hiển thị danh sách profiles từ Firebase Realtime Database
function displayProfiles() {
    profileTable.innerHTML = '';

    const profilesRef = ref(database, 'profiles'); // Tham chiếu đến 'profiles' trong cơ sở dữ liệu

    // Sử dụng onValue để theo dõi thay đổi trong danh sách profiles
    onValue(profilesRef, (snapshot) => {
        const profiles = snapshot.val() || [];

        Object.keys(profiles).forEach((key) => {
            const profile = profiles[key];

            const row = profileTable.insertRow();

            // Tên
            const nameCell = row.insertCell(0);
            const nameLink = document.createElement("a");
            nameLink.href = `detail.html?id=${key}`;
            nameLink.textContent = profile.name;
            nameCell.appendChild(nameLink);

            // Số điện thoại
            const phoneCell = row.insertCell(1);
            phoneCell.textContent = profile.phone;

            // Email
            const emailCell = row.insertCell(2);
            emailCell.textContent = profile.roleUser;

            // Tác vụ (thêm, xóa, sửa)
            const actionsCell = row.insertCell(3);
            const editLink = document.createElement("a");
            editLink.href = `edit.html?id=${key}`;
            editLink.textContent = "Sửa";
            actionsCell.appendChild(editLink);

            const deleteLink = document.createElement("a");
            deleteLink.href = "#";
            deleteLink.textContent = "Xóa";
            deleteLink.addEventListener("click", () => {
                deleteProfile(key);
            });
            actionsCell.appendChild(deleteLink);

            // Bắt sự kiện khi bấm vào tên để chuyển đến Chi tiết Profile
            nameCell.addEventListener("click", () => {
                window.location.href = `detail.html?id=${key}`;
            });
        });
    });
}

function deleteProfile(key) {
    const profilesRef = ref(database, 'profiles'); // Tham chiếu đến 'profiles' trong cơ sở dữ liệu

    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa profile này?");
    if (confirmDelete) {
        // Sử dụng hàm remove để xóa profile theo key
        const profileRef = child(profilesRef, key);
        remove(profileRef)
            .then(() => {
                console.log("Profile đã được xóa.");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Lỗi khi xóa profile:", error);
            });
    }
}

// Gọi hàm để hiển thị danh sách profiles khi trang được nạp
displayProfiles();
