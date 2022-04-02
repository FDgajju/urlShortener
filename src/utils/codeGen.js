let codeGen = (codeLen) => {
  let string =
    '01-2345678_9abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJ_KLMNOP+QRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < codeLen; i++) {
    code += string[Math.floor(Math.random() * (string.length - 1))];
  }
  return code;
};

function mailCode() {
  let string = '0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += string[Math.floor(Math.random() * 4)];
  }
  return code;
}

export { codeGen, mailCode };
