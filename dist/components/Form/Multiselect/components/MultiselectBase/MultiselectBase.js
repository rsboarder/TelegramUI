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
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
import { forwardRef, Fragment } from "react";
import styles from "./MultiselectBase.module.css";
import { getHorizontalSideByKey, Keys } from "helpers/accessibility";
import { classNames } from "helpers/classNames";
import { getHTMLElementByChildren, getHTMLElementSiblingByDirection } from "helpers/dom";
import { useExternRef } from "hooks/useExternalRefs";
import { isHTMLElement } from "@floating-ui/utils/dom";
import { Icon16Cancel } from "icons/16/cancel";
import { Tappable } from "components/Service/Tappable/Tappable";
import { Subheadline } from "components/Typography/Subheadline/Subheadline";
import { getValueOptionByHTMLElement } from "./helpers/getValueOptionByHTMLElement";
import { renderChipDefault } from "./constants";
/**
 * Renders the base layout of the multiselect including the chips (selected options) and the input field.
 */ export var MultiselectBase = /*#__PURE__*/ forwardRef(function(_param, ref) {
    var inputRef = _param.inputRef, className = _param.className, // Option props
    chipsValue = _param.chipsValue, onAddChipOption = _param.onAddChipOption, onRemoveChipOption = _param.onRemoveChipOption, _param_renderChip = _param.renderChip, renderChip = _param_renderChip === void 0 ? renderChipDefault : _param_renderChip, // Input props
    value = _param.value, placeholder = _param.placeholder, disabled = _param.disabled, readOnly = _param.readOnly, _param_searchable = _param.searchable, searchable = _param_searchable === void 0 ? true : _param_searchable, restProps = _object_without_properties(_param, [
        "inputRef",
        "className",
        "chipsValue",
        "onAddChipOption",
        "onRemoveChipOption",
        "renderChip",
        "value",
        "placeholder",
        "disabled",
        "readOnly",
        "searchable"
    ]);
    var listRef = useExternRef(ref);
    var valueLength = chipsValue.length;
    var withPlaceholder = valueLength === 0;
    var isDisabled = disabled;
    var isReadOnly = readOnly || !searchable;
    var handleKeyDown = function(event) {
        var targetEl = event.target;
        var inputEl = inputRef.current;
        if (event.defaultPrevented || !inputEl || !isHTMLElement(targetEl)) {
            return;
        }
        var lastOptionIndex = valueLength - 1;
        var nextInputValue = inputEl.value;
        var isInputEl = targetEl === inputEl;
        var isInputValueEmpty = nextInputValue === "";
        switch(event.key){
            case Keys.ENTER:
                {
                    if (isInputEl && !isInputValueEmpty) {
                        event.preventDefault();
                        onAddChipOption(nextInputValue);
                    }
                    break;
                }
            case Keys.BACKSPACE:
                {
                    if (valueLength) {
                        var option = isInputEl && isInputValueEmpty ? chipsValue[lastOptionIndex] : getValueOptionByHTMLElement(chipsValue, targetEl);
                        if (!option) {
                            return;
                        }
                        event.preventDefault();
                        inputRef.current.focus();
                        onRemoveChipOption(option);
                    }
                    break;
                }
            case Keys.ARROW_UP:
            case Keys.ARROW_LEFT:
            case Keys.ARROW_DOWN:
            case Keys.ARROW_RIGHT:
                {
                    if (!valueLength || !listRef.current) {
                        break;
                    }
                    var isSelectionOnFirstLetter = inputEl.selectionStart === 0;
                    var isRightSelection = event.key === Keys.ARROW_RIGHT && isSelectionOnFirstLetter;
                    if (!isInputValueEmpty && !isSelectionOnFirstLetter || isRightSelection) {
                        break;
                    }
                    event.preventDefault();
                    var foundEl = null;
                    var horizontalSide = getHorizontalSideByKey(event.key);
                    if (isInputEl && (event.key === Keys.ARROW_UP || event.key === Keys.ARROW_LEFT)) {
                        foundEl = getHTMLElementByChildren(listRef.current.children, lastOptionIndex);
                    } else if (horizontalSide) {
                        foundEl = getHTMLElementSiblingByDirection(targetEl, horizontalSide);
                    }
                    foundEl && foundEl.focus();
                    break;
                }
            default:
                break;
        }
    };
    var handleChipRemove = function(event, optionToRemove) {
        event.preventDefault();
        event.stopPropagation();
        onRemoveChipOption(optionToRemove);
    };
    var handleClick = function(e) {
        // Check if the click was on a chip
        var target = e.target;
        var isChipClick = target.closest('[role="option"]') !== null;
        // If it's a chip click, stop propagation and don't focus the input
        if (isChipClick) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        // Focus the input if it's not already focused
        var isFocused = document.activeElement === inputRef.current;
        if (!isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    };
    return(// eslint-disable-next-line jsx-a11y/interactive-supports-focus
    /*#__PURE__*/ React.createElement("div", {
        ref: listRef,
        className: classNames(styles.wrapper, withPlaceholder && styles["wrapper--withPlaceholder"], className),
        onClick: isDisabled ? undefined : handleClick,
        role: "listbox",
        "aria-orientation": "horizontal",
        "aria-disabled": disabled,
        "aria-readonly": isReadOnly,
        onKeyDown: isDisabled ? undefined : handleKeyDown
    }, chipsValue.map(function(option, index) {
        return /*#__PURE__*/ React.createElement(Fragment, {
            key: "".concat(_type_of(option.value), "-").concat(option.label)
        }, renderChip({
            children: option.label,
            className: styles.chip,
            value: option.value,
            tabIndex: -1,
            onClick: function(e) {
                e.stopPropagation();
                e.preventDefault();
            },
            onMouseDown: function(e) {
                e.stopPropagation();
                e.preventDefault();
            },
            after: /*#__PURE__*/ React.createElement(Tappable, {
                Component: "div",
                interactiveAnimation: "opacity",
                onClick: function(event) {
                    return handleChipRemove(event, option);
                },
                className: styles.closeIcon
            }, /*#__PURE__*/ React.createElement(Icon16Cancel, null)),
            role: "option",
            "aria-selected": true,
            "aria-posinset": index + 1,
            "aria-setsize": valueLength
        }));
    }), /*#__PURE__*/ React.createElement(Subheadline, _object_spread_props(_object_spread({
        ref: inputRef,
        "aria-autocomplete": "list",
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false
    }, restProps), {
        Component: "input",
        type: "text",
        className: styles.input,
        disabled: disabled,
        readOnly: isReadOnly,
        inputMode: searchable ? undefined : 'none',
        placeholder: withPlaceholder ? placeholder : undefined
    }))));
});

