export default function validationResetPassword(values) {
    let errors= {};
    if(!values.user_password){
        errors.user_password = 'Vui lòng nhập mật khẩu';
    }
    else if(values.user_password.length < 6){
        errors.user_password = 'Mật khẩu tối thiểu 6 ký tự';
    }

    if(!values.user_confirm_password && values.user_password){
        errors.user_confirm_password = 'Vui lòng xác nhận mật khẩu';
    }
    else if(values.user_confirm_password !== values.user_password){
        errors.user_confirm_password = 'Mật khẩu nhập lại không trùng khớp';
    }
    return errors;
}