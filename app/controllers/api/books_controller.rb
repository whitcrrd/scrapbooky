class Api::BooksController < Api::BaseController
  
  def show
    @book ||= Book.find(params[:id])
    @book.editable_by?(current_user) ? (@book.user_editable = true) : (@book.user_editable = false)
    render json: @book
  end
    
  def create
    @book = current_user.books.create(safe_params)
    render json: @book
  end
  
  def update
    @book ||= Book.find(params[:id])
    @book.update(safe_params)
    render nothing: true, status: 204
  end
  
  private
  
  def book
    @book ||= Book.find(params[:id])
  end
  
  def safe_params
    params.require(:book).permit(:title)
  end
end