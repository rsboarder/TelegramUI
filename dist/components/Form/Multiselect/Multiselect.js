"use client";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useCallback, useEffect, useId, useRef, useState } from "react";
import { Keys } from "../../../helpers/accessibility";
import { classNames } from "../../../helpers/classNames";
import { callMultiple } from "../../../helpers/function";
import { multipleRef } from "../../../helpers/react/refs";
import { useGlobalClicks } from "../../../hooks/useGlobalClicks";
import { Icon20ChevronDown } from "../../../icons/20/chevron_down";
import { FormInput } from "../FormInput/FormInput";
import { MultiselectBase } from "./components/MultiselectBase/MultiselectBase";
import { MultiselectDropdown } from "./components/MultiselectDropdown/MultiselectDropdown";
import { FOCUS_ACTION_NEXT, FOCUS_ACTION_PREV, isServicePreset } from "./hooks/constants";
import { useMultiselect } from "./hooks/useMultiselect";
/**
 * A comprehensive component for rendering a multiselect input field with customizable options, dropdown behaviors, and chip display.
 * It integrates functionality for selecting multiple options, searching, and even creating new options based on user input.
 */ export const Multiselect = /*#__PURE__*/ forwardRef((_param, ref)=>{
    var { // FormInput options
    header, before, status, className, children, disabled, // CustomSelectDropdownProps
    options: optionsProp, closeDropdownAfterSelect = false, selectedBehavior, emptyText, creatable = false, filterFn, // MultiselectInputProps
    value: valueProp = [], defaultValue, inputValue: inputValueProp, renderChip, renderOption, onInputChange: onInputChangeProp, onChange, onFocus, onBlur, onKeyDown, // Portal container
    portalContainer } = _param, restProps = _object_without_properties(_param, [
        "header",
        "before",
        "status",
        "className",
        "children",
        "disabled",
        "options",
        "closeDropdownAfterSelect",
        "selectedBehavior",
        "emptyText",
        "creatable",
        "filterFn",
        "value",
        "defaultValue",
        "inputValue",
        "renderChip",
        "renderOption",
        "onInputChange",
        "onChange",
        "onFocus",
        "onBlur",
        "onKeyDown",
        "portalContainer"
    ]);
    const { // Option props
    value, addOptionFromInput, addOption, removeOption, // Input props
    inputRef, inputValue, clearInput, onInputChange, // Dropdown props
    options, opened, setOpened, focusedOption, focusedOptionIndex, setFocusedOption, setFocusedOptionIndex } = useMultiselect({
        // Option props
        value: valueProp,
        defaultValue,
        onChange,
        // Input props
        inputValue: inputValueProp,
        onInputChange: onInputChangeProp,
        // Dropdown props
        options: optionsProp,
        emptyText,
        creatable,
        filterFn,
        selectedBehavior,
        // Other props
        disabled
    });
    const containerRef = useRef(null);
    const rootRef = useRef(null);
    const chevronRef = useRef(null);
    const wasChevronClickedRef = useRef(false);
    const dropdownAriaId = useId();
    const dropdownScrollBoxRef = useRef(null);
    // State to control whether focus should open the dropdown
    const [shouldOpenOnFocus, setShouldOpenOnFocus] = useState(true);
    // Track if we're in the process of toggling via the chevron
    const isTogglingRef = useRef(false);
    const handleFocus = ()=>{
        console.log("handleFocus - shouldOpenOnFocus:", shouldOpenOnFocus, "opened:", opened, "isToggling:", isTogglingRef.current);
        // If we're in the process of toggling via the chevron, don't change the dropdown state
        if (isTogglingRef.current) {
            console.log("  -> Ignoring focus during chevron toggle");
            return;
        }
        // Only open the dropdown if we should open on focus
        if (shouldOpenOnFocus) {
            console.log("  -> Opening dropdown from focus");
            setOpened(true);
            setFocusedOptionIndex(null);
        } else {
            console.log("  -> Not opening dropdown due to shouldOpenOnFocus flag");
        }
        // Reset the flag for next focus
        setShouldOpenOnFocus(true);
        console.log("  -> Reset shouldOpenOnFocus to true");
    };
    const handleBlur = (event)=>{
        console.log("handleBlur - relatedTarget:", event.relatedTarget);
        // If we're in the process of toggling via the chevron, don't do anything
        if (isTogglingRef.current) {
            console.log("  -> Ignoring blur during chevron toggle");
            return;
        }
        if (!event.defaultPrevented && !creatable) {
            event.preventDefault();
        }
    };
    const optionsNodes = useRef([]).current;
    const scrollToElement = (index, center = false)=>{
        const dropdown = dropdownScrollBoxRef.current;
        const item = optionsNodes[index];
        if (!item || !dropdown) {
            return;
        }
        const dropdownHeight = dropdown.offsetHeight;
        const { scrollTop } = dropdown;
        const itemTop = item.offsetTop;
        const itemHeight = item.offsetHeight;
        if (center) {
            dropdown.scrollTop = itemTop - dropdownHeight / 2 + itemHeight / 2;
        } else if (itemTop + itemHeight > dropdownHeight + scrollTop) {
            dropdown.scrollTop = itemTop - dropdownHeight + itemHeight;
        } else if (itemTop < scrollTop) {
            dropdown.scrollTop = itemTop;
        }
    };
    const focusOptionByIndex = (index, oldIndex)=>{
        let focusedIndex = index;
        const { length } = options;
        if (index < 0) {
            focusedIndex = length - 1;
        } else if (index >= length) {
            focusedIndex = 0;
        }
        if (focusedIndex === oldIndex) {
            return;
        }
        scrollToElement(focusedIndex);
        setFocusedOptionIndex(focusedIndex);
    };
    const focusOption = (nextIndex, type)=>{
        let index = nextIndex === null ? -1 : nextIndex;
        if (type === FOCUS_ACTION_NEXT) {
            index += 1;
        }
        if (type === FOCUS_ACTION_PREV) {
            index -= 1;
        }
        focusOptionByIndex(index, focusedOptionIndex);
    };
    const handleKeyDown = (event)=>{
        if (event.defaultPrevented) {
            return;
        }
        switch(event.key){
            case Keys.ARROW_UP:
            case Keys.ARROW_DOWN:
                event.preventDefault();
                if (opened) {
                    focusOption(focusedOptionIndex, event.key === Keys.ARROW_UP ? FOCUS_ACTION_PREV : FOCUS_ACTION_NEXT);
                    return;
                }
                setOpened(true);
                setFocusedOptionIndex(0);
                break;
            case Keys.ENTER:
                {
                    if (!opened) {
                        break;
                    }
                    if (!creatable) {
                        event.preventDefault();
                    }
                    if (focusedOptionIndex === null) {
                        break;
                    }
                    const foundOption = options[focusedOptionIndex];
                    if (!foundOption || isServicePreset(foundOption)) {
                        break;
                    }
                    event.preventDefault();
                    addOption(foundOption);
                    setFocusedOptionIndex(null);
                    clearInput();
                    closeDropdownAfterSelect && setOpened(false);
                    break;
                }
            case Keys.ESCAPE:
            case Keys.TAB:
                opened && setOpened(false);
                break;
            default:
                break;
        }
    };
    useEffect(()=>{
        if (focusedOptionIndex === null) {
            setFocusedOption(null);
            return;
        }
        const foundFocusedOptionIndex = options[focusedOptionIndex];
        if (foundFocusedOptionIndex && !isServicePreset(foundFocusedOptionIndex)) {
            setFocusedOption(foundFocusedOptionIndex);
        }
    }, [
        options,
        focusedOptionIndex,
        setFocusedOption
    ]);
    const onDropdownMouseLeave = useCallback(()=>{
        setFocusedOptionIndex(null);
    }, [
        setFocusedOptionIndex
    ]);
    // Handle chevron mousedown to prevent focus issues
    // Using mousedown instead of click ensures this runs before blur/focus events
    const handleChevronMouseDown = (e)=>{
        // Prevent the default behavior which would cause focus/blur events
        e.preventDefault();
        // Stop propagation to prevent other handlers from firing
        e.stopPropagation();
        console.log("handleChevronMouseDown - opened:", opened, "shouldOpenOnFocus:", shouldOpenOnFocus);
        // Set the toggling flag to prevent focus/blur handlers from interfering
        isTogglingRef.current = true;
        // Set the chevron clicked flag to prevent handleClickOutside from closing the dropdown
        wasChevronClickedRef.current = true;
        // Toggle the dropdown state
        if (opened) {
            console.log("  -> Closing dropdown from chevron");
            setShouldOpenOnFocus(false);
            setOpened(false);
        } else {
            console.log("  -> Opening dropdown from chevron");
            setOpened(true);
        }
        // Focus the input and reset the toggling flag after a delay
        setTimeout(()=>{
            if (!opened) {
                var _inputRef_current;
                console.log("  -> Focusing input after delay");
                (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
            }
            // Reset the toggling flag
            console.log("  -> Resetting isToggling flag");
            isTogglingRef.current = false;
            // Reset the chevron clicked flag after a delay
            setTimeout(()=>{
                wasChevronClickedRef.current = false;
            }, 100);
        }, 100);
    };
    const handleClickOutside = useCallback(()=>{
        console.log("handleClickOutside - wasChevronClicked:", wasChevronClickedRef.current);
        // Don't close the dropdown if the chevron was clicked
        if (wasChevronClickedRef.current) {
            console.log("  -> Ignoring click outside due to chevron click");
            return;
        }
        // Don't reopen on next focus
        setShouldOpenOnFocus(false);
        setOpened(false);
    }, [
        setOpened
    ]);
    useGlobalClicks(handleClickOutside, opened ? rootRef : null, opened ? dropdownScrollBoxRef : null);
    const controlledStatus = status || (opened ? "focused" : "default");
    return /*#__PURE__*/ _jsxs(FormInput, {
        ref: multipleRef(ref, containerRef),
        header: header,
        before: before,
        status: controlledStatus,
        disabled: disabled,
        className: classNames("tgui-6cca8a28a056cc34", className),
        children: [
            /*#__PURE__*/ _jsx(MultiselectBase, _object_spread_props(_object_spread({}, restProps), {
                // FormFieldProps
                ref: rootRef,
                className: "tgui-1ed7193796bd9fff",
                // Option props
                onAddChipOption: addOptionFromInput,
                onRemoveChipOption: removeOption,
                renderChip: renderChip,
                chipsValue: value,
                // Input props
                value: inputValue,
                inputRef: inputRef,
                onChange: onInputChange,
                onFocus: callMultiple(handleFocus, onFocus),
                onBlur: callMultiple(handleBlur, onBlur),
                onKeyDown: callMultiple(handleKeyDown, onKeyDown),
                // a11y props
                role: "combobox",
                "aria-expanded": opened,
                "aria-controls": dropdownAriaId,
                "aria-haspopup": "listbox"
            })),
            /*#__PURE__*/ _jsx(Icon20ChevronDown, {
                ref: chevronRef,
                "aria-hidden": true,
                onMouseDown: handleChevronMouseDown,
                className: "tgui-e9b05eb8feaa0359"
            }),
            opened && /*#__PURE__*/ _jsx(MultiselectDropdown, {
                ref: dropdownScrollBoxRef,
                dropdownAriaId: dropdownAriaId,
                options: options,
                onMouseLeave: onDropdownMouseLeave,
                targetRef: rootRef,
                addOptionFromInput: ()=>addOptionFromInput(inputValue),
                setFocusedOptionIndex: setFocusedOptionIndex,
                renderOption: renderOption,
                focusedOption: focusedOption,
                value: value,
                setOptionNode: (index, node)=>{
                    optionsNodes[index] = node;
                },
                setOpened: setOpened,
                closeDropdownAfterSelect: closeDropdownAfterSelect,
                addOption: addOption,
                clearInput: clearInput,
                focusedOptionIndex: focusedOptionIndex,
                portalContainer: portalContainer
            })
        ]
    });
});

//# sourceMappingURL=Multiselect.js.map