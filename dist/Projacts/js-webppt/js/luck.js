window.onload = function() {
    var names = [
        "吴程宇", "叶婧", "秦磊", "唐云波", "陈平涛", "邓思铭", "刘耀辉", "周瑶(女)", "廖恩", "李清瑶",
        "陈逸", "周芷璇", "张苏君", "陈文静", "马思宇", "黄文君", "谭蕓漫", "邓贵羊", "廖冬艳", "贺锦莹",
        "舒彩华", "田雨欣", "朱雄辉", "高凯", "张琦", "王志强", "周瑶(男)", "曾建民", "吕帅", "杨森驿",
        "梁佳笑", "刘雨晴", "招胜秋", "杨广垚", "李纪岚", "张家骏", "费勇军", "杜远鹏", "杨洋", "朱颖",
        "罗旭", "莫登意", "李响", "邓心蕊", "蒋政", "张志威", "姜倩", "李泽宁", "张玥琪", "易鑫平",
        "文易铭", "李永超", "刘劲峰"
    ];
    var oName = document.getElementsByClassName('name');
    var oStart = document.getElementsByClassName('start');
    var oHide = document.getElementsByClassName('hide');
    var timeOut;
    var timeVal;
    var index;
    for (var s = 0; s < oHide.length; s++) {
        (function(s) {
            oHide[s].onclick = function() {
                this.getElementsByClassName('anser')[0].style.display = "inline";
            }
        })(s);
    }
    for (var i = 0; i < oStart.length; i++) {
        (function(i) {
            oStart[i].onclick = function() {
                change(i);
                downTime(i);
                setTimeout(function() {
                    clearTimeout(timeOut);
                    clearInterval(timeVal);
                    oStart[i].setAttribute('disabled', true);
                    names.splice(index, 1);
                    console.log(names);
                }, 4500);
            }
        })(i);
    }

    function downTime(i) {
        var time = 3;
        timeVal = setInterval(function() {
            oStart[i].value = time;
            time--;
        }, 1000);

    }

    function change(i) {
        var math = Math.floor(Math.random() * names.length);
        var node = oName[i];
        // console.log(math);
        timeOut = setTimeout(function() {
            index = math;
            node.innerHTML = names[math];
            change(i);
        }, 50);
    }
}