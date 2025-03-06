"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Link", {
    enumerable: true,
    get: function() {
        return Link;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _classNames = require("../../../helpers/classNames");
const Link = (_param)=>{
    var { className, children } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "children"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("a", _object_spread_props._(_object_spread._({
        className: (0, _classNames.classNames)("tgui-bfabaddd169233a9", className)
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=Link.js.map