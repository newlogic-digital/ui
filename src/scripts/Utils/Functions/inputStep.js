export default function inputStep (input, increase, callback) {
    const value = parseInt(input.value === '' ? 0 : input.value)

    if ((increase && (value < input.max || input.max === '')) || (!increase && (value > input.min || input.min === ''))) {
        input.value = increase ? (value + 1).toString() : (value - 1).toString()
        callback && callback()
        input.dispatchEvent(new Event('change', { bubbles: true }))
    }
}
