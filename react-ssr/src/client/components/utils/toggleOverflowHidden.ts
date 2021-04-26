export const isServer = !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export const toggleOverflowHidden = (): void => {
    if(!isServer) {
        const body = document.querySelector('body');
        const isOverflowHiddenClass = 'is-overflow-hidden';

        if (body && body.classList.contains(isOverflowHiddenClass)) {
            body.classList.remove(isOverflowHiddenClass);
        } else if (body) {
            body.classList.add(isOverflowHiddenClass);
        }
    }
};
