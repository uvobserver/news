/* @ds-bundle: {"format":4,"namespace":"TheUVObserverDesignSystem_acd987","components":[{"name":"ArticleCard","sourcePath":"components/editorial/ArticleCard.jsx"},{"name":"Byline","sourcePath":"components/editorial/Byline.jsx"},{"name":"Headline","sourcePath":"components/editorial/Headline.jsx"},{"name":"Kicker","sourcePath":"components/editorial/Kicker.jsx"},{"name":"Masthead","sourcePath":"components/editorial/Masthead.jsx"},{"name":"PullQuote","sourcePath":"components/editorial/PullQuote.jsx"},{"name":"Rule","sourcePath":"components/editorial/Rule.jsx"},{"name":"EmailCapture","sourcePath":"components/forms/EmailCapture.jsx"},{"name":"SubscribeButton","sourcePath":"components/forms/SubscribeButton.jsx"}],"sourceHashes":{"components/editorial/ArticleCard.jsx":"83779a02bf9c","components/editorial/Byline.jsx":"c36f6269b502","components/editorial/Headline.jsx":"12d955cb5d64","components/editorial/Kicker.jsx":"caa44a652f7a","components/editorial/Masthead.jsx":"c4c7151399c6","components/editorial/PullQuote.jsx":"e807afbe55ad","components/editorial/Rule.jsx":"bfcaba554c6a","components/forms/EmailCapture.jsx":"64f00ae8fb78","components/forms/SubscribeButton.jsx":"e9ba79757ba1","ui_kits/website/Homepage.jsx":"e97d84dc412d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TheUVObserverDesignSystem_acd987 = window.TheUVObserverDesignSystem_acd987 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/editorial/Byline.jsx
try { (() => {
function Byline({
  author,
  date
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }
  }, "By ", author, date ? ` · ${date}` : '');
}
Object.assign(__ds_scope, { Byline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Byline.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Headline.jsx
try { (() => {
function Headline({
  children,
  level = 'lg',
  as
}) {
  const sizes = {
    xl: 'var(--text-headline-xl)',
    lg: 'var(--text-headline-lg)',
    md: 'var(--text-headline-md)'
  };
  const Tag = as || (level === 'xl' ? 'h1' : level === 'lg' ? 'h2' : 'h3');
  return /*#__PURE__*/React.createElement(Tag, {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: level === 'md' ? 700 : 900,
      fontSize: sizes[level],
      lineHeight: 'var(--leading-tight)',
      color: 'var(--text-headline)',
      margin: 0
    }
  }, children);
}
Object.assign(__ds_scope, { Headline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Headline.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Kicker.jsx
try { (() => {
function Kicker({
  children,
  color = 'primary'
}) {
  const c = color === 'secondary' ? 'var(--brand-secondary)' : 'var(--brand-primary)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-kicker)',
      letterSpacing: 'var(--tracking-kicker)',
      textTransform: 'uppercase',
      fontWeight: 800,
      color: c
    }
  }, children);
}
Object.assign(__ds_scope, { Kicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Kicker.jsx", error: String((e && e.message) || e) }); }

// components/editorial/ArticleCard.jsx
try { (() => {
function ArticleCard({
  kicker,
  kickerColor,
  title,
  dek,
  author,
  date,
  size = 'lg'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      paddingBottom: 20
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Kicker, {
    color: kickerColor
  }, kicker), /*#__PURE__*/React.createElement(__ds_scope.Headline, {
    level: size
  }, title), dek && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-body)'
    }
  }, dek), /*#__PURE__*/React.createElement(__ds_scope.Byline, {
    author: author,
    date: date
  }));
}
Object.assign(__ds_scope, { ArticleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/ArticleCard.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Masthead.jsx
try { (() => {
function Masthead({
  tagline = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      padding: '20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-masthead)',
      color: 'var(--brand-primary)',
      fontSize: 'clamp(32px,6vw,64px)',
      lineHeight: 1,
      letterSpacing: '-0.01em'
    }
  }, "THE UV OBSERVER"), tagline && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      color: 'var(--brand-secondary)',
      fontSize: '13px',
      letterSpacing: '0.03em',
      textTransform: 'uppercase'
    }
  }, "Unreal Coverage of the Upper Valley, Published Occasionally"));
}
Object.assign(__ds_scope, { Masthead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Masthead.jsx", error: String((e && e.message) || e) }); }

// components/editorial/PullQuote.jsx
try { (() => {
function PullQuote({
  children,
  attribution
}) {
  return /*#__PURE__*/React.createElement("blockquote", {
    style: {
      borderTop: 'var(--rule-thick) solid var(--ink-900)',
      borderBottom: 'var(--rule-thick) solid var(--ink-900)',
      padding: '20px 0',
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontStyle: 'italic',
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-headline)',
      lineHeight: 'var(--leading-body)'
    }
  }, "\u201C", children, "\u201D", attribution && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontFamily: 'var(--font-display)',
      fontStyle: 'normal',
      fontSize: 'var(--text-caption)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: 'var(--text-muted)'
    }
  }, "\u2014 ", attribution));
}
Object.assign(__ds_scope, { PullQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/PullQuote.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Rule.jsx
try { (() => {
function Rule({
  weight = 'thin'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: weight === 'thick' ? 'var(--rule-thick)' : 'var(--rule-thin)',
      background: weight === 'thick' ? 'var(--ink-900)' : 'var(--hairline)',
      width: '100%'
    }
  });
}
Object.assign(__ds_scope, { Rule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Rule.jsx", error: String((e && e.message) || e) }); }

// components/forms/EmailCapture.jsx
try { (() => {
function EmailCapture({
  onSubmit
}) {
  return /*#__PURE__*/React.createElement("form", {
    style: {
      display: 'flex',
      gap: 8
    },
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit();
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "Your email",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 12px',
      flex: 1,
      color: 'var(--text-body)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '14px',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      color: '#fff',
      background: 'var(--brand-primary)',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 18px',
      cursor: 'pointer'
    }
  }, "Subscribe"));
}
Object.assign(__ds_scope, { EmailCapture });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/EmailCapture.jsx", error: String((e && e.message) || e) }); }

// components/forms/SubscribeButton.jsx
try { (() => {
function SubscribeButton({
  children = 'Subscribe',
  variant = 'primary'
}) {
  const bg = variant === 'secondary' ? 'var(--brand-secondary)' : 'var(--brand-primary)';
  const hover = variant === 'secondary' ? 'var(--brand-secondary-hover)' : 'var(--brand-primary-hover)';
  return /*#__PURE__*/React.createElement("button", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '14px',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      color: '#fff',
      background: bg,
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      padding: '12px 22px',
      cursor: 'pointer'
    },
    onMouseOver: e => e.currentTarget.style.background = hover,
    onMouseOut: e => e.currentTarget.style.background = bg
  }, children);
}
Object.assign(__ds_scope, { SubscribeButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SubscribeButton.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Homepage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Masthead,
  Rule,
  Kicker,
  Headline,
  Byline,
  ArticleCard,
  PullQuote
} = window.TheUVObserverDesignSystem_acd987;
const {
  SubscribeButton,
  EmailCapture
} = window.TheUVObserverDesignSystem_acd987;
const STORIES = [{
  kicker: 'City Hall',
  kickerColor: 'primary',
  title: 'City Determines How To Use Common Sense',
  dek: 'A rediscovered pamphlet has thrown the Council into a two-hour debate over its own relevance.',
  author: 'Staff Correspondent',
  date: 'Sept. 12'
}, {
  kicker: 'Local Business',
  kickerColor: 'secondary',
  title: 'Diner Adds Fourth Kind of Hash Browns',
  author: 'Staff Correspondent',
  date: 'Sept. 10'
}, {
  kicker: 'Selectboard',
  kickerColor: 'primary',
  title: 'Motion Tabled for the Ninth Consecutive Meeting',
  author: 'Staff Correspondent',
  date: 'Sept. 8'
}, {
  kicker: 'Schools',
  kickerColor: 'secondary',
  title: 'District Adds Committee to Oversee Other Committees',
  author: 'Staff Correspondent',
  date: 'Sept. 5'
}, {
  kicker: 'Weather',
  kickerColor: 'primary',
  title: 'Meteorologist Describes Forecast as "Vermont-ish"',
  author: 'Staff Correspondent',
  date: 'Sept. 3'
}];
function Homepage() {
  const [subscribed, setSubscribed] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      minHeight: '100%',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-content-width)',
      margin: '0 auto',
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '14px 0 0',
      gap: 16,
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "About"), /*#__PURE__*/React.createElement("span", null, "Archive"), /*#__PURE__*/React.createElement("span", null, "Support Us")), /*#__PURE__*/React.createElement(Masthead, null), /*#__PURE__*/React.createElement(Rule, {
    weight: "thick"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 48,
      padding: '32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ArticleCard, _extends({}, STORIES[0], {
    size: "xl"
  })), /*#__PURE__*/React.createElement(Rule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 0'
    }
  }, /*#__PURE__*/React.createElement(PullQuote, {
    attribution: "City Archivist"
  }, "Display it under glass to make sure no one attempts to use Common Sense on a daily basis, which could result in more questions than answers.")), /*#__PURE__*/React.createElement(Rule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 20
    }
  }, STORIES.slice(1).map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement(ArticleCard, s), /*#__PURE__*/React.createElement(Rule, null))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    level: "md"
  }, "Get unreal coverage in your inbox"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--text-muted)'
    }
  }, "Published occasionally. Unsubscribe whenever."), subscribed ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 13,
      color: 'var(--brand-secondary)'
    }
  }, "You're on the list.") : /*#__PURE__*/React.createElement(EmailCapture, {
    onSubmit: () => setSubscribed(true)
  })), /*#__PURE__*/React.createElement(Kicker, null, "Most Read"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 12
    }
  }, STORIES.slice(0, 3).map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 0'
    }
  }, /*#__PURE__*/React.createElement(Headline, {
    level: "md"
  }, s.title)), /*#__PURE__*/React.createElement(Rule, null)))))), /*#__PURE__*/React.createElement(Rule, {
    weight: "thick"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 The UV Observer. Not a real newspaper."), /*#__PURE__*/React.createElement(SubscribeButton, null, "Subscribe"))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Homepage, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Homepage.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ArticleCard = __ds_scope.ArticleCard;

__ds_ns.Byline = __ds_scope.Byline;

__ds_ns.Headline = __ds_scope.Headline;

__ds_ns.Kicker = __ds_scope.Kicker;

__ds_ns.Masthead = __ds_scope.Masthead;

__ds_ns.PullQuote = __ds_scope.PullQuote;

__ds_ns.Rule = __ds_scope.Rule;

__ds_ns.EmailCapture = __ds_scope.EmailCapture;

__ds_ns.SubscribeButton = __ds_scope.SubscribeButton;

})();
