import { clamp } from "../../../../../helpers/math";
export const updateInternalStateValue = (currentState, newValue, minValue, maxValue, draggingType)=>{
    const [currentStartValue, currentEndValue] = currentState;
    if (currentEndValue === null) {
        return [
            clamp(newValue, minValue, maxValue),
            null
        ];
    }
    switch(draggingType){
        case 'start':
            return newValue > currentEndValue ? [
                currentEndValue,
                currentEndValue
            ] : [
                clamp(newValue, minValue, maxValue),
                currentEndValue
            ];
        case 'end':
            return newValue < currentStartValue ? [
                currentStartValue,
                currentStartValue
            ] : [
                currentStartValue,
                clamp(newValue, minValue, maxValue)
            ];
        case null:
        default:
            return currentState;
    }
};
export const updateInternalStateByNativeChange = (currentState, newValue, draggingType)=>{
    const [currentStartValue, currentEndValue] = currentState;
    switch(draggingType){
        case 'start':
            return [
                newValue,
                currentEndValue
            ];
        case 'end':
            return [
                currentStartValue,
                newValue
            ];
        case null:
        default:
            return currentState;
    }
};
export const isMultipleValues = (value)=>{
    return value[1] !== null;
};
const MINIMUM_DIFFERENCE_BETWEEN_START_AND_END = 0.1;
export const determineSnapDirection = (currentValues, newValue, draggingType)=>{
    if (draggingType === 'start' || draggingType === 'end') {
        return draggingType;
    }
    const [startRaw, endRaw] = currentValues;
    const start = endRaw !== null ? startRaw - MINIMUM_DIFFERENCE_BETWEEN_START_AND_END : startRaw;
    const end = endRaw !== null ? endRaw + MINIMUM_DIFFERENCE_BETWEEN_START_AND_END : 0;
    return Math.abs(start - newValue) <= Math.abs(end - newValue) ? 'start' : 'end';
};

//# sourceMappingURL=state.js.map