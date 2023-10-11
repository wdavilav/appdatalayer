function alert_sweetalert(args) {
    if (!args.hasOwnProperty('type')) {
        args.type = 'success';
    }
    if (!args.hasOwnProperty('title')) {
        args.title = 'Notificación';
    }
    if (args.hasOwnProperty('message')) {
        args.html = '';
    } else {
        args.message = '';
    }
    if (!args.hasOwnProperty('timer')) {
        args.timer = null;
    }
    Swal.fire({
        icon: args.type,
        title: args.title,
        text: args.message,
        html: args.html,
        grow: true,
        showCloseButton: true,
        allowOutsideClick: true,
        timer: args.timer
    }).then((result) => {
        args.callback();
    });
}

function message_error(message) {
    var content = message;
    if (typeof (message) === "object") {
        content = JSON.stringify(message);
    }
    alert_sweetalert({
        'type': 'error',
        'message': content,
        'timer': 2000,
        'callback': function () {

        }
    });
}

function loading(args) {
    if (!args.hasOwnProperty('fontawesome')) {
        args.fontawesome = 'fa-solid fa-circle-notch fa-spin';
    }
    if (!args.hasOwnProperty('text')) {
        args.fontawesome = 'Cargando...';
    }
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: args.fontawesome,
        custom: $("<div>", {
            "class": "loading",
            "text": args.text
        })
    });
}