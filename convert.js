const fs = require("fs")
const path = require("path")

const dir = fs.readdirSync("dict").filter(i => i.match(/^.*\.txt$/))
const result = {}

dir.forEach((i) => {
    const filename = path.join("dict", i)
    const f = fs.readFileSync(filename, "utf-8")
    const parsed = f.split("\n").map(i => i.split("\t"))

    for (const item of parsed) {
        result[item[0]] = item[1]
    }

})

fs.writeFileSync("all.json", JSON.stringify(result))
