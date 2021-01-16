export function buildBook(book, format) {
  let authors = book.authors ? book.authors : []
  authors = authors.map((author) => {
    let words = author.split(' ').filter((word) => word.trim().length > 0)
    if (format === 'mla') return words[words.length - 1]
    words = words.map((word, index) => {
      if (index === words.length - 1) return word + ','
      else return word[0] + '.'
    })
    let tmp = words.pop()
    words.unshift(tmp)
    return words.join(' ')
  })
  let retStr = ''
  if (format === 'apa') retStr = `${authors.join(', ')}${book.year ? ` (${book.year})` : ''}${book.title ? `. ${book.title}` : ''}${book.location ? `. ${book.location}` : ''}${book.publisher ? `: ${book.publisher}` : ''}`
  else retStr = `${authors.join(', ')}${book.title ? `. ${book.title}` : ''}${book.publisher ? `. ${book.publisher}` : ''}${book.year ? `, ${book.year}` : ''}`
  if (retStr.length > 0) retStr += '.'
  return retStr
}

export function buildJournal(journal, format) {
  let authors = journal.authors ? journal.authors : []
  authors = authors.map((author) => {
    let words = author.split(' ').filter((word) => word.trim().length > 0)
    if (format === 'mla') return words[words.length - 1]
    words = words.map((word, index) => {
      if (index === words.length - 1) return word + ','
      else return word[0] + '.'
    })
    let tmp = words.pop()
    words.unshift(tmp)
    return words.join(' ')
  })
  let retStr = ''
  if (format === 'apa') retStr = `${authors.join(', ')}${journal.year ? ` (${journal.year})` : ''}${journal.title ? `. ${journal.title}` : ''}${journal.name ? `. ${journal.name}` : ''}${journal.volume && journal.issue ? `, ${journal.volume}(${journal.issue})` : ''}${journal.start && journal.end ? `, ${journal.start}-${journal.end}` : ''}`
  else retStr = `${authors.join(', ')}${journal.title ? `. "${journal.title}."` : ''}${journal.name ? ` ${journal.name}` : ''}${journal.volume ? `, vol. ${journal.volume}` : ''}${journal.issue ? `, no. ${journal.issue}` : ''}${journal.year ? `, ${journal.year}` : ''}${journal.start && journal.end ? `, pp. ${journal.start}-${journal.end}` : ''}`
  if (retStr.length > 0) retStr += '.'
  return retStr
}

export function buildPresentation(presentation) {
  let retStr = `${presentation.title ? `"${presentation.title}."` : ''}${presentation.conference ? ` ${presentation.conference}` : ''}${presentation.location ? `. ${presentation.location}` : ''}${presentation.year ? `, ${presentation.year}` : ''}`
  if (retStr.length > 0) retStr += '.'
  return retStr
}
