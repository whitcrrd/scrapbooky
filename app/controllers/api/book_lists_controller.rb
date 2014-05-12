class Api::BookListsController < Api::BaseController

  def index
    @books = current_user.books
    render json: @books, each_serializer: BookListSerializer
  end
  
end
