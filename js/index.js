$(function() {
    // 导航链接点击跳转
    $(".nav-link").click(function (e) {
        e.preventDefault();
        let targetPage = $(this).data("link");
        alert("即将跳转到 " + $(this).text() + " 页面");
        window.location.href = targetPage;
    });

    // 动态按钮点击跳转到不同页面
    $(".dynamic-btn").click(function () {
        let buttonText = $(this).text().split(" ")[1];
        alert("即将跳转到 " + buttonText + " 页面");
        window.location.href = $(this).data('link');
    });
})