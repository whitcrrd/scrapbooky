class Api::PhotosController < Api::BaseController
  
  
  def create
    @photo = current_user.photos.create(safe_params)
    @photo.save
    render json: @photo
  end
  
  def destroy
    photo.destroy
    render nothing: true, status: 204
  end
  
  def update
    photo.update(safe_params)
    render nothing: true, status: 204
  end
  
  private
  
  def photo
    @photo ||= Photo.find(params[:id])
  end
  
  def safe_params
    params.require(:photo).permit(:book_id, :title, :url, :sizeX, :sizeY, :row, :col)
  end
  
end