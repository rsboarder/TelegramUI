"use client";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import { forwardRef, useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./Multiselect.module.css";
import { Keys } from "helpers/accessibility";
import { classNames } from "helpers/classNames";
import { callMultiple } from "helpers/function";
import { multipleRef } from "helpers/react/refs";
import { useGlobalClicks } from "hooks/useGlobalClicks";
import { Icon20ChevronDown } from "icons/20/chevron_down";
import { FormInput } from "components/Form/FormInput/FormInput";
import { MultiselectBase } from "./components/MultiselectBase/MultiselectBase";
import { MultiselectDropdown } from "./components/MultiselectDropdown/MultiselectDropdown";
import { FOCUS_ACTION_NEXT, FOCUS_ACTION_PREV, isServicePreset } from "./hooks/constants";
import { useMultiselect } from "./hooks/useMultiselect";
/**
 * A comprehensive component for rendering a multiselect input field with customizable options, dropdown behaviors, and chip display.
 * It integrates functionality for selecting multiple options, searching, and even creating new options based on user input.
 */ export var Multiselect = /*#__PURE__*/ forwardRef(function(_param, ref) {
    var // FormInput options
    header = _param.header, before = _param.before, status = _param.status, className = _param.className, children = _param.children, disabled = _param.disabled, // CustomSelectDropdownProps
    optionsProp = _param.options, _param_closeDropdownAfterSelect = _param.closeDropdownAfterSelect, closeDropdownAfterSelect = _param_closeDropdownAfterSelect === void 0 ? false : _param_closeDropdownAfterSelect, selectedBehavior = _param.selectedBehavior, emptyText = _param.emptyText, _param_creatable = _param.creatable, creatable = _param_creatable === void 0 ? false : _param_creatable, filterFn = _param.filterFn, tmp = _param.// MultiselectInputProps
    value, valueProp = tmp === void 0 ? [] : tmp, defaultValue = _param.defaultValue, inputValueProp = _param.inputValue, renderChip = _param.renderChip, renderOption = _param.renderOption, onInputChangeProp = _param.onInputChange, onChange = _param.onChange, onFocus = _param.onFocus, onBlur = _param.onBlur, onKeyDown = _param.onKeyDown, // Portal container
    portalContainer = _param.portalContainer, // Searchable prop
    searchable = _param.searchable, restProps = _object_without_properties(_param, [
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
        "portalContainer",
        "searchable"
    ]);
    var _useMultiselect = useMultiselect({
        // Option props
        value: valueProp,
        defaultValue: defaultValue,
        onChange: onChange,
        // Input props
        inputValue: inputValueProp,
        onInputChange: onInputChangeProp,
        // Dropdown props
        options: optionsProp,
        emptyText: emptyText,
        creatable: creatable,
        filterFn: filterFn,
        selectedBehavior: selectedBehavior,
        // Other props
        disabled: disabled
    }), // Option props
    value = _useMultiselect.value, addOptionFromInput = _useMultiselect.addOptionFromInput, addOption = _useMultiselect.addOption, removeOption = _useMultiselect.removeOption, // Input props
    inputRef = _useMultiselect.inputRef, inputValue = _useMultiselect.inputValue, clearInput = _useMultiselect.clearInput, onInputChange = _useMultiselect.onInputChange, // Dropdown props
    options = _useMultiselect.options, opened = _useMultiselect.opened, setOpened = _useMultiselect.setOpened, focusedOption = _useMultiselect.focusedOption, focusedOptionIndex = _useMultiselect.focusedOptionIndex, setFocusedOption = _useMultiselect.setFocusedOption, setFocusedOptionIndex = _useMultiselect.setFocusedOptionIndex;
    var containerRef = useRef(null);
    var rootRef = useRef(null);
    var chevronRef = useRef(null);
    var wasChevronClickedRef = useRef(false);
    var dropdownAriaId = useId();
    var dropdownScrollBoxRef = useRef(null);
    // State to control whether focus should open the dropdown
    var _useState = _sliced_to_array(useState(true), 2), shouldOpenOnFocus = _useState[0], setShouldOpenOnFocus = _useState[1];
    // Track if we're in the process of toggling via the chevron
    var isTogglingRef = useRef(false);
    // Track if the last mousedown was on a chip
    var wasChipClickedRef = useRef(false);
    var handleFocus = function() {
        // If we're in the process of toggling via the chevron, don't change the dropdown state
        if (isTogglingRef.current) {
            return;
        }
        // If the last mousedown was on a chip, don't open the dropdown
        if (wasChipClickedRef.current) {
            wasChipClickedRef.current = false;
            return;
        }
        // Open the dropdown if we should open on focus
        if (shouldOpenOnFocus) {
            setOpened(true);
            setFocusedOptionIndex(null);
        }
        // Reset the flag for next focus
        setShouldOpenOnFocus(true);
    };
    var handleBlur = function(event) {
        // If we're in the process of toggling via the chevron, don't do anything
        if (isTogglingRef.current) {
            return;
        }
        if (!event.defaultPrevented && !creatable) {
            event.preventDefault();
        }
    };
    var optionsNodes = useRef([]).current;
    var scrollToElement = function(index) {
        var center = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var dropdown = dropdownScrollBoxRef.current;
        var item = optionsNodes[index];
        if (!item || !dropdown) {
            return;
        }
        var dropdownHeight = dropdown.offsetHeight;
        var scrollTop = dropdown.scrollTop;
        var itemTop = item.offsetTop;
        var itemHeight = item.offsetHeight;
        if (center) {
            dropdown.scrollTop = itemTop - dropdownHeight / 2 + itemHeight / 2;
        } else if (itemTop + itemHeight > dropdownHeight + scrollTop) {
            dropdown.scrollTop = itemTop - dropdownHeight + itemHeight;
        } else if (itemTop < scrollTop) {
            dropdown.scrollTop = itemTop;
        }
    };
    var focusOptionByIndex = function(index, oldIndex) {
        var focusedIndex = index;
        var length = options.length;
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
    var focusOption = function(nextIndex, type) {
        var index = nextIndex === null ? -1 : nextIndex;
        if (type === FOCUS_ACTION_NEXT) {
            index += 1;
        }
        if (type === FOCUS_ACTION_PREV) {
            index -= 1;
        }
        focusOptionByIndex(index, focusedOptionIndex);
    };
    var handleKeyDown = function(event) {
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
                    var foundOption = options[focusedOptionIndex];
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
    useEffect(function() {
        if (focusedOptionIndex === null) {
            setFocusedOption(null);
            return;
        }
        var foundFocusedOptionIndex = options[focusedOptionIndex];
        if (foundFocusedOptionIndex && !isServicePreset(foundFocusedOptionIndex)) {
            setFocusedOption(foundFocusedOptionIndex);
        }
    }, [
        options,
        focusedOptionIndex,
        setFocusedOption
    ]);
    var onDropdownMouseLeave = useCallback(function() {
        setFocusedOptionIndex(null);
    }, [
        setFocusedOptionIndex
    ]);
    // Handle chevron mousedown to prevent focus issues
    // Using mousedown instead of click ensures this runs before blur/focus events
    var handleChevronMouseDown = function(e) {
        // Prevent the default behavior which would cause focus/blur events
        e.preventDefault();
        // Stop propagation to prevent other handlers from firing
        e.stopPropagation();
        // Set the toggling flag to prevent focus/blur handlers from interfering
        isTogglingRef.current = true;
        // Set the chevron clicked flag to prevent handleClickOutside from closing the dropdown
        wasChevronClickedRef.current = true;
        // Toggle the dropdown state
        if (opened) {
            setShouldOpenOnFocus(false);
            setOpened(false);
        } else {
            setOpened(true);
        }
        // Focus the input and reset the toggling flag after a delay
        setTimeout(function() {
            if (!opened) {
                var _inputRef_current;
                (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
            }
            // Reset the toggling flag
            isTogglingRef.current = false;
            // Reset the chevron clicked flag after a delay
            setTimeout(function() {
                wasChevronClickedRef.current = false;
            }, 100);
        }, 100);
    };
    // Handle base click to toggle dropdown when no chips are selected
    var handleBaseClick = function(e) {
        // Check if the click originated from the chevron or if we're in the toggling process
        if (wasChevronClickedRef.current || disabled) {
            return;
        }
        // Check if the click was on a chip
        var target = e.target;
        var isChipClick = target.closest('[role="option"]') !== null;
        // If it's a chip click, stop propagation
        if (isChipClick) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if (opened) {
            setShouldOpenOnFocus(false);
            setOpened(false);
        } else {
            var _inputRef_current;
            setOpened(true);
            (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
        }
    };
    // Handle base mousedown to prevent immediate closing on first click
    var handleBaseMouseDown = function(e) {
        // Check if the click was on a chip
        var target = e.target;
        var isChipClick = target.closest('[role="option"]') !== null;
        // If it's a chip click, prevent default behavior
        if (isChipClick) {
            e.preventDefault();
            e.stopPropagation();
            wasChipClickedRef.current = true;
            return;
        }
        // Only handle if not disabled
        if (!disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    var handleClickOutside = useCallback(function() {
        // Don't close the dropdown if the chevron was clicked
        if (wasChevronClickedRef.current) {
            return;
        }
        // Don't reopen on next focus
        setShouldOpenOnFocus(false);
        setOpened(false);
    }, [
        setOpened
    ]);
    useGlobalClicks(handleClickOutside, opened ? rootRef : null, opened ? dropdownScrollBoxRef : null);
    var controlledStatus = status || (opened ? "focused" : "default");
    return /*#__PURE__*/ React.createElement(FormInput, {
        ref: multipleRef(ref, containerRef),
        header: header,
        before: before,
        status: controlledStatus,
        disabled: disabled,
        className: classNames(styles.wrapper, className)
    }, /*#__PURE__*/ React.createElement(MultiselectBase, _object_spread_props(_object_spread({}, restProps), {
        // FormFieldProps
        ref: rootRef,
        className: styles.base,
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
        searchable: searchable,
        // a11y props
        role: "combobox",
        "aria-expanded": opened,
        "aria-controls": dropdownAriaId,
        "aria-haspopup": "listbox",
        // Add click handler for the base component
        onClick: handleBaseClick,
        // Add onMouseDown handler to prevent immediate closing
        onMouseDown: handleBaseMouseDown
    })), /*#__PURE__*/ React.createElement(Icon20ChevronDown, {
        ref: chevronRef,
        "aria-hidden": true,
        onMouseDown: handleChevronMouseDown,
        className: styles.chevron
    }), opened && /*#__PURE__*/ React.createElement(MultiselectDropdown, {
        ref: dropdownScrollBoxRef,
        dropdownAriaId: dropdownAriaId,
        options: options,
        onMouseLeave: onDropdownMouseLeave,
        targetRef: rootRef,
        addOptionFromInput: function() {
            return addOptionFromInput(inputValue);
        },
        setFocusedOptionIndex: setFocusedOptionIndex,
        renderOption: renderOption,
        focusedOption: focusedOption,
        value: value,
        setOptionNode: function(index, node) {
            optionsNodes[index] = node;
        },
        setOpened: setOpened,
        closeDropdownAfterSelect: closeDropdownAfterSelect,
        addOption: addOption,
        clearInput: clearInput,
        focusedOptionIndex: focusedOptionIndex,
        portalContainer: portalContainer
    }));
});

