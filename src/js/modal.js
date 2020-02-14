var elements = $('.modal-overlay, .modal');

// триггер модального окна
$('button.first-screen--cta').click(function(){
    elements.addClass('active');
});

// триггер закрытия
$('.close-modal').click(function(){
    elements.removeClass('active');
});