import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/home/FAQSection.jsx");const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=44256bb7";
import { useWP } from "/src/context/WPContext.jsx?t=1777824527950";
var _jsxFileName = "C:/Users/abish/site/Valor/src/components/home/FAQSection.jsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=44256bb7";
var _s = $RefreshSig$();
export default function FAQSection() {
	_s();
	const { data } = useWP();
	const faqs = data.faqs || [];
	const [openIndex, setOpenIndex] = useState(0);
	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? -1 : index);
	};
	return /* @__PURE__ */ _jsxDEV("section", {
		className: "faq-section",
		"aria-labelledby": "faq-title",
		children: [/* @__PURE__ */ _jsxDEV("h2", {
			id: "faq-title",
			className: "faq-title",
			children: "FAQ"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 15,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			className: "faq-list",
			children: faqs.map((faq, index) => {
				const isOpen = openIndex === index;
				return /* @__PURE__ */ _jsxDEV("div", {
					className: `faq-item ${isOpen ? "open" : ""}`,
					children: [/* @__PURE__ */ _jsxDEV("button", {
						className: "faq-question",
						"aria-expanded": isOpen,
						onClick: () => toggleFAQ(index),
						children: [
							/* @__PURE__ */ _jsxDEV("span", {
								className: "q-icon",
								children: "Q"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 26,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("span", {
								className: "question-text",
								children: faq.question
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 27,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("span", {
								className: `arrow-icon ${isOpen ? "open" : ""}`,
								children: "▼"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 28,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 21,
						columnNumber: 15
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: `faq-answer ${isOpen ? "open" : ""}`,
						role: "region",
						hidden: !isOpen,
						children: /* @__PURE__ */ _jsxDEV("div", {
							className: "answer-inner",
							children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "a-icon",
								children: "A"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 37,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("p", {
								className: "answer-text",
								children: faq.answer
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 36,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 15
					}, this)]
				}, index, true, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 13
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 16,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 14,
		columnNumber: 5
	}, this);
}
_s(FAQSection, "CvK8Cdm6rWxOWHwgqkfn6ovlcXM=", false, function() {
	return [useWP];
});
_c = FAQSection;
var _c;
$RefreshReg$(_c, "FAQSection");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/components/home/FAQSection.jsx?t=1777824527950";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/abish/site/Valor/src/components/home/FAQSection.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/abish/site/Valor/src/components/home/FAQSection.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/abish/site/Valor/src/components/home/FAQSection.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLGdCQUFnQjtBQUNoQyxTQUFTLGFBQWE7Ozs7QUFFdEIsZUFBZSxTQUFTLGFBQWE7O0NBQ25DLE1BQU0sRUFBRSxTQUFTLE9BQU87Q0FDeEIsTUFBTSxPQUFPLEtBQUssUUFBUSxFQUFFO0NBQzVCLE1BQU0sQ0FBQyxXQUFXLGdCQUFnQixTQUFTLEVBQUU7Q0FFN0MsTUFBTSxhQUFhLFVBQVU7QUFDM0IsZUFBYSxjQUFjLFFBQVEsQ0FBQyxJQUFJLE1BQU07O0FBR2hELFFBQ0Usd0JBQUMsV0FBRDtFQUFTLFdBQVU7RUFBYyxtQkFBZ0I7WUFBakQsQ0FDRSx3QkFBQyxNQUFEO0dBQUksSUFBRztHQUFZLFdBQVU7YUFBWTtHQUFROzs7O1lBQ2pELHdCQUFDLE9BQUQ7R0FBSyxXQUFVO2FBQ1osS0FBSyxLQUFLLEtBQUssVUFBVTtJQUN4QixNQUFNLFNBQVMsY0FBYztBQUM3QixXQUNFLHdCQUFDLE9BQUQ7S0FBaUIsV0FBVyxZQUFZLFNBQVMsU0FBUztlQUExRCxDQUNFLHdCQUFDLFVBQUQ7TUFDRSxXQUFVO01BQ1YsaUJBQWU7TUFDZixlQUFlLFVBQVUsTUFBTTtnQkFIakM7T0FLRSx3QkFBQyxRQUFEO1FBQU0sV0FBVTtrQkFBUztRQUFROzs7OztPQUNqQyx3QkFBQyxRQUFEO1FBQU0sV0FBVTtrQkFBaUIsSUFBSTtRQUFnQjs7Ozs7T0FDckQsd0JBQUMsUUFBRDtRQUFNLFdBQVcsY0FBYyxTQUFTLFNBQVM7a0JBQU07UUFBUTs7Ozs7T0FDeEQ7Ozs7O2VBRVQsd0JBQUMsT0FBRDtNQUNFLFdBQVcsY0FBYyxTQUFTLFNBQVM7TUFDM0MsTUFBSztNQUNMLFFBQVEsQ0FBQztnQkFFVCx3QkFBQyxPQUFEO09BQUssV0FBVTtpQkFBZixDQUNFLHdCQUFDLFFBQUQ7UUFBTSxXQUFVO2tCQUFTO1FBQVE7Ozs7aUJBQ2pDLHdCQUFDLEtBQUQ7UUFBRyxXQUFVO2tCQUFlLElBQUk7UUFBVzs7OztnQkFDdkM7Ozs7OztNQUNGOzs7O2NBQ0Y7T0FyQkk7Ozs7WUFxQko7S0FFUjtHQUNFOzs7O1dBQ0U7Ozs7Ozs7OztFQUViIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkZBUVNlY3Rpb24uanN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVdQIH0gZnJvbSAnLi4vLi4vY29udGV4dC9XUENvbnRleHQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGQVFTZWN0aW9uKCkge1xuICBjb25zdCB7IGRhdGEgfSA9IHVzZVdQKCk7XG4gIGNvbnN0IGZhcXMgPSBkYXRhLmZhcXMgfHwgW107XG4gIGNvbnN0IFtvcGVuSW5kZXgsIHNldE9wZW5JbmRleF0gPSB1c2VTdGF0ZSgwKTtcblxuICBjb25zdCB0b2dnbGVGQVEgPSAoaW5kZXgpID0+IHtcbiAgICBzZXRPcGVuSW5kZXgob3BlbkluZGV4ID09PSBpbmRleCA/IC0xIDogaW5kZXgpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZmFxLXNlY3Rpb25cIiBhcmlhLWxhYmVsbGVkYnk9XCJmYXEtdGl0bGVcIj5cbiAgICAgIDxoMiBpZD1cImZhcS10aXRsZVwiIGNsYXNzTmFtZT1cImZhcS10aXRsZVwiPkZBUTwvaDI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZhcS1saXN0XCI+XG4gICAgICAgIHtmYXFzLm1hcCgoZmFxLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlzT3BlbiA9IG9wZW5JbmRleCA9PT0gaW5kZXg7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtgZmFxLWl0ZW0gJHtpc09wZW4gPyAnb3BlbicgOiAnJ31gfT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmYXEtcXVlc3Rpb25cIiBcbiAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59IFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRvZ2dsZUZBUShpbmRleCl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJxLWljb25cIj5RPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInF1ZXN0aW9uLXRleHRcIj57ZmFxLnF1ZXN0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BhcnJvdy1pY29uICR7aXNPcGVuID8gJ29wZW4nIDogJyd9YH0+4pa8PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmFxLWFuc3dlciAke2lzT3BlbiA/ICdvcGVuJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgcm9sZT1cInJlZ2lvblwiXG4gICAgICAgICAgICAgICAgaGlkZGVuPXshaXNPcGVufVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbnN3ZXItaW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImEtaWNvblwiPkE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhbnN3ZXItdGV4dFwiPntmYXEuYW5zd2VyfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn1cbiJdfQ==