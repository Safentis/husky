const path = require("node:path")
const cp = require("node:child_process")
const fs = require("node:fs")

const PATH_TO_HUSKY_FOLDER = path.join(process.cwd(), ".husky")
const LIST_OF_HOOKS = [
  ["commit-msg", "npx --no-install commitlint --edit $1"],
  ["pre-commit", "npx --no-install lint-staged"],
]

function addHook(hookName, command) {
  const filePath = `${PATH_TO_HUSKY_FOLDER}/${hookName}`
  if (fs.existsSync(filePath)) return
  try {
    cp.execSync(
      `mkdir -p .husky && echo "${command}" > ${filePath} && chmod +x ${filePath}`,
    )
    console.log(`✅ Husky хук создан успешно: ${hookName}`)
  } catch (e) {
    console.log(`❌ Не удалось создать хук ${hookName}: `, e)
  }
}

LIST_OF_HOOKS.forEach(([hookName, command]) => addHook(hookName, command))

console.log("✅ Husky настроен!")
