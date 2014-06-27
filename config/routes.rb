Rails.application.routes.draw do

  get 'analytics/funnels'

  get 'analytics/traffic'

  get 'analytics/events'

  get 'analytics/test'

  get 'analytics/main'

  root to: "analytics#main"

  end