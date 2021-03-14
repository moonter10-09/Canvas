
    var yyy = document.getElementById('xxx');
    var context = yyy.getContext('2d');
    var lineWidth=4;

    autoSetCanvasSize(yyy)

    listenToUser(yyy)


    var eraserEnabled = false
    pen.onclick=function () {
        eraserEnabled = false
        pen.classList.add('active')
        eraser.classList.remove('active')
    }
    eraser.onclick=function () {
        eraserEnabled = true
        eraser.classList.add('active')
        pen.classList.remove('active')
    }
    black.onclick=function() {
        context.strokeStyle="black";
        black.classList.add("active")
        red.classList.remove("active")
        green.classList.remove("active")
        blue.classList.remove("active")
        yellow.classList.remove("active")
    }
    red.onclick=function () {
        context.strokeStyle="red";
        red.classList.add("active")
        black.classList.remove("active")
        green.classList.remove("active")
        blue.classList.remove("active")
        yellow.classList.remove("active")

    }
    green.onclick=function () {
        context.strokeStyle="green";
        green.classList.add("active")
        red.classList.remove("active")
        black.classList.remove("active")
        blue.classList.remove("active")
        yellow.classList.remove("active")

    }
    blue.onclick=function () {
        context.strokeStyle="blue";
        blue.classList.add("active")
        red.classList.remove("active")
        green.classList.remove("active")
        black.classList.remove("active")
        yellow.classList.remove("active")
    }
    yellow.onclick=function () {
        context.strokeStyle="yellow";
        yellow.classList.add("active")
        blue.classList.remove("active")
        red.classList.remove("active")
        green.classList.remove("active")
        black.classList.remove("active")

    }
    thin.onclick=function () {
        lineWidth = 2;
        thin.classList.add("active")
        thick.classList.remove("active")
    }
    thick.onclick=function () {
        lineWidth = 6;
        thick.classList.add("active")
        thin.classList.remove("active")
    }
    clear.onclick=function clearCanvas()
    {
        context.clearRect(0,0,yyy.width,yyy.height)
    }
    download.onclick=function download(){
        var url =yyy.toDataURL("image/png");
        console.log(url);
        var a=document.createElement("a");
        document.body.appendChild(a);
        a.href=url;
        a.download="我的绘画作品";
        a.click();

    }
    /******/

    function autoSetCanvasSize(canvas) {
        setCanvasSize()

        window.onresize = function() {
            setCanvasSize()
        }

        function setCanvasSize() {
            var pageWidth = document.documentElement.clientWidth
            var pageHeight = document.documentElement.clientHeight

            canvas.width = pageWidth
            canvas.height = pageHeight
        }
    }

    function drawCircle(x, y, radius) {
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill()
    }

    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1) // 起点
        context.lineWidth = lineWidth
        context.lineTo(x2, y2) // 终点
        context.stroke()
        context.closePath()
    }

    function listenToUser(canvas) {


        var using = false
        var lastPoint = {
            x: undefined,
            y: undefined
        };
        //特性检测
        if(document.body.ontouchstart!==undefined){ //用特性检测方法来检测是否支持ontouchstart属性
            //说明是触屏设备

            canvas.ontouchstart=function (aaa) {
                var x = aaa.touches[0].clientX;
                var y = aaa.touches[0].clientY;
                console.log(x,y);
                using = true;
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    lastPoint = {
                        "x": x,
                        "y": y
                    }
                }

            };
            canvas.ontouchmove=function (aaa) {
                var x = aaa.touches[0].clientX;
                var y = aaa.touches[0].clientY;
                if (!using) {return}
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    };
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            };
            canvas.ontouchend=function () {
                using = false;
            }
        }
        else {
            //说明是pc设备
           canvas.onmousedown = function(aaa) {
                var x = aaa.clientX;
                var y = aaa.clientY;
                using = true;
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    lastPoint = {
                        "x": x,
                        "y": y
                    }
                }
            };
            canvas.onmousemove = function(aaa) {
                var x = aaa.clientX;
                var y = aaa.clientY;

                if (!using) {return}

                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    };
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }

            };
            canvas.onmouseup = function(aaa) {
                using = false
            };

        }

    }





