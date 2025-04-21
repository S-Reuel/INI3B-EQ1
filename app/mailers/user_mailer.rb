class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.redef_senha.subject
  #
  def redef_senha(usuario)
    @token = usuario.gerar_jwt_redef_senha
    @usuario = usuario
    mail to: usuario.email, subject: "Redefinição de Senha"
  end
end
