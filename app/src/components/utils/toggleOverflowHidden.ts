export const toggleOverflowHidden = (): void => {
    const body = document.querySelector('body');
    const isOverflowHiddenClass = 'is-overflow-hidden';

    if (body && body.classList.contains(isOverflowHiddenClass)) {
        body.classList.remove(isOverflowHiddenClass);
    } else if (body) {
        body.classList.add(isOverflowHiddenClass);
    }
};
