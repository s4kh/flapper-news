angular.module('footballNews')

.factory('posts', '$http', [function ($http) {

  var o = {
    posts: []
  };

  o.getAll = function() {
    return $http.get('/posts.json').success(function(data){
      angular.copy(data, o.posts);
    });
  }

  o.create = function(post) {
    return $http.post('/posts.json', post).success(function(data){
      o.posts.push(data);
    });
  }

  o.upvote = function(post) {
    return $http.put('/posts'+post.id + '/vote.json').success(function(data){
      post.votes++;
    })
  }

  o.get = function(id) {
    return $http.get('/posts/' + id + '.json').then(function(res){
      return res.data;
    });
  }

  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments.json', comment);
  }

  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post.id + '/comments/' + comment.id + '/vote.json')
      .success(function(data){
        comment.votes++;
      });
  }

  return o;
}])
