import {View} from 'backbone';
import advanceTemplate from './advancePopup.html';


var AdvanceView = View.extend({
    render: function () {
        this.$el.html(advanceTemplate);
        this.$el.find('#succes')
            .modal('show')
            .on('hide.bs.modal', () => this.remove())
    }
});

export default AdvanceView;