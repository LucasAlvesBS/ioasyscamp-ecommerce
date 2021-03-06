export const MessageHelper = {
  PASSWORD_VALID:
    'password must contain uppercase and lowercase letters, numbers and special characters',
  FIRST_NAME_VALID:
    'firstName must be only letters, hyphen and/or single quotes',
  LAST_NAME_VALID: 'lastName must be only letters, hyphen and/or single quotes',
  PASSWORD_OR_EMAIL_INVALID: 'invalid credentials',
  PASSWORD_MIN_VALID: 'password must be at least 8 characters',
  PASSWORD_MAX_VALID: 'password must be a maximum of 30 characters',
  CPF_VALID: 'cpf must be only numbers',
  TELEPHONE_VALID:
    'telephone must be only numbers. Ex.: xx9xxxxxxxx for cell phone or xxxxxxxxxx for landline',
  STATE_VALID: 'state must be only letters hyphen and/or single quotes',
  CITY_VALID: 'city must be only letters hyphen and/or single quotes',
  PAYMENT_VALID: 'payment must be cash, credit_card, debit_card or pix',
  SECTION_VALID: 'section must be masculine, feminine or kids',
  ZIP_CODE_VALID: 'zipCode must be only numbers',
  INFORMATIONS_INVALID: 'invalid informations',
  SIZE_VALID: 'size must be PP, P, M, G, GG or EGG',
  BAD_REQUEST:
    'Review the foreign key fields because some information is wrong',
  NOT_FOUND: 'Unfortunately, the requested parameter was not found',
  FORBIDDEN: 'You do not have sufficient privileges to access the page',
  UNPROCESSABLE_ENTITY: 'It is necessary to put products to finalize the order',
};
