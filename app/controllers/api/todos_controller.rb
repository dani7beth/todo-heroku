class Api::TodosController < ApplicationController

  def index
    render json: Todo.order(created_at: :desc)
  end

  def create
    todo = Todo.create(name: params[:name], complete: false)
    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(complete: !todo.complete)
    render json: todo
  end

  def destroy
    render json: Todo.find(params[:id]).destroy
  end

end
