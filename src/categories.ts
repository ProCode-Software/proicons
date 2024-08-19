import icons from './configs/tags.json'
const categories = Object.values(icons).map((item) => item.category).filter((value, index, self) => self.indexOf(value) === index)

export default categories