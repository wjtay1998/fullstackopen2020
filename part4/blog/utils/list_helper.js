var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0

  blogs.forEach(blog => {
    likes += blog.likes
  })

  return likes
}

const favouriteBlog = (blogs) => {
  let mostlikes = 0
  let mostlikedblog = null

  blogs.forEach(blog => {
    if(blog.likes > mostlikes){
      mostlikes = blog.likes
      mostlikedblog = blog
    }
  })

  return mostlikedblog

}

const mostBlogs = (blogs) => {
  if(!(blogs) || blogs.length === 0){
    return null
  }

  var sorted = _.map(
    _.countBy(blogs, function(o){return o.author}), (val, key) => ({ author: key, blogs: val })
  )
  var maxnum = _.maxBy(sorted, function(o){return o.blogs})
  return maxnum
}

const mostLikes = (blogs) => {
  if(!(blogs) || blogs.length === 0){
    return null
  }

  var likes =
  _(blogs)
    .groupBy(function(o){return o.author})
    .map((objs, key) => ({
      author : key,
      likes : _.sumBy(objs, function(o){return o.likes}) }))
    .value()

  var maxlikes = _.maxBy(likes, function(o){return o.likes})

  return maxlikes
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}