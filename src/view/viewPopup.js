//теперь вынести в темплейт и перенести во вью бекбон
import { View } from 'backbone';
import template from 'lodash/template';
import $ from 'jquery';
window.$ = $;

const PopupView = View.extend({

    template: template(
        $('#view-popup').html()
    ),

    events: {
        'blur .changeEmail': 'editValue',
        'blur .changePass': 'editValue',
        'blur .changeConfPass': 'editValue'
    },

    render: function () {
        this.$el.html(this.template);
        this.$el.find('.modal').modal('show').on('hidden.bs.modal', () => this.remove());
    },

    initialize: function() {
        this.listenTo(this.PopupView, "change", this.render);
        this.render();
    },

    editValue: function (){
        this.PopupView.set({
            email: this.$('.exampleInputEmail1').text(),
            /*pass: this.$('.exampleInputPassword1').text(),
            confPass: this.$('.exampleInputPassword2').text()*/
        },{validatedEmail: true})
    },
    
    validatedEmail: function () {
        const attr = $('#exampleInputEmail1');
        if (attr.value) {
            console.log(attr.value.search(/@/) > 0);
            return attr.value.search(/@/) > 0;
        }
    },
    validatedPass: function () {
        const attr = $('#exampleInputPassword1');
        if (attr.value && attr.value.length > 6) {
            return attr.value.search(/(0-9)/g);
        }
    },
    validatedConfPass: function () {
        const attr1 = $('#exampleInputPassword1');
        const attr2 = $('#exampleInputPassword2');
        if (attr2.value) {
            return attr2.value === attr1.value;
        }
    }
    /*события
     по клику кнопки сейв
     должна делаться валидация*/
});

export default PopupView;