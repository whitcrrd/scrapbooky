class Api::BingsController < Api::BaseController
  
  def show
    @search_results = bing.get_bing_images(params[:id])
    @bing = {images: @search_results}
    render json: @bing
  end
  
  private
  
  def bing
    @bing ||= Bing.new
  end

end
