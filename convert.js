const fs = require("fs")
const path = require("path")

const dir = fs.readdirSync("dict").filter(i => i.match(/^.*\.txt$/))

dir.forEach((i)=> {
    const filename = path.join("dict", i)
    const f = fs.readFileSync(filename, "utf-8")
    const parsed = f.split("\n").map(i=>i.split("\t"))

    const result = {}

    for(const item of parsed) {
        result[item[0]] = item[1]
    }

    fs.writeFileSync(filename + ".json", JSON.stringify(result))
})