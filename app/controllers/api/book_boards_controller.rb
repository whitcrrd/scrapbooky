class Api::BookBoardsController < Api::BaseController

  def index
    @items = Video.random_book_items(9)
    render json: @items, each_serializer: BookBoardSerializer
  end
  
end
