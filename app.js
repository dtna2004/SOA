console.log("Đang gửi yêu cầu để lấy thông tin người dùng có ID = 1...");
// GET DATA (lấy danh sách người dùng)
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
    }
    return response.json();
  })
  .then(user => {
    console.log("Yêu cầu thành công! Dữ liệu người dùng nhận được:");
    console.log(user[1]);
    console.log(`Tên người dùng là: ${user.name}, Email là: ${user.email}`);
  })
  .catch(error => {
    console.error("Đã có sự cố với yêu cầu fetch:", error);
  });

// POST DATA (thêm người dùng)
fetch('https://jsonplaceholder.typicode.com/users/',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john.doe@example.com'
    })
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Dữ liệu người dùng nhận được:', data);
    })
    .catch(error => {
        console.error('Đã có sự cố với yêu cầu fetch:', error);
    });

// PUT DATA (cập nhật người dùng)
fetch('https://jsonplaceholder.typicode.com/users/1',{
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Nguyen Van A',
        email: 'nguyenvana@example.com'
    })
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Dữ liệu người dùng nhận được:', data);
    })
    .catch(error => {
        console.error('Đã có sự cố với yêu cầu fetch:', error);
    });

// DELETE DATA (xóa người dùng)
fetch('https://jsonplaceholder.typicode.com/users/1',{
    method: 'DELETE',
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }
    })
    .then(data => {
        console.log('Dữ liệu người dùng nhận được:', data);
    })
    .catch(error => {
        console.error('Đã có sự cố với yêu cầu fetch:', error);
    });

// PATCH DATA (cập nhật người dùng)
fetch('https://jsonplaceholder.typicode.com/users/1',{
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Nguyen Van A',
        email: 'nguyenvana@example.com'
    })
})
