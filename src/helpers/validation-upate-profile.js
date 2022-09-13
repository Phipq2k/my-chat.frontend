export default function validationUpdateProfile(values) {
    let errors = {};

    if (!values.user_name.trim()) {
        errors.user_name = 'Vui lòng nhập họ và tên';
    }

    //user email
    if (!values.user_email) {
        errors.user_email = 'Vui lòng nhập Email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.user_email)) {
        errors.user_email = 'Địa chỉ email không hợp lệ';
    }
    return errors;
}