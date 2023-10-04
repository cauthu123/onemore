// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, get, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"; // Thêm thư viện Firebase Realtime Database

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

const profileImage = document.getElementById("profile-image");
const profileName = document.getElementById("profile-name");
const profileRole = document.getElementById("profile-role");
const profilePhone = document.getElementById("profile-phone");
const profileDescription = document.getElementById("profile-description"); // Thêm tham chiếu đến trường Description
const profileFacebook = document.getElementById("profile-facebook");
const profileLinkedIn = document.getElementById("profile-linkedin"); // Thay đổi tham chiếu từ profileZalo thành profileLinkedIn
const editProfileButton = document.getElementById("edit-profile");
const deleteProfileButton = document.getElementById("delete-profile");

const urlParams = new URLSearchParams(window.location.search);
const profileId = urlParams.get("id");

if (profileId !== null) {
    // Tham chiếu đến địa chỉ Firebase Realtime Database của profile
    const profileRef = ref(database, `profiles/${profileId}`);

    // Truy xuất dữ liệu từ Firebase Realtime Database
    get(profileRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const profile = snapshot.val();
                profileImage.src = profile.image;
                profileName.textContent = profile.name;
                profileRole.textContent = profile.roleUser;
                profilePhone.href = 'tel:' + profile.phone;
                profileDescription.textContent = profile.description; // Hiển thị trường Description
                profileFacebook.href = profile.facebook;
                profileLinkedIn.href = profile.linkedin; // Thay đổi trường zalo thành linkedin

                editProfileButton.addEventListener("click", () => {
                    window.location.href = `edit.html?id=${profileId}`;
                });

                deleteProfileButton.addEventListener("click", () => {
                    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa profile này?");
                    if (confirmDelete) {
                        // Xóa profile từ Firebase Realtime Database
                        remove(profileRef)
                            .then(() => {
                                console.log("Profile đã bị xóa từ Firebase Realtime Database.");
                                window.location.href = "index.html"; // Chuyển về trang danh sách sau khi xóa
                            })
                            .catch((error) => {
                                console.error("Lỗi khi xóa profile từ Firebase Realtime Database:", error);
                            });
                    }
                });
            } else {
                console.error("Không tìm thấy profile.");
            }
        })
        .catch((error) => {
            console.error("Lỗi khi truy xuất dữ liệu từ Firebase:", error);
        });
}

const copyUrlIcon = document.getElementById("copy-url");

copyUrlIcon.addEventListener("click", () => {
    // Lấy địa chỉ URL hiện tại của trang
    const currentUrl = window.location.href;

    // Tạo một phần tử textarea ẩn để sao chép vào clipboard
    const textArea = document.createElement("textarea");
    textArea.value = currentUrl;
    document.body.appendChild(textArea);

    // Chọn và sao chép nội dung vào clipboard
    textArea.select();
    document.execCommand("copy");

    // Loại bỏ phần tử textarea sau khi sao chép xong
    document.body.removeChild(textArea);

    // Hiển thị thông báo hoặc cập nhật giao diện người dùng khác (tuỳ theo bạn)
    alert("Địa chỉ URL đã được sao chép vào clipboard!");
});

const backButton = document.getElementById("back-to-list");
if (backButton) {
    backButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

