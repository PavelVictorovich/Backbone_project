import RegistrationView from '../views/registrationPopup';
import AdvanceView from '../views/advancePopup';
import LoginView from '../views/loginPopup';


export function openRegistrationPopUp(container = 'body'){
    const regPopup = new RegistrationView();
    $(container).append(regPopup.$el);
    regPopup.render();
    return regPopup.promise;
}

export function openSuccessPopUp(container = 'body'){
    const successPopUp = new AdvanceView();
    $(container).append(successPopUp.$el);
    successPopUp.render();
    return successPopUp.promise;
}

export function openLoginPopUp(container = 'body'){
    const loginPopUp = new LoginView();
    $(container).append(successPopUp.$el);
    successPopUp.render();
    return successPopUp.promise;
}


// const popUpManager = {
//     openRegistrationPopUp: function (container = 'body') {
//         const regPopup = new RegistrationView();
//         $(container).append(regPopup.$el);
//         regPopup.render();
//         return regPopup.promise;
//     },
//     openSuccessPopUp: function (container = 'body') {
//         const regPopup = new RegistrationView();
//         $(container).append(regPopup.$el);
//         regPopup.render();
//         return regPopup.promise;
//     }


