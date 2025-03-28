export const setRef = (element1, ref)=>{
    if (ref) {
        if (typeof ref === 'function') {
            ref(element1);
        } else {
            // eslint-disable-next-line no-param-reassign
            ref.current = element1;
        }
    }
};
export const multipleRef = (...refs)=>{
    let current = null;
    return {
        get current () {
            return current;
        },
        set current (element){
            current = element;
            refs.forEach((ref)=>ref && setRef(element, ref));
        }
    };
};

//# sourceMappingURL=refs.js.map