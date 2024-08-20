import icons from './configs/tags.json'

/** List of all icon categories */
const categories = Object.values(icons).map((item) => item.category).filter((value, index, self) => self.indexOf(value) === index)

export default categories