import ku, { app as An, BrowserWindow as mc, ipcMain as xr } from "electron";
import { fileURLToPath as Cu } from "node:url";
import St from "node:path";
import xt from "path";
import pc from "util";
import Xs from "fs";
import Du from "crypto";
import Mu from "assert";
import Lu from "events";
import Fu from "os";
var en = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Vu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Os = { exports: {} }, Uu = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Ut = Uu, zu = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), qu = (e) => !e.some((t) => zu.has(t));
function tn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return qu(r) ? r : [];
}
var Ku = {
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
const yc = Xs;
xs.exports = (e) => new Promise((t) => {
  yc.access(e, (r) => {
    t(!r);
  });
});
xs.exports.sync = (e) => {
  try {
    return yc.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Gu = xs.exports, ea = { exports: {} }, ta = { exports: {} };
const $c = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ta.exports = $c;
ta.exports.default = $c;
var Hu = ta.exports;
const Wu = Hu, _c = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (u, c, ...d) => {
    r++;
    const l = Wu(u, ...d);
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
ea.exports = _c;
ea.exports.default = _c;
var Ju = ea.exports;
const Qo = Ju;
class gc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const Bu = (e, t) => Promise.resolve(e).then(t), Xu = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new gc(t[0])));
var Yu = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = Qo(r.concurrency), s = [...e].map((i) => [i, n(Bu, i, t)]), a = Qo(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => a(Xu, i))).then(() => {
  }).catch((i) => i instanceof gc ? i.value : Promise.reject(i));
};
const vc = xt, Ec = Gu, Qu = Yu;
Zs.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), Qu(e, (r) => Ec(vc.resolve(t.cwd, r)), t));
Zs.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (Ec.sync(vc.resolve(t.cwd, r)))
      return r;
};
var Zu = Zs.exports;
const gt = xt, wc = Zu;
Qs.exports = (e, t = {}) => {
  const r = gt.resolve(t.cwd || ""), { root: n } = gt.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function i(u) {
      wc(s, { cwd: u }).then((c) => {
        c ? a(gt.join(u, c)) : u === n ? a(null) : i(gt.dirname(u));
      });
    })(r);
  });
};
Qs.exports.sync = (e, t = {}) => {
  let r = gt.resolve(t.cwd || "");
  const { root: n } = gt.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = wc.sync(s, { cwd: r });
    if (a)
      return gt.join(r, a);
    if (r === n)
      return null;
    r = gt.dirname(r);
  }
};
var xu = Qs.exports;
const Sc = xu;
Ys.exports = async ({ cwd: e } = {}) => Sc("package.json", { cwd: e });
Ys.exports.sync = ({ cwd: e } = {}) => Sc.sync("package.json", { cwd: e });
var ed = Ys.exports, ra = { exports: {} };
const me = xt, bc = Fu, _t = bc.homedir(), na = bc.tmpdir(), { env: or } = process, td = (e) => {
  const t = me.join(_t, "Library");
  return {
    data: me.join(t, "Application Support", e),
    config: me.join(t, "Preferences", e),
    cache: me.join(t, "Caches", e),
    log: me.join(t, "Logs", e),
    temp: me.join(na, e)
  };
}, rd = (e) => {
  const t = or.APPDATA || me.join(_t, "AppData", "Roaming"), r = or.LOCALAPPDATA || me.join(_t, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: me.join(r, e, "Data"),
    config: me.join(t, e, "Config"),
    cache: me.join(r, e, "Cache"),
    log: me.join(r, e, "Log"),
    temp: me.join(na, e)
  };
}, nd = (e) => {
  const t = me.basename(_t);
  return {
    data: me.join(or.XDG_DATA_HOME || me.join(_t, ".local", "share"), e),
    config: me.join(or.XDG_CONFIG_HOME || me.join(_t, ".config"), e),
    cache: me.join(or.XDG_CACHE_HOME || me.join(_t, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: me.join(or.XDG_STATE_HOME || me.join(_t, ".local", "state"), e),
    temp: me.join(na, t, e)
  };
}, Pc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? td(e) : process.platform === "win32" ? rd(e) : nd(e);
};
ra.exports = Pc;
ra.exports.default = Pc;
var sd = ra.exports, rt = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.NOOP = ae.LIMIT_FILES_DESCRIPTORS = ae.LIMIT_BASENAME_LENGTH = ae.IS_USER_ROOT = ae.IS_POSIX = ae.DEFAULT_TIMEOUT_SYNC = ae.DEFAULT_TIMEOUT_ASYNC = ae.DEFAULT_WRITE_OPTIONS = ae.DEFAULT_READ_OPTIONS = ae.DEFAULT_FOLDER_MODE = ae.DEFAULT_FILE_MODE = ae.DEFAULT_ENCODING = void 0;
const ad = "utf8";
ae.DEFAULT_ENCODING = ad;
const od = 438;
ae.DEFAULT_FILE_MODE = od;
const id = 511;
ae.DEFAULT_FOLDER_MODE = id;
const cd = {};
ae.DEFAULT_READ_OPTIONS = cd;
const ld = {};
ae.DEFAULT_WRITE_OPTIONS = ld;
const ud = 5e3;
ae.DEFAULT_TIMEOUT_ASYNC = ud;
const dd = 100;
ae.DEFAULT_TIMEOUT_SYNC = dd;
const fd = !!process.getuid;
ae.IS_POSIX = fd;
const hd = process.getuid ? !process.getuid() : !1;
ae.IS_USER_ROOT = hd;
const md = 128;
ae.LIMIT_BASENAME_LENGTH = md;
const pd = 1e4;
ae.LIMIT_FILES_DESCRIPTORS = pd;
const yd = () => {
};
ae.NOOP = yd;
var Hn = {}, dr = {};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.attemptifySync = dr.attemptifyAsync = void 0;
const Nc = ae, $d = (e, t = Nc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
dr.attemptifyAsync = $d;
const _d = (e, t = Nc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
dr.attemptifySync = _d;
var sa = {};
Object.defineProperty(sa, "__esModule", { value: !0 });
const gd = ae, Oc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !gd.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Oc.isChangeErrorOk(e))
      throw e;
  }
};
sa.default = Oc;
var fr = {}, aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
const vd = ae, le = {
  interval: 25,
  intervalId: void 0,
  limit: vd.LIMIT_FILES_DESCRIPTORS,
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
const Ed = aa, wd = (e, t) => function(r) {
  return function n() {
    return Ed.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
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
fr.retryifyAsync = wd;
const Sd = (e, t) => function(r) {
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
fr.retryifySync = Sd;
Object.defineProperty(Hn, "__esModule", { value: !0 });
const oe = Xs, Oe = pc, Re = dr, ge = sa, Ae = fr, bd = {
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
Hn.default = bd;
var oa = {};
Object.defineProperty(oa, "__esModule", { value: !0 });
const Pd = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
oa.default = Pd;
var ia = {};
Object.defineProperty(ia, "__esModule", { value: !0 });
const rn = {}, Rs = {
  next: (e) => {
    const t = rn[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Rs.next(e)) : delete rn[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = rn[e];
    r || (r = rn[e] = []), r.push(t), !(r.length > 1) && t(() => Rs.next(e));
  })
};
ia.default = Rs;
var ca = {};
Object.defineProperty(ca, "__esModule", { value: !0 });
const Nd = xt, Zo = ae, xo = Hn, Fe = {
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
    const t = Nd.basename(e);
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
const Rc = xt, we = ae, se = Hn, Ve = oa, Od = ia, vt = ca;
function Tc(e, t = we.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ve.default.isString(t))
    return Tc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : we.DEFAULT_TIMEOUT_ASYNC);
  return se.default.readFileRetry(n)(e, t);
}
rt.readFile = Tc;
function Ic(e, t = we.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ve.default.isString(t))
    return Ic(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : we.DEFAULT_TIMEOUT_SYNC);
  return se.default.readFileSyncRetry(n)(e, t);
}
rt.readFileSync = Ic;
const jc = (e, t, r, n) => {
  if (Ve.default.isFunction(r))
    return jc(e, t, we.DEFAULT_WRITE_OPTIONS, r);
  const s = Ac(e, t, r);
  return n && s.then(n, n), s;
};
rt.writeFile = jc;
const Ac = async (e, t, r = we.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ve.default.isString(r))
    return Ac(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : we.DEFAULT_TIMEOUT_ASYNC);
  let a = null, i = null, u = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), i = await Od.default.schedule(e), e = await se.default.realpathAttempt(e) || e, [c, u] = vt.default.get(e, r.tmpCreate || vt.default.create, r.tmpPurge !== !1);
    const l = we.IS_POSIX && Ve.default.isUndefined(r.chown), m = Ve.default.isUndefined(r.mode);
    if (l || m) {
      const _ = await se.default.statAttempt(e);
      _ && (r = { ...r }, l && (r.chown = { uid: _.uid, gid: _.gid }), m && (r.mode = _.mode));
    }
    const P = Rc.dirname(e);
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
}, kc = (e, t, r = we.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ve.default.isString(r))
    return kc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : we.DEFAULT_TIMEOUT_SYNC);
  let a = null, i = null, u = null;
  try {
    e = se.default.realpathSyncAttempt(e) || e, [i, a] = vt.default.get(e, r.tmpCreate || vt.default.create, r.tmpPurge !== !1);
    const c = we.IS_POSIX && Ve.default.isUndefined(r.chown), d = Ve.default.isUndefined(r.mode);
    if (c || d) {
      const m = se.default.statSyncAttempt(e);
      m && (r = { ...r }, c && (r.chown = { uid: m.uid, gid: m.gid }), d && (r.mode = m.mode));
    }
    const l = Rc.dirname(e);
    se.default.mkdirSyncAttempt(l, {
      mode: we.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), u = se.default.openSyncRetry(s)(i, "w", r.mode || we.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), Ve.default.isString(t) ? se.default.writeSyncRetry(s)(u, t, 0, r.encoding || we.DEFAULT_ENCODING) : Ve.default.isUndefined(t) || se.default.writeSyncRetry(s)(u, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? se.default.fsyncSyncRetry(s)(u) : se.default.fsyncAttempt(u)), se.default.closeSyncRetry(s)(u), u = null, r.chown && se.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && se.default.chmodSyncAttempt(i, r.mode);
    try {
      se.default.renameSyncRetry(s)(i, e);
    } catch (m) {
      if (m.code !== "ENAMETOOLONG")
        throw m;
      se.default.renameSyncRetry(s)(i, vt.default.truncate(e));
    }
    a(), i = null;
  } finally {
    u && se.default.closeSyncAttempt(u), i && vt.default.purge(i);
  }
};
rt.writeFileSync = kc;
var Ts = { exports: {} }, Cc = {}, Xe = {}, hr = {}, Wr = {}, te = {}, Gr = {};
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
    E instanceof n ? h.push(...E._items) : E instanceof r ? h.push(E) : h.push(m(E));
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
  function m(h) {
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
})(Gr);
var Is = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Gr;
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
      var l, m;
      if (!((m = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || m === void 0) && m.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: m }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${m}]`;
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
      var m;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, w = (m = l.key) !== null && m !== void 0 ? m : l.ref;
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
      const m = this._values[d];
      if (m)
        return m.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (m) => {
        if (m.scopePath === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return (0, t._)`${d}${m.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, m) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, l, m);
    }
    _reduceValues(d, l, m = {}, P) {
      let _ = t.nil;
      for (const w in d) {
        const g = d[w];
        if (!g)
          continue;
        const $ = m[w] = m[w] || /* @__PURE__ */ new Map();
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
})(Is);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Gr, r = Is;
  var n = Gr;
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
  var s = Is;
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
  class m extends a {
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
      return this._leafNode(new m(o));
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
  const D = p(e.operators.AND);
  function O(...y) {
    return y.reduce(D);
  }
  e.and = O;
  const T = p(e.operators.OR);
  function v(...y) {
    return y.reduce(T);
  }
  e.or = v;
  function p(y) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${y} ${S(f)}`;
  }
  function S(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ie = te, Rd = Gr;
function Td(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = Td;
function Id(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Dc(e, t), !Mc(t, e.self.RULES.all));
}
M.alwaysValidSchema = Id;
function Dc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Vc(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = Dc;
function Mc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = Mc;
function jd(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = jd;
function Ad({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ie._)`${r}`;
  }
  return (0, ie._)`${e}${t}${(0, ie.getProperty)(n)}`;
}
M.schemaRefOrVal = Ad;
function kd(e) {
  return Lc(decodeURIComponent(e));
}
M.unescapeFragment = kd;
function Cd(e) {
  return encodeURIComponent(la(e));
}
M.escapeFragment = Cd;
function la(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = la;
function Lc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Lc;
function Dd(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = Dd;
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
    resultToName: Fc
  }),
  items: ei({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ie._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ie._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Fc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ie._)`{}`);
  return t !== void 0 && ua(e, r, t), r;
}
M.evaluatedPropsToName = Fc;
function ua(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ie._)`${t}${(0, ie.getProperty)(n)}`, !0));
}
M.setEvaluated = ua;
const ti = {};
function Md(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: ti[t.code] || (ti[t.code] = new Rd._Code(t.code))
  });
}
M.useFunc = Md;
var js;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(js || (M.Type = js = {}));
function Ld(e, t, r) {
  if (e instanceof ie.Name) {
    const n = t === js.Num;
    return r ? n ? (0, ie._)`"[" + ${e} + "]"` : (0, ie._)`"['" + ${e} + "']"` : n ? (0, ie._)`"/" + ${e}` : (0, ie._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ie.getProperty)(e).toString() : "/" + la(e);
}
M.getErrorPath = Ld;
function Vc(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = Vc;
var ot = {};
Object.defineProperty(ot, "__esModule", { value: !0 });
const Pe = te, Fd = {
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
ot.default = Fd;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = ot;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: h }) => h ? (0, t.str)`"${$}" keyword must be ${h} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, h = e.keywordError, E, N) {
    const { it: R } = $, { gen: I, compositeRule: z, allErrors: W } = R, ue = m($, h, E);
    N ?? (z || W) ? c(I, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, h = e.keywordError, E) {
    const { it: N } = $, { gen: R, compositeRule: I, allErrors: z } = N, W = m($, h, E);
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
  function m($, h, E) {
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
})(Wr);
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.boolOrEmptySchema = hr.topBoolOrEmptySchema = void 0;
const Vd = Wr, Ud = te, zd = ot, qd = {
  message: "boolean schema is false"
};
function Kd(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Uc(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(zd.default.data) : (t.assign((0, Ud._)`${n}.errors`, null), t.return(!0));
}
hr.topBoolOrEmptySchema = Kd;
function Gd(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Uc(e)) : r.var(t, !0);
}
hr.boolOrEmptySchema = Gd;
function Uc(e, t) {
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
  (0, Vd.reportError)(s, qd, void 0, t);
}
var $e = {}, Xt = {};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.getRules = Xt.isJSONType = void 0;
const Hd = ["string", "number", "integer", "boolean", "null", "object", "array"], Wd = new Set(Hd);
function Jd(e) {
  return typeof e == "string" && Wd.has(e);
}
Xt.isJSONType = Jd;
function Bd() {
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
Xt.getRules = Bd;
var ct = {};
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.shouldUseRule = ct.shouldUseGroup = ct.schemaHasRulesForType = void 0;
function Xd({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && zc(e, n);
}
ct.schemaHasRulesForType = Xd;
function zc(e, t) {
  return t.rules.some((r) => qc(e, r));
}
ct.shouldUseGroup = zc;
function qc(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
ct.shouldUseRule = qc;
Object.defineProperty($e, "__esModule", { value: !0 });
$e.reportTypeError = $e.checkDataTypes = $e.checkDataType = $e.coerceAndCheckDataType = $e.getJSONTypes = $e.getSchemaTypes = $e.DataType = void 0;
const Yd = Xt, Qd = ct, Zd = Wr, X = te, Kc = M;
var ir;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(ir || ($e.DataType = ir = {}));
function xd(e) {
  const t = Gc(e.type);
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
$e.getSchemaTypes = xd;
function Gc(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Yd.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
$e.getJSONTypes = Gc;
function ef(e, t) {
  const { gen: r, data: n, opts: s } = e, a = tf(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Qd.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = da(t, n, s.strictNumbers, ir.Wrong);
    r.if(u, () => {
      a.length ? rf(e, t, a) : fa(e);
    });
  }
  return i;
}
$e.coerceAndCheckDataType = ef;
const Hc = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function tf(e, t) {
  return t ? e.filter((r) => Hc.has(r) || t === "array" && r === "array") : [];
}
function rf(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, X._)`typeof ${s}`), u = n.let("coerced", (0, X._)`undefined`);
  a.coerceTypes === "array" && n.if((0, X._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, X._)`${s}[0]`).assign(i, (0, X._)`typeof ${s}`).if(da(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, X._)`${u} !== undefined`);
  for (const d of r)
    (Hc.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), fa(e), n.endIf(), n.if((0, X._)`${u} !== undefined`, () => {
    n.assign(s, u), nf(e, u);
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
function nf({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, X._)`${t} !== undefined`, () => e.assign((0, X._)`${t}[${r}]`, n));
}
function As(e, t, r, n = ir.Correct) {
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
$e.checkDataType = As;
function da(e, t, r, n) {
  if (e.length === 1)
    return As(e[0], t, r, n);
  let s;
  const a = (0, Kc.toHash)(e);
  if (a.array && a.object) {
    const i = (0, X._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, X._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = X.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, X.and)(s, As(i, t, r, n));
  return s;
}
$e.checkDataTypes = da;
const sf = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, X._)`{type: ${e}}` : (0, X._)`{type: ${t}}`
};
function fa(e) {
  const t = af(e);
  (0, Zd.reportError)(t, sf);
}
$e.reportTypeError = fa;
function af(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Kc.schemaRefOrVal)(e, n, "type");
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
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.assignDefaults = void 0;
const er = te, of = M;
function cf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      ri(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => ri(e, a, s.default));
}
Wn.assignDefaults = cf;
function ri(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, er._)`${a}${(0, er.getProperty)(t)}`;
  if (s) {
    (0, of.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, er._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, er._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, er._)`${u} = ${(0, er.stringify)(r)}`);
}
var nt = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const fe = te, ha = M, ht = ot, lf = M;
function uf(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(pa(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, fe._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = uf;
function df({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, fe.or)(...n.map((a) => (0, fe.and)(pa(e, t, a, r.ownProperties), (0, fe._)`${s} = ${a}`)));
}
x.checkMissingProp = df;
function ff(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = ff;
function Wc(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, fe._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = Wc;
function ma(e, t, r) {
  return (0, fe._)`${Wc(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = ma;
function hf(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} !== undefined`;
  return n ? (0, fe._)`${s} && ${ma(e, t, r)}` : s;
}
x.propertyInData = hf;
function pa(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} === undefined`;
  return n ? (0, fe.or)(s, (0, fe.not)(ma(e, t, r))) : s;
}
x.noPropertyInData = pa;
function Jc(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = Jc;
function mf(e, t) {
  return Jc(t).filter((r) => !(0, ha.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = mf;
function pf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, fe._)`${e}, ${t}, ${n}${s}` : t, m = [
    [ht.default.instancePath, (0, fe.strConcat)(ht.default.instancePath, a)],
    [ht.default.parentData, i.parentData],
    [ht.default.parentDataProperty, i.parentDataProperty],
    [ht.default.rootData, ht.default.rootData]
  ];
  i.opts.dynamicRef && m.push([ht.default.dynamicAnchors, ht.default.dynamicAnchors]);
  const P = (0, fe._)`${l}, ${r.object(...m)}`;
  return c !== fe.nil ? (0, fe._)`${u}.call(${c}, ${P})` : (0, fe._)`${u}(${P})`;
}
x.callValidateCode = pf;
const yf = (0, fe._)`new RegExp`;
function $f({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, fe._)`${s.code === "new RegExp" ? yf : (0, lf.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = $f;
function _f(e) {
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
x.validateArray = _f;
function gf(e) {
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
x.validateUnion = gf;
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.validateKeywordUsage = nt.validSchemaType = nt.funcKeywordCode = nt.macroKeywordCode = void 0;
const Te = te, Kt = ot, vf = x, Ef = Wr;
function wf(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = Bc(r, n, u);
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
nt.macroKeywordCode = wf;
function Sf(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  Pf(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = Bc(n, s, d), m = n.let("valid");
  e.block$data(m, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : m);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && ni(e), $(() => e.error());
    else {
      const h = t.async ? _() : w();
      t.modifying && ni(e), $(() => bf(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, Te._)`await `), (E) => n.assign(m, !1).if((0, Te._)`${E} instanceof ${c.ValidationError}`, () => n.assign(h, (0, Te._)`${E}.errors`), () => n.throw(E))), h;
  }
  function w() {
    const h = (0, Te._)`${l}.errors`;
    return n.assign(h, null), g(Te.nil), h;
  }
  function g(h = t.async ? (0, Te._)`await ` : Te.nil) {
    const E = c.opts.passContext ? Kt.default.this : Kt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(m, (0, Te._)`${h}${(0, vf.callValidateCode)(e, l, E, N)}`, t.modifying);
  }
  function $(h) {
    var E;
    n.if((0, Te.not)((E = t.valid) !== null && E !== void 0 ? E : m), h);
  }
}
nt.funcKeywordCode = Sf;
function ni(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Te._)`${n.parentData}[${n.parentDataProperty}]`));
}
function bf(e, t) {
  const { gen: r } = e;
  r.if((0, Te._)`Array.isArray(${t})`, () => {
    r.assign(Kt.default.vErrors, (0, Te._)`${Kt.default.vErrors} === null ? ${t} : ${Kt.default.vErrors}.concat(${t})`).assign(Kt.default.errors, (0, Te._)`${Kt.default.vErrors}.length`), (0, Ef.extendErrors)(e);
  }, () => e.error());
}
function Pf({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Bc(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Te.stringify)(r) });
}
function Nf(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
nt.validSchemaType = Nf;
function Of({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
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
nt.validateKeywordUsage = Of;
var bt = {};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.extendSubschemaMode = bt.extendSubschemaData = bt.getSubschema = void 0;
const et = te, Xc = M;
function Rf(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
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
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Xc.escapeFragment)(r)}`
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
bt.getSubschema = Rf;
function Tf(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: m } = t, P = u.let("data", (0, et._)`${t.data}${(0, et.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, et.str)`${d}${(0, Xc.getErrorPath)(r, n, m.jsPropertySyntax)}`, e.parentDataProperty = (0, et._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
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
bt.extendSubschemaData = Tf;
function If(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
bt.extendSubschemaMode = If;
var Se = {}, Jn = function e(t, r) {
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
}, Yc = { exports: {} }, Et = Yc.exports = function(e, t, r) {
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
      var m = n[l];
      if (Array.isArray(m)) {
        if (l in Et.arrayKeywords)
          for (var P = 0; P < m.length; P++)
            wn(e, t, r, m[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in Et.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            wn(e, t, r, m[_], s + "/" + l + "/" + jf(_), a, s, l, n, _);
      } else (l in Et.keywords || e.allKeys && !(l in Et.skipKeywords)) && wn(e, t, r, m, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function jf(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Af = Yc.exports;
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.getSchemaRefs = Se.resolveUrl = Se.normalizeId = Se._getFullPath = Se.getFullPath = Se.inlineRef = void 0;
const kf = M, Cf = Jn, Df = Af, Mf = /* @__PURE__ */ new Set([
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
function Lf(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !ks(e) : t ? Qc(e) <= t : !1;
}
Se.inlineRef = Lf;
const Ff = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function ks(e) {
  for (const t in e) {
    if (Ff.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(ks) || typeof r == "object" && ks(r))
      return !0;
  }
  return !1;
}
function Qc(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Mf.has(r) && (typeof e[r] == "object" && (0, kf.eachItem)(e[r], (n) => t += Qc(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Zc(e, t = "", r) {
  r !== !1 && (t = cr(t));
  const n = e.parse(t);
  return xc(e, n);
}
Se.getFullPath = Zc;
function xc(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Se._getFullPath = xc;
const Vf = /#\/?$/;
function cr(e) {
  return e ? e.replace(Vf, "") : "";
}
Se.normalizeId = cr;
function Uf(e, t, r) {
  return r = cr(r), e.resolve(t, r);
}
Se.resolveUrl = Uf;
const zf = /^[a-z_][-a-z0-9._]*$/i;
function qf(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = cr(e[r] || t), a = { "": s }, i = Zc(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return Df(e, { allKeys: !0 }, (m, P, _, w) => {
    if (w === void 0)
      return;
    const g = i + P;
    let $ = a[w];
    typeof m[r] == "string" && ($ = h.call(this, m[r])), E.call(this, m.$anchor), E.call(this, m.$dynamicAnchor), a[P] = $;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = cr($ ? R($, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(m, I.schema, N) : N !== cr(g) && (N[0] === "#" ? (d(m, u[N], N), u[N] = m) : this.refs[N] = g), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!zf.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), u;
  function d(m, P, _) {
    if (P !== void 0 && !Cf(m, P))
      throw l(_);
  }
  function l(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
Se.getSchemaRefs = qf;
Object.defineProperty(Xe, "__esModule", { value: !0 });
Xe.getData = Xe.KeywordCxt = Xe.validateFunctionCode = void 0;
const el = hr, si = $e, ya = ct, kn = $e, Kf = Wn, Cr = nt, ds = bt, K = te, J = ot, Gf = Se, lt = M, Nr = Wr;
function Hf(e) {
  if (nl(e) && (sl(e), rl(e))) {
    Bf(e);
    return;
  }
  tl(e, () => (0, el.topBoolOrEmptySchema)(e));
}
Xe.validateFunctionCode = Hf;
function tl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${ai(r, s)}`), Jf(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${J.default.data}, ${Wf(s)}`, n.$async, () => e.code(ai(r, s)).code(a));
}
function Wf(e) {
  return (0, K._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, K._)`, ${J.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function Jf(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, K._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, K._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, K._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, K._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, K._)`""`), e.var(J.default.parentData, (0, K._)`undefined`), e.var(J.default.parentDataProperty, (0, K._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function Bf(e) {
  const { schema: t, opts: r, gen: n } = e;
  tl(e, () => {
    r.$comment && t.$comment && ol(e), xf(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && Xf(e), al(e), rh(e);
  });
}
function Xf(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function ai(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function Yf(e, t) {
  if (nl(e) && (sl(e), rl(e))) {
    Qf(e, t);
    return;
  }
  (0, el.boolOrEmptySchema)(e, t);
}
function rl({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function nl(e) {
  return typeof e.schema != "boolean";
}
function Qf(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && ol(e), eh(e), th(e);
  const a = n.const("_errs", J.default.errors);
  al(e, a), n.var(t, (0, K._)`${a} === ${J.default.errors}`);
}
function sl(e) {
  (0, lt.checkUnknownRules)(e), Zf(e);
}
function al(e, t) {
  if (e.opts.jtd)
    return oi(e, [], !1, t);
  const r = (0, si.getSchemaTypes)(e.schema), n = (0, si.coerceAndCheckDataType)(e, r);
  oi(e, r, !n, t);
}
function Zf(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, lt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function xf(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, lt.checkStrictMode)(e, "default is ignored in the schema root");
}
function eh(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Gf.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function th(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function ol({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, K.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${J.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function rh(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, K._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, J.default.vErrors), a.unevaluated && nh(e), t.return((0, K._)`${J.default.errors} === 0`));
}
function nh({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function oi(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, lt.schemaHasRulesButRef)(a, l))) {
    s.block(() => ll(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || sh(e, t), s.block(() => {
    for (const P of l.rules)
      m(P);
    m(l.post);
  });
  function m(P) {
    (0, ya.shouldUseGroup)(a, P) && (P.type ? (s.if((0, kn.checkDataType)(P.type, i, c.strictNumbers)), ii(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, kn.reportTypeError)(e)), s.endIf()) : ii(e, P), u || s.if((0, K._)`${J.default.errors} === ${n || 0}`));
  }
}
function ii(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Kf.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, ya.shouldUseRule)(n, a) && ll(e, a.keyword, a.definition, t.type);
  });
}
function sh(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (ah(e, t), e.opts.allowUnionTypes || oh(e, t), ih(e, e.dataTypes));
}
function ah(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      il(e.dataTypes, r) || $a(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), lh(e, t);
  }
}
function oh(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && $a(e, "use allowUnionTypes to allow union type keyword");
}
function ih(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, ya.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => ch(t, i)) && $a(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function ch(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function il(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function lh(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    il(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function $a(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, lt.checkStrictMode)(e, t, e.opts.strictTypes);
}
let cl = class {
  constructor(t, r, n) {
    if ((0, Cr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, lt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", ul(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Cr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Nr.reportExtraError : Nr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Nr.reportError)(this, this.def.$dataError || Nr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Nr.resetErrorsCount)(this.gen, this.errsCount);
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
        return (0, K._)`${(0, kn.checkDataTypes)(c, r, a.opts.strictNumbers, kn.DataType.Wrong)}`;
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
    const n = (0, ds.getSubschema)(this.it, t);
    (0, ds.extendSubschemaData)(n, this.it, t), (0, ds.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return Yf(s, r), s;
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
Xe.KeywordCxt = cl;
function ll(e, t, r, n) {
  const s = new cl(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Cr.funcKeywordCode)(s, r) : "macro" in r ? (0, Cr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Cr.funcKeywordCode)(s, r);
}
const uh = /^\/(?:[^~]|~0|~1)*$/, dh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function ul(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!uh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = dh.exec(e);
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
Xe.getData = ul;
var Jr = {};
Object.defineProperty(Jr, "__esModule", { value: !0 });
let fh = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
Jr.default = fh;
var $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
const fs = Se;
let hh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, fs.resolveUrl)(t, r, n), this.missingSchema = (0, fs.normalizeId)((0, fs.getFullPath)(t, this.missingRef));
  }
};
$r.default = hh;
var De = {};
Object.defineProperty(De, "__esModule", { value: !0 });
De.resolveSchema = De.getCompilingSchema = De.resolveRef = De.compileSchema = De.SchemaEnv = void 0;
const Ke = te, mh = Jr, zt = ot, Je = Se, ci = M, ph = Xe;
let Bn = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Je.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
De.SchemaEnv = Bn;
function _a(e) {
  const t = dl.call(this, e);
  if (t)
    return t;
  const r = (0, Je.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Ke.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: mh.default,
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
    this._compilations.add(e), (0, ph.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const m = i.toString();
    l = `${i.scopeRefs(zt.default.scope)}return ${m}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${zt.default.self}`, `${zt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: m, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: w, items: g } = d;
      _.evaluated = {
        props: w instanceof Ke.Name ? void 0 : w,
        items: g instanceof Ke.Name ? void 0 : g,
        dynamicProps: w instanceof Ke.Name,
        dynamicItems: g instanceof Ke.Name
      }, _.source && (_.source.evaluated = (0, Ke.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), m;
  } finally {
    this._compilations.delete(e);
  }
}
De.compileSchema = _a;
function yh(e, t, r) {
  var n;
  r = (0, Je.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = gh.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new Bn({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = $h.call(this, a);
}
De.resolveRef = yh;
function $h(e) {
  return (0, Je.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : _a.call(this, e);
}
function dl(e) {
  for (const t of this._compilations)
    if (_h(t, e))
      return t;
}
De.getCompilingSchema = dl;
function _h(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function gh(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Xn.call(this, e, t);
}
function Xn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Je._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Je.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return hs.call(this, r, e);
  const a = (0, Je.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = Xn.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : hs.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || _a.call(this, i), a === (0, Je.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Je.resolveUrl)(this.opts.uriResolver, s, d)), new Bn({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return hs.call(this, r, i);
  }
}
De.resolveSchema = Xn;
const vh = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function hs(e, { baseId: t, schema: r, root: n }) {
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
    !vh.has(u) && d && (t = (0, Je.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, ci.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Je.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Xn.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Bn({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Eh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", wh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Sh = "object", bh = [
  "$data"
], Ph = {
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
}, Nh = !1, Oh = {
  $id: Eh,
  description: wh,
  type: Sh,
  required: bh,
  properties: Ph,
  additionalProperties: Nh
};
var ga = {}, Yn = { exports: {} };
const Rh = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), fl = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function hl(e) {
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
const Th = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function li(e) {
  return e.length = 0, !0;
}
function Ih(e, t, r) {
  if (e.length) {
    const n = hl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function jh(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, u = Ih;
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
  return s.length && (u === li ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(hl(s))), r.address = n.join(""), r;
}
function ml(e) {
  if (Ah(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = jh(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function Ah(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function kh(e) {
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
function Ch(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Dh(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!fl(r)) {
      const n = ml(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var pl = {
  nonSimpleDomain: Th,
  recomposeAuthority: Dh,
  normalizeComponentEncoding: Ch,
  removeDotSegments: kh,
  isIPv4: fl,
  isUUID: Rh,
  normalizeIPv6: ml
};
const { isUUID: Mh } = pl, Lh = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function yl(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function $l(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function _l(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function Fh(e) {
  return e.secure = yl(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function Vh(e) {
  if ((e.port === (yl(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Uh(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Lh);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = va(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function zh(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = va(s);
  a && (e = a.serialize(e, t));
  const i = e, u = e.nss;
  return i.path = `${n || t.nid}:${u}`, t.skipEscape = !0, i;
}
function qh(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Mh(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function Kh(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const gl = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: $l,
    serialize: _l
  }
), Gh = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: gl.domainHost,
    parse: $l,
    serialize: _l
  }
), Sn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: Fh,
    serialize: Vh
  }
), Hh = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Sn.domainHost,
    parse: Sn.parse,
    serialize: Sn.serialize
  }
), Wh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: Uh,
    serialize: zh,
    skipNormalize: !0
  }
), Jh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: qh,
    serialize: Kh,
    skipNormalize: !0
  }
), Cn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: gl,
    https: Gh,
    ws: Sn,
    wss: Hh,
    urn: Wh,
    "urn:uuid": Jh
  }
);
Object.setPrototypeOf(Cn, null);
function va(e) {
  return e && (Cn[
    /** @type {SchemeName} */
    e
  ] || Cn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var Bh = {
  SCHEMES: Cn,
  getSchemeHandler: va
};
const { normalizeIPv6: Xh, removeDotSegments: jr, recomposeAuthority: Yh, normalizeComponentEncoding: nn, isIPv4: Qh, nonSimpleDomain: Zh } = pl, { SCHEMES: xh, getSchemeHandler: vl } = Bh;
function em(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  st(ft(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  ft(st(e, t), t)), e;
}
function tm(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = El(ft(e, n), ft(t, n), n, !0);
  return n.skipEscape = !0, st(s, n);
}
function El(e, t, r, n) {
  const s = {};
  return n || (e = ft(st(e, r), r), t = ft(st(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = jr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = jr(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = jr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = jr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function rm(e, t, r) {
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
  }, n = Object.assign({}, t), s = [], a = vl(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = Yh(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let u = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (u = jr(u)), i === void 0 && u[0] === "/" && u[1] === "/" && (u = "/%2F" + u.slice(2)), s.push(u);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const nm = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
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
  const a = e.match(nm);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (Qh(n.host) === !1) {
        const c = Xh(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = vl(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && Zh(n.host))
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
  SCHEMES: xh,
  normalize: em,
  resolve: tm,
  resolveComponent: El,
  equal: rm,
  serialize: st,
  parse: ft
};
Yn.exports = Ea;
Yn.exports.default = Ea;
Yn.exports.fastUri = Ea;
var wl = Yn.exports;
Object.defineProperty(ga, "__esModule", { value: !0 });
const Sl = wl;
Sl.code = 'require("ajv/dist/runtime/uri").default';
ga.default = Sl;
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
  const n = Jr, s = $r, a = Xt, i = De, u = te, c = Se, d = $e, l = M, m = Oh, P = ga, _ = (v, p) => new RegExp(v, p);
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
    var p, S, y, o, f, b, j, A, q, F, re, Le, Nt, Ot, Rt, Tt, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft;
    const qe = v.strict, Vt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, br = Vt === !0 || Vt === void 0 ? 1 : Vt || 0, Pr = (y = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && y !== void 0 ? y : _, us = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
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
      uriResolver: us
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: y } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: y }), this.logger = Q(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, p, "NOT SUPPORTED"), I.call(this, h, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), W.call(this), p.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: y } = this.opts;
      let o = m;
      y === "id" && (o = { ...m }, o.id = o.$id, delete o.$id), S && p && this.addMetaSchema(o, o[y], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let y;
      if (typeof p == "string") {
        if (y = this.getSchema(p), !y)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        y = this.compile(p);
      const o = y(S);
      return "$async" in y || (this.errors = y.errors), o;
    }
    compile(p, S) {
      const y = this._addSchema(p, S);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return o.call(this, p, S);
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
    addSchema(p, S, y, o = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, y, o);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, y, S, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, y = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, y), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let y;
      if (y = p.$schema, y !== void 0 && typeof y != "string")
        throw new Error("$schema must be a string");
      if (y = y || this.opts.defaultMeta || this.defaultMeta(), !y)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate(y, p);
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
    getSchema(p) {
      let S;
      for (; typeof (S = z.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: y } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: y });
        if (S = i.resolveSchema.call(this, o, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = z.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let y = p[this.opts.schemaId];
          return y && (y = (0, c.normalizeId)(y), delete this.schemas[y], delete this.refs[y]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let y;
      if (typeof p == "string")
        y = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = y);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, y = S.keyword, Array.isArray(y) && !y.length)
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
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const y of S.rules) {
        const o = y.rules.findIndex((f) => f.keyword === p);
        o >= 0 && y.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: y = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((o) => `${y}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(p, S) {
      const y = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let b = p;
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
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const y in p) {
        const o = p[y];
        (!S || S.test(y)) && (typeof o == "string" ? delete p[y] : o && !o.meta && (this._cache.delete(o.schema), delete p[y]));
      }
    }
    _addSchema(p, S, y, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: j } = this.opts;
      if (typeof p == "object")
        b = p[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      y = (0, c.normalizeId)(b || y);
      const q = c.getSchemaRefs.call(this, p, y);
      return A = new i.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), o && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : i.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(v, p, S, y = "error") {
    for (const o in v) {
      const f = o;
      f in p && this.logger[y](`${S}: option ${o}. ${v[f]}`);
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
        for (const p in v)
          this.addSchema(v[p], p);
  }
  function ue() {
    for (const v in this.opts.formats) {
      const p = this.opts.formats[v];
      p && this.addFormat(v, p);
    }
  }
  function V(v) {
    if (Array.isArray(v)) {
      this.addVocabulary(v);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in v) {
      const S = v[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function H() {
    const v = { ...this.opts };
    for (const p of w)
      delete v[p];
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
  function C(v, p) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(v, (y) => {
      if (S.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var y;
    const o = p == null ? void 0 : p.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = o ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[v] = !0, !p)
      return;
    const j = {
      keyword: v,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? U.call(this, b, j, p.before) : b.rules.push(j), f.all[v] = j, (y = p.implements) === null || y === void 0 || y.forEach((A) => this.addKeyword(A));
  }
  function U(v, p, S) {
    const y = v.rules.findIndex((o) => o.keyword === S);
    y >= 0 ? v.rules.splice(y, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = T(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(Cc);
var wa = {}, Sa = {}, ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
const sm = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ba.default = sm;
var Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.callRef = Yt.getValidate = void 0;
const am = $r, ui = x, ke = te, tr = ot, di = De, sn = M, om = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const l = di.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new am.default(n.opts.uriResolver, s, r);
    if (l instanceof di.SchemaEnv)
      return P(l);
    return _(l);
    function m() {
      if (a === d)
        return bn(e, i, a, a.$async);
      const w = t.scopeValue("root", { ref: d });
      return bn(e, (0, ke._)`${w}.validate`, d, d.$async);
    }
    function P(w) {
      const g = bl(e, w);
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
function bl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, ke._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Yt.getValidate = bl;
function bn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? tr.default.this : ke.nil;
  n ? l() : m();
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
  function m() {
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
Yt.default = om;
Object.defineProperty(Sa, "__esModule", { value: !0 });
const im = ba, cm = Yt, lm = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  im.default,
  cm.default
];
Sa.default = lm;
var Pa = {}, Na = {};
Object.defineProperty(Na, "__esModule", { value: !0 });
const Dn = te, mt = Dn.operators, Mn = {
  maximum: { okStr: "<=", ok: mt.LTE, fail: mt.GT },
  minimum: { okStr: ">=", ok: mt.GTE, fail: mt.LT },
  exclusiveMaximum: { okStr: "<", ok: mt.LT, fail: mt.GTE },
  exclusiveMinimum: { okStr: ">", ok: mt.GT, fail: mt.LTE }
}, um = {
  message: ({ keyword: e, schemaCode: t }) => (0, Dn.str)`must be ${Mn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Dn._)`{comparison: ${Mn[e].okStr}, limit: ${t}}`
}, dm = {
  keyword: Object.keys(Mn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: um,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Dn._)`${r} ${Mn[t].fail} ${n} || isNaN(${r})`);
  }
};
Na.default = dm;
var Oa = {};
Object.defineProperty(Oa, "__esModule", { value: !0 });
const Dr = te, fm = {
  message: ({ schemaCode: e }) => (0, Dr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Dr._)`{multipleOf: ${e}}`
}, hm = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: fm,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Dr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Dr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Dr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Oa.default = hm;
var Ra = {}, Ta = {};
Object.defineProperty(Ta, "__esModule", { value: !0 });
function Pl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ta.default = Pl;
Pl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ra, "__esModule", { value: !0 });
const Gt = te, mm = M, pm = Ta, ym = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Gt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Gt._)`{limit: ${e}}`
}, $m = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: ym,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Gt.operators.GT : Gt.operators.LT, i = s.opts.unicode === !1 ? (0, Gt._)`${r}.length` : (0, Gt._)`${(0, mm.useFunc)(e.gen, pm.default)}(${r})`;
    e.fail$data((0, Gt._)`${i} ${a} ${n}`);
  }
};
Ra.default = $m;
var Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
const _m = x, Ln = te, gm = {
  message: ({ schemaCode: e }) => (0, Ln.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Ln._)`{pattern: ${e}}`
}, vm = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: gm,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Ln._)`(new RegExp(${s}, ${i}))` : (0, _m.usePattern)(e, n);
    e.fail$data((0, Ln._)`!${u}.test(${t})`);
  }
};
Ia.default = vm;
var ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
const Mr = te, Em = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Mr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Mr._)`{limit: ${e}}`
}, wm = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Em,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Mr.operators.GT : Mr.operators.LT;
    e.fail$data((0, Mr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
ja.default = wm;
var Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const Or = x, Lr = te, Sm = M, bm = {
  message: ({ params: { missingProperty: e } }) => (0, Lr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Lr._)`{missingProperty: ${e}}`
}, Pm = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: bm,
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
          (0, Sm.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Lr.nil, m);
      else
        for (const _ of r)
          (0, Or.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const w = t.let("valid", !0);
        e.block$data(w, () => P(_, w)), e.ok(w);
      } else
        t.if((0, Or.checkMissingProp)(e, r, _)), (0, Or.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Or.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, w) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(w, (0, Or.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Lr.not)(w), () => {
          e.error(), t.break();
        });
      }, Lr.nil);
    }
  }
};
Aa.default = Pm;
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const Fr = te, Nm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Fr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Fr._)`{limit: ${e}}`
}, Om = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Nm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Fr.operators.GT : Fr.operators.LT;
    e.fail$data((0, Fr._)`${r}.length ${s} ${n}`);
  }
};
ka.default = Om;
var Ca = {}, Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
const Nl = Jn;
Nl.code = 'require("ajv/dist/runtime/equal").default';
Br.default = Nl;
Object.defineProperty(Ca, "__esModule", { value: !0 });
const ms = $e, ve = te, Rm = M, Tm = Br, Im = {
  message: ({ params: { i: e, j: t } }) => (0, ve.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, ve._)`{i: ${e}, j: ${t}}`
}, jm = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Im,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, ms.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, ve._)`${i} === false`), e.ok(c);
    function l() {
      const w = t.let("i", (0, ve._)`${r}.length`), g = t.let("j");
      e.setParams({ i: w, j: g }), t.assign(c, !0), t.if((0, ve._)`${w} > 1`, () => (m() ? P : _)(w, g));
    }
    function m() {
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
      const $ = (0, Rm.useFunc)(t, Tm.default), h = t.name("outer");
      t.label(h).for((0, ve._)`;${w}--;`, () => t.for((0, ve._)`${g} = ${w}; ${g}--;`, () => t.if((0, ve._)`${$}(${r}[${w}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
Ca.default = jm;
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const Cs = te, Am = M, km = Br, Cm = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Cs._)`{allowedValue: ${e}}`
}, Dm = {
  keyword: "const",
  $data: !0,
  error: Cm,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Cs._)`!${(0, Am.useFunc)(t, km.default)}(${r}, ${s})`) : e.fail((0, Cs._)`${a} !== ${r}`);
  }
};
Da.default = Dm;
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const Ar = te, Mm = M, Lm = Br, Fm = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Ar._)`{allowedValues: ${e}}`
}, Vm = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Fm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, Mm.useFunc)(t, Lm.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Ar.or)(...s.map((w, g) => P(_, g)));
    }
    e.pass(l);
    function m() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Ar._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, w) {
      const g = s[w];
      return typeof g == "object" && g !== null ? (0, Ar._)`${d()}(${r}, ${_}[${w}])` : (0, Ar._)`${r} === ${g}`;
    }
  }
};
Ma.default = Vm;
Object.defineProperty(Pa, "__esModule", { value: !0 });
const Um = Na, zm = Oa, qm = Ra, Km = Ia, Gm = ja, Hm = Aa, Wm = ka, Jm = Ca, Bm = Da, Xm = Ma, Ym = [
  // number
  Um.default,
  zm.default,
  // string
  qm.default,
  Km.default,
  // object
  Gm.default,
  Hm.default,
  // array
  Wm.default,
  Jm.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Bm.default,
  Xm.default
];
Pa.default = Ym;
var La = {}, _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.validateAdditionalItems = void 0;
const Ht = te, Ds = M, Qm = {
  message: ({ params: { len: e } }) => (0, Ht.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ht._)`{limit: ${e}}`
}, Zm = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Qm,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ds.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Ol(e, n);
  }
};
function Ol(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Ht._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Ht._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ds.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Ht._)`${u} <= ${t.length}`);
    r.if((0, Ht.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Ds.Type.Num }, d), i.allErrors || r.if((0, Ht.not)(d), () => r.break());
    });
  }
}
_r.validateAdditionalItems = Ol;
_r.default = Zm;
var Fa = {}, gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.validateTuple = void 0;
const fi = te, Pn = M, xm = x, ep = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Rl(e, "additionalItems", t);
    r.items = !0, !(0, Pn.alwaysValidSchema)(r, t) && e.ok((0, xm.validateArray)(e));
  }
};
function Rl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Pn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, fi._)`${a}.length`);
  r.forEach((m, P) => {
    (0, Pn.alwaysValidSchema)(u, m) || (n.if((0, fi._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(m) {
    const { opts: P, errSchemaPath: _ } = u, w = r.length, g = w === m.minItems && (w === m.maxItems || m[t] === !1);
    if (P.strictTuples && !g) {
      const $ = `"${i}" is ${w}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Pn.checkStrictMode)(u, $, P.strictTuples);
    }
  }
}
gr.validateTuple = Rl;
gr.default = ep;
Object.defineProperty(Fa, "__esModule", { value: !0 });
const tp = gr, rp = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, tp.validateTuple)(e, "items")
};
Fa.default = rp;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const hi = te, np = M, sp = x, ap = _r, op = {
  message: ({ params: { len: e } }) => (0, hi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, hi._)`{limit: ${e}}`
}, ip = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: op,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, np.alwaysValidSchema)(n, t) && (s ? (0, ap.validateAdditionalItems)(e, s) : e.ok((0, sp.validateArray)(e)));
  }
};
Va.default = ip;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const Ue = te, an = M, cp = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ue.str)`must contain at least ${e} valid item(s)` : (0, Ue.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ue._)`{minContains: ${e}}` : (0, Ue._)`{minContains: ${e}, maxContains: ${t}}`
}, lp = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: cp,
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
    const m = t.name("valid");
    u === void 0 && i === 1 ? _(m, () => t.if(m, () => t.break())) : i === 0 ? (t.let(m, !0), u !== void 0 && t.if((0, Ue._)`${s}.length > 0`, P)) : (t.let(m, !1), P()), e.result(m, () => e.reset());
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
      t.code((0, Ue._)`${g}++`), u === void 0 ? t.if((0, Ue._)`${g} >= ${i}`, () => t.assign(m, !0).break()) : (t.if((0, Ue._)`${g} > ${u}`, () => t.assign(m, !1).break()), i === 1 ? t.assign(m, !0) : t.if((0, Ue._)`${g} >= ${i}`, () => t.assign(m, !0)));
    }
  }
};
Ua.default = lp;
var Tl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = M, n = x;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const m = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${m} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: m } }) => (0, t._)`{property: ${c},
    missingProperty: ${m},
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
    for (const m in c) {
      if (m === "__proto__")
        continue;
      const P = Array.isArray(c[m]) ? d : l;
      P[m] = c[m];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: m, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const w in d) {
      const g = d[w];
      if (g.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, m, w, P.opts.ownProperties);
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
    const { gen: l, data: m, keyword: P, it: _ } = c, w = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, m, g, _.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: P, schemaProp: g }, w);
          c.mergeValidEvaluated($, w);
        },
        () => l.var(w, !0)
        // TODO var
      ), c.ok(w));
  }
  e.validateSchemaDeps = u, e.default = s;
})(Tl);
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Il = te, up = M, dp = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Il._)`{propertyName: ${e.propertyName}}`
}, fp = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: dp,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, up.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Il.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
za.default = fp;
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
const on = x, He = te, hp = ot, cn = M, mp = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, He._)`{additionalProperty: ${e.additionalProperty}}`
}, pp = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: mp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, cn.alwaysValidSchema)(i, r))
      return;
    const d = (0, on.allSchemaProperties)(n.properties), l = (0, on.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, He._)`${a} === ${hp.default.errors}`);
    function m() {
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
Qn.default = pp;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const yp = Xe, mi = x, ps = M, pi = Qn, $p = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && pi.default.code(new yp.KeywordCxt(a, pi.default, "additionalProperties"));
    const i = (0, mi.allSchemaProperties)(r);
    for (const m of i)
      a.definedProperties.add(m);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = ps.mergeEvaluated.props(t, (0, ps.toHash)(i), a.props));
    const u = i.filter((m) => !(0, ps.alwaysValidSchema)(a, r[m]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const m of u)
      d(m) ? l(m) : (t.if((0, mi.propertyInData)(t, s, m, a.opts.ownProperties)), l(m), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(c);
    function d(m) {
      return a.opts.useDefaults && !a.compositeRule && r[m].default !== void 0;
    }
    function l(m) {
      e.subschema({
        keyword: "properties",
        schemaProp: m,
        dataProp: m
      }, c);
    }
  }
};
qa.default = $p;
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const yi = x, ln = te, $i = M, _i = M, _p = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, yi.allSchemaProperties)(r), c = u.filter((g) => (0, $i.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof ln.Name) && (a.props = (0, _i.evaluatedPropsToName)(t, a.props));
    const { props: m } = a;
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
          }, l), a.opts.unevaluated && m !== !0 ? t.assign((0, ln._)`${m}[${$}]`, !0) : !h && !a.allErrors && t.if((0, ln.not)(l), () => t.break());
        });
      });
    }
  }
};
Ka.default = _p;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const gp = M, vp = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, gp.alwaysValidSchema)(n, r)) {
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
Ga.default = vp;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const Ep = x, wp = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Ep.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ha.default = wp;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const Nn = te, Sp = M, bp = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Nn._)`{passingSchemas: ${e.passing}}`
}, Pp = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: bp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, m) => {
        let P;
        (0, Sp.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, c), m > 0 && t.if((0, Nn._)`${c} && ${i}`).assign(i, !1).assign(u, (0, Nn._)`[${u}, ${m}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, m), P && e.mergeEvaluated(P, Nn.Name);
        });
      });
    }
  }
};
Wa.default = Pp;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Np = M, Op = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Np.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Ja.default = Op;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const Fn = te, jl = M, Rp = {
  message: ({ params: e }) => (0, Fn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Fn._)`{failingKeyword: ${e.ifClause}}`
}, Tp = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Rp,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, jl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = gi(n, "then"), a = gi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Fn.not)(u), d("else"));
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
    function d(l, m) {
      return () => {
        const P = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(P, i), m ? t.assign(m, (0, Fn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function gi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, jl.alwaysValidSchema)(e, r);
}
Ba.default = Tp;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Ip = M, jp = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Ip.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Xa.default = jp;
Object.defineProperty(La, "__esModule", { value: !0 });
const Ap = _r, kp = Fa, Cp = gr, Dp = Va, Mp = Ua, Lp = Tl, Fp = za, Vp = Qn, Up = qa, zp = Ka, qp = Ga, Kp = Ha, Gp = Wa, Hp = Ja, Wp = Ba, Jp = Xa;
function Bp(e = !1) {
  const t = [
    // any
    qp.default,
    Kp.default,
    Gp.default,
    Hp.default,
    Wp.default,
    Jp.default,
    // object
    Fp.default,
    Vp.default,
    Lp.default,
    Up.default,
    zp.default
  ];
  return e ? t.push(kp.default, Dp.default) : t.push(Ap.default, Cp.default), t.push(Mp.default), t;
}
La.default = Bp;
var Ya = {}, Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const pe = te, Xp = {
  message: ({ schemaCode: e }) => (0, pe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, pe._)`{format: ${e}}`
}, Yp = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Xp,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: m } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const w = r.scopeValue("formats", {
        ref: m.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, pe._)`${w}[${i}]`), $ = r.let("fType"), h = r.let("format");
      r.if((0, pe._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign($, (0, pe._)`${g}.type || "string"`).assign(h, (0, pe._)`${g}.validate`), () => r.assign($, (0, pe._)`"string"`).assign(h, g)), e.fail$data((0, pe.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? pe.nil : (0, pe._)`${i} && !${h}`;
      }
      function N() {
        const R = l.$async ? (0, pe._)`(${g}.async ? await ${h}(${n}) : ${h}(${n}))` : (0, pe._)`${h}(${n})`, I = (0, pe._)`(typeof ${h} == "function" ? ${R} : ${h}.test(${n}))`;
        return (0, pe._)`${h} && ${h} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function _() {
      const w = m.formats[a];
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
          m.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, pe.regexpCode)(I) : c.code.formats ? (0, pe._)`${c.code.formats}${(0, pe.getProperty)(a)}` : void 0, W = r.scopeValue("formats", { key: a, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, pe._)`${W}.validate`] : ["string", I, W];
      }
      function R() {
        if (typeof w == "object" && !(w instanceof RegExp) && w.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, pe._)`await ${h}(${n})`;
        }
        return typeof $ == "function" ? (0, pe._)`${h}(${n})` : (0, pe._)`${h}.test(${n})`;
      }
    }
  }
};
Qa.default = Yp;
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Qp = Qa, Zp = [Qp.default];
Ya.default = Zp;
var mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.contentVocabulary = mr.metadataVocabulary = void 0;
mr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
mr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(wa, "__esModule", { value: !0 });
const xp = Sa, ey = Pa, ty = La, ry = Ya, vi = mr, ny = [
  xp.default,
  ey.default,
  (0, ty.default)(),
  ry.default,
  vi.metadataVocabulary,
  vi.contentVocabulary
];
wa.default = ny;
var Za = {}, Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.DiscrError = void 0;
var Ei;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ei || (Zn.DiscrError = Ei = {}));
Object.defineProperty(Za, "__esModule", { value: !0 });
const sr = te, Ms = Zn, wi = De, sy = $r, ay = M, oy = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ms.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, sr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, iy = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: oy,
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
    t.if((0, sr._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Ms.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const w in _)
        t.elseIf((0, sr._)`${d} === ${w}`), t.assign(c, m(_[w]));
      t.else(), e.error(!1, { discrError: Ms.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function m(_) {
      const w = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, w);
      return e.mergeEvaluated(g, sr.Name), w;
    }
    function P() {
      var _;
      const w = {}, g = h(s);
      let $ = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, ay.schemaHasRulesButRef)(I, a.self.RULES)) {
          const W = I.$ref;
          if (I = wi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), I instanceof wi.SchemaEnv && (I = I.schema), I === void 0)
            throw new sy.default(a.opts.uriResolver, a.baseId, W);
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
Za.default = iy;
const cy = "http://json-schema.org/draft-07/schema#", ly = "http://json-schema.org/draft-07/schema#", uy = "Core schema meta-schema", dy = {
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
}, fy = [
  "object",
  "boolean"
], hy = {
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
}, my = {
  $schema: cy,
  $id: ly,
  title: uy,
  definitions: dy,
  type: fy,
  properties: hy,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Cc, n = wa, s = Za, a = my, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
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
  var m = Jr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var P = $r;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Ts, Ts.exports);
var py = Ts.exports, Ls = { exports: {} }, Al = {};
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
    "date-time": t(m, P),
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
  function m(V) {
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
})(Al);
var kl = {}, Fs = { exports: {} }, Cl = {}, Ye = {}, pr = {}, Xr = {}, Z = {}, Hr = {};
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
    E instanceof n ? h.push(...E._items) : E instanceof r ? h.push(E) : h.push(m(E));
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
  function m(h) {
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
var Vs = {};
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
      var l, m;
      if (!((m = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || m === void 0) && m.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: m }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${m}]`;
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
      var m;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, w = (m = l.key) !== null && m !== void 0 ? m : l.ref;
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
      const m = this._values[d];
      if (m)
        return m.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (m) => {
        if (m.scopePath === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return (0, t._)`${d}${m.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, m) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, l, m);
    }
    _reduceValues(d, l, m = {}, P) {
      let _ = t.nil;
      for (const w in d) {
        const g = d[w];
        if (!g)
          continue;
        const $ = m[w] = m[w] || /* @__PURE__ */ new Map();
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
})(Vs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Hr, r = Vs;
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
  var s = Vs;
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
  class m extends a {
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
      return this._leafNode(new m(o));
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
  const D = p(e.operators.AND);
  function O(...y) {
    return y.reduce(D);
  }
  e.and = O;
  const T = p(e.operators.OR);
  function v(...y) {
    return y.reduce(T);
  }
  e.or = v;
  function p(y) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${y} ${S(f)}`;
  }
  function S(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const ce = Z, yy = Hr;
function $y(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = $y;
function _y(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Dl(e, t), !Ml(t, e.self.RULES.all));
}
L.alwaysValidSchema = _y;
function Dl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Vl(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = Dl;
function Ml(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = Ml;
function gy(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = gy;
function vy({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
L.schemaRefOrVal = vy;
function Ey(e) {
  return Ll(decodeURIComponent(e));
}
L.unescapeFragment = Ey;
function wy(e) {
  return encodeURIComponent(xa(e));
}
L.escapeFragment = wy;
function xa(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = xa;
function Ll(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = Ll;
function Sy(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = Sy;
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
    resultToName: Fl
  }),
  items: Si({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Fl(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && eo(e, r, t), r;
}
L.evaluatedPropsToName = Fl;
function eo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
L.setEvaluated = eo;
const bi = {};
function by(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: bi[t.code] || (bi[t.code] = new yy._Code(t.code))
  });
}
L.useFunc = by;
var Us;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Us || (L.Type = Us = {}));
function Py(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === Us.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + xa(e);
}
L.getErrorPath = Py;
function Vl(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = Vl;
var it = {};
Object.defineProperty(it, "__esModule", { value: !0 });
const Ne = Z, Ny = {
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
it.default = Ny;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = it;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: h }) => h ? (0, t.str)`"${$}" keyword must be ${h} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, h = e.keywordError, E, N) {
    const { it: R } = $, { gen: I, compositeRule: z, allErrors: W } = R, ue = m($, h, E);
    N ?? (z || W) ? c(I, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, h = e.keywordError, E) {
    const { it: N } = $, { gen: R, compositeRule: I, allErrors: z } = N, W = m($, h, E);
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
  function m($, h, E) {
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
})(Xr);
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.boolOrEmptySchema = pr.topBoolOrEmptySchema = void 0;
const Oy = Xr, Ry = Z, Ty = it, Iy = {
  message: "boolean schema is false"
};
function jy(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Ul(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(Ty.default.data) : (t.assign((0, Ry._)`${n}.errors`, null), t.return(!0));
}
pr.topBoolOrEmptySchema = jy;
function Ay(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Ul(e)) : r.var(t, !0);
}
pr.boolOrEmptySchema = Ay;
function Ul(e, t) {
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
  (0, Oy.reportError)(s, Iy, void 0, t);
}
var _e = {}, Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.getRules = Qt.isJSONType = void 0;
const ky = ["string", "number", "integer", "boolean", "null", "object", "array"], Cy = new Set(ky);
function Dy(e) {
  return typeof e == "string" && Cy.has(e);
}
Qt.isJSONType = Dy;
function My() {
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
Qt.getRules = My;
var ut = {};
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.shouldUseRule = ut.shouldUseGroup = ut.schemaHasRulesForType = void 0;
function Ly({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && zl(e, n);
}
ut.schemaHasRulesForType = Ly;
function zl(e, t) {
  return t.rules.some((r) => ql(e, r));
}
ut.shouldUseGroup = zl;
function ql(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
ut.shouldUseRule = ql;
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.reportTypeError = _e.checkDataTypes = _e.checkDataType = _e.coerceAndCheckDataType = _e.getJSONTypes = _e.getSchemaTypes = _e.DataType = void 0;
const Fy = Qt, Vy = ut, Uy = Xr, Y = Z, Kl = L;
var lr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(lr || (_e.DataType = lr = {}));
function zy(e) {
  const t = Gl(e.type);
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
_e.getSchemaTypes = zy;
function Gl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Fy.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
_e.getJSONTypes = Gl;
function qy(e, t) {
  const { gen: r, data: n, opts: s } = e, a = Ky(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Vy.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = to(t, n, s.strictNumbers, lr.Wrong);
    r.if(u, () => {
      a.length ? Gy(e, t, a) : ro(e);
    });
  }
  return i;
}
_e.coerceAndCheckDataType = qy;
const Hl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Ky(e, t) {
  return t ? e.filter((r) => Hl.has(r) || t === "array" && r === "array") : [];
}
function Gy(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, Y._)`typeof ${s}`), u = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(i, (0, Y._)`typeof ${s}`).if(to(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, Y._)`${u} !== undefined`);
  for (const d of r)
    (Hl.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), ro(e), n.endIf(), n.if((0, Y._)`${u} !== undefined`, () => {
    n.assign(s, u), Hy(e, u);
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
function Hy({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function zs(e, t, r, n = lr.Correct) {
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
_e.checkDataType = zs;
function to(e, t, r, n) {
  if (e.length === 1)
    return zs(e[0], t, r, n);
  let s;
  const a = (0, Kl.toHash)(e);
  if (a.array && a.object) {
    const i = (0, Y._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, Y._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Y.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, Y.and)(s, zs(i, t, r, n));
  return s;
}
_e.checkDataTypes = to;
const Wy = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function ro(e) {
  const t = Jy(e);
  (0, Uy.reportError)(t, Wy);
}
_e.reportTypeError = ro;
function Jy(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Kl.schemaRefOrVal)(e, n, "type");
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
var xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.assignDefaults = void 0;
const rr = Z, By = L;
function Xy(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Pi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Pi(e, a, s.default));
}
xn.assignDefaults = Xy;
function Pi(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, rr._)`${a}${(0, rr.getProperty)(t)}`;
  if (s) {
    (0, By.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, rr._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, rr._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, rr._)`${u} = ${(0, rr.stringify)(r)}`);
}
var at = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const he = Z, no = L, pt = it, Yy = L;
function Qy(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(ao(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = Qy;
function Zy({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(ao(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
ee.checkMissingProp = Zy;
function xy(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = xy;
function Wl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = Wl;
function so(e, t, r) {
  return (0, he._)`${Wl(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = so;
function e$(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${so(e, t, r)}` : s;
}
ee.propertyInData = e$;
function ao(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(so(e, t, r))) : s;
}
ee.noPropertyInData = ao;
function Jl(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = Jl;
function t$(e, t) {
  return Jl(t).filter((r) => !(0, no.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = t$;
function r$({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, m = [
    [pt.default.instancePath, (0, he.strConcat)(pt.default.instancePath, a)],
    [pt.default.parentData, i.parentData],
    [pt.default.parentDataProperty, i.parentDataProperty],
    [pt.default.rootData, pt.default.rootData]
  ];
  i.opts.dynamicRef && m.push([pt.default.dynamicAnchors, pt.default.dynamicAnchors]);
  const P = (0, he._)`${l}, ${r.object(...m)}`;
  return c !== he.nil ? (0, he._)`${u}.call(${c}, ${P})` : (0, he._)`${u}(${P})`;
}
ee.callValidateCode = r$;
const n$ = (0, he._)`new RegExp`;
function s$({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? n$ : (0, Yy.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = s$;
function a$(e) {
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
ee.validateArray = a$;
function o$(e) {
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
ee.validateUnion = o$;
Object.defineProperty(at, "__esModule", { value: !0 });
at.validateKeywordUsage = at.validSchemaType = at.funcKeywordCode = at.macroKeywordCode = void 0;
const Ie = Z, Wt = it, i$ = ee, c$ = Xr;
function l$(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = Bl(r, n, u);
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
at.macroKeywordCode = l$;
function u$(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  f$(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = Bl(n, s, d), m = n.let("valid");
  e.block$data(m, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : m);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && Ni(e), $(() => e.error());
    else {
      const h = t.async ? _() : w();
      t.modifying && Ni(e), $(() => d$(e, h));
    }
  }
  function _() {
    const h = n.let("ruleErrs", null);
    return n.try(() => g((0, Ie._)`await `), (E) => n.assign(m, !1).if((0, Ie._)`${E} instanceof ${c.ValidationError}`, () => n.assign(h, (0, Ie._)`${E}.errors`), () => n.throw(E))), h;
  }
  function w() {
    const h = (0, Ie._)`${l}.errors`;
    return n.assign(h, null), g(Ie.nil), h;
  }
  function g(h = t.async ? (0, Ie._)`await ` : Ie.nil) {
    const E = c.opts.passContext ? Wt.default.this : Wt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(m, (0, Ie._)`${h}${(0, i$.callValidateCode)(e, l, E, N)}`, t.modifying);
  }
  function $(h) {
    var E;
    n.if((0, Ie.not)((E = t.valid) !== null && E !== void 0 ? E : m), h);
  }
}
at.funcKeywordCode = u$;
function Ni(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ie._)`${n.parentData}[${n.parentDataProperty}]`));
}
function d$(e, t) {
  const { gen: r } = e;
  r.if((0, Ie._)`Array.isArray(${t})`, () => {
    r.assign(Wt.default.vErrors, (0, Ie._)`${Wt.default.vErrors} === null ? ${t} : ${Wt.default.vErrors}.concat(${t})`).assign(Wt.default.errors, (0, Ie._)`${Wt.default.vErrors}.length`), (0, c$.extendErrors)(e);
  }, () => e.error());
}
function f$({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Bl(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ie.stringify)(r) });
}
function h$(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
at.validSchemaType = h$;
function m$({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
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
at.validateKeywordUsage = m$;
var Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.extendSubschemaMode = Pt.extendSubschemaData = Pt.getSubschema = void 0;
const tt = Z, Xl = L;
function p$(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
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
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Xl.escapeFragment)(r)}`
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
Pt.getSubschema = p$;
function y$(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: m } = t, P = u.let("data", (0, tt._)`${t.data}${(0, tt.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, tt.str)`${d}${(0, Xl.getErrorPath)(r, n, m.jsPropertySyntax)}`, e.parentDataProperty = (0, tt._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
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
Pt.extendSubschemaData = y$;
function $$(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Pt.extendSubschemaMode = $$;
var be = {}, Yl = { exports: {} }, wt = Yl.exports = function(e, t, r) {
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
      var m = n[l];
      if (Array.isArray(m)) {
        if (l in wt.arrayKeywords)
          for (var P = 0; P < m.length; P++)
            On(e, t, r, m[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in wt.propsKeywords) {
        if (m && typeof m == "object")
          for (var _ in m)
            On(e, t, r, m[_], s + "/" + l + "/" + _$(_), a, s, l, n, _);
      } else (l in wt.keywords || e.allKeys && !(l in wt.skipKeywords)) && On(e, t, r, m, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function _$(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var g$ = Yl.exports;
Object.defineProperty(be, "__esModule", { value: !0 });
be.getSchemaRefs = be.resolveUrl = be.normalizeId = be._getFullPath = be.getFullPath = be.inlineRef = void 0;
const v$ = L, E$ = Jn, w$ = g$, S$ = /* @__PURE__ */ new Set([
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
function b$(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !qs(e) : t ? Ql(e) <= t : !1;
}
be.inlineRef = b$;
const P$ = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function qs(e) {
  for (const t in e) {
    if (P$.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(qs) || typeof r == "object" && qs(r))
      return !0;
  }
  return !1;
}
function Ql(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !S$.has(r) && (typeof e[r] == "object" && (0, v$.eachItem)(e[r], (n) => t += Ql(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Zl(e, t = "", r) {
  r !== !1 && (t = ur(t));
  const n = e.parse(t);
  return xl(e, n);
}
be.getFullPath = Zl;
function xl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
be._getFullPath = xl;
const N$ = /#\/?$/;
function ur(e) {
  return e ? e.replace(N$, "") : "";
}
be.normalizeId = ur;
function O$(e, t, r) {
  return r = ur(r), e.resolve(t, r);
}
be.resolveUrl = O$;
const R$ = /^[a-z_][-a-z0-9._]*$/i;
function T$(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = ur(e[r] || t), a = { "": s }, i = Zl(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return w$(e, { allKeys: !0 }, (m, P, _, w) => {
    if (w === void 0)
      return;
    const g = i + P;
    let $ = a[w];
    typeof m[r] == "string" && ($ = h.call(this, m[r])), E.call(this, m.$anchor), E.call(this, m.$dynamicAnchor), a[P] = $;
    function h(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = ur($ ? R($, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(m, I.schema, N) : N !== ur(g) && (N[0] === "#" ? (d(m, u[N], N), u[N] = m) : this.refs[N] = g), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!R$.test(N))
          throw new Error(`invalid anchor "${N}"`);
        h.call(this, `#${N}`);
      }
    }
  }), u;
  function d(m, P, _) {
    if (P !== void 0 && !E$(m, P))
      throw l(_);
  }
  function l(m) {
    return new Error(`reference "${m}" resolves to more than one schema`);
  }
}
be.getSchemaRefs = T$;
Object.defineProperty(Ye, "__esModule", { value: !0 });
Ye.getData = Ye.KeywordCxt = Ye.validateFunctionCode = void 0;
const eu = pr, Oi = _e, oo = ut, Vn = _e, I$ = xn, Vr = at, ys = Pt, G = Z, B = it, j$ = be, dt = L, Rr = Xr;
function A$(e) {
  if (nu(e) && (su(e), ru(e))) {
    D$(e);
    return;
  }
  tu(e, () => (0, eu.topBoolOrEmptySchema)(e));
}
Ye.validateFunctionCode = A$;
function tu({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${B.default.data}, ${B.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${Ri(r, s)}`), C$(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${B.default.data}, ${k$(s)}`, n.$async, () => e.code(Ri(r, s)).code(a));
}
function k$(e) {
  return (0, G._)`{${B.default.instancePath}="", ${B.default.parentData}, ${B.default.parentDataProperty}, ${B.default.rootData}=${B.default.data}${e.dynamicRef ? (0, G._)`, ${B.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function C$(e, t) {
  e.if(B.default.valCxt, () => {
    e.var(B.default.instancePath, (0, G._)`${B.default.valCxt}.${B.default.instancePath}`), e.var(B.default.parentData, (0, G._)`${B.default.valCxt}.${B.default.parentData}`), e.var(B.default.parentDataProperty, (0, G._)`${B.default.valCxt}.${B.default.parentDataProperty}`), e.var(B.default.rootData, (0, G._)`${B.default.valCxt}.${B.default.rootData}`), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, G._)`${B.default.valCxt}.${B.default.dynamicAnchors}`);
  }, () => {
    e.var(B.default.instancePath, (0, G._)`""`), e.var(B.default.parentData, (0, G._)`undefined`), e.var(B.default.parentDataProperty, (0, G._)`undefined`), e.var(B.default.rootData, B.default.data), t.dynamicRef && e.var(B.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function D$(e) {
  const { schema: t, opts: r, gen: n } = e;
  tu(e, () => {
    r.$comment && t.$comment && ou(e), U$(e), n.let(B.default.vErrors, null), n.let(B.default.errors, 0), r.unevaluated && M$(e), au(e), K$(e);
  });
}
function M$(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function Ri(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function L$(e, t) {
  if (nu(e) && (su(e), ru(e))) {
    F$(e, t);
    return;
  }
  (0, eu.boolOrEmptySchema)(e, t);
}
function ru({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function nu(e) {
  return typeof e.schema != "boolean";
}
function F$(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && ou(e), z$(e), q$(e);
  const a = n.const("_errs", B.default.errors);
  au(e, a), n.var(t, (0, G._)`${a} === ${B.default.errors}`);
}
function su(e) {
  (0, dt.checkUnknownRules)(e), V$(e);
}
function au(e, t) {
  if (e.opts.jtd)
    return Ti(e, [], !1, t);
  const r = (0, Oi.getSchemaTypes)(e.schema), n = (0, Oi.coerceAndCheckDataType)(e, r);
  Ti(e, r, !n, t);
}
function V$(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, dt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function U$(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, dt.checkStrictMode)(e, "default is ignored in the schema root");
}
function z$(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, j$.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function q$(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function ou({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${B.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, G.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${B.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function K$(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${B.default.errors} === 0`, () => t.return(B.default.data), () => t.throw((0, G._)`new ${s}(${B.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, B.default.vErrors), a.unevaluated && G$(e), t.return((0, G._)`${B.default.errors} === 0`));
}
function G$({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Ti(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, dt.schemaHasRulesButRef)(a, l))) {
    s.block(() => lu(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || H$(e, t), s.block(() => {
    for (const P of l.rules)
      m(P);
    m(l.post);
  });
  function m(P) {
    (0, oo.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Vn.checkDataType)(P.type, i, c.strictNumbers)), Ii(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Vn.reportTypeError)(e)), s.endIf()) : Ii(e, P), u || s.if((0, G._)`${B.default.errors} === ${n || 0}`));
  }
}
function Ii(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, I$.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, oo.shouldUseRule)(n, a) && lu(e, a.keyword, a.definition, t.type);
  });
}
function H$(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (W$(e, t), e.opts.allowUnionTypes || J$(e, t), B$(e, e.dataTypes));
}
function W$(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      iu(e.dataTypes, r) || io(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Y$(e, t);
  }
}
function J$(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && io(e, "use allowUnionTypes to allow union type keyword");
}
function B$(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, oo.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => X$(t, i)) && io(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function X$(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function iu(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Y$(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    iu(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function io(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, dt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class cu {
  constructor(t, r, n) {
    if ((0, Vr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, dt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", uu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Vr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Rr.reportExtraError : Rr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Rr.reportError)(this, this.def.$dataError || Rr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Rr.resetErrorsCount)(this.gen, this.errsCount);
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
        return (0, G._)`${(0, Vn.checkDataTypes)(c, r, a.opts.strictNumbers, Vn.DataType.Wrong)}`;
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
    const n = (0, ys.getSubschema)(this.it, t);
    (0, ys.extendSubschemaData)(n, this.it, t), (0, ys.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return L$(s, r), s;
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
Ye.KeywordCxt = cu;
function lu(e, t, r, n) {
  const s = new cu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Vr.funcKeywordCode)(s, r) : "macro" in r ? (0, Vr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Vr.funcKeywordCode)(s, r);
}
const Q$ = /^\/(?:[^~]|~0|~1)*$/, Z$ = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function uu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return B.default.rootData;
  if (e[0] === "/") {
    if (!Q$.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = B.default.rootData;
  } else {
    const d = Z$.exec(e);
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
Ye.getData = uu;
var Yr = {};
Object.defineProperty(Yr, "__esModule", { value: !0 });
class x$ extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Yr.default = x$;
var vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
const $s = be;
class e_ extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, $s.resolveUrl)(t, r, n), this.missingSchema = (0, $s.normalizeId)((0, $s.getFullPath)(t, this.missingRef));
  }
}
vr.default = e_;
var Me = {};
Object.defineProperty(Me, "__esModule", { value: !0 });
Me.resolveSchema = Me.getCompilingSchema = Me.resolveRef = Me.compileSchema = Me.SchemaEnv = void 0;
const Ge = Z, t_ = Yr, qt = it, Be = be, ji = L, r_ = Ye;
class es {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Be.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Me.SchemaEnv = es;
function co(e) {
  const t = du.call(this, e);
  if (t)
    return t;
  const r = (0, Be.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Ge.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: t_.default,
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
    this._compilations.add(e), (0, r_.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const m = i.toString();
    l = `${i.scopeRefs(qt.default.scope)}return ${m}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${qt.default.self}`, `${qt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: m, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: w, items: g } = d;
      _.evaluated = {
        props: w instanceof Ge.Name ? void 0 : w,
        items: g instanceof Ge.Name ? void 0 : g,
        dynamicProps: w instanceof Ge.Name,
        dynamicItems: g instanceof Ge.Name
      }, _.source && (_.source.evaluated = (0, Ge.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (m) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), m;
  } finally {
    this._compilations.delete(e);
  }
}
Me.compileSchema = co;
function n_(e, t, r) {
  var n;
  r = (0, Be.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = o_.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new es({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = s_.call(this, a);
}
Me.resolveRef = n_;
function s_(e) {
  return (0, Be.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : co.call(this, e);
}
function du(e) {
  for (const t of this._compilations)
    if (a_(t, e))
      return t;
}
Me.getCompilingSchema = du;
function a_(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function o_(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || ts.call(this, e, t);
}
function ts(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Be._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Be.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return _s.call(this, r, e);
  const a = (0, Be.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = ts.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : _s.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || co.call(this, i), a === (0, Be.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Be.resolveUrl)(this.opts.uriResolver, s, d)), new es({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return _s.call(this, r, i);
  }
}
Me.resolveSchema = ts;
const i_ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function _s(e, { baseId: t, schema: r, root: n }) {
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
    !i_.has(u) && d && (t = (0, Be.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, ji.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Be.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = ts.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new es({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const c_ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", l_ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", u_ = "object", d_ = [
  "$data"
], f_ = {
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
}, h_ = !1, m_ = {
  $id: c_,
  description: l_,
  type: u_,
  required: d_,
  properties: f_,
  additionalProperties: h_
};
var lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
const fu = wl;
fu.code = 'require("ajv/dist/runtime/uri").default';
lo.default = fu;
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
  const n = Yr, s = vr, a = Qt, i = Me, u = Z, c = be, d = _e, l = L, m = m_, P = lo, _ = (v, p) => new RegExp(v, p);
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
    var p, S, y, o, f, b, j, A, q, F, re, Le, Nt, Ot, Rt, Tt, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft;
    const qe = v.strict, Vt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, br = Vt === !0 || Vt === void 0 ? 1 : Vt || 0, Pr = (y = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && y !== void 0 ? y : _, us = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
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
      uriResolver: us
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: y } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: y }), this.logger = Q(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, p, "NOT SUPPORTED"), I.call(this, h, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), W.call(this), p.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: y } = this.opts;
      let o = m;
      y === "id" && (o = { ...m }, o.id = o.$id, delete o.$id), S && p && this.addMetaSchema(o, o[y], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let y;
      if (typeof p == "string") {
        if (y = this.getSchema(p), !y)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        y = this.compile(p);
      const o = y(S);
      return "$async" in y || (this.errors = y.errors), o;
    }
    compile(p, S) {
      const y = this._addSchema(p, S);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return o.call(this, p, S);
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
    addSchema(p, S, y, o = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, y, o);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, y, S, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, y = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, y), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let y;
      if (y = p.$schema, y !== void 0 && typeof y != "string")
        throw new Error("$schema must be a string");
      if (y = y || this.opts.defaultMeta || this.defaultMeta(), !y)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate(y, p);
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
    getSchema(p) {
      let S;
      for (; typeof (S = z.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: y } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: y });
        if (S = i.resolveSchema.call(this, o, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = z.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let y = p[this.opts.schemaId];
          return y && (y = (0, c.normalizeId)(y), delete this.schemas[y], delete this.refs[y]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let y;
      if (typeof p == "string")
        y = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = y);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, y = S.keyword, Array.isArray(y) && !y.length)
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
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const y of S.rules) {
        const o = y.rules.findIndex((f) => f.keyword === p);
        o >= 0 && y.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: y = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((o) => `${y}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(p, S) {
      const y = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let b = p;
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
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const y in p) {
        const o = p[y];
        (!S || S.test(y)) && (typeof o == "string" ? delete p[y] : o && !o.meta && (this._cache.delete(o.schema), delete p[y]));
      }
    }
    _addSchema(p, S, y, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: j } = this.opts;
      if (typeof p == "object")
        b = p[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      y = (0, c.normalizeId)(b || y);
      const q = c.getSchemaRefs.call(this, p, y);
      return A = new i.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), o && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : i.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(v, p, S, y = "error") {
    for (const o in v) {
      const f = o;
      f in p && this.logger[y](`${S}: option ${o}. ${v[f]}`);
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
        for (const p in v)
          this.addSchema(v[p], p);
  }
  function ue() {
    for (const v in this.opts.formats) {
      const p = this.opts.formats[v];
      p && this.addFormat(v, p);
    }
  }
  function V(v) {
    if (Array.isArray(v)) {
      this.addVocabulary(v);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in v) {
      const S = v[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function H() {
    const v = { ...this.opts };
    for (const p of w)
      delete v[p];
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
  function C(v, p) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(v, (y) => {
      if (S.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var y;
    const o = p == null ? void 0 : p.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = o ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[v] = !0, !p)
      return;
    const j = {
      keyword: v,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? U.call(this, b, j, p.before) : b.rules.push(j), f.all[v] = j, (y = p.implements) === null || y === void 0 || y.forEach((A) => this.addKeyword(A));
  }
  function U(v, p, S) {
    const y = v.rules.findIndex((o) => o.keyword === S);
    y >= 0 ? v.rules.splice(y, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = T(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(Cl);
var uo = {}, fo = {}, ho = {};
Object.defineProperty(ho, "__esModule", { value: !0 });
const p_ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ho.default = p_;
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.callRef = Zt.getValidate = void 0;
const y_ = vr, Ai = ee, Ce = Z, nr = it, ki = Me, un = L, $_ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return m();
    const l = ki.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new y_.default(n.opts.uriResolver, s, r);
    if (l instanceof ki.SchemaEnv)
      return P(l);
    return _(l);
    function m() {
      if (a === d)
        return Rn(e, i, a, a.$async);
      const w = t.scopeValue("root", { ref: d });
      return Rn(e, (0, Ce._)`${w}.validate`, d, d.$async);
    }
    function P(w) {
      const g = hu(e, w);
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
function hu(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ce._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Zt.getValidate = hu;
function Rn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? nr.default.this : Ce.nil;
  n ? l() : m();
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
  function m() {
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
Zt.default = $_;
Object.defineProperty(fo, "__esModule", { value: !0 });
const __ = ho, g_ = Zt, v_ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  __.default,
  g_.default
];
fo.default = v_;
var mo = {}, po = {};
Object.defineProperty(po, "__esModule", { value: !0 });
const Un = Z, yt = Un.operators, zn = {
  maximum: { okStr: "<=", ok: yt.LTE, fail: yt.GT },
  minimum: { okStr: ">=", ok: yt.GTE, fail: yt.LT },
  exclusiveMaximum: { okStr: "<", ok: yt.LT, fail: yt.GTE },
  exclusiveMinimum: { okStr: ">", ok: yt.GT, fail: yt.LTE }
}, E_ = {
  message: ({ keyword: e, schemaCode: t }) => (0, Un.str)`must be ${zn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Un._)`{comparison: ${zn[e].okStr}, limit: ${t}}`
}, w_ = {
  keyword: Object.keys(zn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: E_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Un._)`${r} ${zn[t].fail} ${n} || isNaN(${r})`);
  }
};
po.default = w_;
var yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
const Ur = Z, S_ = {
  message: ({ schemaCode: e }) => (0, Ur.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Ur._)`{multipleOf: ${e}}`
}, b_ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: S_,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Ur._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Ur._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Ur._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
yo.default = b_;
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
const Jt = Z, P_ = L, N_ = _o, O_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Jt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Jt._)`{limit: ${e}}`
}, R_ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: O_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Jt.operators.GT : Jt.operators.LT, i = s.opts.unicode === !1 ? (0, Jt._)`${r}.length` : (0, Jt._)`${(0, P_.useFunc)(e.gen, N_.default)}(${r})`;
    e.fail$data((0, Jt._)`${i} ${a} ${n}`);
  }
};
$o.default = R_;
var go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
const T_ = ee, qn = Z, I_ = {
  message: ({ schemaCode: e }) => (0, qn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, qn._)`{pattern: ${e}}`
}, j_ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: I_,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, qn._)`(new RegExp(${s}, ${i}))` : (0, T_.usePattern)(e, n);
    e.fail$data((0, qn._)`!${u}.test(${t})`);
  }
};
go.default = j_;
var vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
const zr = Z, A_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, zr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, zr._)`{limit: ${e}}`
}, k_ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: A_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? zr.operators.GT : zr.operators.LT;
    e.fail$data((0, zr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
vo.default = k_;
var Eo = {};
Object.defineProperty(Eo, "__esModule", { value: !0 });
const Tr = ee, qr = Z, C_ = L, D_ = {
  message: ({ params: { missingProperty: e } }) => (0, qr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, qr._)`{missingProperty: ${e}}`
}, M_ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: D_,
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
          (0, C_.checkStrictMode)(i, h, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(qr.nil, m);
      else
        for (const _ of r)
          (0, Tr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const w = t.let("valid", !0);
        e.block$data(w, () => P(_, w)), e.ok(w);
      } else
        t.if((0, Tr.checkMissingProp)(e, r, _)), (0, Tr.reportMissingProp)(e, _), t.else();
    }
    function m() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Tr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, w) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(w, (0, Tr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, qr.not)(w), () => {
          e.error(), t.break();
        });
      }, qr.nil);
    }
  }
};
Eo.default = M_;
var wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
const Kr = Z, L_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Kr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Kr._)`{limit: ${e}}`
}, F_ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: L_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Kr.operators.GT : Kr.operators.LT;
    e.fail$data((0, Kr._)`${r}.length ${s} ${n}`);
  }
};
wo.default = F_;
var So = {}, Qr = {};
Object.defineProperty(Qr, "__esModule", { value: !0 });
const pu = Jn;
pu.code = 'require("ajv/dist/runtime/equal").default';
Qr.default = pu;
Object.defineProperty(So, "__esModule", { value: !0 });
const gs = _e, Ee = Z, V_ = L, U_ = Qr, z_ = {
  message: ({ params: { i: e, j: t } }) => (0, Ee.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ee._)`{i: ${e}, j: ${t}}`
}, q_ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: z_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, gs.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Ee._)`${i} === false`), e.ok(c);
    function l() {
      const w = t.let("i", (0, Ee._)`${r}.length`), g = t.let("j");
      e.setParams({ i: w, j: g }), t.assign(c, !0), t.if((0, Ee._)`${w} > 1`, () => (m() ? P : _)(w, g));
    }
    function m() {
      return d.length > 0 && !d.some((w) => w === "object" || w === "array");
    }
    function P(w, g) {
      const $ = t.name("item"), h = (0, gs.checkDataTypes)(d, $, u.opts.strictNumbers, gs.DataType.Wrong), E = t.const("indices", (0, Ee._)`{}`);
      t.for((0, Ee._)`;${w}--;`, () => {
        t.let($, (0, Ee._)`${r}[${w}]`), t.if(h, (0, Ee._)`continue`), d.length > 1 && t.if((0, Ee._)`typeof ${$} == "string"`, (0, Ee._)`${$} += "_"`), t.if((0, Ee._)`typeof ${E}[${$}] == "number"`, () => {
          t.assign(g, (0, Ee._)`${E}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ee._)`${E}[${$}] = ${w}`);
      });
    }
    function _(w, g) {
      const $ = (0, V_.useFunc)(t, U_.default), h = t.name("outer");
      t.label(h).for((0, Ee._)`;${w}--;`, () => t.for((0, Ee._)`${g} = ${w}; ${g}--;`, () => t.if((0, Ee._)`${$}(${r}[${w}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(h);
      })));
    }
  }
};
So.default = q_;
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const Ks = Z, K_ = L, G_ = Qr, H_ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Ks._)`{allowedValue: ${e}}`
}, W_ = {
  keyword: "const",
  $data: !0,
  error: H_,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Ks._)`!${(0, K_.useFunc)(t, G_.default)}(${r}, ${s})`) : e.fail((0, Ks._)`${a} !== ${r}`);
  }
};
bo.default = W_;
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
const kr = Z, J_ = L, B_ = Qr, X_ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, kr._)`{allowedValues: ${e}}`
}, Y_ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: X_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, J_.useFunc)(t, B_.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, m);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, kr.or)(...s.map((w, g) => P(_, g)));
    }
    e.pass(l);
    function m() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, kr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, w) {
      const g = s[w];
      return typeof g == "object" && g !== null ? (0, kr._)`${d()}(${r}, ${_}[${w}])` : (0, kr._)`${r} === ${g}`;
    }
  }
};
Po.default = Y_;
Object.defineProperty(mo, "__esModule", { value: !0 });
const Q_ = po, Z_ = yo, x_ = $o, eg = go, tg = vo, rg = Eo, ng = wo, sg = So, ag = bo, og = Po, ig = [
  // number
  Q_.default,
  Z_.default,
  // string
  x_.default,
  eg.default,
  // object
  tg.default,
  rg.default,
  // array
  ng.default,
  sg.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  ag.default,
  og.default
];
mo.default = ig;
var No = {}, Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.validateAdditionalItems = void 0;
const Bt = Z, Gs = L, cg = {
  message: ({ params: { len: e } }) => (0, Bt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Bt._)`{limit: ${e}}`
}, lg = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: cg,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Gs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    yu(e, n);
  }
};
function yu(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Bt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Bt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Gs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Bt._)`${u} <= ${t.length}`);
    r.if((0, Bt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Gs.Type.Num }, d), i.allErrors || r.if((0, Bt.not)(d), () => r.break());
    });
  }
}
Er.validateAdditionalItems = yu;
Er.default = lg;
var Oo = {}, wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.validateTuple = void 0;
const Ci = Z, Tn = L, ug = ee, dg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return $u(e, "additionalItems", t);
    r.items = !0, !(0, Tn.alwaysValidSchema)(r, t) && e.ok((0, ug.validateArray)(e));
  }
};
function $u(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Tn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Ci._)`${a}.length`);
  r.forEach((m, P) => {
    (0, Tn.alwaysValidSchema)(u, m) || (n.if((0, Ci._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(m) {
    const { opts: P, errSchemaPath: _ } = u, w = r.length, g = w === m.minItems && (w === m.maxItems || m[t] === !1);
    if (P.strictTuples && !g) {
      const $ = `"${i}" is ${w}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Tn.checkStrictMode)(u, $, P.strictTuples);
    }
  }
}
wr.validateTuple = $u;
wr.default = dg;
Object.defineProperty(Oo, "__esModule", { value: !0 });
const fg = wr, hg = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, fg.validateTuple)(e, "items")
};
Oo.default = hg;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const Di = Z, mg = L, pg = ee, yg = Er, $g = {
  message: ({ params: { len: e } }) => (0, Di.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Di._)`{limit: ${e}}`
}, _g = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: $g,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, mg.alwaysValidSchema)(n, t) && (s ? (0, yg.validateAdditionalItems)(e, s) : e.ok((0, pg.validateArray)(e)));
  }
};
Ro.default = _g;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const ze = Z, dn = L, gg = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, ze.str)`must contain at least ${e} valid item(s)` : (0, ze.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, ze._)`{minContains: ${e}}` : (0, ze._)`{minContains: ${e}, maxContains: ${t}}`
}, vg = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: gg,
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
    const m = t.name("valid");
    u === void 0 && i === 1 ? _(m, () => t.if(m, () => t.break())) : i === 0 ? (t.let(m, !0), u !== void 0 && t.if((0, ze._)`${s}.length > 0`, P)) : (t.let(m, !1), P()), e.result(m, () => e.reset());
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
      t.code((0, ze._)`${g}++`), u === void 0 ? t.if((0, ze._)`${g} >= ${i}`, () => t.assign(m, !0).break()) : (t.if((0, ze._)`${g} > ${u}`, () => t.assign(m, !1).break()), i === 1 ? t.assign(m, !0) : t.if((0, ze._)`${g} >= ${i}`, () => t.assign(m, !0)));
    }
  }
};
To.default = vg;
var _u = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Z, r = L, n = ee;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const m = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${m} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: m } }) => (0, t._)`{property: ${c},
    missingProperty: ${m},
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
    for (const m in c) {
      if (m === "__proto__")
        continue;
      const P = Array.isArray(c[m]) ? d : l;
      P[m] = c[m];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: m, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const w in d) {
      const g = d[w];
      if (g.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, m, w, P.opts.ownProperties);
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
    const { gen: l, data: m, keyword: P, it: _ } = c, w = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, m, g, _.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: P, schemaProp: g }, w);
          c.mergeValidEvaluated($, w);
        },
        () => l.var(w, !0)
        // TODO var
      ), c.ok(w));
  }
  e.validateSchemaDeps = u, e.default = s;
})(_u);
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const gu = Z, Eg = L, wg = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, gu._)`{propertyName: ${e.propertyName}}`
}, Sg = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: wg,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Eg.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, gu.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Io.default = Sg;
var rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
const fn = ee, We = Z, bg = it, hn = L, Pg = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, We._)`{additionalProperty: ${e.additionalProperty}}`
}, Ng = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Pg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, hn.alwaysValidSchema)(i, r))
      return;
    const d = (0, fn.allSchemaProperties)(n.properties), l = (0, fn.allSchemaProperties)(n.patternProperties);
    m(), e.ok((0, We._)`${a} === ${bg.default.errors}`);
    function m() {
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
rs.default = Ng;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const Og = Ye, Mi = ee, vs = L, Li = rs, Rg = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Li.default.code(new Og.KeywordCxt(a, Li.default, "additionalProperties"));
    const i = (0, Mi.allSchemaProperties)(r);
    for (const m of i)
      a.definedProperties.add(m);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = vs.mergeEvaluated.props(t, (0, vs.toHash)(i), a.props));
    const u = i.filter((m) => !(0, vs.alwaysValidSchema)(a, r[m]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const m of u)
      d(m) ? l(m) : (t.if((0, Mi.propertyInData)(t, s, m, a.opts.ownProperties)), l(m), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(m), e.ok(c);
    function d(m) {
      return a.opts.useDefaults && !a.compositeRule && r[m].default !== void 0;
    }
    function l(m) {
      e.subschema({
        keyword: "properties",
        schemaProp: m,
        dataProp: m
      }, c);
    }
  }
};
jo.default = Rg;
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
const Fi = ee, mn = Z, Vi = L, Ui = L, Tg = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Fi.allSchemaProperties)(r), c = u.filter((g) => (0, Vi.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof mn.Name) && (a.props = (0, Ui.evaluatedPropsToName)(t, a.props));
    const { props: m } = a;
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
        t.if((0, mn._)`${(0, Fi.usePattern)(e, g)}.test(${$})`, () => {
          const h = c.includes(g);
          h || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: $,
            dataPropType: Ui.Type.Str
          }, l), a.opts.unevaluated && m !== !0 ? t.assign((0, mn._)`${m}[${$}]`, !0) : !h && !a.allErrors && t.if((0, mn.not)(l), () => t.break());
        });
      });
    }
  }
};
Ao.default = Tg;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const Ig = L, jg = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Ig.alwaysValidSchema)(n, r)) {
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
ko.default = jg;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const Ag = ee, kg = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Ag.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Co.default = kg;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const In = Z, Cg = L, Dg = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, In._)`{passingSchemas: ${e.passing}}`
}, Mg = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Dg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, m) => {
        let P;
        (0, Cg.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: m,
          compositeRule: !0
        }, c), m > 0 && t.if((0, In._)`${c} && ${i}`).assign(i, !1).assign(u, (0, In._)`[${u}, ${m}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, m), P && e.mergeEvaluated(P, In.Name);
        });
      });
    }
  }
};
Do.default = Mg;
var Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const Lg = L, Fg = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Lg.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Mo.default = Fg;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const Kn = Z, vu = L, Vg = {
  message: ({ params: e }) => (0, Kn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Kn._)`{failingKeyword: ${e.ifClause}}`
}, Ug = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Vg,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, vu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = zi(n, "then"), a = zi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Kn.not)(u), d("else"));
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
    function d(l, m) {
      return () => {
        const P = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(P, i), m ? t.assign(m, (0, Kn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function zi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, vu.alwaysValidSchema)(e, r);
}
Lo.default = Ug;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const zg = L, qg = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, zg.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Fo.default = qg;
Object.defineProperty(No, "__esModule", { value: !0 });
const Kg = Er, Gg = Oo, Hg = wr, Wg = Ro, Jg = To, Bg = _u, Xg = Io, Yg = rs, Qg = jo, Zg = Ao, xg = ko, e0 = Co, t0 = Do, r0 = Mo, n0 = Lo, s0 = Fo;
function a0(e = !1) {
  const t = [
    // any
    xg.default,
    e0.default,
    t0.default,
    r0.default,
    n0.default,
    s0.default,
    // object
    Xg.default,
    Yg.default,
    Bg.default,
    Qg.default,
    Zg.default
  ];
  return e ? t.push(Gg.default, Wg.default) : t.push(Kg.default, Hg.default), t.push(Jg.default), t;
}
No.default = a0;
var Vo = {}, Uo = {};
Object.defineProperty(Uo, "__esModule", { value: !0 });
const ye = Z, o0 = {
  message: ({ schemaCode: e }) => (0, ye.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ye._)`{format: ${e}}`
}, i0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: o0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: m } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const w = r.scopeValue("formats", {
        ref: m.formats,
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
      const w = m.formats[a];
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
          m.logger.warn(I());
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
Uo.default = i0;
Object.defineProperty(Vo, "__esModule", { value: !0 });
const c0 = Uo, l0 = [c0.default];
Vo.default = l0;
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
const u0 = fo, d0 = mo, f0 = No, h0 = Vo, qi = yr, m0 = [
  u0.default,
  d0.default,
  (0, f0.default)(),
  h0.default,
  qi.metadataVocabulary,
  qi.contentVocabulary
];
uo.default = m0;
var zo = {}, ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.DiscrError = void 0;
var Ki;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ki || (ns.DiscrError = Ki = {}));
Object.defineProperty(zo, "__esModule", { value: !0 });
const ar = Z, Hs = ns, Gi = Me, p0 = vr, y0 = L, $0 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Hs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ar._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, _0 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: $0,
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
    t.if((0, ar._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Hs.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const w in _)
        t.elseIf((0, ar._)`${d} === ${w}`), t.assign(c, m(_[w]));
      t.else(), e.error(!1, { discrError: Hs.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function m(_) {
      const w = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, w);
      return e.mergeEvaluated(g, ar.Name), w;
    }
    function P() {
      var _;
      const w = {}, g = h(s);
      let $ = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, y0.schemaHasRulesButRef)(I, a.self.RULES)) {
          const W = I.$ref;
          if (I = Gi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), I instanceof Gi.SchemaEnv && (I = I.schema), I === void 0)
            throw new p0.default(a.opts.uriResolver, a.baseId, W);
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
zo.default = _0;
const g0 = "http://json-schema.org/draft-07/schema#", v0 = "http://json-schema.org/draft-07/schema#", E0 = "Core schema meta-schema", w0 = {
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
}, S0 = [
  "object",
  "boolean"
], b0 = {
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
}, P0 = {
  $schema: g0,
  $id: v0,
  title: E0,
  definitions: w0,
  type: S0,
  properties: b0,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Cl, n = uo, s = zo, a = P0, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
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
  var m = Yr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return m.default;
  } });
  var P = vr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Fs, Fs.exports);
var N0 = Fs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = N0, r = Z, n = r.operators, s = {
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
      const { gen: c, data: d, schemaCode: l, keyword: m, it: P } = u, { opts: _, self: w } = P;
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
          throw new Error(`"${m}": format "${N}" does not define "compare" function`);
        const I = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: _.code.formats ? r._`${_.code.formats}${r.getProperty(N)}` : void 0
        });
        u.fail$data(E(I));
      }
      function E(N) {
        return r._`${N}.compare(${d}, ${l}) ${s[m].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (u) => (u.addKeyword(e.formatLimitDefinition), u);
  e.default = i;
})(kl);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Al, n = kl, s = Z, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), u = (d, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(d, l, r.fullFormats, a), d;
    const [m, P] = l.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], _ = l.formats || r.formatNames;
    return c(d, _, m, P), l.keywords && n.default(d), d;
  };
  u.get = (d, l = "full") => {
    const P = (l === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!P)
      throw new Error(`Unknown format "${d}"`);
    return P;
  };
  function c(d, l, m, P) {
    var _, w;
    (_ = (w = d.opts.code).formats) !== null && _ !== void 0 || (w.formats = s._`require("ajv-formats/dist/formats").${P}`);
    for (const g of l)
      d.addFormat(g, m[g]);
  }
  e.exports = t = u, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = u;
})(Ls, Ls.exports);
var O0 = Ls.exports;
const R0 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !T0(s, a) && n || Object.defineProperty(e, r, a);
}, T0 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, I0 = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, j0 = (e, t) => `/* Wrapped ${e}*/
${t}`, A0 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), k0 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), C0 = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = j0.bind(null, n, t.toString());
  Object.defineProperty(s, "name", k0), Object.defineProperty(e, "toString", { ...A0, value: s });
}, D0 = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    R0(e, t, s, r);
  return I0(e, t), C0(e, t, n), e;
};
var M0 = D0;
const L0 = M0;
var F0 = (e, t = {}) => {
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
    }, m = n && !a;
    return clearTimeout(a), a = setTimeout(l, r), m && (i = e.apply(d, c)), i;
  };
  return L0(u, e), u.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, u;
}, Ws = { exports: {} };
const V0 = "2.0.0", Eu = 256, U0 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, z0 = 16, q0 = Eu - 6, K0 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ss = {
  MAX_LENGTH: Eu,
  MAX_SAFE_COMPONENT_LENGTH: z0,
  MAX_SAFE_BUILD_LENGTH: q0,
  MAX_SAFE_INTEGER: U0,
  RELEASE_TYPES: K0,
  SEMVER_SPEC_VERSION: V0,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const G0 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var as = G0;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = ss, a = as;
  t = e.exports = {};
  const i = t.re = [], u = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], l = t.t = {};
  let m = 0;
  const P = "[a-zA-Z0-9-]", _ = [
    ["\\s", 1],
    ["\\d", s],
    [P, n]
  ], w = ($) => {
    for (const [h, E] of _)
      $ = $.split(`${h}*`).join(`${h}{0,${E}}`).split(`${h}+`).join(`${h}{1,${E}}`);
    return $;
  }, g = ($, h, E) => {
    const N = w(h), R = m++;
    a($, R, h), l[$] = R, c[R] = h, d[R] = N, i[R] = new RegExp(h, E ? "g" : void 0), u[R] = new RegExp(N, E ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${P}*`), g("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${P}+`), g("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), g("FULL", `^${c[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), g("LOOSE", `^${c[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), g("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[l.COERCE], !0), g("COERCERTLFULL", c[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Ws, Ws.exports);
var Zr = Ws.exports;
const H0 = Object.freeze({ loose: !0 }), W0 = Object.freeze({}), J0 = (e) => e ? typeof e != "object" ? H0 : e : W0;
var qo = J0;
const Hi = /^[0-9]+$/, wu = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = Hi.test(e), n = Hi.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, B0 = (e, t) => wu(t, e);
var Su = {
  compareIdentifiers: wu,
  rcompareIdentifiers: B0
};
const pn = as, { MAX_LENGTH: Wi, MAX_SAFE_INTEGER: yn } = ss, { safeRe: $n, t: _n } = Zr, X0 = qo, { compareIdentifiers: Es } = Su;
let Y0 = class xe {
  constructor(t, r) {
    if (r = X0(r), t instanceof xe) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Wi)
      throw new TypeError(
        `version is longer than ${Wi} characters`
      );
    pn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
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
    if (pn("SemVer.compare", this.version, this.options, t), !(t instanceof xe)) {
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
      if (pn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Es(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof xe || (t = new xe(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (pn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Es(n, s);
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
          n === !1 && (a = [r]), Es(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var je = Y0;
const Ji = je, Q0 = (e, t, r = !1) => {
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
var Sr = Q0;
const Z0 = Sr, x0 = (e, t) => {
  const r = Z0(e, t);
  return r ? r.version : null;
};
var ev = x0;
const tv = Sr, rv = (e, t) => {
  const r = tv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var nv = rv;
const Bi = je, sv = (e, t, r, n, s) => {
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
var av = sv;
const Xi = Sr, ov = (e, t) => {
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
var iv = ov;
const cv = je, lv = (e, t) => new cv(e, t).major;
var uv = lv;
const dv = je, fv = (e, t) => new dv(e, t).minor;
var hv = fv;
const mv = je, pv = (e, t) => new mv(e, t).patch;
var yv = pv;
const $v = Sr, _v = (e, t) => {
  const r = $v(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var gv = _v;
const Yi = je, vv = (e, t, r) => new Yi(e, r).compare(new Yi(t, r));
var Qe = vv;
const Ev = Qe, wv = (e, t, r) => Ev(t, e, r);
var Sv = wv;
const bv = Qe, Pv = (e, t) => bv(e, t, !0);
var Nv = Pv;
const Qi = je, Ov = (e, t, r) => {
  const n = new Qi(e, r), s = new Qi(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Ko = Ov;
const Rv = Ko, Tv = (e, t) => e.sort((r, n) => Rv(r, n, t));
var Iv = Tv;
const jv = Ko, Av = (e, t) => e.sort((r, n) => jv(n, r, t));
var kv = Av;
const Cv = Qe, Dv = (e, t, r) => Cv(e, t, r) > 0;
var os = Dv;
const Mv = Qe, Lv = (e, t, r) => Mv(e, t, r) < 0;
var Go = Lv;
const Fv = Qe, Vv = (e, t, r) => Fv(e, t, r) === 0;
var bu = Vv;
const Uv = Qe, zv = (e, t, r) => Uv(e, t, r) !== 0;
var Pu = zv;
const qv = Qe, Kv = (e, t, r) => qv(e, t, r) >= 0;
var Ho = Kv;
const Gv = Qe, Hv = (e, t, r) => Gv(e, t, r) <= 0;
var Wo = Hv;
const Wv = bu, Jv = Pu, Bv = os, Xv = Ho, Yv = Go, Qv = Wo, Zv = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return Wv(e, r, n);
    case "!=":
      return Jv(e, r, n);
    case ">":
      return Bv(e, r, n);
    case ">=":
      return Xv(e, r, n);
    case "<":
      return Yv(e, r, n);
    case "<=":
      return Qv(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Nu = Zv;
const xv = je, eE = Sr, { safeRe: gn, t: vn } = Zr, tE = (e, t) => {
  if (e instanceof xv)
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
  return eE(`${n}.${s}.${a}${i}${u}`, t);
};
var rE = tE;
class nE {
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
var sE = nE, ws, Zi;
function Ze() {
  if (Zi) return ws;
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
      k = k.replace(v, Q(this.options.includePrerelease)), i("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], l), i("comparator trim", k), k = k.replace(c[d.TILDETRIM], m), i("tilde trim", k), k = k.replace(c[d.CARETTRIM], P), i("caret trim", k);
      let p = k.split(" ").map((f) => E(f, this.options)).join(" ").split(/\s+/).map((f) => ne(f, this.options));
      T && (p = p.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", p);
      const S = /* @__PURE__ */ new Map(), y = p.map((f) => new a(f, this.options));
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
  ws = t;
  const r = sE, n = new r(), s = qo, a = is(), i = as, u = je, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: l,
    tildeTrimReplace: m,
    caretTrimReplace: P
  } = Zr, { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: w } = ss, g = (C) => C.value === "<0.0.0-0", $ = (C) => C.value === "", h = (C, k) => {
    let U = !0;
    const D = C.slice();
    let O = D.pop();
    for (; U && D.length; )
      U = D.every((T) => O.intersects(T, k)), O = D.pop();
    return U;
  }, E = (C, k) => (C = C.replace(c[d.BUILD], ""), i("comp", C, k), C = z(C, k), i("caret", C), C = R(C, k), i("tildes", C), C = ue(C, k), i("xrange", C), C = H(C, k), i("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", R = (C, k) => C.trim().split(/\s+/).map((U) => I(U, k)).join(" "), I = (C, k) => {
    const U = k.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return C.replace(U, (D, O, T, v, p) => {
      i("tilde", C, D, O, T, v, p);
      let S;
      return N(O) ? S = "" : N(T) ? S = `>=${O}.0.0 <${+O + 1}.0.0-0` : N(v) ? S = `>=${O}.${T}.0 <${O}.${+T + 1}.0-0` : p ? (i("replaceTilde pr", p), S = `>=${O}.${T}.${v}-${p} <${O}.${+T + 1}.0-0`) : S = `>=${O}.${T}.${v} <${O}.${+T + 1}.0-0`, i("tilde return", S), S;
    });
  }, z = (C, k) => C.trim().split(/\s+/).map((U) => W(U, k)).join(" "), W = (C, k) => {
    i("caret", C, k);
    const U = k.loose ? c[d.CARETLOOSE] : c[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(U, (O, T, v, p, S) => {
      i("caret", C, O, T, v, p, S);
      let y;
      return N(T) ? y = "" : N(v) ? y = `>=${T}.0.0${D} <${+T + 1}.0.0-0` : N(p) ? T === "0" ? y = `>=${T}.${v}.0${D} <${T}.${+v + 1}.0-0` : y = `>=${T}.${v}.0${D} <${+T + 1}.0.0-0` : S ? (i("replaceCaret pr", S), T === "0" ? v === "0" ? y = `>=${T}.${v}.${p}-${S} <${T}.${v}.${+p + 1}-0` : y = `>=${T}.${v}.${p}-${S} <${T}.${+v + 1}.0-0` : y = `>=${T}.${v}.${p}-${S} <${+T + 1}.0.0-0`) : (i("no pr"), T === "0" ? v === "0" ? y = `>=${T}.${v}.${p}${D} <${T}.${v}.${+p + 1}-0` : y = `>=${T}.${v}.${p}${D} <${T}.${+v + 1}.0-0` : y = `>=${T}.${v}.${p} <${+T + 1}.0.0-0`), i("caret return", y), y;
    });
  }, ue = (C, k) => (i("replaceXRanges", C, k), C.split(/\s+/).map((U) => V(U, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const U = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(U, (D, O, T, v, p, S) => {
      i("xRange", C, D, O, T, v, p, S);
      const y = N(T), o = y || N(v), f = o || N(p), b = f;
      return O === "=" && b && (O = ""), S = k.includePrerelease ? "-0" : "", y ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && b ? (o && (v = 0), p = 0, O === ">" ? (O = ">=", o ? (T = +T + 1, v = 0, p = 0) : (v = +v + 1, p = 0)) : O === "<=" && (O = "<", o ? T = +T + 1 : v = +v + 1), O === "<" && (S = "-0"), D = `${O + T}.${v}.${p}${S}`) : o ? D = `>=${T}.0.0${S} <${+T + 1}.0.0-0` : f && (D = `>=${T}.${v}.0${S} <${T}.${+v + 1}.0-0`), i("xRange return", D), D;
    });
  }, H = (C, k) => (i("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), ne = (C, k) => (i("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, U, D, O, T, v, p, S, y, o, f, b) => (N(D) ? U = "" : N(O) ? U = `>=${D}.0.0${C ? "-0" : ""}` : N(T) ? U = `>=${D}.${O}.0${C ? "-0" : ""}` : v ? U = `>=${U}` : U = `>=${U}${C ? "-0" : ""}`, N(y) ? S = "" : N(o) ? S = `<${+y + 1}.0.0-0` : N(f) ? S = `<${y}.${+o + 1}.0-0` : b ? S = `<=${y}.${o}.${f}-${b}` : C ? S = `<${y}.${o}.${+f + 1}-0` : S = `<=${S}`, `${U} ${S}`.trim()), de = (C, k, U) => {
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
  return ws;
}
var Ss, xi;
function is() {
  if (xi) return Ss;
  xi = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, m) {
      if (m = r(m), l instanceof t) {
        if (l.loose === !!m.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), i("comparator", l, m), this.options = m, this.loose = !!m.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(l) {
      const m = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], P = l.match(m);
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
    intersects(l, m) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, m).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, m).test(l.semver) : (m = r(m), m.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !m.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, m) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, m) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Ss = t;
  const r = qo, { safeRe: n, t: s } = Zr, a = Nu, i = as, u = je, c = Ze();
  return Ss;
}
const aE = Ze(), oE = (e, t, r) => {
  try {
    t = new aE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var cs = oE;
const iE = Ze(), cE = (e, t) => new iE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var lE = cE;
const uE = je, dE = Ze(), fE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new dE(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new uE(n, r));
  }), n;
};
var hE = fE;
const mE = je, pE = Ze(), yE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new pE(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new mE(n, r));
  }), n;
};
var $E = yE;
const bs = je, _E = Ze(), ec = os, gE = (e, t) => {
  e = new _E(e, t);
  let r = new bs("0.0.0");
  if (e.test(r) || (r = new bs("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const u = new bs(i.semver.version);
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
var vE = gE;
const EE = Ze(), wE = (e, t) => {
  try {
    return new EE(e, t).range || "*";
  } catch {
    return null;
  }
};
var SE = wE;
const bE = je, Ou = is(), { ANY: PE } = Ou, NE = Ze(), OE = cs, tc = os, rc = Go, RE = Wo, TE = Ho, IE = (e, t, r, n) => {
  e = new bE(e, n), t = new NE(t, n);
  let s, a, i, u, c;
  switch (r) {
    case ">":
      s = tc, a = RE, i = rc, u = ">", c = ">=";
      break;
    case "<":
      s = rc, a = TE, i = tc, u = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (OE(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const l = t.set[d];
    let m = null, P = null;
    if (l.forEach((_) => {
      _.semver === PE && (_ = new Ou(">=0.0.0")), m = m || _, P = P || _, s(_.semver, m.semver, n) ? m = _ : i(_.semver, P.semver, n) && (P = _);
    }), m.operator === u || m.operator === c || (!P.operator || P.operator === u) && a(e, P.semver))
      return !1;
    if (P.operator === c && i(e, P.semver))
      return !1;
  }
  return !0;
};
var Jo = IE;
const jE = Jo, AE = (e, t, r) => jE(e, t, ">", r);
var kE = AE;
const CE = Jo, DE = (e, t, r) => CE(e, t, "<", r);
var ME = DE;
const nc = Ze(), LE = (e, t, r) => (e = new nc(e, r), t = new nc(t, r), e.intersects(t, r));
var FE = LE;
const VE = cs, UE = Qe;
var zE = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((l, m) => UE(l, m, r));
  for (const l of i)
    VE(l, t, r) ? (a = l, s || (s = l)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const u = [];
  for (const [l, m] of n)
    l === m ? u.push(l) : !m && l === i[0] ? u.push("*") : m ? l === i[0] ? u.push(`<=${m}`) : u.push(`${l} - ${m}`) : u.push(`>=${l}`);
  const c = u.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const sc = Ze(), Bo = is(), { ANY: Ps } = Bo, Ir = cs, Xo = Qe, qE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new sc(e, r), t = new sc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = GE(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, KE = [new Bo(">=0.0.0-0")], ac = [new Bo(">=0.0.0")], GE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Ps) {
    if (t.length === 1 && t[0].semver === Ps)
      return !0;
    r.includePrerelease ? e = KE : e = ac;
  }
  if (t.length === 1 && t[0].semver === Ps) {
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
    if (s && !Ir(_, String(s), r) || a && !Ir(_, String(a), r))
      return null;
    for (const w of t)
      if (!Ir(_, String(w), r))
        return !1;
    return !0;
  }
  let u, c, d, l, m = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, P = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  m && m.prerelease.length === 1 && a.operator === "<" && m.prerelease[0] === 0 && (m = !1);
  for (const _ of t) {
    if (l = l || _.operator === ">" || _.operator === ">=", d = d || _.operator === "<" || _.operator === "<=", s) {
      if (P && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === P.major && _.semver.minor === P.minor && _.semver.patch === P.patch && (P = !1), _.operator === ">" || _.operator === ">=") {
        if (u = oc(s, _, r), u === _ && u !== s)
          return !1;
      } else if (s.operator === ">=" && !Ir(s.semver, String(_), r))
        return !1;
    }
    if (a) {
      if (m && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === m.major && _.semver.minor === m.minor && _.semver.patch === m.patch && (m = !1), _.operator === "<" || _.operator === "<=") {
        if (c = ic(a, _, r), c === _ && c !== a)
          return !1;
      } else if (a.operator === "<=" && !Ir(a.semver, String(_), r))
        return !1;
    }
    if (!_.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && l && !s && i !== 0 || P || m);
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
var HE = qE;
const Ns = Zr, cc = ss, WE = je, lc = Su, JE = Sr, BE = ev, XE = nv, YE = av, QE = iv, ZE = uv, xE = hv, ew = yv, tw = gv, rw = Qe, nw = Sv, sw = Nv, aw = Ko, ow = Iv, iw = kv, cw = os, lw = Go, uw = bu, dw = Pu, fw = Ho, hw = Wo, mw = Nu, pw = rE, yw = is(), $w = Ze(), _w = cs, gw = lE, vw = hE, Ew = $E, ww = vE, Sw = SE, bw = Jo, Pw = kE, Nw = ME, Ow = FE, Rw = zE, Tw = HE;
var Iw = {
  parse: JE,
  valid: BE,
  clean: XE,
  inc: YE,
  diff: QE,
  major: ZE,
  minor: xE,
  patch: ew,
  prerelease: tw,
  compare: rw,
  rcompare: nw,
  compareLoose: sw,
  compareBuild: aw,
  sort: ow,
  rsort: iw,
  gt: cw,
  lt: lw,
  eq: uw,
  neq: dw,
  gte: fw,
  lte: hw,
  cmp: mw,
  coerce: pw,
  Comparator: yw,
  Range: $w,
  satisfies: _w,
  toComparators: gw,
  maxSatisfying: vw,
  minSatisfying: Ew,
  minVersion: ww,
  validRange: Sw,
  outside: bw,
  gtr: Pw,
  ltr: Nw,
  intersects: Ow,
  simplifyRange: Rw,
  subset: Tw,
  SemVer: WE,
  re: Ns.re,
  src: Ns.src,
  tokens: Ns.t,
  SEMVER_SPEC_VERSION: cc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: cc.RELEASE_TYPES,
  compareIdentifiers: lc.compareIdentifiers,
  rcompareIdentifiers: lc.rcompareIdentifiers
}, ls = { exports: {} }, Yo = { exports: {} };
const Ru = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
Yo.exports = Ru;
Yo.exports.default = Ru;
var jw = Yo.exports;
const Aw = jw, Gn = /* @__PURE__ */ new WeakMap(), Tu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...i) {
    if (Gn.set(a, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return Aw(a, e), Gn.set(a, n), a;
};
ls.exports = Tu;
ls.exports.default = Tu;
ls.exports.callCount = (e) => {
  if (!Gn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Gn.get(e);
};
var kw = ls.exports;
(function(e, t) {
  var r = en && en.__classPrivateFieldSet || function(D, O, T, v, p) {
    if (v === "m") throw new TypeError("Private method is not writable");
    if (v === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !p : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return v === "a" ? p.call(D, T) : p ? p.value = T : O.set(D, T), T;
  }, n = en && en.__classPrivateFieldGet || function(D, O, T, v) {
    if (T === "a" && !v) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !v : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? v : T === "a" ? v.call(D) : v ? v.value : O.get(D);
  }, s, a, i, u, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const l = pc, m = Xs, P = xt, _ = Du, w = Mu, g = Lu, $ = Ku, h = ed, E = sd, N = rt, R = py, I = O0, z = F0, W = Iw, ue = kw, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), ne = (D) => D != null;
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
      }, p = ue(() => {
        const f = h.sync({ cwd: Q }), b = f && JSON.parse(m.readFileSync(f, "utf8"));
        return b ?? {};
      });
      if (!v.cwd) {
        if (v.projectName || (v.projectName = p().name), !v.projectName)
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
        if (v.projectVersion || (v.projectVersion = p().version), !v.projectVersion)
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
      const { store: v } = this, p = (S, y) => {
        de(S, y), n(this, c, "f").accessPropertiesByDotNotation ? $.set(v, S, y) : v[S] = y;
      };
      if (typeof O == "object") {
        const S = O;
        for (const [y, o] of Object.entries(S))
          p(y, o);
      } else
        p(O, T);
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
        const O = m.readFileSync(this.path, n(this, u, "f") ? null : "utf8"), T = this._encryptData(O), v = this._deserialize(T);
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
              const T = O.slice(0, 16), v = _.pbkdf2Sync(n(this, u, "f"), T.toString(), 1e4, 32, "sha512"), p = _.createDecipheriv(V, v, T);
              O = Buffer.concat([p.update(Buffer.from(O.slice(17))), p.final()]).toString("utf8");
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
      const p = () => {
        const S = v, y = O();
        (0, l.isDeepStrictEqual)(y, S) || (v = y, T.call(this, y, S));
      };
      return this.events.on("change", p), () => this.events.removeListener("change", p);
    }
    _validate(O) {
      if (!n(this, i, "f") || n(this, i, "f").call(this, O) || !n(this, i, "f").errors)
        return;
      const v = n(this, i, "f").errors.map(({ instancePath: p, message: S = "" }) => `\`${p.slice(1)}\` ${S}`);
      throw new Error("Config schema violation: " + v.join("; "));
    }
    _ensureDirectory() {
      m.mkdirSync(P.dirname(this.path), { recursive: !0 });
    }
    _write(O) {
      let T = this._serialize(O);
      if (n(this, u, "f")) {
        const v = _.randomBytes(16), p = _.pbkdf2Sync(n(this, u, "f"), v.toString(), 1e4, 32, "sha512"), S = _.createCipheriv(V, p, v);
        T = Buffer.concat([v, Buffer.from(":"), S.update(Buffer.from(T)), S.final()]);
      }
      if (process.env.SNAP)
        m.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
        } catch (v) {
          if ((v == null ? void 0 : v.code) === "EXDEV") {
            m.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
            return;
          }
          throw v;
        }
    }
    _watch() {
      this._ensureDirectory(), m.existsSync(this.path) || this._write(H()), process.platform === "win32" ? m.watch(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 100 })) : m.watchFile(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(O, T, v) {
      let p = this._get(k, "0.0.0");
      const S = Object.keys(O).filter((o) => this._shouldPerformMigration(o, p, T));
      let y = { ...this.store };
      for (const o of S)
        try {
          v && v(this, {
            fromVersion: p,
            toVersion: o,
            finalVersion: T,
            versions: S
          });
          const f = O[o];
          f(this), this._set(k, o), p = o, y = { ...this.store };
        } catch (f) {
          throw this.store = y, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(p) || !W.eq(p, T)) && this._set(k, T);
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
})(Os, Os.exports);
var Cw = Os.exports;
const uc = xt, { app: jn, ipcMain: Js, ipcRenderer: dc, shell: Dw } = ku, Mw = Cw;
let fc = !1;
const hc = () => {
  if (!Js || !jn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: jn.getPath("userData"),
    appVersion: jn.getVersion()
  };
  return fc || (Js.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), fc = !0), e;
};
class Lw extends Mw {
  constructor(t) {
    let r, n;
    if (dc) {
      const s = dc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else Js && jn && ({ defaultCwd: r, appVersion: n } = hc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = uc.isAbsolute(t.cwd) ? t.cwd : uc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    hc();
  }
  async openInEditor() {
    const t = await Dw.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var Fw = Lw;
const Vw = /* @__PURE__ */ Vu(Fw), Iu = St.dirname(Cu(import.meta.url));
process.env.APP_ROOT = St.join(Iu, "..");
const Bs = process.env.VITE_DEV_SERVER_URL, rS = St.join(process.env.APP_ROOT, "dist-electron"), ju = St.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Bs ? St.join(process.env.APP_ROOT, "public") : ju;
let $t;
const Uw = {
  stocks: {
    type: "array",
    default: []
  },
  pollInterval: {
    type: "number",
    default: 5e3
  }
}, En = new Vw({
  schema: Uw,
  name: "app-store"
});
function zw() {
  xr.handle("electron-store-get", (e, t) => En.get(t)), xr.handle("electron-store-set", (e, t, r) => (En.set(t, r), !0)), xr.handle("electron-store-get-all", () => En.store), xr.handle("electron-store-reset", () => (En.reset(), !0));
}
function Au() {
  $t = new mc({
    title: "Electron Stock App",
    icon: St.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: St.join(Iu, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !1
    }
  }), $t.webContents.on("did-finish-load", () => {
    $t == null || $t.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Bs ? $t.loadURL(Bs) : $t.loadFile(St.join(ju, "index.html"));
}
An.on("window-all-closed", () => {
  process.platform !== "darwin" && (An.quit(), $t = null);
});
An.on("activate", () => {
  mc.getAllWindows().length === 0 && Au();
});
An.whenReady().then(() => {
  zw(), Au();
});
export {
  rS as MAIN_DIST,
  ju as RENDERER_DIST,
  Bs as VITE_DEV_SERVER_URL
};
