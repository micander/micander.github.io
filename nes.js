$(function () {

    var canvas = $("<canvas>")[0],
        context = canvas.getContext("2d"),
        win = window.open("", "", "width=150,height=50");

    $(win.document.body).css({ overflow: "hidden" });
    $(win.document.body).append(canvas);

    var controller = {
        left: {
            pos: { x: 0, y: 15 },

            alpha: 0.5,

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(10, 0);
                ctx.lineTo(15, 5);
                ctx.lineTo(10, 10);
                ctx.lineTo(0, 10);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            },
        },

        up: {
            pos: { x: 15, y: 0 },

            alpha: 0.5,

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(10, 0);
                ctx.lineTo(10, 10);
                ctx.lineTo(5, 15);
                ctx.lineTo(0, 10);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            },
        },

        right: {
            pos: { x: 25, y: 15 },

            alpha: 0.5,

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                ctx.beginPath();
                ctx.moveTo(0, 5);
                ctx.lineTo(5, 0);
                ctx.lineTo(15, 0);
                ctx.lineTo(15, 10);
                ctx.lineTo(5, 10);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            },
        },

        down: {
            pos: { x: 15, y: 25 },

            alpha: 0.5,

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                ctx.beginPath();
                ctx.moveTo(5, 0);
                ctx.lineTo(10, 5);
                ctx.lineTo(10, 15);
                ctx.lineTo(0, 15);
                ctx.lineTo(0, 5);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            },
        },

        a: {
            pos: { x: 125, y: 17 },

            alpha: 0.5,

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(200,0,0," + this.alpha + ")";

                ctx.beginPath();
                ctx.arc(0, 0, 9, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            },
        },

        b: {
            pos: { x: 100, y: 30 },

            alpha: 0.5,

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(200,0,0," + this.alpha + ")";

                ctx.beginPath();
                ctx.arc(0, 0, 9, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            },
        },

        select: {
            pos: { x: 45, y: 35 },

            alpha: 0.5,

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.rotate(-Math.PI / 8);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                ctx.beginPath();
                ctx.arc(14, 3, 3, 3 * Math.PI / 2, Math.PI / 2);
                ctx.arc(3, 3, 3, Math.PI / 2, 3 * Math.PI / 2);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            },
        },

        start: {
            pos: { x: 65, y: 35 },

            alpha: 0.5,

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.rotate(-Math.PI / 8);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                ctx.beginPath();
                ctx.arc(14, 3, 3, 3 * Math.PI / 2, Math.PI / 2);
                ctx.arc(3, 3, 3, Math.PI / 2, 3 * Math.PI / 2);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            },
        },
    };

    var animate = function () {
        window.requestAnimationFrame(animate);

        var text = $(".chat_line:last").text();

        context.clearRect(0, 0, canvas.width, canvas.height);

        $.each(controller, function (name, button) {
            if (text === name) {
                button.alpha = 1.0;
            } else {
                button.alpha = 0.5;
            }

            button.draw(context);
        });
    };

    animate();

});