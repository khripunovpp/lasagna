import {ValidationErrors} from '@angular/forms';

import {marker as _} from '@colsen1991/ngx-translate-extract-marker';

export type PasswordValidator = (...args: any[]) => PasswordErrorCode | null;

// export const PasswordErrors = {
//   ERR_PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
//   ERR_PASSWORD_NO_LETTER: 'Password must contain at least one letter',
//   ERR_PASSWORD_NO_DIGIT: 'Password must contain at least one digit',
//   ERR_PASSWORDS_DO_NOT_MATCH: 'Passwords must match',
// };
//
// export const PasswordValidMessages = {
//   ERR_PASSWORD_TOO_SHORT: 'Password length is more than 8 characters',
//   ERR_PASSWORD_NO_LETTER: 'Contains at least one letter',
//   ERR_PASSWORD_NO_DIGIT: 'Contains at least one digit',
//   ERR_PASSWORDS_DO_NOT_MATCH: 'Passwords match',
// };

export const PasswordErrors = {
  ERR_PASSWORD_TOO_SHORT: _('password.error.too-short'),
  ERR_PASSWORD_NO_LETTER: _('password.error.no-letter'),
  ERR_PASSWORD_NO_DIGIT: _('password.error.no-digit'),
  ERR_PASSWORDS_DO_NOT_MATCH: _('password.error.passwords-do-not-match'),
};

export const PasswordValidMessages = {
  ERR_PASSWORD_TOO_SHORT: _('password.error-solved.too-short'),
  ERR_PASSWORD_NO_LETTER: _('password.error-solved.no-letter'),
  ERR_PASSWORD_NO_DIGIT: _('password.error-solved.no-digit'),
  ERR_PASSWORDS_DO_NOT_MATCH: _('password.error-solved.passwords-do-not-match'),
};

export type PasswordErrorCode = keyof typeof PasswordErrors;

export interface PasswordValidationStep {
  validator: PasswordValidator
  code: PasswordErrorCode
  message: string
}

export const PASSWORD_VALIDATION_STEPS: PasswordValidationStep[] = [
  {
    validator: (value: string) => {
      if (value.length < 8) {
        return 'ERR_PASSWORD_TOO_SHORT';
      }
      return null;
    },
    code: 'ERR_PASSWORD_TOO_SHORT',
    message: PasswordErrors.ERR_PASSWORD_TOO_SHORT,
  },
  {
    validator: (value: string) => {
      if (!/[a-zA-Z]/.test(value)) {
        return 'ERR_PASSWORD_NO_LETTER';
      }
      return null;
    },
    code: 'ERR_PASSWORD_NO_LETTER',
    message: PasswordErrors.ERR_PASSWORD_NO_LETTER,
  },
  {
    validator: (value: string) => {
      if (!/[0-9]/.test(value)) {
        return 'ERR_PASSWORD_NO_DIGIT';
      }
      return null;
    },
    code: 'ERR_PASSWORD_NO_DIGIT',
    message: PasswordErrors.ERR_PASSWORD_NO_DIGIT,
  },
];

export const PASSWORD_MATCH_VALIDATION_STEP: PasswordValidationStep = {
  validator: (value: string, confirmValue: string) => {
    if (!confirmValue
      || !value
      || value !== confirmValue) {
      return 'ERR_PASSWORDS_DO_NOT_MATCH';
    }
    return null;
  },
  code: 'ERR_PASSWORDS_DO_NOT_MATCH',
  message: PasswordErrors.ERR_PASSWORDS_DO_NOT_MATCH,
};


export const validatePassword = (
  value: string,
  toMap: boolean = false
): PasswordErrorCode[] | ValidationErrors => {
  const errors: PasswordErrorCode[] = [];
  const validationErrors: ValidationErrors = {};
  for (const step of PASSWORD_VALIDATION_STEPS) {
    const error = step.validator(value);
    if (error) {
      errors.push(error);
      validationErrors[error] = true
    }
  }
  return toMap ? validationErrors : errors;
}

export const validateTwoPasswordsMatch = (
  value: string,
  confirmValue?: string,
  toMap: boolean = false
): PasswordErrorCode[] | ValidationErrors => {
  const errors: PasswordErrorCode[] = [];
  const validationErrors: ValidationErrors = {};

  for (const step of PASSWORD_VALIDATION_STEPS.concat(PASSWORD_MATCH_VALIDATION_STEP)) {
    const error = step.validator(value, confirmValue);
    if (error) {
      errors.push(error);
      validationErrors[error] = true
    }
  }

  return toMap ? validationErrors : errors;
}
