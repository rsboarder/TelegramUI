import { ChangeEvent } from 'react';
import { MultiselectOption } from 'components/Form/Multiselect/types';
import { FilterFn } from './helpers/filter';
import { type UseMultiselectInputProps } from './useMultiselectInput';
export interface UseMultiselectProps extends UseMultiselectInputProps {
    /** Array of options available for selection. */
    options?: MultiselectOption[];
    /**
     * Enables the creation of new options that are not in the initial list.
     * - `true` allows adding by pressing Enter.
     * - A `string` value also adds a button with the provided text to the dropdown for creating options.
     */
    creatable?: boolean | string;
    /** Text displayed when no options are available or match the filter criteria. */
    emptyText?: string;
    /** Determines how selected options are treated: either hidden from the list or highlighted within it. */
    selectedBehavior?: 'hide' | 'highlight';
    /** Custom function to filter options based on the input value. */
    filterFn?: false | FilterFn;
}
/**
 * Hook to manage the state and interactions of a multiselect component.
 * It encapsulates logic for option selection, input change handling, dropdown visibility, and focused option management.
 */
export declare const useMultiselect: ({ disabled, value: valueProp, defaultValue, onChange, inputValue: inputValueProp, onInputChange: onInputChangeProp, creatable, emptyText, filterFn, selectedBehavior, options: optionsProp, }: UseMultiselectProps) => {
    value: any;
    inputValue: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    options: MultiselectOption[];
    opened: boolean;
    setOpened: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    focusedOption: any;
    focusedOptionIndex: number;
    setFocusedOption: import("react").Dispatch<any>;
    setFocusedOptionIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
    addOption: (newValue: import("../types").MultiselectOption | import("../types").MultiselectOptionValue) => void;
    addOptionFromInput: (inputValueToAdd: string) => void;
    removeOption: (newValue: import("../types").MultiselectOption | import("../types").MultiselectOptionValue) => void;
    inputRef: import("react").MutableRefObject<HTMLInputElement>;
    clearInput: () => void;
};
