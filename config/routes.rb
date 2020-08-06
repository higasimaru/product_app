Rails.application.routes.draw do
  root 'products#index'
 
  get '/products', to: 'products#new' 
  resources :products, except: [:index]
  
end
