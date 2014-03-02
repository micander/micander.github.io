/* Forked from mkosler's script at http://git.io/XrMw3w
 * as of Revision 4. We're forking all scripts that are called
 * from javascript snippets as a precaution to keep people from
 * modifying their scripts to add malicious code. Do understand
 * that we are being paranoid.
 */

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

    var CButton = function (x, y, fillStyle, path, text) {
        this.position = { x: x, y: y };

        this.fillStyle = fillStyle;

        this.path = path;

        this.text = text || null;

        this.alpha = 0.5;

        this.strokeStyle = "black";
    };
    CButton.prototype.draw = function (ctx) {
        ctx.save();

        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.globalAlpha = this.alpha;

        this.path(ctx);

        if (this.image != null) {
            ctx.drawImage(this.image, 0, 0);
        } else {
            ctx.fill();
        }

        if (this.text !== null) {
            this.text(ctx);
        }

        if (this.hover) ctx.stroke();

        ctx.restore();
    };

    var circlePath = function (ctx) {
        ctx.translate(this.position.x, this.position.y)
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, 2 * Math.PI);
        ctx.closePath();
    };

    var rectPath = function (ctx) {
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(-Math.PI / 8);
        ctx.beginPath();
        ctx.arc(14, 3, 3, 3 * Math.PI / 2, Math.PI / 2);
        ctx.arc(3, 3, 3, Math.PI / 2, 3 * Math.PI / 2);
        ctx.closePath();
    };

    var imagePath = function (ctx) {
        ctx.translate(this.position.x, this.position.y);

        ctx.beginPath();
        ctx.rect(0, 0, this.image.width, this.image.height);
        ctx.closePath();
    };

    var controller = {
        left: new CButton(0, 15, "black", function (ctx) {
            ctx.translate(this.position.x, this.position.y)
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(10, 0);
            ctx.lineTo(15, 5);
            ctx.lineTo(10, 10);
            ctx.lineTo(0, 10);
            ctx.closePath();
        }),

        up: new CButton(15, 0, "black", function (ctx) {
            ctx.translate(this.position.x, this.position.y)
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(10, 0);
            ctx.lineTo(10, 10);
            ctx.lineTo(5, 15);
            ctx.lineTo(0, 10);
            ctx.closePath();
        }),

        right: new CButton(25, 15, "black", function (ctx) {
            ctx.translate(this.position.x, this.position.y)
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo(5, 0);
            ctx.lineTo(15, 0);
            ctx.lineTo(15, 10);
            ctx.lineTo(5, 10);
            ctx.closePath();
        }),

        down: new CButton(15, 25, "black", function (ctx) {
            ctx.translate(this.position.x, this.position.y)
            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(10, 5);
            ctx.lineTo(10, 15);
            ctx.lineTo(0, 15);
            ctx.lineTo(0, 5);
            ctx.closePath();
        }),

        a: new CButton(125, 17, "rgb(200,0,0)", circlePath, function (ctx) {
            ctx.font = "bold 10px sans-serif";
            ctx.fillStyle = "white";
            ctx.fillText("A", -3, 3);
        }),

        b: new CButton(105, 30, "rgb(200,0,0)", circlePath, function (ctx) {
            ctx.font = "bold 10px sans-serif";
            ctx.fillStyle = "white";
            ctx.fillText("B", -3, 3);
        }),

        select: new CButton(45, 35, "black", rectPath, function (ctx) {
            ctx.rotate(Math.PI / 8);
            ctx.font = "7px sans-serif";
            ctx.fillStyle = "black";
            ctx.fillText("SELECT", -7, 11);
        }),

        start: new CButton(70, 35, "black", rectPath, function (ctx) {
            ctx.rotate(Math.PI / 8);
            ctx.font = "7px sans-serif";
            ctx.fillStyle = "black";
            ctx.fillText("START", -2, 11);
        }),

        anarchy: new CButton(45, 0, "black", imagePath),

        democracy: new CButton(70, 0, "black", imagePath),
    };

    controller.anarchy.image = (function () {
        var i = new Image();
        i.src = "http://cdn.bulbagarden.net/upload/4/47/Bag_Helix_Fossil_Sprite.png";
        return i;
    })();
    controller.democracy.image = (function () {
        var i = new Image();
        i.src = "http://cdn.bulbagarden.net/upload/5/5f/Bag_Dome_Fossil_Sprite.png";
        return i;
    })();

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
                if (button.hover) {
                    $("#chat_text_input").val(name);
                    $("#chat_speak").click();
                }
            });
        }
    });

    $(canvas).mousemove(function (e) {
        $.each(controller, function (name, button) {
            context.save();

            button.path(context);

            button.hover = context.isPointInPath(e.offsetX, e.offsetY);

            context.restore();
        });
    });
});
