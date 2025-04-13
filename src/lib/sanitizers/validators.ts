class Validators{
    validateEmail(email: string) {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regexEmail.test(email)) return 'Informe um email válido';
        return '';
    }

    validatePassword(password: string) {
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!regexPassword.test(password)) return 'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial';
        return '';
    }

    validateEqualityFields(field1: string, field2: string, nameField: string) {
        if(field1 !== field2) return 'O campo deve ser igual ao campo de' + nameField;
        return '';
    }

    validateFieldValue(value: string) {
        if(value.length < 3) return 'O campo deve ter pelo menos 3 caracteres';
        return '';
    }

    validateEmptyField(value: string) {
        if(!value) return 'O campo deve ser preenchido';
        return '';
    }

    validateCpfCnpj(cpfCnpj: string) {
        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        if(!regexCpf.test(cpfCnpj) && !regexCnpj.test(cpfCnpj)) return 'Informe um documento com formato válido';
        return '';
    }

    validatePhone(phone: string) {
        const regexPhone = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        if(!regexPhone.test(phone)) return 'Informe um telefone com formato válido';
        return '';
    }

    validateCep(cep: string) {
        const regexCep = /^\d{5}-\d{3}$/;
        if(!regexCep.test(cep)) return 'Informe um CEP com formato válido';
        return '';
    }

    validateDate(date: string) {
        const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
        if(!regexDate.test(date)) return 'Informe uma data com formato válido';
        return '';
    }

    validateState(state: string) {
        const regexState = /^[A-Z]{2}$/;
        if(!regexState.test(state)) return 'Informe um estado com formato válido';
        return '';
    }
}

const validators = new Validators();
export default validators;