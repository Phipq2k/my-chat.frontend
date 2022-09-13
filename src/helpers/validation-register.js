export default function validationRegister(values) {
    let errors= {};

    if(!values.user_name.trim()){
        errors.user_name = 'Vui lòng nhập họ và tên';
    }

    //user email
    if(!values.user_email){
        errors.user_email = 'Vui lòng nhập Email';
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.user_email)){
        errors.user_email = 'Địa chỉ email không hợp lệ';
    }

    if(!values.user_password){
        errors.user_password = 'Vui lòng nhập mật khẩu';
    }
    else if(values.user_password.length < 6){
        errors.user_password = 'Mật khẩu tối thiểu 6 ký tự';
    }

    if(!values.user_confirm_password && values.user_password){
        errors.user_confirm_password = 'Vui lòng nhập lại mật khẩu';
    }
    else if(values.user_confirm_password !== values.user_password){
        errors.user_confirm_password = 'Mật khẩu nhập lại không trùng khớp';
    }
    return errors;
}