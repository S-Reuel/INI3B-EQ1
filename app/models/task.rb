class Task < ApplicationRecord
  enum status: { pendente: 0, concluido: 1, em_andamento: 2, atrasado: 3, cancelado: 4 }
end
