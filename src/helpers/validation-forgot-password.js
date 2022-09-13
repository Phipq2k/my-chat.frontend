export default function validationForgotPassword(values) {
    let errors= {};

    //user email
    if(!values.user_email){
        errors.user_email = 'Vui lòng nhập Email';
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.user_email)){
        errors.user_email = 'Địa chỉ email không hợp lệ';
    }
    return errors;
}