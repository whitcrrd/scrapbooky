# Scrapbook using Rails 4 and AngularJS

Single-page app that lets you create a scrapbook with photos and videos -- with items being resizable and draggable.

Uses Youtube Search API for videos and Bing Search API for photos

Check out the demo at [scrapbook](http://scrapbook.herokuapp.com/).


## Technologies used

### Frontend

 - [Bootstrap 3.0.0](http://getbootstrap.com/)
 - [AngularJS 1.0.8](http://angularjs.org/)
 - [angular-gridster](http://github.com/ManifestWebDesign/angular-gridster/)

### Backend

 - [Ruby 2.0.0p247](http://www.ruby-lang.org/en/)
 - [Ruby on Rails 4.0.0](http://rubyonrails.org/)
 - [Devise 3.0.3](https://github.com/plataformatec/devise)
 - [active_model_serializers 0.8.1](https://github.com/rails-api/active_model_serializers)


### thoughts
 - initially, started with the idea of being able to create a scrapbook with texts/stories, songs, photos, and videos, so I used polymorphic relationships for items in books, mapping to photos, videos, and text... ended up removing text, but still kept polymorphism. Ideally, I would like to combine photos/videos into a single model (STI), which would reduce the amount of repeated code necessary (handling photos / videos separately) in angular
 - lot of redundant CSS
 - need to clean up controllers / directives for angular, round II would hopefully do all the above
 - the editing item process needs to be changed -- either removing completely, and just giving the option of deleting an item, or presenting a full form that would allow a user to edit start/end times of videos, or replace item with new item via youtube/bing.
