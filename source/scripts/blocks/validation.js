let $form = $("form.form")

let formSettings = {
	submitHandler: form => {
		$(form).ajaxSubmit()
		$(form).resetForm()
		$('.contacts__form').addClass('-hidden')
		$('.contacts__success').addClass('-visible')
		setTimeout(function(){
			$('.contacts__form').removeClass('-hidden')
			$('.contacts__success').removeClass('-visible')
		}, 5000)
	},
	errorPlacement: function(){},
	rules: {
		'contacts[mail]': {
			email: true
		}
	}
}

$form.validate(formSettings)

$("[name='contacts[phone]']").mask('8 000 000 00 00')
