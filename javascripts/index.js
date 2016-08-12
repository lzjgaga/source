$(function () {
    var num = 0,
        $list = $('.container .product-list');

    /*菜单栏开关*/
    $('header .menu').click(function () {
        $('header .nav').toggleClass('hide');
    })

    /*回到定点被点击回到顶端*/
    $('.back-top').click(function () {
        $(window).scrollTop(0);
    })

    loadData($list, num);
    /*监听滚动条事件*/
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 300) {
            $('header').addClass('hide');
            $('.back-top').removeClass('hide');
        } else {
            $('header').removeClass('hide');
            $('.back-top').addClass('hide');
        }

        /*判断滚动到屏幕底部,然后进行动态加载*/
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            if (++num < 9) {
                loadData($list, num);
            } else {
                console.log('no data !!!' + $list.find('li').length);
            }
        }
    })

    /*封装ajax请求数据方法*/
    function loadData($ele, num) {
        $('.loading').removeClass('hide');
        $.ajax({
            /*请求后台直接问号传参,如/json-data.do?num='+num+'  http://192.168.1.209:8080/ssm/Demo1/toShow2.action*/
            url: 'json_data/data-' + num + '.json',
            success: function (data) {
                console.log(data);
                var str = '';
                $.each(data, function (i, item) {
                    str += [
                        '<li class="col-xs-6">',
                        '<a href="' + item.URL + '">',
                        '<div class="img-content">',
                        '<img src="images/' + item.imageUrl + '" alt="全栈工程师">',
                        '</div>',
                        '<div class="text-content p15">',
                        '<p>' + item.productText + '</p>',
                        '</div>',
                        '<div class="price-content p15">',
                        '<small>￥</small><strong>' + item.productPrice + '</strong>',
                        '</div>',
                        '<div class="comment-content p15">',
                        '<small>' + item.productEvaluate + '</small><span>条评论</span>',
                        '</div>',
                        '</a>',
                        '</li>'
                    ].join('');
                })
                // console.log(str);
                $list.append(str);
                setTimeout(function () {
                    $('.loading').addClass('hide');
                }, 500)

            },
            error: function () {
                alert('出错了');
            }
        })
    }
})