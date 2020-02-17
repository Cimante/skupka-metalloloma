// Очистить инпуты после успешной отправки письма

$(document).ready(() => {
	$('#first-screen--submit').on('click', () => {
		$('form').submit((e) => {
			e.preventDefault();
	
			const info = {
				"Имя": $('input.form-control#first-screen--name').val(),
				"Телефон": $('input.form-control#first-screen--phone').val()
			};
			console.log(info)
	
			$.ajax({
				type: "POST",
				url: '/mail',
				contentType: 'application/json',
				data: JSON.stringify(info),
				success: function(data) {
					alert("Успешно")
					$('input.form-control#first-screen--name').val("")
					$('input.form-control#first-screen--phone').val("")
				},
				error: function() {
					alert('Произошла ошибка при отправке')
				}
			})
		})
	})

	$('#feedback-with-images').on('submit', (e) => {
		e.preventDefault();

		function getBase64(img, callback) {
			const reader = new FileReader();
			reader.readAsDataURL(img);
			reader.addEventListener('load', () => callback(reader.result));
		}

		var sendData = {
			"Phone": $("input#rate-phone.form-control").val(),
		};

		var files = $('input.form-control-file');
		
		
		var file = files[0].files[0]
		getBase64(file, function(result) {
			sendData.Photo = { 
				filename: file.name, 
				content: result, 
				encoding: 'base64'
			}
			$.ajax({
				type: 'POST',
				url: '/mail',
				contentType: 'application/json',
				data: JSON.stringify(sendData),
				success: function(res) {
					alert('Успешно!')
					$("input#rate-phone.form-control").val("");
				},
				error: function() {
					alert('Произошла ошибка при отправке')
				}
			})
		})
	})

	$('#bottom-feedback').on('submit', (e) => {
		e.preventDefault();

		const info = {
			"Имя": $('input#bottom-feedback--name.form-control').val(),
			"Телефон": $('input#bottom-feedback--phone.form-control').val()
		}

		$.ajax({
			type: 'POST',
			url: '/mail',
			contentType: 'application/json',
			data: JSON.stringify(info),
			success: function(res) {
				alert('Успешно');
				$('input#bottom-feedback--name.form-control').val("");
				$('input#bottom-feedback--phone.form-control').val("");
			},
			error: function() {
				alert('Произошла ошибка при отправке')
			}
		})
	})

	$('#cta-modal').on('submit', (e) => {
		e.preventDefault();

		const info = {
			"Имя": $('#cta-modal--name').val(),
			"Телефон": $('#cta-modal--phone').val()
		}

		$.ajax({
			type: 'POST',
			url: '/mail',
			contentType: 'application/json',
			data: JSON.stringify(info),
			success: function(res) {
				alert('Успешно');
				$('#cta-modal--name').val("");
				$('#cta-modal--phone').val("");
				localion.reload();
			},
			error: function() {
				alert('Произошла ошибка при отправке')
			}
		})
	})
})
