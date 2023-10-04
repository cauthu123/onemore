// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"; // Thêm thư viện Firebase Realtime Database

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

const editProfileForm = document.getElementById("edit-profile-form");
const backToDetailButton = document.getElementById("back-to-detail");

// Lấy ID profile từ URL
const urlParams = new URLSearchParams(window.location.search);
const profileId = urlParams.get("id");

if (profileId !== null) {
    const profilesRef = ref(database, 'profiles'); // Tham chiếu đến 'profiles' trong cơ sở dữ liệu

    // Sử dụng get() để lấy dữ liệu của profile cụ thể
    get(child(profilesRef, profileId))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const profile = snapshot.val();

                editProfileForm.elements["profile-id"].value = profileId;
                editProfileForm.elements["name"].value = profile.name;
                editProfileForm.elements["phone"].value = profile.phone;
                editProfileForm.elements["role-user"].value = profile.roleUser; // Thêm trường Role User
                editProfileForm.elements["description"].value = profile.description; // Thêm trường Description
                editProfileForm.elements["facebook"].value = profile.facebook;
                editProfileForm.elements["linkedin"].value = profile.linkedin; // Thay đổi trường zalo thành linkedin

                // Bắt sự kiện khi bấm nút "Lưu"
                editProfileForm.addEventListener("submit", (event) => {
                    event.preventDefault();

                    const imageFile = editProfileForm.elements["image"].files[0];

                    if (imageFile) {
                        const reader = new FileReader();
                        reader.onload = function () {
                            const imageData = reader.result;
                            profile.image = imageData;
                            profile.name = editProfileForm.elements["name"].value;
                            profile.phone = editProfileForm.elements["phone"].value;
                            profile.roleUser = editProfileForm.elements["role-user"].value; // Thêm trường Role User
                            profile.description = editProfileForm.elements["description"].value; // Thêm trường Description
                            profile.facebook = editProfileForm.elements["facebook"].value;
                            profile.linkedin = editProfileForm.elements["linkedin"].value; // Thay đổi trường zalo thành linkedin

                            // Sử dụng set() để cập nhật dữ liệu của profile vào Firebase Realtime Database
                            set(child(profilesRef, profileId), profile)
                                .then(() => {
                                    console.log("Dữ liệu đã được cập nhật vào Firebase thành công.");
                                    window.location.href = `detail.html?id=${profileId}`;
                                })
                                .catch((error) => {
                                    console.error("Lỗi khi cập nhật dữ liệu vào Firebase:", error);
                                });
                        };

                        reader.readAsDataURL(imageFile);
                    } else {
                        alert("Vui lòng chọn một tệp hình ảnh.");
                    }
                });
            } else {
                console.error("Không tìm thấy dữ liệu của profile.");
            }
        })
        .catch((error) => {
            console.error("Lỗi khi truy vấn dữ liệu từ Firebase:", error);
        });

    // Thêm sự kiện khi bấm nút "Quay lại Chi tiết Profile"
    backToDetailButton.addEventListener("click", () => {
        window.location.href = `detail.html?id=${profileId}`;
    });
}
