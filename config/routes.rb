Todo::Application.routes.draw do
  devise_for :users  

  namespace :api, defaults: {format: :json} do
    devise_scope :user do
      resource :session, only: [:create, :destroy]
    end
    resources :books, only: [:create, :update, :destroy, :show] do
      resources :photos, only: [:create, :destroy, :update]
      resources :videos, only: [:create, :destroy, :update]
    end
    resources :bings, only: [:show]
    resources :users, only: [:show]
    resources :book_lists, only: [:index]
    resources :book_boards, only: [:index]
  end
  
  root :to => "templates#index"
  
  get '/dashboard' => 'templates#index'
  get '/books/:id' => 'templates#index'
  get '/templates/:path.html' => 'templates#template', :constraints => { :path => /.+/  }
end
