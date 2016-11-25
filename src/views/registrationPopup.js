import {View} from 'backbone';
import registrationTemplate from './registrationPopup.html';
import {checkValidation, errorMessages} from '../tools/errors';

var RegistrationView = View.extend({
    initialize: function () {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    },

    events: {
        "submit form": "validateFormValues",
        "blur input": "handleEvent"
    },

    validateFormValues: function (event) {
        event.preventDefault();
        const email = this.$el.find("#email").val();
        const pass = this.$el.find('#password').val();
        fetch('http://tasks.smartjs.academy/validate/email', {
            method: 'post',
            body: JSON.stringify({email: email}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                return response.json()})
            .then((responseJson)=> {
                if (responseJson.success) {
                    fetch('http://tasks.smartjs.academy/users', {
                        method: 'post',
                        body: JSON.stringify({email: email, password: pass}),
                        headers: {'Content-Type': 'application/json'}
                    })
                        .then(()=>{
                            this.resolve(this);
                        })
                } else {
                    this.showErrorFromServer(responseJson.errors);
                }
            });
    },

    closePopUp: function () {
        this.$el.find('#regform')
            .modal('hide');
    },
    handleEvent: function (event) {
        const flagError = checkValidation(event.target.name, event.target.value);
        if (!flagError) {
            this.showError(event.target.name)
        } else {
            this.hideError(event.target.name)
        }
    },
    showError: function (name, error) {
        this.$el.find('span[data-' + name + ']').html(errorMessages[error || name]).fadeIn();
    },
    showErrorFromServer: function (errors) {
        for (let key in errors){
            if(errors.hasOwnProperty(key)){
                this.showError(key, errors.email);
            }
        }
    },
    hideError: function (name) {
        this.$el.find('span[data-' + name + ']').html('').fadeOut();
    },
    render: function () {
        this.$el.html(registrationTemplate);
        this.$el.find('#regform')
            .modal('show')
            .on('hide.bs.modal', () => this.remove());
    }

});

export default RegistrationView;