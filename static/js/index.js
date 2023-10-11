var customer = {
    initMap: function () {
        var position = new google.maps.LatLng(-2.206294, -79.897272);
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: position,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        customer.loadCustomers();
    },
    loadCustomers: function () {
        $.ajax({
            url: pathname,
            data: {
                'action': 'load_customers'
            },
            method: 'POST',
            dataType: 'json',
            headers: {
                'X-CSRFToken': csrftoken
            },
            beforeSend: function () {
                google.maps.event.clearInstanceListeners(map.data);
                map.data.forEach(function (feature) {
                    map.data.remove(feature);
                });
                loading({'text': 'Cargando...'});
            },
            success: function (request) {
                if (!request.hasOwnProperty('error')) {
                    map.data.addGeoJson(request.feature_collection);
                    map.data.setStyle(function (feature) {
                        return {
                            icon: {
                                url: feature.getProperty('icon'),
                                scaledSize: new google.maps.Size(25, 25),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(0, 0),
                                labelOrigin: new google.maps.Point(20, 40),
                            }
                        };
                    });
                    map.data.addListener('click', function (event) {
                        $('#data').html(JSON.stringify(event.feature.h));
                        return false;
                    });
                    return false;
                }
                message_error(request.error);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                message_error(errorThrown + ' ' + textStatus);
            },
            complete: function () {
                $.LoadingOverlay("hide");
            }
        });
    }
};

$(function () {
    customer.initMap();

    $('input[name="chk-hide"]').on('change', function () {
        var visible = this.checked;
        map.data.forEach(function (feature) {
            map.data.overrideStyle(feature, {visible: visible});
        });
    });
});