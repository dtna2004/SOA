// URL cơ sở của API
const baseUrl = "https://jsonplaceholder.typicode.com";

// --- Kịch bản 1: Yêu cầu thành công (200 OK) ---
async function fetchExistingUser() {
    console.log("--- KỊCH BẢN 1: LẤY DỮ LIỆU NGƯỜI DÙNG TỒN TẠI ---");
    const userIdExists = 1;
    const url = `${baseUrl}/users/${userIdExists}`;
    console.log(`URL yêu cầu: ${url}`);

    try {
        const response = await fetch(url);

        // In ra mã trạng thái
        console.log(`Mã trạng thái (Status Code): ${response.status}`);

        // Phân tích mã trạng thái
        if (response.ok) { // Thuộc tính .ok là true cho các mã từ 200-299
            console.log("Phân tích: Thành công! Yêu cầu đã được xử lý và tài nguyên đã được tìm thấy.");
            const userData = await response.json(); // Lấy nội dung JSON
            console.log(`Tên người dùng: ${userData.name}`);
        } else {
            console.log(`Phân tích: Có lỗi xảy ra, mã trạng thái là ${response.status}`);
        }
    } catch (error) {
        console.error("Lỗi kết nối:", error);
    }
}

// --- Kịch bản 2: Không tìm thấy (404 Not Found) ---
async function fetchNonExistingUser() {
    console.log("\n" + "=".repeat(50) + "\n");
    console.log("--- KỊCH BẢN 2: LẤY DỮ LIỆU NGƯỜI DÙNG KHÔNG TỒN TẠI ---");
    const userIdNotExists = 999;
    const url = `${baseUrl}/users/${userIdNotExists}`;
    console.log(`URL yêu cầu: ${url}`);

    try {
        const response = await fetch(url);

        // In ra mã trạng thái
        console.log(`Mã trạng thái (Status Code): ${response.status}`);

        // Phân tích mã trạng thái
        if (response.status === 404) {
            console.log("Phân tích: Lỗi phía Client! Máy chủ không tìm thấy tài nguyên bạn yêu cầu.");
            // Thuộc tính .ok sẽ là false
            console.log(`Giá trị response.ok: ${response.ok}`);
        } else {
            console.log(`Phân tích: Có lỗi xảy ra, mã trạng thái là ${response.status}`);
        }
    } catch (error) {
        console.error("Lỗi kết nối:", error);
    }
}

// --- Kịch bản 3: Tạo tài nguyên mới (201 Created) ---
async function createNewUser() {
    console.log("\n" + "=".repeat(50) + "\n");
    console.log("--- KỊCH BẢN 3: TẠO MỘT NGƯỜI DÙNG MỚI ---");
    const url = `${baseUrl}/users`;
    console.log(`URL yêu cầu: ${url}`);

    // Dữ liệu cho người dùng mới
    const newUser = {
        name: "Gemini Assistant JS",
        username: "gemini_js",
        email: "gemini.js@example.com",
    };

    try {
        const response = await fetch(url, {
            method: 'POST', // Chỉ định phương thức là POST
            headers: {
                'Content-Type': 'application/json', // Báo cho server biết ta đang gửi JSON
            },
            body: JSON.stringify(newUser), // Chuyển đổi object JS thành chuỗi JSON
        });

        // In ra mã trạng thái
        console.log(`Mã trạng thái (Status Code): ${response.status}`);

        // Phân tích mã trạng thái
        if (response.status === 201) {
            console.log("Phân tích: Thành công! Yêu cầu đã được xử lý và một tài nguyên mới đã được tạo.");
            const createdUserData = await response.json();
            console.log("Dữ liệu trả về từ máy chủ:", createdUserData);
        } else {
            console.log(`Phân tích: Có lỗi xảy ra, mã trạng thái là ${response.status}`);
        }

    } catch (error) {
        console.error("Lỗi kết nối:", error);
    }
}

async function demo500InternalServerError() {
    console.log("\n" + "=".repeat(50) + "\n");
    console.log("--- KỊCH BẢN 2: GIẢ LẬP LỖI MÁY CHỦ (500) ---");
    // Sử dụng httpstat.us để yêu cầu một phản hồi có mã 500
    const url = "https://httpstat.us/500";
    console.log(`URL yêu cầu: ${url}`);

    try {
        const response = await fetch(url);

        console.log(`Mã trạng thái trả về: ${response.status}`);
        console.log(`Phản hồi 'OK'?: ${response.ok}`); // Sẽ là 'false'

        if (response.status === 500) {
            console.log(
                "Phân tích: Lỗi từ phía Server. Yêu cầu của bạn hoàn toàn hợp lệ, nhưng máy chủ đã gặp một sự cố bất ngờ (lỗi code, lỗi database...) và không thể xử lý nó."
            );
            console.log(
                "Hành động đề xuất: Người dùng không thể làm gì để sửa lỗi này. Thường thì chỉ có thể thử lại sau một khoảng thời gian hoặc thông báo cho quản trị viên của trang web."
            );
            // Đọc nội dung phản hồi dưới dạng text, vì nó không phải là JSON
            const responseText = await response.text();
            console.log(`Nội dung phản hồi từ server: "${responseText}"`);
        }
    } catch (error) {
        console.error("Lỗi mạng hoặc kết nối:", error);
    }
}

// --- Kịch bản 3: Quá nhiều yêu cầu (429 Too Many Requests) ---
async function demo429TooManyRequests() {
    console.log("\n" + "=".repeat(50) + "\n");
    console.log("--- KỊCH BẢN 3: GIẢ LẬP LỖI GỬI QUÁ NHIỀU YÊU CẦU (429) ---");
    // Sử dụng httpstat.us để yêu cầu một phản hồi có mã 429
    const url = "https://httpstat.us/429";
    console.log(`URL yêu cầu: ${url}`);

    try {
        const response = await fetch(url);

        console.log(`Mã trạng thái trả về: ${response.status}`);
        console.log(`Phản hồi 'OK'?: ${response.ok}`); // Sẽ là 'false'

        if (response.status === 429) {
            console.log(
                "Phân tích: Lỗi từ phía Client. Bạn đã gửi quá nhiều yêu cầu trong một khoảng thời gian nhất định (rate limiting). Máy chủ tạm thời chặn các yêu cầu tiếp theo của bạn để bảo vệ tài nguyên."
            );
            console.log(
                "Hành động đề xuất: Ngừng gửi yêu cầu ngay lập tức. Chờ một khoảng thời gian trước khi thử lại. Một số API sẽ gửi kèm header 'Retry-After' để cho bạn biết cần chờ bao lâu."
            );
            const responseText = await response.text();
            console.log(`Nội dung phản hồi từ server: "${responseText}"`);
        }
    } catch (error) {
        console.error("Lỗi mạng hoặc kết nối:", error);
    }
}



// Hàm chính để chạy tuần tự các kịch bản
async function runDemo() {
    await fetchExistingUser();
    await fetchNonExistingUser();
    await createNewUser();
    await demo500InternalServerError();
    await demo429TooManyRequests();
}

// Bắt đầu chạy demo
runDemo();