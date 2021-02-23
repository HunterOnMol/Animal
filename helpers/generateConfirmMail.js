const getConfirmMail = ({ name, patronymic }) => {
  const html = `
  ${name ? `Уважаемый ${name} ${patronymic ? patronymic : ''}!` : ''}
  Вы только что зарегистрировались в lizard_app`

  return html
}

module.exports = {
  getConfirmMail
}
