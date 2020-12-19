const dummy = blogs => 1

const totalLikes = blogs => {
  let likes = 0
  for (let i = 0; i < blogs.length; i++) {
    const current = blogs[i]
    likes += current.likes
  }
  return likes
}

module.exports = { dummy, totalLikes }
