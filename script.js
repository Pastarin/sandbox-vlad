const FIELD_NAMES = {
    EMAIL: "EMAIL",
    AVATAR: "AVATAR",
    FIRST_NAME: "FIRST_NAME",
    LAST_NAME: "LAST_NAME",
    AGE: "AGE",
    PASSWORD: "PASSWORD",
}

const ERRORS = {
    REQUIRED: 'Field is required!',
    [FIELD_NAMES.EMAIL]: 'Email is incorrect',
    [FIELD_NAMES.AVATAR]: {
        size: 'Max. 1mb',
        type: 'Only PNG'
    },
    [FIELD_NAMES.PASSWORD]: {
        length: 'Min. 8 characters',
        lowercase: 'The password must contain at least 1 lowercase character',
        uppercase: 'The password must contain at least 1 uppercase character',
        number: 'The password must contain at least 1 numeric character',
        special: 'The password must contain at least one special character',
    },
}

const $FIELDS = {
    [FIELD_NAMES.EMAIL]: document.getElementById('email'),
    [FIELD_NAMES.AVATAR]: document.getElementById('avatar'),
    [FIELD_NAMES.FIRST_NAME]: document.getElementById('firstName'),
    [FIELD_NAMES.LAST_NAME]: document.getElementById('lastName'),
    [FIELD_NAMES.AGE]: document.getElementById('age'),
    [FIELD_NAMES.PASSWORD]: document.getElementById('password'),
}

const $SUBMIT = document.getElementById('submit');

const VALIDATORS = {
    [FIELD_NAMES.EMAIL]: (value) => {
        if(value.length === 0) {
            return ERRORS.REQUIRED
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return ERRORS[FIELD_NAMES.EMAIL];
        }

        return true;
    },
    [FIELD_NAMES.AVATAR]: (target) => {
        if(target.value.length === 0) {
            return ERRORS.REQUIRED
        }
        if (!/\.png$/.test(target.value)) {
            return ERRORS[FIELD_NAMES.AVATAR].type
        }
        if ((target.files[0].size / 1024 / 1024) > 1) {
            return ERRORS[FIELD_NAMES.AVATAR].size
        }
        return true;
    },
    [FIELD_NAMES.FIRST_NAME]: (value) => {
        if(value.length === 0) {
            return ERRORS.REQUIRED
        }
        return true
    },
    [FIELD_NAMES.LAST_NAME]: (value) => {
        if(value.length === 0) {
            return ERRORS.REQUIRED
        }
        return true
    },
    [FIELD_NAMES.AGE]: (value) => {
        if(value.length === 0) {
            return ERRORS.REQUIRED
        }
        return true
    },
    [FIELD_NAMES.PASSWORD]: (value) => {
        if(value.length === 0) {
            return ERRORS.REQUIRED
        }
        if (!/(?=.*[a-z])/.test(value)) {
            return ERRORS[FIELD_NAMES.PASSWORD].lowercase
        }
        if (!/(?=.*[A-Z])/.test(value)) {
            return ERRORS[FIELD_NAMES.PASSWORD].uppercase
        }
        if (!/(?=.*[0-9])/.test(value)) {
            return ERRORS[FIELD_NAMES.PASSWORD].number
        }
        if (!/(?=.*[!@#$%^&*])/.test(value)) {
            return ERRORS[FIELD_NAMES.PASSWORD].special
        }
        if (value.length < 8) {
            return ERRORS[FIELD_NAMES.PASSWORD].length
        }
        return true;
    },
}

const $ERROR_MESSAGES = {};

function checkEmptyFields() {
    return Object.values($FIELDS).every(field => field.value.length > 0);
}

function showError(field, text) {
    $ERROR_MESSAGES[field] = document.createElement('span');
    $ERROR_MESSAGES[field].classList.add('error');
    $ERROR_MESSAGES[field].innerHTML = text;
    $FIELDS[field].insertAdjacentElement('afterend', $ERROR_MESSAGES[field]);
}

function hideError(field) {
    if (field in $ERROR_MESSAGES) {
        $ERROR_MESSAGES[field].remove();
        delete $ERROR_MESSAGES[field];
    }
}

function validate(field, value) {
    if (field in VALIDATORS) {
        const result = VALIDATORS[field](value);
        if (result !== true) {
            showError(field, result)
        } else {
            hideError(field)
        }
    }


    if (Object.keys($ERROR_MESSAGES).length === 0 && checkEmptyFields()) {
        $SUBMIT.removeAttribute('disabled');
    } else {
        $SUBMIT.setAttribute('disabled', 'disabled')
    }
}

function initListeners() {
    Object.entries($FIELDS).forEach(([fieldName, $field]) => {
        $field.addEventListener('focus', () => {
            if (fieldName in $ERROR_MESSAGES) {
                hideError(fieldName);
            }
        })
        if (fieldName !== FIELD_NAMES.AVATAR) {
            $field.addEventListener('blur', (e) => {
                validate(fieldName, e.target.value);
            })
        } else {
            $field.addEventListener('change', (e) => {
                validate(fieldName, e.target);
            })
        }
    })
}

initListeners()