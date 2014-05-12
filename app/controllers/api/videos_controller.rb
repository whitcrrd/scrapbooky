class Api::VideosController < Api::BaseController
  
  def create
    @video = current_user.videos.create(safe_params)
    render json: @video
  end
  
  def destroy
    video.destroy
    render nothing: true, status: 204
  end
  
  def update
    video.update(safe_params)
    render nothing: true, status: 204
  end
  
  private
  
  def video
    @video ||= Video.find(params[:id])
  end
  
  def safe_params
    params.require(:video).permit(:book_id, :title, :url, :youtube_id, :sizeX, :sizeY, :col, :row, :start, :end)
  end
  
end