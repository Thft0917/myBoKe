$(function() {
     // 切换每个命令的描述显示
    $('.command').on('click', function () {
        $(this).find('.command-description').slideToggle();
    });

    // 切换所有描述的显示
    let areDescriptionsVisible = false;
    $('.toggle-all').on('click', function () {
        if (areDescriptionsVisible) {
            $('.command-description').slideUp();
        } else {
            $('.command-description').slideDown();
        }
        areDescriptionsVisible = !areDescriptionsVisible;
    });
})