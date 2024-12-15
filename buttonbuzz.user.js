// ==UserScript==
// @name         Me - BuzzHeavier - Add - Button Copy Full - 2024-12-09 - FF ESR
// @version      1.0
// @description  Copy all href links from td elements with class flex items-center
// @author       Me
// @icon        data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjwhLS0gTGljZW5zZTogQ0MwLiBNYWRlIGJ5IFNWRyBSZXBvOiBodHRwczovL3d3dy5zdmdyZXBvLmNvbS9zdmcvNTAwMDMvc3BvdGJyb3MtbG9nbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIGZpbGw9IiNkZDIwMjYiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCA5Ny43NTQgOTcuNzU0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5Ny43NTQgOTcuNzU0OyIKCSB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8Y2lyY2xlIGN4PSI0OS4wNDMiIGN5PSI0OC43MTEiIHI9IjE0LjkxMyIvPgoJCTxwYXRoIGQ9Ik00OC44NzcsMEMyMS44ODQsMCwwLDIxLjg4MywwLDQ4Ljg3N3MyMS44ODQsNDguODc3LDQ4Ljg3Nyw0OC44NzdzNDguODc3LTIxLjg4Myw0OC44NzctNDguODc3Uzc1Ljg3LDAsNDguODc3LDB6CgkJCSBNNDkuMDQzLDc0Ljc1Yy01LjQ1OCwwLTEwLjUyNi0xLjY2NS0xNC43MjYtNC41MTZsLTEwLjk0NCwzLjM5NGw0LjE1NC0xMC4wODRjLTIuOTg4LTQuMjYyLTQuNzQyLTkuNDUzLTQuNzQyLTE1LjA1MwoJCQljMC0xNC41MDIsMTEuNzU3LTI2LjI1OSwyNi4yNTktMjYuMjU5czI2LjI1OSwxMS43NTcsMjYuMjU5LDI2LjI1OUM3NS4zMDMsNjIuOTkzLDYzLjU0NSw3NC43NSw0OS4wNDMsNzQuNzV6Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==

// @match        *://buzzheavier.*/
// @match        *://buzzheavier.*/*
// @match        *://buzzheavier.*/*/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    /*
    * Hàm hiển thị thông báo
    * Sẽ tạo div mới, set nội dung và thuộc tính style của nó
    * Sau đó append vào body, div này sẽ tự động biến mất sau 2s
    */
    function showAlert(message) {
        let alertDiv = document.createElement('div');
        alertDiv.innerText = message;
        alertDiv.setAttribute(
            "style",
            `max-width: 1180px; position: fixed; top: 10px; left: 50%; transform: translateX(-50%); padding: calc(.667em + 2px) calc(1.333em + 2px);font-weight: 550; line-height: inherit; color: #fff; z-index: 9999; border-radius: 5px; background: linear-gradient(45deg, #0074f5 0, #03aaff 100%);background-color: #9dff20;` // Sửa lại thuộc tính style
        );
        document.body.appendChild(alertDiv);

        setTimeout(function() {
            document.body.removeChild(alertDiv);
        }, 2000); // Alert sẽ biến mất sau 2 giây
    }


    // Function to click elements by class name or id, with existence check and timeout (in seconds)
    function clickElementsBySelector(selector, type = 'class', timeoutInSeconds = 0) {
        let elements;

        // Choose the appropriate selector based on the type (class or id)
        if (type === 'class') {
            elements = document.getElementsByClassName(selector);
        } else if (type === 'id') {
            elements = [document.getElementById(selector)];
        } else {
            console.log('Invalid type specified. Please use "class" or "id".');
            return;
        }

        const timeout = timeoutInSeconds * 1000; // Convert seconds to milliseconds

        if (elements.length > 0) {
            setTimeout(() => {
                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];
                    if (!element.getAttribute('data-clicked')) {
                        element.click();
                        element.setAttribute('data-clicked', 'true');
                    }
                }
            }, timeout);
        } else {
            console.log(`No elements found with ${type}: ${selector}`);
            // Set timeout to 0 if no elements found
            setTimeout(() => {}, 0);
        }
    }


    // Hàm chung để tải thông tin các trang chi tiết của file
    async function fetchAndHandleDetailLinks() {
        // Lấy tất cả các liên kết có class 'is-dir' (liên kết của các tháng hoặc tên tập tin) trên trang tổng hợp
        const summaryLinks = Array.from(document.querySelectorAll('.is-dir a'));

        let result = ''; // Khởi tạo biến để chứa kết quả

        // Tạo mảng Promise để tải tất cả các trang chi tiết song song
        const detailPagePromises = summaryLinks.map((link, index) => {
            // Lấy nội dung của liên kết (tên của tháng hoặc tên tập tin)
            const summaryText = link.textContent.trim();
            // Tạo URL của trang chi tiết dựa trên href của liên kết
            const detailUrl = `https://buzzheavier.com${link.getAttribute('href')}`;

            // Gọi hàm fetchDetailPageLinks để lấy các link chi tiết từ trang này
            return fetchDetailPageLinks(detailUrl).then(detailLinks => {
                // Trả về kết quả là tên liên kết, số lượng liên kết chi tiết và các liên kết chi tiết
                const linkCount = detailLinks.length;
                return {
                    index, // Đánh dấu chỉ số của liên kết trong mảng ban đầu để sắp xếp lại kết quả sau này
                    summaryText, // Lưu tên liên kết
                    linkCount, // Lưu số lượng liên kết chi tiết
                    detailLinks // Lưu các liên kết chi tiết
                };
            });
        });

        // Đợi tất cả các Promise (tải các trang chi tiết) hoàn tất
        const detailPages = await Promise.all(detailPagePromises);

        // Sắp xếp kết quả theo đúng thứ tự ban đầu của các liên kết trang tổng hợp (theo chỉ số index)
        detailPages.sort((a, b) => a.index - b.index);

        // Xây dựng kết quả theo đúng thứ tự
        detailPages.forEach(page => {
            // Thêm tiêu đề (ví dụ: "2024-11 [3 Links]")
            result += `#${page.summaryText} [${page.linkCount} Links]\n`;
            // Thêm các liên kết chi tiết vào kết quả
            page.detailLinks.forEach(detailLink => {
                result += `https://buzzheavier.com${detailLink}\n`;
            });
        });

        // Thêm dòng #Files vào cuối kết quả
        //result += '#Files [1 Links]\nhttps://buzzheavier.com/cj3apqu0q5yg';

        // Trả về kết quả đã hoàn thành
        return result;
    }

    // Hàm lấy tất cả các link từ trang chi tiết
    async function fetchDetailPageLinks(url) {
        // Gửi yêu cầu fetch tới trang chi tiết
        const response = await fetch(url);
        const text = await response.text(); // Đọc nội dung của trang

        // Phân tích nội dung trang HTML bằng DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Lấy tất cả các liên kết có class 'flex items-center' (các liên kết chi tiết)
        const detailLinks = Array.from(doc.querySelectorAll('.flex.items-center a'));

        // Trả về các href của các liên kết chi tiết
        return detailLinks.map(link => link.getAttribute('href'));
    }


    // Hàm tạo nút Copy Hrefs và thêm vào trang
    function createCopyButton() {
        // Kiểm tra nếu nút đã tồn tại thì không tạo lại
        if (document.getElementById('copyHrefsButton')) return;

        // Tạo button "Hiện số Links và nhấp vào để copy"
        const copyButton = document.createElement('button');
        copyButton.id = 'copyHrefsButton'; // Gán id cho nút
        copyButton.style.cssText = 'position:fixed;top:50%;right:10px;transform:translateY(-50%);padding:10px;background-color:#4CAF50;color:white;border:none;cursor:pointer;';
        document.body.appendChild(copyButton);

        // Đếm số lượng liên kết href trong các td có class 'flex items-center'
        function updateButtonText() {
            const tds = document.querySelectorAll('td.flex.items-center a');
            const numLinks = tds.length;
            copyButton.innerText = `${numLinks} Hrefs`; // Hiển thị số lượng href trên nút
        }

        // Gọi hàm cập nhật nút mỗi khi trang load hoặc DOM thay đổi
        updateButtonText();

        // Thêm sự kiện click cho nút Copy
        copyButton.addEventListener('click', () => {
            let hrefs = [];
            let spanValue = '';

            // Lấy giá trị của span đứng trước div có class "overflow-x-auto mt-1"
            const spanElement = document.querySelector('span + div.overflow-x-auto.mt-1');
            if (spanElement) {
                spanValue = spanElement.previousElementSibling.innerText.trim(); // Lấy giá trị của span
            }

            // Chọn tất cả các td có lớp 'flex items-center' chứa thẻ <a>
            const tds = document.querySelectorAll('td.flex.items-center a');

            // Duyệt qua tất cả các thẻ <a> và lấy href
            tds.forEach(a => {
                if (a.href) {
                    hrefs.push(a.href); // Lưu giá trị href
                }
            });

            // Xây dựng chuỗi để sao chép: dấu # + spanValue và hrefs
            let copyText = '#' + spanValue + '\n'; // Thêm dấu # trước giá trị của span
            if (hrefs.length > 0) {
                copyText += hrefs.join('\n'); // Thêm tất cả các href vào sau giá trị span
            }

            // Sao chép vào clipboard
            if (copyText.trim()) {
                GM_setClipboard(copyText);
                //alert(`${hrefs.length} Hrefs và giá trị span đã được sao chép!`);
                showAlert(`Đã copy link của trang hiện tại`);
            } else {
                alert('Không tìm thấy các liên kết hoặc giá trị span!');
            }
        });


        // Tạo Dropdown List
        const dropdown = document.createElement('select');
        dropdown.style.cssText = 'position:fixed;width:350px;top:50%;right:90px;transform:translateY(-50%);padding:5px;background-color:#ffffff;border:1px solid #ccc;cursor:pointer;';
        document.body.appendChild(dropdown);

        // Các title và link tương ứng
        const titles = [
            { Title: "Files", Link: "/fs"},
            {Title: "Z Series 01 F", Link: "/fs/8rwmyku597qx"}
        ];

        // Thêm các option vào Dropdown
        titles.forEach(item => {
            const option = document.createElement('option');
            option.value = item.Link;
            option.text = item.Title;
            dropdown.appendChild(option);
        });

        // So sánh URL hiện tại với các giá trị trong dropdown
        const currentUrl = window.location.pathname; // Chỉ lấy phần pathname của URL
        let matchFound = false;

        titles.forEach(item => {
            if (currentUrl === item.Link) {
                dropdown.value = item.Link;
                matchFound = true;
            }
        });

        // Nếu không có giá trị nào khớp, đặt mặc định là "Select Folder..."
        if (!matchFound) {
            const defaultOption = document.createElement('option');
            defaultOption.text = "Select Folder...";
            defaultOption.value = ""; // Giá trị rỗng để không chuyển hướng
            dropdown.insertBefore(defaultOption, dropdown.firstChild);
            dropdown.value = ""; // Đặt dropdown về trạng thái mặc định
        }

        // Khi người dùng chọn 1 title, chuyển hướng tới liên kết tương ứng
        dropdown.addEventListener('change', () => {
            const selectedLink = dropdown.value;
            if (selectedLink) {
                window.location.href = selectedLink; // Chuyển hướng đến liên kết đã chọn
            }
        });

        // Tạo thêm nút Copy Table chỉ xuất hiện trên trang https://buzzheavier.com/fs
        if (window.location.href === 'https://buzzheavier.com/fs') {

            // Tạo button "Table Full"
            const copyTableButton = document.createElement('button');
            copyTableButton.id = 'copyTableButton'; // Gán id cho nút
            copyTableButton.style.cssText = 'position:fixed;top:45%;right:90px;transform:translateY(-50%);padding:10px;background-color:#FF9800;color:white;border:none;cursor:pointer;';
            document.body.appendChild(copyTableButton);

            // Tạo button "Table Title"
            const copyTableTitleButton = document.createElement('button');
            copyTableTitleButton.id = 'copyTableTitleButton'; // Gán id cho nút
            copyTableTitleButton.style.cssText = 'position:fixed;top:45%;right:180px;transform:translateY(-50%);padding:10px;background-color:#FF9800;color:white;border:none;cursor:pointer;';
            document.body.appendChild(copyTableTitleButton);

            // Đếm số lượng liên kết href trong các td có class 'flex items-center'
            function updateTableButtonText() {
                const tds = document.querySelectorAll('td.is-dir a');
                const numLinks = tds.length;
                copyTableButton.innerText = `Table Full`; // Hiển thị tên nút
                copyTableTitleButton.innerText = `Table Title`; // Hiển thị tên nút
            }

            // Cập nhật lại nút Copy Table mỗi khi trang load hoặc DOM thay đổi
            updateTableButtonText();

            // Hàm chung xử lý sự kiện click cho cả hai nút
            function handleCopyButtonClick(copyType) {
                let copyText = '';

                // Nếu copyType là 'full', chèn dòng đầu tiên vào
                if (copyType === 'full') {
                    copyText += `            {Title: "Files", Link: "/fs"},` + '\n'; // Dòng chèn vào đầu
                }

                // Lọc tất cả các bảng có chứa span có class 'fiv-cla fiv-icon-folder mr-1 shrink-0'
                const rows = document.querySelectorAll('table tbody tr td.is-dir');

                rows.forEach(row => {
                    const spanElement = row.querySelector('span.fiv-cla.fiv-icon-folder.mr-1.shrink-0');
                    const aElement = row.querySelector('a');

                    if (spanElement && aElement) {
                        const title = aElement.innerText.trim(); // Lấy giá trị của <a>
                        const link = aElement.getAttribute('href'); // Lấy giá trị của href

                        // Nếu sao chép toàn bộ thông tin bảng
                        if (copyType === 'full') {
                            copyText += `            {Title: "${title}", Link: "${link}"},` + '\n';
                        }
                        // Nếu chỉ sao chép tiêu đề
                        else if (copyType === 'title') {
                            copyText += `#${title}` + '\n';
                        }
                    }
                });

                // Sao chép vào clipboard
                if (copyText.trim()) {
                    GM_setClipboard(copyText);
                    //alert(`Đã sao chép thông tin bảng!`);
                } else {
                    alert('Không tìm thấy bảng có chứa thông tin!');
                }
            }

            // Thêm sự kiện click cho nút Copy Table (Sao chép thông tin bảng đầy đủ)
            copyTableButton.addEventListener('click', () => {
                handleCopyButtonClick('full');
                showAlert(`Đã copy đầy đủ thông tin folder cho dropdownlist`);
            });

            // Thêm sự kiện click cho nút Copy Table (Sao chép chỉ tiêu đề)
            copyTableTitleButton.addEventListener('click', () => {
                handleCopyButtonClick('title');
                showAlert(`Đã copy tên folder của dropdownlist`);
            });

            // Tạo button "Copy Full Info"
            const copyFullInfoButton = document.createElement('button');
            copyFullInfoButton.textContent = 'Copy';
            copyFullInfoButton.id = 'copyFullInfoButton'; // Gán id cho nút
            copyFullInfoButton.style.cssText = 'position:fixed;top:45%;right:275px;transform:translateY(-50%);padding:10px;background-color:#FF9800;color:white;border:none;cursor:pointer;';
            document.body.appendChild(copyFullInfoButton);

            // Tạo button "Donwload Full Info"
            const downloadFullInfoButton = document.createElement('button');
            downloadFullInfoButton.textContent = 'Download';
            downloadFullInfoButton.id = 'downloadFullInfoButton'; // Gán id cho nút
            downloadFullInfoButton.style.cssText = 'position:fixed;top:45%;right:340px;transform:translateY(-50%);padding:10px;background-color:#4CAF50;color:white;border:none;cursor:pointer;';
            document.body.appendChild(downloadFullInfoButton);


            // Xử lý sự kiện nhấn nút "Copy"
            copyFullInfoButton.addEventListener('click', async function() {
                const result = await fetchAndHandleDetailLinks();
                // Copy kết quả vào clipboard
                GM_setClipboard(result);
                //alert('Đã copy xong toàn bộ trang');
                showAlert(`Đã copy xong toàn bộ trang`);
            });

            // Xử lý sự kiện nhấn nút "Download"
            downloadFullInfoButton.addEventListener('click', async function() {
                const result = await fetchAndHandleDetailLinks();
                // Tạo file txt và tải xuống
                const blob = new Blob([result], {
                    type: 'text/plain'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Links.txt'; // Tên file tải xuống
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                //alert('Đã tải file liên kết xuống');
                showAlert(`Đã tải file liên kết xuống`);
            });


        }
    }

    // Tạo nút Copy ban đầu
    createCopyButton();
    //clickElementsBySelector('copyHrefsButton', 'id', 0.5);

    // Dùng MutationObserver để theo dõi thay đổi của DOM (ví dụ khi URL thay đổi mà không reload)
    //const observer = new MutationObserver(() => {
        // Cập nhật lại nút mỗi khi có sự thay đổi trong DOM
        //createCopyButton();
        //clickElementsBySelector('copyHrefsButton', 'id', 0.5);
    //});

    // Theo dõi thay đổi của body
    //observer.observe(document.body, {
        //childList: true,
        //subtree: true
    //});

    // Lắng nghe sự kiện popstate (khi URL thay đổi mà không reload trang)
    //window.addEventListener('popstate', () => {
        // Cập nhật lại nút khi URL thay đổi
        //createCopyButton();
        //clickElementsBySelector('copyHrefsButton', 'id', 0.5);
    //});
})();
