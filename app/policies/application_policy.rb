class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def gestor?
    papel == "gestor"
  end

  def lider?
    papel == "lider"
  end

  def dev?
    papel == "dev"
  end

  private

  def papel
    user.papel_na_equipe(equipe)
  end

  def equipe
    raise NotImplementedError
  end
end
