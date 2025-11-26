import Cu, { app as kn, BrowserWindow as mc, ipcMain as Nr } from "electron";
import { fileURLToPath as Du } from "node:url";
import St from "node:path";
import Mu from "node:https";
import xt from "path";
import yc from "util";
import Xs from "fs";
import Lu from "crypto";
import Fu from "assert";
import Vu from "events";
import Uu from "os";
var en = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Rs = { exports: {} }, qu = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Ut = qu, Ku = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Gu = (e) => !e.some((t) => Ku.has(t));
function tn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return Gu(r) ? r : [];
}
var Hu = {
  get(e, t, r) {
    if (!Ut(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = tn(t);
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
    if (!Ut(e) || typeof t != "string")
      return e;
    const n = e, s = tn(t);
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      Ut(e[i]) || (e[i] = {}), a === s.length - 1 && (e[i] = r), e = e[i];
    }
    return n;
  },
  delete(e, t) {
    if (!Ut(e) || typeof t != "string")
      return !1;
    const r = tn(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Ut(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Ut(e) || typeof t != "string")
      return !1;
    const r = tn(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Ut(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, Ys = { exports: {} }, Qs = { exports: {} }, Zs = { exports: {} }, xs = { exports: {} };
const $c = Xs;
xs.exports = (e) => new Promise((t) => {
  $c.access(e, (r) => {
    t(!r);
  });
});
xs.exports.sync = (e) => {
  try {
    return $c.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Wu = xs.exports, ea = { exports: {} }, ta = { exports: {} };
const _c = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ta.exports = _c;
ta.exports.default = _c;
var Ju = ta.exports;
const Bu = Ju, gc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (u, c, ...d) => {
    r++;
    const l = Bu(u, ...d);
    c(l), l.then(n, n);
  }, a = (u, c, ...d) => {
    r < e ? s(u, c, ...d) : t.push(s.bind(null, u, c, ...d));
  }, i = (u, ...c) => new Promise((d) => a(u, d, ...c));
  return Object.defineProperties(i, {
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
  }), i;
};
ea.exports = gc;
ea.exports.default = gc;
var Xu = ea.exports;
const Qo = Xu;
class vc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const Yu = (e, t) => Promise.resolve(e).then(t), Qu = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new vc(t[0])));
var Zu = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = Qo(r.concurrency), s = [...e].map((i) => [i, n(Yu, i, t)]), a = Qo(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => a(Qu, i))).then(() => {
  }).catch((i) => i instanceof vc ? i.value : Promise.reject(i));
};
const Ec = xt, wc = Wu, xu = Zu;
Zs.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), xu(e, (r) => wc(Ec.resolve(t.cwd, r)), t));
Zs.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (wc.sync(Ec.resolve(t.cwd, r)))
      return r;
};
var ed = Zs.exports;
const gt = xt, Sc = ed;
Qs.exports = (e, t = {}) => {
  const r = gt.resolve(t.cwd || ""), { root: n } = gt.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function i(u) {
      Sc(s, { cwd: u }).then((c) => {
        c ? a(gt.join(u, c)) : u === n ? a(null) : i(gt.dirname(u));
      });
    })(r);
  });
};
Qs.exports.sync = (e, t = {}) => {
  let r = gt.resolve(t.cwd || "");
  const { root: n } = gt.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = Sc.sync(s, { cwd: r });
    if (a)
      return gt.join(r, a);
    if (r === n)
      return null;
    r = gt.dirname(r);
  }
};
var td = Qs.exports;
const bc = td;
Ys.exports = async ({ cwd: e } = {}) => bc("package.json", { cwd: e });
Ys.exports.sync = ({ cwd: e } = {}) => bc.sync("package.json", { cwd: e });
var rd = Ys.exports, ra = { exports: {} };
const pe = xt, Pc = Uu, _t = Pc.homedir(), na = Pc.tmpdir(), { env: or } = process, nd = (e) => {
  const t = pe.join(_t, "Library");
  return {
    data: pe.join(t, "Application Support", e),
    config: pe.join(t, "Preferences", e),
    cache: pe.join(t, "Caches", e),
    log: pe.join(t, "Logs", e),
    temp: pe.join(na, e)
  };
}, sd = (e) => {
  const t = or.APPDATA || pe.join(_t, "AppData", "Roaming"), r = or.LOCALAPPDATA || pe.join(_t, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: pe.join(r, e, "Data"),
    config: pe.join(t, e, "Config"),
    cache: pe.join(r, e, "Cache"),
    log: pe.join(r, e, "Log"),
    temp: pe.join(na, e)
  };
}, ad = (e) => {
  const t = pe.basename(_t);
  return {
    data: pe.join(or.XDG_DATA_HOME || pe.join(_t, ".local", "share"), e),
    config: pe.join(or.XDG_CONFIG_HOME || pe.join(_t, ".config"), e),
    cache: pe.join(or.XDG_CACHE_HOME || pe.join(_t, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: pe.join(or.XDG_STATE_HOME || pe.join(_t, ".local", "state"), e),
    temp: pe.join(na, t, e)
  };
}, Nc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? nd(e) : process.platform === "win32" ? sd(e) : ad(e);
};
ra.exports = Nc;
ra.exports.default = Nc;
var od = ra.exports, rt = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.NOOP = ae.LIMIT_FILES_DESCRIPTORS = ae.LIMIT_BASENAME_LENGTH = ae.IS_USER_ROOT = ae.IS_POSIX = ae.DEFAULT_TIMEOUT_SYNC = ae.DEFAULT_TIMEOUT_ASYNC = ae.DEFAULT_WRITE_OPTIONS = ae.DEFAULT_READ_OPTIONS = ae.DEFAULT_FOLDER_MODE = ae.DEFAULT_FILE_MODE = ae.DEFAULT_ENCODING = void 0;
const id = "utf8";
ae.DEFAULT_ENCODING = id;
const cd = 438;
ae.DEFAULT_FILE_MODE = cd;
const ld = 511;
ae.DEFAULT_FOLDER_MODE = ld;
const ud = {};
ae.DEFAULT_READ_OPTIONS = ud;
const dd = {};
ae.DEFAULT_WRITE_OPTIONS = dd;
const fd = 5e3;
ae.DEFAULT_TIMEOUT_ASYNC = fd;
const hd = 100;
ae.DEFAULT_TIMEOUT_SYNC = hd;
const pd = !!process.getuid;
ae.IS_POSIX = pd;
const md = process.getuid ? !process.getuid() : !1;
ae.IS_USER_ROOT = md;
const yd = 128;
ae.LIMIT_BASENAME_LENGTH = yd;
const $d = 1e4;
ae.LIMIT_FILES_DESCRIPTORS = $d;
const _d = () => {
};
ae.NOOP = _d;
var Wn = {}, dr = {};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.attemptifySync = dr.attemptifyAsync = void 0;
const Oc = ae, gd = (e, t = Oc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
dr.attemptifyAsync = gd;
const vd = (e, t = Oc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
dr.attemptifySync = vd;
var sa = {};
Object.defineProperty(sa, "__esModule", { value: !0 });
const Ed = ae, Rc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Ed.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Rc.isChangeErrorOk(e))
      throw e;
  }
};
sa.default = Rc;
var fr = {}, aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
const wd = ae, le = {
  interval: 25,
  intervalId: void 0,
  limit: wd.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    le.intervalId || (le.intervalId = setInterval(le.tick, le.interval));
  },
  reset: () => {
    le.intervalId && (clearInterval(le.intervalId), delete le.intervalId);
  },
  add: (e) => {
    le.queueWaiting.add(e), le.queueActive.size < le.limit / 2 ? le.tick() : le.init();
  },
  remove: (e) => {
    le.queueWaiting.delete(e), le.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => le.remove(r), r = () => e(t);
    le.add(r);
  }),
  tick: () => {
    if (!(le.queueActive.size >= le.limit)) {
      if (!le.queueWaiting.size)
        return le.reset();
      for (const e of le.queueWaiting) {
        if (le.queueActive.size >= le.limit)
          break;
        le.queueWaiting.delete(e), le.queueActive.add(e), e();
      }
    }
  }
};
aa.default = le;
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.retryifySync = fr.retryifyAsync = void 0;
const Sd = aa, bd = (e, t) => function(r) {
  return function n() {
    return Sd.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
      if (s(), Date.now() >= r)
        throw a;
      if (t(a)) {
        const i = Math.round(100 + 400 * Math.random());
        return new Promise((c) => setTimeout(c, i)).then(() => n.apply(void 0, arguments));
      }
      throw a;
    }));
  };
};
fr.retryifyAsync = bd;
const Pd = (e, t) => function(r) {
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
fr.retryifySync = Pd;
Object.defineProperty(Wn, "__esModule", { value: !0 });
const oe = Xs, Oe = yc, Re = dr, ge = sa, Ae = fr, Nd = {
  chmodAttempt: Re.attemptifyAsync(Oe.promisify(oe.chmod), ge.default.onChangeError),
  chownAttempt: Re.attemptifyAsync(Oe.promisify(oe.chown), ge.default.onChangeError),
  closeAttempt: Re.attemptifyAsync(Oe.promisify(oe.close)),
  fsyncAttempt: Re.attemptifyAsync(Oe.promisify(oe.fsync)),
  mkdirAttempt: Re.attemptifyAsync(Oe.promisify(oe.mkdir)),
  realpathAttempt: Re.attemptifyAsync(Oe.promisify(oe.realpath)),
  statAttempt: Re.attemptifyAsync(Oe.promisify(oe.stat)),
  unlinkAttempt: Re.attemptifyAsync(Oe.promisify(oe.unlink)),
  closeRetry: Ae.retryifyAsync(Oe.promisify(oe.close), ge.default.isRetriableError),
  fsyncRetry: Ae.retryifyAsync(Oe.promisify(oe.fsync), ge.default.isRetriableError),
  openRetry: Ae.retryifyAsync(Oe.promisify(oe.open), ge.default.isRetriableError),
  readFileRetry: Ae.retryifyAsync(Oe.promisify(oe.readFile), ge.default.isRetriableError),
  renameRetry: Ae.retryifyAsync(Oe.promisify(oe.rename), ge.default.isRetriableError),
  statRetry: Ae.retryifyAsync(Oe.promisify(oe.stat), ge.default.isRetriableError),
  writeRetry: Ae.retryifyAsync(Oe.promisify(oe.write), ge.default.isRetriableError),
  chmodSyncAttempt: Re.attemptifySync(oe.chmodSync, ge.default.onChangeError),
  chownSyncAttempt: Re.attemptifySync(oe.chownSync, ge.default.onChangeError),
  closeSyncAttempt: Re.attemptifySync(oe.closeSync),
  mkdirSyncAttempt: Re.attemptifySync(oe.mkdirSync),
  realpathSyncAttempt: Re.attemptifySync(oe.realpathSync),
  statSyncAttempt: Re.attemptifySync(oe.statSync),
  unlinkSyncAttempt: Re.attemptifySync(oe.unlinkSync),
  closeSyncRetry: Ae.retryifySync(oe.closeSync, ge.default.isRetriableError),
  fsyncSyncRetry: Ae.retryifySync(oe.fsyncSync, ge.default.isRetriableError),
  openSyncRetry: Ae.retryifySync(oe.openSync, ge.default.isRetriableError),
  readFileSyncRetry: Ae.retryifySync(oe.readFileSync, ge.default.isRetriableError),
  renameSyncRetry: Ae.retryifySync(oe.renameSync, ge.default.isRetriableError),
  statSyncRetry: Ae.retryifySync(oe.statSync, ge.default.isRetriableError),
  writeSyncRetry: Ae.retryifySync(oe.writeSync, ge.default.isRetriableError)
};
Wn.default = Nd;
var oa = {};
Object.defineProperty(oa, "__esModule", { value: !0 });
const Od = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
oa.default = Od;
var ia = {};
Object.defineProperty(ia, "__esModule", { value: !0 });
const rn = {}, Ts = {
  next: (e) => {
    const t = rn[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Ts.next(e)) : delete rn[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = rn[e];
    r || (r = rn[e] = []), r.push(t), !(r.length > 1) && t(() => Ts.next(e));
  })
};
ia.default = Ts;
var ca = {};
Object.defineProperty(ca, "__esModule", { value: !0 });
const Rd = xt, Zo = ae, xo = Wn, Fe = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = Fe.truncate(t(e));
    return n in Fe.store ? Fe.get(e, t, r) : (Fe.store[n] = r, [n, () => delete Fe.store[n]]);
  },
  purge: (e) => {
    Fe.store[e] && (delete Fe.store[e], xo.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    Fe.store[e] && (delete Fe.store[e], xo.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in Fe.store)
      Fe.purgeSync(e);
  },
  truncate: (e) => {
    const t = Rd.basename(e);
    if (t.length <= Zo.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Zo.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", Fe.purgeSyncAll);
ca.default = Fe;
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.writeFileSync = rt.writeFile = rt.readFileSync = rt.readFile = void 0;
const Tc = xt, we = ae, se = Wn, Ve = oa, Td = ia, vt = ca;
function Ic(e, t = we.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ve.default.isString(t))
    return Ic(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : we.DEFAULT_TIMEOUT_ASYNC);
  return se.default.readFileRetry(n)(e, t);
}
rt.readFile = Ic;
function jc(e, t = we.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ve.default.isString(t))
    return jc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : we.DEFAULT_TIMEOUT_SYNC);
  return se.default.readFileSyncRetry(n)(e, t);
}
rt.readFileSync = jc;
const Ac = (e, t, r, n) => {
  if (Ve.default.isFunction(r))
    return Ac(e, t, we.DEFAULT_WRITE_OPTIONS, r);
  const s = kc(e, t, r);
  return n && s.then(n, n), s;
};
rt.writeFile = Ac;
const kc = async (e, t, r = we.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ve.default.isString(r))
    return kc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : we.DEFAULT_TIMEOUT_ASYNC);
  let a = null, i = null, u = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), i = await Td.default.schedule(e), e = await se.default.realpathAttempt(e) || e, [c, u] = vt.default.get(e, r.tmpCreate || vt.default.create, r.tmpPurge !== !1);
    const l = we.IS_POSIX && Ve.default.isUndefined(r.chown), p = Ve.default.isUndefined(r.mode);
    if (l || p) {
      const _ = await se.default.statAttempt(e);
      _ && (r = { ...r }, l && (r.chown = { uid: _.uid, gid: _.gid }), p && (r.mode = _.mode));
    }
    const P = Tc.dirname(e);
    await se.default.mkdirAttempt(P, {
      mode: we.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await se.default.openRetry(s)(c, "w", r.mode || we.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), Ve.default.isString(t) ? await se.default.writeRetry(s)(d, t, 0, r.encoding || we.DEFAULT_ENCODING) : Ve.default.isUndefined(t) || await se.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await se.default.fsyncRetry(s)(d) : se.default.fsyncAttempt(d)), await se.default.closeRetry(s)(d), d = null, r.chown && await se.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await se.default.chmodAttempt(c, r.mode);
    try {
      await se.default.renameRetry(s)(c, e);
    } catch (_) {
      if (_.code !== "ENAMETOOLONG")
        throw _;
      await se.default.renameRetry(s)(c, vt.default.truncate(e));
    }
    u(), c = null;
  } finally {
    d && await se.default.closeAttempt(d), c && vt.default.purge(c), a && a(), i && i();
  }
}, Cc = (e, t, r = we.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ve.default.isString(r))
    return Cc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : we.DEFAULT_TIMEOUT_SYNC);
  let a = null, i = null, u = null;
  try {
    e = se.default.realpathSyncAttempt(e) || e, [i, a] = vt.default.get(e, r.tmpCreate || vt.default.create, r.tmpPurge !== !1);
    const c = we.IS_POSIX && Ve.default.isUndefined(r.chown), d = Ve.default.isUndefined(r.mode);
    if (c || d) {
      const p = se.default.statSyncAttempt(e);
      p && (r = { ...r }, c && (r.chown = { uid: p.uid, gid: p.gid }), d && (r.mode = p.mode));
    }
    const l = Tc.dirname(e);
    se.default.mkdirSyncAttempt(l, {
      mode: we.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), u = se.default.openSyncRetry(s)(i, "w", r.mode || we.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), Ve.default.isString(t) ? se.default.writeSyncRetry(s)(u, t, 0, r.encoding || we.DEFAULT_ENCODING) : Ve.default.isUndefined(t) || se.default.writeSyncRetry(s)(u, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? se.default.fsyncSyncRetry(s)(u) : se.default.fsyncAttempt(u)), se.default.closeSyncRetry(s)(u), u = null, r.chown && se.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && se.default.chmodSyncAttempt(i, r.mode);
    try {
      se.default.renameSyncRetry(s)(i, e);
    } catch (p) {
      if (p.code !== "ENAMETOOLONG")
        throw p;
      se.default.renameSyncRetry(s)(i, vt.default.truncate(e));
    }
    a(), i = null;
  } finally {
    u && se.default.closeSyncAttempt(u), i && vt.default.purge(i);
  }
};
rt.writeFileSync = Cc;
var Is = { exports: {} }, Dc = {}, Xe = {}, hr = {}, Jr = {}, te = {}, Hr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
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
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(h, ...E) {
    const N = [h[0]];
    let R = 0;
    for (; R < E.length; )
      u(N, E[R]), N.push(h[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(h, ...E) {
    const N = [_(h[0])];
    let R = 0;
    for (; R < E.length; )
      N.push(a), u(N, E[R]), N.push(a, _(h[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(h, E) {
    E instanceof n ? h.push(...E._items) : E instanceof r ? h.push(E) : h.push(p(E));
  }
  e.addCodeArg = u;
  function c(h) {
    let E = 1;
    for (; E < h.length - 1; ) {
      if (h[E] === a) {
        const N = d(h[E - 1], h[E + 1]);
        if (N !== void 0) {
          h.splice(E - 1, 3, N);
          continue;
        }
        h[E++] = "+";
      }
      E++;
    }
  }
  function d(h, E) {
    if (E === '""')
      return h;
    if (h === '""')
      return E;
    if (typeof h == "string")
      return E instanceof r || h[h.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${h.slice(0, -1)}${E}"` : E[0] === '"' ? h.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(h instanceof r))
      return `"${h}${E.slice(1)}`;
  }
  function l(h, E) {
    return E.emptyStr() ? h : h.emptyStr() ? E : i`${h}${E}`;
  }
  e.strConcat = l;
  function p(h) {
    return typeof h == "number" || typeof h == "boolean" || h === null ? h : _(Array.isArray(h) ? h.join(",") : h);
  }
  function P(h) {
    return new n(_(h));
  }
  e.stringify = P;
  function _(h) {
    return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function w(h) {
    return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : s`[${h}]`;
  }
  e.getProperty = w;
  function g(h) {
    if (typeof h == "string" && e.IDENTIFIER.test(h))
      return new n(`${h}`);
    throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function $(h) {
    return new n(h.toString());
  }
  e.regexpCode = $;
})(Hr);
var js = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Hr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: l } = {}) {
      this._names = {}, this._prefixes = d, this._parent = l;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const l = this._names[d] || this._nameGroup(d);
      return `${d}${l.index++}`;
    }
    _nameGroup(d) {
      var l, p;
      if (!((p = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || p === void 0) && p.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: p }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${p}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class u extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, l) {
      var p;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, w = (p = l.key) !== null && p !== void 0 ? p : l.ref;
      let g = this._values[_];
      if (g) {
        const E = g.get(w);
        if (E)
          return E;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(w, P);
      const $ = this._scope[_] || (this._scope[_] = []), h = $.length;
      return $[h] = l.ref, P.setValue(l, { property: _, itemIndex: h }), P;
    }
    getValue(d, l) {
      const p = this._values[d];
      if (p)
        return p.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (p) => {
        if (p.scopePath === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return (0, t._)`${d}${p.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, p) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, l, p);
    }
    _reduceValues(d, l, p = {}, P) {
      let _ = t.nil;
      for (const w in d) {
        const g = d[w];
        if (!g)
          continue;
        const $ = p[w] = p[w] || /* @__PURE__ */ new Map();
        g.forEach((h) => {
          if ($.has(h))
            return;
          $.set(h, n.Started);
          let E = l(h);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${h} = ${E};${this.opts._n}`;
          } else if (E = P == null ? void 0 : P(h))
            _ = (0, t._)`${_}${E}${this.opts._n}`;
          else
            throw new r(h);
          $.set(h, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(js);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Hr, r = js;
  var n = Hr;
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
  var s = js;
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
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(o, f) {
      return this;
    }
  }
  class i extends a {
    constructor(o, f, b) {
      super(), this.varKind = o, this.name = f, this.rhs = b;
    }
    render({ es5: o, _n: f }) {
      const b = o ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class u extends a {
    constructor(o, f, b) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(o, this.rhs);
    }
  }
  class c extends u {
    constructor(o, f, b, j) {
      super(o, b, j), this.op = f;
    }
    render({ _n: o }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + o;
    }
  }
  class d extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `${this.label}:` + o;
    }
  }
  class l extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class p extends a {
    constructor(o) {
      super(), this.error = o;
    }
    render({ _n: o }) {
      return `throw ${this.error};` + o;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends a {
    constructor(o) {
      super(), this.code = o;
    }
    render({ _n: o }) {
      return `${this.code};` + o;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(o, f) {
      return this.code = C(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, b) => f + b.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const b = o[f].optimizeNodes();
        Array.isArray(b) ? o.splice(f, 1, ...b) : b ? o[f] = b : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(o, f) || (k(o, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class w extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class $ extends w {
  }
  $.kind = "else";
  class h extends w {
    constructor(o, f) {
      super(f), this.condition = o;
    }
    render(o) {
      let f = `if(${this.condition})` + super.render(o);
      return this.else && (f += "else " + this.else.render(o)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const o = this.condition;
      if (o === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new $(b) : b;
      }
      if (f)
        return o === !1 ? f instanceof h ? f : f.nodes : this.nodes.length ? this : new h(U(o), f instanceof h ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = C(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return de(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  h.kind = "if";
  class E extends w {
  }
  E.kind = "for";
  class N extends E {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = C(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends E {
    constructor(o, f, b, j) {
      super(), this.varKind = o, this.name = f, this.from = b, this.to = j;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(o);
    }
    get names() {
      const o = de(super.names, this.from);
      return de(o, this.to);
    }
  }
  class I extends E {
    constructor(o, f, b, j) {
      super(), this.loop = o, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = C(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends w {
    constructor(o, f, b) {
      super(), this.name = o, this.args = f, this.async = b;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  z.kind = "func";
  class W extends _ {
    render(o) {
      return "return " + super.render(o);
    }
  }
  W.kind = "return";
  class ue extends w {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var b, j;
      return super.optimizeNames(o, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(o, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class V extends w {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends w {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(o, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(o) {
      return this._scope.name(o);
    }
    // reserves unique name in the external scope
    scopeName(o) {
      return this._extScope.name(o);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(o, f) {
      const b = this._extScope.value(o, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(o, f) {
      return this._extScope.getValue(o, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(o) {
      return this._extScope.scopeRefs(o, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(o, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new i(o, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, b) {
      return this._def(r.varKinds.const, o, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, b) {
      return this._def(r.varKinds.let, o, f, b);
    }
    // `var` declaration with optional assignment
    var(o, f, b) {
      return this._def(r.varKinds.var, o, f, b);
    }
    // assignment code
    assign(o, f, b) {
      return this._leafNode(new u(o, f, b));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new P(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [b, j] of o)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, b) {
      if (this._blockNode(new h(o)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new h(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(h, $);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(o);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(o);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new I("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(o);
      return this._for(new I("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new l(o));
    }
    // `return` statement
    return(o) {
      const f = new W();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(o, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new ue();
      if (this._blockNode(j), this.code(o), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new p(o));
    }
    // start self-balancing block
    block(o, f) {
      return this._blockStarts.push(this._nodes.length), o && this.code(o).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(o) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || o !== void 0 && b !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, b, j) {
      return this._blockNode(new z(o, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(o = 1) {
      for (; o-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(o) {
      return this._currNode.nodes.push(o), this;
    }
    _blockNode(o) {
      this._currNode.nodes.push(o), this._nodes.push(o);
    }
    _endBlockNode(o, f) {
      const b = this._currNode;
      if (b instanceof o || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof h))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = o, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const o = this._nodes;
      return o[o.length - 1];
    }
    set _currNode(o) {
      const f = this._nodes;
      f[f.length - 1] = o;
    }
  }
  e.CodeGen = ne;
  function Q(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) + (o[f] || 0);
    return y;
  }
  function de(y, o) {
    return o instanceof t._CodeOrName ? Q(y, o.names) : y;
  }
  function C(y, o, f) {
    if (y instanceof t.Name)
      return b(y);
    if (!j(y))
      return y;
    return new t._Code(y._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || o[A.str] !== 1 ? A : (delete o[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && o[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) - (o[f] || 0);
  }
  function U(y) {
    return typeof y == "boolean" || typeof y == "number" || y === null ? !y : (0, t._)`!${S(y)}`;
  }
  e.not = U;
  const D = m(e.operators.AND);
  function O(...y) {
    return y.reduce(D);
  }
  e.and = O;
  const T = m(e.operators.OR);
  function v(...y) {
    return y.reduce(T);
  }
  e.or = v;
  function m(y) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${y} ${S(f)}`;
  }
  function S(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ie = te, Id = Hr;
function jd(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = jd;
function Ad(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Mc(e, t), !Lc(t, e.self.RULES.all));
}
M.alwaysValidSchema = Ad;
function Mc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Uc(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = Mc;
function Lc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = Lc;
function kd(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = kd;
function Cd({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ie._)`${r}`;
  }
  return (0, ie._)`${e}${t}${(0, ie.getProperty)(n)}`;
}
M.schemaRefOrVal = Cd;
function Dd(e) {
  return Fc(decodeURIComponent(e));
}
M.unescapeFragment = Dd;
function Md(e) {
  return encodeURIComponent(la(e));
}
M.escapeFragment = Md;
function la(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = la;
function Fc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Fc;
function Ld(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = Ld;
function ei({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ie.Name ? (a instanceof ie.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ie.Name ? (t(s, i, a), a) : r(a, i);
    return u === ie.Name && !(c instanceof ie.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: ei({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ie._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ie._)`${r} || {}`).code((0, ie._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ie._)`${r} || {}`), ua(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Vc
  }),
  items: ei({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ie._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ie._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Vc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ie._)`{}`);
  return t !== void 0 && ua(e, r, t), r;
}
M.evaluatedPropsToName = Vc;
function ua(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ie._)`${t}${(0, ie.getProperty)(n)}`, !0));
}
M.setEvaluated = ua;
const ti = {};
function Fd(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: ti[t.code] || (ti[t.code] = new Id._Code(t.code))
  });
}
M.useFunc = Fd;
var As;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(As || (M.Type = As = {}));
function Vd(e, t, r) {
  if (e instanceof ie.Name) {
    const n = t === As.Num;
    return r ? n ? (0, ie._)`"[" + ${e} + "]"` : (0, ie._)`"['" + ${e} + "']"` : n ? (0, ie._)`"/" + ${e}` : (0, ie._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ie.getProperty)(e).toString() : "/" + la(e);
}
M.getErrorPath = Vd;
function Uc(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = Uc;
var ot = {};
Object.defineProperty(ot, "__esModule", { value: !0 });
const Pe = te, Ud = {
  // validation function arguments
  data: new Pe.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Pe.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Pe.Name("instancePath"),
  parentData: new Pe.Name("parentData"),
  parentDataProperty: new Pe.Name("parentDataProperty"),
  rootData: new Pe.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Pe.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Pe.Name("vErrors"),
  // null or array of validation errors
  errors: new Pe.Name("errors"),
  // counter of validation errors
  this: new Pe.Name("this"),
  // "globals"
  self: new Pe.Name("self"),
  scope: new Pe.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Pe.Name("json"),
  jsonPos: new Pe.Name("jsonPos"),
  jsonLen: new Pe.Name("jsonLen"),
  jsonPart: new Pe.Name("jsonPart")
};
ot.default = Ud;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = ot;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: h }) => h ? (0, t.str)`"${$}" keyword must be ${h} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, h = e.keywordError, E, N) {
    const { it: R } = $, { gen: I, compositeRule: z, allErrors: W } = R, ue = p($, h, E);
    N ?? (z || W) ? c(I, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, h = e.keywordError, E) {
    const { it: N } = $, { gen: R, compositeRule: I, allErrors: z } = N, W = p($, h, E);
    c(R, W), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i($, h) {
    $.assign(n.default.errors, h), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(h, () => $.assign((0, t._)`${n.default.vErrors}.length`, h), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: $, keyword: h, schemaValue: E, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = $.name("err");
    $.forRange("i", R, n.default.errors, (W) => {
      $.const(z, (0, t._)`${n.default.vErrors}[${W}]`), $.if((0, t._)`${z}.instancePath === undefined`, () => $.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), $.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${h}`), I.opts.verbose && ($.assign((0, t._)`${z}.schema`, E), $.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c($, h) {
    const E = $.const("err", h);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function d($, h) {
    const { gen: E, validateName: N, schemaEnv: R } = $;
    R.$async ? E.throw((0, t._)`new ${$.ValidationError}(${h})`) : (E.assign((0, t._)`${N}.errors`, h), E.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function p($, h, E) {
    const { createErrors: N } = $.it;
    return N === !1 ? (0, t._)`{}` : P($, h, E);
  }
  function P($, h, E = {}) {
    const { gen: N, it: R } = $, I = [
      _(R, E),
      w($, E)
    ];
    return g($, h, I), N.object(...I);
  }
  function _({ errorPath: $ }, { instancePath: h }) {
    const E = h ? (0, t.str)`${$}${(0, r.getErrorPath)(h, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function w({ keyword: $, it: { errSchemaPath: h } }, { schemaPath: E, parentSchema: N }) {
    let R = N ? h : (0, t.str)`${h}/${$}`;
    return E && (R = (0, t.str)`${R}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g($, { params: h, message: E }, N) {
    const { keyword: R, data: I, schemaValue: z, it: W } = $, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = W;
    N.push([l.keyword, R], [l.params, typeof h == "function" ? h($) : h || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof E == "function" ? E($) : E]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([l.propertyName, V]);
  }
})(Jr);
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.boolOrEmptySchema = hr.topBoolOrEmptySchema = void 0;
const zd = Jr, qd = te, Kd = ot, Gd = {
  message: "boolean schema is false"
};
function Hd(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? zc(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(Kd.default.data) : (t.assign((0, qd._)`${n}.errors`, null), t.return(!0));
}
hr.topBoolOrEmptySchema = Hd;
function Wd(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), zc(e)) : r.var(t, !0);
}
hr.boolOrEmptySchema = Wd;
function zc(e, t) {
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
  (0, zd.reportError)(s, Gd, void 0, t);
}
var $e = {}, Xt = {};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.getRules = Xt.isJSONType = void 0;
const Jd = ["string", "number", "integer", "boolean", "null", "object", "array"], Bd = new Set(Jd);
function Xd(e) {
  return typeof e == "string" && Bd.has(e);
}
Xt.isJSONType = Xd;
function Yd() {
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
Xt.getRules = Yd;
var ct = {};
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.shouldUseRule = ct.shouldUseGroup = ct.schemaHasRulesForType = void 0;
function Qd({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && qc(e, n);
}
ct.schemaHasRulesForType = Qd;
function qc(e, t) {
  return t.rules.some((r) => Kc(e, r));
}
ct.shouldUseGroup = qc;
function Kc(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
ct.shouldUseRule = Kc;
Object.defineProperty($e, "__esModule", { value: !0 });
$e.reportTypeError = $e.checkDataTypes = $e.checkDataType = $e.coerceAndCheckDataType = $e.getJSONTypes = $e.getSchemaTypes = $e.DataType = void 0;
const Zd = Xt, xd = ct, ef = Jr, X = te, Gc = M;
var ir;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(ir || ($e.DataType = ir = {}));
function tf(e) {
  const t = Hc(e.type);
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
$e.getSchemaTypes = tf;
function Hc(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Zd.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
$e.getJSONTypes = Hc;
function rf(e, t) {
  const { gen: r, data: n, opts: s } = e, a = nf(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, xd.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = da(t, n, s.strictNumbers, ir.Wrong);
    r.if(u, () => {
      a.length ? sf(e, t, a) : fa(e);
    });
  }
  return i;
}
$e.coerceAndCheckDataType = rf;
const Wc = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function nf(e, t) {
  return t ? e.filter((r) => Wc.has(r) || t === "array" && r === "array") : [];
}
function sf(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, X._)`typeof ${s}`), u = n.let("coerced", (0, X._)`undefined`);
  a.coerceTypes === "array" && n.if((0, X._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, X._)`${s}[0]`).assign(i, (0, X._)`typeof ${s}`).if(da(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, X._)`${u} !== undefined`);
  for (const d of r)
    (Wc.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), fa(e), n.endIf(), n.if((0, X._)`${u} !== undefined`, () => {
    n.assign(s, u), af(e, u);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, X._)`${i} == "number" || ${i} == "boolean"`).assign(u, (0, X._)`"" + ${s}`).elseIf((0, X._)`${s} === null`).assign(u, (0, X._)`""`);
        return;
      case "number":
        n.elseIf((0, X._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(u, (0, X._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, X._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(u, (0, X._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, X._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(u, !1).elseIf((0, X._)`${s} === "true" || ${s} === 1`).assign(u, !0);
        return;
      case "null":
        n.elseIf((0, X._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(u, null);
        return;
      case "array":
        n.elseIf((0, X._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(u, (0, X._)`[${s}]`);
    }
  }
}
function af({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, X._)`${t} !== undefined`, () => e.assign((0, X._)`${t}[${r}]`, n));
}
function ks(e, t, r, n = ir.Correct) {
  const s = n === ir.Correct ? X.operators.EQ : X.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, X._)`${t} ${s} null`;
    case "array":
      a = (0, X._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, X._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, X._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, X._)`typeof ${t} ${s} ${e}`;
  }
  return n === ir.Correct ? a : (0, X.not)(a);
  function i(u = X.nil) {
    return (0, X.and)((0, X._)`typeof ${t} == "number"`, u, r ? (0, X._)`isFinite(${t})` : X.nil);
  }
}
$e.checkDataType = ks;
function da(e, t, r, n) {
  if (e.length === 1)
    return ks(e[0], t, r, n);
  let s;
  const a = (0, Gc.toHash)(e);
  if (a.array && a.object) {
    const i = (0, X._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, X._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = X.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, X.and)(s, ks(i, t, r, n));
  return s;
}
$e.checkDataTypes = da;
const of = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, X._)`{type: ${e}}` : (0, X._)`{type: ${t}}`
};
function fa(e) {
  const t = cf(e);
  (0, ef.reportError)(t, of);
}
$e.reportTypeError = fa;
function cf(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Gc.schemaRefOrVal)(e, n, "type");
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
var Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.assignDefaults = void 0;
const er = te, lf = M;
function uf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      ri(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => ri(e, a, s.default));
}
Jn.assignDefaults = uf;
function ri(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, er._)`${a}${(0, er.getProperty)(t)}`;
  if (s) {
    (0, lf.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, er._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, er._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, er._)`${u} = ${(0, er.stringify)(r)}`);
}
var nt = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const fe = te, ha = M, ht = ot, df = M;
function ff(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(ma(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, fe._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = ff;
function hf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, fe.or)(...n.map((a) => (0, fe.and)(ma(e, t, a, r.ownProperties), (0, fe._)`${s} = ${a}`)));
}
x.checkMissingProp = hf;
function pf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = pf;
function Jc(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, fe._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = Jc;
function pa(e, t, r) {
  return (0, fe._)`${Jc(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = pa;
function mf(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} !== undefined`;
  return n ? (0, fe._)`${s} && ${pa(e, t, r)}` : s;
}
x.propertyInData = mf;
function ma(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} === undefined`;
  return n ? (0, fe.or)(s, (0, fe.not)(pa(e, t, r))) : s;
}
x.noPropertyInData = ma;
function Bc(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = Bc;
function yf(e, t) {
  return Bc(t).filter((r) => !(0, ha.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = yf;
function $f({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, fe._)`${e}, ${t}, ${n}${s}` : t, p = [
    [ht.default.instancePath, (0, fe.strConcat)(ht.default.instancePath, a)],
    [ht.default.parentData, i.parentData],
    [ht.default.parentDataProperty, i.parentDataProperty],
    [ht.default.rootData, ht.default.rootData]
  ];
  i.opts.dynamicRef && p.push([ht.default.dynamicAnchors, ht.default.dynamicAnchors]);
  const P = (0, fe._)`${l}, ${r.object(...p)}`;
  return c !== fe.nil ? (0, fe._)`${u}.call(${c}, ${P})` : (0, fe._)`${u}(${P})`;
}
x.callValidateCode = $f;
const _f = (0, fe._)`new RegExp`;
function gf({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, fe._)`${s.code === "new RegExp" ? _f : (0, df.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = gf;
function vf(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const u = t.let("valid", !0);
    return i(() => t.assign(u, !1)), u;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(u) {
    const c = t.const("len", (0, fe._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: ha.Type.Num
      }, a), t.if((0, fe.not)(a), u);
    });
  }
}
x.validateArray = vf;
function Ef(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ha.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), u = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, u);
    t.assign(i, (0, fe._)`${i} || ${u}`), e.mergeValidEvaluated(l, u) || t.if((0, fe.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
x.validateUnion = Ef;
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.validateKeywordUsage = nt.validSchemaType = nt.funcKeywordCode = nt.macroKeywordCode = void 0;
const Te = te, Kt = ot, wf = x, Sf = Jr;
function bf(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = Xc(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: Te.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
nt.macroKeywordCode = bf;
function Pf(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  Of(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = Xc(n, s, d), p = n.let("valid");
  e.block$data(p, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : p);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && ni(e), $(() => e.error());
    else {
      const h = t.async ? _() : w();
      t.modifying && ni(e), $(() => Nf(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, Te._)`await `), (E) => n.assign(p, !1).if((0, Te._)`${E} instanceof ${c.ValidationError}`, () => n.assign(h, (0, Te._)`${E}.errors`), () => n.throw(E))), h;
  }
  function w() {
    const h = (0, Te._)`${l}.errors`;
    return n.assign(h, null), g(Te.nil), h;
  }
  function g(h = t.async ? (0, Te._)`await ` : Te.nil) {
    const E = c.opts.passContext ? Kt.default.this : Kt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(p, (0, Te._)`${h}${(0, wf.callValidateCode)(e, l, E, N)}`, t.modifying);
  }
  function $(h) {
    var E;
    n.if((0, Te.not)((E = t.valid) !== null && E !== void 0 ? E : p), h);
  }
}
nt.funcKeywordCode = Pf;
function ni(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Te._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Nf(e, t) {
  const { gen: r } = e;
  r.if((0, Te._)`Array.isArray(${t})`, () => {
    r.assign(Kt.default.vErrors, (0, Te._)`${Kt.default.vErrors} === null ? ${t} : ${Kt.default.vErrors}.concat(${t})`).assign(Kt.default.errors, (0, Te._)`${Kt.default.vErrors}.length`), (0, Sf.extendErrors)(e);
  }, () => e.error());
}
function Of({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Xc(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Te.stringify)(r) });
}
function Rf(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
nt.validSchemaType = Rf;
function Tf({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((u) => !Object.prototype.hasOwnProperty.call(e, u)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
nt.validateKeywordUsage = Tf;
var bt = {};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.extendSubschemaMode = bt.extendSubschemaData = bt.getSubschema = void 0;
const et = te, Yc = M;
function If(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, et._)`${e.schemaPath}${(0, et.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, et._)`${e.schemaPath}${(0, et.getProperty)(t)}${(0, et.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Yc.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
bt.getSubschema = If;
function jf(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: p } = t, P = u.let("data", (0, et._)`${t.data}${(0, et.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, et.str)`${d}${(0, Yc.getErrorPath)(r, n, p.jsPropertySyntax)}`, e.parentDataProperty = (0, et._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof et.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
bt.extendSubschemaData = jf;
function Af(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
bt.extendSubschemaMode = Af;
var Se = {}, Bn = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, a;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (a = Object.keys(t), n = a.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var i = a[s];
      if (!e(t[i], r[i])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, Qc = { exports: {} }, Et = Qc.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  wn(t, n, s, e, "", e);
};
Et.keywords = {
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
Et.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Et.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Et.skipKeywords = {
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
function wn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var p = n[l];
      if (Array.isArray(p)) {
        if (l in Et.arrayKeywords)
          for (var P = 0; P < p.length; P++)
            wn(e, t, r, p[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in Et.propsKeywords) {
        if (p && typeof p == "object")
          for (var _ in p)
            wn(e, t, r, p[_], s + "/" + l + "/" + kf(_), a, s, l, n, _);
      } else (l in Et.keywords || e.allKeys && !(l in Et.skipKeywords)) && wn(e, t, r, p, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function kf(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Cf = Qc.exports;
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.getSchemaRefs = Se.resolveUrl = Se.normalizeId = Se._getFullPath = Se.getFullPath = Se.inlineRef = void 0;
const Df = M, Mf = Bn, Lf = Cf, Ff = /* @__PURE__ */ new Set([
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
function Vf(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Cs(e) : t ? Zc(e) <= t : !1;
}
Se.inlineRef = Vf;
const Uf = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Cs(e) {
  for (const t in e) {
    if (Uf.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Cs) || typeof r == "object" && Cs(r))
      return !0;
  }
  return !1;
}
function Zc(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Ff.has(r) && (typeof e[r] == "object" && (0, Df.eachItem)(e[r], (n) => t += Zc(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function xc(e, t = "", r) {
  r !== !1 && (t = cr(t));
  const n = e.parse(t);
  return el(e, n);
}
Se.getFullPath = xc;
function el(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Se._getFullPath = el;
const zf = /#\/?$/;
function cr(e) {
  return e ? e.replace(zf, "") : "";
}
Se.normalizeId = cr;
function qf(e, t, r) {
  return r = cr(r), e.resolve(t, r);
}
Se.resolveUrl = qf;
const Kf = /^[a-z_][-a-z0-9._]*$/i;
function Gf(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = cr(e[r] || t), a = { "": s }, i = xc(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return Lf(e, { allKeys: !0 }, (p, P, _, w) => {
    if (w === void 0)
      return;
    const g = i + P;
    let $ = a[w];
    typeof p[r] == "string" && ($ = h.call(this, p[r])), E.call(this, p.$anchor), E.call(this, p.$dynamicAnchor), a[P] = $;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = cr($ ? R($, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(p, I.schema, N) : N !== cr(g) && (N[0] === "#" ? (d(p, u[N], N), u[N] = p) : this.refs[N] = g), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!Kf.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), u;
  function d(p, P, _) {
    if (P !== void 0 && !Mf(p, P))
      throw l(_);
  }
  function l(p) {
    return new Error(`reference "${p}" resolves to more than one schema`);
  }
}
Se.getSchemaRefs = Gf;
Object.defineProperty(Xe, "__esModule", { value: !0 });
Xe.getData = Xe.KeywordCxt = Xe.validateFunctionCode = void 0;
const tl = hr, si = $e, ya = ct, Cn = $e, Hf = Jn, Dr = nt, fs = bt, K = te, J = ot, Wf = Se, lt = M, Or = Jr;
function Jf(e) {
  if (sl(e) && (al(e), nl(e))) {
    Yf(e);
    return;
  }
  rl(e, () => (0, tl.topBoolOrEmptySchema)(e));
}
Xe.validateFunctionCode = Jf;
function rl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${ai(r, s)}`), Xf(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${J.default.data}, ${Bf(s)}`, n.$async, () => e.code(ai(r, s)).code(a));
}
function Bf(e) {
  return (0, K._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, K._)`, ${J.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function Xf(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, K._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, K._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, K._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, K._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, K._)`""`), e.var(J.default.parentData, (0, K._)`undefined`), e.var(J.default.parentDataProperty, (0, K._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function Yf(e) {
  const { schema: t, opts: r, gen: n } = e;
  rl(e, () => {
    r.$comment && t.$comment && il(e), th(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && Qf(e), ol(e), sh(e);
  });
}
function Qf(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function ai(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function Zf(e, t) {
  if (sl(e) && (al(e), nl(e))) {
    xf(e, t);
    return;
  }
  (0, tl.boolOrEmptySchema)(e, t);
}
function nl({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function sl(e) {
  return typeof e.schema != "boolean";
}
function xf(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && il(e), rh(e), nh(e);
  const a = n.const("_errs", J.default.errors);
  ol(e, a), n.var(t, (0, K._)`${a} === ${J.default.errors}`);
}
function al(e) {
  (0, lt.checkUnknownRules)(e), eh(e);
}
function ol(e, t) {
  if (e.opts.jtd)
    return oi(e, [], !1, t);
  const r = (0, si.getSchemaTypes)(e.schema), n = (0, si.coerceAndCheckDataType)(e, r);
  oi(e, r, !n, t);
}
function eh(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, lt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function th(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, lt.checkStrictMode)(e, "default is ignored in the schema root");
}
function rh(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Wf.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function nh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function il({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, K.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${J.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function sh(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, K._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, J.default.vErrors), a.unevaluated && ah(e), t.return((0, K._)`${J.default.errors} === 0`));
}
function ah({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function oi(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, lt.schemaHasRulesButRef)(a, l))) {
    s.block(() => ul(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || oh(e, t), s.block(() => {
    for (const P of l.rules)
      p(P);
    p(l.post);
  });
  function p(P) {
    (0, ya.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Cn.checkDataType)(P.type, i, c.strictNumbers)), ii(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Cn.reportTypeError)(e)), s.endIf()) : ii(e, P), u || s.if((0, K._)`${J.default.errors} === ${n || 0}`));
  }
}
function ii(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Hf.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, ya.shouldUseRule)(n, a) && ul(e, a.keyword, a.definition, t.type);
  });
}
function oh(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (ih(e, t), e.opts.allowUnionTypes || ch(e, t), lh(e, e.dataTypes));
}
function ih(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      cl(e.dataTypes, r) || $a(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), dh(e, t);
  }
}
function ch(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && $a(e, "use allowUnionTypes to allow union type keyword");
}
function lh(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, ya.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => uh(t, i)) && $a(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function uh(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function cl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function dh(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    cl(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function $a(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, lt.checkStrictMode)(e, t, e.opts.strictTypes);
}
let ll = class {
  constructor(t, r, n) {
    if ((0, Dr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, lt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", dl(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Dr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", J.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, K.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, K.not)(t), void 0, r);
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
    this.fail((0, K._)`${r} !== undefined && (${(0, K.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Or.reportExtraError : Or.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Or.reportError)(this, this.def.$dataError || Or.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Or.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = K.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = K.nil, r = K.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, K.or)((0, K._)`${s} === undefined`, r)), t !== K.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, K.or)(i(), u());
    function i() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Cn.checkDataTypes)(c, r, a.opts.strictNumbers, Cn.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function u() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, K._)`!${c}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, fs.getSubschema)(this.it, t);
    (0, fs.extendSubschemaData)(n, this.it, t), (0, fs.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return Zf(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = lt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = lt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
Xe.KeywordCxt = ll;
function ul(e, t, r, n) {
  const s = new ll(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Dr.funcKeywordCode)(s, r) : "macro" in r ? (0, Dr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Dr.funcKeywordCode)(s, r);
}
const fh = /^\/(?:[^~]|~0|~1)*$/, hh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function dl(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!fh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = hh.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +d[1];
    if (s = d[2], s === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !s)
      return a;
  }
  let i = a;
  const u = s.split("/");
  for (const d of u)
    d && (a = (0, K._)`${a}${(0, K.getProperty)((0, lt.unescapeJsonPointer)(d))}`, i = (0, K._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
Xe.getData = dl;
var Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
let ph = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
Br.default = ph;
var $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
const hs = Se;
let mh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, hs.resolveUrl)(t, r, n), this.missingSchema = (0, hs.normalizeId)((0, hs.getFullPath)(t, this.missingRef));
  }
};
$r.default = mh;
var De = {};
Object.defineProperty(De, "__esModule", { value: !0 });
De.resolveSchema = De.getCompilingSchema = De.resolveRef = De.compileSchema = De.SchemaEnv = void 0;
const Ke = te, yh = Br, zt = ot, Je = Se, ci = M, $h = Xe;
let Xn = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Je.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
De.SchemaEnv = Xn;
function _a(e) {
  const t = fl.call(this, e);
  if (t)
    return t;
  const r = (0, Je.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Ke.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: yh.default,
    code: (0, Ke._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: zt.default.data,
    parentData: zt.default.parentData,
    parentDataProperty: zt.default.parentDataProperty,
    dataNames: [zt.default.data],
    dataPathArr: [Ke.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ke.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Ke.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ke._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, $h.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const p = i.toString();
    l = `${i.scopeRefs(zt.default.scope)}return ${p}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${zt.default.self}`, `${zt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: p, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: w, items: g } = d;
      _.evaluated = {
        props: w instanceof Ke.Name ? void 0 : w,
        items: g instanceof Ke.Name ? void 0 : g,
        dynamicProps: w instanceof Ke.Name,
        dynamicItems: g instanceof Ke.Name
      }, _.source && (_.source.evaluated = (0, Ke.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (p) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), p;
  } finally {
    this._compilations.delete(e);
  }
}
De.compileSchema = _a;
function _h(e, t, r) {
  var n;
  r = (0, Je.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Eh.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new Xn({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = gh.call(this, a);
}
De.resolveRef = _h;
function gh(e) {
  return (0, Je.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : _a.call(this, e);
}
function fl(e) {
  for (const t of this._compilations)
    if (vh(t, e))
      return t;
}
De.getCompilingSchema = fl;
function vh(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Eh(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Yn.call(this, e, t);
}
function Yn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Je._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Je.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return ps.call(this, r, e);
  const a = (0, Je.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = Yn.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : ps.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || _a.call(this, i), a === (0, Je.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Je.resolveUrl)(this.opts.uriResolver, s, d)), new Xn({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return ps.call(this, r, i);
  }
}
De.resolveSchema = Yn;
const wh = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function ps(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, ci.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !wh.has(u) && d && (t = (0, Je.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, ci.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Je.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Yn.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Xn({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Sh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", bh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Ph = "object", Nh = [
  "$data"
], Oh = {
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
}, Rh = !1, Th = {
  $id: Sh,
  description: bh,
  type: Ph,
  required: Nh,
  properties: Oh,
  additionalProperties: Rh
};
var ga = {}, Qn = { exports: {} };
const Ih = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), hl = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function pl(e) {
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
const jh = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function li(e) {
  return e.length = 0, !0;
}
function Ah(e, t, r) {
  if (e.length) {
    const n = pl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function kh(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, u = Ah;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (a === !0 && (i = !0), !u(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!u(s, n, r))
          break;
        u = li;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (u === li ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(pl(s))), r.address = n.join(""), r;
}
function ml(e) {
  if (Ch(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = kh(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function Ch(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function Dh(e) {
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
function Mh(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Lh(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!hl(r)) {
      const n = ml(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var yl = {
  nonSimpleDomain: jh,
  recomposeAuthority: Lh,
  normalizeComponentEncoding: Mh,
  removeDotSegments: Dh,
  isIPv4: hl,
  isUUID: Ih,
  normalizeIPv6: ml
};
const { isUUID: Fh } = yl, Vh = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function $l(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function _l(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function gl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function Uh(e) {
  return e.secure = $l(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function zh(e) {
  if ((e.port === ($l(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function qh(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Vh);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = va(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Kh(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = va(s);
  a && (e = a.serialize(e, t));
  const i = e, u = e.nss;
  return i.path = `${n || t.nid}:${u}`, t.skipEscape = !0, i;
}
function Gh(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Fh(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function Hh(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const vl = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: _l,
    serialize: gl
  }
), Wh = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: vl.domainHost,
    parse: _l,
    serialize: gl
  }
), Sn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: Uh,
    serialize: zh
  }
), Jh = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Sn.domainHost,
    parse: Sn.parse,
    serialize: Sn.serialize
  }
), Bh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: qh,
    serialize: Kh,
    skipNormalize: !0
  }
), Xh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: Gh,
    serialize: Hh,
    skipNormalize: !0
  }
), Dn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: vl,
    https: Wh,
    ws: Sn,
    wss: Jh,
    urn: Bh,
    "urn:uuid": Xh
  }
);
Object.setPrototypeOf(Dn, null);
function va(e) {
  return e && (Dn[
    /** @type {SchemeName} */
    e
  ] || Dn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var Yh = {
  SCHEMES: Dn,
  getSchemeHandler: va
};
const { normalizeIPv6: Qh, removeDotSegments: Ar, recomposeAuthority: Zh, normalizeComponentEncoding: nn, isIPv4: xh, nonSimpleDomain: ep } = yl, { SCHEMES: tp, getSchemeHandler: El } = Yh;
function rp(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  st(ft(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  ft(st(e, t), t)), e;
}
function np(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = wl(ft(e, n), ft(t, n), n, !0);
  return n.skipEscape = !0, st(s, n);
}
function wl(e, t, r, n) {
  const s = {};
  return n || (e = ft(st(e, r), r), t = ft(st(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Ar(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Ar(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Ar(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Ar(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function sp(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = st(nn(ft(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = st(nn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = st(nn(ft(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = st(nn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function st(e, t) {
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
  }, n = Object.assign({}, t), s = [], a = El(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = Zh(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let u = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (u = Ar(u)), i === void 0 && u[0] === "/" && u[1] === "/" && (u = "/%2F" + u.slice(2)), s.push(u);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const ap = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function ft(e, t) {
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
  const a = e.match(ap);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (xh(n.host) === !1) {
        const c = Qh(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = El(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && ep(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (u) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + u;
      }
    (!i || i && !i.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Ea = {
  SCHEMES: tp,
  normalize: rp,
  resolve: np,
  resolveComponent: wl,
  equal: sp,
  serialize: st,
  parse: ft
};
Qn.exports = Ea;
Qn.exports.default = Ea;
Qn.exports.fastUri = Ea;
var Sl = Qn.exports;
Object.defineProperty(ga, "__esModule", { value: !0 });
const bl = Sl;
bl.code = 'require("ajv/dist/runtime/uri").default';
ga.default = bl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Xe;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = te;
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
  const n = Br, s = $r, a = Xt, i = De, u = te, c = Se, d = $e, l = M, p = Th, P = ga, _ = (v, m) => new RegExp(v, m);
  _.code = "new RegExp";
  const w = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  ]), $ = {
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
  }, h = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function N(v) {
    var m, S, y, o, f, b, j, A, q, F, re, Le, Nt, Ot, Rt, Tt, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft;
    const qe = v.strict, Vt = (m = v.code) === null || m === void 0 ? void 0 : m.optimize, br = Vt === !0 || Vt === void 0 ? 1 : Vt || 0, Pr = (y = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && y !== void 0 ? y : _, ds = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : qe) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : qe) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : qe) !== null && F !== void 0 ? F : "log",
      strictTuples: (Le = (re = v.strictTuples) !== null && re !== void 0 ? re : qe) !== null && Le !== void 0 ? Le : "log",
      strictRequired: (Ot = (Nt = v.strictRequired) !== null && Nt !== void 0 ? Nt : qe) !== null && Ot !== void 0 ? Ot : !1,
      code: v.code ? { ...v.code, optimize: br, regExp: Pr } : { optimize: br, regExp: Pr },
      loopRequired: (Rt = v.loopRequired) !== null && Rt !== void 0 ? Rt : E,
      loopEnum: (Tt = v.loopEnum) !== null && Tt !== void 0 ? Tt : E,
      meta: (It = v.meta) !== null && It !== void 0 ? It : !0,
      messages: (jt = v.messages) !== null && jt !== void 0 ? jt : !0,
      inlineRefs: (At = v.inlineRefs) !== null && At !== void 0 ? At : !0,
      schemaId: (kt = v.schemaId) !== null && kt !== void 0 ? kt : "$id",
      addUsedSchema: (Ct = v.addUsedSchema) !== null && Ct !== void 0 ? Ct : !0,
      validateSchema: (Dt = v.validateSchema) !== null && Dt !== void 0 ? Dt : !0,
      validateFormats: (Mt = v.validateFormats) !== null && Mt !== void 0 ? Mt : !0,
      unicodeRegExp: (Lt = v.unicodeRegExp) !== null && Lt !== void 0 ? Lt : !0,
      int32range: (Ft = v.int32range) !== null && Ft !== void 0 ? Ft : !0,
      uriResolver: ds
    };
  }
  class R {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...N(m) };
      const { es5: S, lines: y } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: y }), this.logger = Q(m.logger);
      const o = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, m, "NOT SUPPORTED"), I.call(this, h, m, "DEPRECATED", "warn"), this._metaOpts = H.call(this), m.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && V.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), W.call(this), m.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: S, schemaId: y } = this.opts;
      let o = p;
      y === "id" && (o = { ...p }, o.id = o.$id, delete o.$id), S && m && this.addMetaSchema(o, o[y], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[S] || m : void 0;
    }
    validate(m, S) {
      let y;
      if (typeof m == "string") {
        if (y = this.getSchema(m), !y)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        y = this.compile(m);
      const o = y(S);
      return "$async" in y || (this.errors = y.errors), o;
    }
    compile(m, S) {
      const y = this._addSchema(m, S);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(m, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return o.call(this, m, S);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const Le = this._addSchema(F, re);
        return Le.validate || b.call(this, Le);
      }
      async function f(F) {
        F && !this.getSchema(F) && await o.call(this, { $ref: F }, !0);
      }
      async function b(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), b.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, S);
      }
      async function q(F) {
        const re = this._loading[F];
        if (re)
          return re;
        try {
          return await (this._loading[F] = y(F));
        } finally {
          delete this._loading[F];
        }
      }
    }
    // Adds schema to the instance
    addSchema(m, S, y, o = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const b of m)
          this.addSchema(b, void 0, y, o);
        return this;
      }
      let f;
      if (typeof m == "object") {
        const { schemaId: b } = this.opts;
        if (f = m[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(m, y, S, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, S, y = this.opts.validateSchema) {
      return this.addSchema(m, S, !0, y), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, S) {
      if (typeof m == "boolean")
        return !0;
      let y;
      if (y = m.$schema, y !== void 0 && typeof y != "string")
        throw new Error("$schema must be a string");
      if (y = y || this.opts.defaultMeta || this.defaultMeta(), !y)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate(y, m);
      if (!o && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return o;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(m) {
      let S;
      for (; typeof (S = z.call(this, m)) == "string"; )
        m = S;
      if (S === void 0) {
        const { schemaId: y } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: y });
        if (S = i.resolveSchema.call(this, o, m), !S)
          return;
        this.refs[m] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
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
          const S = z.call(this, m);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[m], delete this.refs[m], this;
        }
        case "object": {
          const S = m;
          this._cache.delete(S);
          let y = m[this.opts.schemaId];
          return y && (y = (0, c.normalizeId)(y), delete this.schemas[y], delete this.refs[y]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(m) {
      for (const S of m)
        this.addKeyword(S);
      return this;
    }
    addKeyword(m, S) {
      let y;
      if (typeof m == "string")
        y = m, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = y);
      else if (typeof m == "object" && S === void 0) {
        if (S = m, y = S.keyword, Array.isArray(y) && !y.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, y, S), !S)
        return (0, l.eachItem)(y, (f) => k.call(this, f)), this;
      D.call(this, S);
      const o = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)(y, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((b) => k.call(this, f, o, b))), this;
    }
    getKeyword(m) {
      const S = this.RULES.all[m];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: S } = this;
      delete S.keywords[m], delete S.all[m];
      for (const y of S.rules) {
        const o = y.rules.findIndex((f) => f.keyword === m);
        o >= 0 && y.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[m] = S, this;
    }
    errorsText(m = this.errors, { separator: S = ", ", dataVar: y = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((o) => `${y}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(m, S) {
      const y = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let b = m;
        for (const j of f)
          b = b[j];
        for (const j in y) {
          const A = y[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = T(F));
        }
      }
      return m;
    }
    _removeAllSchemas(m, S) {
      for (const y in m) {
        const o = m[y];
        (!S || S.test(y)) && (typeof o == "string" ? delete m[y] : o && !o.meta && (this._cache.delete(o.schema), delete m[y]));
      }
    }
    _addSchema(m, S, y, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: j } = this.opts;
      if (typeof m == "object")
        b = m[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof m != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(m);
      if (A !== void 0)
        return A;
      y = (0, c.normalizeId)(b || y);
      const q = c.getSchemaRefs.call(this, m, y);
      return A = new i.SchemaEnv({ schema: m, schemaId: j, meta: S, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), o && this.validateSchema(m, !0), A;
    }
    _checkUnique(m) {
      if (this.schemas[m] || this.refs[m])
        throw new Error(`schema with key or id "${m}" already exists`);
    }
    _compileSchemaEnv(m) {
      if (m.meta ? this._compileMetaSchema(m) : i.compileSchema.call(this, m), !m.validate)
        throw new Error("ajv implementation error");
      return m.validate;
    }
    _compileMetaSchema(m) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, m);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(v, m, S, y = "error") {
    for (const o in v) {
      const f = o;
      f in m && this.logger[y](`${S}: option ${o}. ${v[f]}`);
    }
  }
  function z(v) {
    return v = (0, c.normalizeId)(v), this.schemas[v] || this.refs[v];
  }
  function W() {
    const v = this.opts.schemas;
    if (v)
      if (Array.isArray(v))
        this.addSchema(v);
      else
        for (const m in v)
          this.addSchema(v[m], m);
  }
  function ue() {
    for (const v in this.opts.formats) {
      const m = this.opts.formats[v];
      m && this.addFormat(v, m);
    }
  }
  function V(v) {
    if (Array.isArray(v)) {
      this.addVocabulary(v);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in v) {
      const S = v[m];
      S.keyword || (S.keyword = m), this.addKeyword(S);
    }
  }
  function H() {
    const v = { ...this.opts };
    for (const m of w)
      delete v[m];
    return v;
  }
  const ne = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(v) {
    if (v === !1)
      return ne;
    if (v === void 0)
      return console;
    if (v.log && v.warn && v.error)
      return v;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(v, m) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(v, (y) => {
      if (S.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, m, S) {
    var y;
    const o = m == null ? void 0 : m.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = o ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[v] = !0, !m)
      return;
    const j = {
      keyword: v,
      definition: {
        ...m,
        type: (0, d.getJSONTypes)(m.type),
        schemaType: (0, d.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? U.call(this, b, j, m.before) : b.rules.push(j), f.all[v] = j, (y = m.implements) === null || y === void 0 || y.forEach((A) => this.addKeyword(A));
  }
  function U(v, m, S) {
    const y = v.rules.findIndex((o) => o.keyword === S);
    y >= 0 ? v.rules.splice(y, 0, m) : (v.rules.push(m), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: m } = v;
    m !== void 0 && (v.$data && this.opts.$data && (m = T(m)), v.validateSchema = this.compile(m, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(Dc);
var wa = {}, Sa = {}, ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
const op = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ba.default = op;
var Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.callRef = Yt.getValidate = void 0;
const ip = $r, ui = x, ke = te, tr = ot, di = De, sn = M, cp = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return p();
    const l = di.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new ip.default(n.opts.uriResolver, s, r);
    if (l instanceof di.SchemaEnv)
      return P(l);
    return _(l);
    function p() {
      if (a === d)
        return bn(e, i, a, a.$async);
      const w = t.scopeValue("root", { ref: d });
      return bn(e, (0, ke._)`${w}.validate`, d, d.$async);
    }
    function P(w) {
      const g = Pl(e, w);
      bn(e, g, w, w.$async);
    }
    function _(w) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: w, code: (0, ke.stringify)(w) } : { ref: w }), $ = t.name("valid"), h = e.subschema({
        schema: w,
        dataTypes: [],
        schemaPath: ke.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, $);
      e.mergeEvaluated(h), e.ok($);
    }
  }
};
function Pl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, ke._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Yt.getValidate = Pl;
function bn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? tr.default.this : ke.nil;
  n ? l() : p();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const w = s.let("valid");
    s.try(() => {
      s.code((0, ke._)`await ${(0, ui.callValidateCode)(e, t, d)}`), _(t), i || s.assign(w, !0);
    }, (g) => {
      s.if((0, ke._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(w, !1);
    }), e.ok(w);
  }
  function p() {
    e.result((0, ui.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(w) {
    const g = (0, ke._)`${w}.errors`;
    s.assign(tr.default.vErrors, (0, ke._)`${tr.default.vErrors} === null ? ${g} : ${tr.default.vErrors}.concat(${g})`), s.assign(tr.default.errors, (0, ke._)`${tr.default.vErrors}.length`);
  }
  function _(w) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const $ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = sn.mergeEvaluated.props(s, $.props, a.props));
      else {
        const h = s.var("props", (0, ke._)`${w}.evaluated.props`);
        a.props = sn.mergeEvaluated.props(s, h, a.props, ke.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = sn.mergeEvaluated.items(s, $.items, a.items));
      else {
        const h = s.var("items", (0, ke._)`${w}.evaluated.items`);
        a.items = sn.mergeEvaluated.items(s, h, a.items, ke.Name);
      }
  }
}
Yt.callRef = bn;
Yt.default = cp;
Object.defineProperty(Sa, "__esModule", { value: !0 });
const lp = ba, up = Yt, dp = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  lp.default,
  up.default
];
Sa.default = dp;
var Pa = {}, Na = {};
Object.defineProperty(Na, "__esModule", { value: !0 });
const Mn = te, pt = Mn.operators, Ln = {
  maximum: { okStr: "<=", ok: pt.LTE, fail: pt.GT },
  minimum: { okStr: ">=", ok: pt.GTE, fail: pt.LT },
  exclusiveMaximum: { okStr: "<", ok: pt.LT, fail: pt.GTE },
  exclusiveMinimum: { okStr: ">", ok: pt.GT, fail: pt.LTE }
}, fp = {
  message: ({ keyword: e, schemaCode: t }) => (0, Mn.str)`must be ${Ln[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Mn._)`{comparison: ${Ln[e].okStr}, limit: ${t}}`
}, hp = {
  keyword: Object.keys(Ln),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: fp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Mn._)`${r} ${Ln[t].fail} ${n} || isNaN(${r})`);
  }
};
Na.default = hp;
var Oa = {};
Object.defineProperty(Oa, "__esModule", { value: !0 });
const Mr = te, pp = {
  message: ({ schemaCode: e }) => (0, Mr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Mr._)`{multipleOf: ${e}}`
}, mp = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: pp,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Mr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Mr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Mr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Oa.default = mp;
var Ra = {}, Ta = {};
Object.defineProperty(Ta, "__esModule", { value: !0 });
function Nl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ta.default = Nl;
Nl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ra, "__esModule", { value: !0 });
const Gt = te, yp = M, $p = Ta, _p = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Gt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Gt._)`{limit: ${e}}`
}, gp = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: _p,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Gt.operators.GT : Gt.operators.LT, i = s.opts.unicode === !1 ? (0, Gt._)`${r}.length` : (0, Gt._)`${(0, yp.useFunc)(e.gen, $p.default)}(${r})`;
    e.fail$data((0, Gt._)`${i} ${a} ${n}`);
  }
};
Ra.default = gp;
var Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
const vp = x, Fn = te, Ep = {
  message: ({ schemaCode: e }) => (0, Fn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Fn._)`{pattern: ${e}}`
}, wp = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Ep,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Fn._)`(new RegExp(${s}, ${i}))` : (0, vp.usePattern)(e, n);
    e.fail$data((0, Fn._)`!${u}.test(${t})`);
  }
};
Ia.default = wp;
var ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
const Lr = te, Sp = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Lr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Lr._)`{limit: ${e}}`
}, bp = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Sp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Lr.operators.GT : Lr.operators.LT;
    e.fail$data((0, Lr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
ja.default = bp;
var Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const Rr = x, Fr = te, Pp = M, Np = {
  message: ({ params: { missingProperty: e } }) => (0, Fr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Fr._)`{missingProperty: ${e}}`
}, Op = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Np,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: w } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !w.has(g)) {
          const $ = i.schemaEnv.baseId + i.errSchemaPath, h = `required property "${g}" is not defined at "${$}" (strictRequired)`;
          (0, Pp.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Fr.nil, p);
      else
        for (const _ of r)
          (0, Rr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const w = t.let("valid", !0);
        e.block$data(w, () => P(_, w)), e.ok(w);
      } else
        t.if((0, Rr.checkMissingProp)(e, r, _)), (0, Rr.reportMissingProp)(e, _), t.else();
    }
    function p() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Rr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, w) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(w, (0, Rr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Fr.not)(w), () => {
          e.error(), t.break();
        });
      }, Fr.nil);
    }
  }
};
Aa.default = Op;
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const Vr = te, Rp = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Vr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Vr._)`{limit: ${e}}`
}, Tp = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Rp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Vr.operators.GT : Vr.operators.LT;
    e.fail$data((0, Vr._)`${r}.length ${s} ${n}`);
  }
};
ka.default = Tp;
var Ca = {}, Xr = {};
Object.defineProperty(Xr, "__esModule", { value: !0 });
const Ol = Bn;
Ol.code = 'require("ajv/dist/runtime/equal").default';
Xr.default = Ol;
Object.defineProperty(Ca, "__esModule", { value: !0 });
const ms = $e, ve = te, Ip = M, jp = Xr, Ap = {
  message: ({ params: { i: e, j: t } }) => (0, ve.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, ve._)`{i: ${e}, j: ${t}}`
}, kp = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Ap,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, ms.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, ve._)`${i} === false`), e.ok(c);
    function l() {
      const w = t.let("i", (0, ve._)`${r}.length`), g = t.let("j");
      e.setParams({ i: w, j: g }), t.assign(c, !0), t.if((0, ve._)`${w} > 1`, () => (p() ? P : _)(w, g));
    }
    function p() {
      return d.length > 0 && !d.some((w) => w === "object" || w === "array");
    }
    function P(w, g) {
      const $ = t.name("item"), h = (0, ms.checkDataTypes)(d, $, u.opts.strictNumbers, ms.DataType.Wrong), E = t.const("indices", (0, ve._)`{}`);
      t.for((0, ve._)`;${w}--;`, () => {
        t.let($, (0, ve._)`${r}[${w}]`), t.if(h, (0, ve._)`continue`), d.length > 1 && t.if((0, ve._)`typeof ${$} == "string"`, (0, ve._)`${$} += "_"`), t.if((0, ve._)`typeof ${E}[${$}] == "number"`, () => {
          t.assign(g, (0, ve._)`${E}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, ve._)`${E}[${$}] = ${w}`);
      });
    }
    function _(w, g) {
      const $ = (0, Ip.useFunc)(t, jp.default), h = t.name("outer");
      t.label(h).for((0, ve._)`;${w}--;`, () => t.for((0, ve._)`${g} = ${w}; ${g}--;`, () => t.if((0, ve._)`${$}(${r}[${w}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
Ca.default = kp;
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const Ds = te, Cp = M, Dp = Xr, Mp = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Ds._)`{allowedValue: ${e}}`
}, Lp = {
  keyword: "const",
  $data: !0,
  error: Mp,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Ds._)`!${(0, Cp.useFunc)(t, Dp.default)}(${r}, ${s})`) : e.fail((0, Ds._)`${a} !== ${r}`);
  }
};
Da.default = Lp;
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const kr = te, Fp = M, Vp = Xr, Up = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, kr._)`{allowedValues: ${e}}`
}, zp = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Up,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, Fp.useFunc)(t, Vp.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, p);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, kr.or)(...s.map((w, g) => P(_, g)));
    }
    e.pass(l);
    function p() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, kr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, w) {
      const g = s[w];
      return typeof g == "object" && g !== null ? (0, kr._)`${d()}(${r}, ${_}[${w}])` : (0, kr._)`${r} === ${g}`;
    }
  }
};
Ma.default = zp;
Object.defineProperty(Pa, "__esModule", { value: !0 });
const qp = Na, Kp = Oa, Gp = Ra, Hp = Ia, Wp = ja, Jp = Aa, Bp = ka, Xp = Ca, Yp = Da, Qp = Ma, Zp = [
  // number
  qp.default,
  Kp.default,
  // string
  Gp.default,
  Hp.default,
  // object
  Wp.default,
  Jp.default,
  // array
  Bp.default,
  Xp.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Yp.default,
  Qp.default
];
Pa.default = Zp;
var La = {}, _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.validateAdditionalItems = void 0;
const Ht = te, Ms = M, xp = {
  message: ({ params: { len: e } }) => (0, Ht.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ht._)`{limit: ${e}}`
}, em = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: xp,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ms.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Rl(e, n);
  }
};
function Rl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Ht._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Ht._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ms.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Ht._)`${u} <= ${t.length}`);
    r.if((0, Ht.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Ms.Type.Num }, d), i.allErrors || r.if((0, Ht.not)(d), () => r.break());
    });
  }
}
_r.validateAdditionalItems = Rl;
_r.default = em;
var Fa = {}, gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.validateTuple = void 0;
const fi = te, Pn = M, tm = x, rm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Tl(e, "additionalItems", t);
    r.items = !0, !(0, Pn.alwaysValidSchema)(r, t) && e.ok((0, tm.validateArray)(e));
  }
};
function Tl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Pn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, fi._)`${a}.length`);
  r.forEach((p, P) => {
    (0, Pn.alwaysValidSchema)(u, p) || (n.if((0, fi._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(p) {
    const { opts: P, errSchemaPath: _ } = u, w = r.length, g = w === p.minItems && (w === p.maxItems || p[t] === !1);
    if (P.strictTuples && !g) {
      const $ = `"${i}" is ${w}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Pn.checkStrictMode)(u, $, P.strictTuples);
    }
  }
}
gr.validateTuple = Tl;
gr.default = rm;
Object.defineProperty(Fa, "__esModule", { value: !0 });
const nm = gr, sm = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, nm.validateTuple)(e, "items")
};
Fa.default = sm;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const hi = te, am = M, om = x, im = _r, cm = {
  message: ({ params: { len: e } }) => (0, hi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, hi._)`{limit: ${e}}`
}, lm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: cm,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, am.alwaysValidSchema)(n, t) && (s ? (0, im.validateAdditionalItems)(e, s) : e.ok((0, om.validateArray)(e)));
  }
};
Va.default = lm;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const Ue = te, an = M, um = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ue.str)`must contain at least ${e} valid item(s)` : (0, Ue.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ue._)`{minContains: ${e}}` : (0, Ue._)`{minContains: ${e}, maxContains: ${t}}`
}, dm = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: um,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, Ue._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, an.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, an.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, an.alwaysValidSchema)(a, r)) {
      let g = (0, Ue._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, Ue._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const p = t.name("valid");
    u === void 0 && i === 1 ? _(p, () => t.if(p, () => t.break())) : i === 0 ? (t.let(p, !0), u !== void 0 && t.if((0, Ue._)`${s}.length > 0`, P)) : (t.let(p, !1), P()), e.result(p, () => e.reset());
    function P() {
      const g = t.name("_valid"), $ = t.let("count", 0);
      _(g, () => t.if(g, () => w($)));
    }
    function _(g, $) {
      t.forRange("i", 0, l, (h) => {
        e.subschema({
          keyword: "contains",
          dataProp: h,
          dataPropType: an.Type.Num,
          compositeRule: !0
        }, g), $();
      });
    }
    function w(g) {
      t.code((0, Ue._)`${g}++`), u === void 0 ? t.if((0, Ue._)`${g} >= ${i}`, () => t.assign(p, !0).break()) : (t.if((0, Ue._)`${g} > ${u}`, () => t.assign(p, !1).break()), i === 1 ? t.assign(p, !0) : t.if((0, Ue._)`${g} >= ${i}`, () => t.assign(p, !0)));
    }
  }
};
Ua.default = dm;
var Il = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = M, n = x;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const p = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${p} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: p } }) => (0, t._)`{property: ${c},
    missingProperty: ${p},
    depsCount: ${d},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, l] = a(c);
      i(c, d), u(c, l);
    }
  };
  function a({ schema: c }) {
    const d = {}, l = {};
    for (const p in c) {
      if (p === "__proto__")
        continue;
      const P = Array.isArray(c[p]) ? d : l;
      P[p] = c[p];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: p, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const w in d) {
      const g = d[w];
      if (g.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, p, w, P.opts.ownProperties);
      c.setParams({
        property: w,
        depsCount: g.length,
        deps: g.join(", ")
      }), P.allErrors ? l.if($, () => {
        for (const h of g)
          (0, n.checkReportMissingProp)(c, h);
      }) : (l.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: p, keyword: P, it: _ } = c, w = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, p, g, _.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: P, schemaProp: g }, w);
          c.mergeValidEvaluated($, w);
        },
        () => l.var(w, !0)
        // TODO var
      ), c.ok(w));
  }
  e.validateSchemaDeps = u, e.default = s;
})(Il);
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const jl = te, fm = M, hm = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, jl._)`{propertyName: ${e.propertyName}}`
}, pm = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: hm,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, fm.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, jl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
za.default = pm;
var Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
const on = x, He = te, mm = ot, cn = M, ym = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, He._)`{additionalProperty: ${e.additionalProperty}}`
}, $m = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: ym,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, cn.alwaysValidSchema)(i, r))
      return;
    const d = (0, on.allSchemaProperties)(n.properties), l = (0, on.allSchemaProperties)(n.patternProperties);
    p(), e.ok((0, He._)`${a} === ${mm.default.errors}`);
    function p() {
      t.forIn("key", s, ($) => {
        !d.length && !l.length ? w($) : t.if(P($), () => w($));
      });
    }
    function P($) {
      let h;
      if (d.length > 8) {
        const E = (0, cn.schemaRefOrVal)(i, n.properties, "properties");
        h = (0, on.isOwnProperty)(t, E, $);
      } else d.length ? h = (0, He.or)(...d.map((E) => (0, He._)`${$} === ${E}`)) : h = He.nil;
      return l.length && (h = (0, He.or)(h, ...l.map((E) => (0, He._)`${(0, on.usePattern)(e, E)}.test(${$})`))), (0, He.not)(h);
    }
    function _($) {
      t.code((0, He._)`delete ${s}[${$}]`);
    }
    function w($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _($);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: $ }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, cn.alwaysValidSchema)(i, r)) {
        const h = t.name("valid");
        c.removeAdditional === "failing" ? (g($, h, !1), t.if((0, He.not)(h), () => {
          e.reset(), _($);
        })) : (g($, h), u || t.if((0, He.not)(h), () => t.break()));
      }
    }
    function g($, h, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: cn.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, h);
    }
  }
};
Zn.default = $m;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const _m = Xe, pi = x, ys = M, mi = Zn, gm = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && mi.default.code(new _m.KeywordCxt(a, mi.default, "additionalProperties"));
    const i = (0, pi.allSchemaProperties)(r);
    for (const p of i)
      a.definedProperties.add(p);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = ys.mergeEvaluated.props(t, (0, ys.toHash)(i), a.props));
    const u = i.filter((p) => !(0, ys.alwaysValidSchema)(a, r[p]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const p of u)
      d(p) ? l(p) : (t.if((0, pi.propertyInData)(t, s, p, a.opts.ownProperties)), l(p), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(p), e.ok(c);
    function d(p) {
      return a.opts.useDefaults && !a.compositeRule && r[p].default !== void 0;
    }
    function l(p) {
      e.subschema({
        keyword: "properties",
        schemaProp: p,
        dataProp: p
      }, c);
    }
  }
};
qa.default = gm;
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const yi = x, ln = te, $i = M, _i = M, vm = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, yi.allSchemaProperties)(r), c = u.filter((g) => (0, $i.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof ln.Name) && (a.props = (0, _i.evaluatedPropsToName)(t, a.props));
    const { props: p } = a;
    P();
    function P() {
      for (const g of u)
        d && _(g), a.allErrors ? w(g) : (t.var(l, !0), w(g), t.if(l));
    }
    function _(g) {
      for (const $ in d)
        new RegExp(g).test($) && (0, $i.checkStrictMode)(a, `property ${$} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function w(g) {
      t.forIn("key", n, ($) => {
        t.if((0, ln._)`${(0, yi.usePattern)(e, g)}.test(${$})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: $,
            dataPropType: _i.Type.Str
          }, l), a.opts.unevaluated && p !== !0 ? t.assign((0, ln._)`${p}[${$}]`, !0) : !h && !a.allErrors && t.if((0, ln.not)(l), () => t.break());
        });
      });
    }
  }
};
Ka.default = vm;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const Em = M, wm = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Em.alwaysValidSchema)(n, r)) {
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
Ga.default = wm;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const Sm = x, bm = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Sm.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ha.default = bm;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const Nn = te, Pm = M, Nm = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Nn._)`{passingSchemas: ${e.passing}}`
}, Om = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Nm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, p) => {
        let P;
        (0, Pm.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: p,
          compositeRule: !0
        }, c), p > 0 && t.if((0, Nn._)`${c} && ${i}`).assign(i, !1).assign(u, (0, Nn._)`[${u}, ${p}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, p), P && e.mergeEvaluated(P, Nn.Name);
        });
      });
    }
  }
};
Wa.default = Om;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Rm = M, Tm = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Rm.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Ja.default = Tm;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const Vn = te, Al = M, Im = {
  message: ({ params: e }) => (0, Vn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Vn._)`{failingKeyword: ${e.ifClause}}`
}, jm = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Im,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Al.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = gi(n, "then"), a = gi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Vn.not)(u), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, u);
      e.mergeEvaluated(l);
    }
    function d(l, p) {
      return () => {
        const P = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(P, i), p ? t.assign(p, (0, Vn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function gi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Al.alwaysValidSchema)(e, r);
}
Ba.default = jm;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Am = M, km = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Am.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Xa.default = km;
Object.defineProperty(La, "__esModule", { value: !0 });
const Cm = _r, Dm = Fa, Mm = gr, Lm = Va, Fm = Ua, Vm = Il, Um = za, zm = Zn, qm = qa, Km = Ka, Gm = Ga, Hm = Ha, Wm = Wa, Jm = Ja, Bm = Ba, Xm = Xa;
function Ym(e = !1) {
  const t = [
    // any
    Gm.default,
    Hm.default,
    Wm.default,
    Jm.default,
    Bm.default,
    Xm.default,
    // object
    Um.default,
    zm.default,
    Vm.default,
    qm.default,
    Km.default
  ];
  return e ? t.push(Dm.default, Lm.default) : t.push(Cm.default, Mm.default), t.push(Fm.default), t;
}
La.default = Ym;
var Ya = {}, Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const me = te, Qm = {
  message: ({ schemaCode: e }) => (0, me.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, me._)`{format: ${e}}`
}, Zm = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Qm,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: p } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const w = r.scopeValue("formats", {
        ref: p.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, me._)`${w}[${i}]`), $ = r.let("fType"), h = r.let("format");
      r.if((0, me._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign($, (0, me._)`${g}.type || "string"`).assign(h, (0, me._)`${g}.validate`), () => r.assign($, (0, me._)`"string"`).assign(h, g)), e.fail$data((0, me.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? me.nil : (0, me._)`${i} && !${h}`;
      }
      function N() {
        const R = l.$async ? (0, me._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, me._)`${h}(${n})`, I = (0, me._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, me._)`${h} && ${h} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function _() {
      const w = p.formats[a];
      if (!w) {
        E();
        return;
      }
      if (w === !0)
        return;
      const [g, $, h] = N(w);
      g === t && e.pass(R());
      function E() {
        if (c.strictSchema === !1) {
          p.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, me.regexpCode)(I) : c.code.formats ? (0, me._)`${c.code.formats}${(0, me.getProperty)(a)}` : void 0, W = r.scopeValue("formats", { key: a, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, me._)`${W}.validate`] : ["string", I, W];
      }
      function R() {
        if (typeof w == "object" && !(w instanceof RegExp) && w.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, me._)`await ${h}(${n})`;
        }
        return typeof $ == "function" ? (0, me._)`${h}(${n})` : (0, me._)`${h}.test(${n})`;
      }
    }
  }
};
Qa.default = Zm;
Object.defineProperty(Ya, "__esModule", { value: !0 });
const xm = Qa, ey = [xm.default];
Ya.default = ey;
var pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.contentVocabulary = pr.metadataVocabulary = void 0;
pr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
pr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(wa, "__esModule", { value: !0 });
const ty = Sa, ry = Pa, ny = La, sy = Ya, vi = pr, ay = [
  ty.default,
  ry.default,
  (0, ny.default)(),
  sy.default,
  vi.metadataVocabulary,
  vi.contentVocabulary
];
wa.default = ay;
var Za = {}, xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.DiscrError = void 0;
var Ei;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ei || (xn.DiscrError = Ei = {}));
Object.defineProperty(Za, "__esModule", { value: !0 });
const sr = te, Ls = xn, wi = De, oy = $r, iy = M, cy = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ls.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, sr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, ly = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: cy,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const u = n.propertyName;
    if (typeof u != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, sr._)`${r}${(0, sr.getProperty)(u)}`);
    t.if((0, sr._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Ls.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const w in _)
        t.elseIf((0, sr._)`${d} === ${w}`), t.assign(c, p(_[w]));
      t.else(), e.error(!1, { discrError: Ls.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function p(_) {
      const w = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, w);
      return e.mergeEvaluated(g, sr.Name), w;
    }
    function P() {
      var _;
      const w = {}, g = h(s);
      let $ = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, iy.schemaHasRulesButRef)(I, a.self.RULES)) {
          const W = I.$ref;
          if (I = wi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), I instanceof wi.SchemaEnv && (I = I.schema), I === void 0)
            throw new oy.default(a.opts.uriResolver, a.baseId, W);
        }
        const z = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        $ = $ && (g || h(I)), E(z, R);
      }
      if (!$)
        throw new Error(`discriminator: "${u}" must be required`);
      return w;
      function h({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function E(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const z of R.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in w)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        w[R] = I;
      }
    }
  }
};
Za.default = ly;
const uy = "http://json-schema.org/draft-07/schema#", dy = "http://json-schema.org/draft-07/schema#", fy = "Core schema meta-schema", hy = {
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
}, py = [
  "object",
  "boolean"
], my = {
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
}, yy = {
  $schema: uy,
  $id: dy,
  title: fy,
  definitions: hy,
  type: py,
  properties: my,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Dc, n = wa, s = Za, a = yy, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const w = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(w, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = Xe;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var l = te;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var p = Br;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return p.default;
  } });
  var P = $r;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Is, Is.exports);
var $y = Is.exports, Fs = { exports: {} }, kl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(V, H) {
    return { validate: V, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, d),
    "date-time": t(p, P),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: g,
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
    regex: ue,
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
    byte: h,
    // signed 32 bit integer
    int32: { type: "number", validate: R },
    // signed 64 bit integer
    int64: { type: "number", validate: I },
    // C-type float
    float: { type: "number", validate: z },
    // C-type double
    double: { type: "number", validate: z },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, P),
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
  function a(V) {
    const H = n.exec(V);
    if (!H)
      return !1;
    const ne = +H[1], Q = +H[2], de = +H[3];
    return Q >= 1 && Q <= 12 && de >= 1 && de <= (Q === 2 && r(ne) ? 29 : s[Q]);
  }
  function i(V, H) {
    if (V && H)
      return V > H ? 1 : V < H ? -1 : 0;
  }
  const u = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(V, H) {
    const ne = u.exec(V);
    if (!ne)
      return !1;
    const Q = +ne[1], de = +ne[2], C = +ne[3], k = ne[5];
    return (Q <= 23 && de <= 59 && C <= 59 || Q === 23 && de === 59 && C === 60) && (!H || k !== "");
  }
  function d(V, H) {
    if (!(V && H))
      return;
    const ne = u.exec(V), Q = u.exec(H);
    if (ne && Q)
      return V = ne[1] + ne[2] + ne[3] + (ne[4] || ""), H = Q[1] + Q[2] + Q[3] + (Q[4] || ""), V > H ? 1 : V < H ? -1 : 0;
  }
  const l = /t|\s/i;
  function p(V) {
    const H = V.split(l);
    return H.length === 2 && a(H[0]) && c(H[1], !0);
  }
  function P(V, H) {
    if (!(V && H))
      return;
    const [ne, Q] = V.split(l), [de, C] = H.split(l), k = i(ne, de);
    if (k !== void 0)
      return k || d(Q, C);
  }
  const _ = /\/|:/, w = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(V) {
    return _.test(V) && w.test(V);
  }
  const $ = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function h(V) {
    return $.lastIndex = 0, $.test(V);
  }
  const E = -2147483648, N = 2 ** 31 - 1;
  function R(V) {
    return Number.isInteger(V) && V <= N && V >= E;
  }
  function I(V) {
    return Number.isInteger(V);
  }
  function z() {
    return !0;
  }
  const W = /[^\\]\\Z/;
  function ue(V) {
    if (W.test(V))
      return !1;
    try {
      return new RegExp(V), !0;
    } catch {
      return !1;
    }
  }
})(kl);
var Cl = {}, Vs = { exports: {} }, Dl = {}, Ye = {}, mr = {}, Yr = {}, Z = {}, Wr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
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
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(h, ...E) {
    const N = [h[0]];
    let R = 0;
    for (; R < E.length; )
      u(N, E[R]), N.push(h[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(h, ...E) {
    const N = [_(h[0])];
    let R = 0;
    for (; R < E.length; )
      N.push(a), u(N, E[R]), N.push(a, _(h[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(h, E) {
    E instanceof n ? h.push(...E._items) : E instanceof r ? h.push(E) : h.push(p(E));
  }
  e.addCodeArg = u;
  function c(h) {
    let E = 1;
    for (; E < h.length - 1; ) {
      if (h[E] === a) {
        const N = d(h[E - 1], h[E + 1]);
        if (N !== void 0) {
          h.splice(E - 1, 3, N);
          continue;
        }
        h[E++] = "+";
      }
      E++;
    }
  }
  function d(h, E) {
    if (E === '""')
      return h;
    if (h === '""')
      return E;
    if (typeof h == "string")
      return E instanceof r || h[h.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${h.slice(0, -1)}${E}"` : E[0] === '"' ? h.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(h instanceof r))
      return `"${h}${E.slice(1)}`;
  }
  function l(h, E) {
    return E.emptyStr() ? h : h.emptyStr() ? E : i`${h}${E}`;
  }
  e.strConcat = l;
  function p(h) {
    return typeof h == "number" || typeof h == "boolean" || h === null ? h : _(Array.isArray(h) ? h.join(",") : h);
  }
  function P(h) {
    return new n(_(h));
  }
  e.stringify = P;
  function _(h) {
    return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function w(h) {
    return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : s`[${h}]`;
  }
  e.getProperty = w;
  function g(h) {
    if (typeof h == "string" && e.IDENTIFIER.test(h))
      return new n(`${h}`);
    throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function $(h) {
    return new n(h.toString());
  }
  e.regexpCode = $;
})(Wr);
var Us = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Wr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: l } = {}) {
      this._names = {}, this._prefixes = d, this._parent = l;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const l = this._names[d] || this._nameGroup(d);
      return `${d}${l.index++}`;
    }
    _nameGroup(d) {
      var l, p;
      if (!((p = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || p === void 0) && p.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: p }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${p}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class u extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, l) {
      var p;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, w = (p = l.key) !== null && p !== void 0 ? p : l.ref;
      let g = this._values[_];
      if (g) {
        const E = g.get(w);
        if (E)
          return E;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(w, P);
      const $ = this._scope[_] || (this._scope[_] = []), h = $.length;
      return $[h] = l.ref, P.setValue(l, { property: _, itemIndex: h }), P;
    }
    getValue(d, l) {
      const p = this._values[d];
      if (p)
        return p.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (p) => {
        if (p.scopePath === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return (0, t._)`${d}${p.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, p) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, l, p);
    }
    _reduceValues(d, l, p = {}, P) {
      let _ = t.nil;
      for (const w in d) {
        const g = d[w];
        if (!g)
          continue;
        const $ = p[w] = p[w] || /* @__PURE__ */ new Map();
        g.forEach((h) => {
          if ($.has(h))
            return;
          $.set(h, n.Started);
          let E = l(h);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${h} = ${E};${this.opts._n}`;
          } else if (E = P == null ? void 0 : P(h))
            _ = (0, t._)`${_}${E}${this.opts._n}`;
          else
            throw new r(h);
          $.set(h, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(Us);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Wr, r = Us;
  var n = Wr;
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
  var s = Us;
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
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(o, f) {
      return this;
    }
  }
  class i extends a {
    constructor(o, f, b) {
      super(), this.varKind = o, this.name = f, this.rhs = b;
    }
    render({ es5: o, _n: f }) {
      const b = o ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class u extends a {
    constructor(o, f, b) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(o, this.rhs);
    }
  }
  class c extends u {
    constructor(o, f, b, j) {
      super(o, b, j), this.op = f;
    }
    render({ _n: o }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + o;
    }
  }
  class d extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `${this.label}:` + o;
    }
  }
  class l extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class p extends a {
    constructor(o) {
      super(), this.error = o;
    }
    render({ _n: o }) {
      return `throw ${this.error};` + o;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends a {
    constructor(o) {
      super(), this.code = o;
    }
    render({ _n: o }) {
      return `${this.code};` + o;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(o, f) {
      return this.code = C(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, b) => f + b.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const b = o[f].optimizeNodes();
        Array.isArray(b) ? o.splice(f, 1, ...b) : b ? o[f] = b : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(o, f) || (k(o, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class w extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class $ extends w {
  }
  $.kind = "else";
  class h extends w {
    constructor(o, f) {
      super(f), this.condition = o;
    }
    render(o) {
      let f = `if(${this.condition})` + super.render(o);
      return this.else && (f += "else " + this.else.render(o)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const o = this.condition;
      if (o === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new $(b) : b;
      }
      if (f)
        return o === !1 ? f instanceof h ? f : f.nodes : this.nodes.length ? this : new h(U(o), f instanceof h ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = C(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return de(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  h.kind = "if";
  class E extends w {
  }
  E.kind = "for";
  class N extends E {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = C(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends E {
    constructor(o, f, b, j) {
      super(), this.varKind = o, this.name = f, this.from = b, this.to = j;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(o);
    }
    get names() {
      const o = de(super.names, this.from);
      return de(o, this.to);
    }
  }
  class I extends E {
    constructor(o, f, b, j) {
      super(), this.loop = o, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = C(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends w {
    constructor(o, f, b) {
      super(), this.name = o, this.args = f, this.async = b;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  z.kind = "func";
  class W extends _ {
    render(o) {
      return "return " + super.render(o);
    }
  }
  W.kind = "return";
  class ue extends w {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var b, j;
      return super.optimizeNames(o, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(o, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class V extends w {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends w {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(o, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(o) {
      return this._scope.name(o);
    }
    // reserves unique name in the external scope
    scopeName(o) {
      return this._extScope.name(o);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(o, f) {
      const b = this._extScope.value(o, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(o, f) {
      return this._extScope.getValue(o, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(o) {
      return this._extScope.scopeRefs(o, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(o, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new i(o, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, b) {
      return this._def(r.varKinds.const, o, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, b) {
      return this._def(r.varKinds.let, o, f, b);
    }
    // `var` declaration with optional assignment
    var(o, f, b) {
      return this._def(r.varKinds.var, o, f, b);
    }
    // assignment code
    assign(o, f, b) {
      return this._leafNode(new u(o, f, b));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new P(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [b, j] of o)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, b) {
      if (this._blockNode(new h(o)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new h(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(h, $);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(o);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(o);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new I("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(o);
      return this._for(new I("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new l(o));
    }
    // `return` statement
    return(o) {
      const f = new W();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(o, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new ue();
      if (this._blockNode(j), this.code(o), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new p(o));
    }
    // start self-balancing block
    block(o, f) {
      return this._blockStarts.push(this._nodes.length), o && this.code(o).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(o) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || o !== void 0 && b !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, b, j) {
      return this._blockNode(new z(o, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(o = 1) {
      for (; o-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(o) {
      return this._currNode.nodes.push(o), this;
    }
    _blockNode(o) {
      this._currNode.nodes.push(o), this._nodes.push(o);
    }
    _endBlockNode(o, f) {
      const b = this._currNode;
      if (b instanceof o || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof h))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = o, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const o = this._nodes;
      return o[o.length - 1];
    }
    set _currNode(o) {
      const f = this._nodes;
      f[f.length - 1] = o;
    }
  }
  e.CodeGen = ne;
  function Q(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) + (o[f] || 0);
    return y;
  }
  function de(y, o) {
    return o instanceof t._CodeOrName ? Q(y, o.names) : y;
  }
  function C(y, o, f) {
    if (y instanceof t.Name)
      return b(y);
    if (!j(y))
      return y;
    return new t._Code(y._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || o[A.str] !== 1 ? A : (delete o[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && o[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) - (o[f] || 0);
  }
  function U(y) {
    return typeof y == "boolean" || typeof y == "number" || y === null ? !y : (0, t._)`!${S(y)}`;
  }
  e.not = U;
  const D = m(e.operators.AND);
  function O(...y) {
    return y.reduce(D);
  }
  e.and = O;
  const T = m(e.operators.OR);
  function v(...y) {
    return y.reduce(T);
  }
  e.or = v;
  function m(y) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${y} ${S(f)}`;
  }
  function S(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const ce = Z, _y = Wr;
function gy(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = gy;
function vy(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Ml(e, t), !Ll(t, e.self.RULES.all));
}
L.alwaysValidSchema = vy;
function Ml(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Ul(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = Ml;
function Ll(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = Ll;
function Ey(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = Ey;
function wy({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
L.schemaRefOrVal = wy;
function Sy(e) {
  return Fl(decodeURIComponent(e));
}
L.unescapeFragment = Sy;
function by(e) {
  return encodeURIComponent(xa(e));
}
L.escapeFragment = by;
function xa(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = xa;
function Fl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = Fl;
function Py(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = Py;
function Si({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ce.Name ? (a instanceof ce.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ce.Name ? (t(s, i, a), a) : r(a, i);
    return u === ce.Name && !(c instanceof ce.Name) ? n(s, c) : c;
  };
}
L.mergeEvaluated = {
  props: Si({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ce._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ce._)`${r} || {}`).code((0, ce._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ce._)`${r} || {}`), eo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Vl
  }),
  items: Si({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Vl(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && eo(e, r, t), r;
}
L.evaluatedPropsToName = Vl;
function eo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
L.setEvaluated = eo;
const bi = {};
function Ny(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: bi[t.code] || (bi[t.code] = new _y._Code(t.code))
  });
}
L.useFunc = Ny;
var zs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(zs || (L.Type = zs = {}));
function Oy(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === zs.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + xa(e);
}
L.getErrorPath = Oy;
function Ul(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = Ul;
var it = {};
Object.defineProperty(it, "__esModule", { value: !0 });
const Ne = Z, Ry = {
  // validation function arguments
  data: new Ne.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Ne.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Ne.Name("instancePath"),
  parentData: new Ne.Name("parentData"),
  parentDataProperty: new Ne.Name("parentDataProperty"),
  rootData: new Ne.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Ne.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Ne.Name("vErrors"),
  // null or array of validation errors
  errors: new Ne.Name("errors"),
  // counter of validation errors
  this: new Ne.Name("this"),
  // "globals"
  self: new Ne.Name("self"),
  scope: new Ne.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Ne.Name("json"),
  jsonPos: new Ne.Name("jsonPos"),
  jsonLen: new Ne.Name("jsonLen"),
  jsonPart: new Ne.Name("jsonPart")
};
it.default = Ry;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = it;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: h }) => h ? (0, t.str)`"${$}" keyword must be ${h} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, h = e.keywordError, E, N) {
    const { it: R } = $, { gen: I, compositeRule: z, allErrors: W } = R, ue = p($, h, E);
    N ?? (z || W) ? c(I, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, h = e.keywordError, E) {
    const { it: N } = $, { gen: R, compositeRule: I, allErrors: z } = N, W = p($, h, E);
    c(R, W), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i($, h) {
    $.assign(n.default.errors, h), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(h, () => $.assign((0, t._)`${n.default.vErrors}.length`, h), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: $, keyword: h, schemaValue: E, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = $.name("err");
    $.forRange("i", R, n.default.errors, (W) => {
      $.const(z, (0, t._)`${n.default.vErrors}[${W}]`), $.if((0, t._)`${z}.instancePath === undefined`, () => $.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), $.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${h}`), I.opts.verbose && ($.assign((0, t._)`${z}.schema`, E), $.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c($, h) {
    const E = $.const("err", h);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function d($, h) {
    const { gen: E, validateName: N, schemaEnv: R } = $;
    R.$async ? E.throw((0, t._)`new ${$.ValidationError}(${h})`) : (E.assign((0, t._)`${N}.errors`, h), E.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function p($, h, E) {
    const { createErrors: N } = $.it;
    return N === !1 ? (0, t._)`{}` : P($, h, E);
  }
  function P($, h, E = {}) {
    const { gen: N, it: R } = $, I = [
      _(R, E),
      w($, E)
    ];
    return g($, h, I), N.object(...I);
  }
  function _({ errorPath: $ }, { instancePath: h }) {
    const E = h ? (0, t.str)`${$}${(0, r.getErrorPath)(h, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function w({ keyword: $, it: { errSchemaPath: h } }, { schemaPath: E, parentSchema: N }) {
    let R = N ? h : (0, t.str)`${h}/${$}`;
    return E && (R = (0, t.str)`${R}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g($, { params: h, message: E }, N) {
    const { keyword: R, data: I, schemaValue: z, it: W } = $, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = W;
    N.push([l.keyword, R], [l.params, typeof h == "function" ? h($) : h || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof E == "function" ? E($) : E]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([l.propertyName, V]);
  }
})(Yr);
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.boolOrEmptySchema = mr.topBoolOrEmptySchema = void 0;
const Ty = Yr, Iy = Z, jy = it, Ay = {
  message: "boolean schema is false"
};
function ky(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? zl(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(jy.default.data) : (t.assign((0, Iy._)`${n}.errors`, null), t.return(!0));
}
mr.topBoolOrEmptySchema = ky;
function Cy(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), zl(e)) : r.var(t, !0);
}
mr.boolOrEmptySchema = Cy;
function zl(e, t) {
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
  (0, Ty.reportError)(s, Ay, void 0, t);
}
var _e = {}, Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.getRules = Qt.isJSONType = void 0;
const Dy = ["string", "number", "integer", "boolean", "null", "object", "array"], My = new Set(Dy);
function Ly(e) {
  return typeof e == "string" && My.has(e);
}
Qt.isJSONType = Ly;
function Fy() {
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
Qt.getRules = Fy;
var ut = {};
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.shouldUseRule = ut.shouldUseGroup = ut.schemaHasRulesForType = void 0;
function Vy({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && ql(e, n);
}
ut.schemaHasRulesForType = Vy;
function ql(e, t) {
  return t.rules.some((r) => Kl(e, r));
}
ut.shouldUseGroup = ql;
function Kl(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
ut.shouldUseRule = Kl;
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.reportTypeError = _e.checkDataTypes = _e.checkDataType = _e.coerceAndCheckDataType = _e.getJSONTypes = _e.getSchemaTypes = _e.DataType = void 0;
const Uy = Qt, zy = ut, qy = Yr, Y = Z, Gl = L;
var lr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(lr || (_e.DataType = lr = {}));
function Ky(e) {
  const t = Hl(e.type);
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
_e.getSchemaTypes = Ky;
function Hl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Uy.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
_e.getJSONTypes = Hl;
function Gy(e, t) {
  const { gen: r, data: n, opts: s } = e, a = Hy(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, zy.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = to(t, n, s.strictNumbers, lr.Wrong);
    r.if(u, () => {
      a.length ? Wy(e, t, a) : ro(e);
    });
  }
  return i;
}
_e.coerceAndCheckDataType = Gy;
const Wl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Hy(e, t) {
  return t ? e.filter((r) => Wl.has(r) || t === "array" && r === "array") : [];
}
function Wy(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, Y._)`typeof ${s}`), u = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(i, (0, Y._)`typeof ${s}`).if(to(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, Y._)`${u} !== undefined`);
  for (const d of r)
    (Wl.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), ro(e), n.endIf(), n.if((0, Y._)`${u} !== undefined`, () => {
    n.assign(s, u), Jy(e, u);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, Y._)`${i} == "number" || ${i} == "boolean"`).assign(u, (0, Y._)`"" + ${s}`).elseIf((0, Y._)`${s} === null`).assign(u, (0, Y._)`""`);
        return;
      case "number":
        n.elseIf((0, Y._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(u, (0, Y._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Y._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(u, (0, Y._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Y._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(u, !1).elseIf((0, Y._)`${s} === "true" || ${s} === 1`).assign(u, !0);
        return;
      case "null":
        n.elseIf((0, Y._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(u, null);
        return;
      case "array":
        n.elseIf((0, Y._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(u, (0, Y._)`[${s}]`);
    }
  }
}
function Jy({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function qs(e, t, r, n = lr.Correct) {
  const s = n === lr.Correct ? Y.operators.EQ : Y.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, Y._)`${t} ${s} null`;
    case "array":
      a = (0, Y._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, Y._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, Y._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, Y._)`typeof ${t} ${s} ${e}`;
  }
  return n === lr.Correct ? a : (0, Y.not)(a);
  function i(u = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, u, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
_e.checkDataType = qs;
function to(e, t, r, n) {
  if (e.length === 1)
    return qs(e[0], t, r, n);
  let s;
  const a = (0, Gl.toHash)(e);
  if (a.array && a.object) {
    const i = (0, Y._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, Y._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Y.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, Y.and)(s, qs(i, t, r, n));
  return s;
}
_e.checkDataTypes = to;
const By = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function ro(e) {
  const t = Xy(e);
  (0, qy.reportError)(t, By);
}
_e.reportTypeError = ro;
function Xy(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Gl.schemaRefOrVal)(e, n, "type");
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
var es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
es.assignDefaults = void 0;
const rr = Z, Yy = L;
function Qy(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Pi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Pi(e, a, s.default));
}
es.assignDefaults = Qy;
function Pi(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, rr._)`${a}${(0, rr.getProperty)(t)}`;
  if (s) {
    (0, Yy.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, rr._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, rr._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, rr._)`${u} = ${(0, rr.stringify)(r)}`);
}
var at = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const he = Z, no = L, mt = it, Zy = L;
function xy(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(ao(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = xy;
function e$({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(ao(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
ee.checkMissingProp = e$;
function t$(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = t$;
function Jl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = Jl;
function so(e, t, r) {
  return (0, he._)`${Jl(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = so;
function r$(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${so(e, t, r)}` : s;
}
ee.propertyInData = r$;
function ao(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(so(e, t, r))) : s;
}
ee.noPropertyInData = ao;
function Bl(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = Bl;
function n$(e, t) {
  return Bl(t).filter((r) => !(0, no.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = n$;
function s$({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, p = [
    [mt.default.instancePath, (0, he.strConcat)(mt.default.instancePath, a)],
    [mt.default.parentData, i.parentData],
    [mt.default.parentDataProperty, i.parentDataProperty],
    [mt.default.rootData, mt.default.rootData]
  ];
  i.opts.dynamicRef && p.push([mt.default.dynamicAnchors, mt.default.dynamicAnchors]);
  const P = (0, he._)`${l}, ${r.object(...p)}`;
  return c !== he.nil ? (0, he._)`${u}.call(${c}, ${P})` : (0, he._)`${u}(${P})`;
}
ee.callValidateCode = s$;
const a$ = (0, he._)`new RegExp`;
function o$({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? a$ : (0, Zy.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = o$;
function i$(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const u = t.let("valid", !0);
    return i(() => t.assign(u, !1)), u;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(u) {
    const c = t.const("len", (0, he._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: no.Type.Num
      }, a), t.if((0, he.not)(a), u);
    });
  }
}
ee.validateArray = i$;
function c$(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, no.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), u = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, u);
    t.assign(i, (0, he._)`${i} || ${u}`), e.mergeValidEvaluated(l, u) || t.if((0, he.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
ee.validateUnion = c$;
Object.defineProperty(at, "__esModule", { value: !0 });
at.validateKeywordUsage = at.validSchemaType = at.funcKeywordCode = at.macroKeywordCode = void 0;
const Ie = Z, Wt = it, l$ = ee, u$ = Yr;
function d$(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = Xl(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: Ie.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
at.macroKeywordCode = d$;
function f$(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  p$(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = Xl(n, s, d), p = n.let("valid");
  e.block$data(p, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : p);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && Ni(e), $(() => e.error());
    else {
      const h = t.async ? _() : w();
      t.modifying && Ni(e), $(() => h$(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, Ie._)`await `), (E) => n.assign(p, !1).if((0, Ie._)`${E} instanceof ${c.ValidationError}`, () => n.assign(h, (0, Ie._)`${E}.errors`), () => n.throw(E))), h;
  }
  function w() {
    const h = (0, Ie._)`${l}.errors`;
    return n.assign(h, null), g(Ie.nil), h;
  }
  function g(h = t.async ? (0, Ie._)`await ` : Ie.nil) {
    const E = c.opts.passContext ? Wt.default.this : Wt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(p, (0, Ie._)`${h}${(0, l$.callValidateCode)(e, l, E, N)}`, t.modifying);
  }
  function $(h) {
    var E;
    n.if((0, Ie.not)((E = t.valid) !== null && E !== void 0 ? E : p), h);
  }
}
at.funcKeywordCode = f$;
function Ni(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ie._)`${n.parentData}[${n.parentDataProperty}]`));
}
function h$(e, t) {
  const { gen: r } = e;
  r.if((0, Ie._)`Array.isArray(${t})`, () => {
    r.assign(Wt.default.vErrors, (0, Ie._)`${Wt.default.vErrors} === null ? ${t} : ${Wt.default.vErrors}.concat(${t})`).assign(Wt.default.errors, (0, Ie._)`${Wt.default.vErrors}.length`), (0, u$.extendErrors)(e);
  }, () => e.error());
}
function p$({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Xl(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ie.stringify)(r) });
}
function m$(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
at.validSchemaType = m$;
function y$({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((u) => !Object.prototype.hasOwnProperty.call(e, u)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
at.validateKeywordUsage = y$;
var Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.extendSubschemaMode = Pt.extendSubschemaData = Pt.getSubschema = void 0;
const tt = Z, Yl = L;
function $$(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, tt._)`${e.schemaPath}${(0, tt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, tt._)`${e.schemaPath}${(0, tt.getProperty)(t)}${(0, tt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Yl.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Pt.getSubschema = $$;
function _$(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: p } = t, P = u.let("data", (0, tt._)`${t.data}${(0, tt.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, tt.str)`${d}${(0, Yl.getErrorPath)(r, n, p.jsPropertySyntax)}`, e.parentDataProperty = (0, tt._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof tt.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Pt.extendSubschemaData = _$;
function g$(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Pt.extendSubschemaMode = g$;
var be = {}, Ql = { exports: {} }, wt = Ql.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  On(t, n, s, e, "", e);
};
wt.keywords = {
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
wt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
wt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
wt.skipKeywords = {
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
function On(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var p = n[l];
      if (Array.isArray(p)) {
        if (l in wt.arrayKeywords)
          for (var P = 0; P < p.length; P++)
            On(e, t, r, p[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in wt.propsKeywords) {
        if (p && typeof p == "object")
          for (var _ in p)
            On(e, t, r, p[_], s + "/" + l + "/" + v$(_), a, s, l, n, _);
      } else (l in wt.keywords || e.allKeys && !(l in wt.skipKeywords)) && On(e, t, r, p, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function v$(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var E$ = Ql.exports;
Object.defineProperty(be, "__esModule", { value: !0 });
be.getSchemaRefs = be.resolveUrl = be.normalizeId = be._getFullPath = be.getFullPath = be.inlineRef = void 0;
const w$ = L, S$ = Bn, b$ = E$, P$ = /* @__PURE__ */ new Set([
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
function N$(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Ks(e) : t ? Zl(e) <= t : !1;
}
be.inlineRef = N$;
const O$ = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Ks(e) {
  for (const t in e) {
    if (O$.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Ks) || typeof r == "object" && Ks(r))
      return !0;
  }
  return !1;
}
function Zl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !P$.has(r) && (typeof e[r] == "object" && (0, w$.eachItem)(e[r], (n) => t += Zl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function xl(e, t = "", r) {
  r !== !1 && (t = ur(t));
  const n = e.parse(t);
  return eu(e, n);
}
be.getFullPath = xl;
function eu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
be._getFullPath = eu;
const R$ = /#\/?$/;
function ur(e) {
  return e ? e.replace(R$, "") : "";
}
be.normalizeId = ur;
function T$(e, t, r) {
  return r = ur(r), e.resolve(t, r);
}
be.resolveUrl = T$;
const I$ = /^[a-z_][-a-z0-9._]*$/i;
function j$(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = ur(e[r] || t), a = { "": s }, i = xl(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return b$(e, { allKeys: !0 }, (p, P, _, w) => {
    if (w === void 0)
      return;
    const g = i + P;
    let $ = a[w];
    typeof p[r] == "string" && ($ = h.call(this, p[r])), E.call(this, p.$anchor), E.call(this, p.$dynamicAnchor), a[P] = $;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = ur($ ? R($, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(p, I.schema, N) : N !== ur(g) && (N[0] === "#" ? (d(p, u[N], N), u[N] = p) : this.refs[N] = g), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!I$.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), u;
  function d(p, P, _) {
    if (P !== void 0 && !S$(p, P))
      throw l(_);
  }
  function l(p) {
    return new Error(`reference "${p}" resolves to more than one schema`);
  }
}
be.getSchemaRefs = j$;
Object.defineProperty(Ye, "__esModule", { value: !0 });
Ye.getData = Ye.KeywordCxt = Ye.validateFunctionCode = void 0;
const tu = mr, Oi = _e, oo = ut, Un = _e, A$ = es, Ur = at, $s = Pt, G = Z, B = it, k$ = be, dt = L, Tr = Yr;
function C$(e) {
  if (su(e) && (au(e), nu(e))) {
    L$(e);
    return;
  }
  ru(e, () => (0, tu.topBoolOrEmptySchema)(e));
}
Ye.validateFunctionCode = C$;
function ru({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${B.default.data}, ${B.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${Ri(r, s)}`), M$(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${B.default.data}, ${D$(s)}`, n.$async, () => e.code(Ri(r, s)).code(a));
}
function D$(e) {
  return (0, G._)`{${B.default.instancePath}="", ${B.default.parentData}, ${B.default.parentDataProperty}, ${B.default.rootData}=${B.default.data}${e.dynamicRef ? (0, G._)`, ${B.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function M$(e, t) {
  e.if(B.default.valCxt, () => {
    e.var(B.default.instancePath, (0, G._)`${B.default.valCxt}.${B.default.instancePath}`), e.var(B.default.parentData, (0, G._)`${B.default.valCxt}.${B.default.parentData}`), e.var(B.default.parentDataProperty, (0, G._)`${B.default.valCxt}.${B.default.parentDataProperty}`), e.var(B.default.rootData, (0, G._)`${B.default.valCxt}.${B.default.rootData}`), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, G._)`${B.default.valCxt}.${B.default.dynamicAnchors}`);
  }, () => {
    e.var(B.default.instancePath, (0, G._)`""`), e.var(B.default.parentData, (0, G._)`undefined`), e.var(B.default.parentDataProperty, (0, G._)`undefined`), e.var(B.default.rootData, B.default.data), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function L$(e) {
  const { schema: t, opts: r, gen: n } = e;
  ru(e, () => {
    r.$comment && t.$comment && iu(e), q$(e), n.let(B.default.vErrors, null), n.let(B.default.errors, 0), r.unevaluated && F$(e), ou(e), H$(e);
  });
}
function F$(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function Ri(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function V$(e, t) {
  if (su(e) && (au(e), nu(e))) {
    U$(e, t);
    return;
  }
  (0, tu.boolOrEmptySchema)(e, t);
}
function nu({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function su(e) {
  return typeof e.schema != "boolean";
}
function U$(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && iu(e), K$(e), G$(e);
  const a = n.const("_errs", B.default.errors);
  ou(e, a), n.var(t, (0, G._)`${a} === ${B.default.errors}`);
}
function au(e) {
  (0, dt.checkUnknownRules)(e), z$(e);
}
function ou(e, t) {
  if (e.opts.jtd)
    return Ti(e, [], !1, t);
  const r = (0, Oi.getSchemaTypes)(e.schema), n = (0, Oi.coerceAndCheckDataType)(e, r);
  Ti(e, r, !n, t);
}
function z$(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, dt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function q$(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, dt.checkStrictMode)(e, "default is ignored in the schema root");
}
function K$(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, k$.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function G$(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function iu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${B.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, G.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${B.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function H$(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${B.default.errors} === 0`, () => t.return(B.default.data), () => t.throw((0, G._)`new ${s}(${B.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, B.default.vErrors), a.unevaluated && W$(e), t.return((0, G._)`${B.default.errors} === 0`));
}
function W$({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Ti(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, dt.schemaHasRulesButRef)(a, l))) {
    s.block(() => uu(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || J$(e, t), s.block(() => {
    for (const P of l.rules)
      p(P);
    p(l.post);
  });
  function p(P) {
    (0, oo.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Un.checkDataType)(P.type, i, c.strictNumbers)), Ii(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Un.reportTypeError)(e)), s.endIf()) : Ii(e, P), u || s.if((0, G._)`${B.default.errors} === ${n || 0}`));
  }
}
function Ii(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, A$.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, oo.shouldUseRule)(n, a) && uu(e, a.keyword, a.definition, t.type);
  });
}
function J$(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (B$(e, t), e.opts.allowUnionTypes || X$(e, t), Y$(e, e.dataTypes));
}
function B$(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      cu(e.dataTypes, r) || io(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Z$(e, t);
  }
}
function X$(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && io(e, "use allowUnionTypes to allow union type keyword");
}
function Y$(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, oo.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => Q$(t, i)) && io(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function Q$(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function cu(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Z$(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    cu(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function io(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, dt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class lu {
  constructor(t, r, n) {
    if ((0, Ur.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, dt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", du(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Ur.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", B.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, G.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, G.not)(t), void 0, r);
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
    this.fail((0, G._)`${r} !== undefined && (${(0, G.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Tr.reportExtraError : Tr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Tr.reportError)(this, this.def.$dataError || Tr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Tr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = G.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = G.nil, r = G.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, G.or)((0, G._)`${s} === undefined`, r)), t !== G.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== G.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, G.or)(i(), u());
    function i() {
      if (n.length) {
        if (!(r instanceof G.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, G._)`${(0, Un.checkDataTypes)(c, r, a.opts.strictNumbers, Un.DataType.Wrong)}`;
      }
      return G.nil;
    }
    function u() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, G._)`!${c}(${r})`;
      }
      return G.nil;
    }
  }
  subschema(t, r) {
    const n = (0, $s.getSubschema)(this.it, t);
    (0, $s.extendSubschemaData)(n, this.it, t), (0, $s.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return V$(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = dt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = dt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
Ye.KeywordCxt = lu;
function uu(e, t, r, n) {
  const s = new lu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Ur.funcKeywordCode)(s, r) : "macro" in r ? (0, Ur.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Ur.funcKeywordCode)(s, r);
}
const x$ = /^\/(?:[^~]|~0|~1)*$/, e_ = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function du(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return B.default.rootData;
  if (e[0] === "/") {
    if (!x$.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = B.default.rootData;
  } else {
    const d = e_.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +d[1];
    if (s = d[2], s === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !s)
      return a;
  }
  let i = a;
  const u = s.split("/");
  for (const d of u)
    d && (a = (0, G._)`${a}${(0, G.getProperty)((0, dt.unescapeJsonPointer)(d))}`, i = (0, G._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
Ye.getData = du;
var Qr = {};
Object.defineProperty(Qr, "__esModule", { value: !0 });
class t_ extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Qr.default = t_;
var vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
const _s = be;
class r_ extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, _s.resolveUrl)(t, r, n), this.missingSchema = (0, _s.normalizeId)((0, _s.getFullPath)(t, this.missingRef));
  }
}
vr.default = r_;
var Me = {};
Object.defineProperty(Me, "__esModule", { value: !0 });
Me.resolveSchema = Me.getCompilingSchema = Me.resolveRef = Me.compileSchema = Me.SchemaEnv = void 0;
const Ge = Z, n_ = Qr, qt = it, Be = be, ji = L, s_ = Ye;
class ts {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Be.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Me.SchemaEnv = ts;
function co(e) {
  const t = fu.call(this, e);
  if (t)
    return t;
  const r = (0, Be.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Ge.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: n_.default,
    code: (0, Ge._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: qt.default.data,
    parentData: qt.default.parentData,
    parentDataProperty: qt.default.parentDataProperty,
    dataNames: [qt.default.data],
    dataPathArr: [Ge.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ge.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Ge.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ge._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, s_.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const p = i.toString();
    l = `${i.scopeRefs(qt.default.scope)}return ${p}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${qt.default.self}`, `${qt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: p, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: w, items: g } = d;
      _.evaluated = {
        props: w instanceof Ge.Name ? void 0 : w,
        items: g instanceof Ge.Name ? void 0 : g,
        dynamicProps: w instanceof Ge.Name,
        dynamicItems: g instanceof Ge.Name
      }, _.source && (_.source.evaluated = (0, Ge.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (p) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), p;
  } finally {
    this._compilations.delete(e);
  }
}
Me.compileSchema = co;
function a_(e, t, r) {
  var n;
  r = (0, Be.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = c_.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new ts({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = o_.call(this, a);
}
Me.resolveRef = a_;
function o_(e) {
  return (0, Be.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : co.call(this, e);
}
function fu(e) {
  for (const t of this._compilations)
    if (i_(t, e))
      return t;
}
Me.getCompilingSchema = fu;
function i_(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function c_(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || rs.call(this, e, t);
}
function rs(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Be._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Be.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return gs.call(this, r, e);
  const a = (0, Be.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = rs.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : gs.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || co.call(this, i), a === (0, Be.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Be.resolveUrl)(this.opts.uriResolver, s, d)), new ts({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return gs.call(this, r, i);
  }
}
Me.resolveSchema = rs;
const l_ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function gs(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, ji.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !l_.has(u) && d && (t = (0, Be.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, ji.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Be.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = rs.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new ts({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const u_ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", d_ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", f_ = "object", h_ = [
  "$data"
], p_ = {
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
}, m_ = !1, y_ = {
  $id: u_,
  description: d_,
  type: f_,
  required: h_,
  properties: p_,
  additionalProperties: m_
};
var lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
const hu = Sl;
hu.code = 'require("ajv/dist/runtime/uri").default';
lo.default = hu;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Ye;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = Z;
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
  const n = Qr, s = vr, a = Qt, i = Me, u = Z, c = be, d = _e, l = L, p = y_, P = lo, _ = (v, m) => new RegExp(v, m);
  _.code = "new RegExp";
  const w = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  ]), $ = {
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
  }, h = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function N(v) {
    var m, S, y, o, f, b, j, A, q, F, re, Le, Nt, Ot, Rt, Tt, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft;
    const qe = v.strict, Vt = (m = v.code) === null || m === void 0 ? void 0 : m.optimize, br = Vt === !0 || Vt === void 0 ? 1 : Vt || 0, Pr = (y = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && y !== void 0 ? y : _, ds = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : qe) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : qe) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : qe) !== null && F !== void 0 ? F : "log",
      strictTuples: (Le = (re = v.strictTuples) !== null && re !== void 0 ? re : qe) !== null && Le !== void 0 ? Le : "log",
      strictRequired: (Ot = (Nt = v.strictRequired) !== null && Nt !== void 0 ? Nt : qe) !== null && Ot !== void 0 ? Ot : !1,
      code: v.code ? { ...v.code, optimize: br, regExp: Pr } : { optimize: br, regExp: Pr },
      loopRequired: (Rt = v.loopRequired) !== null && Rt !== void 0 ? Rt : E,
      loopEnum: (Tt = v.loopEnum) !== null && Tt !== void 0 ? Tt : E,
      meta: (It = v.meta) !== null && It !== void 0 ? It : !0,
      messages: (jt = v.messages) !== null && jt !== void 0 ? jt : !0,
      inlineRefs: (At = v.inlineRefs) !== null && At !== void 0 ? At : !0,
      schemaId: (kt = v.schemaId) !== null && kt !== void 0 ? kt : "$id",
      addUsedSchema: (Ct = v.addUsedSchema) !== null && Ct !== void 0 ? Ct : !0,
      validateSchema: (Dt = v.validateSchema) !== null && Dt !== void 0 ? Dt : !0,
      validateFormats: (Mt = v.validateFormats) !== null && Mt !== void 0 ? Mt : !0,
      unicodeRegExp: (Lt = v.unicodeRegExp) !== null && Lt !== void 0 ? Lt : !0,
      int32range: (Ft = v.int32range) !== null && Ft !== void 0 ? Ft : !0,
      uriResolver: ds
    };
  }
  class R {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...N(m) };
      const { es5: S, lines: y } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: y }), this.logger = Q(m.logger);
      const o = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, m, "NOT SUPPORTED"), I.call(this, h, m, "DEPRECATED", "warn"), this._metaOpts = H.call(this), m.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && V.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), W.call(this), m.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: S, schemaId: y } = this.opts;
      let o = p;
      y === "id" && (o = { ...p }, o.id = o.$id, delete o.$id), S && m && this.addMetaSchema(o, o[y], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[S] || m : void 0;
    }
    validate(m, S) {
      let y;
      if (typeof m == "string") {
        if (y = this.getSchema(m), !y)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        y = this.compile(m);
      const o = y(S);
      return "$async" in y || (this.errors = y.errors), o;
    }
    compile(m, S) {
      const y = this._addSchema(m, S);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(m, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return o.call(this, m, S);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const Le = this._addSchema(F, re);
        return Le.validate || b.call(this, Le);
      }
      async function f(F) {
        F && !this.getSchema(F) && await o.call(this, { $ref: F }, !0);
      }
      async function b(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), b.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, S);
      }
      async function q(F) {
        const re = this._loading[F];
        if (re)
          return re;
        try {
          return await (this._loading[F] = y(F));
        } finally {
          delete this._loading[F];
        }
      }
    }
    // Adds schema to the instance
    addSchema(m, S, y, o = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const b of m)
          this.addSchema(b, void 0, y, o);
        return this;
      }
      let f;
      if (typeof m == "object") {
        const { schemaId: b } = this.opts;
        if (f = m[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(m, y, S, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, S, y = this.opts.validateSchema) {
      return this.addSchema(m, S, !0, y), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, S) {
      if (typeof m == "boolean")
        return !0;
      let y;
      if (y = m.$schema, y !== void 0 && typeof y != "string")
        throw new Error("$schema must be a string");
      if (y = y || this.opts.defaultMeta || this.defaultMeta(), !y)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate(y, m);
      if (!o && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return o;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(m) {
      let S;
      for (; typeof (S = z.call(this, m)) == "string"; )
        m = S;
      if (S === void 0) {
        const { schemaId: y } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: y });
        if (S = i.resolveSchema.call(this, o, m), !S)
          return;
        this.refs[m] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
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
          const S = z.call(this, m);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[m], delete this.refs[m], this;
        }
        case "object": {
          const S = m;
          this._cache.delete(S);
          let y = m[this.opts.schemaId];
          return y && (y = (0, c.normalizeId)(y), delete this.schemas[y], delete this.refs[y]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(m) {
      for (const S of m)
        this.addKeyword(S);
      return this;
    }
    addKeyword(m, S) {
      let y;
      if (typeof m == "string")
        y = m, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = y);
      else if (typeof m == "object" && S === void 0) {
        if (S = m, y = S.keyword, Array.isArray(y) && !y.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, y, S), !S)
        return (0, l.eachItem)(y, (f) => k.call(this, f)), this;
      D.call(this, S);
      const o = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)(y, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((b) => k.call(this, f, o, b))), this;
    }
    getKeyword(m) {
      const S = this.RULES.all[m];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: S } = this;
      delete S.keywords[m], delete S.all[m];
      for (const y of S.rules) {
        const o = y.rules.findIndex((f) => f.keyword === m);
        o >= 0 && y.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[m] = S, this;
    }
    errorsText(m = this.errors, { separator: S = ", ", dataVar: y = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((o) => `${y}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(m, S) {
      const y = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let b = m;
        for (const j of f)
          b = b[j];
        for (const j in y) {
          const A = y[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = T(F));
        }
      }
      return m;
    }
    _removeAllSchemas(m, S) {
      for (const y in m) {
        const o = m[y];
        (!S || S.test(y)) && (typeof o == "string" ? delete m[y] : o && !o.meta && (this._cache.delete(o.schema), delete m[y]));
      }
    }
    _addSchema(m, S, y, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: j } = this.opts;
      if (typeof m == "object")
        b = m[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof m != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(m);
      if (A !== void 0)
        return A;
      y = (0, c.normalizeId)(b || y);
      const q = c.getSchemaRefs.call(this, m, y);
      return A = new i.SchemaEnv({ schema: m, schemaId: j, meta: S, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), o && this.validateSchema(m, !0), A;
    }
    _checkUnique(m) {
      if (this.schemas[m] || this.refs[m])
        throw new Error(`schema with key or id "${m}" already exists`);
    }
    _compileSchemaEnv(m) {
      if (m.meta ? this._compileMetaSchema(m) : i.compileSchema.call(this, m), !m.validate)
        throw new Error("ajv implementation error");
      return m.validate;
    }
    _compileMetaSchema(m) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, m);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(v, m, S, y = "error") {
    for (const o in v) {
      const f = o;
      f in m && this.logger[y](`${S}: option ${o}. ${v[f]}`);
    }
  }
  function z(v) {
    return v = (0, c.normalizeId)(v), this.schemas[v] || this.refs[v];
  }
  function W() {
    const v = this.opts.schemas;
    if (v)
      if (Array.isArray(v))
        this.addSchema(v);
      else
        for (const m in v)
          this.addSchema(v[m], m);
  }
  function ue() {
    for (const v in this.opts.formats) {
      const m = this.opts.formats[v];
      m && this.addFormat(v, m);
    }
  }
  function V(v) {
    if (Array.isArray(v)) {
      this.addVocabulary(v);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in v) {
      const S = v[m];
      S.keyword || (S.keyword = m), this.addKeyword(S);
    }
  }
  function H() {
    const v = { ...this.opts };
    for (const m of w)
      delete v[m];
    return v;
  }
  const ne = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(v) {
    if (v === !1)
      return ne;
    if (v === void 0)
      return console;
    if (v.log && v.warn && v.error)
      return v;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(v, m) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(v, (y) => {
      if (S.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, m, S) {
    var y;
    const o = m == null ? void 0 : m.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = o ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[v] = !0, !m)
      return;
    const j = {
      keyword: v,
      definition: {
        ...m,
        type: (0, d.getJSONTypes)(m.type),
        schemaType: (0, d.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? U.call(this, b, j, m.before) : b.rules.push(j), f.all[v] = j, (y = m.implements) === null || y === void 0 || y.forEach((A) => this.addKeyword(A));
  }
  function U(v, m, S) {
    const y = v.rules.findIndex((o) => o.keyword === S);
    y >= 0 ? v.rules.splice(y, 0, m) : (v.rules.push(m), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: m } = v;
    m !== void 0 && (v.$data && this.opts.$data && (m = T(m)), v.validateSchema = this.compile(m, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(Dl);
var uo = {}, fo = {}, ho = {};
Object.defineProperty(ho, "__esModule", { value: !0 });
const $_ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ho.default = $_;
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.callRef = Zt.getValidate = void 0;
const __ = vr, Ai = ee, Ce = Z, nr = it, ki = Me, un = L, g_ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return p();
    const l = ki.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new __.default(n.opts.uriResolver, s, r);
    if (l instanceof ki.SchemaEnv)
      return P(l);
    return _(l);
    function p() {
      if (a === d)
        return Rn(e, i, a, a.$async);
      const w = t.scopeValue("root", { ref: d });
      return Rn(e, (0, Ce._)`${w}.validate`, d, d.$async);
    }
    function P(w) {
      const g = pu(e, w);
      Rn(e, g, w, w.$async);
    }
    function _(w) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: w, code: (0, Ce.stringify)(w) } : { ref: w }), $ = t.name("valid"), h = e.subschema({
        schema: w,
        dataTypes: [],
        schemaPath: Ce.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, $);
      e.mergeEvaluated(h), e.ok($);
    }
  }
};
function pu(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ce._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Zt.getValidate = pu;
function Rn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? nr.default.this : Ce.nil;
  n ? l() : p();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const w = s.let("valid");
    s.try(() => {
      s.code((0, Ce._)`await ${(0, Ai.callValidateCode)(e, t, d)}`), _(t), i || s.assign(w, !0);
    }, (g) => {
      s.if((0, Ce._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(w, !1);
    }), e.ok(w);
  }
  function p() {
    e.result((0, Ai.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(w) {
    const g = (0, Ce._)`${w}.errors`;
    s.assign(nr.default.vErrors, (0, Ce._)`${nr.default.vErrors} === null ? ${g} : ${nr.default.vErrors}.concat(${g})`), s.assign(nr.default.errors, (0, Ce._)`${nr.default.vErrors}.length`);
  }
  function _(w) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const $ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = un.mergeEvaluated.props(s, $.props, a.props));
      else {
        const h = s.var("props", (0, Ce._)`${w}.evaluated.props`);
        a.props = un.mergeEvaluated.props(s, h, a.props, Ce.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = un.mergeEvaluated.items(s, $.items, a.items));
      else {
        const h = s.var("items", (0, Ce._)`${w}.evaluated.items`);
        a.items = un.mergeEvaluated.items(s, h, a.items, Ce.Name);
      }
  }
}
Zt.callRef = Rn;
Zt.default = g_;
Object.defineProperty(fo, "__esModule", { value: !0 });
const v_ = ho, E_ = Zt, w_ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  v_.default,
  E_.default
];
fo.default = w_;
var po = {}, mo = {};
Object.defineProperty(mo, "__esModule", { value: !0 });
const zn = Z, yt = zn.operators, qn = {
  maximum: { okStr: "<=", ok: yt.LTE, fail: yt.GT },
  minimum: { okStr: ">=", ok: yt.GTE, fail: yt.LT },
  exclusiveMaximum: { okStr: "<", ok: yt.LT, fail: yt.GTE },
  exclusiveMinimum: { okStr: ">", ok: yt.GT, fail: yt.LTE }
}, S_ = {
  message: ({ keyword: e, schemaCode: t }) => (0, zn.str)`must be ${qn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, zn._)`{comparison: ${qn[e].okStr}, limit: ${t}}`
}, b_ = {
  keyword: Object.keys(qn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: S_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, zn._)`${r} ${qn[t].fail} ${n} || isNaN(${r})`);
  }
};
mo.default = b_;
var yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
const zr = Z, P_ = {
  message: ({ schemaCode: e }) => (0, zr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, zr._)`{multipleOf: ${e}}`
}, N_ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: P_,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, zr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, zr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, zr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
yo.default = N_;
var $o = {}, _o = {};
Object.defineProperty(_o, "__esModule", { value: !0 });
function mu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
_o.default = mu;
mu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty($o, "__esModule", { value: !0 });
const Jt = Z, O_ = L, R_ = _o, T_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Jt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Jt._)`{limit: ${e}}`
}, I_ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: T_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Jt.operators.GT : Jt.operators.LT, i = s.opts.unicode === !1 ? (0, Jt._)`${r}.length` : (0, Jt._)`${(0, O_.useFunc)(e.gen, R_.default)}(${r})`;
    e.fail$data((0, Jt._)`${i} ${a} ${n}`);
  }
};
$o.default = I_;
var go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
const j_ = ee, Kn = Z, A_ = {
  message: ({ schemaCode: e }) => (0, Kn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Kn._)`{pattern: ${e}}`
}, k_ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: A_,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Kn._)`(new RegExp(${s}, ${i}))` : (0, j_.usePattern)(e, n);
    e.fail$data((0, Kn._)`!${u}.test(${t})`);
  }
};
go.default = k_;
var vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
const qr = Z, C_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, qr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, qr._)`{limit: ${e}}`
}, D_ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: C_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? qr.operators.GT : qr.operators.LT;
    e.fail$data((0, qr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
vo.default = D_;
var Eo = {};
Object.defineProperty(Eo, "__esModule", { value: !0 });
const Ir = ee, Kr = Z, M_ = L, L_ = {
  message: ({ params: { missingProperty: e } }) => (0, Kr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Kr._)`{missingProperty: ${e}}`
}, F_ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: L_,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: w } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !w.has(g)) {
          const $ = i.schemaEnv.baseId + i.errSchemaPath, h = `required property "${g}" is not defined at "${$}" (strictRequired)`;
          (0, M_.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Kr.nil, p);
      else
        for (const _ of r)
          (0, Ir.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const w = t.let("valid", !0);
        e.block$data(w, () => P(_, w)), e.ok(w);
      } else
        t.if((0, Ir.checkMissingProp)(e, r, _)), (0, Ir.reportMissingProp)(e, _), t.else();
    }
    function p() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Ir.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, w) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(w, (0, Ir.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Kr.not)(w), () => {
          e.error(), t.break();
        });
      }, Kr.nil);
    }
  }
};
Eo.default = F_;
var wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
const Gr = Z, V_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Gr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Gr._)`{limit: ${e}}`
}, U_ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: V_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Gr.operators.GT : Gr.operators.LT;
    e.fail$data((0, Gr._)`${r}.length ${s} ${n}`);
  }
};
wo.default = U_;
var So = {}, Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
const yu = Bn;
yu.code = 'require("ajv/dist/runtime/equal").default';
Zr.default = yu;
Object.defineProperty(So, "__esModule", { value: !0 });
const vs = _e, Ee = Z, z_ = L, q_ = Zr, K_ = {
  message: ({ params: { i: e, j: t } }) => (0, Ee.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ee._)`{i: ${e}, j: ${t}}`
}, G_ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: K_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, vs.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Ee._)`${i} === false`), e.ok(c);
    function l() {
      const w = t.let("i", (0, Ee._)`${r}.length`), g = t.let("j");
      e.setParams({ i: w, j: g }), t.assign(c, !0), t.if((0, Ee._)`${w} > 1`, () => (p() ? P : _)(w, g));
    }
    function p() {
      return d.length > 0 && !d.some((w) => w === "object" || w === "array");
    }
    function P(w, g) {
      const $ = t.name("item"), h = (0, vs.checkDataTypes)(d, $, u.opts.strictNumbers, vs.DataType.Wrong), E = t.const("indices", (0, Ee._)`{}`);
      t.for((0, Ee._)`;${w}--;`, () => {
        t.let($, (0, Ee._)`${r}[${w}]`), t.if(h, (0, Ee._)`continue`), d.length > 1 && t.if((0, Ee._)`typeof ${$} == "string"`, (0, Ee._)`${$} += "_"`), t.if((0, Ee._)`typeof ${E}[${$}] == "number"`, () => {
          t.assign(g, (0, Ee._)`${E}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ee._)`${E}[${$}] = ${w}`);
      });
    }
    function _(w, g) {
      const $ = (0, z_.useFunc)(t, q_.default), h = t.name("outer");
      t.label(h).for((0, Ee._)`;${w}--;`, () => t.for((0, Ee._)`${g} = ${w}; ${g}--;`, () => t.if((0, Ee._)`${$}(${r}[${w}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
So.default = G_;
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const Gs = Z, H_ = L, W_ = Zr, J_ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Gs._)`{allowedValue: ${e}}`
}, B_ = {
  keyword: "const",
  $data: !0,
  error: J_,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Gs._)`!${(0, H_.useFunc)(t, W_.default)}(${r}, ${s})`) : e.fail((0, Gs._)`${a} !== ${r}`);
  }
};
bo.default = B_;
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
const Cr = Z, X_ = L, Y_ = Zr, Q_ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Cr._)`{allowedValues: ${e}}`
}, Z_ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Q_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, X_.useFunc)(t, Y_.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, p);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Cr.or)(...s.map((w, g) => P(_, g)));
    }
    e.pass(l);
    function p() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Cr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, w) {
      const g = s[w];
      return typeof g == "object" && g !== null ? (0, Cr._)`${d()}(${r}, ${_}[${w}])` : (0, Cr._)`${r} === ${g}`;
    }
  }
};
Po.default = Z_;
Object.defineProperty(po, "__esModule", { value: !0 });
const x_ = mo, eg = yo, tg = $o, rg = go, ng = vo, sg = Eo, ag = wo, og = So, ig = bo, cg = Po, lg = [
  // number
  x_.default,
  eg.default,
  // string
  tg.default,
  rg.default,
  // object
  ng.default,
  sg.default,
  // array
  ag.default,
  og.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  ig.default,
  cg.default
];
po.default = lg;
var No = {}, Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.validateAdditionalItems = void 0;
const Bt = Z, Hs = L, ug = {
  message: ({ params: { len: e } }) => (0, Bt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Bt._)`{limit: ${e}}`
}, dg = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: ug,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Hs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    $u(e, n);
  }
};
function $u(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Bt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Bt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Hs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Bt._)`${u} <= ${t.length}`);
    r.if((0, Bt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Hs.Type.Num }, d), i.allErrors || r.if((0, Bt.not)(d), () => r.break());
    });
  }
}
Er.validateAdditionalItems = $u;
Er.default = dg;
var Oo = {}, wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.validateTuple = void 0;
const Ci = Z, Tn = L, fg = ee, hg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return _u(e, "additionalItems", t);
    r.items = !0, !(0, Tn.alwaysValidSchema)(r, t) && e.ok((0, fg.validateArray)(e));
  }
};
function _u(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Tn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Ci._)`${a}.length`);
  r.forEach((p, P) => {
    (0, Tn.alwaysValidSchema)(u, p) || (n.if((0, Ci._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(p) {
    const { opts: P, errSchemaPath: _ } = u, w = r.length, g = w === p.minItems && (w === p.maxItems || p[t] === !1);
    if (P.strictTuples && !g) {
      const $ = `"${i}" is ${w}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Tn.checkStrictMode)(u, $, P.strictTuples);
    }
  }
}
wr.validateTuple = _u;
wr.default = hg;
Object.defineProperty(Oo, "__esModule", { value: !0 });
const pg = wr, mg = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, pg.validateTuple)(e, "items")
};
Oo.default = mg;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const Di = Z, yg = L, $g = ee, _g = Er, gg = {
  message: ({ params: { len: e } }) => (0, Di.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Di._)`{limit: ${e}}`
}, vg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: gg,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, yg.alwaysValidSchema)(n, t) && (s ? (0, _g.validateAdditionalItems)(e, s) : e.ok((0, $g.validateArray)(e)));
  }
};
Ro.default = vg;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const ze = Z, dn = L, Eg = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, ze.str)`must contain at least ${e} valid item(s)` : (0, ze.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, ze._)`{minContains: ${e}}` : (0, ze._)`{minContains: ${e}, maxContains: ${t}}`
}, wg = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Eg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, ze._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, dn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, dn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, dn.alwaysValidSchema)(a, r)) {
      let g = (0, ze._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, ze._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const p = t.name("valid");
    u === void 0 && i === 1 ? _(p, () => t.if(p, () => t.break())) : i === 0 ? (t.let(p, !0), u !== void 0 && t.if((0, ze._)`${s}.length > 0`, P)) : (t.let(p, !1), P()), e.result(p, () => e.reset());
    function P() {
      const g = t.name("_valid"), $ = t.let("count", 0);
      _(g, () => t.if(g, () => w($)));
    }
    function _(g, $) {
      t.forRange("i", 0, l, (h) => {
        e.subschema({
          keyword: "contains",
          dataProp: h,
          dataPropType: dn.Type.Num,
          compositeRule: !0
        }, g), $();
      });
    }
    function w(g) {
      t.code((0, ze._)`${g}++`), u === void 0 ? t.if((0, ze._)`${g} >= ${i}`, () => t.assign(p, !0).break()) : (t.if((0, ze._)`${g} > ${u}`, () => t.assign(p, !1).break()), i === 1 ? t.assign(p, !0) : t.if((0, ze._)`${g} >= ${i}`, () => t.assign(p, !0)));
    }
  }
};
To.default = wg;
var gu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Z, r = L, n = ee;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const p = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${p} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: p } }) => (0, t._)`{property: ${c},
    missingProperty: ${p},
    depsCount: ${d},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, l] = a(c);
      i(c, d), u(c, l);
    }
  };
  function a({ schema: c }) {
    const d = {}, l = {};
    for (const p in c) {
      if (p === "__proto__")
        continue;
      const P = Array.isArray(c[p]) ? d : l;
      P[p] = c[p];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: p, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const w in d) {
      const g = d[w];
      if (g.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, p, w, P.opts.ownProperties);
      c.setParams({
        property: w,
        depsCount: g.length,
        deps: g.join(", ")
      }), P.allErrors ? l.if($, () => {
        for (const h of g)
          (0, n.checkReportMissingProp)(c, h);
      }) : (l.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: p, keyword: P, it: _ } = c, w = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, p, g, _.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: P, schemaProp: g }, w);
          c.mergeValidEvaluated($, w);
        },
        () => l.var(w, !0)
        // TODO var
      ), c.ok(w));
  }
  e.validateSchemaDeps = u, e.default = s;
})(gu);
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const vu = Z, Sg = L, bg = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, vu._)`{propertyName: ${e.propertyName}}`
}, Pg = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: bg,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Sg.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, vu.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Io.default = Pg;
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
const fn = ee, We = Z, Ng = it, hn = L, Og = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, We._)`{additionalProperty: ${e.additionalProperty}}`
}, Rg = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Og,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, hn.alwaysValidSchema)(i, r))
      return;
    const d = (0, fn.allSchemaProperties)(n.properties), l = (0, fn.allSchemaProperties)(n.patternProperties);
    p(), e.ok((0, We._)`${a} === ${Ng.default.errors}`);
    function p() {
      t.forIn("key", s, ($) => {
        !d.length && !l.length ? w($) : t.if(P($), () => w($));
      });
    }
    function P($) {
      let h;
      if (d.length > 8) {
        const E = (0, hn.schemaRefOrVal)(i, n.properties, "properties");
        h = (0, fn.isOwnProperty)(t, E, $);
      } else d.length ? h = (0, We.or)(...d.map((E) => (0, We._)`${$} === ${E}`)) : h = We.nil;
      return l.length && (h = (0, We.or)(h, ...l.map((E) => (0, We._)`${(0, fn.usePattern)(e, E)}.test(${$})`))), (0, We.not)(h);
    }
    function _($) {
      t.code((0, We._)`delete ${s}[${$}]`);
    }
    function w($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _($);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: $ }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, hn.alwaysValidSchema)(i, r)) {
        const h = t.name("valid");
        c.removeAdditional === "failing" ? (g($, h, !1), t.if((0, We.not)(h), () => {
          e.reset(), _($);
        })) : (g($, h), u || t.if((0, We.not)(h), () => t.break()));
      }
    }
    function g($, h, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: hn.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, h);
    }
  }
};
ns.default = Rg;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const Tg = Ye, Mi = ee, Es = L, Li = ns, Ig = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Li.default.code(new Tg.KeywordCxt(a, Li.default, "additionalProperties"));
    const i = (0, Mi.allSchemaProperties)(r);
    for (const p of i)
      a.definedProperties.add(p);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = Es.mergeEvaluated.props(t, (0, Es.toHash)(i), a.props));
    const u = i.filter((p) => !(0, Es.alwaysValidSchema)(a, r[p]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const p of u)
      d(p) ? l(p) : (t.if((0, Mi.propertyInData)(t, s, p, a.opts.ownProperties)), l(p), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(p), e.ok(c);
    function d(p) {
      return a.opts.useDefaults && !a.compositeRule && r[p].default !== void 0;
    }
    function l(p) {
      e.subschema({
        keyword: "properties",
        schemaProp: p,
        dataProp: p
      }, c);
    }
  }
};
jo.default = Ig;
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
const Fi = ee, pn = Z, Vi = L, Ui = L, jg = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Fi.allSchemaProperties)(r), c = u.filter((g) => (0, Vi.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof pn.Name) && (a.props = (0, Ui.evaluatedPropsToName)(t, a.props));
    const { props: p } = a;
    P();
    function P() {
      for (const g of u)
        d && _(g), a.allErrors ? w(g) : (t.var(l, !0), w(g), t.if(l));
    }
    function _(g) {
      for (const $ in d)
        new RegExp(g).test($) && (0, Vi.checkStrictMode)(a, `property ${$} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function w(g) {
      t.forIn("key", n, ($) => {
        t.if((0, pn._)`${(0, Fi.usePattern)(e, g)}.test(${$})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: $,
            dataPropType: Ui.Type.Str
          }, l), a.opts.unevaluated && p !== !0 ? t.assign((0, pn._)`${p}[${$}]`, !0) : !h && !a.allErrors && t.if((0, pn.not)(l), () => t.break());
        });
      });
    }
  }
};
Ao.default = jg;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const Ag = L, kg = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Ag.alwaysValidSchema)(n, r)) {
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
ko.default = kg;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const Cg = ee, Dg = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Cg.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Co.default = Dg;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const In = Z, Mg = L, Lg = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, In._)`{passingSchemas: ${e.passing}}`
}, Fg = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Lg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, p) => {
        let P;
        (0, Mg.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: p,
          compositeRule: !0
        }, c), p > 0 && t.if((0, In._)`${c} && ${i}`).assign(i, !1).assign(u, (0, In._)`[${u}, ${p}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, p), P && e.mergeEvaluated(P, In.Name);
        });
      });
    }
  }
};
Do.default = Fg;
var Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const Vg = L, Ug = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Vg.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Mo.default = Ug;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const Gn = Z, Eu = L, zg = {
  message: ({ params: e }) => (0, Gn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Gn._)`{failingKeyword: ${e.ifClause}}`
}, qg = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: zg,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Eu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = zi(n, "then"), a = zi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Gn.not)(u), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, u);
      e.mergeEvaluated(l);
    }
    function d(l, p) {
      return () => {
        const P = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(P, i), p ? t.assign(p, (0, Gn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function zi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Eu.alwaysValidSchema)(e, r);
}
Lo.default = qg;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const Kg = L, Gg = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Kg.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Fo.default = Gg;
Object.defineProperty(No, "__esModule", { value: !0 });
const Hg = Er, Wg = Oo, Jg = wr, Bg = Ro, Xg = To, Yg = gu, Qg = Io, Zg = ns, xg = jo, e0 = Ao, t0 = ko, r0 = Co, n0 = Do, s0 = Mo, a0 = Lo, o0 = Fo;
function i0(e = !1) {
  const t = [
    // any
    t0.default,
    r0.default,
    n0.default,
    s0.default,
    a0.default,
    o0.default,
    // object
    Qg.default,
    Zg.default,
    Yg.default,
    xg.default,
    e0.default
  ];
  return e ? t.push(Wg.default, Bg.default) : t.push(Hg.default, Jg.default), t.push(Xg.default), t;
}
No.default = i0;
var Vo = {}, Uo = {};
Object.defineProperty(Uo, "__esModule", { value: !0 });
const ye = Z, c0 = {
  message: ({ schemaCode: e }) => (0, ye.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ye._)`{format: ${e}}`
}, l0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: c0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: p } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const w = r.scopeValue("formats", {
        ref: p.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, ye._)`${w}[${i}]`), $ = r.let("fType"), h = r.let("format");
      r.if((0, ye._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign($, (0, ye._)`${g}.type || "string"`).assign(h, (0, ye._)`${g}.validate`), () => r.assign($, (0, ye._)`"string"`).assign(h, g)), e.fail$data((0, ye.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? ye.nil : (0, ye._)`${i} && !${h}`;
      }
      function N() {
        const R = l.$async ? (0, ye._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, ye._)`${h}(${n})`, I = (0, ye._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, ye._)`${h} && ${h} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function _() {
      const w = p.formats[a];
      if (!w) {
        E();
        return;
      }
      if (w === !0)
        return;
      const [g, $, h] = N(w);
      g === t && e.pass(R());
      function E() {
        if (c.strictSchema === !1) {
          p.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, ye.regexpCode)(I) : c.code.formats ? (0, ye._)`${c.code.formats}${(0, ye.getProperty)(a)}` : void 0, W = r.scopeValue("formats", { key: a, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, ye._)`${W}.validate`] : ["string", I, W];
      }
      function R() {
        if (typeof w == "object" && !(w instanceof RegExp) && w.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, ye._)`await ${h}(${n})`;
        }
        return typeof $ == "function" ? (0, ye._)`${h}(${n})` : (0, ye._)`${h}.test(${n})`;
      }
    }
  }
};
Uo.default = l0;
Object.defineProperty(Vo, "__esModule", { value: !0 });
const u0 = Uo, d0 = [u0.default];
Vo.default = d0;
var yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.contentVocabulary = yr.metadataVocabulary = void 0;
yr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
yr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(uo, "__esModule", { value: !0 });
const f0 = fo, h0 = po, p0 = No, m0 = Vo, qi = yr, y0 = [
  f0.default,
  h0.default,
  (0, p0.default)(),
  m0.default,
  qi.metadataVocabulary,
  qi.contentVocabulary
];
uo.default = y0;
var zo = {}, ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.DiscrError = void 0;
var Ki;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ki || (ss.DiscrError = Ki = {}));
Object.defineProperty(zo, "__esModule", { value: !0 });
const ar = Z, Ws = ss, Gi = Me, $0 = vr, _0 = L, g0 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ws.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ar._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, v0 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: g0,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const u = n.propertyName;
    if (typeof u != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, ar._)`${r}${(0, ar.getProperty)(u)}`);
    t.if((0, ar._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Ws.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const w in _)
        t.elseIf((0, ar._)`${d} === ${w}`), t.assign(c, p(_[w]));
      t.else(), e.error(!1, { discrError: Ws.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function p(_) {
      const w = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, w);
      return e.mergeEvaluated(g, ar.Name), w;
    }
    function P() {
      var _;
      const w = {}, g = h(s);
      let $ = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, _0.schemaHasRulesButRef)(I, a.self.RULES)) {
          const W = I.$ref;
          if (I = Gi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), I instanceof Gi.SchemaEnv && (I = I.schema), I === void 0)
            throw new $0.default(a.opts.uriResolver, a.baseId, W);
        }
        const z = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        $ = $ && (g || h(I)), E(z, R);
      }
      if (!$)
        throw new Error(`discriminator: "${u}" must be required`);
      return w;
      function h({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function E(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const z of R.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in w)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        w[R] = I;
      }
    }
  }
};
zo.default = v0;
const E0 = "http://json-schema.org/draft-07/schema#", w0 = "http://json-schema.org/draft-07/schema#", S0 = "Core schema meta-schema", b0 = {
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
}, P0 = [
  "object",
  "boolean"
], N0 = {
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
}, O0 = {
  $schema: E0,
  $id: w0,
  title: S0,
  definitions: b0,
  type: P0,
  properties: N0,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Dl, n = uo, s = zo, a = O0, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const w = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(w, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = Ye;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var l = Z;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var p = Qr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return p.default;
  } });
  var P = vr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Vs, Vs.exports);
var R0 = Vs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = R0, r = Z, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: u, schemaCode: c }) => r.str`should be ${s[u].okStr} ${c}`,
    params: ({ keyword: u, schemaCode: c }) => r._`{comparison: ${s[u].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(u) {
      const { gen: c, data: d, schemaCode: l, keyword: p, it: P } = u, { opts: _, self: w } = P;
      if (!_.validateFormats)
        return;
      const g = new t.KeywordCxt(P, w.RULES.all.format.definition, "format");
      g.$data ? $() : h();
      function $() {
        const N = c.scopeValue("formats", {
          ref: w.formats,
          code: _.code.formats
        }), R = c.const("fmt", r._`${N}[${g.schemaCode}]`);
        u.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, E(R)));
      }
      function h() {
        const N = g.schema, R = w.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${p}": format "${N}" does not define "compare" function`);
        const I = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: _.code.formats ? r._`${_.code.formats}${r.getProperty(N)}` : void 0
        });
        u.fail$data(E(I));
      }
      function E(N) {
        return r._`${N}.compare(${d}, ${l}) ${s[p].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (u) => (u.addKeyword(e.formatLimitDefinition), u);
  e.default = i;
})(Cl);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = kl, n = Cl, s = Z, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), u = (d, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(d, l, r.fullFormats, a), d;
    const [p, P] = l.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], _ = l.formats || r.formatNames;
    return c(d, _, p, P), l.keywords && n.default(d), d;
  };
  u.get = (d, l = "full") => {
    const P = (l === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!P)
      throw new Error(`Unknown format "${d}"`);
    return P;
  };
  function c(d, l, p, P) {
    var _, w;
    (_ = (w = d.opts.code).formats) !== null && _ !== void 0 || (w.formats = s._`require("ajv-formats/dist/formats").${P}`);
    for (const g of l)
      d.addFormat(g, p[g]);
  }
  e.exports = t = u, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = u;
})(Fs, Fs.exports);
var T0 = Fs.exports;
const I0 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !j0(s, a) && n || Object.defineProperty(e, r, a);
}, j0 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, A0 = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, k0 = (e, t) => `/* Wrapped ${e}*/
${t}`, C0 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), D0 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), M0 = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = k0.bind(null, n, t.toString());
  Object.defineProperty(s, "name", D0), Object.defineProperty(e, "toString", { ...C0, value: s });
}, L0 = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    I0(e, t, s, r);
  return A0(e, t), M0(e, t, n), e;
};
var F0 = L0;
const V0 = F0;
var U0 = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: s = !0
  } = t;
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let a, i;
  const u = function(...c) {
    const d = this, l = () => {
      a = void 0, s && (i = e.apply(d, c));
    }, p = n && !a;
    return clearTimeout(a), a = setTimeout(l, r), p && (i = e.apply(d, c)), i;
  };
  return V0(u, e), u.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, u;
}, Js = { exports: {} };
const z0 = "2.0.0", wu = 256, q0 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, K0 = 16, G0 = wu - 6, H0 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var as = {
  MAX_LENGTH: wu,
  MAX_SAFE_COMPONENT_LENGTH: K0,
  MAX_SAFE_BUILD_LENGTH: G0,
  MAX_SAFE_INTEGER: q0,
  RELEASE_TYPES: H0,
  SEMVER_SPEC_VERSION: z0,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const W0 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var os = W0;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = as, a = os;
  t = e.exports = {};
  const i = t.re = [], u = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], l = t.t = {};
  let p = 0;
  const P = "[a-zA-Z0-9-]", _ = [
    ["\\s", 1],
    ["\\d", s],
    [P, n]
  ], w = ($) => {
    for (const [h, E] of _)
      $ = $.split(`${h}*`).join(`${h}{0,${E}}`).split(`${h}+`).join(`${h}{1,${E}}`);
    return $;
  }, g = ($, h, E) => {
    const N = w(h), R = p++;
    a($, R, h), l[$] = R, c[R] = h, d[R] = N, i[R] = new RegExp(h, E ? "g" : void 0), u[R] = new RegExp(N, E ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${P}*`), g("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${P}+`), g("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), g("FULL", `^${c[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), g("LOOSE", `^${c[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), g("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[l.COERCE], !0), g("COERCERTLFULL", c[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Js, Js.exports);
var xr = Js.exports;
const J0 = Object.freeze({ loose: !0 }), B0 = Object.freeze({}), X0 = (e) => e ? typeof e != "object" ? J0 : e : B0;
var qo = X0;
const Hi = /^[0-9]+$/, Su = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = Hi.test(e), n = Hi.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Y0 = (e, t) => Su(t, e);
var bu = {
  compareIdentifiers: Su,
  rcompareIdentifiers: Y0
};
const mn = os, { MAX_LENGTH: Wi, MAX_SAFE_INTEGER: yn } = as, { safeRe: $n, t: _n } = xr, Q0 = qo, { compareIdentifiers: ws } = bu;
let Z0 = class xe {
  constructor(t, r) {
    if (r = Q0(r), t instanceof xe) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Wi)
      throw new TypeError(
        `version is longer than ${Wi} characters`
      );
    mn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? $n[_n.LOOSE] : $n[_n.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > yn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > yn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > yn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < yn)
          return a;
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
    if (mn("SemVer.compare", this.version, this.options, t), !(t instanceof xe)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new xe(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof xe || (t = new xe(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof xe || (t = new xe(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (mn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return ws(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof xe || (t = new xe(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (mn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return ws(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? $n[_n.PRERELEASELOOSE] : $n[_n.PRERELEASE]);
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
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let a = [r, s];
          n === !1 && (a = [r]), ws(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var je = Z0;
const Ji = je, x0 = (e, t, r = !1) => {
  if (e instanceof Ji)
    return e;
  try {
    return new Ji(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Sr = x0;
const ev = Sr, tv = (e, t) => {
  const r = ev(e, t);
  return r ? r.version : null;
};
var rv = tv;
const nv = Sr, sv = (e, t) => {
  const r = nv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var av = sv;
const Bi = je, ov = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new Bi(
      e instanceof Bi ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var iv = ov;
const Xi = Sr, cv = (e, t) => {
  const r = Xi(e, null, !0), n = Xi(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, i = a ? r : n, u = a ? n : r, c = !!i.prerelease.length;
  if (!!u.prerelease.length && !c) {
    if (!u.patch && !u.minor)
      return "major";
    if (u.compareMain(i) === 0)
      return u.minor && !u.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var lv = cv;
const uv = je, dv = (e, t) => new uv(e, t).major;
var fv = dv;
const hv = je, pv = (e, t) => new hv(e, t).minor;
var mv = pv;
const yv = je, $v = (e, t) => new yv(e, t).patch;
var _v = $v;
const gv = Sr, vv = (e, t) => {
  const r = gv(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Ev = vv;
const Yi = je, wv = (e, t, r) => new Yi(e, r).compare(new Yi(t, r));
var Qe = wv;
const Sv = Qe, bv = (e, t, r) => Sv(t, e, r);
var Pv = bv;
const Nv = Qe, Ov = (e, t) => Nv(e, t, !0);
var Rv = Ov;
const Qi = je, Tv = (e, t, r) => {
  const n = new Qi(e, r), s = new Qi(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Ko = Tv;
const Iv = Ko, jv = (e, t) => e.sort((r, n) => Iv(r, n, t));
var Av = jv;
const kv = Ko, Cv = (e, t) => e.sort((r, n) => kv(n, r, t));
var Dv = Cv;
const Mv = Qe, Lv = (e, t, r) => Mv(e, t, r) > 0;
var is = Lv;
const Fv = Qe, Vv = (e, t, r) => Fv(e, t, r) < 0;
var Go = Vv;
const Uv = Qe, zv = (e, t, r) => Uv(e, t, r) === 0;
var Pu = zv;
const qv = Qe, Kv = (e, t, r) => qv(e, t, r) !== 0;
var Nu = Kv;
const Gv = Qe, Hv = (e, t, r) => Gv(e, t, r) >= 0;
var Ho = Hv;
const Wv = Qe, Jv = (e, t, r) => Wv(e, t, r) <= 0;
var Wo = Jv;
const Bv = Pu, Xv = Nu, Yv = is, Qv = Ho, Zv = Go, xv = Wo, eE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return Bv(e, r, n);
    case "!=":
      return Xv(e, r, n);
    case ">":
      return Yv(e, r, n);
    case ">=":
      return Qv(e, r, n);
    case "<":
      return Zv(e, r, n);
    case "<=":
      return xv(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Ou = eE;
const tE = je, rE = Sr, { safeRe: gn, t: vn } = xr, nE = (e, t) => {
  if (e instanceof tE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? gn[vn.COERCEFULL] : gn[vn.COERCE]);
  else {
    const c = t.includePrerelease ? gn[vn.COERCERTLFULL] : gn[vn.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", u = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return rE(`${n}.${s}.${a}${i}${u}`, t);
};
var sE = nE;
class aE {
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
var oE = aE, Ss, Zi;
function Ze() {
  if (Zi) return Ss;
  Zi = 1;
  const e = /\s+/g;
  class t {
    constructor(k, U) {
      if (U = s(U), k instanceof t)
        return k.loose === !!U.loose && k.includePrerelease === !!U.includePrerelease ? k : new t(k.raw, U);
      if (k instanceof a)
        return this.raw = k.value, this.set = [[k]], this.formatted = void 0, this;
      if (this.options = U, this.loose = !!U.loose, this.includePrerelease = !!U.includePrerelease, this.raw = k.trim().replace(e, " "), this.set = this.raw.split("||").map((D) => this.parseRange(D.trim())).filter((D) => D.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const D = this.set[0];
        if (this.set = this.set.filter((O) => !g(O[0])), this.set.length === 0)
          this.set = [D];
        else if (this.set.length > 1) {
          for (const O of this.set)
            if (O.length === 1 && $(O[0])) {
              this.set = [O];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let k = 0; k < this.set.length; k++) {
          k > 0 && (this.formatted += "||");
          const U = this.set[k];
          for (let D = 0; D < U.length; D++)
            D > 0 && (this.formatted += " "), this.formatted += U[D].toString().trim();
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
    parseRange(k) {
      const D = ((this.options.includePrerelease && _) | (this.options.loose && w)) + ":" + k, O = n.get(D);
      if (O)
        return O;
      const T = this.options.loose, v = T ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      k = k.replace(v, Q(this.options.includePrerelease)), i("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], l), i("comparator trim", k), k = k.replace(c[d.TILDETRIM], p), i("tilde trim", k), k = k.replace(c[d.CARETTRIM], P), i("caret trim", k);
      let m = k.split(" ").map((f) => E(f, this.options)).join(" ").split(/\s+/).map((f) => ne(f, this.options));
      T && (m = m.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", m);
      const S = /* @__PURE__ */ new Map(), y = m.map((f) => new a(f, this.options));
      for (const f of y) {
        if (g(f))
          return [f];
        S.set(f.value, f);
      }
      S.size > 1 && S.has("") && S.delete("");
      const o = [...S.values()];
      return n.set(D, o), o;
    }
    intersects(k, U) {
      if (!(k instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((D) => h(D, U) && k.set.some((O) => h(O, U) && D.every((T) => O.every((v) => T.intersects(v, U)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(k) {
      if (!k)
        return !1;
      if (typeof k == "string")
        try {
          k = new u(k, this.options);
        } catch {
          return !1;
        }
      for (let U = 0; U < this.set.length; U++)
        if (de(this.set[U], k, this.options))
          return !0;
      return !1;
    }
  }
  Ss = t;
  const r = oE, n = new r(), s = qo, a = cs(), i = os, u = je, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: l,
    tildeTrimReplace: p,
    caretTrimReplace: P
  } = xr, { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: w } = as, g = (C) => C.value === "<0.0.0-0", $ = (C) => C.value === "", h = (C, k) => {
    let U = !0;
    const D = C.slice();
    let O = D.pop();
    for (; U && D.length; )
      U = D.every((T) => O.intersects(T, k)), O = D.pop();
    return U;
  }, E = (C, k) => (C = C.replace(c[d.BUILD], ""), i("comp", C, k), C = z(C, k), i("caret", C), C = R(C, k), i("tildes", C), C = ue(C, k), i("xrange", C), C = H(C, k), i("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", R = (C, k) => C.trim().split(/\s+/).map((U) => I(U, k)).join(" "), I = (C, k) => {
    const U = k.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return C.replace(U, (D, O, T, v, m) => {
      i("tilde", C, D, O, T, v, m);
      let S;
      return N(O) ? S = "" : N(T) ? S = `>=${O}.0.0 <${+O + 1}.0.0-0` : N(v) ? S = `>=${O}.${T}.0 <${O}.${+T + 1}.0-0` : m ? (i("replaceTilde pr", m), S = `>=${O}.${T}.${v}-${m} <${O}.${+T + 1}.0-0`) : S = `>=${O}.${T}.${v} <${O}.${+T + 1}.0-0`, i("tilde return", S), S;
    });
  }, z = (C, k) => C.trim().split(/\s+/).map((U) => W(U, k)).join(" "), W = (C, k) => {
    i("caret", C, k);
    const U = k.loose ? c[d.CARETLOOSE] : c[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(U, (O, T, v, m, S) => {
      i("caret", C, O, T, v, m, S);
      let y;
      return N(T) ? y = "" : N(v) ? y = `>=${T}.0.0${D} <${+T + 1}.0.0-0` : N(m) ? T === "0" ? y = `>=${T}.${v}.0${D} <${T}.${+v + 1}.0-0` : y = `>=${T}.${v}.0${D} <${+T + 1}.0.0-0` : S ? (i("replaceCaret pr", S), T === "0" ? v === "0" ? y = `>=${T}.${v}.${m}-${S} <${T}.${v}.${+m + 1}-0` : y = `>=${T}.${v}.${m}-${S} <${T}.${+v + 1}.0-0` : y = `>=${T}.${v}.${m}-${S} <${+T + 1}.0.0-0`) : (i("no pr"), T === "0" ? v === "0" ? y = `>=${T}.${v}.${m}${D} <${T}.${v}.${+m + 1}-0` : y = `>=${T}.${v}.${m}${D} <${T}.${+v + 1}.0-0` : y = `>=${T}.${v}.${m} <${+T + 1}.0.0-0`), i("caret return", y), y;
    });
  }, ue = (C, k) => (i("replaceXRanges", C, k), C.split(/\s+/).map((U) => V(U, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const U = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(U, (D, O, T, v, m, S) => {
      i("xRange", C, D, O, T, v, m, S);
      const y = N(T), o = y || N(v), f = o || N(m), b = f;
      return O === "=" && b && (O = ""), S = k.includePrerelease ? "-0" : "", y ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && b ? (o && (v = 0), m = 0, O === ">" ? (O = ">=", o ? (T = +T + 1, v = 0, m = 0) : (v = +v + 1, m = 0)) : O === "<=" && (O = "<", o ? T = +T + 1 : v = +v + 1), O === "<" && (S = "-0"), D = `${O + T}.${v}.${m}${S}`) : o ? D = `>=${T}.0.0${S} <${+T + 1}.0.0-0` : f && (D = `>=${T}.${v}.0${S} <${T}.${+v + 1}.0-0`), i("xRange return", D), D;
    });
  }, H = (C, k) => (i("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), ne = (C, k) => (i("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, U, D, O, T, v, m, S, y, o, f, b) => (N(D) ? U = "" : N(O) ? U = `>=${D}.0.0${C ? "-0" : ""}` : N(T) ? U = `>=${D}.${O}.0${C ? "-0" : ""}` : v ? U = `>=${U}` : U = `>=${U}${C ? "-0" : ""}`, N(y) ? S = "" : N(o) ? S = `<${+y + 1}.0.0-0` : N(f) ? S = `<${y}.${+o + 1}.0-0` : b ? S = `<=${y}.${o}.${f}-${b}` : C ? S = `<${y}.${o}.${+f + 1}-0` : S = `<=${S}`, `${U} ${S}`.trim()), de = (C, k, U) => {
    for (let D = 0; D < C.length; D++)
      if (!C[D].test(k))
        return !1;
    if (k.prerelease.length && !U.includePrerelease) {
      for (let D = 0; D < C.length; D++)
        if (i(C[D].semver), C[D].semver !== a.ANY && C[D].semver.prerelease.length > 0) {
          const O = C[D].semver;
          if (O.major === k.major && O.minor === k.minor && O.patch === k.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ss;
}
var bs, xi;
function cs() {
  if (xi) return bs;
  xi = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, p) {
      if (p = r(p), l instanceof t) {
        if (l.loose === !!p.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), i("comparator", l, p), this.options = p, this.loose = !!p.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(l) {
      const p = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], P = l.match(p);
      if (!P)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = P[1] !== void 0 ? P[1] : "", this.operator === "=" && (this.operator = ""), P[2] ? this.semver = new u(P[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (i("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new u(l, this.options);
        } catch {
          return !1;
        }
      return a(l, this.operator, this.semver, this.options);
    }
    intersects(l, p) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, p).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, p).test(l.semver) : (p = r(p), p.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !p.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, p) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, p) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  bs = t;
  const r = qo, { safeRe: n, t: s } = xr, a = Ou, i = os, u = je, c = Ze();
  return bs;
}
const iE = Ze(), cE = (e, t, r) => {
  try {
    t = new iE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ls = cE;
const lE = Ze(), uE = (e, t) => new lE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var dE = uE;
const fE = je, hE = Ze(), pE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new hE(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new fE(n, r));
  }), n;
};
var mE = pE;
const yE = je, $E = Ze(), _E = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new $E(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new yE(n, r));
  }), n;
};
var gE = _E;
const Ps = je, vE = Ze(), ec = is, EE = (e, t) => {
  e = new vE(e, t);
  let r = new Ps("0.0.0");
  if (e.test(r) || (r = new Ps("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const u = new Ps(i.semver.version);
      switch (i.operator) {
        case ">":
          u.prerelease.length === 0 ? u.patch++ : u.prerelease.push(0), u.raw = u.format();
        case "":
        case ">=":
          (!a || ec(u, a)) && (a = u);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), a && (!r || ec(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var wE = EE;
const SE = Ze(), bE = (e, t) => {
  try {
    return new SE(e, t).range || "*";
  } catch {
    return null;
  }
};
var PE = bE;
const NE = je, Ru = cs(), { ANY: OE } = Ru, RE = Ze(), TE = ls, tc = is, rc = Go, IE = Wo, jE = Ho, AE = (e, t, r, n) => {
  e = new NE(e, n), t = new RE(t, n);
  let s, a, i, u, c;
  switch (r) {
    case ">":
      s = tc, a = IE, i = rc, u = ">", c = ">=";
      break;
    case "<":
      s = rc, a = jE, i = tc, u = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (TE(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const l = t.set[d];
    let p = null, P = null;
    if (l.forEach((_) => {
      _.semver === OE && (_ = new Ru(">=0.0.0")), p = p || _, P = P || _, s(_.semver, p.semver, n) ? p = _ : i(_.semver, P.semver, n) && (P = _);
    }), p.operator === u || p.operator === c || (!P.operator || P.operator === u) && a(e, P.semver))
      return !1;
    if (P.operator === c && i(e, P.semver))
      return !1;
  }
  return !0;
};
var Jo = AE;
const kE = Jo, CE = (e, t, r) => kE(e, t, ">", r);
var DE = CE;
const ME = Jo, LE = (e, t, r) => ME(e, t, "<", r);
var FE = LE;
const nc = Ze(), VE = (e, t, r) => (e = new nc(e, r), t = new nc(t, r), e.intersects(t, r));
var UE = VE;
const zE = ls, qE = Qe;
var KE = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((l, p) => qE(l, p, r));
  for (const l of i)
    zE(l, t, r) ? (a = l, s || (s = l)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const u = [];
  for (const [l, p] of n)
    l === p ? u.push(l) : !p && l === i[0] ? u.push("*") : p ? l === i[0] ? u.push(`<=${p}`) : u.push(`${l} - ${p}`) : u.push(`>=${l}`);
  const c = u.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const sc = Ze(), Bo = cs(), { ANY: Ns } = Bo, jr = ls, Xo = Qe, GE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new sc(e, r), t = new sc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = WE(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, HE = [new Bo(">=0.0.0-0")], ac = [new Bo(">=0.0.0")], WE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Ns) {
    if (t.length === 1 && t[0].semver === Ns)
      return !0;
    r.includePrerelease ? e = HE : e = ac;
  }
  if (t.length === 1 && t[0].semver === Ns) {
    if (r.includePrerelease)
      return !0;
    t = ac;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const _ of e)
    _.operator === ">" || _.operator === ">=" ? s = oc(s, _, r) : _.operator === "<" || _.operator === "<=" ? a = ic(a, _, r) : n.add(_.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && a) {
    if (i = Xo(s.semver, a.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const _ of n) {
    if (s && !jr(_, String(s), r) || a && !jr(_, String(a), r))
      return null;
    for (const w of t)
      if (!jr(_, String(w), r))
        return !1;
    return !0;
  }
  let u, c, d, l, p = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, P = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  p && p.prerelease.length === 1 && a.operator === "<" && p.prerelease[0] === 0 && (p = !1);
  for (const _ of t) {
    if (l = l || _.operator === ">" || _.operator === ">=", d = d || _.operator === "<" || _.operator === "<=", s) {
      if (P && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === P.major && _.semver.minor === P.minor && _.semver.patch === P.patch && (P = !1), _.operator === ">" || _.operator === ">=") {
        if (u = oc(s, _, r), u === _ && u !== s)
          return !1;
      } else if (s.operator === ">=" && !jr(s.semver, String(_), r))
        return !1;
    }
    if (a) {
      if (p && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === p.major && _.semver.minor === p.minor && _.semver.patch === p.patch && (p = !1), _.operator === "<" || _.operator === "<=") {
        if (c = ic(a, _, r), c === _ && c !== a)
          return !1;
      } else if (a.operator === "<=" && !jr(a.semver, String(_), r))
        return !1;
    }
    if (!_.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && l && !s && i !== 0 || P || p);
}, oc = (e, t, r) => {
  if (!e)
    return t;
  const n = Xo(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, ic = (e, t, r) => {
  if (!e)
    return t;
  const n = Xo(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var JE = GE;
const Os = xr, cc = as, BE = je, lc = bu, XE = Sr, YE = rv, QE = av, ZE = iv, xE = lv, ew = fv, tw = mv, rw = _v, nw = Ev, sw = Qe, aw = Pv, ow = Rv, iw = Ko, cw = Av, lw = Dv, uw = is, dw = Go, fw = Pu, hw = Nu, pw = Ho, mw = Wo, yw = Ou, $w = sE, _w = cs(), gw = Ze(), vw = ls, Ew = dE, ww = mE, Sw = gE, bw = wE, Pw = PE, Nw = Jo, Ow = DE, Rw = FE, Tw = UE, Iw = KE, jw = JE;
var Aw = {
  parse: XE,
  valid: YE,
  clean: QE,
  inc: ZE,
  diff: xE,
  major: ew,
  minor: tw,
  patch: rw,
  prerelease: nw,
  compare: sw,
  rcompare: aw,
  compareLoose: ow,
  compareBuild: iw,
  sort: cw,
  rsort: lw,
  gt: uw,
  lt: dw,
  eq: fw,
  neq: hw,
  gte: pw,
  lte: mw,
  cmp: yw,
  coerce: $w,
  Comparator: _w,
  Range: gw,
  satisfies: vw,
  toComparators: Ew,
  maxSatisfying: ww,
  minSatisfying: Sw,
  minVersion: bw,
  validRange: Pw,
  outside: Nw,
  gtr: Ow,
  ltr: Rw,
  intersects: Tw,
  simplifyRange: Iw,
  subset: jw,
  SemVer: BE,
  re: Os.re,
  src: Os.src,
  tokens: Os.t,
  SEMVER_SPEC_VERSION: cc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: cc.RELEASE_TYPES,
  compareIdentifiers: lc.compareIdentifiers,
  rcompareIdentifiers: lc.rcompareIdentifiers
}, us = { exports: {} }, Yo = { exports: {} };
const Tu = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
Yo.exports = Tu;
Yo.exports.default = Tu;
var kw = Yo.exports;
const Cw = kw, Hn = /* @__PURE__ */ new WeakMap(), Iu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...i) {
    if (Hn.set(a, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return Cw(a, e), Hn.set(a, n), a;
};
us.exports = Iu;
us.exports.default = Iu;
us.exports.callCount = (e) => {
  if (!Hn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Hn.get(e);
};
var Dw = us.exports;
(function(e, t) {
  var r = en && en.__classPrivateFieldSet || function(D, O, T, v, m) {
    if (v === "m") throw new TypeError("Private method is not writable");
    if (v === "a" && !m) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !m : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return v === "a" ? m.call(D, T) : m ? m.value = T : O.set(D, T), T;
  }, n = en && en.__classPrivateFieldGet || function(D, O, T, v) {
    if (T === "a" && !v) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !v : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? v : T === "a" ? v.call(D) : v ? v.value : O.get(D);
  }, s, a, i, u, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const l = yc, p = Xs, P = xt, _ = Lu, w = Fu, g = Vu, $ = Hu, h = rd, E = od, N = rt, R = $y, I = T0, z = U0, W = Aw, ue = Dw, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), ne = (D) => D != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = P.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const de = (D, O) => {
    const T = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), v = typeof O;
    if (T.has(v))
      throw new TypeError(`Setting a value of type \`${v}\` for key \`${D}\` is not allowed as it's not supported by JSON`);
  }, C = "__internal__", k = `${C}.migrations.version`;
  class U {
    constructor(O = {}) {
      var T;
      i.set(this, void 0), u.set(this, void 0), c.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const v = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...O
      }, m = ue(() => {
        const f = h.sync({ cwd: Q }), b = f && JSON.parse(p.readFileSync(f, "utf8"));
        return b ?? {};
      });
      if (!v.cwd) {
        if (v.projectName || (v.projectName = m().name), !v.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        v.cwd = E(v.projectName, { suffix: v.projectSuffix }).config;
      }
      if (r(this, c, v, "f"), v.schema) {
        if (typeof v.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new R.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, I.default)(f);
        const b = {
          type: "object",
          properties: v.schema
        };
        r(this, i, f.compile(b), "f");
        for (const [j, A] of Object.entries(v.schema))
          A != null && A.default && (n(this, d, "f")[j] = A.default);
      }
      v.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...v.defaults
      }, "f"), v.serialize && (this._serialize = v.serialize), v.deserialize && (this._deserialize = v.deserialize), this.events = new g.EventEmitter(), r(this, u, v.encryptionKey, "f");
      const S = v.fileExtension ? `.${v.fileExtension}` : "";
      this.path = P.resolve(v.cwd, `${(T = v.configName) !== null && T !== void 0 ? T : "config"}${S}`);
      const y = this.store, o = Object.assign(H(), v.defaults, y);
      this._validate(o);
      try {
        w.deepEqual(y, o);
      } catch {
        this.store = o;
      }
      if (v.watch && this._watch(), v.migrations) {
        if (v.projectVersion || (v.projectVersion = m().version), !v.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(v.migrations, v.projectVersion, v.beforeEachMigration);
      }
    }
    get(O, T) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(O, T);
      const { store: v } = this;
      return O in v ? v[O] : T;
    }
    set(O, T) {
      if (typeof O != "string" && typeof O != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof O}`);
      if (typeof O != "object" && T === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(O))
        throw new TypeError(`Please don't use the ${C} key, as it's used to manage this module internal operations.`);
      const { store: v } = this, m = (S, y) => {
        de(S, y), n(this, c, "f").accessPropertiesByDotNotation ? $.set(v, S, y) : v[S] = y;
      };
      if (typeof O == "object") {
        const S = O;
        for (const [y, o] of Object.entries(S))
          m(y, o);
      } else
        m(O, T);
      this.store = v;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(O) {
      return n(this, c, "f").accessPropertiesByDotNotation ? $.has(this.store, O) : O in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...O) {
      for (const T of O)
        ne(n(this, d, "f")[T]) && this.set(T, n(this, d, "f")[T]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(O) {
      const { store: T } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? $.delete(T, O) : delete T[O], this.store = T;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = H();
      for (const O of Object.keys(n(this, d, "f")))
        this.reset(O);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(O, T) {
      if (typeof O != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof O}`);
      if (typeof T != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof T}`);
      return this._handleChange(() => this.get(O), T);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(O) {
      if (typeof O != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof O}`);
      return this._handleChange(() => this.store, O);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const O = p.readFileSync(this.path, n(this, u, "f") ? null : "utf8"), T = this._encryptData(O), v = this._deserialize(T);
        return this._validate(v), Object.assign(H(), v);
      } catch (O) {
        if ((O == null ? void 0 : O.code) === "ENOENT")
          return this._ensureDirectory(), H();
        if (n(this, c, "f").clearInvalidConfig && O.name === "SyntaxError")
          return H();
        throw O;
      }
    }
    set store(O) {
      this._ensureDirectory(), this._validate(O), this._write(O), this.events.emit("change");
    }
    *[(i = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [O, T] of Object.entries(this.store))
        yield [O, T];
    }
    _encryptData(O) {
      if (!n(this, u, "f"))
        return O.toString();
      try {
        if (n(this, u, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const T = O.slice(0, 16), v = _.pbkdf2Sync(n(this, u, "f"), T.toString(), 1e4, 32, "sha512"), m = _.createDecipheriv(V, v, T);
              O = Buffer.concat([m.update(Buffer.from(O.slice(17))), m.final()]).toString("utf8");
            } else {
              const T = _.createDecipher(V, n(this, u, "f"));
              O = Buffer.concat([T.update(Buffer.from(O)), T.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return O.toString();
    }
    _handleChange(O, T) {
      let v = O();
      const m = () => {
        const S = v, y = O();
        (0, l.isDeepStrictEqual)(y, S) || (v = y, T.call(this, y, S));
      };
      return this.events.on("change", m), () => this.events.removeListener("change", m);
    }
    _validate(O) {
      if (!n(this, i, "f") || n(this, i, "f").call(this, O) || !n(this, i, "f").errors)
        return;
      const v = n(this, i, "f").errors.map(({ instancePath: m, message: S = "" }) => `\`${m.slice(1)}\` ${S}`);
      throw new Error("Config schema violation: " + v.join("; "));
    }
    _ensureDirectory() {
      p.mkdirSync(P.dirname(this.path), { recursive: !0 });
    }
    _write(O) {
      let T = this._serialize(O);
      if (n(this, u, "f")) {
        const v = _.randomBytes(16), m = _.pbkdf2Sync(n(this, u, "f"), v.toString(), 1e4, 32, "sha512"), S = _.createCipheriv(V, m, v);
        T = Buffer.concat([v, Buffer.from(":"), S.update(Buffer.from(T)), S.final()]);
      }
      if (process.env.SNAP)
        p.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
        } catch (v) {
          if ((v == null ? void 0 : v.code) === "EXDEV") {
            p.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
            return;
          }
          throw v;
        }
    }
    _watch() {
      this._ensureDirectory(), p.existsSync(this.path) || this._write(H()), process.platform === "win32" ? p.watch(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 100 })) : p.watchFile(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(O, T, v) {
      let m = this._get(k, "0.0.0");
      const S = Object.keys(O).filter((o) => this._shouldPerformMigration(o, m, T));
      let y = { ...this.store };
      for (const o of S)
        try {
          v && v(this, {
            fromVersion: m,
            toVersion: o,
            finalVersion: T,
            versions: S
          });
          const f = O[o];
          f(this), this._set(k, o), m = o, y = { ...this.store };
        } catch (f) {
          throw this.store = y, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(m) || !W.eq(m, T)) && this._set(k, T);
    }
    _containsReservedKey(O) {
      return typeof O == "object" && Object.keys(O)[0] === C ? !0 : typeof O != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!O.startsWith(`${C}.`) : !1;
    }
    _isVersionInRangeFormat(O) {
      return W.clean(O) === null;
    }
    _shouldPerformMigration(O, T, v) {
      return this._isVersionInRangeFormat(O) ? T !== "0.0.0" && W.satisfies(T, O) ? !1 : W.satisfies(v, O) : !(W.lte(O, T) || W.gt(O, v));
    }
    _get(O, T) {
      return $.get(this.store, O, T);
    }
    _set(O, T) {
      const { store: v } = this;
      $.set(v, O, T), this.store = v;
    }
  }
  t.default = U, e.exports = U, e.exports.default = U;
})(Rs, Rs.exports);
var Mw = Rs.exports;
const uc = xt, { app: jn, ipcMain: Bs, ipcRenderer: dc, shell: Lw } = Cu, Fw = Mw;
let fc = !1;
const hc = () => {
  if (!Bs || !jn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: jn.getPath("userData"),
    appVersion: jn.getVersion()
  };
  return fc || (Bs.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), fc = !0), e;
};
class Vw extends Fw {
  constructor(t) {
    let r, n;
    if (dc) {
      const s = dc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else Bs && jn && ({ defaultCwd: r, appVersion: n } = hc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = uc.isAbsolute(t.cwd) ? t.cwd : uc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    hc();
  }
  async openInEditor() {
    const t = await Lw.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var Uw = Vw;
const zw = /* @__PURE__ */ zu(Uw), ju = St.dirname(Du(import.meta.url));
process.env.APP_ROOT = St.join(ju, "..");
const An = process.env.VITE_DEV_SERVER_URL, iS = St.join(process.env.APP_ROOT, "dist-electron"), Au = St.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = An ? St.join(process.env.APP_ROOT, "public") : Au;
let $t;
const qw = {
  stocks: {
    type: "array",
    default: []
  },
  pollInterval: {
    type: "number",
    default: 5e3
  }
}, En = new zw({
  schema: qw,
  name: "app-store"
});
function Kw(e) {
  const t = [];
  try {
    const r = JSON.parse(e);
    if (!r || !r.t || !r.o)
      return console.error("[Main] Invalid data structure from Sina API"), [];
    const { t: n, o: s, h: a, l: i, c: u, v: c } = r;
    for (let d = 0; d < n.length; d++)
      t.push({
        time: n[d],
        open: s[d],
        high: a[d],
        low: i[d],
        close: u[d],
        volume: c == null ? void 0 : c[d]
      });
  } catch (r) {
    console.error("[Main] Parse error for Sina data:", r);
  }
  return t;
}
function Gw(e) {
  const t = [];
  try {
    const r = JSON.parse(e);
    if (!r || r.code !== 0)
      return console.error("[Main] Invalid response code from Tencent:", r == null ? void 0 : r.code), [];
    if (!r.data)
      return console.error("[Main] No data field in Tencent response"), [];
    const n = Object.values(r.data)[0];
    if (!n || !n.day)
      return console.error("[Main] No day field in Tencent symbol data"), [];
    const s = n.day;
    for (const a of s)
      a.length >= 6 && t.push({
        time: a[0],
        open: parseFloat(a[1]),
        high: parseFloat(a[3]),
        low: parseFloat(a[4]),
        close: parseFloat(a[2]),
        volume: parseFloat(a[5])
      });
  } catch (r) {
    console.error("[Main] Parse error for Tencent data:", r);
  }
  return t;
}
function pc(e) {
  return new Promise((t, r) => {
    Mu.get(e, (n) => {
      let s = "";
      n.on("data", (a) => {
        s += a;
      }), n.on("end", () => {
        t(s);
      });
    }).on("error", (n) => {
      r(n);
    });
  });
}
function Hw() {
  Nr.handle("electron-store-get", (e, t) => En.get(t)), Nr.handle("electron-store-set", (e, t, r) => (En.set(t, r), !0)), Nr.handle("electron-store-get-all", () => En.store), Nr.handle("electron-store-reset", () => (En.reset(), !0)), Nr.handle("stock-get-intraday", async (e, t) => {
    try {
      console.log("[Main] Fetching intraday data for:", t);
      const n = `${t === "000001" || t.startsWith("6") ? "sh" : "sz"}${t}`;
      try {
        const s = `https://ifzq.gtimg.cn/appstock/app/fqkline/get?param=${n},day,1,`;
        console.log("[Main] Trying Tencent API:", s);
        const a = await pc(s), i = Gw(a);
        if (i.length > 0)
          return console.log("[Main] ✅ Got", i.length, "bars from Tencent"), i;
      } catch (s) {
        console.error("[Main] ❌ Tencent API failed:", s);
      }
      try {
        const s = `https://vip.stock.finance.sina.com.cn/q_gn/api/extral.php?symbol=${n}&bdate=&edate=&param=&type=1&resolution=1&_s=pc`;
        console.log("[Main] Trying Sina API:", s);
        const a = await pc(s), i = Kw(a);
        if (i.length > 0)
          return console.log("[Main] ✅ Got", i.length, "bars from Sina"), i;
      } catch (s) {
        console.error("[Main] ❌ Sina API failed:", s);
      }
      return console.warn("[Main] ⚠️ No data from any source for:", t), [];
    } catch (r) {
      return console.error("[Main] Error in stock-get-intraday:", r), [];
    }
  });
}
function ku() {
  $t = new mc({
    title: "Electron Stock App",
    icon: St.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: St.join(ju, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      sandbox: !0
    }
  }), $t.webContents.on("did-finish-load", () => {
    console.log("[Main] Window loaded, sending test message"), $t == null || $t.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), An ? (console.log("[Main] Loading dev server:", An), $t.loadURL(An)) : (console.log("[Main] Loading production HTML"), $t.loadFile(St.join(Au, "index.html")));
}
kn.on("window-all-closed", () => {
  process.platform !== "darwin" && (kn.quit(), $t = null);
});
kn.on("activate", () => {
  mc.getAllWindows().length === 0 && ku();
});
kn.whenReady().then(() => {
  Hw(), ku();
});
export {
  iS as MAIN_DIST,
  Au as RENDERER_DIST,
  An as VITE_DEV_SERVER_URL
};
