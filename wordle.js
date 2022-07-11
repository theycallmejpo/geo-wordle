    ? t(
        require("react"),
        require("react-dom"),
        require("react-redux"),
        require("foundation"),
        require("classnames"),
        require("reselect"),
        require("redux"),
        require("redux-thunk"),
      )
    : "function" == typeof define && define.amd
    ? define(
        [
          "react",
          "react-dom",
          "react-redux",
          "foundation",
          "classnames",
          "reselect",
          "redux",
          "redux-thunk",
        ],
        t,
      )
    : t(
        (e = e || self).React,
        e.ReactDOM,
        e.ReactRedux,
        e.Foundation,
        e.classNames,
        e.Reselect,
        e.Redux,
        e.ReduxThunk,
      );
})(this, function (React, ReactDOM, ReactRedux, _, classNames, Reselect, Redux, ReduxThunk) {
  "use strict";
  var f = "default" in React ? React.default : React;
  (ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, "default") ? ReactDOM.default : ReactDOM),
    (classNames =
      classNames && Object.prototype.hasOwnProperty.call(classNames, "default") ? classNames.default : classNames),
    (ReduxThunk =
      ReduxThunk && Object.prototype.hasOwnProperty.call(ReduxThunk, "default") ? ReduxThunk.default : ReduxThunk);
  var i = React.createContext({
    getVariant: function () {
      return null;
    },
    reportExposure: function (e) {
      return null;
    },
    tests: {},
    hasAbraLoaded: !1,
  });
  function r(t, e) {
    var n,
      a = Object.keys(t);
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(t)),
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
        a.push.apply(a, n)),
      a
    );
  }
  function l(a) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? r(Object(o), !0).forEach(function (e) {
            var t, n;
            (t = a),
              (e = o[(n = e)]),
              n in t
                ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o))
        : r(Object(o)).forEach(function (e) {
            Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return a;
  }
  function u(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return s(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? s(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function s(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function c(e) {
    var t = e.children,
      a = e.regiId,
      n = (e = u(React.useState({}), 2))[0],
      o = e[1],
      r = (e = u(React.useState(!1), 2))[0],
      s = e[1];
    return (
      React.useEffect(
        function () {
          var e,
            t,
            n =
              (null === (e = window.config) || void 0 === e
                ? void 0
                : e.AbraConfig) || {};
          _.abra.init(
            window.abra.config,
            {
              agent_id:
                (null === (e = window.config) ||
                void 0 === e ||
                null === (t = e.userInfo) ||
                void 0 === t
                  ? void 0
                  : t.agentID) || _.agentIdCookie,
              regi_id: a,
            },
            n,
          ),
            o(l({}, _.abra.getTests())),
            s(!0);
        },
        [a],
      ),
      (e = React.useMemo(
        function () {
          return {
            tests: n,
            getVariant: function (e) {
              return n[e];
            },
            reportExposure: function (e) {
              return _.abra.reportExposure(e);
            },
            hasAbraLoaded: r,
          };
        },
        [n, r],
      )),
      f.createElement(i.Provider, {value: e}, t)
    );
  }
  function b(e, t) {
    var n = React.useRef(e);
    React.useLayoutEffect(
      function () {
        n.current = e;
      },
      [e],
    ),
      React.useEffect(
        function () {
          if (t || 0 === t) {
            var e = setTimeout(function () {
              return n.current();
            }, t);
            return function () {
              return clearTimeout(e);
            };
          }
        },
        [t],
      );
  }
  var d,
    m = "nyt-wordle-refresh",
    _localStorage = window.localStorage,
    g = 432e5;
  function k() {
    return (d =
      d ||
      setInterval(function () {
        _localStorage.getItem(m) &&
          (_localStorage.removeItem(m),
          window.isHybridWebView ||
            (document.location.href.match(/.*\.nytimes\.com/g)
              ? document.location.reload(!0)
              : document.location.replace(
                  "https://www.nytimes.com/games/wordle",
                )));
      }, g));
  }
  var w = {
    help: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z",
    settings:
      "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z",
    backspace:
      "M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z",
    close:
      "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
    share:
      "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z",
    statistics:
      "M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z",
  };
  function v(e) {
    var t = e.icon,
      n = e.onClick,
      a = e.disabled,
      o = void 0 !== a && a,
      a = e.id,
      r = e.fillColor;
    return f.createElement(
      "svg",
      {
        id: a,
        xmlns: "http://www.w3.org/2000/svg",
        height: "24",
        viewBox: "0 0 24 24",
        width: "24",
        className: "game-icon",
        onClick: n,
        "data-testid": "icon-".concat(t),
      },
      f.createElement("path", {
        fill:
          r ||
          (o
            ? "var(--icon-disabled)"
            : "share" === t
            ? "var(--white)"
            : "var(--color-tone-1)"),
        d: w[t],
      }),
    );
  }
  var x = function () {
      return ReactRedux.useDispatch();
    },
    S = ReactRedux.useSelector;
  function E(t, e) {
    var n,
      a = Object.keys(t);
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(t)),
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
        a.push.apply(a, n)),
      a
    );
  }
  function z(a) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? E(Object(o), !0).forEach(function (e) {
            var t, n;
            (t = a),
              (e = o[(n = e)]),
              n in t
                ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o))
        : E(Object(o)).forEach(function (e) {
            Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return a;
  }
  function j() {
    return {type: M};
  }
  function N(e) {
    return {type: D, payload: {error: e}};
  }
  function C(e, t, n, a) {
    return {
      type: q,
      payload: {name: e, label: t, useBeacon: n, context: a},
    };
  }
  function O(e, t) {
    return {type: G, payload: {text: e, timestamp: t}};
  }
  var A = "wordle/overlays/OPEN_MODAL",
    I = "wordle/overlays/CLOSE_MODAL",
    T = "wordle/overlays/OPEN_PAGE",
    L = "wordle/overlays/OPEN_MOMENT",
    P = "wordle/overlays/CLOSE_PAGE",
    M = "wordle/overlays/CLOSE_MOMENT",
    R = "wordle/overlays/WILL_CLOSE_PAGE",
    D = "wordle/overlays/OPEN_ERROR",
    B = "wordle/overlays/OPEN_NAV_MODAL",
    H = "wordle/overlays/CLOSE_NAV_MODAL",
    q = "wordle/overlays/TRACK_NAV_MODAL_ITEM",
    W = "wordle/overlays/ADD_TOAST",
    G = "wordle/overlays/REMOVE_TOAST",
    F = "wordle/overlays/TRACK_AUTH_CLICK",
    Y = "wordle/overlays/TRACK_AUTH_IMPRESSION",
    V = function (e) {
      return {
        type: A,
        payload: {
          modal: e,
          isClicked:
            1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        },
      };
    },
    U = function (e) {
      return {type: T, payload: {page: e}};
    },
    Z = function () {
      return {type: I};
    },
    X = function () {
      return {type: P};
    },
    K = function () {
      return {type: B};
    },
    J = function () {
      return {type: H};
    },
    Q = function (e) {
      return {type: W, payload: z(z({}, e), {}, {timestamp: Date.now()})};
    },
    $ = function (e, t) {
      return {type: F, payload: {label: e, sendContext: t}};
    },
    ee = [
      "cigar",
      "rebut",
      "sissy",
      "humph",
      "awake",
      "blush",
      "focal",
      "evade",
      "naval",
      "serve",
      "heath",
      "dwarf",
      "model",
      "karma",
      "stink",
      "grade",
      "quiet",
      "bench",
      "abate",
      "feign",
      "major",
      "death",
      "fresh",
      "crust",
      "stool",
      "colon",
      "abase",
      "marry",
      "react",
      "batty",
      "pride",
      "floss",
      "helix",
      "croak",
      "staff",
      "paper",
      "unfed",
      "whelp",
      "trawl",
      "outdo",
      "adobe",
      "crazy",
      "sower",
      "repay",
      "digit",
      "crate",
      "cluck",
      "spike",
      "mimic",
      "pound",
      "maxim",
      "linen",
      "unmet",
      "flesh",
      "booby",
      "forth",
      "first",
      "stand",
      "belly",
      "ivory",
      "seedy",
      "print",
      "yearn",
      "drain",
      "bribe",
      "stout",
      "panel",
      "crass",
      "flume",
      "offal",
      "agree",
      "error",
      "swirl",
      "argue",
      "bleed",
      "delta",
      "flick",
      "totem",
      "wooer",
      "front",
      "shrub",
      "parry",
      "biome",
      "lapel",
      "start",
      "greet",
      "goner",
      "golem",
      "lusty",
      "loopy",
      "round",
      "audit",
      "lying",
      "gamma",
      "labor",
      "islet",
      "civic",
      "forge",
      "corny",
      "moult",
      "basic",
      "salad",
      "agate",
      "spicy",
      "spray",
      "essay",
      "fjord",
      "spend",
      "kebab",
      "guild",
      "aback",
      "motor",
      "alone",
      "hatch",
      "hyper",
      "thumb",
      "dowry",
      "ought",
      "belch",
      "dutch",
      "pilot",
      "tweed",
      "comet",
      "jaunt",
      "enema",
      "steed",
      "abyss",
      "growl",
      "fling",
      "dozen",
      "boozy",
      "erode",
      "world",
      "gouge",
      "click",
      "briar",
      "great",
      "altar",
      "pulpy",
      "blurt",
      "coast",
      "duchy",
      "groin",
      "fixer",
      "group",
      "rogue",
      "badly",
      "smart",
      "pithy",
      "gaudy",
      "chill",
      "heron",
      "vodka",
      "finer",
      "surer",
      "radio",
      "rouge",
      "perch",
      "retch",
      "wrote",
      "clock",
      "tilde",
      "store",
      "prove",
      "bring",
      "solve",
      "cheat",
      "grime",
      "exult",
      "usher",
      "epoch",
      "triad",
      "break",
      "rhino",
      "viral",
      "conic",
      "masse",
      "sonic",
      "vital",
      "trace",
      "using",
      "peach",
      "champ",
      "baton",
      "brake",
      "pluck",
      "craze",
      "gripe",
      "weary",
      "picky",
      "acute",
      "ferry",
      "aside",
      "tapir",
      "troll",
      "unify",
      "rebus",
      "boost",
      "truss",
      "siege",
      "tiger",
      "banal",
      "slump",
      "crank",
      "gorge",
      "query",
      "drink",
      "favor",
      "abbey",
      "tangy",
      "panic",
      "solar",
      "shire",
      "proxy",
      "point",
      "robot",
      "prick",
      "wince",
      "crimp",
      "knoll",
      "sugar",
      "whack",
      "mount",
      "perky",
      "could",
      "wrung",
      "light",
      "those",
      "moist",
      "shard",
      "pleat",
      "aloft",
      "skill",
      "elder",
      "frame",
      "humor",
      "pause",
      "ulcer",
      "ultra",
      "robin",
      "cynic",
      "aroma",
      "caulk",
      "shake",
      "dodge",
      "swill",
      "tacit",
      "other",
      "thorn",
      "trove",
      "bloke",
      "vivid",
      "spill",
      "chant",
      "choke",
      "rupee",
      "nasty",
      "mourn",
      "ahead",
      "brine",
      "cloth",
      "hoard",
      "sweet",
      "month",
      "lapse",
      "watch",
      "today",
      "focus",
      "smelt",
      "tease",
      "cater",
      "movie",
      "saute",
      "allow",
      "renew",
      "their",
      "slosh",
      "purge",
      "chest",
      "depot",
      "epoxy",
      "nymph",
      "found",
      "shall",
      "stove",
      "lowly",
      "snout",
      "trope",
      "fewer",
      "shawl",
      "natal",
      "comma",
      "foray",
      "scare",
      "stair",
      "black",
      "squad",
      "royal",
      "chunk",
      "mince",
      "shame",
      "cheek",
      "ample",
      "flair",
      "foyer",
      "cargo",
      "oxide",
      "plant",
      "olive",
      "inert",
      "askew",
      "heist",
      "shown",
      "zesty",
      "trash",
      "larva",
      "forgo",
      "story",
      "hairy",
      "train",
      "homer",
      "badge",
      "midst",
      "canny",
      "shine",
      "gecko",
      "farce",
      "slung",
      "tipsy",
      "metal",
      "yield",
      "delve",
      "being",
      "scour",
      "glass",
      "gamer",
      "scrap",
      "money",
      "hinge",
      "album",
      "vouch",
      "asset",
      "tiara",
      "crept",
      "bayou",
      "atoll",
      "manor",
      "creak",
      "showy",
      "phase",
      "froth",
      "depth",
      "gloom",
      "flood",
      "trait",
      "girth",
      "piety",
      "goose",
      "float",
      "donor",
      "atone",
      "primo",
      "apron",
      "blown",
      "cacao",
      "loser",
      "input",
      "gloat",
      "awful",
      "brink",
      "smite",
      "beady",
      "rusty",
      "retro",
      "droll",
      "gawky",
      "hutch",
      "pinto",
      "egret",
      "lilac",
      "sever",
      "field",
      "fluff",
      "agape",
      "voice",
      "stead",
      "berth",
      "madam",
      "night",
      "bland",
      "liver",
      "wedge",
      "roomy",
      "wacky",
      "flock",
      "angry",
      "trite",
      "aphid",
      "tryst",
      "midge",
      "power",
      "elope",
      "cinch",
      "motto",
      "stomp",
      "upset",
      "bluff",
      "cramp",
      "quart",
      "coyly",
      "youth",
      "rhyme",
      "buggy",
      "alien",
      "smear",
      "unfit",
      "patty",
      "cling",
      "glean",
      "label",
      "hunky",
      "khaki",
      "poker",
      "gruel",
      "twice",
      "twang",
      "shrug",
      "treat",
      "waste",
      "merit",
      "woven",
      "needy",
      "clown",
      "irony",
      "ruder",
      "gauze",
      "chief",
      "onset",
      "prize",
      "fungi",
      "charm",
      "gully",
      "inter",
      "whoop",
      "taunt",
      "leery",
      "class",
      "theme",
      "lofty",
      "tibia",
      "booze",
      "alpha",
      "thyme",
      "doubt",
      "parer",
      "chute",
      "stick",
      "trice",
      "alike",
      "recap",
      "saint",
      "glory",
      "grate",
      "admit",
      "brisk",
      "soggy",
      "usurp",
      "scald",
      "scorn",
      "leave",
      "twine",
      "sting",
      "bough",
      "marsh",
      "sloth",
      "dandy",
      "vigor",
      "howdy",
      "enjoy",
      "valid",
      "ionic",
      "equal",
      "floor",
      "catch",
      "spade",
      "stein",
      "exist",
      "quirk",
      "denim",
      "grove",
      "spiel",
      "mummy",
      "fault",
      "foggy",
      "flout",
      "carry",
      "sneak",
      "libel",
      "waltz",
      "aptly",
      "piney",
      "inept",
      "aloud",
      "photo",
      "dream",
      "stale",
      "unite",
      "snarl",
      "baker",
      "there",
      "glyph",
      "pooch",
      "hippy",
      "spell",
      "folly",
      "louse",
      "gulch",
      "vault",
      "godly",
      "threw",
      "fleet",
      "grave",
      "inane",
      "shock",
      "crave",
      "spite",
      "valve",
      "skimp",
      "claim",
      "rainy",
      "musty",
      "pique",
      "daddy",
      "quasi",
      "arise",
      "aging",
      "valet",
      "opium",
      "avert",
      "stuck",
      "recut",
      "mulch",
      "genre",
      "plume",
      "rifle",
      "count",
      "incur",
      "total",
      "wrest",
      "mocha",
      "deter",
      "study",
      "lover",
      "safer",
      "rivet",
      "funny",
      "smoke",
      "mound",
      "undue",
      "sedan",
      "pagan",
      "swine",
      "guile",
      "gusty",
      "equip",
      "tough",
      "canoe",
      "chaos",
      "covet",
      "human",
      "udder",
      "lunch",
      "blast",
      "stray",
      "manga",
      "melee",
      "lefty",
      "quick",
      "paste",
      "given",
      "octet",
      "risen",
      "groan",
      "leaky",
      "grind",
      "carve",
      "loose",
      "sadly",
      "spilt",
      "apple",
      "slack",
      "honey",
      "final",
      "sheen",
      "eerie",
      "minty",
      "slick",
      "derby",
      "wharf",
      "spelt",
      "coach",
      "erupt",
      "singe",
      "price",
      "spawn",
      "fairy",
      "jiffy",
      "filmy",
      "stack",
      "chose",
      "sleep",
      "ardor",
      "nanny",
      "niece",
      "woozy",
      "handy",
      "grace",
      "ditto",
      "stank",
      "cream",
      "usual",
      "diode",
      "valor",
      "angle",
      "ninja",
      "muddy",
      "chase",
      "reply",
      "prone",
      "spoil",
      "heart",
      "shade",
      "diner",
      "arson",
      "onion",
      "sleet",
      "dowel",
      "couch",
      "palsy",
      "bowel",
      "smile",
      "evoke",
      "creek",
      "lance",
      "eagle",
      "idiot",
      "siren",
      "built",
      "embed",
      "award",
      "dross",
      "annul",
      "goody",
      "frown",
      "patio",
      "laden",
      "humid",
      "elite",
      "lymph",
      "edify",
      "might",
      "reset",
      "visit",
      "gusto",
      "purse",
      "vapor",
      "crock",
      "write",
      "sunny",
      "loath",
      "chaff",
      "slide",
      "queer",
      "venom",
      "stamp",
      "sorry",
      "still",
      "acorn",
      "aping",
      "pushy",
      "tamer",
      "hater",
      "mania",
      "awoke",
      "brawn",
      "swift",
      "exile",
      "birch",
      "lucky",
      "freer",
      "risky",
      "ghost",
      "plier",
      "lunar",
      "winch",
      "snare",
      "nurse",
      "house",
      "borax",
      "nicer",
      "lurch",
      "exalt",
      "about",
      "savvy",
      "toxin",
      "tunic",
      "pried",
      "inlay",
      "chump",
      "lanky",
      "cress",
      "eater",
      "elude",
      "cycle",
      "kitty",
      "boule",
      "moron",
      "tenet",
      "place",
      "lobby",
      "plush",
      "vigil",
      "index",
      "blink",
      "clung",
      "qualm",
      "croup",
      "clink",
      "juicy",
      "stage",
      "decay",
      "nerve",
      "flier",
      "shaft",
      "crook",
      "clean",
      "china",
      "ridge",
      "vowel",
      "gnome",
      "snuck",
      "icing",
      "spiny",
      "rigor",
      "snail",
      "flown",
      "rabid",
      "prose",
      "thank",
      "poppy",
      "budge",
      "fiber",
      "moldy",
      "dowdy",
      "kneel",
      "track",
      "caddy",
      "quell",
      "dumpy",
      "paler",
      "swore",
      "rebar",
      "scuba",
      "splat",
      "flyer",
      "horny",
      "mason",
      "doing",
      "ozone",
      "amply",
      "molar",
      "ovary",
      "beset",
      "queue",
      "cliff",
      "magic",
      "truce",
      "sport",
      "fritz",
      "edict",
      "twirl",
      "verse",
      "llama",
      "eaten",
      "range",
      "whisk",
      "hovel",
      "rehab",
      "macaw",
      "sigma",
      "spout",
      "verve",
      "sushi",
      "dying",
      "fetid",
      "brain",
      "buddy",
      "thump",
      "scion",
      "candy",
      "chord",
      "basin",
      "march",
      "crowd",
      "arbor",
      "gayly",
      "musky",
      "stain",
      "dally",
      "bless",
      "bravo",
      "stung",
      "title",
      "ruler",
      "kiosk",
      "blond",
      "ennui",
      "layer",
      "fluid",
      "tatty",
      "score",
      "cutie",
      "zebra",
      "barge",
      "matey",
      "bluer",
      "aider",
      "shook",
      "river",
      "privy",
      "betel",
      "frisk",
      "bongo",
      "begun",
      "azure",
      "weave",
      "genie",
      "sound",
      "glove",
      "braid",
      "scope",
      "wryly",
      "rover",
      "assay",
      "ocean",
      "bloom",
      "irate",
      "later",
      "woken",
      "silky",
      "wreck",
      "dwelt",
      "slate",
      "smack",
      "solid",
      "amaze",
      "hazel",
      "wrist",
      "jolly",
      "globe",
      "flint",
      "rouse",
      "civil",
      "vista",
      "relax",
      "cover",
      "alive",
      "beech",
      "jetty",
      "bliss",
      "vocal",
      "often",
      "dolly",
      "eight",
      "joker",
      "since",
      "event",
      "ensue",
      "shunt",
      "diver",
      "poser",
      "worst",
      "sweep",
      "alley",
      "creed",
      "anime",
      "leafy",
      "bosom",
      "dunce",
      "stare",
      "pudgy",
      "waive",
      "choir",
      "stood",
      "spoke",
      "outgo",
      "delay",
      "bilge",
      "ideal",
      "clasp",
      "seize",
      "hotly",
      "laugh",
      "sieve",
      "block",
      "meant",
      "grape",
      "noose",
      "hardy",
      "shied",
      "drawl",
      "daisy",
      "putty",
      "strut",
      "burnt",
      "tulip",
      "crick",
      "idyll",
      "vixen",
      "furor",
      "geeky",
      "cough",
      "naive",
      "shoal",
      "stork",
      "bathe",
      "aunty",
      "check",
      "prime",
      "brass",
      "outer",
      "furry",
      "razor",
      "elect",
      "evict",
      "imply",
      "demur",
      "quota",
      "haven",
      "cavil",
      "swear",
      "crump",
      "dough",
      "gavel",
      "wagon",
      "salon",
      "nudge",
      "harem",
      "pitch",
      "sworn",
      "pupil",
      "excel",
      "stony",
      "cabin",
      "unzip",
      "queen",
      "trout",
      "polyp",
      "earth",
      "storm",
      "until",
      "taper",
      "enter",
      "child",
      "adopt",
      "minor",
      "fatty",
      "husky",
      "brave",
      "filet",
      "slime",
      "glint",
      "tread",
      "steal",
      "regal",
      "guest",
      "every",
      "murky",
      "share",
      "spore",
      "hoist",
      "buxom",
      "inner",
      "otter",
      "dimly",
      "level",
      "sumac",
      "donut",
      "stilt",
      "arena",
      "sheet",
      "scrub",
      "fancy",
      "slimy",
      "pearl",
      "silly",
      "porch",
      "dingo",
      "sepia",
      "amble",
      "shady",
      "bread",
      "friar",
      "reign",
      "dairy",
      "quill",
      "cross",
      "brood",
      "tuber",
      "shear",
      "posit",
      "blank",
      "villa",
      "shank",
      "piggy",
      "freak",
      "which",
      "among",
      "fecal",
      "shell",
      "would",
      "algae",
      "large",
      "rabbi",
      "agony",
      "amuse",
      "bushy",
      "copse",
      "swoon",
      "knife",
      "pouch",
      "ascot",
      "plane",
      "crown",
      "urban",
      "snide",
      "relay",
      "abide",
      "viola",
      "rajah",
      "straw",
      "dilly",
      "crash",
      "amass",
      "third",
      "trick",
      "tutor",
      "woody",
      "blurb",
      "grief",
      "disco",
      "where",
      "sassy",
      "beach",
      "sauna",
      "comic",
      "clued",
      "creep",
      "caste",
      "graze",
      "snuff",
      "frock",
      "gonad",
      "drunk",
      "prong",
      "lurid",
      "steel",
      "halve",
      "buyer",
      "vinyl",
      "utile",
      "smell",
      "adage",
      "worry",
      "tasty",
      "local",
      "trade",
      "finch",
      "ashen",
      "modal",
      "gaunt",
      "clove",
      "enact",
      "adorn",
      "roast",
      "speck",
      "sheik",
      "missy",
      "grunt",
      "snoop",
      "party",
      "touch",
      "mafia",
      "emcee",
      "array",
      "south",
      "vapid",
      "jelly",
      "skulk",
      "angst",
      "tubal",
      "lower",
      "crest",
      "sweat",
      "cyber",
      "adore",
      "tardy",
      "swami",
      "notch",
      "groom",
      "roach",
      "hitch",
      "young",
      "align",
      "ready",
      "frond",
      "strap",
      "puree",
      "realm",
      "venue",
      "swarm",
      "offer",
      "seven",
      "dryer",
      "diary",
      "dryly",
      "drank",
      "acrid",
      "heady",
      "theta",
      "junto",
      "pixie",
      "quoth",
      "bonus",
      "shalt",
      "penne",
      "amend",
      "datum",
      "build",
      "piano",
      "shelf",
      "lodge",
      "suing",
      "rearm",
      "coral",
      "ramen",
      "worth",
      "psalm",
      "infer",
      "overt",
      "mayor",
      "ovoid",
      "glide",
      "usage",
      "poise",
      "randy",
      "chuck",
      "prank",
      "fishy",
      "tooth",
      "ether",
      "drove",
      "idler",
      "swath",
      "stint",
      "while",
      "begat",
      "apply",
      "slang",
      "tarot",
      "radar",
      "credo",
      "aware",
      "canon",
      "shift",
      "timer",
      "bylaw",
      "serum",
      "three",
      "steak",
      "iliac",
      "shirk",
      "blunt",
      "puppy",
      "penal",
      "joist",
      "bunny",
      "shape",
      "beget",
      "wheel",
      "adept",
      "stunt",
      "stole",
      "topaz",
      "chore",
      "fluke",
      "afoot",
      "bloat",
      "bully",
      "dense",
      "caper",
      "sneer",
      "boxer",
      "jumbo",
      "lunge",
      "space",
      "avail",
      "short",
      "slurp",
      "loyal",
      "flirt",
      "pizza",
      "conch",
      "tempo",
      "droop",
      "plate",
      "bible",
      "plunk",
      "afoul",
      "savoy",
      "steep",
      "agile",
      "stake",
      "dwell",
      "knave",
      "beard",
      "arose",
      "motif",
      "smash",
      "broil",
      "glare",
      "shove",
      "baggy",
      "mammy",
      "swamp",
      "along",
      "rugby",
      "wager",
      "quack",
      "squat",
      "snaky",
      "debit",
      "mange",
      "skate",
      "ninth",
      "joust",
      "tramp",
      "spurn",
      "medal",
      "micro",
      "rebel",
      "flank",
      "learn",
      "nadir",
      "maple",
      "comfy",
      "remit",
      "gruff",
      "ester",
      "least",
      "mogul",
      "fetch",
      "cause",
      "oaken",
      "aglow",
      "meaty",
      "gaffe",
      "shyly",
      "racer",
      "prowl",
      "thief",
      "stern",
      "poesy",
      "rocky",
      "tweet",
      "waist",
      "spire",
      "grope",
      "havoc",
      "patsy",
      "truly",
      "forty",
      "deity",
      "uncle",
      "swish",
      "giver",
      "preen",
      "bevel",
      "lemur",
      "draft",
      "slope",
      "annoy",
      "lingo",
      "bleak",
      "ditty",
      "curly",
      "cedar",
      "dirge",
      "grown",
      "horde",
      "drool",
      "shuck",
      "crypt",
      "cumin",
      "stock",
      "gravy",
      "locus",
      "wider",
      "breed",
      "quite",
      "chafe",
      "cache",
      "blimp",
      "deign",
      "fiend",
      "logic",
      "cheap",
      "elide",
      "rigid",
      "false",
      "renal",
      "pence",
      "rowdy",
      "shoot",
      "blaze",
      "envoy",
      "posse",
      "brief",
      "never",
      "abort",
      "mouse",
      "mucky",
      "sulky",
      "fiery",
      "media",
      "trunk",
      "yeast",
      "clear",
      "skunk",
      "scalp",
      "bitty",
      "cider",
      "koala",
      "duvet",
      "segue",
      "creme",
      "super",
      "grill",
      "after",
      "owner",
      "ember",
      "reach",
      "nobly",
      "empty",
      "speed",
      "gipsy",
      "recur",
      "smock",
      "dread",
      "merge",
      "burst",
      "kappa",
      "amity",
      "shaky",
      "hover",
      "carol",
      "snort",
      "synod",
      "faint",
      "haunt",
      "flour",
      "chair",
      "detox",
      "shrew",
      "tense",
      "plied",
      "quark",
      "burly",
      "novel",
      "waxen",
      "stoic",
      "jerky",
      "blitz",
      "beefy",
      "lyric",
      "hussy",
      "towel",
      "quilt",
      "below",
      "bingo",
      "wispy",
      "brash",
      "scone",
      "toast",
      "easel",
      "saucy",
      "value",
      "spice",
      "honor",
      "route",
      "sharp",
      "bawdy",
      "radii",
      "skull",
      "phony",
      "issue",
      "lager",
      "swell",
      "urine",
      "gassy",
      "trial",
      "flora",
      "upper",
      "latch",
      "wight",
      "brick",
      "retry",
      "holly",
      "decal",
      "grass",
      "shack",
      "dogma",
      "mover",
      "defer",
      "sober",
      "optic",
      "crier",
      "vying",
      "nomad",
      "flute",
      "hippo",
      "shark",
      "drier",
      "obese",
      "bugle",
      "tawny",
      "chalk",
      "feast",
      "ruddy",
      "pedal",
      "scarf",
      "cruel",
      "bleat",
      "tidal",
      "slush",
      "semen",
      "windy",
      "dusty",
      "sally",
      "igloo",
      "nerdy",
      "jewel",
      "shone",
      "whale",
      "hymen",
      "abuse",
      "fugue",
      "elbow",
      "crumb",
      "pansy",
      "welsh",
      "syrup",
      "terse",
      "suave",
      "gamut",
      "swung",
      "drake",
      "freed",
      "afire",
      "shirt",
      "grout",
      "oddly",
      "tithe",
      "plaid",
      "dummy",
      "broom",
      "blind",
      "torch",
      "enemy",
      "again",
      "tying",
      "pesky",
      "alter",
      "gazer",
      "noble",
      "ethos",
      "bride",
      "extol",
      "decor",
      "hobby",
      "beast",
      "idiom",
      "utter",
      "these",
      "sixth",
      "alarm",
      "erase",
      "elegy",
      "spunk",
      "piper",
      "scaly",
      "scold",
      "hefty",
      "chick",
      "sooty",
      "canal",
      "whiny",
      "slash",
      "quake",
      "joint",
      "swept",
      "prude",
      "heavy",
      "wield",
      "femme",
      "lasso",
      "maize",
      "shale",
      "screw",
      "spree",
      "smoky",
      "whiff",
      "scent",
      "glade",
      "spent",
      "prism",
      "stoke",
      "riper",
      "orbit",
      "cocoa",
      "guilt",
      "humus",
      "shush",
      "table",
      "smirk",
      "wrong",
      "noisy",
      "alert",
      "shiny",
      "elate",
      "resin",
      "whole",
      "hunch",
      "pixel",
      "polar",
      "hotel",
      "sword",
      "cleat",
      "mango",
      "rumba",
      "puffy",
      "filly",
      "billy",
      "leash",
      "clout",
      "dance",
      "ovate",
      "facet",
      "chili",
      "paint",
      "liner",
      "curio",
      "salty",
      "audio",
      "snake",
      "fable",
      "cloak",
      "navel",
      "spurt",
      "pesto",
      "balmy",
      "flash",
      "unwed",
      "early",
      "churn",
      "weedy",
      "stump",
      "lease",
      "witty",
      "wimpy",
      "spoof",
      "saner",
      "blend",
      "salsa",
      "thick",
      "warty",
      "manic",
      "blare",
      "squib",
      "spoon",
      "probe",
      "crepe",
      "knack",
      "force",
      "debut",
      "order",
      "haste",
      "teeth",
      "agent",
      "widen",
      "icily",
      "slice",
      "ingot",
      "clash",
      "juror",
      "blood",
      "abode",
      "throw",
      "unity",
      "pivot",
      "slept",
      "troop",
      "spare",
      "sewer",
      "parse",
      "morph",
      "cacti",
      "tacky",
      "spool",
      "demon",
      "moody",
      "annex",
      "begin",
      "fuzzy",
      "patch",
      "water",
      "lumpy",
      "admin",
      "omega",
      "limit",
      "tabby",
      "macho",
      "aisle",
      "skiff",
      "basis",
      "plank",
      "verge",
      "botch",
      "crawl",
      "lousy",
      "slain",
      "cubic",
      "raise",
      "wrack",
      "guide",
      "foist",
      "cameo",
      "under",
      "actor",
      "revue",
      "fraud",
      "harpy",
      "scoop",
      "climb",
      "refer",
      "olden",
      "clerk",
      "debar",
      "tally",
      "ethic",
      "cairn",
      "tulle",
      "ghoul",
      "hilly",
      "crude",
      "apart",
      "scale",
      "older",
      "plain",
      "sperm",
      "briny",
      "abbot",
      "rerun",
      "quest",
      "crisp",
      "bound",
      "befit",
      "drawn",
      "suite",
      "itchy",
      "cheer",
      "bagel",
      "guess",
      "broad",
      "axiom",
      "chard",
      "caput",
      "leant",
      "harsh",
      "curse",
      "proud",
      "swing",
      "opine",
      "taste",
      "lupus",
      "gumbo",
      "miner",
      "green",
      "chasm",
      "lipid",
      "topic",
      "armor",
      "brush",
      "crane",
      "mural",
      "abled",
      "habit",
      "bossy",
      "maker",
      "dusky",
      "dizzy",
      "lithe",
      "brook",
      "jazzy",
      "fifty",
      "sense",
      "giant",
      "surly",
      "legal",
      "fatal",
      "flunk",
      "began",
      "prune",
      "small",
      "slant",
      "scoff",
      "torus",
      "ninny",
      "covey",
      "viper",
      "taken",
      "moral",
      "vogue",
      "owing",
      "token",
      "entry",
      "booth",
      "voter",
      "chide",
      "elfin",
      "ebony",
      "neigh",
      "minim",
      "melon",
      "kneed",
      "decoy",
      "voila",
      "ankle",
      "arrow",
      "mushy",
      "tribe",
      "cease",
      "eager",
      "birth",
      "graph",
      "odder",
      "terra",
      "weird",
      "tried",
      "clack",
      "color",
      "rough",
      "weigh",
      "uncut",
      "ladle",
      "strip",
      "craft",
      "minus",
      "dicey",
      "titan",
      "lucid",
      "vicar",
      "dress",
      "ditch",
      "gypsy",
      "pasta",
      "taffy",
      "flame",
      "swoop",
      "aloof",
      "sight",
      "broke",
      "teary",
      "chart",
      "sixty",
      "wordy",
      "sheer",
      "leper",
      "nosey",
      "bulge",
      "savor",
      "clamp",
      "funky",
      "foamy",
      "toxic",
      "brand",
      "plumb",
      "dingy",
      "butte",
      "drill",
      "tripe",
      "bicep",
      "tenor",
      "krill",
      "worse",
      "drama",
      "hyena",
      "think",
      "ratio",
      "cobra",
      "basil",
      "scrum",
      "bused",
      "phone",
      "court",
      "camel",
      "proof",
      "heard",
      "angel",
      "petal",
      "pouty",
      "throb",
      "maybe",
      "fetal",
      "sprig",
      "spine",
      "shout",
      "cadet",
      "macro",
      "dodgy",
      "satyr",
      "rarer",
      "binge",
      "trend",
      "nutty",
      "leapt",
      "amiss",
      "split",
      "myrrh",
      "width",
      "sonar",
      "tower",
      "baron",
      "fever",
      "waver",
      "spark",
      "belie",
      "sloop",
      "expel",
      "smote",
      "baler",
      "above",
      "north",
      "wafer",
      "scant",
      "frill",
      "awash",
      "snack",
      "scowl",
      "frail",
      "drift",
      "limbo",
      "fence",
      "motel",
      "ounce",
      "wreak",
      "revel",
      "talon",
      "prior",
      "knelt",
      "cello",
      "flake",
      "debug",
      "anode",
      "crime",
      "salve",
      "scout",
      "imbue",
      "pinky",
      "stave",
      "vague",
      "chock",
      "fight",
      "video",
      "stone",
      "teach",
      "cleft",
      "frost",
      "prawn",
      "booty",
      "twist",
      "apnea",
      "stiff",
      "plaza",
      "ledge",
      "tweak",
      "board",
      "grant",
      "medic",
      "bacon",
      "cable",
      "brawl",
      "slunk",
      "raspy",
      "forum",
      "drone",
      "women",
      "mucus",
      "boast",
      "toddy",
      "coven",
      "tumor",
      "truer",
      "wrath",
      "stall",
      "steam",
      "axial",
      "purer",
      "daily",
      "trail",
      "niche",
      "mealy",
      "juice",
      "nylon",
      "plump",
      "merry",
      "flail",
      "papal",
      "wheat",
      "berry",
      "cower",
      "erect",
      "brute",
      "leggy",
      "snipe",
      "sinew",
      "skier",
      "penny",
      "jumpy",
      "rally",
      "umbra",
      "scary",
      "modem",
      "gross",
      "avian",
      "greed",
      "satin",
      "tonic",
      "parka",
      "sniff",
      "livid",
      "stark",
      "trump",
      "giddy",
      "reuse",
      "taboo",
      "avoid",
      "quote",
      "devil",
      "liken",
      "gloss",
      "gayer",
      "beret",
      "noise",
      "gland",
      "dealt",
      "sling",
      "rumor",
      "opera",
      "thigh",
      "tonga",
      "flare",
      "wound",
      "white",
      "bulky",
      "etude",
      "horse",
      "circa",
      "paddy",
      "inbox",
      "fizzy",
      "grain",
      "exert",
      "surge",
      "gleam",
      "belle",
      "salvo",
      "crush",
      "fruit",
      "sappy",
      "taker",
      "tract",
      "ovine",
      "spiky",
      "frank",
      "reedy",
      "filth",
      "spasm",
      "heave",
      "mambo",
      "right",
      "clank",
      "trust",
      "lumen",
      "borne",
      "spook",
      "sauce",
      "amber",
      "lathe",
      "carat",
      "corer",
      "dirty",
      "slyly",
      "affix",
      "alloy",
      "taint",
      "sheep",
      "kinky",
      "wooly",
      "mauve",
      "flung",
      "yacht",
      "fried",
      "quail",
      "brunt",
      "grimy",
      "curvy",
      "cagey",
      "rinse",
      "deuce",
      "state",
      "grasp",
      "milky",
      "bison",
      "graft",
      "sandy",
      "baste",
      "flask",
      "hedge",
      "girly",
      "swash",
      "boney",
      "coupe",
      "endow",
      "abhor",
      "welch",
      "blade",
      "tight",
      "geese",
      "miser",
      "mirth",
      "cloud",
      "cabal",
      "leech",
      "close",
      "tenth",
      "pecan",
      "droit",
      "grail",
      "clone",
      "guise",
      "ralph",
      "tango",
      "biddy",
      "smith",
      "mower",
      "payee",
      "serif",
      "drape",
      "fifth",
      "spank",
      "glaze",
      "allot",
      "truck",
      "kayak",
      "virus",
      "testy",
      "tepee",
      "fully",
      "zonal",
      "metro",
      "curry",
      "grand",
      "banjo",
      "axion",
      "bezel",
      "occur",
      "chain",
      "nasal",
      "gooey",
      "filer",
      "brace",
      "allay",
      "pubic",
      "raven",
      "plead",
      "gnash",
      "flaky",
      "munch",
      "dully",
      "eking",
      "thing",
      "slink",
      "hurry",
      "theft",
      "shorn",
      "pygmy",
      "ranch",
      "wring",
      "lemon",
      "shore",
      "mamma",
      "froze",
      "newer",
      "style",
      "moose",
      "antic",
      "drown",
      "vegan",
      "chess",
      "guppy",
      "union",
      "lever",
      "lorry",
      "image",
      "cabby",
      "druid",
      "exact",
      "truth",
      "dopey",
      "spear",
      "cried",
      "chime",
      "crony",
      "stunk",
      "timid",
      "batch",
      "gauge",
      "rotor",
      "crack",
      "curve",
      "latte",
      "witch",
      "bunch",
      "repel",
      "anvil",
      "soapy",
      "meter",
      "broth",
      "madly",
      "dried",
      "scene",
      "known",
      "magma",
      "roost",
      "woman",
      "thong",
      "punch",
      "pasty",
      "downy",
      "knead",
      "whirl",
      "rapid",
      "clang",
      "anger",
      "drive",
      "goofy",
      "email",
      "music",
      "stuff",
      "bleep",
      "rider",
      "mecca",
      "folio",
      "setup",
      "verso",
      "quash",
      "fauna",
      "gummy",
      "happy",
      "newly",
      "fussy",
      "relic",
      "guava",
      "ratty",
      "fudge",
      "femur",
      "chirp",
      "forte",
      "alibi",
      "whine",
      "petty",
      "golly",
      "plait",
      "fleck",
      "felon",
      "gourd",
      "brown",
      "thrum",
      "ficus",
      "stash",
      "decry",
      "wiser",
      "junta",
      "visor",
      "daunt",
      "scree",
      "impel",
      "await",
      "press",
      "whose",
      "turbo",
      "stoop",
      "speak",
      "mangy",
      "eying",
      "inlet",
      "crone",
      "pulse",
      "mossy",
      "staid",
      "hence",
      "pinch",
      "teddy",
      "sully",
      "snore",
      "ripen",
      "snowy",
      "attic",
      "going",
      "leach",
      "mouth",
      "hound",
      "clump",
      "tonal",
      "bigot",
      "peril",
      "piece",
      "blame",
      "haute",
      "spied",
      "undid",
      "intro",
      "basal",
      "rodeo",
      "guard",
      "steer",
      "loamy",
      "scamp",
      "scram",
      "manly",
      "hello",
      "vaunt",
      "organ",
      "feral",
      "knock",
      "extra",
      "condo",
      "adapt",
      "willy",
      "polka",
      "rayon",
      "skirt",
      "faith",
      "torso",
      "match",
      "mercy",
      "tepid",
      "sleek",
      "riser",
      "twixt",
      "peace",
      "flush",
      "catty",
      "login",
      "eject",
      "roger",
      "rival",
      "untie",
      "refit",
      "aorta",
      "adult",
      "judge",
      "rower",
      "artsy",
      "rural",
      "shave",
      "bobby",
      "eclat",
      "fella",
      "gaily",
      "harry",
      "hasty",
      "hydro",
      "liege",
      "octal",
      "ombre",
      "payer",
      "sooth",
      "unset",
      "unlit",
      "vomit",
      "fanny",
      "fetus",
      "butch",
      "stalk",
      "flack",
      "widow",
      "augur",
    ],
    te = [
      "aahed",
      "aalii",
      "aargh",
      "aarti",
      "abaca",
      "abaci",
      "abacs",
      "abaft",
      "abaka",
      "abamp",
      "aband",
      "abash",
      "abask",
      "abaya",
      "abbas",
      "abbed",
      "abbes",
      "abcee",
      "abeam",
      "abear",
      "abele",
      "abers",
      "abets",
      "abies",
      "abler",
      "ables",
      "ablet",
      "ablow",
      "abmho",
      "abohm",
      "aboil",
      "aboma",
      "aboon",
      "abord",
      "abore",
      "abram",
      "abray",
      "abrim",
      "abrin",
      "abris",
      "absey",
      "absit",
      "abuna",
      "abune",
      "abuts",
      "abuzz",
      "abyes",
      "abysm",
      "acais",
      "acari",
      "accas",
      "accoy",
      "acerb",
      "acers",
      "aceta",
      "achar",
      "ached",
      "aches",
      "achoo",
      "acids",
      "acidy",
      "acing",
      "acini",
      "ackee",
      "acker",
      "acmes",
      "acmic",
      "acned",
      "acnes",
      "acock",
      "acold",
      "acred",
      "acres",
      "acros",
      "acted",
      "actin",
      "acton",
      "acyls",
      "adaws",
      "adays",
      "adbot",
      "addax",
      "added",
      "adder",
      "addio",
      "addle",
      "adeem",
      "adhan",
      "adieu",
      "adios",
      "adits",
      "adman",
      "admen",
      "admix",
      "adobo",
      "adown",
      "adoze",
      "adrad",
      "adred",
      "adsum",
      "aduki",
      "adunc",
      "adust",
      "advew",
      "adyta",
      "adzed",
      "adzes",
      "aecia",
      "aedes",
      "aegis",
      "aeons",
      "aerie",
      "aeros",
      "aesir",
      "afald",
      "afara",
      "afars",
      "afear",
      "aflaj",
      "afore",
      "afrit",
      "afros",
      "agama",
      "agami",
      "agars",
      "agast",
      "agave",
      "agaze",
      "agene",
      "agers",
      "agger",
      "aggie",
      "aggri",
      "aggro",
      "aggry",
      "aghas",
      "agila",
      "agios",
      "agism",
      "agist",
      "agita",
      "aglee",
      "aglet",
      "agley",
      "agloo",
      "aglus",
      "agmas",
      "agoge",
      "agone",
      "agons",
      "agood",
      "agora",
      "agria",
      "agrin",
      "agros",
      "agued",
      "agues",
      "aguna",
      "aguti",
      "aheap",
      "ahent",
      "ahigh",
      "ahind",
      "ahing",
      "ahint",
      "ahold",
      "ahull",
      "ahuru",
      "aidas",
      "aided",
      "aides",
      "aidoi",
      "aidos",
      "aiery",
      "aigas",
      "aight",
      "ailed",
      "aimed",
      "aimer",
      "ainee",
      "ainga",
      "aioli",
      "aired",
      "airer",
      "airns",
      "airth",
      "airts",
      "aitch",
      "aitus",
      "aiver",
      "aiyee",
      "aizle",
      "ajies",
      "ajiva",
      "ajuga",
      "ajwan",
      "akees",
      "akela",
      "akene",
      "aking",
      "akita",
      "akkas",
      "alaap",
      "alack",
      "alamo",
      "aland",
      "alane",
      "alang",
      "alans",
      "alant",
      "alapa",
      "alaps",
      "alary",
      "alate",
      "alays",
      "albas",
      "albee",
      "alcid",
      "alcos",
      "aldea",
      "alder",
      "aldol",
      "aleck",
      "alecs",
      "alefs",
      "aleft",
      "aleph",
      "alews",
      "aleye",
      "alfas",
      "algal",
      "algas",
      "algid",
      "algin",
      "algor",
      "algum",
      "alias",
      "alifs",
      "aline",
      "alist",
      "aliya",
      "alkie",
      "alkos",
      "alkyd",
      "alkyl",
      "allee",
      "allel",
      "allis",
      "allod",
      "allyl",
      "almah",
      "almas",
      "almeh",
      "almes",
      "almud",
      "almug",
      "alods",
      "aloed",
      "aloes",
      "aloha",
      "aloin",
      "aloos",
      "alowe",
      "altho",
      "altos",
      "alula",
      "alums",
      "alure",
      "alvar",
      "alway",
      "amahs",
      "amain",
      "amate",
      "amaut",
      "amban",
      "ambit",
      "ambos",
      "ambry",
      "ameba",
      "ameer",
      "amene",
      "amens",
      "ament",
      "amias",
      "amice",
      "amici",
      "amide",
      "amido",
      "amids",
      "amies",
      "amiga",
      "amigo",
      "amine",
      "amino",
      "amins",
      "amirs",
      "amlas",
      "amman",
      "ammon",
      "ammos",
      "amnia",
      "amnic",
      "amnio",
      "amoks",
      "amole",
      "amort",
      "amour",
      "amove",
      "amowt",
      "amped",
      "ampul",
      "amrit",
      "amuck",
      "amyls",
      "anana",
      "anata",
      "ancho",
      "ancle",
      "ancon",
      "andro",
      "anear",
      "anele",
      "anent",
      "angas",
      "anglo",
      "anigh",
      "anile",
      "anils",
      "anima",
      "animi",
      "anion",
      "anise",
      "anker",
      "ankhs",
      "ankus",
      "anlas",
      "annal",
      "annas",
      "annat",
      "anoas",
      "anole",
      "anomy",
      "ansae",
      "antae",
      "antar",
      "antas",
      "anted",
      "antes",
      "antis",
      "antra",
      "antre",
      "antsy",
      "anura",
      "anyon",
      "apace",
      "apage",
      "apaid",
      "apayd",
      "apays",
      "apeak",
      "apeek",
      "apers",
      "apert",
      "apery",
      "apgar",
      "aphis",
      "apian",
      "apiol",
      "apish",
      "apism",
      "apode",
      "apods",
      "apoop",
      "aport",
      "appal",
      "appay",
      "appel",
      "appro",
      "appui",
      "appuy",
      "apres",
      "apses",
      "apsis",
      "apsos",
      "apted",
      "apter",
      "aquae",
      "aquas",
      "araba",
      "araks",
      "arame",
      "arars",
      "arbas",
      "arced",
      "archi",
      "arcos",
      "arcus",
      "ardeb",
      "ardri",
      "aread",
      "areae",
      "areal",
      "arear",
      "areas",
      "areca",
      "aredd",
      "arede",
      "arefy",
      "areic",
      "arene",
      "arepa",
      "arere",
      "arete",
      "arets",
      "arett",
      "argal",
      "argan",
      "argil",
      "argle",
      "argol",
      "argon",
      "argot",
      "argus",
      "arhat",
      "arias",
      "ariel",
      "ariki",
      "arils",
      "ariot",
      "arish",
      "arked",
      "arled",
      "arles",
      "armed",
      "armer",
      "armet",
      "armil",
      "arnas",
      "arnut",
      "aroba",
      "aroha",
      "aroid",
      "arpas",
      "arpen",
      "arrah",
      "arras",
      "arret",
      "arris",
      "arroz",
      "arsed",
      "arses",
      "arsey",
      "arsis",
      "artal",
      "artel",
      "artic",
      "artis",
      "aruhe",
      "arums",
      "arval",
      "arvee",
      "arvos",
      "aryls",
      "asana",
      "ascon",
      "ascus",
      "asdic",
      "ashed",
      "ashes",
      "ashet",
      "asked",
      "asker",
      "askoi",
      "askos",
      "aspen",
      "asper",
      "aspic",
      "aspie",
      "aspis",
      "aspro",
      "assai",
      "assam",
      "asses",
      "assez",
      "assot",
      "aster",
      "astir",
      "astun",
      "asura",
      "asway",
      "aswim",
      "asyla",
      "ataps",
      "ataxy",
      "atigi",
      "atilt",
      "atimy",
      "atlas",
      "atman",
      "atmas",
      "atmos",
      "atocs",
      "atoke",
      "atoks",
      "atoms",
      "atomy",
      "atony",
      "atopy",
      "atria",
      "atrip",
      "attap",
      "attar",
      "atuas",
      "audad",
      "auger",
      "aught",
      "aulas",
      "aulic",
      "auloi",
      "aulos",
      "aumil",
      "aunes",
      "aunts",
      "aurae",
      "aural",
      "aurar",
      "auras",
      "aurei",
      "aures",
      "auric",
      "auris",
      "aurum",
      "autos",
      "auxin",
      "avale",
      "avant",
      "avast",
      "avels",
      "avens",
      "avers",
      "avgas",
      "avine",
      "avion",
      "avise",
      "aviso",
      "avize",
      "avows",
      "avyze",
      "awarn",
      "awato",
      "awave",
      "aways",
      "awdls",
      "aweel",
      "aweto",
      "awing",
      "awmry",
      "awned",
      "awner",
      "awols",
      "awork",
      "axels",
      "axile",
      "axils",
      "axing",
      "axite",
      "axled",
      "axles",
      "axman",
      "axmen",
      "axoid",
      "axone",
      "axons",
      "ayahs",
      "ayaya",
      "ayelp",
      "aygre",
      "ayins",
      "ayont",
      "ayres",
      "ayrie",
      "azans",
      "azide",
      "azido",
      "azine",
      "azlon",
      "azoic",
      "azole",
      "azons",
      "azote",
      "azoth",
      "azuki",
      "azurn",
      "azury",
      "azygy",
      "azyme",
      "azyms",
      "baaed",
      "baals",
      "babas",
      "babel",
      "babes",
      "babka",
      "baboo",
      "babul",
      "babus",
      "bacca",
      "bacco",
      "baccy",
      "bacha",
      "bachs",
      "backs",
      "baddy",
      "baels",
      "baffs",
      "baffy",
      "bafts",
      "baghs",
      "bagie",
      "bahts",
      "bahus",
      "bahut",
      "bails",
      "bairn",
      "baisa",
      "baith",
      "baits",
      "baiza",
      "baize",
      "bajan",
      "bajra",
      "bajri",
      "bajus",
      "baked",
      "baken",
      "bakes",
      "bakra",
      "balas",
      "balds",
      "baldy",
      "baled",
      "bales",
      "balks",
      "balky",
      "balls",
      "bally",
      "balms",
      "baloo",
      "balsa",
      "balti",
      "balun",
      "balus",
      "bambi",
      "banak",
      "banco",
      "bancs",
      "banda",
      "bandh",
      "bands",
      "bandy",
      "baned",
      "banes",
      "bangs",
      "bania",
      "banks",
      "banns",
      "bants",
      "bantu",
      "banty",
      "banya",
      "bapus",
      "barbe",
      "barbs",
      "barby",
      "barca",
      "barde",
      "bardo",
      "bards",
      "bardy",
      "bared",
      "barer",
      "bares",
      "barfi",
      "barfs",
      "baric",
      "barks",
      "barky",
      "barms",
      "barmy",
      "barns",
      "barny",
      "barps",
      "barra",
      "barre",
      "barro",
      "barry",
      "barye",
      "basan",
      "based",
      "basen",
      "baser",
      "bases",
      "basho",
      "basij",
      "basks",
      "bason",
      "basse",
      "bassi",
      "basso",
      "bassy",
      "basta",
      "basti",
      "basto",
      "basts",
      "bated",
      "bates",
      "baths",
      "batik",
      "batta",
      "batts",
      "battu",
      "bauds",
      "bauks",
      "baulk",
      "baurs",
      "bavin",
      "bawds",
      "bawks",
      "bawls",
      "bawns",
      "bawrs",
      "bawty",
      "bayed",
      "bayer",
      "bayes",
      "bayle",
      "bayts",
      "bazar",
      "bazoo",
      "beads",
      "beaks",
      "beaky",
      "beals",
      "beams",
      "beamy",
      "beano",
      "beans",
      "beany",
      "beare",
      "bears",
      "beath",
      "beats",
      "beaty",
      "beaus",
      "beaut",
      "beaux",
      "bebop",
      "becap",
      "becke",
      "becks",
      "bedad",
      "bedel",
      "bedes",
      "bedew",
      "bedim",
      "bedye",
      "beedi",
      "beefs",
      "beeps",
      "beers",
      "beery",
      "beets",
      "befog",
      "begad",
      "begar",
      "begem",
      "begot",
      "begum",
      "beige",
      "beigy",
      "beins",
      "bekah",
      "belah",
      "belar",
      "belay",
      "belee",
      "belga",
      "bells",
      "belon",
      "belts",
      "bemad",
      "bemas",
      "bemix",
      "bemud",
      "bends",
      "bendy",
      "benes",
      "benet",
      "benga",
      "benis",
      "benne",
      "benni",
      "benny",
      "bento",
      "bents",
      "benty",
      "bepat",
      "beray",
      "beres",
      "bergs",
      "berko",
      "berks",
      "berme",
      "berms",
      "berob",
      "beryl",
      "besat",
      "besaw",
      "besee",
      "beses",
      "besit",
      "besom",
      "besot",
      "besti",
      "bests",
      "betas",
      "beted",
      "betes",
      "beths",
      "betid",
      "beton",
      "betta",
      "betty",
      "bever",
      "bevor",
      "bevue",
      "bevvy",
      "bewet",
      "bewig",
      "bezes",
      "bezil",
      "bezzy",
      "bhais",
      "bhaji",
      "bhang",
      "bhats",
      "bhels",
      "bhoot",
      "bhuna",
      "bhuts",
      "biach",
      "biali",
      "bialy",
      "bibbs",
      "bibes",
      "biccy",
      "bices",
      "bided",
      "bider",
      "bides",
      "bidet",
      "bidis",
      "bidon",
      "bield",
      "biers",
      "biffo",
      "biffs",
      "biffy",
      "bifid",
      "bigae",
      "biggs",
      "biggy",
      "bigha",
      "bight",
      "bigly",
      "bigos",
      "bijou",
      "biked",
      "biker",
      "bikes",
      "bikie",
      "bilbo",
      "bilby",
      "biled",
      "biles",
      "bilgy",
      "bilks",
      "bills",
      "bimah",
      "bimas",
      "bimbo",
      "binal",
      "bindi",
      "binds",
      "biner",
      "bines",
      "bings",
      "bingy",
      "binit",
      "binks",
      "bints",
      "biogs",
      "biont",
      "biota",
      "biped",
      "bipod",
      "birds",
      "birks",
      "birle",
      "birls",
      "biros",
      "birrs",
      "birse",
      "birsy",
      "bises",
      "bisks",
      "bisom",
      "bitch",
      "biter",
      "bites",
      "bitos",
      "bitou",
      "bitsy",
      "bitte",
      "bitts",
      "bivia",
      "bivvy",
      "bizes",
      "bizzo",
      "bizzy",
      "blabs",
      "blads",
      "blady",
      "blaer",
      "blaes",
      "blaff",
      "blags",
      "blahs",
      "blain",
      "blams",
      "blart",
      "blase",
      "blash",
      "blate",
      "blats",
      "blatt",
      "blaud",
      "blawn",
      "blaws",
      "blays",
      "blear",
      "blebs",
      "blech",
      "blees",
      "blent",
      "blert",
      "blest",
      "blets",
      "bleys",
      "blimy",
      "bling",
      "blini",
      "blins",
      "bliny",
      "blips",
      "blist",
      "blite",
      "blits",
      "blive",
      "blobs",
      "blocs",
      "blogs",
      "blook",
      "bloop",
      "blore",
      "blots",
      "blows",
      "blowy",
      "blubs",
      "blude",
      "bluds",
      "bludy",
      "blued",
      "blues",
      "bluet",
      "bluey",
      "bluid",
      "blume",
      "blunk",
      "blurs",
      "blype",
      "boabs",
      "boaks",
      "boars",
      "boart",
      "boats",
      "bobac",
      "bobak",
      "bobas",
      "bobol",
      "bobos",
      "bocca",
      "bocce",
      "bocci",
      "boche",
      "bocks",
      "boded",
      "bodes",
      "bodge",
      "bodhi",
      "bodle",
      "boeps",
      "boets",
      "boeuf",
      "boffo",
      "boffs",
      "bogan",
      "bogey",
      "boggy",
      "bogie",
      "bogle",
      "bogue",
      "bogus",
      "bohea",
      "bohos",
      "boils",
      "boing",
      "boink",
      "boite",
      "boked",
      "bokeh",
      "bokes",
      "bokos",
      "bolar",
      "bolas",
      "bolds",
      "boles",
      "bolix",
      "bolls",
      "bolos",
      "bolts",
      "bolus",
      "bomas",
      "bombe",
      "bombo",
      "bombs",
      "bonce",
      "bonds",
      "boned",
      "boner",
      "bones",
      "bongs",
      "bonie",
      "bonks",
      "bonne",
      "bonny",
      "bonza",
      "bonze",
      "booai",
      "booay",
      "boobs",
      "boody",
      "booed",
      "boofy",
      "boogy",
      "boohs",
      "books",
      "booky",
      "bools",
      "booms",
      "boomy",
      "boong",
      "boons",
      "boord",
      "boors",
      "boose",
      "boots",
      "boppy",
      "borak",
      "boral",
      "boras",
      "borde",
      "bords",
      "bored",
      "boree",
      "borel",
      "borer",
      "bores",
      "borgo",
      "boric",
      "borks",
      "borms",
      "borna",
      "boron",
      "borts",
      "borty",
      "bortz",
      "bosie",
      "bosks",
      "bosky",
      "boson",
      "bosun",
      "botas",
      "botel",
      "botes",
      "bothy",
      "botte",
      "botts",
      "botty",
      "bouge",
      "bouks",
      "boult",
      "bouns",
      "bourd",
      "bourg",
      "bourn",
      "bouse",
      "bousy",
      "bouts",
      "bovid",
      "bowat",
      "bowed",
      "bower",
      "bowes",
      "bowet",
      "bowie",
      "bowls",
      "bowne",
      "bowrs",
      "bowse",
      "boxed",
      "boxen",
      "boxes",
      "boxla",
      "boxty",
      "boyar",
      "boyau",
      "boyed",
      "boyfs",
      "boygs",
      "boyla",
      "boyos",
      "boysy",
      "bozos",
      "braai",
      "brach",
      "brack",
      "bract",
      "brads",
      "braes",
      "brags",
      "brail",
      "braks",
      "braky",
      "brame",
      "brane",
      "brank",
      "brans",
      "brant",
      "brast",
      "brats",
      "brava",
      "bravi",
      "braws",
      "braxy",
      "brays",
      "braza",
      "braze",
      "bream",
      "brede",
      "breds",
      "breem",
      "breer",
      "brees",
      "breid",
      "breis",
      "breme",
      "brens",
      "brent",
      "brere",
      "brers",
      "breve",
      "brews",
      "breys",
      "brier",
      "bries",
      "brigs",
      "briki",
      "briks",
      "brill",
      "brims",
      "brins",
      "brios",
      "brise",
      "briss",
      "brith",
      "brits",
      "britt",
      "brize",
      "broch",
      "brock",
      "brods",
      "brogh",
      "brogs",
      "brome",
      "bromo",
      "bronc",
      "brond",
      "brool",
      "broos",
      "brose",
      "brosy",
      "brows",
      "brugh",
      "bruin",
      "bruit",
      "brule",
      "brume",
      "brung",
      "brusk",
      "brust",
      "bruts",
      "buats",
      "buaze",
      "bubal",
      "bubas",
      "bubba",
      "bubbe",
      "bubby",
      "bubus",
      "buchu",
      "bucko",
      "bucks",
      "bucku",
      "budas",
      "budis",
      "budos",
      "buffa",
      "buffe",
      "buffi",
      "buffo",
      "buffs",
      "buffy",
      "bufos",
      "bufty",
      "buhls",
      "buhrs",
      "buiks",
      "buist",
      "bukes",
      "bulbs",
      "bulgy",
      "bulks",
      "bulla",
      "bulls",
      "bulse",
      "bumbo",
      "bumfs",
      "bumph",
      "bumps",
      "bumpy",
      "bunas",
      "bunce",
      "bunco",
      "bunde",
      "bundh",
      "bunds",
      "bundt",
      "bundu",
      "bundy",
      "bungs",
      "bungy",
      "bunia",
      "bunje",
      "bunjy",
      "bunko",
      "bunks",
      "bunns",
      "bunts",
      "bunty",
      "bunya",
      "buoys",
      "buppy",
      "buran",
      "buras",
      "burbs",
      "burds",
      "buret",
      "burfi",
      "burgh",
      "burgs",
      "burin",
      "burka",
      "burke",
      "burks",
      "burls",
      "burns",
      "buroo",
      "burps",
      "burqa",
      "burro",
      "burrs",
      "burry",
      "bursa",
      "burse",
      "busby",
      "buses",
      "busks",
      "busky",
      "bussu",
      "busti",
      "busts",
      "busty",
      "buteo",
      "butes",
      "butle",
      "butoh",
      "butts",
      "butty",
      "butut",
      "butyl",
      "buzzy",
      "bwana",
      "bwazi",
      "byded",
      "bydes",
      "byked",
      "bykes",
      "byres",
      "byrls",
      "byssi",
      "bytes",
      "byway",
      "caaed",
      "cabas",
      "caber",
      "cabob",
      "caboc",
      "cabre",
      "cacas",
      "cacks",
      "cacky",
      "cadee",
      "cades",
      "cadge",
      "cadgy",
      "cadie",
      "cadis",
      "cadre",
      "caeca",
      "caese",
      "cafes",
      "caffs",
      "caged",
      "cager",
      "cages",
      "cagot",
      "cahow",
      "caids",
      "cains",
      "caird",
      "cajon",
      "cajun",
      "caked",
      "cakes",
      "cakey",
      "calfs",
      "calid",
      "calif",
      "calix",
      "calks",
      "calla",
      "calls",
      "calms",
      "calmy",
      "calos",
      "calpa",
      "calps",
      "calve",
      "calyx",
      "caman",
      "camas",
      "cames",
      "camis",
      "camos",
      "campi",
      "campo",
      "camps",
      "campy",
      "camus",
      "caned",
      "caneh",
      "caner",
      "canes",
      "cangs",
      "canid",
      "canna",
      "canns",
      "canso",
      "canst",
      "canto",
      "cants",
      "canty",
      "capas",
      "caped",
      "capes",
      "capex",
      "caphs",
      "capiz",
      "caple",
      "capon",
      "capos",
      "capot",
      "capri",
      "capul",
      "carap",
      "carbo",
      "carbs",
      "carby",
      "cardi",
      "cards",
      "cardy",
      "cared",
      "carer",
      "cares",
      "caret",
      "carex",
      "carks",
      "carle",
      "carls",
      "carns",
      "carny",
      "carob",
      "carom",
      "caron",
      "carpi",
      "carps",
      "carrs",
      "carse",
      "carta",
      "carte",
      "carts",
      "carvy",
      "casas",
      "casco",
      "cased",
      "cases",
      "casks",
      "casky",
      "casts",
      "casus",
      "cates",
      "cauda",
      "cauks",
      "cauld",
      "cauls",
      "caums",
      "caups",
      "cauri",
      "causa",
      "cavas",
      "caved",
      "cavel",
      "caver",
      "caves",
      "cavie",
      "cawed",
      "cawks",
      "caxon",
      "ceaze",
      "cebid",
      "cecal",
      "cecum",
      "ceded",
      "ceder",
      "cedes",
      "cedis",
      "ceiba",
      "ceili",
      "ceils",
      "celeb",
      "cella",
      "celli",
      "cells",
      "celom",
      "celts",
      "cense",
      "cento",
      "cents",
      "centu",
      "ceorl",
      "cepes",
      "cerci",
      "cered",
      "ceres",
      "cerge",
      "ceria",
      "ceric",
      "cerne",
      "ceroc",
      "ceros",
      "certs",
      "certy",
      "cesse",
      "cesta",
      "cesti",
      "cetes",
      "cetyl",
      "cezve",
      "chace",
      "chack",
      "chaco",
      "chado",
      "chads",
      "chaft",
      "chais",
      "chals",
      "chams",
      "chana",
      "chang",
      "chank",
      "chape",
      "chaps",
      "chapt",
      "chara",
      "chare",
      "chark",
      "charr",
      "chars",
      "chary",
      "chats",
      "chave",
      "chavs",
      "chawk",
      "chaws",
      "chaya",
      "chays",
      "cheep",
      "chefs",
      "cheka",
      "chela",
      "chelp",
      "chemo",
      "chems",
      "chere",
      "chert",
      "cheth",
      "chevy",
      "chews",
      "chewy",
      "chiao",
      "chias",
      "chibs",
      "chica",
      "chich",
      "chico",
      "chics",
      "chiel",
      "chiks",
      "chile",
      "chimb",
      "chimo",
      "chimp",
      "chine",
      "ching",
      "chink",
      "chino",
      "chins",
      "chips",
      "chirk",
      "chirl",
      "chirm",
      "chiro",
      "chirr",
      "chirt",
      "chiru",
      "chits",
      "chive",
      "chivs",
      "chivy",
      "chizz",
      "choco",
      "chocs",
      "chode",
      "chogs",
      "choil",
      "choko",
      "choky",
      "chola",
      "choli",
      "cholo",
      "chomp",
      "chons",
      "choof",
      "chook",
      "choom",
      "choon",
      "chops",
      "chota",
      "chott",
      "chout",
      "choux",
      "chowk",
      "chows",
      "chubs",
      "chufa",
      "chuff",
      "chugs",
      "chums",
      "churl",
      "churr",
      "chuse",
      "chuts",
      "chyle",
      "chyme",
      "chynd",
      "cibol",
      "cided",
      "cides",
      "ciels",
      "ciggy",
      "cilia",
      "cills",
      "cimar",
      "cimex",
      "cinct",
      "cines",
      "cinqs",
      "cions",
      "cippi",
      "circs",
      "cires",
      "cirls",
      "cirri",
      "cisco",
      "cissy",
      "cists",
      "cital",
      "cited",
      "citer",
      "cites",
      "cives",
      "civet",
      "civie",
      "civvy",
      "clach",
      "clade",
      "clads",
      "claes",
      "clags",
      "clame",
      "clams",
      "clans",
      "claps",
      "clapt",
      "claro",
      "clart",
      "clary",
      "clast",
      "clats",
      "claut",
      "clave",
      "clavi",
      "claws",
      "clays",
      "cleck",
      "cleek",
      "cleep",
      "clefs",
      "clegs",
      "cleik",
      "clems",
      "clepe",
      "clept",
      "cleve",
      "clews",
      "clied",
      "clies",
      "clift",
      "clime",
      "cline",
      "clint",
      "clipe",
      "clips",
      "clipt",
      "clits",
      "cloam",
      "clods",
      "cloff",
      "clogs",
      "cloke",
      "clomb",
      "clomp",
      "clonk",
      "clons",
      "cloop",
      "cloot",
      "clops",
      "clote",
      "clots",
      "clour",
      "clous",
      "clows",
      "cloye",
      "cloys",
      "cloze",
      "clubs",
      "clues",
      "cluey",
      "clunk",
      "clype",
      "cnida",
      "coact",
      "coady",
      "coala",
      "coals",
      "coaly",
      "coapt",
      "coarb",
      "coate",
      "coati",
      "coats",
      "cobbs",
      "cobby",
      "cobia",
      "coble",
      "cobza",
      "cocas",
      "cocci",
      "cocco",
      "cocks",
      "cocky",
      "cocos",
      "codas",
      "codec",
      "coded",
      "coden",
      "coder",
      "codes",
      "codex",
      "codon",
      "coeds",
      "coffs",
      "cogie",
      "cogon",
      "cogue",
      "cohab",
      "cohen",
      "cohoe",
      "cohog",
      "cohos",
      "coifs",
      "coign",
      "coils",
      "coins",
      "coirs",
      "coits",
      "coked",
      "cokes",
      "colas",
      "colby",
      "colds",
      "coled",
      "coles",
      "coley",
      "colic",
      "colin",
      "colls",
      "colly",
      "colog",
      "colts",
      "colza",
      "comae",
      "comal",
      "comas",
      "combe",
      "combi",
      "combo",
      "combs",
      "comby",
      "comer",
      "comes",
      "comix",
      "commo",
      "comms",
      "commy",
      "compo",
      "comps",
      "compt",
      "comte",
      "comus",
      "coned",
      "cones",
      "coney",
      "confs",
      "conga",
      "conge",
      "congo",
      "conia",
      "conin",
      "conks",
      "conky",
      "conne",
      "conns",
      "conte",
      "conto",
      "conus",
      "convo",
      "cooch",
      "cooed",
      "cooee",
      "cooer",
      "cooey",
      "coofs",
      "cooks",
      "cooky",
      "cools",
      "cooly",
      "coomb",
      "cooms",
      "coomy",
      "coons",
      "coops",
      "coopt",
      "coost",
      "coots",
      "cooze",
      "copal",
      "copay",
      "coped",
      "copen",
      "coper",
      "copes",
      "coppy",
      "copra",
      "copsy",
      "coqui",
      "coram",
      "corbe",
      "corby",
      "cords",
      "cored",
      "cores",
      "corey",
      "corgi",
      "coria",
      "corks",
      "corky",
      "corms",
      "corni",
      "corno",
      "corns",
      "cornu",
      "corps",
      "corse",
      "corso",
      "cosec",
      "cosed",
      "coses",
      "coset",
      "cosey",
      "cosie",
      "costa",
      "coste",
      "costs",
      "cotan",
      "coted",
      "cotes",
      "coths",
      "cotta",
      "cotts",
      "coude",
      "coups",
      "courb",
      "courd",
      "coure",
      "cours",
      "couta",
      "couth",
      "coved",
      "coves",
      "covin",
      "cowal",
      "cowan",
      "cowed",
      "cowks",
      "cowls",
      "cowps",
      "cowry",
      "coxae",
      "coxal",
      "coxed",
      "coxes",
      "coxib",
      "coyau",
      "coyed",
      "coyer",
      "coypu",
      "cozed",
      "cozen",
      "cozes",
      "cozey",
      "cozie",
      "craal",
      "crabs",
      "crags",
      "craic",
      "craig",
      "crake",
      "crame",
      "crams",
      "crans",
      "crape",
      "craps",
      "crapy",
      "crare",
      "craws",
      "crays",
      "creds",
      "creel",
      "crees",
      "crems",
      "crena",
      "creps",
      "crepy",
      "crewe",
      "crews",
      "crias",
      "cribs",
      "cries",
      "crims",
      "crine",
      "crios",
      "cripe",
      "crips",
      "crise",
      "crith",
      "crits",
      "croci",
      "crocs",
      "croft",
      "crogs",
      "cromb",
      "crome",
      "cronk",
      "crons",
      "crool",
      "croon",
      "crops",
      "crore",
      "crost",
      "crout",
      "crows",
      "croze",
      "cruck",
      "crudo",
      "cruds",
      "crudy",
      "crues",
      "cruet",
      "cruft",
      "crunk",
      "cruor",
      "crura",
      "cruse",
      "crusy",
      "cruve",
      "crwth",
      "cryer",
      "ctene",
      "cubby",
      "cubeb",
      "cubed",
      "cuber",
      "cubes",
      "cubit",
      "cuddy",
      "cuffo",
      "cuffs",
      "cuifs",
      "cuing",
      "cuish",
      "cuits",
      "cukes",
      "culch",
      "culet",
      "culex",
      "culls",
      "cully",
      "culms",
      "culpa",
      "culti",
      "cults",
      "culty",
      "cumec",
      "cundy",
      "cunei",
      "cunit",
      "cunts",
      "cupel",
      "cupid",
      "cuppa",
      "cuppy",
      "curat",
      "curbs",
      "curch",
      "curds",
      "curdy",
      "cured",
      "curer",
      "cures",
      "curet",
      "curfs",
      "curia",
      "curie",
      "curli",
      "curls",
      "curns",
      "curny",
      "currs",
      "cursi",
      "curst",
      "cusec",
      "cushy",
      "cusks",
      "cusps",
      "cuspy",
      "cusso",
      "cusum",
      "cutch",
      "cuter",
      "cutes",
      "cutey",
      "cutin",
      "cutis",
      "cutto",
      "cutty",
      "cutup",
      "cuvee",
      "cuzes",
      "cwtch",
      "cyano",
      "cyans",
      "cycad",
      "cycas",
      "cyclo",
      "cyder",
      "cylix",
      "cymae",
      "cymar",
      "cymas",
      "cymes",
      "cymol",
      "cysts",
      "cytes",
      "cyton",
      "czars",
      "daals",
      "dabba",
      "daces",
      "dacha",
      "dacks",
      "dadah",
      "dadas",
      "dados",
      "daffs",
      "daffy",
      "dagga",
      "daggy",
      "dagos",
      "dahls",
      "daiko",
      "daine",
      "daint",
      "daker",
      "daled",
      "dales",
      "dalis",
      "dalle",
      "dalts",
      "daman",
      "damar",
      "dames",
      "damme",
      "damns",
      "damps",
      "dampy",
      "dancy",
      "dangs",
      "danio",
      "danks",
      "danny",
      "dants",
      "daraf",
      "darbs",
      "darcy",
      "dared",
      "darer",
      "dares",
      "darga",
      "dargs",
      "daric",
      "daris",
      "darks",
      "darky",
      "darns",
      "darre",
      "darts",
      "darzi",
      "dashi",
      "dashy",
      "datal",
      "dated",
      "dater",
      "dates",
      "datos",
      "datto",
      "daube",
      "daubs",
      "dauby",
      "dauds",
      "dault",
      "daurs",
      "dauts",
      "daven",
      "davit",
      "dawah",
      "dawds",
      "dawed",
      "dawen",
      "dawks",
      "dawns",
      "dawts",
      "dayan",
      "daych",
      "daynt",
      "dazed",
      "dazer",
      "dazes",
      "deads",
      "deair",
      "deals",
      "deans",
      "deare",
      "dearn",
      "dears",
      "deary",
      "deash",
      "deave",
      "deaws",
      "deawy",
      "debag",
      "debby",
      "debel",
      "debes",
      "debts",
      "debud",
      "debur",
      "debus",
      "debye",
      "decad",
      "decaf",
      "decan",
      "decko",
      "decks",
      "decos",
      "dedal",
      "deeds",
      "deedy",
      "deely",
      "deems",
      "deens",
      "deeps",
      "deere",
      "deers",
      "deets",
      "deeve",
      "deevs",
      "defat",
      "deffo",
      "defis",
      "defog",
      "degas",
      "degum",
      "degus",
      "deice",
      "deids",
      "deify",
      "deils",
      "deism",
      "deist",
      "deked",
      "dekes",
      "dekko",
      "deled",
      "deles",
      "delfs",
      "delft",
      "delis",
      "dells",
      "delly",
      "delos",
      "delph",
      "delts",
      "deman",
      "demes",
      "demic",
      "demit",
      "demob",
      "demoi",
      "demos",
      "dempt",
      "denar",
      "denay",
      "dench",
      "denes",
      "denet",
      "denis",
      "dents",
      "deoxy",
      "derat",
      "deray",
      "dered",
      "deres",
      "derig",
      "derma",
      "derms",
      "derns",
      "derny",
      "deros",
      "derro",
      "derry",
      "derth",
      "dervs",
      "desex",
      "deshi",
      "desis",
      "desks",
      "desse",
      "devas",
      "devel",
      "devis",
      "devon",
      "devos",
      "devot",
      "dewan",
      "dewar",
      "dewax",
      "dewed",
      "dexes",
      "dexie",
      "dhaba",
      "dhaks",
      "dhals",
      "dhikr",
      "dhobi",
      "dhole",
      "dholl",
      "dhols",
      "dhoti",
      "dhows",
      "dhuti",
      "diact",
      "dials",
      "diane",
      "diazo",
      "dibbs",
      "diced",
      "dicer",
      "dices",
      "dicht",
      "dicks",
      "dicky",
      "dicot",
      "dicta",
      "dicts",
      "dicty",
      "diddy",
      "didie",
      "didos",
      "didst",
      "diebs",
      "diels",
      "diene",
      "diets",
      "diffs",
      "dight",
      "dikas",
      "diked",
      "diker",
      "dikes",
      "dikey",
      "dildo",
      "dilli",
      "dills",
      "dimbo",
      "dimer",
      "dimes",
      "dimps",
      "dinar",
      "dined",
      "dines",
      "dinge",
      "dings",
      "dinic",
      "dinks",
      "dinky",
      "dinna",
      "dinos",
      "dints",
      "diols",
      "diota",
      "dippy",
      "dipso",
      "diram",
      "direr",
      "dirke",
      "dirks",
      "dirls",
      "dirts",
      "disas",
      "disci",
      "discs",
      "dishy",
      "disks",
      "disme",
      "dital",
      "ditas",
      "dited",
      "dites",
      "ditsy",
      "ditts",
      "ditzy",
      "divan",
      "divas",
      "dived",
      "dives",
      "divis",
      "divna",
      "divos",
      "divot",
      "divvy",
      "diwan",
      "dixie",
      "dixit",
      "diyas",
      "dizen",
      "djinn",
      "djins",
      "doabs",
      "doats",
      "dobby",
      "dobes",
      "dobie",
      "dobla",
      "dobra",
      "dobro",
      "docht",
      "docks",
      "docos",
      "docus",
      "doddy",
      "dodos",
      "doeks",
      "doers",
      "doest",
      "doeth",
      "doffs",
      "dogan",
      "doges",
      "dogey",
      "doggo",
      "doggy",
      "dogie",
      "dohyo",
      "doilt",
      "doily",
      "doits",
      "dojos",
      "dolce",
      "dolci",
      "doled",
      "doles",
      "dolia",
      "dolls",
      "dolma",
      "dolor",
      "dolos",
      "dolts",
      "domal",
      "domed",
      "domes",
      "domic",
      "donah",
      "donas",
      "donee",
      "doner",
      "donga",
      "dongs",
      "donko",
      "donna",
      "donne",
      "donny",
      "donsy",
      "doobs",
      "dooce",
      "doody",
      "dooks",
      "doole",
      "dools",
      "dooly",
      "dooms",
      "doomy",
      "doona",
      "doorn",
      "doors",
      "doozy",
      "dopas",
      "doped",
      "doper",
      "dopes",
      "dorad",
      "dorba",
      "dorbs",
      "doree",
      "dores",
      "doric",
      "doris",
      "dorks",
      "dorky",
      "dorms",
      "dormy",
      "dorps",
      "dorrs",
      "dorsa",
      "dorse",
      "dorts",
      "dorty",
      "dosai",
      "dosas",
      "dosed",
      "doseh",
      "doser",
      "doses",
      "dosha",
      "dotal",
      "doted",
      "doter",
      "dotes",
      "dotty",
      "douar",
      "douce",
      "doucs",
      "douks",
      "doula",
      "douma",
      "doums",
      "doups",
      "doura",
      "douse",
      "douts",
      "doved",
      "doven",
      "dover",
      "doves",
      "dovie",
      "dowar",
      "dowds",
      "dowed",
      "dower",
      "dowie",
      "dowle",
      "dowls",
      "dowly",
      "downa",
      "downs",
      "dowps",
      "dowse",
      "dowts",
      "doxed",
      "doxes",
      "doxie",
      "doyen",
      "doyly",
      "dozed",
      "dozer",
      "dozes",
      "drabs",
      "drack",
      "draco",
      "draff",
      "drags",
      "drail",
      "drams",
      "drant",
      "draps",
      "drats",
      "drave",
      "draws",
      "drays",
      "drear",
      "dreck",
      "dreed",
      "dreer",
      "drees",
      "dregs",
      "dreks",
      "drent",
      "drere",
      "drest",
      "dreys",
      "dribs",
      "drice",
      "dries",
      "drily",
      "drips",
      "dript",
      "droid",
      "droil",
      "droke",
      "drole",
      "drome",
      "drony",
      "droob",
      "droog",
      "drook",
      "drops",
      "dropt",
      "drouk",
      "drows",
      "drubs",
      "drugs",
      "drums",
      "drupe",
      "druse",
      "drusy",
      "druxy",
      "dryad",
      "dryas",
      "dsobo",
      "dsomo",
      "duads",
      "duals",
      "duans",
      "duars",
      "dubbo",
      "ducal",
      "ducat",
      "duces",
      "ducks",
      "ducky",
      "ducts",
      "duddy",
      "duded",
      "dudes",
      "duels",
      "duets",
      "duett",
      "duffs",
      "dufus",
      "duing",
      "duits",
      "dukas",
      "duked",
      "dukes",
      "dukka",
      "dulce",
      "dules",
      "dulia",
      "dulls",
      "dulse",
      "dumas",
      "dumbo",
      "dumbs",
      "dumka",
      "dumky",
      "dumps",
      "dunam",
      "dunch",
      "dunes",
      "dungs",
      "dungy",
      "dunks",
      "dunno",
      "dunny",
      "dunsh",
      "dunts",
      "duomi",
      "duomo",
      "duped",
      "duper",
      "dupes",
      "duple",
      "duply",
      "duppy",
      "dural",
      "duras",
      "dured",
      "dures",
      "durgy",
      "durns",
      "duroc",
      "duros",
      "duroy",
      "durra",
      "durrs",
      "durry",
      "durst",
      "durum",
      "durzi",
      "dusks",
      "dusts",
      "duxes",
      "dwaal",
      "dwale",
      "dwalm",
      "dwams",
      "dwang",
      "dwaum",
      "dweeb",
      "dwile",
      "dwine",
      "dyads",
      "dyers",
      "dyked",
      "dykes",
      "dykey",
      "dykon",
      "dynel",
      "dynes",
      "dzhos",
      "eagre",
      "ealed",
      "eales",
      "eaned",
      "eards",
      "eared",
      "earls",
      "earns",
      "earnt",
      "earst",
      "eased",
      "easer",
      "eases",
      "easle",
      "easts",
      "eathe",
      "eaved",
      "eaves",
      "ebbed",
      "ebbet",
      "ebons",
      "ebook",
      "ecads",
      "eched",
      "eches",
      "echos",
      "ecrus",
      "edema",
      "edged",
      "edger",
      "edges",
      "edile",
      "edits",
      "educe",
      "educt",
      "eejit",
      "eensy",
      "eeven",
      "eevns",
      "effed",
      "egads",
      "egers",
      "egest",
      "eggar",
      "egged",
      "egger",
      "egmas",
      "ehing",
      "eider",
      "eidos",
      "eigne",
      "eiked",
      "eikon",
      "eilds",
      "eisel",
      "ejido",
      "ekkas",
      "elain",
      "eland",
      "elans",
      "elchi",
      "eldin",
      "elemi",
      "elfed",
      "eliad",
      "elint",
      "elmen",
      "eloge",
      "elogy",
      "eloin",
      "elops",
      "elpee",
      "elsin",
      "elute",
      "elvan",
      "elven",
      "elver",
      "elves",
      "emacs",
      "embar",
      "embay",
      "embog",
      "embow",
      "embox",
      "embus",
      "emeer",
      "emend",
      "emerg",
      "emery",
      "emeus",
      "emics",
      "emirs",
      "emits",
      "emmas",
      "emmer",
      "emmet",
      "emmew",
      "emmys",
      "emoji",
      "emong",
      "emote",
      "emove",
      "empts",
      "emule",
      "emure",
      "emyde",
      "emyds",
      "enarm",
      "enate",
      "ended",
      "ender",
      "endew",
      "endue",
      "enews",
      "enfix",
      "eniac",
      "enlit",
      "enmew",
      "ennog",
      "enoki",
      "enols",
      "enorm",
      "enows",
      "enrol",
      "ensew",
      "ensky",
      "entia",
      "enure",
      "enurn",
      "envoi",
      "enzym",
      "eorls",
      "eosin",
      "epact",
      "epees",
      "ephah",
      "ephas",
      "ephod",
      "ephor",
      "epics",
      "epode",
      "epopt",
      "epris",
      "eques",
      "equid",
      "erbia",
      "erevs",
      "ergon",
      "ergos",
      "ergot",
      "erhus",
      "erica",
      "erick",
      "erics",
      "ering",
      "erned",
      "ernes",
      "erose",
      "erred",
      "erses",
      "eruct",
      "erugo",
      "eruvs",
      "erven",
      "ervil",
      "escar",
      "escot",
      "esile",
      "eskar",
      "esker",
      "esnes",
      "esses",
      "estoc",
      "estop",
      "estro",
      "etage",
      "etape",
      "etats",
      "etens",
      "ethal",
      "ethne",
      "ethyl",
      "etics",
      "etnas",
      "ettin",
      "ettle",
      "etuis",
      "etwee",
      "etyma",
      "eughs",
      "euked",
      "eupad",
      "euros",
      "eusol",
      "evens",
      "evert",
      "evets",
      "evhoe",
      "evils",
      "evite",
      "evohe",
      "ewers",
      "ewest",
      "ewhow",
      "ewked",
      "exams",
      "exeat",
      "execs",
      "exeem",
      "exeme",
      "exfil",
      "exies",
      "exine",
      "exing",
      "exits",
      "exode",
      "exome",
      "exons",
      "expat",
      "expos",
      "exude",
      "exuls",
      "exurb",
      "eyass",
      "eyers",
      "eyots",
      "eyras",
      "eyres",
      "eyrie",
      "eyrir",
      "ezine",
      "fabby",
      "faced",
      "facer",
      "faces",
      "facia",
      "facta",
      "facts",
      "faddy",
      "faded",
      "fader",
      "fades",
      "fadge",
      "fados",
      "faena",
      "faery",
      "faffs",
      "faffy",
      "faggy",
      "fagin",
      "fagot",
      "faiks",
      "fails",
      "faine",
      "fains",
      "fairs",
      "faked",
      "faker",
      "fakes",
      "fakey",
      "fakie",
      "fakir",
      "falaj",
      "falls",
      "famed",
      "fames",
      "fanal",
      "fands",
      "fanes",
      "fanga",
      "fango",
      "fangs",
      "fanks",
      "fanon",
      "fanos",
      "fanum",
      "faqir",
      "farad",
      "farci",
      "farcy",
      "fards",
      "fared",
      "farer",
      "fares",
      "farle",
      "farls",
      "farms",
      "faros",
      "farro",
      "farse",
      "farts",
      "fasci",
      "fasti",
      "fasts",
      "fated",
      "fates",
      "fatly",
      "fatso",
      "fatwa",
      "faugh",
      "fauld",
      "fauns",
      "faurd",
      "fauts",
      "fauve",
      "favas",
      "favel",
      "faver",
      "faves",
      "favus",
      "fawns",
      "fawny",
      "faxed",
      "faxes",
      "fayed",
      "fayer",
      "fayne",
      "fayre",
      "fazed",
      "fazes",
      "feals",
      "feare",
      "fears",
      "feart",
      "fease",
      "feats",
      "feaze",
      "feces",
      "fecht",
      "fecit",
      "fecks",
      "fedex",
      "feebs",
      "feeds",
      "feels",
      "feens",
      "feers",
      "feese",
      "feeze",
      "fehme",
      "feint",
      "feist",
      "felch",
      "felid",
      "fells",
      "felly",
      "felts",
      "felty",
      "femal",
      "femes",
      "femmy",
      "fends",
      "fendy",
      "fenis",
      "fenks",
      "fenny",
      "fents",
      "feods",
      "feoff",
      "ferer",
      "feres",
      "feria",
      "ferly",
      "fermi",
      "ferms",
      "ferns",
      "ferny",
      "fesse",
      "festa",
      "fests",
      "festy",
      "fetas",
      "feted",
      "fetes",
      "fetor",
      "fetta",
      "fetts",
      "fetwa",
      "feuar",
      "feuds",
      "feued",
      "feyed",
      "feyer",
      "feyly",
      "fezes",
      "fezzy",
      "fiars",
      "fiats",
      "fibre",
      "fibro",
      "fices",
      "fiche",
      "fichu",
      "ficin",
      "ficos",
      "fides",
      "fidge",
      "fidos",
      "fiefs",
      "fient",
      "fiere",
      "fiers",
      "fiest",
      "fifed",
      "fifer",
      "fifes",
      "fifis",
      "figgy",
      "figos",
      "fiked",
      "fikes",
      "filar",
      "filch",
      "filed",
      "files",
      "filii",
      "filks",
      "fille",
      "fillo",
      "fills",
      "filmi",
      "films",
      "filos",
      "filum",
      "finca",
      "finds",
      "fined",
      "fines",
      "finis",
      "finks",
      "finny",
      "finos",
      "fiord",
      "fiqhs",
      "fique",
      "fired",
      "firer",
      "fires",
      "firie",
      "firks",
      "firms",
      "firns",
      "firry",
      "firth",
      "fiscs",
      "fisks",
      "fists",
      "fisty",
      "fitch",
      "fitly",
      "fitna",
      "fitte",
      "fitts",
      "fiver",
      "fives",
      "fixed",
      "fixes",
      "fixit",
      "fjeld",
      "flabs",
      "flaff",
      "flags",
      "flaks",
      "flamm",
      "flams",
      "flamy",
      "flane",
      "flans",
      "flaps",
      "flary",
      "flats",
      "flava",
      "flawn",
      "flaws",
      "flawy",
      "flaxy",
      "flays",
      "fleam",
      "fleas",
      "fleek",
      "fleer",
      "flees",
      "flegs",
      "fleme",
      "fleur",
      "flews",
      "flexi",
      "flexo",
      "fleys",
      "flics",
      "flied",
      "flies",
      "flimp",
      "flims",
      "flips",
      "flirs",
      "flisk",
      "flite",
      "flits",
      "flitt",
      "flobs",
      "flocs",
      "floes",
      "flogs",
      "flong",
      "flops",
      "flors",
      "flory",
      "flosh",
      "flota",
      "flote",
      "flows",
      "flubs",
      "flued",
      "flues",
      "fluey",
      "fluky",
      "flump",
      "fluor",
      "flurr",
      "fluty",
      "fluyt",
      "flyby",
      "flype",
      "flyte",
      "foals",
      "foams",
      "foehn",
      "fogey",
      "fogie",
      "fogle",
      "fogou",
      "fohns",
      "foids",
      "foils",
      "foins",
      "folds",
      "foley",
      "folia",
      "folic",
      "folie",
      "folks",
      "folky",
      "fomes",
      "fonda",
      "fonds",
      "fondu",
      "fones",
      "fonly",
      "fonts",
      "foods",
      "foody",
      "fools",
      "foots",
      "footy",
      "foram",
      "forbs",
      "forby",
      "fordo",
      "fords",
      "forel",
      "fores",
      "forex",
      "forks",
      "forky",
      "forme",
      "forms",
      "forts",
      "forza",
      "forze",
      "fossa",
      "fosse",
      "fouat",
      "fouds",
      "fouer",
      "fouet",
      "foule",
      "fouls",
      "fount",
      "fours",
      "fouth",
      "fovea",
      "fowls",
      "fowth",
      "foxed",
      "foxes",
      "foxie",
      "foyle",
      "foyne",
      "frabs",
      "frack",
      "fract",
      "frags",
      "fraim",
      "franc",
      "frape",
      "fraps",
      "frass",
      "frate",
      "frati",
      "frats",
      "fraus",
      "frays",
      "frees",
      "freet",
      "freit",
      "fremd",
      "frena",
      "freon",
      "frere",
      "frets",
      "fribs",
      "frier",
      "fries",
      "frigs",
      "frise",
      "frist",
      "frith",
      "frits",
      "fritt",
      "frize",
      "frizz",
      "froes",
      "frogs",
      "frons",
      "frore",
      "frorn",
      "frory",
      "frosh",
      "frows",
      "frowy",
      "frugs",
      "frump",
      "frush",
      "frust",
      "fryer",
      "fubar",
      "fubby",
      "fubsy",
      "fucks",
      "fucus",
      "fuddy",
      "fudgy",
      "fuels",
      "fuero",
      "fuffs",
      "fuffy",
      "fugal",
      "fuggy",
      "fugie",
      "fugio",
      "fugle",
      "fugly",
      "fugus",
      "fujis",
      "fulls",
      "fumed",
      "fumer",
      "fumes",
      "fumet",
      "fundi",
      "funds",
      "fundy",
      "fungo",
      "fungs",
      "funks",
      "fural",
      "furan",
      "furca",
      "furls",
      "furol",
      "furrs",
      "furth",
      "furze",
      "furzy",
      "fused",
      "fusee",
      "fusel",
      "fuses",
      "fusil",
      "fusks",
      "fusts",
      "fusty",
      "futon",
      "fuzed",
      "fuzee",
      "fuzes",
      "fuzil",
      "fyces",
      "fyked",
      "fykes",
      "fyles",
      "fyrds",
      "fytte",
      "gabba",
      "gabby",
      "gable",
      "gaddi",
      "gades",
      "gadge",
      "gadid",
      "gadis",
      "gadje",
      "gadjo",
      "gadso",
      "gaffs",
      "gaged",
      "gager",
      "gages",
      "gaids",
      "gains",
      "gairs",
      "gaita",
      "gaits",
      "gaitt",
      "gajos",
      "galah",
      "galas",
      "galax",
      "galea",
      "galed",
      "gales",
      "galls",
      "gally",
      "galop",
      "galut",
      "galvo",
      "gamas",
      "gamay",
      "gamba",
      "gambe",
      "gambo",
      "gambs",
      "gamed",
      "games",
      "gamey",
      "gamic",
      "gamin",
      "gamme",
      "gammy",
      "gamps",
      "ganch",
      "gandy",
      "ganef",
      "ganev",
      "gangs",
      "ganja",
      "ganof",
      "gants",
      "gaols",
      "gaped",
      "gaper",
      "gapes",
      "gapos",
      "gappy",
      "garbe",
      "garbo",
      "garbs",
      "garda",
      "gares",
      "garis",
      "garms",
      "garni",
      "garre",
      "garth",
      "garum",
      "gases",
      "gasps",
      "gaspy",
      "gasts",
      "gatch",
      "gated",
      "gater",
      "gates",
      "gaths",
      "gator",
      "gauch",
      "gaucy",
      "gauds",
      "gauje",
      "gault",
      "gaums",
      "gaumy",
      "gaups",
      "gaurs",
      "gauss",
      "gauzy",
      "gavot",
      "gawcy",
      "gawds",
      "gawks",
      "gawps",
      "gawsy",
      "gayal",
      "gazal",
      "gazar",
      "gazed",
      "gazes",
      "gazon",
      "gazoo",
      "geals",
      "geans",
      "geare",
      "gears",
      "geats",
      "gebur",
      "gecks",
      "geeks",
      "geeps",
      "geest",
      "geist",
      "geits",
      "gelds",
      "gelee",
      "gelid",
      "gelly",
      "gelts",
      "gemel",
      "gemma",
      "gemmy",
      "gemot",
      "genal",
      "genas",
      "genes",
      "genet",
      "genic",
      "genii",
      "genip",
      "genny",
      "genoa",
      "genom",
      "genro",
      "gents",
      "genty",
      "genua",
      "genus",
      "geode",
      "geoid",
      "gerah",
      "gerbe",
      "geres",
      "gerle",
      "germs",
      "germy",
      "gerne",
      "gesse",
      "gesso",
      "geste",
      "gests",
      "getas",
      "getup",
      "geums",
      "geyan",
      "geyer",
      "ghast",
      "ghats",
      "ghaut",
      "ghazi",
      "ghees",
      "ghest",
      "ghyll",
      "gibed",
      "gibel",
      "giber",
      "gibes",
      "gibli",
      "gibus",
      "gifts",
      "gigas",
      "gighe",
      "gigot",
      "gigue",
      "gilas",
      "gilds",
      "gilet",
      "gills",
      "gilly",
      "gilpy",
      "gilts",
      "gimel",
      "gimme",
      "gimps",
      "gimpy",
      "ginch",
      "ginge",
      "gings",
      "ginks",
      "ginny",
      "ginzo",
      "gipon",
      "gippo",
      "gippy",
      "girds",
      "girls",
      "girns",
      "giron",
      "giros",
      "girrs",
      "girsh",
      "girts",
      "gismo",
      "gisms",
      "gists",
      "gitch",
      "gites",
      "giust",
      "gived",
      "gives",
      "gizmo",
      "glace",
      "glads",
      "glady",
      "glaik",
      "glair",
      "glams",
      "glans",
      "glary",
      "glaum",
      "glaur",
      "glazy",
      "gleba",
      "glebe",
      "gleby",
      "glede",
      "gleds",
      "gleed",
      "gleek",
      "glees",
      "gleet",
      "gleis",
      "glens",
      "glent",
      "gleys",
      "glial",
      "glias",
      "glibs",
      "gliff",
      "glift",
      "glike",
      "glime",
      "glims",
      "glisk",
      "glits",
      "glitz",
      "gloam",
      "globi",
      "globs",
      "globy",
      "glode",
      "glogg",
      "gloms",
      "gloop",
      "glops",
      "glost",
      "glout",
      "glows",
      "gloze",
      "glued",
      "gluer",
      "glues",
      "gluey",
      "glugs",
      "glume",
      "glums",
      "gluon",
      "glute",
      "gluts",
      "gnarl",
      "gnarr",
      "gnars",
      "gnats",
      "gnawn",
      "gnaws",
      "gnows",
      "goads",
      "goafs",
      "goals",
      "goary",
      "goats",
      "goaty",
      "goban",
      "gobar",
      "gobbi",
      "gobbo",
      "gobby",
      "gobis",
      "gobos",
      "godet",
      "godso",
      "goels",
      "goers",
      "goest",
      "goeth",
      "goety",
      "gofer",
      "goffs",
      "gogga",
      "gogos",
      "goier",
      "gojis",
      "golds",
      "goldy",
      "goles",
      "golfs",
      "golpe",
      "golps",
      "gombo",
      "gomer",
      "gompa",
      "gonch",
      "gonef",
      "gongs",
      "gonia",
      "gonif",
      "gonks",
      "gonna",
      "gonof",
      "gonys",
      "gonzo",
      "gooby",
      "goods",
      "goofs",
      "googs",
      "gooks",
      "gooky",
      "goold",
      "gools",
      "gooly",
      "goons",
      "goony",
      "goops",
      "goopy",
      "goors",
      "goory",
      "goosy",
      "gopak",
      "gopik",
      "goral",
      "goras",
      "gored",
      "gores",
      "goris",
      "gorms",
      "gormy",
      "gorps",
      "gorse",
      "gorsy",
      "gosht",
      "gosse",
      "gotch",
      "goths",
      "gothy",
      "gotta",
      "gouch",
      "gouks",
      "goura",
      "gouts",
      "gouty",
      "gowan",
      "gowds",
      "gowfs",
      "gowks",
      "gowls",
      "gowns",
      "goxes",
      "goyim",
      "goyle",
      "graal",
      "grabs",
      "grads",
      "graff",
      "graip",
      "grama",
      "grame",
      "gramp",
      "grams",
      "grana",
      "grans",
      "grapy",
      "gravs",
      "grays",
      "grebe",
      "grebo",
      "grece",
      "greek",
      "grees",
      "grege",
      "grego",
      "grein",
      "grens",
      "grese",
      "greve",
      "grews",
      "greys",
      "grice",
      "gride",
      "grids",
      "griff",
      "grift",
      "grigs",
      "grike",
      "grins",
      "griot",
      "grips",
      "gript",
      "gripy",
      "grise",
      "grist",
      "grisy",
      "grith",
      "grits",
      "grize",
      "groat",
      "grody",
      "grogs",
      "groks",
      "groma",
      "grone",
      "groof",
      "grosz",
      "grots",
      "grouf",
      "grovy",
      "grows",
      "grrls",
      "grrrl",
      "grubs",
      "grued",
      "grues",
      "grufe",
      "grume",
      "grump",
      "grund",
      "gryce",
      "gryde",
      "gryke",
      "grype",
      "grypt",
      "guaco",
      "guana",
      "guano",
      "guans",
      "guars",
      "gucks",
      "gucky",
      "gudes",
      "guffs",
      "gugas",
      "guids",
      "guimp",
      "guiro",
      "gulag",
      "gular",
      "gulas",
      "gules",
      "gulet",
      "gulfs",
      "gulfy",
      "gulls",
      "gulph",
      "gulps",
      "gulpy",
      "gumma",
      "gummi",
      "gumps",
      "gundy",
      "gunge",
      "gungy",
      "gunks",
      "gunky",
      "gunny",
      "guqin",
      "gurdy",
      "gurge",
      "gurls",
      "gurly",
      "gurns",
      "gurry",
      "gursh",
      "gurus",
      "gushy",
      "gusla",
      "gusle",
      "gusli",
      "gussy",
      "gusts",
      "gutsy",
      "gutta",
      "gutty",
      "guyed",
      "guyle",
      "guyot",
      "guyse",
      "gwine",
      "gyals",
      "gyans",
      "gybed",
      "gybes",
      "gyeld",
      "gymps",
      "gynae",
      "gynie",
      "gynny",
      "gynos",
      "gyoza",
      "gypos",
      "gyppo",
      "gyppy",
      "gyral",
      "gyred",
      "gyres",
      "gyron",
      "gyros",
      "gyrus",
      "gytes",
      "gyved",
      "gyves",
      "haafs",
      "haars",
      "hable",
      "habus",
      "hacek",
      "hacks",
      "hadal",
      "haded",
      "hades",
      "hadji",
      "hadst",
      "haems",
      "haets",
      "haffs",
      "hafiz",
      "hafts",
      "haggs",
      "hahas",
      "haick",
      "haika",
      "haiks",
      "haiku",
      "hails",
      "haily",
      "hains",
      "haint",
      "hairs",
      "haith",
      "hajes",
      "hajis",
      "hajji",
      "hakam",
      "hakas",
      "hakea",
      "hakes",
      "hakim",
      "hakus",
      "halal",
      "haled",
      "haler",
      "hales",
      "halfa",
      "halfs",
      "halid",
      "hallo",
      "halls",
      "halma",
      "halms",
      "halon",
      "halos",
      "halse",
      "halts",
      "halva",
      "halwa",
      "hamal",
      "hamba",
      "hamed",
      "hames",
      "hammy",
      "hamza",
      "hanap",
      "hance",
      "hanch",
      "hands",
      "hangi",
      "hangs",
      "hanks",
      "hanky",
      "hansa",
      "hanse",
      "hants",
      "haole",
      "haoma",
      "hapax",
      "haply",
      "happi",
      "hapus",
      "haram",
      "hards",
      "hared",
      "hares",
      "harim",
      "harks",
      "harls",
      "harms",
      "harns",
      "haros",
      "harps",
      "harts",
      "hashy",
      "hasks",
      "hasps",
      "hasta",
      "hated",
      "hates",
      "hatha",
      "hauds",
      "haufs",
      "haugh",
      "hauld",
      "haulm",
      "hauls",
      "hault",
      "hauns",
      "hause",
      "haver",
      "haves",
      "hawed",
      "hawks",
      "hawms",
      "hawse",
      "hayed",
      "hayer",
      "hayey",
      "hayle",
      "hazan",
      "hazed",
      "hazer",
      "hazes",
      "heads",
      "heald",
      "heals",
      "heame",
      "heaps",
      "heapy",
      "heare",
      "hears",
      "heast",
      "heats",
      "heben",
      "hebes",
      "hecht",
      "hecks",
      "heder",
      "hedgy",
      "heeds",
      "heedy",
      "heels",
      "heeze",
      "hefte",
      "hefts",
      "heids",
      "heigh",
      "heils",
      "heirs",
      "hejab",
      "hejra",
      "heled",
      "heles",
      "helio",
      "hells",
      "helms",
      "helos",
      "helot",
      "helps",
      "helve",
      "hemal",
      "hemes",
      "hemic",
      "hemin",
      "hemps",
      "hempy",
      "hench",
      "hends",
      "henge",
      "henna",
      "henny",
      "henry",
      "hents",
      "hepar",
      "herbs",
      "herby",
      "herds",
      "heres",
      "herls",
      "herma",
      "herms",
      "herns",
      "heros",
      "herry",
      "herse",
      "hertz",
      "herye",
      "hesps",
      "hests",
      "hetes",
      "heths",
      "heuch",
      "heugh",
      "hevea",
      "hewed",
      "hewer",
      "hewgh",
      "hexad",
      "hexed",
      "hexer",
      "hexes",
      "hexyl",
      "heyed",
      "hiant",
      "hicks",
      "hided",
      "hider",
      "hides",
      "hiems",
      "highs",
      "hight",
      "hijab",
      "hijra",
      "hiked",
      "hiker",
      "hikes",
      "hikoi",
      "hilar",
      "hilch",
      "hillo",
      "hills",
      "hilts",
      "hilum",
      "hilus",
      "himbo",
      "hinau",
      "hinds",
      "hings",
      "hinky",
      "hinny",
      "hints",
      "hiois",
      "hiply",
      "hired",
      "hiree",
      "hirer",
      "hires",
      "hissy",
      "hists",
      "hithe",
      "hived",
      "hiver",
      "hives",
      "hizen",
      "hoaed",
      "hoagy",
      "hoars",
      "hoary",
      "hoast",
      "hobos",
      "hocks",
      "hocus",
      "hodad",
      "hodja",
      "hoers",
      "hogan",
      "hogen",
      "hoggs",
      "hoghs",
      "hohed",
      "hoick",
      "hoied",
      "hoiks",
      "hoing",
      "hoise",
      "hokas",
      "hoked",
      "hokes",
      "hokey",
      "hokis",
      "hokku",
      "hokum",
      "holds",
      "holed",
      "holes",
      "holey",
      "holks",
      "holla",
      "hollo",
      "holme",
      "holms",
      "holon",
      "holos",
      "holts",
      "homas",
      "homed",
      "homes",
      "homey",
      "homie",
      "homme",
      "homos",
      "honan",
      "honda",
      "honds",
      "honed",
      "honer",
      "hones",
      "hongi",
      "hongs",
      "honks",
      "honky",
      "hooch",
      "hoods",
      "hoody",
      "hooey",
      "hoofs",
      "hooka",
      "hooks",
      "hooky",
      "hooly",
      "hoons",
      "hoops",
      "hoord",
      "hoors",
      "hoosh",
      "hoots",
      "hooty",
      "hoove",
      "hopak",
      "hoped",
      "hoper",
      "hopes",
      "hoppy",
      "horah",
      "horal",
      "horas",
      "horis",
      "horks",
      "horme",
      "horns",
      "horst",
      "horsy",
      "hosed",
      "hosel",
      "hosen",
      "hoser",
      "hoses",
      "hosey",
      "hosta",
      "hosts",
      "hotch",
      "hoten",
      "hotty",
      "houff",
      "houfs",
      "hough",
      "houri",
      "hours",
      "houts",
      "hovea",
      "hoved",
      "hoven",
      "hoves",
      "howbe",
      "howes",
      "howff",
      "howfs",
      "howks",
      "howls",
      "howre",
      "howso",
      "hoxed",
      "hoxes",
      "hoyas",
      "hoyed",
      "hoyle",
      "hubby",
      "hucks",
      "hudna",
      "hudud",
      "huers",
      "huffs",
      "huffy",
      "huger",
      "huggy",
      "huhus",
      "huias",
      "hulas",
      "hules",
      "hulks",
      "hulky",
      "hullo",
      "hulls",
      "hully",
      "humas",
      "humfs",
      "humic",
      "humps",
      "humpy",
      "hunks",
      "hunts",
      "hurds",
      "hurls",
      "hurly",
      "hurra",
      "hurst",
      "hurts",
      "hushy",
      "husks",
      "husos",
      "hutia",
      "huzza",
      "huzzy",
      "hwyls",
      "hydra",
      "hyens",
      "hygge",
      "hying",
      "hykes",
      "hylas",
      "hyleg",
      "hyles",
      "hylic",
      "hymns",
      "hynde",
      "hyoid",
      "hyped",
      "hypes",
      "hypha",
      "hyphy",
      "hypos",
      "hyrax",
      "hyson",
      "hythe",
      "iambi",
      "iambs",
      "ibrik",
      "icers",
      "iched",
      "iches",
      "ichor",
      "icier",
      "icker",
      "ickle",
      "icons",
      "ictal",
      "ictic",
      "ictus",
      "idant",
      "ideas",
      "idees",
      "ident",
      "idled",
      "idles",
      "idola",
      "idols",
      "idyls",
      "iftar",
      "igapo",
      "igged",
      "iglus",
      "ihram",
      "ikans",
      "ikats",
      "ikons",
      "ileac",
      "ileal",
      "ileum",
      "ileus",
      "iliad",
      "ilial",
      "ilium",
      "iller",
      "illth",
      "imago",
      "imams",
      "imari",
      "imaum",
      "imbar",
      "imbed",
      "imide",
      "imido",
      "imids",
      "imine",
      "imino",
      "immew",
      "immit",
      "immix",
      "imped",
      "impis",
      "impot",
      "impro",
      "imshi",
      "imshy",
      "inapt",
      "inarm",
      "inbye",
      "incel",
      "incle",
      "incog",
      "incus",
      "incut",
      "indew",
      "india",
      "indie",
      "indol",
      "indow",
      "indri",
      "indue",
      "inerm",
      "infix",
      "infos",
      "infra",
      "ingan",
      "ingle",
      "inion",
      "inked",
      "inker",
      "inkle",
      "inned",
      "innit",
      "inorb",
      "inrun",
      "inset",
      "inspo",
      "intel",
      "intil",
      "intis",
      "intra",
      "inula",
      "inure",
      "inurn",
      "inust",
      "invar",
      "inwit",
      "iodic",
      "iodid",
      "iodin",
      "iotas",
      "ippon",
      "irade",
      "irids",
      "iring",
      "irked",
      "iroko",
      "irone",
      "irons",
      "isbas",
      "ishes",
      "isled",
      "isles",
      "isnae",
      "issei",
      "istle",
      "items",
      "ither",
      "ivied",
      "ivies",
      "ixias",
      "ixnay",
      "ixora",
      "ixtle",
      "izard",
      "izars",
      "izzat",
      "jaaps",
      "jabot",
      "jacal",
      "jacks",
      "jacky",
      "jaded",
      "jades",
      "jafas",
      "jaffa",
      "jagas",
      "jager",
      "jaggs",
      "jaggy",
      "jagir",
      "jagra",
      "jails",
      "jaker",
      "jakes",
      "jakey",
      "jalap",
      "jalop",
      "jambe",
      "jambo",
      "jambs",
      "jambu",
      "james",
      "jammy",
      "jamon",
      "janes",
      "janns",
      "janny",
      "janty",
      "japan",
      "japed",
      "japer",
      "japes",
      "jarks",
      "jarls",
      "jarps",
      "jarta",
      "jarul",
      "jasey",
      "jaspe",
      "jasps",
      "jatos",
      "jauks",
      "jaups",
      "javas",
      "javel",
      "jawan",
      "jawed",
      "jaxie",
      "jeans",
      "jeats",
      "jebel",
      "jedis",
      "jeels",
      "jeely",
      "jeeps",
      "jeers",
      "jeeze",
      "jefes",
      "jeffs",
      "jehad",
      "jehus",
      "jelab",
      "jello",
      "jells",
      "jembe",
      "jemmy",
      "jenny",
      "jeons",
      "jerid",
      "jerks",
      "jerry",
      "jesse",
      "jests",
      "jesus",
      "jetes",
      "jeton",
      "jeune",
      "jewed",
      "jewie",
      "jhala",
      "jiaos",
      "jibba",
      "jibbs",
      "jibed",
      "jiber",
      "jibes",
      "jiffs",
      "jiggy",
      "jigot",
      "jihad",
      "jills",
      "jilts",
      "jimmy",
      "jimpy",
      "jingo",
      "jinks",
      "jinne",
      "jinni",
      "jinns",
      "jirds",
      "jirga",
      "jirre",
      "jisms",
      "jived",
      "jiver",
      "jives",
      "jivey",
      "jnana",
      "jobed",
      "jobes",
      "jocko",
      "jocks",
      "jocky",
      "jocos",
      "jodel",
      "joeys",
      "johns",
      "joins",
      "joked",
      "jokes",
      "jokey",
      "jokol",
      "joled",
      "joles",
      "jolls",
      "jolts",
      "jolty",
      "jomon",
      "jomos",
      "jones",
      "jongs",
      "jonty",
      "jooks",
      "joram",
      "jorum",
      "jotas",
      "jotty",
      "jotun",
      "joual",
      "jougs",
      "jouks",
      "joule",
      "jours",
      "jowar",
      "jowed",
      "jowls",
      "jowly",
      "joyed",
      "jubas",
      "jubes",
      "jucos",
      "judas",
      "judgy",
      "judos",
      "jugal",
      "jugum",
      "jujus",
      "juked",
      "jukes",
      "jukus",
      "julep",
      "jumar",
      "jumby",
      "jumps",
      "junco",
      "junks",
      "junky",
      "jupes",
      "jupon",
      "jural",
      "jurat",
      "jurel",
      "jures",
      "justs",
      "jutes",
      "jutty",
      "juves",
      "juvie",
      "kaama",
      "kabab",
      "kabar",
      "kabob",
      "kacha",
      "kacks",
      "kadai",
      "kades",
      "kadis",
      "kafir",
      "kagos",
      "kagus",
      "kahal",
      "kaiak",
      "kaids",
      "kaies",
      "kaifs",
      "kaika",
      "kaiks",
      "kails",
      "kaims",
      "kaing",
      "kains",
      "kakas",
      "kakis",
      "kalam",
      "kales",
      "kalif",
      "kalis",
      "kalpa",
      "kamas",
      "kames",
      "kamik",
      "kamis",
      "kamme",
      "kanae",
      "kanas",
      "kandy",
      "kaneh",
      "kanes",
      "kanga",
      "kangs",
      "kanji",
      "kants",
      "kanzu",
      "kaons",
      "kapas",
      "kaphs",
      "kapok",
      "kapow",
      "kapus",
      "kaput",
      "karas",
      "karat",
      "karks",
      "karns",
      "karoo",
      "karos",
      "karri",
      "karst",
      "karsy",
      "karts",
      "karzy",
      "kasha",
      "kasme",
      "katal",
      "katas",
      "katis",
      "katti",
      "kaugh",
      "kauri",
      "kauru",
      "kaury",
      "kaval",
      "kavas",
      "kawas",
      "kawau",
      "kawed",
      "kayle",
      "kayos",
      "kazis",
      "kazoo",
      "kbars",
      "kebar",
      "kebob",
      "kecks",
      "kedge",
      "kedgy",
      "keech",
      "keefs",
      "keeks",
      "keels",
      "keema",
      "keeno",
      "keens",
      "keeps",
      "keets",
      "keeve",
      "kefir",
      "kehua",
      "keirs",
      "kelep",
      "kelim",
      "kells",
      "kelly",
      "kelps",
      "kelpy",
      "kelts",
      "kelty",
      "kembo",
      "kembs",
      "kemps",
      "kempt",
      "kempy",
      "kenaf",
      "kench",
      "kendo",
      "kenos",
      "kente",
      "kents",
      "kepis",
      "kerbs",
      "kerel",
      "kerfs",
      "kerky",
      "kerma",
      "kerne",
      "kerns",
      "keros",
      "kerry",
      "kerve",
      "kesar",
      "kests",
      "ketas",
      "ketch",
      "ketes",
      "ketol",
      "kevel",
      "kevil",
      "kexes",
      "keyed",
      "keyer",
      "khadi",
      "khafs",
      "khans",
      "khaph",
      "khats",
      "khaya",
      "khazi",
      "kheda",
      "kheth",
      "khets",
      "khoja",
      "khors",
      "khoum",
      "khuds",
      "kiaat",
      "kiack",
      "kiang",
      "kibbe",
      "kibbi",
      "kibei",
      "kibes",
      "kibla",
      "kicks",
      "kicky",
      "kiddo",
      "kiddy",
      "kidel",
      "kidge",
      "kiefs",
      "kiers",
      "kieve",
      "kievs",
      "kight",
      "kikes",
      "kikoi",
      "kiley",
      "kilim",
      "kills",
      "kilns",
      "kilos",
      "kilps",
      "kilts",
      "kilty",
      "kimbo",
      "kinas",
      "kinda",
      "kinds",
      "kindy",
      "kines",
      "kings",
      "kinin",
      "kinks",
      "kinos",
      "kiore",
      "kipes",
      "kippa",
      "kipps",
      "kirby",
      "kirks",
      "kirns",
      "kirri",
      "kisan",
      "kissy",
      "kists",
      "kited",
      "kiter",
      "kites",
      "kithe",
      "kiths",
      "kitul",
      "kivas",
      "kiwis",
      "klang",
      "klaps",
      "klett",
      "klick",
      "klieg",
      "kliks",
      "klong",
      "kloof",
      "kluge",
      "klutz",
      "knags",
      "knaps",
      "knarl",
      "knars",
      "knaur",
      "knawe",
      "knees",
      "knell",
      "knish",
      "knits",
      "knive",
      "knobs",
      "knops",
      "knosp",
      "knots",
      "knout",
      "knowe",
      "knows",
      "knubs",
      "knurl",
      "knurr",
      "knurs",
      "knuts",
      "koans",
      "koaps",
      "koban",
      "kobos",
      "koels",
      "koffs",
      "kofta",
      "kogal",
      "kohas",
      "kohen",
      "kohls",
      "koine",
      "kojis",
      "kokam",
      "kokas",
      "koker",
      "kokra",
      "kokum",
      "kolas",
      "kolos",
      "kombu",
      "konbu",
      "kondo",
      "konks",
      "kooks",
      "kooky",
      "koori",
      "kopek",
      "kophs",
      "kopje",
      "koppa",
      "korai",
      "koran",
      "koras",
      "korat",
      "kores",
      "korma",
      "koros",
      "korun",
      "korus",
      "koses",
      "kotch",
      "kotos",
      "kotow",
      "koura",
      "kraal",
      "krabs",
      "kraft",
      "krais",
      "krait",
      "krang",
      "krans",
      "kranz",
      "kraut",
      "krays",
      "kreep",
      "kreng",
      "krewe",
      "krona",
      "krone",
      "kroon",
      "krubi",
      "krunk",
      "ksars",
      "kubie",
      "kudos",
      "kudus",
      "kudzu",
      "kufis",
      "kugel",
      "kuias",
      "kukri",
      "kukus",
      "kulak",
      "kulan",
      "kulas",
      "kulfi",
      "kumis",
      "kumys",
      "kuris",
      "kurre",
      "kurta",
      "kurus",
      "kusso",
      "kutas",
      "kutch",
      "kutis",
      "kutus",
      "kuzus",
      "kvass",
      "kvell",
      "kwela",
      "kyack",
      "kyaks",
      "kyang",
      "kyars",
      "kyats",
      "kybos",
      "kydst",
      "kyles",
      "kylie",
      "kylin",
      "kylix",
      "kyloe",
      "kynde",
      "kynds",
      "kypes",
      "kyrie",
      "kytes",
      "kythe",
      "laari",
      "labda",
      "labia",
      "labis",
      "labra",
      "laced",
      "lacer",
      "laces",
      "lacet",
      "lacey",
      "lacks",
      "laddy",
      "laded",
      "lader",
      "lades",
      "laers",
      "laevo",
      "lagan",
      "lahal",
      "lahar",
      "laich",
      "laics",
      "laids",
      "laigh",
      "laika",
      "laiks",
      "laird",
      "lairs",
      "lairy",
      "laith",
      "laity",
      "laked",
      "laker",
      "lakes",
      "lakhs",
      "lakin",
      "laksa",
      "laldy",
      "lalls",
      "lamas",
      "lambs",
      "lamby",
      "lamed",
      "lamer",
      "lames",
      "lamia",
      "lammy",
      "lamps",
      "lanai",
      "lanas",
      "lanch",
      "lande",
      "lands",
      "lanes",
      "lanks",
      "lants",
      "lapin",
      "lapis",
      "lapje",
      "larch",
      "lards",
      "lardy",
      "laree",
      "lares",
      "largo",
      "laris",
      "larks",
      "larky",
      "larns",
      "larnt",
      "larum",
      "lased",
      "laser",
      "lases",
      "lassi",
      "lassu",
      "lassy",
      "lasts",
      "latah",
      "lated",
      "laten",
      "latex",
      "lathi",
      "laths",
      "lathy",
      "latke",
      "latus",
      "lauan",
      "lauch",
      "lauds",
      "laufs",
      "laund",
      "laura",
      "laval",
      "lavas",
      "laved",
      "laver",
      "laves",
      "lavra",
      "lavvy",
      "lawed",
      "lawer",
      "lawin",
      "lawks",
      "lawns",
      "lawny",
      "laxed",
      "laxer",
      "laxes",
      "laxly",
      "layed",
      "layin",
      "layup",
      "lazar",
      "lazed",
      "lazes",
      "lazos",
      "lazzi",
      "lazzo",
      "leads",
      "leady",
      "leafs",
      "leaks",
      "leams",
      "leans",
      "leany",
      "leaps",
      "leare",
      "lears",
      "leary",
      "leats",
      "leavy",
      "leaze",
      "leben",
      "leccy",
      "ledes",
      "ledgy",
      "ledum",
      "leear",
      "leeks",
      "leeps",
      "leers",
      "leese",
      "leets",
      "leeze",
      "lefte",
      "lefts",
      "leger",
      "leges",
      "legge",
      "leggo",
      "legit",
      "lehrs",
      "lehua",
      "leirs",
      "leish",
      "leman",
      "lemed",
      "lemel",
      "lemes",
      "lemma",
      "lemme",
      "lends",
      "lenes",
      "lengs",
      "lenis",
      "lenos",
      "lense",
      "lenti",
      "lento",
      "leone",
      "lepid",
      "lepra",
      "lepta",
      "lered",
      "leres",
      "lerps",
      "lesbo",
      "leses",
      "lests",
      "letch",
      "lethe",
      "letup",
      "leuch",
      "leuco",
      "leuds",
      "leugh",
      "levas",
      "levee",
      "leves",
      "levin",
      "levis",
      "lewis",
      "lexes",
      "lexis",
      "lezes",
      "lezza",
      "lezzy",
      "liana",
      "liane",
      "liang",
      "liard",
      "liars",
      "liart",
      "liber",
      "libra",
      "libri",
      "lichi",
      "licht",
      "licit",
      "licks",
      "lidar",
      "lidos",
      "liefs",
      "liens",
      "liers",
      "lieus",
      "lieve",
      "lifer",
      "lifes",
      "lifts",
      "ligan",
      "liger",
      "ligge",
      "ligne",
      "liked",
      "liker",
      "likes",
      "likin",
      "lills",
      "lilos",
      "lilts",
      "liman",
      "limas",
      "limax",
      "limba",
      "limbi",
      "limbs",
      "limby",
      "limed",
      "limen",
      "limes",
      "limey",
      "limma",
      "limns",
      "limos",
      "limpa",
      "limps",
      "linac",
      "linch",
      "linds",
      "lindy",
      "lined",
      "lines",
      "liney",
      "linga",
      "lings",
      "lingy",
      "linin",
      "links",
      "linky",
      "linns",
      "linny",
      "linos",
      "lints",
      "linty",
      "linum",
      "linux",
      "lions",
      "lipas",
      "lipes",
      "lipin",
      "lipos",
      "lippy",
      "liras",
      "lirks",
      "lirot",
      "lisks",
      "lisle",
      "lisps",
      "lists",
      "litai",
      "litas",
      "lited",
      "liter",
      "lites",
      "litho",
      "liths",
      "litre",
      "lived",
      "liven",
      "lives",
      "livor",
      "livre",
      "llano",
      "loach",
      "loads",
      "loafs",
      "loams",
      "loans",
      "loast",
      "loave",
      "lobar",
      "lobed",
      "lobes",
      "lobos",
      "lobus",
      "loche",
      "lochs",
      "locie",
      "locis",
      "locks",
      "locos",
      "locum",
      "loden",
      "lodes",
      "loess",
      "lofts",
      "logan",
      "loges",
      "loggy",
      "logia",
      "logie",
      "logoi",
      "logon",
      "logos",
      "lohan",
      "loids",
      "loins",
      "loipe",
      "loirs",
      "lokes",
      "lolls",
      "lolly",
      "lolog",
      "lomas",
      "lomed",
      "lomes",
      "loner",
      "longa",
      "longe",
      "longs",
      "looby",
      "looed",
      "looey",
      "loofa",
      "loofs",
      "looie",
      "looks",
      "looky",
      "looms",
      "loons",
      "loony",
      "loops",
      "loord",
      "loots",
      "loped",
      "loper",
      "lopes",
      "loppy",
      "loral",
      "loran",
      "lords",
      "lordy",
      "lorel",
      "lores",
      "loric",
      "loris",
      "losed",
      "losel",
      "losen",
      "loses",
      "lossy",
      "lotah",
      "lotas",
      "lotes",
      "lotic",
      "lotos",
      "lotsa",
      "lotta",
      "lotte",
      "lotto",
      "lotus",
      "loued",
      "lough",
      "louie",
      "louis",
      "louma",
      "lound",
      "louns",
      "loupe",
      "loups",
      "loure",
      "lours",
      "loury",
      "louts",
      "lovat",
      "loved",
      "loves",
      "lovey",
      "lovie",
      "lowan",
      "lowed",
      "lowes",
      "lownd",
      "lowne",
      "lowns",
      "lowps",
      "lowry",
      "lowse",
      "lowts",
      "loxed",
      "loxes",
      "lozen",
      "luach",
      "luaus",
      "lubed",
      "lubes",
      "lubra",
      "luces",
      "lucks",
      "lucre",
      "ludes",
      "ludic",
      "ludos",
      "luffa",
      "luffs",
      "luged",
      "luger",
      "luges",
      "lulls",
      "lulus",
      "lumas",
      "lumbi",
      "lumme",
      "lummy",
      "lumps",
      "lunas",
      "lunes",
      "lunet",
      "lungi",
      "lungs",
      "lunks",
      "lunts",
      "lupin",
      "lured",
      "lurer",
      "lures",
      "lurex",
      "lurgi",
      "lurgy",
      "lurks",
      "lurry",
      "lurve",
      "luser",
      "lushy",
      "lusks",
      "lusts",
      "lusus",
      "lutea",
      "luted",
      "luter",
      "lutes",
      "luvvy",
      "luxed",
      "luxer",
      "luxes",
      "lweis",
      "lyams",
      "lyard",
      "lyart",
      "lyase",
      "lycea",
      "lycee",
      "lycra",
      "lymes",
      "lynch",
      "lynes",
      "lyres",
      "lysed",
      "lyses",
      "lysin",
      "lysis",
      "lysol",
      "lyssa",
      "lyted",
      "lytes",
      "lythe",
      "lytic",
      "lytta",
      "maaed",
      "maare",
      "maars",
      "mabes",
      "macas",
      "maced",
      "macer",
      "maces",
      "mache",
      "machi",
      "machs",
      "macks",
      "macle",
      "macon",
      "madge",
      "madid",
      "madre",
      "maerl",
      "mafic",
      "mages",
      "maggs",
      "magot",
      "magus",
      "mahoe",
      "mahua",
      "mahwa",
      "maids",
      "maiko",
      "maiks",
      "maile",
      "maill",
      "mails",
      "maims",
      "mains",
      "maire",
      "mairs",
      "maise",
      "maist",
      "makar",
      "makes",
      "makis",
      "makos",
      "malam",
      "malar",
      "malas",
      "malax",
      "males",
      "malic",
      "malik",
      "malis",
      "malls",
      "malms",
      "malmy",
      "malts",
      "malty",
      "malus",
      "malva",
      "malwa",
      "mamas",
      "mamba",
      "mamee",
      "mamey",
      "mamie",
      "manas",
      "manat",
      "mandi",
      "maneb",
      "maned",
      "maneh",
      "manes",
      "manet",
      "mangs",
      "manis",
      "manky",
      "manna",
      "manos",
      "manse",
      "manta",
      "manto",
      "manty",
      "manul",
      "manus",
      "mapau",
      "maqui",
      "marae",
      "marah",
      "maras",
      "marcs",
      "mardy",
      "mares",
      "marge",
      "margs",
      "maria",
      "marid",
      "marka",
      "marks",
      "marle",
      "marls",
      "marly",
      "marms",
      "maron",
      "maror",
      "marra",
      "marri",
      "marse",
      "marts",
      "marvy",
      "masas",
      "mased",
      "maser",
      "mases",
      "mashy",
      "masks",
      "massa",
      "massy",
      "masts",
      "masty",
      "masus",
      "matai",
      "mated",
      "mater",
      "mates",
      "maths",
      "matin",
      "matlo",
      "matte",
      "matts",
      "matza",
      "matzo",
      "mauby",
      "mauds",
      "mauls",
      "maund",
      "mauri",
      "mausy",
      "mauts",
      "mauzy",
      "maven",
      "mavie",
      "mavin",
      "mavis",
      "mawed",
      "mawks",
      "mawky",
      "mawns",
      "mawrs",
      "maxed",
      "maxes",
      "maxis",
      "mayan",
      "mayas",
      "mayed",
      "mayos",
      "mayst",
      "mazed",
      "mazer",
      "mazes",
      "mazey",
      "mazut",
      "mbira",
      "meads",
      "meals",
      "meane",
      "means",
      "meany",
      "meare",
      "mease",
      "meath",
      "meats",
      "mebos",
      "mechs",
      "mecks",
      "medii",
      "medle",
      "meeds",
      "meers",
      "meets",
      "meffs",
      "meins",
      "meint",
      "meiny",
      "meith",
      "mekka",
      "melas",
      "melba",
      "melds",
      "melic",
      "melik",
      "mells",
      "melts",
      "melty",
      "memes",
      "memos",
      "menad",
      "mends",
      "mened",
      "menes",
      "menge",
      "mengs",
      "mensa",
      "mense",
      "mensh",
      "menta",
      "mento",
      "menus",
      "meous",
      "meows",
      "merch",
      "mercs",
      "merde",
      "mered",
      "merel",
      "merer",
      "meres",
      "meril",
      "meris",
      "merks",
      "merle",
      "merls",
      "merse",
      "mesal",
      "mesas",
      "mesel",
      "meses",
      "meshy",
      "mesic",
      "mesne",
      "meson",
      "messy",
      "mesto",
      "meted",
      "metes",
      "metho",
      "meths",
      "metic",
      "metif",
      "metis",
      "metol",
      "metre",
      "meuse",
      "meved",
      "meves",
      "mewed",
      "mewls",
      "meynt",
      "mezes",
      "mezze",
      "mezzo",
      "mhorr",
      "miaou",
      "miaow",
      "miasm",
      "miaul",
      "micas",
      "miche",
      "micht",
      "micks",
      "micky",
      "micos",
      "micra",
      "middy",
      "midgy",
      "midis",
      "miens",
      "mieve",
      "miffs",
      "miffy",
      "mifty",
      "miggs",
      "mihas",
      "mihis",
      "miked",
      "mikes",
      "mikra",
      "mikva",
      "milch",
      "milds",
      "miler",
      "miles",
      "milfs",
      "milia",
      "milko",
      "milks",
      "mille",
      "mills",
      "milor",
      "milos",
      "milpa",
      "milts",
      "milty",
      "miltz",
      "mimed",
      "mimeo",
      "mimer",
      "mimes",
      "mimsy",
      "minae",
      "minar",
      "minas",
      "mincy",
      "minds",
      "mined",
      "mines",
      "minge",
      "mings",
      "mingy",
      "minis",
      "minke",
      "minks",
      "minny",
      "minos",
      "mints",
      "mired",
      "mires",
      "mirex",
      "mirid",
      "mirin",
      "mirks",
      "mirky",
      "mirly",
      "miros",
      "mirvs",
      "mirza",
      "misch",
      "misdo",
      "mises",
      "misgo",
      "misos",
      "missa",
      "mists",
      "misty",
      "mitch",
      "miter",
      "mites",
      "mitis",
      "mitre",
      "mitts",
      "mixed",
      "mixen",
      "mixer",
      "mixes",
      "mixte",
      "mixup",
      "mizen",
      "mizzy",
      "mneme",
      "moans",
      "moats",
      "mobby",
      "mobes",
      "mobey",
      "mobie",
      "moble",
      "mochi",
      "mochs",
      "mochy",
      "mocks",
      "moder",
      "modes",
      "modge",
      "modii",
      "modus",
      "moers",
      "mofos",
      "moggy",
      "mohel",
      "mohos",
      "mohrs",
      "mohua",
      "mohur",
      "moile",
      "moils",
      "moira",
      "moire",
      "moits",
      "mojos",
      "mokes",
      "mokis",
      "mokos",
      "molal",
      "molas",
      "molds",
      "moled",
      "moles",
      "molla",
      "molls",
      "molly",
      "molto",
      "molts",
      "molys",
      "momes",
      "momma",
      "mommy",
      "momus",
      "monad",
      "monal",
      "monas",
      "monde",
      "mondo",
      "moner",
      "mongo",
      "mongs",
      "monic",
      "monie",
      "monks",
      "monos",
      "monte",
      "monty",
      "moobs",
      "mooch",
      "moods",
      "mooed",
      "mooks",
      "moola",
      "mooli",
      "mools",
      "mooly",
      "moong",
      "moons",
      "moony",
      "moops",
      "moors",
      "moory",
      "moots",
      "moove",
      "moped",
      "moper",
      "mopes",
      "mopey",
      "moppy",
      "mopsy",
      "mopus",
      "morae",
      "moras",
      "morat",
      "moray",
      "morel",
      "mores",
      "moria",
      "morne",
      "morns",
      "morra",
      "morro",
      "morse",
      "morts",
      "mosed",
      "moses",
      "mosey",
      "mosks",
      "mosso",
      "moste",
      "mosts",
      "moted",
      "moten",
      "motes",
      "motet",
      "motey",
      "moths",
      "mothy",
      "motis",
      "motte",
      "motts",
      "motty",
      "motus",
      "motza",
      "mouch",
      "moues",
      "mould",
      "mouls",
      "moups",
      "moust",
      "mousy",
      "moved",
      "moves",
      "mowas",
      "mowed",
      "mowra",
      "moxas",
      "moxie",
      "moyas",
      "moyle",
      "moyls",
      "mozed",
      "mozes",
      "mozos",
      "mpret",
      "mucho",
      "mucic",
      "mucid",
      "mucin",
      "mucks",
      "mucor",
      "mucro",
      "mudge",
      "mudir",
      "mudra",
      "muffs",
      "mufti",
      "mugga",
      "muggs",
      "muggy",
      "muhly",
      "muids",
      "muils",
      "muirs",
      "muist",
      "mujik",
      "mulct",
      "muled",
      "mules",
      "muley",
      "mulga",
      "mulie",
      "mulla",
      "mulls",
      "mulse",
      "mulsh",
      "mumms",
      "mumps",
      "mumsy",
      "mumus",
      "munga",
      "munge",
      "mungo",
      "mungs",
      "munis",
      "munts",
      "muntu",
      "muons",
      "muras",
      "mured",
      "mures",
      "murex",
      "murid",
      "murks",
      "murls",
      "murly",
      "murra",
      "murre",
      "murri",
      "murrs",
      "murry",
      "murti",
      "murva",
      "musar",
      "musca",
      "mused",
      "muser",
      "muses",
      "muset",
      "musha",
      "musit",
      "musks",
      "musos",
      "musse",
      "mussy",
      "musth",
      "musts",
      "mutch",
      "muted",
      "muter",
      "mutes",
      "mutha",
      "mutis",
      "muton",
      "mutts",
      "muxed",
      "muxes",
      "muzak",
      "muzzy",
      "mvule",
      "myall",
      "mylar",
      "mynah",
      "mynas",
      "myoid",
      "myoma",
      "myope",
      "myops",
      "myopy",
      "mysid",
      "mythi",
      "myths",
      "mythy",
      "myxos",
      "mzees",
      "naams",
      "naans",
      "nabes",
      "nabis",
      "nabks",
      "nabla",
      "nabob",
      "nache",
      "nacho",
      "nacre",
      "nadas",
      "naeve",
      "naevi",
      "naffs",
      "nagas",
      "naggy",
      "nagor",
      "nahal",
      "naiad",
      "naifs",
      "naiks",
      "nails",
      "naira",
      "nairu",
      "naked",
      "naker",
      "nakfa",
      "nalas",
      "naled",
      "nalla",
      "named",
      "namer",
      "names",
      "namma",
      "namus",
      "nanas",
      "nance",
      "nancy",
      "nandu",
      "nanna",
      "nanos",
      "nanua",
      "napas",
      "naped",
      "napes",
      "napoo",
      "nappa",
      "nappe",
      "nappy",
      "naras",
      "narco",
      "narcs",
      "nards",
      "nares",
      "naric",
      "naris",
      "narks",
      "narky",
      "narre",
      "nashi",
      "natch",
      "nates",
      "natis",
      "natty",
      "nauch",
      "naunt",
      "navar",
      "naves",
      "navew",
      "navvy",
      "nawab",
      "nazes",
      "nazir",
      "nazis",
      "nduja",
      "neafe",
      "neals",
      "neaps",
      "nears",
      "neath",
      "neats",
      "nebek",
      "nebel",
      "necks",
      "neddy",
      "needs",
      "neeld",
      "neele",
      "neemb",
      "neems",
      "neeps",
      "neese",
      "neeze",
      "negro",
      "negus",
      "neifs",
      "neist",
      "neive",
      "nelis",
      "nelly",
      "nemas",
      "nemns",
      "nempt",
      "nenes",
      "neons",
      "neper",
      "nepit",
      "neral",
      "nerds",
      "nerka",
      "nerks",
      "nerol",
      "nerts",
      "nertz",
      "nervy",
      "nests",
      "netes",
      "netop",
      "netts",
      "netty",
      "neuks",
      "neume",
      "neums",
      "nevel",
      "neves",
      "nevus",
      "newbs",
      "newed",
      "newel",
      "newie",
      "newsy",
      "newts",
      "nexts",
      "nexus",
      "ngaio",
      "ngana",
      "ngati",
      "ngoma",
      "ngwee",
      "nicad",
      "nicht",
      "nicks",
      "nicol",
      "nidal",
      "nided",
      "nides",
      "nidor",
      "nidus",
      "niefs",
      "nieve",
      "nifes",
      "niffs",
      "niffy",
      "nifty",
      "niger",
      "nighs",
      "nihil",
      "nikab",
      "nikah",
      "nikau",
      "nills",
      "nimbi",
      "nimbs",
      "nimps",
      "niner",
      "nines",
      "ninon",
      "nipas",
      "nippy",
      "niqab",
      "nirls",
      "nirly",
      "nisei",
      "nisse",
      "nisus",
      "niter",
      "nites",
      "nitid",
      "niton",
      "nitre",
      "nitro",
      "nitry",
      "nitty",
      "nival",
      "nixed",
      "nixer",
      "nixes",
      "nixie",
      "nizam",
      "nkosi",
      "noahs",
      "nobby",
      "nocks",
      "nodal",
      "noddy",
      "nodes",
      "nodus",
      "noels",
      "noggs",
      "nohow",
      "noils",
      "noily",
      "noint",
      "noirs",
      "noles",
      "nolls",
      "nolos",
      "nomas",
      "nomen",
      "nomes",
      "nomic",
      "nomoi",
      "nomos",
      "nonas",
      "nonce",
      "nones",
      "nonet",
      "nongs",
      "nonis",
      "nonny",
      "nonyl",
      "noobs",
      "nooit",
      "nooks",
      "nooky",
      "noons",
      "noops",
      "nopal",
      "noria",
      "noris",
      "norks",
      "norma",
      "norms",
      "nosed",
      "noser",
      "noses",
      "notal",
      "noted",
      "noter",
      "notes",
      "notum",
      "nould",
      "noule",
      "nouls",
      "nouns",
      "nouny",
      "noups",
      "novae",
      "novas",
      "novum",
      "noway",
      "nowed",
      "nowls",
      "nowts",
      "nowty",
      "noxal",
      "noxes",
      "noyau",
      "noyed",
      "noyes",
      "nubby",
      "nubia",
      "nucha",
      "nuddy",
      "nuder",
      "nudes",
      "nudie",
      "nudzh",
      "nuffs",
      "nugae",
      "nuked",
      "nukes",
      "nulla",
      "nulls",
      "numbs",
      "numen",
      "nummy",
      "nunny",
      "nurds",
      "nurdy",
      "nurls",
      "nurrs",
      "nutso",
      "nutsy",
      "nyaff",
      "nyala",
      "nying",
      "nyssa",
      "oaked",
      "oaker",
      "oakum",
      "oared",
      "oases",
      "oasis",
      "oasts",
      "oaten",
      "oater",
      "oaths",
      "oaves",
      "obang",
      "obeah",
      "obeli",
      "obeys",
      "obias",
      "obied",
      "obiit",
      "obits",
      "objet",
      "oboes",
      "obole",
      "oboli",
      "obols",
      "occam",
      "ocher",
      "oches",
      "ochre",
      "ochry",
      "ocker",
      "ocrea",
      "octad",
      "octan",
      "octas",
      "octyl",
      "oculi",
      "odahs",
      "odals",
      "odeon",
      "odeum",
      "odism",
      "odist",
      "odium",
      "odors",
      "odour",
      "odyle",
      "odyls",
      "ofays",
      "offed",
      "offie",
      "oflag",
      "ofter",
      "ogams",
      "ogeed",
      "ogees",
      "oggin",
      "ogham",
      "ogive",
      "ogled",
      "ogler",
      "ogles",
      "ogmic",
      "ogres",
      "ohias",
      "ohing",
      "ohmic",
      "ohone",
      "oidia",
      "oiled",
      "oiler",
      "oinks",
      "oints",
      "ojime",
      "okapi",
      "okays",
      "okehs",
      "okras",
      "oktas",
      "oldie",
      "oleic",
      "olein",
      "olent",
      "oleos",
      "oleum",
      "olios",
      "ollas",
      "ollav",
      "oller",
      "ollie",
      "ology",
      "olpae",
      "olpes",
      "omasa",
      "omber",
      "ombus",
      "omens",
      "omers",
      "omits",
      "omlah",
      "omovs",
      "omrah",
      "oncer",
      "onces",
      "oncet",
      "oncus",
      "onely",
      "oners",
      "onery",
      "onium",
      "onkus",
      "onlay",
      "onned",
      "ontic",
      "oobit",
      "oohed",
      "oomph",
      "oonts",
      "ooped",
      "oorie",
      "ooses",
      "ootid",
      "oozed",
      "oozes",
      "opahs",
      "opals",
      "opens",
      "opepe",
      "oping",
      "oppos",
      "opsin",
      "opted",
      "opter",
      "orach",
      "oracy",
      "orals",
      "orang",
      "orant",
      "orate",
      "orbed",
      "orcas",
      "orcin",
      "ordos",
      "oread",
      "orfes",
      "orgia",
      "orgic",
      "orgue",
      "oribi",
      "oriel",
      "orixa",
      "orles",
      "orlon",
      "orlop",
      "ormer",
      "ornis",
      "orpin",
      "orris",
      "ortho",
      "orval",
      "orzos",
      "oscar",
      "oshac",
      "osier",
      "osmic",
      "osmol",
      "ossia",
      "ostia",
      "otaku",
      "otary",
      "ottar",
      "ottos",
      "oubit",
      "oucht",
      "ouens",
      "ouija",
      "oulks",
      "oumas",
      "oundy",
      "oupas",
      "ouped",
      "ouphe",
      "ouphs",
      "ourie",
      "ousel",
      "ousts",
      "outby",
      "outed",
      "outre",
      "outro",
      "outta",
      "ouzel",
      "ouzos",
      "ovals",
      "ovels",
      "ovens",
      "overs",
      "ovist",
      "ovoli",
      "ovolo",
      "ovule",
      "owche",
      "owies",
      "owled",
      "owler",
      "owlet",
      "owned",
      "owres",
      "owrie",
      "owsen",
      "oxbow",
      "oxers",
      "oxeye",
      "oxids",
      "oxies",
      "oxime",
      "oxims",
      "oxlip",
      "oxter",
      "oyers",
      "ozeki",
      "ozzie",
      "paals",
      "paans",
      "pacas",
      "paced",
      "pacer",
      "paces",
      "pacey",
      "pacha",
      "packs",
      "pacos",
      "pacta",
      "pacts",
      "padis",
      "padle",
      "padma",
      "padre",
      "padri",
      "paean",
      "paedo",
      "paeon",
      "paged",
      "pager",
      "pages",
      "pagle",
      "pagod",
      "pagri",
      "paiks",
      "pails",
      "pains",
      "paire",
      "pairs",
      "paisa",
      "paise",
      "pakka",
      "palas",
      "palay",
      "palea",
      "paled",
      "pales",
      "palet",
      "palis",
      "palki",
      "palla",
      "palls",
      "pally",
      "palms",
      "palmy",
      "palpi",
      "palps",
      "palsa",
      "pampa",
      "panax",
      "pance",
      "panda",
      "pands",
      "pandy",
      "paned",
      "panes",
      "panga",
      "pangs",
      "panim",
      "panko",
      "panne",
      "panni",
      "panto",
      "pants",
      "panty",
      "paoli",
      "paolo",
      "papas",
      "papaw",
      "papes",
      "pappi",
      "pappy",
      "parae",
      "paras",
      "parch",
      "pardi",
      "pards",
      "pardy",
      "pared",
      "paren",
      "pareo",
      "pares",
      "pareu",
      "parev",
      "parge",
      "pargo",
      "paris",
      "parki",
      "parks",
      "parky",
      "parle",
      "parly",
      "parma",
      "parol",
      "parps",
      "parra",
      "parrs",
      "parti",
      "parts",
      "parve",
      "parvo",
      "paseo",
      "pases",
      "pasha",
      "pashm",
      "paska",
      "paspy",
      "passe",
      "pasts",
      "pated",
      "paten",
      "pater",
      "pates",
      "paths",
      "patin",
      "patka",
      "patly",
      "patte",
      "patus",
      "pauas",
      "pauls",
      "pavan",
      "paved",
      "paven",
      "paver",
      "paves",
      "pavid",
      "pavin",
      "pavis",
      "pawas",
      "pawaw",
      "pawed",
      "pawer",
      "pawks",
      "pawky",
      "pawls",
      "pawns",
      "paxes",
      "payed",
      "payor",
      "paysd",
      "peage",
      "peags",
      "peaks",
      "peaky",
      "peals",
      "peans",
      "peare",
      "pears",
      "peart",
      "pease",
      "peats",
      "peaty",
      "peavy",
      "peaze",
      "pebas",
      "pechs",
      "pecke",
      "pecks",
      "pecky",
      "pedes",
      "pedis",
      "pedro",
      "peece",
      "peeks",
      "peels",
      "peens",
      "peeoy",
      "peepe",
      "peeps",
      "peers",
      "peery",
      "peeve",
      "peggy",
      "peghs",
      "peins",
      "peise",
      "peize",
      "pekan",
      "pekes",
      "pekin",
      "pekoe",
      "pelas",
      "pelau",
      "peles",
      "pelfs",
      "pells",
      "pelma",
      "pelon",
      "pelta",
      "pelts",
      "pends",
      "pendu",
      "pened",
      "penes",
      "pengo",
      "penie",
      "penis",
      "penks",
      "penna",
      "penni",
      "pents",
      "peons",
      "peony",
      "pepla",
      "pepos",
      "peppy",
      "pepsi",
      "perai",
      "perce",
      "percs",
      "perdu",
      "perdy",
      "perea",
      "peres",
      "peris",
      "perks",
      "perms",
      "perns",
      "perog",
      "perps",
      "perry",
      "perse",
      "perst",
      "perts",
      "perve",
      "pervo",
      "pervs",
      "pervy",
      "pesos",
      "pests",
      "pesty",
      "petar",
      "peter",
      "petit",
      "petre",
      "petri",
      "petti",
      "petto",
      "pewee",
      "pewit",
      "peyse",
      "phage",
      "phang",
      "phare",
      "pharm",
      "pheer",
      "phene",
      "pheon",
      "phese",
      "phial",
      "phish",
      "phizz",
      "phlox",
      "phoca",
      "phono",
      "phons",
      "phots",
      "phpht",
      "phuts",
      "phyla",
      "phyle",
      "piani",
      "pians",
      "pibal",
      "pical",
      "picas",
      "piccy",
      "picks",
      "picot",
      "picra",
      "picul",
      "piend",
      "piers",
      "piert",
      "pieta",
      "piets",
      "piezo",
      "pight",
      "pigmy",
      "piing",
      "pikas",
      "pikau",
      "piked",
      "piker",
      "pikes",
      "pikey",
      "pikis",
      "pikul",
      "pilae",
      "pilaf",
      "pilao",
      "pilar",
      "pilau",
      "pilaw",
      "pilch",
      "pilea",
      "piled",
      "pilei",
      "piler",
      "piles",
      "pilis",
      "pills",
      "pilow",
      "pilum",
      "pilus",
      "pimas",
      "pimps",
      "pinas",
      "pined",
      "pines",
      "pingo",
      "pings",
      "pinko",
      "pinks",
      "pinna",
      "pinny",
      "pinon",
      "pinot",
      "pinta",
      "pints",
      "pinup",
      "pions",
      "piony",
      "pious",
      "pioye",
      "pioys",
      "pipal",
      "pipas",
      "piped",
      "pipes",
      "pipet",
      "pipis",
      "pipit",
      "pippy",
      "pipul",
      "pirai",
      "pirls",
      "pirns",
      "pirog",
      "pisco",
      "pises",
      "pisky",
      "pisos",
      "pissy",
      "piste",
      "pitas",
      "piths",
      "piton",
      "pitot",
      "pitta",
      "piums",
      "pixes",
      "pized",
      "pizes",
      "plaas",
      "plack",
      "plage",
      "plans",
      "plaps",
      "plash",
      "plasm",
      "plast",
      "plats",
      "platt",
      "platy",
      "playa",
      "plays",
      "pleas",
      "plebe",
      "plebs",
      "plena",
      "pleon",
      "plesh",
      "plews",
      "plica",
      "plies",
      "plims",
      "pling",
      "plink",
      "ploat",
      "plods",
      "plong",
      "plonk",
      "plook",
      "plops",
      "plots",
      "plotz",
      "plouk",
      "plows",
      "ploye",
      "ploys",
      "plues",
      "pluff",
      "plugs",
      "plums",
      "plumy",
      "pluot",
      "pluto",
      "plyer",
      "poach",
      "poaka",
      "poake",
      "poboy",
      "pocks",
      "pocky",
      "podal",
      "poddy",
      "podex",
      "podge",
      "podgy",
      "podia",
      "poems",
      "poeps",
      "poets",
      "pogey",
      "pogge",
      "pogos",
      "pohed",
      "poilu",
      "poind",
      "pokal",
      "poked",
      "pokes",
      "pokey",
      "pokie",
      "poled",
      "poler",
      "poles",
      "poley",
      "polio",
      "polis",
      "polje",
      "polks",
      "polls",
      "polly",
      "polos",
      "polts",
      "polys",
      "pombe",
      "pomes",
      "pommy",
      "pomos",
      "pomps",
      "ponce",
      "poncy",
      "ponds",
      "pones",
      "poney",
      "ponga",
      "pongo",
      "pongs",
      "pongy",
      "ponks",
      "ponts",
      "ponty",
      "ponzu",
      "poods",
      "pooed",
      "poofs",
      "poofy",
      "poohs",
      "pooja",
      "pooka",
      "pooks",
      "pools",
      "poons",
      "poops",
      "poopy",
      "poori",
      "poort",
      "poots",
      "poove",
      "poovy",
      "popes",
      "poppa",
      "popsy",
      "porae",
      "poral",
      "pored",
      "porer",
      "pores",
      "porge",
      "porgy",
      "porin",
      "porks",
      "porky",
      "porno",
      "porns",
      "porny",
      "porta",
      "ports",
      "porty",
      "posed",
      "poses",
      "posey",
      "posho",
      "posts",
      "potae",
      "potch",
      "poted",
      "potes",
      "potin",
      "potoo",
      "potsy",
      "potto",
      "potts",
      "potty",
      "pouff",
      "poufs",
      "pouke",
      "pouks",
      "poule",
      "poulp",
      "poult",
      "poupe",
      "poupt",
      "pours",
      "pouts",
      "powan",
      "powin",
      "pownd",
      "powns",
      "powny",
      "powre",
      "poxed",
      "poxes",
      "poynt",
      "poyou",
      "poyse",
      "pozzy",
      "praam",
      "prads",
      "prahu",
      "prams",
      "prana",
      "prang",
      "praos",
      "prase",
      "prate",
      "prats",
      "pratt",
      "praty",
      "praus",
      "prays",
      "predy",
      "preed",
      "prees",
      "preif",
      "prems",
      "premy",
      "prent",
      "preon",
      "preop",
      "preps",
      "presa",
      "prese",
      "prest",
      "preve",
      "prexy",
      "preys",
      "prial",
      "pricy",
      "prief",
      "prier",
      "pries",
      "prigs",
      "prill",
      "prima",
      "primi",
      "primp",
      "prims",
      "primy",
      "prink",
      "prion",
      "prise",
      "priss",
      "proas",
      "probs",
      "prods",
      "proem",
      "profs",
      "progs",
      "proin",
      "proke",
      "prole",
      "proll",
      "promo",
      "proms",
      "pronk",
      "props",
      "prore",
      "proso",
      "pross",
      "prost",
      "prosy",
      "proto",
      "proul",
      "prows",
      "proyn",
      "prunt",
      "pruta",
      "pryer",
      "pryse",
      "pseud",
      "pshaw",
      "psion",
      "psoae",
      "psoai",
      "psoas",
      "psora",
      "psych",
      "psyop",
      "pubco",
      "pubes",
      "pubis",
      "pucan",
      "pucer",
      "puces",
      "pucka",
      "pucks",
      "puddy",
      "pudge",
      "pudic",
      "pudor",
      "pudsy",
      "pudus",
      "puers",
      "puffa",
      "puffs",
      "puggy",
      "pugil",
      "puhas",
      "pujah",
      "pujas",
      "pukas",
      "puked",
      "puker",
      "pukes",
      "pukey",
      "pukka",
      "pukus",
      "pulao",
      "pulas",
      "puled",
      "puler",
      "pules",
      "pulik",
      "pulis",
      "pulka",
      "pulks",
      "pulli",
      "pulls",
      "pully",
      "pulmo",
      "pulps",
      "pulus",
      "pumas",
      "pumie",
      "pumps",
      "punas",
      "punce",
      "punga",
      "pungs",
      "punji",
      "punka",
      "punks",
      "punky",
      "punny",
      "punto",
      "punts",
      "punty",
      "pupae",
      "pupal",
      "pupas",
      "pupus",
      "purda",
      "pured",
      "pures",
      "purin",
      "puris",
      "purls",
      "purpy",
      "purrs",
      "pursy",
      "purty",
      "puses",
      "pusle",
      "pussy",
      "putid",
      "puton",
      "putti",
      "putto",
      "putts",
      "puzel",
      "pwned",
      "pyats",
      "pyets",
      "pygal",
      "pyins",
      "pylon",
      "pyned",
      "pynes",
      "pyoid",
      "pyots",
      "pyral",
      "pyran",
      "pyres",
      "pyrex",
      "pyric",
      "pyros",
      "pyxed",
      "pyxes",
      "pyxie",
      "pyxis",
      "pzazz",
      "qadis",
      "qaids",
      "qajaq",
      "qanat",
      "qapik",
      "qibla",
      "qophs",
      "qorma",
      "quads",
      "quaff",
      "quags",
      "quair",
      "quais",
      "quaky",
      "quale",
      "quant",
      "quare",
      "quass",
      "quate",
      "quats",
      "quayd",
      "quays",
      "qubit",
      "quean",
      "queme",
      "quena",
      "quern",
      "queyn",
      "queys",
      "quich",
      "quids",
      "quiff",
      "quims",
      "quina",
      "quine",
      "quino",
      "quins",
      "quint",
      "quipo",
      "quips",
      "quipu",
      "quire",
      "quirt",
      "quist",
      "quits",
      "quoad",
      "quods",
      "quoif",
      "quoin",
      "quoit",
      "quoll",
      "quonk",
      "quops",
      "quran",
      "qursh",
      "quyte",
      "rabat",
      "rabic",
      "rabis",
      "raced",
      "races",
      "rache",
      "racks",
      "racon",
      "radge",
      "radix",
      "radon",
      "raffs",
      "rafts",
      "ragas",
      "ragde",
      "raged",
      "ragee",
      "rager",
      "rages",
      "ragga",
      "raggs",
      "raggy",
      "ragis",
      "ragus",
      "rahed",
      "rahui",
      "raias",
      "raids",
      "raiks",
      "raile",
      "rails",
      "raine",
      "rains",
      "raird",
      "raita",
      "raits",
      "rajas",
      "rajes",
      "raked",
      "rakee",
      "raker",
      "rakes",
      "rakia",
      "rakis",
      "rakus",
      "rales",
      "ramal",
      "ramee",
      "ramet",
      "ramie",
      "ramin",
      "ramis",
      "rammy",
      "ramps",
      "ramus",
      "ranas",
      "rance",
      "rands",
      "ranee",
      "ranga",
      "rangi",
      "rangs",
      "rangy",
      "ranid",
      "ranis",
      "ranke",
      "ranks",
      "rants",
      "raped",
      "raper",
      "rapes",
      "raphe",
      "rappe",
      "rared",
      "raree",
      "rares",
      "rarks",
      "rased",
      "raser",
      "rases",
      "rasps",
      "rasse",
      "rasta",
      "ratal",
      "ratan",
      "ratas",
      "ratch",
      "rated",
      "ratel",
      "rater",
      "rates",
      "ratha",
      "rathe",
      "raths",
      "ratoo",
      "ratos",
      "ratus",
      "rauns",
      "raupo",
      "raved",
      "ravel",
      "raver",
      "raves",
      "ravey",
      "ravin",
      "rawer",
      "rawin",
      "rawly",
      "rawns",
      "raxed",
      "raxes",
      "rayah",
      "rayas",
      "rayed",
      "rayle",
      "rayne",
      "razed",
      "razee",
      "razer",
      "razes",
      "razoo",
      "readd",
      "reads",
      "reais",
      "reaks",
      "realo",
      "reals",
      "reame",
      "reams",
      "reamy",
      "reans",
      "reaps",
      "rears",
      "reast",
      "reata",
      "reate",
      "reave",
      "rebbe",
      "rebec",
      "rebid",
      "rebit",
      "rebop",
      "rebuy",
      "recal",
      "recce",
      "recco",
      "reccy",
      "recit",
      "recks",
      "recon",
      "recta",
      "recti",
      "recto",
      "redan",
      "redds",
      "reddy",
      "reded",
      "redes",
      "redia",
      "redid",
      "redip",
      "redly",
      "redon",
      "redos",
      "redox",
      "redry",
      "redub",
      "redux",
      "redye",
      "reech",
      "reede",
      "reeds",
      "reefs",
      "reefy",
      "reeks",
      "reeky",
      "reels",
      "reens",
      "reest",
      "reeve",
      "refed",
      "refel",
      "reffo",
      "refis",
      "refix",
      "refly",
      "refry",
      "regar",
      "reges",
      "reggo",
      "regie",
      "regma",
      "regna",
      "regos",
      "regur",
      "rehem",
      "reifs",
      "reify",
      "reiki",
      "reiks",
      "reink",
      "reins",
      "reird",
      "reist",
      "reive",
      "rejig",
      "rejon",
      "reked",
      "rekes",
      "rekey",
      "relet",
      "relie",
      "relit",
      "rello",
      "reman",
      "remap",
      "remen",
      "remet",
      "remex",
      "remix",
      "renay",
      "rends",
      "reney",
      "renga",
      "renig",
      "renin",
      "renne",
      "renos",
      "rente",
      "rents",
      "reoil",
      "reorg",
      "repeg",
      "repin",
      "repla",
      "repos",
      "repot",
      "repps",
      "repro",
      "reran",
      "rerig",
      "resat",
      "resaw",
      "resay",
      "resee",
      "reses",
      "resew",
      "resid",
      "resit",
      "resod",
      "resow",
      "resto",
      "rests",
      "resty",
      "resus",
      "retag",
      "retax",
      "retem",
      "retia",
      "retie",
      "retox",
      "revet",
      "revie",
      "rewan",
      "rewax",
      "rewed",
      "rewet",
      "rewin",
      "rewon",
      "rewth",
      "rexes",
      "rezes",
      "rheas",
      "rheme",
      "rheum",
      "rhies",
      "rhime",
      "rhine",
      "rhody",
      "rhomb",
      "rhone",
      "rhumb",
      "rhyne",
      "rhyta",
      "riads",
      "rials",
      "riant",
      "riata",
      "ribas",
      "ribby",
      "ribes",
      "riced",
      "ricer",
      "rices",
      "ricey",
      "richt",
      "ricin",
      "ricks",
      "rides",
      "ridgy",
      "ridic",
      "riels",
      "riems",
      "rieve",
      "rifer",
      "riffs",
      "rifte",
      "rifts",
      "rifty",
      "riggs",
      "rigol",
      "riled",
      "riles",
      "riley",
      "rille",
      "rills",
      "rimae",
      "rimed",
      "rimer",
      "rimes",
      "rimus",
      "rinds",
      "rindy",
      "rines",
      "rings",
      "rinks",
      "rioja",
      "riots",
      "riped",
      "ripes",
      "ripps",
      "rises",
      "rishi",
      "risks",
      "risps",
      "risus",
      "rites",
      "ritts",
      "ritzy",
      "rivas",
      "rived",
      "rivel",
      "riven",
      "rives",
      "riyal",
      "rizas",
      "roads",
      "roams",
      "roans",
      "roars",
      "roary",
      "roate",
      "robed",
      "robes",
      "roble",
      "rocks",
      "roded",
      "rodes",
      "roguy",
      "rohes",
      "roids",
      "roils",
      "roily",
      "roins",
      "roist",
      "rojak",
      "rojis",
      "roked",
      "roker",
      "rokes",
      "rolag",
      "roles",
      "rolfs",
      "rolls",
      "romal",
      "roman",
      "romeo",
      "romps",
      "ronde",
      "rondo",
      "roneo",
      "rones",
      "ronin",
      "ronne",
      "ronte",
      "ronts",
      "roods",
      "roofs",
      "roofy",
      "rooks",
      "rooky",
      "rooms",
      "roons",
      "roops",
      "roopy",
      "roosa",
      "roose",
      "roots",
      "rooty",
      "roped",
      "roper",
      "ropes",
      "ropey",
      "roque",
      "roral",
      "rores",
      "roric",
      "rorid",
      "rorie",
      "rorts",
      "rorty",
      "rosed",
      "roses",
      "roset",
      "roshi",
      "rosin",
      "rosit",
      "rosti",
      "rosts",
      "rotal",
      "rotan",
      "rotas",
      "rotch",
      "roted",
      "rotes",
      "rotis",
      "rotls",
      "roton",
      "rotos",
      "rotte",
      "rouen",
      "roues",
      "roule",
      "rouls",
      "roums",
      "roups",
      "roupy",
      "roust",
      "routh",
      "routs",
      "roved",
      "roven",
      "roves",
      "rowan",
      "rowed",
      "rowel",
      "rowen",
      "rowie",
      "rowme",
      "rownd",
      "rowth",
      "rowts",
      "royne",
      "royst",
      "rozet",
      "rozit",
      "ruana",
      "rubai",
      "rubby",
      "rubel",
      "rubes",
      "rubin",
      "ruble",
      "rubli",
      "rubus",
      "ruche",
      "rucks",
      "rudas",
      "rudds",
      "rudes",
      "rudie",
      "rudis",
      "rueda",
      "ruers",
      "ruffe",
      "ruffs",
      "rugae",
      "rugal",
      "ruggy",
      "ruing",
      "ruins",
      "rukhs",
      "ruled",
      "rules",
      "rumal",
      "rumbo",
      "rumen",
      "rumes",
      "rumly",
      "rummy",
      "rumpo",
      "rumps",
      "rumpy",
      "runch",
      "runds",
      "runed",
      "runes",
      "rungs",
      "runic",
      "runny",
      "runts",
      "runty",
      "rupia",
      "rurps",
      "rurus",
      "rusas",
      "ruses",
      "rushy",
      "rusks",
      "rusma",
      "russe",
      "rusts",
      "ruths",
      "rutin",
      "rutty",
      "ryals",
      "rybat",
      "ryked",
      "rykes",
      "rymme",
      "rynds",
      "ryots",
      "ryper",
      "saags",
      "sabal",
      "sabed",
      "saber",
      "sabes",
      "sabha",
      "sabin",
      "sabir",
      "sable",
      "sabot",
      "sabra",
      "sabre",
      "sacks",
      "sacra",
      "saddo",
      "sades",
      "sadhe",
      "sadhu",
      "sadis",
      "sados",
      "sadza",
      "safed",
      "safes",
      "sagas",
      "sager",
      "sages",
      "saggy",
      "sagos",
      "sagum",
      "saheb",
      "sahib",
      "saice",
      "saick",
      "saics",
      "saids",
      "saiga",
      "sails",
      "saims",
      "saine",
      "sains",
      "sairs",
      "saist",
      "saith",
      "sajou",
      "sakai",
      "saker",
      "sakes",
      "sakia",
      "sakis",
      "sakti",
      "salal",
      "salat",
      "salep",
      "sales",
      "salet",
      "salic",
      "salix",
      "salle",
      "salmi",
      "salol",
      "salop",
      "salpa",
      "salps",
      "salse",
      "salto",
      "salts",
      "salue",
      "salut",
      "saman",
      "samas",
      "samba",
      "sambo",
      "samek",
      "samel",
      "samen",
      "sames",
      "samey",
      "samfu",
      "sammy",
      "sampi",
      "samps",
      "sands",
      "saned",
      "sanes",
      "sanga",
      "sangh",
      "sango",
      "sangs",
      "sanko",
      "sansa",
      "santo",
      "sants",
      "saola",
      "sapan",
      "sapid",
      "sapor",
      "saran",
      "sards",
      "sared",
      "saree",
      "sarge",
      "sargo",
      "sarin",
      "saris",
      "sarks",
      "sarky",
      "sarod",
      "saros",
      "sarus",
      "saser",
      "sasin",
      "sasse",
      "satai",
      "satay",
      "sated",
      "satem",
      "sates",
      "satis",
      "sauba",
      "sauch",
      "saugh",
      "sauls",
      "sault",
      "saunt",
      "saury",
      "sauts",
      "saved",
      "saver",
      "saves",
      "savey",
      "savin",
      "sawah",
      "sawed",
      "sawer",
      "saxes",
      "sayed",
      "sayer",
      "sayid",
      "sayne",
      "sayon",
      "sayst",
      "sazes",
      "scabs",
      "scads",
      "scaff",
      "scags",
      "scail",
      "scala",
      "scall",
      "scams",
      "scand",
      "scans",
      "scapa",
      "scape",
      "scapi",
      "scarp",
      "scars",
      "scart",
      "scath",
      "scats",
      "scatt",
      "scaud",
      "scaup",
      "scaur",
      "scaws",
      "sceat",
      "scena",
      "scend",
      "schav",
      "schmo",
      "schul",
      "schwa",
      "sclim",
      "scody",
      "scogs",
      "scoog",
      "scoot",
      "scopa",
      "scops",
      "scots",
      "scoug",
      "scoup",
      "scowp",
      "scows",
      "scrab",
      "scrae",
      "scrag",
      "scran",
      "scrat",
      "scraw",
      "scray",
      "scrim",
      "scrip",
      "scrob",
      "scrod",
      "scrog",
      "scrow",
      "scudi",
      "scudo",
      "scuds",
      "scuff",
      "scuft",
      "scugs",
      "sculk",
      "scull",
      "sculp",
      "sculs",
      "scums",
      "scups",
      "scurf",
      "scurs",
      "scuse",
      "scuta",
      "scute",
      "scuts",
      "scuzz",
      "scyes",
      "sdayn",
      "sdein",
      "seals",
      "seame",
      "seams",
      "seamy",
      "seans",
      "seare",
      "sears",
      "sease",
      "seats",
      "seaze",
      "sebum",
      "secco",
      "sechs",
      "sects",
      "seder",
      "sedes",
      "sedge",
      "sedgy",
      "sedum",
      "seeds",
      "seeks",
      "seeld",
      "seels",
      "seely",
      "seems",
      "seeps",
      "seepy",
      "seers",
      "sefer",
      "segar",
      "segni",
      "segno",
      "segol",
      "segos",
      "sehri",
      "seifs",
      "seils",
      "seine",
      "seirs",
      "seise",
      "seism",
      "seity",
      "seiza",
      "sekos",
      "sekts",
      "selah",
      "seles",
      "selfs",
      "sella",
      "selle",
      "sells",
      "selva",
      "semee",
      "semes",
      "semie",
      "semis",
      "senas",
      "sends",
      "senes",
      "sengi",
      "senna",
      "senor",
      "sensa",
      "sensi",
      "sente",
      "senti",
      "sents",
      "senvy",
      "senza",
      "sepad",
      "sepal",
      "sepic",
      "sepoy",
      "septa",
      "septs",
      "serac",
      "serai",
      "seral",
      "sered",
      "serer",
      "seres",
      "serfs",
      "serge",
      "seric",
      "serin",
      "serks",
      "seron",
      "serow",
      "serra",
      "serre",
      "serrs",
      "serry",
      "servo",
      "sesey",
      "sessa",
      "setae",
      "setal",
      "seton",
      "setts",
      "sewan",
      "sewar",
      "sewed",
      "sewel",
      "sewen",
      "sewin",
      "sexed",
      "sexer",
      "sexes",
      "sexto",
      "sexts",
      "seyen",
      "shads",
      "shags",
      "shahs",
      "shako",
      "shakt",
      "shalm",
      "shaly",
      "shama",
      "shams",
      "shand",
      "shans",
      "shaps",
      "sharn",
      "shash",
      "shaul",
      "shawm",
      "shawn",
      "shaws",
      "shaya",
      "shays",
      "shchi",
      "sheaf",
      "sheal",
      "sheas",
      "sheds",
      "sheel",
      "shend",
      "shent",
      "sheol",
      "sherd",
      "shere",
      "shero",
      "shets",
      "sheva",
      "shewn",
      "shews",
      "shiai",
      "shiel",
      "shier",
      "shies",
      "shill",
      "shily",
      "shims",
      "shins",
      "ships",
      "shirr",
      "shirs",
      "shish",
      "shiso",
      "shist",
      "shite",
      "shits",
      "shiur",
      "shiva",
      "shive",
      "shivs",
      "shlep",
      "shlub",
      "shmek",
      "shmoe",
      "shoat",
      "shoed",
      "shoer",
      "shoes",
      "shogi",
      "shogs",
      "shoji",
      "shojo",
      "shola",
      "shool",
      "shoon",
      "shoos",
      "shope",
      "shops",
      "shorl",
      "shote",
      "shots",
      "shott",
      "showd",
      "shows",
      "shoyu",
      "shred",
      "shris",
      "shrow",
      "shtik",
      "shtum",
      "shtup",
      "shule",
      "shuln",
      "shuls",
      "shuns",
      "shura",
      "shute",
      "shuts",
      "shwas",
      "shyer",
      "sials",
      "sibbs",
      "sibyl",
      "sices",
      "sicht",
      "sicko",
      "sicks",
      "sicky",
      "sidas",
      "sided",
      "sider",
      "sides",
      "sidha",
      "sidhe",
      "sidle",
      "sield",
      "siens",
      "sient",
      "sieth",
      "sieur",
      "sifts",
      "sighs",
      "sigil",
      "sigla",
      "signa",
      "signs",
      "sijos",
      "sikas",
      "siker",
      "sikes",
      "silds",
      "siled",
      "silen",
      "siler",
      "siles",
      "silex",
      "silks",
      "sills",
      "silos",
      "silts",
      "silty",
      "silva",
      "simar",
      "simas",
      "simba",
      "simis",
      "simps",
      "simul",
      "sinds",
      "sined",
      "sines",
      "sings",
      "sinhs",
      "sinks",
      "sinky",
      "sinus",
      "siped",
      "sipes",
      "sippy",
      "sired",
      "siree",
      "sires",
      "sirih",
      "siris",
      "siroc",
      "sirra",
      "sirup",
      "sisal",
      "sises",
      "sista",
      "sists",
      "sitar",
      "sited",
      "sites",
      "sithe",
      "sitka",
      "situp",
      "situs",
      "siver",
      "sixer",
      "sixes",
      "sixmo",
      "sixte",
      "sizar",
      "sized",
      "sizel",
      "sizer",
      "sizes",
      "skags",
      "skail",
      "skald",
      "skank",
      "skart",
      "skats",
      "skatt",
      "skaws",
      "skean",
      "skear",
      "skeds",
      "skeed",
      "skeef",
      "skeen",
      "skeer",
      "skees",
      "skeet",
      "skegg",
      "skegs",
      "skein",
      "skelf",
      "skell",
      "skelm",
      "skelp",
      "skene",
      "skens",
      "skeos",
      "skeps",
      "skers",
      "skets",
      "skews",
      "skids",
      "skied",
      "skies",
      "skiey",
      "skimo",
      "skims",
      "skink",
      "skins",
      "skint",
      "skios",
      "skips",
      "skirl",
      "skirr",
      "skite",
      "skits",
      "skive",
      "skivy",
      "sklim",
      "skoal",
      "skody",
      "skoff",
      "skogs",
      "skols",
      "skool",
      "skort",
      "skosh",
      "skran",
      "skrik",
      "skuas",
      "skugs",
      "skyed",
      "skyer",
      "skyey",
      "skyfs",
      "skyre",
      "skyrs",
      "skyte",
      "slabs",
      "slade",
      "slaes",
      "slags",
      "slaid",
      "slake",
      "slams",
      "slane",
      "slank",
      "slaps",
      "slart",
      "slats",
      "slaty",
      "slave",
      "slaws",
      "slays",
      "slebs",
      "sleds",
      "sleer",
      "slews",
      "sleys",
      "slier",
      "slily",
      "slims",
      "slipe",
      "slips",
      "slipt",
      "slish",
      "slits",
      "slive",
      "sloan",
      "slobs",
      "sloes",
      "slogs",
      "sloid",
      "slojd",
      "slomo",
      "sloom",
      "sloot",
      "slops",
      "slopy",
      "slorm",
      "slots",
      "slove",
      "slows",
      "sloyd",
      "slubb",
      "slubs",
      "slued",
      "slues",
      "sluff",
      "slugs",
      "sluit",
      "slums",
      "slurb",
      "slurs",
      "sluse",
      "sluts",
      "slyer",
      "slype",
      "smaak",
      "smaik",
      "smalm",
      "smalt",
      "smarm",
      "smaze",
      "smeek",
      "smees",
      "smeik",
      "smeke",
      "smerk",
      "smews",
      "smirr",
      "smirs",
      "smits",
      "smogs",
      "smoko",
      "smolt",
      "smoor",
      "smoot",
      "smore",
      "smorg",
      "smout",
      "smowt",
      "smugs",
      "smurs",
      "smush",
      "smuts",
      "snabs",
      "snafu",
      "snags",
      "snaps",
      "snarf",
      "snark",
      "snars",
      "snary",
      "snash",
      "snath",
      "snaws",
      "snead",
      "sneap",
      "snebs",
      "sneck",
      "sneds",
      "sneed",
      "snees",
      "snell",
      "snibs",
      "snick",
      "snies",
      "snift",
      "snigs",
      "snips",
      "snipy",
      "snirt",
      "snits",
      "snobs",
      "snods",
      "snoek",
      "snoep",
      "snogs",
      "snoke",
      "snood",
      "snook",
      "snool",
      "snoot",
      "snots",
      "snowk",
      "snows",
      "snubs",
      "snugs",
      "snush",
      "snyes",
      "soaks",
      "soaps",
      "soare",
      "soars",
      "soave",
      "sobas",
      "socas",
      "soces",
      "socko",
      "socks",
      "socle",
      "sodas",
      "soddy",
      "sodic",
      "sodom",
      "sofar",
      "sofas",
      "softa",
      "softs",
      "softy",
      "soger",
      "sohur",
      "soils",
      "soily",
      "sojas",
      "sojus",
      "sokah",
      "soken",
      "sokes",
      "sokol",
      "solah",
      "solan",
      "solas",
      "solde",
      "soldi",
      "soldo",
      "solds",
      "soled",
      "solei",
      "soler",
      "soles",
      "solon",
      "solos",
      "solum",
      "solus",
      "soman",
      "somas",
      "sonce",
      "sonde",
      "sones",
      "songs",
      "sonly",
      "sonne",
      "sonny",
      "sonse",
      "sonsy",
      "sooey",
      "sooks",
      "sooky",
      "soole",
      "sools",
      "sooms",
      "soops",
      "soote",
      "soots",
      "sophs",
      "sophy",
      "sopor",
      "soppy",
      "sopra",
      "soral",
      "soras",
      "sorbo",
      "sorbs",
      "sorda",
      "sordo",
      "sords",
      "sored",
      "soree",
      "sorel",
      "sorer",
      "sores",
      "sorex",
      "sorgo",
      "sorns",
      "sorra",
      "sorta",
      "sorts",
      "sorus",
      "soths",
      "sotol",
      "souce",
      "souct",
      "sough",
      "souks",
      "souls",
      "soums",
      "soups",
      "soupy",
      "sours",
      "souse",
      "souts",
      "sowar",
      "sowce",
      "sowed",
      "sowff",
      "sowfs",
      "sowle",
      "sowls",
      "sowms",
      "sownd",
      "sowne",
      "sowps",
      "sowse",
      "sowth",
      "soyas",
      "soyle",
      "soyuz",
      "sozin",
      "spacy",
      "spado",
      "spaed",
      "spaer",
      "spaes",
      "spags",
      "spahi",
      "spail",
      "spain",
      "spait",
      "spake",
      "spald",
      "spale",
      "spall",
      "spalt",
      "spams",
      "spane",
      "spang",
      "spans",
      "spard",
      "spars",
      "spart",
      "spate",
      "spats",
      "spaul",
      "spawl",
      "spaws",
      "spayd",
      "spays",
      "spaza",
      "spazz",
      "speal",
      "spean",
      "speat",
      "specs",
      "spect",
      "speel",
      "speer",
      "speil",
      "speir",
      "speks",
      "speld",
      "spelk",
      "speos",
      "spets",
      "speug",
      "spews",
      "spewy",
      "spial",
      "spica",
      "spick",
      "spics",
      "spide",
      "spier",
      "spies",
      "spiff",
      "spifs",
      "spiks",
      "spile",
      "spims",
      "spina",
      "spink",
      "spins",
      "spirt",
      "spiry",
      "spits",
      "spitz",
      "spivs",
      "splay",
      "splog",
      "spode",
      "spods",
      "spoom",
      "spoor",
      "spoot",
      "spork",
      "sposh",
      "spots",
      "sprad",
      "sprag",
      "sprat",
      "spred",
      "sprew",
      "sprit",
      "sprod",
      "sprog",
      "sprue",
      "sprug",
      "spuds",
      "spued",
      "spuer",
      "spues",
      "spugs",
      "spule",
      "spume",
      "spumy",
      "spurs",
      "sputa",
      "spyal",
      "spyre",
      "squab",
      "squaw",
      "squeg",
      "squid",
      "squit",
      "squiz",
      "stabs",
      "stade",
      "stags",
      "stagy",
      "staig",
      "stane",
      "stang",
      "staph",
      "staps",
      "starn",
      "starr",
      "stars",
      "stats",
      "staun",
      "staws",
      "stays",
      "stean",
      "stear",
      "stedd",
      "stede",
      "steds",
      "steek",
      "steem",
      "steen",
      "steil",
      "stela",
      "stele",
      "stell",
      "steme",
      "stems",
      "stend",
      "steno",
      "stens",
      "stent",
      "steps",
      "stept",
      "stere",
      "stets",
      "stews",
      "stewy",
      "steys",
      "stich",
      "stied",
      "sties",
      "stilb",
      "stile",
      "stime",
      "stims",
      "stimy",
      "stipa",
      "stipe",
      "stire",
      "stirk",
      "stirp",
      "stirs",
      "stive",
      "stivy",
      "stoae",
      "stoai",
      "stoas",
      "stoat",
      "stobs",
      "stoep",
      "stogy",
      "stoit",
      "stoln",
      "stoma",
      "stond",
      "stong",
      "stonk",
      "stonn",
      "stook",
      "stoor",
      "stope",
      "stops",
      "stopt",
      "stoss",
      "stots",
      "stott",
      "stoun",
      "stoup",
      "stour",
      "stown",
      "stowp",
      "stows",
      "strad",
      "strae",
      "strag",
      "strak",
      "strep",
      "strew",
      "stria",
      "strig",
      "strim",
      "strop",
      "strow",
      "stroy",
      "strum",
      "stubs",
      "stude",
      "studs",
      "stull",
      "stulm",
      "stumm",
      "stums",
      "stuns",
      "stupa",
      "stupe",
      "sture",
      "sturt",
      "styed",
      "styes",
      "styli",
      "stylo",
      "styme",
      "stymy",
      "styre",
      "styte",
      "subah",
      "subas",
      "subby",
      "suber",
      "subha",
      "succi",
      "sucks",
      "sucky",
      "sucre",
      "sudds",
      "sudor",
      "sudsy",
      "suede",
      "suent",
      "suers",
      "suete",
      "suets",
      "suety",
      "sugan",
      "sughs",
      "sugos",
      "suhur",
      "suids",
      "suint",
      "suits",
      "sujee",
      "sukhs",
      "sukuk",
      "sulci",
      "sulfa",
      "sulfo",
      "sulks",
      "sulph",
      "sulus",
      "sumis",
      "summa",
      "sumos",
      "sumph",
      "sumps",
      "sunis",
      "sunks",
      "sunna",
      "sunns",
      "sunup",
      "supes",
      "supra",
      "surah",
      "sural",
      "suras",
      "surat",
      "surds",
      "sured",
      "sures",
      "surfs",
      "surfy",
      "surgy",
      "surra",
      "sused",
      "suses",
      "susus",
      "sutor",
      "sutra",
      "sutta",
      "swabs",
      "swack",
      "swads",
      "swage",
      "swags",
      "swail",
      "swain",
      "swale",
      "swaly",
      "swamy",
      "swang",
      "swank",
      "swans",
      "swaps",
      "swapt",
      "sward",
      "sware",
      "swarf",
      "swart",
      "swats",
      "swayl",
      "sways",
      "sweal",
      "swede",
      "sweed",
      "sweel",
      "sweer",
      "swees",
      "sweir",
      "swelt",
      "swerf",
      "sweys",
      "swies",
      "swigs",
      "swile",
      "swims",
      "swink",
      "swipe",
      "swire",
      "swiss",
      "swith",
      "swits",
      "swive",
      "swizz",
      "swobs",
      "swole",
      "swoln",
      "swops",
      "swopt",
      "swots",
      "swoun",
      "sybbe",
      "sybil",
      "syboe",
      "sybow",
      "sycee",
      "syces",
      "sycon",
      "syens",
      "syker",
      "sykes",
      "sylis",
      "sylph",
      "sylva",
      "symar",
      "synch",
      "syncs",
      "synds",
      "syned",
      "synes",
      "synth",
      "syped",
      "sypes",
      "syphs",
      "syrah",
      "syren",
      "sysop",
      "sythe",
      "syver",
      "taals",
      "taata",
      "taber",
      "tabes",
      "tabid",
      "tabis",
      "tabla",
      "tabor",
      "tabun",
      "tabus",
      "tacan",
      "taces",
      "tacet",
      "tache",
      "tacho",
      "tachs",
      "tacks",
      "tacos",
      "tacts",
      "taels",
      "tafia",
      "taggy",
      "tagma",
      "tahas",
      "tahrs",
      "taiga",
      "taigs",
      "taiko",
      "tails",
      "tains",
      "taira",
      "taish",
      "taits",
      "tajes",
      "takas",
      "takes",
      "takhi",
      "takin",
      "takis",
      "takky",
      "talak",
      "talaq",
      "talar",
      "talas",
      "talcs",
      "talcy",
      "talea",
      "taler",
      "tales",
      "talks",
      "talky",
      "talls",
      "talma",
      "talpa",
      "taluk",
      "talus",
      "tamal",
      "tamed",
      "tames",
      "tamin",
      "tamis",
      "tammy",
      "tamps",
      "tanas",
      "tanga",
      "tangi",
      "tangs",
      "tanhs",
      "tanka",
      "tanks",
      "tanky",
      "tanna",
      "tansy",
      "tanti",
      "tanto",
      "tanty",
      "tapas",
      "taped",
      "tapen",
      "tapes",
      "tapet",
      "tapis",
      "tappa",
      "tapus",
      "taras",
      "tardo",
      "tared",
      "tares",
      "targa",
      "targe",
      "tarns",
      "taroc",
      "tarok",
      "taros",
      "tarps",
      "tarre",
      "tarry",
      "tarsi",
      "tarts",
      "tarty",
      "tasar",
      "tased",
      "taser",
      "tases",
      "tasks",
      "tassa",
      "tasse",
      "tasso",
      "tatar",
      "tater",
      "tates",
      "taths",
      "tatie",
      "tatou",
      "tatts",
      "tatus",
      "taube",
      "tauld",
      "tauon",
      "taupe",
      "tauts",
      "tavah",
      "tavas",
      "taver",
      "tawai",
      "tawas",
      "tawed",
      "tawer",
      "tawie",
      "tawse",
      "tawts",
      "taxed",
      "taxer",
      "taxes",
      "taxis",
      "taxol",
      "taxon",
      "taxor",
      "taxus",
      "tayra",
      "tazza",
      "tazze",
      "teade",
      "teads",
      "teaed",
      "teaks",
      "teals",
      "teams",
      "tears",
      "teats",
      "teaze",
      "techs",
      "techy",
      "tecta",
      "teels",
      "teems",
      "teend",
      "teene",
      "teens",
      "teeny",
      "teers",
      "teffs",
      "teggs",
      "tegua",
      "tegus",
      "tehrs",
      "teiid",
      "teils",
      "teind",
      "teins",
      "telae",
      "telco",
      "teles",
      "telex",
      "telia",
      "telic",
      "tells",
      "telly",
      "teloi",
      "telos",
      "temed",
      "temes",
      "tempi",
      "temps",
      "tempt",
      "temse",
      "tench",
      "tends",
      "tendu",
      "tenes",
      "tenge",
      "tenia",
      "tenne",
      "tenno",
      "tenny",
      "tenon",
      "tents",
      "tenty",
      "tenue",
      "tepal",
      "tepas",
      "tepoy",
      "terai",
      "teras",
      "terce",
      "terek",
      "teres",
      "terfe",
      "terfs",
      "terga",
      "terms",
      "terne",
      "terns",
      "terry",
      "terts",
      "tesla",
      "testa",
      "teste",
      "tests",
      "tetes",
      "teths",
      "tetra",
      "tetri",
      "teuch",
      "teugh",
      "tewed",
      "tewel",
      "tewit",
      "texas",
      "texes",
      "texts",
      "thack",
      "thagi",
      "thaim",
      "thale",
      "thali",
      "thana",
      "thane",
      "thang",
      "thans",
      "thanx",
      "tharm",
      "thars",
      "thaws",
      "thawy",
      "thebe",
      "theca",
      "theed",
      "theek",
      "thees",
      "thegn",
      "theic",
      "thein",
      "thelf",
      "thema",
      "thens",
      "theow",
      "therm",
      "thesp",
      "thete",
      "thews",
      "thewy",
      "thigs",
      "thilk",
      "thill",
      "thine",
      "thins",
      "thiol",
      "thirl",
      "thoft",
      "thole",
      "tholi",
      "thoro",
      "thorp",
      "thous",
      "thowl",
      "thrae",
      "thraw",
      "thrid",
      "thrip",
      "throe",
      "thuds",
      "thugs",
      "thuja",
      "thunk",
      "thurl",
      "thuya",
      "thymi",
      "thymy",
      "tians",
      "tiars",
      "tical",
      "ticca",
      "ticed",
      "tices",
      "tichy",
      "ticks",
      "ticky",
      "tiddy",
      "tided",
      "tides",
      "tiers",
      "tiffs",
      "tifos",
      "tifts",
      "tiges",
      "tigon",
      "tikas",
      "tikes",
      "tikis",
      "tikka",
      "tilak",
      "tiled",
      "tiler",
      "tiles",
      "tills",
      "tilly",
      "tilth",
      "tilts",
      "timbo",
      "timed",
      "times",
      "timon",
      "timps",
      "tinas",
      "tinct",
      "tinds",
      "tinea",
      "tined",
      "tines",
      "tinge",
      "tings",
      "tinks",
      "tinny",
      "tints",
      "tinty",
      "tipis",
      "tippy",
      "tired",
      "tires",
      "tirls",
      "tiros",
      "tirrs",
      "titch",
      "titer",
      "titis",
      "titre",
      "titty",
      "titup",
      "tiyin",
      "tiyns",
      "tizes",
      "tizzy",
      "toads",
      "toady",
      "toaze",
      "tocks",
      "tocky",
      "tocos",
      "todde",
      "toeas",
      "toffs",
      "toffy",
      "tofts",
      "tofus",
      "togae",
      "togas",
      "toged",
      "toges",
      "togue",
      "tohos",
      "toile",
      "toils",
      "toing",
      "toise",
      "toits",
      "tokay",
      "toked",
      "toker",
      "tokes",
      "tokos",
      "tolan",
      "tolar",
      "tolas",
      "toled",
      "toles",
      "tolls",
      "tolly",
      "tolts",
      "tolus",
      "tolyl",
      "toman",
      "tombs",
      "tomes",
      "tomia",
      "tommy",
      "tomos",
      "tondi",
      "tondo",
      "toned",
      "toner",
      "tones",
      "toney",
      "tongs",
      "tonka",
      "tonks",
      "tonne",
      "tonus",
      "tools",
      "tooms",
      "toons",
      "toots",
      "toped",
      "topee",
      "topek",
      "toper",
      "topes",
      "tophe",
      "tophi",
      "tophs",
      "topis",
      "topoi",
      "topos",
      "toppy",
      "toque",
      "torah",
      "toran",
      "toras",
      "torcs",
      "tores",
      "toric",
      "torii",
      "toros",
      "torot",
      "torrs",
      "torse",
      "torsi",
      "torsk",
      "torta",
      "torte",
      "torts",
      "tosas",
      "tosed",
      "toses",
      "toshy",
      "tossy",
      "toted",
      "toter",
      "totes",
      "totty",
      "touks",
      "touns",
      "tours",
      "touse",
      "tousy",
      "touts",
      "touze",
      "touzy",
      "towed",
      "towie",
      "towns",
      "towny",
      "towse",
      "towsy",
      "towts",
      "towze",
      "towzy",
      "toyed",
      "toyer",
      "toyon",
      "toyos",
      "tozed",
      "tozes",
      "tozie",
      "trabs",
      "trads",
      "tragi",
      "traik",
      "trams",
      "trank",
      "tranq",
      "trans",
      "trant",
      "trape",
      "traps",
      "trapt",
      "trass",
      "trats",
      "tratt",
      "trave",
      "trayf",
      "trays",
      "treck",
      "treed",
      "treen",
      "trees",
      "trefa",
      "treif",
      "treks",
      "trema",
      "trems",
      "tress",
      "trest",
      "trets",
      "trews",
      "treyf",
      "treys",
      "triac",
      "tride",
      "trier",
      "tries",
      "triff",
      "trigo",
      "trigs",
      "trike",
      "trild",
      "trill",
      "trims",
      "trine",
      "trins",
      "triol",
      "trior",
      "trios",
      "trips",
      "tripy",
      "trist",
      "troad",
      "troak",
      "troat",
      "trock",
      "trode",
      "trods",
      "trogs",
      "trois",
      "troke",
      "tromp",
      "trona",
      "tronc",
      "trone",
      "tronk",
      "trons",
      "trooz",
      "troth",
      "trots",
      "trows",
      "troys",
      "trued",
      "trues",
      "trugo",
      "trugs",
      "trull",
      "tryer",
      "tryke",
      "tryma",
      "tryps",
      "tsade",
      "tsadi",
      "tsars",
      "tsked",
      "tsuba",
      "tsubo",
      "tuans",
      "tuart",
      "tuath",
      "tubae",
      "tubar",
      "tubas",
      "tubby",
      "tubed",
      "tubes",
      "tucks",
      "tufas",
      "tuffe",
      "tuffs",
      "tufts",
      "tufty",
      "tugra",
      "tuile",
      "tuina",
      "tuism",
      "tuktu",
      "tules",
      "tulpa",
      "tulsi",
      "tumid",
      "tummy",
      "tumps",
      "tumpy",
      "tunas",
      "tunds",
      "tuned",
      "tuner",
      "tunes",
      "tungs",
      "tunny",
      "tupek",
      "tupik",
      "tuple",
      "tuque",
      "turds",
      "turfs",
      "turfy",
      "turks",
      "turme",
      "turms",
      "turns",
      "turnt",
      "turps",
      "turrs",
      "tushy",
      "tusks",
      "tusky",
      "tutee",
      "tutti",
      "tutty",
      "tutus",
      "tuxes",
      "tuyer",
      "twaes",
      "twain",
      "twals",
      "twank",
      "twats",
      "tways",
      "tweel",
      "tween",
      "tweep",
      "tweer",
      "twerk",
      "twerp",
      "twier",
      "twigs",
      "twill",
      "twilt",
      "twink",
      "twins",
      "twiny",
      "twire",
      "twirp",
      "twite",
      "twits",
      "twoer",
      "twyer",
      "tyees",
      "tyers",
      "tyiyn",
      "tykes",
      "tyler",
      "tymps",
      "tynde",
      "tyned",
      "tynes",
      "typal",
      "typed",
      "types",
      "typey",
      "typic",
      "typos",
      "typps",
      "typto",
      "tyran",
      "tyred",
      "tyres",
      "tyros",
      "tythe",
      "tzars",
      "udals",
      "udons",
      "ugali",
      "ugged",
      "uhlan",
      "uhuru",
      "ukase",
      "ulama",
      "ulans",
      "ulema",
      "ulmin",
      "ulnad",
      "ulnae",
      "ulnar",
      "ulnas",
      "ulpan",
      "ulvas",
      "ulyie",
      "ulzie",
      "umami",
      "umbel",
      "umber",
      "umble",
      "umbos",
      "umbre",
      "umiac",
      "umiak",
      "umiaq",
      "ummah",
      "ummas",
      "ummed",
      "umped",
      "umphs",
      "umpie",
      "umpty",
      "umrah",
      "umras",
      "unais",
      "unapt",
      "unarm",
      "unary",
      "unaus",
      "unbag",
      "unban",
      "unbar",
      "unbed",
      "unbid",
      "unbox",
      "uncap",
      "unces",
      "uncia",
      "uncos",
      "uncoy",
      "uncus",
      "undam",
      "undee",
      "undos",
      "undug",
      "uneth",
      "unfix",
      "ungag",
      "unget",
      "ungod",
      "ungot",
      "ungum",
      "unhat",
      "unhip",
      "unica",
      "units",
      "unjam",
      "unked",
      "unket",
      "unkid",
      "unlaw",
      "unlay",
      "unled",
      "unlet",
      "unlid",
      "unman",
      "unmew",
      "unmix",
      "unpay",
      "unpeg",
      "unpen",
      "unpin",
      "unred",
      "unrid",
      "unrig",
      "unrip",
      "unsaw",
      "unsay",
      "unsee",
      "unsew",
      "unsex",
      "unsod",
      "untax",
      "untin",
      "unwet",
      "unwit",
      "unwon",
      "upbow",
      "upbye",
      "updos",
      "updry",
      "upend",
      "upjet",
      "uplay",
      "upled",
      "uplit",
      "upped",
      "upran",
      "uprun",
      "upsee",
      "upsey",
      "uptak",
      "upter",
      "uptie",
      "uraei",
      "urali",
      "uraos",
      "urare",
      "urari",
      "urase",
      "urate",
      "urbex",
      "urbia",
      "urdee",
      "ureal",
      "ureas",
      "uredo",
      "ureic",
      "urena",
      "urent",
      "urged",
      "urger",
      "urges",
      "urial",
      "urite",
      "urman",
      "urnal",
      "urned",
      "urped",
      "ursae",
      "ursid",
      "urson",
      "urubu",
      "urvas",
      "users",
      "usnea",
      "usque",
      "usure",
      "usury",
      "uteri",
      "uveal",
      "uveas",
      "uvula",
      "vacua",
      "vaded",
      "vades",
      "vagal",
      "vagus",
      "vails",
      "vaire",
      "vairs",
      "vairy",
      "vakas",
      "vakil",
      "vales",
      "valis",
      "valse",
      "vamps",
      "vampy",
      "vanda",
      "vaned",
      "vanes",
      "vangs",
      "vants",
      "vaped",
      "vaper",
      "vapes",
      "varan",
      "varas",
      "vardy",
      "varec",
      "vares",
      "varia",
      "varix",
      "varna",
      "varus",
      "varve",
      "vasal",
      "vases",
      "vasts",
      "vasty",
      "vatic",
      "vatus",
      "vauch",
      "vaute",
      "vauts",
      "vawte",
      "vaxes",
      "veale",
      "veals",
      "vealy",
      "veena",
      "veeps",
      "veers",
      "veery",
      "vegas",
      "veges",
      "vegie",
      "vegos",
      "vehme",
      "veils",
      "veily",
      "veins",
      "veiny",
      "velar",
      "velds",
      "veldt",
      "veles",
      "vells",
      "velum",
      "venae",
      "venal",
      "vends",
      "vendu",
      "veney",
      "venge",
      "venin",
      "vents",
      "venus",
      "verbs",
      "verra",
      "verry",
      "verst",
      "verts",
      "vertu",
      "vespa",
      "vesta",
      "vests",
      "vetch",
      "vexed",
      "vexer",
      "vexes",
      "vexil",
      "vezir",
      "vials",
      "viand",
      "vibes",
      "vibex",
      "vibey",
      "viced",
      "vices",
      "vichy",
      "viers",
      "views",
      "viewy",
      "vifda",
      "viffs",
      "vigas",
      "vigia",
      "vilde",
      "viler",
      "villi",
      "vills",
      "vimen",
      "vinal",
      "vinas",
      "vinca",
      "vined",
      "viner",
      "vines",
      "vinew",
      "vinic",
      "vinos",
      "vints",
      "viold",
      "viols",
      "vired",
      "vireo",
      "vires",
      "virga",
      "virge",
      "virid",
      "virls",
      "virtu",
      "visas",
      "vised",
      "vises",
      "visie",
      "visne",
      "vison",
      "visto",
      "vitae",
      "vitas",
      "vitex",
      "vitro",
      "vitta",
      "vivas",
      "vivat",
      "vivda",
      "viver",
      "vives",
      "vizir",
      "vizor",
      "vleis",
      "vlies",
      "vlogs",
      "voars",
      "vocab",
      "voces",
      "voddy",
      "vodou",
      "vodun",
      "voema",
      "vogie",
      "voids",
      "voile",
      "voips",
      "volae",
      "volar",
      "voled",
      "voles",
      "volet",
      "volks",
      "volta",
      "volte",
      "volti",
      "volts",
      "volva",
      "volve",
      "vomer",
      "voted",
      "votes",
      "vouge",
      "voulu",
      "vowed",
      "vower",
      "voxel",
      "vozhd",
      "vraic",
      "vrils",
      "vroom",
      "vrous",
      "vrouw",
      "vrows",
      "vuggs",
      "vuggy",
      "vughs",
      "vughy",
      "vulgo",
      "vulns",
      "vulva",
      "vutty",
      "waacs",
      "wacke",
      "wacko",
      "wacks",
      "wadds",
      "waddy",
      "waded",
      "wader",
      "wades",
      "wadge",
      "wadis",
      "wadts",
      "waffs",
      "wafts",
      "waged",
      "wages",
      "wagga",
      "wagyu",
      "wahoo",
      "waide",
      "waifs",
      "waift",
      "wails",
      "wains",
      "wairs",
      "waite",
      "waits",
      "wakas",
      "waked",
      "waken",
      "waker",
      "wakes",
      "wakfs",
      "waldo",
      "walds",
      "waled",
      "waler",
      "wales",
      "walie",
      "walis",
      "walks",
      "walla",
      "walls",
      "wally",
      "walty",
      "wamed",
      "wames",
      "wamus",
      "wands",
      "waned",
      "wanes",
      "waney",
      "wangs",
      "wanks",
      "wanky",
      "wanle",
      "wanly",
      "wanna",
      "wants",
      "wanty",
      "wanze",
      "waqfs",
      "warbs",
      "warby",
      "wards",
      "wared",
      "wares",
      "warez",
      "warks",
      "warms",
      "warns",
      "warps",
      "warre",
      "warst",
      "warts",
      "wases",
      "washy",
      "wasms",
      "wasps",
      "waspy",
      "wasts",
      "watap",
      "watts",
      "wauff",
      "waugh",
      "wauks",
      "waulk",
      "wauls",
      "waurs",
      "waved",
      "waves",
      "wavey",
      "wawas",
      "wawes",
      "wawls",
      "waxed",
      "waxer",
      "waxes",
      "wayed",
      "wazir",
      "wazoo",
      "weald",
      "weals",
      "weamb",
      "weans",
      "wears",
      "webby",
      "weber",
      "wecht",
      "wedel",
      "wedgy",
      "weeds",
      "weeke",
      "weeks",
      "weels",
      "weems",
      "weens",
      "weeny",
      "weeps",
      "weepy",
      "weest",
      "weete",
      "weets",
      "wefte",
      "wefts",
      "weids",
      "weils",
      "weirs",
      "weise",
      "weize",
      "wekas",
      "welds",
      "welke",
      "welks",
      "welkt",
      "wells",
      "welly",
      "welts",
      "wembs",
      "wench",
      "wends",
      "wenge",
      "wenny",
      "wents",
      "weros",
      "wersh",
      "wests",
      "wetas",
      "wetly",
      "wexed",
      "wexes",
      "whamo",
      "whams",
      "whang",
      "whaps",
      "whare",
      "whata",
      "whats",
      "whaup",
      "whaur",
      "wheal",
      "whear",
      "wheen",
      "wheep",
      "wheft",
      "whelk",
      "whelm",
      "whens",
      "whets",
      "whews",
      "wheys",
      "whids",
      "whift",
      "whigs",
      "whilk",
      "whims",
      "whins",
      "whios",
      "whips",
      "whipt",
      "whirr",
      "whirs",
      "whish",
      "whiss",
      "whist",
      "whits",
      "whity",
      "whizz",
      "whomp",
      "whoof",
      "whoot",
      "whops",
      "whore",
      "whorl",
      "whort",
      "whoso",
      "whows",
      "whump",
      "whups",
      "whyda",
      "wicca",
      "wicks",
      "wicky",
      "widdy",
      "wides",
      "wiels",
      "wifed",
      "wifes",
      "wifey",
      "wifie",
      "wifty",
      "wigan",
      "wigga",
      "wiggy",
      "wikis",
      "wilco",
      "wilds",
      "wiled",
      "wiles",
      "wilga",
      "wilis",
      "wilja",
      "wills",
      "wilts",
      "wimps",
      "winds",
      "wined",
      "wines",
      "winey",
      "winge",
      "wings",
      "wingy",
      "winks",
      "winna",
      "winns",
      "winos",
      "winze",
      "wiped",
      "wiper",
      "wipes",
      "wired",
      "wirer",
      "wires",
      "wirra",
      "wised",
      "wises",
      "wisha",
      "wisht",
      "wisps",
      "wists",
      "witan",
      "wited",
      "wites",
      "withe",
      "withs",
      "withy",
      "wived",
      "wiver",
      "wives",
      "wizen",
      "wizes",
      "woads",
      "woald",
      "wocks",
      "wodge",
      "woful",
      "wojus",
      "woker",
      "wokka",
      "wolds",
      "wolfs",
      "wolly",
      "wolve",
      "wombs",
      "womby",
      "womyn",
      "wonga",
      "wongi",
      "wonks",
      "wonky",
      "wonts",
      "woods",
      "wooed",
      "woofs",
      "woofy",
      "woold",
      "wools",
      "woons",
      "woops",
      "woopy",
      "woose",
      "woosh",
      "wootz",
      "words",
      "works",
      "worms",
      "wormy",
      "worts",
      "wowed",
      "wowee",
      "woxen",
      "wrang",
      "wraps",
      "wrapt",
      "wrast",
      "wrate",
      "wrawl",
      "wrens",
      "wrick",
      "wried",
      "wrier",
      "wries",
      "writs",
      "wroke",
      "wroot",
      "wroth",
      "wryer",
      "wuddy",
      "wudus",
      "wulls",
      "wurst",
      "wuses",
      "wushu",
      "wussy",
      "wuxia",
      "wyled",
      "wyles",
      "wynds",
      "wynns",
      "wyted",
      "wytes",
      "xebec",
      "xenia",
      "xenic",
      "xenon",
      "xeric",
      "xerox",
      "xerus",
      "xoana",
      "xrays",
      "xylan",
      "xylem",
      "xylic",
      "xylol",
      "xylyl",
      "xysti",
      "xysts",
      "yaars",
      "yabas",
      "yabba",
      "yabby",
      "yacca",
      "yacka",
      "yacks",
      "yaffs",
      "yager",
      "yages",
      "yagis",
      "yahoo",
      "yaird",
      "yakka",
      "yakow",
      "yales",
      "yamen",
      "yampy",
      "yamun",
      "yangs",
      "yanks",
      "yapok",
      "yapon",
      "yapps",
      "yappy",
      "yarak",
      "yarco",
      "yards",
      "yarer",
      "yarfa",
      "yarks",
      "yarns",
      "yarrs",
      "yarta",
      "yarto",
      "yates",
      "yauds",
      "yauld",
      "yaups",
      "yawed",
      "yawey",
      "yawls",
      "yawns",
      "yawny",
      "yawps",
      "ybore",
      "yclad",
      "ycled",
      "ycond",
      "ydrad",
      "ydred",
      "yeads",
      "yeahs",
      "yealm",
      "yeans",
      "yeard",
      "years",
      "yecch",
      "yechs",
      "yechy",
      "yedes",
      "yeeds",
      "yeesh",
      "yeggs",
      "yelks",
      "yells",
      "yelms",
      "yelps",
      "yelts",
      "yenta",
      "yente",
      "yerba",
      "yerds",
      "yerks",
      "yeses",
      "yesks",
      "yests",
      "yesty",
      "yetis",
      "yetts",
      "yeuks",
      "yeuky",
      "yeven",
      "yeves",
      "yewen",
      "yexed",
      "yexes",
      "yfere",
      "yiked",
      "yikes",
      "yills",
      "yince",
      "yipes",
      "yippy",
      "yirds",
      "yirks",
      "yirrs",
      "yirth",
      "yites",
      "yitie",
      "ylems",
      "ylike",
      "ylkes",
      "ymolt",
      "ympes",
      "yobbo",
      "yobby",
      "yocks",
      "yodel",
      "yodhs",
      "yodle",
      "yogas",
      "yogee",
      "yoghs",
      "yogic",
      "yogin",
      "yogis",
      "yoick",
      "yojan",
      "yoked",
      "yokel",
      "yoker",
      "yokes",
      "yokul",
      "yolks",
      "yolky",
      "yomim",
      "yomps",
      "yonic",
      "yonis",
      "yonks",
      "yoofs",
      "yoops",
      "yores",
      "yorks",
      "yorps",
      "youks",
      "yourn",
      "yours",
      "yourt",
      "youse",
      "yowed",
      "yowes",
      "yowie",
      "yowls",
      "yowza",
      "yrapt",
      "yrent",
      "yrivd",
      "yrneh",
      "ysame",
      "ytost",
      "yuans",
      "yucas",
      "yucca",
      "yucch",
      "yucko",
      "yucks",
      "yucky",
      "yufts",
      "yugas",
      "yuked",
      "yukes",
      "yukky",
      "yukos",
      "yulan",
      "yules",
      "yummo",
      "yummy",
      "yumps",
      "yupon",
      "yuppy",
      "yurta",
      "yurts",
      "yuzus",
      "zabra",
      "zacks",
      "zaida",
      "zaidy",
      "zaire",
      "zakat",
      "zaman",
      "zambo",
      "zamia",
      "zanja",
      "zante",
      "zanza",
      "zanze",
      "zappy",
      "zarfs",
      "zaris",
      "zatis",
      "zaxes",
      "zayin",
      "zazen",
      "zeals",
      "zebec",
      "zebub",
      "zebus",
      "zedas",
      "zeins",
      "zendo",
      "zerda",
      "zerks",
      "zeros",
      "zests",
      "zetas",
      "zexes",
      "zezes",
      "zhomo",
      "zibet",
      "ziffs",
      "zigan",
      "zilas",
      "zilch",
      "zilla",
      "zills",
      "zimbi",
      "zimbs",
      "zinco",
      "zincs",
      "zincy",
      "zineb",
      "zines",
      "zings",
      "zingy",
      "zinke",
      "zinky",
      "zippo",
      "zippy",
      "ziram",
      "zitis",
      "zizel",
      "zizit",
      "zlote",
      "zloty",
      "zoaea",
      "zobos",
      "zobus",
      "zocco",
      "zoeae",
      "zoeal",
      "zoeas",
      "zoism",
      "zoist",
      "zombi",
      "zonae",
      "zonda",
      "zoned",
      "zoner",
      "zones",
      "zonks",
      "zooea",
      "zooey",
      "zooid",
      "zooks",
      "zooms",
      "zoons",
      "zooty",
      "zoppa",
      "zoppo",
      "zoril",
      "zoris",
      "zorro",
      "zouks",
      "zowee",
      "zowie",
      "zulus",
      "zupan",
      "zupas",
      "zuppa",
      "zurfs",
      "zuzim",
      "zygal",
      "zygon",
      "zymes",
      "zymic",
    ];
  var ne = {unknown: 0, absent: 1, present: 2, correct: 3};
  var ae = 864e5,
    oe = new Date(2021, 5, 19, 0, 0, 0, 0);
  function re(e, t) {
    (e = new Date(e)),
      (e = new Date(t).setHours(0, 0, 0, 0) - e.setHours(0, 0, 0, 0));
    return Math.round(e / ae);
  }
  function se(e) {
    return re(oe, e);
  }
  function ie(e) {
    if (null === e) return "";
    e %= ee.length;
    return ee[e];
  }
  function le(r) {
    return function (e, t) {
      var n = t(),
        a = pe(n),
        o = me(n),
        t = be(n),
        n = Ee(n);
      if (r === a - 1 && (e({type: Oe}), ["WIN", "FAIL"].includes(o))) {
        if (n) return e(V("stats"));
        "WIN" === o &&
          ((a = _e[a - 1]), e(Q({text: a, duration: 2e3, win: !0}))),
          "FAIL" === o && e(Q({text: t.toUpperCase(), duration: 1 / 0})),
          setTimeout(function () {
            e(V("stats"));
          }, 2500);
      }
    };
  }
  var ue = "abcdefghijklmnopqrstuvwxyz",
    ce = function (e) {
      return e.persist.game;
    },
    de = Reselect.createSelector(ce, function (e) {
      return e.boardState;
    }),
    me = Reselect.createSelector(ce, function (e) {
      return e.status;
    }),
    pe = Reselect.createSelector(ce, function (e) {
      return e.currentRowIndex;
    }),
    ye = Reselect.createSelector([de, pe], function (e, t) {
      return e[t];
    }),
    ge = Reselect.createSelector(ce, function (e) {
      return e.dayOffset;
    }),
    he = Reselect.createSelector(ce, function (e) {
      return e.timestamps.lastPlayed;
    }),
    fe = Reselect.createSelector(ce, function (e) {
      return e.timestamps.lastCompleted;
    }),
    be = Reselect.createSelector(ge, ie),
    ke = Reselect.createSelector([de, pe, be], function (e, n, a) {
      return e.map(function (e, t) {
        return n <= t
          ? null
          : (function (e, t) {
              for (
                var n = Array(t.length).fill("absent"),
                  a = Array(t.length).fill(!0),
                  o = Array(t.length).fill(!0),
                  r = 0;
                r < e.length;
                r += 1
              )
                e[r] === t[r] &&
                  o[r] &&
                  ((n[r] = "correct"), (a[r] = !1), (o[r] = !1));
              for (var s = 0; s < e.length; s += 1) {
                var i = e[s];
                if (a[s])
                  for (var l = 0; l < t.length; l += 1) {
                    var u = t[l];
                    if (o[l] && i === u) {
                      (n[s] = "present"), (o[l] = !1);
                      break;
                    }
                  }
              }
              return n;
            })(e, a);
      });
    }),
    we = 6,
    guessLength = 5,
    _e = ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"],
    xe = function (e) {
      return e.transient;
    },
    Se = Reselect.createSelector(xe, function (e) {
      return e.isAnimatingRow;
    }),
    Ee = Reselect.createSelector(xe, function (e) {
      return e.isRestoringSession;
    }),
    ze = Reselect.createSelector(xe, function (e) {
      return e.lastRowInvalid;
    }),
    je = Reselect.createSelector(xe, function (e) {
      return e.lastRowWin;
    }),
    Ne = Reselect.createSelector([me, Se, pe], function (e, t, n) {
      return "IN_PROGRESS" !== e || t || we <= n;
    }),
    Ce = Reselect.createSelector([de, ke, pe, Se, Ee], function (e, t, n, a, o) {
      if (o) return {};
      var i,
        l,
        n = t.slice(0, a ? n - 1 : n);
      return (
        (i = n),
        (l = {}),
        e.forEach(function (e, t) {
          var n = i[t];
          if (n)
            for (var a = 0; a < e.length; a += 1) {
              var o = e[a],
                r = n[a],
                s = l[o] || "unknown";
              ne[s] < ne[r] && (l[o] = r);
            }
        }),
        l
      );
    }),
    Oe = "wordle/transient/LAST_TILE_REVEAL",
    Ae = "wordle/transient/REMOVE_INVALID",
    Ie = function () {
      return {type: Ae};
    };
  function Te(e, t) {
    var n,
      a = (t = void 0 === t ? {} : t).insertAt;
    e &&
      "undefined" != typeof document &&
      ((n = document.head || document.getElementsByTagName("head")[0]),
      ((t = document.createElement("style")).type = "text/css"),
      "top" === a && n.firstChild
        ? n.insertBefore(t, n.firstChild)
        : n.appendChild(t),
      t.styleSheet
        ? (t.styleSheet.cssText = e)
        : t.appendChild(document.createTextNode(e)));
  }
  var Le = {
    tile: "Tile-module_tile__3ayIZ",
    PopIn: "Tile-module_PopIn__bu7hb",
    FlipIn: "Tile-module_FlipIn__scjpz",
    FlipOut: "Tile-module_FlipOut__e4DRI",
  };
  function Pe(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Me(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Me(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function Me(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function Re(e) {
    var t = e.rowIndex,
      n = e.last,
      a = e.letter,
      o = e.evaluation,
      r = x(),
      s = f.useRef(null),
      i = Pe(f.useState("idle"), 2),
      l = i[0],
      u = i[1],
      e = Pe(f.useState(!1), 2),
      i = e[0],
      c = e[1];
    f.useEffect(
      function () {
        u(a ? "pop" : "idle");
      },
      [a],
    ),
      f.useEffect(
        function () {
          o && u("flip-in");
        },
        [o],
      );
    e = "empty";
    return (
      i && o ? (e = o) : a && (e = "tbd"),
      f.createElement(
        "div",
        {
          className: Le.tile,
          ref: s,
          onAnimationEnd: function (e) {
            e.animationName === Le.PopIn && "pop" === l && u("idle"),
              e.animationName === Le.FlipIn && (u("flip-out"), c(!0)),
              e.animationName === Le.FlipOut &&
                (u("idle"), n && s.current && void 0 !== t && r(le(t)));
          },
          "data-state": e,
          "data-animation": l || "idle",
          "data-testid": "tile",
        },
        a,
      )
    );
  }
  Te(
    '.Tile-module_tile__3ayIZ {\n  width: 100%;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 2rem;\n  line-height: 2rem;\n  font-weight: bold;\n  vertical-align: middle;\n  box-sizing: border-box;\n  color: var(--tile-text-color);\n  text-transform: uppercase;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.Tile-module_tile__3ayIZ::before {\n  content: "";\n  display: inline-block;\n  padding-bottom: 100%;\n}\n\n/* Allow tiles to be smaller on small screens */\n@media (max-height: 600px) {\n  .Tile-module_tile__3ayIZ {\n    font-size: 1em;\n    line-height: 1em;\n  }\n}\n.Tile-module_tile__3ayIZ[data-state=empty] {\n  border: 2px solid var(--color-tone-4);\n}\n\n.Tile-module_tile__3ayIZ[data-state=tbd] {\n  background-color: var(--color-tone-7);\n  border: 2px solid var(--color-tone-3);\n  color: var(--color-tone-1);\n}\n\n.Tile-module_tile__3ayIZ[data-state=correct] {\n  background-color: var(--color-correct);\n}\n\n.Tile-module_tile__3ayIZ[data-state=present] {\n  background-color: var(--color-present);\n}\n\n.Tile-module_tile__3ayIZ[data-state=absent] {\n  background-color: var(--color-absent);\n}\n\n.Tile-module_tile__3ayIZ[data-animation=pop] {\n  -webkit-animation-name: Tile-module_PopIn__bu7hb;\n          animation-name: Tile-module_PopIn__bu7hb;\n  -webkit-animation-duration: 100ms;\n          animation-duration: 100ms;\n}\n\n@-webkit-keyframes Tile-module_PopIn__bu7hb {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  40% {\n    transform: scale(1.1);\n    opacity: 1;\n  }\n}\n\n@keyframes Tile-module_PopIn__bu7hb {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  40% {\n    transform: scale(1.1);\n    opacity: 1;\n  }\n}\n.Tile-module_tile__3ayIZ[data-animation=flip-in] {\n  -webkit-animation-name: Tile-module_FlipIn__scjpz;\n          animation-name: Tile-module_FlipIn__scjpz;\n  -webkit-animation-duration: 250ms;\n          animation-duration: 250ms;\n  -webkit-animation-timing-function: ease-in;\n          animation-timing-function: ease-in;\n}\n\n@-webkit-keyframes Tile-module_FlipIn__scjpz {\n  0% {\n    transform: rotateX(0);\n  }\n  100% {\n    transform: rotateX(-90deg);\n  }\n}\n\n@keyframes Tile-module_FlipIn__scjpz {\n  0% {\n    transform: rotateX(0);\n  }\n  100% {\n    transform: rotateX(-90deg);\n  }\n}\n.Tile-module_tile__3ayIZ[data-animation=flip-out] {\n  -webkit-animation-name: Tile-module_FlipOut__e4DRI;\n          animation-name: Tile-module_FlipOut__e4DRI;\n  -webkit-animation-duration: 250ms;\n          animation-duration: 250ms;\n  -webkit-animation-timing-function: ease-in;\n          animation-timing-function: ease-in;\n}\n\n@-webkit-keyframes Tile-module_FlipOut__e4DRI {\n  0% {\n    transform: rotateX(-90deg);\n  }\n  100% {\n    transform: rotateX(0);\n  }\n}\n\n@keyframes Tile-module_FlipOut__e4DRI {\n  0% {\n    transform: rotateX(-90deg);\n  }\n  100% {\n    transform: rotateX(0);\n  }\n}',
  );
  var De =
      (null === (qe = window.env) || void 0 === qe ? void 0 : qe.name) || "dev",
    ce = function (e) {
      return e[De] || e.dev;
    },
    xe = ce({
      prod: "https://myaccount.nytimes.com",
      stg: "https://myaccount.stg.nytimes.com",
      dev: "https://myaccount.stg.nytimes.com",
    }),
    Be = ce({
      prod: "https://www.nytimes.com/subscription/games?campaignId=8RRFW",
      stg: "https://www.stg.nytimes.com/subscription/games?campaignId=8RRFW",
      dev: "https://www.stg.nytimes.com/subscription/games?campaignId=8RRFW",
    }),
    He = "".concat(xe, "/svc/auth/v1/profileinfo"),
    Se = ce({
      prod: "https://www.nytimes.com/games/wordle/index.html",
      stg: "https://www.stg.nytimes.com/games/wordle/index.html",
      dev: "https://local.nytimes.com/games/wordle/index.html?abra-overrides=GAMES_wordleAuth_0427=1_EnableAuth",
    }),
    qe = ce({
      prod: "https://www.nytimes.com/games/wordle/index.html?success=true",
      stg: "https://www.stg.nytimes.com/games/wordle/index.html?success=true",
      dev: "https://local.nytimes.com/games/wordle/index.html?abra-overrides=GAMES_wordleAuth_0427=1_EnableAuth&success=true",
    }),
    Se = encodeURIComponent(Se),
    qe = encodeURIComponent(qe),
    We = ""
      .concat(
        xe,
        "/auth/enter-email?response_type=cookie&client_id=games&application=nyt-lire&asset=wordle&redirect_uri=",
      )
      .concat(qe),
    Ge = ""
      .concat(
        xe,
        "/auth/enter-email?response_type=cookie&client_id=games&application=nyt-lires&redirect_uri=",
      )
      .concat(Se),
    qe = ce({
      prod: "https://www.nytimes.com/games/wordle/index.html",
      stg: "https://www.stg.nytimes.com/games/wordle/index.html",
      dev: "https://local.nytimes.com/games/wordle/index.html",
    }),
    Fe = "".concat(xe, "/auth/logout?redirect_uri=").concat(qe),
    Ye = {
      instructions: "Help-module_instructions__54IDr",
      examples: "Help-module_examples__eeiMV",
      example: "Help-module_example__3UNrs",
      tileContainer: "Help-module_tileContainer__WmMQw",
      page: "Help-module_page__uQ7Xi",
      statsLogin: "Help-module_statsLogin__j0k72",
      loginArrow: "Help-module_loginArrow__H-3mD",
      loginText: "Help-module_loginText__Osqyn",
      statsIcon: "Help-module_statsIcon__pQSyR",
      rule: "Help-module_rule__wlOx-",
    };
  Te(
    ".Help-module_instructions__54IDr {\n  font-size: 14px;\n  color: var(--color-tone-1);\n}\n\n.Help-module_examples__eeiMV {\n  border-bottom: 1px solid var(--color-tone-4);\n  border-top: 1px solid var(--color-tone-4);\n}\n\n.Help-module_example__3UNrs {\n  margin-top: 24px;\n  margin-bottom: 24px;\n}\n\n.Help-module_tileContainer__WmMQw {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  margin-right: 4px;\n}\n\n.Help-module_page__uQ7Xi {\n  padding: 16px;\n  padding-top: 0px;\n}\n\n/*---auth---*/\n.Help-module_statsLogin__j0k72 {\n  color: var(--color-tone-1);\n  font-size: 14px;\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: flex-start;\n  text-decoration: none;\n  padding-top: 24px;\n}\n.Help-module_statsLogin__j0k72 a {\n  font-weight: 700;\n  color: var(--color-tone-1);\n}\n.Help-module_statsLogin__j0k72 .Help-module_loginArrow__H-3mD {\n  text-decoration: none;\n  justify-self: flex-end;\n}\n.Help-module_statsLogin__j0k72 .Help-module_loginText__Osqyn {\n  flex-grow: 2;\n}\n.Help-module_statsLogin__j0k72 .Help-module_statsIcon__pQSyR {\n  margin-right: 16px;\n}\n.Help-module_statsLogin__j0k72 .Help-module_rule__wlOx- {\n  margin-left: -16px;\n  height: 1px;\n  position: absolute;\n  width: 100%;\n  background-color: var(--color-tone-1);\n  margin-bottom: 70px;\n  box-shadow: 0px 0px 2px rgba(50, 50, 50, 0.75);\n}",
  );
  function Ve(e) {
    var a = e.helpWord,
      e = e.letters;
    return f.createElement(
      f.Fragment,
      null,
      e.map(function (e, t) {
        var n = e.letter,
          e = e.evaluation;
        return f.createElement(
          "div",
          {
            "data-testid": "".concat(a, "-letter"),
            className: Ye.tileContainer,
            key: "".concat(a, "-").concat(n, "-").concat(t),
          },
          f.createElement(Re, {letter: n, evaluation: e}),
        );
      }),
    );
  }
  var Ue = [
    {
      helpWord: "weary",
      letters: [
        {letter: "w", evaluation: "correct"},
        {letter: "e"},
        {letter: "a"},
        {letter: "r"},
        {letter: "y"},
      ],
    },
    {
      helpWord: "pills",
      letters: [
        {letter: "p"},
        {letter: "i", evaluation: "present"},
        {letter: "l"},
        {letter: "l"},
        {letter: "s"},
      ],
    },
    {
      helpWord: "vague",
      letters: [
        {letter: "v"},
        {letter: "a"},
        {letter: "g"},
        {letter: "u", evaluation: "absent"},
        {letter: "e"},
      ],
    },
  ];
  function Ze(e) {
    var t = e.isPage,
      n = e.enableAuth,
      a = e.isLoggedIn,
      e = n && !(void 0 !== a && a),
      o = x();
    return f.createElement(
      "section",
      {
        className: classNames(
          ((n = {}),
          (a = Ye.page),
          (t = t),
          a in n
            ? Object.defineProperty(n, a, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (n[a] = t),
          n),
        ),
      },
      f.createElement(
        "div",
        {className: Ye.instructions},
        f.createElement(
          "p",
          null,
          "Guess the ",
          f.createElement("strong", null, "WORDLE"),
          " in six tries.",
        ),
        f.createElement(
          "p",
          null,
          "Each guess must be a valid five-letter word. Hit the enter button to submit.",
        ),
        f.createElement(
          "p",
          null,
          "After each guess, the color of the tiles will change to show how close your guess was to the word.",
        ),
        f.createElement(
          "div",
          {className: Ye.examples},
          f.createElement(
            "p",
            null,
            f.createElement("strong", null, "Examples"),
          ),
          f.createElement(
            "div",
            {"aria-label": Ue[0].helpWord, className: Ye.example},
            Ve(Ue[0]),
            f.createElement(
              "p",
              null,
              "The letter ",
              f.createElement("strong", null, "W"),
              " is in the word and in the correct spot.",
            ),
          ),
          f.createElement(
            "div",
            {"aria-label": Ue[1].helpWord, className: Ye.example},
            Ve(Ue[1]),
            f.createElement(
              "p",
              null,
              "The letter ",
              f.createElement("strong", null, "I"),
              " is in the word but in the wrong spot.",
            ),
          ),
          f.createElement(
            "div",
            {"aria-label": Ue[2].helpWord, className: Ye.example},
            Ve(Ue[2]),
            f.createElement(
              "p",
              null,
              "The letter ",
              f.createElement("strong", null, "U"),
              " is not in the word in any spot.",
            ),
          ),
        ),
        f.createElement(
          "p",
          null,
          f.createElement(
            "strong",
            null,
            "A new WORDLE will be available each day!",
          ),
        ),
      ),
      e &&
        f.createElement(
          "div",
          {className: Ye.statsLogin},
          f.createElement("div", {className: Ye.rule}),
          f.createElement(
            "div",
            {className: Ye.statsIcon},
            f.createElement("img", {
              alt: "Green Bar Graph",
              style: {content: "var(--wordle-stats-mini)"},
            }),
          ),
          f.createElement(
            "div",
            {className: Ye.loginText},
            "Looking to load your saved stats?",
            f.createElement("br", null),
            f.createElement(
              "a",
              {
                href: Ge,
                onClick: function () {
                  o($("log-in-welcome", !0));
                },
              },
              "Log in here.",
            ),
          ),
          f.createElement(
            "a",
            {className: Ye.loginArrow, href: "/"},
            f.createElement(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              f.createElement("circle", {
                cx: "12",
                cy: "12",
                r: "12",
                fill: "var(--svg-arrow-fill)",
              }),
              f.createElement("path", {
                d: "M10.4038 6L15.8076 11.4038L10.4038 16.8076",
                stroke: "var(--svg-arrow-stroke)",
                strokeWidth: "1.5",
                strokeLinecap: "round",
              }),
            ),
          ),
        ),
    );
  }
  function Xe(e) {
    return e.persist.stats;
  }
  function Ke(e) {
    return {type: lt, payload: {isGameComplete: e}};
  }
  function Je() {
    return {type: ut};
  }
  function Qe() {
    return React.useContext(i);
  }
  var Se = function (e) {
      return e.persist.settings;
    },
    $e = Reselect.createSelector(Se, function (e) {
      return e.hardMode;
    }),
    et = Reselect.createSelector(Se, function (e) {
      return e.darkMode;
    }),
    tt = Reselect.createSelector(Se, function (e) {
      return e.colorblindMode;
    }),
    nt = Reselect.createSelector(Xe, function (e) {
      return e.gamesPlayed;
    }),
    at = Reselect.createSelector(Xe, function (e) {
      return e.gamesWon;
    }),
    ot = Reselect.createSelector(Xe, function (e) {
      return e.maxStreak;
    }),
    rt = Reselect.createSelector(Xe, function (e) {
      return e.currentStreak;
    }),
    st = Reselect.createSelector(Xe, function (e) {
      return e.guesses;
    }),
    it = Reselect.createSelector(
      [ke, ge, pe, $e, me, et, tt],
      function (e, t, n, a, o, r, s) {
        t = "Wordle ".concat(t);
        (t += " ".concat("WIN" === o ? n : "X", "/").concat(we)),
          a && (t += "*");
        var i = "";
        return (
          e.forEach(function (e) {
            e &&
              (e.forEach(function (e) {
                if (e) {
                  var t = "";
                  switch (e) {
                    case "correct":
                      t = s ? "🟧" : "🟩";
                      break;
                    case "present":
                      t = s ? "🟦" : "🟨";
                      break;
                    case "absent":
                      t = r ? "⬛" : "⬜";
                  }
                  i += t;
                }
              }),
              (i += "\n"));
          }),
          {text: "".concat(t, "\n\n").concat(i.trim())}
        );
      },
    ),
    lt = "wordle/stats/TRACK_STATS_IMPRESSION",
    ut = "wordle/stats/SHARE_STATS";
  function ct(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return dt(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? dt(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function dt(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function mt(o) {
    return pt.reduce(function (e, t) {
      var n, a;
      return (
        o
          ? ((n = (a = yt[t]).testName),
            (a = a.activeVariant),
            (e[t] = o(n) === a))
          : (e[t] = !1),
        e
      );
    }, {});
  }
  var pt = ["auth", "welcomeMoment", "moogleGet"],
    yt = {
      auth: {
        testName: "GAMES_wordleAuth_0427",
        activeVariant: "1_EnableAuth",
      },
      welcomeMoment: {
        testName: "GAMES_wordleWelcomeMoment_0621",
        activeVariant: "1_EnableWordleWelcomeMoment",
      },
      moogleGet: {
        testName: "GAMES_wordleMoogle_0422",
        activeVariant: "1_EnableMoogle",
      },
    },
    gt = f.createContext(mt()),
    ce = function (e) {
      var t = e.children,
        e = Qe().getVariant,
        a = mt(e),
        e = ct(f.useState(a), 2),
        o = e[0],
        r = e[1];
      return (
        f.useEffect(
          function () {
            var t, n;
            (t = a),
              (n = o),
              pt.some(function (e) {
                return t[e] !== n[e];
              }) && r(a);
          },
          [a],
        ),
        f.createElement(gt.Provider, {value: o}, t)
      );
    },
    ht = function (e) {
      return f.useContext(gt)[e];
    },
    xe = function (e) {
      return e.api;
    },
    qe = Reselect.createSelector(xe, function (e) {
      return e.moogleGet;
    }),
    ft = Reselect.createSelector(qe, function (e) {
      return e.optedIn;
    }),
    bt =
      (Reselect.createSelector(xe, function (e) {
        return e.solution;
      }),
      Reselect.createSelector(xe, function (e) {
        return e.moogleGet.error;
      })),
    Se = Reselect.createSelector(xe, function (e) {
      return e.moogleGet.isLoading;
    }),
    qe = Reselect.createSelector(xe, function (e) {
      return e.moogleGet.data;
    }),
    kt = Reselect.createSelector(qe, function (e) {
      return null == e ? void 0 : e.game_data;
    }),
    wt = Reselect.createSelector(qe, function (e) {
      return null == e ? void 0 : e.timestamp;
    }),
    vt = Reselect.createSelector(qe, function (e) {
      return null == e ? void 0 : e.user_id;
    }),
    _t = Reselect.createSelector([ft, vt, wt], function (e, t, n) {
      return e && !!t && !n;
    }),
    qe =
      (Reselect.createSelector(xe, function (e) {
        return e.solution.error;
      }),
      Reselect.createSelector(xe, function (e) {
        return e.solution.isLoading;
      })),
    xt =
      (Reselect.createSelector(xe, function (e) {
        return e.solution.data;
      }),
      Reselect.createSelector(xe, function (e) {
        return e.profileInfo.data;
      })),
    St = Reselect.createSelector(xe, function (e) {
      return e.profileInfo.isLoading;
    }),
    Et =
      (Reselect.createSelector(xe, function (e) {
        return e.profileInfo.error;
      }),
      Reselect.createSelector(xe, function (e) {
        return e.mooglePost.isLoading;
      }),
      Reselect.createSelector(xe, function (e) {
        return e.mooglePost.error;
      })),
    zt = Reselect.createSelector(xe, function (e) {
      return e.mooglePost.lastFailedSaveData;
    }),
    jt =
      (Reselect.createSelector([qe, Se, St], function (e, t, n) {
        return e || t || n;
      }),
      {
        gameStats: "Stats-module_gameStats__ZP1aW",
        statisticsHeading: "Stats-module_statisticsHeading__9B0IG",
        statistics: "Stats-module_statistics__Hke7Z",
        statisticContainer: "Stats-module_statisticContainer__XORTW",
        statistic: "Stats-module_statistic__fr8JZ",
        timer: "Stats-module_timer__xn2mu",
        label: "Stats-module_label__pLAui",
        guessDistribution: "Stats-module_guessDistribution__J8Int",
        graphContainer: "Stats-module_graphContainer__BlVFU",
        graph: "Stats-module_graph__l2LGn",
        graphBar: "Stats-module_graphBar__TvsIP",
        highlight: "Stats-module_highlight__fBBiL",
        alignRight: "Stats-module_alignRight__29Xhl",
        numGuesses: "Stats-module_numGuesses__aB7UF",
        footer: "Stats-module_footer__IY-Bt",
        countdown: "Stats-module_countdown__a-cWu",
        share: "Stats-module_share__kfJ-m",
        noData: "Stats-module_noData__D3wkv",
        shareButton: "Stats-module_shareButton__eNFFD",
        shareIconContainer: "Stats-module_shareIconContainer__j2o6K",
        statsBtnLeft: "Stats-module_statsBtnLeft__q1PQ8",
        statsBtnCenter: "Stats-module_statsBtnCenter__Kgi5x",
        statsInfoBtn: "Stats-module_statsInfoBtn__WUPls",
        promoButton: "Stats-module_promoButton__8dcY3",
        promoIcon: "Stats-module_promoIcon__1c9qr",
        promoButtonContainer: "Stats-module_promoButtonContainer__xUFtx",
        ctaContainer: "Stats-module_ctaContainer__WSxUG",
        guess: "Stats-module_guess__3MeYM",
      });
  Te(
    ".Stats-module_gameStats__ZP1aW {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding-top: 16px;\n}\n.Stats-module_gameStats__ZP1aW h1 {\n  font-weight: 700;\n  font-size: 14px;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  text-align: center;\n  margin-bottom: 4px;\n  line-height: 18px;\n  margin-top: 12px;\n}\n.Stats-module_gameStats__ZP1aW .Stats-module_statisticsHeading__9B0IG {\n  line-height: 20px;\n  margin-top: 0;\n  margin-bottom: 4px;\n  letter-spacing: 0.05em;\n}\n\n.Stats-module_statistics__Hke7Z {\n  display: flex;\n}\n\n.Stats-module_statisticContainer__XORTW {\n  flex: 1;\n  margin-left: 12px;\n}\n.Stats-module_statisticContainer__XORTW:last-child {\n  margin-right: 12px;\n}\n\n.Stats-module_statisticContainer__XORTW .Stats-module_statistic__fr8JZ {\n  font-size: 34px;\n  font-weight: 400;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  letter-spacing: 0.05em;\n  font-variant-numeric: proportional-nums;\n  line-height: 36px;\n}\n\n.Stats-module_statistic__fr8JZ.Stats-module_timer__xn2mu {\n  font-variant-numeric: initial;\n  font-size: 32px;\n  line-height: 34px;\n  letter-spacing: 0.025em;\n}\n\n.Stats-module_statisticContainer__XORTW .Stats-module_label__pLAui {\n  font-size: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  line-height: 14px;\n  letter-spacing: 0.1em;\n}\n\n.Stats-module_guessDistribution__J8Int {\n  width: 80%;\n}\n\n.Stats-module_graphContainer__BlVFU {\n  width: 100%;\n  height: 18px;\n  display: flex;\n  align-items: center;\n  padding-bottom: 4px;\n  font-size: 14px;\n  line-height: 20px;\n}\n\n.Stats-module_graphContainer__BlVFU .Stats-module_graph__l2LGn {\n  width: 100%;\n  height: 100%;\n  padding-left: 4px;\n}\n\n.Stats-module_graphContainer__BlVFU .Stats-module_graph__l2LGn .Stats-module_graphBar__TvsIP {\n  height: 100%;\n  /* Assume no wins */\n  width: 0%;\n  position: relative;\n  background-color: var(--color-absent);\n  display: flex;\n  justify-content: center;\n}\n\n.Stats-module_graphContainer__BlVFU .Stats-module_graph__l2LGn .Stats-module_graphBar__TvsIP.Stats-module_highlight__fBBiL {\n  background-color: var(--color-correct);\n}\n\n.Stats-module_graphContainer__BlVFU .Stats-module_graph__l2LGn .Stats-module_graphBar__TvsIP.Stats-module_alignRight__29Xhl {\n  justify-content: flex-end;\n  padding-right: 8px;\n}\n\n.Stats-module_graphContainer__BlVFU .Stats-module_graph__l2LGn .Stats-module_numGuesses__aB7UF {\n  font-weight: bold;\n  color: var(--tile-text-color);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.Stats-module_footer__IY-Bt {\n  display: flex;\n  width: 100%;\n}\n\n.Stats-module_countdown__a-cWu {\n  border-right: 1px solid var(--color-tone-1);\n  padding-right: 12px;\n  width: 50%;\n}\n\n.Stats-module_share__kfJ-m {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding-left: 12px;\n  width: 50%;\n}\n\n.Stats-module_noData__D3wkv {\n  text-align: center;\n  margin-bottom: 10px;\n}\n\n.Stats-module_shareButton__eNFFD {\n  background-color: var(--key-bg-correct);\n  color: var(--key-evaluated-text-color);\n  font-family: inherit;\n  font-weight: bold;\n  border-radius: 4px;\n  cursor: pointer;\n  border: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: row;\n  text-transform: uppercase;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);\n  width: 80%;\n  font-size: 20px;\n  height: 52px;\n  filter: brightness(100%);\n}\n\n@media (max-width: 444px) {\n  .Stats-module_shareButton__eNFFD {\n    font-size: 16px;\n  }\n}\n.Stats-module_shareButton__eNFFD:hover {\n  opacity: 0.9;\n}\n\n.Stats-module_shareIconContainer__j2o6K {\n  width: 24px;\n  height: 24px;\n  padding-left: 8px;\n}\n\n.Stats-module_statsBtnLeft__q1PQ8 {\n  justify-content: unset;\n  width: 80%;\n  margin: 12px 0px 20px 15px;\n}\n\n.Stats-module_statsBtnCenter__Kgi5x {\n  margin: 10px;\n}\n\n.Stats-module_statsInfoBtn__WUPls {\n  all: unset;\n  text-decoration: underline;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 16px;\n  margin-bottom: 20px;\n  color: var(--color-tone-10);\n}\n\n.Stats-module_promoButton__8dcY3 {\n  border: 1px solid var(--color-tone-1);\n  padding: 10px;\n  border-radius: 105px;\n  background: var(--color-tone-7);\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 16px;\n  color: inherit;\n  text-decoration: none;\n  width: 150px;\n  display: flex;\n  width: 66%;\n  align-items: center;\n  vertical-align: middle;\n  justify-content: center;\n}\n\n.Stats-module_promoIcon__1c9qr {\n  width: 25px;\n  height: 25px;\n  background-image: var(--spelling-bee-promo);\n  background-size: 25px;\n  background-position: center;\n  margin-left: 5px;\n}\n\n.Stats-module_promoButtonContainer__xUFtx {\n  border-top: 1px solid var(--color-tone-9);\n  width: 100%;\n  justify-content: center;\n  display: flex;\n  padding-top: 20px;\n}\n\n.Stats-module_ctaContainer__WSxUG {\n  width: 100%;\n}\n\n.Stats-module_guess__3MeYM {\n  font-weight: bold;\n  font-size: 12px;\n  line-height: 18px;\n  letter-spacing: 0.1em;\n}",
  );
  var Nt = {
      currentStreak: "Current Streak",
      maxStreak: "Max Streak",
      winPercentage: "Win %",
      gamesPlayed: "Played",
      gamesWon: "Won",
      averageGuesses: "Av. Guesses",
    },
    Ct = ["gamesPlayed", "winPercentage", "currentStreak", "maxStreak"];
  function Ot(e) {
    var n = e.stats;
    return f.createElement(
      "div",
      {className: jt.statistics},
      Ct.map(function (e) {
        var t = n[e];
        return f.createElement(
          "div",
          {className: jt.statisticContainer, key: e},
          f.createElement("div", {className: jt.statistic}, t),
          f.createElement("div", {className: jt.label}, Nt[e]),
        );
      }),
    );
  }
  function At(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return It(e);
      })(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return It(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? It(e, t)
            : void 0;
        }
      })(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function It(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function Tt(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function Lt(e) {
    var t = e.guesses,
      n = e.rowIndex,
      a = e.gameStatus,
      o = [],
      r = Math.max.apply(Math, At(Object.values(t)));
    if (
      Object.values(t).every(function (e) {
        return 0 === e;
      })
    )
      return f.createElement(
        f.Fragment,
        null,
        f.createElement("h1", null, "Guess Distribution"),
        f.createElement("div", {className: jt.noData}, "No Data"),
      );
    for (var s, i, l = 1; l < Object.keys(t).length; l += 1) {
      var u = l,
        c = t[l],
        d = {
          rowGuess: u,
          percentGuesses: Math.max(7, Math.round((c / r) * 100)),
          numGuesses: c,
          addHighlight: "WIN" === a && l === n,
          index: l,
        },
        m =
          ((u = m = i = s = void 0),
          (s = (c = d).rowGuess),
          (i = d.percentGuesses),
          (m = d.numGuesses),
          (u = d.addHighlight),
          (c = d.index),
          f.createElement(
            "div",
            {className: jt.graphContainer, key: c},
            f.createElement("div", {className: jt.guess}, s),
            f.createElement(
              "div",
              {className: jt.graph},
              f.createElement(
                "div",
                {
                  style: {width: "".concat(i, "%")},
                  className: classNames(
                    jt.graphBar,
                    (Tt((i = {}), jt.alignRight, 0 < m),
                    Tt(i, jt.highlight, u),
                    i),
                  ),
                },
                f.createElement("div", {className: jt.numGuesses}, m),
              ),
            ),
          ));
      o.push(m);
    }
    return f.createElement(
      f.Fragment,
      null,
      f.createElement("h1", null, "Guess Distribution"),
      f.createElement("div", {className: jt.guessDistribution}, o),
    );
  }
  function Pt(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Mt(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Mt(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function Mt(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  var Rt = 1e3,
    Dt = 60 * Rt,
    Bt = 60 * Dt,
    Ht = 24 * Bt,
    qt = function (e) {
      return e.toString().padStart(2, "0");
    };
  function Wt() {
    var e = Pt(React.useState(""), 2),
      t = e[0],
      a = e[1];
    return (
      React.useEffect(function () {
        var e = new Date();
        e.setDate(e.getDate() + 1), e.setHours(0, 0, 0, 0);
        var t = e.getTime(),
          e = function () {
            return a(
              (function (e) {
                var t = new Date().getTime(),
                  n = Math.floor(e - t);
                if (n <= 0) return "00:00:00";
                (e = Math.floor((n % Ht) / Bt)),
                  (t = Math.floor((n % Bt) / Dt)),
                  (n = Math.floor((n % Dt) / Rt));
                return "".concat(qt(e), ":").concat(qt(t), ":").concat(qt(n));
              })(t),
            );
          },
          n = setInterval(e, 200);
        return (
          e(),
          function () {
            return clearInterval(n);
          }
        );
      }, []),
      f.createElement(
        "div",
        {className: jt.statisticContainer},
        f.createElement(
          "div",
          {className: classNames(jt.statistic, jt.timer)},
          f.createElement("div", {id: "timer", "data-testid": "timer"}, t),
        ),
      )
    );
  }
  var Gt = {
    promo: "Promo-module_promo__OjSS6",
    promoLink: "Promo-module_promoLink__9Rsas",
    promoCta: "Promo-module_promoCta__J70IK",
    promoText: "Promo-module_promoText__wg6Vu",
    promoTitle: "Promo-module_promoTitle__TgBo2",
    promoTextPrimary: "Promo-module_promoTextPrimary__chnyc",
    promoTextSecondary: "Promo-module_promoTextSecondary__mjI5B",
    promoIcon: "Promo-module_promoIcon__GIqUm",
    promoArrow: "Promo-module_promoArrow__iqw6N",
    rule: "Promo-module_rule__Yn4Pk",
  };
  function Ft() {
    return f.createElement(
      "div",
      {className: Gt.promo},
      f.createElement("div", {className: Gt.rule}),
      f.createElement(
        "a",
        {
          href: "https://www.nytimes.com/puzzles/spelling-bee",
          className: Gt.promoLink,
          onClick: function (e) {
            return e.stopPropagation();
          },
        },
        f.createElement(
          "div",
          {className: Gt.promoIcon},
          f.createElement(
            "svg",
            {
              width: "42",
              height: "44",
              viewBox: "0 0 42 44",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            f.createElement("path", {
              d: "M24.9528 14.8924L28.952 21.8171L24.9528 28.7417H16.9628L12.9636 21.8171L16.9628 14.8924H24.9528Z",
              fill: "#F7DA21",
              stroke: "#F7DA21",
              strokeWidth: "0.495011",
            }),
            f.createElement("path", {
              d: "M12.9892 21.7667L16.9884 28.6914L12.9892 35.616H4.99921L1 28.6914L4.99921 21.7667H12.9892Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
            f.createElement("path", {
              d: "M17.0056 14.8493L13.0064 7.92463L17.0056 1L24.9955 1L28.9948 7.92463L24.9955 14.8493L17.0056 14.8493Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
            f.createElement("path", {
              d: "M37.0008 7.96736L41 14.892L37.0008 21.8166H29.0108L25.0116 14.892L29.0108 7.96736H37.0008Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
            f.createElement("path", {
              d: "M12.9972 7.96736L16.9964 14.892L12.9972 21.8166H5.00727L1.00806 14.892L5.00727 7.96736H12.9972Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
            f.createElement("path", {
              d: "M37.0008 21.8089L41 28.7335L37.0008 35.6582H29.0108L25.0116 28.7335L29.0108 21.8089H37.0008Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
            f.createElement("path", {
              d: "M24.9947 28.7333L28.9939 35.658L24.9947 42.5826H17.0047L13.0055 35.658L17.0047 28.7333H24.9947Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
          ),
        ),
        f.createElement(
          "div",
          {className: Gt.promoText},
          f.createElement(
            "span",
            {className: Gt.promoTextPrimary},
            "How many words can you find",
            " ",
          ),
          f.createElement(
            "span",
            {className: Gt.promoTextsecondary},
            "using 7 letters?",
          ),
          f.createElement(
            "span",
            {className: Gt.promoCta},
            "Play Spelling Bee",
          ),
        ),
        f.createElement(
          "div",
          {className: Gt.promoArrow},
          f.createElement(
            "svg",
            {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            f.createElement("circle", {
              cx: "12",
              cy: "12",
              r: "12",
              fill: "var(--svg-arrow-fill)",
            }),
            f.createElement("path", {
              d: "M10.4038 6L15.8076 11.4038L10.4038 16.8076",
              stroke: "var(--svg-arrow-stroke)",
              strokeWidth: "1.5",
              strokeLinecap: "round",
            }),
          ),
        ),
      ),
    );
  }
  function Yt(e, s, i, l) {
    return new (i = i || Promise)(function (n, t) {
      function a(e) {
        try {
          r(l.next(e));
        } catch (e) {
          t(e);
        }
      }
      function o(e) {
        try {
          r(l.throw(e));
        } catch (e) {
          t(e);
        }
      }
      function r(e) {
        var t;
        e.done
          ? n(e.value)
          : ((t = e.value) instanceof i
              ? t
              : new i(function (e) {
                  e(t);
                })
            ).then(a, o);
      }
      r((l = l.apply(e, s || [])).next());
    });
  }
  function Vt(n, a) {
    var o,
      r,
      s,
      i = {
        label: 0,
        sent: function () {
          if (1 & s[0]) throw s[1];
          return s[1];
        },
        trys: [],
        ops: [],
      },
      e = {next: t(0), throw: t(1), return: t(2)};
    return (
      "function" == typeof Symbol &&
        (e[Symbol.iterator] = function () {
          return this;
        }),
      e
    );
    function t(t) {
      return function (e) {
        return (function (t) {
          if (o) throw new TypeError("Generator is already executing.");
          for (; i; )
            try {
              if (
                ((o = 1),
                r &&
                  (s =
                    2 & t[0]
                      ? r.return
                      : t[0]
                      ? r.throw || ((s = r.return) && s.call(r), 0)
                      : r.next) &&
                  !(s = s.call(r, t[1])).done)
              )
                return s;
              switch (((r = 0), (t = s ? [2 & t[0], s.value] : t)[0])) {
                case 0:
                case 1:
                  s = t;
                  break;
                case 4:
                  return i.label++, {value: t[1], done: !1};
                case 5:
                  i.label++, (r = t[1]), (t = [0]);
                  continue;
                case 7:
                  (t = i.ops.pop()), i.trys.pop();
                  continue;
                default:
                  if (
                    !(
                      (s = 0 < (s = i.trys).length && s[s.length - 1]) ||
                      (6 !== t[0] && 2 !== t[0])
                    )
                  ) {
                    i = 0;
                    continue;
                  }
                  if (3 === t[0] && (!s || (t[1] > s[0] && t[1] < s[3]))) {
                    i.label = t[1];
                    break;
                  }
                  if (6 === t[0] && i.label < s[1]) {
                    (i.label = s[1]), (s = t);
                    break;
                  }
                  if (s && i.label < s[2]) {
                    (i.label = s[2]), i.ops.push(t);
                    break;
                  }
                  s[2] && i.ops.pop(), i.trys.pop();
                  continue;
              }
              t = a.call(n, i);
            } catch (e) {
              (t = [6, e]), (r = 0);
            } finally {
              o = s = 0;
            }
          if (5 & t[0]) throw t[1];
          return {value: t[0] ? t[1] : void 0, done: !0};
        })([t, e]);
      };
    }
  }
  Te(
    '.Promo-module_promo__OjSS6 {\n  margin-top: 12px;\n  width: 100%;\n}\n\n.Promo-module_promoLink__9Rsas {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: flex-start;\n  text-decoration: none;\n  padding-top: 16px;\n}\n.Promo-module_promoLink__9Rsas:hover {\n  --svg-arrow-fill: var(--svg-arrow-fill-hover);\n  --svg-arrow-stroke: var(--svg-arrow-stroke-hover);\n}\n.Promo-module_promoLink__9Rsas:hover .Promo-module_promoCta__J70IK {\n  text-decoration: underline;\n}\n\n.Promo-module_promoText__wg6Vu {\n  font-family: "nyt-franklin-500";\n  font-size: 14px;\n  color: var(--color-tone-1);\n  flex-grow: 2;\n  line-height: 16px;\n}\n\n.Promo-module_promoTitle__TgBo2 {\n  font-family: "nyt-franklin";\n  font-weight: 700;\n}\n\n.Promo-module_promoCta__J70IK {\n  display: block;\n  font-family: "nyt-franklin";\n  font-weight: 700;\n  margin-top: 4px;\n}\n\n/* Text balancing */\n.Promo-module_promoTextPrimary__chnyc {\n  display: inline;\n}\n\n/* Text balancing */\n.Promo-module_promoTextSecondary__mjI5B {\n  display: inline;\n}\n\n/* Text balancing */\n@media (max-width: 500px) {\n  .Promo-module_promoTextPrimary__chnyc {\n    display: block;\n  }\n\n  .Promo-module_promoTextSecondary__mjI5B {\n    display: block;\n  }\n}\n.Promo-module_promoIcon__GIqUm {\n  width: var(--promo-icon-width);\n  height: var(--promo-icon-height);\n  margin-right: 16px;\n  padding: var(--promo-icon-padding);\n}\n\n.Promo-module_promoArrow__iqw6N {\n  justify-self: flex-end;\n}\n\n.Promo-module_rule__Yn4Pk {\n  margin-left: -16px;\n  height: 1px;\n  position: absolute;\n  width: 100%;\n  background-color: var(--color-tone-4);\n}',
  ),
    function () {
      (console.warn || console.log).apply(console, arguments);
    }.bind("[clipboard-polyfill]");
  var qe = "undefined" == typeof navigator ? void 0 : navigator,
    Se = null == qe ? void 0 : qe.clipboard,
    Ut =
      (null === (qe = null == Se ? void 0 : Se.read) ||
        void 0 === qe ||
        qe.bind(Se),
      null === (qe = null == Se ? void 0 : Se.readText) ||
        void 0 === qe ||
        qe.bind(Se),
      null === (qe = null == Se ? void 0 : Se.write) ||
        void 0 === qe ||
        qe.bind(Se),
      null === (qe = null == Se ? void 0 : Se.writeText) || void 0 === qe
        ? void 0
        : qe.bind(Se)),
    qe = "undefined" == typeof window ? void 0 : window,
    Zt = (null == qe || qe.ClipboardItem, qe);
  function Xt() {
    this.success = !1;
  }
  function Kt(e) {
    var t = new Xt(),
      e = function (e, t, n) {
        for (var a in ((e.success = !0), t)) {
          var o = t[a],
            r = n.clipboardData;
          r.setData(a, o),
            "text/plain" === a && r.getData(a) !== o && (e.success = !1);
        }
        n.preventDefault();
      }.bind(this, t, e);
    document.addEventListener("copy", e);
    try {
      document.execCommand("copy");
    } finally {
      document.removeEventListener("copy", e);
    }
    return t.success;
  }
  function Jt(e, t) {
    Qt(e);
    t = Kt(t);
    return $t(), t;
  }
  function Qt(e) {
    var t,
      n = document.getSelection();
    n &&
      ((t = document.createRange()).selectNodeContents(e),
      n.removeAllRanges(),
      n.addRange(t));
  }
  function $t() {
    var e = document.getSelection();
    e && e.removeAllRanges();
  }
  function en(a) {
    return Yt(this, void 0, void 0, function () {
      var n;
      return Vt(this, function (e) {
        if (
          ((n = "text/plain" in a),
          "undefined" != typeof ClipboardEvent ||
            void 0 === Zt.clipboardData ||
            void 0 === Zt.clipboardData.setData)
        )
          return Kt(a) ||
            -1 < navigator.userAgent.indexOf("Edge") ||
            Jt(document.body, a) ||
            (function (e) {
              var t = document.createElement("div");
              t.setAttribute("style", "-webkit-user-select: text !important"),
                (t.textContent = "temporary element"),
                document.body.appendChild(t);
              e = Jt(t, e);
              return document.body.removeChild(t), e;
            })(a) ||
            (function (e) {
              var t = document.createElement("div");
              t.setAttribute("style", "-webkit-user-select: text !important");
              var n = t;
              t.attachShadow && (n = t.attachShadow({mode: "open"}));
              var a = document.createElement("span");
              (a.innerText = e),
                n.appendChild(a),
                document.body.appendChild(t),
                Qt(a);
              a = document.execCommand("copy");
              return $t(), document.body.removeChild(t), a;
            })(a["text/plain"])
            ? [2, !0]
            : [2, !1];
        var t;
        if (!n) throw new Error("No `text/plain` value was specified.");
        if (((t = a["text/plain"]), Zt.clipboardData.setData("Text", t)))
          return [2, !0];
        throw new Error(
          "Copying failed, possibly because the user rejected it.",
        );
      });
    });
  }
  function tn(n) {
    return Yt(this, void 0, void 0, function () {
      return Vt(this, function (e) {
        if (Ut) return [2, Ut(n)];
        if (!en((((t = {})["text/plain"] = n), t)))
          throw new Error("writeText() failed");
        var t;
        return [2];
      });
    });
  }
  function nn() {
    var e = navigator.userAgent || navigator.vendor || window.opera;
    return (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        e,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        e.substr(0, 4),
      )
    );
  }
  function an(e, t, n) {
    try {
      nn() &&
      !(-1 < navigator.userAgent.toLowerCase().indexOf("firefox")) &&
      void 0 !== navigator.share &&
      navigator.canShare &&
      navigator.canShare(e)
        ? navigator.share(e).catch(function () {})
        : tn(e.text).then(t, n);
    } catch (e) {
      n(), console.warn("Share failed", e);
    }
  }
  var on = "AuthCTA-module_container__mFg-m",
    rn = "AuthCTA-module_icon__fZT88",
    sn = "AuthCTA-module_promoIcon__2-SRz",
    ln = "AuthCTA-module_textContainer__kIjDX",
    un = "AuthCTA-module_bold__ThmkP",
    cn = "AuthCTA-module_subText__2Qsw5",
    dn = "AuthCTA-module_title__iBYtq",
    mn = "AuthCTA-module_line1__ehobb",
    pn = "AuthCTA-module_buttonsContainer__y0b1J",
    yn = "AuthCTA-module_moreLink__pAJHo",
    gn = "AuthCTA-module_loginButton__0FcEr",
    hn = "AuthCTA-module_footer__9-hGG",
    fn = "AuthCTA-module_footerContainer__j9w3x",
    bn = "AuthCTA-module_promoButton__i3iNK",
    kn = "AuthCTA-module_shareButton__SsNA6",
    wn = "AuthCTA-module_shareIcon__x5WtP",
    vn = "AuthCTA-module_shareText__o7WL-";
  function _n(e) {
    var t = e.loggedIn,
      n = e.moogleOptedIn,
      a = x(),
      e = t && !n,
      o = "IN_PROGRESS" !== S(me);
    return n
      ? null
      : f.createElement(
          f.Fragment,
          null,
          f.createElement(
            "div",
            {className: on},
            f.createElement(
              "div",
              null,
              f.createElement("img", {
                className: rn,
                alt: "Statistics Graph Bar in Green with Check Mark",
                style: {content: "var(--stats-auth)"},
              }),
            ),
            f.createElement(
              "div",
              {className: ln},
              f.createElement("p", {className: dn}, "New"),
              f.createElement(
                "p",
                {className: classNames(un, mn)},
                "Link your stats to ",
                t ? "this" : "a free",
                " New York Times account.",
              ),
              f.createElement(
                "p",
                {className: cn},
                "Your stats ",
                !t && "and streak",
                " will save wherever you play.",
              ),
            ),
          ),
          f.createElement(
            "div",
            {className: pn},
            !t &&
              f.createElement(
                "div",
                {className: gn},
                f.createElement(
                  "a",
                  {
                    type: "link",
                    "aria-label":
                      "Log in or create a free account link. Click to sign in.",
                    tabIndex: -1,
                    href: We,
                    onClick: function () {
                      o && a($("log-in-congrats", !0));
                    },
                  },
                  "Log in or create a free account",
                ),
              ),
            e &&
              f.createElement(
                "button",
                {
                  type: "button",
                  className: gn,
                  "aria-label": "Link stats to my account",
                  onClick: function () {
                    o && a($("stats-link-congrats", !0)), a(U("statsLink"));
                  },
                },
                "Link stats to my account",
              ),
            f.createElement("br", null),
            f.createElement(
              "button",
              {
                className: yn,
                type: "button",
                onClick: function () {
                  a(U("linkInfo")), o && a($("stats-link-more-info", !0));
                },
              },
              "Tell me more >",
            ),
          ),
        );
  }
  function xn(e) {
    e = e.handleShare;
    return f.createElement(
      "div",
      {className: hn},
      f.createElement("p", null, "NEXT WORDLE"),
      f.createElement(Wt, null),
      f.createElement(
        "div",
        {className: fn},
        f.createElement(
          "a",
          {
            type: "button",
            id: "promo-button",
            className: bn,
            href: "https://www.nytimes.com/puzzles/spelling-bee",
          },
          f.createElement("span", null, "Play Spelling Bee"),
          f.createElement("span", {className: sn}),
        ),
        f.createElement(
          "button",
          {type: "button", id: "share-button", className: kn, onClick: e},
          f.createElement("span", {className: vn}, "Share"),
          f.createElement(v, {id: wn, icon: "share"}),
        ),
      ),
    );
  }
  function Sn() {
    var t = x(),
      e = S(Xe),
      n = S(me),
      a = S(pe),
      o = S(it),
      r = "IN_PROGRESS" !== n,
      s = S(ft),
      i = !!S(vt),
      l = ht("auth") || s;
    React.useEffect(function () {
      t(Ke(r));
    }, []);
    function u(e) {
      e.preventDefault(),
        e.stopPropagation(),
        an(
          o,
          function () {
            t(Je()),
              t(
                Q({
                  text: "Copied results to clipboard",
                  duration: 2e3,
                  isSystem: !0,
                }),
              );
          },
          function () {
            t(Q({text: "Share failed", duration: 2e3, isSystem: !0}));
          },
        );
    }
    if (l) {
      l = 0 === e.gamesPlayed ? jt.statsBtnCenter : jt.statsBtnLeft;
      return f.createElement(
        "div",
        {"data-testid": "authContainer", className: jt.gameStats},
        f.createElement("h1", {className: jt.statisticsHeading}, "Statistics"),
        f.createElement(Ot, {stats: e}),
        f.createElement(Lt, {guesses: e.guesses, rowIndex: a, gameStatus: n}),
        f.createElement(
          "div",
          {className: l},
          f.createElement(
            "button",
            {
              type: "button",
              className: jt.statsInfoBtn,
              onClick: function () {
                return t(U("statsProblem"));
              },
            },
            "My stats don't look right >",
          ),
        ),
        f.createElement(
          "div",
          {className: jt.ctaContainer},
          f.createElement(_n, {loggedIn: i, moogleOptedIn: s}),
          r
            ? f.createElement(xn, {handleShare: u})
            : f.createElement(
                "div",
                {className: jt.promoButtonContainer},
                f.createElement(
                  "a",
                  {
                    type: "button",
                    id: "promo-button",
                    className: jt.promoButton,
                    href: "https://www.nytimes.com/puzzles/spelling-bee",
                  },
                  f.createElement("span", null, "Play Spelling Bee"),
                  f.createElement("span", {className: jt.promoIcon}),
                ),
              ),
        ),
      );
    }
    return f.createElement(
      "div",
      {className: jt.gameStats},
      f.createElement("h1", null, "Statistics"),
      f.createElement(Ot, {stats: e}),
      f.createElement(Lt, {guesses: e.guesses, rowIndex: a, gameStatus: n}),
      r &&
        f.createElement(
          "div",
          {className: jt.footer},
          f.createElement(
            "div",
            {className: jt.countdown},
            f.createElement("h1", null, "Next WORDLE"),
            f.createElement(Wt, null),
          ),
          f.createElement(
            "div",
            {className: jt.share},
            f.createElement(
              "button",
              {
                type: "button",
                id: "share-button",
                className: jt.shareButton,
                onClick: u,
              },
              "Share",
              f.createElement(
                "span",
                {className: jt.shareIconContainer},
                f.createElement(v, {icon: "share"}),
              ),
            ),
          ),
        ),
      f.createElement(Ft, null),
    );
  }
  Te(
    ".AuthCTA-module_container__mFg-m {\n  border-top: 1px solid var(--color-tone-9);\n  text-align: left;\n  display: flex;\n  padding: 10px;\n  padding-bottom: 7px;\n  padding-left: 14px;\n}\n\n@media (min-width: 500px) {\n  .AuthCTA-module_container__mFg-m {\n    padding: 15px 50px 10px 50px;\n  }\n}\n.AuthCTA-module_icon__fZT88 {\n  padding-top: 10px;\n}\n\n.AuthCTA-module_promoIcon__2-SRz {\n  width: 25px;\n  height: 25px;\n  background-image: var(--spelling-bee-promo);\n  background-size: 25px;\n  background-position: center;\n  margin-left: 5px;\n}\n\n.AuthCTA-module_textContainer__kIjDX > p {\n  margin: 5px;\n}\n.AuthCTA-module_textContainer__kIjDX .AuthCTA-module_bold__ThmkP {\n  color: var(--color-tone-1);\n  font-weight: 700;\n  font-size: 16px;\n  line-height: 20px;\n}\n.AuthCTA-module_textContainer__kIjDX .AuthCTA-module_subText__2Qsw5 {\n  color: var(--color-tone-11);\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 16px;\n  margin-bottom: 12px;\n}\n.AuthCTA-module_textContainer__kIjDX .AuthCTA-module_title__iBYtq {\n  color: #2671dc;\n  font-weight: 700;\n  font-size: 11px;\n  line-height: 12px;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin-bottom: 2px;\n}\n.AuthCTA-module_textContainer__kIjDX .AuthCTA-module_line1__ehobb {\n  margin-bottom: 0;\n}\n.AuthCTA-module_textContainer__kIjDX .AuthCTA-module_line2__3-cVE {\n  margin-top: 0;\n  margin-bottom: 4px;\n}\n\n.AuthCTA-module_buttonsContainer__y0b1J {\n  text-align: center;\n  margin-top: 10px;\n}\n.AuthCTA-module_buttonsContainer__y0b1J .AuthCTA-module_moreLink__pAJHo {\n  all: unset;\n  text-decoration: underline;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 16px;\n  color: var(--color-tone-11);\n  margin: 10px 20px 20px 20px;\n}\n.AuthCTA-module_buttonsContainer__y0b1J .AuthCTA-module_loginButton__0FcEr {\n  background-color: var(--color-tone-7);\n  color: var(--color-tone-1);\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 14px;\n  border: 1px solid var(--color-tone-1);\n  border-radius: 55px;\n  align-items: center;\n  text-align: center;\n  letter-spacing: 0.04em;\n  text-decoration: none;\n  padding: 14px 5px;\n}\n.AuthCTA-module_buttonsContainer__y0b1J .AuthCTA-module_loginButton__0FcEr > a {\n  color: inherit;\n  text-decoration: none;\n}\n\n@media (min-width: 500px) {\n  .AuthCTA-module_buttonsContainer__y0b1J {\n    width: 80%;\n    margin: 0 auto;\n  }\n\n  .AuthCTA-module_loginButton__0FcEr {\n    width: 90%;\n    margin: 0 auto;\n  }\n}\n@media (max-width: 499px) {\n  .AuthCTA-module_buttonsContainer__y0b1J {\n    width: 70%;\n    margin: 0 auto;\n  }\n\n  .AuthCTA-module_loginButton__0FcEr {\n    width: 100%;\n  }\n}\n.AuthCTA-module_footer__9-hGG {\n  text-align: center;\n  width: 100%;\n  border-top: 1px solid var(--color-tone-9);\n}\n.AuthCTA-module_footer__9-hGG p {\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 20px;\n  align-items: center;\n  letter-spacing: 0.07em;\n  margin-top: 12px;\n  margin-bottom: 12px;\n}\n\n.AuthCTA-module_footerContainer__j9w3x {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-top: 12px;\n}\n.AuthCTA-module_footerContainer__j9w3x > a.AuthCTA-module_promoButton__i3iNK,\n.AuthCTA-module_footerContainer__j9w3x button.AuthCTA-module_shareButton__SsNA6 {\n  width: 50%;\n}\n\n.AuthCTA-module_promoButton__i3iNK {\n  border: 1px solid var(--color-tone-1);\n  padding: 10px;\n  border-radius: 105px;\n  background: var(--color-tone-7);\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 16px;\n  color: inherit;\n  text-decoration: none;\n  display: flex;\n  align-items: center;\n  margin-right: 12px;\n  vertical-align: middle;\n  justify-content: center;\n}\n\n.AuthCTA-module_shareButton__SsNA6 {\n  background-color: var(--green);\n  color: var(--color-tone-7);\n  border-radius: 104px;\n  border: none;\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 16px;\n  width: 80%;\n  vertical-align: middle;\n}\n\n#AuthCTA-module_shareIcon__x5WtP {\n  vertical-align: middle;\n  margin-left: 10px;\n}\n\n.AuthCTA-module_shareText__o7WL- {\n  color: var(--white);\n}",
  );
  function En() {
    var e,
      t,
      n,
      a =
        0 < arguments.length && void 0 !== arguments[0]
          ? arguments[0]
          : "Wordle Feedback",
      o = new Date().getTimezoneOffset(),
      o = "\r\n\r\n\n--\nDevice summary:\nPage: /games/wordle\nPlatform: "
        .concat(nn() ? "Web (Mobile)" : "Web (Desktop)", " \nBrowser: ")
        .concat(
          (e = e =
            (e = navigator.userAgent).match(/chrome|chromium|crios/i)
              ? "chrome"
              : e.match(/firefox|fxios/i)
              ? "firefox"
              : e.match(/safari/i)
              ? "safari"
              : e.match(/opr\//i)
              ? "opera"
              : e.match(/edg/i)
              ? "edge"
              : "No browser detection")
            .charAt(0)
            .toUpperCase() + e.slice(1),
          "\nScreen Resolution: ",
        )
        .concat(window.screen.width, " x ")
        .concat(window.screen.height, "\nViewport Size: ")
        .concat(document.documentElement.clientWidth, " x ")
        .concat(
          document.documentElement.clientHeight,
          "\nTimezone: ",
          "UTC".concat(0 < o ? "" : "+").concat(o / -60),
          "\nBuild: ",
        )
        .concat(
          null === (o = window.sentryConfig) || void 0 === o
            ? void 0
            : o.release,
          "\n  ",
        );
    return (
      "mailto:nytgames@nytimes.com" +
      ((t = {subject: a, body: o}),
      (n = []),
      Object.keys(t).forEach(function (e) {
        n.push(
          ""
            .concat(encodeURIComponent(e), "=")
            .concat(encodeURIComponent(t[e])),
        );
      }),
      "?".concat(n.join("&")))
    );
  }
  function zn(e, t) {
    return {type: jn, payload: {name: e, value: t}};
  }
  var jn = "wordle/settings/CHANGE_SETTING",
    Nn = "Switch-module_container__DiBse",
    Cn = "Switch-module_switch__LLcMj",
    On = "Switch-module_knob__oRTpP",
    An = "Switch-module_checked__81fA3",
    In = "Switch-module_disabled__6ofuZ";
  function Tn(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  Te(
    ".Switch-module_container__DiBse {\n  display: flex;\n  justify-content: space-between;\n}\n\n.Switch-module_switch__LLcMj {\n  height: 20px;\n  width: 32px;\n  background: var(--color-tone-3);\n  border: none;\n  border-radius: 999px;\n  display: block;\n  position: relative;\n}\n\n.Switch-module_knob__oRTpP {\n  display: block;\n  position: absolute;\n  left: 2px;\n  top: 2px;\n  height: calc(100% - 4px);\n  width: 50%;\n  border-radius: 8px;\n  background: var(--white);\n  transform: translateX(0);\n  transition: transform 0.3s;\n}\n\n.Switch-module_checked__81fA3 .Switch-module_switch__LLcMj {\n  background: var(--color-correct);\n}\n.Switch-module_checked__81fA3 .Switch-module_knob__oRTpP {\n  transform: translateX(calc(100% - 4px));\n}\n\n.Switch-module_container__DiBse.Switch-module_disabled__6ofuZ .Switch-module_switch__LLcMj {\n  opacity: 0.5;\n}",
  );
  function Ln(e) {
    var t = e.disabled,
      n = e.name,
      a = e.onClick,
      o = e.selected;
    return f.createElement(
      "div",
      {id: n, className: classNames(Nn, (Tn((e = {}), An, o), Tn(e, In, t), e))},
      f.createElement(
        "button",
        {
          "aria-checked": o,
          "aria-label": n,
          className: Cn,
          onClick: a,
          role: "switch",
          type: "button",
        },
        f.createElement("span", {className: On}),
      ),
    );
  }
  var Pn = "Settings-module_setting__IdN-T",
    Mn = "Settings-module_title__f-cFy",
    Rn = "Settings-module_text__o3woy",
    Dn = "Settings-module_description__rTo9u",
    Bn = "Settings-module_footnote__UtMtH",
    Hn = "Settings-module_enableAuth__TOxGg";
  Te(
    ".Settings-module_setting__IdN-T {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid var(--color-tone-4);\n  padding: 16px 0;\n}\n.Settings-module_setting__IdN-T a,\n.Settings-module_setting__IdN-T a:visited {\n  color: var(--color-tone-2);\n}\n\n.Settings-module_title__f-cFy {\n  font-size: 18px;\n}\n\n.Settings-module_text__o3woy {\n  padding-right: 8px;\n}\n\n.Settings-module_description__rTo9u {\n  font-size: 12px;\n  color: var(--color-tone-2);\n}\n\n.Settings-module_footnote__UtMtH {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 16px;\n  color: var(--color-tone-2);\n  font-size: 12px;\n  text-align: right;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n\n@media (min-width: 501px) {\n  .Settings-module_footnote__UtMtH.Settings-module_enableAuth__TOxGg {\n    position: initial;\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\n  .Settings-module_setting__IdN-T {\n    padding: 16px;\n  }\n}",
  );
  var qn = function () {
      var e = x(),
        t = S(ge),
        n = S(me),
        a = S(pe),
        o = S(tt),
        r = S(et),
        s = S($e),
        i = S(ft),
        l = ht("auth"),
        u = !s && "IN_PROGRESS" === n && 0 !== a,
        a = l || i;
      return f.createElement(
        f.Fragment,
        null,
        f.createElement(
          "div",
          null,
          f.createElement(
            "section",
            null,
            f.createElement(
              "div",
              {className: Pn},
              f.createElement(
                "div",
                {className: Rn},
                f.createElement("div", {className: Mn}, "Hard Mode"),
                f.createElement(
                  "div",
                  {className: Dn},
                  "Any revealed hints must be used in subsequent guesses",
                ),
              ),
              f.createElement(
                "div",
                null,
                f.createElement(Ln, {
                  disabled: u,
                  name: "hardMode",
                  onClick: function () {
                    e(
                      u
                        ? Q({
                            text: "Hard mode can only be enabled at the start of a round",
                            duration: 1500,
                            isSystem: !0,
                          })
                        : zn("hardMode", !s),
                    );
                  },
                  selected: s,
                }),
              ),
            ),
            f.createElement(
              "div",
              {className: Pn},
              f.createElement(
                "div",
                {className: Rn},
                f.createElement("div", {className: Mn}, "Dark Theme"),
              ),
              f.createElement(
                "div",
                null,
                f.createElement(Ln, {
                  name: "darkMode",
                  onClick: function () {
                    return e(zn("darkMode", !r));
                  },
                  selected: r,
                }),
              ),
            ),
            f.createElement(
              "div",
              {className: Pn},
              f.createElement(
                "div",
                {className: Rn},
                f.createElement("div", {className: Mn}, "High Contrast Mode"),
                f.createElement(
                  "div",
                  {className: Dn},
                  "For improved color vision",
                ),
              ),
              f.createElement(
                "div",
                null,
                f.createElement(Ln, {
                  name: "colorblindMode",
                  onClick: function () {
                    return e(zn("colorblindMode", !o));
                  },
                  selected: o,
                }),
              ),
            ),
          ),
          f.createElement(
            "section",
            null,
            f.createElement(
              "div",
              {className: Pn},
              f.createElement(
                "div",
                {className: Rn},
                f.createElement("div", {className: Mn}, "Feedback"),
              ),
              f.createElement(
                "div",
                null,
                f.createElement(
                  "a",
                  {href: En(), title: "nytgames@nytimes.com"},
                  "Email",
                ),
              ),
            ),
            f.createElement(
              "div",
              {className: Pn},
              f.createElement(
                "div",
                {className: Rn},
                f.createElement("div", {className: Mn}, "Community"),
              ),
              f.createElement(
                "div",
                null,
                f.createElement(
                  "a",
                  {
                    href: "https://twitter.com/NYTGames",
                    target: "blank",
                    title: "@NYTGames",
                  },
                  "Twitter",
                ),
              ),
            ),
            f.createElement(
              "div",
              {className: Pn},
              f.createElement(
                "div",
                {className: Rn},
                f.createElement("div", {className: Mn}, "Questions?"),
              ),
              f.createElement(
                "div",
                null,
                f.createElement(
                  "a",
                  {
                    href: "https://help.nytimes.com/hc/en-us/articles/360029050872-Word-Games-and-Logic-Puzzles#h_01FVGCB2Z00ZQMDMCYWBPWJNXB",
                    target: "blank",
                  },
                  "FAQ",
                ),
              ),
            ),
          ),
        ),
        f.createElement(
          "div",
          {
            className: classNames(
              Bn,
              ((l = a),
              (i = Hn) in (a = {})
                ? Object.defineProperty(a, i, {
                    value: l,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (a[i] = l),
              a),
            ),
          },
          f.createElement(
            "div",
            {id: "copyright"},
            "© ",
            new Date().getFullYear(),
            " The New York Times Company",
          ),
          f.createElement("div", null, f.createElement("div", null, "#", t)),
        ),
      );
    },
    Se = function (e) {
      return e.overlays;
    },
    Wn = Reselect.createSelector(Se, function (e) {
      return e.modal;
    }),
    Gn = Reselect.createSelector(Se, function (e) {
      return e.error;
    }),
    Fn = Reselect.createSelector(Se, function (e) {
      return e.page;
    }),
    Yn = Reselect.createSelector(Se, function (e) {
      return e.moment;
    }),
    Vn = Reselect.createSelector(Se, function (e) {
      return e.isNavModalOpen;
    }),
    Un = Reselect.createSelector(Se, function (e) {
      return e.toasts;
    }),
    Zn = Reselect.createSelector(Se, function (e) {
      return e.isPageClosing;
    }),
    Xn = {
      modalOverlay: "Modal-module_modalOverlay__81ZCi",
      content: "Modal-module_content__s8qUZ",
      SlideIn: "Modal-module_SlideIn__g77Ik",
      closing: "Modal-module_closing__pgA2s",
      SlideOut: "Modal-module_SlideOut__Ev3zj",
      closeIcon: "Modal-module_closeIcon__b4z74",
      heading: "Modal-module_heading__oD1Ps",
      enableAuth: "Modal-module_enableAuth__SR682",
      shortStatsModal: "Modal-module_shortStatsModal__QXJBs",
    };
  function Kn() {
    return (Kn =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n,
            a = arguments[t];
          for (n in a)
            Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
        }
        return e;
      }).apply(this, arguments);
  }
  function Jn(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function Qn(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return $n(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? $n(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function $n(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function ea() {
    var t = x(),
      e = S(Wn),
      n = Qn(React.useState(!1), 2),
      a = n[0],
      o = n[1],
      r = S(ft),
      s = ht("auth") || r,
      i = !!S(vt),
      l = s && "stats" === e && r;
    if (!e) return null;
    function u() {
      o(!0);
    }
    var n = s
        ? function (e) {
            e.currentTarget === e.target && o(!0);
          }
        : u,
      r = {
        help: f.createElement(Ze, {isPage: !1, enableAuth: s, isLoggedIn: i}),
        stats: f.createElement(Sn, null),
        settings: f.createElement(qn, null),
      }[e],
      i = {help: "how to play", stats: !1, settings: "settings"}[e],
      e = s && i;
    return f.createElement(
      "div",
      {
        className: classNames(Xn.modalOverlay, Jn({}, Xn.enableAuth, s)),
        onClick: n,
        onAnimationEnd: function (e) {
          e.animationName === Xn.SlideOut && (o(!1), t(Z()));
        },
        role: "button",
      },
      f.createElement(
        "div",
        {
          className: classNames(
            Xn.content,
            (Jn((n = {}), Xn.closing, a),
            Jn(n, Xn.enableAuth, s),
            Jn(n, Xn.shortStatsModal, l),
            n),
          ),
        },
        e
          ? f.createElement(
              "h1",
              {className: classNames(Xn.heading, Jn({}, Xn.enableAuth, s))},
              i,
            )
          : null,
        r,
        f.createElement(
          "div",
          {className: Xn.closeIcon},
          f.createElement(v, Kn({icon: "close"}, s && {onClick: u})),
        ),
      ),
    );
  }
  Te(
    ".Modal-module_modalOverlay__81ZCi {\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--opacity-50);\n  z-index: var(--modal-z-index);\n}\n\n.Modal-module_content__s8qUZ {\n  position: relative;\n  border-radius: 8px;\n  border: 1px solid var(--color-tone-6);\n  background-color: var(--modal-content-bg);\n  color: var(--color-tone-1);\n  box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);\n  width: 90%;\n  max-height: 100%;\n  overflow-y: auto;\n  -webkit-animation: Modal-module_SlideIn__g77Ik 200ms;\n          animation: Modal-module_SlideIn__g77Ik 200ms;\n  max-width: var(--game-max-width);\n  padding: 16px;\n  box-sizing: border-box;\n}\n\n.Modal-module_content__s8qUZ.Modal-module_closing__pgA2s {\n  -webkit-animation: Modal-module_SlideOut__Ev3zj 200ms;\n          animation: Modal-module_SlideOut__Ev3zj 200ms;\n}\n\n.Modal-module_closeIcon__b4z74 {\n  width: 24px;\n  height: 24px;\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n}\n\n.Modal-module_heading__oD1Ps.Modal-module_enableAuth__SR682 {\n  font-weight: 700;\n  font-size: 16px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  text-align: center;\n  margin-bottom: 15px;\n  margin-top: 0px;\n  display: block;\n}\n\n@media (max-width: 500px) {\n  .Modal-module_modalOverlay__81ZCi.Modal-module_enableAuth__SR682 {\n    align-items: flex-end;\n  }\n\n  .Modal-module_content__s8qUZ.Modal-module_enableAuth__SR682 {\n    min-height: 70%;\n    width: 100%;\n  }\n\n  .Modal-module_content__s8qUZ.Modal-module_shortStatsModal__QXJBs {\n    min-height: unset;\n    width: 100%;\n    padding-bottom: 20px;\n  }\n}\n@-webkit-keyframes Modal-module_SlideIn__g77Ik {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@keyframes Modal-module_SlideIn__g77Ik {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes Modal-module_SlideOut__Ev3zj {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}\n@keyframes Modal-module_SlideOut__Ev3zj {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}",
  );
  var ta = "Welcome-module_title__BVIWQ",
    na = "Welcome-module_subtitle__PHs6d",
    aa = "Welcome-module_icon__tYMoy",
    oa = "Welcome-module_date__u4kvh",
    ra = "Welcome-module_wordleNumber__CaBMY",
    sa = "Welcome-module_buttonContainer__2yt5t",
    ia = "Welcome-module_button__tEJl9",
    la = "Welcome-module_secondary__Kwfcs";
  Te(
    '.Welcome-module_setting__nHSOz {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid var(--color-tone-4);\n  padding: 16px 0;\n}\n.Welcome-module_setting__nHSOz a,\n.Welcome-module_setting__nHSOz a:visited {\n  color: var(--color-tone-2);\n}\n\n.Welcome-module_title__BVIWQ {\n  font-size: 36px;\n  line-height: 38px;\n  font-family: "nyt-karnakcondensed";\n  font-weight: bold;\n  margin-bottom: 12px;\n}\n@media (max-width: 992px) {\n  .Welcome-module_title__BVIWQ {\n    font-size: 24px;\n    line-height: 28px;\n    margin-bottom: 8px;\n  }\n}\n\n.Welcome-module_subtitle__PHs6d {\n  font-size: 32px;\n  font-family: "nyt-karnak";\n  margin-bottom: 32px;\n  text-align: center;\n}\n@media (max-width: 992px) {\n  .Welcome-module_subtitle__PHs6d {\n    font-size: 24px;\n    line-height: 28px;\n  }\n}\n\n.Welcome-module_text__hsRsJ {\n  padding-right: 8px;\n}\n\n.Welcome-module_description__XHu20 {\n  font-size: 12px;\n  color: var(--color-tone-2);\n}\n\n.Welcome-module_footnote__pJJWM {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 16px;\n  color: var(--color-tone-2);\n  font-size: 12px;\n  text-align: right;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n\n@media (min-width: 501px) {\n  .Welcome-module_footnote__pJJWM.Welcome-module_enableAuth__zBrUo {\n    position: initial;\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\n  .Welcome-module_setting__nHSOz {\n    padding: 16px;\n  }\n}\n/* ICON */\n.Welcome-module_icon__tYMoy {\n  height: 84px;\n  margin-bottom: 12px;\n  display: block;\n  width: 100%;\n  text-align: center;\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-image: var(--wordle-icon);\n  padding-bottom: 12px;\n}\n@media (max-width: 992px) {\n  .Welcome-module_icon__tYMoy {\n    margin-bottom: 8px;\n  }\n}\n.Welcome-module_icon__tYMoy.Welcome-module_large__M3gl- {\n  height: 84px;\n  margin-top: 74px;\n}\n.Welcome-module_icon__tYMoy.Welcome-module_small__HrMeM {\n  height: 48px;\n}\n\n.Welcome-module_date__u4kvh {\n  display: block;\n  font-size: 1em;\n  line-height: 1.25;\n  letter-spacing: 0.005em;\n  font-family: "nyt-franklin";\n  font-weight: 600;\n}\n@media (max-width: 992px) {\n  .Welcome-module_date__u4kvh {\n    font-size: 16px;\n    line-height: 20px;\n  }\n}\n\n.Welcome-module_wordleNumber__CaBMY {\n  display: block;\n  font-size: 1em;\n  line-height: 1.25;\n  letter-spacing: 0.005em;\n}\n@media (max-width: 992px) {\n  .Welcome-module_wordleNumber__CaBMY {\n    font-size: 14px;\n    line-height: 18px;\n  }\n}\n\n.Welcome-module_buttonContainer__2yt5t {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column-reverse;\n  box-sizing: border-box;\n  width: 100%;\n  margin-bottom: 24px;\n}\n@media (min-width: 992px) {\n  .Welcome-module_buttonContainer__2yt5t {\n    margin-bottom: 28px;\n    flex-direction: row;\n  }\n}\n.Welcome-module_buttonContainer__2yt5t .Welcome-module_button__tEJl9 {\n  position: relative;\n  border: none;\n  height: 3em;\n  border-radius: 1.5em;\n  align-content: center;\n  letter-spacing: 0.05em;\n  margin: 0 10px 8px;\n  background: black;\n  color: white;\n  min-width: 11.25em;\n  font-size: 16px;\n  line-height: 28px;\n  margin-bottom: 8px;\n  cursor: pointer;\n}\n@media (max-width: 760px) {\n  .Welcome-module_buttonContainer__2yt5t .Welcome-module_button__tEJl9 {\n    display: block;\n  }\n}\n.Welcome-module_buttonContainer__2yt5t .Welcome-module_button__tEJl9.Welcome-module_secondary__Kwfcs {\n  background: none;\n  color: black;\n  border: 1px solid;\n  letter-spacing: 0.01em;\n}',
  );
  var ua = function () {
      var e = x(),
        t = S(ge),
        n = React.useRef(
          new Date().toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        );
      return f.createElement(
        f.Fragment,
        null,
        f.createElement("div", {className: aa}),
        f.createElement("div", {className: ta}, "Wordle"),
        f.createElement(
          "div",
          {className: sa},
          f.createElement(
            "button",
            {
              type: "button",
              onClick: function () {
                e(j()), e(U("help"));
              },
              className: classNames(ia, la),
            },
            "How to Play",
          ),
          f.createElement(
            "button",
            {
              type: "button",
              onClick: function () {
                return e(j());
              },
              className: ia,
            },
            "Play",
          ),
        ),
        f.createElement(
          "div",
          {className: na},
          "Get 6 chances to guess a 5-letter word",
        ),
        f.createElement("div", {className: oa}, n),
        f.createElement("div", {className: ra}, "No. ", t),
      );
    },
    ca = {
      page: "Moment-module_page__7-b--",
      closing: "Moment-module_closing__76O5U",
      SlideOut: "Moment-module_SlideOut__HqntD",
      contentWelcome: "Moment-module_contentWelcome__IzL65",
      contentWelcomeContainer: "Moment-module_contentWelcomeContainer__JZ67q",
    };
  function da(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return ma(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? ma(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function ma(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function pa() {
    var t = x(),
      e = S(Yn),
      n = da(React.useState(!1), 2),
      a = n[0],
      o = n[1];
    if (!e) return null;
    var r = {
      welcome: {content: f.createElement(ua, null), title: "Welcome"},
    }[e].content;
    return f.createElement(
      "div",
      {
        role: "dialog",
        className: classNames(
          ca.page,
          ((n = {}),
          (e = ca.closing),
          (a = a),
          e in n
            ? Object.defineProperty(n, e, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (n[e] = a),
          n),
        ),
        onAnimationEnd: function (e) {
          e.animationName === ca.SlideOut && (o(!1), t(X()));
        },
      },
      f.createElement(
        "div",
        {className: classNames(ca.contentWelcome)},
        f.createElement("div", {className: classNames(ca.contentWelcomeContainer)}, r),
      ),
    );
  }
  function ya() {
    var e = x();
    return f.createElement(
      "a",
      {
        href: "https://www.nytimes.com/crosswords",
        onClick: function () {
          return e(C("wordle", "games-logo-nav", !0, null));
        },
      },
      f.createElement(
        "svg",
        {
          className: "pz-nav__logo",
          width: "95",
          height: "18",
          viewBox: "0 0 138 25",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "New York Times Games Logo. Click for more puzzles",
        },
        f.createElement("rect", {width: "138", height: "25", fill: "none"}),
        f.createElement("path", {
          d: "M42.4599 1.03519C44.219 1.00558 45.9577 1.41634 47.5176 2.23008V1.45245H53.4162V8.80515H47.5239C47.1067 7.03494 46.3607 6.2257 44.5904 6.2257C42.365 6.23834 41.0058 7.86947 41.0058 12.4151C41.0058 17.3148 42.2386 18.8827 45.0077 18.8827C45.7187 18.8975 46.4203 18.7183 47.0371 18.3643V16.2211H45.2037V11.9283H53.4225V24.0543H48.3648V22.9289C46.902 24.0012 45.1195 24.5471 43.307 24.4778C36.9216 24.4778 32.4392 20.2546 32.4392 12.4214C32.4708 5.2584 36.9849 1.03519 42.4599 1.03519Z",
          fill: "var(--color-tone-1)",
        }),
        f.createElement("path", {
          d: "M59.8645 24.3471C56.3494 24.3471 54.2883 22.4505 54.2883 19.2198C54.2883 15.9892 56.7097 13.9345 60.541 13.9345C61.9923 13.9222 63.4232 14.2767 64.701 14.965C64.6377 13.2264 63.3164 12.0947 60.8634 12.0947C59.0925 12.1015 57.3477 12.5215 55.7677 13.3212V9.25608C58.149 8.58084 60.6136 8.24457 63.0888 8.25718C69.7966 8.25718 72.0853 11.1907 72.0853 13.7701V19.8647H73.4382V24.0563H64.7705V22.5074C63.544 23.8603 61.7359 24.3471 59.8645 24.3471ZM64.859 18.8658C64.888 18.6431 64.8655 18.4166 64.7931 18.204C64.7207 17.9914 64.6005 17.7982 64.4417 17.6394C64.2829 17.4805 64.0897 17.3603 63.877 17.288C63.6644 17.2156 63.438 17.193 63.2153 17.222C62.1215 17.222 61.3755 17.7721 61.3755 18.8974C61.3755 20.0228 62.0077 20.478 63.1836 20.478C64.3596 20.478 64.8653 19.9911 64.8653 18.8848L64.859 18.8658Z",
          fill: "var(--color-tone-1)",
        }),
        f.createElement("path", {
          d: "M75.8371 19.8644V12.7709H74.5726V8.57927H83.1455V10.2546C85.1433 8.73732 86.2055 8.25684 87.786 8.25684C89.7206 8.25684 90.8839 8.80687 92.3949 10.3874C94.3611 8.83848 95.7456 8.25684 97.4526 8.25684C100.614 8.25684 102.801 10.419 102.801 13.2197V19.858H104.066V24.0496H95.5054V14.6739C95.5054 13.4473 95.0249 12.7772 94.1841 12.7772C93.3432 12.7772 92.9576 13.4094 92.9576 14.6739V19.8644H94.0513V24.056H85.6681V14.6106C85.6681 13.5169 85.1497 12.7709 84.4036 12.7709C83.6576 12.7709 83.1392 13.479 83.1392 14.6106V19.8644H84.2646V24.056H74.5474V19.8644H75.8371Z",
          fill: "var(--color-tone-1)",
        }),
        f.createElement("path", {
          d: "M113.781 24.3784C111.46 24.3784 108.881 23.8979 107.073 22.2858C106.216 21.5344 105.534 20.6058 105.072 19.5643C104.61 18.5229 104.38 17.3935 104.398 16.2544C104.398 11.1967 108.432 8.25684 113.25 8.25684C118.453 8.25684 121.924 11.93 121.924 16.3555C121.924 16.874 121.892 17.3545 121.86 17.8729H111.745C111.941 19.681 112.908 20.4839 114.387 20.4839C114.871 20.4803 115.347 20.3544 115.769 20.1178C116.191 19.8813 116.547 19.5418 116.803 19.131H121.86C120.773 22.6777 117.498 24.3784 113.781 24.3784ZM111.688 15.5273H115.481V15.1417C115.481 13.8204 115.159 12.4674 113.585 12.4674C113.201 12.4558 112.824 12.5691 112.51 12.7903C112.197 13.0115 111.964 13.3286 111.846 13.6939C111.68 14.2856 111.624 14.9028 111.682 15.5147L111.688 15.5273Z",
          fill: "var(--color-tone-1)",
        }),
        f.createElement("path", {
          d: "M126.195 24.059H122.712V18.8875H126.164C126.581 20.2404 127.131 20.9485 128.452 20.9485C129.451 20.9485 130.064 20.5313 130.064 19.7536C130.064 19.2036 129.71 18.7863 129.034 18.4892L125.683 17.073C124.909 16.7631 124.246 16.2281 123.779 15.5371C123.313 14.8462 123.064 14.0312 123.066 13.1975C123.066 10.5549 125.677 8.23462 128.964 8.23462C130.352 8.25084 131.718 8.58156 132.96 9.20191V8.5697H136.469V13.4062H133.244C132.954 11.9584 132.372 11.244 131.215 11.244C130.374 11.244 129.729 11.6612 129.729 12.3377C129.729 12.9194 130.115 13.3998 130.924 13.7223L134.212 14.9867C136.374 15.8276 137.373 17.2121 137.373 19.0835C137.373 22.0486 134.844 24.3372 131.215 24.3372C129.603 24.3372 128.477 24.078 126.157 23.2435L126.195 24.059Z",
          fill: "var(--color-tone-1)",
        }),
        f.createElement("path", {
          d: "M25.9544 1.46704H25.3601V24.0372H25.9544V1.46704Z",
          fill: "var(--color-tone-1)",
        }),
        f.createElement("path", {
          d: "M19.2574 15.4535C18.8889 16.497 18.3042 17.4509 17.5416 18.2527C16.7789 19.0546 15.8555 19.6863 14.8318 20.1066V15.4535L17.3607 13.1586L14.8318 10.8952V7.69619C15.8763 7.67489 16.8715 7.24792 17.6067 6.50567C18.3419 5.76342 18.7593 4.76418 18.7706 3.71953C18.7706 0.975708 16.1532 0.00209168 14.6675 0.00209168C14.2653 -0.0102783 13.8633 0.0322617 13.4726 0.128535V0.261301C13.6686 0.261301 13.9594 0.22969 14.0542 0.22969C15.0847 0.22969 15.8624 0.716498 15.8624 1.65218C15.8562 1.85411 15.809 2.05266 15.7235 2.23571C15.638 2.41875 15.5161 2.58244 15.3652 2.71677C15.2143 2.85109 15.0376 2.95323 14.8459 3.01695C14.6542 3.08066 14.4515 3.1046 14.2502 3.08732C11.7213 3.08732 8.693 1.01996 5.43075 1.01996C2.52255 1.00732 0.537385 3.17583 0.537385 5.36962C0.537385 7.56342 1.80182 8.24622 3.12316 8.7267L3.15477 8.60026C2.91743 8.45028 2.72511 8.23886 2.59822 7.98842C2.47133 7.73797 2.41459 7.45785 2.43404 7.17777C2.4493 6.92796 2.51386 6.68363 2.62398 6.45888C2.73411 6.23414 2.88763 6.03341 3.07569 5.86826C3.26375 5.70312 3.48264 5.57683 3.71973 5.49668C3.95683 5.41652 4.20745 5.38408 4.45714 5.40124C7.20096 5.40124 11.6265 7.69619 14.3766 7.69619H14.6359V10.9268L12.107 13.1586L14.6359 15.4535V20.1572C13.5788 20.533 12.4638 20.7192 11.342 20.7072C7.07452 20.7072 4.38759 18.1215 4.38759 13.8287C4.37897 12.8127 4.51955 11.8009 4.80486 10.8257L6.93543 9.88999V19.3733L11.2661 17.4766V7.75941L4.88072 10.6044C5.17861 9.73458 5.646 8.93247 6.25588 8.24446C6.86575 7.55645 7.606 6.99621 8.43379 6.59613L8.40218 6.5013C4.13471 7.43698 0 10.6739 0 15.5167C0 21.1055 4.71635 25 10.2103 25C16.0267 25 19.3206 21.1245 19.3522 15.4725L19.2574 15.4535Z",
          fill: "var(--color-tone-1)",
        }),
      ),
    );
  }
  Te(
    ".Moment-module_page__7-b-- {\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  justify-content: center;\n  background-color: var(--color-background);\n  z-index: var(--page-z-index);\n}\n.Moment-module_page__7-b--.Moment-module_closing__76O5U {\n  -webkit-animation: Moment-module_SlideOut__HqntD 150ms linear;\n          animation: Moment-module_SlideOut__HqntD 150ms linear;\n}\n\n.Moment-module_contentWelcome__IzL65 {\n  position: relative;\n  color: black;\n  padding: 0 32px;\n  max-width: 100%;\n  width: 100%;\n  overflow-y: auto;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background-color: #e3e3e1;\n}\n\n.Moment-module_contentWelcomeContainer__JZ67q {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\n  .Moment-module_contentWelcome__IzL65 {\n    max-width: 100%;\n    padding: 0;\n  }\n}\n@-webkit-keyframes Moment-module_SlideOut__HqntD {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}\n@keyframes Moment-module_SlideOut__HqntD {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}",
  );
  var ga = {
    container: "Nav-module_container__pzbhW",
    navLink: "Nav-module_navLink__7jXMp",
    gameList: "Nav-module_gameList__izZcv",
    nytList: "Nav-module_nytList__Nrzcc",
    navItem: "Nav-module_navItem__Kfeh3",
    navIcon: "Nav-module_navIcon__mgXpj",
    navHeader: "Nav-module_navHeader__KJ4Rd",
    moreText: "Nav-module_moreText__-hcDZ",
    privacy: "Nav-module_privacy__H6Jto",
    privacyStatic: "Nav-module_privacyStatic__f2hFM",
    privacyItem: "Nav-module_privacyItem__F1mag",
  };
  Te(
    '.Nav-module_container__pzbhW {\n  display: flex;\n  flex-direction: column;\n  align-items: left;\n  justify-content: center;\n}\n.Nav-module_container__pzbhW a.Nav-module_navLink__7jXMp {\n  text-decoration: none;\n  color: inherit;\n}\n\n.Nav-module_gameList__izZcv,\n.Nav-module_nytList__Nrzcc {\n  list-style: none;\n  color: var(--color-tone-1);\n  padding: unset;\n  margin: unset;\n}\n\n.Nav-module_nytList__Nrzcc {\n  margin-top: 5px;\n  padding: 12px 0px;\n  border-top: 1px solid #dcdcdc;\n}\n\n.Nav-module_navItem__Kfeh3 {\n  display: flex;\n  justify-content: left;\n  align-items: center;\n  height: 40px;\n  font-family: "nyt-franklin-500";\n  font-size: 16px;\n  line-height: 16px;\n  padding-left: 18px;\n  --hover-color: var(--color-nav-hover);\n}\n\n.Nav-module_navItem__Kfeh3:hover {\n  background-color: var(--hover-color);\n}\n\n.Nav-module_navIcon__mgXpj {\n  padding-bottom: 2px;\n  content: "";\n  height: 20px;\n  width: 28px;\n  padding-right: 8px;\n  display: inline-block;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n  background-size: "20px";\n}\n\n.Nav-module_navHeader__KJ4Rd {\n  padding-top: 18px;\n  padding-left: 18px;\n}\n\n.Nav-module_moreText__-hcDZ {\n  font-family: "nyt-franklin";\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 12px;\n  line-height: 12px;\n  margin: 32px 0px 24px 0px;\n  padding-left: 18px;\n}\n\n.Nav-module_privacy__H6Jto, .Nav-module_privacyStatic__f2hFM {\n  letter-spacing: 0.5px;\n  font-family: "nyt-franklin-500";\n  margin: 0px 25px 0px 17px;\n  padding: 12px 0px;\n  border-top: 1px solid #dcdcdc;\n  color: var(--color-tone-1);\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  align-items: left;\n  justify-content: center;\n  font-size: 12px;\n}\n\n.Nav-module_privacyItem__F1mag {\n  height: 40px;\n  display: flex;\n  justify-content: left;\n  align-items: center;\n  color: var(--color-tone-1);\n}\n\n.Nav-module_privacyStatic__f2hFM {\n  position: static;\n}',
  );
  var ha = "NavAccount-module_navLoggedIn__QNQGf",
    fa = "NavAccount-module_navLoggedOut__yVhCA",
    ba = "NavAccount-module_navDrawerHeading__KRAqm",
    ka = "NavAccount-module_navDrawerAccount__WqYWH",
    wa = "NavAccount-module_navProfileAccount__sqIxG",
    va = "NavAccount-module_logoutButton__rHSrz",
    _a = "NavAccount-module_subscribeButton__9oHNa",
    xa = "NavAccount-module_loginButton__ANAQ0",
    Sa = "NavAccount-module_navDrawerLink__YqJIR";
  function Ea(e) {
    var t = e.loggedIn,
      n = f.createElement(
        "a",
        {href: Be, role: "button", tabIndex: -1, className: _a},
        "Subscribe",
      ),
      a = f.createElement(
        "a",
        {href: Ge, role: "button", tabIndex: -1, className: xa},
        "Log In",
      ),
      e = f.createElement(
        "a",
        {href: Fe, role: "button", tabIndex: -1, className: va},
        "Log Out",
      );
    return f.createElement(
      "div",
      {className: ka},
      t
        ? f.createElement(
            "div",
            {className: wa},
            f.createElement("h4", {className: ba}, "Profile"),
            f.createElement(
              "a",
              {href: window.navigationLinks.account, className: Sa},
              "Account details",
            ),
            f.createElement("div", {className: ha}, e),
          )
        : f.createElement("div", {className: fa}, n, a),
    );
  }
  function za() {
    React.useEffect(function () {
      _.ccpa();
    }, []);
    function t() {
      return {
        backgroundImage:
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
        backgroundSize: "20px",
      };
    }
    var e = _.parsePurrCookieValue(),
      n = ht("auth"),
      a = S(ft),
      n = n || a,
      a = !!n && !!S(vt),
      o = x();
    return f.createElement(
      "div",
      {className: ga.container},
      f.createElement(
        "span",
        {className: ga.navHeader},
        f.createElement(ya, null),
      ),
      f.createElement(
        "span",
        {className: ga.moreText},
        "More From New York Times Games",
      ),
      f.createElement(
        "div",
        {className: ga.gameList},
        [
          {
            id: "spelling-bee",
            name: "Spelling Bee",
            url: "/puzzles/spelling-bee?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--spelling-bee)",
            dataTrackLabel: "spelling-bee-nav",
          },
          {
            id: "crossword",
            name: "The Crossword",
            url: "/crosswords/game/daily?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--daily)",
            dataTrackLabel: "daily-page-nav",
          },
          {
            id: "mini",
            name: "The Mini",
            url: "/crosswords/game/mini?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--mini)",
            dataTrackLabel: "mini-page-nav",
          },
          {
            id: "wordlebot",
            name: "WordleBot: Your Daily Wordle Companion",
            url: "/interactive/2022/upshot/wordle-bot.html?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--wordlebot)",
            dataTrackLabel: "wordle-bot-nav",
          },
          {
            id: "chess",
            name: "Chess",
            url: "/spotlight/chess-puzzles?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--chess)",
            dataTrackLabel: "chess-nav",
          },
          {
            id: "gameplay-stories",
            name: "Gameplay Stories",
            url: "/column/wordplay?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            dataTrackLabel: "gameplay-stories-nav",
          },
          {
            id: "more-games",
            name: "More Games",
            url: "/puzzles?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            dataTrackLabel: "all-games-nav",
          },
        ].map(function (e) {
          return f.createElement(
            "a",
            {
              "aria-label": e.name,
              key: e.id,
              className: ga.navLink,
              href: e.url,
              onClick: function () {
                return o(C("wordle", e.dataTrackLabel, !0, null));
              },
            },
            f.createElement(
              "div",
              {className: ga.navItem},
              f.createElement("span", {
                style: t(e.backgroundImage),
                className: ga.navIcon,
              }),
              e.name,
            ),
          );
        }),
      ),
      f.createElement(
        "div",
        {className: ga.nytList},
        [
          {
            id: "nyt",
            name: "The New York Times",
            url: "https://www.nytimes.com/?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--nyt)",
            dataTrackLabel: "nyt-nav",
          },
          {
            id: "cooking",
            name: "New York Times Cooking",
            url: "https://cooking.nytimes.com",
            backgroundImage: "var(--cooking)",
            dataTrackLabel: "cooking-nav",
          },
          {
            id: "wirecutter",
            name: "New York Times Wirecutter",
            url: "https://www.nytimes.com/wirecutter/?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--wirecutter)",
            dataTrackLabel: "wirecutter-nav",
          },
          {
            id: "athletic",
            name: "The Athletic",
            url: "https://theathletic.com/?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--athletic)",
            dataTrackLabel: "athletic-nav",
          },
        ].map(function (e) {
          return f.createElement(
            "a",
            {
              "aria-label": e.name,
              href: e.url,
              className: ga.navLink,
              onClick: function () {
                return o(C("wordle", e.dataTrackLabel, !0, null));
              },
              id: e.id,
              key: e.id,
              "data-track-label": e.dataTrackLabel,
            },
            f.createElement(
              "div",
              {className: ga.navItem},
              f.createElement("span", {
                style: t(e.backgroundImage),
                className: ga.navIcon,
              }),
              e.name,
            ),
          );
        }),
      ),
      f.createElement(
        "div",
        {className: n ? ga.privacyStatic : ga.privacy},
        f.createElement(
          "a",
          {
            className: ga.privacyItem,
            href: "https://www.nytimes.com/privacy/privacy-policy",
            "data-track-label": "privacy-policy-nav",
            onClick: function () {
              return o(C("wordle", "privacy-policy-nav", !0, null));
            },
          },
          "Privacy Policy",
        ),
        f.createElement(
          f.Fragment,
          null,
          "show" === e.PURR_DataSaleOptOutUI_v2 &&
            f.createElement(
              "div",
              {className: "ccpa-opt-out"},
              f.createElement(
                "a",
                {
                  href: "#ccpa-hamburger",
                  "data-region": "menu",
                  "data-track": "linkOptOut",
                  className: classNames(
                    ga.privacyItem,
                    "ccpa-link ccpa-opt-out-link ccpa-impression",
                  ),
                },
                "Do Not Sell My Personal Information",
              ),
            ),
          "show-opted-out" === e.PURR_DataSaleOptOutUI_v2 &&
            f.createElement(
              "div",
              null,
              f.createElement(
                "span",
                {
                  "data-region": "menu",
                  "data-track": "optedOut",
                  className: classNames(
                    ga.privacyItem,
                    "ccpa-user-opted-out ccpa-impression",
                  ),
                },
                "We No Longer Sell Your Personal Information",
              ),
            ),
          "show" === e.PURR_CaliforniaNoticesUI &&
            f.createElement(
              "div",
              null,
              f.createElement(
                "a",
                {
                  target: "_blank",
                  rel: "noopener noreferrer",
                  href: "https://www.nytimes.com/privacy/california-notice",
                  "data-region": "menu",
                  "data-track": "linkCANotice",
                  className: classNames(
                    ga.privacyItem,
                    "ccpa-link ccpa-california-notice-link ccpa-impression",
                  ),
                },
                "California Notices",
              ),
            ),
        ),
      ),
      n && f.createElement(Ea, {loggedIn: a}),
    );
  }
  Te(
    '.NavAccount-module_navLoggedIn__QNQGf, .NavAccount-module_navLoggedOut__yVhCA {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-evenly;\n  flex-wrap: nowrap;\n  padding: 8px;\n}\n\n.NavAccount-module_navLoggedOut__yVhCA {\n  padding: 16px;\n}\n\n.NavAccount-module_navDrawerHeading__KRAqm {\n  font-family: "nyt-franklin";\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.75px;\n  line-height: 14px;\n  display: block;\n  padding: 0px 10px;\n}\n\n.NavAccount-module_navDrawerAccount__WqYWH {\n  border-top: 1px solid #000;\n  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  background-color: var(--color-tone-7);\n  margin-top: 3px;\n}\n\n.NavAccount-module_navProfileAccount__sqIxG {\n  padding: 5px;\n}\n\n.NavAccount-module_navButton__KTP0f, .NavAccount-module_logoutButton__rHSrz, .NavAccount-module_subscribeButton__9oHNa, .NavAccount-module_loginButton__ANAQ0 {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: nowrap;\n  font-family: "nyt-franklin";\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.047em;\n  text-transform: uppercase;\n  height: 36px;\n  border: 1px solid #f4f4f4;\n  border-radius: 3px;\n  color: #fff;\n  border-color: #000;\n  background-color: #000;\n  padding: 1px 33px 0;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.NavAccount-module_navDrawerLink__YqJIR {\n  display: block;\n  height: 40px;\n  line-height: 40px;\n  font-size: 15px;\n  letter-spacing: 0.5px;\n  border-left: 4px solid transparent;\n  padding: 0 16px 0 8px;\n  text-decoration: none;\n  color: inherit;\n}\n\n.NavAccount-module_navDrawerLink__YqJIR:hover {\n  background-color: var(--color-nav-hover);\n}\n\n.NavAccount-module_loginButton__ANAQ0 {\n  color: #000;\n  border-color: #000;\n  background-color: #fff;\n  margin-left: 8px;\n}\n\n.NavAccount-module_loginButton__ANAQ0:hover {\n  color: #fff;\n  background-color: #000;\n}\n\n.NavAccount-module_subscribeButton__9oHNa {\n  color: #fff;\n  background-color: #000;\n}\n\n.NavAccount-module_subscribeButton__9oHNa:hover {\n  background-color: #797987;\n  border: none;\n}\n\n.NavAccount-module_logoutButton__rHSrz {\n  color: var(--color-tone-1);\n  background-color: var(--color-tone-7);\n  border: 1px solid var(--color-tone-1);\n  border-radius: 3px;\n}\n\n.NavAccount-module_logoutButton__rHSrz:hover {\n  background-color: #ebebeb;\n}\n\n@media (max-height: 700px) {\n  .NavAccount-module_navDrawerAccount__WqYWH {\n    position: unset;\n  }\n}',
  );
  var ja = {
    overlayNav: "NavModal-module_overlayNav__3y8p3",
    contentNav: "NavModal-module_contentNav__wMSAL",
    SlideRight: "NavModal-module_SlideRight__DNLx-",
    closingNav: "NavModal-module_closingNav__OIIRY",
    SlideLeft: "NavModal-module_SlideLeft__7Veo2",
    closeIconNav: "NavModal-module_closeIconNav__2gqUi",
  };
  function Na(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Ca(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Ca(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function Ca(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function Oa() {
    var t = x(),
      e = S(Vn),
      n = Na(React.useState(!1), 2),
      a = n[0],
      o = n[1];
    if (!e) return null;
    return f.createElement(
      "div",
      {
        className: ja.overlayNav,
        onClick: function () {
          o(!0);
        },
        onAnimationEnd: function (e) {
          e.animationName === ja.SlideLeft && (o(!1), t(J()));
        },
        role: "button",
      },
      f.createElement(
        "div",
        {
          className: classNames(
            ja.contentNav,
            ((n = {}),
            (e = ja.closingNav),
            (a = a),
            e in n
              ? Object.defineProperty(n, e, {
                  value: a,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (n[e] = a),
            n),
          ),
          id: "content-nav",
        },
        f.createElement(za, null),
        f.createElement(
          "div",
          {className: ja.closeIconNav},
          f.createElement(v, {icon: "close"}),
        ),
      ),
    );
  }
  Te(
    ".NavModal-module_overlayNav__3y8p3 {\n  display: flex;\n  justify-content: left;\n  align-items: unset;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: var(--modal-z-index);\n  background-color: transparent;\n}\n\n.NavModal-module_contentNav__wMSAL {\n  position: relative;\n  border: 1px solid var(--color-tone-6);\n  background-color: var(--modal-content-bg);\n  color: var(--color-tone-1);\n  overflow-y: auto;\n  -webkit-animation: NavModal-module_SlideRight__DNLx- 200ms;\n          animation: NavModal-module_SlideRight__DNLx- 200ms;\n  max-width: var(--game-max-width);\n  box-sizing: border-box;\n  width: 100%;\n  border-radius: 0px;\n  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.15);\n  max-height: calc(100% - var(--header-height) - 1px);\n  margin-top: calc(var(--header-height) + 1px);\n  padding: 0px;\n}\n\n@media (min-width: 415px) {\n  .NavModal-module_contentNav__wMSAL {\n    width: 375px;\n  }\n}\n.NavModal-module_contentNav__wMSAL.NavModal-module_closingNav__OIIRY {\n  -webkit-animation: NavModal-module_SlideLeft__7Veo2 200ms;\n          animation: NavModal-module_SlideLeft__7Veo2 200ms;\n}\n\n.NavModal-module_closeIconNav__2gqUi {\n  width: 24px;\n  height: 24px;\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n}\n\n@-webkit-keyframes NavModal-module_SlideRight__DNLx- {\n  0% {\n    transform: translateX(-100px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0px);\n    opacity: 1;\n  }\n}\n\n@keyframes NavModal-module_SlideRight__DNLx- {\n  0% {\n    transform: translateX(-100px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes NavModal-module_SlideLeft__7Veo2 {\n  0% {\n    transform: translateX(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateX(-200px);\n  }\n}\n@keyframes NavModal-module_SlideLeft__7Veo2 {\n  0% {\n    transform: translateX(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateX(-200px);\n  }\n}",
  );
  var Aa = {
      linkInfo: {
        title:
          "You can now link your Wordle stats to a free New York Times account.",
        text: [
          "Wordle stats are currently saved locally in the browser where you play, which means different devices may save different stats.",
          "If the browser memory is cleared, your stats will be lost.",
          "Linking your stats to a free account means keeping your streak and stats anywhere you're logged in.",
        ],
        text2:
          "<b>You can continue to play Wordle without an account,</b> but your stats will not appear across devices and may reset if the browser data is cleared.",
        icon: "var(--link-info)",
        alt: "Wordle Icon with NYT Logo",
      },
      statsProblem: {
        title: "These stats don't look right.",
        text: [
          "Wordle currently saves your stats to the device or browser you play on. <b>If this is not where you regularly play, go to that device or browser and check if your stats are correct. You can save to an account from there.</b>",
          'If this is the device or browser where you regularly play and your stats are not updating, visit <a target="_blank" href="https://help.nytimes.com/hc/en-us/articles/360029050872-Word-Games-and-Logic-Puzzles#h_01FVGCB2Z00ZQMDMCYWBPWJNXB">our FAQ</a> for more troubleshooting tips.',
          "If your stats are completely missing, your progress may have been reset if your browser data was cleared. We recommend logging in or creating a free account to save your stats from anywhere.",
        ],
        icon: "var(--stats-problem)",
        alt: "Wordle Icon with Question Mark",
      },
    },
    Ia = {
      title: "Explainer-module_title__-DKFu",
      containerLink: "Explainer-module_containerLink__CFd3e",
      containerProblems: "Explainer-module_containerProblems__8fCRH",
      explainerFooterText: "Explainer-module_explainerFooterText__ZeeBX",
      text: "Explainer-module_text__keVaW",
      statsLinkContainer: "Explainer-module_statsLinkContainer__1PALX",
      loginButton: "Explainer-module_loginButton__XupvV",
      gamesIcon: "Explainer-module_gamesIcon__spKfI",
      headerNew: "Explainer-module_headerNew__SaqiR",
      close: "Explainer-module_close__F3zLu",
    };
  function Ta(e) {
    var t = e.type,
      n = e.loggedIn,
      a = void 0 !== n && n,
      o = e.optedIn,
      r = void 0 !== o && o,
      s = e.onClose,
      i = e.dispatchAction,
      l = e.trackClick,
      u = a && !r,
      c = "linkInfo" === t ? "more-info" : "broken-stats",
      d = Aa[t],
      m = d.text,
      n = d.title,
      o = d.icon,
      e = d.alt,
      d = d.text2,
      d = void 0 === d ? "" : d,
      r = !!d && !r,
      t = "linkInfo" === t ? Ia.containerLink : Ia.containerProblems;
    return f.createElement(
      f.Fragment,
      null,
      f.createElement(
        "div",
        {className: Ia.headerNew},
        f.createElement(
          "p",
          null,
          f.createElement("img", {
            className: Ia.gamesIcon,
            alt: "NYT Games Logo",
            style: {content: "var(--gameslogo)"},
          }),
        ),
        f.createElement(
          "button",
          {
            type: "button",
            className: Ia.close,
            "data-testid": "close",
            onClick: s,
          },
          f.createElement(v, {icon: "close"}),
        ),
      ),
      f.createElement(
        "div",
        {className: t},
        f.createElement("img", {alt: e, style: {content: o}}),
        f.createElement("h1", {className: Ia.title}, n),
        f.createElement(
          "div",
          null,
          m.map(function (e) {
            return f.createElement("p", {
              key: e,
              className: Ia.text,
              dangerouslySetInnerHTML: {__html: e},
            });
          }),
        ),
        f.createElement(
          "div",
          {className: Ia.statsLinkContainer},
          !a &&
            f.createElement(
              "a",
              {
                type: "link",
                className: Ia.loginButton,
                "aria-label":
                  "Log in or create a free account link. Click to sign in.",
                tabIndex: -1,
                href: We,
                onClick: function () {
                  return l("log-in-".concat(c));
                },
              },
              "Log in or create a free account",
            ),
          u &&
            f.createElement(
              "button",
              {
                type: "button",
                tabIndex: -1,
                className: Ia.loginButton,
                "aria-label": "Button to link stats to my account",
                onClick: function () {
                  l("link-".concat(c)), i();
                },
              },
              "Link stats to my account",
            ),
        ),
      ),
      r &&
        f.createElement("p", {
          className: Ia.explainerFooterText,
          dangerouslySetInnerHTML: {__html: d},
        }),
    );
  }
  Te(
    '.Explainer-module_title__-DKFu {\n  font-family: "nyt-franklin";\n  font-size: 24px;\n  font-weight: 700;\n  line-height: 28px;\n  letter-spacing: 0em;\n  text-align: left;\n  margin-left: 10px;\n  color: var(--color-tone-1);\n}\n\n.Explainer-module_containerLink__CFd3e {\n  padding: 30px;\n}\n.Explainer-module_containerLink__CFd3e p:last-child {\n  font-weight: 700;\n}\n\n.Explainer-module_containerProblems__8fCRH {\n  padding: 30px;\n}\n\n.Explainer-module_containerLink__CFd3e,\n.Explainer-module_containerProblems__8fCRH {\n  padding-top: 14px;\n}\n\n.Explainer-module_explainerFooterText__ZeeBX {\n  margin: 30px;\n  padding-top: 30px;\n  border-top: 1px solid var(--gray-2);\n  font-size: 15px;\n  line-height: 130%;\n}\n\n.Explainer-module_text__keVaW {\n  font-size: 14px;\n  line-height: 130%;\n  letter-spacing: 0.01em;\n  text-align: left;\n  margin-left: 10px;\n  color: var(--color-tone-1);\n}\n.Explainer-module_text__keVaW > a {\n  color: inherit;\n}\n\n.Explainer-module_statsLinkContainer__1PALX {\n  margin-top: 40px;\n}\n\n.Explainer-module_loginButton__XupvV {\n  height: 44px;\n  background: var(--color-tone-1);\n  border-radius: 104px;\n  text-decoration: none;\n  color: var(--color-tone-7);\n  font-weight: 700;\n  line-height: 14px;\n  font-size: 14px;\n  text-align: center;\n  padding: 0 30px;\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  letter-spacing: 0.05em;\n}\n\n.Explainer-module_gamesIcon__spKfI {\n  width: 95px;\n  height: 18px;\n}\n\n.Explainer-module_headerNew__SaqiR {\n  padding: 15px 0px;\n}\n.Explainer-module_headerNew__SaqiR > p {\n  text-align: center;\n  margin: 10px 0px;\n}\n\n.Explainer-module_close__F3zLu {\n  background: none;\n  color: inherit;\n  border: none;\n  padding: 0;\n  font: inherit;\n  cursor: pointer;\n  outline: inherit;\n  position: absolute;\n  right: 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  margin: 0;\n  margin-right: 30px;\n}',
  );
  var La = ["timestamp"];
  function Pa(e, t) {
    if (null == e) return {};
    var n,
      a = (function (e, t) {
        if (null == e) return {};
        var n,
          a,
          o = {},
          r = Object.keys(e);
        for (a = 0; a < r.length; a++)
          (n = r[a]), 0 <= t.indexOf(n) || (o[n] = e[n]);
        return o;
      })(e, t);
    if (Object.getOwnPropertySymbols)
      for (var o = Object.getOwnPropertySymbols(e), r = 0; r < o.length; r++)
        (n = o[r]),
          0 <= t.indexOf(n) ||
            (Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]));
    return a;
  }
  function Ma(t) {
    return function (e) {
      e(Z()),
        e(X()),
        e(J()),
        "malformed Moogle response data" === t.message &&
          _.captureSentryError(t, {api: "moogle", category: "game_state"}),
        t.message && "No internet" === t.message
          ? e(N("offline"))
          : t.message && "profile" === t.message
          ? e(N("profile"))
          : e(N("default"));
    };
  }
  var Ra =
      "prod" === _.env.name
        ? "https://www.nytimes.com"
        : "https://www.stg.nytimes.com",
    Da = "wordle/api/MOOGLE_OPT_IN",
    Ba = "wordle/api/LOAD_MOOGLE_GET",
    Ha = "wordle/api/MOOGLE_GET_SUCCESS",
    qa = "wordle/api/MOOGLE_GET_ERROR",
    Wa = "wordle/api/LOAD_MOOGLE_POST",
    Ga = "wordle/api/MOOGLE_POST_SUCCESS",
    Fa = "wordle/api/MOOGLE_POST_ERROR",
    Ya = "wordle/api/MOOGLE_POST_RESET",
    Va = "wordle/api/LOAD_PROFILE_INFO",
    Ua = "wordle/api/PROFILE_INFO_SUCCESS",
    Za = "wordle/api/PROFILE_INFO_ERROR",
    Xa = "wordle/api/START_SYNC",
    Ka = function () {
      var e = document.cookie.toLowerCase();
      return e.includes("nyt-s") || e.includes("sidny");
    },
    Ja = "user not authenticated for GET /state",
    Qa = function (o, r) {
      return function (t, e) {
        var n = vt(e()),
          a = o.timestamp,
          e = Pa(o, La);
        return n
          ? (t({type: Wa}),
            _.xhr
              .post(
                "".concat(Ra, "/svc/games/state"),
                {
                  game: "wordle",
                  game_data: e,
                  puzzle_id: "1",
                  schema_version: "0.0.0",
                  timestamp: a,
                  user_id: n,
                },
                {withCookie: !1},
              )
              .then(function (e) {
                if (!e.version)
                  throw new Error("malformed Moogle response data");
                t({type: Ga, payload: {data: e, enableAuth: !!r}});
              })
              .catch(function (e) {
                t({type: Fa, payload: {saveData: o}}),
                  t(
                    Q({
                      text: "There was an error while saving. Please refresh the page and try again",
                      duration: 3e3,
                      isSystem: !0,
                    }),
                  ),
                  "malformed Moogle response data" === e.message &&
                    _.captureSentryError(e, {
                      api: "moogle",
                      category: "game_state",
                    });
              }))
          : Promise.resolve();
      };
    },
    $a = {
      container: "Loading-module_container__lnPKB",
      loadingContainer: "Loading-module_loadingContainer__tPgFk",
      spin: "Loading-module_spin__XGr9b",
      hide: "Loading-module_hide__A9nsN",
    };
  function eo(e) {
    var t = e.circleColor,
      n = e.barColor,
      e = e.backgroundColor,
      e = void 0 === e ? "" : e;
    return f.createElement(
      "div",
      {className: $a.container, style: e ? {backgroundColor: e} : {}},
      f.createElement(
        "div",
        {className: $a.loadingContainer},
        f.createElement(
          "svg",
          {
            width: "82",
            height: "82",
            viewBox: "0 0 82 82",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
          },
          f.createElement("circle", {
            cx: "41",
            cy: "41",
            r: "40.0391",
            stroke: t,
            strokeWidth: "1.92188",
          }),
          f.createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M19.4763 73.6983L18.4497 75.3237C24.8956 79.5452 32.6028 82 40.8834 82C62.8396 82 80.7649 64.7413 81.833 43.05H79.9087C78.8425 63.6793 61.778 80.0781 40.8834 80.0781C32.9802 80.0781 25.6251 77.732 19.4763 73.6983Z",
            fill: n,
          }),
        ),
      ),
    );
  }
  function to(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return no(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? no(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function no(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  Te(
    ".Loading-module_container__lnPKB {\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  max-height: calc(100% - var(--header-height) - 1px);\n  left: 0;\n  justify-content: center;\n  background-color: var(--color-background);\n  z-index: var(--error-z-index);\n}\n\n@-webkit-keyframes Loading-module_spin__XGr9b {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes Loading-module_spin__XGr9b {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.Loading-module_loadingContainer__tPgFk {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  width: 82px;\n  height: 100%;\n  -webkit-animation: Loading-module_spin__XGr9b 1s linear infinite;\n          animation: Loading-module_spin__XGr9b 1s linear infinite;\n  transition: opacity 0.2s;\n  opacity: 1;\n}\n\n.Loading-module_hide__A9nsN {\n  opacity: 0;\n}",
  );
  var ao = 300;
  function oo(e) {
    var t = e.waitFor,
      n = void 0 === t ? ao : t,
      a = e.setBackground,
      t = void 0 === a ? "dark" : a,
      e = to(f.useState(!1), 2),
      a = e[0],
      o = e[1],
      e = S(et),
      e = "light" !== t && e;
    return (
      b(function () {
        return o(!0);
      }, n),
      a
        ? f.createElement(eo, {
            circleColor: e ? "#666666" : "#DFDFDF",
            barColor: e ? "#DFDFDF" : "#959595",
            backgroundColor: e ? "#121213" : "#FFF",
          })
        : null
    );
  }
  var ro = "StatsLink-module_container__G4oYM",
    so = "StatsLink-module_header__8CPRA",
    io = "StatsLink-module_logo__Kx2s-",
    lo = "StatsLink-module_content__7z9K3",
    uo = "StatsLink-module_statsIconWrapper__lzf6R",
    co = "StatsLink-module_statsFailureBadge__qQmvE",
    mo = "StatsLink-module_statsIcon__-nU--",
    po = "StatsLink-module_headingWrapper__DV4V8",
    yo = "StatsLink-module_heading__8G3Jk",
    go = "StatsLink-module_paragraphWrapper__5sxeO",
    ho = "StatsLink-module_paragraph__Q-baL",
    fo = "StatsLink-module_email__xzzCz",
    bo = "StatsLink-module_button__F7k0J",
    ko = "StatsLink-module_footer__Qxrmi",
    wo = "StatsLink-module_link__YBHY7",
    vo = "StatsLink-module_linkPrompt__VzIFH";
  function _o(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return xo(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? xo(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function xo(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  Te(
    ".StatsLink-module_container__G4oYM {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.StatsLink-module_header__8CPRA {\n  align-items: center;\n  border-bottom: 1px solid var(--gray-2);\n  display: flex;\n  height: 3em;\n  justify-content: center;\n}\n\n.StatsLink-module_logo__Kx2s- {\n  position: relative;\n  top: 5px;\n}\n\n.StatsLink-module_content__7z9K3 {\n  align-items: center;\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  padding-left: 1.25em;\n  padding-right: 1.25em;\n  padding-top: 6em;\n}\n\n.StatsLink-module_statsIconWrapper__lzf6R {\n  position: relative;\n  height: 12em;\n  width: 12em;\n  margin-bottom: 2em;\n}\n\n.StatsLink-module_statsFailureBadge__qQmvE {\n  position: absolute;\n  height: 2.75em;\n  width: 2.75em;\n  top: -0.75em;\n  right: -0.75em;\n}\n\n.StatsLink-module_statsIcon__-nU-- {\n  height: 12em;\n  width: 12em;\n}\n\n.StatsLink-module_headingWrapper__DV4V8 {\n  text-align: center;\n  margin-bottom: 1em;\n}\n\n.StatsLink-module_heading__8G3Jk {\n  font-family: nyt-cheltenham;\n  font-size: 24px;\n  font-style: normal;\n  font-weight: 400;\n  margin: 0;\n  line-height: 30px;\n}\n\n.StatsLink-module_paragraphWrapper__5sxeO {\n  text-align: center;\n  margin-bottom: 1.25em;\n}\n\n.StatsLink-module_paragraph__Q-baL {\n  font-family: nyt-franklin;\n  font-size: 1em;\n  margin: 0;\n}\n\n.StatsLink-module_email__xzzCz {\n  font-weight: 700;\n  font-size: 16px;\n  line-height: 20px;\n}\n\n.StatsLink-module_button__F7k0J {\n  background: var(--black-2);\n  border: none;\n  border-radius: 3px;\n  color: var(--white);\n  font-family: nyt-franklin;\n  font-weight: 600;\n  font-size: 1em;\n  height: 3em;\n  width: 100%;\n}\n\n.StatsLink-module_footer__Qxrmi {\n  padding-top: 2.5em;\n  text-align: center;\n}\n\n.StatsLink-module_buttonAsLink__kErTh {\n  all: unset;\n  text-decoration: underline;\n  cursor: pointer;\n  color: var(--black-3);\n  font-family: nyt-franklin;\n}\n\n.StatsLink-module_link__YBHY7 {\n  font-family: nyt-franklin;\n  font-size: 1em;\n  color: var(--black-3);\n}\n\n.StatsLink-module_linkPrompt__VzIFH {\n  color: var(--black-3);\n}",
  );
  var So = {
      line1: "Your stats will be linked to this",
      line2: "New York Times account",
    },
    Eo = {
      line1: "We're sorry, but we're having a technical issue.",
      line2: "We're unable to link your stats to this account right now.",
    },
    zo = function (e) {
      var t = e.onClose,
        n = _o(React.useState(!0), 2),
        a = n[0],
        o = n[1],
        r = x(),
        s = S(St),
        e = S(xt),
        i = S(Et);
      React.useEffect(function () {
        r({type: Ya}),
          r(function (n) {
            return (
              n({type: Va}),
              _.xhr
                .get(He, {withCookie: !1, headers: {client_id: "games"}})
                .then(function (e) {
                  e.email
                    ? n({type: Ua, payload: {data: {email: e.email}}})
                    : (n({type: Za}), (e = new Error("profile")), n(Ma(e)));
                })
                .catch(function (e) {
                  n({type: Za});
                  var t = new Error("profile");
                  n(Ma(t));
                })
            );
          });
      }, []),
        React.useEffect(
          function () {
            o(!!s);
          },
          [s],
        );
      n = i ? Eo : So;
      return a
        ? f.createElement(
            "div",
            {className: ro},
            f.createElement(
              "header",
              {className: so},
              f.createElement("img", {
                alt: "New York Times logo",
                className: io,
                style: {content: "var(--nyt-logo)"},
              }),
            ),
            f.createElement(
              "div",
              null,
              f.createElement(oo, {waitFor: 150, setBackground: "light"}),
            ),
          )
        : f.createElement(
            "div",
            {className: ro},
            f.createElement(
              "header",
              {className: so},
              f.createElement("img", {
                alt: "New York Times logo",
                className: io,
                style: {content: "var(--nyt-logo)"},
              }),
            ),
            f.createElement(
              "div",
              {className: lo},
              f.createElement(
                "div",
                {className: uo},
                i &&
                  f.createElement(
                    "svg",
                    {
                      className: co,
                      width: "44",
                      height: "44",
                      viewBox: "0 0 44 44",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                    f.createElement("path", {
                      d: "M13.7145 41.3977C16.2788 42.4691 19.0443 43 22 43C24.9241 43 27.6726 42.4685 30.2355 41.3977C32.7847 40.3326 35.0117 38.8526 36.9071 36.9571C38.8013 35.0629 40.2889 32.8377 41.3704 30.2909C42.46 27.7252 43 24.9579 43 22C43 19.0738 42.4593 16.3233 41.3704 13.7591C40.2889 11.2123 38.8013 8.98713 36.9071 7.09289C35.0129 5.19865 32.7877 3.71108 30.2409 2.62956C27.6767 1.54066 24.9262 1 22 1C19.0421 1 16.2748 1.54004 13.7091 2.62956C11.1623 3.71108 8.93713 5.19865 7.04289 7.09289C5.14744 8.98834 3.66735 11.2153 2.6023 13.7645C1.53151 16.3274 1 19.0759 1 22C1 24.9557 1.53091 27.7212 2.6023 30.2855C3.66735 32.8347 5.14744 35.0617 7.04289 36.9571C8.93834 38.8526 11.1653 40.3326 13.7145 41.3977ZM22.65 12.7V23.35H21.65V12.7H22.65ZM22.4679 30.8179C22.3474 30.9384 22.2139 31 22 31C21.7861 31 21.6526 30.9384 21.5321 30.8179C21.4116 30.6974 21.35 30.5639 21.35 30.35C21.35 30.1361 21.4116 30.0026 21.5321 29.8821C21.6526 29.7616 21.7861 29.7 22 29.7C22.2139 29.7 22.3474 29.7616 22.4679 29.8821C22.5884 30.0026 22.65 30.1361 22.65 30.35C22.65 30.5639 22.5884 30.6974 22.4679 30.8179Z",
                      fill: "#E33D26",
                      stroke: "white",
                      strokeWidth: "2",
                    }),
                  ),
                f.createElement("img", {
                  alt: "Large sized wordle stats icon",
                  className: mo,
                  style: {content: "var(--large-stats)"},
                }),
              ),
              f.createElement(
                "div",
                {className: po},
                f.createElement("h1", {className: yo}, n.line1),
                f.createElement("h1", {className: yo}, n.line2),
              ),
              f.createElement(
                "div",
                {className: go},
                i &&
                  f.createElement("p", {className: ho}, "You are logged in as"),
                f.createElement("p", {className: classNames(ho, fo)}, e && e.email),
              ),
              f.createElement(
                "button",
                {
                  className: bo,
                  onClick: function () {
                    i
                      ? t()
                      : (r({type: Da}),
                        r({type: Xa, payload: {enableAuth: !0}})),
                      r(
                        $(
                          i ? "stats-link-error" : "stats-link-confirmation",
                          !1,
                        ),
                      );
                  },
                  type: "button",
                },
                i ? "Go back to stats" : "Confirm and save",
              ),
              f.createElement(
                "footer",
                {className: ko},
                !i &&
                  f.createElement(
                    f.Fragment,
                    null,
                    f.createElement(
                      "p",
                      {className: classNames(ho, vo)},
                      "Not the right account?",
                    ),
                    f.createElement(
                      "a",
                      {className: wo, href: We},
                      "Log in to or create another free account ›",
                    ),
                  ),
              ),
            ),
          );
    },
    jo = {
      page: "Page-module_page__YqrWy",
      SlideIn: "Page-module_SlideIn__T-Lu3",
      closing: "Page-module_closing__uVg4f",
      SlideOut: "Page-module_SlideOut__U2w2g",
      pageNew: "Page-module_pageNew__YeTYy",
      gamesIcon: "Page-module_gamesIcon__VFFP9",
      close: "Page-module_close__D3gaa",
      noDarkMode: "Page-module_noDarkMode__0G0q5",
      content: "Page-module_content__hwN4l",
      headerNew: "Page-module_headerNew__7DIpY",
      contentContainer: "Page-module_contentContainer__KZJPh",
    };
  function No(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function Co(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Oo(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Oo(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function Oo(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function Ao() {
    var t = x(),
      e = S(Fn),
      n = Co(React.useState(!1), 2),
      a = n[0],
      o = n[1],
      r = !!S(vt),
      s = S(ft),
      i = ht("auth") || s,
      l = S(Zn);
    if (
      (React.useEffect(
        function () {
          l && o(!0);
        },
        [l],
      ),
      !e)
    )
      return null;
    (n = function (e) {
      e.animationName === jo.SlideOut && (o(!1), t(X()));
    }),
      (r = {
        settings: {content: f.createElement(qn, null), title: "Settings"},
        help: {
          content: f.createElement(Ze, {isPage: !0}),
          title: "How to play",
        },
        linkInfo: {
          content: f.createElement(Ta, {
            onClose: function () {
              return o(!0);
            },
            type: "linkInfo",
            loggedIn: r,
            optedIn: s,
            dispatchAction: function () {
              return t(U("statsLink"));
            },
            trackClick: function (e) {
              return t($(e, !1));
            },
          }),
          title: "",
        },
        statsProblem: {
          content: f.createElement(Ta, {
            onClose: function () {
              return o(!0);
            },
            loggedIn: r,
            optedIn: s,
            type: "statsProblem",
            dispatchAction: function () {
              return t(U("statsLink"));
            },
            trackClick: function (e) {
              return t($(e, !1));
            },
          }),
          title: "",
        },
        statsLink: {
          content: f.createElement(zo, {
            onClose: function () {
              return o(!0);
            },
          }),
          title: "",
        },
      }[e]),
      (s = r.content),
      (r = r.title);
    if (i) {
      i = ["statsLink"].includes(e);
      return f.createElement(
        "div",
        {
          "data-testid": "pageNew",
          className: classNames(
            jo.pageNew,
            (No((e = {}), jo.closing, a), No(e, jo.noDarkMode, i), e),
          ),
          onAnimationEnd: n,
        },
        f.createElement("div", {className: jo.content}, s),
      );
    }
    return f.createElement(
      "div",
      {
        role: "dialog",
        className: classNames(jo.page, No({}, jo.closing, a)),
        onAnimationEnd: n,
      },
      f.createElement(
        "div",
        {className: jo.content},
        f.createElement(
          "header",
          null,
          f.createElement("h1", null, r),
          f.createElement(
            "button",
            {
              type: "button",
              className: jo.close,
              "data-testid": "close",
              onClick: function () {
                o(!0);
              },
            },
            f.createElement(v, {icon: "close"}),
          ),
        ),
        f.createElement("div", {className: jo.contentContainer}, s),
      ),
    );
  }
  Te(
    ".Page-module_page__YqrWy {\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  justify-content: center;\n  background-color: var(--color-background);\n  -webkit-animation: Page-module_SlideIn__T-Lu3 100ms linear;\n          animation: Page-module_SlideIn__T-Lu3 100ms linear;\n  z-index: var(--page-z-index);\n}\n.Page-module_page__YqrWy.Page-module_closing__uVg4f {\n  -webkit-animation: Page-module_SlideOut__U2w2g 150ms linear;\n          animation: Page-module_SlideOut__U2w2g 150ms linear;\n}\n.Page-module_page__YqrWy header {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n}\n.Page-module_page__YqrWy h1 {\n  font-weight: 700;\n  font-size: 16px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  text-align: center;\n  margin-bottom: 10px;\n}\n\n.Page-module_pageNew__YeTYy {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  justify-content: center;\n  background-color: var(--color-background);\n  -webkit-animation: Page-module_SlideIn__T-Lu3 100ms linear;\n          animation: Page-module_SlideIn__T-Lu3 100ms linear;\n  z-index: var(--page-z-index);\n  overflow-y: scroll;\n  display: flex;\n}\n.Page-module_pageNew__YeTYy .Page-module_gamesIcon__VFFP9 {\n  width: 95px;\n  height: 18px;\n}\n.Page-module_pageNew__YeTYy .Page-module_close__D3gaa {\n  margin-right: 30px;\n}\n.Page-module_pageNew__YeTYy.Page-module_closing__uVg4f {\n  -webkit-animation: Page-module_SlideOut__U2w2g 150ms linear;\n          animation: Page-module_SlideOut__U2w2g 150ms linear;\n}\n.Page-module_pageNew__YeTYy.Page-module_noDarkMode__0G0q5 {\n  background-color: var(--white);\n  color: black;\n}\n.Page-module_pageNew__YeTYy.Page-module_noDarkMode__0G0q5 > .Page-module_content__hwN4l {\n  color: black;\n}\n\n.Page-module_headerNew__7DIpY {\n  padding: 15px 0px;\n}\n.Page-module_headerNew__7DIpY > p {\n  text-align: center;\n  margin: 10px 0px;\n}\n\n.Page-module_content__hwN4l {\n  position: relative;\n  color: var(--color-tone-1);\n  padding: 0 32px;\n  max-width: var(--game-max-width);\n  width: 100%;\n  overflow-y: auto;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.Page-module_contentContainer__KZJPh {\n  height: 100%;\n}\n\n.Page-module_close__D3gaa {\n  background: none;\n  color: inherit;\n  border: none;\n  padding: 0;\n  font: inherit;\n  cursor: pointer;\n  outline: inherit;\n  position: absolute;\n  right: 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  margin: 0;\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\n  .Page-module_content__hwN4l {\n    max-width: 100%;\n    padding: 0;\n  }\n\n  .Page-module_close__D3gaa {\n    padding: 0 16px;\n  }\n}\n@-webkit-keyframes Page-module_SlideIn__T-Lu3 {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@keyframes Page-module_SlideIn__T-Lu3 {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes Page-module_SlideOut__U2w2g {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}\n@keyframes Page-module_SlideOut__U2w2g {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}",
  );
  var Io = {
    toaster: "ToastContainer-module_toaster__QDad3",
    gameToaster: "ToastContainer-module_gameToaster__yjzPn",
    systemToaster: "ToastContainer-module_systemToaster__fIZdf",
  };
  Te(
    ".ToastContainer-module_toaster__QDad3 {\n  position: absolute;\n  top: 45px;\n  left: 50%;\n  transform: translate(-50%, 0);\n  pointer-events: none;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n\n#ToastContainer-module_gameToaster__yjzPn {\n  z-index: var(--toast-z-index);\n}\n\n#ToastContainer-module_systemToaster__fIZdf {\n  z-index: var(--system-toast-z-index);\n}",
  );
  var To = {
    toast: "Toast-module_toast__Woeb-",
    win: "Toast-module_win__7-aZX",
    fade: "Toast-module_fade__uPhAg",
  };
  function Lo(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Po(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Po(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function Po(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function Mo(e) {
    var t = e.toast,
      n = t.text,
      a = t.duration,
      o = t.timestamp,
      r = x(),
      e = Lo(React.useState(!1), 2),
      t = e[0],
      s = e[1];
    return (
      b(
        function () {
          return s(!0);
        },
        a === 1 / 0 ? null : a,
      ),
      f.createElement(
        "div",
        {
          className: classNames(
            To.toast,
            ((e = {}),
            (a = To.fade),
            (t = t),
            a in e
              ? Object.defineProperty(e, a, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[a] = t),
            e),
          ),
          onTransitionEnd: function () {
            r(O(n, o));
          },
        },
        n,
      )
    );
  }
  function Ro() {
    var e = S(Un),
      t = e.filter(function (e) {
        return e.isSystem;
      }),
      n = e.filter(function (e) {
        return !e.isSystem;
      }),
      e = function (e, t) {
        return f.createElement(
          "div",
          {className: Io.toaster, id: t},
          e.map(function (e) {
            return f.createElement(Mo, {
              key: "".concat(e.text, "-").concat(e.timestamp),
              toast: e,
            });
          }),
        );
      };
    return f.createElement(
      f.Fragment,
      null,
      e(n, Io.gameToaster),
      e(t, Io.systemToaster),
    );
  }
  Te(
    ".Toast-module_toast__Woeb- {\n  position: relative;\n  margin: 16px;\n  background-color: var(--color-tone-8);\n  color: var(--color-tone-7);\n  padding: 13px;\n  border: none;\n  border-radius: 4px;\n  opacity: 1;\n  transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1);\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 16px;\n}\n\n.Toast-module_win__7-aZX {\n  background-color: var(--color-correct);\n  color: var(--tile-text-color);\n}\n\n.Toast-module_fade__uPhAg {\n  opacity: 0;\n}",
  );
  var Do = function () {
      var e;
      return (
        window.isHybridWebView && window.NativeBridge
          ? window.NativeBridge.gamesBackToHub()
          : window.isPlayTab
          ? (((e = document.createElement("a")).href = "nytimes://play"),
            e.click())
          : (window.location.href = "/crosswords"),
        null
      );
    },
    Bo = {
      container: "Error-module_container__BMcmT",
      SlideIn: "Error-module_SlideIn__9w2wl",
      errorContainer: "Error-module_errorContainer__5f0-O",
      errorText: "Error-module_errorText__aINs5",
      errorTilesContainer: "Error-module_errorTilesContainer__7SZD5",
      errorTiles: "Error-module_errorTiles__miCkr",
      backButton: "Error-module_backButton__qhfix",
      errorBannerContainer: "Error-module_errorBannerContainer__kpuAB",
      errorTitle: "Error-module_errorTitle__-iN5F",
      close: "Error-module_close__M-EdG",
      errorRow: "Error-module_errorRow__35lMF",
      hideBanner: "Error-module_hideBanner__dI2kJ",
      SlideOut: "Error-module_SlideOut__uVOvc",
    };
  Te(
    '.Error-module_container__BMcmT {\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  max-height: calc(100% - var(--header-height) - 1px);\n  left: 0;\n  justify-content: center;\n  background-color: var(--error-background);\n  -webkit-animation: Error-module_SlideIn__9w2wl 100ms linear;\n          animation: Error-module_SlideIn__9w2wl 100ms linear;\n  z-index: var(--error-z-index);\n}\n\n.Error-module_errorContainer__5f0-O {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 200px;\n  position: relative;\n  top: 166px;\n  font-family: "nyt-franklin";\n}\n\n.Error-module_errorText__aINs5 {\n  font-family: "nyt-franklin-400";\n  text-align: center;\n  margin-top: 40px;\n  font-size: 20px;\n  line-height: 24px;\n  color: var(--color-tone-1);\n}\n\n.Error-module_errorTilesContainer__7SZD5 {\n  width: 208px;\n  display: inline-flex;\n  justify-content: space-between;\n}\n\n.Error-module_errorTiles__miCkr {\n  font-weight: 700;\n  font-size: 20px;\n  line-height: 20px;\n  text-align: center;\n  text-transform: uppercase;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--white);\n  border: 1.27px solid var(--lightGray);\n  width: 40px;\n  height: 40px;\n  box-sizing: border-box;\n}\n\n.Error-module_backButton__qhfix {\n  margin-top: 24px;\n  border-radius: 24px;\n  width: 150px;\n  height: 48px;\n  font-family: "nyt-franklin-600";\n  font-size: 16px;\n  line-height: 20px;\n  text-align: center;\n  background-color: var(--color-tone-1);\n  box-shadow: none;\n  border: none;\n  color: var(--color-tone-7);\n}\n\n@-webkit-keyframes Error-module_SlideIn__9w2wl {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n\n@keyframes Error-module_SlideIn__9w2wl {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes Error-module_SlideOut__uVOvc {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}\n@keyframes Error-module_SlideOut__uVOvc {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}\n.Error-module_errorBannerContainer__kpuAB {\n  background-color: #323232;\n  color: white;\n  font-size: 14px;\n  height: auto;\n  opacity: 1;\n  transition: all 0.5s ease-in-out;\n  position: absolute;\n  width: 100%;\n  left: 0;\n  font-family: "nyt-franklin";\n}\n.Error-module_errorBannerContainer__kpuAB p {\n  font-weight: 400;\n  margin: 5px 5px 5px 10px;\n}\n.Error-module_errorBannerContainer__kpuAB p.Error-module_errorTitle__-iN5F {\n  font-weight: 700;\n}\n.Error-module_errorBannerContainer__kpuAB .Error-module_close__M-EdG {\n  color: white;\n  font-size: 14px;\n  line-height: 17px;\n  font-weight: 600;\n  cursor: pointer;\n  margin: 5px 5px 0px 0px;\n}\n.Error-module_errorBannerContainer__kpuAB .Error-module_errorRow__35lMF {\n  display: flex;\n  justify-content: space-between;\n}\n.Error-module_errorBannerContainer__kpuAB.Error-module_hideBanner__dI2kJ {\n  opacity: 0;\n  height: 0;\n}',
  );
  var Ho = function (e) {
      (e = e.text), (e = void 0 === e ? "error" : e);
      return f.createElement(
        "div",
        {className: Bo.errorTilesContainer},
        e.split("").map(function (e, t) {
          return f.createElement(
            "div",
            {className: Bo.errorTiles, key: "".concat(t, "-").concat(e)},
            e,
          );
        }),
      );
    },
    qo = function () {
      return f.createElement(
        "div",
        {className: Bo.errorText},
        "You’re offline.",
        f.createElement("br", null),
        "Find a connection and come back.",
      );
    },
    Wo = function () {
      return f.createElement(
        "div",
        {className: Bo.errorText},
        "Oops, something went wrong.",
        f.createElement("br", null),
        "Please try again later.",
      );
    };
  function Go() {
    var e = S(Gn),
      t = "profile" === e,
      n = document.referrer.includes("nytimes") && !t,
      a = x();
    if (!e) return null;
    var o = {
        offline: {
          tiles: f.createElement(Ho, {text: "yikes"}),
          content: f.createElement(qo, null),
        },
        default: {
          tiles: f.createElement(Ho, null),
          content: f.createElement(Wo, null),
        },
        profile: {
          tiles: f.createElement(Ho, null),
          content: f.createElement(Wo, null),
        },
      }[e],
      r = o.tiles,
      o = o.content;
    return f.createElement(
      "div",
      {className: Bo.container, role: "dialog"},
      f.createElement(
        "div",
        {className: Bo.errorContainer},
        r,
        o,
        n &&
          f.createElement(
            "button",
            {
              className: Bo.backButton,
              type: "button",
              "data-testid": "back",
              onClick: function () {
                "offline" === e && a($("stats-link-offline", !1)), Do();
              },
            },
            "Back",
          ),
        t &&
          f.createElement(
            "button",
            {
              className: Bo.backButton,
              type: "button",
              "data-testid": "reload",
              onClick: function () {
                return document.location.reload();
              },
            },
            "Reload",
          ),
      ),
    );
  }
  function Fo(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Yo(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Yo(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function Yo(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function Vo() {
    var e,
      t,
      n = Fo(React.useState(!1), 2),
      a = n[0],
      o = n[1];
    return f.createElement(
      "div",
      {
        "aria-hidden": a,
        className: classNames(
          Bo.errorBannerContainer,
          ((e = {}),
          (t = Bo.hideBanner),
          (n = a),
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e),
        ),
      },
      f.createElement(
        "div",
        {className: Bo.errorRow, "aria-hidden": a},
        f.createElement("p", {className: Bo.errorTitle}, "Error"),
        f.createElement(
          "span",
          {
            role: "button",
            className: Bo.close,
            onClick: function () {
              return o(!0);
            },
          },
          f.createElement(v, {icon: "close", fillColor: "var(--white)"}),
        ),
      ),
      f.createElement(
        "p",
        null,
        "Oops, something went wrong. Please try again later.",
      ),
    );
  }
  var Uo = "wordle/game/START_GAME",
    Zo = "wordle/game/CONTINUE_GAME",
    Xo = "wordle/game/ADD_LETTER",
    Ko = "wordle/game/BACKSPACE",
    Jo = "wordle/game/EVALUATE_ROW",
    Qo = function (a) {
      return function (e, t) {
        var n = Ne(t()),
          t = ye(t());
        n || t.length >= guessLength || e({type: Xo, payload: {letter: a}});
      };
    },
    $o = function () {
      return function (e, t) {
        Ne(t()) || e({type: Ko});
      };
    },
    er = function () {
      return function (e, t) {
        var n = t(),
          a = Ne(n),
          guess = ye(n),
          r = be(n),
          s = de(n),
          i = ke(n),
          l = pe(n),
          t = $e(n),
          n = fe(n);
        if (!a) {
          if (guess.length !== guessLength)
            return e(Q({text: "Not enough letters", invalidate: !0}));
          if (((a = guess), !te.includes(a) && !ee.includes(a)))
            return e(Q({text: "Not in word list", invalidate: !0}));
          if (t) { // hard mode
            var u = (function (_guess, _solution, n) {
                if (!_guess || !_solution || !n) return {validGuess: !0};
                for (var a, o, r, s = 0; s < n.length; s += 1)
                  if ("correct" === n[s] && _guess[s] !== _solution[s])
                    return {
                      validGuess: !1,
                      errorMessage: ""
                        .concat(
                          ((r = o = void 0),
                          (a = s + 1) +
                            ((o = ["th", "st", "nd", "rd"])[
                              ((r = a % 100) - 20) % 10
                            ] ||
                              o[r] ||
                              o[0])),
                          " letter must be ",
                        )
                        .concat(_solution[s].toUpperCase()),
                    };
                for (var i = {}, l = 0; l < n.length; l += 1)
                  ["correct", "present"].includes(n[l]) &&
                    (i[_solution[l]] ? (i[_solution[l]] += 1) : (i[_solution[l]] = 1));
                for (
                  var u = _guess.split("").reduce(function (e, t) {
                      return e[t] ? (e[t] += 1) : (e[t] = 1), e;
                    }, {}),
                    c = Object.keys(i),
                    d = 0;
                  d < c.length;
                  d += 1
                ) {
                  var m = c[d];
                  if ((u[m] || 0) < i[m])
                    return {
                      validGuess: !1,
                      errorMessage: "Guess must contain ".concat(
                        m.toUpperCase(),
                      ),
                    };
                }
                return {validGuess: !0};
              })(guess, s[l - 1], i[l - 1]),
              c = u.validGuess,
              u = u.errorMessage;
            if (!c)
              return e(
                Q({text: u || "Not valid in hard mode", invalidate: !0}),
              );
          }
          (c = l + 1),
            (u = guess === r),
            (l = !u && we <= c),
            (r = u && !!n && 1 === re(new Date(n), new Date())),
            (n = "IN_PROGRESS");
          u ? (n = "WIN") : l && (n = "FAIL"),
            "IN_PROGRESS" !== n &&
              (function () {
                try {
                  _localStorage.setItem(m, !0);
                } catch (e) {
                  console.error(e);
                }
              })(),
            e({
              type: Jo,
              payload: {
                now: Date.now(),
                status: n,
                isStreak: r,
                numGuesses: c,
                guess: guess,
              },
            });
        }
      };
    },
    tr = {
      key: "Key-module_key__Rv-Vp",
      fade: "Key-module_fade__37Hk8",
      half: "Key-module_half__ljsj8",
      one: "Key-module_one__HBOou",
      oneAndAHalf: "Key-module_oneAndAHalf__K6JBY",
    };
  function nr(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function ar(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return or(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? or(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function or(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  Te(
    ".Key-module_key__Rv-Vp {\n  font-family: inherit;\n  font-weight: bold;\n  border: 0;\n  padding: 0;\n  margin: 0 6px 0 0;\n  height: 58px;\n  border-radius: 4px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: var(--key-bg);\n  color: var(--key-text-color);\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-transform: uppercase;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);\n}\n.Key-module_key__Rv-Vp:focus {\n  outline: none;\n}\n.Key-module_key__Rv-Vp:last-of-type {\n  margin: 0;\n}\n.Key-module_key__Rv-Vp[data-state=correct] {\n  background-color: var(--key-bg-correct);\n  color: var(--key-evaluated-text-color);\n}\n.Key-module_key__Rv-Vp[data-state=present] {\n  background-color: var(--key-bg-present);\n  color: var(--key-evaluated-text-color);\n}\n.Key-module_key__Rv-Vp[data-state=absent] {\n  background-color: var(--key-bg-absent);\n  color: var(--key-evaluated-text-color);\n}\n.Key-module_key__Rv-Vp.Key-module_fade__37Hk8 {\n  transition: background-color 0.1s ease, color 0.1s ease;\n}\n\n.Key-module_half__ljsj8 {\n  flex: 0.5;\n}\n\n.Key-module_one__HBOou {\n  flex: 1;\n}\n\n.Key-module_oneAndAHalf__K6JBY {\n  flex: 1.5;\n  font-size: 12px;\n}",
  );
  function rr(e) {
    return "←" === e
      ? f.createElement(v, {icon: "backspace"})
      : "↵" === e
      ? "enter"
      : "a" <= e && e <= "z"
      ? e
      : void 0;
  }
  function sr(e) {
    var t = e.value,
      n = e.evaluation,
      a = ar(f.useState(!1), 2),
      o = a[0],
      r = a[1],
      e = rr(t);
    return (
      f.useEffect(
        function () {
          n && r(!0);
        },
        [n],
      ),
      e
        ? f.createElement(
            "button",
            {
              type: "button",
              "data-key": t,
              "data-state": n,
              className: classNames(
                tr.key,
                (nr((a = {}), tr.oneAndAHalf, "←" === t || "↵" === t),
                nr(a, tr.fade, o),
                a),
              ),
              onTransitionEnd: function () {
                return r(!1);
              },
            },
            e,
          )
        : f.createElement("div", {
            "data-testid": "spacer",
            className: 1 === t.length ? tr.half : tr.one,
          })
    );
  }
  var ir = {
    keyboard: "Keyboard-module_keyboard__1HSnn",
    row: "Keyboard-module_row__YWe5w",
  };
  Te(
    ".Keyboard-module_keyboard__1HSnn {\n  height: var(--keyboard-height);\n  margin: 0 8px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.Keyboard-module_row__YWe5w {\n  display: flex;\n  width: 100%;\n  margin: 0 auto 8px;\n  /* https://stackoverflow.com/questions/46167604/ios-html-disable-double-tap-to-zoom */\n  touch-action: manipulation;\n}",
  );
  var lr = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["-", "a", "s", "d", "f", "g", "h", "j", "k", "l", "-"],
    ["↵", "z", "x", "c", "v", "b", "n", "m", "←"],
  ];
  function ur() {
    function a(e) {
      "←" === e || "Backspace" === e
        ? n($o())
        : "↵" === e || "Enter" === e
        ? n(er())
        : ue.includes(e.toLowerCase()) && n(Qo(e.toLowerCase()));
    }
    var t = React.useRef(null),
      n = x(),
      o = S(Ce);
    return (
      React.useEffect(function () {
        function e(e) {
          var t, n;
          !0 !== e.repeat &&
            ((t = e.key),
            (n = e.metaKey),
            (e = e.ctrlKey),
            n ||
              e ||
              (!ue.includes(t.toLowerCase()) &&
                "Backspace" !== t &&
                "Enter" !== t) ||
              a(t));
        }
        return (
          window.addEventListener("keydown", e),
          function () {
            return window.removeEventListener("keydown", e);
          }
        );
      }, []),
      f.createElement(
        "div",
        {
          className: ir.keyboard,
          ref: t,
          onClick: function (e) {
            e = e.target.closest("button");
            e &&
              t.current &&
              t.current.contains(e) &&
              void 0 !== e.dataset.key &&
              a(e.dataset.key);
          },
        },
        lr.map(function (e, n) {
          return f.createElement(
            "div",
            {className: ir.row, key: n},
            e.map(function (e, t) {
              return f.createElement(sr, {
                key: "".concat(e, "-").concat(n, "-").concat(t),
                value: e,
                evaluation: o[e],
              });
            }),
          );
        }),
      )
    );
  }
  var cr = {
    row: "Row-module_row__dEHfN",
    invalid: "Row-module_invalid__16kR1",
    Shake: "Row-module_Shake__4i0T3",
    win: "Row-module_win__NF7uy",
    Bounce: "Row-module_Bounce__7NO2t",
  };
  function dr(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return mr(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? mr(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function mr(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function pr(e) {
    var n = e.index,
      a = e.letters,
      t = e.evaluation,
      o = e.length,
      r = e.invalid,
      s = e.win,
      i = e.removeInvalid,
      l = dr(f.useState(0), 2),
      u = l[0],
      c = l[1],
      e = f.useRef(null),
      d = f.useRef(!1),
      m = null == t ? void 0 : t.slice(0, u);
    return (
      f.useEffect(
        function () {
          t &&
            (function (e) {
              for (var t = 0; t < o; t += 1)
                setTimeout(function () {
                  c(function (e) {
                    return e + 1;
                  });
                }, e * t);
            })(d.current ? 300 : 100),
            (d.current = !0);
        },
        [t],
      ),
      f.createElement(
        "div",
        {
          className: classNames(
            cr.row,
            ((l = {}),
            (u = cr.invalid),
            (r = r),
            u in l
              ? Object.defineProperty(l, u, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (l[u] = r),
            l),
          ),
          ref: e,
          onAnimationEnd: function (e) {
            e.animationName === cr.Shake && i();
          },
        },
        Array(o)
          .fill(!0)
          .map(function (e, t) {
            return f.createElement(
              "div",
              {
                key: t,
                className: s ? cr.win : "",
                style: {animationDelay: "".concat(100 * t, "ms")},
              },
              f.createElement(Re, {
                rowIndex: n,
                letter: a[t] || "",
                evaluation: m && m[t],
                last: t === o - 1,
              }),
            );
          }),
      )
    );
  }
  Te(
    ".Row-module_row__dEHfN {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-gap: 5px;\n}\n.Row-module_row__dEHfN.Row-module_invalid__16kR1 {\n  -webkit-animation-name: Row-module_Shake__4i0T3;\n          animation-name: Row-module_Shake__4i0T3;\n  -webkit-animation-duration: 600ms;\n          animation-duration: 600ms;\n}\n\n.Row-module_win__NF7uy {\n  -webkit-animation-name: Row-module_Bounce__7NO2t;\n          animation-name: Row-module_Bounce__7NO2t;\n  -webkit-animation-duration: 1000ms;\n          animation-duration: 1000ms;\n}\n\n@-webkit-keyframes Row-module_Bounce__7NO2t {\n  0%, 20% {\n    transform: translateY(0);\n  }\n  40% {\n    transform: translateY(-30px);\n  }\n  50% {\n    transform: translateY(5px);\n  }\n  60% {\n    transform: translateY(-15px);\n  }\n  80% {\n    transform: translateY(2px);\n  }\n  100% {\n    transform: translateY(0);\n  }\n}\n\n@keyframes Row-module_Bounce__7NO2t {\n  0%, 20% {\n    transform: translateY(0);\n  }\n  40% {\n    transform: translateY(-30px);\n  }\n  50% {\n    transform: translateY(5px);\n  }\n  60% {\n    transform: translateY(-15px);\n  }\n  80% {\n    transform: translateY(2px);\n  }\n  100% {\n    transform: translateY(0);\n  }\n}\n@-webkit-keyframes Row-module_Shake__4i0T3 {\n  10%, 90% {\n    transform: translateX(-1px);\n  }\n  20%, 80% {\n    transform: translateX(2px);\n  }\n  30%, 50%, 70% {\n    transform: translateX(-4px);\n  }\n  40%, 60% {\n    transform: translateX(4px);\n  }\n}\n@keyframes Row-module_Shake__4i0T3 {\n  10%, 90% {\n    transform: translateX(-1px);\n  }\n  20%, 80% {\n    transform: translateX(2px);\n  }\n  30%, 50%, 70% {\n    transform: translateX(-4px);\n  }\n  40%, 60% {\n    transform: translateX(4px);\n  }\n}",
  );
  var yr = {
    boardContainer: "Board-module_boardContainer__cKb-C",
    board: "Board-module_board__lbzlf",
  };
  Te(
    ".Board-module_boardContainer__cKb-C {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-grow: 1;\n  overflow: hidden;\n}\n\n.Board-module_board__lbzlf {\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  grid-gap: 5px;\n  padding: 10px;\n  box-sizing: border-box;\n}",
  );
  var gr = 350;
  function hr() {
    var n = S(de),
      a = S(ke),
      o = S(pe),
      r = S(ze),
      s = S(je),
      i = x(),
      l = f.useRef(null),
      u = f.useRef(null);
    return (
      f.useEffect(function () {
        function e() {
          var e,
            t = l.current,
            n = u.current;
          t &&
            n &&
            ((e = Math.min(
              Math.floor(t.clientHeight * (guessLength / we)),
              gr,
            )),
            (t = Math.floor(e / guessLength) * we),
            (n.style.width = "".concat(e, "px")),
            (n.style.height = "".concat(t, "px")));
        }
        return (
          e(),
          window.addEventListener("resize", e),
          function () {
            return window.removeEventListener("resize", e);
          }
        );
      }, []),
      f.createElement(
        "div",
        {className: yr.boardContainer, ref: l},
        f.createElement(
          "div",
          {className: yr.board, ref: u},
          Array(we)
            .fill(!0)
            .map(function (e, t) {
              return f.createElement(pr, {
                key: t,
                index: t,
                letters: n[t] || "",
                length: guessLength,
                evaluation: a[t],
                invalid: t === o && r,
                win: t === o - 1 && s,
                removeInvalid: function () {
                  return i(Ie());
                },
              });
            }),
        ),
      )
    );
  }
  var fr = "nyt-wordle-statistics",
    br = {
      currentStreak: 0,
      maxStreak: 0,
      guesses: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0},
      winPercentage: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      averageGuesses: 0,
    };
  function kr(e, t) {
    return e === t || (e != e && t != t);
  }
  function wr(e, t) {
    for (var n = e.length; n--; ) if (kr(e[n][0], t)) return n;
    return -1;
  }
  var vr = Array.prototype.splice;
  function _r(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var a = e[t];
      this.set(a[0], a[1]);
    }
  }
  function xr(e) {
    return (xr =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  (_r.prototype.clear = function () {
    (this.__data__ = []), (this.size = 0);
  }),
    (_r.prototype.delete = function (e) {
      var t = this.__data__;
      return (
        !((e = wr(t, e)) < 0) &&
        (e == t.length - 1 ? t.pop() : vr.call(t, e, 1), --this.size, !0)
      );
    }),
    (_r.prototype.get = function (e) {
      var t = this.__data__;
      return (e = wr(t, e)) < 0 ? void 0 : t[e][1];
    }),
    (_r.prototype.has = function (e) {
      return -1 < wr(this.__data__, e);
    }),
    (_r.prototype.set = function (e, t) {
      var n = this.__data__,
        a = wr(n, e);
      return a < 0 ? (++this.size, n.push([e, t])) : (n[a][1] = t), this;
    });
  qe =
    "object" == ("undefined" == typeof global ? "undefined" : xr(global)) &&
    global &&
    global.Object === Object &&
    global;
  function Sr(e) {
    return (Sr =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var Reselect =
      "object" == ("undefined" == typeof self ? "undefined" : Sr(self)) &&
      self &&
      self.Object === Object &&
      self,
    Er = qe || Reselect || Function("return this")(),
    Se = Er.Symbol,
    Reselect = Object.prototype,
    zr = Reselect.hasOwnProperty,
    jr = Reselect.toString,
    Nr = Se ? Se.toStringTag : void 0;
  var Cr = Object.prototype.toString;
  var Or = "[object Null]",
    Ar = "[object Undefined]",
    Ir = Se ? Se.toStringTag : void 0;
  function Tr(e) {
    return null == e
      ? void 0 === e
        ? Ar
        : Or
      : Ir && Ir in Object(e)
      ? (function (e) {
          var t = zr.call(e, Nr),
            n = e[Nr];
          try {
            var a = !(e[Nr] = void 0);
          } catch (e) {}
          var o = jr.call(e);
          return a && (t ? (e[Nr] = n) : delete e[Nr]), o;
        })(e)
      : Cr.call(e);
  }
  function Lr(e) {
    return (Lr =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function Pr(e) {
    var t = Lr(e);
    return null != e && ("object" == t || "function" == t);
  }
  var Mr = "[object AsyncFunction]",
    Rr = "[object Function]",
    Dr = "[object GeneratorFunction]",
    Br = "[object Proxy]";
  function Hr(e) {
    if (Pr(e)) {
      e = Tr(e);
      return e == Rr || e == Dr || e == Mr || e == Br;
    }
  }
  var Reselect = Er["__core-js_shared__"],
    qr = (Se = /[^.]+$/.exec((Reselect && Reselect.keys && Reselect.keys.IE_PROTO) || ""))
      ? "Symbol(src)_1." + Se
      : "";
  var Wr = Function.prototype.toString;
  var Gr = /^\[object .+?Constructor\]$/,
    Reselect = Function.prototype,
    Se = Object.prototype,
    Reselect = Reselect.toString,
    Se = Se.hasOwnProperty,
    Fr = RegExp(
      "^" +
        Reselect
          .call(Se)
          .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?",
          ) +
        "$",
    );
  function Yr(e) {
    var t;
    return (
      Pr(e) &&
      ((t = e), !(qr && qr in t)) &&
      (Hr(e) ? Fr : Gr).test(
        (function (e) {
          if (null != e) {
            try {
              return Wr.call(e);
            } catch (e) {}
            try {
              return e + "";
            } catch (e) {}
          }
          return "";
        })(e),
      )
    );
  }
  function Vr(e, t) {
    (t = t), (t = null == (e = e) ? void 0 : e[t]);
    return Yr(t) ? t : void 0;
  }
  var Ur = Vr(Er, "Map"),
    Zr = Vr(Object, "create");
  var Xr = Object.prototype.hasOwnProperty;
  var Kr = Object.prototype.hasOwnProperty;
  function Jr(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var a = e[t];
      this.set(a[0], a[1]);
    }
  }
  function Qr(e) {
    return (Qr =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function $r(e, t) {
    var n,
      a = e.__data__;
    return (
      "string" == (e = Qr((n = t))) ||
      "number" == e ||
      "symbol" == e ||
      "boolean" == e
        ? "__proto__" !== n
        : null === n
    )
      ? a["string" == typeof t ? "string" : "hash"]
      : a.map;
  }
  function es(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var a = e[t];
      this.set(a[0], a[1]);
    }
  }
  (Jr.prototype.clear = function () {
    (this.__data__ = Zr ? Zr(null) : {}), (this.size = 0);
  }),
    (Jr.prototype.delete = function (e) {
      return (
        (e = this.has(e) && delete this.__data__[e]),
        (this.size -= e ? 1 : 0),
        e
      );
    }),
    (Jr.prototype.get = function (e) {
      var t = this.__data__;
      if (Zr) {
        var n = t[e];
        return "__lodash_hash_undefined__" === n ? void 0 : n;
      }
      return Xr.call(t, e) ? t[e] : void 0;
    }),
    (Jr.prototype.has = function (e) {
      var t = this.__data__;
      return Zr ? void 0 !== t[e] : Kr.call(t, e);
    }),
    (Jr.prototype.set = function (e, t) {
      var n = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (n[e] = Zr && void 0 === t ? "__lodash_hash_undefined__" : t),
        this
      );
    }),
    (es.prototype.clear = function () {
      (this.size = 0),
        (this.__data__ = {
          hash: new Jr(),
          map: new (Ur || _r)(),
          string: new Jr(),
        });
    }),
    (es.prototype.delete = function (e) {
      return (e = $r(this, e).delete(e)), (this.size -= e ? 1 : 0), e;
    }),
    (es.prototype.get = function (e) {
      return $r(this, e).get(e);
    }),
    (es.prototype.has = function (e) {
      return $r(this, e).has(e);
    }),
    (es.prototype.set = function (e, t) {
      var n = $r(this, e),
        a = n.size;
      return n.set(e, t), (this.size += n.size == a ? 0 : 1), this;
    });
  function ts(e) {
    e = this.__data__ = new _r(e);
    this.size = e.size;
  }
  (ts.prototype.clear = function () {
    (this.__data__ = new _r()), (this.size = 0);
  }),
    (ts.prototype.delete = function (e) {
      var t = this.__data__,
        e = t.delete(e);
      return (this.size = t.size), e;
    }),
    (ts.prototype.get = function (e) {
      return this.__data__.get(e);
    }),
    (ts.prototype.has = function (e) {
      return this.__data__.has(e);
    }),
    (ts.prototype.set = function (e, t) {
      var n = this.__data__;
      if (n instanceof _r) {
        var a = n.__data__;
        if (!Ur || a.length < 199)
          return a.push([e, t]), (this.size = ++n.size), this;
        n = this.__data__ = new es(a);
      }
      return n.set(e, t), (this.size = n.size), this;
    });
  var ns = (function () {
    try {
      var e = Vr(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch (e) {}
  })();
  function as(e, t, n) {
    "__proto__" == t && ns
      ? ns(e, t, {configurable: !0, enumerable: !0, value: n, writable: !0})
      : (e[t] = n);
  }
  function os(e, t, n) {
    ((void 0 === n || kr(e[t], n)) && (void 0 !== n || t in e)) || as(e, t, n);
  }
  var rs,
    ss = function (e, t, n) {
      for (var a = -1, o = Object(e), r = n(e), s = r.length; s--; ) {
        var i = r[rs ? s : ++a];
        if (!1 === t(o[i], i, o)) break;
      }
      return e;
    };
  function is(e) {
    return (is =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var Reselect =
      "object" == ("undefined" == typeof exports ? "undefined" : is(exports)) &&
      exports &&
      !exports.nodeType &&
      exports,
    Se =
      Reselect &&
      "object" == ("undefined" == typeof module ? "undefined" : is(module)) &&
      module &&
      !module.nodeType &&
      module,
    Se = Se && Se.exports === Reselect ? Er.Buffer : void 0,
    ls = Se ? Se.allocUnsafe : void 0;
  var us = Er.Uint8Array;
  function cs(e, t) {
    var n,
      n = t
        ? ((t = e.buffer),
          (n = new t.constructor(t.byteLength)),
          new us(n).set(new us(t)),
          n)
        : e.buffer;
    return new e.constructor(n, e.byteOffset, e.length);
  }
  var ds = Object.create,
    ms = function (e) {
      if (!Pr(e)) return {};
      if (ds) return ds(e);
      ps.prototype = e;
      e = new ps();
      return (ps.prototype = void 0), e;
    };
  function ps() {}
  var ys,
    gs,
    hs =
      ((ys = Object.getPrototypeOf),
      (gs = Object),
      function (e) {
        return ys(gs(e));
      }),
    fs = Object.prototype;
  function bs(e) {
    var t = e && e.constructor;
    return e === (("function" == typeof t && t.prototype) || fs);
  }
  function ks(e) {
    return (ks =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function ws(e) {
    return null != e && "object" == ks(e);
  }
  function vs(e) {
    return ws(e) && "[object Arguments]" == Tr(e);
  }
  var Reselect = Object.prototype,
    _s = Reselect.hasOwnProperty,
    xs = Reselect.propertyIsEnumerable,
    Ss = vs(
      (function () {
        return arguments;
      })(),
    )
      ? vs
      : function (e) {
          return ws(e) && _s.call(e, "callee") && !xs.call(e, "callee");
        },
    Es = Array.isArray,
    zs = 9007199254740991;
  function js(e) {
    return "number" == typeof e && -1 < e && e % 1 == 0 && e <= zs;
  }
  function Ns(e) {
    return null != e && js(e.length) && !Hr(e);
  }
  function Cs(e) {
    return (Cs =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var Se =
      "object" == ("undefined" == typeof exports ? "undefined" : Cs(exports)) &&
      exports &&
      !exports.nodeType &&
      exports,
    Reselect =
      Se &&
      "object" == ("undefined" == typeof module ? "undefined" : Cs(module)) &&
      module &&
      !module.nodeType &&
      module,
    Reselect = Reselect && Reselect.exports === Se ? Er.Buffer : void 0,
    Os =
      (Reselect ? Reselect.isBuffer : void 0) ||
      function () {
        return !1;
      },
    As = "[object Object]",
    Se = Function.prototype,
    Reselect = Object.prototype,
    Is = Se.toString,
    Ts = Reselect.hasOwnProperty,
    Ls = Is.call(Object);
  var Ps = {};
  function Ms(e) {
    return (Ms =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  (Ps["[object Float32Array]"] =
    Ps["[object Float64Array]"] =
    Ps["[object Int8Array]"] =
    Ps["[object Int16Array]"] =
    Ps["[object Int32Array]"] =
    Ps["[object Uint8Array]"] =
    Ps["[object Uint8ClampedArray]"] =
    Ps["[object Uint16Array]"] =
    Ps["[object Uint32Array]"] =
      !0),
    (Ps["[object Arguments]"] =
      Ps["[object Array]"] =
      Ps["[object ArrayBuffer]"] =
      Ps["[object Boolean]"] =
      Ps["[object DataView]"] =
      Ps["[object Date]"] =
      Ps["[object Error]"] =
      Ps["[object Function]"] =
      Ps["[object Map]"] =
      Ps["[object Number]"] =
      Ps["[object Object]"] =
      Ps["[object RegExp]"] =
      Ps["[object Set]"] =
      Ps["[object String]"] =
      Ps["[object WeakMap]"] =
        !1);
  var Rs,
    Reselect =
      "object" == ("undefined" == typeof exports ? "undefined" : Ms(exports)) &&
      exports &&
      !exports.nodeType &&
      exports,
    Ds =
      Reselect &&
      "object" == ("undefined" == typeof module ? "undefined" : Ms(module)) &&
      module &&
      !module.nodeType &&
      module,
    Bs = Ds && Ds.exports === Reselect && qe.process,
    qe = (function () {
      try {
        var e = Ds && Ds.require && Ds.require("util").types;
        return e ? e : Bs && Bs.binding && Bs.binding("util");
      } catch (e) {}
    })(),
    qe = qe && qe.isTypedArray,
    Hs = qe
      ? ((Rs = qe),
        function (e) {
          return Rs(e);
        })
      : function (e) {
          return ws(e) && js(e.length) && !!Ps[Tr(e)];
        };
  function qs(e, t) {
    if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
      return e[t];
  }
  var Ws = Object.prototype.hasOwnProperty;
  function Gs(e, t, n, a) {
    var o = !n;
    n = n || {};
    for (var r, s, i = -1, l = t.length; ++i < l; ) {
      var u = t[i],
        c = a ? a(n[u], e[u], u, n, e) : void 0;
      void 0 === c && (c = e[u]),
        o
          ? as(n, u, c)
          : ((r = c),
            (s = void 0),
            (s = (c = n)[(u = u)]),
            (Ws.call(c, u) && kr(s, r) && (void 0 !== r || u in c)) ||
              as(c, u, r));
    }
    return n;
  }
  function Fs(e) {
    return (Fs =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var Ys = 9007199254740991,
    Vs = /^(?:0|[1-9]\d*)$/;
  function Us(e, t) {
    var n = Fs(e);
    return (
      (t = null == t ? Ys : t) &&
      ("number" == n || ("symbol" != n && Vs.test(e))) &&
      -1 < e &&
      e % 1 == 0 &&
      e < t
    );
  }
  var Zs = Object.prototype.hasOwnProperty;
  function Xs(e, t) {
    var n,
      a = Es(e),
      o = !a && Ss(e),
      r = !a && !o && Os(e),
      s = !a && !o && !r && Hs(e),
      i = a || o || r || s,
      l = i
        ? (function (e, t) {
            for (var n = -1, a = Array(e); ++n < e; ) a[n] = t(n);
            return a;
          })(e.length, String)
        : [],
      u = l.length;
    for (n in e)
      (!t && !Zs.call(e, n)) ||
        (i &&
          ("length" == n ||
            (r && ("offset" == n || "parent" == n)) ||
            (s && ("buffer" == n || "byteLength" == n || "byteOffset" == n)) ||
            Us(n, u))) ||
        l.push(n);
    return l;
  }
  var Ks = Object.prototype.hasOwnProperty;
  function Js(e) {
    if (!Pr(e))
      return (function (e) {
        var t = [];
        if (null != e) for (var n in Object(e)) t.push(n);
        return t;
      })(e);
    var t,
      n = bs(e),
      a = [];
    for (t in e) ("constructor" != t || (!n && Ks.call(e, t))) && a.push(t);
    return a;
  }
  function Qs(e) {
    return Ns(e) ? Xs(e, !0) : Js(e);
  }
  function $s(e, t, n, a, o, r, s) {
    var i,
      l,
      u,
      c = qs(e, n),
      d = qs(t, n),
      m = s.get(d);
    m
      ? os(e, n, m)
      : ((i = void 0 === (l = r ? r(c, d, n + "", e, t, s) : void 0)) &&
          ((m = !(u = Es(d)) && Os(d)),
          (t = !u && !m && Hs(d)),
          (l = d),
          u || m || t
            ? (l = Es(c)
                ? c
                : ws((u = c)) && Ns(u)
                ? (function (e, t) {
                    var n = -1,
                      a = e.length;
                    for (t = t || Array(a); ++n < a; ) t[n] = e[n];
                    return t;
                  })(c)
                : m
                ? ((u = d),
                  (m = !(i = !1))
                    ? u.slice()
                    : ((m = u.length),
                      (m = ls ? ls(m) : new u.constructor(m)),
                      u.copy(m),
                      m))
                : t
                ? cs(d, !(i = !1))
                : [])
            : (function (e) {
                if (ws(e) && Tr(e) == As) {
                  e = hs(e);
                  if (null === e) return 1;
                  e = Ts.call(e, "constructor") && e.constructor;
                  return (
                    "function" == typeof e && e instanceof e && Is.call(e) == Ls
                  );
                }
              })(d) || Ss(d)
            ? Ss((l = c))
              ? (l = Gs(c, Qs(c)))
              : (Pr(c) && !Hr(c)) ||
                (l =
                  "function" != typeof (c = d).constructor || bs(c)
                    ? {}
                    : ms(hs(c)))
            : (i = !1)),
        i && (s.set(d, l), o(l, d, a, r, s), s.delete(d)),
        os(e, n, l));
  }
  function ei(a, o, r, s, i) {
    a !== o &&
      ss(
        o,
        function (e, t) {
          var n;
          (i = i || new ts()),
            Pr(e)
              ? $s(a, o, t, r, ei, s, i)
              : ((n = s ? s(qs(a, t), e, t + "", a, o, i) : void 0),
                os(a, t, (n = void 0 === n ? e : n)));
        },
        Qs,
      );
  }
  function ti(e) {
    return e;
  }
  var ni = Math.max;
  function ai(r, s, i) {
    return (
      (s = ni(void 0 === s ? r.length - 1 : s, 0)),
      function () {
        for (
          var e = arguments, t = -1, n = ni(e.length - s, 0), a = Array(n);
          ++t < n;

        )
          a[t] = e[s + t];
        for (var t = -1, o = Array(s + 1); ++t < s; ) o[t] = e[t];
        return (
          (o[s] = i(a)),
          (function (e, t, n) {
            switch (n.length) {
              case 0:
                return e.call(t);
              case 1:
                return e.call(t, n[0]);
              case 2:
                return e.call(t, n[0], n[1]);
              case 3:
                return e.call(t, n[0], n[1], n[2]);
            }
            return e.apply(t, n);
          })(r, this, o)
        );
      }
    );
  }
  var oi = Date.now;
  var ri,
    si,
    ii,
    li =
      ((ri = ns
        ? function (e, t) {
            return ns(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value:
                ((n = t),
                function () {
                  return n;
                }),
              writable: !0,
            });
            var n;
          }
        : ti),
      (ii = si = 0),
      function () {
        var e = oi(),
          t = 16 - (e - ii);
        if (((ii = e), 0 < t)) {
          if (800 <= ++si) return arguments[0];
        } else si = 0;
        return ri.apply(void 0, arguments);
      });
  function ui(e) {
    return (ui =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var ci,
    di,
    mi,
    pi =
      ((ci = function (e, t, n) {
        ei(e, t, n);
      }),
      li(
        ai(
          (di = function (e, t) {
            var n = -1,
              a = t.length,
              o = 1 < a ? t[a - 1] : void 0,
              r = 2 < a ? t[2] : void 0,
              o = 3 < ci.length && "function" == typeof o ? (a--, o) : void 0;
            for (
              r &&
                (function (e, t, n) {
                  if (Pr(n)) {
                    var a = ui(t);
                    return (
                      ("number" == a
                        ? Ns(n) && Us(t, n.length)
                        : "string" == a && (t in n)) && kr(n[t], e)
                    );
                  }
                })(t[0], t[1], r) &&
                ((o = a < 3 ? void 0 : o), (a = 1)),
                e = Object(e);
              ++n < a;

            ) {
              var s = t[n];
              s && ci(e, s, n, o);
            }
            return e;
          }),
          mi,
          ti,
        ),
        di + "",
      )),
    yi = "nyt-wordle-state",
    gi = {
      boardState: null,
      evaluations: null,
      rowIndex: null,
      solution: null,
      gameStatus: null,
      lastPlayedTs: null,
      lastCompletedTs: null,
      restoringFromLocalStorage: null,
      hardMode: !1,
    };
  function hi(e) {
    var t,
      t =
        ((t = window.localStorage.getItem(yi) || JSON.stringify(gi)),
        JSON.parse(t));
    !(function (e) {
      try {
        window.localStorage.setItem(yi, JSON.stringify(e));
      } catch (e) {
        console.error(e);
      }
    })(pi(t, e));
  }
  function fi(e) {
    var t =
      1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
    try {
      var n = window.localStorage.getItem(e);
      return n ? JSON.parse(n) : t;
    } catch (e) {
      return console.error(e), _.captureSentryError(e), t;
    }
  }
  var bi = "nyt-wordle-darkmode",
    ki = "nyt-wordle-cbmode",
    wi = function (e, t) {
      t = e && t ? t : "ANON";
      return "".concat("nyt-wordle-moogle", "/").concat(t);
    },
    vi = function (e, t) {
      try {
        return window.localStorage.setItem(e, JSON.stringify(t)), !0;
      } catch (e) {
        return console.error(e), _.captureSentryError(e), !1;
      }
    },
    _i = function (e, t) {
      try {
        var n = wi(e, t);
        return fi(n);
      } catch (e) {
        return null;
      }
    },
    xi = function () {
      var e = fi(yi, gi),
        t = (function () {
          try {
            var e = window.localStorage.getItem(fr) || JSON.stringify(br);
            return JSON.parse(e);
          } catch (e) {
            return (
              console.error("error retrieving stats", e),
              JSON.parse(JSON.stringify(br))
            );
          }
        })(),
        n =
          !!window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches,
        a = fi(bi, n),
        o = fi(ki, !1),
        n = null != e && e.solution ? ee.indexOf(e.solution) : null;
      return {
        game: {
          id: n,
          dayOffset: n,
          boardState: (null == e ? void 0 : e.boardState) || Array(we).fill(""),
          currentRowIndex: (null == e ? void 0 : e.rowIndex) || 0,
          status: (null == e ? void 0 : e.gameStatus) || "IN_PROGRESS",
          timestamps: {
            lastPlayed: (null == e ? void 0 : e.lastPlayedTs) || null,
            lastCompleted: (null == e ? void 0 : e.lastCompletedTs) || null,
          },
        },
        settings: {
          hardMode: (null == e ? void 0 : e.hardMode) || !1,
          darkMode: a || !1,
          colorblindMode: o || !1,
        },
        stats: t,
      };
    },
    Si = function (e) {
      return {
        boardState: e.persist.game.boardState,
        evaluations: ke(e),
        rowIndex: e.persist.game.currentRowIndex,
        solution: ie(e.persist.game.dayOffset),
        gameStatus: e.persist.game.status,
        lastPlayedTs: e.persist.game.timestamps.lastPlayed,
        lastCompletedTs: e.persist.game.timestamps.lastCompleted,
      };
    },
    Ei = "wordle/moogle/SET_INITIAL_STATE",
    zi = function (e) {
      return {type: Ei, payload: e};
    };
  function ji(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Ni(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Ni(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function Ni(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function Ci(e) {
    var t = e.dismissIcon,
      n = (e = ji(
        f.useState(
          (null === (n = window.navigator) || void 0 === n
            ? void 0
            : n.onLine) || !1,
        ),
        2,
      ))[0],
      a = e[1];
    return (
      f.useEffect(function () {
        function e() {
          return a(!0);
        }
        function t() {
          return a(!1);
        }
        return (
          window.addEventListener("online", e),
          window.addEventListener("offline", t),
          function () {
            window.removeEventListener("online", e),
              window.removeEventListener("offline", t);
          }
        );
      }, []),
      (e = p("pz-offline-ticker", {"is-offline": !n})),
      f.createElement(
        "div",
        {className: e, "aria-hidden": n},
        "You're offline! Progress may not be saved.",
        t &&
          f.createElement(
            "span",
            {
              role: "button",
              className: "offline-ticker-dismiss",
              onClick: function () {
                return a(!0);
              },
            },
            t,
          ),
      )
    );
  }
  function Oi() {
    return f.createElement(
      "svg",
      {
        width: "24",
        height: "17",
        viewBox: "0 0 24 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
      },
      f.createElement("rect", {
        x: "0.172974",
        width: "20",
        height: "3",
        rx: "1.5",
        fill: "var(--color-tone-1)",
      }),
      f.createElement("rect", {
        x: "0.172974",
        y: "7",
        width: "20",
        height: "3",
        rx: "1.5",
        fill: "var(--color-tone-1)",
      }),
      f.createElement("rect", {
        x: "0.172974",
        y: "14",
        width: "20",
        height: "3",
        rx: "1.5",
        fill: "var(--color-tone-1)",
      }),
    );
  }
  var Ai = {
    appHeader: "AppHeader-module_appHeader__1Ehyv",
    icon: "AppHeader-module_icon__x7b46",
    title: "AppHeader-module_title__6sqs-",
    menuLeft: "AppHeader-module_menuLeft__iErDO",
    menuRight: "AppHeader-module_menuRight__jUeYn",
    navButton: "AppHeader-module_navButton__fB5nf",
  };
  function Ii(e) {
    var t = e.isLoading,
      n = x(),
      a = ht("auth"),
      o = S(Gn),
      e = S(ft),
      r = a || e,
      t = !!o || t;
    return f.createElement(
      "header",
      {className: p(Ai.appHeader, "wordle-app-header")},
      f.createElement(
        "div",
        {className: Ai.menuLeft},
        f.createElement(
          "button",
          {
            type: "button",
            id: Ai.navButton,
            className: Ai.icon,
            "aria-label":
              "Navigation menu. Click for links to other NYT Games and our Privacy Policy.",
            tabIndex: -1,
            onClick: function () {
              return n(K());
            },
          },
          f.createElement(Oi, null),
        ),
        f.createElement(
          "button",
          {
            type: "button",
            id: "help-button",
            className: Ai.icon,
            "aria-label": "Help",
            tabIndex: -1,
            onClick: function () {
              return n((r ? V : U)("help"));
            },
          },
          f.createElement(v, {icon: "help"}),
        ),
      ),
      f.createElement("div", {className: Ai.title}, "Wordle"),
      f.createElement(
        "div",
        {className: Ai.menuRight},
        f.createElement(
          "button",
          {
            type: "button",
            id: "statistics-button",
            className: Ai.icon,
            "aria-label": "Statistics",
            tabIndex: -1,
            onClick: function () {
              return n(V("stats", !0));
            },
            disabled: t,
          },
          f.createElement(v, {icon: "statistics", disabled: t}),
        ),
        f.createElement(
          "button",
          {
            type: "button",
            id: "settings-button",
            className: Ai.icon,
            "aria-label": "Settings",
            tabIndex: -1,
            onClick: function () {
              return n((r ? V : U)("settings"));
            },
            disabled: t,
          },
          f.createElement(v, {icon: "settings", disabled: t}),
        ),
      ),
    );
  }
  Te(
    '.AppHeader-module_appHeader__1Ehyv {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: nowrap;\n  padding: 0 16px;\n  height: var(--header-height);\n  color: var(--color-tone-1);\n  border-bottom: 1px solid var(--color-tone-4);\n}\n.AppHeader-module_appHeader__1Ehyv button.AppHeader-module_icon__x7b46 {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0 4px;\n}\n\n.AppHeader-module_appHeader__1Ehyv .AppHeader-module_title__6sqs- {\n  font-family: "nyt-karnakcondensed";\n  font-weight: 700;\n  font-size: 37px;\n  line-height: 100%;\n  letter-spacing: 0.01em;\n  text-align: center;\n  left: 0;\n  right: 0;\n  pointer-events: none;\n  position: relative;\n}\n\n.AppHeader-module_menuLeft__iErDO {\n  display: flex;\n  margin: 0;\n  padding: 0;\n  align-items: center;\n  width: 70px;\n  justify-content: flex-start;\n}\n\n.AppHeader-module_menuRight__jUeYn {\n  display: flex;\n  width: 70px;\n  justify-content: flex-end;\n}\n\n#AppHeader-module_navButton__fB5nf {\n  padding-top: 2px;\n}\n\n@media (min-width: 415px) {\n  .AppHeader-module_appHeader__1Ehyv {\n    padding: 0px 16px;\n  }\n}\n@media (max-width: 360px) {\n  .AppHeader-module_appHeader__1Ehyv .AppHeader-module_title__6sqs- {\n    font-size: 22px;\n    letter-spacing: 0.1rem;\n  }\n}',
  );
  var Ti = "App-module_game__NSc-J";
  function Li(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Pi(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Pi(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function Pi(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function Mi() {
    var t,
      n,
      e = S(he),
      a = S(Gn),
      o = !!S(vt),
      r = S(ft),
      s = S(bt),
      i = S(_t),
      l = Li(f.useState(!1), 2),
      u = l[0],
      c = l[1],
      d = x(),
      l = Qe(),
      m = l.hasAbraLoaded,
      l = l.getVariant,
      p = ht("welcomeMoment"),
      y = "1_EnableAuth" === l("GAMES_wordleAuth_0427") || r,
      s = y && s,
      g = "1_EnableMoogle" === l("GAMES_wordleMoogle_0422");
    f.useEffect(function () {
      var e = k();
      return function () {
        return clearInterval(e);
      };
    }, []),
      f.useEffect(
        function () {
          var e = document.referrer.includes("nytimes"),
            t = new URLSearchParams(document.location.search);
          ((window.isHybridWebView && p) ||
            (e && p) ||
            t.get("forceWelcomeMoment")) &&
            d({type: L, payload: {moment: "welcome"}});
        },
        [p],
      ),
      f.useEffect(
        function () {
          var e, t, n, a, o;
          !u &&
            m &&
            ((e =
              "true" ===
              (t = new URLSearchParams(document.location.search)).get(
                "moogle",
              )),
            (n = "true" === t.get("success")),
            (t = e || y || g),
            (n = (!y && e) || n) && d({type: Da}),
            Promise.all([
              d(
                ((a = (n = {fetchFromMoogle: t, optIn: n}).fetchFromMoogle),
                (n = n.optIn),
                (o = void 0 !== n && n),
                function (t) {
                  return a && Ka()
                    ? (t({type: Ba}),
                      _.xhr
                        .get("".concat(Ra, "/svc/games/state/wordle/latest"), {
                          withCookie: !1,
                        })
                        .then(function (e) {
                          if ("forbidden" === e.error) throw new Error(Ja);
                          if (!e.timestamp && !e.user_id)
                            throw new Error("malformed Moogle response data");
                          t({type: Ha, payload: {data: e, optIn: o}});
                        })
                        .catch(function (e) {
                          t({type: qa, payload: {message: e.message}});
                        }))
                    : Promise.resolve();
                }),
              ),
            ])
              .then(function () {
                d(function (e, t) {
                  var n = t(),
                    t = _t(n),
                    n = vt(n);
                  t && ((t = _i(!0) || xi()), (n = wi(!0, n)), vi(n, t));
                });
              })
              .then(function () {
                d(function (e, t) {
                  var n = t(),
                    a = kt(n),
                    o = vt(n),
                    t = wt(n) || 0,
                    n = ft(n),
                    n = _i(n, o),
                    o = (null == n ? void 0 : n.timestamp) || 0;
                  return e(zi(t && o <= t ? a : n || xi()));
                }),
                  d(function (e, t) {
                    var n = new Date(),
                      a = he(t()),
                      o = pe(t());
                    if (
                      !(
                        "prod" !==
                          (null === (t = window.env) || void 0 === t
                            ? void 0
                            : t.name) &&
                        document.location.search.includes("reset")
                      ) &&
                      a &&
                      re(new Date(a), n) < 1
                    )
                      return e({type: Zo, payload: {currentRowIndex: o}});
                    e({type: Uo, payload: {dayOffset: se(n), numRows: we}});
                  }),
                  c(!0);
              }));
        },
        [u, m],
      ),
      b(
        function () {
          return d(V("help"));
        },
        u && !e && !a ? 100 : null,
      ),
      f.useEffect(
        function () {
          y &&
            o &&
            !r &&
            d(
              Q({
                text: "You are now logged in to your Times Account.",
                duration: 2e3,
                isSystem: !0,
              }),
            );
        },
        [y, o, r],
      ),
      f.useEffect(
        function () {
          y &&
            o &&
            i &&
            (d(
              Q({
                text: "Your stats have been linked to your account.",
                duration: 2e3,
                isSystem: !0,
              }),
            ),
            d({type: R}),
            d({
              type: Y,
              payload: {
                name: "stats-successful",
                region: "wordle-stats-link",
              },
            }));
        },
        [y, i, o],
      ),
      (t = S(et)),
      (n = S(tt)),
      h.useEffect(
        function () {
          var e = document.querySelector("body");
          e &&
            (t && !e.classList.contains("dark")
              ? e.classList.add("dark")
              : t || e.classList.remove("dark"));
        },
        [t],
      ),
      h.useEffect(
        function () {
          var e = document.querySelector("body");
          e &&
            (n && !e.classList.contains("colorblind")
              ? e.classList.add("colorblind")
              : n || e.classList.remove("colorblind"));
        },
        [n],
      );
    s = f.createElement(
      "div",
      {className: Ti, id: "wordle-app-game"},
      r &&
        f.createElement(Ci, {
          dismissIcon: f.createElement(v, {icon: "close"}),
        }),
      s && f.createElement(Vo, null),
      f.createElement(hr, null),
      f.createElement(ur, null),
      f.createElement(Oa, null),
      f.createElement(ea, null),
      f.createElement(Ao, null),
      f.createElement(pa, null),
      f.createElement(Ro, null),
      f.createElement(Go, null),
    );
    return f.createElement(
      f.Fragment,
      null,
      f.createElement(Ii, {isLoading: !u}),
      u ? s : f.createElement(oo, null),
    );
  }
  function Ri(t, e) {
    var n,
      a = Object.keys(t);
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(t)),
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
        a.push.apply(a, n)),
      a
    );
  }
  function Di(a) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? Ri(Object(o), !0).forEach(function (e) {
            var t, n;
            (t = a),
              (e = o[(n = e)]),
              n in t
                ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o))
        : Ri(Object(o)).forEach(function (e) {
            Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return a;
  }
  Te(
    ".App-module_game__NSc-J {\n  width: 100%;\n  max-width: var(--game-max-width);\n  margin: 0 auto;\n  height: calc(100% - var(--header-height));\n  display: flex;\n  flex-direction: column;\n}\n\n.pz-offline-ticker {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  z-index: 2;\n  font-weight: bold;\n}\n.pz-offline-ticker svg path {\n  fill: var(--white);\n}",
  );
  var Bi = {
    id: null,
    boardState: [],
    dayOffset: null,
    currentRowIndex: 0,
    timestamps: {lastPlayed: null, lastCompleted: null},
    status: "IN_PROGRESS",
  };
  function Hi(t, e) {
    var n,
      a = Object.keys(t);
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(t)),
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
        a.push.apply(a, n)),
      a
    );
  }
  function qi(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? Hi(Object(n), !0).forEach(function (e) {
            Wi(t, e, n[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : Hi(Object(n)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
          });
    }
    return t;
  }
  function Wi(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  var Gi,
    Fi,
    Yi = {
      hardMode: !1,
      darkMode:
        (null === (Gi = document.body) ||
        void 0 === Gi ||
        null === (Fi = Gi.className) ||
        void 0 === Fi
          ? void 0
          : Fi.includes("dark")) || !1,
      colorblindMode: !1,
    };
  function Vi(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var n =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != n) {
          var a,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              n = n.call(e);
              !(s = (a = n.next()).done) &&
              (r.push(a.value), !t || r.length !== t);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == n.return || n.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Ui(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Ui(e, t)
            : void 0;
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function Ui(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function Zi(t, e) {
    var n,
      a = Object.keys(t);
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(t)),
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
        a.push.apply(a, n)),
      a
    );
  }
  function Xi(a) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? Zi(Object(o), !0).forEach(function (e) {
            var t, n;
            (t = a),
              (e = o[(n = e)]),
              n in t
                ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o))
        : Zi(Object(o)).forEach(function (e) {
            Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return a;
  }
  var Ki = br;
  function Ji(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return Qi(e);
      })(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return Qi(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
            "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? Qi(e, t)
            : void 0;
        }
      })(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function Qi(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
    return a;
  }
  function $i(t, e) {
    var n,
      a = Object.keys(t);
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(t)),
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
        a.push.apply(a, n)),
      a
    );
  }
  function el(a) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? $i(Object(o), !0).forEach(function (e) {
            var t, n;
            (t = a),
              (e = o[(n = e)]),
              n in t
                ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o))
        : $i(Object(o)).forEach(function (e) {
            Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return a;
  }
  var tl = {
    modal: null,
    page: null,
    error: null,
    moment: null,
    isNavModalOpen: !1,
    toasts: [],
    isPageClosing: !1,
  };
  function nl(t, e) {
    var n,
      a = Object.keys(t);
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(t)),
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
        a.push.apply(a, n)),
      a
    );
  }
  function al(a) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? nl(Object(o), !0).forEach(function (e) {
            var t, n;
            (t = a),
              (e = o[(n = e)]),
              n in t
                ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o))
        : nl(Object(o)).forEach(function (e) {
            Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return a;
  }
  var ol = {
    isAnimatingRow: !1,
    lastRowInvalid: !1,
    lastRowWin: !1,
    isRestoringSession: !1,
  };
  function rl(t, e) {
    var n,
      a = Object.keys(t);
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(t)),
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
        a.push.apply(a, n)),
      a
    );
  }
  function sl(a) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? rl(Object(o), !0).forEach(function (e) {
            var t, n;
            (t = a),
              (e = o[(n = e)]),
              n in t
                ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o))
        : rl(Object(o)).forEach(function (e) {
            Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return a;
  }
  function il() {
    return Er.Date.now();
  }
  var ll = {
      moogleGet: {
        isLoading: !1,
        error: !1,
        errorMessage: null,
        data: null,
        optedIn: !1,
      },
      mooglePost: {isLoading: !1, error: !1, lastFailedSaveData: null},
      solution: {isLoading: !1, error: !1, data: null},
      profileInfo: {isLoading: !1, error: !1, data: null},
    },
    ul = a.combineReducers({
      persist: a.combineReducers({
        game: function () {
          var e,
            n =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : Bi,
            a = 1 < arguments.length ? arguments[1] : void 0;
          switch (a.type) {
            case Ei:
              return null !== (e = a.payload) && void 0 !== e && e.game
                ? a.payload.game
                : n;
            case Uo:
              var t = a.payload,
                o = t.dayOffset,
                t = t.numRows;
              return Di(
                Di({}, n),
                {},
                {
                  dayOffset: o,
                  boardState: Array(t).fill(""),
                  currentRowIndex: 0,
                  status: "IN_PROGRESS",
                },
              );
            case Xo:
              return Di(
                Di({}, n),
                {},
                {
                  boardState: n.boardState.map(function (e, t) {
                    return t === n.currentRowIndex
                      ? "".concat(e).concat(a.payload.letter)
                      : e;
                  }),
                },
              );
            case Ko:
              return Di(
                Di({}, n),
                {},
                {
                  boardState: n.boardState.map(function (e, t) {
                    return t === n.currentRowIndex
                      ? e.slice(0, e.length - 1)
                      : e;
                  }),
                },
              );
            case Jo:
              (o = a.payload), (t = o.now), (o = o.status);
              return Di(
                Di({}, n),
                {},
                {
                  currentRowIndex: n.currentRowIndex + 1,
                  timestamps: Di(
                    Di({}, n.timestamps),
                    {},
                    {
                      lastCompleted:
                        "IN_PROGRESS" === o ? n.timestamps.lastCompleted : t,
                      lastPlayed: t,
                    },
                  ),
                  status: o,
                },
              );
            default:
              return n;
          }
        },
        settings: function () {
          var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : Yi,
            t = 1 < arguments.length ? arguments[1] : void 0;
          switch (t.type) {
            case Ei:
              return null !== (a = t.payload) && void 0 !== a && a.settings
                ? t.payload.settings
                : e;
            case jn:
              var n = t.payload,
                a = n.name,
                n = n.value;
              return qi(qi({}, e), {}, Wi({}, a, n));
            default:
              return e;
          }
        },
        stats: function () {
          var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : Ki,
            t = 1 < arguments.length ? arguments[1] : void 0;
          switch (t.type) {
            case Ei:
              return null !== (r = t.payload) && void 0 !== r && r.stats
                ? t.payload.stats
                : e;
            case Jo:
              var n = t.payload,
                a = n.status,
                o = n.isStreak,
                r = n.numGuesses;
              return "IN_PROGRESS" === a
                ? e
                : ((n = e),
                  (o = (a = {isWin: "WIN" === a, isStreak: o, numGuesses: r})
                    .isWin),
                  (r = a.isStreak),
                  (a = a.numGuesses),
                  (n = Xi(Xi({}, n), {}, {guesses: Xi({}, n.guesses)})),
                  o
                    ? ((n.guesses[a] += 1),
                      r ? (n.currentStreak += 1) : (n.currentStreak = 1))
                    : ((n.currentStreak = 0), (n.guesses.fail += 1)),
                  (n.maxStreak = Math.max(n.currentStreak, n.maxStreak)),
                  (n.gamesPlayed += 1),
                  (n.gamesWon += o ? 1 : 0),
                  (n.winPercentage = Math.round(
                    (n.gamesWon / n.gamesPlayed) * 100,
                  )),
                  0 === n.gamesWon
                    ? (n.averageGuesses = 0)
                    : (n.averageGuesses = Math.round(
                        Object.entries(n.guesses).reduce(function (e, t) {
                          var n = Vi(t, 2),
                            t = n[0],
                            n = n[1],
                            n = e + parseInt(t, 10) * n;
                          return "fail" !== t ? n : e;
                        }, 0) / n.gamesWon,
                      )),
                  n);
            default:
              return e;
          }
        },
      }),
      overlays: function () {
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : tl,
          t = 1 < arguments.length ? arguments[1] : void 0;
        switch (t.type) {
          case A:
            return el(el({}, e), {}, {modal: t.payload.modal});
          case I:
            return el(el({}, e), {}, {modal: null});
          case T:
            return el(el({}, e), {}, {page: t.payload.page});
          case L:
            return el(el({}, e), {}, {moment: t.payload.moment});
          case P:
            return el(el({}, e), {}, {page: null, isPageClosing: !1});
          case M:
            return el(el({}, e), {}, {moment: null});
          case D:
            return el(el({}, e), {}, {error: t.payload.error});
          case "wordle/overlays/CLOSE_ERROR":
            return el(el({}, e), {}, {error: null});
          case B:
            return el(el({}, e), {}, {isNavModalOpen: !0});
          case H:
            return el(el({}, e), {}, {isNavModalOpen: !1});
          case W:
            var n = t.payload,
              a = {
                text: n.text,
                duration: n.duration || 1e3,
                isSystem: n.isSystem,
                timestamp: n.timestamp,
              },
              n = e.toasts;
            return el(el({}, e), {}, {toasts: [a].concat(Ji(n))});
          case G:
            var n = t.payload,
              o = n.text,
              r = n.timestamp,
              n = e.toasts.filter(function (e) {
                return e.text !== o || e.timestamp !== r;
              });
            return el(el({}, e), {}, {toasts: n});
          case R:
            return el(el({}, e), {}, {isPageClosing: !0});
          default:
            return e;
        }
      },
      transient: function () {
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ol,
          t = 1 < arguments.length ? arguments[1] : void 0;
        switch (t.type) {
          case Ko:
            return al(al({}, e), {}, {lastRowInvalid: !1});
          case W:
            var n = t.payload,
              a = n.invalidate,
              n = n.win;
            return a
              ? al(al({}, e), {}, {lastRowInvalid: !0})
              : n
              ? al(al({}, e), {}, {lastRowWin: !0})
              : e;
          case Ae:
            return al(al({}, e), {}, {lastRowInvalid: !1});
          case Zo:
            return 0 === t.payload.currentRowIndex
              ? e
              : al(al({}, e), {}, {isAnimatingRow: !0, isRestoringSession: !0});
          case Jo:
            return al(al({}, e), {}, {isAnimatingRow: !0});
          case Oe:
            return al(
              al({}, e),
              {},
              {isAnimatingRow: !1, isRestoringSession: !1},
            );
          default:
            return e;
        }
      },
      api: function () {
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ll,
          t = 1 < arguments.length ? arguments[1] : void 0;
        switch (t.type) {
          case Da:
            return sl(
              sl({}, e),
              {},
              {moogleGet: sl(sl({}, e.moogleGet), {}, {optedIn: !0})},
            );
          case Ba:
            return sl(
              sl({}, e),
              {},
              {moogleGet: sl(sl({}, e.moogleGet), {}, {isLoading: !0})},
            );
          case "wordle/api/LOAD_SOLUTION":
            return sl(
              sl({}, e),
              {},
              {solution: sl(sl({}, e.solution), {}, {isLoading: !0})},
            );
          case Ha:
            var n = t.payload,
              a = n.data,
              n = n.optIn;
            return sl(
              sl({}, e),
              {},
              {
                moogleGet: sl(
                  sl({}, e.moogleGet),
                  {},
                  {
                    data: a,
                    isLoading: !1,
                    error: !1,
                    optedIn: n || !!a.version,
                  },
                ),
              },
            );
          case "wordle/api/SOLUTION_SUCCESS":
            return sl(
              sl({}, e),
              {},
              {
                solution: sl(
                  sl({}, e.solution),
                  {},
                  {data: t.payload.data, isLoading: !1, error: !1},
                ),
              },
            );
          case qa:
            return sl(
              sl({}, e),
              {},
              {
                moogleGet: sl(
                  sl({}, e.moogleGet),
                  {},
                  {isLoading: !1, error: !0, errorMessage: t.payload.message},
                ),
              },
            );
          case "wordle/api/SOLUTION_ERROR":
            return sl(
              sl({}, e),
              {},
              {
                solution: sl(
                  sl({}, e.solution),
                  {},
                  {isLoading: !1, error: !0},
                ),
              },
            );
          case Va:
            return sl(
              sl({}, e),
              {},
              {profileInfo: {isLoading: !0, data: null, error: !1}},
            );
          case Ua:
            return sl(
              sl({}, e),
              {},
              {
                profileInfo: {isLoading: !1, data: t.payload.data, error: !1},
              },
            );
          case Za:
            return sl(
              sl({}, e),
              {},
              {profileInfo: {isLoading: !1, data: null, error: !0}},
            );
          case Wa:
            return sl(
              sl({}, e),
              {},
              {
                mooglePost: sl(
                  sl({}, e.mooglePost),
                  {},
                  {isLoading: !0, error: !1},
                ),
              },
            );
          case Ga:
            return sl(
              sl({}, e),
              {},
              {
                mooglePost: {
                  isLoading: !1,
                  error: !1,
                  lastFailedSaveData: null,
                },
              },
            );
          case Fa:
            return sl(
              sl({}, e),
              {},
              {
                mooglePost: {
                  isLoading: !1,
                  error: !0,
                  lastFailedSaveData: t.payload.saveData,
                },
              },
            );
          case Ya:
            return sl(
              sl({}, e),
              {},
              {
                mooglePost: {
                  isLoading: !1,
                  error: !1,
                  lastFailedSaveData: null,
                },
              },
            );
          default:
            return e;
        }
      },
    }),
    cl = /\s/;
  var dl = /^\s+/;
  function ml(e) {
    return (
      e &&
      e
        .slice(
          0,
          (function (e) {
            for (var t = e.length; t-- && cl.test(e.charAt(t)); );
            return t;
          })(e) + 1,
        )
        .replace(dl, "")
    );
  }
  function pl(e) {
    return (pl =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var yl = /^[-+]0x[0-9a-f]+$/i,
    gl = /^0b[01]+$/i,
    hl = /^0o[0-7]+$/i,
    fl = parseInt;
  function bl(e) {
    if ("number" == typeof e) return e;
    if ("symbol" == pl((t = e)) || (ws(t) && "[object Symbol]" == Tr(t)))
      return NaN;
    var t;
    if (
      "string" !=
      typeof (e = Pr(e)
        ? Pr((n = "function" == typeof e.valueOf ? e.valueOf() : e))
          ? n + ""
          : n
        : e)
    )
      return 0 === e ? e : +e;
    e = ml(e);
    var n = gl.test(e);
    return n || hl.test(e) ? fl(e.slice(2), n ? 2 : 8) : yl.test(e) ? NaN : +e;
  }
  var kl = "Expected a function",
    wl = Math.max,
    vl = Math.min;
  function _l(a, n, e) {
    var o,
      r,
      s,
      i,
      l,
      u,
      c = 0,
      d = !1,
      m = !1,
      t = !0;
    if ("function" != typeof a) throw new TypeError(kl);
    function p(e) {
      var t = o,
        n = r;
      return (o = r = void 0), (c = e), (i = a.apply(n, t));
    }
    function y(e) {
      var t = e - u;
      return void 0 === u || n <= t || t < 0 || (m && s <= e - c);
    }
    function g() {
      var e,
        t = il();
      if (y(t)) return h(t);
      l = setTimeout(g, ((t = n - ((e = t) - u)), m ? vl(t, s - (e - c)) : t));
    }
    function h(e) {
      return (l = void 0), t && o ? p(e) : ((o = r = void 0), i);
    }
    function f() {
      var e = il(),
        t = y(e);
      if (((o = arguments), (r = this), (u = e), t)) {
        if (void 0 === l)
          return (c = t = u), (l = setTimeout(g, n)), d ? p(t) : i;
        if (m) return clearTimeout(l), (l = setTimeout(g, n)), p(u);
      }
      return void 0 === l && (l = setTimeout(g, n)), i;
    }
    return (
      (n = bl(n) || 0),
      Pr(e) &&
        ((d = !!e.leading),
        (m = "maxWait" in e),
        (s = m ? wl(bl(e.maxWait) || 0, n) : s),
        (t = "trailing" in e ? !!e.trailing : t)),
      (f.cancel = function () {
        void 0 !== l && clearTimeout(l), (o = u = r = l = void (c = 0));
      }),
      (f.flush = function () {
        return void 0 === l ? i : h(il());
      }),
      f
    );
  }
  function xl(t, e) {
    var n,
      a = Object.keys(t);
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(t)),
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
        a.push.apply(a, n)),
      a
    );
  }
  function Sl(a) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? xl(Object(o), !0).forEach(function (e) {
            var t, n;
            (t = a),
              (e = o[(n = e)]),
              n in t
                ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(o))
        : xl(Object(o)).forEach(function (e) {
            Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return a;
  }
  function El(u) {
    var c = _l(function (e) {
      return u.dispatch(Qa(e));
    }, 1200);
    return (
      window.addEventListener("online", function () {
        var e = zt(u.getState());
        e && c(e);
      }),
      function (l) {
        return function (e) {
          var t = l(e),
            n = u.getState(),
            a = vt(n),
            o = ft(n),
            r = _t(n),
            s = Math.floor(Date.now() / 1e3),
            i = Sl(Sl({}, n.persist), {}, {timestamp: s}),
            s = wi(o, a),
            a = [jn, Jo, Uo, Xa];
          return (
            Cl(i) ||
              (a.includes(e.type) &&
                (vi(s, i),
                o &&
                  (e.type === Xa
                    ? u.dispatch(Qa(i, e.payload.enableAuth))
                    : c(i))),
              r && e.type === Zo && c(i),
              e.type === jn &&
                ((r = (o = n.persist.settings).hardMode),
                (i = o.darkMode),
                (o = o.colorblindMode),
                "hardMode" === e.payload.name && hi({hardMode: r}),
                "darkMode" === e.payload.name && vi(bi, i),
                "colorblindMode" === e.payload.name && vi(ki, o)),
              e.type === Jo &&
                (hi(Si(n)),
                (function (e) {
                  try {
                    window.localStorage.setItem(fr, JSON.stringify(e));
                  } catch (e) {
                    console.error(e);
                  }
                })(n.persist.stats)),
              e.type === Uo && hi(Si(n))),
            t
          );
        };
      }
    );
  }
  function zl(v) {
    return function (w) {
      return function (e) {
        var t = w(e),
          n = v.getState(),
          a = tt(n),
          o = et(n),
          r = "".concat(ge(n)),
          s = $e(n);
        switch (e.type) {
          case A:
            var i = e.payload,
              l = i.modal,
              i = i.isClicked;
            "stats" === l &&
              i &&
              _.trackModuleInteraction("click", r, "wordle", l);
            break;
          case T:
            var u = e.payload.page;
            u && _.trackModuleInteraction("click", r, "wordle", u);
            break;
          case B:
            _.trackClick({
              name: "wordle",
              label: "click-nav",
              useBeacon: !0,
              context: null,
            });
            break;
          case q:
            var c = e.payload,
              l = c.name,
              u = c.label,
              d = c.useBeacon,
              c = c.context;
            _.trackClick({name: l, label: u, useBeacon: d, context: c});
            break;
          case jn:
            (d = e.payload), (c = d.name), (d = d.value);
            _.trackModuleInteraction(
              "click",
              r,
              "wordle",
              {
                darkMode: "dark-mode",
                colorblindMode: "high-contrast",
                hardMode: "hard-mode",
              }[c],
              d ? "turn-on" : "turn-off",
            );
            break;
          case Jo:
            var m = o ? "1" : "0",
              p = s ? "h" : "e",
              y = e.payload,
              g = y.numGuesses,
              h = y.status,
              f = y.guess;
            1 === g &&
              _.trackModuleInteraction(
                "click",
                r,
                "wordle",
                "start-game",
                "CB=".concat(a ? "1" : "0", " DM=").concat(m),
              ),
              _.trackModuleInteraction(
                "click",
                r,
                "wordle",
                "solve-attempt",
                "".concat(g.toString(), "-").concat(f),
              ),
              "IN_PROGRESS" !== h &&
                _.trackModuleInteraction(
                  "click",
                  r,
                  "wordle",
                  "100%-complete",
                  "".concat(p, "-").concat("WIN" === h ? g : 0),
                );
            break;
          case lt:
            (y = e.payload.isGameComplete ? "congrats-modal" : "stats"),
              (m = nt(n)),
              (f = ot(n)),
              (p = rt(n)),
              (h = st(n)),
              (g = at(n));
            _.trackImpression(
              "wordle",
              y,
              [
                "p: ".concat(m),
                "w: ".concat(g),
                "cs: ".concat(p),
                "ms: ".concat(f),
                "1: ".concat(h[1]),
                "2: ".concat(h[2]),
                "3: ".concat(h[3]),
                "4: ".concat(h[4]),
                "5: ".concat(h[5]),
                "6: ".concat(h[6]),
              ],
              r,
            );
            break;
          case ut:
            _.trackModuleInteraction("click", r, "wordle", "share");
            break;
          case F:
            var b = e.payload,
              k = b.label,
              b = b.sendContext;
            _.trackClick({
              name: "wordle",
              label: k,
              useBeacon: !0,
              context: b ? r : null,
            });
            break;
          case Y:
            (k = e.payload), (b = k.name), (k = k.region);
            _.trackImpression(b, k);
        }
        return t;
      };
    };
  }
  var jl,
    Nl,
    Cl = function (e) {
      var t = e.game.dayOffset,
        e = e.timestamp,
        e = se(new Date(1e3 * e));
      return t && t < e;
    },
    qe = document.body;
  e.render(
    f.createElement(
      t.Provider,
      {
        store:
          ((jl = void 0 !== window.__REDUX_DEVTOOLS_EXTENSION__),
          (Nl = [a.applyMiddleware(o, El, zl)]),
          jl && Nl.push(window.__REDUX_DEVTOOLS_EXTENSION__()),
          a.createStore(ul, a.compose.apply(void 0, Nl))),
      },
      f.createElement(
        c,
        null,
        f.createElement(ce, null, f.createElement(Mi, null)),
      ),
    ),
    qe,
  );
});
//# sourceMappingURL=wordle.271940a4936af9e89f7f848ad48253d87d527499.js.map
