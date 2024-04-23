
export default function decorateResult(result: string, value: string) {
    return result.replace(new RegExp(value, "gi"), (match) => `<mark>${match}</mark>`)
}