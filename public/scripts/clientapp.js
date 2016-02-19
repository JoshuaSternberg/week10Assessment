$(document).ready(function(){
    getData();

    $('#animalInput').on('submit', sendAnimalData);
});

function getData() {
    $.ajax({
        type: 'GET',
        url: '/routeData',
        success: function(data) {
            appendDom(data);
            console.log(data);
        }
    });
}

function sendAnimalData() {
    event.preventDefault();

    var values = {};

    $.each($('#animalInput').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });

    $('#animalInput').find('input[type=text]').val('');

    $.ajax({
        type: 'POST',
        url: '/routeData',
        data: values,
        beforeSend: function () {
            console.log('before!' + values.name);
        },
        success: function (data) {
            getData();
            console.log('From Server: ', data);
            //console.log(data);
        }
    });
}

function appendDom(animalInfo) {
    $('#display').children().remove();
    $('#display').append('<div class="animalDisplay"></div>');
    var $el = $('#display').children().last();
    console.log(animalInfo);

    for (var i = 0; i < animalInfo.length; i++) {
        $el.append('<p>' + animalInfo[i].animal_name + '</p>');
        $el.append('<p>' + animalInfo[i].animal_number + '</p>');
    }
}

