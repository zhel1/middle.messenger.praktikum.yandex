export function scrollToEnd() {
    const element = document.querySelector('.scroll-bottom');
    if (element)
        element.scrollIntoView({
            behavior: 'auto',
            block: 'end',
        });
}
