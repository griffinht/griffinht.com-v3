import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Hi() {
  return _jsx(_Fragment, {
    children: "hi"
  });
}
function _createMdxContent(props) {
  const _components = {
    h2: "h2",
    hr: "hr",
    p: "p",
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.hr, {}), "\n", _jsx(_components.h2, {
      children: 'title: "My Blog Post"'
    }), "\n", _jsx(_components.p, {
      children: "sipping on prometheize"
    }), "\n", "\n", _jsx(Hi, {})]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
export {
  Hi,
  MDXContent as default
};
