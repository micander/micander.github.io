$(function () {

    $("#controls > div").hide();

    $('<canvas id="viewport" width="140" height="65">')
        .css("float", "left")
        .appendTo("#controls");

    $("<button />", {
        text: "Show",
        click: function () {
            var text = $(this).text();

            if (text === "Show") {
                $(this).text("Hide");
                $("#controls > div").show();
            } else if (text === "Hide") {
                $(this).text("Show");
                $("#controls > div").hide();
            }
        },
    })
        .css("float", "left")
        .appendTo("#controls");

    var canvas = $("#viewport")[0],
        context = canvas.getContext("2d");

    var controller = {
        anarchy: {
            pos: { x: 45, y: 0 },

            alpha: 0.5,

            image: (function () { var img = new Image(); img.src = "http://cdn.bulbagarden.net/upload/4/47/Bag_Helix_Fossil_Sprite.png"; return img; })(),

            path: function (ctx) {
                ctx.beginPath();
                ctx.rect(0, 0, this.image.width, this.image.height);
                ctx.closePath();
            },

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.globalAlpha = this.alpha;

                ctx.drawImage(this.image, 0, 0);

                ctx.restore();
            },
        },

        democracy: {
            pos: { x: 70, y: 0 },

            alpha: 0.5,

            image: (function () { var img = new Image(); img.src = "http://cdn.bulbagarden.net/upload/5/5f/Bag_Dome_Fossil_Sprite.png"; return img; })(),

            path: function (ctx) {
                ctx.beginPath();
                ctx.rect(0, 0, this.image.width, this.image.height);
                ctx.closePath();
            },

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.globalAlpha = this.alpha;

                ctx.drawImage(this.image, 0, 0);

                ctx.restore();
            },
        },

        left: {
            pos: { x: 0, y: 15 },

            alpha: 0.5,

            path: function (ctx) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(10, 0);
                ctx.lineTo(15, 5);
                ctx.lineTo(10, 10);
                ctx.lineTo(0, 10);
                ctx.closePath();
            },

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                this.path(ctx);
                ctx.fill();

                ctx.restore();
            },
        },

        up: {
            pos: { x: 15, y: 0 },

            alpha: 0.5,

            path: function (ctx) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(10, 0);
                ctx.lineTo(10, 10);
                ctx.lineTo(5, 15);
                ctx.lineTo(0, 10);
                ctx.closePath();
            },

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                this.path(ctx);
                ctx.fill();

                ctx.restore();
            },
        },

        right: {
            pos: { x: 25, y: 15 },

            alpha: 0.5,

            path: function (ctx) {
                ctx.beginPath();
                ctx.moveTo(0, 5);
                ctx.lineTo(5, 0);
                ctx.lineTo(15, 0);
                ctx.lineTo(15, 10);
                ctx.lineTo(5, 10);
                ctx.closePath();
            },

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                this.path(ctx);
                ctx.fill();

                ctx.restore();
            },
        },

        down: {
            pos: { x: 15, y: 25 },

            alpha: 0.5,

            path: function (ctx) {
                ctx.beginPath();
                ctx.moveTo(5, 0);
                ctx.lineTo(10, 5);
                ctx.lineTo(10, 15);
                ctx.lineTo(0, 15);
                ctx.lineTo(0, 5);
                ctx.closePath();
            },

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                this.path(ctx);
                ctx.fill();

                ctx.restore();
            },
        },

        a: {
            pos: { x: 125, y: 17 },

            alpha: 0.5,

            path: function (ctx) {
                ctx.beginPath();
                ctx.arc(0, 0, 9, 0, Math.PI * 2);
                ctx.closePath();
            },

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(200,0,0," + this.alpha + ")";

                this.path(ctx);
                ctx.fill();

                ctx.restore();
            },
        },

        b: {
            pos: { x: 105, y: 30 },

            alpha: 0.5,

            path: function (ctx) {
                ctx.beginPath();
                ctx.arc(0, 0, 9, 0, Math.PI * 2);
                ctx.closePath();
            },

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.fillStyle = "rgba(200,0,0," + this.alpha + ")";

                this.path(ctx);
                ctx.fill();

                ctx.restore();
            },
        },

        select: {
            pos: { x: 45, y: 35 },

            alpha: 0.5,

            path: function (ctx) {
                ctx.beginPath();
                ctx.arc(14, 3, 3, 3 * Math.PI / 2, Math.PI / 2);
                ctx.arc(3, 3, 3, Math.PI / 2, 3 * Math.PI / 2);
                ctx.closePath();
            },

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.rotate(-Math.PI / 8);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                this.path(ctx);
                ctx.fill();

                ctx.restore();
            },
        },

        start: {
            pos: { x: 70, y: 35 },

            alpha: 0.5,

            path: function (ctx) {
                ctx.beginPath();
                ctx.arc(14, 3, 3, 3 * Math.PI / 2, Math.PI / 2);
                ctx.arc(3, 3, 3, Math.PI / 2, 3 * Math.PI / 2);
                ctx.closePath();
            },

            draw: function (ctx) {
                ctx.save();

                ctx.translate(this.pos.x, this.pos.y);

                ctx.rotate(-Math.PI / 8);

                ctx.fillStyle = "rgba(0,0,0," + this.alpha + ")";

                this.path(ctx);
                ctx.fill();

                ctx.restore();
            },
        },
    };

    var animate = function () {
        window.requestAnimationFrame(animate);

        context.clearRect(0, 0, canvas.width, canvas.height);

        var text = $(".chat_line:last").text();

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

    $(canvas).mousedown(function (e) {
        if (e.which === 1) {
            $.each(controller, function (name, button) {
                context.save();

                context.translate(button.pos.x, button.pos.y);

                if (name === "start" || name === "select") {
                    context.rotate(-Math.PI / 8);
                }

                button.path(context);

                if (context.isPointInPath(e.offsetX, e.offsetY)) {
                    $("#chat_text_input").val(name);
                    $("#chat_speak").trigger("click");
                }

                context.restore();
            });
        }
    });
});
