module.exports = {
  checkPost: (post) => {
    const a = (post.id != null) ? true : false;
    return a;
  },

  formatDate: (date) => {
    const newFormat = new Date(date);
    return newFormat.toLocaleDateString();
  }

};
