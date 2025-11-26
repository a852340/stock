import rd, { app as ls, BrowserWindow as Il, ipcMain as Tt } from "electron";
import { fileURLToPath as nd } from "node:url";
import Vt from "node:path";
import ur from "path";
import kl from "util";
import xo from "fs";
import bs from "crypto";
import sd from "assert";
import Cl from "events";
import od from "os";
import ad from "https";
import id from "http";
import cd from "net";
import ld from "tls";
import pn from "stream";
import ud from "url";
import fd from "zlib";
import dd from "buffer";
var wn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function jl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Al(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var s = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, s.get ? s : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var $o = { exports: {} }, hd = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Ht = hd, pd = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), md = (e) => !e.some((t) => pd.has(t));
function Sn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return md(r) ? r : [];
}
var yd = {
  get(e, t, r) {
    if (!Ht(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = Sn(t);
    if (n.length !== 0) {
      for (let s = 0; s < n.length; s++)
        if (e = e[n[s]], e == null) {
          if (s !== n.length - 1)
            return r;
          break;
        }
      return e === void 0 ? r : e;
    }
  },
  set(e, t, r) {
    if (!Ht(e) || typeof t != "string")
      return e;
    const n = e, s = Sn(t);
    for (let o = 0; o < s.length; o++) {
      const a = s[o];
      Ht(e[a]) || (e[a] = {}), o === s.length - 1 && (e[a] = r), e = e[a];
    }
    return n;
  },
  delete(e, t) {
    if (!Ht(e) || typeof t != "string")
      return !1;
    const r = Sn(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Ht(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Ht(e) || typeof t != "string")
      return !1;
    const r = Sn(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Ht(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, Bo = { exports: {} }, Ko = { exports: {} }, Ho = { exports: {} }, Wo = { exports: {} };
const Dl = xo;
Wo.exports = (e) => new Promise((t) => {
  Dl.access(e, (r) => {
    t(!r);
  });
});
Wo.exports.sync = (e) => {
  try {
    return Dl.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var _d = Wo.exports, Jo = { exports: {} }, Xo = { exports: {} };
const Ll = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
Xo.exports = Ll;
Xo.exports.default = Ll;
var gd = Xo.exports;
const $d = gd, Ml = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (l, i, ...f) => {
    r++;
    const u = $d(l, ...f);
    i(u), u.then(n, n);
  }, o = (l, i, ...f) => {
    r < e ? s(l, i, ...f) : t.push(s.bind(null, l, i, ...f));
  }, a = (l, ...i) => new Promise((f) => o(l, f, ...i));
  return Object.defineProperties(a, {
    activeCount: {
      get: () => r
    },
    pendingCount: {
      get: () => t.length
    },
    clearQueue: {
      value: () => {
        t.length = 0;
      }
    }
  }), a;
};
Jo.exports = Ml;
Jo.exports.default = Ml;
var vd = Jo.exports;
const Gi = vd;
class Fl extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const Ed = (e, t) => Promise.resolve(e).then(t), wd = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new Fl(t[0])));
var Sd = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = Gi(r.concurrency), s = [...e].map((a) => [a, n(Ed, a, t)]), o = Gi(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((a) => o(wd, a))).then(() => {
  }).catch((a) => a instanceof Fl ? a.value : Promise.reject(a));
};
const Ul = ur, Vl = _d, bd = Sd;
Ho.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), bd(e, (r) => Vl(Ul.resolve(t.cwd, r)), t));
Ho.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (Vl.sync(Ul.resolve(t.cwd, r)))
      return r;
};
var Pd = Ho.exports;
const Lt = ur, ql = Pd;
Ko.exports = (e, t = {}) => {
  const r = Lt.resolve(t.cwd || ""), { root: n } = Lt.parse(r), s = [].concat(e);
  return new Promise((o) => {
    (function a(l) {
      ql(s, { cwd: l }).then((i) => {
        i ? o(Lt.join(l, i)) : l === n ? o(null) : a(Lt.dirname(l));
      });
    })(r);
  });
};
Ko.exports.sync = (e, t = {}) => {
  let r = Lt.resolve(t.cwd || "");
  const { root: n } = Lt.parse(r), s = [].concat(e);
  for (; ; ) {
    const o = ql.sync(s, { cwd: r });
    if (o)
      return Lt.join(r, o);
    if (r === n)
      return null;
    r = Lt.dirname(r);
  }
};
var Od = Ko.exports;
const zl = Od;
Bo.exports = async ({ cwd: e } = {}) => zl("package.json", { cwd: e });
Bo.exports.sync = ({ cwd: e } = {}) => zl.sync("package.json", { cwd: e });
var Nd = Bo.exports, Yo = { exports: {} };
const ge = ur, Gl = od, At = Gl.homedir(), Qo = Gl.tmpdir(), { env: $r } = process, Rd = (e) => {
  const t = ge.join(At, "Library");
  return {
    data: ge.join(t, "Application Support", e),
    config: ge.join(t, "Preferences", e),
    cache: ge.join(t, "Caches", e),
    log: ge.join(t, "Logs", e),
    temp: ge.join(Qo, e)
  };
}, Td = (e) => {
  const t = $r.APPDATA || ge.join(At, "AppData", "Roaming"), r = $r.LOCALAPPDATA || ge.join(At, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: ge.join(r, e, "Data"),
    config: ge.join(t, e, "Config"),
    cache: ge.join(r, e, "Cache"),
    log: ge.join(r, e, "Log"),
    temp: ge.join(Qo, e)
  };
}, Id = (e) => {
  const t = ge.basename(At);
  return {
    data: ge.join($r.XDG_DATA_HOME || ge.join(At, ".local", "share"), e),
    config: ge.join($r.XDG_CONFIG_HOME || ge.join(At, ".config"), e),
    cache: ge.join($r.XDG_CACHE_HOME || ge.join(At, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: ge.join($r.XDG_STATE_HOME || ge.join(At, ".local", "state"), e),
    temp: ge.join(Qo, t, e)
  };
}, xl = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Rd(e) : process.platform === "win32" ? Td(e) : Id(e);
};
Yo.exports = xl;
Yo.exports.default = xl;
var kd = Yo.exports, _t = {}, ue = {};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.NOOP = ue.LIMIT_FILES_DESCRIPTORS = ue.LIMIT_BASENAME_LENGTH = ue.IS_USER_ROOT = ue.IS_POSIX = ue.DEFAULT_TIMEOUT_SYNC = ue.DEFAULT_TIMEOUT_ASYNC = ue.DEFAULT_WRITE_OPTIONS = ue.DEFAULT_READ_OPTIONS = ue.DEFAULT_FOLDER_MODE = ue.DEFAULT_FILE_MODE = ue.DEFAULT_ENCODING = void 0;
const Cd = "utf8";
ue.DEFAULT_ENCODING = Cd;
const jd = 438;
ue.DEFAULT_FILE_MODE = jd;
const Ad = 511;
ue.DEFAULT_FOLDER_MODE = Ad;
const Dd = {};
ue.DEFAULT_READ_OPTIONS = Dd;
const Ld = {};
ue.DEFAULT_WRITE_OPTIONS = Ld;
const Md = 5e3;
ue.DEFAULT_TIMEOUT_ASYNC = Md;
const Fd = 100;
ue.DEFAULT_TIMEOUT_SYNC = Fd;
const Ud = !!process.getuid;
ue.IS_POSIX = Ud;
const Vd = process.getuid ? !process.getuid() : !1;
ue.IS_USER_ROOT = Vd;
const qd = 128;
ue.LIMIT_BASENAME_LENGTH = qd;
const zd = 1e4;
ue.LIMIT_FILES_DESCRIPTORS = zd;
const Gd = () => {
};
ue.NOOP = Gd;
var Ps = {}, Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.attemptifySync = Rr.attemptifyAsync = void 0;
const Bl = ue, xd = (e, t = Bl.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
Rr.attemptifyAsync = xd;
const Bd = (e, t = Bl.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
Rr.attemptifySync = Bd;
var Zo = {};
Object.defineProperty(Zo, "__esModule", { value: !0 });
const Kd = ue, Kl = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Kd.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Kl.isChangeErrorOk(e))
      throw e;
  }
};
Zo.default = Kl;
var Tr = {}, ea = {};
Object.defineProperty(ea, "__esModule", { value: !0 });
const Hd = ue, me = {
  interval: 25,
  intervalId: void 0,
  limit: Hd.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    me.intervalId || (me.intervalId = setInterval(me.tick, me.interval));
  },
  reset: () => {
    me.intervalId && (clearInterval(me.intervalId), delete me.intervalId);
  },
  add: (e) => {
    me.queueWaiting.add(e), me.queueActive.size < me.limit / 2 ? me.tick() : me.init();
  },
  remove: (e) => {
    me.queueWaiting.delete(e), me.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => me.remove(r), r = () => e(t);
    me.add(r);
  }),
  tick: () => {
    if (!(me.queueActive.size >= me.limit)) {
      if (!me.queueWaiting.size)
        return me.reset();
      for (const e of me.queueWaiting) {
        if (me.queueActive.size >= me.limit)
          break;
        me.queueWaiting.delete(e), me.queueActive.add(e), e();
      }
    }
  }
};
ea.default = me;
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.retryifySync = Tr.retryifyAsync = void 0;
const Wd = ea, Jd = (e, t) => function(r) {
  return function n() {
    return Wd.default.schedule().then((s) => e.apply(void 0, arguments).then((o) => (s(), o), (o) => {
      if (s(), Date.now() >= r)
        throw o;
      if (t(o)) {
        const a = Math.round(100 + 400 * Math.random());
        return new Promise((i) => setTimeout(i, a)).then(() => n.apply(void 0, arguments));
      }
      throw o;
    }));
  };
};
Tr.retryifyAsync = Jd;
const Xd = (e, t) => function(r) {
  return function n() {
    try {
      return e.apply(void 0, arguments);
    } catch (s) {
      if (Date.now() > r)
        throw s;
      if (t(s))
        return n.apply(void 0, arguments);
      throw s;
    }
  };
};
Tr.retryifySync = Xd;
Object.defineProperty(Ps, "__esModule", { value: !0 });
const fe = xo, Me = kl, Fe = Rr, Ne = Zo, qe = Tr, Yd = {
  chmodAttempt: Fe.attemptifyAsync(Me.promisify(fe.chmod), Ne.default.onChangeError),
  chownAttempt: Fe.attemptifyAsync(Me.promisify(fe.chown), Ne.default.onChangeError),
  closeAttempt: Fe.attemptifyAsync(Me.promisify(fe.close)),
  fsyncAttempt: Fe.attemptifyAsync(Me.promisify(fe.fsync)),
  mkdirAttempt: Fe.attemptifyAsync(Me.promisify(fe.mkdir)),
  realpathAttempt: Fe.attemptifyAsync(Me.promisify(fe.realpath)),
  statAttempt: Fe.attemptifyAsync(Me.promisify(fe.stat)),
  unlinkAttempt: Fe.attemptifyAsync(Me.promisify(fe.unlink)),
  closeRetry: qe.retryifyAsync(Me.promisify(fe.close), Ne.default.isRetriableError),
  fsyncRetry: qe.retryifyAsync(Me.promisify(fe.fsync), Ne.default.isRetriableError),
  openRetry: qe.retryifyAsync(Me.promisify(fe.open), Ne.default.isRetriableError),
  readFileRetry: qe.retryifyAsync(Me.promisify(fe.readFile), Ne.default.isRetriableError),
  renameRetry: qe.retryifyAsync(Me.promisify(fe.rename), Ne.default.isRetriableError),
  statRetry: qe.retryifyAsync(Me.promisify(fe.stat), Ne.default.isRetriableError),
  writeRetry: qe.retryifyAsync(Me.promisify(fe.write), Ne.default.isRetriableError),
  chmodSyncAttempt: Fe.attemptifySync(fe.chmodSync, Ne.default.onChangeError),
  chownSyncAttempt: Fe.attemptifySync(fe.chownSync, Ne.default.onChangeError),
  closeSyncAttempt: Fe.attemptifySync(fe.closeSync),
  mkdirSyncAttempt: Fe.attemptifySync(fe.mkdirSync),
  realpathSyncAttempt: Fe.attemptifySync(fe.realpathSync),
  statSyncAttempt: Fe.attemptifySync(fe.statSync),
  unlinkSyncAttempt: Fe.attemptifySync(fe.unlinkSync),
  closeSyncRetry: qe.retryifySync(fe.closeSync, Ne.default.isRetriableError),
  fsyncSyncRetry: qe.retryifySync(fe.fsyncSync, Ne.default.isRetriableError),
  openSyncRetry: qe.retryifySync(fe.openSync, Ne.default.isRetriableError),
  readFileSyncRetry: qe.retryifySync(fe.readFileSync, Ne.default.isRetriableError),
  renameSyncRetry: qe.retryifySync(fe.renameSync, Ne.default.isRetriableError),
  statSyncRetry: qe.retryifySync(fe.statSync, Ne.default.isRetriableError),
  writeSyncRetry: qe.retryifySync(fe.writeSync, Ne.default.isRetriableError)
};
Ps.default = Yd;
var ta = {};
Object.defineProperty(ta, "__esModule", { value: !0 });
const Qd = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
ta.default = Qd;
var ra = {};
Object.defineProperty(ra, "__esModule", { value: !0 });
const bn = {}, vo = {
  next: (e) => {
    const t = bn[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => vo.next(e)) : delete bn[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = bn[e];
    r || (r = bn[e] = []), r.push(t), !(r.length > 1) && t(() => vo.next(e));
  })
};
ra.default = vo;
var na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
const Zd = ur, xi = ue, Bi = Ps, Ke = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = Ke.truncate(t(e));
    return n in Ke.store ? Ke.get(e, t, r) : (Ke.store[n] = r, [n, () => delete Ke.store[n]]);
  },
  purge: (e) => {
    Ke.store[e] && (delete Ke.store[e], Bi.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    Ke.store[e] && (delete Ke.store[e], Bi.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in Ke.store)
      Ke.purgeSync(e);
  },
  truncate: (e) => {
    const t = Zd.basename(e);
    if (t.length <= xi.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - xi.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", Ke.purgeSyncAll);
na.default = Ke;
Object.defineProperty(_t, "__esModule", { value: !0 });
_t.writeFileSync = _t.writeFile = _t.readFileSync = _t.readFile = void 0;
const Hl = ur, ke = ue, le = Ps, We = ta, eh = ra, Mt = na;
function Wl(e, t = ke.DEFAULT_READ_OPTIONS) {
  var r;
  if (We.default.isString(t))
    return Wl(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : ke.DEFAULT_TIMEOUT_ASYNC);
  return le.default.readFileRetry(n)(e, t);
}
_t.readFile = Wl;
function Jl(e, t = ke.DEFAULT_READ_OPTIONS) {
  var r;
  if (We.default.isString(t))
    return Jl(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : ke.DEFAULT_TIMEOUT_SYNC);
  return le.default.readFileSyncRetry(n)(e, t);
}
_t.readFileSync = Jl;
const Xl = (e, t, r, n) => {
  if (We.default.isFunction(r))
    return Xl(e, t, ke.DEFAULT_WRITE_OPTIONS, r);
  const s = Yl(e, t, r);
  return n && s.then(n, n), s;
};
_t.writeFile = Xl;
const Yl = async (e, t, r = ke.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (We.default.isString(r))
    return Yl(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : ke.DEFAULT_TIMEOUT_ASYNC);
  let o = null, a = null, l = null, i = null, f = null;
  try {
    r.schedule && (o = await r.schedule(e)), a = await eh.default.schedule(e), e = await le.default.realpathAttempt(e) || e, [i, l] = Mt.default.get(e, r.tmpCreate || Mt.default.create, r.tmpPurge !== !1);
    const u = ke.IS_POSIX && We.default.isUndefined(r.chown), h = We.default.isUndefined(r.mode);
    if (u || h) {
      const _ = await le.default.statAttempt(e);
      _ && (r = { ...r }, u && (r.chown = { uid: _.uid, gid: _.gid }), h && (r.mode = _.mode));
    }
    const w = Hl.dirname(e);
    await le.default.mkdirAttempt(w, {
      mode: ke.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), f = await le.default.openRetry(s)(i, "w", r.mode || ke.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), We.default.isString(t) ? await le.default.writeRetry(s)(f, t, 0, r.encoding || ke.DEFAULT_ENCODING) : We.default.isUndefined(t) || await le.default.writeRetry(s)(f, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await le.default.fsyncRetry(s)(f) : le.default.fsyncAttempt(f)), await le.default.closeRetry(s)(f), f = null, r.chown && await le.default.chownAttempt(i, r.chown.uid, r.chown.gid), r.mode && await le.default.chmodAttempt(i, r.mode);
    try {
      await le.default.renameRetry(s)(i, e);
    } catch (_) {
      if (_.code !== "ENAMETOOLONG")
        throw _;
      await le.default.renameRetry(s)(i, Mt.default.truncate(e));
    }
    l(), i = null;
  } finally {
    f && await le.default.closeAttempt(f), i && Mt.default.purge(i), o && o(), a && a();
  }
}, Ql = (e, t, r = ke.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (We.default.isString(r))
    return Ql(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : ke.DEFAULT_TIMEOUT_SYNC);
  let o = null, a = null, l = null;
  try {
    e = le.default.realpathSyncAttempt(e) || e, [a, o] = Mt.default.get(e, r.tmpCreate || Mt.default.create, r.tmpPurge !== !1);
    const i = ke.IS_POSIX && We.default.isUndefined(r.chown), f = We.default.isUndefined(r.mode);
    if (i || f) {
      const h = le.default.statSyncAttempt(e);
      h && (r = { ...r }, i && (r.chown = { uid: h.uid, gid: h.gid }), f && (r.mode = h.mode));
    }
    const u = Hl.dirname(e);
    le.default.mkdirSyncAttempt(u, {
      mode: ke.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), l = le.default.openSyncRetry(s)(a, "w", r.mode || ke.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(a), We.default.isString(t) ? le.default.writeSyncRetry(s)(l, t, 0, r.encoding || ke.DEFAULT_ENCODING) : We.default.isUndefined(t) || le.default.writeSyncRetry(s)(l, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? le.default.fsyncSyncRetry(s)(l) : le.default.fsyncAttempt(l)), le.default.closeSyncRetry(s)(l), l = null, r.chown && le.default.chownSyncAttempt(a, r.chown.uid, r.chown.gid), r.mode && le.default.chmodSyncAttempt(a, r.mode);
    try {
      le.default.renameSyncRetry(s)(a, e);
    } catch (h) {
      if (h.code !== "ENAMETOOLONG")
        throw h;
      le.default.renameSyncRetry(s)(a, Mt.default.truncate(e));
    }
    o(), a = null;
  } finally {
    l && le.default.closeSyncAttempt(l), a && Mt.default.purge(a);
  }
};
_t.writeFileSync = Ql;
var Eo = { exports: {} }, Zl = {}, lt = {}, Ir = {}, mn = {}, ce = {}, dn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(v) {
      if (super(), !e.IDENTIFIER.test(v))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = v;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(v) {
      super(), this._items = typeof v == "string" ? [v] : v;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const v = this._items[0];
      return v === "" || v === '""';
    }
    get str() {
      var v;
      return (v = this._str) !== null && v !== void 0 ? v : this._str = this._items.reduce((O, N) => `${O}${N}`, "");
    }
    get names() {
      var v;
      return (v = this._names) !== null && v !== void 0 ? v : this._names = this._items.reduce((O, N) => (N instanceof r && (O[N.str] = (O[N.str] || 0) + 1), O), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...v) {
    const O = [p[0]];
    let N = 0;
    for (; N < v.length; )
      l(O, v[N]), O.push(p[++N]);
    return new n(O);
  }
  e._ = s;
  const o = new n("+");
  function a(p, ...v) {
    const O = [_(p[0])];
    let N = 0;
    for (; N < v.length; )
      O.push(o), l(O, v[N]), O.push(o, _(p[++N]));
    return i(O), new n(O);
  }
  e.str = a;
  function l(p, v) {
    v instanceof n ? p.push(...v._items) : v instanceof r ? p.push(v) : p.push(h(v));
  }
  e.addCodeArg = l;
  function i(p) {
    let v = 1;
    for (; v < p.length - 1; ) {
      if (p[v] === o) {
        const O = f(p[v - 1], p[v + 1]);
        if (O !== void 0) {
          p.splice(v - 1, 3, O);
          continue;
        }
        p[v++] = "+";
      }
      v++;
    }
  }
  function f(p, v) {
    if (v === '""')
      return p;
    if (p === '""')
      return v;
    if (typeof p == "string")
      return v instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof v != "string" ? `${p.slice(0, -1)}${v}"` : v[0] === '"' ? p.slice(0, -1) + v.slice(1) : void 0;
    if (typeof v == "string" && v[0] === '"' && !(p instanceof r))
      return `"${p}${v.slice(1)}`;
  }
  function u(p, v) {
    return v.emptyStr() ? p : p.emptyStr() ? v : a`${p}${v}`;
  }
  e.strConcat = u;
  function h(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : _(Array.isArray(p) ? p.join(",") : p);
  }
  function w(p) {
    return new n(_(p));
  }
  e.stringify = w;
  function _(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function E(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = E;
  function y(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = y;
  function g(p) {
    return new n(p.toString());
  }
  e.regexpCode = g;
})(dn);
var wo = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = dn;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
    }
  }
  var n;
  (function(i) {
    i[i.Started = 0] = "Started", i[i.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: f, parent: u } = {}) {
      this._names = {}, this._prefixes = f, this._parent = u;
    }
    toName(f) {
      return f instanceof t.Name ? f : this.name(f);
    }
    name(f) {
      return new t.Name(this._newName(f));
    }
    _newName(f) {
      const u = this._names[f] || this._nameGroup(f);
      return `${f}${u.index++}`;
    }
    _nameGroup(f) {
      var u, h;
      if (!((h = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || h === void 0) && h.has(f) || this._prefixes && !this._prefixes.has(f))
        throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
      return this._names[f] = { prefix: f, index: 0 };
    }
  }
  e.Scope = s;
  class o extends t.Name {
    constructor(f, u) {
      super(u), this.prefix = f;
    }
    setValue(f, { property: u, itemIndex: h }) {
      this.value = f, this.scopePath = (0, t._)`.${new t.Name(u)}[${h}]`;
    }
  }
  e.ValueScopeName = o;
  const a = (0, t._)`\n`;
  class l extends s {
    constructor(f) {
      super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? a : t.nil };
    }
    get() {
      return this._scope;
    }
    name(f) {
      return new o(f, this._newName(f));
    }
    value(f, u) {
      var h;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const w = this.toName(f), { prefix: _ } = w, E = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let y = this._values[_];
      if (y) {
        const v = y.get(E);
        if (v)
          return v;
      } else
        y = this._values[_] = /* @__PURE__ */ new Map();
      y.set(E, w);
      const g = this._scope[_] || (this._scope[_] = []), p = g.length;
      return g[p] = u.ref, w.setValue(u, { property: _, itemIndex: p }), w;
    }
    getValue(f, u) {
      const h = this._values[f];
      if (h)
        return h.get(u);
    }
    scopeRefs(f, u = this._values) {
      return this._reduceValues(u, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${f}${h.scopePath}`;
      });
    }
    scopeCode(f = this._values, u, h) {
      return this._reduceValues(f, (w) => {
        if (w.value === void 0)
          throw new Error(`CodeGen: name "${w}" has no value`);
        return w.value.code;
      }, u, h);
    }
    _reduceValues(f, u, h = {}, w) {
      let _ = t.nil;
      for (const E in f) {
        const y = f[E];
        if (!y)
          continue;
        const g = h[E] = h[E] || /* @__PURE__ */ new Map();
        y.forEach((p) => {
          if (g.has(p))
            return;
          g.set(p, n.Started);
          let v = u(p);
          if (v) {
            const O = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${O} ${p} = ${v};${this.opts._n}`;
          } else if (v = w == null ? void 0 : w(p))
            _ = (0, t._)`${_}${v}${this.opts._n}`;
          else
            throw new r(p);
          g.set(p, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = l;
})(wo);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = dn, r = wo;
  var n = dn;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = wo;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class o {
    optimizeNodes() {
      return this;
    }
    optimizeNames(c, d) {
      return this;
    }
  }
  class a extends o {
    constructor(c, d, P) {
      super(), this.varKind = c, this.name = d, this.rhs = P;
    }
    render({ es5: c, _n: d }) {
      const P = c ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${j};` + d;
    }
    optimizeNames(c, d) {
      if (c[this.name.str])
        return this.rhs && (this.rhs = L(this.rhs, c, d)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends o {
    constructor(c, d, P) {
      super(), this.lhs = c, this.rhs = d, this.sideEffects = P;
    }
    render({ _n: c }) {
      return `${this.lhs} = ${this.rhs};` + c;
    }
    optimizeNames(c, d) {
      if (!(this.lhs instanceof t.Name && !c[this.lhs.str] && !this.sideEffects))
        return this.rhs = L(this.rhs, c, d), this;
    }
    get names() {
      const c = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return ee(c, this.rhs);
    }
  }
  class i extends l {
    constructor(c, d, P, j) {
      super(c, P, j), this.op = d;
    }
    render({ _n: c }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + c;
    }
  }
  class f extends o {
    constructor(c) {
      super(), this.label = c, this.names = {};
    }
    render({ _n: c }) {
      return `${this.label}:` + c;
    }
  }
  class u extends o {
    constructor(c) {
      super(), this.label = c, this.names = {};
    }
    render({ _n: c }) {
      return `break${this.label ? ` ${this.label}` : ""};` + c;
    }
  }
  class h extends o {
    constructor(c) {
      super(), this.error = c;
    }
    render({ _n: c }) {
      return `throw ${this.error};` + c;
    }
    get names() {
      return this.error.names;
    }
  }
  class w extends o {
    constructor(c) {
      super(), this.code = c;
    }
    render({ _n: c }) {
      return `${this.code};` + c;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(c, d) {
      return this.code = L(this.code, c, d), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends o {
    constructor(c = []) {
      super(), this.nodes = c;
    }
    render(c) {
      return this.nodes.reduce((d, P) => d + P.render(c), "");
    }
    optimizeNodes() {
      const { nodes: c } = this;
      let d = c.length;
      for (; d--; ) {
        const P = c[d].optimizeNodes();
        Array.isArray(P) ? c.splice(d, 1, ...P) : P ? c[d] = P : c.splice(d, 1);
      }
      return c.length > 0 ? this : void 0;
    }
    optimizeNames(c, d) {
      const { nodes: P } = this;
      let j = P.length;
      for (; j--; ) {
        const A = P[j];
        A.optimizeNames(c, d) || (M(c, A.names), P.splice(j, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((c, d) => Y(c, d.names), {});
    }
  }
  class E extends _ {
    render(c) {
      return "{" + c._n + super.render(c) + "}" + c._n;
    }
  }
  class y extends _ {
  }
  class g extends E {
  }
  g.kind = "else";
  class p extends E {
    constructor(c, d) {
      super(d), this.condition = c;
    }
    render(c) {
      let d = `if(${this.condition})` + super.render(c);
      return this.else && (d += "else " + this.else.render(c)), d;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const c = this.condition;
      if (c === !0)
        return this.nodes;
      let d = this.else;
      if (d) {
        const P = d.optimizeNodes();
        d = this.else = Array.isArray(P) ? new g(P) : P;
      }
      if (d)
        return c === !1 ? d instanceof p ? d : d.nodes : this.nodes.length ? this : new p(H(c), d instanceof p ? [d] : d.nodes);
      if (!(c === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(c, d) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(c, d), !!(super.optimizeNames(c, d) || this.else))
        return this.condition = L(this.condition, c, d), this;
    }
    get names() {
      const c = super.names;
      return ee(c, this.condition), this.else && Y(c, this.else.names), c;
    }
  }
  p.kind = "if";
  class v extends E {
  }
  v.kind = "for";
  class O extends v {
    constructor(c) {
      super(), this.iteration = c;
    }
    render(c) {
      return `for(${this.iteration})` + super.render(c);
    }
    optimizeNames(c, d) {
      if (super.optimizeNames(c, d))
        return this.iteration = L(this.iteration, c, d), this;
    }
    get names() {
      return Y(super.names, this.iteration.names);
    }
  }
  class N extends v {
    constructor(c, d, P, j) {
      super(), this.varKind = c, this.name = d, this.from = P, this.to = j;
    }
    render(c) {
      const d = c.es5 ? r.varKinds.var : this.varKind, { name: P, from: j, to: A } = this;
      return `for(${d} ${P}=${j}; ${P}<${A}; ${P}++)` + super.render(c);
    }
    get names() {
      const c = ee(super.names, this.from);
      return ee(c, this.to);
    }
  }
  class I extends v {
    constructor(c, d, P, j) {
      super(), this.loop = c, this.varKind = d, this.name = P, this.iterable = j;
    }
    render(c) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(c);
    }
    optimizeNames(c, d) {
      if (super.optimizeNames(c, d))
        return this.iterable = L(this.iterable, c, d), this;
    }
    get names() {
      return Y(super.names, this.iterable.names);
    }
  }
  class F extends E {
    constructor(c, d, P) {
      super(), this.name = c, this.args = d, this.async = P;
    }
    render(c) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(c);
    }
  }
  F.kind = "func";
  class z extends _ {
    render(c) {
      return "return " + super.render(c);
    }
  }
  z.kind = "return";
  class Z extends E {
    render(c) {
      let d = "try" + super.render(c);
      return this.catch && (d += this.catch.render(c)), this.finally && (d += this.finally.render(c)), d;
    }
    optimizeNodes() {
      var c, d;
      return super.optimizeNodes(), (c = this.catch) === null || c === void 0 || c.optimizeNodes(), (d = this.finally) === null || d === void 0 || d.optimizeNodes(), this;
    }
    optimizeNames(c, d) {
      var P, j;
      return super.optimizeNames(c, d), (P = this.catch) === null || P === void 0 || P.optimizeNames(c, d), (j = this.finally) === null || j === void 0 || j.optimizeNames(c, d), this;
    }
    get names() {
      const c = super.names;
      return this.catch && Y(c, this.catch.names), this.finally && Y(c, this.finally.names), c;
    }
  }
  class V extends E {
    constructor(c) {
      super(), this.error = c;
    }
    render(c) {
      return `catch(${this.error})` + super.render(c);
    }
  }
  V.kind = "catch";
  class K extends E {
    render(c) {
      return "finally" + super.render(c);
    }
  }
  K.kind = "finally";
  class re {
    constructor(c, d = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...d, _n: d.lines ? `
` : "" }, this._extScope = c, this._scope = new r.Scope({ parent: c }), this._nodes = [new y()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(c) {
      return this._scope.name(c);
    }
    // reserves unique name in the external scope
    scopeName(c) {
      return this._extScope.name(c);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(c, d) {
      const P = this._extScope.value(c, d);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
    }
    getScopeValue(c, d) {
      return this._extScope.getValue(c, d);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(c) {
      return this._extScope.scopeRefs(c, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(c, d, P, j) {
      const A = this._scope.toName(d);
      return P !== void 0 && j && (this._constants[A.str] = P), this._leafNode(new a(c, A, P)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(c, d, P) {
      return this._def(r.varKinds.const, c, d, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(c, d, P) {
      return this._def(r.varKinds.let, c, d, P);
    }
    // `var` declaration with optional assignment
    var(c, d, P) {
      return this._def(r.varKinds.var, c, d, P);
    }
    // assignment code
    assign(c, d, P) {
      return this._leafNode(new l(c, d, P));
    }
    // `+=` code
    add(c, d) {
      return this._leafNode(new i(c, e.operators.ADD, d));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
      return typeof c == "function" ? c() : c !== t.nil && this._leafNode(new w(c)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...c) {
      const d = ["{"];
      for (const [P, j] of c)
        d.length > 1 && d.push(","), d.push(P), (P !== j || this.opts.es5) && (d.push(":"), (0, t.addCodeArg)(d, j));
      return d.push("}"), new t._Code(d);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(c, d, P) {
      if (this._blockNode(new p(c)), d && P)
        this.code(d).else().code(P).endIf();
      else if (d)
        this.code(d).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(c) {
      return this._elseNode(new p(c));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new g());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, g);
    }
    _for(c, d) {
      return this._blockNode(c), d && this.code(d).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(c, d) {
      return this._for(new O(c), d);
    }
    // `for` statement for a range of values
    forRange(c, d, P, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const W = this._scope.toName(c);
      return this._for(new N(A, W, d, P), () => j(W));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(c, d, P, j = r.varKinds.const) {
      const A = this._scope.toName(c);
      if (this.opts.es5) {
        const W = d instanceof t.Name ? d : this.var("_arr", d);
        return this.forRange("_i", 0, (0, t._)`${W}.length`, (B) => {
          this.var(A, (0, t._)`${W}[${B}]`), P(A);
        });
      }
      return this._for(new I("of", j, A, d), () => P(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(c, d, P, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(c, (0, t._)`Object.keys(${d})`, P);
      const A = this._scope.toName(c);
      return this._for(new I("in", j, A, d), () => P(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(v);
    }
    // `label` statement
    label(c) {
      return this._leafNode(new f(c));
    }
    // `break` statement
    break(c) {
      return this._leafNode(new u(c));
    }
    // `return` statement
    return(c) {
      const d = new z();
      if (this._blockNode(d), this.code(c), d.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(z);
    }
    // `try` statement
    try(c, d, P) {
      if (!d && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new Z();
      if (this._blockNode(j), this.code(c), d) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), d(A);
      }
      return P && (this._currNode = j.finally = new K(), this.code(P)), this._endBlockNode(V, K);
    }
    // `throw` statement
    throw(c) {
      return this._leafNode(new h(c));
    }
    // start self-balancing block
    block(c, d) {
      return this._blockStarts.push(this._nodes.length), c && this.code(c).endBlock(d), this;
    }
    // end the current self-balancing block
    endBlock(c) {
      const d = this._blockStarts.pop();
      if (d === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const P = this._nodes.length - d;
      if (P < 0 || c !== void 0 && P !== c)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${c} expected`);
      return this._nodes.length = d, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(c, d = t.nil, P, j) {
      return this._blockNode(new F(c, d, P)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(F);
    }
    optimize(c = 1) {
      for (; c-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(c) {
      return this._currNode.nodes.push(c), this;
    }
    _blockNode(c) {
      this._currNode.nodes.push(c), this._nodes.push(c);
    }
    _endBlockNode(c, d) {
      const P = this._currNode;
      if (P instanceof c || d && P instanceof d)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${d ? `${c.kind}/${d.kind}` : c.kind}"`);
    }
    _elseNode(c) {
      const d = this._currNode;
      if (!(d instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = d.else = c, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const c = this._nodes;
      return c[c.length - 1];
    }
    set _currNode(c) {
      const d = this._nodes;
      d[d.length - 1] = c;
    }
  }
  e.CodeGen = re;
  function Y($, c) {
    for (const d in c)
      $[d] = ($[d] || 0) + (c[d] || 0);
    return $;
  }
  function ee($, c) {
    return c instanceof t._CodeOrName ? Y($, c.names) : $;
  }
  function L($, c, d) {
    if ($ instanceof t.Name)
      return P($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, W) => (W instanceof t.Name && (W = P(W)), W instanceof t._Code ? A.push(...W._items) : A.push(W), A), []));
    function P(A) {
      const W = d[A.str];
      return W === void 0 || c[A.str] !== 1 ? A : (delete c[A.str], W);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((W) => W instanceof t.Name && c[W.str] === 1 && d[W.str] !== void 0);
    }
  }
  function M($, c) {
    for (const d in c)
      $[d] = ($[d] || 0) - (c[d] || 0);
  }
  function H($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${b($)}`;
  }
  e.not = H;
  const q = m(e.operators.AND);
  function k(...$) {
    return $.reduce(q);
  }
  e.and = k;
  const C = m(e.operators.OR);
  function S(...$) {
    return $.reduce(C);
  }
  e.or = S;
  function m($) {
    return (c, d) => c === t.nil ? d : d === t.nil ? c : (0, t._)`${b(c)} ${$} ${b(d)}`;
  }
  function b($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(ce);
var G = {};
Object.defineProperty(G, "__esModule", { value: !0 });
G.checkStrictMode = G.getErrorPath = G.Type = G.useFunc = G.setEvaluated = G.evaluatedPropsToName = G.mergeEvaluated = G.eachItem = G.unescapeJsonPointer = G.escapeJsonPointer = G.escapeFragment = G.unescapeFragment = G.schemaRefOrVal = G.schemaHasRulesButRef = G.schemaHasRules = G.checkUnknownRules = G.alwaysValidSchema = G.toHash = void 0;
const he = ce, th = dn;
function rh(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
G.toHash = rh;
function nh(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (eu(e, t), !tu(t, e.self.RULES.all));
}
G.alwaysValidSchema = nh;
function eu(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const o in t)
    s[o] || su(e, `unknown keyword: "${o}"`);
}
G.checkUnknownRules = eu;
function tu(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
G.schemaHasRules = tu;
function sh(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
G.schemaHasRulesButRef = sh;
function oh({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, he._)`${r}`;
  }
  return (0, he._)`${e}${t}${(0, he.getProperty)(n)}`;
}
G.schemaRefOrVal = oh;
function ah(e) {
  return ru(decodeURIComponent(e));
}
G.unescapeFragment = ah;
function ih(e) {
  return encodeURIComponent(sa(e));
}
G.escapeFragment = ih;
function sa(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
G.escapeJsonPointer = sa;
function ru(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
G.unescapeJsonPointer = ru;
function ch(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
G.eachItem = ch;
function Ki({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, o, a, l) => {
    const i = a === void 0 ? o : a instanceof he.Name ? (o instanceof he.Name ? e(s, o, a) : t(s, o, a), a) : o instanceof he.Name ? (t(s, a, o), o) : r(o, a);
    return l === he.Name && !(i instanceof he.Name) ? n(s, i) : i;
  };
}
G.mergeEvaluated = {
  props: Ki({
    mergeNames: (e, t, r) => e.if((0, he._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, he._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, he._)`${r} || {}`).code((0, he._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, he._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, he._)`${r} || {}`), oa(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: nu
  }),
  items: Ki({
    mergeNames: (e, t, r) => e.if((0, he._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, he._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, he._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, he._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function nu(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, he._)`{}`);
  return t !== void 0 && oa(e, r, t), r;
}
G.evaluatedPropsToName = nu;
function oa(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, he._)`${t}${(0, he.getProperty)(n)}`, !0));
}
G.setEvaluated = oa;
const Hi = {};
function lh(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Hi[t.code] || (Hi[t.code] = new th._Code(t.code))
  });
}
G.useFunc = lh;
var So;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(So || (G.Type = So = {}));
function uh(e, t, r) {
  if (e instanceof he.Name) {
    const n = t === So.Num;
    return r ? n ? (0, he._)`"[" + ${e} + "]"` : (0, he._)`"['" + ${e} + "']"` : n ? (0, he._)`"/" + ${e}` : (0, he._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, he.getProperty)(e).toString() : "/" + sa(e);
}
G.getErrorPath = uh;
function su(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
G.checkStrictMode = su;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
const De = ce, fh = {
  // validation function arguments
  data: new De.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new De.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new De.Name("instancePath"),
  parentData: new De.Name("parentData"),
  parentDataProperty: new De.Name("parentDataProperty"),
  rootData: new De.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new De.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new De.Name("vErrors"),
  // null or array of validation errors
  errors: new De.Name("errors"),
  // counter of validation errors
  this: new De.Name("this"),
  // "globals"
  self: new De.Name("self"),
  scope: new De.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new De.Name("json"),
  jsonPos: new De.Name("jsonPos"),
  jsonLen: new De.Name("jsonLen"),
  jsonPart: new De.Name("jsonPart")
};
vt.default = fh;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ce, r = G, n = vt;
  e.keywordError = {
    message: ({ keyword: g }) => (0, t.str)`must pass "${g}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: g, schemaType: p }) => p ? (0, t.str)`"${g}" keyword must be ${p} ($data)` : (0, t.str)`"${g}" keyword is invalid ($data)`
  };
  function s(g, p = e.keywordError, v, O) {
    const { it: N } = g, { gen: I, compositeRule: F, allErrors: z } = N, Z = h(g, p, v);
    O ?? (F || z) ? i(I, Z) : f(N, (0, t._)`[${Z}]`);
  }
  e.reportError = s;
  function o(g, p = e.keywordError, v) {
    const { it: O } = g, { gen: N, compositeRule: I, allErrors: F } = O, z = h(g, p, v);
    i(N, z), I || F || f(O, n.default.vErrors);
  }
  e.reportExtraError = o;
  function a(g, p) {
    g.assign(n.default.errors, p), g.if((0, t._)`${n.default.vErrors} !== null`, () => g.if(p, () => g.assign((0, t._)`${n.default.vErrors}.length`, p), () => g.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function l({ gen: g, keyword: p, schemaValue: v, data: O, errsCount: N, it: I }) {
    if (N === void 0)
      throw new Error("ajv implementation error");
    const F = g.name("err");
    g.forRange("i", N, n.default.errors, (z) => {
      g.const(F, (0, t._)`${n.default.vErrors}[${z}]`), g.if((0, t._)`${F}.instancePath === undefined`, () => g.assign((0, t._)`${F}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), g.assign((0, t._)`${F}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && (g.assign((0, t._)`${F}.schema`, v), g.assign((0, t._)`${F}.data`, O));
    });
  }
  e.extendErrors = l;
  function i(g, p) {
    const v = g.const("err", p);
    g.if((0, t._)`${n.default.vErrors} === null`, () => g.assign(n.default.vErrors, (0, t._)`[${v}]`), (0, t._)`${n.default.vErrors}.push(${v})`), g.code((0, t._)`${n.default.errors}++`);
  }
  function f(g, p) {
    const { gen: v, validateName: O, schemaEnv: N } = g;
    N.$async ? v.throw((0, t._)`new ${g.ValidationError}(${p})`) : (v.assign((0, t._)`${O}.errors`, p), v.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function h(g, p, v) {
    const { createErrors: O } = g.it;
    return O === !1 ? (0, t._)`{}` : w(g, p, v);
  }
  function w(g, p, v = {}) {
    const { gen: O, it: N } = g, I = [
      _(N, v),
      E(g, v)
    ];
    return y(g, p, I), O.object(...I);
  }
  function _({ errorPath: g }, { instancePath: p }) {
    const v = p ? (0, t.str)`${g}${(0, r.getErrorPath)(p, r.Type.Str)}` : g;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, v)];
  }
  function E({ keyword: g, it: { errSchemaPath: p } }, { schemaPath: v, parentSchema: O }) {
    let N = O ? p : (0, t.str)`${p}/${g}`;
    return v && (N = (0, t.str)`${N}${(0, r.getErrorPath)(v, r.Type.Str)}`), [u.schemaPath, N];
  }
  function y(g, { params: p, message: v }, O) {
    const { keyword: N, data: I, schemaValue: F, it: z } = g, { opts: Z, propertyName: V, topSchemaRef: K, schemaPath: re } = z;
    O.push([u.keyword, N], [u.params, typeof p == "function" ? p(g) : p || (0, t._)`{}`]), Z.messages && O.push([u.message, typeof v == "function" ? v(g) : v]), Z.verbose && O.push([u.schema, F], [u.parentSchema, (0, t._)`${K}${re}`], [n.default.data, I]), V && O.push([u.propertyName, V]);
  }
})(mn);
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.boolOrEmptySchema = Ir.topBoolOrEmptySchema = void 0;
const dh = mn, hh = ce, ph = vt, mh = {
  message: "boolean schema is false"
};
function yh(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? ou(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(ph.default.data) : (t.assign((0, hh._)`${n}.errors`, null), t.return(!0));
}
Ir.topBoolOrEmptySchema = yh;
function _h(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), ou(e)) : r.var(t, !0);
}
Ir.boolOrEmptySchema = _h;
function ou(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, dh.reportError)(s, mh, void 0, t);
}
var Se = {}, ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.getRules = ar.isJSONType = void 0;
const gh = ["string", "number", "integer", "boolean", "null", "object", "array"], $h = new Set(gh);
function vh(e) {
  return typeof e == "string" && $h.has(e);
}
ar.isJSONType = vh;
function Eh() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
ar.getRules = Eh;
var Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.shouldUseRule = Pt.shouldUseGroup = Pt.schemaHasRulesForType = void 0;
function wh({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && au(e, n);
}
Pt.schemaHasRulesForType = wh;
function au(e, t) {
  return t.rules.some((r) => iu(e, r));
}
Pt.shouldUseGroup = au;
function iu(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Pt.shouldUseRule = iu;
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.reportTypeError = Se.checkDataTypes = Se.checkDataType = Se.coerceAndCheckDataType = Se.getJSONTypes = Se.getSchemaTypes = Se.DataType = void 0;
const Sh = ar, bh = Pt, Ph = mn, se = ce, cu = G;
var wr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(wr || (Se.DataType = wr = {}));
function Oh(e) {
  const t = lu(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Se.getSchemaTypes = Oh;
function lu(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Sh.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Se.getJSONTypes = lu;
function Nh(e, t) {
  const { gen: r, data: n, opts: s } = e, o = Rh(t, s.coerceTypes), a = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, bh.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const l = aa(t, n, s.strictNumbers, wr.Wrong);
    r.if(l, () => {
      o.length ? Th(e, t, o) : ia(e);
    });
  }
  return a;
}
Se.coerceAndCheckDataType = Nh;
const uu = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Rh(e, t) {
  return t ? e.filter((r) => uu.has(r) || t === "array" && r === "array") : [];
}
function Th(e, t, r) {
  const { gen: n, data: s, opts: o } = e, a = n.let("dataType", (0, se._)`typeof ${s}`), l = n.let("coerced", (0, se._)`undefined`);
  o.coerceTypes === "array" && n.if((0, se._)`${a} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, se._)`${s}[0]`).assign(a, (0, se._)`typeof ${s}`).if(aa(t, s, o.strictNumbers), () => n.assign(l, s))), n.if((0, se._)`${l} !== undefined`);
  for (const f of r)
    (uu.has(f) || f === "array" && o.coerceTypes === "array") && i(f);
  n.else(), ia(e), n.endIf(), n.if((0, se._)`${l} !== undefined`, () => {
    n.assign(s, l), Ih(e, l);
  });
  function i(f) {
    switch (f) {
      case "string":
        n.elseIf((0, se._)`${a} == "number" || ${a} == "boolean"`).assign(l, (0, se._)`"" + ${s}`).elseIf((0, se._)`${s} === null`).assign(l, (0, se._)`""`);
        return;
      case "number":
        n.elseIf((0, se._)`${a} == "boolean" || ${s} === null
              || (${a} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, se._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, se._)`${a} === "boolean" || ${s} === null
              || (${a} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, se._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, se._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, se._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, se._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, se._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${s} === null`).assign(l, (0, se._)`[${s}]`);
    }
  }
}
function Ih({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, se._)`${t} !== undefined`, () => e.assign((0, se._)`${t}[${r}]`, n));
}
function bo(e, t, r, n = wr.Correct) {
  const s = n === wr.Correct ? se.operators.EQ : se.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, se._)`${t} ${s} null`;
    case "array":
      o = (0, se._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, se._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = a((0, se._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = a();
      break;
    default:
      return (0, se._)`typeof ${t} ${s} ${e}`;
  }
  return n === wr.Correct ? o : (0, se.not)(o);
  function a(l = se.nil) {
    return (0, se.and)((0, se._)`typeof ${t} == "number"`, l, r ? (0, se._)`isFinite(${t})` : se.nil);
  }
}
Se.checkDataType = bo;
function aa(e, t, r, n) {
  if (e.length === 1)
    return bo(e[0], t, r, n);
  let s;
  const o = (0, cu.toHash)(e);
  if (o.array && o.object) {
    const a = (0, se._)`typeof ${t} != "object"`;
    s = o.null ? a : (0, se._)`!${t} || ${a}`, delete o.null, delete o.array, delete o.object;
  } else
    s = se.nil;
  o.number && delete o.integer;
  for (const a in o)
    s = (0, se.and)(s, bo(a, t, r, n));
  return s;
}
Se.checkDataTypes = aa;
const kh = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, se._)`{type: ${e}}` : (0, se._)`{type: ${t}}`
};
function ia(e) {
  const t = Ch(e);
  (0, Ph.reportError)(t, kh);
}
Se.reportTypeError = ia;
function Ch(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, cu.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Os = {};
Object.defineProperty(Os, "__esModule", { value: !0 });
Os.assignDefaults = void 0;
const fr = ce, jh = G;
function Ah(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Wi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, o) => Wi(e, o, s.default));
}
Os.assignDefaults = Ah;
function Wi(e, t, r) {
  const { gen: n, compositeRule: s, data: o, opts: a } = e;
  if (r === void 0)
    return;
  const l = (0, fr._)`${o}${(0, fr.getProperty)(t)}`;
  if (s) {
    (0, jh.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let i = (0, fr._)`${l} === undefined`;
  a.useDefaults === "empty" && (i = (0, fr._)`${i} || ${l} === null || ${l} === ""`), n.if(i, (0, fr._)`${l} = ${(0, fr.stringify)(r)}`);
}
var gt = {}, ie = {};
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.validateUnion = ie.validateArray = ie.usePattern = ie.callValidateCode = ie.schemaProperties = ie.allSchemaProperties = ie.noPropertyInData = ie.propertyInData = ie.isOwnProperty = ie.hasPropFunc = ie.reportMissingProp = ie.checkMissingProp = ie.checkReportMissingProp = void 0;
const _e = ce, ca = G, It = vt, Dh = G;
function Lh(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(ua(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, _e._)`${t}` }, !0), e.error();
  });
}
ie.checkReportMissingProp = Lh;
function Mh({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, _e.or)(...n.map((o) => (0, _e.and)(ua(e, t, o, r.ownProperties), (0, _e._)`${s} = ${o}`)));
}
ie.checkMissingProp = Mh;
function Fh(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ie.reportMissingProp = Fh;
function fu(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, _e._)`Object.prototype.hasOwnProperty`
  });
}
ie.hasPropFunc = fu;
function la(e, t, r) {
  return (0, _e._)`${fu(e)}.call(${t}, ${r})`;
}
ie.isOwnProperty = la;
function Uh(e, t, r, n) {
  const s = (0, _e._)`${t}${(0, _e.getProperty)(r)} !== undefined`;
  return n ? (0, _e._)`${s} && ${la(e, t, r)}` : s;
}
ie.propertyInData = Uh;
function ua(e, t, r, n) {
  const s = (0, _e._)`${t}${(0, _e.getProperty)(r)} === undefined`;
  return n ? (0, _e.or)(s, (0, _e.not)(la(e, t, r))) : s;
}
ie.noPropertyInData = ua;
function du(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ie.allSchemaProperties = du;
function Vh(e, t) {
  return du(t).filter((r) => !(0, ca.alwaysValidSchema)(e, t[r]));
}
ie.schemaProperties = Vh;
function qh({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: o }, it: a }, l, i, f) {
  const u = f ? (0, _e._)`${e}, ${t}, ${n}${s}` : t, h = [
    [It.default.instancePath, (0, _e.strConcat)(It.default.instancePath, o)],
    [It.default.parentData, a.parentData],
    [It.default.parentDataProperty, a.parentDataProperty],
    [It.default.rootData, It.default.rootData]
  ];
  a.opts.dynamicRef && h.push([It.default.dynamicAnchors, It.default.dynamicAnchors]);
  const w = (0, _e._)`${u}, ${r.object(...h)}`;
  return i !== _e.nil ? (0, _e._)`${l}.call(${i}, ${w})` : (0, _e._)`${l}(${w})`;
}
ie.callValidateCode = qh;
const zh = (0, _e._)`new RegExp`;
function Gh({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, o = s(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, _e._)`${s.code === "new RegExp" ? zh : (0, Dh.useFunc)(e, s)}(${r}, ${n})`
  });
}
ie.usePattern = Gh;
function xh(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, o = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return a(() => t.assign(l, !1)), l;
  }
  return t.var(o, !0), a(() => t.break()), o;
  function a(l) {
    const i = t.const("len", (0, _e._)`${r}.length`);
    t.forRange("i", 0, i, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: ca.Type.Num
      }, o), t.if((0, _e.not)(o), l);
    });
  }
}
ie.validateArray = xh;
function Bh(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((i) => (0, ca.alwaysValidSchema)(s, i)) && !s.opts.unevaluated)
    return;
  const a = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((i, f) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, l);
    t.assign(a, (0, _e._)`${a} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, _e.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
ie.validateUnion = Bh;
Object.defineProperty(gt, "__esModule", { value: !0 });
gt.validateKeywordUsage = gt.validSchemaType = gt.funcKeywordCode = gt.macroKeywordCode = void 0;
const Ue = ce, tr = vt, Kh = ie, Hh = mn;
function Wh(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: o, it: a } = e, l = t.macro.call(a.self, s, o, a), i = hu(r, n, l);
  a.opts.validateSchema !== !1 && a.self.validateSchema(l, !0);
  const f = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: Ue.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: i,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
gt.macroKeywordCode = Wh;
function Jh(e, t) {
  var r;
  const { gen: n, keyword: s, schema: o, parentSchema: a, $data: l, it: i } = e;
  Yh(i, t);
  const f = !l && t.compile ? t.compile.call(i.self, o, a, i) : t.validate, u = hu(n, s, f), h = n.let("valid");
  e.block$data(h, w), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function w() {
    if (t.errors === !1)
      y(), t.modifying && Ji(e), g(() => e.error());
    else {
      const p = t.async ? _() : E();
      t.modifying && Ji(e), g(() => Xh(e, p));
    }
  }
  function _() {
    const p = n.let("ruleErrs", null);
    return n.try(() => y((0, Ue._)`await `), (v) => n.assign(h, !1).if((0, Ue._)`${v} instanceof ${i.ValidationError}`, () => n.assign(p, (0, Ue._)`${v}.errors`), () => n.throw(v))), p;
  }
  function E() {
    const p = (0, Ue._)`${u}.errors`;
    return n.assign(p, null), y(Ue.nil), p;
  }
  function y(p = t.async ? (0, Ue._)`await ` : Ue.nil) {
    const v = i.opts.passContext ? tr.default.this : tr.default.self, O = !("compile" in t && !l || t.schema === !1);
    n.assign(h, (0, Ue._)`${p}${(0, Kh.callValidateCode)(e, u, v, O)}`, t.modifying);
  }
  function g(p) {
    var v;
    n.if((0, Ue.not)((v = t.valid) !== null && v !== void 0 ? v : h), p);
  }
}
gt.funcKeywordCode = Jh;
function Ji(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ue._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Xh(e, t) {
  const { gen: r } = e;
  r.if((0, Ue._)`Array.isArray(${t})`, () => {
    r.assign(tr.default.vErrors, (0, Ue._)`${tr.default.vErrors} === null ? ${t} : ${tr.default.vErrors}.concat(${t})`).assign(tr.default.errors, (0, Ue._)`${tr.default.vErrors}.length`), (0, Hh.extendErrors)(e);
  }, () => e.error());
}
function Yh({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function hu(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ue.stringify)(r) });
}
function Qh(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
gt.validSchemaType = Qh;
function Zh({ schema: e, opts: t, self: r, errSchemaPath: n }, s, o) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(o) : s.keyword !== o)
    throw new Error("ajv implementation error");
  const a = s.dependencies;
  if (a != null && a.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${o}: ${a.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[o])) {
    const i = `keyword "${o}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(i);
    else
      throw new Error(i);
  }
}
gt.validateKeywordUsage = Zh;
var qt = {};
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.extendSubschemaMode = qt.extendSubschemaData = qt.getSubschema = void 0;
const yt = ce, pu = G;
function ep(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: o, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, yt._)`${e.schemaPath}${(0, yt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, yt._)`${e.schemaPath}${(0, yt.getProperty)(t)}${(0, yt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, pu.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || o === void 0 || a === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: a,
      errSchemaPath: o
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
qt.getSubschema = ep;
function tp(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: o, propertyName: a }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: u, opts: h } = t, w = l.let("data", (0, yt._)`${t.data}${(0, yt.getProperty)(r)}`, !0);
    i(w), e.errorPath = (0, yt.str)`${f}${(0, pu.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, yt._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const f = s instanceof yt.Name ? s : l.let("data", s, !0);
    i(f), a !== void 0 && (e.propertyName = a);
  }
  o && (e.dataTypes = o);
  function i(f) {
    e.data = f, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, f];
  }
}
qt.extendSubschemaData = tp;
function rp(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
qt.extendSubschemaMode = rp;
var Ce = {}, Ns = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, o;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (o = Object.keys(t), n = o.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var a = o[s];
      if (!e(t[a], r[a])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, mu = { exports: {} }, Ft = mu.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Xn(t, n, s, e, "", e);
};
Ft.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Ft.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Ft.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Ft.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Xn(e, t, r, n, s, o, a, l, i, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, o, a, l, i, f);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Ft.arrayKeywords)
          for (var w = 0; w < h.length; w++)
            Xn(e, t, r, h[w], s + "/" + u + "/" + w, o, s, u, n, w);
      } else if (u in Ft.propsKeywords) {
        if (h && typeof h == "object")
          for (var _ in h)
            Xn(e, t, r, h[_], s + "/" + u + "/" + np(_), o, s, u, n, _);
      } else (u in Ft.keywords || e.allKeys && !(u in Ft.skipKeywords)) && Xn(e, t, r, h, s + "/" + u, o, s, u, n);
    }
    r(n, s, o, a, l, i, f);
  }
}
function np(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var sp = mu.exports;
Object.defineProperty(Ce, "__esModule", { value: !0 });
Ce.getSchemaRefs = Ce.resolveUrl = Ce.normalizeId = Ce._getFullPath = Ce.getFullPath = Ce.inlineRef = void 0;
const op = G, ap = Ns, ip = sp, cp = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function lp(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Po(e) : t ? yu(e) <= t : !1;
}
Ce.inlineRef = lp;
const up = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Po(e) {
  for (const t in e) {
    if (up.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Po) || typeof r == "object" && Po(r))
      return !0;
  }
  return !1;
}
function yu(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !cp.has(r) && (typeof e[r] == "object" && (0, op.eachItem)(e[r], (n) => t += yu(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function _u(e, t = "", r) {
  r !== !1 && (t = Sr(t));
  const n = e.parse(t);
  return gu(e, n);
}
Ce.getFullPath = _u;
function gu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ce._getFullPath = gu;
const fp = /#\/?$/;
function Sr(e) {
  return e ? e.replace(fp, "") : "";
}
Ce.normalizeId = Sr;
function dp(e, t, r) {
  return r = Sr(r), e.resolve(t, r);
}
Ce.resolveUrl = dp;
const hp = /^[a-z_][-a-z0-9._]*$/i;
function pp(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = Sr(e[r] || t), o = { "": s }, a = _u(n, s, !1), l = {}, i = /* @__PURE__ */ new Set();
  return ip(e, { allKeys: !0 }, (h, w, _, E) => {
    if (E === void 0)
      return;
    const y = a + w;
    let g = o[E];
    typeof h[r] == "string" && (g = p.call(this, h[r])), v.call(this, h.$anchor), v.call(this, h.$dynamicAnchor), o[w] = g;
    function p(O) {
      const N = this.opts.uriResolver.resolve;
      if (O = Sr(g ? N(g, O) : O), i.has(O))
        throw u(O);
      i.add(O);
      let I = this.refs[O];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? f(h, I.schema, O) : O !== Sr(y) && (O[0] === "#" ? (f(h, l[O], O), l[O] = h) : this.refs[O] = y), O;
    }
    function v(O) {
      if (typeof O == "string") {
        if (!hp.test(O))
          throw new Error(`invalid anchor "${O}"`);
        p.call(this, `#${O}`);
      }
    }
  }), l;
  function f(h, w, _) {
    if (w !== void 0 && !ap(h, w))
      throw u(_);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Ce.getSchemaRefs = pp;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.getData = lt.KeywordCxt = lt.validateFunctionCode = void 0;
const $u = Ir, Xi = Se, fa = Pt, us = Se, mp = Os, rn = gt, Ws = qt, X = ce, Q = vt, yp = Ce, Ot = G, xr = mn;
function _p(e) {
  if (wu(e) && (Su(e), Eu(e))) {
    vp(e);
    return;
  }
  vu(e, () => (0, $u.topBoolOrEmptySchema)(e));
}
lt.validateFunctionCode = _p;
function vu({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, o) {
  s.code.es5 ? e.func(t, (0, X._)`${Q.default.data}, ${Q.default.valCxt}`, n.$async, () => {
    e.code((0, X._)`"use strict"; ${Yi(r, s)}`), $p(e, s), e.code(o);
  }) : e.func(t, (0, X._)`${Q.default.data}, ${gp(s)}`, n.$async, () => e.code(Yi(r, s)).code(o));
}
function gp(e) {
  return (0, X._)`{${Q.default.instancePath}="", ${Q.default.parentData}, ${Q.default.parentDataProperty}, ${Q.default.rootData}=${Q.default.data}${e.dynamicRef ? (0, X._)`, ${Q.default.dynamicAnchors}={}` : X.nil}}={}`;
}
function $p(e, t) {
  e.if(Q.default.valCxt, () => {
    e.var(Q.default.instancePath, (0, X._)`${Q.default.valCxt}.${Q.default.instancePath}`), e.var(Q.default.parentData, (0, X._)`${Q.default.valCxt}.${Q.default.parentData}`), e.var(Q.default.parentDataProperty, (0, X._)`${Q.default.valCxt}.${Q.default.parentDataProperty}`), e.var(Q.default.rootData, (0, X._)`${Q.default.valCxt}.${Q.default.rootData}`), t.dynamicRef && e.var(Q.default.dynamicAnchors, (0, X._)`${Q.default.valCxt}.${Q.default.dynamicAnchors}`);
  }, () => {
    e.var(Q.default.instancePath, (0, X._)`""`), e.var(Q.default.parentData, (0, X._)`undefined`), e.var(Q.default.parentDataProperty, (0, X._)`undefined`), e.var(Q.default.rootData, Q.default.data), t.dynamicRef && e.var(Q.default.dynamicAnchors, (0, X._)`{}`);
  });
}
function vp(e) {
  const { schema: t, opts: r, gen: n } = e;
  vu(e, () => {
    r.$comment && t.$comment && Pu(e), Pp(e), n.let(Q.default.vErrors, null), n.let(Q.default.errors, 0), r.unevaluated && Ep(e), bu(e), Rp(e);
  });
}
function Ep(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, X._)`${r}.evaluated`), t.if((0, X._)`${e.evaluated}.dynamicProps`, () => t.assign((0, X._)`${e.evaluated}.props`, (0, X._)`undefined`)), t.if((0, X._)`${e.evaluated}.dynamicItems`, () => t.assign((0, X._)`${e.evaluated}.items`, (0, X._)`undefined`));
}
function Yi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, X._)`/*# sourceURL=${r} */` : X.nil;
}
function wp(e, t) {
  if (wu(e) && (Su(e), Eu(e))) {
    Sp(e, t);
    return;
  }
  (0, $u.boolOrEmptySchema)(e, t);
}
function Eu({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function wu(e) {
  return typeof e.schema != "boolean";
}
function Sp(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Pu(e), Op(e), Np(e);
  const o = n.const("_errs", Q.default.errors);
  bu(e, o), n.var(t, (0, X._)`${o} === ${Q.default.errors}`);
}
function Su(e) {
  (0, Ot.checkUnknownRules)(e), bp(e);
}
function bu(e, t) {
  if (e.opts.jtd)
    return Qi(e, [], !1, t);
  const r = (0, Xi.getSchemaTypes)(e.schema), n = (0, Xi.coerceAndCheckDataType)(e, r);
  Qi(e, r, !n, t);
}
function bp(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Ot.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Pp(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Ot.checkStrictMode)(e, "default is ignored in the schema root");
}
function Op(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, yp.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Np(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Pu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const o = r.$comment;
  if (s.$comment === !0)
    e.code((0, X._)`${Q.default.self}.logger.log(${o})`);
  else if (typeof s.$comment == "function") {
    const a = (0, X.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, X._)`${Q.default.self}.opts.$comment(${o}, ${a}, ${l}.schema)`);
  }
}
function Rp(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: o } = e;
  r.$async ? t.if((0, X._)`${Q.default.errors} === 0`, () => t.return(Q.default.data), () => t.throw((0, X._)`new ${s}(${Q.default.vErrors})`)) : (t.assign((0, X._)`${n}.errors`, Q.default.vErrors), o.unevaluated && Tp(e), t.return((0, X._)`${Q.default.errors} === 0`));
}
function Tp({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof X.Name && e.assign((0, X._)`${t}.props`, r), n instanceof X.Name && e.assign((0, X._)`${t}.items`, n);
}
function Qi(e, t, r, n) {
  const { gen: s, schema: o, data: a, allErrors: l, opts: i, self: f } = e, { RULES: u } = f;
  if (o.$ref && (i.ignoreKeywordsWithRef || !(0, Ot.schemaHasRulesButRef)(o, u))) {
    s.block(() => Ru(e, "$ref", u.all.$ref.definition));
    return;
  }
  i.jtd || Ip(e, t), s.block(() => {
    for (const w of u.rules)
      h(w);
    h(u.post);
  });
  function h(w) {
    (0, fa.shouldUseGroup)(o, w) && (w.type ? (s.if((0, us.checkDataType)(w.type, a, i.strictNumbers)), Zi(e, w), t.length === 1 && t[0] === w.type && r && (s.else(), (0, us.reportTypeError)(e)), s.endIf()) : Zi(e, w), l || s.if((0, X._)`${Q.default.errors} === ${n || 0}`));
  }
}
function Zi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, mp.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, fa.shouldUseRule)(n, o) && Ru(e, o.keyword, o.definition, t.type);
  });
}
function Ip(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (kp(e, t), e.opts.allowUnionTypes || Cp(e, t), jp(e, e.dataTypes));
}
function kp(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Ou(e.dataTypes, r) || da(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Dp(e, t);
  }
}
function Cp(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && da(e, "use allowUnionTypes to allow union type keyword");
}
function jp(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, fa.shouldUseRule)(e.schema, s)) {
      const { type: o } = s.definition;
      o.length && !o.some((a) => Ap(t, a)) && da(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function Ap(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Ou(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Dp(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Ou(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function da(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Ot.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Nu {
  constructor(t, r, n) {
    if ((0, rn.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Ot.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Tu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, rn.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", Q.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, X.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, X.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, X._)`${r} !== undefined && (${(0, X.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? xr.reportExtraError : xr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, xr.reportError)(this, this.def.$dataError || xr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, xr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = X.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = X.nil, r = X.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: o, def: a } = this;
    n.if((0, X.or)((0, X._)`${s} === undefined`, r)), t !== X.nil && n.assign(t, !0), (o.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== X.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: o } = this;
    return (0, X.or)(a(), l());
    function a() {
      if (n.length) {
        if (!(r instanceof X.Name))
          throw new Error("ajv implementation error");
        const i = Array.isArray(n) ? n : [n];
        return (0, X._)`${(0, us.checkDataTypes)(i, r, o.opts.strictNumbers, us.DataType.Wrong)}`;
      }
      return X.nil;
    }
    function l() {
      if (s.validateSchema) {
        const i = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, X._)`!${i}(${r})`;
      }
      return X.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Ws.getSubschema)(this.it, t);
    (0, Ws.extendSubschemaData)(n, this.it, t), (0, Ws.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return wp(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Ot.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Ot.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, X.Name)), !0;
  }
}
lt.KeywordCxt = Nu;
function Ru(e, t, r, n) {
  const s = new Nu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, rn.funcKeywordCode)(s, r) : "macro" in r ? (0, rn.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, rn.funcKeywordCode)(s, r);
}
const Lp = /^\/(?:[^~]|~0|~1)*$/, Mp = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Tu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, o;
  if (e === "")
    return Q.default.rootData;
  if (e[0] === "/") {
    if (!Lp.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, o = Q.default.rootData;
  } else {
    const f = Mp.exec(e);
    if (!f)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +f[1];
    if (s = f[2], s === "#") {
      if (u >= t)
        throw new Error(i("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(i("data", u));
    if (o = r[t - u], !s)
      return o;
  }
  let a = o;
  const l = s.split("/");
  for (const f of l)
    f && (o = (0, X._)`${o}${(0, X.getProperty)((0, Ot.unescapeJsonPointer)(f))}`, a = (0, X._)`${a} && ${o}`);
  return a;
  function i(f, u) {
    return `Cannot access ${f} ${u} levels up, current level is ${t}`;
  }
}
lt.getData = Tu;
var yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
class Fp extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
yn.default = Fp;
var Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
const Js = Ce;
let Up = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Js.resolveUrl)(t, r, n), this.missingSchema = (0, Js.normalizeId)((0, Js.getFullPath)(t, this.missingRef));
  }
};
Ar.default = Up;
var xe = {};
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.resolveSchema = xe.getCompilingSchema = xe.resolveRef = xe.compileSchema = xe.SchemaEnv = void 0;
const et = ce, Vp = yn, Wt = vt, it = Ce, ec = G, qp = lt;
let Rs = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, it.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
xe.SchemaEnv = Rs;
function ha(e) {
  const t = Iu.call(this, e);
  if (t)
    return t;
  const r = (0, it.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: o } = this.opts, a = new et.CodeGen(this.scope, { es5: n, lines: s, ownProperties: o });
  let l;
  e.$async && (l = a.scopeValue("Error", {
    ref: Vp.default,
    code: (0, et._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const i = a.scopeName("validate");
  e.validateName = i;
  const f = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: Wt.default.data,
    parentData: Wt.default.parentData,
    parentDataProperty: Wt.default.parentDataProperty,
    dataNames: [Wt.default.data],
    dataPathArr: [et.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, et.stringify)(e.schema) } : { ref: e.schema }),
    validateName: i,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: et.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, et._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, qp.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
    const h = a.toString();
    u = `${a.scopeRefs(Wt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const _ = new Function(`${Wt.default.self}`, `${Wt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(i, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: i, validateCode: h, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: E, items: y } = f;
      _.evaluated = {
        props: E instanceof et.Name ? void 0 : E,
        items: y instanceof et.Name ? void 0 : y,
        dynamicProps: E instanceof et.Name,
        dynamicItems: y instanceof et.Name
      }, _.source && (_.source.evaluated = (0, et.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
xe.compileSchema = ha;
function zp(e, t, r) {
  var n;
  r = (0, it.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let o = Bp.call(this, e, r);
  if (o === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    a && (o = new Rs({ schema: a, schemaId: l, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = Gp.call(this, o);
}
xe.resolveRef = zp;
function Gp(e) {
  return (0, it.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : ha.call(this, e);
}
function Iu(e) {
  for (const t of this._compilations)
    if (xp(t, e))
      return t;
}
xe.getCompilingSchema = Iu;
function xp(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Bp(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Ts.call(this, e, t);
}
function Ts(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, it._getFullPath)(this.opts.uriResolver, r);
  let s = (0, it.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Xs.call(this, r, e);
  const o = (0, it.normalizeId)(n), a = this.refs[o] || this.schemas[o];
  if (typeof a == "string") {
    const l = Ts.call(this, e, a);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : Xs.call(this, r, l);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || ha.call(this, a), o === (0, it.normalizeId)(t)) {
      const { schema: l } = a, { schemaId: i } = this.opts, f = l[i];
      return f && (s = (0, it.resolveUrl)(this.opts.uriResolver, s, f)), new Rs({ schema: l, schemaId: i, root: e, baseId: s });
    }
    return Xs.call(this, r, a);
  }
}
xe.resolveSchema = Ts;
const Kp = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Xs(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const i = r[(0, ec.unescapeFragment)(l)];
    if (i === void 0)
      return;
    r = i;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !Kp.has(l) && f && (t = (0, it.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, ec.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, it.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = Ts.call(this, n, l);
  }
  const { schemaId: a } = this.opts;
  if (o = o || new Rs({ schema: r, schemaId: a, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const Hp = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Wp = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Jp = "object", Xp = [
  "$data"
], Yp = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, Qp = !1, Zp = {
  $id: Hp,
  description: Wp,
  type: Jp,
  required: Xp,
  properties: Yp,
  additionalProperties: Qp
};
var pa = {}, Is = { exports: {} };
const em = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), ku = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function Cu(e) {
  let t = "", r = 0, n = 0;
  for (n = 0; n < e.length; n++)
    if (r = e[n].charCodeAt(0), r !== 48) {
      if (!(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
        return "";
      t += e[n];
      break;
    }
  for (n += 1; n < e.length; n++) {
    if (r = e[n].charCodeAt(0), !(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
      return "";
    t += e[n];
  }
  return t;
}
const tm = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function tc(e) {
  return e.length = 0, !0;
}
function rm(e, t, r) {
  if (e.length) {
    const n = Cu(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function nm(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let o = !1, a = !1, l = rm;
  for (let i = 0; i < e.length; i++) {
    const f = e[i];
    if (!(f === "[" || f === "]"))
      if (f === ":") {
        if (o === !0 && (a = !0), !l(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        i > 0 && e[i - 1] === ":" && (o = !0), n.push(":");
        continue;
      } else if (f === "%") {
        if (!l(s, n, r))
          break;
        l = tc;
      } else {
        s.push(f);
        continue;
      }
  }
  return s.length && (l === tc ? r.zone = s.join("") : a ? n.push(s.join("")) : n.push(Cu(s))), r.address = n.join(""), r;
}
function ju(e) {
  if (sm(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = nm(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function sm(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function om(e) {
  let t = e;
  const r = [];
  let n = -1, s = 0;
  for (; s = t.length; ) {
    if (s === 1) {
      if (t === ".")
        break;
      if (t === "/") {
        r.push("/");
        break;
      } else {
        r.push(t);
        break;
      }
    } else if (s === 2) {
      if (t[0] === ".") {
        if (t[1] === ".")
          break;
        if (t[1] === "/") {
          t = t.slice(2);
          continue;
        }
      } else if (t[0] === "/" && (t[1] === "." || t[1] === "/")) {
        r.push("/");
        break;
      }
    } else if (s === 3 && t === "/..") {
      r.length !== 0 && r.pop(), r.push("/");
      break;
    }
    if (t[0] === ".") {
      if (t[1] === ".") {
        if (t[2] === "/") {
          t = t.slice(3);
          continue;
        }
      } else if (t[1] === "/") {
        t = t.slice(2);
        continue;
      }
    } else if (t[0] === "/" && t[1] === ".") {
      if (t[2] === "/") {
        t = t.slice(2);
        continue;
      } else if (t[2] === "." && t[3] === "/") {
        t = t.slice(3), r.length !== 0 && r.pop();
        continue;
      }
    }
    if ((n = t.indexOf("/", 1)) === -1) {
      r.push(t);
      break;
    } else
      r.push(t.slice(0, n)), t = t.slice(n);
  }
  return r.join("");
}
function am(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function im(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!ku(r)) {
      const n = ju(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Au = {
  nonSimpleDomain: tm,
  recomposeAuthority: im,
  normalizeComponentEncoding: am,
  removeDotSegments: om,
  isIPv4: ku,
  isUUID: em,
  normalizeIPv6: ju
};
const { isUUID: cm } = Au, lm = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Du(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function Lu(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Mu(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function um(e) {
  return e.secure = Du(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function fm(e) {
  if ((e.port === (Du(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function dm(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(lm);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, o = ma(s);
    e.path = void 0, o && (e = o.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function hm(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, o = ma(s);
  o && (e = o.serialize(e, t));
  const a = e, l = e.nss;
  return a.path = `${n || t.nid}:${l}`, t.skipEscape = !0, a;
}
function pm(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !cm(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function mm(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Fu = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: Lu,
    serialize: Mu
  }
), ym = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: Fu.domainHost,
    parse: Lu,
    serialize: Mu
  }
), Yn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: um,
    serialize: fm
  }
), _m = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Yn.domainHost,
    parse: Yn.parse,
    serialize: Yn.serialize
  }
), gm = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: dm,
    serialize: hm,
    skipNormalize: !0
  }
), $m = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: pm,
    serialize: mm,
    skipNormalize: !0
  }
), fs = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: Fu,
    https: ym,
    ws: Yn,
    wss: _m,
    urn: gm,
    "urn:uuid": $m
  }
);
Object.setPrototypeOf(fs, null);
function ma(e) {
  return e && (fs[
    /** @type {SchemeName} */
    e
  ] || fs[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var vm = {
  SCHEMES: fs,
  getSchemeHandler: ma
};
const { normalizeIPv6: Em, removeDotSegments: Qr, recomposeAuthority: wm, normalizeComponentEncoding: Pn, isIPv4: Sm, nonSimpleDomain: bm } = Au, { SCHEMES: Pm, getSchemeHandler: Uu } = vm;
function Om(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  $t(Nt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  Nt($t(e, t), t)), e;
}
function Nm(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Vu(Nt(e, n), Nt(t, n), n, !0);
  return n.skipEscape = !0, $t(s, n);
}
function Vu(e, t, r, n) {
  const s = {};
  return n || (e = Nt($t(e, r), r), t = Nt($t(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Qr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Qr(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Qr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Qr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function Rm(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = $t(Pn(Nt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = $t(Pn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = $t(Pn(Nt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = $t(Pn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function $t(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), s = [], o = Uu(n.scheme || r.scheme);
  o && o.serialize && o.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const a = wm(r);
  if (a !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(a), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let l = r.path;
    !n.absolutePath && (!o || !o.absolutePath) && (l = Qr(l)), a === void 0 && l[0] === "/" && l[1] === "/" && (l = "/%2F" + l.slice(2)), s.push(l);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const Tm = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Nt(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  };
  let s = !1;
  r.reference === "suffix" && (r.scheme ? e = r.scheme + ":" + e : e = "//" + e);
  const o = e.match(Tm);
  if (o) {
    if (n.scheme = o[1], n.userinfo = o[3], n.host = o[4], n.port = parseInt(o[5], 10), n.path = o[6] || "", n.query = o[7], n.fragment = o[8], isNaN(n.port) && (n.port = o[5]), n.host)
      if (Sm(n.host) === !1) {
        const i = Em(n.host);
        n.host = i.host.toLowerCase(), s = i.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const a = Uu(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!a || !a.unicodeSupport) && n.host && (r.domainHost || a && a.domainHost) && s === !1 && bm(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (l) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + l;
      }
    (!a || a && !a.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), a && a.parse && a.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const ya = {
  SCHEMES: Pm,
  normalize: Om,
  resolve: Nm,
  resolveComponent: Vu,
  equal: Rm,
  serialize: $t,
  parse: Nt
};
Is.exports = ya;
Is.exports.default = ya;
Is.exports.fastUri = ya;
var qu = Is.exports;
Object.defineProperty(pa, "__esModule", { value: !0 });
const zu = qu;
zu.code = 'require("ajv/dist/runtime/uri").default';
pa.default = zu;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = lt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ce;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = yn, s = Ar, o = ar, a = xe, l = ce, i = Ce, f = Se, u = G, h = Zp, w = pa, _ = (S, m) => new RegExp(S, m);
  _.code = "new RegExp";
  const E = ["removeAdditional", "useDefaults", "coerceTypes"], y = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), g = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, p = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, v = 200;
  function O(S) {
    var m, b, $, c, d, P, j, A, W, B, R, T, D, U, J, ne, $e, Le, Pe, Oe, ve, ht, Ae, xt, Bt;
    const Ze = S.strict, Kt = (m = S.code) === null || m === void 0 ? void 0 : m.optimize, zr = Kt === !0 || Kt === void 0 ? 1 : Kt || 0, Gr = ($ = (b = S.code) === null || b === void 0 ? void 0 : b.regExp) !== null && $ !== void 0 ? $ : _, Hs = (c = S.uriResolver) !== null && c !== void 0 ? c : w.default;
    return {
      strictSchema: (P = (d = S.strictSchema) !== null && d !== void 0 ? d : Ze) !== null && P !== void 0 ? P : !0,
      strictNumbers: (A = (j = S.strictNumbers) !== null && j !== void 0 ? j : Ze) !== null && A !== void 0 ? A : !0,
      strictTypes: (B = (W = S.strictTypes) !== null && W !== void 0 ? W : Ze) !== null && B !== void 0 ? B : "log",
      strictTuples: (T = (R = S.strictTuples) !== null && R !== void 0 ? R : Ze) !== null && T !== void 0 ? T : "log",
      strictRequired: (U = (D = S.strictRequired) !== null && D !== void 0 ? D : Ze) !== null && U !== void 0 ? U : !1,
      code: S.code ? { ...S.code, optimize: zr, regExp: Gr } : { optimize: zr, regExp: Gr },
      loopRequired: (J = S.loopRequired) !== null && J !== void 0 ? J : v,
      loopEnum: (ne = S.loopEnum) !== null && ne !== void 0 ? ne : v,
      meta: ($e = S.meta) !== null && $e !== void 0 ? $e : !0,
      messages: (Le = S.messages) !== null && Le !== void 0 ? Le : !0,
      inlineRefs: (Pe = S.inlineRefs) !== null && Pe !== void 0 ? Pe : !0,
      schemaId: (Oe = S.schemaId) !== null && Oe !== void 0 ? Oe : "$id",
      addUsedSchema: (ve = S.addUsedSchema) !== null && ve !== void 0 ? ve : !0,
      validateSchema: (ht = S.validateSchema) !== null && ht !== void 0 ? ht : !0,
      validateFormats: (Ae = S.validateFormats) !== null && Ae !== void 0 ? Ae : !0,
      unicodeRegExp: (xt = S.unicodeRegExp) !== null && xt !== void 0 ? xt : !0,
      int32range: (Bt = S.int32range) !== null && Bt !== void 0 ? Bt : !0,
      uriResolver: Hs
    };
  }
  class N {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...O(m) };
      const { es5: b, lines: $ } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: y, es5: b, lines: $ }), this.logger = Y(m.logger);
      const c = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, o.getRules)(), I.call(this, g, m, "NOT SUPPORTED"), I.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = K.call(this), m.formats && Z.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && V.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), z.call(this), m.validateFormats = c;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: b, schemaId: $ } = this.opts;
      let c = h;
      $ === "id" && (c = { ...h }, c.id = c.$id, delete c.$id), b && m && this.addMetaSchema(c, c[$], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: b } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[b] || m : void 0;
    }
    validate(m, b) {
      let $;
      if (typeof m == "string") {
        if ($ = this.getSchema(m), !$)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        $ = this.compile(m);
      const c = $(b);
      return "$async" in $ || (this.errors = $.errors), c;
    }
    compile(m, b) {
      const $ = this._addSchema(m, b);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(m, b) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return c.call(this, m, b);
      async function c(B, R) {
        await d.call(this, B.$schema);
        const T = this._addSchema(B, R);
        return T.validate || P.call(this, T);
      }
      async function d(B) {
        B && !this.getSchema(B) && await c.call(this, { $ref: B }, !0);
      }
      async function P(B) {
        try {
          return this._compileSchemaEnv(B);
        } catch (R) {
          if (!(R instanceof s.default))
            throw R;
          return j.call(this, R), await A.call(this, R.missingSchema), P.call(this, B);
        }
      }
      function j({ missingSchema: B, missingRef: R }) {
        if (this.refs[B])
          throw new Error(`AnySchema ${B} is loaded but ${R} cannot be resolved`);
      }
      async function A(B) {
        const R = await W.call(this, B);
        this.refs[B] || await d.call(this, R.$schema), this.refs[B] || this.addSchema(R, B, b);
      }
      async function W(B) {
        const R = this._loading[B];
        if (R)
          return R;
        try {
          return await (this._loading[B] = $(B));
        } finally {
          delete this._loading[B];
        }
      }
    }
    // Adds schema to the instance
    addSchema(m, b, $, c = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const P of m)
          this.addSchema(P, void 0, $, c);
        return this;
      }
      let d;
      if (typeof m == "object") {
        const { schemaId: P } = this.opts;
        if (d = m[P], d !== void 0 && typeof d != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return b = (0, i.normalizeId)(b || d), this._checkUnique(b), this.schemas[b] = this._addSchema(m, $, b, c, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, b, $ = this.opts.validateSchema) {
      return this.addSchema(m, b, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, b) {
      if (typeof m == "boolean")
        return !0;
      let $;
      if ($ = m.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const c = this.validate($, m);
      if (!c && b) {
        const d = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(d);
        else
          throw new Error(d);
      }
      return c;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(m) {
      let b;
      for (; typeof (b = F.call(this, m)) == "string"; )
        m = b;
      if (b === void 0) {
        const { schemaId: $ } = this.opts, c = new a.SchemaEnv({ schema: {}, schemaId: $ });
        if (b = a.resolveSchema.call(this, c, m), !b)
          return;
        this.refs[m] = b;
      }
      return b.validate || this._compileSchemaEnv(b);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(m) {
      if (m instanceof RegExp)
        return this._removeAllSchemas(this.schemas, m), this._removeAllSchemas(this.refs, m), this;
      switch (typeof m) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const b = F.call(this, m);
          return typeof b == "object" && this._cache.delete(b.schema), delete this.schemas[m], delete this.refs[m], this;
        }
        case "object": {
          const b = m;
          this._cache.delete(b);
          let $ = m[this.opts.schemaId];
          return $ && ($ = (0, i.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(m) {
      for (const b of m)
        this.addKeyword(b);
      return this;
    }
    addKeyword(m, b) {
      let $;
      if (typeof m == "string")
        $ = m, typeof b == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), b.keyword = $);
      else if (typeof m == "object" && b === void 0) {
        if (b = m, $ = b.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (L.call(this, $, b), !b)
        return (0, u.eachItem)($, (d) => M.call(this, d)), this;
      q.call(this, b);
      const c = {
        ...b,
        type: (0, f.getJSONTypes)(b.type),
        schemaType: (0, f.getJSONTypes)(b.schemaType)
      };
      return (0, u.eachItem)($, c.type.length === 0 ? (d) => M.call(this, d, c) : (d) => c.type.forEach((P) => M.call(this, d, c, P))), this;
    }
    getKeyword(m) {
      const b = this.RULES.all[m];
      return typeof b == "object" ? b.definition : !!b;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: b } = this;
      delete b.keywords[m], delete b.all[m];
      for (const $ of b.rules) {
        const c = $.rules.findIndex((d) => d.keyword === m);
        c >= 0 && $.rules.splice(c, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, b) {
      return typeof b == "string" && (b = new RegExp(b)), this.formats[m] = b, this;
    }
    errorsText(m = this.errors, { separator: b = ", ", dataVar: $ = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((c) => `${$}${c.instancePath} ${c.message}`).reduce((c, d) => c + b + d);
    }
    $dataMetaSchema(m, b) {
      const $ = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const c of b) {
        const d = c.split("/").slice(1);
        let P = m;
        for (const j of d)
          P = P[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: W } = A.definition, B = P[j];
          W && B && (P[j] = C(B));
        }
      }
      return m;
    }
    _removeAllSchemas(m, b) {
      for (const $ in m) {
        const c = m[$];
        (!b || b.test($)) && (typeof c == "string" ? delete m[$] : c && !c.meta && (this._cache.delete(c.schema), delete m[$]));
      }
    }
    _addSchema(m, b, $, c = this.opts.validateSchema, d = this.opts.addUsedSchema) {
      let P;
      const { schemaId: j } = this.opts;
      if (typeof m == "object")
        P = m[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof m != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(m);
      if (A !== void 0)
        return A;
      $ = (0, i.normalizeId)(P || $);
      const W = i.getSchemaRefs.call(this, m, $);
      return A = new a.SchemaEnv({ schema: m, schemaId: j, meta: b, baseId: $, localRefs: W }), this._cache.set(A.schema, A), d && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), c && this.validateSchema(m, !0), A;
    }
    _checkUnique(m) {
      if (this.schemas[m] || this.refs[m])
        throw new Error(`schema with key or id "${m}" already exists`);
    }
    _compileSchemaEnv(m) {
      if (m.meta ? this._compileMetaSchema(m) : a.compileSchema.call(this, m), !m.validate)
        throw new Error("ajv implementation error");
      return m.validate;
    }
    _compileMetaSchema(m) {
      const b = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, m);
      } finally {
        this.opts = b;
      }
    }
  }
  N.ValidationError = n.default, N.MissingRefError = s.default, e.default = N;
  function I(S, m, b, $ = "error") {
    for (const c in S) {
      const d = c;
      d in m && this.logger[$](`${b}: option ${c}. ${S[d]}`);
    }
  }
  function F(S) {
    return S = (0, i.normalizeId)(S), this.schemas[S] || this.refs[S];
  }
  function z() {
    const S = this.opts.schemas;
    if (S)
      if (Array.isArray(S))
        this.addSchema(S);
      else
        for (const m in S)
          this.addSchema(S[m], m);
  }
  function Z() {
    for (const S in this.opts.formats) {
      const m = this.opts.formats[S];
      m && this.addFormat(S, m);
    }
  }
  function V(S) {
    if (Array.isArray(S)) {
      this.addVocabulary(S);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in S) {
      const b = S[m];
      b.keyword || (b.keyword = m), this.addKeyword(b);
    }
  }
  function K() {
    const S = { ...this.opts };
    for (const m of E)
      delete S[m];
    return S;
  }
  const re = { log() {
  }, warn() {
  }, error() {
  } };
  function Y(S) {
    if (S === !1)
      return re;
    if (S === void 0)
      return console;
    if (S.log && S.warn && S.error)
      return S;
    throw new Error("logger must implement log, warn and error methods");
  }
  const ee = /^[a-z_$][a-z0-9_$:-]*$/i;
  function L(S, m) {
    const { RULES: b } = this;
    if ((0, u.eachItem)(S, ($) => {
      if (b.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!ee.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function M(S, m, b) {
    var $;
    const c = m == null ? void 0 : m.post;
    if (b && c)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: d } = this;
    let P = c ? d.post : d.rules.find(({ type: A }) => A === b);
    if (P || (P = { type: b, rules: [] }, d.rules.push(P)), d.keywords[S] = !0, !m)
      return;
    const j = {
      keyword: S,
      definition: {
        ...m,
        type: (0, f.getJSONTypes)(m.type),
        schemaType: (0, f.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? H.call(this, P, j, m.before) : P.rules.push(j), d.all[S] = j, ($ = m.implements) === null || $ === void 0 || $.forEach((A) => this.addKeyword(A));
  }
  function H(S, m, b) {
    const $ = S.rules.findIndex((c) => c.keyword === b);
    $ >= 0 ? S.rules.splice($, 0, m) : (S.rules.push(m), this.logger.warn(`rule ${b} is not defined`));
  }
  function q(S) {
    let { metaSchema: m } = S;
    m !== void 0 && (S.$data && this.opts.$data && (m = C(m)), S.validateSchema = this.compile(m, !0));
  }
  const k = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function C(S) {
    return { anyOf: [S, k] };
  }
})(Zl);
var _a = {}, ga = {}, $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
const Im = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
$a.default = Im;
var ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.callRef = ir.getValidate = void 0;
const km = Ar, rc = ie, ze = ce, dr = vt, nc = xe, On = G, Cm = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: o, validateName: a, opts: l, self: i } = n, { root: f } = o;
    if ((r === "#" || r === "#/") && s === f.baseId)
      return h();
    const u = nc.resolveRef.call(i, f, s, r);
    if (u === void 0)
      throw new km.default(n.opts.uriResolver, s, r);
    if (u instanceof nc.SchemaEnv)
      return w(u);
    return _(u);
    function h() {
      if (o === f)
        return Qn(e, a, o, o.$async);
      const E = t.scopeValue("root", { ref: f });
      return Qn(e, (0, ze._)`${E}.validate`, f, f.$async);
    }
    function w(E) {
      const y = Gu(e, E);
      Qn(e, y, E, E.$async);
    }
    function _(E) {
      const y = t.scopeValue("schema", l.code.source === !0 ? { ref: E, code: (0, ze.stringify)(E) } : { ref: E }), g = t.name("valid"), p = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: ze.nil,
        topSchemaRef: y,
        errSchemaPath: r
      }, g);
      e.mergeEvaluated(p), e.ok(g);
    }
  }
};
function Gu(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, ze._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
ir.getValidate = Gu;
function Qn(e, t, r, n) {
  const { gen: s, it: o } = e, { allErrors: a, schemaEnv: l, opts: i } = o, f = i.passContext ? dr.default.this : ze.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, ze._)`await ${(0, rc.callValidateCode)(e, t, f)}`), _(t), a || s.assign(E, !0);
    }, (y) => {
      s.if((0, ze._)`!(${y} instanceof ${o.ValidationError})`, () => s.throw(y)), w(y), a || s.assign(E, !1);
    }), e.ok(E);
  }
  function h() {
    e.result((0, rc.callValidateCode)(e, t, f), () => _(t), () => w(t));
  }
  function w(E) {
    const y = (0, ze._)`${E}.errors`;
    s.assign(dr.default.vErrors, (0, ze._)`${dr.default.vErrors} === null ? ${y} : ${dr.default.vErrors}.concat(${y})`), s.assign(dr.default.errors, (0, ze._)`${dr.default.vErrors}.length`);
  }
  function _(E) {
    var y;
    if (!o.opts.unevaluated)
      return;
    const g = (y = r == null ? void 0 : r.validate) === null || y === void 0 ? void 0 : y.evaluated;
    if (o.props !== !0)
      if (g && !g.dynamicProps)
        g.props !== void 0 && (o.props = On.mergeEvaluated.props(s, g.props, o.props));
      else {
        const p = s.var("props", (0, ze._)`${E}.evaluated.props`);
        o.props = On.mergeEvaluated.props(s, p, o.props, ze.Name);
      }
    if (o.items !== !0)
      if (g && !g.dynamicItems)
        g.items !== void 0 && (o.items = On.mergeEvaluated.items(s, g.items, o.items));
      else {
        const p = s.var("items", (0, ze._)`${E}.evaluated.items`);
        o.items = On.mergeEvaluated.items(s, p, o.items, ze.Name);
      }
  }
}
ir.callRef = Qn;
ir.default = Cm;
Object.defineProperty(ga, "__esModule", { value: !0 });
const jm = $a, Am = ir, Dm = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  jm.default,
  Am.default
];
ga.default = Dm;
var va = {}, Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
const ds = ce, kt = ds.operators, hs = {
  maximum: { okStr: "<=", ok: kt.LTE, fail: kt.GT },
  minimum: { okStr: ">=", ok: kt.GTE, fail: kt.LT },
  exclusiveMaximum: { okStr: "<", ok: kt.LT, fail: kt.GTE },
  exclusiveMinimum: { okStr: ">", ok: kt.GT, fail: kt.LTE }
}, Lm = {
  message: ({ keyword: e, schemaCode: t }) => (0, ds.str)`must be ${hs[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, ds._)`{comparison: ${hs[e].okStr}, limit: ${t}}`
}, Mm = {
  keyword: Object.keys(hs),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Lm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, ds._)`${r} ${hs[t].fail} ${n} || isNaN(${r})`);
  }
};
Ea.default = Mm;
var wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
const nn = ce, Fm = {
  message: ({ schemaCode: e }) => (0, nn.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, nn._)`{multipleOf: ${e}}`
}, Um = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Fm,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, o = s.opts.multipleOfPrecision, a = t.let("res"), l = o ? (0, nn._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, nn._)`${a} !== parseInt(${a})`;
    e.fail$data((0, nn._)`(${n} === 0 || (${a} = ${r}/${n}, ${l}))`);
  }
};
wa.default = Um;
var Sa = {}, ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
function xu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
ba.default = xu;
xu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Sa, "__esModule", { value: !0 });
const rr = ce, Vm = G, qm = ba, zm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, rr.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, rr._)`{limit: ${e}}`
}, Gm = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: zm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, o = t === "maxLength" ? rr.operators.GT : rr.operators.LT, a = s.opts.unicode === !1 ? (0, rr._)`${r}.length` : (0, rr._)`${(0, Vm.useFunc)(e.gen, qm.default)}(${r})`;
    e.fail$data((0, rr._)`${a} ${o} ${n}`);
  }
};
Sa.default = Gm;
var Pa = {};
Object.defineProperty(Pa, "__esModule", { value: !0 });
const xm = ie, ps = ce, Bm = {
  message: ({ schemaCode: e }) => (0, ps.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, ps._)`{pattern: ${e}}`
}, Km = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Bm,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: o } = e, a = o.opts.unicodeRegExp ? "u" : "", l = r ? (0, ps._)`(new RegExp(${s}, ${a}))` : (0, xm.usePattern)(e, n);
    e.fail$data((0, ps._)`!${l}.test(${t})`);
  }
};
Pa.default = Km;
var Oa = {};
Object.defineProperty(Oa, "__esModule", { value: !0 });
const sn = ce, Hm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, sn.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, sn._)`{limit: ${e}}`
}, Wm = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Hm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? sn.operators.GT : sn.operators.LT;
    e.fail$data((0, sn._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Oa.default = Wm;
var Na = {};
Object.defineProperty(Na, "__esModule", { value: !0 });
const Br = ie, on = ce, Jm = G, Xm = {
  message: ({ params: { missingProperty: e } }) => (0, on.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, on._)`{missingProperty: ${e}}`
}, Ym = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Xm,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: o, it: a } = e, { opts: l } = a;
    if (!o && r.length === 0)
      return;
    const i = r.length >= l.loopRequired;
    if (a.allErrors ? f() : u(), l.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const y of r)
        if ((_ == null ? void 0 : _[y]) === void 0 && !E.has(y)) {
          const g = a.schemaEnv.baseId + a.errSchemaPath, p = `required property "${y}" is not defined at "${g}" (strictRequired)`;
          (0, Jm.checkStrictMode)(a, p, a.opts.strictRequired);
        }
    }
    function f() {
      if (i || o)
        e.block$data(on.nil, h);
      else
        for (const _ of r)
          (0, Br.checkReportMissingProp)(e, _);
    }
    function u() {
      const _ = t.let("missing");
      if (i || o) {
        const E = t.let("valid", !0);
        e.block$data(E, () => w(_, E)), e.ok(E);
      } else
        t.if((0, Br.checkMissingProp)(e, r, _)), (0, Br.reportMissingProp)(e, _), t.else();
    }
    function h() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Br.noPropertyInData)(t, s, _, l.ownProperties), () => e.error());
      });
    }
    function w(_, E) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(E, (0, Br.propertyInData)(t, s, _, l.ownProperties)), t.if((0, on.not)(E), () => {
          e.error(), t.break();
        });
      }, on.nil);
    }
  }
};
Na.default = Ym;
var Ra = {};
Object.defineProperty(Ra, "__esModule", { value: !0 });
const an = ce, Qm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, an.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, an._)`{limit: ${e}}`
}, Zm = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Qm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? an.operators.GT : an.operators.LT;
    e.fail$data((0, an._)`${r}.length ${s} ${n}`);
  }
};
Ra.default = Zm;
var Ta = {}, _n = {};
Object.defineProperty(_n, "__esModule", { value: !0 });
const Bu = Ns;
Bu.code = 'require("ajv/dist/runtime/equal").default';
_n.default = Bu;
Object.defineProperty(Ta, "__esModule", { value: !0 });
const Ys = Se, Te = ce, ey = G, ty = _n, ry = {
  message: ({ params: { i: e, j: t } }) => (0, Te.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Te._)`{i: ${e}, j: ${t}}`
}, ny = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: ry,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: o, schemaCode: a, it: l } = e;
    if (!n && !s)
      return;
    const i = t.let("valid"), f = o.items ? (0, Ys.getSchemaTypes)(o.items) : [];
    e.block$data(i, u, (0, Te._)`${a} === false`), e.ok(i);
    function u() {
      const E = t.let("i", (0, Te._)`${r}.length`), y = t.let("j");
      e.setParams({ i: E, j: y }), t.assign(i, !0), t.if((0, Te._)`${E} > 1`, () => (h() ? w : _)(E, y));
    }
    function h() {
      return f.length > 0 && !f.some((E) => E === "object" || E === "array");
    }
    function w(E, y) {
      const g = t.name("item"), p = (0, Ys.checkDataTypes)(f, g, l.opts.strictNumbers, Ys.DataType.Wrong), v = t.const("indices", (0, Te._)`{}`);
      t.for((0, Te._)`;${E}--;`, () => {
        t.let(g, (0, Te._)`${r}[${E}]`), t.if(p, (0, Te._)`continue`), f.length > 1 && t.if((0, Te._)`typeof ${g} == "string"`, (0, Te._)`${g} += "_"`), t.if((0, Te._)`typeof ${v}[${g}] == "number"`, () => {
          t.assign(y, (0, Te._)`${v}[${g}]`), e.error(), t.assign(i, !1).break();
        }).code((0, Te._)`${v}[${g}] = ${E}`);
      });
    }
    function _(E, y) {
      const g = (0, ey.useFunc)(t, ty.default), p = t.name("outer");
      t.label(p).for((0, Te._)`;${E}--;`, () => t.for((0, Te._)`${y} = ${E}; ${y}--;`, () => t.if((0, Te._)`${g}(${r}[${E}], ${r}[${y}])`, () => {
        e.error(), t.assign(i, !1).break(p);
      })));
    }
  }
};
Ta.default = ny;
var Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
const Oo = ce, sy = G, oy = _n, ay = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Oo._)`{allowedValue: ${e}}`
}, iy = {
  keyword: "const",
  $data: !0,
  error: ay,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, Oo._)`!${(0, sy.useFunc)(t, oy.default)}(${r}, ${s})`) : e.fail((0, Oo._)`${o} !== ${r}`);
  }
};
Ia.default = iy;
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const Zr = ce, cy = G, ly = _n, uy = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Zr._)`{allowedValues: ${e}}`
}, fy = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: uy,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: o, it: a } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= a.opts.loopEnum;
    let i;
    const f = () => i ?? (i = (0, cy.useFunc)(t, ly.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", o);
      u = (0, Zr.or)(...s.map((E, y) => w(_, y)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", o, (_) => t.if((0, Zr._)`${f()}(${r}, ${_})`, () => t.assign(u, !0).break()));
    }
    function w(_, E) {
      const y = s[E];
      return typeof y == "object" && y !== null ? (0, Zr._)`${f()}(${r}, ${_}[${E}])` : (0, Zr._)`${r} === ${y}`;
    }
  }
};
ka.default = fy;
Object.defineProperty(va, "__esModule", { value: !0 });
const dy = Ea, hy = wa, py = Sa, my = Pa, yy = Oa, _y = Na, gy = Ra, $y = Ta, vy = Ia, Ey = ka, wy = [
  // number
  dy.default,
  hy.default,
  // string
  py.default,
  my.default,
  // object
  yy.default,
  _y.default,
  // array
  gy.default,
  $y.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  vy.default,
  Ey.default
];
va.default = wy;
var Ca = {}, Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.validateAdditionalItems = void 0;
const nr = ce, No = G, Sy = {
  message: ({ params: { len: e } }) => (0, nr.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, nr._)`{limit: ${e}}`
}, by = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Sy,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, No.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Ku(e, n);
  }
};
function Ku(e, t) {
  const { gen: r, schema: n, data: s, keyword: o, it: a } = e;
  a.items = !0;
  const l = r.const("len", (0, nr._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, nr._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, No.alwaysValidSchema)(a, n)) {
    const f = r.var("valid", (0, nr._)`${l} <= ${t.length}`);
    r.if((0, nr.not)(f), () => i(f)), e.ok(f);
  }
  function i(f) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: o, dataProp: u, dataPropType: No.Type.Num }, f), a.allErrors || r.if((0, nr.not)(f), () => r.break());
    });
  }
}
Dr.validateAdditionalItems = Ku;
Dr.default = by;
var ja = {}, Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.validateTuple = void 0;
const sc = ce, Zn = G, Py = ie, Oy = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Hu(e, "additionalItems", t);
    r.items = !0, !(0, Zn.alwaysValidSchema)(r, t) && e.ok((0, Py.validateArray)(e));
  }
};
function Hu(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: o, keyword: a, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = Zn.mergeEvaluated.items(n, r.length, l.items));
  const i = n.name("valid"), f = n.const("len", (0, sc._)`${o}.length`);
  r.forEach((h, w) => {
    (0, Zn.alwaysValidSchema)(l, h) || (n.if((0, sc._)`${f} > ${w}`, () => e.subschema({
      keyword: a,
      schemaProp: w,
      dataProp: w
    }, i)), e.ok(i));
  });
  function u(h) {
    const { opts: w, errSchemaPath: _ } = l, E = r.length, y = E === h.minItems && (E === h.maxItems || h[t] === !1);
    if (w.strictTuples && !y) {
      const g = `"${a}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Zn.checkStrictMode)(l, g, w.strictTuples);
    }
  }
}
Lr.validateTuple = Hu;
Lr.default = Oy;
Object.defineProperty(ja, "__esModule", { value: !0 });
const Ny = Lr, Ry = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Ny.validateTuple)(e, "items")
};
ja.default = Ry;
var Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const oc = ce, Ty = G, Iy = ie, ky = Dr, Cy = {
  message: ({ params: { len: e } }) => (0, oc.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, oc._)`{limit: ${e}}`
}, jy = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Cy,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Ty.alwaysValidSchema)(n, t) && (s ? (0, ky.validateAdditionalItems)(e, s) : e.ok((0, Iy.validateArray)(e)));
  }
};
Aa.default = jy;
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const Ye = ce, Nn = G, Ay = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ye.str)`must contain at least ${e} valid item(s)` : (0, Ye.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ye._)`{minContains: ${e}}` : (0, Ye._)`{minContains: ${e}, maxContains: ${t}}`
}, Dy = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Ay,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    let a, l;
    const { minContains: i, maxContains: f } = n;
    o.opts.next ? (a = i === void 0 ? 1 : i, l = f) : a = 1;
    const u = t.const("len", (0, Ye._)`${s}.length`);
    if (e.setParams({ min: a, max: l }), l === void 0 && a === 0) {
      (0, Nn.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && a > l) {
      (0, Nn.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Nn.alwaysValidSchema)(o, r)) {
      let y = (0, Ye._)`${u} >= ${a}`;
      l !== void 0 && (y = (0, Ye._)`${y} && ${u} <= ${l}`), e.pass(y);
      return;
    }
    o.items = !0;
    const h = t.name("valid");
    l === void 0 && a === 1 ? _(h, () => t.if(h, () => t.break())) : a === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, Ye._)`${s}.length > 0`, w)) : (t.let(h, !1), w()), e.result(h, () => e.reset());
    function w() {
      const y = t.name("_valid"), g = t.let("count", 0);
      _(y, () => t.if(y, () => E(g)));
    }
    function _(y, g) {
      t.forRange("i", 0, u, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: Nn.Type.Num,
          compositeRule: !0
        }, y), g();
      });
    }
    function E(y) {
      t.code((0, Ye._)`${y}++`), l === void 0 ? t.if((0, Ye._)`${y} >= ${a}`, () => t.assign(h, !0).break()) : (t.if((0, Ye._)`${y} > ${l}`, () => t.assign(h, !1).break()), a === 1 ? t.assign(h, !0) : t.if((0, Ye._)`${y} >= ${a}`, () => t.assign(h, !0)));
    }
  }
};
Da.default = Dy;
var Wu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ce, r = G, n = ie;
  e.error = {
    message: ({ params: { property: i, depsCount: f, deps: u } }) => {
      const h = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${i} is present`;
    },
    params: ({ params: { property: i, depsCount: f, deps: u, missingProperty: h } }) => (0, t._)`{property: ${i},
    missingProperty: ${h},
    depsCount: ${f},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(i) {
      const [f, u] = o(i);
      a(i, f), l(i, u);
    }
  };
  function o({ schema: i }) {
    const f = {}, u = {};
    for (const h in i) {
      if (h === "__proto__")
        continue;
      const w = Array.isArray(i[h]) ? f : u;
      w[h] = i[h];
    }
    return [f, u];
  }
  function a(i, f = i.schema) {
    const { gen: u, data: h, it: w } = i;
    if (Object.keys(f).length === 0)
      return;
    const _ = u.let("missing");
    for (const E in f) {
      const y = f[E];
      if (y.length === 0)
        continue;
      const g = (0, n.propertyInData)(u, h, E, w.opts.ownProperties);
      i.setParams({
        property: E,
        depsCount: y.length,
        deps: y.join(", ")
      }), w.allErrors ? u.if(g, () => {
        for (const p of y)
          (0, n.checkReportMissingProp)(i, p);
      }) : (u.if((0, t._)`${g} && (${(0, n.checkMissingProp)(i, y, _)})`), (0, n.reportMissingProp)(i, _), u.else());
    }
  }
  e.validatePropertyDeps = a;
  function l(i, f = i.schema) {
    const { gen: u, data: h, keyword: w, it: _ } = i, E = u.name("valid");
    for (const y in f)
      (0, r.alwaysValidSchema)(_, f[y]) || (u.if(
        (0, n.propertyInData)(u, h, y, _.opts.ownProperties),
        () => {
          const g = i.subschema({ keyword: w, schemaProp: y }, E);
          i.mergeValidEvaluated(g, E);
        },
        () => u.var(E, !0)
        // TODO var
      ), i.ok(E));
  }
  e.validateSchemaDeps = l, e.default = s;
})(Wu);
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const Ju = ce, Ly = G, My = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Ju._)`{propertyName: ${e.propertyName}}`
}, Fy = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: My,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Ly.alwaysValidSchema)(s, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, o), t.if((0, Ju.not)(o), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
La.default = Fy;
var ks = {};
Object.defineProperty(ks, "__esModule", { value: !0 });
const Rn = ie, st = ce, Uy = vt, Tn = G, Vy = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, st._)`{additionalProperty: ${e.additionalProperty}}`
}, qy = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Vy,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: o, it: a } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: i } = a;
    if (a.props = !0, i.removeAdditional !== "all" && (0, Tn.alwaysValidSchema)(a, r))
      return;
    const f = (0, Rn.allSchemaProperties)(n.properties), u = (0, Rn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, st._)`${o} === ${Uy.default.errors}`);
    function h() {
      t.forIn("key", s, (g) => {
        !f.length && !u.length ? E(g) : t.if(w(g), () => E(g));
      });
    }
    function w(g) {
      let p;
      if (f.length > 8) {
        const v = (0, Tn.schemaRefOrVal)(a, n.properties, "properties");
        p = (0, Rn.isOwnProperty)(t, v, g);
      } else f.length ? p = (0, st.or)(...f.map((v) => (0, st._)`${g} === ${v}`)) : p = st.nil;
      return u.length && (p = (0, st.or)(p, ...u.map((v) => (0, st._)`${(0, Rn.usePattern)(e, v)}.test(${g})`))), (0, st.not)(p);
    }
    function _(g) {
      t.code((0, st._)`delete ${s}[${g}]`);
    }
    function E(g) {
      if (i.removeAdditional === "all" || i.removeAdditional && r === !1) {
        _(g);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: g }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Tn.alwaysValidSchema)(a, r)) {
        const p = t.name("valid");
        i.removeAdditional === "failing" ? (y(g, p, !1), t.if((0, st.not)(p), () => {
          e.reset(), _(g);
        })) : (y(g, p), l || t.if((0, st.not)(p), () => t.break()));
      }
    }
    function y(g, p, v) {
      const O = {
        keyword: "additionalProperties",
        dataProp: g,
        dataPropType: Tn.Type.Str
      };
      v === !1 && Object.assign(O, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(O, p);
    }
  }
};
ks.default = qy;
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const zy = lt, ac = ie, Qs = G, ic = ks, Gy = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && ic.default.code(new zy.KeywordCxt(o, ic.default, "additionalProperties"));
    const a = (0, ac.allSchemaProperties)(r);
    for (const h of a)
      o.definedProperties.add(h);
    o.opts.unevaluated && a.length && o.props !== !0 && (o.props = Qs.mergeEvaluated.props(t, (0, Qs.toHash)(a), o.props));
    const l = a.filter((h) => !(0, Qs.alwaysValidSchema)(o, r[h]));
    if (l.length === 0)
      return;
    const i = t.name("valid");
    for (const h of l)
      f(h) ? u(h) : (t.if((0, ac.propertyInData)(t, s, h, o.opts.ownProperties)), u(h), o.allErrors || t.else().var(i, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(i);
    function f(h) {
      return o.opts.useDefaults && !o.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, i);
    }
  }
};
Ma.default = Gy;
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const cc = ie, In = ce, lc = G, uc = G, xy = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: o } = e, { opts: a } = o, l = (0, cc.allSchemaProperties)(r), i = l.filter((y) => (0, lc.alwaysValidSchema)(o, r[y]));
    if (l.length === 0 || i.length === l.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && s.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof In.Name) && (o.props = (0, uc.evaluatedPropsToName)(t, o.props));
    const { props: h } = o;
    w();
    function w() {
      for (const y of l)
        f && _(y), o.allErrors ? E(y) : (t.var(u, !0), E(y), t.if(u));
    }
    function _(y) {
      for (const g in f)
        new RegExp(y).test(g) && (0, lc.checkStrictMode)(o, `property ${g} matches pattern ${y} (use allowMatchingProperties)`);
    }
    function E(y) {
      t.forIn("key", n, (g) => {
        t.if((0, In._)`${(0, cc.usePattern)(e, y)}.test(${g})`, () => {
          const p = i.includes(y);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: y,
            dataProp: g,
            dataPropType: uc.Type.Str
          }, u), o.opts.unevaluated && h !== !0 ? t.assign((0, In._)`${h}[${g}]`, !0) : !p && !o.allErrors && t.if((0, In.not)(u), () => t.break());
        });
      });
    }
  }
};
Fa.default = xy;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const By = G, Ky = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, By.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Ua.default = Ky;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const Hy = ie, Wy = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Hy.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Va.default = Wy;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const es = ce, Jy = G, Xy = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, es._)`{passingSchemas: ${e.passing}}`
}, Yy = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Xy,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const o = r, a = t.let("valid", !1), l = t.let("passing", null), i = t.name("_valid");
    e.setParams({ passing: l }), t.block(f), e.result(a, () => e.reset(), () => e.error(!0));
    function f() {
      o.forEach((u, h) => {
        let w;
        (0, Jy.alwaysValidSchema)(s, u) ? t.var(i, !0) : w = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, i), h > 0 && t.if((0, es._)`${i} && ${a}`).assign(a, !1).assign(l, (0, es._)`[${l}, ${h}]`).else(), t.if(i, () => {
          t.assign(a, !0), t.assign(l, h), w && e.mergeEvaluated(w, es.Name);
        });
      });
    }
  }
};
qa.default = Yy;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Qy = G, Zy = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((o, a) => {
      if ((0, Qy.alwaysValidSchema)(n, o))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: a }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
za.default = Zy;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const ms = ce, Xu = G, e_ = {
  message: ({ params: e }) => (0, ms.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, ms._)`{failingKeyword: ${e.ifClause}}`
}, t_ = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: e_,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Xu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = fc(n, "then"), o = fc(n, "else");
    if (!s && !o)
      return;
    const a = t.let("valid", !0), l = t.name("_valid");
    if (i(), e.reset(), s && o) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, f("then", u), f("else", u));
    } else s ? t.if(l, f("then")) : t.if((0, ms.not)(l), f("else"));
    e.pass(a, () => e.error(!0));
    function i() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function f(u, h) {
      return () => {
        const w = e.subschema({ keyword: u }, l);
        t.assign(a, l), e.mergeValidEvaluated(w, a), h ? t.assign(h, (0, ms._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function fc(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Xu.alwaysValidSchema)(e, r);
}
Ga.default = t_;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const r_ = G, n_ = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, r_.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
xa.default = n_;
Object.defineProperty(Ca, "__esModule", { value: !0 });
const s_ = Dr, o_ = ja, a_ = Lr, i_ = Aa, c_ = Da, l_ = Wu, u_ = La, f_ = ks, d_ = Ma, h_ = Fa, p_ = Ua, m_ = Va, y_ = qa, __ = za, g_ = Ga, $_ = xa;
function v_(e = !1) {
  const t = [
    // any
    p_.default,
    m_.default,
    y_.default,
    __.default,
    g_.default,
    $_.default,
    // object
    u_.default,
    f_.default,
    l_.default,
    d_.default,
    h_.default
  ];
  return e ? t.push(o_.default, i_.default) : t.push(s_.default, a_.default), t.push(c_.default), t;
}
Ca.default = v_;
var Ba = {}, Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const Ee = ce, E_ = {
  message: ({ schemaCode: e }) => (0, Ee.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Ee._)`{format: ${e}}`
}, w_ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: E_,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: o, schemaCode: a, it: l } = e, { opts: i, errSchemaPath: f, schemaEnv: u, self: h } = l;
    if (!i.validateFormats)
      return;
    s ? w() : _();
    function w() {
      const E = r.scopeValue("formats", {
        ref: h.formats,
        code: i.code.formats
      }), y = r.const("fDef", (0, Ee._)`${E}[${a}]`), g = r.let("fType"), p = r.let("format");
      r.if((0, Ee._)`typeof ${y} == "object" && !(${y} instanceof RegExp)`, () => r.assign(g, (0, Ee._)`${y}.type || "string"`).assign(p, (0, Ee._)`${y}.validate`), () => r.assign(g, (0, Ee._)`"string"`).assign(p, y)), e.fail$data((0, Ee.or)(v(), O()));
      function v() {
        return i.strictSchema === !1 ? Ee.nil : (0, Ee._)`${a} && !${p}`;
      }
      function O() {
        const N = u.$async ? (0, Ee._)`(${y}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, Ee._)`${p}(${n})`, I = (0, Ee._)`(typeof ${p} == "function" ? ${N} : ${p}.test(${n}))`;
        return (0, Ee._)`${p} && ${p} !== true && ${g} === ${t} && !${I}`;
      }
    }
    function _() {
      const E = h.formats[o];
      if (!E) {
        v();
        return;
      }
      if (E === !0)
        return;
      const [y, g, p] = O(E);
      y === t && e.pass(N());
      function v() {
        if (i.strictSchema === !1) {
          h.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${o}" ignored in schema at path "${f}"`;
        }
      }
      function O(I) {
        const F = I instanceof RegExp ? (0, Ee.regexpCode)(I) : i.code.formats ? (0, Ee._)`${i.code.formats}${(0, Ee.getProperty)(o)}` : void 0, z = r.scopeValue("formats", { key: o, ref: I, code: F });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, Ee._)`${z}.validate`] : ["string", I, z];
      }
      function N() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, Ee._)`await ${p}(${n})`;
        }
        return typeof g == "function" ? (0, Ee._)`${p}(${n})` : (0, Ee._)`${p}.test(${n})`;
      }
    }
  }
};
Ka.default = w_;
Object.defineProperty(Ba, "__esModule", { value: !0 });
const S_ = Ka, b_ = [S_.default];
Ba.default = b_;
var kr = {};
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.contentVocabulary = kr.metadataVocabulary = void 0;
kr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
kr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(_a, "__esModule", { value: !0 });
const P_ = ga, O_ = va, N_ = Ca, R_ = Ba, dc = kr, T_ = [
  P_.default,
  O_.default,
  (0, N_.default)(),
  R_.default,
  dc.metadataVocabulary,
  dc.contentVocabulary
];
_a.default = T_;
var Ha = {}, Cs = {};
Object.defineProperty(Cs, "__esModule", { value: !0 });
Cs.DiscrError = void 0;
var hc;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(hc || (Cs.DiscrError = hc = {}));
Object.defineProperty(Ha, "__esModule", { value: !0 });
const _r = ce, Ro = Cs, pc = xe, I_ = Ar, k_ = G, C_ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ro.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, _r._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, j_ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: C_,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: o } = e, { oneOf: a } = s;
    if (!o.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!a)
      throw new Error("discriminator: requires oneOf keyword");
    const i = t.let("valid", !1), f = t.const("tag", (0, _r._)`${r}${(0, _r.getProperty)(l)}`);
    t.if((0, _r._)`typeof ${f} == "string"`, () => u(), () => e.error(!1, { discrError: Ro.DiscrError.Tag, tag: f, tagName: l })), e.ok(i);
    function u() {
      const _ = w();
      t.if(!1);
      for (const E in _)
        t.elseIf((0, _r._)`${f} === ${E}`), t.assign(i, h(_[E]));
      t.else(), e.error(!1, { discrError: Ro.DiscrError.Mapping, tag: f, tagName: l }), t.endIf();
    }
    function h(_) {
      const E = t.name("valid"), y = e.subschema({ keyword: "oneOf", schemaProp: _ }, E);
      return e.mergeEvaluated(y, _r.Name), E;
    }
    function w() {
      var _;
      const E = {}, y = p(s);
      let g = !0;
      for (let N = 0; N < a.length; N++) {
        let I = a[N];
        if (I != null && I.$ref && !(0, k_.schemaHasRulesButRef)(I, o.self.RULES)) {
          const z = I.$ref;
          if (I = pc.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, z), I instanceof pc.SchemaEnv && (I = I.schema), I === void 0)
            throw new I_.default(o.opts.uriResolver, o.baseId, z);
        }
        const F = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[l];
        if (typeof F != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        g = g && (y || p(I)), v(F, N);
      }
      if (!g)
        throw new Error(`discriminator: "${l}" must be required`);
      return E;
      function p({ required: N }) {
        return Array.isArray(N) && N.includes(l);
      }
      function v(N, I) {
        if (N.const)
          O(N.const, I);
        else if (N.enum)
          for (const F of N.enum)
            O(F, I);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function O(N, I) {
        if (typeof N != "string" || N in E)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        E[N] = I;
      }
    }
  }
};
Ha.default = j_;
const A_ = "http://json-schema.org/draft-07/schema#", D_ = "http://json-schema.org/draft-07/schema#", L_ = "Core schema meta-schema", M_ = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, F_ = [
  "object",
  "boolean"
], U_ = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, V_ = {
  $schema: A_,
  $id: D_,
  title: L_,
  definitions: M_,
  type: F_,
  properties: U_,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Zl, n = _a, s = Ha, o = V_, a = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class i extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(o, a) : o;
      this.addMetaSchema(E, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = i, e.exports = t = i, e.exports.Ajv = i, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = i;
  var f = lt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return f.KeywordCxt;
  } });
  var u = ce;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var h = yn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var w = Ar;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return w.default;
  } });
})(Eo, Eo.exports);
var q_ = Eo.exports, To = { exports: {} }, Yu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(V, K) {
    return { validate: V, compare: K };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(o, a),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(i, f),
    "date-time": t(h, w),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: y,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: Z,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: p,
    // signed 32 bit integer
    int32: { type: "number", validate: N },
    // signed 64 bit integer
    int64: { type: "number", validate: I },
    // C-type float
    float: { type: "number", validate: F },
    // C-type double
    double: { type: "number", validate: F },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, a),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, f),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, w),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(V) {
    return V % 4 === 0 && (V % 100 !== 0 || V % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function o(V) {
    const K = n.exec(V);
    if (!K)
      return !1;
    const re = +K[1], Y = +K[2], ee = +K[3];
    return Y >= 1 && Y <= 12 && ee >= 1 && ee <= (Y === 2 && r(re) ? 29 : s[Y]);
  }
  function a(V, K) {
    if (V && K)
      return V > K ? 1 : V < K ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function i(V, K) {
    const re = l.exec(V);
    if (!re)
      return !1;
    const Y = +re[1], ee = +re[2], L = +re[3], M = re[5];
    return (Y <= 23 && ee <= 59 && L <= 59 || Y === 23 && ee === 59 && L === 60) && (!K || M !== "");
  }
  function f(V, K) {
    if (!(V && K))
      return;
    const re = l.exec(V), Y = l.exec(K);
    if (re && Y)
      return V = re[1] + re[2] + re[3] + (re[4] || ""), K = Y[1] + Y[2] + Y[3] + (Y[4] || ""), V > K ? 1 : V < K ? -1 : 0;
  }
  const u = /t|\s/i;
  function h(V) {
    const K = V.split(u);
    return K.length === 2 && o(K[0]) && i(K[1], !0);
  }
  function w(V, K) {
    if (!(V && K))
      return;
    const [re, Y] = V.split(u), [ee, L] = K.split(u), M = a(re, ee);
    if (M !== void 0)
      return M || f(Y, L);
  }
  const _ = /\/|:/, E = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function y(V) {
    return _.test(V) && E.test(V);
  }
  const g = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function p(V) {
    return g.lastIndex = 0, g.test(V);
  }
  const v = -2147483648, O = 2 ** 31 - 1;
  function N(V) {
    return Number.isInteger(V) && V <= O && V >= v;
  }
  function I(V) {
    return Number.isInteger(V);
  }
  function F() {
    return !0;
  }
  const z = /[^\\]\\Z/;
  function Z(V) {
    if (z.test(V))
      return !1;
    try {
      return new RegExp(V), !0;
    } catch {
      return !1;
    }
  }
})(Yu);
var Qu = {}, Io = { exports: {} }, Zu = {}, Et = {}, Jt = {}, gn = {}, ae = {}, hn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(v) {
      if (super(), !e.IDENTIFIER.test(v))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = v;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(v) {
      super(), this._items = typeof v == "string" ? [v] : v;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const v = this._items[0];
      return v === "" || v === '""';
    }
    get str() {
      var v;
      return (v = this._str) !== null && v !== void 0 ? v : this._str = this._items.reduce((O, N) => `${O}${N}`, "");
    }
    get names() {
      var v;
      return (v = this._names) !== null && v !== void 0 ? v : this._names = this._items.reduce((O, N) => (N instanceof r && (O[N.str] = (O[N.str] || 0) + 1), O), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...v) {
    const O = [p[0]];
    let N = 0;
    for (; N < v.length; )
      l(O, v[N]), O.push(p[++N]);
    return new n(O);
  }
  e._ = s;
  const o = new n("+");
  function a(p, ...v) {
    const O = [_(p[0])];
    let N = 0;
    for (; N < v.length; )
      O.push(o), l(O, v[N]), O.push(o, _(p[++N]));
    return i(O), new n(O);
  }
  e.str = a;
  function l(p, v) {
    v instanceof n ? p.push(...v._items) : v instanceof r ? p.push(v) : p.push(h(v));
  }
  e.addCodeArg = l;
  function i(p) {
    let v = 1;
    for (; v < p.length - 1; ) {
      if (p[v] === o) {
        const O = f(p[v - 1], p[v + 1]);
        if (O !== void 0) {
          p.splice(v - 1, 3, O);
          continue;
        }
        p[v++] = "+";
      }
      v++;
    }
  }
  function f(p, v) {
    if (v === '""')
      return p;
    if (p === '""')
      return v;
    if (typeof p == "string")
      return v instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof v != "string" ? `${p.slice(0, -1)}${v}"` : v[0] === '"' ? p.slice(0, -1) + v.slice(1) : void 0;
    if (typeof v == "string" && v[0] === '"' && !(p instanceof r))
      return `"${p}${v.slice(1)}`;
  }
  function u(p, v) {
    return v.emptyStr() ? p : p.emptyStr() ? v : a`${p}${v}`;
  }
  e.strConcat = u;
  function h(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : _(Array.isArray(p) ? p.join(",") : p);
  }
  function w(p) {
    return new n(_(p));
  }
  e.stringify = w;
  function _(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function E(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = E;
  function y(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = y;
  function g(p) {
    return new n(p.toString());
  }
  e.regexpCode = g;
})(hn);
var ko = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = hn;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
    }
  }
  var n;
  (function(i) {
    i[i.Started = 0] = "Started", i[i.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: f, parent: u } = {}) {
      this._names = {}, this._prefixes = f, this._parent = u;
    }
    toName(f) {
      return f instanceof t.Name ? f : this.name(f);
    }
    name(f) {
      return new t.Name(this._newName(f));
    }
    _newName(f) {
      const u = this._names[f] || this._nameGroup(f);
      return `${f}${u.index++}`;
    }
    _nameGroup(f) {
      var u, h;
      if (!((h = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || h === void 0) && h.has(f) || this._prefixes && !this._prefixes.has(f))
        throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
      return this._names[f] = { prefix: f, index: 0 };
    }
  }
  e.Scope = s;
  class o extends t.Name {
    constructor(f, u) {
      super(u), this.prefix = f;
    }
    setValue(f, { property: u, itemIndex: h }) {
      this.value = f, this.scopePath = (0, t._)`.${new t.Name(u)}[${h}]`;
    }
  }
  e.ValueScopeName = o;
  const a = (0, t._)`\n`;
  class l extends s {
    constructor(f) {
      super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? a : t.nil };
    }
    get() {
      return this._scope;
    }
    name(f) {
      return new o(f, this._newName(f));
    }
    value(f, u) {
      var h;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const w = this.toName(f), { prefix: _ } = w, E = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let y = this._values[_];
      if (y) {
        const v = y.get(E);
        if (v)
          return v;
      } else
        y = this._values[_] = /* @__PURE__ */ new Map();
      y.set(E, w);
      const g = this._scope[_] || (this._scope[_] = []), p = g.length;
      return g[p] = u.ref, w.setValue(u, { property: _, itemIndex: p }), w;
    }
    getValue(f, u) {
      const h = this._values[f];
      if (h)
        return h.get(u);
    }
    scopeRefs(f, u = this._values) {
      return this._reduceValues(u, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${f}${h.scopePath}`;
      });
    }
    scopeCode(f = this._values, u, h) {
      return this._reduceValues(f, (w) => {
        if (w.value === void 0)
          throw new Error(`CodeGen: name "${w}" has no value`);
        return w.value.code;
      }, u, h);
    }
    _reduceValues(f, u, h = {}, w) {
      let _ = t.nil;
      for (const E in f) {
        const y = f[E];
        if (!y)
          continue;
        const g = h[E] = h[E] || /* @__PURE__ */ new Map();
        y.forEach((p) => {
          if (g.has(p))
            return;
          g.set(p, n.Started);
          let v = u(p);
          if (v) {
            const O = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${O} ${p} = ${v};${this.opts._n}`;
          } else if (v = w == null ? void 0 : w(p))
            _ = (0, t._)`${_}${v}${this.opts._n}`;
          else
            throw new r(p);
          g.set(p, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = l;
})(ko);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = hn, r = ko;
  var n = hn;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = ko;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class o {
    optimizeNodes() {
      return this;
    }
    optimizeNames(c, d) {
      return this;
    }
  }
  class a extends o {
    constructor(c, d, P) {
      super(), this.varKind = c, this.name = d, this.rhs = P;
    }
    render({ es5: c, _n: d }) {
      const P = c ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${j};` + d;
    }
    optimizeNames(c, d) {
      if (c[this.name.str])
        return this.rhs && (this.rhs = L(this.rhs, c, d)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends o {
    constructor(c, d, P) {
      super(), this.lhs = c, this.rhs = d, this.sideEffects = P;
    }
    render({ _n: c }) {
      return `${this.lhs} = ${this.rhs};` + c;
    }
    optimizeNames(c, d) {
      if (!(this.lhs instanceof t.Name && !c[this.lhs.str] && !this.sideEffects))
        return this.rhs = L(this.rhs, c, d), this;
    }
    get names() {
      const c = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return ee(c, this.rhs);
    }
  }
  class i extends l {
    constructor(c, d, P, j) {
      super(c, P, j), this.op = d;
    }
    render({ _n: c }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + c;
    }
  }
  class f extends o {
    constructor(c) {
      super(), this.label = c, this.names = {};
    }
    render({ _n: c }) {
      return `${this.label}:` + c;
    }
  }
  class u extends o {
    constructor(c) {
      super(), this.label = c, this.names = {};
    }
    render({ _n: c }) {
      return `break${this.label ? ` ${this.label}` : ""};` + c;
    }
  }
  class h extends o {
    constructor(c) {
      super(), this.error = c;
    }
    render({ _n: c }) {
      return `throw ${this.error};` + c;
    }
    get names() {
      return this.error.names;
    }
  }
  class w extends o {
    constructor(c) {
      super(), this.code = c;
    }
    render({ _n: c }) {
      return `${this.code};` + c;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(c, d) {
      return this.code = L(this.code, c, d), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends o {
    constructor(c = []) {
      super(), this.nodes = c;
    }
    render(c) {
      return this.nodes.reduce((d, P) => d + P.render(c), "");
    }
    optimizeNodes() {
      const { nodes: c } = this;
      let d = c.length;
      for (; d--; ) {
        const P = c[d].optimizeNodes();
        Array.isArray(P) ? c.splice(d, 1, ...P) : P ? c[d] = P : c.splice(d, 1);
      }
      return c.length > 0 ? this : void 0;
    }
    optimizeNames(c, d) {
      const { nodes: P } = this;
      let j = P.length;
      for (; j--; ) {
        const A = P[j];
        A.optimizeNames(c, d) || (M(c, A.names), P.splice(j, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((c, d) => Y(c, d.names), {});
    }
  }
  class E extends _ {
    render(c) {
      return "{" + c._n + super.render(c) + "}" + c._n;
    }
  }
  class y extends _ {
  }
  class g extends E {
  }
  g.kind = "else";
  class p extends E {
    constructor(c, d) {
      super(d), this.condition = c;
    }
    render(c) {
      let d = `if(${this.condition})` + super.render(c);
      return this.else && (d += "else " + this.else.render(c)), d;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const c = this.condition;
      if (c === !0)
        return this.nodes;
      let d = this.else;
      if (d) {
        const P = d.optimizeNodes();
        d = this.else = Array.isArray(P) ? new g(P) : P;
      }
      if (d)
        return c === !1 ? d instanceof p ? d : d.nodes : this.nodes.length ? this : new p(H(c), d instanceof p ? [d] : d.nodes);
      if (!(c === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(c, d) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(c, d), !!(super.optimizeNames(c, d) || this.else))
        return this.condition = L(this.condition, c, d), this;
    }
    get names() {
      const c = super.names;
      return ee(c, this.condition), this.else && Y(c, this.else.names), c;
    }
  }
  p.kind = "if";
  class v extends E {
  }
  v.kind = "for";
  class O extends v {
    constructor(c) {
      super(), this.iteration = c;
    }
    render(c) {
      return `for(${this.iteration})` + super.render(c);
    }
    optimizeNames(c, d) {
      if (super.optimizeNames(c, d))
        return this.iteration = L(this.iteration, c, d), this;
    }
    get names() {
      return Y(super.names, this.iteration.names);
    }
  }
  class N extends v {
    constructor(c, d, P, j) {
      super(), this.varKind = c, this.name = d, this.from = P, this.to = j;
    }
    render(c) {
      const d = c.es5 ? r.varKinds.var : this.varKind, { name: P, from: j, to: A } = this;
      return `for(${d} ${P}=${j}; ${P}<${A}; ${P}++)` + super.render(c);
    }
    get names() {
      const c = ee(super.names, this.from);
      return ee(c, this.to);
    }
  }
  class I extends v {
    constructor(c, d, P, j) {
      super(), this.loop = c, this.varKind = d, this.name = P, this.iterable = j;
    }
    render(c) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(c);
    }
    optimizeNames(c, d) {
      if (super.optimizeNames(c, d))
        return this.iterable = L(this.iterable, c, d), this;
    }
    get names() {
      return Y(super.names, this.iterable.names);
    }
  }
  class F extends E {
    constructor(c, d, P) {
      super(), this.name = c, this.args = d, this.async = P;
    }
    render(c) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(c);
    }
  }
  F.kind = "func";
  class z extends _ {
    render(c) {
      return "return " + super.render(c);
    }
  }
  z.kind = "return";
  class Z extends E {
    render(c) {
      let d = "try" + super.render(c);
      return this.catch && (d += this.catch.render(c)), this.finally && (d += this.finally.render(c)), d;
    }
    optimizeNodes() {
      var c, d;
      return super.optimizeNodes(), (c = this.catch) === null || c === void 0 || c.optimizeNodes(), (d = this.finally) === null || d === void 0 || d.optimizeNodes(), this;
    }
    optimizeNames(c, d) {
      var P, j;
      return super.optimizeNames(c, d), (P = this.catch) === null || P === void 0 || P.optimizeNames(c, d), (j = this.finally) === null || j === void 0 || j.optimizeNames(c, d), this;
    }
    get names() {
      const c = super.names;
      return this.catch && Y(c, this.catch.names), this.finally && Y(c, this.finally.names), c;
    }
  }
  class V extends E {
    constructor(c) {
      super(), this.error = c;
    }
    render(c) {
      return `catch(${this.error})` + super.render(c);
    }
  }
  V.kind = "catch";
  class K extends E {
    render(c) {
      return "finally" + super.render(c);
    }
  }
  K.kind = "finally";
  class re {
    constructor(c, d = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...d, _n: d.lines ? `
` : "" }, this._extScope = c, this._scope = new r.Scope({ parent: c }), this._nodes = [new y()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(c) {
      return this._scope.name(c);
    }
    // reserves unique name in the external scope
    scopeName(c) {
      return this._extScope.name(c);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(c, d) {
      const P = this._extScope.value(c, d);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
    }
    getScopeValue(c, d) {
      return this._extScope.getValue(c, d);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(c) {
      return this._extScope.scopeRefs(c, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(c, d, P, j) {
      const A = this._scope.toName(d);
      return P !== void 0 && j && (this._constants[A.str] = P), this._leafNode(new a(c, A, P)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(c, d, P) {
      return this._def(r.varKinds.const, c, d, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(c, d, P) {
      return this._def(r.varKinds.let, c, d, P);
    }
    // `var` declaration with optional assignment
    var(c, d, P) {
      return this._def(r.varKinds.var, c, d, P);
    }
    // assignment code
    assign(c, d, P) {
      return this._leafNode(new l(c, d, P));
    }
    // `+=` code
    add(c, d) {
      return this._leafNode(new i(c, e.operators.ADD, d));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
      return typeof c == "function" ? c() : c !== t.nil && this._leafNode(new w(c)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...c) {
      const d = ["{"];
      for (const [P, j] of c)
        d.length > 1 && d.push(","), d.push(P), (P !== j || this.opts.es5) && (d.push(":"), (0, t.addCodeArg)(d, j));
      return d.push("}"), new t._Code(d);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(c, d, P) {
      if (this._blockNode(new p(c)), d && P)
        this.code(d).else().code(P).endIf();
      else if (d)
        this.code(d).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(c) {
      return this._elseNode(new p(c));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new g());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, g);
    }
    _for(c, d) {
      return this._blockNode(c), d && this.code(d).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(c, d) {
      return this._for(new O(c), d);
    }
    // `for` statement for a range of values
    forRange(c, d, P, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const W = this._scope.toName(c);
      return this._for(new N(A, W, d, P), () => j(W));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(c, d, P, j = r.varKinds.const) {
      const A = this._scope.toName(c);
      if (this.opts.es5) {
        const W = d instanceof t.Name ? d : this.var("_arr", d);
        return this.forRange("_i", 0, (0, t._)`${W}.length`, (B) => {
          this.var(A, (0, t._)`${W}[${B}]`), P(A);
        });
      }
      return this._for(new I("of", j, A, d), () => P(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(c, d, P, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(c, (0, t._)`Object.keys(${d})`, P);
      const A = this._scope.toName(c);
      return this._for(new I("in", j, A, d), () => P(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(v);
    }
    // `label` statement
    label(c) {
      return this._leafNode(new f(c));
    }
    // `break` statement
    break(c) {
      return this._leafNode(new u(c));
    }
    // `return` statement
    return(c) {
      const d = new z();
      if (this._blockNode(d), this.code(c), d.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(z);
    }
    // `try` statement
    try(c, d, P) {
      if (!d && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new Z();
      if (this._blockNode(j), this.code(c), d) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), d(A);
      }
      return P && (this._currNode = j.finally = new K(), this.code(P)), this._endBlockNode(V, K);
    }
    // `throw` statement
    throw(c) {
      return this._leafNode(new h(c));
    }
    // start self-balancing block
    block(c, d) {
      return this._blockStarts.push(this._nodes.length), c && this.code(c).endBlock(d), this;
    }
    // end the current self-balancing block
    endBlock(c) {
      const d = this._blockStarts.pop();
      if (d === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const P = this._nodes.length - d;
      if (P < 0 || c !== void 0 && P !== c)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${c} expected`);
      return this._nodes.length = d, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(c, d = t.nil, P, j) {
      return this._blockNode(new F(c, d, P)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(F);
    }
    optimize(c = 1) {
      for (; c-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(c) {
      return this._currNode.nodes.push(c), this;
    }
    _blockNode(c) {
      this._currNode.nodes.push(c), this._nodes.push(c);
    }
    _endBlockNode(c, d) {
      const P = this._currNode;
      if (P instanceof c || d && P instanceof d)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${d ? `${c.kind}/${d.kind}` : c.kind}"`);
    }
    _elseNode(c) {
      const d = this._currNode;
      if (!(d instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = d.else = c, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const c = this._nodes;
      return c[c.length - 1];
    }
    set _currNode(c) {
      const d = this._nodes;
      d[d.length - 1] = c;
    }
  }
  e.CodeGen = re;
  function Y($, c) {
    for (const d in c)
      $[d] = ($[d] || 0) + (c[d] || 0);
    return $;
  }
  function ee($, c) {
    return c instanceof t._CodeOrName ? Y($, c.names) : $;
  }
  function L($, c, d) {
    if ($ instanceof t.Name)
      return P($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, W) => (W instanceof t.Name && (W = P(W)), W instanceof t._Code ? A.push(...W._items) : A.push(W), A), []));
    function P(A) {
      const W = d[A.str];
      return W === void 0 || c[A.str] !== 1 ? A : (delete c[A.str], W);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((W) => W instanceof t.Name && c[W.str] === 1 && d[W.str] !== void 0);
    }
  }
  function M($, c) {
    for (const d in c)
      $[d] = ($[d] || 0) - (c[d] || 0);
  }
  function H($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${b($)}`;
  }
  e.not = H;
  const q = m(e.operators.AND);
  function k(...$) {
    return $.reduce(q);
  }
  e.and = k;
  const C = m(e.operators.OR);
  function S(...$) {
    return $.reduce(C);
  }
  e.or = S;
  function m($) {
    return (c, d) => c === t.nil ? d : d === t.nil ? c : (0, t._)`${b(c)} ${$} ${b(d)}`;
  }
  function b($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(ae);
var x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.checkStrictMode = x.getErrorPath = x.Type = x.useFunc = x.setEvaluated = x.evaluatedPropsToName = x.mergeEvaluated = x.eachItem = x.unescapeJsonPointer = x.escapeJsonPointer = x.escapeFragment = x.unescapeFragment = x.schemaRefOrVal = x.schemaHasRulesButRef = x.schemaHasRules = x.checkUnknownRules = x.alwaysValidSchema = x.toHash = void 0;
const pe = ae, z_ = hn;
function G_(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
x.toHash = G_;
function x_(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (ef(e, t), !tf(t, e.self.RULES.all));
}
x.alwaysValidSchema = x_;
function ef(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const o in t)
    s[o] || sf(e, `unknown keyword: "${o}"`);
}
x.checkUnknownRules = ef;
function tf(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
x.schemaHasRules = tf;
function B_(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
x.schemaHasRulesButRef = B_;
function K_({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, pe._)`${r}`;
  }
  return (0, pe._)`${e}${t}${(0, pe.getProperty)(n)}`;
}
x.schemaRefOrVal = K_;
function H_(e) {
  return rf(decodeURIComponent(e));
}
x.unescapeFragment = H_;
function W_(e) {
  return encodeURIComponent(Wa(e));
}
x.escapeFragment = W_;
function Wa(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
x.escapeJsonPointer = Wa;
function rf(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
x.unescapeJsonPointer = rf;
function J_(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
x.eachItem = J_;
function mc({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, o, a, l) => {
    const i = a === void 0 ? o : a instanceof pe.Name ? (o instanceof pe.Name ? e(s, o, a) : t(s, o, a), a) : o instanceof pe.Name ? (t(s, a, o), o) : r(o, a);
    return l === pe.Name && !(i instanceof pe.Name) ? n(s, i) : i;
  };
}
x.mergeEvaluated = {
  props: mc({
    mergeNames: (e, t, r) => e.if((0, pe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, pe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, pe._)`${r} || {}`).code((0, pe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, pe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, pe._)`${r} || {}`), Ja(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: nf
  }),
  items: mc({
    mergeNames: (e, t, r) => e.if((0, pe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, pe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, pe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, pe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function nf(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, pe._)`{}`);
  return t !== void 0 && Ja(e, r, t), r;
}
x.evaluatedPropsToName = nf;
function Ja(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, pe._)`${t}${(0, pe.getProperty)(n)}`, !0));
}
x.setEvaluated = Ja;
const yc = {};
function X_(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: yc[t.code] || (yc[t.code] = new z_._Code(t.code))
  });
}
x.useFunc = X_;
var Co;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Co || (x.Type = Co = {}));
function Y_(e, t, r) {
  if (e instanceof pe.Name) {
    const n = t === Co.Num;
    return r ? n ? (0, pe._)`"[" + ${e} + "]"` : (0, pe._)`"['" + ${e} + "']"` : n ? (0, pe._)`"/" + ${e}` : (0, pe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, pe.getProperty)(e).toString() : "/" + Wa(e);
}
x.getErrorPath = Y_;
function sf(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
x.checkStrictMode = sf;
var kn = {}, _c;
function zt() {
  if (_c) return kn;
  _c = 1, Object.defineProperty(kn, "__esModule", { value: !0 });
  const e = ae, t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return kn.default = t, kn;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ae, r = x, n = zt();
  e.keywordError = {
    message: ({ keyword: g }) => (0, t.str)`must pass "${g}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: g, schemaType: p }) => p ? (0, t.str)`"${g}" keyword must be ${p} ($data)` : (0, t.str)`"${g}" keyword is invalid ($data)`
  };
  function s(g, p = e.keywordError, v, O) {
    const { it: N } = g, { gen: I, compositeRule: F, allErrors: z } = N, Z = h(g, p, v);
    O ?? (F || z) ? i(I, Z) : f(N, (0, t._)`[${Z}]`);
  }
  e.reportError = s;
  function o(g, p = e.keywordError, v) {
    const { it: O } = g, { gen: N, compositeRule: I, allErrors: F } = O, z = h(g, p, v);
    i(N, z), I || F || f(O, n.default.vErrors);
  }
  e.reportExtraError = o;
  function a(g, p) {
    g.assign(n.default.errors, p), g.if((0, t._)`${n.default.vErrors} !== null`, () => g.if(p, () => g.assign((0, t._)`${n.default.vErrors}.length`, p), () => g.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function l({ gen: g, keyword: p, schemaValue: v, data: O, errsCount: N, it: I }) {
    if (N === void 0)
      throw new Error("ajv implementation error");
    const F = g.name("err");
    g.forRange("i", N, n.default.errors, (z) => {
      g.const(F, (0, t._)`${n.default.vErrors}[${z}]`), g.if((0, t._)`${F}.instancePath === undefined`, () => g.assign((0, t._)`${F}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), g.assign((0, t._)`${F}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && (g.assign((0, t._)`${F}.schema`, v), g.assign((0, t._)`${F}.data`, O));
    });
  }
  e.extendErrors = l;
  function i(g, p) {
    const v = g.const("err", p);
    g.if((0, t._)`${n.default.vErrors} === null`, () => g.assign(n.default.vErrors, (0, t._)`[${v}]`), (0, t._)`${n.default.vErrors}.push(${v})`), g.code((0, t._)`${n.default.errors}++`);
  }
  function f(g, p) {
    const { gen: v, validateName: O, schemaEnv: N } = g;
    N.$async ? v.throw((0, t._)`new ${g.ValidationError}(${p})`) : (v.assign((0, t._)`${O}.errors`, p), v.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function h(g, p, v) {
    const { createErrors: O } = g.it;
    return O === !1 ? (0, t._)`{}` : w(g, p, v);
  }
  function w(g, p, v = {}) {
    const { gen: O, it: N } = g, I = [
      _(N, v),
      E(g, v)
    ];
    return y(g, p, I), O.object(...I);
  }
  function _({ errorPath: g }, { instancePath: p }) {
    const v = p ? (0, t.str)`${g}${(0, r.getErrorPath)(p, r.Type.Str)}` : g;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, v)];
  }
  function E({ keyword: g, it: { errSchemaPath: p } }, { schemaPath: v, parentSchema: O }) {
    let N = O ? p : (0, t.str)`${p}/${g}`;
    return v && (N = (0, t.str)`${N}${(0, r.getErrorPath)(v, r.Type.Str)}`), [u.schemaPath, N];
  }
  function y(g, { params: p, message: v }, O) {
    const { keyword: N, data: I, schemaValue: F, it: z } = g, { opts: Z, propertyName: V, topSchemaRef: K, schemaPath: re } = z;
    O.push([u.keyword, N], [u.params, typeof p == "function" ? p(g) : p || (0, t._)`{}`]), Z.messages && O.push([u.message, typeof v == "function" ? v(g) : v]), Z.verbose && O.push([u.schema, F], [u.parentSchema, (0, t._)`${K}${re}`], [n.default.data, I]), V && O.push([u.propertyName, V]);
  }
})(gn);
var gc;
function Q_() {
  if (gc) return Jt;
  gc = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.boolOrEmptySchema = Jt.topBoolOrEmptySchema = void 0;
  const e = gn, t = ae, r = zt(), n = {
    message: "boolean schema is false"
  };
  function s(l) {
    const { gen: i, schema: f, validateName: u } = l;
    f === !1 ? a(l, !1) : typeof f == "object" && f.$async === !0 ? i.return(r.default.data) : (i.assign((0, t._)`${u}.errors`, null), i.return(!0));
  }
  Jt.topBoolOrEmptySchema = s;
  function o(l, i) {
    const { gen: f, schema: u } = l;
    u === !1 ? (f.var(i, !1), a(l)) : f.var(i, !0);
  }
  Jt.boolOrEmptySchema = o;
  function a(l, i) {
    const { gen: f, data: u } = l, h = {
      gen: f,
      keyword: "false schema",
      data: u,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: l
    };
    (0, e.reportError)(h, n, void 0, i);
  }
  return Jt;
}
var be = {}, cr = {};
Object.defineProperty(cr, "__esModule", { value: !0 });
cr.getRules = cr.isJSONType = void 0;
const Z_ = ["string", "number", "integer", "boolean", "null", "object", "array"], eg = new Set(Z_);
function tg(e) {
  return typeof e == "string" && eg.has(e);
}
cr.isJSONType = tg;
function rg() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
cr.getRules = rg;
var wt = {}, $c;
function of() {
  if ($c) return wt;
  $c = 1, Object.defineProperty(wt, "__esModule", { value: !0 }), wt.shouldUseRule = wt.shouldUseGroup = wt.schemaHasRulesForType = void 0;
  function e({ schema: n, self: s }, o) {
    const a = s.RULES.types[o];
    return a && a !== !0 && t(n, a);
  }
  wt.schemaHasRulesForType = e;
  function t(n, s) {
    return s.rules.some((o) => r(n, o));
  }
  wt.shouldUseGroup = t;
  function r(n, s) {
    var o;
    return n[s.keyword] !== void 0 || ((o = s.definition.implements) === null || o === void 0 ? void 0 : o.some((a) => n[a] !== void 0));
  }
  return wt.shouldUseRule = r, wt;
}
Object.defineProperty(be, "__esModule", { value: !0 });
be.reportTypeError = be.checkDataTypes = be.checkDataType = be.coerceAndCheckDataType = be.getJSONTypes = be.getSchemaTypes = be.DataType = void 0;
const ng = cr, sg = of(), og = gn, oe = ae, af = x;
var br;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(br || (be.DataType = br = {}));
function ag(e) {
  const t = cf(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
be.getSchemaTypes = ag;
function cf(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(ng.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
be.getJSONTypes = cf;
function ig(e, t) {
  const { gen: r, data: n, opts: s } = e, o = cg(t, s.coerceTypes), a = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, sg.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const l = Xa(t, n, s.strictNumbers, br.Wrong);
    r.if(l, () => {
      o.length ? lg(e, t, o) : Ya(e);
    });
  }
  return a;
}
be.coerceAndCheckDataType = ig;
const lf = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function cg(e, t) {
  return t ? e.filter((r) => lf.has(r) || t === "array" && r === "array") : [];
}
function lg(e, t, r) {
  const { gen: n, data: s, opts: o } = e, a = n.let("dataType", (0, oe._)`typeof ${s}`), l = n.let("coerced", (0, oe._)`undefined`);
  o.coerceTypes === "array" && n.if((0, oe._)`${a} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, oe._)`${s}[0]`).assign(a, (0, oe._)`typeof ${s}`).if(Xa(t, s, o.strictNumbers), () => n.assign(l, s))), n.if((0, oe._)`${l} !== undefined`);
  for (const f of r)
    (lf.has(f) || f === "array" && o.coerceTypes === "array") && i(f);
  n.else(), Ya(e), n.endIf(), n.if((0, oe._)`${l} !== undefined`, () => {
    n.assign(s, l), ug(e, l);
  });
  function i(f) {
    switch (f) {
      case "string":
        n.elseIf((0, oe._)`${a} == "number" || ${a} == "boolean"`).assign(l, (0, oe._)`"" + ${s}`).elseIf((0, oe._)`${s} === null`).assign(l, (0, oe._)`""`);
        return;
      case "number":
        n.elseIf((0, oe._)`${a} == "boolean" || ${s} === null
              || (${a} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, oe._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, oe._)`${a} === "boolean" || ${s} === null
              || (${a} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, oe._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, oe._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, oe._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, oe._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, oe._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${s} === null`).assign(l, (0, oe._)`[${s}]`);
    }
  }
}
function ug({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, oe._)`${t} !== undefined`, () => e.assign((0, oe._)`${t}[${r}]`, n));
}
function jo(e, t, r, n = br.Correct) {
  const s = n === br.Correct ? oe.operators.EQ : oe.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, oe._)`${t} ${s} null`;
    case "array":
      o = (0, oe._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, oe._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = a((0, oe._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = a();
      break;
    default:
      return (0, oe._)`typeof ${t} ${s} ${e}`;
  }
  return n === br.Correct ? o : (0, oe.not)(o);
  function a(l = oe.nil) {
    return (0, oe.and)((0, oe._)`typeof ${t} == "number"`, l, r ? (0, oe._)`isFinite(${t})` : oe.nil);
  }
}
be.checkDataType = jo;
function Xa(e, t, r, n) {
  if (e.length === 1)
    return jo(e[0], t, r, n);
  let s;
  const o = (0, af.toHash)(e);
  if (o.array && o.object) {
    const a = (0, oe._)`typeof ${t} != "object"`;
    s = o.null ? a : (0, oe._)`!${t} || ${a}`, delete o.null, delete o.array, delete o.object;
  } else
    s = oe.nil;
  o.number && delete o.integer;
  for (const a in o)
    s = (0, oe.and)(s, jo(a, t, r, n));
  return s;
}
be.checkDataTypes = Xa;
const fg = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, oe._)`{type: ${e}}` : (0, oe._)`{type: ${t}}`
};
function Ya(e) {
  const t = dg(e);
  (0, og.reportError)(t, fg);
}
be.reportTypeError = Ya;
function dg(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, af.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Kr = {}, vc;
function hg() {
  if (vc) return Kr;
  vc = 1, Object.defineProperty(Kr, "__esModule", { value: !0 }), Kr.assignDefaults = void 0;
  const e = ae, t = x;
  function r(s, o) {
    const { properties: a, items: l } = s.schema;
    if (o === "object" && a)
      for (const i in a)
        n(s, i, a[i].default);
    else o === "array" && Array.isArray(l) && l.forEach((i, f) => n(s, f, i.default));
  }
  Kr.assignDefaults = r;
  function n(s, o, a) {
    const { gen: l, compositeRule: i, data: f, opts: u } = s;
    if (a === void 0)
      return;
    const h = (0, e._)`${f}${(0, e.getProperty)(o)}`;
    if (i) {
      (0, t.checkStrictMode)(s, `default is ignored for: ${h}`);
      return;
    }
    let w = (0, e._)`${h} === undefined`;
    u.useDefaults === "empty" && (w = (0, e._)`${w} || ${h} === null || ${h} === ""`), l.if(w, (0, e._)`${h} = ${(0, e.stringify)(a)}`);
  }
  return Kr;
}
var tt = {}, de = {}, Ec;
function ut() {
  if (Ec) return de;
  Ec = 1, Object.defineProperty(de, "__esModule", { value: !0 }), de.validateUnion = de.validateArray = de.usePattern = de.callValidateCode = de.schemaProperties = de.allSchemaProperties = de.noPropertyInData = de.propertyInData = de.isOwnProperty = de.hasPropFunc = de.reportMissingProp = de.checkMissingProp = de.checkReportMissingProp = void 0;
  const e = ae, t = x, r = zt(), n = x;
  function s(v, O) {
    const { gen: N, data: I, it: F } = v;
    N.if(u(N, I, O, F.opts.ownProperties), () => {
      v.setParams({ missingProperty: (0, e._)`${O}` }, !0), v.error();
    });
  }
  de.checkReportMissingProp = s;
  function o({ gen: v, data: O, it: { opts: N } }, I, F) {
    return (0, e.or)(...I.map((z) => (0, e.and)(u(v, O, z, N.ownProperties), (0, e._)`${F} = ${z}`)));
  }
  de.checkMissingProp = o;
  function a(v, O) {
    v.setParams({ missingProperty: O }, !0), v.error();
  }
  de.reportMissingProp = a;
  function l(v) {
    return v.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  de.hasPropFunc = l;
  function i(v, O, N) {
    return (0, e._)`${l(v)}.call(${O}, ${N})`;
  }
  de.isOwnProperty = i;
  function f(v, O, N, I) {
    const F = (0, e._)`${O}${(0, e.getProperty)(N)} !== undefined`;
    return I ? (0, e._)`${F} && ${i(v, O, N)}` : F;
  }
  de.propertyInData = f;
  function u(v, O, N, I) {
    const F = (0, e._)`${O}${(0, e.getProperty)(N)} === undefined`;
    return I ? (0, e.or)(F, (0, e.not)(i(v, O, N))) : F;
  }
  de.noPropertyInData = u;
  function h(v) {
    return v ? Object.keys(v).filter((O) => O !== "__proto__") : [];
  }
  de.allSchemaProperties = h;
  function w(v, O) {
    return h(O).filter((N) => !(0, t.alwaysValidSchema)(v, O[N]));
  }
  de.schemaProperties = w;
  function _({ schemaCode: v, data: O, it: { gen: N, topSchemaRef: I, schemaPath: F, errorPath: z }, it: Z }, V, K, re) {
    const Y = re ? (0, e._)`${v}, ${O}, ${I}${F}` : O, ee = [
      [r.default.instancePath, (0, e.strConcat)(r.default.instancePath, z)],
      [r.default.parentData, Z.parentData],
      [r.default.parentDataProperty, Z.parentDataProperty],
      [r.default.rootData, r.default.rootData]
    ];
    Z.opts.dynamicRef && ee.push([r.default.dynamicAnchors, r.default.dynamicAnchors]);
    const L = (0, e._)`${Y}, ${N.object(...ee)}`;
    return K !== e.nil ? (0, e._)`${V}.call(${K}, ${L})` : (0, e._)`${V}(${L})`;
  }
  de.callValidateCode = _;
  const E = (0, e._)`new RegExp`;
  function y({ gen: v, it: { opts: O } }, N) {
    const I = O.unicodeRegExp ? "u" : "", { regExp: F } = O.code, z = F(N, I);
    return v.scopeValue("pattern", {
      key: z.toString(),
      ref: z,
      code: (0, e._)`${F.code === "new RegExp" ? E : (0, n.useFunc)(v, F)}(${N}, ${I})`
    });
  }
  de.usePattern = y;
  function g(v) {
    const { gen: O, data: N, keyword: I, it: F } = v, z = O.name("valid");
    if (F.allErrors) {
      const V = O.let("valid", !0);
      return Z(() => O.assign(V, !1)), V;
    }
    return O.var(z, !0), Z(() => O.break()), z;
    function Z(V) {
      const K = O.const("len", (0, e._)`${N}.length`);
      O.forRange("i", 0, K, (re) => {
        v.subschema({
          keyword: I,
          dataProp: re,
          dataPropType: t.Type.Num
        }, z), O.if((0, e.not)(z), V);
      });
    }
  }
  de.validateArray = g;
  function p(v) {
    const { gen: O, schema: N, keyword: I, it: F } = v;
    if (!Array.isArray(N))
      throw new Error("ajv implementation error");
    if (N.some((K) => (0, t.alwaysValidSchema)(F, K)) && !F.opts.unevaluated)
      return;
    const Z = O.let("valid", !1), V = O.name("_valid");
    O.block(() => N.forEach((K, re) => {
      const Y = v.subschema({
        keyword: I,
        schemaProp: re,
        compositeRule: !0
      }, V);
      O.assign(Z, (0, e._)`${Z} || ${V}`), v.mergeValidEvaluated(Y, V) || O.if((0, e.not)(Z));
    })), v.result(Z, () => v.reset(), () => v.error(!0));
  }
  return de.validateUnion = p, de;
}
var wc;
function pg() {
  if (wc) return tt;
  wc = 1, Object.defineProperty(tt, "__esModule", { value: !0 }), tt.validateKeywordUsage = tt.validSchemaType = tt.funcKeywordCode = tt.macroKeywordCode = void 0;
  const e = ae, t = zt(), r = ut(), n = gn;
  function s(w, _) {
    const { gen: E, keyword: y, schema: g, parentSchema: p, it: v } = w, O = _.macro.call(v.self, g, p, v), N = f(E, y, O);
    v.opts.validateSchema !== !1 && v.self.validateSchema(O, !0);
    const I = E.name("valid");
    w.subschema({
      schema: O,
      schemaPath: e.nil,
      errSchemaPath: `${v.errSchemaPath}/${y}`,
      topSchemaRef: N,
      compositeRule: !0
    }, I), w.pass(I, () => w.error(!0));
  }
  tt.macroKeywordCode = s;
  function o(w, _) {
    var E;
    const { gen: y, keyword: g, schema: p, parentSchema: v, $data: O, it: N } = w;
    i(N, _);
    const I = !O && _.compile ? _.compile.call(N.self, p, v, N) : _.validate, F = f(y, g, I), z = y.let("valid");
    w.block$data(z, Z), w.ok((E = _.valid) !== null && E !== void 0 ? E : z);
    function Z() {
      if (_.errors === !1)
        re(), _.modifying && a(w), Y(() => w.error());
      else {
        const ee = _.async ? V() : K();
        _.modifying && a(w), Y(() => l(w, ee));
      }
    }
    function V() {
      const ee = y.let("ruleErrs", null);
      return y.try(() => re((0, e._)`await `), (L) => y.assign(z, !1).if((0, e._)`${L} instanceof ${N.ValidationError}`, () => y.assign(ee, (0, e._)`${L}.errors`), () => y.throw(L))), ee;
    }
    function K() {
      const ee = (0, e._)`${F}.errors`;
      return y.assign(ee, null), re(e.nil), ee;
    }
    function re(ee = _.async ? (0, e._)`await ` : e.nil) {
      const L = N.opts.passContext ? t.default.this : t.default.self, M = !("compile" in _ && !O || _.schema === !1);
      y.assign(z, (0, e._)`${ee}${(0, r.callValidateCode)(w, F, L, M)}`, _.modifying);
    }
    function Y(ee) {
      var L;
      y.if((0, e.not)((L = _.valid) !== null && L !== void 0 ? L : z), ee);
    }
  }
  tt.funcKeywordCode = o;
  function a(w) {
    const { gen: _, data: E, it: y } = w;
    _.if(y.parentData, () => _.assign(E, (0, e._)`${y.parentData}[${y.parentDataProperty}]`));
  }
  function l(w, _) {
    const { gen: E } = w;
    E.if((0, e._)`Array.isArray(${_})`, () => {
      E.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${_} : ${t.default.vErrors}.concat(${_})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(w);
    }, () => w.error());
  }
  function i({ schemaEnv: w }, _) {
    if (_.async && !w.$async)
      throw new Error("async keyword in sync schema");
  }
  function f(w, _, E) {
    if (E === void 0)
      throw new Error(`keyword "${_}" failed to compile`);
    return w.scopeValue("keyword", typeof E == "function" ? { ref: E } : { ref: E, code: (0, e.stringify)(E) });
  }
  function u(w, _, E = !1) {
    return !_.length || _.some((y) => y === "array" ? Array.isArray(w) : y === "object" ? w && typeof w == "object" && !Array.isArray(w) : typeof w == y || E && typeof w > "u");
  }
  tt.validSchemaType = u;
  function h({ schema: w, opts: _, self: E, errSchemaPath: y }, g, p) {
    if (Array.isArray(g.keyword) ? !g.keyword.includes(p) : g.keyword !== p)
      throw new Error("ajv implementation error");
    const v = g.dependencies;
    if (v != null && v.some((O) => !Object.prototype.hasOwnProperty.call(w, O)))
      throw new Error(`parent schema must have dependencies of ${p}: ${v.join(",")}`);
    if (g.validateSchema && !g.validateSchema(w[p])) {
      const N = `keyword "${p}" value is invalid at path "${y}": ` + E.errorsText(g.validateSchema.errors);
      if (_.validateSchema === "log")
        E.logger.error(N);
      else
        throw new Error(N);
    }
  }
  return tt.validateKeywordUsage = h, tt;
}
var St = {}, Sc;
function mg() {
  if (Sc) return St;
  Sc = 1, Object.defineProperty(St, "__esModule", { value: !0 }), St.extendSubschemaMode = St.extendSubschemaData = St.getSubschema = void 0;
  const e = ae, t = x;
  function r(o, { keyword: a, schemaProp: l, schema: i, schemaPath: f, errSchemaPath: u, topSchemaRef: h }) {
    if (a !== void 0 && i !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (a !== void 0) {
      const w = o.schema[a];
      return l === void 0 ? {
        schema: w,
        schemaPath: (0, e._)`${o.schemaPath}${(0, e.getProperty)(a)}`,
        errSchemaPath: `${o.errSchemaPath}/${a}`
      } : {
        schema: w[l],
        schemaPath: (0, e._)`${o.schemaPath}${(0, e.getProperty)(a)}${(0, e.getProperty)(l)}`,
        errSchemaPath: `${o.errSchemaPath}/${a}/${(0, t.escapeFragment)(l)}`
      };
    }
    if (i !== void 0) {
      if (f === void 0 || u === void 0 || h === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: i,
        schemaPath: f,
        topSchemaRef: h,
        errSchemaPath: u
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  St.getSubschema = r;
  function n(o, a, { dataProp: l, dataPropType: i, data: f, dataTypes: u, propertyName: h }) {
    if (f !== void 0 && l !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: w } = a;
    if (l !== void 0) {
      const { errorPath: E, dataPathArr: y, opts: g } = a, p = w.let("data", (0, e._)`${a.data}${(0, e.getProperty)(l)}`, !0);
      _(p), o.errorPath = (0, e.str)`${E}${(0, t.getErrorPath)(l, i, g.jsPropertySyntax)}`, o.parentDataProperty = (0, e._)`${l}`, o.dataPathArr = [...y, o.parentDataProperty];
    }
    if (f !== void 0) {
      const E = f instanceof e.Name ? f : w.let("data", f, !0);
      _(E), h !== void 0 && (o.propertyName = h);
    }
    u && (o.dataTypes = u);
    function _(E) {
      o.data = E, o.dataLevel = a.dataLevel + 1, o.dataTypes = [], a.definedProperties = /* @__PURE__ */ new Set(), o.parentData = a.data, o.dataNames = [...a.dataNames, E];
    }
  }
  St.extendSubschemaData = n;
  function s(o, { jtdDiscriminator: a, jtdMetadata: l, compositeRule: i, createErrors: f, allErrors: u }) {
    i !== void 0 && (o.compositeRule = i), f !== void 0 && (o.createErrors = f), u !== void 0 && (o.allErrors = u), o.jtdDiscriminator = a, o.jtdMetadata = l;
  }
  return St.extendSubschemaMode = s, St;
}
var je = {}, uf = { exports: {} }, Ut = uf.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  ts(t, n, s, e, "", e);
};
Ut.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Ut.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Ut.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Ut.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function ts(e, t, r, n, s, o, a, l, i, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, o, a, l, i, f);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Ut.arrayKeywords)
          for (var w = 0; w < h.length; w++)
            ts(e, t, r, h[w], s + "/" + u + "/" + w, o, s, u, n, w);
      } else if (u in Ut.propsKeywords) {
        if (h && typeof h == "object")
          for (var _ in h)
            ts(e, t, r, h[_], s + "/" + u + "/" + yg(_), o, s, u, n, _);
      } else (u in Ut.keywords || e.allKeys && !(u in Ut.skipKeywords)) && ts(e, t, r, h, s + "/" + u, o, s, u, n);
    }
    r(n, s, o, a, l, i, f);
  }
}
function yg(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var _g = uf.exports;
Object.defineProperty(je, "__esModule", { value: !0 });
je.getSchemaRefs = je.resolveUrl = je.normalizeId = je._getFullPath = je.getFullPath = je.inlineRef = void 0;
const gg = x, $g = Ns, vg = _g, Eg = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function wg(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Ao(e) : t ? ff(e) <= t : !1;
}
je.inlineRef = wg;
const Sg = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Ao(e) {
  for (const t in e) {
    if (Sg.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Ao) || typeof r == "object" && Ao(r))
      return !0;
  }
  return !1;
}
function ff(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Eg.has(r) && (typeof e[r] == "object" && (0, gg.eachItem)(e[r], (n) => t += ff(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function df(e, t = "", r) {
  r !== !1 && (t = Pr(t));
  const n = e.parse(t);
  return hf(e, n);
}
je.getFullPath = df;
function hf(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
je._getFullPath = hf;
const bg = /#\/?$/;
function Pr(e) {
  return e ? e.replace(bg, "") : "";
}
je.normalizeId = Pr;
function Pg(e, t, r) {
  return r = Pr(r), e.resolve(t, r);
}
je.resolveUrl = Pg;
const Og = /^[a-z_][-a-z0-9._]*$/i;
function Ng(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = Pr(e[r] || t), o = { "": s }, a = df(n, s, !1), l = {}, i = /* @__PURE__ */ new Set();
  return vg(e, { allKeys: !0 }, (h, w, _, E) => {
    if (E === void 0)
      return;
    const y = a + w;
    let g = o[E];
    typeof h[r] == "string" && (g = p.call(this, h[r])), v.call(this, h.$anchor), v.call(this, h.$dynamicAnchor), o[w] = g;
    function p(O) {
      const N = this.opts.uriResolver.resolve;
      if (O = Pr(g ? N(g, O) : O), i.has(O))
        throw u(O);
      i.add(O);
      let I = this.refs[O];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? f(h, I.schema, O) : O !== Pr(y) && (O[0] === "#" ? (f(h, l[O], O), l[O] = h) : this.refs[O] = y), O;
    }
    function v(O) {
      if (typeof O == "string") {
        if (!Og.test(O))
          throw new Error(`invalid anchor "${O}"`);
        p.call(this, `#${O}`);
      }
    }
  }), l;
  function f(h, w, _) {
    if (w !== void 0 && !$g(h, w))
      throw u(_);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
je.getSchemaRefs = Ng;
var bc;
function js() {
  if (bc) return Et;
  bc = 1, Object.defineProperty(Et, "__esModule", { value: !0 }), Et.getData = Et.KeywordCxt = Et.validateFunctionCode = void 0;
  const e = Q_(), t = be, r = of(), n = be, s = hg(), o = pg(), a = mg(), l = ae, i = zt(), f = je, u = x, h = gn;
  function w(R) {
    if (I(R) && (z(R), N(R))) {
      g(R);
      return;
    }
    _(R, () => (0, e.topBoolOrEmptySchema)(R));
  }
  Et.validateFunctionCode = w;
  function _({ gen: R, validateName: T, schema: D, schemaEnv: U, opts: J }, ne) {
    J.code.es5 ? R.func(T, (0, l._)`${i.default.data}, ${i.default.valCxt}`, U.$async, () => {
      R.code((0, l._)`"use strict"; ${v(D, J)}`), y(R, J), R.code(ne);
    }) : R.func(T, (0, l._)`${i.default.data}, ${E(J)}`, U.$async, () => R.code(v(D, J)).code(ne));
  }
  function E(R) {
    return (0, l._)`{${i.default.instancePath}="", ${i.default.parentData}, ${i.default.parentDataProperty}, ${i.default.rootData}=${i.default.data}${R.dynamicRef ? (0, l._)`, ${i.default.dynamicAnchors}={}` : l.nil}}={}`;
  }
  function y(R, T) {
    R.if(i.default.valCxt, () => {
      R.var(i.default.instancePath, (0, l._)`${i.default.valCxt}.${i.default.instancePath}`), R.var(i.default.parentData, (0, l._)`${i.default.valCxt}.${i.default.parentData}`), R.var(i.default.parentDataProperty, (0, l._)`${i.default.valCxt}.${i.default.parentDataProperty}`), R.var(i.default.rootData, (0, l._)`${i.default.valCxt}.${i.default.rootData}`), T.dynamicRef && R.var(i.default.dynamicAnchors, (0, l._)`${i.default.valCxt}.${i.default.dynamicAnchors}`);
    }, () => {
      R.var(i.default.instancePath, (0, l._)`""`), R.var(i.default.parentData, (0, l._)`undefined`), R.var(i.default.parentDataProperty, (0, l._)`undefined`), R.var(i.default.rootData, i.default.data), T.dynamicRef && R.var(i.default.dynamicAnchors, (0, l._)`{}`);
    });
  }
  function g(R) {
    const { schema: T, opts: D, gen: U } = R;
    _(R, () => {
      D.$comment && T.$comment && ee(R), K(R), U.let(i.default.vErrors, null), U.let(i.default.errors, 0), D.unevaluated && p(R), Z(R), L(R);
    });
  }
  function p(R) {
    const { gen: T, validateName: D } = R;
    R.evaluated = T.const("evaluated", (0, l._)`${D}.evaluated`), T.if((0, l._)`${R.evaluated}.dynamicProps`, () => T.assign((0, l._)`${R.evaluated}.props`, (0, l._)`undefined`)), T.if((0, l._)`${R.evaluated}.dynamicItems`, () => T.assign((0, l._)`${R.evaluated}.items`, (0, l._)`undefined`));
  }
  function v(R, T) {
    const D = typeof R == "object" && R[T.schemaId];
    return D && (T.code.source || T.code.process) ? (0, l._)`/*# sourceURL=${D} */` : l.nil;
  }
  function O(R, T) {
    if (I(R) && (z(R), N(R))) {
      F(R, T);
      return;
    }
    (0, e.boolOrEmptySchema)(R, T);
  }
  function N({ schema: R, self: T }) {
    if (typeof R == "boolean")
      return !R;
    for (const D in R)
      if (T.RULES.all[D])
        return !0;
    return !1;
  }
  function I(R) {
    return typeof R.schema != "boolean";
  }
  function F(R, T) {
    const { schema: D, gen: U, opts: J } = R;
    J.$comment && D.$comment && ee(R), re(R), Y(R);
    const ne = U.const("_errs", i.default.errors);
    Z(R, ne), U.var(T, (0, l._)`${ne} === ${i.default.errors}`);
  }
  function z(R) {
    (0, u.checkUnknownRules)(R), V(R);
  }
  function Z(R, T) {
    if (R.opts.jtd)
      return H(R, [], !1, T);
    const D = (0, t.getSchemaTypes)(R.schema), U = (0, t.coerceAndCheckDataType)(R, D);
    H(R, D, !U, T);
  }
  function V(R) {
    const { schema: T, errSchemaPath: D, opts: U, self: J } = R;
    T.$ref && U.ignoreKeywordsWithRef && (0, u.schemaHasRulesButRef)(T, J.RULES) && J.logger.warn(`$ref: keywords ignored in schema at path "${D}"`);
  }
  function K(R) {
    const { schema: T, opts: D } = R;
    T.default !== void 0 && D.useDefaults && D.strictSchema && (0, u.checkStrictMode)(R, "default is ignored in the schema root");
  }
  function re(R) {
    const T = R.schema[R.opts.schemaId];
    T && (R.baseId = (0, f.resolveUrl)(R.opts.uriResolver, R.baseId, T));
  }
  function Y(R) {
    if (R.schema.$async && !R.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function ee({ gen: R, schemaEnv: T, schema: D, errSchemaPath: U, opts: J }) {
    const ne = D.$comment;
    if (J.$comment === !0)
      R.code((0, l._)`${i.default.self}.logger.log(${ne})`);
    else if (typeof J.$comment == "function") {
      const $e = (0, l.str)`${U}/$comment`, Le = R.scopeValue("root", { ref: T.root });
      R.code((0, l._)`${i.default.self}.opts.$comment(${ne}, ${$e}, ${Le}.schema)`);
    }
  }
  function L(R) {
    const { gen: T, schemaEnv: D, validateName: U, ValidationError: J, opts: ne } = R;
    D.$async ? T.if((0, l._)`${i.default.errors} === 0`, () => T.return(i.default.data), () => T.throw((0, l._)`new ${J}(${i.default.vErrors})`)) : (T.assign((0, l._)`${U}.errors`, i.default.vErrors), ne.unevaluated && M(R), T.return((0, l._)`${i.default.errors} === 0`));
  }
  function M({ gen: R, evaluated: T, props: D, items: U }) {
    D instanceof l.Name && R.assign((0, l._)`${T}.props`, D), U instanceof l.Name && R.assign((0, l._)`${T}.items`, U);
  }
  function H(R, T, D, U) {
    const { gen: J, schema: ne, data: $e, allErrors: Le, opts: Pe, self: Oe } = R, { RULES: ve } = Oe;
    if (ne.$ref && (Pe.ignoreKeywordsWithRef || !(0, u.schemaHasRulesButRef)(ne, ve))) {
      J.block(() => j(R, "$ref", ve.all.$ref.definition));
      return;
    }
    Pe.jtd || k(R, T), J.block(() => {
      for (const Ae of ve.rules)
        ht(Ae);
      ht(ve.post);
    });
    function ht(Ae) {
      (0, r.shouldUseGroup)(ne, Ae) && (Ae.type ? (J.if((0, n.checkDataType)(Ae.type, $e, Pe.strictNumbers)), q(R, Ae), T.length === 1 && T[0] === Ae.type && D && (J.else(), (0, n.reportTypeError)(R)), J.endIf()) : q(R, Ae), Le || J.if((0, l._)`${i.default.errors} === ${U || 0}`));
    }
  }
  function q(R, T) {
    const { gen: D, schema: U, opts: { useDefaults: J } } = R;
    J && (0, s.assignDefaults)(R, T.type), D.block(() => {
      for (const ne of T.rules)
        (0, r.shouldUseRule)(U, ne) && j(R, ne.keyword, ne.definition, T.type);
    });
  }
  function k(R, T) {
    R.schemaEnv.meta || !R.opts.strictTypes || (C(R, T), R.opts.allowUnionTypes || S(R, T), m(R, R.dataTypes));
  }
  function C(R, T) {
    if (T.length) {
      if (!R.dataTypes.length) {
        R.dataTypes = T;
        return;
      }
      T.forEach((D) => {
        $(R.dataTypes, D) || d(R, `type "${D}" not allowed by context "${R.dataTypes.join(",")}"`);
      }), c(R, T);
    }
  }
  function S(R, T) {
    T.length > 1 && !(T.length === 2 && T.includes("null")) && d(R, "use allowUnionTypes to allow union type keyword");
  }
  function m(R, T) {
    const D = R.self.RULES.all;
    for (const U in D) {
      const J = D[U];
      if (typeof J == "object" && (0, r.shouldUseRule)(R.schema, J)) {
        const { type: ne } = J.definition;
        ne.length && !ne.some(($e) => b(T, $e)) && d(R, `missing type "${ne.join(",")}" for keyword "${U}"`);
      }
    }
  }
  function b(R, T) {
    return R.includes(T) || T === "number" && R.includes("integer");
  }
  function $(R, T) {
    return R.includes(T) || T === "integer" && R.includes("number");
  }
  function c(R, T) {
    const D = [];
    for (const U of R.dataTypes)
      $(T, U) ? D.push(U) : T.includes("integer") && U === "number" && D.push("integer");
    R.dataTypes = D;
  }
  function d(R, T) {
    const D = R.schemaEnv.baseId + R.errSchemaPath;
    T += ` at "${D}" (strictTypes)`, (0, u.checkStrictMode)(R, T, R.opts.strictTypes);
  }
  class P {
    constructor(T, D, U) {
      if ((0, o.validateKeywordUsage)(T, D, U), this.gen = T.gen, this.allErrors = T.allErrors, this.keyword = U, this.data = T.data, this.schema = T.schema[U], this.$data = D.$data && T.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, u.schemaRefOrVal)(T, this.schema, U, this.$data), this.schemaType = D.schemaType, this.parentSchema = T.schema, this.params = {}, this.it = T, this.def = D, this.$data)
        this.schemaCode = T.gen.const("vSchema", B(this.$data, T));
      else if (this.schemaCode = this.schemaValue, !(0, o.validSchemaType)(this.schema, D.schemaType, D.allowUndefined))
        throw new Error(`${U} value must be ${JSON.stringify(D.schemaType)}`);
      ("code" in D ? D.trackErrors : D.errors !== !1) && (this.errsCount = T.gen.const("_errs", i.default.errors));
    }
    result(T, D, U) {
      this.failResult((0, l.not)(T), D, U);
    }
    failResult(T, D, U) {
      this.gen.if(T), U ? U() : this.error(), D ? (this.gen.else(), D(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(T, D) {
      this.failResult((0, l.not)(T), void 0, D);
    }
    fail(T) {
      if (T === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(T), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(T) {
      if (!this.$data)
        return this.fail(T);
      const { schemaCode: D } = this;
      this.fail((0, l._)`${D} !== undefined && (${(0, l.or)(this.invalid$data(), T)})`);
    }
    error(T, D, U) {
      if (D) {
        this.setParams(D), this._error(T, U), this.setParams({});
        return;
      }
      this._error(T, U);
    }
    _error(T, D) {
      (T ? h.reportExtraError : h.reportError)(this, this.def.error, D);
    }
    $dataError() {
      (0, h.reportError)(this, this.def.$dataError || h.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, h.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(T) {
      this.allErrors || this.gen.if(T);
    }
    setParams(T, D) {
      D ? Object.assign(this.params, T) : this.params = T;
    }
    block$data(T, D, U = l.nil) {
      this.gen.block(() => {
        this.check$data(T, U), D();
      });
    }
    check$data(T = l.nil, D = l.nil) {
      if (!this.$data)
        return;
      const { gen: U, schemaCode: J, schemaType: ne, def: $e } = this;
      U.if((0, l.or)((0, l._)`${J} === undefined`, D)), T !== l.nil && U.assign(T, !0), (ne.length || $e.validateSchema) && (U.elseIf(this.invalid$data()), this.$dataError(), T !== l.nil && U.assign(T, !1)), U.else();
    }
    invalid$data() {
      const { gen: T, schemaCode: D, schemaType: U, def: J, it: ne } = this;
      return (0, l.or)($e(), Le());
      function $e() {
        if (U.length) {
          if (!(D instanceof l.Name))
            throw new Error("ajv implementation error");
          const Pe = Array.isArray(U) ? U : [U];
          return (0, l._)`${(0, n.checkDataTypes)(Pe, D, ne.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return l.nil;
      }
      function Le() {
        if (J.validateSchema) {
          const Pe = T.scopeValue("validate$data", { ref: J.validateSchema });
          return (0, l._)`!${Pe}(${D})`;
        }
        return l.nil;
      }
    }
    subschema(T, D) {
      const U = (0, a.getSubschema)(this.it, T);
      (0, a.extendSubschemaData)(U, this.it, T), (0, a.extendSubschemaMode)(U, T);
      const J = { ...this.it, ...U, items: void 0, props: void 0 };
      return O(J, D), J;
    }
    mergeEvaluated(T, D) {
      const { it: U, gen: J } = this;
      U.opts.unevaluated && (U.props !== !0 && T.props !== void 0 && (U.props = u.mergeEvaluated.props(J, T.props, U.props, D)), U.items !== !0 && T.items !== void 0 && (U.items = u.mergeEvaluated.items(J, T.items, U.items, D)));
    }
    mergeValidEvaluated(T, D) {
      const { it: U, gen: J } = this;
      if (U.opts.unevaluated && (U.props !== !0 || U.items !== !0))
        return J.if(D, () => this.mergeEvaluated(T, l.Name)), !0;
    }
  }
  Et.KeywordCxt = P;
  function j(R, T, D, U) {
    const J = new P(R, D, T);
    "code" in D ? D.code(J, U) : J.$data && D.validate ? (0, o.funcKeywordCode)(J, D) : "macro" in D ? (0, o.macroKeywordCode)(J, D) : (D.compile || D.validate) && (0, o.funcKeywordCode)(J, D);
  }
  const A = /^\/(?:[^~]|~0|~1)*$/, W = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function B(R, { dataLevel: T, dataNames: D, dataPathArr: U }) {
    let J, ne;
    if (R === "")
      return i.default.rootData;
    if (R[0] === "/") {
      if (!A.test(R))
        throw new Error(`Invalid JSON-pointer: ${R}`);
      J = R, ne = i.default.rootData;
    } else {
      const Oe = W.exec(R);
      if (!Oe)
        throw new Error(`Invalid JSON-pointer: ${R}`);
      const ve = +Oe[1];
      if (J = Oe[2], J === "#") {
        if (ve >= T)
          throw new Error(Pe("property/index", ve));
        return U[T - ve];
      }
      if (ve > T)
        throw new Error(Pe("data", ve));
      if (ne = D[T - ve], !J)
        return ne;
    }
    let $e = ne;
    const Le = J.split("/");
    for (const Oe of Le)
      Oe && (ne = (0, l._)`${ne}${(0, l.getProperty)((0, u.unescapeJsonPointer)(Oe))}`, $e = (0, l._)`${$e} && ${ne}`);
    return $e;
    function Pe(Oe, ve) {
      return `Cannot access ${Oe} ${ve} levels up, current level is ${T}`;
    }
  }
  return Et.getData = B, Et;
}
var Cn = {}, Pc;
function Qa() {
  if (Pc) return Cn;
  Pc = 1, Object.defineProperty(Cn, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return Cn.default = e, Cn;
}
var Mr = {};
Object.defineProperty(Mr, "__esModule", { value: !0 });
const Zs = je;
class Rg extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Zs.resolveUrl)(t, r, n), this.missingSchema = (0, Zs.normalizeId)((0, Zs.getFullPath)(t, this.missingRef));
  }
}
Mr.default = Rg;
var Be = {};
Object.defineProperty(Be, "__esModule", { value: !0 });
Be.resolveSchema = Be.getCompilingSchema = Be.resolveRef = Be.compileSchema = Be.SchemaEnv = void 0;
const rt = ae, Tg = Qa(), Xt = zt(), ct = je, Oc = x, Ig = js();
class As {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, ct.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Be.SchemaEnv = As;
function Za(e) {
  const t = pf.call(this, e);
  if (t)
    return t;
  const r = (0, ct.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: o } = this.opts, a = new rt.CodeGen(this.scope, { es5: n, lines: s, ownProperties: o });
  let l;
  e.$async && (l = a.scopeValue("Error", {
    ref: Tg.default,
    code: (0, rt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const i = a.scopeName("validate");
  e.validateName = i;
  const f = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: Xt.default.data,
    parentData: Xt.default.parentData,
    parentDataProperty: Xt.default.parentDataProperty,
    dataNames: [Xt.default.data],
    dataPathArr: [rt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, rt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: i,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: rt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, rt._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, Ig.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
    const h = a.toString();
    u = `${a.scopeRefs(Xt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const _ = new Function(`${Xt.default.self}`, `${Xt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(i, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: i, validateCode: h, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: E, items: y } = f;
      _.evaluated = {
        props: E instanceof rt.Name ? void 0 : E,
        items: y instanceof rt.Name ? void 0 : y,
        dynamicProps: E instanceof rt.Name,
        dynamicItems: y instanceof rt.Name
      }, _.source && (_.source.evaluated = (0, rt.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Be.compileSchema = Za;
function kg(e, t, r) {
  var n;
  r = (0, ct.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let o = Ag.call(this, e, r);
  if (o === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    a && (o = new As({ schema: a, schemaId: l, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = Cg.call(this, o);
}
Be.resolveRef = kg;
function Cg(e) {
  return (0, ct.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Za.call(this, e);
}
function pf(e) {
  for (const t of this._compilations)
    if (jg(t, e))
      return t;
}
Be.getCompilingSchema = pf;
function jg(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Ag(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Ds.call(this, e, t);
}
function Ds(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, ct._getFullPath)(this.opts.uriResolver, r);
  let s = (0, ct.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return eo.call(this, r, e);
  const o = (0, ct.normalizeId)(n), a = this.refs[o] || this.schemas[o];
  if (typeof a == "string") {
    const l = Ds.call(this, e, a);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : eo.call(this, r, l);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || Za.call(this, a), o === (0, ct.normalizeId)(t)) {
      const { schema: l } = a, { schemaId: i } = this.opts, f = l[i];
      return f && (s = (0, ct.resolveUrl)(this.opts.uriResolver, s, f)), new As({ schema: l, schemaId: i, root: e, baseId: s });
    }
    return eo.call(this, r, a);
  }
}
Be.resolveSchema = Ds;
const Dg = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function eo(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const i = r[(0, Oc.unescapeFragment)(l)];
    if (i === void 0)
      return;
    r = i;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !Dg.has(l) && f && (t = (0, ct.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, Oc.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, ct.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = Ds.call(this, n, l);
  }
  const { schemaId: a } = this.opts;
  if (o = o || new As({ schema: r, schemaId: a, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const Lg = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Mg = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Fg = "object", Ug = [
  "$data"
], Vg = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, qg = !1, zg = {
  $id: Lg,
  description: Mg,
  type: Fg,
  required: Ug,
  properties: Vg,
  additionalProperties: qg
};
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
const mf = qu;
mf.code = 'require("ajv/dist/runtime/uri").default';
ei.default = mf;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = js();
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ae;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Qa(), s = Mr, o = cr, a = Be, l = ae, i = je, f = be, u = x, h = zg, w = ei, _ = (S, m) => new RegExp(S, m);
  _.code = "new RegExp";
  const E = ["removeAdditional", "useDefaults", "coerceTypes"], y = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), g = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, p = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, v = 200;
  function O(S) {
    var m, b, $, c, d, P, j, A, W, B, R, T, D, U, J, ne, $e, Le, Pe, Oe, ve, ht, Ae, xt, Bt;
    const Ze = S.strict, Kt = (m = S.code) === null || m === void 0 ? void 0 : m.optimize, zr = Kt === !0 || Kt === void 0 ? 1 : Kt || 0, Gr = ($ = (b = S.code) === null || b === void 0 ? void 0 : b.regExp) !== null && $ !== void 0 ? $ : _, Hs = (c = S.uriResolver) !== null && c !== void 0 ? c : w.default;
    return {
      strictSchema: (P = (d = S.strictSchema) !== null && d !== void 0 ? d : Ze) !== null && P !== void 0 ? P : !0,
      strictNumbers: (A = (j = S.strictNumbers) !== null && j !== void 0 ? j : Ze) !== null && A !== void 0 ? A : !0,
      strictTypes: (B = (W = S.strictTypes) !== null && W !== void 0 ? W : Ze) !== null && B !== void 0 ? B : "log",
      strictTuples: (T = (R = S.strictTuples) !== null && R !== void 0 ? R : Ze) !== null && T !== void 0 ? T : "log",
      strictRequired: (U = (D = S.strictRequired) !== null && D !== void 0 ? D : Ze) !== null && U !== void 0 ? U : !1,
      code: S.code ? { ...S.code, optimize: zr, regExp: Gr } : { optimize: zr, regExp: Gr },
      loopRequired: (J = S.loopRequired) !== null && J !== void 0 ? J : v,
      loopEnum: (ne = S.loopEnum) !== null && ne !== void 0 ? ne : v,
      meta: ($e = S.meta) !== null && $e !== void 0 ? $e : !0,
      messages: (Le = S.messages) !== null && Le !== void 0 ? Le : !0,
      inlineRefs: (Pe = S.inlineRefs) !== null && Pe !== void 0 ? Pe : !0,
      schemaId: (Oe = S.schemaId) !== null && Oe !== void 0 ? Oe : "$id",
      addUsedSchema: (ve = S.addUsedSchema) !== null && ve !== void 0 ? ve : !0,
      validateSchema: (ht = S.validateSchema) !== null && ht !== void 0 ? ht : !0,
      validateFormats: (Ae = S.validateFormats) !== null && Ae !== void 0 ? Ae : !0,
      unicodeRegExp: (xt = S.unicodeRegExp) !== null && xt !== void 0 ? xt : !0,
      int32range: (Bt = S.int32range) !== null && Bt !== void 0 ? Bt : !0,
      uriResolver: Hs
    };
  }
  class N {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...O(m) };
      const { es5: b, lines: $ } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: y, es5: b, lines: $ }), this.logger = Y(m.logger);
      const c = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, o.getRules)(), I.call(this, g, m, "NOT SUPPORTED"), I.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = K.call(this), m.formats && Z.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && V.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), z.call(this), m.validateFormats = c;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: b, schemaId: $ } = this.opts;
      let c = h;
      $ === "id" && (c = { ...h }, c.id = c.$id, delete c.$id), b && m && this.addMetaSchema(c, c[$], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: b } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[b] || m : void 0;
    }
    validate(m, b) {
      let $;
      if (typeof m == "string") {
        if ($ = this.getSchema(m), !$)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        $ = this.compile(m);
      const c = $(b);
      return "$async" in $ || (this.errors = $.errors), c;
    }
    compile(m, b) {
      const $ = this._addSchema(m, b);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(m, b) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return c.call(this, m, b);
      async function c(B, R) {
        await d.call(this, B.$schema);
        const T = this._addSchema(B, R);
        return T.validate || P.call(this, T);
      }
      async function d(B) {
        B && !this.getSchema(B) && await c.call(this, { $ref: B }, !0);
      }
      async function P(B) {
        try {
          return this._compileSchemaEnv(B);
        } catch (R) {
          if (!(R instanceof s.default))
            throw R;
          return j.call(this, R), await A.call(this, R.missingSchema), P.call(this, B);
        }
      }
      function j({ missingSchema: B, missingRef: R }) {
        if (this.refs[B])
          throw new Error(`AnySchema ${B} is loaded but ${R} cannot be resolved`);
      }
      async function A(B) {
        const R = await W.call(this, B);
        this.refs[B] || await d.call(this, R.$schema), this.refs[B] || this.addSchema(R, B, b);
      }
      async function W(B) {
        const R = this._loading[B];
        if (R)
          return R;
        try {
          return await (this._loading[B] = $(B));
        } finally {
          delete this._loading[B];
        }
      }
    }
    // Adds schema to the instance
    addSchema(m, b, $, c = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const P of m)
          this.addSchema(P, void 0, $, c);
        return this;
      }
      let d;
      if (typeof m == "object") {
        const { schemaId: P } = this.opts;
        if (d = m[P], d !== void 0 && typeof d != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return b = (0, i.normalizeId)(b || d), this._checkUnique(b), this.schemas[b] = this._addSchema(m, $, b, c, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, b, $ = this.opts.validateSchema) {
      return this.addSchema(m, b, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, b) {
      if (typeof m == "boolean")
        return !0;
      let $;
      if ($ = m.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const c = this.validate($, m);
      if (!c && b) {
        const d = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(d);
        else
          throw new Error(d);
      }
      return c;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(m) {
      let b;
      for (; typeof (b = F.call(this, m)) == "string"; )
        m = b;
      if (b === void 0) {
        const { schemaId: $ } = this.opts, c = new a.SchemaEnv({ schema: {}, schemaId: $ });
        if (b = a.resolveSchema.call(this, c, m), !b)
          return;
        this.refs[m] = b;
      }
      return b.validate || this._compileSchemaEnv(b);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(m) {
      if (m instanceof RegExp)
        return this._removeAllSchemas(this.schemas, m), this._removeAllSchemas(this.refs, m), this;
      switch (typeof m) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const b = F.call(this, m);
          return typeof b == "object" && this._cache.delete(b.schema), delete this.schemas[m], delete this.refs[m], this;
        }
        case "object": {
          const b = m;
          this._cache.delete(b);
          let $ = m[this.opts.schemaId];
          return $ && ($ = (0, i.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(m) {
      for (const b of m)
        this.addKeyword(b);
      return this;
    }
    addKeyword(m, b) {
      let $;
      if (typeof m == "string")
        $ = m, typeof b == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), b.keyword = $);
      else if (typeof m == "object" && b === void 0) {
        if (b = m, $ = b.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (L.call(this, $, b), !b)
        return (0, u.eachItem)($, (d) => M.call(this, d)), this;
      q.call(this, b);
      const c = {
        ...b,
        type: (0, f.getJSONTypes)(b.type),
        schemaType: (0, f.getJSONTypes)(b.schemaType)
      };
      return (0, u.eachItem)($, c.type.length === 0 ? (d) => M.call(this, d, c) : (d) => c.type.forEach((P) => M.call(this, d, c, P))), this;
    }
    getKeyword(m) {
      const b = this.RULES.all[m];
      return typeof b == "object" ? b.definition : !!b;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: b } = this;
      delete b.keywords[m], delete b.all[m];
      for (const $ of b.rules) {
        const c = $.rules.findIndex((d) => d.keyword === m);
        c >= 0 && $.rules.splice(c, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, b) {
      return typeof b == "string" && (b = new RegExp(b)), this.formats[m] = b, this;
    }
    errorsText(m = this.errors, { separator: b = ", ", dataVar: $ = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((c) => `${$}${c.instancePath} ${c.message}`).reduce((c, d) => c + b + d);
    }
    $dataMetaSchema(m, b) {
      const $ = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const c of b) {
        const d = c.split("/").slice(1);
        let P = m;
        for (const j of d)
          P = P[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: W } = A.definition, B = P[j];
          W && B && (P[j] = C(B));
        }
      }
      return m;
    }
    _removeAllSchemas(m, b) {
      for (const $ in m) {
        const c = m[$];
        (!b || b.test($)) && (typeof c == "string" ? delete m[$] : c && !c.meta && (this._cache.delete(c.schema), delete m[$]));
      }
    }
    _addSchema(m, b, $, c = this.opts.validateSchema, d = this.opts.addUsedSchema) {
      let P;
      const { schemaId: j } = this.opts;
      if (typeof m == "object")
        P = m[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof m != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(m);
      if (A !== void 0)
        return A;
      $ = (0, i.normalizeId)(P || $);
      const W = i.getSchemaRefs.call(this, m, $);
      return A = new a.SchemaEnv({ schema: m, schemaId: j, meta: b, baseId: $, localRefs: W }), this._cache.set(A.schema, A), d && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), c && this.validateSchema(m, !0), A;
    }
    _checkUnique(m) {
      if (this.schemas[m] || this.refs[m])
        throw new Error(`schema with key or id "${m}" already exists`);
    }
    _compileSchemaEnv(m) {
      if (m.meta ? this._compileMetaSchema(m) : a.compileSchema.call(this, m), !m.validate)
        throw new Error("ajv implementation error");
      return m.validate;
    }
    _compileMetaSchema(m) {
      const b = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, m);
      } finally {
        this.opts = b;
      }
    }
  }
  N.ValidationError = n.default, N.MissingRefError = s.default, e.default = N;
  function I(S, m, b, $ = "error") {
    for (const c in S) {
      const d = c;
      d in m && this.logger[$](`${b}: option ${c}. ${S[d]}`);
    }
  }
  function F(S) {
    return S = (0, i.normalizeId)(S), this.schemas[S] || this.refs[S];
  }
  function z() {
    const S = this.opts.schemas;
    if (S)
      if (Array.isArray(S))
        this.addSchema(S);
      else
        for (const m in S)
          this.addSchema(S[m], m);
  }
  function Z() {
    for (const S in this.opts.formats) {
      const m = this.opts.formats[S];
      m && this.addFormat(S, m);
    }
  }
  function V(S) {
    if (Array.isArray(S)) {
      this.addVocabulary(S);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in S) {
      const b = S[m];
      b.keyword || (b.keyword = m), this.addKeyword(b);
    }
  }
  function K() {
    const S = { ...this.opts };
    for (const m of E)
      delete S[m];
    return S;
  }
  const re = { log() {
  }, warn() {
  }, error() {
  } };
  function Y(S) {
    if (S === !1)
      return re;
    if (S === void 0)
      return console;
    if (S.log && S.warn && S.error)
      return S;
    throw new Error("logger must implement log, warn and error methods");
  }
  const ee = /^[a-z_$][a-z0-9_$:-]*$/i;
  function L(S, m) {
    const { RULES: b } = this;
    if ((0, u.eachItem)(S, ($) => {
      if (b.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!ee.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function M(S, m, b) {
    var $;
    const c = m == null ? void 0 : m.post;
    if (b && c)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: d } = this;
    let P = c ? d.post : d.rules.find(({ type: A }) => A === b);
    if (P || (P = { type: b, rules: [] }, d.rules.push(P)), d.keywords[S] = !0, !m)
      return;
    const j = {
      keyword: S,
      definition: {
        ...m,
        type: (0, f.getJSONTypes)(m.type),
        schemaType: (0, f.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? H.call(this, P, j, m.before) : P.rules.push(j), d.all[S] = j, ($ = m.implements) === null || $ === void 0 || $.forEach((A) => this.addKeyword(A));
  }
  function H(S, m, b) {
    const $ = S.rules.findIndex((c) => c.keyword === b);
    $ >= 0 ? S.rules.splice($, 0, m) : (S.rules.push(m), this.logger.warn(`rule ${b} is not defined`));
  }
  function q(S) {
    let { metaSchema: m } = S;
    m !== void 0 && (S.$data && this.opts.$data && (m = C(m)), S.validateSchema = this.compile(m, !0));
  }
  const k = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function C(S) {
    return { anyOf: [S, k] };
  }
})(Zu);
var ti = {}, ri = {}, ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
const Gg = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ni.default = Gg;
var lr = {};
Object.defineProperty(lr, "__esModule", { value: !0 });
lr.callRef = lr.getValidate = void 0;
const xg = Mr, Nc = ut(), Ge = ae, hr = zt(), Rc = Be, jn = x, Bg = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: o, validateName: a, opts: l, self: i } = n, { root: f } = o;
    if ((r === "#" || r === "#/") && s === f.baseId)
      return h();
    const u = Rc.resolveRef.call(i, f, s, r);
    if (u === void 0)
      throw new xg.default(n.opts.uriResolver, s, r);
    if (u instanceof Rc.SchemaEnv)
      return w(u);
    return _(u);
    function h() {
      if (o === f)
        return rs(e, a, o, o.$async);
      const E = t.scopeValue("root", { ref: f });
      return rs(e, (0, Ge._)`${E}.validate`, f, f.$async);
    }
    function w(E) {
      const y = yf(e, E);
      rs(e, y, E, E.$async);
    }
    function _(E) {
      const y = t.scopeValue("schema", l.code.source === !0 ? { ref: E, code: (0, Ge.stringify)(E) } : { ref: E }), g = t.name("valid"), p = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: Ge.nil,
        topSchemaRef: y,
        errSchemaPath: r
      }, g);
      e.mergeEvaluated(p), e.ok(g);
    }
  }
};
function yf(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ge._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
lr.getValidate = yf;
function rs(e, t, r, n) {
  const { gen: s, it: o } = e, { allErrors: a, schemaEnv: l, opts: i } = o, f = i.passContext ? hr.default.this : Ge.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, Ge._)`await ${(0, Nc.callValidateCode)(e, t, f)}`), _(t), a || s.assign(E, !0);
    }, (y) => {
      s.if((0, Ge._)`!(${y} instanceof ${o.ValidationError})`, () => s.throw(y)), w(y), a || s.assign(E, !1);
    }), e.ok(E);
  }
  function h() {
    e.result((0, Nc.callValidateCode)(e, t, f), () => _(t), () => w(t));
  }
  function w(E) {
    const y = (0, Ge._)`${E}.errors`;
    s.assign(hr.default.vErrors, (0, Ge._)`${hr.default.vErrors} === null ? ${y} : ${hr.default.vErrors}.concat(${y})`), s.assign(hr.default.errors, (0, Ge._)`${hr.default.vErrors}.length`);
  }
  function _(E) {
    var y;
    if (!o.opts.unevaluated)
      return;
    const g = (y = r == null ? void 0 : r.validate) === null || y === void 0 ? void 0 : y.evaluated;
    if (o.props !== !0)
      if (g && !g.dynamicProps)
        g.props !== void 0 && (o.props = jn.mergeEvaluated.props(s, g.props, o.props));
      else {
        const p = s.var("props", (0, Ge._)`${E}.evaluated.props`);
        o.props = jn.mergeEvaluated.props(s, p, o.props, Ge.Name);
      }
    if (o.items !== !0)
      if (g && !g.dynamicItems)
        g.items !== void 0 && (o.items = jn.mergeEvaluated.items(s, g.items, o.items));
      else {
        const p = s.var("items", (0, Ge._)`${E}.evaluated.items`);
        o.items = jn.mergeEvaluated.items(s, p, o.items, Ge.Name);
      }
  }
}
lr.callRef = rs;
lr.default = Bg;
Object.defineProperty(ri, "__esModule", { value: !0 });
const Kg = ni, Hg = lr, Wg = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Kg.default,
  Hg.default
];
ri.default = Wg;
var si = {}, oi = {};
Object.defineProperty(oi, "__esModule", { value: !0 });
const ys = ae, Ct = ys.operators, _s = {
  maximum: { okStr: "<=", ok: Ct.LTE, fail: Ct.GT },
  minimum: { okStr: ">=", ok: Ct.GTE, fail: Ct.LT },
  exclusiveMaximum: { okStr: "<", ok: Ct.LT, fail: Ct.GTE },
  exclusiveMinimum: { okStr: ">", ok: Ct.GT, fail: Ct.LTE }
}, Jg = {
  message: ({ keyword: e, schemaCode: t }) => (0, ys.str)`must be ${_s[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, ys._)`{comparison: ${_s[e].okStr}, limit: ${t}}`
}, Xg = {
  keyword: Object.keys(_s),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Jg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, ys._)`${r} ${_s[t].fail} ${n} || isNaN(${r})`);
  }
};
oi.default = Xg;
var ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
const cn = ae, Yg = {
  message: ({ schemaCode: e }) => (0, cn.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, cn._)`{multipleOf: ${e}}`
}, Qg = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Yg,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, o = s.opts.multipleOfPrecision, a = t.let("res"), l = o ? (0, cn._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, cn._)`${a} !== parseInt(${a})`;
    e.fail$data((0, cn._)`(${n} === 0 || (${a} = ${r}/${n}, ${l}))`);
  }
};
ai.default = Qg;
var ii = {}, ci = {};
Object.defineProperty(ci, "__esModule", { value: !0 });
function _f(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
ci.default = _f;
_f.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(ii, "__esModule", { value: !0 });
const sr = ae, Zg = x, e$ = ci, t$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, sr.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, sr._)`{limit: ${e}}`
}, r$ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: t$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, o = t === "maxLength" ? sr.operators.GT : sr.operators.LT, a = s.opts.unicode === !1 ? (0, sr._)`${r}.length` : (0, sr._)`${(0, Zg.useFunc)(e.gen, e$.default)}(${r})`;
    e.fail$data((0, sr._)`${a} ${o} ${n}`);
  }
};
ii.default = r$;
var li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
const n$ = ut(), gs = ae, s$ = {
  message: ({ schemaCode: e }) => (0, gs.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, gs._)`{pattern: ${e}}`
}, o$ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: s$,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: o } = e, a = o.opts.unicodeRegExp ? "u" : "", l = r ? (0, gs._)`(new RegExp(${s}, ${a}))` : (0, n$.usePattern)(e, n);
    e.fail$data((0, gs._)`!${l}.test(${t})`);
  }
};
li.default = o$;
var ui = {};
Object.defineProperty(ui, "__esModule", { value: !0 });
const ln = ae, a$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, ln.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, ln._)`{limit: ${e}}`
}, i$ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: a$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? ln.operators.GT : ln.operators.LT;
    e.fail$data((0, ln._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
ui.default = i$;
var fi = {};
Object.defineProperty(fi, "__esModule", { value: !0 });
const Hr = ut(), un = ae, c$ = x, l$ = {
  message: ({ params: { missingProperty: e } }) => (0, un.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, un._)`{missingProperty: ${e}}`
}, u$ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: l$,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: o, it: a } = e, { opts: l } = a;
    if (!o && r.length === 0)
      return;
    const i = r.length >= l.loopRequired;
    if (a.allErrors ? f() : u(), l.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const y of r)
        if ((_ == null ? void 0 : _[y]) === void 0 && !E.has(y)) {
          const g = a.schemaEnv.baseId + a.errSchemaPath, p = `required property "${y}" is not defined at "${g}" (strictRequired)`;
          (0, c$.checkStrictMode)(a, p, a.opts.strictRequired);
        }
    }
    function f() {
      if (i || o)
        e.block$data(un.nil, h);
      else
        for (const _ of r)
          (0, Hr.checkReportMissingProp)(e, _);
    }
    function u() {
      const _ = t.let("missing");
      if (i || o) {
        const E = t.let("valid", !0);
        e.block$data(E, () => w(_, E)), e.ok(E);
      } else
        t.if((0, Hr.checkMissingProp)(e, r, _)), (0, Hr.reportMissingProp)(e, _), t.else();
    }
    function h() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Hr.noPropertyInData)(t, s, _, l.ownProperties), () => e.error());
      });
    }
    function w(_, E) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(E, (0, Hr.propertyInData)(t, s, _, l.ownProperties)), t.if((0, un.not)(E), () => {
          e.error(), t.break();
        });
      }, un.nil);
    }
  }
};
fi.default = u$;
var di = {};
Object.defineProperty(di, "__esModule", { value: !0 });
const fn = ae, f$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, fn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, fn._)`{limit: ${e}}`
}, d$ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: f$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? fn.operators.GT : fn.operators.LT;
    e.fail$data((0, fn._)`${r}.length ${s} ${n}`);
  }
};
di.default = d$;
var hi = {}, $n = {};
Object.defineProperty($n, "__esModule", { value: !0 });
const gf = Ns;
gf.code = 'require("ajv/dist/runtime/equal").default';
$n.default = gf;
Object.defineProperty(hi, "__esModule", { value: !0 });
const to = be, Ie = ae, h$ = x, p$ = $n, m$ = {
  message: ({ params: { i: e, j: t } }) => (0, Ie.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ie._)`{i: ${e}, j: ${t}}`
}, y$ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: m$,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: o, schemaCode: a, it: l } = e;
    if (!n && !s)
      return;
    const i = t.let("valid"), f = o.items ? (0, to.getSchemaTypes)(o.items) : [];
    e.block$data(i, u, (0, Ie._)`${a} === false`), e.ok(i);
    function u() {
      const E = t.let("i", (0, Ie._)`${r}.length`), y = t.let("j");
      e.setParams({ i: E, j: y }), t.assign(i, !0), t.if((0, Ie._)`${E} > 1`, () => (h() ? w : _)(E, y));
    }
    function h() {
      return f.length > 0 && !f.some((E) => E === "object" || E === "array");
    }
    function w(E, y) {
      const g = t.name("item"), p = (0, to.checkDataTypes)(f, g, l.opts.strictNumbers, to.DataType.Wrong), v = t.const("indices", (0, Ie._)`{}`);
      t.for((0, Ie._)`;${E}--;`, () => {
        t.let(g, (0, Ie._)`${r}[${E}]`), t.if(p, (0, Ie._)`continue`), f.length > 1 && t.if((0, Ie._)`typeof ${g} == "string"`, (0, Ie._)`${g} += "_"`), t.if((0, Ie._)`typeof ${v}[${g}] == "number"`, () => {
          t.assign(y, (0, Ie._)`${v}[${g}]`), e.error(), t.assign(i, !1).break();
        }).code((0, Ie._)`${v}[${g}] = ${E}`);
      });
    }
    function _(E, y) {
      const g = (0, h$.useFunc)(t, p$.default), p = t.name("outer");
      t.label(p).for((0, Ie._)`;${E}--;`, () => t.for((0, Ie._)`${y} = ${E}; ${y}--;`, () => t.if((0, Ie._)`${g}(${r}[${E}], ${r}[${y}])`, () => {
        e.error(), t.assign(i, !1).break(p);
      })));
    }
  }
};
hi.default = y$;
var pi = {};
Object.defineProperty(pi, "__esModule", { value: !0 });
const Do = ae, _$ = x, g$ = $n, $$ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Do._)`{allowedValue: ${e}}`
}, v$ = {
  keyword: "const",
  $data: !0,
  error: $$,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, Do._)`!${(0, _$.useFunc)(t, g$.default)}(${r}, ${s})`) : e.fail((0, Do._)`${o} !== ${r}`);
  }
};
pi.default = v$;
var mi = {};
Object.defineProperty(mi, "__esModule", { value: !0 });
const en = ae, E$ = x, w$ = $n, S$ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, en._)`{allowedValues: ${e}}`
}, b$ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: S$,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: o, it: a } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= a.opts.loopEnum;
    let i;
    const f = () => i ?? (i = (0, E$.useFunc)(t, w$.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", o);
      u = (0, en.or)(...s.map((E, y) => w(_, y)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", o, (_) => t.if((0, en._)`${f()}(${r}, ${_})`, () => t.assign(u, !0).break()));
    }
    function w(_, E) {
      const y = s[E];
      return typeof y == "object" && y !== null ? (0, en._)`${f()}(${r}, ${_}[${E}])` : (0, en._)`${r} === ${y}`;
    }
  }
};
mi.default = b$;
Object.defineProperty(si, "__esModule", { value: !0 });
const P$ = oi, O$ = ai, N$ = ii, R$ = li, T$ = ui, I$ = fi, k$ = di, C$ = hi, j$ = pi, A$ = mi, D$ = [
  // number
  P$.default,
  O$.default,
  // string
  N$.default,
  R$.default,
  // object
  T$.default,
  I$.default,
  // array
  k$.default,
  C$.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  j$.default,
  A$.default
];
si.default = D$;
var yi = {}, Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.validateAdditionalItems = void 0;
const or = ae, Lo = x, L$ = {
  message: ({ params: { len: e } }) => (0, or.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, or._)`{limit: ${e}}`
}, M$ = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: L$,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Lo.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    $f(e, n);
  }
};
function $f(e, t) {
  const { gen: r, schema: n, data: s, keyword: o, it: a } = e;
  a.items = !0;
  const l = r.const("len", (0, or._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, or._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Lo.alwaysValidSchema)(a, n)) {
    const f = r.var("valid", (0, or._)`${l} <= ${t.length}`);
    r.if((0, or.not)(f), () => i(f)), e.ok(f);
  }
  function i(f) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: o, dataProp: u, dataPropType: Lo.Type.Num }, f), a.allErrors || r.if((0, or.not)(f), () => r.break());
    });
  }
}
Fr.validateAdditionalItems = $f;
Fr.default = M$;
var _i = {}, Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.validateTuple = void 0;
const Tc = ae, ns = x, F$ = ut(), U$ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return vf(e, "additionalItems", t);
    r.items = !0, !(0, ns.alwaysValidSchema)(r, t) && e.ok((0, F$.validateArray)(e));
  }
};
function vf(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: o, keyword: a, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = ns.mergeEvaluated.items(n, r.length, l.items));
  const i = n.name("valid"), f = n.const("len", (0, Tc._)`${o}.length`);
  r.forEach((h, w) => {
    (0, ns.alwaysValidSchema)(l, h) || (n.if((0, Tc._)`${f} > ${w}`, () => e.subschema({
      keyword: a,
      schemaProp: w,
      dataProp: w
    }, i)), e.ok(i));
  });
  function u(h) {
    const { opts: w, errSchemaPath: _ } = l, E = r.length, y = E === h.minItems && (E === h.maxItems || h[t] === !1);
    if (w.strictTuples && !y) {
      const g = `"${a}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, ns.checkStrictMode)(l, g, w.strictTuples);
    }
  }
}
Ur.validateTuple = vf;
Ur.default = U$;
Object.defineProperty(_i, "__esModule", { value: !0 });
const V$ = Ur, q$ = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, V$.validateTuple)(e, "items")
};
_i.default = q$;
var gi = {};
Object.defineProperty(gi, "__esModule", { value: !0 });
const Ic = ae, z$ = x, G$ = ut(), x$ = Fr, B$ = {
  message: ({ params: { len: e } }) => (0, Ic.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ic._)`{limit: ${e}}`
}, K$ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: B$,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, z$.alwaysValidSchema)(n, t) && (s ? (0, x$.validateAdditionalItems)(e, s) : e.ok((0, G$.validateArray)(e)));
  }
};
gi.default = K$;
var $i = {};
Object.defineProperty($i, "__esModule", { value: !0 });
const Qe = ae, An = x, H$ = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Qe.str)`must contain at least ${e} valid item(s)` : (0, Qe.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Qe._)`{minContains: ${e}}` : (0, Qe._)`{minContains: ${e}, maxContains: ${t}}`
}, W$ = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: H$,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    let a, l;
    const { minContains: i, maxContains: f } = n;
    o.opts.next ? (a = i === void 0 ? 1 : i, l = f) : a = 1;
    const u = t.const("len", (0, Qe._)`${s}.length`);
    if (e.setParams({ min: a, max: l }), l === void 0 && a === 0) {
      (0, An.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && a > l) {
      (0, An.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, An.alwaysValidSchema)(o, r)) {
      let y = (0, Qe._)`${u} >= ${a}`;
      l !== void 0 && (y = (0, Qe._)`${y} && ${u} <= ${l}`), e.pass(y);
      return;
    }
    o.items = !0;
    const h = t.name("valid");
    l === void 0 && a === 1 ? _(h, () => t.if(h, () => t.break())) : a === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, Qe._)`${s}.length > 0`, w)) : (t.let(h, !1), w()), e.result(h, () => e.reset());
    function w() {
      const y = t.name("_valid"), g = t.let("count", 0);
      _(y, () => t.if(y, () => E(g)));
    }
    function _(y, g) {
      t.forRange("i", 0, u, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: An.Type.Num,
          compositeRule: !0
        }, y), g();
      });
    }
    function E(y) {
      t.code((0, Qe._)`${y}++`), l === void 0 ? t.if((0, Qe._)`${y} >= ${a}`, () => t.assign(h, !0).break()) : (t.if((0, Qe._)`${y} > ${l}`, () => t.assign(h, !1).break()), a === 1 ? t.assign(h, !0) : t.if((0, Qe._)`${y} >= ${a}`, () => t.assign(h, !0)));
    }
  }
};
$i.default = W$;
var Ef = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ae, r = x, n = ut();
  e.error = {
    message: ({ params: { property: i, depsCount: f, deps: u } }) => {
      const h = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${i} is present`;
    },
    params: ({ params: { property: i, depsCount: f, deps: u, missingProperty: h } }) => (0, t._)`{property: ${i},
    missingProperty: ${h},
    depsCount: ${f},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(i) {
      const [f, u] = o(i);
      a(i, f), l(i, u);
    }
  };
  function o({ schema: i }) {
    const f = {}, u = {};
    for (const h in i) {
      if (h === "__proto__")
        continue;
      const w = Array.isArray(i[h]) ? f : u;
      w[h] = i[h];
    }
    return [f, u];
  }
  function a(i, f = i.schema) {
    const { gen: u, data: h, it: w } = i;
    if (Object.keys(f).length === 0)
      return;
    const _ = u.let("missing");
    for (const E in f) {
      const y = f[E];
      if (y.length === 0)
        continue;
      const g = (0, n.propertyInData)(u, h, E, w.opts.ownProperties);
      i.setParams({
        property: E,
        depsCount: y.length,
        deps: y.join(", ")
      }), w.allErrors ? u.if(g, () => {
        for (const p of y)
          (0, n.checkReportMissingProp)(i, p);
      }) : (u.if((0, t._)`${g} && (${(0, n.checkMissingProp)(i, y, _)})`), (0, n.reportMissingProp)(i, _), u.else());
    }
  }
  e.validatePropertyDeps = a;
  function l(i, f = i.schema) {
    const { gen: u, data: h, keyword: w, it: _ } = i, E = u.name("valid");
    for (const y in f)
      (0, r.alwaysValidSchema)(_, f[y]) || (u.if(
        (0, n.propertyInData)(u, h, y, _.opts.ownProperties),
        () => {
          const g = i.subschema({ keyword: w, schemaProp: y }, E);
          i.mergeValidEvaluated(g, E);
        },
        () => u.var(E, !0)
        // TODO var
      ), i.ok(E));
  }
  e.validateSchemaDeps = l, e.default = s;
})(Ef);
var vi = {};
Object.defineProperty(vi, "__esModule", { value: !0 });
const wf = ae, J$ = x, X$ = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, wf._)`{propertyName: ${e.propertyName}}`
}, Y$ = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: X$,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, J$.alwaysValidSchema)(s, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, o), t.if((0, wf.not)(o), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
vi.default = Y$;
var Ls = {};
Object.defineProperty(Ls, "__esModule", { value: !0 });
const Dn = ut(), ot = ae, Q$ = zt(), Ln = x, Z$ = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, ot._)`{additionalProperty: ${e.additionalProperty}}`
}, e0 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Z$,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: o, it: a } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: i } = a;
    if (a.props = !0, i.removeAdditional !== "all" && (0, Ln.alwaysValidSchema)(a, r))
      return;
    const f = (0, Dn.allSchemaProperties)(n.properties), u = (0, Dn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, ot._)`${o} === ${Q$.default.errors}`);
    function h() {
      t.forIn("key", s, (g) => {
        !f.length && !u.length ? E(g) : t.if(w(g), () => E(g));
      });
    }
    function w(g) {
      let p;
      if (f.length > 8) {
        const v = (0, Ln.schemaRefOrVal)(a, n.properties, "properties");
        p = (0, Dn.isOwnProperty)(t, v, g);
      } else f.length ? p = (0, ot.or)(...f.map((v) => (0, ot._)`${g} === ${v}`)) : p = ot.nil;
      return u.length && (p = (0, ot.or)(p, ...u.map((v) => (0, ot._)`${(0, Dn.usePattern)(e, v)}.test(${g})`))), (0, ot.not)(p);
    }
    function _(g) {
      t.code((0, ot._)`delete ${s}[${g}]`);
    }
    function E(g) {
      if (i.removeAdditional === "all" || i.removeAdditional && r === !1) {
        _(g);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: g }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Ln.alwaysValidSchema)(a, r)) {
        const p = t.name("valid");
        i.removeAdditional === "failing" ? (y(g, p, !1), t.if((0, ot.not)(p), () => {
          e.reset(), _(g);
        })) : (y(g, p), l || t.if((0, ot.not)(p), () => t.break()));
      }
    }
    function y(g, p, v) {
      const O = {
        keyword: "additionalProperties",
        dataProp: g,
        dataPropType: Ln.Type.Str
      };
      v === !1 && Object.assign(O, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(O, p);
    }
  }
};
Ls.default = e0;
var Ei = {};
Object.defineProperty(Ei, "__esModule", { value: !0 });
const t0 = js(), kc = ut(), ro = x, Cc = Ls, r0 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Cc.default.code(new t0.KeywordCxt(o, Cc.default, "additionalProperties"));
    const a = (0, kc.allSchemaProperties)(r);
    for (const h of a)
      o.definedProperties.add(h);
    o.opts.unevaluated && a.length && o.props !== !0 && (o.props = ro.mergeEvaluated.props(t, (0, ro.toHash)(a), o.props));
    const l = a.filter((h) => !(0, ro.alwaysValidSchema)(o, r[h]));
    if (l.length === 0)
      return;
    const i = t.name("valid");
    for (const h of l)
      f(h) ? u(h) : (t.if((0, kc.propertyInData)(t, s, h, o.opts.ownProperties)), u(h), o.allErrors || t.else().var(i, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(i);
    function f(h) {
      return o.opts.useDefaults && !o.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, i);
    }
  }
};
Ei.default = r0;
var wi = {};
Object.defineProperty(wi, "__esModule", { value: !0 });
const jc = ut(), Mn = ae, Ac = x, Dc = x, n0 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: o } = e, { opts: a } = o, l = (0, jc.allSchemaProperties)(r), i = l.filter((y) => (0, Ac.alwaysValidSchema)(o, r[y]));
    if (l.length === 0 || i.length === l.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && s.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof Mn.Name) && (o.props = (0, Dc.evaluatedPropsToName)(t, o.props));
    const { props: h } = o;
    w();
    function w() {
      for (const y of l)
        f && _(y), o.allErrors ? E(y) : (t.var(u, !0), E(y), t.if(u));
    }
    function _(y) {
      for (const g in f)
        new RegExp(y).test(g) && (0, Ac.checkStrictMode)(o, `property ${g} matches pattern ${y} (use allowMatchingProperties)`);
    }
    function E(y) {
      t.forIn("key", n, (g) => {
        t.if((0, Mn._)`${(0, jc.usePattern)(e, y)}.test(${g})`, () => {
          const p = i.includes(y);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: y,
            dataProp: g,
            dataPropType: Dc.Type.Str
          }, u), o.opts.unevaluated && h !== !0 ? t.assign((0, Mn._)`${h}[${g}]`, !0) : !p && !o.allErrors && t.if((0, Mn.not)(u), () => t.break());
        });
      });
    }
  }
};
wi.default = n0;
var Si = {};
Object.defineProperty(Si, "__esModule", { value: !0 });
const s0 = x, o0 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, s0.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Si.default = o0;
var bi = {};
Object.defineProperty(bi, "__esModule", { value: !0 });
const a0 = ut(), i0 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: a0.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
bi.default = i0;
var Pi = {};
Object.defineProperty(Pi, "__esModule", { value: !0 });
const ss = ae, c0 = x, l0 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ss._)`{passingSchemas: ${e.passing}}`
}, u0 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: l0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const o = r, a = t.let("valid", !1), l = t.let("passing", null), i = t.name("_valid");
    e.setParams({ passing: l }), t.block(f), e.result(a, () => e.reset(), () => e.error(!0));
    function f() {
      o.forEach((u, h) => {
        let w;
        (0, c0.alwaysValidSchema)(s, u) ? t.var(i, !0) : w = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, i), h > 0 && t.if((0, ss._)`${i} && ${a}`).assign(a, !1).assign(l, (0, ss._)`[${l}, ${h}]`).else(), t.if(i, () => {
          t.assign(a, !0), t.assign(l, h), w && e.mergeEvaluated(w, ss.Name);
        });
      });
    }
  }
};
Pi.default = u0;
var Oi = {};
Object.defineProperty(Oi, "__esModule", { value: !0 });
const f0 = x, d0 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((o, a) => {
      if ((0, f0.alwaysValidSchema)(n, o))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: a }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
Oi.default = d0;
var Ni = {};
Object.defineProperty(Ni, "__esModule", { value: !0 });
const $s = ae, Sf = x, h0 = {
  message: ({ params: e }) => (0, $s.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, $s._)`{failingKeyword: ${e.ifClause}}`
}, p0 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: h0,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Sf.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Lc(n, "then"), o = Lc(n, "else");
    if (!s && !o)
      return;
    const a = t.let("valid", !0), l = t.name("_valid");
    if (i(), e.reset(), s && o) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, f("then", u), f("else", u));
    } else s ? t.if(l, f("then")) : t.if((0, $s.not)(l), f("else"));
    e.pass(a, () => e.error(!0));
    function i() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function f(u, h) {
      return () => {
        const w = e.subschema({ keyword: u }, l);
        t.assign(a, l), e.mergeValidEvaluated(w, a), h ? t.assign(h, (0, $s._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Lc(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Sf.alwaysValidSchema)(e, r);
}
Ni.default = p0;
var Ri = {};
Object.defineProperty(Ri, "__esModule", { value: !0 });
const m0 = x, y0 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, m0.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Ri.default = y0;
Object.defineProperty(yi, "__esModule", { value: !0 });
const _0 = Fr, g0 = _i, $0 = Ur, v0 = gi, E0 = $i, w0 = Ef, S0 = vi, b0 = Ls, P0 = Ei, O0 = wi, N0 = Si, R0 = bi, T0 = Pi, I0 = Oi, k0 = Ni, C0 = Ri;
function j0(e = !1) {
  const t = [
    // any
    N0.default,
    R0.default,
    T0.default,
    I0.default,
    k0.default,
    C0.default,
    // object
    S0.default,
    b0.default,
    w0.default,
    P0.default,
    O0.default
  ];
  return e ? t.push(g0.default, v0.default) : t.push(_0.default, $0.default), t.push(E0.default), t;
}
yi.default = j0;
var Ti = {}, Ii = {};
Object.defineProperty(Ii, "__esModule", { value: !0 });
const we = ae, A0 = {
  message: ({ schemaCode: e }) => (0, we.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, we._)`{format: ${e}}`
}, D0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: A0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: o, schemaCode: a, it: l } = e, { opts: i, errSchemaPath: f, schemaEnv: u, self: h } = l;
    if (!i.validateFormats)
      return;
    s ? w() : _();
    function w() {
      const E = r.scopeValue("formats", {
        ref: h.formats,
        code: i.code.formats
      }), y = r.const("fDef", (0, we._)`${E}[${a}]`), g = r.let("fType"), p = r.let("format");
      r.if((0, we._)`typeof ${y} == "object" && !(${y} instanceof RegExp)`, () => r.assign(g, (0, we._)`${y}.type || "string"`).assign(p, (0, we._)`${y}.validate`), () => r.assign(g, (0, we._)`"string"`).assign(p, y)), e.fail$data((0, we.or)(v(), O()));
      function v() {
        return i.strictSchema === !1 ? we.nil : (0, we._)`${a} && !${p}`;
      }
      function O() {
        const N = u.$async ? (0, we._)`(${y}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, we._)`${p}(${n})`, I = (0, we._)`(typeof ${p} == "function" ? ${N} : ${p}.test(${n}))`;
        return (0, we._)`${p} && ${p} !== true && ${g} === ${t} && !${I}`;
      }
    }
    function _() {
      const E = h.formats[o];
      if (!E) {
        v();
        return;
      }
      if (E === !0)
        return;
      const [y, g, p] = O(E);
      y === t && e.pass(N());
      function v() {
        if (i.strictSchema === !1) {
          h.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${o}" ignored in schema at path "${f}"`;
        }
      }
      function O(I) {
        const F = I instanceof RegExp ? (0, we.regexpCode)(I) : i.code.formats ? (0, we._)`${i.code.formats}${(0, we.getProperty)(o)}` : void 0, z = r.scopeValue("formats", { key: o, ref: I, code: F });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, we._)`${z}.validate`] : ["string", I, z];
      }
      function N() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, we._)`await ${p}(${n})`;
        }
        return typeof g == "function" ? (0, we._)`${p}(${n})` : (0, we._)`${p}.test(${n})`;
      }
    }
  }
};
Ii.default = D0;
Object.defineProperty(Ti, "__esModule", { value: !0 });
const L0 = Ii, M0 = [L0.default];
Ti.default = M0;
var Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.contentVocabulary = Cr.metadataVocabulary = void 0;
Cr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Cr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(ti, "__esModule", { value: !0 });
const F0 = ri, U0 = si, V0 = yi, q0 = Ti, Mc = Cr, z0 = [
  F0.default,
  U0.default,
  (0, V0.default)(),
  q0.default,
  Mc.metadataVocabulary,
  Mc.contentVocabulary
];
ti.default = z0;
var ki = {}, Ms = {};
Object.defineProperty(Ms, "__esModule", { value: !0 });
Ms.DiscrError = void 0;
var Fc;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Fc || (Ms.DiscrError = Fc = {}));
Object.defineProperty(ki, "__esModule", { value: !0 });
const gr = ae, Mo = Ms, Uc = Be, G0 = Mr, x0 = x, B0 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Mo.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, gr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, K0 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: B0,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: o } = e, { oneOf: a } = s;
    if (!o.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!a)
      throw new Error("discriminator: requires oneOf keyword");
    const i = t.let("valid", !1), f = t.const("tag", (0, gr._)`${r}${(0, gr.getProperty)(l)}`);
    t.if((0, gr._)`typeof ${f} == "string"`, () => u(), () => e.error(!1, { discrError: Mo.DiscrError.Tag, tag: f, tagName: l })), e.ok(i);
    function u() {
      const _ = w();
      t.if(!1);
      for (const E in _)
        t.elseIf((0, gr._)`${f} === ${E}`), t.assign(i, h(_[E]));
      t.else(), e.error(!1, { discrError: Mo.DiscrError.Mapping, tag: f, tagName: l }), t.endIf();
    }
    function h(_) {
      const E = t.name("valid"), y = e.subschema({ keyword: "oneOf", schemaProp: _ }, E);
      return e.mergeEvaluated(y, gr.Name), E;
    }
    function w() {
      var _;
      const E = {}, y = p(s);
      let g = !0;
      for (let N = 0; N < a.length; N++) {
        let I = a[N];
        if (I != null && I.$ref && !(0, x0.schemaHasRulesButRef)(I, o.self.RULES)) {
          const z = I.$ref;
          if (I = Uc.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, z), I instanceof Uc.SchemaEnv && (I = I.schema), I === void 0)
            throw new G0.default(o.opts.uriResolver, o.baseId, z);
        }
        const F = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[l];
        if (typeof F != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        g = g && (y || p(I)), v(F, N);
      }
      if (!g)
        throw new Error(`discriminator: "${l}" must be required`);
      return E;
      function p({ required: N }) {
        return Array.isArray(N) && N.includes(l);
      }
      function v(N, I) {
        if (N.const)
          O(N.const, I);
        else if (N.enum)
          for (const F of N.enum)
            O(F, I);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function O(N, I) {
        if (typeof N != "string" || N in E)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        E[N] = I;
      }
    }
  }
};
ki.default = K0;
const H0 = "http://json-schema.org/draft-07/schema#", W0 = "http://json-schema.org/draft-07/schema#", J0 = "Core schema meta-schema", X0 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, Y0 = [
  "object",
  "boolean"
], Q0 = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, Z0 = {
  $schema: H0,
  $id: W0,
  title: J0,
  definitions: X0,
  type: Y0,
  properties: Q0,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Zu, n = ti, s = ki, o = Z0, a = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class i extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(o, a) : o;
      this.addMetaSchema(E, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = i, e.exports = t = i, e.exports.Ajv = i, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = i;
  var f = js();
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return f.KeywordCxt;
  } });
  var u = ae;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var h = Qa();
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var w = Mr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return w.default;
  } });
})(Io, Io.exports);
var ev = Io.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = ev, r = ae, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, o = {
    message: ({ keyword: l, schemaCode: i }) => r.str`should be ${s[l].okStr} ${i}`,
    params: ({ keyword: l, schemaCode: i }) => r._`{comparison: ${s[l].okStr}, limit: ${i}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: o,
    code(l) {
      const { gen: i, data: f, schemaCode: u, keyword: h, it: w } = l, { opts: _, self: E } = w;
      if (!_.validateFormats)
        return;
      const y = new t.KeywordCxt(w, E.RULES.all.format.definition, "format");
      y.$data ? g() : p();
      function g() {
        const O = i.scopeValue("formats", {
          ref: E.formats,
          code: _.code.formats
        }), N = i.const("fmt", r._`${O}[${y.schemaCode}]`);
        l.fail$data(r.or(r._`typeof ${N} != "object"`, r._`${N} instanceof RegExp`, r._`typeof ${N}.compare != "function"`, v(N)));
      }
      function p() {
        const O = y.schema, N = E.formats[O];
        if (!N || N === !0)
          return;
        if (typeof N != "object" || N instanceof RegExp || typeof N.compare != "function")
          throw new Error(`"${h}": format "${O}" does not define "compare" function`);
        const I = i.scopeValue("formats", {
          key: O,
          ref: N,
          code: _.code.formats ? r._`${_.code.formats}${r.getProperty(O)}` : void 0
        });
        l.fail$data(v(I));
      }
      function v(O) {
        return r._`${O}.compare(${f}, ${u}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const a = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = a;
})(Qu);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Yu, n = Qu, s = ae, o = new s.Name("fullFormats"), a = new s.Name("fastFormats"), l = (f, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return i(f, u, r.fullFormats, o), f;
    const [h, w] = u.mode === "fast" ? [r.fastFormats, a] : [r.fullFormats, o], _ = u.formats || r.formatNames;
    return i(f, _, h, w), u.keywords && n.default(f), f;
  };
  l.get = (f, u = "full") => {
    const w = (u === "fast" ? r.fastFormats : r.fullFormats)[f];
    if (!w)
      throw new Error(`Unknown format "${f}"`);
    return w;
  };
  function i(f, u, h, w) {
    var _, E;
    (_ = (E = f.opts.code).formats) !== null && _ !== void 0 || (E.formats = s._`require("ajv-formats/dist/formats").${w}`);
    for (const y of u)
      f.addFormat(y, h[y]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})(To, To.exports);
var tv = To.exports;
const rv = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), o = Object.getOwnPropertyDescriptor(t, r);
  !nv(s, o) && n || Object.defineProperty(e, r, o);
}, nv = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, sv = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, ov = (e, t) => `/* Wrapped ${e}*/
${t}`, av = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), iv = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), cv = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = ov.bind(null, n, t.toString());
  Object.defineProperty(s, "name", iv), Object.defineProperty(e, "toString", { ...av, value: s });
}, lv = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    rv(e, t, s, r);
  return sv(e, t), cv(e, t, n), e;
};
var uv = lv;
const fv = uv;
var dv = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: s = !0
  } = t;
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let o, a;
  const l = function(...i) {
    const f = this, u = () => {
      o = void 0, s && (a = e.apply(f, i));
    }, h = n && !o;
    return clearTimeout(o), o = setTimeout(u, r), h && (a = e.apply(f, i)), a;
  };
  return fv(l, e), l.cancel = () => {
    o && (clearTimeout(o), o = void 0);
  }, l;
}, Fo = { exports: {} };
const hv = "2.0.0", bf = 256, pv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, mv = 16, yv = bf - 6, _v = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Fs = {
  MAX_LENGTH: bf,
  MAX_SAFE_COMPONENT_LENGTH: mv,
  MAX_SAFE_BUILD_LENGTH: yv,
  MAX_SAFE_INTEGER: pv,
  RELEASE_TYPES: _v,
  SEMVER_SPEC_VERSION: hv,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const gv = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Us = gv;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = Fs, o = Us;
  t = e.exports = {};
  const a = t.re = [], l = t.safeRe = [], i = t.src = [], f = t.safeSrc = [], u = t.t = {};
  let h = 0;
  const w = "[a-zA-Z0-9-]", _ = [
    ["\\s", 1],
    ["\\d", s],
    [w, n]
  ], E = (g) => {
    for (const [p, v] of _)
      g = g.split(`${p}*`).join(`${p}{0,${v}}`).split(`${p}+`).join(`${p}{1,${v}}`);
    return g;
  }, y = (g, p, v) => {
    const O = E(p), N = h++;
    o(g, N, p), u[g] = N, i[N] = p, f[N] = O, a[N] = new RegExp(p, v ? "g" : void 0), l[N] = new RegExp(O, v ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${w}*`), y("MAINVERSION", `(${i[u.NUMERICIDENTIFIER]})\\.(${i[u.NUMERICIDENTIFIER]})\\.(${i[u.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${i[u.NUMERICIDENTIFIERLOOSE]})\\.(${i[u.NUMERICIDENTIFIERLOOSE]})\\.(${i[u.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${i[u.NONNUMERICIDENTIFIER]}|${i[u.NUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${i[u.NONNUMERICIDENTIFIER]}|${i[u.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASE", `(?:-(${i[u.PRERELEASEIDENTIFIER]}(?:\\.${i[u.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${i[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[u.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${w}+`), y("BUILD", `(?:\\+(${i[u.BUILDIDENTIFIER]}(?:\\.${i[u.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${i[u.MAINVERSION]}${i[u.PRERELEASE]}?${i[u.BUILD]}?`), y("FULL", `^${i[u.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${i[u.MAINVERSIONLOOSE]}${i[u.PRERELEASELOOSE]}?${i[u.BUILD]}?`), y("LOOSE", `^${i[u.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${i[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${i[u.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${i[u.XRANGEIDENTIFIER]})(?:\\.(${i[u.XRANGEIDENTIFIER]})(?:\\.(${i[u.XRANGEIDENTIFIER]})(?:${i[u.PRERELEASE]})?${i[u.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${i[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[u.XRANGEIDENTIFIERLOOSE]})(?:${i[u.PRERELEASELOOSE]})?${i[u.BUILD]}?)?)?`), y("XRANGE", `^${i[u.GTLT]}\\s*${i[u.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${i[u.GTLT]}\\s*${i[u.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), y("COERCE", `${i[u.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", i[u.COERCEPLAIN] + `(?:${i[u.PRERELEASE]})?(?:${i[u.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", i[u.COERCE], !0), y("COERCERTLFULL", i[u.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${i[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${i[u.LONETILDE]}${i[u.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${i[u.LONETILDE]}${i[u.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${i[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${i[u.LONECARET]}${i[u.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${i[u.LONECARET]}${i[u.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${i[u.GTLT]}\\s*(${i[u.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${i[u.GTLT]}\\s*(${i[u.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${i[u.GTLT]}\\s*(${i[u.LOOSEPLAIN]}|${i[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${i[u.XRANGEPLAIN]})\\s+-\\s+(${i[u.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${i[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${i[u.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Fo, Fo.exports);
var vn = Fo.exports;
const $v = Object.freeze({ loose: !0 }), vv = Object.freeze({}), Ev = (e) => e ? typeof e != "object" ? $v : e : vv;
var Ci = Ev;
const Vc = /^[0-9]+$/, Pf = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = Vc.test(e), n = Vc.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, wv = (e, t) => Pf(t, e);
var Of = {
  compareIdentifiers: Pf,
  rcompareIdentifiers: wv
};
const Fn = Us, { MAX_LENGTH: qc, MAX_SAFE_INTEGER: Un } = Fs, { safeRe: Vn, t: qn } = vn, Sv = Ci, { compareIdentifiers: no } = Of;
let bv = class mt {
  constructor(t, r) {
    if (r = Sv(r), t instanceof mt) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > qc)
      throw new TypeError(
        `version is longer than ${qc} characters`
      );
    Fn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Vn[qn.LOOSE] : Vn[qn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Un || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Un || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Un || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const o = +s;
        if (o >= 0 && o < Un)
          return o;
      }
      return s;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Fn("SemVer.compare", this.version, this.options, t), !(t instanceof mt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new mt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof mt || (t = new mt(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof mt || (t = new mt(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (Fn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return no(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof mt || (t = new mt(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (Fn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return no(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? Vn[qn.PRERELEASELOOSE] : Vn[qn.PRERELEASE]);
        if (!s || s[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const s = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [s];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let o = [r, s];
          n === !1 && (o = [r]), no(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ve = bv;
const zc = Ve, Pv = (e, t, r = !1) => {
  if (e instanceof zc)
    return e;
  try {
    return new zc(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Vr = Pv;
const Ov = Vr, Nv = (e, t) => {
  const r = Ov(e, t);
  return r ? r.version : null;
};
var Rv = Nv;
const Tv = Vr, Iv = (e, t) => {
  const r = Tv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var kv = Iv;
const Gc = Ve, Cv = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new Gc(
      e instanceof Gc ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var jv = Cv;
const xc = Vr, Av = (e, t) => {
  const r = xc(e, null, !0), n = xc(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const o = s > 0, a = o ? r : n, l = o ? n : r, i = !!a.prerelease.length;
  if (!!l.prerelease.length && !i) {
    if (!l.patch && !l.minor)
      return "major";
    if (l.compareMain(a) === 0)
      return l.minor && !l.patch ? "minor" : "patch";
  }
  const u = i ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var Dv = Av;
const Lv = Ve, Mv = (e, t) => new Lv(e, t).major;
var Fv = Mv;
const Uv = Ve, Vv = (e, t) => new Uv(e, t).minor;
var qv = Vv;
const zv = Ve, Gv = (e, t) => new zv(e, t).patch;
var xv = Gv;
const Bv = Vr, Kv = (e, t) => {
  const r = Bv(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Hv = Kv;
const Bc = Ve, Wv = (e, t, r) => new Bc(e, r).compare(new Bc(t, r));
var ft = Wv;
const Jv = ft, Xv = (e, t, r) => Jv(t, e, r);
var Yv = Xv;
const Qv = ft, Zv = (e, t) => Qv(e, t, !0);
var eE = Zv;
const Kc = Ve, tE = (e, t, r) => {
  const n = new Kc(e, r), s = new Kc(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var ji = tE;
const rE = ji, nE = (e, t) => e.sort((r, n) => rE(r, n, t));
var sE = nE;
const oE = ji, aE = (e, t) => e.sort((r, n) => oE(n, r, t));
var iE = aE;
const cE = ft, lE = (e, t, r) => cE(e, t, r) > 0;
var Vs = lE;
const uE = ft, fE = (e, t, r) => uE(e, t, r) < 0;
var Ai = fE;
const dE = ft, hE = (e, t, r) => dE(e, t, r) === 0;
var Nf = hE;
const pE = ft, mE = (e, t, r) => pE(e, t, r) !== 0;
var Rf = mE;
const yE = ft, _E = (e, t, r) => yE(e, t, r) >= 0;
var Di = _E;
const gE = ft, $E = (e, t, r) => gE(e, t, r) <= 0;
var Li = $E;
const vE = Nf, EE = Rf, wE = Vs, SE = Di, bE = Ai, PE = Li, OE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return vE(e, r, n);
    case "!=":
      return EE(e, r, n);
    case ">":
      return wE(e, r, n);
    case ">=":
      return SE(e, r, n);
    case "<":
      return bE(e, r, n);
    case "<=":
      return PE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Tf = OE;
const NE = Ve, RE = Vr, { safeRe: zn, t: Gn } = vn, TE = (e, t) => {
  if (e instanceof NE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? zn[Gn.COERCEFULL] : zn[Gn.COERCE]);
  else {
    const i = t.includePrerelease ? zn[Gn.COERCERTLFULL] : zn[Gn.COERCERTL];
    let f;
    for (; (f = i.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), i.lastIndex = f.index + f[1].length + f[2].length;
    i.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", l = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return RE(`${n}.${s}.${o}${a}${l}`, t);
};
var IE = TE;
class kE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var CE = kE, so, Hc;
function dt() {
  if (Hc) return so;
  Hc = 1;
  const e = /\s+/g;
  class t {
    constructor(M, H) {
      if (H = s(H), M instanceof t)
        return M.loose === !!H.loose && M.includePrerelease === !!H.includePrerelease ? M : new t(M.raw, H);
      if (M instanceof o)
        return this.raw = M.value, this.set = [[M]], this.formatted = void 0, this;
      if (this.options = H, this.loose = !!H.loose, this.includePrerelease = !!H.includePrerelease, this.raw = M.trim().replace(e, " "), this.set = this.raw.split("||").map((q) => this.parseRange(q.trim())).filter((q) => q.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const q = this.set[0];
        if (this.set = this.set.filter((k) => !y(k[0])), this.set.length === 0)
          this.set = [q];
        else if (this.set.length > 1) {
          for (const k of this.set)
            if (k.length === 1 && g(k[0])) {
              this.set = [k];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let M = 0; M < this.set.length; M++) {
          M > 0 && (this.formatted += "||");
          const H = this.set[M];
          for (let q = 0; q < H.length; q++)
            q > 0 && (this.formatted += " "), this.formatted += H[q].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(M) {
      const q = ((this.options.includePrerelease && _) | (this.options.loose && E)) + ":" + M, k = n.get(q);
      if (k)
        return k;
      const C = this.options.loose, S = C ? i[f.HYPHENRANGELOOSE] : i[f.HYPHENRANGE];
      M = M.replace(S, Y(this.options.includePrerelease)), a("hyphen replace", M), M = M.replace(i[f.COMPARATORTRIM], u), a("comparator trim", M), M = M.replace(i[f.TILDETRIM], h), a("tilde trim", M), M = M.replace(i[f.CARETTRIM], w), a("caret trim", M);
      let m = M.split(" ").map((d) => v(d, this.options)).join(" ").split(/\s+/).map((d) => re(d, this.options));
      C && (m = m.filter((d) => (a("loose invalid filter", d, this.options), !!d.match(i[f.COMPARATORLOOSE])))), a("range list", m);
      const b = /* @__PURE__ */ new Map(), $ = m.map((d) => new o(d, this.options));
      for (const d of $) {
        if (y(d))
          return [d];
        b.set(d.value, d);
      }
      b.size > 1 && b.has("") && b.delete("");
      const c = [...b.values()];
      return n.set(q, c), c;
    }
    intersects(M, H) {
      if (!(M instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((q) => p(q, H) && M.set.some((k) => p(k, H) && q.every((C) => k.every((S) => C.intersects(S, H)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(M) {
      if (!M)
        return !1;
      if (typeof M == "string")
        try {
          M = new l(M, this.options);
        } catch {
          return !1;
        }
      for (let H = 0; H < this.set.length; H++)
        if (ee(this.set[H], M, this.options))
          return !0;
      return !1;
    }
  }
  so = t;
  const r = CE, n = new r(), s = Ci, o = qs(), a = Us, l = Ve, {
    safeRe: i,
    t: f,
    comparatorTrimReplace: u,
    tildeTrimReplace: h,
    caretTrimReplace: w
  } = vn, { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: E } = Fs, y = (L) => L.value === "<0.0.0-0", g = (L) => L.value === "", p = (L, M) => {
    let H = !0;
    const q = L.slice();
    let k = q.pop();
    for (; H && q.length; )
      H = q.every((C) => k.intersects(C, M)), k = q.pop();
    return H;
  }, v = (L, M) => (L = L.replace(i[f.BUILD], ""), a("comp", L, M), L = F(L, M), a("caret", L), L = N(L, M), a("tildes", L), L = Z(L, M), a("xrange", L), L = K(L, M), a("stars", L), L), O = (L) => !L || L.toLowerCase() === "x" || L === "*", N = (L, M) => L.trim().split(/\s+/).map((H) => I(H, M)).join(" "), I = (L, M) => {
    const H = M.loose ? i[f.TILDELOOSE] : i[f.TILDE];
    return L.replace(H, (q, k, C, S, m) => {
      a("tilde", L, q, k, C, S, m);
      let b;
      return O(k) ? b = "" : O(C) ? b = `>=${k}.0.0 <${+k + 1}.0.0-0` : O(S) ? b = `>=${k}.${C}.0 <${k}.${+C + 1}.0-0` : m ? (a("replaceTilde pr", m), b = `>=${k}.${C}.${S}-${m} <${k}.${+C + 1}.0-0`) : b = `>=${k}.${C}.${S} <${k}.${+C + 1}.0-0`, a("tilde return", b), b;
    });
  }, F = (L, M) => L.trim().split(/\s+/).map((H) => z(H, M)).join(" "), z = (L, M) => {
    a("caret", L, M);
    const H = M.loose ? i[f.CARETLOOSE] : i[f.CARET], q = M.includePrerelease ? "-0" : "";
    return L.replace(H, (k, C, S, m, b) => {
      a("caret", L, k, C, S, m, b);
      let $;
      return O(C) ? $ = "" : O(S) ? $ = `>=${C}.0.0${q} <${+C + 1}.0.0-0` : O(m) ? C === "0" ? $ = `>=${C}.${S}.0${q} <${C}.${+S + 1}.0-0` : $ = `>=${C}.${S}.0${q} <${+C + 1}.0.0-0` : b ? (a("replaceCaret pr", b), C === "0" ? S === "0" ? $ = `>=${C}.${S}.${m}-${b} <${C}.${S}.${+m + 1}-0` : $ = `>=${C}.${S}.${m}-${b} <${C}.${+S + 1}.0-0` : $ = `>=${C}.${S}.${m}-${b} <${+C + 1}.0.0-0`) : (a("no pr"), C === "0" ? S === "0" ? $ = `>=${C}.${S}.${m}${q} <${C}.${S}.${+m + 1}-0` : $ = `>=${C}.${S}.${m}${q} <${C}.${+S + 1}.0-0` : $ = `>=${C}.${S}.${m} <${+C + 1}.0.0-0`), a("caret return", $), $;
    });
  }, Z = (L, M) => (a("replaceXRanges", L, M), L.split(/\s+/).map((H) => V(H, M)).join(" ")), V = (L, M) => {
    L = L.trim();
    const H = M.loose ? i[f.XRANGELOOSE] : i[f.XRANGE];
    return L.replace(H, (q, k, C, S, m, b) => {
      a("xRange", L, q, k, C, S, m, b);
      const $ = O(C), c = $ || O(S), d = c || O(m), P = d;
      return k === "=" && P && (k = ""), b = M.includePrerelease ? "-0" : "", $ ? k === ">" || k === "<" ? q = "<0.0.0-0" : q = "*" : k && P ? (c && (S = 0), m = 0, k === ">" ? (k = ">=", c ? (C = +C + 1, S = 0, m = 0) : (S = +S + 1, m = 0)) : k === "<=" && (k = "<", c ? C = +C + 1 : S = +S + 1), k === "<" && (b = "-0"), q = `${k + C}.${S}.${m}${b}`) : c ? q = `>=${C}.0.0${b} <${+C + 1}.0.0-0` : d && (q = `>=${C}.${S}.0${b} <${C}.${+S + 1}.0-0`), a("xRange return", q), q;
    });
  }, K = (L, M) => (a("replaceStars", L, M), L.trim().replace(i[f.STAR], "")), re = (L, M) => (a("replaceGTE0", L, M), L.trim().replace(i[M.includePrerelease ? f.GTE0PRE : f.GTE0], "")), Y = (L) => (M, H, q, k, C, S, m, b, $, c, d, P) => (O(q) ? H = "" : O(k) ? H = `>=${q}.0.0${L ? "-0" : ""}` : O(C) ? H = `>=${q}.${k}.0${L ? "-0" : ""}` : S ? H = `>=${H}` : H = `>=${H}${L ? "-0" : ""}`, O($) ? b = "" : O(c) ? b = `<${+$ + 1}.0.0-0` : O(d) ? b = `<${$}.${+c + 1}.0-0` : P ? b = `<=${$}.${c}.${d}-${P}` : L ? b = `<${$}.${c}.${+d + 1}-0` : b = `<=${b}`, `${H} ${b}`.trim()), ee = (L, M, H) => {
    for (let q = 0; q < L.length; q++)
      if (!L[q].test(M))
        return !1;
    if (M.prerelease.length && !H.includePrerelease) {
      for (let q = 0; q < L.length; q++)
        if (a(L[q].semver), L[q].semver !== o.ANY && L[q].semver.prerelease.length > 0) {
          const k = L[q].semver;
          if (k.major === M.major && k.minor === M.minor && k.patch === M.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return so;
}
var oo, Wc;
function qs() {
  if (Wc) return oo;
  Wc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, h) {
      if (h = r(h), u instanceof t) {
        if (u.loose === !!h.loose)
          return u;
        u = u.value;
      }
      u = u.trim().split(/\s+/).join(" "), a("comparator", u, h), this.options = h, this.loose = !!h.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(u) {
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], w = u.match(h);
      if (!w)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = w[1] !== void 0 ? w[1] : "", this.operator === "=" && (this.operator = ""), w[2] ? this.semver = new l(w[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (a("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new l(u, this.options);
        } catch {
          return !1;
        }
      return o(u, this.operator, this.semver, this.options);
    }
    intersects(u, h) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new i(u.value, h).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new i(this.value, h).test(u.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || o(this.semver, "<", u.semver, h) && this.operator.startsWith(">") && u.operator.startsWith("<") || o(this.semver, ">", u.semver, h) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  oo = t;
  const r = Ci, { safeRe: n, t: s } = vn, o = Tf, a = Us, l = Ve, i = dt();
  return oo;
}
const jE = dt(), AE = (e, t, r) => {
  try {
    t = new jE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var zs = AE;
const DE = dt(), LE = (e, t) => new DE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var ME = LE;
const FE = Ve, UE = dt(), VE = (e, t, r) => {
  let n = null, s = null, o = null;
  try {
    o = new UE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || s.compare(a) === -1) && (n = a, s = new FE(n, r));
  }), n;
};
var qE = VE;
const zE = Ve, GE = dt(), xE = (e, t, r) => {
  let n = null, s = null, o = null;
  try {
    o = new GE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || s.compare(a) === 1) && (n = a, s = new zE(n, r));
  }), n;
};
var BE = xE;
const ao = Ve, KE = dt(), Jc = Vs, HE = (e, t) => {
  e = new KE(e, t);
  let r = new ao("0.0.0");
  if (e.test(r) || (r = new ao("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let o = null;
    s.forEach((a) => {
      const l = new ao(a.semver.version);
      switch (a.operator) {
        case ">":
          l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
        case "":
        case ">=":
          (!o || Jc(l, o)) && (o = l);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || Jc(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var WE = HE;
const JE = dt(), XE = (e, t) => {
  try {
    return new JE(e, t).range || "*";
  } catch {
    return null;
  }
};
var YE = XE;
const QE = Ve, If = qs(), { ANY: ZE } = If, ew = dt(), tw = zs, Xc = Vs, Yc = Ai, rw = Li, nw = Di, sw = (e, t, r, n) => {
  e = new QE(e, n), t = new ew(t, n);
  let s, o, a, l, i;
  switch (r) {
    case ">":
      s = Xc, o = rw, a = Yc, l = ">", i = ">=";
      break;
    case "<":
      s = Yc, o = nw, a = Xc, l = "<", i = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (tw(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const u = t.set[f];
    let h = null, w = null;
    if (u.forEach((_) => {
      _.semver === ZE && (_ = new If(">=0.0.0")), h = h || _, w = w || _, s(_.semver, h.semver, n) ? h = _ : a(_.semver, w.semver, n) && (w = _);
    }), h.operator === l || h.operator === i || (!w.operator || w.operator === l) && o(e, w.semver))
      return !1;
    if (w.operator === i && a(e, w.semver))
      return !1;
  }
  return !0;
};
var Mi = sw;
const ow = Mi, aw = (e, t, r) => ow(e, t, ">", r);
var iw = aw;
const cw = Mi, lw = (e, t, r) => cw(e, t, "<", r);
var uw = lw;
const Qc = dt(), fw = (e, t, r) => (e = new Qc(e, r), t = new Qc(t, r), e.intersects(t, r));
var dw = fw;
const hw = zs, pw = ft;
var mw = (e, t, r) => {
  const n = [];
  let s = null, o = null;
  const a = e.sort((u, h) => pw(u, h, r));
  for (const u of a)
    hw(u, t, r) ? (o = u, s || (s = u)) : (o && n.push([s, o]), o = null, s = null);
  s && n.push([s, null]);
  const l = [];
  for (const [u, h] of n)
    u === h ? l.push(u) : !h && u === a[0] ? l.push("*") : h ? u === a[0] ? l.push(`<=${h}`) : l.push(`${u} - ${h}`) : l.push(`>=${u}`);
  const i = l.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return i.length < f.length ? i : t;
};
const Zc = dt(), Fi = qs(), { ANY: io } = Fi, Wr = zs, Ui = ft, yw = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Zc(e, r), t = new Zc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const o of t.set) {
      const a = gw(s, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, _w = [new Fi(">=0.0.0-0")], el = [new Fi(">=0.0.0")], gw = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === io) {
    if (t.length === 1 && t[0].semver === io)
      return !0;
    r.includePrerelease ? e = _w : e = el;
  }
  if (t.length === 1 && t[0].semver === io) {
    if (r.includePrerelease)
      return !0;
    t = el;
  }
  const n = /* @__PURE__ */ new Set();
  let s, o;
  for (const _ of e)
    _.operator === ">" || _.operator === ">=" ? s = tl(s, _, r) : _.operator === "<" || _.operator === "<=" ? o = rl(o, _, r) : n.add(_.semver);
  if (n.size > 1)
    return null;
  let a;
  if (s && o) {
    if (a = Ui(s.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (s.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const _ of n) {
    if (s && !Wr(_, String(s), r) || o && !Wr(_, String(o), r))
      return null;
    for (const E of t)
      if (!Wr(_, String(E), r))
        return !1;
    return !0;
  }
  let l, i, f, u, h = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, w = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && o.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const _ of t) {
    if (u = u || _.operator === ">" || _.operator === ">=", f = f || _.operator === "<" || _.operator === "<=", s) {
      if (w && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === w.major && _.semver.minor === w.minor && _.semver.patch === w.patch && (w = !1), _.operator === ">" || _.operator === ">=") {
        if (l = tl(s, _, r), l === _ && l !== s)
          return !1;
      } else if (s.operator === ">=" && !Wr(s.semver, String(_), r))
        return !1;
    }
    if (o) {
      if (h && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === h.major && _.semver.minor === h.minor && _.semver.patch === h.patch && (h = !1), _.operator === "<" || _.operator === "<=") {
        if (i = rl(o, _, r), i === _ && i !== o)
          return !1;
      } else if (o.operator === "<=" && !Wr(o.semver, String(_), r))
        return !1;
    }
    if (!_.operator && (o || s) && a !== 0)
      return !1;
  }
  return !(s && f && !o && a !== 0 || o && u && !s && a !== 0 || w || h);
}, tl = (e, t, r) => {
  if (!e)
    return t;
  const n = Ui(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, rl = (e, t, r) => {
  if (!e)
    return t;
  const n = Ui(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var $w = yw;
const co = vn, nl = Fs, vw = Ve, sl = Of, Ew = Vr, ww = Rv, Sw = kv, bw = jv, Pw = Dv, Ow = Fv, Nw = qv, Rw = xv, Tw = Hv, Iw = ft, kw = Yv, Cw = eE, jw = ji, Aw = sE, Dw = iE, Lw = Vs, Mw = Ai, Fw = Nf, Uw = Rf, Vw = Di, qw = Li, zw = Tf, Gw = IE, xw = qs(), Bw = dt(), Kw = zs, Hw = ME, Ww = qE, Jw = BE, Xw = WE, Yw = YE, Qw = Mi, Zw = iw, eS = uw, tS = dw, rS = mw, nS = $w;
var sS = {
  parse: Ew,
  valid: ww,
  clean: Sw,
  inc: bw,
  diff: Pw,
  major: Ow,
  minor: Nw,
  patch: Rw,
  prerelease: Tw,
  compare: Iw,
  rcompare: kw,
  compareLoose: Cw,
  compareBuild: jw,
  sort: Aw,
  rsort: Dw,
  gt: Lw,
  lt: Mw,
  eq: Fw,
  neq: Uw,
  gte: Vw,
  lte: qw,
  cmp: zw,
  coerce: Gw,
  Comparator: xw,
  Range: Bw,
  satisfies: Kw,
  toComparators: Hw,
  maxSatisfying: Ww,
  minSatisfying: Jw,
  minVersion: Xw,
  validRange: Yw,
  outside: Qw,
  gtr: Zw,
  ltr: eS,
  intersects: tS,
  simplifyRange: rS,
  subset: nS,
  SemVer: vw,
  re: co.re,
  src: co.src,
  tokens: co.t,
  SEMVER_SPEC_VERSION: nl.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: nl.RELEASE_TYPES,
  compareIdentifiers: sl.compareIdentifiers,
  rcompareIdentifiers: sl.rcompareIdentifiers
}, Gs = { exports: {} }, Vi = { exports: {} };
const kf = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
Vi.exports = kf;
Vi.exports.default = kf;
var oS = Vi.exports;
const aS = oS, vs = /* @__PURE__ */ new WeakMap(), Cf = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", o = function(...a) {
    if (vs.set(o, ++n), n === 1)
      r = e.apply(this, a), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return aS(o, e), vs.set(o, n), o;
};
Gs.exports = Cf;
Gs.exports.default = Cf;
Gs.exports.callCount = (e) => {
  if (!vs.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return vs.get(e);
};
var iS = Gs.exports;
(function(e, t) {
  var r = wn && wn.__classPrivateFieldSet || function(q, k, C, S, m) {
    if (S === "m") throw new TypeError("Private method is not writable");
    if (S === "a" && !m) throw new TypeError("Private accessor was defined without a setter");
    if (typeof k == "function" ? q !== k || !m : !k.has(q)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return S === "a" ? m.call(q, C) : m ? m.value = C : k.set(q, C), C;
  }, n = wn && wn.__classPrivateFieldGet || function(q, k, C, S) {
    if (C === "a" && !S) throw new TypeError("Private accessor was defined without a getter");
    if (typeof k == "function" ? q !== k || !S : !k.has(q)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return C === "m" ? S : C === "a" ? S.call(q) : S ? S.value : k.get(q);
  }, s, o, a, l, i, f;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const u = kl, h = xo, w = ur, _ = bs, E = sd, y = Cl, g = yd, p = Nd, v = kd, O = _t, N = q_, I = tv, F = dv, z = sS, Z = iS, V = "aes-256-cbc", K = () => /* @__PURE__ */ Object.create(null), re = (q) => q != null;
  let Y = "";
  try {
    delete require.cache[__filename], Y = w.dirname((o = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && o !== void 0 ? o : ".");
  } catch {
  }
  const ee = (q, k) => {
    const C = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), S = typeof k;
    if (C.has(S))
      throw new TypeError(`Setting a value of type \`${S}\` for key \`${q}\` is not allowed as it's not supported by JSON`);
  }, L = "__internal__", M = `${L}.migrations.version`;
  class H {
    constructor(k = {}) {
      var C;
      a.set(this, void 0), l.set(this, void 0), i.set(this, void 0), f.set(this, {}), this._deserialize = (d) => JSON.parse(d), this._serialize = (d) => JSON.stringify(d, void 0, "	");
      const S = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...k
      }, m = Z(() => {
        const d = p.sync({ cwd: Y }), P = d && JSON.parse(h.readFileSync(d, "utf8"));
        return P ?? {};
      });
      if (!S.cwd) {
        if (S.projectName || (S.projectName = m().name), !S.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        S.cwd = v(S.projectName, { suffix: S.projectSuffix }).config;
      }
      if (r(this, i, S, "f"), S.schema) {
        if (typeof S.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const d = new N.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, I.default)(d);
        const P = {
          type: "object",
          properties: S.schema
        };
        r(this, a, d.compile(P), "f");
        for (const [j, A] of Object.entries(S.schema))
          A != null && A.default && (n(this, f, "f")[j] = A.default);
      }
      S.defaults && r(this, f, {
        ...n(this, f, "f"),
        ...S.defaults
      }, "f"), S.serialize && (this._serialize = S.serialize), S.deserialize && (this._deserialize = S.deserialize), this.events = new y.EventEmitter(), r(this, l, S.encryptionKey, "f");
      const b = S.fileExtension ? `.${S.fileExtension}` : "";
      this.path = w.resolve(S.cwd, `${(C = S.configName) !== null && C !== void 0 ? C : "config"}${b}`);
      const $ = this.store, c = Object.assign(K(), S.defaults, $);
      this._validate(c);
      try {
        E.deepEqual($, c);
      } catch {
        this.store = c;
      }
      if (S.watch && this._watch(), S.migrations) {
        if (S.projectVersion || (S.projectVersion = m().version), !S.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(S.migrations, S.projectVersion, S.beforeEachMigration);
      }
    }
    get(k, C) {
      if (n(this, i, "f").accessPropertiesByDotNotation)
        return this._get(k, C);
      const { store: S } = this;
      return k in S ? S[k] : C;
    }
    set(k, C) {
      if (typeof k != "string" && typeof k != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof k}`);
      if (typeof k != "object" && C === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(k))
        throw new TypeError(`Please don't use the ${L} key, as it's used to manage this module internal operations.`);
      const { store: S } = this, m = (b, $) => {
        ee(b, $), n(this, i, "f").accessPropertiesByDotNotation ? g.set(S, b, $) : S[b] = $;
      };
      if (typeof k == "object") {
        const b = k;
        for (const [$, c] of Object.entries(b))
          m($, c);
      } else
        m(k, C);
      this.store = S;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(k) {
      return n(this, i, "f").accessPropertiesByDotNotation ? g.has(this.store, k) : k in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...k) {
      for (const C of k)
        re(n(this, f, "f")[C]) && this.set(C, n(this, f, "f")[C]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(k) {
      const { store: C } = this;
      n(this, i, "f").accessPropertiesByDotNotation ? g.delete(C, k) : delete C[k], this.store = C;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = K();
      for (const k of Object.keys(n(this, f, "f")))
        this.reset(k);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(k, C) {
      if (typeof k != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof k}`);
      if (typeof C != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof C}`);
      return this._handleChange(() => this.get(k), C);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(k) {
      if (typeof k != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof k}`);
      return this._handleChange(() => this.store, k);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const k = h.readFileSync(this.path, n(this, l, "f") ? null : "utf8"), C = this._encryptData(k), S = this._deserialize(C);
        return this._validate(S), Object.assign(K(), S);
      } catch (k) {
        if ((k == null ? void 0 : k.code) === "ENOENT")
          return this._ensureDirectory(), K();
        if (n(this, i, "f").clearInvalidConfig && k.name === "SyntaxError")
          return K();
        throw k;
      }
    }
    set store(k) {
      this._ensureDirectory(), this._validate(k), this._write(k), this.events.emit("change");
    }
    *[(a = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [k, C] of Object.entries(this.store))
        yield [k, C];
    }
    _encryptData(k) {
      if (!n(this, l, "f"))
        return k.toString();
      try {
        if (n(this, l, "f"))
          try {
            if (k.slice(16, 17).toString() === ":") {
              const C = k.slice(0, 16), S = _.pbkdf2Sync(n(this, l, "f"), C.toString(), 1e4, 32, "sha512"), m = _.createDecipheriv(V, S, C);
              k = Buffer.concat([m.update(Buffer.from(k.slice(17))), m.final()]).toString("utf8");
            } else {
              const C = _.createDecipher(V, n(this, l, "f"));
              k = Buffer.concat([C.update(Buffer.from(k)), C.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return k.toString();
    }
    _handleChange(k, C) {
      let S = k();
      const m = () => {
        const b = S, $ = k();
        (0, u.isDeepStrictEqual)($, b) || (S = $, C.call(this, $, b));
      };
      return this.events.on("change", m), () => this.events.removeListener("change", m);
    }
    _validate(k) {
      if (!n(this, a, "f") || n(this, a, "f").call(this, k) || !n(this, a, "f").errors)
        return;
      const S = n(this, a, "f").errors.map(({ instancePath: m, message: b = "" }) => `\`${m.slice(1)}\` ${b}`);
      throw new Error("Config schema violation: " + S.join("; "));
    }
    _ensureDirectory() {
      h.mkdirSync(w.dirname(this.path), { recursive: !0 });
    }
    _write(k) {
      let C = this._serialize(k);
      if (n(this, l, "f")) {
        const S = _.randomBytes(16), m = _.pbkdf2Sync(n(this, l, "f"), S.toString(), 1e4, 32, "sha512"), b = _.createCipheriv(V, m, S);
        C = Buffer.concat([S, Buffer.from(":"), b.update(Buffer.from(C)), b.final()]);
      }
      if (process.env.SNAP)
        h.writeFileSync(this.path, C, { mode: n(this, i, "f").configFileMode });
      else
        try {
          O.writeFileSync(this.path, C, { mode: n(this, i, "f").configFileMode });
        } catch (S) {
          if ((S == null ? void 0 : S.code) === "EXDEV") {
            h.writeFileSync(this.path, C, { mode: n(this, i, "f").configFileMode });
            return;
          }
          throw S;
        }
    }
    _watch() {
      this._ensureDirectory(), h.existsSync(this.path) || this._write(K()), process.platform === "win32" ? h.watch(this.path, { persistent: !1 }, F(() => {
        this.events.emit("change");
      }, { wait: 100 })) : h.watchFile(this.path, { persistent: !1 }, F(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(k, C, S) {
      let m = this._get(M, "0.0.0");
      const b = Object.keys(k).filter((c) => this._shouldPerformMigration(c, m, C));
      let $ = { ...this.store };
      for (const c of b)
        try {
          S && S(this, {
            fromVersion: m,
            toVersion: c,
            finalVersion: C,
            versions: b
          });
          const d = k[c];
          d(this), this._set(M, c), m = c, $ = { ...this.store };
        } catch (d) {
          throw this.store = $, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${d}`);
        }
      (this._isVersionInRangeFormat(m) || !z.eq(m, C)) && this._set(M, C);
    }
    _containsReservedKey(k) {
      return typeof k == "object" && Object.keys(k)[0] === L ? !0 : typeof k != "string" ? !1 : n(this, i, "f").accessPropertiesByDotNotation ? !!k.startsWith(`${L}.`) : !1;
    }
    _isVersionInRangeFormat(k) {
      return z.clean(k) === null;
    }
    _shouldPerformMigration(k, C, S) {
      return this._isVersionInRangeFormat(k) ? C !== "0.0.0" && z.satisfies(C, k) ? !1 : z.satisfies(S, k) : !(z.lte(k, C) || z.gt(k, S));
    }
    _get(k, C) {
      return g.get(this.store, k, C);
    }
    _set(k, C) {
      const { store: S } = this;
      g.set(S, k, C), this.store = S;
    }
  }
  t.default = H, e.exports = H, e.exports.default = H;
})($o, $o.exports);
var cS = $o.exports;
const ol = ur, { app: os, ipcMain: Uo, ipcRenderer: al, shell: lS } = rd, uS = cS;
let il = !1;
const cl = () => {
  if (!Uo || !os)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: os.getPath("userData"),
    appVersion: os.getVersion()
  };
  return il || (Uo.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), il = !0), e;
};
class fS extends uS {
  constructor(t) {
    let r, n;
    if (al) {
      const s = al.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else Uo && os && ({ defaultCwd: r, appVersion: n } = cl());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = ol.isAbsolute(t.cwd) ? t.cwd : ol.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    cl();
  }
  async openInEditor() {
    const t = await lS.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var dS = fS;
const hS = /* @__PURE__ */ jl(dS);
var Es = { exports: {} };
const jf = ["nodebuffer", "arraybuffer", "fragments"], Af = typeof Blob < "u";
Af && jf.push("blob");
var Gt = {
  BINARY_TYPES: jf,
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
  hasBlob: Af,
  kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
  kListener: Symbol("kListener"),
  kStatusCode: Symbol("status-code"),
  kWebSocket: Symbol("websocket"),
  NOOP: () => {
  }
};
const pS = {}, mS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pS
}, Symbol.toStringTag, { value: "Module" })), yS = /* @__PURE__ */ Al(mS);
var _S, gS;
const { EMPTY_BUFFER: $S } = Gt, Vo = Buffer[Symbol.species];
function vS(e, t) {
  if (e.length === 0) return $S;
  if (e.length === 1) return e[0];
  const r = Buffer.allocUnsafe(t);
  let n = 0;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    r.set(o, n), n += o.length;
  }
  return n < t ? new Vo(r.buffer, r.byteOffset, n) : r;
}
function Df(e, t, r, n, s) {
  for (let o = 0; o < s; o++)
    r[n + o] = e[o] ^ t[o & 3];
}
function Lf(e, t) {
  for (let r = 0; r < e.length; r++)
    e[r] ^= t[r & 3];
}
function ES(e) {
  return e.length === e.buffer.byteLength ? e.buffer : e.buffer.slice(e.byteOffset, e.byteOffset + e.length);
}
function qo(e) {
  if (qo.readOnly = !0, Buffer.isBuffer(e)) return e;
  let t;
  return e instanceof ArrayBuffer ? t = new Vo(e) : ArrayBuffer.isView(e) ? t = new Vo(e.buffer, e.byteOffset, e.byteLength) : (t = Buffer.from(e), qo.readOnly = !1), t;
}
Es.exports = {
  concat: vS,
  mask: Df,
  toArrayBuffer: ES,
  toBuffer: qo,
  unmask: Lf
};
if (!process.env.WS_NO_BUFFER_UTIL)
  try {
    const e = yS;
    gS = Es.exports.mask = function(t, r, n, s, o) {
      o < 48 ? Df(t, r, n, s, o) : e.mask(t, r, n, s, o);
    }, _S = Es.exports.unmask = function(t, r) {
      t.length < 32 ? Lf(t, r) : e.unmask(t, r);
    };
  } catch {
  }
var xs = Es.exports;
const ll = Symbol("kDone"), lo = Symbol("kRun");
let wS = class {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(t) {
    this[ll] = () => {
      this.pending--, this[lo]();
    }, this.concurrency = t || 1 / 0, this.jobs = [], this.pending = 0;
  }
  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(t) {
    this.jobs.push(t), this[lo]();
  }
  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [lo]() {
    if (this.pending !== this.concurrency && this.jobs.length) {
      const t = this.jobs.shift();
      this.pending++, t(this[ll]);
    }
  }
};
var SS = wS;
const Jr = fd, ul = xs, bS = SS, { kStatusCode: Mf } = Gt, PS = Buffer[Symbol.species], OS = Buffer.from([0, 0, 255, 255]), ws = Symbol("permessage-deflate"), bt = Symbol("total-length"), vr = Symbol("callback"), jt = Symbol("buffers"), Or = Symbol("error");
let xn, NS = class {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed if context takeover is disabled
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   * @param {Boolean} [isServer=false] Create the instance in either server or
   *     client mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(t, r, n) {
    if (this._maxPayload = n | 0, this._options = t || {}, this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024, this._isServer = !!r, this._deflate = null, this._inflate = null, this.params = null, !xn) {
      const s = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
      xn = new bS(s);
    }
  }
  /**
   * @type {String}
   */
  static get extensionName() {
    return "permessage-deflate";
  }
  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const t = {};
    return this._options.serverNoContextTakeover && (t.server_no_context_takeover = !0), this._options.clientNoContextTakeover && (t.client_no_context_takeover = !0), this._options.serverMaxWindowBits && (t.server_max_window_bits = this._options.serverMaxWindowBits), this._options.clientMaxWindowBits ? t.client_max_window_bits = this._options.clientMaxWindowBits : this._options.clientMaxWindowBits == null && (t.client_max_window_bits = !0), t;
  }
  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(t) {
    return t = this.normalizeParams(t), this.params = this._isServer ? this.acceptAsServer(t) : this.acceptAsClient(t), this.params;
  }
  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate && (this._inflate.close(), this._inflate = null), this._deflate) {
      const t = this._deflate[vr];
      this._deflate.close(), this._deflate = null, t && t(
        new Error(
          "The deflate stream was closed while data was being processed"
        )
      );
    }
  }
  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(t) {
    const r = this._options, n = t.find((s) => !(r.serverNoContextTakeover === !1 && s.server_no_context_takeover || s.server_max_window_bits && (r.serverMaxWindowBits === !1 || typeof r.serverMaxWindowBits == "number" && r.serverMaxWindowBits > s.server_max_window_bits) || typeof r.clientMaxWindowBits == "number" && !s.client_max_window_bits));
    if (!n)
      throw new Error("None of the extension offers can be accepted");
    return r.serverNoContextTakeover && (n.server_no_context_takeover = !0), r.clientNoContextTakeover && (n.client_no_context_takeover = !0), typeof r.serverMaxWindowBits == "number" && (n.server_max_window_bits = r.serverMaxWindowBits), typeof r.clientMaxWindowBits == "number" ? n.client_max_window_bits = r.clientMaxWindowBits : (n.client_max_window_bits === !0 || r.clientMaxWindowBits === !1) && delete n.client_max_window_bits, n;
  }
  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(t) {
    const r = t[0];
    if (this._options.clientNoContextTakeover === !1 && r.client_no_context_takeover)
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    if (!r.client_max_window_bits)
      typeof this._options.clientMaxWindowBits == "number" && (r.client_max_window_bits = this._options.clientMaxWindowBits);
    else if (this._options.clientMaxWindowBits === !1 || typeof this._options.clientMaxWindowBits == "number" && r.client_max_window_bits > this._options.clientMaxWindowBits)
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    return r;
  }
  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(t) {
    return t.forEach((r) => {
      Object.keys(r).forEach((n) => {
        let s = r[n];
        if (s.length > 1)
          throw new Error(`Parameter "${n}" must have only a single value`);
        if (s = s[0], n === "client_max_window_bits") {
          if (s !== !0) {
            const o = +s;
            if (!Number.isInteger(o) || o < 8 || o > 15)
              throw new TypeError(
                `Invalid value for parameter "${n}": ${s}`
              );
            s = o;
          } else if (!this._isServer)
            throw new TypeError(
              `Invalid value for parameter "${n}": ${s}`
            );
        } else if (n === "server_max_window_bits") {
          const o = +s;
          if (!Number.isInteger(o) || o < 8 || o > 15)
            throw new TypeError(
              `Invalid value for parameter "${n}": ${s}`
            );
          s = o;
        } else if (n === "client_no_context_takeover" || n === "server_no_context_takeover") {
          if (s !== !0)
            throw new TypeError(
              `Invalid value for parameter "${n}": ${s}`
            );
        } else
          throw new Error(`Unknown parameter "${n}"`);
        r[n] = s;
      });
    }), t;
  }
  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(t, r, n) {
    xn.add((s) => {
      this._decompress(t, r, (o, a) => {
        s(), n(o, a);
      });
    });
  }
  /**
   * Compress data. Concurrency limited.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(t, r, n) {
    xn.add((s) => {
      this._compress(t, r, (o, a) => {
        s(), n(o, a);
      });
    });
  }
  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(t, r, n) {
    const s = this._isServer ? "client" : "server";
    if (!this._inflate) {
      const o = `${s}_max_window_bits`, a = typeof this.params[o] != "number" ? Jr.Z_DEFAULT_WINDOWBITS : this.params[o];
      this._inflate = Jr.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits: a
      }), this._inflate[ws] = this, this._inflate[bt] = 0, this._inflate[jt] = [], this._inflate.on("error", TS), this._inflate.on("data", Ff);
    }
    this._inflate[vr] = n, this._inflate.write(t), r && this._inflate.write(OS), this._inflate.flush(() => {
      const o = this._inflate[Or];
      if (o) {
        this._inflate.close(), this._inflate = null, n(o);
        return;
      }
      const a = ul.concat(
        this._inflate[jt],
        this._inflate[bt]
      );
      this._inflate._readableState.endEmitted ? (this._inflate.close(), this._inflate = null) : (this._inflate[bt] = 0, this._inflate[jt] = [], r && this.params[`${s}_no_context_takeover`] && this._inflate.reset()), n(null, a);
    });
  }
  /**
   * Compress data.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(t, r, n) {
    const s = this._isServer ? "server" : "client";
    if (!this._deflate) {
      const o = `${s}_max_window_bits`, a = typeof this.params[o] != "number" ? Jr.Z_DEFAULT_WINDOWBITS : this.params[o];
      this._deflate = Jr.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits: a
      }), this._deflate[bt] = 0, this._deflate[jt] = [], this._deflate.on("data", RS);
    }
    this._deflate[vr] = n, this._deflate.write(t), this._deflate.flush(Jr.Z_SYNC_FLUSH, () => {
      if (!this._deflate)
        return;
      let o = ul.concat(
        this._deflate[jt],
        this._deflate[bt]
      );
      r && (o = new PS(o.buffer, o.byteOffset, o.length - 4)), this._deflate[vr] = null, this._deflate[bt] = 0, this._deflate[jt] = [], r && this.params[`${s}_no_context_takeover`] && this._deflate.reset(), n(null, o);
    });
  }
};
var qi = NS;
function RS(e) {
  this[jt].push(e), this[bt] += e.length;
}
function Ff(e) {
  if (this[bt] += e.length, this[ws]._maxPayload < 1 || this[bt] <= this[ws]._maxPayload) {
    this[jt].push(e);
    return;
  }
  this[Or] = new RangeError("Max payload size exceeded"), this[Or].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH", this[Or][Mf] = 1009, this.removeListener("data", Ff), this.reset();
}
function TS(e) {
  if (this[ws]._inflate = null, this[Or]) {
    this[vr](this[Or]);
    return;
  }
  e[Mf] = 1007, this[vr](e);
}
var Ss = { exports: {} };
const IS = {}, kS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IS
}, Symbol.toStringTag, { value: "Module" })), CS = /* @__PURE__ */ Al(kS);
var fl;
const { isUtf8: dl } = dd, { hasBlob: jS } = Gt, AS = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 0 - 15
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  // 16 - 31
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  // 32 - 47
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  // 48 - 63
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 64 - 79
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  // 80 - 95
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  // 96 - 111
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  0
  // 112 - 127
];
function DS(e) {
  return e >= 1e3 && e <= 1014 && e !== 1004 && e !== 1005 && e !== 1006 || e >= 3e3 && e <= 4999;
}
function zo(e) {
  const t = e.length;
  let r = 0;
  for (; r < t; )
    if (!(e[r] & 128))
      r++;
    else if ((e[r] & 224) === 192) {
      if (r + 1 === t || (e[r + 1] & 192) !== 128 || (e[r] & 254) === 192)
        return !1;
      r += 2;
    } else if ((e[r] & 240) === 224) {
      if (r + 2 >= t || (e[r + 1] & 192) !== 128 || (e[r + 2] & 192) !== 128 || e[r] === 224 && (e[r + 1] & 224) === 128 || // Overlong
      e[r] === 237 && (e[r + 1] & 224) === 160)
        return !1;
      r += 3;
    } else if ((e[r] & 248) === 240) {
      if (r + 3 >= t || (e[r + 1] & 192) !== 128 || (e[r + 2] & 192) !== 128 || (e[r + 3] & 192) !== 128 || e[r] === 240 && (e[r + 1] & 240) === 128 || // Overlong
      e[r] === 244 && e[r + 1] > 143 || e[r] > 244)
        return !1;
      r += 4;
    } else
      return !1;
  return !0;
}
function LS(e) {
  return jS && typeof e == "object" && typeof e.arrayBuffer == "function" && typeof e.type == "string" && typeof e.stream == "function" && (e[Symbol.toStringTag] === "Blob" || e[Symbol.toStringTag] === "File");
}
Ss.exports = {
  isBlob: LS,
  isValidStatusCode: DS,
  isValidUTF8: zo,
  tokenChars: AS
};
if (dl)
  fl = Ss.exports.isValidUTF8 = function(e) {
    return e.length < 24 ? zo(e) : dl(e);
  };
else if (!process.env.WS_NO_UTF_8_VALIDATE)
  try {
    const e = CS;
    fl = Ss.exports.isValidUTF8 = function(t) {
      return t.length < 32 ? zo(t) : e(t);
    };
  } catch {
  }
var En = Ss.exports;
const { Writable: MS } = pn, hl = qi, {
  BINARY_TYPES: FS,
  EMPTY_BUFFER: pl,
  kStatusCode: US,
  kWebSocket: VS
} = Gt, { concat: uo, toArrayBuffer: qS, unmask: zS } = xs, { isValidStatusCode: GS, isValidUTF8: ml } = En, Bn = Buffer[Symbol.species], Je = 0, yl = 1, _l = 2, gl = 3, fo = 4, ho = 5, Kn = 6;
let xS = class extends MS {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(t = {}) {
    super(), this._allowSynchronousEvents = t.allowSynchronousEvents !== void 0 ? t.allowSynchronousEvents : !0, this._binaryType = t.binaryType || FS[0], this._extensions = t.extensions || {}, this._isServer = !!t.isServer, this._maxPayload = t.maxPayload | 0, this._skipUTF8Validation = !!t.skipUTF8Validation, this[VS] = void 0, this._bufferedBytes = 0, this._buffers = [], this._compressed = !1, this._payloadLength = 0, this._mask = void 0, this._fragmented = 0, this._masked = !1, this._fin = !1, this._opcode = 0, this._totalPayloadLength = 0, this._messageLength = 0, this._fragments = [], this._errored = !1, this._loop = !1, this._state = Je;
  }
  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(t, r, n) {
    if (this._opcode === 8 && this._state == Je) return n();
    this._bufferedBytes += t.length, this._buffers.push(t), this.startLoop(n);
  }
  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(t) {
    if (this._bufferedBytes -= t, t === this._buffers[0].length) return this._buffers.shift();
    if (t < this._buffers[0].length) {
      const n = this._buffers[0];
      return this._buffers[0] = new Bn(
        n.buffer,
        n.byteOffset + t,
        n.length - t
      ), new Bn(n.buffer, n.byteOffset, t);
    }
    const r = Buffer.allocUnsafe(t);
    do {
      const n = this._buffers[0], s = r.length - t;
      t >= n.length ? r.set(this._buffers.shift(), s) : (r.set(new Uint8Array(n.buffer, n.byteOffset, t), s), this._buffers[0] = new Bn(
        n.buffer,
        n.byteOffset + t,
        n.length - t
      )), t -= n.length;
    } while (t > 0);
    return r;
  }
  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(t) {
    this._loop = !0;
    do
      switch (this._state) {
        case Je:
          this.getInfo(t);
          break;
        case yl:
          this.getPayloadLength16(t);
          break;
        case _l:
          this.getPayloadLength64(t);
          break;
        case gl:
          this.getMask();
          break;
        case fo:
          this.getData(t);
          break;
        case ho:
        case Kn:
          this._loop = !1;
          return;
      }
    while (this._loop);
    this._errored || t();
  }
  /**
   * Reads the first two bytes of a frame.
   *
   * @param {Function} cb Callback
   * @private
   */
  getInfo(t) {
    if (this._bufferedBytes < 2) {
      this._loop = !1;
      return;
    }
    const r = this.consume(2);
    if (r[0] & 48) {
      const s = this.createError(
        RangeError,
        "RSV2 and RSV3 must be clear",
        !0,
        1002,
        "WS_ERR_UNEXPECTED_RSV_2_3"
      );
      t(s);
      return;
    }
    const n = (r[0] & 64) === 64;
    if (n && !this._extensions[hl.extensionName]) {
      const s = this.createError(
        RangeError,
        "RSV1 must be clear",
        !0,
        1002,
        "WS_ERR_UNEXPECTED_RSV_1"
      );
      t(s);
      return;
    }
    if (this._fin = (r[0] & 128) === 128, this._opcode = r[0] & 15, this._payloadLength = r[1] & 127, this._opcode === 0) {
      if (n) {
        const s = this.createError(
          RangeError,
          "RSV1 must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_RSV_1"
        );
        t(s);
        return;
      }
      if (!this._fragmented) {
        const s = this.createError(
          RangeError,
          "invalid opcode 0",
          !0,
          1002,
          "WS_ERR_INVALID_OPCODE"
        );
        t(s);
        return;
      }
      this._opcode = this._fragmented;
    } else if (this._opcode === 1 || this._opcode === 2) {
      if (this._fragmented) {
        const s = this.createError(
          RangeError,
          `invalid opcode ${this._opcode}`,
          !0,
          1002,
          "WS_ERR_INVALID_OPCODE"
        );
        t(s);
        return;
      }
      this._compressed = n;
    } else if (this._opcode > 7 && this._opcode < 11) {
      if (!this._fin) {
        const s = this.createError(
          RangeError,
          "FIN must be set",
          !0,
          1002,
          "WS_ERR_EXPECTED_FIN"
        );
        t(s);
        return;
      }
      if (n) {
        const s = this.createError(
          RangeError,
          "RSV1 must be clear",
          !0,
          1002,
          "WS_ERR_UNEXPECTED_RSV_1"
        );
        t(s);
        return;
      }
      if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
        const s = this.createError(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          !0,
          1002,
          "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
        );
        t(s);
        return;
      }
    } else {
      const s = this.createError(
        RangeError,
        `invalid opcode ${this._opcode}`,
        !0,
        1002,
        "WS_ERR_INVALID_OPCODE"
      );
      t(s);
      return;
    }
    if (!this._fin && !this._fragmented && (this._fragmented = this._opcode), this._masked = (r[1] & 128) === 128, this._isServer) {
      if (!this._masked) {
        const s = this.createError(
          RangeError,
          "MASK must be set",
          !0,
          1002,
          "WS_ERR_EXPECTED_MASK"
        );
        t(s);
        return;
      }
    } else if (this._masked) {
      const s = this.createError(
        RangeError,
        "MASK must be clear",
        !0,
        1002,
        "WS_ERR_UNEXPECTED_MASK"
      );
      t(s);
      return;
    }
    this._payloadLength === 126 ? this._state = yl : this._payloadLength === 127 ? this._state = _l : this.haveLength(t);
  }
  /**
   * Gets extended payload length (7+16).
   *
   * @param {Function} cb Callback
   * @private
   */
  getPayloadLength16(t) {
    if (this._bufferedBytes < 2) {
      this._loop = !1;
      return;
    }
    this._payloadLength = this.consume(2).readUInt16BE(0), this.haveLength(t);
  }
  /**
   * Gets extended payload length (7+64).
   *
   * @param {Function} cb Callback
   * @private
   */
  getPayloadLength64(t) {
    if (this._bufferedBytes < 8) {
      this._loop = !1;
      return;
    }
    const r = this.consume(8), n = r.readUInt32BE(0);
    if (n > Math.pow(2, 21) - 1) {
      const s = this.createError(
        RangeError,
        "Unsupported WebSocket frame: payload length > 2^53 - 1",
        !1,
        1009,
        "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
      );
      t(s);
      return;
    }
    this._payloadLength = n * Math.pow(2, 32) + r.readUInt32BE(4), this.haveLength(t);
  }
  /**
   * Payload length has been read.
   *
   * @param {Function} cb Callback
   * @private
   */
  haveLength(t) {
    if (this._payloadLength && this._opcode < 8 && (this._totalPayloadLength += this._payloadLength, this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)) {
      const r = this.createError(
        RangeError,
        "Max payload size exceeded",
        !1,
        1009,
        "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
      );
      t(r);
      return;
    }
    this._masked ? this._state = gl : this._state = fo;
  }
  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = !1;
      return;
    }
    this._mask = this.consume(4), this._state = fo;
  }
  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @private
   */
  getData(t) {
    let r = pl;
    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = !1;
        return;
      }
      r = this.consume(this._payloadLength), this._masked && this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3] && zS(r, this._mask);
    }
    if (this._opcode > 7) {
      this.controlMessage(r, t);
      return;
    }
    if (this._compressed) {
      this._state = ho, this.decompress(r, t);
      return;
    }
    r.length && (this._messageLength = this._totalPayloadLength, this._fragments.push(r)), this.dataMessage(t);
  }
  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(t, r) {
    this._extensions[hl.extensionName].decompress(t, this._fin, (s, o) => {
      if (s) return r(s);
      if (o.length) {
        if (this._messageLength += o.length, this._messageLength > this._maxPayload && this._maxPayload > 0) {
          const a = this.createError(
            RangeError,
            "Max payload size exceeded",
            !1,
            1009,
            "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
          );
          r(a);
          return;
        }
        this._fragments.push(o);
      }
      this.dataMessage(r), this._state === Je && this.startLoop(r);
    });
  }
  /**
   * Handles a data message.
   *
   * @param {Function} cb Callback
   * @private
   */
  dataMessage(t) {
    if (!this._fin) {
      this._state = Je;
      return;
    }
    const r = this._messageLength, n = this._fragments;
    if (this._totalPayloadLength = 0, this._messageLength = 0, this._fragmented = 0, this._fragments = [], this._opcode === 2) {
      let s;
      this._binaryType === "nodebuffer" ? s = uo(n, r) : this._binaryType === "arraybuffer" ? s = qS(uo(n, r)) : this._binaryType === "blob" ? s = new Blob(n) : s = n, this._allowSynchronousEvents ? (this.emit("message", s, !0), this._state = Je) : (this._state = Kn, setImmediate(() => {
        this.emit("message", s, !0), this._state = Je, this.startLoop(t);
      }));
    } else {
      const s = uo(n, r);
      if (!this._skipUTF8Validation && !ml(s)) {
        const o = this.createError(
          Error,
          "invalid UTF-8 sequence",
          !0,
          1007,
          "WS_ERR_INVALID_UTF8"
        );
        t(o);
        return;
      }
      this._state === ho || this._allowSynchronousEvents ? (this.emit("message", s, !1), this._state = Je) : (this._state = Kn, setImmediate(() => {
        this.emit("message", s, !1), this._state = Je, this.startLoop(t);
      }));
    }
  }
  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(t, r) {
    if (this._opcode === 8) {
      if (t.length === 0)
        this._loop = !1, this.emit("conclude", 1005, pl), this.end();
      else {
        const n = t.readUInt16BE(0);
        if (!GS(n)) {
          const o = this.createError(
            RangeError,
            `invalid status code ${n}`,
            !0,
            1002,
            "WS_ERR_INVALID_CLOSE_CODE"
          );
          r(o);
          return;
        }
        const s = new Bn(
          t.buffer,
          t.byteOffset + 2,
          t.length - 2
        );
        if (!this._skipUTF8Validation && !ml(s)) {
          const o = this.createError(
            Error,
            "invalid UTF-8 sequence",
            !0,
            1007,
            "WS_ERR_INVALID_UTF8"
          );
          r(o);
          return;
        }
        this._loop = !1, this.emit("conclude", n, s), this.end();
      }
      this._state = Je;
      return;
    }
    this._allowSynchronousEvents ? (this.emit(this._opcode === 9 ? "ping" : "pong", t), this._state = Je) : (this._state = Kn, setImmediate(() => {
      this.emit(this._opcode === 9 ? "ping" : "pong", t), this._state = Je, this.startLoop(r);
    }));
  }
  /**
   * Builds an error object.
   *
   * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
   * @param {String} message The error message
   * @param {Boolean} prefix Specifies whether or not to add a default prefix to
   *     `message`
   * @param {Number} statusCode The status code
   * @param {String} errorCode The exposed error code
   * @return {(Error|RangeError)} The error
   * @private
   */
  createError(t, r, n, s, o) {
    this._loop = !1, this._errored = !0;
    const a = new t(
      n ? `Invalid WebSocket frame: ${r}` : r
    );
    return Error.captureStackTrace(a, this.createError), a.code = o, a[US] = s, a;
  }
};
var BS = xS;
const { Duplex: dP } = pn, { randomFillSync: KS } = bs, $l = qi, { EMPTY_BUFFER: HS, kWebSocket: WS, NOOP: JS } = Gt, { isBlob: pr, isValidStatusCode: XS } = En, { mask: vl, toBuffer: Yt } = xs, Xe = Symbol("kByteLength"), YS = Buffer.alloc(4), as = 8 * 1024;
let Qt, mr = as;
const nt = 0, QS = 1, ZS = 2;
let eb = class Zt {
  /**
   * Creates a Sender instance.
   *
   * @param {Duplex} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(t, r, n) {
    this._extensions = r || {}, n && (this._generateMask = n, this._maskBuffer = Buffer.alloc(4)), this._socket = t, this._firstFragment = !0, this._compress = !1, this._bufferedBytes = 0, this._queue = [], this._state = nt, this.onerror = JS, this[WS] = void 0;
  }
  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {(Buffer|String)} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {(Buffer|String)[]} The framed data
   * @public
   */
  static frame(t, r) {
    let n, s = !1, o = 2, a = !1;
    r.mask && (n = r.maskBuffer || YS, r.generateMask ? r.generateMask(n) : (mr === as && (Qt === void 0 && (Qt = Buffer.alloc(as)), KS(Qt, 0, as), mr = 0), n[0] = Qt[mr++], n[1] = Qt[mr++], n[2] = Qt[mr++], n[3] = Qt[mr++]), a = (n[0] | n[1] | n[2] | n[3]) === 0, o = 6);
    let l;
    typeof t == "string" ? (!r.mask || a) && r[Xe] !== void 0 ? l = r[Xe] : (t = Buffer.from(t), l = t.length) : (l = t.length, s = r.mask && r.readOnly && !a);
    let i = l;
    l >= 65536 ? (o += 8, i = 127) : l > 125 && (o += 2, i = 126);
    const f = Buffer.allocUnsafe(s ? l + o : o);
    return f[0] = r.fin ? r.opcode | 128 : r.opcode, r.rsv1 && (f[0] |= 64), f[1] = i, i === 126 ? f.writeUInt16BE(l, 2) : i === 127 && (f[2] = f[3] = 0, f.writeUIntBE(l, 4, 6)), r.mask ? (f[1] |= 128, f[o - 4] = n[0], f[o - 3] = n[1], f[o - 2] = n[2], f[o - 1] = n[3], a ? [f, t] : s ? (vl(t, n, f, o, l), [f]) : (vl(t, n, t, 0, l), [f, t])) : [f, t];
  }
  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(t, r, n, s) {
    let o;
    if (t === void 0)
      o = HS;
    else {
      if (typeof t != "number" || !XS(t))
        throw new TypeError("First argument must be a valid error code number");
      if (r === void 0 || !r.length)
        o = Buffer.allocUnsafe(2), o.writeUInt16BE(t, 0);
      else {
        const l = Buffer.byteLength(r);
        if (l > 123)
          throw new RangeError("The message must not be greater than 123 bytes");
        o = Buffer.allocUnsafe(2 + l), o.writeUInt16BE(t, 0), typeof r == "string" ? o.write(r, 2) : o.set(r, 2);
      }
    }
    const a = {
      [Xe]: o.length,
      fin: !0,
      generateMask: this._generateMask,
      mask: n,
      maskBuffer: this._maskBuffer,
      opcode: 8,
      readOnly: !1,
      rsv1: !1
    };
    this._state !== nt ? this.enqueue([this.dispatch, o, !1, a, s]) : this.sendFrame(Zt.frame(o, a), s);
  }
  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(t, r, n) {
    let s, o;
    if (typeof t == "string" ? (s = Buffer.byteLength(t), o = !1) : pr(t) ? (s = t.size, o = !1) : (t = Yt(t), s = t.length, o = Yt.readOnly), s > 125)
      throw new RangeError("The data size must not be greater than 125 bytes");
    const a = {
      [Xe]: s,
      fin: !0,
      generateMask: this._generateMask,
      mask: r,
      maskBuffer: this._maskBuffer,
      opcode: 9,
      readOnly: o,
      rsv1: !1
    };
    pr(t) ? this._state !== nt ? this.enqueue([this.getBlobData, t, !1, a, n]) : this.getBlobData(t, !1, a, n) : this._state !== nt ? this.enqueue([this.dispatch, t, !1, a, n]) : this.sendFrame(Zt.frame(t, a), n);
  }
  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(t, r, n) {
    let s, o;
    if (typeof t == "string" ? (s = Buffer.byteLength(t), o = !1) : pr(t) ? (s = t.size, o = !1) : (t = Yt(t), s = t.length, o = Yt.readOnly), s > 125)
      throw new RangeError("The data size must not be greater than 125 bytes");
    const a = {
      [Xe]: s,
      fin: !0,
      generateMask: this._generateMask,
      mask: r,
      maskBuffer: this._maskBuffer,
      opcode: 10,
      readOnly: o,
      rsv1: !1
    };
    pr(t) ? this._state !== nt ? this.enqueue([this.getBlobData, t, !1, a, n]) : this.getBlobData(t, !1, a, n) : this._state !== nt ? this.enqueue([this.dispatch, t, !1, a, n]) : this.sendFrame(Zt.frame(t, a), n);
  }
  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(t, r, n) {
    const s = this._extensions[$l.extensionName];
    let o = r.binary ? 2 : 1, a = r.compress, l, i;
    typeof t == "string" ? (l = Buffer.byteLength(t), i = !1) : pr(t) ? (l = t.size, i = !1) : (t = Yt(t), l = t.length, i = Yt.readOnly), this._firstFragment ? (this._firstFragment = !1, a && s && s.params[s._isServer ? "server_no_context_takeover" : "client_no_context_takeover"] && (a = l >= s._threshold), this._compress = a) : (a = !1, o = 0), r.fin && (this._firstFragment = !0);
    const f = {
      [Xe]: l,
      fin: r.fin,
      generateMask: this._generateMask,
      mask: r.mask,
      maskBuffer: this._maskBuffer,
      opcode: o,
      readOnly: i,
      rsv1: a
    };
    pr(t) ? this._state !== nt ? this.enqueue([this.getBlobData, t, this._compress, f, n]) : this.getBlobData(t, this._compress, f, n) : this._state !== nt ? this.enqueue([this.dispatch, t, this._compress, f, n]) : this.dispatch(t, this._compress, f, n);
  }
  /**
   * Gets the contents of a blob as binary data.
   *
   * @param {Blob} blob The blob
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     the data
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  getBlobData(t, r, n, s) {
    this._bufferedBytes += n[Xe], this._state = ZS, t.arrayBuffer().then((o) => {
      if (this._socket.destroyed) {
        const l = new Error(
          "The socket was closed while the blob was being read"
        );
        process.nextTick(Go, this, l, s);
        return;
      }
      this._bufferedBytes -= n[Xe];
      const a = Yt(o);
      r ? this.dispatch(a, r, n, s) : (this._state = nt, this.sendFrame(Zt.frame(a, n), s), this.dequeue());
    }).catch((o) => {
      process.nextTick(rb, this, o, s);
    });
  }
  /**
   * Dispatches a message.
   *
   * @param {(Buffer|String)} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(t, r, n, s) {
    if (!r) {
      this.sendFrame(Zt.frame(t, n), s);
      return;
    }
    const o = this._extensions[$l.extensionName];
    this._bufferedBytes += n[Xe], this._state = QS, o.compress(t, n.fin, (a, l) => {
      if (this._socket.destroyed) {
        const i = new Error(
          "The socket was closed while data was being compressed"
        );
        Go(this, i, s);
        return;
      }
      this._bufferedBytes -= n[Xe], this._state = nt, n.readOnly = !1, this.sendFrame(Zt.frame(l, n), s), this.dequeue();
    });
  }
  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    for (; this._state === nt && this._queue.length; ) {
      const t = this._queue.shift();
      this._bufferedBytes -= t[3][Xe], Reflect.apply(t[0], this, t.slice(1));
    }
  }
  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(t) {
    this._bufferedBytes += t[3][Xe], this._queue.push(t);
  }
  /**
   * Sends a frame.
   *
   * @param {(Buffer | String)[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(t, r) {
    t.length === 2 ? (this._socket.cork(), this._socket.write(t[0]), this._socket.write(t[1], r), this._socket.uncork()) : this._socket.write(t[0], r);
  }
};
var tb = eb;
function Go(e, t, r) {
  typeof r == "function" && r(t);
  for (let n = 0; n < e._queue.length; n++) {
    const s = e._queue[n], o = s[s.length - 1];
    typeof o == "function" && o(t);
  }
}
function rb(e, t, r) {
  Go(e, t, r), e.onerror(t);
}
const { kForOnEventAttribute: Xr, kListener: po } = Gt, El = Symbol("kCode"), wl = Symbol("kData"), Sl = Symbol("kError"), bl = Symbol("kMessage"), Pl = Symbol("kReason"), Er = Symbol("kTarget"), Ol = Symbol("kType"), Nl = Symbol("kWasClean");
class qr {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(t) {
    this[Er] = null, this[Ol] = t;
  }
  /**
   * @type {*}
   */
  get target() {
    return this[Er];
  }
  /**
   * @type {String}
   */
  get type() {
    return this[Ol];
  }
}
Object.defineProperty(qr.prototype, "target", { enumerable: !0 });
Object.defineProperty(qr.prototype, "type", { enumerable: !0 });
class Bs extends qr {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {Number} [options.code=0] The status code explaining why the
   *     connection was closed
   * @param {String} [options.reason=''] A human-readable string explaining why
   *     the connection was closed
   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
   *     connection was cleanly closed
   */
  constructor(t, r = {}) {
    super(t), this[El] = r.code === void 0 ? 0 : r.code, this[Pl] = r.reason === void 0 ? "" : r.reason, this[Nl] = r.wasClean === void 0 ? !1 : r.wasClean;
  }
  /**
   * @type {Number}
   */
  get code() {
    return this[El];
  }
  /**
   * @type {String}
   */
  get reason() {
    return this[Pl];
  }
  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[Nl];
  }
}
Object.defineProperty(Bs.prototype, "code", { enumerable: !0 });
Object.defineProperty(Bs.prototype, "reason", { enumerable: !0 });
Object.defineProperty(Bs.prototype, "wasClean", { enumerable: !0 });
class zi extends qr {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.error=null] The error that generated this event
   * @param {String} [options.message=''] The error message
   */
  constructor(t, r = {}) {
    super(t), this[Sl] = r.error === void 0 ? null : r.error, this[bl] = r.message === void 0 ? "" : r.message;
  }
  /**
   * @type {*}
   */
  get error() {
    return this[Sl];
  }
  /**
   * @type {String}
   */
  get message() {
    return this[bl];
  }
}
Object.defineProperty(zi.prototype, "error", { enumerable: !0 });
Object.defineProperty(zi.prototype, "message", { enumerable: !0 });
class Uf extends qr {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(t, r = {}) {
    super(t), this[wl] = r.data === void 0 ? null : r.data;
  }
  /**
   * @type {*}
   */
  get data() {
    return this[wl];
  }
}
Object.defineProperty(Uf.prototype, "data", { enumerable: !0 });
const nb = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {(Function|Object)} handler The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(e, t, r = {}) {
    for (const s of this.listeners(e))
      if (!r[Xr] && s[po] === t && !s[Xr])
        return;
    let n;
    if (e === "message")
      n = function(o, a) {
        const l = new Uf("message", {
          data: a ? o : o.toString()
        });
        l[Er] = this, Hn(t, this, l);
      };
    else if (e === "close")
      n = function(o, a) {
        const l = new Bs("close", {
          code: o,
          reason: a.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });
        l[Er] = this, Hn(t, this, l);
      };
    else if (e === "error")
      n = function(o) {
        const a = new zi("error", {
          error: o,
          message: o.message
        });
        a[Er] = this, Hn(t, this, a);
      };
    else if (e === "open")
      n = function() {
        const o = new qr("open");
        o[Er] = this, Hn(t, this, o);
      };
    else
      return;
    n[Xr] = !!r[Xr], n[po] = t, r.once ? this.once(e, n) : this.on(e, n);
  },
  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {(Function|Object)} handler The listener to remove
   * @public
   */
  removeEventListener(e, t) {
    for (const r of this.listeners(e))
      if (r[po] === t && !r[Xr]) {
        this.removeListener(e, r);
        break;
      }
  }
};
var sb = {
  EventTarget: nb
};
function Hn(e, t, r) {
  typeof e == "object" && e.handleEvent ? e.handleEvent.call(e, r) : e.call(t, r);
}
const { tokenChars: Yr } = En;
function pt(e, t, r) {
  e[t] === void 0 ? e[t] = [r] : e[t].push(r);
}
function ob(e) {
  const t = /* @__PURE__ */ Object.create(null);
  let r = /* @__PURE__ */ Object.create(null), n = !1, s = !1, o = !1, a, l, i = -1, f = -1, u = -1, h = 0;
  for (; h < e.length; h++)
    if (f = e.charCodeAt(h), a === void 0)
      if (u === -1 && Yr[f] === 1)
        i === -1 && (i = h);
      else if (h !== 0 && (f === 32 || f === 9))
        u === -1 && i !== -1 && (u = h);
      else if (f === 59 || f === 44) {
        if (i === -1)
          throw new SyntaxError(`Unexpected character at index ${h}`);
        u === -1 && (u = h);
        const _ = e.slice(i, u);
        f === 44 ? (pt(t, _, r), r = /* @__PURE__ */ Object.create(null)) : a = _, i = u = -1;
      } else
        throw new SyntaxError(`Unexpected character at index ${h}`);
    else if (l === void 0)
      if (u === -1 && Yr[f] === 1)
        i === -1 && (i = h);
      else if (f === 32 || f === 9)
        u === -1 && i !== -1 && (u = h);
      else if (f === 59 || f === 44) {
        if (i === -1)
          throw new SyntaxError(`Unexpected character at index ${h}`);
        u === -1 && (u = h), pt(r, e.slice(i, u), !0), f === 44 && (pt(t, a, r), r = /* @__PURE__ */ Object.create(null), a = void 0), i = u = -1;
      } else if (f === 61 && i !== -1 && u === -1)
        l = e.slice(i, h), i = u = -1;
      else
        throw new SyntaxError(`Unexpected character at index ${h}`);
    else if (s) {
      if (Yr[f] !== 1)
        throw new SyntaxError(`Unexpected character at index ${h}`);
      i === -1 ? i = h : n || (n = !0), s = !1;
    } else if (o)
      if (Yr[f] === 1)
        i === -1 && (i = h);
      else if (f === 34 && i !== -1)
        o = !1, u = h;
      else if (f === 92)
        s = !0;
      else
        throw new SyntaxError(`Unexpected character at index ${h}`);
    else if (f === 34 && e.charCodeAt(h - 1) === 61)
      o = !0;
    else if (u === -1 && Yr[f] === 1)
      i === -1 && (i = h);
    else if (i !== -1 && (f === 32 || f === 9))
      u === -1 && (u = h);
    else if (f === 59 || f === 44) {
      if (i === -1)
        throw new SyntaxError(`Unexpected character at index ${h}`);
      u === -1 && (u = h);
      let _ = e.slice(i, u);
      n && (_ = _.replace(/\\/g, ""), n = !1), pt(r, l, _), f === 44 && (pt(t, a, r), r = /* @__PURE__ */ Object.create(null), a = void 0), l = void 0, i = u = -1;
    } else
      throw new SyntaxError(`Unexpected character at index ${h}`);
  if (i === -1 || o || f === 32 || f === 9)
    throw new SyntaxError("Unexpected end of input");
  u === -1 && (u = h);
  const w = e.slice(i, u);
  return a === void 0 ? pt(t, w, r) : (l === void 0 ? pt(r, w, !0) : n ? pt(r, l, w.replace(/\\/g, "")) : pt(r, l, w), pt(t, a, r)), t;
}
function ab(e) {
  return Object.keys(e).map((t) => {
    let r = e[t];
    return Array.isArray(r) || (r = [r]), r.map((n) => [t].concat(
      Object.keys(n).map((s) => {
        let o = n[s];
        return Array.isArray(o) || (o = [o]), o.map((a) => a === !0 ? s : `${s}=${a}`).join("; ");
      })
    ).join("; ")).join(", ");
  }).join(", ");
}
var ib = { format: ab, parse: ob };
const cb = Cl, lb = ad, ub = id, Vf = cd, fb = ld, { randomBytes: db, createHash: hb } = bs, { Duplex: hP, Readable: pP } = pn, { URL: mo } = ud, Dt = qi, pb = BS, mb = tb, { isBlob: yb } = En, {
  BINARY_TYPES: Rl,
  EMPTY_BUFFER: Wn,
  GUID: _b,
  kForOnEventAttribute: yo,
  kListener: gb,
  kStatusCode: $b,
  kWebSocket: Re,
  NOOP: qf
} = Gt, {
  EventTarget: { addEventListener: vb, removeEventListener: Eb }
} = sb, { format: wb, parse: Sb } = ib, { toBuffer: bb } = xs, Pb = 30 * 1e3, zf = Symbol("kAborted"), _o = [8, 13], Rt = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"], Ob = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
class te extends cb {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(t, r, n) {
    super(), this._binaryType = Rl[0], this._closeCode = 1006, this._closeFrameReceived = !1, this._closeFrameSent = !1, this._closeMessage = Wn, this._closeTimer = null, this._errorEmitted = !1, this._extensions = {}, this._paused = !1, this._protocol = "", this._readyState = te.CONNECTING, this._receiver = null, this._sender = null, this._socket = null, t !== null ? (this._bufferedAmount = 0, this._isServer = !1, this._redirects = 0, r === void 0 ? r = [] : Array.isArray(r) || (typeof r == "object" && r !== null ? (n = r, r = []) : r = [r]), Gf(this, t, r, n)) : (this._autoPong = n.autoPong, this._isServer = !0);
  }
  /**
   * For historical reasons, the custom "nodebuffer" type is used by the default
   * instead of "blob".
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }
  set binaryType(t) {
    Rl.includes(t) && (this._binaryType = t, this._receiver && (this._receiver._binaryType = t));
  }
  /**
   * @type {Number}
   */
  get bufferedAmount() {
    return this._socket ? this._socket._writableState.length + this._sender._bufferedBytes : this._bufferedAmount;
  }
  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }
  /**
   * @type {Boolean}
   */
  get isPaused() {
    return this._paused;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onclose() {
    return null;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onerror() {
    return null;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onopen() {
    return null;
  }
  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onmessage() {
    return null;
  }
  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }
  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }
  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }
  /**
   * Set up the socket and the internal resources.
   *
   * @param {Duplex} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
   *     multiple times in the same tick
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */
  setSocket(t, r, n) {
    const s = new pb({
      allowSynchronousEvents: n.allowSynchronousEvents,
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: n.maxPayload,
      skipUTF8Validation: n.skipUTF8Validation
    }), o = new mb(t, this._extensions, n.generateMask);
    this._receiver = s, this._sender = o, this._socket = t, s[Re] = this, o[Re] = this, t[Re] = this, s.on("conclude", Ib), s.on("drain", kb), s.on("error", Cb), s.on("message", jb), s.on("ping", Ab), s.on("pong", Db), o.onerror = Lb, t.setTimeout && t.setTimeout(0), t.setNoDelay && t.setNoDelay(), r.length > 0 && t.unshift(r), t.on("close", Kf), t.on("data", Ks), t.on("end", Hf), t.on("error", Wf), this._readyState = te.OPEN, this.emit("open");
  }
  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = te.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
      return;
    }
    this._extensions[Dt.extensionName] && this._extensions[Dt.extensionName].cleanup(), this._receiver.removeAllListeners(), this._readyState = te.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
  }
  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */
  close(t, r) {
    if (this.readyState !== te.CLOSED) {
      if (this.readyState === te.CONNECTING) {
        He(this, this._req, "WebSocket was closed before the connection was established");
        return;
      }
      if (this.readyState === te.CLOSING) {
        this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end();
        return;
      }
      this._readyState = te.CLOSING, this._sender.close(t, r, !this._isServer, (n) => {
        n || (this._closeFrameSent = !0, (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end());
      }), Bf(this);
    }
  }
  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    this.readyState === te.CONNECTING || this.readyState === te.CLOSED || (this._paused = !0, this._socket.pause());
  }
  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(t, r, n) {
    if (this.readyState === te.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof t == "function" ? (n = t, t = r = void 0) : typeof r == "function" && (n = r, r = void 0), typeof t == "number" && (t = t.toString()), this.readyState !== te.OPEN) {
      go(this, t, n);
      return;
    }
    r === void 0 && (r = !this._isServer), this._sender.ping(t || Wn, r, n);
  }
  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(t, r, n) {
    if (this.readyState === te.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof t == "function" ? (n = t, t = r = void 0) : typeof r == "function" && (n = r, r = void 0), typeof t == "number" && (t = t.toString()), this.readyState !== te.OPEN) {
      go(this, t, n);
      return;
    }
    r === void 0 && (r = !this._isServer), this._sender.pong(t || Wn, r, n);
  }
  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    this.readyState === te.CONNECTING || this.readyState === te.CLOSED || (this._paused = !1, this._receiver._writableState.needDrain || this._socket.resume());
  }
  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(t, r, n) {
    if (this.readyState === te.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof r == "function" && (n = r, r = {}), typeof t == "number" && (t = t.toString()), this.readyState !== te.OPEN) {
      go(this, t, n);
      return;
    }
    const s = {
      binary: typeof t != "string",
      mask: !this._isServer,
      compress: !0,
      fin: !0,
      ...r
    };
    this._extensions[Dt.extensionName] || (s.compress = !1), this._sender.send(t || Wn, s, n);
  }
  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState !== te.CLOSED) {
      if (this.readyState === te.CONNECTING) {
        He(this, this._req, "WebSocket was closed before the connection was established");
        return;
      }
      this._socket && (this._readyState = te.CLOSING, this._socket.destroy());
    }
  }
}
Object.defineProperty(te, "CONNECTING", {
  enumerable: !0,
  value: Rt.indexOf("CONNECTING")
});
Object.defineProperty(te.prototype, "CONNECTING", {
  enumerable: !0,
  value: Rt.indexOf("CONNECTING")
});
Object.defineProperty(te, "OPEN", {
  enumerable: !0,
  value: Rt.indexOf("OPEN")
});
Object.defineProperty(te.prototype, "OPEN", {
  enumerable: !0,
  value: Rt.indexOf("OPEN")
});
Object.defineProperty(te, "CLOSING", {
  enumerable: !0,
  value: Rt.indexOf("CLOSING")
});
Object.defineProperty(te.prototype, "CLOSING", {
  enumerable: !0,
  value: Rt.indexOf("CLOSING")
});
Object.defineProperty(te, "CLOSED", {
  enumerable: !0,
  value: Rt.indexOf("CLOSED")
});
Object.defineProperty(te.prototype, "CLOSED", {
  enumerable: !0,
  value: Rt.indexOf("CLOSED")
});
[
  "binaryType",
  "bufferedAmount",
  "extensions",
  "isPaused",
  "protocol",
  "readyState",
  "url"
].forEach((e) => {
  Object.defineProperty(te.prototype, e, { enumerable: !0 });
});
["open", "error", "close", "message"].forEach((e) => {
  Object.defineProperty(te.prototype, `on${e}`, {
    enumerable: !0,
    get() {
      for (const t of this.listeners(e))
        if (t[yo]) return t[gb];
      return null;
    },
    set(t) {
      for (const r of this.listeners(e))
        if (r[yo]) {
          this.removeListener(e, r);
          break;
        }
      typeof t == "function" && this.addEventListener(e, t, {
        [yo]: !0
      });
    }
  });
});
te.prototype.addEventListener = vb;
te.prototype.removeEventListener = Eb;
var Nb = te;
function Gf(e, t, r, n) {
  const s = {
    allowSynchronousEvents: !0,
    autoPong: !0,
    protocolVersion: _o[1],
    maxPayload: 104857600,
    skipUTF8Validation: !1,
    perMessageDeflate: !0,
    followRedirects: !1,
    maxRedirects: 10,
    ...n,
    socketPath: void 0,
    hostname: void 0,
    protocol: void 0,
    timeout: void 0,
    method: "GET",
    host: void 0,
    path: void 0,
    port: void 0
  };
  if (e._autoPong = s.autoPong, !_o.includes(s.protocolVersion))
    throw new RangeError(
      `Unsupported protocol version: ${s.protocolVersion} (supported versions: ${_o.join(", ")})`
    );
  let o;
  if (t instanceof mo)
    o = t;
  else
    try {
      o = new mo(t);
    } catch {
      throw new SyntaxError(`Invalid URL: ${t}`);
    }
  o.protocol === "http:" ? o.protocol = "ws:" : o.protocol === "https:" && (o.protocol = "wss:"), e._url = o.href;
  const a = o.protocol === "wss:", l = o.protocol === "ws+unix:";
  let i;
  if (o.protocol !== "ws:" && !a && !l ? i = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"` : l && !o.pathname ? i = "The URL's pathname is empty" : o.hash && (i = "The URL contains a fragment identifier"), i) {
    const y = new SyntaxError(i);
    if (e._redirects === 0)
      throw y;
    is(e, y);
    return;
  }
  const f = a ? 443 : 80, u = db(16).toString("base64"), h = a ? lb.request : ub.request, w = /* @__PURE__ */ new Set();
  let _;
  if (s.createConnection = s.createConnection || (a ? Tb : Rb), s.defaultPort = s.defaultPort || f, s.port = o.port || f, s.host = o.hostname.startsWith("[") ? o.hostname.slice(1, -1) : o.hostname, s.headers = {
    ...s.headers,
    "Sec-WebSocket-Version": s.protocolVersion,
    "Sec-WebSocket-Key": u,
    Connection: "Upgrade",
    Upgrade: "websocket"
  }, s.path = o.pathname + o.search, s.timeout = s.handshakeTimeout, s.perMessageDeflate && (_ = new Dt(
    s.perMessageDeflate !== !0 ? s.perMessageDeflate : {},
    !1,
    s.maxPayload
  ), s.headers["Sec-WebSocket-Extensions"] = wb({
    [Dt.extensionName]: _.offer()
  })), r.length) {
    for (const y of r) {
      if (typeof y != "string" || !Ob.test(y) || w.has(y))
        throw new SyntaxError(
          "An invalid or duplicated subprotocol was specified"
        );
      w.add(y);
    }
    s.headers["Sec-WebSocket-Protocol"] = r.join(",");
  }
  if (s.origin && (s.protocolVersion < 13 ? s.headers["Sec-WebSocket-Origin"] = s.origin : s.headers.Origin = s.origin), (o.username || o.password) && (s.auth = `${o.username}:${o.password}`), l) {
    const y = s.path.split(":");
    s.socketPath = y[0], s.path = y[1];
  }
  let E;
  if (s.followRedirects) {
    if (e._redirects === 0) {
      e._originalIpc = l, e._originalSecure = a, e._originalHostOrSocketPath = l ? s.socketPath : o.host;
      const y = n && n.headers;
      if (n = { ...n, headers: {} }, y)
        for (const [g, p] of Object.entries(y))
          n.headers[g.toLowerCase()] = p;
    } else if (e.listenerCount("redirect") === 0) {
      const y = l ? e._originalIpc ? s.socketPath === e._originalHostOrSocketPath : !1 : e._originalIpc ? !1 : o.host === e._originalHostOrSocketPath;
      (!y || e._originalSecure && !a) && (delete s.headers.authorization, delete s.headers.cookie, y || delete s.headers.host, s.auth = void 0);
    }
    s.auth && !n.headers.authorization && (n.headers.authorization = "Basic " + Buffer.from(s.auth).toString("base64")), E = e._req = h(s), e._redirects && e.emit("redirect", e.url, E);
  } else
    E = e._req = h(s);
  s.timeout && E.on("timeout", () => {
    He(e, E, "Opening handshake has timed out");
  }), E.on("error", (y) => {
    E === null || E[zf] || (E = e._req = null, is(e, y));
  }), E.on("response", (y) => {
    const g = y.headers.location, p = y.statusCode;
    if (g && s.followRedirects && p >= 300 && p < 400) {
      if (++e._redirects > s.maxRedirects) {
        He(e, E, "Maximum redirects exceeded");
        return;
      }
      E.abort();
      let v;
      try {
        v = new mo(g, t);
      } catch {
        const N = new SyntaxError(`Invalid URL: ${g}`);
        is(e, N);
        return;
      }
      Gf(e, v, r, n);
    } else e.emit("unexpected-response", E, y) || He(
      e,
      E,
      `Unexpected server response: ${y.statusCode}`
    );
  }), E.on("upgrade", (y, g, p) => {
    if (e.emit("upgrade", y), e.readyState !== te.CONNECTING) return;
    E = e._req = null;
    const v = y.headers.upgrade;
    if (v === void 0 || v.toLowerCase() !== "websocket") {
      He(e, g, "Invalid Upgrade header");
      return;
    }
    const O = hb("sha1").update(u + _b).digest("base64");
    if (y.headers["sec-websocket-accept"] !== O) {
      He(e, g, "Invalid Sec-WebSocket-Accept header");
      return;
    }
    const N = y.headers["sec-websocket-protocol"];
    let I;
    if (N !== void 0 ? w.size ? w.has(N) || (I = "Server sent an invalid subprotocol") : I = "Server sent a subprotocol but none was requested" : w.size && (I = "Server sent no subprotocol"), I) {
      He(e, g, I);
      return;
    }
    N && (e._protocol = N);
    const F = y.headers["sec-websocket-extensions"];
    if (F !== void 0) {
      if (!_) {
        He(e, g, "Server sent a Sec-WebSocket-Extensions header but no extension was requested");
        return;
      }
      let z;
      try {
        z = Sb(F);
      } catch {
        He(e, g, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      const Z = Object.keys(z);
      if (Z.length !== 1 || Z[0] !== Dt.extensionName) {
        He(e, g, "Server indicated an extension that was not requested");
        return;
      }
      try {
        _.accept(z[Dt.extensionName]);
      } catch {
        He(e, g, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      e._extensions[Dt.extensionName] = _;
    }
    e.setSocket(g, p, {
      allowSynchronousEvents: s.allowSynchronousEvents,
      generateMask: s.generateMask,
      maxPayload: s.maxPayload,
      skipUTF8Validation: s.skipUTF8Validation
    });
  }), s.finishRequest ? s.finishRequest(E, e) : E.end();
}
function is(e, t) {
  e._readyState = te.CLOSING, e._errorEmitted = !0, e.emit("error", t), e.emitClose();
}
function Rb(e) {
  return e.path = e.socketPath, Vf.connect(e);
}
function Tb(e) {
  return e.path = void 0, !e.servername && e.servername !== "" && (e.servername = Vf.isIP(e.host) ? "" : e.host), fb.connect(e);
}
function He(e, t, r) {
  e._readyState = te.CLOSING;
  const n = new Error(r);
  Error.captureStackTrace(n, He), t.setHeader ? (t[zf] = !0, t.abort(), t.socket && !t.socket.destroyed && t.socket.destroy(), process.nextTick(is, e, n)) : (t.destroy(n), t.once("error", e.emit.bind(e, "error")), t.once("close", e.emitClose.bind(e)));
}
function go(e, t, r) {
  if (t) {
    const n = yb(t) ? t.size : bb(t).length;
    e._socket ? e._sender._bufferedBytes += n : e._bufferedAmount += n;
  }
  if (r) {
    const n = new Error(
      `WebSocket is not open: readyState ${e.readyState} (${Rt[e.readyState]})`
    );
    process.nextTick(r, n);
  }
}
function Ib(e, t) {
  const r = this[Re];
  r._closeFrameReceived = !0, r._closeMessage = t, r._closeCode = e, r._socket[Re] !== void 0 && (r._socket.removeListener("data", Ks), process.nextTick(xf, r._socket), e === 1005 ? r.close() : r.close(e, t));
}
function kb() {
  const e = this[Re];
  e.isPaused || e._socket.resume();
}
function Cb(e) {
  const t = this[Re];
  t._socket[Re] !== void 0 && (t._socket.removeListener("data", Ks), process.nextTick(xf, t._socket), t.close(e[$b])), t._errorEmitted || (t._errorEmitted = !0, t.emit("error", e));
}
function Tl() {
  this[Re].emitClose();
}
function jb(e, t) {
  this[Re].emit("message", e, t);
}
function Ab(e) {
  const t = this[Re];
  t._autoPong && t.pong(e, !this._isServer, qf), t.emit("ping", e);
}
function Db(e) {
  this[Re].emit("pong", e);
}
function xf(e) {
  e.resume();
}
function Lb(e) {
  const t = this[Re];
  t.readyState !== te.CLOSED && (t.readyState === te.OPEN && (t._readyState = te.CLOSING, Bf(t)), this._socket.end(), t._errorEmitted || (t._errorEmitted = !0, t.emit("error", e)));
}
function Bf(e) {
  e._closeTimer = setTimeout(
    e._socket.destroy.bind(e._socket),
    Pb
  );
}
function Kf() {
  const e = this[Re];
  this.removeListener("close", Kf), this.removeListener("data", Ks), this.removeListener("end", Hf), e._readyState = te.CLOSING;
  let t;
  !this._readableState.endEmitted && !e._closeFrameReceived && !e._receiver._writableState.errorEmitted && (t = e._socket.read()) !== null && e._receiver.write(t), e._receiver.end(), this[Re] = void 0, clearTimeout(e._closeTimer), e._receiver._writableState.finished || e._receiver._writableState.errorEmitted ? e.emitClose() : (e._receiver.on("error", Tl), e._receiver.on("finish", Tl));
}
function Ks(e) {
  this[Re]._receiver.write(e) || this.pause();
}
function Hf() {
  const e = this[Re];
  e._readyState = te.CLOSING, e._receiver.end(), this.end();
}
function Wf() {
  const e = this[Re];
  this.removeListener("error", Wf), this.on("error", qf), e && (e._readyState = te.CLOSING, this.destroy());
}
const jr = /* @__PURE__ */ jl(Nb), { Duplex: mP } = pn, { tokenChars: yP } = En, { Duplex: _P } = pn, { createHash: gP } = bs, { GUID: $P, kWebSocket: vP } = Gt, Jf = Vt.dirname(nd(import.meta.url));
process.env.APP_ROOT = Vt.join(Jf, "..");
const tn = process.env.VITE_DEV_SERVER_URL, EP = Vt.join(process.env.APP_ROOT, "dist-electron"), Xf = Vt.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = tn ? Vt.join(process.env.APP_ROOT, "public") : Xf;
let at, ye = null, er = /* @__PURE__ */ new Map(), Nr = null, cs = null, yr = !1, Yf = !0;
const Mb = {
  stocks: {
    type: "array",
    default: []
  },
  pollInterval: {
    type: "number",
    default: 5e3
  }
}, Jn = new hS({
  schema: Mb,
  name: "app-store"
});
function Qf() {
  if ((ye == null ? void 0 : ye.readyState) === jr.OPEN || yr)
    return console.log("[Crypto] Already connected or connecting"), Promise.resolve();
  yr = !0;
  const e = "wss://stream.binance.com:9443/ws";
  return console.log("[Crypto] WebSocket connecting to:", e), new Promise((t, r) => {
    try {
      ye = new jr(e), ye.on("open", () => {
        console.log("✅ [Crypto] WebSocket connected to Binance"), yr = !1, Fb(), Vb(), t();
      }), ye.on("message", (n) => {
        qb(n.toString());
      }), ye.on("error", (n) => {
        console.error("❌ [Crypto] WebSocket error:", n), yr = !1, r(n);
      }), ye.on("close", () => {
        console.log("❌ [Crypto] WebSocket closed"), yr = !1, Zf(), Yf && Ub();
      });
    } catch (n) {
      yr = !1, r(n);
    }
  });
}
function Fb() {
  cs = setInterval(() => {
    (ye == null ? void 0 : ye.readyState) === jr.OPEN && (ye.ping(), console.log("[Crypto] Heartbeat ping sent"));
  }, 3e4);
}
function Zf() {
  cs && (clearInterval(cs), cs = null);
}
function Ub() {
  Nr && clearTimeout(Nr), Nr = setTimeout(() => {
    console.log("[Crypto] Attempting to reconnect..."), Qf().catch((e) => {
      console.error("[Crypto] Reconnect failed:", e);
    });
  }, 5e3);
}
function Vb() {
  console.log("[Crypto] Resubscribing to all symbols..."), er.forEach((e, t) => {
    e.forEach((r) => {
      const n = r.toLowerCase() + "usdt";
      ed(n);
    });
  });
}
function ed(e) {
  if ((ye == null ? void 0 : ye.readyState) === jr.OPEN) {
    const t = {
      method: "SUBSCRIBE",
      params: [`${e}@ticker`],
      id: Date.now()
    };
    ye.send(JSON.stringify(t)), console.log(`✅ [Crypto] Subscribed to ${e}@ticker`);
  } else
    console.warn(`⚠️ [Crypto] Cannot subscribe to ${e}: WebSocket not connected`);
}
function qb(e) {
  try {
    const t = JSON.parse(e);
    if (t.e === "24hrTicker") {
      console.log(`📨 [Crypto] Received ticker data for ${t.s}`), console.log("[Crypto] Raw data:", {
        symbol: t.s,
        price: t.c,
        changePercent: t.P,
        changeAmount: t.p
      });
      const r = {
        symbol: t.s.replace("USDT", "").toUpperCase(),
        name: t.s.replace("USDT", "").toUpperCase(),
        price: parseFloat(t.c),
        change24h: parseFloat(t.P),
        changeAmount: parseFloat(t.p),
        volume: parseFloat(t.v),
        marketCap: parseFloat(t.q),
        type: "crypto",
        dataSource: "binance",
        isRealtime: !0,
        lastUpdate: t.E
      };
      at && (at.webContents.send("crypto-ticker-update", r), console.log("[Crypto] Sent to renderer:", r.symbol));
    }
  } catch (t) {
    console.error("❌ [Crypto] Failed to parse WebSocket message:", t);
  }
}
function zb() {
  Tt.handle("electron-store-get", (e, t) => Jn.get(t)), Tt.handle("electron-store-set", (e, t, r) => (Jn.set(t, r), !0)), Tt.handle("electron-store-get-all", () => Jn.store), Tt.handle("electron-store-reset", () => (Jn.reset(), !0)), Tt.handle("crypto-subscribe", async (e, t) => {
    console.log(`[Crypto IPC] Subscribe request for ${t}`), er.has("main") || er.set("main", /* @__PURE__ */ new Set()), er.get("main").add(t), await Qf();
    const r = t.toLowerCase() + "usdt";
    return ed(r), !0;
  }), Tt.handle("crypto-unsubscribe", (e, t) => {
    if (console.log(`[Crypto IPC] Unsubscribe request for ${t}`), er.has("main") && er.get("main").delete(t), (ye == null ? void 0 : ye.readyState) === jr.OPEN) {
      const r = t.toLowerCase() + "usdt", n = {
        method: "UNSUBSCRIBE",
        params: [`${r}@ticker`],
        id: Date.now()
      };
      ye.send(JSON.stringify(n)), console.log(`✅ [Crypto] Unsubscribed from ${r}`);
    }
    return !0;
  }), Tt.handle("crypto-disconnect", () => (console.log("[Crypto IPC] Disconnect request"), Yf = !1, Zf(), Nr && (clearTimeout(Nr), Nr = null), ye && (ye.close(), ye = null), er.clear(), !0)), Tt.handle("crypto-is-connected", () => {
    const e = (ye == null ? void 0 : ye.readyState) === jr.OPEN;
    return console.log(`[Crypto IPC] Connection status: ${e}`), e;
  });
}
function td() {
  at = new Il({
    title: "Electron Stock App",
    icon: Vt.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: Vt.join(Jf, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !1
    }
  }), tn && (console.log("[Main] Opening dev tools for development"), at.webContents.openDevTools()), at.webContents.on("did-finish-load", () => {
    console.log("[Main] Window loaded, sending test message"), at == null || at.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), tn ? (console.log("[Main] Loading dev server:", tn), at.loadURL(tn)) : (console.log("[Main] Loading production HTML"), at.loadFile(Vt.join(Xf, "index.html")));
}
ls.on("window-all-closed", () => {
  process.platform !== "darwin" && (ls.quit(), at = null);
});
ls.on("activate", () => {
  Il.getAllWindows().length === 0 && td();
});
ls.whenReady().then(() => {
  zb(), td();
});
export {
  EP as MAIN_DIST,
  Xf as RENDERER_DIST,
  tn as VITE_DEV_SERVER_URL
};
