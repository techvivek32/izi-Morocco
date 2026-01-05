import path from "path"
import fs from "fs"

const loadModels = () => {
  fs.readdirSync(path.join(__dirname, '../models')).forEach(
    async (model) => (await import(`../models/${model}`)).default,
  )
}

export default loadModels