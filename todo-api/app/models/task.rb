class Task < ApplicationRecord
    validates :name, presence: { message: "cannot be blank" }
    validates :description, presence: { message: "cannot be blank" }
    validates :order, presence: { message: "cannot be empty" }
end
