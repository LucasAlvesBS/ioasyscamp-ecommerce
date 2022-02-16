const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const name = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

const username = /^[a-zA-Z0-9]*$/;

const cpf = /([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

const telephone =
  /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/;

const percentage = /^\d{1,3}\%$/;

const zipCode = /^[0-9]{5}-[0-9]{3}$/;

export const RegExHelper = {
  password,
  name,
  cpf,
  telephone,
  username,
  percentage,
  zipCode,
};
