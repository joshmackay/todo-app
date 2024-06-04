export default function createElement(tagName, textContent) {
    if(typeof tagName !== "string") {
        throw new Error("Parameter is not a string")
    }
    const newElement = document.createElement(tagName)
    newElement.innerText = textContent;

    return newElement
}