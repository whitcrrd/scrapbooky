class Api::UsersController < Api::BaseController
  
  def show
    user_signed_in? ? @user = current_user : (@user = User.new({id: 0}))
    render json: @user
  end
  
end