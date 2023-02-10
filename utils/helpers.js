module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() + 5
    }`;
  },
  
  /* This will return given word's plural, e.g.,
    if 'comment' is given & if comments.length is != 1, it will return: 
      'comments'
    otherwise, it will return:
      'comment'
  */
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  } 
};
