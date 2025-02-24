module.exports = {
  rules: {
    "task-prefix": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "task-prefix": ({ raw }) => {
          const regexp = /^EBZ-\d+: \s*[А-Яа-яЁё]+(?:ть|ти|чь)\b .+/i

          return regexp.test(raw)
            ? [true, ""]
            : [
                false,
                "❌ Коммит должен начинаться с номера задачи и содержать действие в инфинитиве, например:\n'EBZ-1234: Исправить баг с загрузкой'",
              ]
        },
      },
    },
  ],
}
