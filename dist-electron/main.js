import zd, { app as vs, BrowserWindow as Zl, ipcMain as bt } from "electron";
import { fileURLToPath as xd } from "node:url";
import Lt from "node:path";
import Ut from "path";
import eu from "util";
import Ls from "fs";
import Ms from "crypto";
import Gd from "assert";
import tu from "events";
import ru from "os";
import Bd from "https";
import Kd from "http";
import Hd from "net";
import Wd from "tls";
import Sn from "stream";
import Xd from "url";
import Jd from "zlib";
import Yd from "buffer";
var Cn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function nu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Lo = { exports: {} }, Qd = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const tr = Qd, Zd = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), eh = (e) => !e.some((t) => Zd.has(t));
function jn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return eh(r) ? r : [];
}
var th = {
  get(e, t, r) {
    if (!tr(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = jn(t);
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
    if (!tr(e) || typeof t != "string")
      return e;
    const n = e, s = jn(t);
    for (let o = 0; o < s.length; o++) {
      const a = s[o];
      tr(e[a]) || (e[a] = {}), o === s.length - 1 && (e[a] = r), e = e[a];
    }
    return n;
  },
  delete(e, t) {
    if (!tr(e) || typeof t != "string")
      return !1;
    const r = jn(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !tr(e))
        return !1;
    }
  },
  has(e, t) {
    if (!tr(e) || typeof t != "string")
      return !1;
    const r = jn(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (tr(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, ia = { exports: {} }, ca = { exports: {} }, la = { exports: {} }, ua = { exports: {} };
const su = Ls;
ua.exports = (e) => new Promise((t) => {
  su.access(e, (r) => {
    t(!r);
  });
});
ua.exports.sync = (e) => {
  try {
    return su.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var rh = ua.exports, fa = { exports: {} }, da = { exports: {} };
const ou = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
da.exports = ou;
da.exports.default = ou;
var nh = da.exports;
const sh = nh, au = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (l, c, ...f) => {
    r++;
    const u = sh(l, ...f);
    c(u), u.then(n, n);
  }, o = (l, c, ...f) => {
    r < e ? s(l, c, ...f) : t.push(s.bind(null, l, c, ...f));
  }, a = (l, ...c) => new Promise((f) => o(l, f, ...c));
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
fa.exports = au;
fa.exports.default = au;
var oh = fa.exports;
const lc = oh;
class iu extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const ah = (e, t) => Promise.resolve(e).then(t), ih = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new iu(t[0])));
var ch = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = lc(r.concurrency), s = [...e].map((a) => [a, n(ah, a, t)]), o = lc(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((a) => o(ih, a))).then(() => {
  }).catch((a) => a instanceof iu ? a.value : Promise.reject(a));
};
const cu = Ut, lu = rh, lh = ch;
la.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), lh(e, (r) => lu(cu.resolve(t.cwd, r)), t));
la.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (lu.sync(cu.resolve(t.cwd, r)))
      return r;
};
var uh = la.exports;
const Ct = Ut, uu = uh;
ca.exports = (e, t = {}) => {
  const r = Ct.resolve(t.cwd || ""), { root: n } = Ct.parse(r), s = [].concat(e);
  return new Promise((o) => {
    (function a(l) {
      uu(s, { cwd: l }).then((c) => {
        c ? o(Ct.join(l, c)) : l === n ? o(null) : a(Ct.dirname(l));
      });
    })(r);
  });
};
ca.exports.sync = (e, t = {}) => {
  let r = Ct.resolve(t.cwd || "");
  const { root: n } = Ct.parse(r), s = [].concat(e);
  for (; ; ) {
    const o = uu.sync(s, { cwd: r });
    if (o)
      return Ct.join(r, o);
    if (r === n)
      return null;
    r = Ct.dirname(r);
  }
};
var fh = ca.exports;
const fu = fh;
ia.exports = async ({ cwd: e } = {}) => fu("package.json", { cwd: e });
ia.exports.sync = ({ cwd: e } = {}) => fu.sync("package.json", { cwd: e });
var dh = ia.exports, ha = { exports: {} };
const ye = Ut, du = ru, It = du.homedir(), pa = du.tmpdir(), { env: Nr } = process, hh = (e) => {
  const t = ye.join(It, "Library");
  return {
    data: ye.join(t, "Application Support", e),
    config: ye.join(t, "Preferences", e),
    cache: ye.join(t, "Caches", e),
    log: ye.join(t, "Logs", e),
    temp: ye.join(pa, e)
  };
}, ph = (e) => {
  const t = Nr.APPDATA || ye.join(It, "AppData", "Roaming"), r = Nr.LOCALAPPDATA || ye.join(It, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: ye.join(r, e, "Data"),
    config: ye.join(t, e, "Config"),
    cache: ye.join(r, e, "Cache"),
    log: ye.join(r, e, "Log"),
    temp: ye.join(pa, e)
  };
}, mh = (e) => {
  const t = ye.basename(It);
  return {
    data: ye.join(Nr.XDG_DATA_HOME || ye.join(It, ".local", "share"), e),
    config: ye.join(Nr.XDG_CONFIG_HOME || ye.join(It, ".config"), e),
    cache: ye.join(Nr.XDG_CACHE_HOME || ye.join(It, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: ye.join(Nr.XDG_STATE_HOME || ye.join(It, ".local", "state"), e),
    temp: ye.join(pa, t, e)
  };
}, hu = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? hh(e) : process.platform === "win32" ? ph(e) : mh(e);
};
ha.exports = hu;
ha.exports.default = hu;
var yh = ha.exports, ft = {}, ce = {};
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.NOOP = ce.LIMIT_FILES_DESCRIPTORS = ce.LIMIT_BASENAME_LENGTH = ce.IS_USER_ROOT = ce.IS_POSIX = ce.DEFAULT_TIMEOUT_SYNC = ce.DEFAULT_TIMEOUT_ASYNC = ce.DEFAULT_WRITE_OPTIONS = ce.DEFAULT_READ_OPTIONS = ce.DEFAULT_FOLDER_MODE = ce.DEFAULT_FILE_MODE = ce.DEFAULT_ENCODING = void 0;
const _h = "utf8";
ce.DEFAULT_ENCODING = _h;
const $h = 438;
ce.DEFAULT_FILE_MODE = $h;
const gh = 511;
ce.DEFAULT_FOLDER_MODE = gh;
const vh = {};
ce.DEFAULT_READ_OPTIONS = vh;
const Eh = {};
ce.DEFAULT_WRITE_OPTIONS = Eh;
const wh = 5e3;
ce.DEFAULT_TIMEOUT_ASYNC = wh;
const Sh = 100;
ce.DEFAULT_TIMEOUT_SYNC = Sh;
const bh = !!process.getuid;
ce.IS_POSIX = bh;
const Ph = process.getuid ? !process.getuid() : !1;
ce.IS_USER_ROOT = Ph;
const Oh = 128;
ce.LIMIT_BASENAME_LENGTH = Oh;
const Nh = 1e4;
ce.LIMIT_FILES_DESCRIPTORS = Nh;
const Rh = () => {
};
ce.NOOP = Rh;
var Fs = {}, Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.attemptifySync = Dr.attemptifyAsync = void 0;
const pu = ce, Th = (e, t = pu.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
Dr.attemptifyAsync = Th;
const Ih = (e, t = pu.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
Dr.attemptifySync = Ih;
var ma = {};
Object.defineProperty(ma, "__esModule", { value: !0 });
const kh = ce, mu = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !kh.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!mu.isChangeErrorOk(e))
      throw e;
  }
};
ma.default = mu;
var Lr = {}, ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
const Ch = ce, de = {
  interval: 25,
  intervalId: void 0,
  limit: Ch.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    de.intervalId || (de.intervalId = setInterval(de.tick, de.interval));
  },
  reset: () => {
    de.intervalId && (clearInterval(de.intervalId), delete de.intervalId);
  },
  add: (e) => {
    de.queueWaiting.add(e), de.queueActive.size < de.limit / 2 ? de.tick() : de.init();
  },
  remove: (e) => {
    de.queueWaiting.delete(e), de.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => de.remove(r), r = () => e(t);
    de.add(r);
  }),
  tick: () => {
    if (!(de.queueActive.size >= de.limit)) {
      if (!de.queueWaiting.size)
        return de.reset();
      for (const e of de.queueWaiting) {
        if (de.queueActive.size >= de.limit)
          break;
        de.queueWaiting.delete(e), de.queueActive.add(e), e();
      }
    }
  }
};
ya.default = de;
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.retryifySync = Lr.retryifyAsync = void 0;
const jh = ya, Ah = (e, t) => function(r) {
  return function n() {
    return jh.default.schedule().then((s) => e.apply(void 0, arguments).then((o) => (s(), o), (o) => {
      if (s(), Date.now() >= r)
        throw o;
      if (t(o)) {
        const a = Math.round(100 + 400 * Math.random());
        return new Promise((c) => setTimeout(c, a)).then(() => n.apply(void 0, arguments));
      }
      throw o;
    }));
  };
};
Lr.retryifyAsync = Ah;
const Dh = (e, t) => function(r) {
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
Lr.retryifySync = Dh;
Object.defineProperty(Fs, "__esModule", { value: !0 });
const le = Ls, Ie = eu, ke = Dr, Ee = ma, De = Lr, Lh = {
  chmodAttempt: ke.attemptifyAsync(Ie.promisify(le.chmod), Ee.default.onChangeError),
  chownAttempt: ke.attemptifyAsync(Ie.promisify(le.chown), Ee.default.onChangeError),
  closeAttempt: ke.attemptifyAsync(Ie.promisify(le.close)),
  fsyncAttempt: ke.attemptifyAsync(Ie.promisify(le.fsync)),
  mkdirAttempt: ke.attemptifyAsync(Ie.promisify(le.mkdir)),
  realpathAttempt: ke.attemptifyAsync(Ie.promisify(le.realpath)),
  statAttempt: ke.attemptifyAsync(Ie.promisify(le.stat)),
  unlinkAttempt: ke.attemptifyAsync(Ie.promisify(le.unlink)),
  closeRetry: De.retryifyAsync(Ie.promisify(le.close), Ee.default.isRetriableError),
  fsyncRetry: De.retryifyAsync(Ie.promisify(le.fsync), Ee.default.isRetriableError),
  openRetry: De.retryifyAsync(Ie.promisify(le.open), Ee.default.isRetriableError),
  readFileRetry: De.retryifyAsync(Ie.promisify(le.readFile), Ee.default.isRetriableError),
  renameRetry: De.retryifyAsync(Ie.promisify(le.rename), Ee.default.isRetriableError),
  statRetry: De.retryifyAsync(Ie.promisify(le.stat), Ee.default.isRetriableError),
  writeRetry: De.retryifyAsync(Ie.promisify(le.write), Ee.default.isRetriableError),
  chmodSyncAttempt: ke.attemptifySync(le.chmodSync, Ee.default.onChangeError),
  chownSyncAttempt: ke.attemptifySync(le.chownSync, Ee.default.onChangeError),
  closeSyncAttempt: ke.attemptifySync(le.closeSync),
  mkdirSyncAttempt: ke.attemptifySync(le.mkdirSync),
  realpathSyncAttempt: ke.attemptifySync(le.realpathSync),
  statSyncAttempt: ke.attemptifySync(le.statSync),
  unlinkSyncAttempt: ke.attemptifySync(le.unlinkSync),
  closeSyncRetry: De.retryifySync(le.closeSync, Ee.default.isRetriableError),
  fsyncSyncRetry: De.retryifySync(le.fsyncSync, Ee.default.isRetriableError),
  openSyncRetry: De.retryifySync(le.openSync, Ee.default.isRetriableError),
  readFileSyncRetry: De.retryifySync(le.readFileSync, Ee.default.isRetriableError),
  renameSyncRetry: De.retryifySync(le.renameSync, Ee.default.isRetriableError),
  statSyncRetry: De.retryifySync(le.statSync, Ee.default.isRetriableError),
  writeSyncRetry: De.retryifySync(le.writeSync, Ee.default.isRetriableError)
};
Fs.default = Lh;
var _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
const Mh = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
_a.default = Mh;
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
const An = {}, Mo = {
  next: (e) => {
    const t = An[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Mo.next(e)) : delete An[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = An[e];
    r || (r = An[e] = []), r.push(t), !(r.length > 1) && t(() => Mo.next(e));
  })
};
$a.default = Mo;
var ga = {};
Object.defineProperty(ga, "__esModule", { value: !0 });
const Fh = Ut, uc = ce, fc = Fs, qe = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = qe.truncate(t(e));
    return n in qe.store ? qe.get(e, t, r) : (qe.store[n] = r, [n, () => delete qe.store[n]]);
  },
  purge: (e) => {
    qe.store[e] && (delete qe.store[e], fc.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    qe.store[e] && (delete qe.store[e], fc.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in qe.store)
      qe.purgeSync(e);
  },
  truncate: (e) => {
    const t = Fh.basename(e);
    if (t.length <= uc.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - uc.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", qe.purgeSyncAll);
ga.default = qe;
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.writeFileSync = ft.writeFile = ft.readFileSync = ft.readFile = void 0;
const yu = Ut, Pe = ce, ie = Fs, xe = _a, Uh = $a, jt = ga;
function _u(e, t = Pe.DEFAULT_READ_OPTIONS) {
  var r;
  if (xe.default.isString(t))
    return _u(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Pe.DEFAULT_TIMEOUT_ASYNC);
  return ie.default.readFileRetry(n)(e, t);
}
ft.readFile = _u;
function $u(e, t = Pe.DEFAULT_READ_OPTIONS) {
  var r;
  if (xe.default.isString(t))
    return $u(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Pe.DEFAULT_TIMEOUT_SYNC);
  return ie.default.readFileSyncRetry(n)(e, t);
}
ft.readFileSync = $u;
const gu = (e, t, r, n) => {
  if (xe.default.isFunction(r))
    return gu(e, t, Pe.DEFAULT_WRITE_OPTIONS, r);
  const s = vu(e, t, r);
  return n && s.then(n, n), s;
};
ft.writeFile = gu;
const vu = async (e, t, r = Pe.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (xe.default.isString(r))
    return vu(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Pe.DEFAULT_TIMEOUT_ASYNC);
  let o = null, a = null, l = null, c = null, f = null;
  try {
    r.schedule && (o = await r.schedule(e)), a = await Uh.default.schedule(e), e = await ie.default.realpathAttempt(e) || e, [c, l] = jt.default.get(e, r.tmpCreate || jt.default.create, r.tmpPurge !== !1);
    const u = Pe.IS_POSIX && xe.default.isUndefined(r.chown), h = xe.default.isUndefined(r.mode);
    if (u || h) {
      const g = await ie.default.statAttempt(e);
      g && (r = { ...r }, u && (r.chown = { uid: g.uid, gid: g.gid }), h && (r.mode = g.mode));
    }
    const b = yu.dirname(e);
    await ie.default.mkdirAttempt(b, {
      mode: Pe.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), f = await ie.default.openRetry(s)(c, "w", r.mode || Pe.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), xe.default.isString(t) ? await ie.default.writeRetry(s)(f, t, 0, r.encoding || Pe.DEFAULT_ENCODING) : xe.default.isUndefined(t) || await ie.default.writeRetry(s)(f, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await ie.default.fsyncRetry(s)(f) : ie.default.fsyncAttempt(f)), await ie.default.closeRetry(s)(f), f = null, r.chown && await ie.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await ie.default.chmodAttempt(c, r.mode);
    try {
      await ie.default.renameRetry(s)(c, e);
    } catch (g) {
      if (g.code !== "ENAMETOOLONG")
        throw g;
      await ie.default.renameRetry(s)(c, jt.default.truncate(e));
    }
    l(), c = null;
  } finally {
    f && await ie.default.closeAttempt(f), c && jt.default.purge(c), o && o(), a && a();
  }
}, Eu = (e, t, r = Pe.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (xe.default.isString(r))
    return Eu(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Pe.DEFAULT_TIMEOUT_SYNC);
  let o = null, a = null, l = null;
  try {
    e = ie.default.realpathSyncAttempt(e) || e, [a, o] = jt.default.get(e, r.tmpCreate || jt.default.create, r.tmpPurge !== !1);
    const c = Pe.IS_POSIX && xe.default.isUndefined(r.chown), f = xe.default.isUndefined(r.mode);
    if (c || f) {
      const h = ie.default.statSyncAttempt(e);
      h && (r = { ...r }, c && (r.chown = { uid: h.uid, gid: h.gid }), f && (r.mode = h.mode));
    }
    const u = yu.dirname(e);
    ie.default.mkdirSyncAttempt(u, {
      mode: Pe.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), l = ie.default.openSyncRetry(s)(a, "w", r.mode || Pe.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(a), xe.default.isString(t) ? ie.default.writeSyncRetry(s)(l, t, 0, r.encoding || Pe.DEFAULT_ENCODING) : xe.default.isUndefined(t) || ie.default.writeSyncRetry(s)(l, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? ie.default.fsyncSyncRetry(s)(l) : ie.default.fsyncAttempt(l)), ie.default.closeSyncRetry(s)(l), l = null, r.chown && ie.default.chownSyncAttempt(a, r.chown.uid, r.chown.gid), r.mode && ie.default.chmodSyncAttempt(a, r.mode);
    try {
      ie.default.renameSyncRetry(s)(a, e);
    } catch (h) {
      if (h.code !== "ENAMETOOLONG")
        throw h;
      ie.default.renameSyncRetry(s)(a, jt.default.truncate(e));
    }
    o(), a = null;
  } finally {
    l && ie.default.closeSyncAttempt(l), a && jt.default.purge(a);
  }
};
ft.writeFileSync = Eu;
var Fo = { exports: {} }, wu = {}, nt = {}, Mr = {}, bn = {}, se = {}, En = {};
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
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((O, N) => `${O}${N}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((O, N) => (N instanceof r && (O[N.str] = (O[N.str] || 0) + 1), O), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...E) {
    const O = [p[0]];
    let N = 0;
    for (; N < E.length; )
      l(O, E[N]), O.push(p[++N]);
    return new n(O);
  }
  e._ = s;
  const o = new n("+");
  function a(p, ...E) {
    const O = [g(p[0])];
    let N = 0;
    for (; N < E.length; )
      O.push(o), l(O, E[N]), O.push(o, g(p[++N]));
    return c(O), new n(O);
  }
  e.str = a;
  function l(p, E) {
    E instanceof n ? p.push(...E._items) : E instanceof r ? p.push(E) : p.push(h(E));
  }
  e.addCodeArg = l;
  function c(p) {
    let E = 1;
    for (; E < p.length - 1; ) {
      if (p[E] === o) {
        const O = f(p[E - 1], p[E + 1]);
        if (O !== void 0) {
          p.splice(E - 1, 3, O);
          continue;
        }
        p[E++] = "+";
      }
      E++;
    }
  }
  function f(p, E) {
    if (E === '""')
      return p;
    if (p === '""')
      return E;
    if (typeof p == "string")
      return E instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${p.slice(0, -1)}${E}"` : E[0] === '"' ? p.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(p instanceof r))
      return `"${p}${E.slice(1)}`;
  }
  function u(p, E) {
    return E.emptyStr() ? p : p.emptyStr() ? E : a`${p}${E}`;
  }
  e.strConcat = u;
  function h(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : g(Array.isArray(p) ? p.join(",") : p);
  }
  function b(p) {
    return new n(g(p));
  }
  e.stringify = b;
  function g(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = g;
  function v(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = v;
  function _(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = _;
  function y(p) {
    return new n(p.toString());
  }
  e.regexpCode = y;
})(En);
var Uo = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = En;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
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
      const b = this.toName(f), { prefix: g } = b, v = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let _ = this._values[g];
      if (_) {
        const E = _.get(v);
        if (E)
          return E;
      } else
        _ = this._values[g] = /* @__PURE__ */ new Map();
      _.set(v, b);
      const y = this._scope[g] || (this._scope[g] = []), p = y.length;
      return y[p] = u.ref, b.setValue(u, { property: g, itemIndex: p }), b;
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
      return this._reduceValues(f, (b) => {
        if (b.value === void 0)
          throw new Error(`CodeGen: name "${b}" has no value`);
        return b.value.code;
      }, u, h);
    }
    _reduceValues(f, u, h = {}, b) {
      let g = t.nil;
      for (const v in f) {
        const _ = f[v];
        if (!_)
          continue;
        const y = h[v] = h[v] || /* @__PURE__ */ new Map();
        _.forEach((p) => {
          if (y.has(p))
            return;
          y.set(p, n.Started);
          let E = u(p);
          if (E) {
            const O = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            g = (0, t._)`${g}${O} ${p} = ${E};${this.opts._n}`;
          } else if (E = b == null ? void 0 : b(p))
            g = (0, t._)`${g}${E}${this.opts._n}`;
          else
            throw new r(p);
          y.set(p, n.Completed);
        });
      }
      return g;
    }
  }
  e.ValueScope = l;
})(Uo);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = En, r = Uo;
  var n = En;
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
  var s = Uo;
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
    optimizeNames(i, d) {
      return this;
    }
  }
  class a extends o {
    constructor(i, d, P) {
      super(), this.varKind = i, this.name = d, this.rhs = P;
    }
    render({ es5: i, _n: d }) {
      const P = i ? r.varKinds.var : this.varKind, k = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${k};` + d;
    }
    optimizeNames(i, d) {
      if (i[this.name.str])
        return this.rhs && (this.rhs = j(this.rhs, i, d)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends o {
    constructor(i, d, P) {
      super(), this.lhs = i, this.rhs = d, this.sideEffects = P;
    }
    render({ _n: i }) {
      return `${this.lhs} = ${this.rhs};` + i;
    }
    optimizeNames(i, d) {
      if (!(this.lhs instanceof t.Name && !i[this.lhs.str] && !this.sideEffects))
        return this.rhs = j(this.rhs, i, d), this;
    }
    get names() {
      const i = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return G(i, this.rhs);
    }
  }
  class c extends l {
    constructor(i, d, P, k) {
      super(i, P, k), this.op = d;
    }
    render({ _n: i }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + i;
    }
  }
  class f extends o {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `${this.label}:` + i;
    }
  }
  class u extends o {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `break${this.label ? ` ${this.label}` : ""};` + i;
    }
  }
  class h extends o {
    constructor(i) {
      super(), this.error = i;
    }
    render({ _n: i }) {
      return `throw ${this.error};` + i;
    }
    get names() {
      return this.error.names;
    }
  }
  class b extends o {
    constructor(i) {
      super(), this.code = i;
    }
    render({ _n: i }) {
      return `${this.code};` + i;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(i, d) {
      return this.code = j(this.code, i, d), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class g extends o {
    constructor(i = []) {
      super(), this.nodes = i;
    }
    render(i) {
      return this.nodes.reduce((d, P) => d + P.render(i), "");
    }
    optimizeNodes() {
      const { nodes: i } = this;
      let d = i.length;
      for (; d--; ) {
        const P = i[d].optimizeNodes();
        Array.isArray(P) ? i.splice(d, 1, ...P) : P ? i[d] = P : i.splice(d, 1);
      }
      return i.length > 0 ? this : void 0;
    }
    optimizeNames(i, d) {
      const { nodes: P } = this;
      let k = P.length;
      for (; k--; ) {
        const C = P[k];
        C.optimizeNames(i, d) || (A(i, C.names), P.splice(k, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((i, d) => q(i, d.names), {});
    }
  }
  class v extends g {
    render(i) {
      return "{" + i._n + super.render(i) + "}" + i._n;
    }
  }
  class _ extends g {
  }
  class y extends v {
  }
  y.kind = "else";
  class p extends v {
    constructor(i, d) {
      super(d), this.condition = i;
    }
    render(i) {
      let d = `if(${this.condition})` + super.render(i);
      return this.else && (d += "else " + this.else.render(i)), d;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const i = this.condition;
      if (i === !0)
        return this.nodes;
      let d = this.else;
      if (d) {
        const P = d.optimizeNodes();
        d = this.else = Array.isArray(P) ? new y(P) : P;
      }
      if (d)
        return i === !1 ? d instanceof p ? d : d.nodes : this.nodes.length ? this : new p(D(i), d instanceof p ? [d] : d.nodes);
      if (!(i === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(i, d) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(i, d), !!(super.optimizeNames(i, d) || this.else))
        return this.condition = j(this.condition, i, d), this;
    }
    get names() {
      const i = super.names;
      return G(i, this.condition), this.else && q(i, this.else.names), i;
    }
  }
  p.kind = "if";
  class E extends v {
  }
  E.kind = "for";
  class O extends E {
    constructor(i) {
      super(), this.iteration = i;
    }
    render(i) {
      return `for(${this.iteration})` + super.render(i);
    }
    optimizeNames(i, d) {
      if (super.optimizeNames(i, d))
        return this.iteration = j(this.iteration, i, d), this;
    }
    get names() {
      return q(super.names, this.iteration.names);
    }
  }
  class N extends E {
    constructor(i, d, P, k) {
      super(), this.varKind = i, this.name = d, this.from = P, this.to = k;
    }
    render(i) {
      const d = i.es5 ? r.varKinds.var : this.varKind, { name: P, from: k, to: C } = this;
      return `for(${d} ${P}=${k}; ${P}<${C}; ${P}++)` + super.render(i);
    }
    get names() {
      const i = G(super.names, this.from);
      return G(i, this.to);
    }
  }
  class I extends E {
    constructor(i, d, P, k) {
      super(), this.loop = i, this.varKind = d, this.name = P, this.iterable = k;
    }
    render(i) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(i);
    }
    optimizeNames(i, d) {
      if (super.optimizeNames(i, d))
        return this.iterable = j(this.iterable, i, d), this;
    }
    get names() {
      return q(super.names, this.iterable.names);
    }
  }
  class z extends v {
    constructor(i, d, P) {
      super(), this.name = i, this.args = d, this.async = P;
    }
    render(i) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(i);
    }
  }
  z.kind = "func";
  class W extends g {
    render(i) {
      return "return " + super.render(i);
    }
  }
  W.kind = "return";
  class ae extends v {
    render(i) {
      let d = "try" + super.render(i);
      return this.catch && (d += this.catch.render(i)), this.finally && (d += this.finally.render(i)), d;
    }
    optimizeNodes() {
      var i, d;
      return super.optimizeNodes(), (i = this.catch) === null || i === void 0 || i.optimizeNodes(), (d = this.finally) === null || d === void 0 || d.optimizeNodes(), this;
    }
    optimizeNames(i, d) {
      var P, k;
      return super.optimizeNames(i, d), (P = this.catch) === null || P === void 0 || P.optimizeNames(i, d), (k = this.finally) === null || k === void 0 || k.optimizeNames(i, d), this;
    }
    get names() {
      const i = super.names;
      return this.catch && q(i, this.catch.names), this.finally && q(i, this.finally.names), i;
    }
  }
  class U extends v {
    constructor(i) {
      super(), this.error = i;
    }
    render(i) {
      return `catch(${this.error})` + super.render(i);
    }
  }
  U.kind = "catch";
  class X extends v {
    render(i) {
      return "finally" + super.render(i);
    }
  }
  X.kind = "finally";
  class V {
    constructor(i, d = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...d, _n: d.lines ? `
` : "" }, this._extScope = i, this._scope = new r.Scope({ parent: i }), this._nodes = [new _()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(i) {
      return this._scope.name(i);
    }
    // reserves unique name in the external scope
    scopeName(i) {
      return this._extScope.name(i);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(i, d) {
      const P = this._extScope.value(i, d);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
    }
    getScopeValue(i, d) {
      return this._extScope.getValue(i, d);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(i) {
      return this._extScope.scopeRefs(i, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(i, d, P, k) {
      const C = this._scope.toName(d);
      return P !== void 0 && k && (this._constants[C.str] = P), this._leafNode(new a(i, C, P)), C;
    }
    // `const` declaration (`var` in es5 mode)
    const(i, d, P) {
      return this._def(r.varKinds.const, i, d, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(i, d, P) {
      return this._def(r.varKinds.let, i, d, P);
    }
    // `var` declaration with optional assignment
    var(i, d, P) {
      return this._def(r.varKinds.var, i, d, P);
    }
    // assignment code
    assign(i, d, P) {
      return this._leafNode(new l(i, d, P));
    }
    // `+=` code
    add(i, d) {
      return this._leafNode(new c(i, e.operators.ADD, d));
    }
    // appends passed SafeExpr to code or executes Block
    code(i) {
      return typeof i == "function" ? i() : i !== t.nil && this._leafNode(new b(i)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...i) {
      const d = ["{"];
      for (const [P, k] of i)
        d.length > 1 && d.push(","), d.push(P), (P !== k || this.opts.es5) && (d.push(":"), (0, t.addCodeArg)(d, k));
      return d.push("}"), new t._Code(d);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(i, d, P) {
      if (this._blockNode(new p(i)), d && P)
        this.code(d).else().code(P).endIf();
      else if (d)
        this.code(d).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(i) {
      return this._elseNode(new p(i));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, y);
    }
    _for(i, d) {
      return this._blockNode(i), d && this.code(d).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(i, d) {
      return this._for(new O(i), d);
    }
    // `for` statement for a range of values
    forRange(i, d, P, k, C = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const B = this._scope.toName(i);
      return this._for(new N(C, B, d, P), () => k(B));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, d, P, k = r.varKinds.const) {
      const C = this._scope.toName(i);
      if (this.opts.es5) {
        const B = d instanceof t.Name ? d : this.var("_arr", d);
        return this.forRange("_i", 0, (0, t._)`${B}.length`, (x) => {
          this.var(C, (0, t._)`${B}[${x}]`), P(C);
        });
      }
      return this._for(new I("of", k, C, d), () => P(C));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(i, d, P, k = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(i, (0, t._)`Object.keys(${d})`, P);
      const C = this._scope.toName(i);
      return this._for(new I("in", k, C, d), () => P(C));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(i) {
      return this._leafNode(new f(i));
    }
    // `break` statement
    break(i) {
      return this._leafNode(new u(i));
    }
    // `return` statement
    return(i) {
      const d = new W();
      if (this._blockNode(d), this.code(i), d.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(i, d, P) {
      if (!d && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const k = new ae();
      if (this._blockNode(k), this.code(i), d) {
        const C = this.name("e");
        this._currNode = k.catch = new U(C), d(C);
      }
      return P && (this._currNode = k.finally = new X(), this.code(P)), this._endBlockNode(U, X);
    }
    // `throw` statement
    throw(i) {
      return this._leafNode(new h(i));
    }
    // start self-balancing block
    block(i, d) {
      return this._blockStarts.push(this._nodes.length), i && this.code(i).endBlock(d), this;
    }
    // end the current self-balancing block
    endBlock(i) {
      const d = this._blockStarts.pop();
      if (d === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const P = this._nodes.length - d;
      if (P < 0 || i !== void 0 && P !== i)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${i} expected`);
      return this._nodes.length = d, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(i, d = t.nil, P, k) {
      return this._blockNode(new z(i, d, P)), k && this.code(k).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(i = 1) {
      for (; i-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(i) {
      return this._currNode.nodes.push(i), this;
    }
    _blockNode(i) {
      this._currNode.nodes.push(i), this._nodes.push(i);
    }
    _endBlockNode(i, d) {
      const P = this._currNode;
      if (P instanceof i || d && P instanceof d)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${d ? `${i.kind}/${d.kind}` : i.kind}"`);
    }
    _elseNode(i) {
      const d = this._currNode;
      if (!(d instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = d.else = i, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const i = this._nodes;
      return i[i.length - 1];
    }
    set _currNode(i) {
      const d = this._nodes;
      d[d.length - 1] = i;
    }
  }
  e.CodeGen = V;
  function q($, i) {
    for (const d in i)
      $[d] = ($[d] || 0) + (i[d] || 0);
    return $;
  }
  function G($, i) {
    return i instanceof t._CodeOrName ? q($, i.names) : $;
  }
  function j($, i, d) {
    if ($ instanceof t.Name)
      return P($);
    if (!k($))
      return $;
    return new t._Code($._items.reduce((C, B) => (B instanceof t.Name && (B = P(B)), B instanceof t._Code ? C.push(...B._items) : C.push(B), C), []));
    function P(C) {
      const B = d[C.str];
      return B === void 0 || i[C.str] !== 1 ? C : (delete i[C.str], B);
    }
    function k(C) {
      return C instanceof t._Code && C._items.some((B) => B instanceof t.Name && i[B.str] === 1 && d[B.str] !== void 0);
    }
  }
  function A($, i) {
    for (const d in i)
      $[d] = ($[d] || 0) - (i[d] || 0);
  }
  function D($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${S($)}`;
  }
  e.not = D;
  const L = m(e.operators.AND);
  function R(...$) {
    return $.reduce(L);
  }
  e.and = R;
  const T = m(e.operators.OR);
  function w(...$) {
    return $.reduce(T);
  }
  e.or = w;
  function m($) {
    return (i, d) => i === t.nil ? d : d === t.nil ? i : (0, t._)`${S(i)} ${$} ${S(d)}`;
  }
  function S($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(se);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ue = se, Vh = En;
function qh(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = qh;
function zh(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Su(e, t), !bu(t, e.self.RULES.all));
}
M.alwaysValidSchema = zh;
function Su(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const o in t)
    s[o] || Nu(e, `unknown keyword: "${o}"`);
}
M.checkUnknownRules = Su;
function bu(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = bu;
function xh(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = xh;
function Gh({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ue._)`${r}`;
  }
  return (0, ue._)`${e}${t}${(0, ue.getProperty)(n)}`;
}
M.schemaRefOrVal = Gh;
function Bh(e) {
  return Pu(decodeURIComponent(e));
}
M.unescapeFragment = Bh;
function Kh(e) {
  return encodeURIComponent(va(e));
}
M.escapeFragment = Kh;
function va(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = va;
function Pu(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Pu;
function Hh(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = Hh;
function dc({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, o, a, l) => {
    const c = a === void 0 ? o : a instanceof ue.Name ? (o instanceof ue.Name ? e(s, o, a) : t(s, o, a), a) : o instanceof ue.Name ? (t(s, a, o), o) : r(o, a);
    return l === ue.Name && !(c instanceof ue.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: dc({
    mergeNames: (e, t, r) => e.if((0, ue._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ue._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ue._)`${r} || {}`).code((0, ue._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ue._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ue._)`${r} || {}`), Ea(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Ou
  }),
  items: dc({
    mergeNames: (e, t, r) => e.if((0, ue._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ue._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ue._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ue._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Ou(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ue._)`{}`);
  return t !== void 0 && Ea(e, r, t), r;
}
M.evaluatedPropsToName = Ou;
function Ea(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ue._)`${t}${(0, ue.getProperty)(n)}`, !0));
}
M.setEvaluated = Ea;
const hc = {};
function Wh(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: hc[t.code] || (hc[t.code] = new Vh._Code(t.code))
  });
}
M.useFunc = Wh;
var Vo;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Vo || (M.Type = Vo = {}));
function Xh(e, t, r) {
  if (e instanceof ue.Name) {
    const n = t === Vo.Num;
    return r ? n ? (0, ue._)`"[" + ${e} + "]"` : (0, ue._)`"['" + ${e} + "']"` : n ? (0, ue._)`"/" + ${e}` : (0, ue._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ue.getProperty)(e).toString() : "/" + va(e);
}
M.getErrorPath = Xh;
function Nu(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = Nu;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
const Re = se, Jh = {
  // validation function arguments
  data: new Re.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Re.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Re.Name("instancePath"),
  parentData: new Re.Name("parentData"),
  parentDataProperty: new Re.Name("parentDataProperty"),
  rootData: new Re.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Re.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Re.Name("vErrors"),
  // null or array of validation errors
  errors: new Re.Name("errors"),
  // counter of validation errors
  this: new Re.Name("this"),
  // "globals"
  self: new Re.Name("self"),
  scope: new Re.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Re.Name("json"),
  jsonPos: new Re.Name("jsonPos"),
  jsonLen: new Re.Name("jsonLen"),
  jsonPart: new Re.Name("jsonPart")
};
mt.default = Jh;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = se, r = M, n = mt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: p }) => p ? (0, t.str)`"${y}" keyword must be ${p} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, p = e.keywordError, E, O) {
    const { it: N } = y, { gen: I, compositeRule: z, allErrors: W } = N, ae = h(y, p, E);
    O ?? (z || W) ? c(I, ae) : f(N, (0, t._)`[${ae}]`);
  }
  e.reportError = s;
  function o(y, p = e.keywordError, E) {
    const { it: O } = y, { gen: N, compositeRule: I, allErrors: z } = O, W = h(y, p, E);
    c(N, W), I || z || f(O, n.default.vErrors);
  }
  e.reportExtraError = o;
  function a(y, p) {
    y.assign(n.default.errors, p), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(p, () => y.assign((0, t._)`${n.default.vErrors}.length`, p), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function l({ gen: y, keyword: p, schemaValue: E, data: O, errsCount: N, it: I }) {
    if (N === void 0)
      throw new Error("ajv implementation error");
    const z = y.name("err");
    y.forRange("i", N, n.default.errors, (W) => {
      y.const(z, (0, t._)`${n.default.vErrors}[${W}]`), y.if((0, t._)`${z}.instancePath === undefined`, () => y.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && (y.assign((0, t._)`${z}.schema`, E), y.assign((0, t._)`${z}.data`, O));
    });
  }
  e.extendErrors = l;
  function c(y, p) {
    const E = y.const("err", p);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function f(y, p) {
    const { gen: E, validateName: O, schemaEnv: N } = y;
    N.$async ? E.throw((0, t._)`new ${y.ValidationError}(${p})`) : (E.assign((0, t._)`${O}.errors`, p), E.return(!1));
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
  function h(y, p, E) {
    const { createErrors: O } = y.it;
    return O === !1 ? (0, t._)`{}` : b(y, p, E);
  }
  function b(y, p, E = {}) {
    const { gen: O, it: N } = y, I = [
      g(N, E),
      v(y, E)
    ];
    return _(y, p, I), O.object(...I);
  }
  function g({ errorPath: y }, { instancePath: p }) {
    const E = p ? (0, t.str)`${y}${(0, r.getErrorPath)(p, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function v({ keyword: y, it: { errSchemaPath: p } }, { schemaPath: E, parentSchema: O }) {
    let N = O ? p : (0, t.str)`${p}/${y}`;
    return E && (N = (0, t.str)`${N}${(0, r.getErrorPath)(E, r.Type.Str)}`), [u.schemaPath, N];
  }
  function _(y, { params: p, message: E }, O) {
    const { keyword: N, data: I, schemaValue: z, it: W } = y, { opts: ae, propertyName: U, topSchemaRef: X, schemaPath: V } = W;
    O.push([u.keyword, N], [u.params, typeof p == "function" ? p(y) : p || (0, t._)`{}`]), ae.messages && O.push([u.message, typeof E == "function" ? E(y) : E]), ae.verbose && O.push([u.schema, z], [u.parentSchema, (0, t._)`${X}${V}`], [n.default.data, I]), U && O.push([u.propertyName, U]);
  }
})(bn);
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.boolOrEmptySchema = Mr.topBoolOrEmptySchema = void 0;
const Yh = bn, Qh = se, Zh = mt, ep = {
  message: "boolean schema is false"
};
function tp(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Ru(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(Zh.default.data) : (t.assign((0, Qh._)`${n}.errors`, null), t.return(!0));
}
Mr.topBoolOrEmptySchema = tp;
function rp(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Ru(e)) : r.var(t, !0);
}
Mr.boolOrEmptySchema = rp;
function Ru(e, t) {
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
  (0, Yh.reportError)(s, ep, void 0, t);
}
var ge = {}, pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.getRules = pr.isJSONType = void 0;
const np = ["string", "number", "integer", "boolean", "null", "object", "array"], sp = new Set(np);
function op(e) {
  return typeof e == "string" && sp.has(e);
}
pr.isJSONType = op;
function ap() {
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
pr.getRules = ap;
var $t = {};
Object.defineProperty($t, "__esModule", { value: !0 });
$t.shouldUseRule = $t.shouldUseGroup = $t.schemaHasRulesForType = void 0;
function ip({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Tu(e, n);
}
$t.schemaHasRulesForType = ip;
function Tu(e, t) {
  return t.rules.some((r) => Iu(e, r));
}
$t.shouldUseGroup = Tu;
function Iu(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
$t.shouldUseRule = Iu;
Object.defineProperty(ge, "__esModule", { value: !0 });
ge.reportTypeError = ge.checkDataTypes = ge.checkDataType = ge.coerceAndCheckDataType = ge.getJSONTypes = ge.getSchemaTypes = ge.DataType = void 0;
const cp = pr, lp = $t, up = bn, Z = se, ku = M;
var Ir;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Ir || (ge.DataType = Ir = {}));
function fp(e) {
  const t = Cu(e.type);
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
ge.getSchemaTypes = fp;
function Cu(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(cp.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ge.getJSONTypes = Cu;
function dp(e, t) {
  const { gen: r, data: n, opts: s } = e, o = hp(t, s.coerceTypes), a = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, lp.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const l = wa(t, n, s.strictNumbers, Ir.Wrong);
    r.if(l, () => {
      o.length ? pp(e, t, o) : Sa(e);
    });
  }
  return a;
}
ge.coerceAndCheckDataType = dp;
const ju = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function hp(e, t) {
  return t ? e.filter((r) => ju.has(r) || t === "array" && r === "array") : [];
}
function pp(e, t, r) {
  const { gen: n, data: s, opts: o } = e, a = n.let("dataType", (0, Z._)`typeof ${s}`), l = n.let("coerced", (0, Z._)`undefined`);
  o.coerceTypes === "array" && n.if((0, Z._)`${a} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Z._)`${s}[0]`).assign(a, (0, Z._)`typeof ${s}`).if(wa(t, s, o.strictNumbers), () => n.assign(l, s))), n.if((0, Z._)`${l} !== undefined`);
  for (const f of r)
    (ju.has(f) || f === "array" && o.coerceTypes === "array") && c(f);
  n.else(), Sa(e), n.endIf(), n.if((0, Z._)`${l} !== undefined`, () => {
    n.assign(s, l), mp(e, l);
  });
  function c(f) {
    switch (f) {
      case "string":
        n.elseIf((0, Z._)`${a} == "number" || ${a} == "boolean"`).assign(l, (0, Z._)`"" + ${s}`).elseIf((0, Z._)`${s} === null`).assign(l, (0, Z._)`""`);
        return;
      case "number":
        n.elseIf((0, Z._)`${a} == "boolean" || ${s} === null
              || (${a} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, Z._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Z._)`${a} === "boolean" || ${s} === null
              || (${a} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, Z._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Z._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, Z._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, Z._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, Z._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${s} === null`).assign(l, (0, Z._)`[${s}]`);
    }
  }
}
function mp({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Z._)`${t} !== undefined`, () => e.assign((0, Z._)`${t}[${r}]`, n));
}
function qo(e, t, r, n = Ir.Correct) {
  const s = n === Ir.Correct ? Z.operators.EQ : Z.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, Z._)`${t} ${s} null`;
    case "array":
      o = (0, Z._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, Z._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = a((0, Z._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = a();
      break;
    default:
      return (0, Z._)`typeof ${t} ${s} ${e}`;
  }
  return n === Ir.Correct ? o : (0, Z.not)(o);
  function a(l = Z.nil) {
    return (0, Z.and)((0, Z._)`typeof ${t} == "number"`, l, r ? (0, Z._)`isFinite(${t})` : Z.nil);
  }
}
ge.checkDataType = qo;
function wa(e, t, r, n) {
  if (e.length === 1)
    return qo(e[0], t, r, n);
  let s;
  const o = (0, ku.toHash)(e);
  if (o.array && o.object) {
    const a = (0, Z._)`typeof ${t} != "object"`;
    s = o.null ? a : (0, Z._)`!${t} || ${a}`, delete o.null, delete o.array, delete o.object;
  } else
    s = Z.nil;
  o.number && delete o.integer;
  for (const a in o)
    s = (0, Z.and)(s, qo(a, t, r, n));
  return s;
}
ge.checkDataTypes = wa;
const yp = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Z._)`{type: ${e}}` : (0, Z._)`{type: ${t}}`
};
function Sa(e) {
  const t = _p(e);
  (0, up.reportError)(t, yp);
}
ge.reportTypeError = Sa;
function _p(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, ku.schemaRefOrVal)(e, n, "type");
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
var Us = {};
Object.defineProperty(Us, "__esModule", { value: !0 });
Us.assignDefaults = void 0;
const $r = se, $p = M;
function gp(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      pc(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, o) => pc(e, o, s.default));
}
Us.assignDefaults = gp;
function pc(e, t, r) {
  const { gen: n, compositeRule: s, data: o, opts: a } = e;
  if (r === void 0)
    return;
  const l = (0, $r._)`${o}${(0, $r.getProperty)(t)}`;
  if (s) {
    (0, $p.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, $r._)`${l} === undefined`;
  a.useDefaults === "empty" && (c = (0, $r._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, $r._)`${l} = ${(0, $r.stringify)(r)}`);
}
var dt = {}, re = {};
Object.defineProperty(re, "__esModule", { value: !0 });
re.validateUnion = re.validateArray = re.usePattern = re.callValidateCode = re.schemaProperties = re.allSchemaProperties = re.noPropertyInData = re.propertyInData = re.isOwnProperty = re.hasPropFunc = re.reportMissingProp = re.checkMissingProp = re.checkReportMissingProp = void 0;
const pe = se, ba = M, Pt = mt, vp = M;
function Ep(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Oa(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, pe._)`${t}` }, !0), e.error();
  });
}
re.checkReportMissingProp = Ep;
function wp({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, pe.or)(...n.map((o) => (0, pe.and)(Oa(e, t, o, r.ownProperties), (0, pe._)`${s} = ${o}`)));
}
re.checkMissingProp = wp;
function Sp(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
re.reportMissingProp = Sp;
function Au(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, pe._)`Object.prototype.hasOwnProperty`
  });
}
re.hasPropFunc = Au;
function Pa(e, t, r) {
  return (0, pe._)`${Au(e)}.call(${t}, ${r})`;
}
re.isOwnProperty = Pa;
function bp(e, t, r, n) {
  const s = (0, pe._)`${t}${(0, pe.getProperty)(r)} !== undefined`;
  return n ? (0, pe._)`${s} && ${Pa(e, t, r)}` : s;
}
re.propertyInData = bp;
function Oa(e, t, r, n) {
  const s = (0, pe._)`${t}${(0, pe.getProperty)(r)} === undefined`;
  return n ? (0, pe.or)(s, (0, pe.not)(Pa(e, t, r))) : s;
}
re.noPropertyInData = Oa;
function Du(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
re.allSchemaProperties = Du;
function Pp(e, t) {
  return Du(t).filter((r) => !(0, ba.alwaysValidSchema)(e, t[r]));
}
re.schemaProperties = Pp;
function Op({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: o }, it: a }, l, c, f) {
  const u = f ? (0, pe._)`${e}, ${t}, ${n}${s}` : t, h = [
    [Pt.default.instancePath, (0, pe.strConcat)(Pt.default.instancePath, o)],
    [Pt.default.parentData, a.parentData],
    [Pt.default.parentDataProperty, a.parentDataProperty],
    [Pt.default.rootData, Pt.default.rootData]
  ];
  a.opts.dynamicRef && h.push([Pt.default.dynamicAnchors, Pt.default.dynamicAnchors]);
  const b = (0, pe._)`${u}, ${r.object(...h)}`;
  return c !== pe.nil ? (0, pe._)`${l}.call(${c}, ${b})` : (0, pe._)`${l}(${b})`;
}
re.callValidateCode = Op;
const Np = (0, pe._)`new RegExp`;
function Rp({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, o = s(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, pe._)`${s.code === "new RegExp" ? Np : (0, vp.useFunc)(e, s)}(${r}, ${n})`
  });
}
re.usePattern = Rp;
function Tp(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, o = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return a(() => t.assign(l, !1)), l;
  }
  return t.var(o, !0), a(() => t.break()), o;
  function a(l) {
    const c = t.const("len", (0, pe._)`${r}.length`);
    t.forRange("i", 0, c, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: ba.Type.Num
      }, o), t.if((0, pe.not)(o), l);
    });
  }
}
re.validateArray = Tp;
function Ip(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ba.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const a = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, f) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, l);
    t.assign(a, (0, pe._)`${a} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, pe.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
re.validateUnion = Ip;
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.validateKeywordUsage = dt.validSchemaType = dt.funcKeywordCode = dt.macroKeywordCode = void 0;
const Ce = se, cr = mt, kp = re, Cp = bn;
function jp(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: o, it: a } = e, l = t.macro.call(a.self, s, o, a), c = Lu(r, n, l);
  a.opts.validateSchema !== !1 && a.self.validateSchema(l, !0);
  const f = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: Ce.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
dt.macroKeywordCode = jp;
function Ap(e, t) {
  var r;
  const { gen: n, keyword: s, schema: o, parentSchema: a, $data: l, it: c } = e;
  Lp(c, t);
  const f = !l && t.compile ? t.compile.call(c.self, o, a, c) : t.validate, u = Lu(n, s, f), h = n.let("valid");
  e.block$data(h, b), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function b() {
    if (t.errors === !1)
      _(), t.modifying && mc(e), y(() => e.error());
    else {
      const p = t.async ? g() : v();
      t.modifying && mc(e), y(() => Dp(e, p));
    }
  }
  function g() {
    const p = n.let("ruleErrs", null);
    return n.try(() => _((0, Ce._)`await `), (E) => n.assign(h, !1).if((0, Ce._)`${E} instanceof ${c.ValidationError}`, () => n.assign(p, (0, Ce._)`${E}.errors`), () => n.throw(E))), p;
  }
  function v() {
    const p = (0, Ce._)`${u}.errors`;
    return n.assign(p, null), _(Ce.nil), p;
  }
  function _(p = t.async ? (0, Ce._)`await ` : Ce.nil) {
    const E = c.opts.passContext ? cr.default.this : cr.default.self, O = !("compile" in t && !l || t.schema === !1);
    n.assign(h, (0, Ce._)`${p}${(0, kp.callValidateCode)(e, u, E, O)}`, t.modifying);
  }
  function y(p) {
    var E;
    n.if((0, Ce.not)((E = t.valid) !== null && E !== void 0 ? E : h), p);
  }
}
dt.funcKeywordCode = Ap;
function mc(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ce._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Dp(e, t) {
  const { gen: r } = e;
  r.if((0, Ce._)`Array.isArray(${t})`, () => {
    r.assign(cr.default.vErrors, (0, Ce._)`${cr.default.vErrors} === null ? ${t} : ${cr.default.vErrors}.concat(${t})`).assign(cr.default.errors, (0, Ce._)`${cr.default.vErrors}.length`), (0, Cp.extendErrors)(e);
  }, () => e.error());
}
function Lp({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Lu(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ce.stringify)(r) });
}
function Mp(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
dt.validSchemaType = Mp;
function Fp({ schema: e, opts: t, self: r, errSchemaPath: n }, s, o) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(o) : s.keyword !== o)
    throw new Error("ajv implementation error");
  const a = s.dependencies;
  if (a != null && a.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${o}: ${a.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[o])) {
    const c = `keyword "${o}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
dt.validateKeywordUsage = Fp;
var Mt = {};
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.extendSubschemaMode = Mt.extendSubschemaData = Mt.getSubschema = void 0;
const lt = se, Mu = M;
function Up(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: o, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, lt._)`${e.schemaPath}${(0, lt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, lt._)`${e.schemaPath}${(0, lt.getProperty)(t)}${(0, lt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Mu.escapeFragment)(r)}`
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
Mt.getSubschema = Up;
function Vp(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: o, propertyName: a }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: u, opts: h } = t, b = l.let("data", (0, lt._)`${t.data}${(0, lt.getProperty)(r)}`, !0);
    c(b), e.errorPath = (0, lt.str)`${f}${(0, Mu.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, lt._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const f = s instanceof lt.Name ? s : l.let("data", s, !0);
    c(f), a !== void 0 && (e.propertyName = a);
  }
  o && (e.dataTypes = o);
  function c(f) {
    e.data = f, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, f];
  }
}
Mt.extendSubschemaData = Vp;
function qp(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Mt.extendSubschemaMode = qp;
var Oe = {}, Vs = function e(t, r) {
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
}, Fu = { exports: {} }, At = Fu.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  is(t, n, s, e, "", e);
};
At.keywords = {
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
At.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
At.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
At.skipKeywords = {
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
function is(e, t, r, n, s, o, a, l, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, o, a, l, c, f);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in At.arrayKeywords)
          for (var b = 0; b < h.length; b++)
            is(e, t, r, h[b], s + "/" + u + "/" + b, o, s, u, n, b);
      } else if (u in At.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            is(e, t, r, h[g], s + "/" + u + "/" + zp(g), o, s, u, n, g);
      } else (u in At.keywords || e.allKeys && !(u in At.skipKeywords)) && is(e, t, r, h, s + "/" + u, o, s, u, n);
    }
    r(n, s, o, a, l, c, f);
  }
}
function zp(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var xp = Fu.exports;
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.getSchemaRefs = Oe.resolveUrl = Oe.normalizeId = Oe._getFullPath = Oe.getFullPath = Oe.inlineRef = void 0;
const Gp = M, Bp = Vs, Kp = xp, Hp = /* @__PURE__ */ new Set([
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
function Wp(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !zo(e) : t ? Uu(e) <= t : !1;
}
Oe.inlineRef = Wp;
const Xp = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function zo(e) {
  for (const t in e) {
    if (Xp.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(zo) || typeof r == "object" && zo(r))
      return !0;
  }
  return !1;
}
function Uu(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Hp.has(r) && (typeof e[r] == "object" && (0, Gp.eachItem)(e[r], (n) => t += Uu(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Vu(e, t = "", r) {
  r !== !1 && (t = kr(t));
  const n = e.parse(t);
  return qu(e, n);
}
Oe.getFullPath = Vu;
function qu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Oe._getFullPath = qu;
const Jp = /#\/?$/;
function kr(e) {
  return e ? e.replace(Jp, "") : "";
}
Oe.normalizeId = kr;
function Yp(e, t, r) {
  return r = kr(r), e.resolve(t, r);
}
Oe.resolveUrl = Yp;
const Qp = /^[a-z_][-a-z0-9._]*$/i;
function Zp(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = kr(e[r] || t), o = { "": s }, a = Vu(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return Kp(e, { allKeys: !0 }, (h, b, g, v) => {
    if (v === void 0)
      return;
    const _ = a + b;
    let y = o[v];
    typeof h[r] == "string" && (y = p.call(this, h[r])), E.call(this, h.$anchor), E.call(this, h.$dynamicAnchor), o[b] = y;
    function p(O) {
      const N = this.opts.uriResolver.resolve;
      if (O = kr(y ? N(y, O) : O), c.has(O))
        throw u(O);
      c.add(O);
      let I = this.refs[O];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? f(h, I.schema, O) : O !== kr(_) && (O[0] === "#" ? (f(h, l[O], O), l[O] = h) : this.refs[O] = _), O;
    }
    function E(O) {
      if (typeof O == "string") {
        if (!Qp.test(O))
          throw new Error(`invalid anchor "${O}"`);
        p.call(this, `#${O}`);
      }
    }
  }), l;
  function f(h, b, g) {
    if (b !== void 0 && !Bp(h, b))
      throw u(g);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Oe.getSchemaRefs = Zp;
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.getData = nt.KeywordCxt = nt.validateFunctionCode = void 0;
const zu = Mr, yc = ge, Na = $t, Es = ge, em = Us, fn = dt, io = Mt, K = se, J = mt, tm = Oe, gt = M, Qr = bn;
function rm(e) {
  if (Bu(e) && (Ku(e), Gu(e))) {
    om(e);
    return;
  }
  xu(e, () => (0, zu.topBoolOrEmptySchema)(e));
}
nt.validateFunctionCode = rm;
function xu({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, o) {
  s.code.es5 ? e.func(t, (0, K._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${_c(r, s)}`), sm(e, s), e.code(o);
  }) : e.func(t, (0, K._)`${J.default.data}, ${nm(s)}`, n.$async, () => e.code(_c(r, s)).code(o));
}
function nm(e) {
  return (0, K._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, K._)`, ${J.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function sm(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, K._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, K._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, K._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, K._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, K._)`""`), e.var(J.default.parentData, (0, K._)`undefined`), e.var(J.default.parentDataProperty, (0, K._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function om(e) {
  const { schema: t, opts: r, gen: n } = e;
  xu(e, () => {
    r.$comment && t.$comment && Wu(e), um(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && am(e), Hu(e), hm(e);
  });
}
function am(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function _c(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function im(e, t) {
  if (Bu(e) && (Ku(e), Gu(e))) {
    cm(e, t);
    return;
  }
  (0, zu.boolOrEmptySchema)(e, t);
}
function Gu({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Bu(e) {
  return typeof e.schema != "boolean";
}
function cm(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Wu(e), fm(e), dm(e);
  const o = n.const("_errs", J.default.errors);
  Hu(e, o), n.var(t, (0, K._)`${o} === ${J.default.errors}`);
}
function Ku(e) {
  (0, gt.checkUnknownRules)(e), lm(e);
}
function Hu(e, t) {
  if (e.opts.jtd)
    return $c(e, [], !1, t);
  const r = (0, yc.getSchemaTypes)(e.schema), n = (0, yc.coerceAndCheckDataType)(e, r);
  $c(e, r, !n, t);
}
function lm(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, gt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function um(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, gt.checkStrictMode)(e, "default is ignored in the schema root");
}
function fm(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, tm.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function dm(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Wu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const o = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${J.default.self}.logger.log(${o})`);
  else if (typeof s.$comment == "function") {
    const a = (0, K.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${J.default.self}.opts.$comment(${o}, ${a}, ${l}.schema)`);
  }
}
function hm(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: o } = e;
  r.$async ? t.if((0, K._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, K._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, J.default.vErrors), o.unevaluated && pm(e), t.return((0, K._)`${J.default.errors} === 0`));
}
function pm({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function $c(e, t, r, n) {
  const { gen: s, schema: o, data: a, allErrors: l, opts: c, self: f } = e, { RULES: u } = f;
  if (o.$ref && (c.ignoreKeywordsWithRef || !(0, gt.schemaHasRulesButRef)(o, u))) {
    s.block(() => Yu(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || mm(e, t), s.block(() => {
    for (const b of u.rules)
      h(b);
    h(u.post);
  });
  function h(b) {
    (0, Na.shouldUseGroup)(o, b) && (b.type ? (s.if((0, Es.checkDataType)(b.type, a, c.strictNumbers)), gc(e, b), t.length === 1 && t[0] === b.type && r && (s.else(), (0, Es.reportTypeError)(e)), s.endIf()) : gc(e, b), l || s.if((0, K._)`${J.default.errors} === ${n || 0}`));
  }
}
function gc(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, em.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, Na.shouldUseRule)(n, o) && Yu(e, o.keyword, o.definition, t.type);
  });
}
function mm(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (ym(e, t), e.opts.allowUnionTypes || _m(e, t), $m(e, e.dataTypes));
}
function ym(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Xu(e.dataTypes, r) || Ra(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), vm(e, t);
  }
}
function _m(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Ra(e, "use allowUnionTypes to allow union type keyword");
}
function $m(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Na.shouldUseRule)(e.schema, s)) {
      const { type: o } = s.definition;
      o.length && !o.some((a) => gm(t, a)) && Ra(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function gm(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Xu(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function vm(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Xu(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Ra(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, gt.checkStrictMode)(e, t, e.opts.strictTypes);
}
let Ju = class {
  constructor(t, r, n) {
    if ((0, fn.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, gt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Qu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, fn.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Qr.reportExtraError : Qr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Qr.reportError)(this, this.def.$dataError || Qr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Qr.resetErrorsCount)(this.gen, this.errsCount);
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
    const { gen: n, schemaCode: s, schemaType: o, def: a } = this;
    n.if((0, K.or)((0, K._)`${s} === undefined`, r)), t !== K.nil && n.assign(t, !0), (o.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: o } = this;
    return (0, K.or)(a(), l());
    function a() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Es.checkDataTypes)(c, r, o.opts.strictNumbers, Es.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, K._)`!${c}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, io.getSubschema)(this.it, t);
    (0, io.extendSubschemaData)(n, this.it, t), (0, io.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return im(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = gt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = gt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
nt.KeywordCxt = Ju;
function Yu(e, t, r, n) {
  const s = new Ju(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, fn.funcKeywordCode)(s, r) : "macro" in r ? (0, fn.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, fn.funcKeywordCode)(s, r);
}
const Em = /^\/(?:[^~]|~0|~1)*$/, wm = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Qu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, o;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!Em.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, o = J.default.rootData;
  } else {
    const f = wm.exec(e);
    if (!f)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +f[1];
    if (s = f[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (o = r[t - u], !s)
      return o;
  }
  let a = o;
  const l = s.split("/");
  for (const f of l)
    f && (o = (0, K._)`${o}${(0, K.getProperty)((0, gt.unescapeJsonPointer)(f))}`, a = (0, K._)`${a} && ${o}`);
  return a;
  function c(f, u) {
    return `Cannot access ${f} ${u} levels up, current level is ${t}`;
  }
}
nt.getData = Qu;
var Pn = {};
Object.defineProperty(Pn, "__esModule", { value: !0 });
let Sm = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
Pn.default = Sm;
var zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
const co = Oe;
let bm = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, co.resolveUrl)(t, r, n), this.missingSchema = (0, co.normalizeId)((0, co.getFullPath)(t, this.missingRef));
  }
};
zr.default = bm;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.resolveSchema = Fe.getCompilingSchema = Fe.resolveRef = Fe.compileSchema = Fe.SchemaEnv = void 0;
const Xe = se, Pm = Pn, rr = mt, tt = Oe, vc = M, Om = nt;
let qs = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, tt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Fe.SchemaEnv = qs;
function Ta(e) {
  const t = Zu.call(this, e);
  if (t)
    return t;
  const r = (0, tt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: o } = this.opts, a = new Xe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: o });
  let l;
  e.$async && (l = a.scopeValue("Error", {
    ref: Pm.default,
    code: (0, Xe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = a.scopeName("validate");
  e.validateName = c;
  const f = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: rr.default.data,
    parentData: rr.default.parentData,
    parentDataProperty: rr.default.parentDataProperty,
    dataNames: [rr.default.data],
    dataPathArr: [Xe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Xe.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Xe.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Xe._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, Om.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
    const h = a.toString();
    u = `${a.scopeRefs(rr.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const g = new Function(`${rr.default.self}`, `${rr.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: g }), g.errors = null, g.schema = e.schema, g.schemaEnv = e, e.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: c, validateCode: h, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: v, items: _ } = f;
      g.evaluated = {
        props: v instanceof Xe.Name ? void 0 : v,
        items: _ instanceof Xe.Name ? void 0 : _,
        dynamicProps: v instanceof Xe.Name,
        dynamicItems: _ instanceof Xe.Name
      }, g.source && (g.source.evaluated = (0, Xe.stringify)(g.evaluated));
    }
    return e.validate = g, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Fe.compileSchema = Ta;
function Nm(e, t, r) {
  var n;
  r = (0, tt.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let o = Im.call(this, e, r);
  if (o === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    a && (o = new qs({ schema: a, schemaId: l, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = Rm.call(this, o);
}
Fe.resolveRef = Nm;
function Rm(e) {
  return (0, tt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Ta.call(this, e);
}
function Zu(e) {
  for (const t of this._compilations)
    if (Tm(t, e))
      return t;
}
Fe.getCompilingSchema = Zu;
function Tm(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Im(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || zs.call(this, e, t);
}
function zs(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, tt._getFullPath)(this.opts.uriResolver, r);
  let s = (0, tt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return lo.call(this, r, e);
  const o = (0, tt.normalizeId)(n), a = this.refs[o] || this.schemas[o];
  if (typeof a == "string") {
    const l = zs.call(this, e, a);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : lo.call(this, r, l);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || Ta.call(this, a), o === (0, tt.normalizeId)(t)) {
      const { schema: l } = a, { schemaId: c } = this.opts, f = l[c];
      return f && (s = (0, tt.resolveUrl)(this.opts.uriResolver, s, f)), new qs({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return lo.call(this, r, a);
  }
}
Fe.resolveSchema = zs;
const km = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function lo(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, vc.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !km.has(l) && f && (t = (0, tt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, vc.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, tt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = zs.call(this, n, l);
  }
  const { schemaId: a } = this.opts;
  if (o = o || new qs({ schema: r, schemaId: a, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const Cm = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", jm = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Am = "object", Dm = [
  "$data"
], Lm = {
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
}, Mm = !1, Fm = {
  $id: Cm,
  description: jm,
  type: Am,
  required: Dm,
  properties: Lm,
  additionalProperties: Mm
};
var Ia = {}, xs = { exports: {} };
const Um = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), ef = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function tf(e) {
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
const Vm = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Ec(e) {
  return e.length = 0, !0;
}
function qm(e, t, r) {
  if (e.length) {
    const n = tf(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function zm(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let o = !1, a = !1, l = qm;
  for (let c = 0; c < e.length; c++) {
    const f = e[c];
    if (!(f === "[" || f === "]"))
      if (f === ":") {
        if (o === !0 && (a = !0), !l(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (o = !0), n.push(":");
        continue;
      } else if (f === "%") {
        if (!l(s, n, r))
          break;
        l = Ec;
      } else {
        s.push(f);
        continue;
      }
  }
  return s.length && (l === Ec ? r.zone = s.join("") : a ? n.push(s.join("")) : n.push(tf(s))), r.address = n.join(""), r;
}
function rf(e) {
  if (xm(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = zm(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function xm(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function Gm(e) {
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
function Bm(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Km(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!ef(r)) {
      const n = rf(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var nf = {
  nonSimpleDomain: Vm,
  recomposeAuthority: Km,
  normalizeComponentEncoding: Bm,
  removeDotSegments: Gm,
  isIPv4: ef,
  isUUID: Um,
  normalizeIPv6: rf
};
const { isUUID: Hm } = nf, Wm = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function sf(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function of(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function af(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function Xm(e) {
  return e.secure = sf(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function Jm(e) {
  if ((e.port === (sf(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Ym(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Wm);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, o = ka(s);
    e.path = void 0, o && (e = o.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Qm(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, o = ka(s);
  o && (e = o.serialize(e, t));
  const a = e, l = e.nss;
  return a.path = `${n || t.nid}:${l}`, t.skipEscape = !0, a;
}
function Zm(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Hm(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function ey(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const cf = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: of,
    serialize: af
  }
), ty = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: cf.domainHost,
    parse: of,
    serialize: af
  }
), cs = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: Xm,
    serialize: Jm
  }
), ry = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: cs.domainHost,
    parse: cs.parse,
    serialize: cs.serialize
  }
), ny = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: Ym,
    serialize: Qm,
    skipNormalize: !0
  }
), sy = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: Zm,
    serialize: ey,
    skipNormalize: !0
  }
), ws = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: cf,
    https: ty,
    ws: cs,
    wss: ry,
    urn: ny,
    "urn:uuid": sy
  }
);
Object.setPrototypeOf(ws, null);
function ka(e) {
  return e && (ws[
    /** @type {SchemeName} */
    e
  ] || ws[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var oy = {
  SCHEMES: ws,
  getSchemeHandler: ka
};
const { normalizeIPv6: ay, removeDotSegments: an, recomposeAuthority: iy, normalizeComponentEncoding: Dn, isIPv4: cy, nonSimpleDomain: ly } = nf, { SCHEMES: uy, getSchemeHandler: lf } = oy;
function fy(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  ht(wt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  wt(ht(e, t), t)), e;
}
function dy(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = uf(wt(e, n), wt(t, n), n, !0);
  return n.skipEscape = !0, ht(s, n);
}
function uf(e, t, r, n) {
  const s = {};
  return n || (e = wt(ht(e, r), r), t = wt(ht(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = an(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = an(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = an(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = an(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function hy(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ht(Dn(wt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ht(Dn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ht(Dn(wt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ht(Dn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ht(e, t) {
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
  }, n = Object.assign({}, t), s = [], o = lf(n.scheme || r.scheme);
  o && o.serialize && o.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const a = iy(r);
  if (a !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(a), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let l = r.path;
    !n.absolutePath && (!o || !o.absolutePath) && (l = an(l)), a === void 0 && l[0] === "/" && l[1] === "/" && (l = "/%2F" + l.slice(2)), s.push(l);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const py = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function wt(e, t) {
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
  const o = e.match(py);
  if (o) {
    if (n.scheme = o[1], n.userinfo = o[3], n.host = o[4], n.port = parseInt(o[5], 10), n.path = o[6] || "", n.query = o[7], n.fragment = o[8], isNaN(n.port) && (n.port = o[5]), n.host)
      if (cy(n.host) === !1) {
        const c = ay(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const a = lf(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!a || !a.unicodeSupport) && n.host && (r.domainHost || a && a.domainHost) && s === !1 && ly(n.host))
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
const Ca = {
  SCHEMES: uy,
  normalize: fy,
  resolve: dy,
  resolveComponent: uf,
  equal: hy,
  serialize: ht,
  parse: wt
};
xs.exports = Ca;
xs.exports.default = Ca;
xs.exports.fastUri = Ca;
var ff = xs.exports;
Object.defineProperty(Ia, "__esModule", { value: !0 });
const df = ff;
df.code = 'require("ajv/dist/runtime/uri").default';
Ia.default = df;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = nt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = se;
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
  const n = Pn, s = zr, o = pr, a = Fe, l = se, c = Oe, f = ge, u = M, h = Fm, b = Ia, g = (w, m) => new RegExp(w, m);
  g.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], _ = /* @__PURE__ */ new Set([
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
  ]), y = {
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
  }, E = 200;
  function O(w) {
    var m, S, $, i, d, P, k, C, B, x, oe, Ve, qt, zt, xt, Gt, Bt, Kt, Ht, Wt, Xt, Jt, Yt, Qt, Zt;
    const We = w.strict, er = (m = w.code) === null || m === void 0 ? void 0 : m.optimize, Jr = er === !0 || er === void 0 ? 1 : er || 0, Yr = ($ = (S = w.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : g, ao = (i = w.uriResolver) !== null && i !== void 0 ? i : b.default;
    return {
      strictSchema: (P = (d = w.strictSchema) !== null && d !== void 0 ? d : We) !== null && P !== void 0 ? P : !0,
      strictNumbers: (C = (k = w.strictNumbers) !== null && k !== void 0 ? k : We) !== null && C !== void 0 ? C : !0,
      strictTypes: (x = (B = w.strictTypes) !== null && B !== void 0 ? B : We) !== null && x !== void 0 ? x : "log",
      strictTuples: (Ve = (oe = w.strictTuples) !== null && oe !== void 0 ? oe : We) !== null && Ve !== void 0 ? Ve : "log",
      strictRequired: (zt = (qt = w.strictRequired) !== null && qt !== void 0 ? qt : We) !== null && zt !== void 0 ? zt : !1,
      code: w.code ? { ...w.code, optimize: Jr, regExp: Yr } : { optimize: Jr, regExp: Yr },
      loopRequired: (xt = w.loopRequired) !== null && xt !== void 0 ? xt : E,
      loopEnum: (Gt = w.loopEnum) !== null && Gt !== void 0 ? Gt : E,
      meta: (Bt = w.meta) !== null && Bt !== void 0 ? Bt : !0,
      messages: (Kt = w.messages) !== null && Kt !== void 0 ? Kt : !0,
      inlineRefs: (Ht = w.inlineRefs) !== null && Ht !== void 0 ? Ht : !0,
      schemaId: (Wt = w.schemaId) !== null && Wt !== void 0 ? Wt : "$id",
      addUsedSchema: (Xt = w.addUsedSchema) !== null && Xt !== void 0 ? Xt : !0,
      validateSchema: (Jt = w.validateSchema) !== null && Jt !== void 0 ? Jt : !0,
      validateFormats: (Yt = w.validateFormats) !== null && Yt !== void 0 ? Yt : !0,
      unicodeRegExp: (Qt = w.unicodeRegExp) !== null && Qt !== void 0 ? Qt : !0,
      int32range: (Zt = w.int32range) !== null && Zt !== void 0 ? Zt : !0,
      uriResolver: ao
    };
  }
  class N {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...O(m) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: _, es5: S, lines: $ }), this.logger = q(m.logger);
      const i = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, o.getRules)(), I.call(this, y, m, "NOT SUPPORTED"), I.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = X.call(this), m.formats && ae.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && U.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), W.call(this), m.validateFormats = i;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: S, schemaId: $ } = this.opts;
      let i = h;
      $ === "id" && (i = { ...h }, i.id = i.$id, delete i.$id), S && m && this.addMetaSchema(i, i[$], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[S] || m : void 0;
    }
    validate(m, S) {
      let $;
      if (typeof m == "string") {
        if ($ = this.getSchema(m), !$)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        $ = this.compile(m);
      const i = $(S);
      return "$async" in $ || (this.errors = $.errors), i;
    }
    compile(m, S) {
      const $ = this._addSchema(m, S);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(m, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return i.call(this, m, S);
      async function i(x, oe) {
        await d.call(this, x.$schema);
        const Ve = this._addSchema(x, oe);
        return Ve.validate || P.call(this, Ve);
      }
      async function d(x) {
        x && !this.getSchema(x) && await i.call(this, { $ref: x }, !0);
      }
      async function P(x) {
        try {
          return this._compileSchemaEnv(x);
        } catch (oe) {
          if (!(oe instanceof s.default))
            throw oe;
          return k.call(this, oe), await C.call(this, oe.missingSchema), P.call(this, x);
        }
      }
      function k({ missingSchema: x, missingRef: oe }) {
        if (this.refs[x])
          throw new Error(`AnySchema ${x} is loaded but ${oe} cannot be resolved`);
      }
      async function C(x) {
        const oe = await B.call(this, x);
        this.refs[x] || await d.call(this, oe.$schema), this.refs[x] || this.addSchema(oe, x, S);
      }
      async function B(x) {
        const oe = this._loading[x];
        if (oe)
          return oe;
        try {
          return await (this._loading[x] = $(x));
        } finally {
          delete this._loading[x];
        }
      }
    }
    // Adds schema to the instance
    addSchema(m, S, $, i = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const P of m)
          this.addSchema(P, void 0, $, i);
        return this;
      }
      let d;
      if (typeof m == "object") {
        const { schemaId: P } = this.opts;
        if (d = m[P], d !== void 0 && typeof d != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return S = (0, c.normalizeId)(S || d), this._checkUnique(S), this.schemas[S] = this._addSchema(m, $, S, i, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, S, $ = this.opts.validateSchema) {
      return this.addSchema(m, S, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, S) {
      if (typeof m == "boolean")
        return !0;
      let $;
      if ($ = m.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const i = this.validate($, m);
      if (!i && S) {
        const d = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(d);
        else
          throw new Error(d);
      }
      return i;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(m) {
      let S;
      for (; typeof (S = z.call(this, m)) == "string"; )
        m = S;
      if (S === void 0) {
        const { schemaId: $ } = this.opts, i = new a.SchemaEnv({ schema: {}, schemaId: $ });
        if (S = a.resolveSchema.call(this, i, m), !S)
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
          let $ = m[this.opts.schemaId];
          return $ && ($ = (0, c.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
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
      let $;
      if (typeof m == "string")
        $ = m, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = $);
      else if (typeof m == "object" && S === void 0) {
        if (S = m, $ = S.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (j.call(this, $, S), !S)
        return (0, u.eachItem)($, (d) => A.call(this, d)), this;
      L.call(this, S);
      const i = {
        ...S,
        type: (0, f.getJSONTypes)(S.type),
        schemaType: (0, f.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)($, i.type.length === 0 ? (d) => A.call(this, d, i) : (d) => i.type.forEach((P) => A.call(this, d, i, P))), this;
    }
    getKeyword(m) {
      const S = this.RULES.all[m];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: S } = this;
      delete S.keywords[m], delete S.all[m];
      for (const $ of S.rules) {
        const i = $.rules.findIndex((d) => d.keyword === m);
        i >= 0 && $.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[m] = S, this;
    }
    errorsText(m = this.errors, { separator: S = ", ", dataVar: $ = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((i) => `${$}${i.instancePath} ${i.message}`).reduce((i, d) => i + S + d);
    }
    $dataMetaSchema(m, S) {
      const $ = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const i of S) {
        const d = i.split("/").slice(1);
        let P = m;
        for (const k of d)
          P = P[k];
        for (const k in $) {
          const C = $[k];
          if (typeof C != "object")
            continue;
          const { $data: B } = C.definition, x = P[k];
          B && x && (P[k] = T(x));
        }
      }
      return m;
    }
    _removeAllSchemas(m, S) {
      for (const $ in m) {
        const i = m[$];
        (!S || S.test($)) && (typeof i == "string" ? delete m[$] : i && !i.meta && (this._cache.delete(i.schema), delete m[$]));
      }
    }
    _addSchema(m, S, $, i = this.opts.validateSchema, d = this.opts.addUsedSchema) {
      let P;
      const { schemaId: k } = this.opts;
      if (typeof m == "object")
        P = m[k];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof m != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let C = this._cache.get(m);
      if (C !== void 0)
        return C;
      $ = (0, c.normalizeId)(P || $);
      const B = c.getSchemaRefs.call(this, m, $);
      return C = new a.SchemaEnv({ schema: m, schemaId: k, meta: S, baseId: $, localRefs: B }), this._cache.set(C.schema, C), d && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = C), i && this.validateSchema(m, !0), C;
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
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, m);
      } finally {
        this.opts = S;
      }
    }
  }
  N.ValidationError = n.default, N.MissingRefError = s.default, e.default = N;
  function I(w, m, S, $ = "error") {
    for (const i in w) {
      const d = i;
      d in m && this.logger[$](`${S}: option ${i}. ${w[d]}`);
    }
  }
  function z(w) {
    return w = (0, c.normalizeId)(w), this.schemas[w] || this.refs[w];
  }
  function W() {
    const w = this.opts.schemas;
    if (w)
      if (Array.isArray(w))
        this.addSchema(w);
      else
        for (const m in w)
          this.addSchema(w[m], m);
  }
  function ae() {
    for (const w in this.opts.formats) {
      const m = this.opts.formats[w];
      m && this.addFormat(w, m);
    }
  }
  function U(w) {
    if (Array.isArray(w)) {
      this.addVocabulary(w);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in w) {
      const S = w[m];
      S.keyword || (S.keyword = m), this.addKeyword(S);
    }
  }
  function X() {
    const w = { ...this.opts };
    for (const m of v)
      delete w[m];
    return w;
  }
  const V = { log() {
  }, warn() {
  }, error() {
  } };
  function q(w) {
    if (w === !1)
      return V;
    if (w === void 0)
      return console;
    if (w.log && w.warn && w.error)
      return w;
    throw new Error("logger must implement log, warn and error methods");
  }
  const G = /^[a-z_$][a-z0-9_$:-]*$/i;
  function j(w, m) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(w, ($) => {
      if (S.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!G.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function A(w, m, S) {
    var $;
    const i = m == null ? void 0 : m.post;
    if (S && i)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: d } = this;
    let P = i ? d.post : d.rules.find(({ type: C }) => C === S);
    if (P || (P = { type: S, rules: [] }, d.rules.push(P)), d.keywords[w] = !0, !m)
      return;
    const k = {
      keyword: w,
      definition: {
        ...m,
        type: (0, f.getJSONTypes)(m.type),
        schemaType: (0, f.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? D.call(this, P, k, m.before) : P.rules.push(k), d.all[w] = k, ($ = m.implements) === null || $ === void 0 || $.forEach((C) => this.addKeyword(C));
  }
  function D(w, m, S) {
    const $ = w.rules.findIndex((i) => i.keyword === S);
    $ >= 0 ? w.rules.splice($, 0, m) : (w.rules.push(m), this.logger.warn(`rule ${S} is not defined`));
  }
  function L(w) {
    let { metaSchema: m } = w;
    m !== void 0 && (w.$data && this.opts.$data && (m = T(m)), w.validateSchema = this.compile(m, !0));
  }
  const R = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(w) {
    return { anyOf: [w, R] };
  }
})(wu);
var ja = {}, Aa = {}, Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const my = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Da.default = my;
var mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.callRef = mr.getValidate = void 0;
const yy = zr, wc = re, Le = se, gr = mt, Sc = Fe, Ln = M, _y = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: o, validateName: a, opts: l, self: c } = n, { root: f } = o;
    if ((r === "#" || r === "#/") && s === f.baseId)
      return h();
    const u = Sc.resolveRef.call(c, f, s, r);
    if (u === void 0)
      throw new yy.default(n.opts.uriResolver, s, r);
    if (u instanceof Sc.SchemaEnv)
      return b(u);
    return g(u);
    function h() {
      if (o === f)
        return ls(e, a, o, o.$async);
      const v = t.scopeValue("root", { ref: f });
      return ls(e, (0, Le._)`${v}.validate`, f, f.$async);
    }
    function b(v) {
      const _ = hf(e, v);
      ls(e, _, v, v.$async);
    }
    function g(v) {
      const _ = t.scopeValue("schema", l.code.source === !0 ? { ref: v, code: (0, Le.stringify)(v) } : { ref: v }), y = t.name("valid"), p = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Le.nil,
        topSchemaRef: _,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(p), e.ok(y);
    }
  }
};
function hf(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Le._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
mr.getValidate = hf;
function ls(e, t, r, n) {
  const { gen: s, it: o } = e, { allErrors: a, schemaEnv: l, opts: c } = o, f = c.passContext ? gr.default.this : Le.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Le._)`await ${(0, wc.callValidateCode)(e, t, f)}`), g(t), a || s.assign(v, !0);
    }, (_) => {
      s.if((0, Le._)`!(${_} instanceof ${o.ValidationError})`, () => s.throw(_)), b(_), a || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, wc.callValidateCode)(e, t, f), () => g(t), () => b(t));
  }
  function b(v) {
    const _ = (0, Le._)`${v}.errors`;
    s.assign(gr.default.vErrors, (0, Le._)`${gr.default.vErrors} === null ? ${_} : ${gr.default.vErrors}.concat(${_})`), s.assign(gr.default.errors, (0, Le._)`${gr.default.vErrors}.length`);
  }
  function g(v) {
    var _;
    if (!o.opts.unevaluated)
      return;
    const y = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (o.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (o.props = Ln.mergeEvaluated.props(s, y.props, o.props));
      else {
        const p = s.var("props", (0, Le._)`${v}.evaluated.props`);
        o.props = Ln.mergeEvaluated.props(s, p, o.props, Le.Name);
      }
    if (o.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (o.items = Ln.mergeEvaluated.items(s, y.items, o.items));
      else {
        const p = s.var("items", (0, Le._)`${v}.evaluated.items`);
        o.items = Ln.mergeEvaluated.items(s, p, o.items, Le.Name);
      }
  }
}
mr.callRef = ls;
mr.default = _y;
Object.defineProperty(Aa, "__esModule", { value: !0 });
const $y = Da, gy = mr, vy = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  $y.default,
  gy.default
];
Aa.default = vy;
var La = {}, Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const Ss = se, Ot = Ss.operators, bs = {
  maximum: { okStr: "<=", ok: Ot.LTE, fail: Ot.GT },
  minimum: { okStr: ">=", ok: Ot.GTE, fail: Ot.LT },
  exclusiveMaximum: { okStr: "<", ok: Ot.LT, fail: Ot.GTE },
  exclusiveMinimum: { okStr: ">", ok: Ot.GT, fail: Ot.LTE }
}, Ey = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ss.str)`must be ${bs[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ss._)`{comparison: ${bs[e].okStr}, limit: ${t}}`
}, wy = {
  keyword: Object.keys(bs),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Ey,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ss._)`${r} ${bs[t].fail} ${n} || isNaN(${r})`);
  }
};
Ma.default = wy;
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const dn = se, Sy = {
  message: ({ schemaCode: e }) => (0, dn.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, dn._)`{multipleOf: ${e}}`
}, by = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Sy,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, o = s.opts.multipleOfPrecision, a = t.let("res"), l = o ? (0, dn._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, dn._)`${a} !== parseInt(${a})`;
    e.fail$data((0, dn._)`(${n} === 0 || (${a} = ${r}/${n}, ${l}))`);
  }
};
Fa.default = by;
var Ua = {}, Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
function pf(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Va.default = pf;
pf.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ua, "__esModule", { value: !0 });
const lr = se, Py = M, Oy = Va, Ny = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, lr.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, lr._)`{limit: ${e}}`
}, Ry = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Ny,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, o = t === "maxLength" ? lr.operators.GT : lr.operators.LT, a = s.opts.unicode === !1 ? (0, lr._)`${r}.length` : (0, lr._)`${(0, Py.useFunc)(e.gen, Oy.default)}(${r})`;
    e.fail$data((0, lr._)`${a} ${o} ${n}`);
  }
};
Ua.default = Ry;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const Ty = re, Ps = se, Iy = {
  message: ({ schemaCode: e }) => (0, Ps.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Ps._)`{pattern: ${e}}`
}, ky = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Iy,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: o } = e, a = o.opts.unicodeRegExp ? "u" : "", l = r ? (0, Ps._)`(new RegExp(${s}, ${a}))` : (0, Ty.usePattern)(e, n);
    e.fail$data((0, Ps._)`!${l}.test(${t})`);
  }
};
qa.default = ky;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const hn = se, Cy = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, hn.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, hn._)`{limit: ${e}}`
}, jy = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Cy,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? hn.operators.GT : hn.operators.LT;
    e.fail$data((0, hn._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
za.default = jy;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const Zr = re, pn = se, Ay = M, Dy = {
  message: ({ params: { missingProperty: e } }) => (0, pn.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, pn._)`{missingProperty: ${e}}`
}, Ly = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Dy,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: o, it: a } = e, { opts: l } = a;
    if (!o && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (a.allErrors ? f() : u(), l.strictRequired) {
      const g = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const _ of r)
        if ((g == null ? void 0 : g[_]) === void 0 && !v.has(_)) {
          const y = a.schemaEnv.baseId + a.errSchemaPath, p = `required property "${_}" is not defined at "${y}" (strictRequired)`;
          (0, Ay.checkStrictMode)(a, p, a.opts.strictRequired);
        }
    }
    function f() {
      if (c || o)
        e.block$data(pn.nil, h);
      else
        for (const g of r)
          (0, Zr.checkReportMissingProp)(e, g);
    }
    function u() {
      const g = t.let("missing");
      if (c || o) {
        const v = t.let("valid", !0);
        e.block$data(v, () => b(g, v)), e.ok(v);
      } else
        t.if((0, Zr.checkMissingProp)(e, r, g)), (0, Zr.reportMissingProp)(e, g), t.else();
    }
    function h() {
      t.forOf("prop", n, (g) => {
        e.setParams({ missingProperty: g }), t.if((0, Zr.noPropertyInData)(t, s, g, l.ownProperties), () => e.error());
      });
    }
    function b(g, v) {
      e.setParams({ missingProperty: g }), t.forOf(g, n, () => {
        t.assign(v, (0, Zr.propertyInData)(t, s, g, l.ownProperties)), t.if((0, pn.not)(v), () => {
          e.error(), t.break();
        });
      }, pn.nil);
    }
  }
};
xa.default = Ly;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const mn = se, My = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, mn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, mn._)`{limit: ${e}}`
}, Fy = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: My,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? mn.operators.GT : mn.operators.LT;
    e.fail$data((0, mn._)`${r}.length ${s} ${n}`);
  }
};
Ga.default = Fy;
var Ba = {}, On = {};
Object.defineProperty(On, "__esModule", { value: !0 });
const mf = Vs;
mf.code = 'require("ajv/dist/runtime/equal").default';
On.default = mf;
Object.defineProperty(Ba, "__esModule", { value: !0 });
const uo = ge, Se = se, Uy = M, Vy = On, qy = {
  message: ({ params: { i: e, j: t } }) => (0, Se.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Se._)`{i: ${e}, j: ${t}}`
}, zy = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: qy,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: o, schemaCode: a, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), f = o.items ? (0, uo.getSchemaTypes)(o.items) : [];
    e.block$data(c, u, (0, Se._)`${a} === false`), e.ok(c);
    function u() {
      const v = t.let("i", (0, Se._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: v, j: _ }), t.assign(c, !0), t.if((0, Se._)`${v} > 1`, () => (h() ? b : g)(v, _));
    }
    function h() {
      return f.length > 0 && !f.some((v) => v === "object" || v === "array");
    }
    function b(v, _) {
      const y = t.name("item"), p = (0, uo.checkDataTypes)(f, y, l.opts.strictNumbers, uo.DataType.Wrong), E = t.const("indices", (0, Se._)`{}`);
      t.for((0, Se._)`;${v}--;`, () => {
        t.let(y, (0, Se._)`${r}[${v}]`), t.if(p, (0, Se._)`continue`), f.length > 1 && t.if((0, Se._)`typeof ${y} == "string"`, (0, Se._)`${y} += "_"`), t.if((0, Se._)`typeof ${E}[${y}] == "number"`, () => {
          t.assign(_, (0, Se._)`${E}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Se._)`${E}[${y}] = ${v}`);
      });
    }
    function g(v, _) {
      const y = (0, Uy.useFunc)(t, Vy.default), p = t.name("outer");
      t.label(p).for((0, Se._)`;${v}--;`, () => t.for((0, Se._)`${_} = ${v}; ${_}--;`, () => t.if((0, Se._)`${y}(${r}[${v}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
Ba.default = zy;
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const xo = se, xy = M, Gy = On, By = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, xo._)`{allowedValue: ${e}}`
}, Ky = {
  keyword: "const",
  $data: !0,
  error: By,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, xo._)`!${(0, xy.useFunc)(t, Gy.default)}(${r}, ${s})`) : e.fail((0, xo._)`${o} !== ${r}`);
  }
};
Ka.default = Ky;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const cn = se, Hy = M, Wy = On, Xy = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, cn._)`{allowedValues: ${e}}`
}, Jy = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Xy,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: o, it: a } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= a.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, Hy.useFunc)(t, Wy.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = t.const("vSchema", o);
      u = (0, cn.or)(...s.map((v, _) => b(g, _)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", o, (g) => t.if((0, cn._)`${f()}(${r}, ${g})`, () => t.assign(u, !0).break()));
    }
    function b(g, v) {
      const _ = s[v];
      return typeof _ == "object" && _ !== null ? (0, cn._)`${f()}(${r}, ${g}[${v}])` : (0, cn._)`${r} === ${_}`;
    }
  }
};
Ha.default = Jy;
Object.defineProperty(La, "__esModule", { value: !0 });
const Yy = Ma, Qy = Fa, Zy = Ua, e_ = qa, t_ = za, r_ = xa, n_ = Ga, s_ = Ba, o_ = Ka, a_ = Ha, i_ = [
  // number
  Yy.default,
  Qy.default,
  // string
  Zy.default,
  e_.default,
  // object
  t_.default,
  r_.default,
  // array
  n_.default,
  s_.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  o_.default,
  a_.default
];
La.default = i_;
var Wa = {}, xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.validateAdditionalItems = void 0;
const ur = se, Go = M, c_ = {
  message: ({ params: { len: e } }) => (0, ur.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ur._)`{limit: ${e}}`
}, l_ = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: c_,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Go.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    yf(e, n);
  }
};
function yf(e, t) {
  const { gen: r, schema: n, data: s, keyword: o, it: a } = e;
  a.items = !0;
  const l = r.const("len", (0, ur._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, ur._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Go.alwaysValidSchema)(a, n)) {
    const f = r.var("valid", (0, ur._)`${l} <= ${t.length}`);
    r.if((0, ur.not)(f), () => c(f)), e.ok(f);
  }
  function c(f) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: o, dataProp: u, dataPropType: Go.Type.Num }, f), a.allErrors || r.if((0, ur.not)(f), () => r.break());
    });
  }
}
xr.validateAdditionalItems = yf;
xr.default = l_;
var Xa = {}, Gr = {};
Object.defineProperty(Gr, "__esModule", { value: !0 });
Gr.validateTuple = void 0;
const bc = se, us = M, u_ = re, f_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return _f(e, "additionalItems", t);
    r.items = !0, !(0, us.alwaysValidSchema)(r, t) && e.ok((0, u_.validateArray)(e));
  }
};
function _f(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: o, keyword: a, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = us.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), f = n.const("len", (0, bc._)`${o}.length`);
  r.forEach((h, b) => {
    (0, us.alwaysValidSchema)(l, h) || (n.if((0, bc._)`${f} > ${b}`, () => e.subschema({
      keyword: a,
      schemaProp: b,
      dataProp: b
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: b, errSchemaPath: g } = l, v = r.length, _ = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (b.strictTuples && !_) {
      const y = `"${a}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, us.checkStrictMode)(l, y, b.strictTuples);
    }
  }
}
Gr.validateTuple = _f;
Gr.default = f_;
Object.defineProperty(Xa, "__esModule", { value: !0 });
const d_ = Gr, h_ = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, d_.validateTuple)(e, "items")
};
Xa.default = h_;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Pc = se, p_ = M, m_ = re, y_ = xr, __ = {
  message: ({ params: { len: e } }) => (0, Pc.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Pc._)`{limit: ${e}}`
}, $_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: __,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, p_.alwaysValidSchema)(n, t) && (s ? (0, y_.validateAdditionalItems)(e, s) : e.ok((0, m_.validateArray)(e)));
  }
};
Ja.default = $_;
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Ke = se, Mn = M, g_ = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ke.str)`must contain at least ${e} valid item(s)` : (0, Ke.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ke._)`{minContains: ${e}}` : (0, Ke._)`{minContains: ${e}, maxContains: ${t}}`
}, v_ = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: g_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    let a, l;
    const { minContains: c, maxContains: f } = n;
    o.opts.next ? (a = c === void 0 ? 1 : c, l = f) : a = 1;
    const u = t.const("len", (0, Ke._)`${s}.length`);
    if (e.setParams({ min: a, max: l }), l === void 0 && a === 0) {
      (0, Mn.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && a > l) {
      (0, Mn.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Mn.alwaysValidSchema)(o, r)) {
      let _ = (0, Ke._)`${u} >= ${a}`;
      l !== void 0 && (_ = (0, Ke._)`${_} && ${u} <= ${l}`), e.pass(_);
      return;
    }
    o.items = !0;
    const h = t.name("valid");
    l === void 0 && a === 1 ? g(h, () => t.if(h, () => t.break())) : a === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, Ke._)`${s}.length > 0`, b)) : (t.let(h, !1), b()), e.result(h, () => e.reset());
    function b() {
      const _ = t.name("_valid"), y = t.let("count", 0);
      g(_, () => t.if(_, () => v(y)));
    }
    function g(_, y) {
      t.forRange("i", 0, u, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: Mn.Type.Num,
          compositeRule: !0
        }, _), y();
      });
    }
    function v(_) {
      t.code((0, Ke._)`${_}++`), l === void 0 ? t.if((0, Ke._)`${_} >= ${a}`, () => t.assign(h, !0).break()) : (t.if((0, Ke._)`${_} > ${l}`, () => t.assign(h, !1).break()), a === 1 ? t.assign(h, !0) : t.if((0, Ke._)`${_} >= ${a}`, () => t.assign(h, !0)));
    }
  }
};
Ya.default = v_;
var $f = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = se, r = M, n = re;
  e.error = {
    message: ({ params: { property: c, depsCount: f, deps: u } }) => {
      const h = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: f, deps: u, missingProperty: h } }) => (0, t._)`{property: ${c},
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
    code(c) {
      const [f, u] = o(c);
      a(c, f), l(c, u);
    }
  };
  function o({ schema: c }) {
    const f = {}, u = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const b = Array.isArray(c[h]) ? f : u;
      b[h] = c[h];
    }
    return [f, u];
  }
  function a(c, f = c.schema) {
    const { gen: u, data: h, it: b } = c;
    if (Object.keys(f).length === 0)
      return;
    const g = u.let("missing");
    for (const v in f) {
      const _ = f[v];
      if (_.length === 0)
        continue;
      const y = (0, n.propertyInData)(u, h, v, b.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: _.length,
        deps: _.join(", ")
      }), b.allErrors ? u.if(y, () => {
        for (const p of _)
          (0, n.checkReportMissingProp)(c, p);
      }) : (u.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, _, g)})`), (0, n.reportMissingProp)(c, g), u.else());
    }
  }
  e.validatePropertyDeps = a;
  function l(c, f = c.schema) {
    const { gen: u, data: h, keyword: b, it: g } = c, v = u.name("valid");
    for (const _ in f)
      (0, r.alwaysValidSchema)(g, f[_]) || (u.if(
        (0, n.propertyInData)(u, h, _, g.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: b, schemaProp: _ }, v);
          c.mergeValidEvaluated(y, v);
        },
        () => u.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = l, e.default = s;
})($f);
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const gf = se, E_ = M, w_ = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, gf._)`{propertyName: ${e.propertyName}}`
}, S_ = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: w_,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, E_.alwaysValidSchema)(s, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, o), t.if((0, gf.not)(o), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
Qa.default = S_;
var Gs = {};
Object.defineProperty(Gs, "__esModule", { value: !0 });
const Fn = re, Qe = se, b_ = mt, Un = M, P_ = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Qe._)`{additionalProperty: ${e.additionalProperty}}`
}, O_ = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: P_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: o, it: a } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, Un.alwaysValidSchema)(a, r))
      return;
    const f = (0, Fn.allSchemaProperties)(n.properties), u = (0, Fn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Qe._)`${o} === ${b_.default.errors}`);
    function h() {
      t.forIn("key", s, (y) => {
        !f.length && !u.length ? v(y) : t.if(b(y), () => v(y));
      });
    }
    function b(y) {
      let p;
      if (f.length > 8) {
        const E = (0, Un.schemaRefOrVal)(a, n.properties, "properties");
        p = (0, Fn.isOwnProperty)(t, E, y);
      } else f.length ? p = (0, Qe.or)(...f.map((E) => (0, Qe._)`${y} === ${E}`)) : p = Qe.nil;
      return u.length && (p = (0, Qe.or)(p, ...u.map((E) => (0, Qe._)`${(0, Fn.usePattern)(e, E)}.test(${y})`))), (0, Qe.not)(p);
    }
    function g(y) {
      t.code((0, Qe._)`delete ${s}[${y}]`);
    }
    function v(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        g(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Un.alwaysValidSchema)(a, r)) {
        const p = t.name("valid");
        c.removeAdditional === "failing" ? (_(y, p, !1), t.if((0, Qe.not)(p), () => {
          e.reset(), g(y);
        })) : (_(y, p), l || t.if((0, Qe.not)(p), () => t.break()));
      }
    }
    function _(y, p, E) {
      const O = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: Un.Type.Str
      };
      E === !1 && Object.assign(O, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(O, p);
    }
  }
};
Gs.default = O_;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
const N_ = nt, Oc = re, fo = M, Nc = Gs, R_ = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Nc.default.code(new N_.KeywordCxt(o, Nc.default, "additionalProperties"));
    const a = (0, Oc.allSchemaProperties)(r);
    for (const h of a)
      o.definedProperties.add(h);
    o.opts.unevaluated && a.length && o.props !== !0 && (o.props = fo.mergeEvaluated.props(t, (0, fo.toHash)(a), o.props));
    const l = a.filter((h) => !(0, fo.alwaysValidSchema)(o, r[h]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const h of l)
      f(h) ? u(h) : (t.if((0, Oc.propertyInData)(t, s, h, o.opts.ownProperties)), u(h), o.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function f(h) {
      return o.opts.useDefaults && !o.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
Za.default = R_;
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
const Rc = re, Vn = se, Tc = M, Ic = M, T_ = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: o } = e, { opts: a } = o, l = (0, Rc.allSchemaProperties)(r), c = l.filter((_) => (0, Tc.alwaysValidSchema)(o, r[_]));
    if (l.length === 0 || c.length === l.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && s.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof Vn.Name) && (o.props = (0, Ic.evaluatedPropsToName)(t, o.props));
    const { props: h } = o;
    b();
    function b() {
      for (const _ of l)
        f && g(_), o.allErrors ? v(_) : (t.var(u, !0), v(_), t.if(u));
    }
    function g(_) {
      for (const y in f)
        new RegExp(_).test(y) && (0, Tc.checkStrictMode)(o, `property ${y} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function v(_) {
      t.forIn("key", n, (y) => {
        t.if((0, Vn._)`${(0, Rc.usePattern)(e, _)}.test(${y})`, () => {
          const p = c.includes(_);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: y,
            dataPropType: Ic.Type.Str
          }, u), o.opts.unevaluated && h !== !0 ? t.assign((0, Vn._)`${h}[${y}]`, !0) : !p && !o.allErrors && t.if((0, Vn.not)(u), () => t.break());
        });
      });
    }
  }
};
ei.default = T_;
var ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
const I_ = M, k_ = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, I_.alwaysValidSchema)(n, r)) {
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
ti.default = k_;
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
const C_ = re, j_ = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: C_.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
ri.default = j_;
var ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
const fs = se, A_ = M, D_ = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, fs._)`{passingSchemas: ${e.passing}}`
}, L_ = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: D_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const o = r, a = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(f), e.result(a, () => e.reset(), () => e.error(!0));
    function f() {
      o.forEach((u, h) => {
        let b;
        (0, A_.alwaysValidSchema)(s, u) ? t.var(c, !0) : b = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, fs._)`${c} && ${a}`).assign(a, !1).assign(l, (0, fs._)`[${l}, ${h}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(l, h), b && e.mergeEvaluated(b, fs.Name);
        });
      });
    }
  }
};
ni.default = L_;
var si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
const M_ = M, F_ = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((o, a) => {
      if ((0, M_.alwaysValidSchema)(n, o))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: a }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
si.default = F_;
var oi = {};
Object.defineProperty(oi, "__esModule", { value: !0 });
const Os = se, vf = M, U_ = {
  message: ({ params: e }) => (0, Os.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Os._)`{failingKeyword: ${e.ifClause}}`
}, V_ = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: U_,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, vf.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = kc(n, "then"), o = kc(n, "else");
    if (!s && !o)
      return;
    const a = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && o) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, f("then", u), f("else", u));
    } else s ? t.if(l, f("then")) : t.if((0, Os.not)(l), f("else"));
    e.pass(a, () => e.error(!0));
    function c() {
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
        const b = e.subschema({ keyword: u }, l);
        t.assign(a, l), e.mergeValidEvaluated(b, a), h ? t.assign(h, (0, Os._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function kc(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, vf.alwaysValidSchema)(e, r);
}
oi.default = V_;
var ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
const q_ = M, z_ = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, q_.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
ai.default = z_;
Object.defineProperty(Wa, "__esModule", { value: !0 });
const x_ = xr, G_ = Xa, B_ = Gr, K_ = Ja, H_ = Ya, W_ = $f, X_ = Qa, J_ = Gs, Y_ = Za, Q_ = ei, Z_ = ti, e$ = ri, t$ = ni, r$ = si, n$ = oi, s$ = ai;
function o$(e = !1) {
  const t = [
    // any
    Z_.default,
    e$.default,
    t$.default,
    r$.default,
    n$.default,
    s$.default,
    // object
    X_.default,
    J_.default,
    W_.default,
    Y_.default,
    Q_.default
  ];
  return e ? t.push(G_.default, K_.default) : t.push(x_.default, B_.default), t.push(H_.default), t;
}
Wa.default = o$;
var ii = {}, ci = {};
Object.defineProperty(ci, "__esModule", { value: !0 });
const _e = se, a$ = {
  message: ({ schemaCode: e }) => (0, _e.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, _e._)`{format: ${e}}`
}, i$ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: a$,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: o, schemaCode: a, it: l } = e, { opts: c, errSchemaPath: f, schemaEnv: u, self: h } = l;
    if (!c.validateFormats)
      return;
    s ? b() : g();
    function b() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), _ = r.const("fDef", (0, _e._)`${v}[${a}]`), y = r.let("fType"), p = r.let("format");
      r.if((0, _e._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign(y, (0, _e._)`${_}.type || "string"`).assign(p, (0, _e._)`${_}.validate`), () => r.assign(y, (0, _e._)`"string"`).assign(p, _)), e.fail$data((0, _e.or)(E(), O()));
      function E() {
        return c.strictSchema === !1 ? _e.nil : (0, _e._)`${a} && !${p}`;
      }
      function O() {
        const N = u.$async ? (0, _e._)`(${_}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, _e._)`${p}(${n})`, I = (0, _e._)`(typeof ${p} == "function" ? ${N} : ${p}.test(${n}))`;
        return (0, _e._)`${p} && ${p} !== true && ${y} === ${t} && !${I}`;
      }
    }
    function g() {
      const v = h.formats[o];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [_, y, p] = O(v);
      _ === t && e.pass(N());
      function E() {
        if (c.strictSchema === !1) {
          h.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${o}" ignored in schema at path "${f}"`;
        }
      }
      function O(I) {
        const z = I instanceof RegExp ? (0, _e.regexpCode)(I) : c.code.formats ? (0, _e._)`${c.code.formats}${(0, _e.getProperty)(o)}` : void 0, W = r.scopeValue("formats", { key: o, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, _e._)`${W}.validate`] : ["string", I, W];
      }
      function N() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, _e._)`await ${p}(${n})`;
        }
        return typeof y == "function" ? (0, _e._)`${p}(${n})` : (0, _e._)`${p}.test(${n})`;
      }
    }
  }
};
ci.default = i$;
Object.defineProperty(ii, "__esModule", { value: !0 });
const c$ = ci, l$ = [c$.default];
ii.default = l$;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.contentVocabulary = Fr.metadataVocabulary = void 0;
Fr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Fr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(ja, "__esModule", { value: !0 });
const u$ = Aa, f$ = La, d$ = Wa, h$ = ii, Cc = Fr, p$ = [
  u$.default,
  f$.default,
  (0, d$.default)(),
  h$.default,
  Cc.metadataVocabulary,
  Cc.contentVocabulary
];
ja.default = p$;
var li = {}, Bs = {};
Object.defineProperty(Bs, "__esModule", { value: !0 });
Bs.DiscrError = void 0;
var jc;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(jc || (Bs.DiscrError = jc = {}));
Object.defineProperty(li, "__esModule", { value: !0 });
const Pr = se, Bo = Bs, Ac = Fe, m$ = zr, y$ = M, _$ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Bo.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Pr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, $$ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: _$,
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
    const c = t.let("valid", !1), f = t.const("tag", (0, Pr._)`${r}${(0, Pr.getProperty)(l)}`);
    t.if((0, Pr._)`typeof ${f} == "string"`, () => u(), () => e.error(!1, { discrError: Bo.DiscrError.Tag, tag: f, tagName: l })), e.ok(c);
    function u() {
      const g = b();
      t.if(!1);
      for (const v in g)
        t.elseIf((0, Pr._)`${f} === ${v}`), t.assign(c, h(g[v]));
      t.else(), e.error(!1, { discrError: Bo.DiscrError.Mapping, tag: f, tagName: l }), t.endIf();
    }
    function h(g) {
      const v = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: g }, v);
      return e.mergeEvaluated(_, Pr.Name), v;
    }
    function b() {
      var g;
      const v = {}, _ = p(s);
      let y = !0;
      for (let N = 0; N < a.length; N++) {
        let I = a[N];
        if (I != null && I.$ref && !(0, y$.schemaHasRulesButRef)(I, o.self.RULES)) {
          const W = I.$ref;
          if (I = Ac.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, W), I instanceof Ac.SchemaEnv && (I = I.schema), I === void 0)
            throw new m$.default(o.opts.uriResolver, o.baseId, W);
        }
        const z = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[l];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        y = y && (_ || p(I)), E(z, N);
      }
      if (!y)
        throw new Error(`discriminator: "${l}" must be required`);
      return v;
      function p({ required: N }) {
        return Array.isArray(N) && N.includes(l);
      }
      function E(N, I) {
        if (N.const)
          O(N.const, I);
        else if (N.enum)
          for (const z of N.enum)
            O(z, I);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function O(N, I) {
        if (typeof N != "string" || N in v)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        v[N] = I;
      }
    }
  }
};
li.default = $$;
const g$ = "http://json-schema.org/draft-07/schema#", v$ = "http://json-schema.org/draft-07/schema#", E$ = "Core schema meta-schema", w$ = {
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
}, S$ = [
  "object",
  "boolean"
], b$ = {
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
}, P$ = {
  $schema: g$,
  $id: v$,
  title: E$,
  definitions: w$,
  type: S$,
  properties: b$,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = wu, n = ja, s = li, o = P$, a = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(o, a) : o;
      this.addMetaSchema(v, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var f = nt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return f.KeywordCxt;
  } });
  var u = se;
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
  var h = Pn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var b = zr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return b.default;
  } });
})(Fo, Fo.exports);
var O$ = Fo.exports, Ko = { exports: {} }, Ef = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(U, X) {
    return { validate: U, compare: X };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(o, a),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, f),
    "date-time": t(h, b),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: _,
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
    regex: ae,
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
    float: { type: "number", validate: z },
    // C-type double
    double: { type: "number", validate: z },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, a),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, f),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, b),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(U) {
    return U % 4 === 0 && (U % 100 !== 0 || U % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function o(U) {
    const X = n.exec(U);
    if (!X)
      return !1;
    const V = +X[1], q = +X[2], G = +X[3];
    return q >= 1 && q <= 12 && G >= 1 && G <= (q === 2 && r(V) ? 29 : s[q]);
  }
  function a(U, X) {
    if (U && X)
      return U > X ? 1 : U < X ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(U, X) {
    const V = l.exec(U);
    if (!V)
      return !1;
    const q = +V[1], G = +V[2], j = +V[3], A = V[5];
    return (q <= 23 && G <= 59 && j <= 59 || q === 23 && G === 59 && j === 60) && (!X || A !== "");
  }
  function f(U, X) {
    if (!(U && X))
      return;
    const V = l.exec(U), q = l.exec(X);
    if (V && q)
      return U = V[1] + V[2] + V[3] + (V[4] || ""), X = q[1] + q[2] + q[3] + (q[4] || ""), U > X ? 1 : U < X ? -1 : 0;
  }
  const u = /t|\s/i;
  function h(U) {
    const X = U.split(u);
    return X.length === 2 && o(X[0]) && c(X[1], !0);
  }
  function b(U, X) {
    if (!(U && X))
      return;
    const [V, q] = U.split(u), [G, j] = X.split(u), A = a(V, G);
    if (A !== void 0)
      return A || f(q, j);
  }
  const g = /\/|:/, v = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function _(U) {
    return g.test(U) && v.test(U);
  }
  const y = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function p(U) {
    return y.lastIndex = 0, y.test(U);
  }
  const E = -2147483648, O = 2 ** 31 - 1;
  function N(U) {
    return Number.isInteger(U) && U <= O && U >= E;
  }
  function I(U) {
    return Number.isInteger(U);
  }
  function z() {
    return !0;
  }
  const W = /[^\\]\\Z/;
  function ae(U) {
    if (W.test(U))
      return !1;
    try {
      return new RegExp(U), !0;
    } catch {
      return !1;
    }
  }
})(Ef);
var wf = {}, Ho = { exports: {} }, Sf = {}, st = {}, Ur = {}, Nn = {}, te = {}, wn = {};
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
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((O, N) => `${O}${N}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((O, N) => (N instanceof r && (O[N.str] = (O[N.str] || 0) + 1), O), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...E) {
    const O = [p[0]];
    let N = 0;
    for (; N < E.length; )
      l(O, E[N]), O.push(p[++N]);
    return new n(O);
  }
  e._ = s;
  const o = new n("+");
  function a(p, ...E) {
    const O = [g(p[0])];
    let N = 0;
    for (; N < E.length; )
      O.push(o), l(O, E[N]), O.push(o, g(p[++N]));
    return c(O), new n(O);
  }
  e.str = a;
  function l(p, E) {
    E instanceof n ? p.push(...E._items) : E instanceof r ? p.push(E) : p.push(h(E));
  }
  e.addCodeArg = l;
  function c(p) {
    let E = 1;
    for (; E < p.length - 1; ) {
      if (p[E] === o) {
        const O = f(p[E - 1], p[E + 1]);
        if (O !== void 0) {
          p.splice(E - 1, 3, O);
          continue;
        }
        p[E++] = "+";
      }
      E++;
    }
  }
  function f(p, E) {
    if (E === '""')
      return p;
    if (p === '""')
      return E;
    if (typeof p == "string")
      return E instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${p.slice(0, -1)}${E}"` : E[0] === '"' ? p.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(p instanceof r))
      return `"${p}${E.slice(1)}`;
  }
  function u(p, E) {
    return E.emptyStr() ? p : p.emptyStr() ? E : a`${p}${E}`;
  }
  e.strConcat = u;
  function h(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : g(Array.isArray(p) ? p.join(",") : p);
  }
  function b(p) {
    return new n(g(p));
  }
  e.stringify = b;
  function g(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = g;
  function v(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = v;
  function _(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = _;
  function y(p) {
    return new n(p.toString());
  }
  e.regexpCode = y;
})(wn);
var Wo = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = wn;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
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
      const b = this.toName(f), { prefix: g } = b, v = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let _ = this._values[g];
      if (_) {
        const E = _.get(v);
        if (E)
          return E;
      } else
        _ = this._values[g] = /* @__PURE__ */ new Map();
      _.set(v, b);
      const y = this._scope[g] || (this._scope[g] = []), p = y.length;
      return y[p] = u.ref, b.setValue(u, { property: g, itemIndex: p }), b;
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
      return this._reduceValues(f, (b) => {
        if (b.value === void 0)
          throw new Error(`CodeGen: name "${b}" has no value`);
        return b.value.code;
      }, u, h);
    }
    _reduceValues(f, u, h = {}, b) {
      let g = t.nil;
      for (const v in f) {
        const _ = f[v];
        if (!_)
          continue;
        const y = h[v] = h[v] || /* @__PURE__ */ new Map();
        _.forEach((p) => {
          if (y.has(p))
            return;
          y.set(p, n.Started);
          let E = u(p);
          if (E) {
            const O = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            g = (0, t._)`${g}${O} ${p} = ${E};${this.opts._n}`;
          } else if (E = b == null ? void 0 : b(p))
            g = (0, t._)`${g}${E}${this.opts._n}`;
          else
            throw new r(p);
          y.set(p, n.Completed);
        });
      }
      return g;
    }
  }
  e.ValueScope = l;
})(Wo);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = wn, r = Wo;
  var n = wn;
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
  var s = Wo;
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
    optimizeNames(i, d) {
      return this;
    }
  }
  class a extends o {
    constructor(i, d, P) {
      super(), this.varKind = i, this.name = d, this.rhs = P;
    }
    render({ es5: i, _n: d }) {
      const P = i ? r.varKinds.var : this.varKind, k = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${k};` + d;
    }
    optimizeNames(i, d) {
      if (i[this.name.str])
        return this.rhs && (this.rhs = j(this.rhs, i, d)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends o {
    constructor(i, d, P) {
      super(), this.lhs = i, this.rhs = d, this.sideEffects = P;
    }
    render({ _n: i }) {
      return `${this.lhs} = ${this.rhs};` + i;
    }
    optimizeNames(i, d) {
      if (!(this.lhs instanceof t.Name && !i[this.lhs.str] && !this.sideEffects))
        return this.rhs = j(this.rhs, i, d), this;
    }
    get names() {
      const i = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return G(i, this.rhs);
    }
  }
  class c extends l {
    constructor(i, d, P, k) {
      super(i, P, k), this.op = d;
    }
    render({ _n: i }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + i;
    }
  }
  class f extends o {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `${this.label}:` + i;
    }
  }
  class u extends o {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `break${this.label ? ` ${this.label}` : ""};` + i;
    }
  }
  class h extends o {
    constructor(i) {
      super(), this.error = i;
    }
    render({ _n: i }) {
      return `throw ${this.error};` + i;
    }
    get names() {
      return this.error.names;
    }
  }
  class b extends o {
    constructor(i) {
      super(), this.code = i;
    }
    render({ _n: i }) {
      return `${this.code};` + i;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(i, d) {
      return this.code = j(this.code, i, d), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class g extends o {
    constructor(i = []) {
      super(), this.nodes = i;
    }
    render(i) {
      return this.nodes.reduce((d, P) => d + P.render(i), "");
    }
    optimizeNodes() {
      const { nodes: i } = this;
      let d = i.length;
      for (; d--; ) {
        const P = i[d].optimizeNodes();
        Array.isArray(P) ? i.splice(d, 1, ...P) : P ? i[d] = P : i.splice(d, 1);
      }
      return i.length > 0 ? this : void 0;
    }
    optimizeNames(i, d) {
      const { nodes: P } = this;
      let k = P.length;
      for (; k--; ) {
        const C = P[k];
        C.optimizeNames(i, d) || (A(i, C.names), P.splice(k, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((i, d) => q(i, d.names), {});
    }
  }
  class v extends g {
    render(i) {
      return "{" + i._n + super.render(i) + "}" + i._n;
    }
  }
  class _ extends g {
  }
  class y extends v {
  }
  y.kind = "else";
  class p extends v {
    constructor(i, d) {
      super(d), this.condition = i;
    }
    render(i) {
      let d = `if(${this.condition})` + super.render(i);
      return this.else && (d += "else " + this.else.render(i)), d;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const i = this.condition;
      if (i === !0)
        return this.nodes;
      let d = this.else;
      if (d) {
        const P = d.optimizeNodes();
        d = this.else = Array.isArray(P) ? new y(P) : P;
      }
      if (d)
        return i === !1 ? d instanceof p ? d : d.nodes : this.nodes.length ? this : new p(D(i), d instanceof p ? [d] : d.nodes);
      if (!(i === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(i, d) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(i, d), !!(super.optimizeNames(i, d) || this.else))
        return this.condition = j(this.condition, i, d), this;
    }
    get names() {
      const i = super.names;
      return G(i, this.condition), this.else && q(i, this.else.names), i;
    }
  }
  p.kind = "if";
  class E extends v {
  }
  E.kind = "for";
  class O extends E {
    constructor(i) {
      super(), this.iteration = i;
    }
    render(i) {
      return `for(${this.iteration})` + super.render(i);
    }
    optimizeNames(i, d) {
      if (super.optimizeNames(i, d))
        return this.iteration = j(this.iteration, i, d), this;
    }
    get names() {
      return q(super.names, this.iteration.names);
    }
  }
  class N extends E {
    constructor(i, d, P, k) {
      super(), this.varKind = i, this.name = d, this.from = P, this.to = k;
    }
    render(i) {
      const d = i.es5 ? r.varKinds.var : this.varKind, { name: P, from: k, to: C } = this;
      return `for(${d} ${P}=${k}; ${P}<${C}; ${P}++)` + super.render(i);
    }
    get names() {
      const i = G(super.names, this.from);
      return G(i, this.to);
    }
  }
  class I extends E {
    constructor(i, d, P, k) {
      super(), this.loop = i, this.varKind = d, this.name = P, this.iterable = k;
    }
    render(i) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(i);
    }
    optimizeNames(i, d) {
      if (super.optimizeNames(i, d))
        return this.iterable = j(this.iterable, i, d), this;
    }
    get names() {
      return q(super.names, this.iterable.names);
    }
  }
  class z extends v {
    constructor(i, d, P) {
      super(), this.name = i, this.args = d, this.async = P;
    }
    render(i) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(i);
    }
  }
  z.kind = "func";
  class W extends g {
    render(i) {
      return "return " + super.render(i);
    }
  }
  W.kind = "return";
  class ae extends v {
    render(i) {
      let d = "try" + super.render(i);
      return this.catch && (d += this.catch.render(i)), this.finally && (d += this.finally.render(i)), d;
    }
    optimizeNodes() {
      var i, d;
      return super.optimizeNodes(), (i = this.catch) === null || i === void 0 || i.optimizeNodes(), (d = this.finally) === null || d === void 0 || d.optimizeNodes(), this;
    }
    optimizeNames(i, d) {
      var P, k;
      return super.optimizeNames(i, d), (P = this.catch) === null || P === void 0 || P.optimizeNames(i, d), (k = this.finally) === null || k === void 0 || k.optimizeNames(i, d), this;
    }
    get names() {
      const i = super.names;
      return this.catch && q(i, this.catch.names), this.finally && q(i, this.finally.names), i;
    }
  }
  class U extends v {
    constructor(i) {
      super(), this.error = i;
    }
    render(i) {
      return `catch(${this.error})` + super.render(i);
    }
  }
  U.kind = "catch";
  class X extends v {
    render(i) {
      return "finally" + super.render(i);
    }
  }
  X.kind = "finally";
  class V {
    constructor(i, d = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...d, _n: d.lines ? `
` : "" }, this._extScope = i, this._scope = new r.Scope({ parent: i }), this._nodes = [new _()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(i) {
      return this._scope.name(i);
    }
    // reserves unique name in the external scope
    scopeName(i) {
      return this._extScope.name(i);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(i, d) {
      const P = this._extScope.value(i, d);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
    }
    getScopeValue(i, d) {
      return this._extScope.getValue(i, d);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(i) {
      return this._extScope.scopeRefs(i, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(i, d, P, k) {
      const C = this._scope.toName(d);
      return P !== void 0 && k && (this._constants[C.str] = P), this._leafNode(new a(i, C, P)), C;
    }
    // `const` declaration (`var` in es5 mode)
    const(i, d, P) {
      return this._def(r.varKinds.const, i, d, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(i, d, P) {
      return this._def(r.varKinds.let, i, d, P);
    }
    // `var` declaration with optional assignment
    var(i, d, P) {
      return this._def(r.varKinds.var, i, d, P);
    }
    // assignment code
    assign(i, d, P) {
      return this._leafNode(new l(i, d, P));
    }
    // `+=` code
    add(i, d) {
      return this._leafNode(new c(i, e.operators.ADD, d));
    }
    // appends passed SafeExpr to code or executes Block
    code(i) {
      return typeof i == "function" ? i() : i !== t.nil && this._leafNode(new b(i)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...i) {
      const d = ["{"];
      for (const [P, k] of i)
        d.length > 1 && d.push(","), d.push(P), (P !== k || this.opts.es5) && (d.push(":"), (0, t.addCodeArg)(d, k));
      return d.push("}"), new t._Code(d);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(i, d, P) {
      if (this._blockNode(new p(i)), d && P)
        this.code(d).else().code(P).endIf();
      else if (d)
        this.code(d).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(i) {
      return this._elseNode(new p(i));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, y);
    }
    _for(i, d) {
      return this._blockNode(i), d && this.code(d).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(i, d) {
      return this._for(new O(i), d);
    }
    // `for` statement for a range of values
    forRange(i, d, P, k, C = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const B = this._scope.toName(i);
      return this._for(new N(C, B, d, P), () => k(B));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, d, P, k = r.varKinds.const) {
      const C = this._scope.toName(i);
      if (this.opts.es5) {
        const B = d instanceof t.Name ? d : this.var("_arr", d);
        return this.forRange("_i", 0, (0, t._)`${B}.length`, (x) => {
          this.var(C, (0, t._)`${B}[${x}]`), P(C);
        });
      }
      return this._for(new I("of", k, C, d), () => P(C));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(i, d, P, k = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(i, (0, t._)`Object.keys(${d})`, P);
      const C = this._scope.toName(i);
      return this._for(new I("in", k, C, d), () => P(C));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(i) {
      return this._leafNode(new f(i));
    }
    // `break` statement
    break(i) {
      return this._leafNode(new u(i));
    }
    // `return` statement
    return(i) {
      const d = new W();
      if (this._blockNode(d), this.code(i), d.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(i, d, P) {
      if (!d && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const k = new ae();
      if (this._blockNode(k), this.code(i), d) {
        const C = this.name("e");
        this._currNode = k.catch = new U(C), d(C);
      }
      return P && (this._currNode = k.finally = new X(), this.code(P)), this._endBlockNode(U, X);
    }
    // `throw` statement
    throw(i) {
      return this._leafNode(new h(i));
    }
    // start self-balancing block
    block(i, d) {
      return this._blockStarts.push(this._nodes.length), i && this.code(i).endBlock(d), this;
    }
    // end the current self-balancing block
    endBlock(i) {
      const d = this._blockStarts.pop();
      if (d === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const P = this._nodes.length - d;
      if (P < 0 || i !== void 0 && P !== i)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${i} expected`);
      return this._nodes.length = d, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(i, d = t.nil, P, k) {
      return this._blockNode(new z(i, d, P)), k && this.code(k).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(i = 1) {
      for (; i-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(i) {
      return this._currNode.nodes.push(i), this;
    }
    _blockNode(i) {
      this._currNode.nodes.push(i), this._nodes.push(i);
    }
    _endBlockNode(i, d) {
      const P = this._currNode;
      if (P instanceof i || d && P instanceof d)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${d ? `${i.kind}/${d.kind}` : i.kind}"`);
    }
    _elseNode(i) {
      const d = this._currNode;
      if (!(d instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = d.else = i, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const i = this._nodes;
      return i[i.length - 1];
    }
    set _currNode(i) {
      const d = this._nodes;
      d[d.length - 1] = i;
    }
  }
  e.CodeGen = V;
  function q($, i) {
    for (const d in i)
      $[d] = ($[d] || 0) + (i[d] || 0);
    return $;
  }
  function G($, i) {
    return i instanceof t._CodeOrName ? q($, i.names) : $;
  }
  function j($, i, d) {
    if ($ instanceof t.Name)
      return P($);
    if (!k($))
      return $;
    return new t._Code($._items.reduce((C, B) => (B instanceof t.Name && (B = P(B)), B instanceof t._Code ? C.push(...B._items) : C.push(B), C), []));
    function P(C) {
      const B = d[C.str];
      return B === void 0 || i[C.str] !== 1 ? C : (delete i[C.str], B);
    }
    function k(C) {
      return C instanceof t._Code && C._items.some((B) => B instanceof t.Name && i[B.str] === 1 && d[B.str] !== void 0);
    }
  }
  function A($, i) {
    for (const d in i)
      $[d] = ($[d] || 0) - (i[d] || 0);
  }
  function D($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${S($)}`;
  }
  e.not = D;
  const L = m(e.operators.AND);
  function R(...$) {
    return $.reduce(L);
  }
  e.and = R;
  const T = m(e.operators.OR);
  function w(...$) {
    return $.reduce(T);
  }
  e.or = w;
  function m($) {
    return (i, d) => i === t.nil ? d : d === t.nil ? i : (0, t._)`${S(i)} ${$} ${S(d)}`;
  }
  function S($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(te);
var F = {};
Object.defineProperty(F, "__esModule", { value: !0 });
F.checkStrictMode = F.getErrorPath = F.Type = F.useFunc = F.setEvaluated = F.evaluatedPropsToName = F.mergeEvaluated = F.eachItem = F.unescapeJsonPointer = F.escapeJsonPointer = F.escapeFragment = F.unescapeFragment = F.schemaRefOrVal = F.schemaHasRulesButRef = F.schemaHasRules = F.checkUnknownRules = F.alwaysValidSchema = F.toHash = void 0;
const fe = te, N$ = wn;
function R$(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
F.toHash = R$;
function T$(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (bf(e, t), !Pf(t, e.self.RULES.all));
}
F.alwaysValidSchema = T$;
function bf(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const o in t)
    s[o] || Rf(e, `unknown keyword: "${o}"`);
}
F.checkUnknownRules = bf;
function Pf(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
F.schemaHasRules = Pf;
function I$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
F.schemaHasRulesButRef = I$;
function k$({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, fe._)`${r}`;
  }
  return (0, fe._)`${e}${t}${(0, fe.getProperty)(n)}`;
}
F.schemaRefOrVal = k$;
function C$(e) {
  return Of(decodeURIComponent(e));
}
F.unescapeFragment = C$;
function j$(e) {
  return encodeURIComponent(ui(e));
}
F.escapeFragment = j$;
function ui(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
F.escapeJsonPointer = ui;
function Of(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
F.unescapeJsonPointer = Of;
function A$(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
F.eachItem = A$;
function Dc({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, o, a, l) => {
    const c = a === void 0 ? o : a instanceof fe.Name ? (o instanceof fe.Name ? e(s, o, a) : t(s, o, a), a) : o instanceof fe.Name ? (t(s, a, o), o) : r(o, a);
    return l === fe.Name && !(c instanceof fe.Name) ? n(s, c) : c;
  };
}
F.mergeEvaluated = {
  props: Dc({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, fe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, fe._)`${r} || {}`).code((0, fe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, fe._)`${r} || {}`), fi(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Nf
  }),
  items: Dc({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, fe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, fe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Nf(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, fe._)`{}`);
  return t !== void 0 && fi(e, r, t), r;
}
F.evaluatedPropsToName = Nf;
function fi(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, fe._)`${t}${(0, fe.getProperty)(n)}`, !0));
}
F.setEvaluated = fi;
const Lc = {};
function D$(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Lc[t.code] || (Lc[t.code] = new N$._Code(t.code))
  });
}
F.useFunc = D$;
var Xo;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Xo || (F.Type = Xo = {}));
function L$(e, t, r) {
  if (e instanceof fe.Name) {
    const n = t === Xo.Num;
    return r ? n ? (0, fe._)`"[" + ${e} + "]"` : (0, fe._)`"['" + ${e} + "']"` : n ? (0, fe._)`"/" + ${e}` : (0, fe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, fe.getProperty)(e).toString() : "/" + ui(e);
}
F.getErrorPath = L$;
function Rf(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
F.checkStrictMode = Rf;
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
const Te = te, M$ = {
  // validation function arguments
  data: new Te.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Te.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Te.Name("instancePath"),
  parentData: new Te.Name("parentData"),
  parentDataProperty: new Te.Name("parentDataProperty"),
  rootData: new Te.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Te.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Te.Name("vErrors"),
  // null or array of validation errors
  errors: new Te.Name("errors"),
  // counter of validation errors
  this: new Te.Name("this"),
  // "globals"
  self: new Te.Name("self"),
  scope: new Te.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Te.Name("json"),
  jsonPos: new Te.Name("jsonPos"),
  jsonLen: new Te.Name("jsonLen"),
  jsonPart: new Te.Name("jsonPart")
};
yt.default = M$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = F, n = yt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: p }) => p ? (0, t.str)`"${y}" keyword must be ${p} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, p = e.keywordError, E, O) {
    const { it: N } = y, { gen: I, compositeRule: z, allErrors: W } = N, ae = h(y, p, E);
    O ?? (z || W) ? c(I, ae) : f(N, (0, t._)`[${ae}]`);
  }
  e.reportError = s;
  function o(y, p = e.keywordError, E) {
    const { it: O } = y, { gen: N, compositeRule: I, allErrors: z } = O, W = h(y, p, E);
    c(N, W), I || z || f(O, n.default.vErrors);
  }
  e.reportExtraError = o;
  function a(y, p) {
    y.assign(n.default.errors, p), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(p, () => y.assign((0, t._)`${n.default.vErrors}.length`, p), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function l({ gen: y, keyword: p, schemaValue: E, data: O, errsCount: N, it: I }) {
    if (N === void 0)
      throw new Error("ajv implementation error");
    const z = y.name("err");
    y.forRange("i", N, n.default.errors, (W) => {
      y.const(z, (0, t._)`${n.default.vErrors}[${W}]`), y.if((0, t._)`${z}.instancePath === undefined`, () => y.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && (y.assign((0, t._)`${z}.schema`, E), y.assign((0, t._)`${z}.data`, O));
    });
  }
  e.extendErrors = l;
  function c(y, p) {
    const E = y.const("err", p);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function f(y, p) {
    const { gen: E, validateName: O, schemaEnv: N } = y;
    N.$async ? E.throw((0, t._)`new ${y.ValidationError}(${p})`) : (E.assign((0, t._)`${O}.errors`, p), E.return(!1));
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
  function h(y, p, E) {
    const { createErrors: O } = y.it;
    return O === !1 ? (0, t._)`{}` : b(y, p, E);
  }
  function b(y, p, E = {}) {
    const { gen: O, it: N } = y, I = [
      g(N, E),
      v(y, E)
    ];
    return _(y, p, I), O.object(...I);
  }
  function g({ errorPath: y }, { instancePath: p }) {
    const E = p ? (0, t.str)`${y}${(0, r.getErrorPath)(p, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function v({ keyword: y, it: { errSchemaPath: p } }, { schemaPath: E, parentSchema: O }) {
    let N = O ? p : (0, t.str)`${p}/${y}`;
    return E && (N = (0, t.str)`${N}${(0, r.getErrorPath)(E, r.Type.Str)}`), [u.schemaPath, N];
  }
  function _(y, { params: p, message: E }, O) {
    const { keyword: N, data: I, schemaValue: z, it: W } = y, { opts: ae, propertyName: U, topSchemaRef: X, schemaPath: V } = W;
    O.push([u.keyword, N], [u.params, typeof p == "function" ? p(y) : p || (0, t._)`{}`]), ae.messages && O.push([u.message, typeof E == "function" ? E(y) : E]), ae.verbose && O.push([u.schema, z], [u.parentSchema, (0, t._)`${X}${V}`], [n.default.data, I]), U && O.push([u.propertyName, U]);
  }
})(Nn);
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.boolOrEmptySchema = Ur.topBoolOrEmptySchema = void 0;
const F$ = Nn, U$ = te, V$ = yt, q$ = {
  message: "boolean schema is false"
};
function z$(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Tf(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(V$.default.data) : (t.assign((0, U$._)`${n}.errors`, null), t.return(!0));
}
Ur.topBoolOrEmptySchema = z$;
function x$(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Tf(e)) : r.var(t, !0);
}
Ur.boolOrEmptySchema = x$;
function Tf(e, t) {
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
  (0, F$.reportError)(s, q$, void 0, t);
}
var ve = {}, yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.getRules = yr.isJSONType = void 0;
const G$ = ["string", "number", "integer", "boolean", "null", "object", "array"], B$ = new Set(G$);
function K$(e) {
  return typeof e == "string" && B$.has(e);
}
yr.isJSONType = K$;
function H$() {
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
yr.getRules = H$;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.shouldUseRule = vt.shouldUseGroup = vt.schemaHasRulesForType = void 0;
function W$({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && If(e, n);
}
vt.schemaHasRulesForType = W$;
function If(e, t) {
  return t.rules.some((r) => kf(e, r));
}
vt.shouldUseGroup = If;
function kf(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
vt.shouldUseRule = kf;
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.reportTypeError = ve.checkDataTypes = ve.checkDataType = ve.coerceAndCheckDataType = ve.getJSONTypes = ve.getSchemaTypes = ve.DataType = void 0;
const X$ = yr, J$ = vt, Y$ = Nn, ee = te, Cf = F;
var Cr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Cr || (ve.DataType = Cr = {}));
function Q$(e) {
  const t = jf(e.type);
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
ve.getSchemaTypes = Q$;
function jf(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(X$.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ve.getJSONTypes = jf;
function Z$(e, t) {
  const { gen: r, data: n, opts: s } = e, o = eg(t, s.coerceTypes), a = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, J$.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const l = di(t, n, s.strictNumbers, Cr.Wrong);
    r.if(l, () => {
      o.length ? tg(e, t, o) : hi(e);
    });
  }
  return a;
}
ve.coerceAndCheckDataType = Z$;
const Af = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function eg(e, t) {
  return t ? e.filter((r) => Af.has(r) || t === "array" && r === "array") : [];
}
function tg(e, t, r) {
  const { gen: n, data: s, opts: o } = e, a = n.let("dataType", (0, ee._)`typeof ${s}`), l = n.let("coerced", (0, ee._)`undefined`);
  o.coerceTypes === "array" && n.if((0, ee._)`${a} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, ee._)`${s}[0]`).assign(a, (0, ee._)`typeof ${s}`).if(di(t, s, o.strictNumbers), () => n.assign(l, s))), n.if((0, ee._)`${l} !== undefined`);
  for (const f of r)
    (Af.has(f) || f === "array" && o.coerceTypes === "array") && c(f);
  n.else(), hi(e), n.endIf(), n.if((0, ee._)`${l} !== undefined`, () => {
    n.assign(s, l), rg(e, l);
  });
  function c(f) {
    switch (f) {
      case "string":
        n.elseIf((0, ee._)`${a} == "number" || ${a} == "boolean"`).assign(l, (0, ee._)`"" + ${s}`).elseIf((0, ee._)`${s} === null`).assign(l, (0, ee._)`""`);
        return;
      case "number":
        n.elseIf((0, ee._)`${a} == "boolean" || ${s} === null
              || (${a} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, ee._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, ee._)`${a} === "boolean" || ${s} === null
              || (${a} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, ee._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, ee._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, ee._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, ee._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, ee._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${s} === null`).assign(l, (0, ee._)`[${s}]`);
    }
  }
}
function rg({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ee._)`${t} !== undefined`, () => e.assign((0, ee._)`${t}[${r}]`, n));
}
function Jo(e, t, r, n = Cr.Correct) {
  const s = n === Cr.Correct ? ee.operators.EQ : ee.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, ee._)`${t} ${s} null`;
    case "array":
      o = (0, ee._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, ee._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = a((0, ee._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = a();
      break;
    default:
      return (0, ee._)`typeof ${t} ${s} ${e}`;
  }
  return n === Cr.Correct ? o : (0, ee.not)(o);
  function a(l = ee.nil) {
    return (0, ee.and)((0, ee._)`typeof ${t} == "number"`, l, r ? (0, ee._)`isFinite(${t})` : ee.nil);
  }
}
ve.checkDataType = Jo;
function di(e, t, r, n) {
  if (e.length === 1)
    return Jo(e[0], t, r, n);
  let s;
  const o = (0, Cf.toHash)(e);
  if (o.array && o.object) {
    const a = (0, ee._)`typeof ${t} != "object"`;
    s = o.null ? a : (0, ee._)`!${t} || ${a}`, delete o.null, delete o.array, delete o.object;
  } else
    s = ee.nil;
  o.number && delete o.integer;
  for (const a in o)
    s = (0, ee.and)(s, Jo(a, t, r, n));
  return s;
}
ve.checkDataTypes = di;
const ng = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ee._)`{type: ${e}}` : (0, ee._)`{type: ${t}}`
};
function hi(e) {
  const t = sg(e);
  (0, Y$.reportError)(t, ng);
}
ve.reportTypeError = hi;
function sg(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Cf.schemaRefOrVal)(e, n, "type");
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
var Ks = {};
Object.defineProperty(Ks, "__esModule", { value: !0 });
Ks.assignDefaults = void 0;
const vr = te, og = F;
function ag(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Mc(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, o) => Mc(e, o, s.default));
}
Ks.assignDefaults = ag;
function Mc(e, t, r) {
  const { gen: n, compositeRule: s, data: o, opts: a } = e;
  if (r === void 0)
    return;
  const l = (0, vr._)`${o}${(0, vr.getProperty)(t)}`;
  if (s) {
    (0, og.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, vr._)`${l} === undefined`;
  a.useDefaults === "empty" && (c = (0, vr._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, vr._)`${l} = ${(0, vr.stringify)(r)}`);
}
var pt = {}, ne = {};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.validateUnion = ne.validateArray = ne.usePattern = ne.callValidateCode = ne.schemaProperties = ne.allSchemaProperties = ne.noPropertyInData = ne.propertyInData = ne.isOwnProperty = ne.hasPropFunc = ne.reportMissingProp = ne.checkMissingProp = ne.checkReportMissingProp = void 0;
const me = te, pi = F, Nt = yt, ig = F;
function cg(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(yi(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, me._)`${t}` }, !0), e.error();
  });
}
ne.checkReportMissingProp = cg;
function lg({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, me.or)(...n.map((o) => (0, me.and)(yi(e, t, o, r.ownProperties), (0, me._)`${s} = ${o}`)));
}
ne.checkMissingProp = lg;
function ug(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ne.reportMissingProp = ug;
function Df(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, me._)`Object.prototype.hasOwnProperty`
  });
}
ne.hasPropFunc = Df;
function mi(e, t, r) {
  return (0, me._)`${Df(e)}.call(${t}, ${r})`;
}
ne.isOwnProperty = mi;
function fg(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} !== undefined`;
  return n ? (0, me._)`${s} && ${mi(e, t, r)}` : s;
}
ne.propertyInData = fg;
function yi(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} === undefined`;
  return n ? (0, me.or)(s, (0, me.not)(mi(e, t, r))) : s;
}
ne.noPropertyInData = yi;
function Lf(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ne.allSchemaProperties = Lf;
function dg(e, t) {
  return Lf(t).filter((r) => !(0, pi.alwaysValidSchema)(e, t[r]));
}
ne.schemaProperties = dg;
function hg({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: o }, it: a }, l, c, f) {
  const u = f ? (0, me._)`${e}, ${t}, ${n}${s}` : t, h = [
    [Nt.default.instancePath, (0, me.strConcat)(Nt.default.instancePath, o)],
    [Nt.default.parentData, a.parentData],
    [Nt.default.parentDataProperty, a.parentDataProperty],
    [Nt.default.rootData, Nt.default.rootData]
  ];
  a.opts.dynamicRef && h.push([Nt.default.dynamicAnchors, Nt.default.dynamicAnchors]);
  const b = (0, me._)`${u}, ${r.object(...h)}`;
  return c !== me.nil ? (0, me._)`${l}.call(${c}, ${b})` : (0, me._)`${l}(${b})`;
}
ne.callValidateCode = hg;
const pg = (0, me._)`new RegExp`;
function mg({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, o = s(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, me._)`${s.code === "new RegExp" ? pg : (0, ig.useFunc)(e, s)}(${r}, ${n})`
  });
}
ne.usePattern = mg;
function yg(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, o = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return a(() => t.assign(l, !1)), l;
  }
  return t.var(o, !0), a(() => t.break()), o;
  function a(l) {
    const c = t.const("len", (0, me._)`${r}.length`);
    t.forRange("i", 0, c, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: pi.Type.Num
      }, o), t.if((0, me.not)(o), l);
    });
  }
}
ne.validateArray = yg;
function _g(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, pi.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const a = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, f) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, l);
    t.assign(a, (0, me._)`${a} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, me.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
ne.validateUnion = _g;
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.validateKeywordUsage = pt.validSchemaType = pt.funcKeywordCode = pt.macroKeywordCode = void 0;
const je = te, fr = yt, $g = ne, gg = Nn;
function vg(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: o, it: a } = e, l = t.macro.call(a.self, s, o, a), c = Mf(r, n, l);
  a.opts.validateSchema !== !1 && a.self.validateSchema(l, !0);
  const f = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: je.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
pt.macroKeywordCode = vg;
function Eg(e, t) {
  var r;
  const { gen: n, keyword: s, schema: o, parentSchema: a, $data: l, it: c } = e;
  Sg(c, t);
  const f = !l && t.compile ? t.compile.call(c.self, o, a, c) : t.validate, u = Mf(n, s, f), h = n.let("valid");
  e.block$data(h, b), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function b() {
    if (t.errors === !1)
      _(), t.modifying && Fc(e), y(() => e.error());
    else {
      const p = t.async ? g() : v();
      t.modifying && Fc(e), y(() => wg(e, p));
    }
  }
  function g() {
    const p = n.let("ruleErrs", null);
    return n.try(() => _((0, je._)`await `), (E) => n.assign(h, !1).if((0, je._)`${E} instanceof ${c.ValidationError}`, () => n.assign(p, (0, je._)`${E}.errors`), () => n.throw(E))), p;
  }
  function v() {
    const p = (0, je._)`${u}.errors`;
    return n.assign(p, null), _(je.nil), p;
  }
  function _(p = t.async ? (0, je._)`await ` : je.nil) {
    const E = c.opts.passContext ? fr.default.this : fr.default.self, O = !("compile" in t && !l || t.schema === !1);
    n.assign(h, (0, je._)`${p}${(0, $g.callValidateCode)(e, u, E, O)}`, t.modifying);
  }
  function y(p) {
    var E;
    n.if((0, je.not)((E = t.valid) !== null && E !== void 0 ? E : h), p);
  }
}
pt.funcKeywordCode = Eg;
function Fc(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, je._)`${n.parentData}[${n.parentDataProperty}]`));
}
function wg(e, t) {
  const { gen: r } = e;
  r.if((0, je._)`Array.isArray(${t})`, () => {
    r.assign(fr.default.vErrors, (0, je._)`${fr.default.vErrors} === null ? ${t} : ${fr.default.vErrors}.concat(${t})`).assign(fr.default.errors, (0, je._)`${fr.default.vErrors}.length`), (0, gg.extendErrors)(e);
  }, () => e.error());
}
function Sg({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Mf(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, je.stringify)(r) });
}
function bg(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
pt.validSchemaType = bg;
function Pg({ schema: e, opts: t, self: r, errSchemaPath: n }, s, o) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(o) : s.keyword !== o)
    throw new Error("ajv implementation error");
  const a = s.dependencies;
  if (a != null && a.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${o}: ${a.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[o])) {
    const c = `keyword "${o}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
pt.validateKeywordUsage = Pg;
var Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.extendSubschemaMode = Ft.extendSubschemaData = Ft.getSubschema = void 0;
const ut = te, Ff = F;
function Og(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: o, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, ut._)`${e.schemaPath}${(0, ut.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, ut._)`${e.schemaPath}${(0, ut.getProperty)(t)}${(0, ut.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Ff.escapeFragment)(r)}`
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
Ft.getSubschema = Og;
function Ng(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: o, propertyName: a }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: u, opts: h } = t, b = l.let("data", (0, ut._)`${t.data}${(0, ut.getProperty)(r)}`, !0);
    c(b), e.errorPath = (0, ut.str)`${f}${(0, Ff.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, ut._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const f = s instanceof ut.Name ? s : l.let("data", s, !0);
    c(f), a !== void 0 && (e.propertyName = a);
  }
  o && (e.dataTypes = o);
  function c(f) {
    e.data = f, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, f];
  }
}
Ft.extendSubschemaData = Ng;
function Rg(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Ft.extendSubschemaMode = Rg;
var Ne = {}, Uf = { exports: {} }, Dt = Uf.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  ds(t, n, s, e, "", e);
};
Dt.keywords = {
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
Dt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Dt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Dt.skipKeywords = {
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
function ds(e, t, r, n, s, o, a, l, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, o, a, l, c, f);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Dt.arrayKeywords)
          for (var b = 0; b < h.length; b++)
            ds(e, t, r, h[b], s + "/" + u + "/" + b, o, s, u, n, b);
      } else if (u in Dt.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            ds(e, t, r, h[g], s + "/" + u + "/" + Tg(g), o, s, u, n, g);
      } else (u in Dt.keywords || e.allKeys && !(u in Dt.skipKeywords)) && ds(e, t, r, h, s + "/" + u, o, s, u, n);
    }
    r(n, s, o, a, l, c, f);
  }
}
function Tg(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Ig = Uf.exports;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.getSchemaRefs = Ne.resolveUrl = Ne.normalizeId = Ne._getFullPath = Ne.getFullPath = Ne.inlineRef = void 0;
const kg = F, Cg = Vs, jg = Ig, Ag = /* @__PURE__ */ new Set([
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
function Dg(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Yo(e) : t ? Vf(e) <= t : !1;
}
Ne.inlineRef = Dg;
const Lg = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Yo(e) {
  for (const t in e) {
    if (Lg.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Yo) || typeof r == "object" && Yo(r))
      return !0;
  }
  return !1;
}
function Vf(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Ag.has(r) && (typeof e[r] == "object" && (0, kg.eachItem)(e[r], (n) => t += Vf(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function qf(e, t = "", r) {
  r !== !1 && (t = jr(t));
  const n = e.parse(t);
  return zf(e, n);
}
Ne.getFullPath = qf;
function zf(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ne._getFullPath = zf;
const Mg = /#\/?$/;
function jr(e) {
  return e ? e.replace(Mg, "") : "";
}
Ne.normalizeId = jr;
function Fg(e, t, r) {
  return r = jr(r), e.resolve(t, r);
}
Ne.resolveUrl = Fg;
const Ug = /^[a-z_][-a-z0-9._]*$/i;
function Vg(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = jr(e[r] || t), o = { "": s }, a = qf(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return jg(e, { allKeys: !0 }, (h, b, g, v) => {
    if (v === void 0)
      return;
    const _ = a + b;
    let y = o[v];
    typeof h[r] == "string" && (y = p.call(this, h[r])), E.call(this, h.$anchor), E.call(this, h.$dynamicAnchor), o[b] = y;
    function p(O) {
      const N = this.opts.uriResolver.resolve;
      if (O = jr(y ? N(y, O) : O), c.has(O))
        throw u(O);
      c.add(O);
      let I = this.refs[O];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? f(h, I.schema, O) : O !== jr(_) && (O[0] === "#" ? (f(h, l[O], O), l[O] = h) : this.refs[O] = _), O;
    }
    function E(O) {
      if (typeof O == "string") {
        if (!Ug.test(O))
          throw new Error(`invalid anchor "${O}"`);
        p.call(this, `#${O}`);
      }
    }
  }), l;
  function f(h, b, g) {
    if (b !== void 0 && !Cg(h, b))
      throw u(g);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Ne.getSchemaRefs = Vg;
Object.defineProperty(st, "__esModule", { value: !0 });
st.getData = st.KeywordCxt = st.validateFunctionCode = void 0;
const xf = Ur, Uc = ve, _i = vt, Ns = ve, qg = Ks, yn = pt, ho = Ft, H = te, Y = yt, zg = Ne, Et = F, en = Nn;
function xg(e) {
  if (Kf(e) && (Hf(e), Bf(e))) {
    Kg(e);
    return;
  }
  Gf(e, () => (0, xf.topBoolOrEmptySchema)(e));
}
st.validateFunctionCode = xg;
function Gf({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, o) {
  s.code.es5 ? e.func(t, (0, H._)`${Y.default.data}, ${Y.default.valCxt}`, n.$async, () => {
    e.code((0, H._)`"use strict"; ${Vc(r, s)}`), Bg(e, s), e.code(o);
  }) : e.func(t, (0, H._)`${Y.default.data}, ${Gg(s)}`, n.$async, () => e.code(Vc(r, s)).code(o));
}
function Gg(e) {
  return (0, H._)`{${Y.default.instancePath}="", ${Y.default.parentData}, ${Y.default.parentDataProperty}, ${Y.default.rootData}=${Y.default.data}${e.dynamicRef ? (0, H._)`, ${Y.default.dynamicAnchors}={}` : H.nil}}={}`;
}
function Bg(e, t) {
  e.if(Y.default.valCxt, () => {
    e.var(Y.default.instancePath, (0, H._)`${Y.default.valCxt}.${Y.default.instancePath}`), e.var(Y.default.parentData, (0, H._)`${Y.default.valCxt}.${Y.default.parentData}`), e.var(Y.default.parentDataProperty, (0, H._)`${Y.default.valCxt}.${Y.default.parentDataProperty}`), e.var(Y.default.rootData, (0, H._)`${Y.default.valCxt}.${Y.default.rootData}`), t.dynamicRef && e.var(Y.default.dynamicAnchors, (0, H._)`${Y.default.valCxt}.${Y.default.dynamicAnchors}`);
  }, () => {
    e.var(Y.default.instancePath, (0, H._)`""`), e.var(Y.default.parentData, (0, H._)`undefined`), e.var(Y.default.parentDataProperty, (0, H._)`undefined`), e.var(Y.default.rootData, Y.default.data), t.dynamicRef && e.var(Y.default.dynamicAnchors, (0, H._)`{}`);
  });
}
function Kg(e) {
  const { schema: t, opts: r, gen: n } = e;
  Gf(e, () => {
    r.$comment && t.$comment && Xf(e), Yg(e), n.let(Y.default.vErrors, null), n.let(Y.default.errors, 0), r.unevaluated && Hg(e), Wf(e), e0(e);
  });
}
function Hg(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, H._)`${r}.evaluated`), t.if((0, H._)`${e.evaluated}.dynamicProps`, () => t.assign((0, H._)`${e.evaluated}.props`, (0, H._)`undefined`)), t.if((0, H._)`${e.evaluated}.dynamicItems`, () => t.assign((0, H._)`${e.evaluated}.items`, (0, H._)`undefined`));
}
function Vc(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, H._)`/*# sourceURL=${r} */` : H.nil;
}
function Wg(e, t) {
  if (Kf(e) && (Hf(e), Bf(e))) {
    Xg(e, t);
    return;
  }
  (0, xf.boolOrEmptySchema)(e, t);
}
function Bf({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Kf(e) {
  return typeof e.schema != "boolean";
}
function Xg(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Xf(e), Qg(e), Zg(e);
  const o = n.const("_errs", Y.default.errors);
  Wf(e, o), n.var(t, (0, H._)`${o} === ${Y.default.errors}`);
}
function Hf(e) {
  (0, Et.checkUnknownRules)(e), Jg(e);
}
function Wf(e, t) {
  if (e.opts.jtd)
    return qc(e, [], !1, t);
  const r = (0, Uc.getSchemaTypes)(e.schema), n = (0, Uc.coerceAndCheckDataType)(e, r);
  qc(e, r, !n, t);
}
function Jg(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Et.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Yg(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Et.checkStrictMode)(e, "default is ignored in the schema root");
}
function Qg(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, zg.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Zg(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Xf({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const o = r.$comment;
  if (s.$comment === !0)
    e.code((0, H._)`${Y.default.self}.logger.log(${o})`);
  else if (typeof s.$comment == "function") {
    const a = (0, H.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, H._)`${Y.default.self}.opts.$comment(${o}, ${a}, ${l}.schema)`);
  }
}
function e0(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: o } = e;
  r.$async ? t.if((0, H._)`${Y.default.errors} === 0`, () => t.return(Y.default.data), () => t.throw((0, H._)`new ${s}(${Y.default.vErrors})`)) : (t.assign((0, H._)`${n}.errors`, Y.default.vErrors), o.unevaluated && t0(e), t.return((0, H._)`${Y.default.errors} === 0`));
}
function t0({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof H.Name && e.assign((0, H._)`${t}.props`, r), n instanceof H.Name && e.assign((0, H._)`${t}.items`, n);
}
function qc(e, t, r, n) {
  const { gen: s, schema: o, data: a, allErrors: l, opts: c, self: f } = e, { RULES: u } = f;
  if (o.$ref && (c.ignoreKeywordsWithRef || !(0, Et.schemaHasRulesButRef)(o, u))) {
    s.block(() => Qf(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || r0(e, t), s.block(() => {
    for (const b of u.rules)
      h(b);
    h(u.post);
  });
  function h(b) {
    (0, _i.shouldUseGroup)(o, b) && (b.type ? (s.if((0, Ns.checkDataType)(b.type, a, c.strictNumbers)), zc(e, b), t.length === 1 && t[0] === b.type && r && (s.else(), (0, Ns.reportTypeError)(e)), s.endIf()) : zc(e, b), l || s.if((0, H._)`${Y.default.errors} === ${n || 0}`));
  }
}
function zc(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, qg.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, _i.shouldUseRule)(n, o) && Qf(e, o.keyword, o.definition, t.type);
  });
}
function r0(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (n0(e, t), e.opts.allowUnionTypes || s0(e, t), o0(e, e.dataTypes));
}
function n0(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Jf(e.dataTypes, r) || $i(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), i0(e, t);
  }
}
function s0(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && $i(e, "use allowUnionTypes to allow union type keyword");
}
function o0(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, _i.shouldUseRule)(e.schema, s)) {
      const { type: o } = s.definition;
      o.length && !o.some((a) => a0(t, a)) && $i(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function a0(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Jf(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function i0(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Jf(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function $i(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Et.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Yf {
  constructor(t, r, n) {
    if ((0, yn.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Et.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Zf(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, yn.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", Y.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, H.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, H.not)(t), void 0, r);
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
    this.fail((0, H._)`${r} !== undefined && (${(0, H.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? en.reportExtraError : en.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, en.reportError)(this, this.def.$dataError || en.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, en.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = H.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = H.nil, r = H.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: o, def: a } = this;
    n.if((0, H.or)((0, H._)`${s} === undefined`, r)), t !== H.nil && n.assign(t, !0), (o.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== H.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: o } = this;
    return (0, H.or)(a(), l());
    function a() {
      if (n.length) {
        if (!(r instanceof H.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, H._)`${(0, Ns.checkDataTypes)(c, r, o.opts.strictNumbers, Ns.DataType.Wrong)}`;
      }
      return H.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, H._)`!${c}(${r})`;
      }
      return H.nil;
    }
  }
  subschema(t, r) {
    const n = (0, ho.getSubschema)(this.it, t);
    (0, ho.extendSubschemaData)(n, this.it, t), (0, ho.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return Wg(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Et.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Et.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, H.Name)), !0;
  }
}
st.KeywordCxt = Yf;
function Qf(e, t, r, n) {
  const s = new Yf(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, yn.funcKeywordCode)(s, r) : "macro" in r ? (0, yn.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, yn.funcKeywordCode)(s, r);
}
const c0 = /^\/(?:[^~]|~0|~1)*$/, l0 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Zf(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, o;
  if (e === "")
    return Y.default.rootData;
  if (e[0] === "/") {
    if (!c0.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, o = Y.default.rootData;
  } else {
    const f = l0.exec(e);
    if (!f)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +f[1];
    if (s = f[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (o = r[t - u], !s)
      return o;
  }
  let a = o;
  const l = s.split("/");
  for (const f of l)
    f && (o = (0, H._)`${o}${(0, H.getProperty)((0, Et.unescapeJsonPointer)(f))}`, a = (0, H._)`${a} && ${o}`);
  return a;
  function c(f, u) {
    return `Cannot access ${f} ${u} levels up, current level is ${t}`;
  }
}
st.getData = Zf;
var Rn = {};
Object.defineProperty(Rn, "__esModule", { value: !0 });
class u0 extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Rn.default = u0;
var Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
const po = Ne;
class f0 extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, po.resolveUrl)(t, r, n), this.missingSchema = (0, po.normalizeId)((0, po.getFullPath)(t, this.missingRef));
  }
}
Br.default = f0;
var Ue = {};
Object.defineProperty(Ue, "__esModule", { value: !0 });
Ue.resolveSchema = Ue.getCompilingSchema = Ue.resolveRef = Ue.compileSchema = Ue.SchemaEnv = void 0;
const Je = te, d0 = Rn, nr = yt, rt = Ne, xc = F, h0 = st;
class Hs {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, rt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Ue.SchemaEnv = Hs;
function gi(e) {
  const t = ed.call(this, e);
  if (t)
    return t;
  const r = (0, rt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: o } = this.opts, a = new Je.CodeGen(this.scope, { es5: n, lines: s, ownProperties: o });
  let l;
  e.$async && (l = a.scopeValue("Error", {
    ref: d0.default,
    code: (0, Je._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = a.scopeName("validate");
  e.validateName = c;
  const f = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: nr.default.data,
    parentData: nr.default.parentData,
    parentDataProperty: nr.default.parentDataProperty,
    dataNames: [nr.default.data],
    dataPathArr: [Je.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Je.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Je.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Je._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, h0.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
    const h = a.toString();
    u = `${a.scopeRefs(nr.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const g = new Function(`${nr.default.self}`, `${nr.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: g }), g.errors = null, g.schema = e.schema, g.schemaEnv = e, e.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: c, validateCode: h, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: v, items: _ } = f;
      g.evaluated = {
        props: v instanceof Je.Name ? void 0 : v,
        items: _ instanceof Je.Name ? void 0 : _,
        dynamicProps: v instanceof Je.Name,
        dynamicItems: _ instanceof Je.Name
      }, g.source && (g.source.evaluated = (0, Je.stringify)(g.evaluated));
    }
    return e.validate = g, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Ue.compileSchema = gi;
function p0(e, t, r) {
  var n;
  r = (0, rt.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let o = _0.call(this, e, r);
  if (o === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    a && (o = new Hs({ schema: a, schemaId: l, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = m0.call(this, o);
}
Ue.resolveRef = p0;
function m0(e) {
  return (0, rt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : gi.call(this, e);
}
function ed(e) {
  for (const t of this._compilations)
    if (y0(t, e))
      return t;
}
Ue.getCompilingSchema = ed;
function y0(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function _0(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Ws.call(this, e, t);
}
function Ws(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, rt._getFullPath)(this.opts.uriResolver, r);
  let s = (0, rt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return mo.call(this, r, e);
  const o = (0, rt.normalizeId)(n), a = this.refs[o] || this.schemas[o];
  if (typeof a == "string") {
    const l = Ws.call(this, e, a);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : mo.call(this, r, l);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || gi.call(this, a), o === (0, rt.normalizeId)(t)) {
      const { schema: l } = a, { schemaId: c } = this.opts, f = l[c];
      return f && (s = (0, rt.resolveUrl)(this.opts.uriResolver, s, f)), new Hs({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return mo.call(this, r, a);
  }
}
Ue.resolveSchema = Ws;
const $0 = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function mo(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, xc.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !$0.has(l) && f && (t = (0, rt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, xc.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, rt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = Ws.call(this, n, l);
  }
  const { schemaId: a } = this.opts;
  if (o = o || new Hs({ schema: r, schemaId: a, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const g0 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", v0 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", E0 = "object", w0 = [
  "$data"
], S0 = {
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
}, b0 = !1, P0 = {
  $id: g0,
  description: v0,
  type: E0,
  required: w0,
  properties: S0,
  additionalProperties: b0
};
var vi = {};
Object.defineProperty(vi, "__esModule", { value: !0 });
const td = ff;
td.code = 'require("ajv/dist/runtime/uri").default';
vi.default = td;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = st;
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
  const n = Rn, s = Br, o = yr, a = Ue, l = te, c = Ne, f = ve, u = F, h = P0, b = vi, g = (w, m) => new RegExp(w, m);
  g.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], _ = /* @__PURE__ */ new Set([
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
  ]), y = {
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
  }, E = 200;
  function O(w) {
    var m, S, $, i, d, P, k, C, B, x, oe, Ve, qt, zt, xt, Gt, Bt, Kt, Ht, Wt, Xt, Jt, Yt, Qt, Zt;
    const We = w.strict, er = (m = w.code) === null || m === void 0 ? void 0 : m.optimize, Jr = er === !0 || er === void 0 ? 1 : er || 0, Yr = ($ = (S = w.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : g, ao = (i = w.uriResolver) !== null && i !== void 0 ? i : b.default;
    return {
      strictSchema: (P = (d = w.strictSchema) !== null && d !== void 0 ? d : We) !== null && P !== void 0 ? P : !0,
      strictNumbers: (C = (k = w.strictNumbers) !== null && k !== void 0 ? k : We) !== null && C !== void 0 ? C : !0,
      strictTypes: (x = (B = w.strictTypes) !== null && B !== void 0 ? B : We) !== null && x !== void 0 ? x : "log",
      strictTuples: (Ve = (oe = w.strictTuples) !== null && oe !== void 0 ? oe : We) !== null && Ve !== void 0 ? Ve : "log",
      strictRequired: (zt = (qt = w.strictRequired) !== null && qt !== void 0 ? qt : We) !== null && zt !== void 0 ? zt : !1,
      code: w.code ? { ...w.code, optimize: Jr, regExp: Yr } : { optimize: Jr, regExp: Yr },
      loopRequired: (xt = w.loopRequired) !== null && xt !== void 0 ? xt : E,
      loopEnum: (Gt = w.loopEnum) !== null && Gt !== void 0 ? Gt : E,
      meta: (Bt = w.meta) !== null && Bt !== void 0 ? Bt : !0,
      messages: (Kt = w.messages) !== null && Kt !== void 0 ? Kt : !0,
      inlineRefs: (Ht = w.inlineRefs) !== null && Ht !== void 0 ? Ht : !0,
      schemaId: (Wt = w.schemaId) !== null && Wt !== void 0 ? Wt : "$id",
      addUsedSchema: (Xt = w.addUsedSchema) !== null && Xt !== void 0 ? Xt : !0,
      validateSchema: (Jt = w.validateSchema) !== null && Jt !== void 0 ? Jt : !0,
      validateFormats: (Yt = w.validateFormats) !== null && Yt !== void 0 ? Yt : !0,
      unicodeRegExp: (Qt = w.unicodeRegExp) !== null && Qt !== void 0 ? Qt : !0,
      int32range: (Zt = w.int32range) !== null && Zt !== void 0 ? Zt : !0,
      uriResolver: ao
    };
  }
  class N {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...O(m) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: _, es5: S, lines: $ }), this.logger = q(m.logger);
      const i = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, o.getRules)(), I.call(this, y, m, "NOT SUPPORTED"), I.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = X.call(this), m.formats && ae.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && U.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), W.call(this), m.validateFormats = i;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: S, schemaId: $ } = this.opts;
      let i = h;
      $ === "id" && (i = { ...h }, i.id = i.$id, delete i.$id), S && m && this.addMetaSchema(i, i[$], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[S] || m : void 0;
    }
    validate(m, S) {
      let $;
      if (typeof m == "string") {
        if ($ = this.getSchema(m), !$)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        $ = this.compile(m);
      const i = $(S);
      return "$async" in $ || (this.errors = $.errors), i;
    }
    compile(m, S) {
      const $ = this._addSchema(m, S);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(m, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return i.call(this, m, S);
      async function i(x, oe) {
        await d.call(this, x.$schema);
        const Ve = this._addSchema(x, oe);
        return Ve.validate || P.call(this, Ve);
      }
      async function d(x) {
        x && !this.getSchema(x) && await i.call(this, { $ref: x }, !0);
      }
      async function P(x) {
        try {
          return this._compileSchemaEnv(x);
        } catch (oe) {
          if (!(oe instanceof s.default))
            throw oe;
          return k.call(this, oe), await C.call(this, oe.missingSchema), P.call(this, x);
        }
      }
      function k({ missingSchema: x, missingRef: oe }) {
        if (this.refs[x])
          throw new Error(`AnySchema ${x} is loaded but ${oe} cannot be resolved`);
      }
      async function C(x) {
        const oe = await B.call(this, x);
        this.refs[x] || await d.call(this, oe.$schema), this.refs[x] || this.addSchema(oe, x, S);
      }
      async function B(x) {
        const oe = this._loading[x];
        if (oe)
          return oe;
        try {
          return await (this._loading[x] = $(x));
        } finally {
          delete this._loading[x];
        }
      }
    }
    // Adds schema to the instance
    addSchema(m, S, $, i = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const P of m)
          this.addSchema(P, void 0, $, i);
        return this;
      }
      let d;
      if (typeof m == "object") {
        const { schemaId: P } = this.opts;
        if (d = m[P], d !== void 0 && typeof d != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return S = (0, c.normalizeId)(S || d), this._checkUnique(S), this.schemas[S] = this._addSchema(m, $, S, i, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, S, $ = this.opts.validateSchema) {
      return this.addSchema(m, S, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, S) {
      if (typeof m == "boolean")
        return !0;
      let $;
      if ($ = m.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const i = this.validate($, m);
      if (!i && S) {
        const d = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(d);
        else
          throw new Error(d);
      }
      return i;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(m) {
      let S;
      for (; typeof (S = z.call(this, m)) == "string"; )
        m = S;
      if (S === void 0) {
        const { schemaId: $ } = this.opts, i = new a.SchemaEnv({ schema: {}, schemaId: $ });
        if (S = a.resolveSchema.call(this, i, m), !S)
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
          let $ = m[this.opts.schemaId];
          return $ && ($ = (0, c.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
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
      let $;
      if (typeof m == "string")
        $ = m, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = $);
      else if (typeof m == "object" && S === void 0) {
        if (S = m, $ = S.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (j.call(this, $, S), !S)
        return (0, u.eachItem)($, (d) => A.call(this, d)), this;
      L.call(this, S);
      const i = {
        ...S,
        type: (0, f.getJSONTypes)(S.type),
        schemaType: (0, f.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)($, i.type.length === 0 ? (d) => A.call(this, d, i) : (d) => i.type.forEach((P) => A.call(this, d, i, P))), this;
    }
    getKeyword(m) {
      const S = this.RULES.all[m];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: S } = this;
      delete S.keywords[m], delete S.all[m];
      for (const $ of S.rules) {
        const i = $.rules.findIndex((d) => d.keyword === m);
        i >= 0 && $.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[m] = S, this;
    }
    errorsText(m = this.errors, { separator: S = ", ", dataVar: $ = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((i) => `${$}${i.instancePath} ${i.message}`).reduce((i, d) => i + S + d);
    }
    $dataMetaSchema(m, S) {
      const $ = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const i of S) {
        const d = i.split("/").slice(1);
        let P = m;
        for (const k of d)
          P = P[k];
        for (const k in $) {
          const C = $[k];
          if (typeof C != "object")
            continue;
          const { $data: B } = C.definition, x = P[k];
          B && x && (P[k] = T(x));
        }
      }
      return m;
    }
    _removeAllSchemas(m, S) {
      for (const $ in m) {
        const i = m[$];
        (!S || S.test($)) && (typeof i == "string" ? delete m[$] : i && !i.meta && (this._cache.delete(i.schema), delete m[$]));
      }
    }
    _addSchema(m, S, $, i = this.opts.validateSchema, d = this.opts.addUsedSchema) {
      let P;
      const { schemaId: k } = this.opts;
      if (typeof m == "object")
        P = m[k];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof m != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let C = this._cache.get(m);
      if (C !== void 0)
        return C;
      $ = (0, c.normalizeId)(P || $);
      const B = c.getSchemaRefs.call(this, m, $);
      return C = new a.SchemaEnv({ schema: m, schemaId: k, meta: S, baseId: $, localRefs: B }), this._cache.set(C.schema, C), d && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = C), i && this.validateSchema(m, !0), C;
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
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, m);
      } finally {
        this.opts = S;
      }
    }
  }
  N.ValidationError = n.default, N.MissingRefError = s.default, e.default = N;
  function I(w, m, S, $ = "error") {
    for (const i in w) {
      const d = i;
      d in m && this.logger[$](`${S}: option ${i}. ${w[d]}`);
    }
  }
  function z(w) {
    return w = (0, c.normalizeId)(w), this.schemas[w] || this.refs[w];
  }
  function W() {
    const w = this.opts.schemas;
    if (w)
      if (Array.isArray(w))
        this.addSchema(w);
      else
        for (const m in w)
          this.addSchema(w[m], m);
  }
  function ae() {
    for (const w in this.opts.formats) {
      const m = this.opts.formats[w];
      m && this.addFormat(w, m);
    }
  }
  function U(w) {
    if (Array.isArray(w)) {
      this.addVocabulary(w);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in w) {
      const S = w[m];
      S.keyword || (S.keyword = m), this.addKeyword(S);
    }
  }
  function X() {
    const w = { ...this.opts };
    for (const m of v)
      delete w[m];
    return w;
  }
  const V = { log() {
  }, warn() {
  }, error() {
  } };
  function q(w) {
    if (w === !1)
      return V;
    if (w === void 0)
      return console;
    if (w.log && w.warn && w.error)
      return w;
    throw new Error("logger must implement log, warn and error methods");
  }
  const G = /^[a-z_$][a-z0-9_$:-]*$/i;
  function j(w, m) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(w, ($) => {
      if (S.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!G.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function A(w, m, S) {
    var $;
    const i = m == null ? void 0 : m.post;
    if (S && i)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: d } = this;
    let P = i ? d.post : d.rules.find(({ type: C }) => C === S);
    if (P || (P = { type: S, rules: [] }, d.rules.push(P)), d.keywords[w] = !0, !m)
      return;
    const k = {
      keyword: w,
      definition: {
        ...m,
        type: (0, f.getJSONTypes)(m.type),
        schemaType: (0, f.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? D.call(this, P, k, m.before) : P.rules.push(k), d.all[w] = k, ($ = m.implements) === null || $ === void 0 || $.forEach((C) => this.addKeyword(C));
  }
  function D(w, m, S) {
    const $ = w.rules.findIndex((i) => i.keyword === S);
    $ >= 0 ? w.rules.splice($, 0, m) : (w.rules.push(m), this.logger.warn(`rule ${S} is not defined`));
  }
  function L(w) {
    let { metaSchema: m } = w;
    m !== void 0 && (w.$data && this.opts.$data && (m = T(m)), w.validateSchema = this.compile(m, !0));
  }
  const R = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(w) {
    return { anyOf: [w, R] };
  }
})(Sf);
var Ei = {}, wi = {}, Si = {};
Object.defineProperty(Si, "__esModule", { value: !0 });
const O0 = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Si.default = O0;
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.callRef = _r.getValidate = void 0;
const N0 = Br, Gc = ne, Me = te, Er = yt, Bc = Ue, qn = F, R0 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: o, validateName: a, opts: l, self: c } = n, { root: f } = o;
    if ((r === "#" || r === "#/") && s === f.baseId)
      return h();
    const u = Bc.resolveRef.call(c, f, s, r);
    if (u === void 0)
      throw new N0.default(n.opts.uriResolver, s, r);
    if (u instanceof Bc.SchemaEnv)
      return b(u);
    return g(u);
    function h() {
      if (o === f)
        return hs(e, a, o, o.$async);
      const v = t.scopeValue("root", { ref: f });
      return hs(e, (0, Me._)`${v}.validate`, f, f.$async);
    }
    function b(v) {
      const _ = rd(e, v);
      hs(e, _, v, v.$async);
    }
    function g(v) {
      const _ = t.scopeValue("schema", l.code.source === !0 ? { ref: v, code: (0, Me.stringify)(v) } : { ref: v }), y = t.name("valid"), p = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Me.nil,
        topSchemaRef: _,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(p), e.ok(y);
    }
  }
};
function rd(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Me._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
_r.getValidate = rd;
function hs(e, t, r, n) {
  const { gen: s, it: o } = e, { allErrors: a, schemaEnv: l, opts: c } = o, f = c.passContext ? Er.default.this : Me.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Me._)`await ${(0, Gc.callValidateCode)(e, t, f)}`), g(t), a || s.assign(v, !0);
    }, (_) => {
      s.if((0, Me._)`!(${_} instanceof ${o.ValidationError})`, () => s.throw(_)), b(_), a || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, Gc.callValidateCode)(e, t, f), () => g(t), () => b(t));
  }
  function b(v) {
    const _ = (0, Me._)`${v}.errors`;
    s.assign(Er.default.vErrors, (0, Me._)`${Er.default.vErrors} === null ? ${_} : ${Er.default.vErrors}.concat(${_})`), s.assign(Er.default.errors, (0, Me._)`${Er.default.vErrors}.length`);
  }
  function g(v) {
    var _;
    if (!o.opts.unevaluated)
      return;
    const y = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (o.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (o.props = qn.mergeEvaluated.props(s, y.props, o.props));
      else {
        const p = s.var("props", (0, Me._)`${v}.evaluated.props`);
        o.props = qn.mergeEvaluated.props(s, p, o.props, Me.Name);
      }
    if (o.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (o.items = qn.mergeEvaluated.items(s, y.items, o.items));
      else {
        const p = s.var("items", (0, Me._)`${v}.evaluated.items`);
        o.items = qn.mergeEvaluated.items(s, p, o.items, Me.Name);
      }
  }
}
_r.callRef = hs;
_r.default = R0;
Object.defineProperty(wi, "__esModule", { value: !0 });
const T0 = Si, I0 = _r, k0 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  T0.default,
  I0.default
];
wi.default = k0;
var bi = {}, Pi = {};
Object.defineProperty(Pi, "__esModule", { value: !0 });
const Rs = te, Rt = Rs.operators, Ts = {
  maximum: { okStr: "<=", ok: Rt.LTE, fail: Rt.GT },
  minimum: { okStr: ">=", ok: Rt.GTE, fail: Rt.LT },
  exclusiveMaximum: { okStr: "<", ok: Rt.LT, fail: Rt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Rt.GT, fail: Rt.LTE }
}, C0 = {
  message: ({ keyword: e, schemaCode: t }) => (0, Rs.str)`must be ${Ts[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Rs._)`{comparison: ${Ts[e].okStr}, limit: ${t}}`
}, j0 = {
  keyword: Object.keys(Ts),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: C0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Rs._)`${r} ${Ts[t].fail} ${n} || isNaN(${r})`);
  }
};
Pi.default = j0;
var Oi = {};
Object.defineProperty(Oi, "__esModule", { value: !0 });
const _n = te, A0 = {
  message: ({ schemaCode: e }) => (0, _n.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, _n._)`{multipleOf: ${e}}`
}, D0 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: A0,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, o = s.opts.multipleOfPrecision, a = t.let("res"), l = o ? (0, _n._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, _n._)`${a} !== parseInt(${a})`;
    e.fail$data((0, _n._)`(${n} === 0 || (${a} = ${r}/${n}, ${l}))`);
  }
};
Oi.default = D0;
var Ni = {}, Ri = {};
Object.defineProperty(Ri, "__esModule", { value: !0 });
function nd(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ri.default = nd;
nd.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ni, "__esModule", { value: !0 });
const dr = te, L0 = F, M0 = Ri, F0 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, dr.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, dr._)`{limit: ${e}}`
}, U0 = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: F0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, o = t === "maxLength" ? dr.operators.GT : dr.operators.LT, a = s.opts.unicode === !1 ? (0, dr._)`${r}.length` : (0, dr._)`${(0, L0.useFunc)(e.gen, M0.default)}(${r})`;
    e.fail$data((0, dr._)`${a} ${o} ${n}`);
  }
};
Ni.default = U0;
var Ti = {};
Object.defineProperty(Ti, "__esModule", { value: !0 });
const V0 = ne, Is = te, q0 = {
  message: ({ schemaCode: e }) => (0, Is.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Is._)`{pattern: ${e}}`
}, z0 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: q0,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: o } = e, a = o.opts.unicodeRegExp ? "u" : "", l = r ? (0, Is._)`(new RegExp(${s}, ${a}))` : (0, V0.usePattern)(e, n);
    e.fail$data((0, Is._)`!${l}.test(${t})`);
  }
};
Ti.default = z0;
var Ii = {};
Object.defineProperty(Ii, "__esModule", { value: !0 });
const $n = te, x0 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, $n.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, $n._)`{limit: ${e}}`
}, G0 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: x0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? $n.operators.GT : $n.operators.LT;
    e.fail$data((0, $n._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Ii.default = G0;
var ki = {};
Object.defineProperty(ki, "__esModule", { value: !0 });
const tn = ne, gn = te, B0 = F, K0 = {
  message: ({ params: { missingProperty: e } }) => (0, gn.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, gn._)`{missingProperty: ${e}}`
}, H0 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: K0,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: o, it: a } = e, { opts: l } = a;
    if (!o && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (a.allErrors ? f() : u(), l.strictRequired) {
      const g = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const _ of r)
        if ((g == null ? void 0 : g[_]) === void 0 && !v.has(_)) {
          const y = a.schemaEnv.baseId + a.errSchemaPath, p = `required property "${_}" is not defined at "${y}" (strictRequired)`;
          (0, B0.checkStrictMode)(a, p, a.opts.strictRequired);
        }
    }
    function f() {
      if (c || o)
        e.block$data(gn.nil, h);
      else
        for (const g of r)
          (0, tn.checkReportMissingProp)(e, g);
    }
    function u() {
      const g = t.let("missing");
      if (c || o) {
        const v = t.let("valid", !0);
        e.block$data(v, () => b(g, v)), e.ok(v);
      } else
        t.if((0, tn.checkMissingProp)(e, r, g)), (0, tn.reportMissingProp)(e, g), t.else();
    }
    function h() {
      t.forOf("prop", n, (g) => {
        e.setParams({ missingProperty: g }), t.if((0, tn.noPropertyInData)(t, s, g, l.ownProperties), () => e.error());
      });
    }
    function b(g, v) {
      e.setParams({ missingProperty: g }), t.forOf(g, n, () => {
        t.assign(v, (0, tn.propertyInData)(t, s, g, l.ownProperties)), t.if((0, gn.not)(v), () => {
          e.error(), t.break();
        });
      }, gn.nil);
    }
  }
};
ki.default = H0;
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
const vn = te, W0 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, vn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, vn._)`{limit: ${e}}`
}, X0 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: W0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? vn.operators.GT : vn.operators.LT;
    e.fail$data((0, vn._)`${r}.length ${s} ${n}`);
  }
};
Ci.default = X0;
var ji = {}, Tn = {};
Object.defineProperty(Tn, "__esModule", { value: !0 });
const sd = Vs;
sd.code = 'require("ajv/dist/runtime/equal").default';
Tn.default = sd;
Object.defineProperty(ji, "__esModule", { value: !0 });
const yo = ve, be = te, J0 = F, Y0 = Tn, Q0 = {
  message: ({ params: { i: e, j: t } }) => (0, be.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, be._)`{i: ${e}, j: ${t}}`
}, Z0 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Q0,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: o, schemaCode: a, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), f = o.items ? (0, yo.getSchemaTypes)(o.items) : [];
    e.block$data(c, u, (0, be._)`${a} === false`), e.ok(c);
    function u() {
      const v = t.let("i", (0, be._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: v, j: _ }), t.assign(c, !0), t.if((0, be._)`${v} > 1`, () => (h() ? b : g)(v, _));
    }
    function h() {
      return f.length > 0 && !f.some((v) => v === "object" || v === "array");
    }
    function b(v, _) {
      const y = t.name("item"), p = (0, yo.checkDataTypes)(f, y, l.opts.strictNumbers, yo.DataType.Wrong), E = t.const("indices", (0, be._)`{}`);
      t.for((0, be._)`;${v}--;`, () => {
        t.let(y, (0, be._)`${r}[${v}]`), t.if(p, (0, be._)`continue`), f.length > 1 && t.if((0, be._)`typeof ${y} == "string"`, (0, be._)`${y} += "_"`), t.if((0, be._)`typeof ${E}[${y}] == "number"`, () => {
          t.assign(_, (0, be._)`${E}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, be._)`${E}[${y}] = ${v}`);
      });
    }
    function g(v, _) {
      const y = (0, J0.useFunc)(t, Y0.default), p = t.name("outer");
      t.label(p).for((0, be._)`;${v}--;`, () => t.for((0, be._)`${_} = ${v}; ${_}--;`, () => t.if((0, be._)`${y}(${r}[${v}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
ji.default = Z0;
var Ai = {};
Object.defineProperty(Ai, "__esModule", { value: !0 });
const Qo = te, ev = F, tv = Tn, rv = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Qo._)`{allowedValue: ${e}}`
}, nv = {
  keyword: "const",
  $data: !0,
  error: rv,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, Qo._)`!${(0, ev.useFunc)(t, tv.default)}(${r}, ${s})`) : e.fail((0, Qo._)`${o} !== ${r}`);
  }
};
Ai.default = nv;
var Di = {};
Object.defineProperty(Di, "__esModule", { value: !0 });
const ln = te, sv = F, ov = Tn, av = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, ln._)`{allowedValues: ${e}}`
}, iv = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: av,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: o, it: a } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= a.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, sv.useFunc)(t, ov.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = t.const("vSchema", o);
      u = (0, ln.or)(...s.map((v, _) => b(g, _)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", o, (g) => t.if((0, ln._)`${f()}(${r}, ${g})`, () => t.assign(u, !0).break()));
    }
    function b(g, v) {
      const _ = s[v];
      return typeof _ == "object" && _ !== null ? (0, ln._)`${f()}(${r}, ${g}[${v}])` : (0, ln._)`${r} === ${_}`;
    }
  }
};
Di.default = iv;
Object.defineProperty(bi, "__esModule", { value: !0 });
const cv = Pi, lv = Oi, uv = Ni, fv = Ti, dv = Ii, hv = ki, pv = Ci, mv = ji, yv = Ai, _v = Di, $v = [
  // number
  cv.default,
  lv.default,
  // string
  uv.default,
  fv.default,
  // object
  dv.default,
  hv.default,
  // array
  pv.default,
  mv.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  yv.default,
  _v.default
];
bi.default = $v;
var Li = {}, Kr = {};
Object.defineProperty(Kr, "__esModule", { value: !0 });
Kr.validateAdditionalItems = void 0;
const hr = te, Zo = F, gv = {
  message: ({ params: { len: e } }) => (0, hr.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, hr._)`{limit: ${e}}`
}, vv = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: gv,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Zo.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    od(e, n);
  }
};
function od(e, t) {
  const { gen: r, schema: n, data: s, keyword: o, it: a } = e;
  a.items = !0;
  const l = r.const("len", (0, hr._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, hr._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Zo.alwaysValidSchema)(a, n)) {
    const f = r.var("valid", (0, hr._)`${l} <= ${t.length}`);
    r.if((0, hr.not)(f), () => c(f)), e.ok(f);
  }
  function c(f) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: o, dataProp: u, dataPropType: Zo.Type.Num }, f), a.allErrors || r.if((0, hr.not)(f), () => r.break());
    });
  }
}
Kr.validateAdditionalItems = od;
Kr.default = vv;
var Mi = {}, Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.validateTuple = void 0;
const Kc = te, ps = F, Ev = ne, wv = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return ad(e, "additionalItems", t);
    r.items = !0, !(0, ps.alwaysValidSchema)(r, t) && e.ok((0, Ev.validateArray)(e));
  }
};
function ad(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: o, keyword: a, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = ps.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), f = n.const("len", (0, Kc._)`${o}.length`);
  r.forEach((h, b) => {
    (0, ps.alwaysValidSchema)(l, h) || (n.if((0, Kc._)`${f} > ${b}`, () => e.subschema({
      keyword: a,
      schemaProp: b,
      dataProp: b
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: b, errSchemaPath: g } = l, v = r.length, _ = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (b.strictTuples && !_) {
      const y = `"${a}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, ps.checkStrictMode)(l, y, b.strictTuples);
    }
  }
}
Hr.validateTuple = ad;
Hr.default = wv;
Object.defineProperty(Mi, "__esModule", { value: !0 });
const Sv = Hr, bv = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Sv.validateTuple)(e, "items")
};
Mi.default = bv;
var Fi = {};
Object.defineProperty(Fi, "__esModule", { value: !0 });
const Hc = te, Pv = F, Ov = ne, Nv = Kr, Rv = {
  message: ({ params: { len: e } }) => (0, Hc.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Hc._)`{limit: ${e}}`
}, Tv = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Rv,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Pv.alwaysValidSchema)(n, t) && (s ? (0, Nv.validateAdditionalItems)(e, s) : e.ok((0, Ov.validateArray)(e)));
  }
};
Fi.default = Tv;
var Ui = {};
Object.defineProperty(Ui, "__esModule", { value: !0 });
const He = te, zn = F, Iv = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He.str)`must contain at least ${e} valid item(s)` : (0, He.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He._)`{minContains: ${e}}` : (0, He._)`{minContains: ${e}, maxContains: ${t}}`
}, kv = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Iv,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    let a, l;
    const { minContains: c, maxContains: f } = n;
    o.opts.next ? (a = c === void 0 ? 1 : c, l = f) : a = 1;
    const u = t.const("len", (0, He._)`${s}.length`);
    if (e.setParams({ min: a, max: l }), l === void 0 && a === 0) {
      (0, zn.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && a > l) {
      (0, zn.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, zn.alwaysValidSchema)(o, r)) {
      let _ = (0, He._)`${u} >= ${a}`;
      l !== void 0 && (_ = (0, He._)`${_} && ${u} <= ${l}`), e.pass(_);
      return;
    }
    o.items = !0;
    const h = t.name("valid");
    l === void 0 && a === 1 ? g(h, () => t.if(h, () => t.break())) : a === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, He._)`${s}.length > 0`, b)) : (t.let(h, !1), b()), e.result(h, () => e.reset());
    function b() {
      const _ = t.name("_valid"), y = t.let("count", 0);
      g(_, () => t.if(_, () => v(y)));
    }
    function g(_, y) {
      t.forRange("i", 0, u, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: zn.Type.Num,
          compositeRule: !0
        }, _), y();
      });
    }
    function v(_) {
      t.code((0, He._)`${_}++`), l === void 0 ? t.if((0, He._)`${_} >= ${a}`, () => t.assign(h, !0).break()) : (t.if((0, He._)`${_} > ${l}`, () => t.assign(h, !1).break()), a === 1 ? t.assign(h, !0) : t.if((0, He._)`${_} >= ${a}`, () => t.assign(h, !0)));
    }
  }
};
Ui.default = kv;
var id = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = F, n = ne;
  e.error = {
    message: ({ params: { property: c, depsCount: f, deps: u } }) => {
      const h = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: f, deps: u, missingProperty: h } }) => (0, t._)`{property: ${c},
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
    code(c) {
      const [f, u] = o(c);
      a(c, f), l(c, u);
    }
  };
  function o({ schema: c }) {
    const f = {}, u = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const b = Array.isArray(c[h]) ? f : u;
      b[h] = c[h];
    }
    return [f, u];
  }
  function a(c, f = c.schema) {
    const { gen: u, data: h, it: b } = c;
    if (Object.keys(f).length === 0)
      return;
    const g = u.let("missing");
    for (const v in f) {
      const _ = f[v];
      if (_.length === 0)
        continue;
      const y = (0, n.propertyInData)(u, h, v, b.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: _.length,
        deps: _.join(", ")
      }), b.allErrors ? u.if(y, () => {
        for (const p of _)
          (0, n.checkReportMissingProp)(c, p);
      }) : (u.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, _, g)})`), (0, n.reportMissingProp)(c, g), u.else());
    }
  }
  e.validatePropertyDeps = a;
  function l(c, f = c.schema) {
    const { gen: u, data: h, keyword: b, it: g } = c, v = u.name("valid");
    for (const _ in f)
      (0, r.alwaysValidSchema)(g, f[_]) || (u.if(
        (0, n.propertyInData)(u, h, _, g.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: b, schemaProp: _ }, v);
          c.mergeValidEvaluated(y, v);
        },
        () => u.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = l, e.default = s;
})(id);
var Vi = {};
Object.defineProperty(Vi, "__esModule", { value: !0 });
const cd = te, Cv = F, jv = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, cd._)`{propertyName: ${e.propertyName}}`
}, Av = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: jv,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Cv.alwaysValidSchema)(s, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, o), t.if((0, cd.not)(o), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
Vi.default = Av;
var Xs = {};
Object.defineProperty(Xs, "__esModule", { value: !0 });
const xn = ne, Ze = te, Dv = yt, Gn = F, Lv = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ze._)`{additionalProperty: ${e.additionalProperty}}`
}, Mv = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Lv,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: o, it: a } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, Gn.alwaysValidSchema)(a, r))
      return;
    const f = (0, xn.allSchemaProperties)(n.properties), u = (0, xn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Ze._)`${o} === ${Dv.default.errors}`);
    function h() {
      t.forIn("key", s, (y) => {
        !f.length && !u.length ? v(y) : t.if(b(y), () => v(y));
      });
    }
    function b(y) {
      let p;
      if (f.length > 8) {
        const E = (0, Gn.schemaRefOrVal)(a, n.properties, "properties");
        p = (0, xn.isOwnProperty)(t, E, y);
      } else f.length ? p = (0, Ze.or)(...f.map((E) => (0, Ze._)`${y} === ${E}`)) : p = Ze.nil;
      return u.length && (p = (0, Ze.or)(p, ...u.map((E) => (0, Ze._)`${(0, xn.usePattern)(e, E)}.test(${y})`))), (0, Ze.not)(p);
    }
    function g(y) {
      t.code((0, Ze._)`delete ${s}[${y}]`);
    }
    function v(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        g(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Gn.alwaysValidSchema)(a, r)) {
        const p = t.name("valid");
        c.removeAdditional === "failing" ? (_(y, p, !1), t.if((0, Ze.not)(p), () => {
          e.reset(), g(y);
        })) : (_(y, p), l || t.if((0, Ze.not)(p), () => t.break()));
      }
    }
    function _(y, p, E) {
      const O = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: Gn.Type.Str
      };
      E === !1 && Object.assign(O, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(O, p);
    }
  }
};
Xs.default = Mv;
var qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
const Fv = st, Wc = ne, _o = F, Xc = Xs, Uv = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Xc.default.code(new Fv.KeywordCxt(o, Xc.default, "additionalProperties"));
    const a = (0, Wc.allSchemaProperties)(r);
    for (const h of a)
      o.definedProperties.add(h);
    o.opts.unevaluated && a.length && o.props !== !0 && (o.props = _o.mergeEvaluated.props(t, (0, _o.toHash)(a), o.props));
    const l = a.filter((h) => !(0, _o.alwaysValidSchema)(o, r[h]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const h of l)
      f(h) ? u(h) : (t.if((0, Wc.propertyInData)(t, s, h, o.opts.ownProperties)), u(h), o.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function f(h) {
      return o.opts.useDefaults && !o.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
qi.default = Uv;
var zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
const Jc = ne, Bn = te, Yc = F, Qc = F, Vv = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: o } = e, { opts: a } = o, l = (0, Jc.allSchemaProperties)(r), c = l.filter((_) => (0, Yc.alwaysValidSchema)(o, r[_]));
    if (l.length === 0 || c.length === l.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && s.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof Bn.Name) && (o.props = (0, Qc.evaluatedPropsToName)(t, o.props));
    const { props: h } = o;
    b();
    function b() {
      for (const _ of l)
        f && g(_), o.allErrors ? v(_) : (t.var(u, !0), v(_), t.if(u));
    }
    function g(_) {
      for (const y in f)
        new RegExp(_).test(y) && (0, Yc.checkStrictMode)(o, `property ${y} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function v(_) {
      t.forIn("key", n, (y) => {
        t.if((0, Bn._)`${(0, Jc.usePattern)(e, _)}.test(${y})`, () => {
          const p = c.includes(_);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: y,
            dataPropType: Qc.Type.Str
          }, u), o.opts.unevaluated && h !== !0 ? t.assign((0, Bn._)`${h}[${y}]`, !0) : !p && !o.allErrors && t.if((0, Bn.not)(u), () => t.break());
        });
      });
    }
  }
};
zi.default = Vv;
var xi = {};
Object.defineProperty(xi, "__esModule", { value: !0 });
const qv = F, zv = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, qv.alwaysValidSchema)(n, r)) {
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
xi.default = zv;
var Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
const xv = ne, Gv = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: xv.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Gi.default = Gv;
var Bi = {};
Object.defineProperty(Bi, "__esModule", { value: !0 });
const ms = te, Bv = F, Kv = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ms._)`{passingSchemas: ${e.passing}}`
}, Hv = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Kv,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const o = r, a = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(f), e.result(a, () => e.reset(), () => e.error(!0));
    function f() {
      o.forEach((u, h) => {
        let b;
        (0, Bv.alwaysValidSchema)(s, u) ? t.var(c, !0) : b = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, ms._)`${c} && ${a}`).assign(a, !1).assign(l, (0, ms._)`[${l}, ${h}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(l, h), b && e.mergeEvaluated(b, ms.Name);
        });
      });
    }
  }
};
Bi.default = Hv;
var Ki = {};
Object.defineProperty(Ki, "__esModule", { value: !0 });
const Wv = F, Xv = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((o, a) => {
      if ((0, Wv.alwaysValidSchema)(n, o))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: a }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
Ki.default = Xv;
var Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
const ks = te, ld = F, Jv = {
  message: ({ params: e }) => (0, ks.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, ks._)`{failingKeyword: ${e.ifClause}}`
}, Yv = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Jv,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, ld.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Zc(n, "then"), o = Zc(n, "else");
    if (!s && !o)
      return;
    const a = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && o) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, f("then", u), f("else", u));
    } else s ? t.if(l, f("then")) : t.if((0, ks.not)(l), f("else"));
    e.pass(a, () => e.error(!0));
    function c() {
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
        const b = e.subschema({ keyword: u }, l);
        t.assign(a, l), e.mergeValidEvaluated(b, a), h ? t.assign(h, (0, ks._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Zc(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, ld.alwaysValidSchema)(e, r);
}
Hi.default = Yv;
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
const Qv = F, Zv = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Qv.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Wi.default = Zv;
Object.defineProperty(Li, "__esModule", { value: !0 });
const eE = Kr, tE = Mi, rE = Hr, nE = Fi, sE = Ui, oE = id, aE = Vi, iE = Xs, cE = qi, lE = zi, uE = xi, fE = Gi, dE = Bi, hE = Ki, pE = Hi, mE = Wi;
function yE(e = !1) {
  const t = [
    // any
    uE.default,
    fE.default,
    dE.default,
    hE.default,
    pE.default,
    mE.default,
    // object
    aE.default,
    iE.default,
    oE.default,
    cE.default,
    lE.default
  ];
  return e ? t.push(tE.default, nE.default) : t.push(eE.default, rE.default), t.push(sE.default), t;
}
Li.default = yE;
var Xi = {}, Ji = {};
Object.defineProperty(Ji, "__esModule", { value: !0 });
const $e = te, _E = {
  message: ({ schemaCode: e }) => (0, $e.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, $e._)`{format: ${e}}`
}, $E = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: _E,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: o, schemaCode: a, it: l } = e, { opts: c, errSchemaPath: f, schemaEnv: u, self: h } = l;
    if (!c.validateFormats)
      return;
    s ? b() : g();
    function b() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), _ = r.const("fDef", (0, $e._)`${v}[${a}]`), y = r.let("fType"), p = r.let("format");
      r.if((0, $e._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign(y, (0, $e._)`${_}.type || "string"`).assign(p, (0, $e._)`${_}.validate`), () => r.assign(y, (0, $e._)`"string"`).assign(p, _)), e.fail$data((0, $e.or)(E(), O()));
      function E() {
        return c.strictSchema === !1 ? $e.nil : (0, $e._)`${a} && !${p}`;
      }
      function O() {
        const N = u.$async ? (0, $e._)`(${_}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, $e._)`${p}(${n})`, I = (0, $e._)`(typeof ${p} == "function" ? ${N} : ${p}.test(${n}))`;
        return (0, $e._)`${p} && ${p} !== true && ${y} === ${t} && !${I}`;
      }
    }
    function g() {
      const v = h.formats[o];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [_, y, p] = O(v);
      _ === t && e.pass(N());
      function E() {
        if (c.strictSchema === !1) {
          h.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${o}" ignored in schema at path "${f}"`;
        }
      }
      function O(I) {
        const z = I instanceof RegExp ? (0, $e.regexpCode)(I) : c.code.formats ? (0, $e._)`${c.code.formats}${(0, $e.getProperty)(o)}` : void 0, W = r.scopeValue("formats", { key: o, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, $e._)`${W}.validate`] : ["string", I, W];
      }
      function N() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, $e._)`await ${p}(${n})`;
        }
        return typeof y == "function" ? (0, $e._)`${p}(${n})` : (0, $e._)`${p}.test(${n})`;
      }
    }
  }
};
Ji.default = $E;
Object.defineProperty(Xi, "__esModule", { value: !0 });
const gE = Ji, vE = [gE.default];
Xi.default = vE;
var Vr = {};
Object.defineProperty(Vr, "__esModule", { value: !0 });
Vr.contentVocabulary = Vr.metadataVocabulary = void 0;
Vr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Vr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Ei, "__esModule", { value: !0 });
const EE = wi, wE = bi, SE = Li, bE = Xi, el = Vr, PE = [
  EE.default,
  wE.default,
  (0, SE.default)(),
  bE.default,
  el.metadataVocabulary,
  el.contentVocabulary
];
Ei.default = PE;
var Yi = {}, Js = {};
Object.defineProperty(Js, "__esModule", { value: !0 });
Js.DiscrError = void 0;
var tl;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(tl || (Js.DiscrError = tl = {}));
Object.defineProperty(Yi, "__esModule", { value: !0 });
const Or = te, ea = Js, rl = Ue, OE = Br, NE = F, RE = {
  message: ({ params: { discrError: e, tagName: t } }) => e === ea.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Or._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, TE = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: RE,
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
    const c = t.let("valid", !1), f = t.const("tag", (0, Or._)`${r}${(0, Or.getProperty)(l)}`);
    t.if((0, Or._)`typeof ${f} == "string"`, () => u(), () => e.error(!1, { discrError: ea.DiscrError.Tag, tag: f, tagName: l })), e.ok(c);
    function u() {
      const g = b();
      t.if(!1);
      for (const v in g)
        t.elseIf((0, Or._)`${f} === ${v}`), t.assign(c, h(g[v]));
      t.else(), e.error(!1, { discrError: ea.DiscrError.Mapping, tag: f, tagName: l }), t.endIf();
    }
    function h(g) {
      const v = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: g }, v);
      return e.mergeEvaluated(_, Or.Name), v;
    }
    function b() {
      var g;
      const v = {}, _ = p(s);
      let y = !0;
      for (let N = 0; N < a.length; N++) {
        let I = a[N];
        if (I != null && I.$ref && !(0, NE.schemaHasRulesButRef)(I, o.self.RULES)) {
          const W = I.$ref;
          if (I = rl.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, W), I instanceof rl.SchemaEnv && (I = I.schema), I === void 0)
            throw new OE.default(o.opts.uriResolver, o.baseId, W);
        }
        const z = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[l];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        y = y && (_ || p(I)), E(z, N);
      }
      if (!y)
        throw new Error(`discriminator: "${l}" must be required`);
      return v;
      function p({ required: N }) {
        return Array.isArray(N) && N.includes(l);
      }
      function E(N, I) {
        if (N.const)
          O(N.const, I);
        else if (N.enum)
          for (const z of N.enum)
            O(z, I);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function O(N, I) {
        if (typeof N != "string" || N in v)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        v[N] = I;
      }
    }
  }
};
Yi.default = TE;
const IE = "http://json-schema.org/draft-07/schema#", kE = "http://json-schema.org/draft-07/schema#", CE = "Core schema meta-schema", jE = {
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
}, AE = [
  "object",
  "boolean"
], DE = {
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
}, LE = {
  $schema: IE,
  $id: kE,
  title: CE,
  definitions: jE,
  type: AE,
  properties: DE,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Sf, n = Ei, s = Yi, o = LE, a = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(o, a) : o;
      this.addMetaSchema(v, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var f = st;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return f.KeywordCxt;
  } });
  var u = te;
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
  var h = Rn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var b = Br;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return b.default;
  } });
})(Ho, Ho.exports);
var ME = Ho.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = ME, r = te, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, o = {
    message: ({ keyword: l, schemaCode: c }) => r.str`should be ${s[l].okStr} ${c}`,
    params: ({ keyword: l, schemaCode: c }) => r._`{comparison: ${s[l].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: o,
    code(l) {
      const { gen: c, data: f, schemaCode: u, keyword: h, it: b } = l, { opts: g, self: v } = b;
      if (!g.validateFormats)
        return;
      const _ = new t.KeywordCxt(b, v.RULES.all.format.definition, "format");
      _.$data ? y() : p();
      function y() {
        const O = c.scopeValue("formats", {
          ref: v.formats,
          code: g.code.formats
        }), N = c.const("fmt", r._`${O}[${_.schemaCode}]`);
        l.fail$data(r.or(r._`typeof ${N} != "object"`, r._`${N} instanceof RegExp`, r._`typeof ${N}.compare != "function"`, E(N)));
      }
      function p() {
        const O = _.schema, N = v.formats[O];
        if (!N || N === !0)
          return;
        if (typeof N != "object" || N instanceof RegExp || typeof N.compare != "function")
          throw new Error(`"${h}": format "${O}" does not define "compare" function`);
        const I = c.scopeValue("formats", {
          key: O,
          ref: N,
          code: g.code.formats ? r._`${g.code.formats}${r.getProperty(O)}` : void 0
        });
        l.fail$data(E(I));
      }
      function E(O) {
        return r._`${O}.compare(${f}, ${u}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const a = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = a;
})(wf);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Ef, n = wf, s = te, o = new s.Name("fullFormats"), a = new s.Name("fastFormats"), l = (f, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return c(f, u, r.fullFormats, o), f;
    const [h, b] = u.mode === "fast" ? [r.fastFormats, a] : [r.fullFormats, o], g = u.formats || r.formatNames;
    return c(f, g, h, b), u.keywords && n.default(f), f;
  };
  l.get = (f, u = "full") => {
    const b = (u === "fast" ? r.fastFormats : r.fullFormats)[f];
    if (!b)
      throw new Error(`Unknown format "${f}"`);
    return b;
  };
  function c(f, u, h, b) {
    var g, v;
    (g = (v = f.opts.code).formats) !== null && g !== void 0 || (v.formats = s._`require("ajv-formats/dist/formats").${b}`);
    for (const _ of u)
      f.addFormat(_, h[_]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})(Ko, Ko.exports);
var FE = Ko.exports;
const UE = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), o = Object.getOwnPropertyDescriptor(t, r);
  !VE(s, o) && n || Object.defineProperty(e, r, o);
}, VE = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, qE = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, zE = (e, t) => `/* Wrapped ${e}*/
${t}`, xE = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), GE = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), BE = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = zE.bind(null, n, t.toString());
  Object.defineProperty(s, "name", GE), Object.defineProperty(e, "toString", { ...xE, value: s });
}, KE = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    UE(e, t, s, r);
  return qE(e, t), BE(e, t, n), e;
};
var HE = KE;
const WE = HE;
var XE = (e, t = {}) => {
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
  const l = function(...c) {
    const f = this, u = () => {
      o = void 0, s && (a = e.apply(f, c));
    }, h = n && !o;
    return clearTimeout(o), o = setTimeout(u, r), h && (a = e.apply(f, c)), a;
  };
  return WE(l, e), l.cancel = () => {
    o && (clearTimeout(o), o = void 0);
  }, l;
}, ta = { exports: {} };
const JE = "2.0.0", ud = 256, YE = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, QE = 16, ZE = ud - 6, ew = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ys = {
  MAX_LENGTH: ud,
  MAX_SAFE_COMPONENT_LENGTH: QE,
  MAX_SAFE_BUILD_LENGTH: ZE,
  MAX_SAFE_INTEGER: YE,
  RELEASE_TYPES: ew,
  SEMVER_SPEC_VERSION: JE,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const tw = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Qs = tw;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = Ys, o = Qs;
  t = e.exports = {};
  const a = t.re = [], l = t.safeRe = [], c = t.src = [], f = t.safeSrc = [], u = t.t = {};
  let h = 0;
  const b = "[a-zA-Z0-9-]", g = [
    ["\\s", 1],
    ["\\d", s],
    [b, n]
  ], v = (y) => {
    for (const [p, E] of g)
      y = y.split(`${p}*`).join(`${p}{0,${E}}`).split(`${p}+`).join(`${p}{1,${E}}`);
    return y;
  }, _ = (y, p, E) => {
    const O = v(p), N = h++;
    o(y, N, p), u[y] = N, c[N] = p, f[N] = O, a[N] = new RegExp(p, E ? "g" : void 0), l[N] = new RegExp(O, E ? "g" : void 0);
  };
  _("NUMERICIDENTIFIER", "0|[1-9]\\d*"), _("NUMERICIDENTIFIERLOOSE", "\\d+"), _("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${b}*`), _("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), _("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), _("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), _("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), _("BUILDIDENTIFIER", `${b}+`), _("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), _("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), _("FULL", `^${c[u.FULLPLAIN]}$`), _("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), _("LOOSE", `^${c[u.LOOSEPLAIN]}$`), _("GTLT", "((?:<|>)?=?)"), _("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), _("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), _("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), _("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), _("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), _("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), _("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), _("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), _("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), _("COERCERTL", c[u.COERCE], !0), _("COERCERTLFULL", c[u.COERCEFULL], !0), _("LONETILDE", "(?:~>?)"), _("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", _("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), _("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), _("LONECARET", "(?:\\^)"), _("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", _("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), _("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), _("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), _("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), _("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", _("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), _("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), _("STAR", "(<|>)?=?\\s*\\*"), _("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), _("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(ta, ta.exports);
var In = ta.exports;
const rw = Object.freeze({ loose: !0 }), nw = Object.freeze({}), sw = (e) => e ? typeof e != "object" ? rw : e : nw;
var Qi = sw;
const nl = /^[0-9]+$/, fd = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = nl.test(e), n = nl.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, ow = (e, t) => fd(t, e);
var dd = {
  compareIdentifiers: fd,
  rcompareIdentifiers: ow
};
const Kn = Qs, { MAX_LENGTH: sl, MAX_SAFE_INTEGER: Hn } = Ys, { safeRe: Wn, t: Xn } = In, aw = Qi, { compareIdentifiers: $o } = dd;
let iw = class ct {
  constructor(t, r) {
    if (r = aw(r), t instanceof ct) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > sl)
      throw new TypeError(
        `version is longer than ${sl} characters`
      );
    Kn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Wn[Xn.LOOSE] : Wn[Xn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Hn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Hn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Hn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const o = +s;
        if (o >= 0 && o < Hn)
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
    if (Kn("SemVer.compare", this.version, this.options, t), !(t instanceof ct)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ct(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ct || (t = new ct(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof ct || (t = new ct(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (Kn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return $o(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof ct || (t = new ct(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (Kn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return $o(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? Wn[Xn.PRERELEASELOOSE] : Wn[Xn.PRERELEASE]);
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
          n === !1 && (o = [r]), $o(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ae = iw;
const ol = Ae, cw = (e, t, r = !1) => {
  if (e instanceof ol)
    return e;
  try {
    return new ol(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Wr = cw;
const lw = Wr, uw = (e, t) => {
  const r = lw(e, t);
  return r ? r.version : null;
};
var fw = uw;
const dw = Wr, hw = (e, t) => {
  const r = dw(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var pw = hw;
const al = Ae, mw = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new al(
      e instanceof al ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var yw = mw;
const il = Wr, _w = (e, t) => {
  const r = il(e, null, !0), n = il(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const o = s > 0, a = o ? r : n, l = o ? n : r, c = !!a.prerelease.length;
  if (!!l.prerelease.length && !c) {
    if (!l.patch && !l.minor)
      return "major";
    if (l.compareMain(a) === 0)
      return l.minor && !l.patch ? "minor" : "patch";
  }
  const u = c ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var $w = _w;
const gw = Ae, vw = (e, t) => new gw(e, t).major;
var Ew = vw;
const ww = Ae, Sw = (e, t) => new ww(e, t).minor;
var bw = Sw;
const Pw = Ae, Ow = (e, t) => new Pw(e, t).patch;
var Nw = Ow;
const Rw = Wr, Tw = (e, t) => {
  const r = Rw(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Iw = Tw;
const cl = Ae, kw = (e, t, r) => new cl(e, r).compare(new cl(t, r));
var ot = kw;
const Cw = ot, jw = (e, t, r) => Cw(t, e, r);
var Aw = jw;
const Dw = ot, Lw = (e, t) => Dw(e, t, !0);
var Mw = Lw;
const ll = Ae, Fw = (e, t, r) => {
  const n = new ll(e, r), s = new ll(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Zi = Fw;
const Uw = Zi, Vw = (e, t) => e.sort((r, n) => Uw(r, n, t));
var qw = Vw;
const zw = Zi, xw = (e, t) => e.sort((r, n) => zw(n, r, t));
var Gw = xw;
const Bw = ot, Kw = (e, t, r) => Bw(e, t, r) > 0;
var Zs = Kw;
const Hw = ot, Ww = (e, t, r) => Hw(e, t, r) < 0;
var ec = Ww;
const Xw = ot, Jw = (e, t, r) => Xw(e, t, r) === 0;
var hd = Jw;
const Yw = ot, Qw = (e, t, r) => Yw(e, t, r) !== 0;
var pd = Qw;
const Zw = ot, eS = (e, t, r) => Zw(e, t, r) >= 0;
var tc = eS;
const tS = ot, rS = (e, t, r) => tS(e, t, r) <= 0;
var rc = rS;
const nS = hd, sS = pd, oS = Zs, aS = tc, iS = ec, cS = rc, lS = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return nS(e, r, n);
    case "!=":
      return sS(e, r, n);
    case ">":
      return oS(e, r, n);
    case ">=":
      return aS(e, r, n);
    case "<":
      return iS(e, r, n);
    case "<=":
      return cS(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var md = lS;
const uS = Ae, fS = Wr, { safeRe: Jn, t: Yn } = In, dS = (e, t) => {
  if (e instanceof uS)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Jn[Yn.COERCEFULL] : Jn[Yn.COERCE]);
  else {
    const c = t.includePrerelease ? Jn[Yn.COERCERTLFULL] : Jn[Yn.COERCERTL];
    let f;
    for (; (f = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), c.lastIndex = f.index + f[1].length + f[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", l = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return fS(`${n}.${s}.${o}${a}${l}`, t);
};
var hS = dS;
class pS {
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
var mS = pS, go, ul;
function at() {
  if (ul) return go;
  ul = 1;
  const e = /\s+/g;
  class t {
    constructor(A, D) {
      if (D = s(D), A instanceof t)
        return A.loose === !!D.loose && A.includePrerelease === !!D.includePrerelease ? A : new t(A.raw, D);
      if (A instanceof o)
        return this.raw = A.value, this.set = [[A]], this.formatted = void 0, this;
      if (this.options = D, this.loose = !!D.loose, this.includePrerelease = !!D.includePrerelease, this.raw = A.trim().replace(e, " "), this.set = this.raw.split("||").map((L) => this.parseRange(L.trim())).filter((L) => L.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const L = this.set[0];
        if (this.set = this.set.filter((R) => !_(R[0])), this.set.length === 0)
          this.set = [L];
        else if (this.set.length > 1) {
          for (const R of this.set)
            if (R.length === 1 && y(R[0])) {
              this.set = [R];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let A = 0; A < this.set.length; A++) {
          A > 0 && (this.formatted += "||");
          const D = this.set[A];
          for (let L = 0; L < D.length; L++)
            L > 0 && (this.formatted += " "), this.formatted += D[L].toString().trim();
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
    parseRange(A) {
      const L = ((this.options.includePrerelease && g) | (this.options.loose && v)) + ":" + A, R = n.get(L);
      if (R)
        return R;
      const T = this.options.loose, w = T ? c[f.HYPHENRANGELOOSE] : c[f.HYPHENRANGE];
      A = A.replace(w, q(this.options.includePrerelease)), a("hyphen replace", A), A = A.replace(c[f.COMPARATORTRIM], u), a("comparator trim", A), A = A.replace(c[f.TILDETRIM], h), a("tilde trim", A), A = A.replace(c[f.CARETTRIM], b), a("caret trim", A);
      let m = A.split(" ").map((d) => E(d, this.options)).join(" ").split(/\s+/).map((d) => V(d, this.options));
      T && (m = m.filter((d) => (a("loose invalid filter", d, this.options), !!d.match(c[f.COMPARATORLOOSE])))), a("range list", m);
      const S = /* @__PURE__ */ new Map(), $ = m.map((d) => new o(d, this.options));
      for (const d of $) {
        if (_(d))
          return [d];
        S.set(d.value, d);
      }
      S.size > 1 && S.has("") && S.delete("");
      const i = [...S.values()];
      return n.set(L, i), i;
    }
    intersects(A, D) {
      if (!(A instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((L) => p(L, D) && A.set.some((R) => p(R, D) && L.every((T) => R.every((w) => T.intersects(w, D)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(A) {
      if (!A)
        return !1;
      if (typeof A == "string")
        try {
          A = new l(A, this.options);
        } catch {
          return !1;
        }
      for (let D = 0; D < this.set.length; D++)
        if (G(this.set[D], A, this.options))
          return !0;
      return !1;
    }
  }
  go = t;
  const r = mS, n = new r(), s = Qi, o = eo(), a = Qs, l = Ae, {
    safeRe: c,
    t: f,
    comparatorTrimReplace: u,
    tildeTrimReplace: h,
    caretTrimReplace: b
  } = In, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: v } = Ys, _ = (j) => j.value === "<0.0.0-0", y = (j) => j.value === "", p = (j, A) => {
    let D = !0;
    const L = j.slice();
    let R = L.pop();
    for (; D && L.length; )
      D = L.every((T) => R.intersects(T, A)), R = L.pop();
    return D;
  }, E = (j, A) => (j = j.replace(c[f.BUILD], ""), a("comp", j, A), j = z(j, A), a("caret", j), j = N(j, A), a("tildes", j), j = ae(j, A), a("xrange", j), j = X(j, A), a("stars", j), j), O = (j) => !j || j.toLowerCase() === "x" || j === "*", N = (j, A) => j.trim().split(/\s+/).map((D) => I(D, A)).join(" "), I = (j, A) => {
    const D = A.loose ? c[f.TILDELOOSE] : c[f.TILDE];
    return j.replace(D, (L, R, T, w, m) => {
      a("tilde", j, L, R, T, w, m);
      let S;
      return O(R) ? S = "" : O(T) ? S = `>=${R}.0.0 <${+R + 1}.0.0-0` : O(w) ? S = `>=${R}.${T}.0 <${R}.${+T + 1}.0-0` : m ? (a("replaceTilde pr", m), S = `>=${R}.${T}.${w}-${m} <${R}.${+T + 1}.0-0`) : S = `>=${R}.${T}.${w} <${R}.${+T + 1}.0-0`, a("tilde return", S), S;
    });
  }, z = (j, A) => j.trim().split(/\s+/).map((D) => W(D, A)).join(" "), W = (j, A) => {
    a("caret", j, A);
    const D = A.loose ? c[f.CARETLOOSE] : c[f.CARET], L = A.includePrerelease ? "-0" : "";
    return j.replace(D, (R, T, w, m, S) => {
      a("caret", j, R, T, w, m, S);
      let $;
      return O(T) ? $ = "" : O(w) ? $ = `>=${T}.0.0${L} <${+T + 1}.0.0-0` : O(m) ? T === "0" ? $ = `>=${T}.${w}.0${L} <${T}.${+w + 1}.0-0` : $ = `>=${T}.${w}.0${L} <${+T + 1}.0.0-0` : S ? (a("replaceCaret pr", S), T === "0" ? w === "0" ? $ = `>=${T}.${w}.${m}-${S} <${T}.${w}.${+m + 1}-0` : $ = `>=${T}.${w}.${m}-${S} <${T}.${+w + 1}.0-0` : $ = `>=${T}.${w}.${m}-${S} <${+T + 1}.0.0-0`) : (a("no pr"), T === "0" ? w === "0" ? $ = `>=${T}.${w}.${m}${L} <${T}.${w}.${+m + 1}-0` : $ = `>=${T}.${w}.${m}${L} <${T}.${+w + 1}.0-0` : $ = `>=${T}.${w}.${m} <${+T + 1}.0.0-0`), a("caret return", $), $;
    });
  }, ae = (j, A) => (a("replaceXRanges", j, A), j.split(/\s+/).map((D) => U(D, A)).join(" ")), U = (j, A) => {
    j = j.trim();
    const D = A.loose ? c[f.XRANGELOOSE] : c[f.XRANGE];
    return j.replace(D, (L, R, T, w, m, S) => {
      a("xRange", j, L, R, T, w, m, S);
      const $ = O(T), i = $ || O(w), d = i || O(m), P = d;
      return R === "=" && P && (R = ""), S = A.includePrerelease ? "-0" : "", $ ? R === ">" || R === "<" ? L = "<0.0.0-0" : L = "*" : R && P ? (i && (w = 0), m = 0, R === ">" ? (R = ">=", i ? (T = +T + 1, w = 0, m = 0) : (w = +w + 1, m = 0)) : R === "<=" && (R = "<", i ? T = +T + 1 : w = +w + 1), R === "<" && (S = "-0"), L = `${R + T}.${w}.${m}${S}`) : i ? L = `>=${T}.0.0${S} <${+T + 1}.0.0-0` : d && (L = `>=${T}.${w}.0${S} <${T}.${+w + 1}.0-0`), a("xRange return", L), L;
    });
  }, X = (j, A) => (a("replaceStars", j, A), j.trim().replace(c[f.STAR], "")), V = (j, A) => (a("replaceGTE0", j, A), j.trim().replace(c[A.includePrerelease ? f.GTE0PRE : f.GTE0], "")), q = (j) => (A, D, L, R, T, w, m, S, $, i, d, P) => (O(L) ? D = "" : O(R) ? D = `>=${L}.0.0${j ? "-0" : ""}` : O(T) ? D = `>=${L}.${R}.0${j ? "-0" : ""}` : w ? D = `>=${D}` : D = `>=${D}${j ? "-0" : ""}`, O($) ? S = "" : O(i) ? S = `<${+$ + 1}.0.0-0` : O(d) ? S = `<${$}.${+i + 1}.0-0` : P ? S = `<=${$}.${i}.${d}-${P}` : j ? S = `<${$}.${i}.${+d + 1}-0` : S = `<=${S}`, `${D} ${S}`.trim()), G = (j, A, D) => {
    for (let L = 0; L < j.length; L++)
      if (!j[L].test(A))
        return !1;
    if (A.prerelease.length && !D.includePrerelease) {
      for (let L = 0; L < j.length; L++)
        if (a(j[L].semver), j[L].semver !== o.ANY && j[L].semver.prerelease.length > 0) {
          const R = j[L].semver;
          if (R.major === A.major && R.minor === A.minor && R.patch === A.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return go;
}
var vo, fl;
function eo() {
  if (fl) return vo;
  fl = 1;
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
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], b = u.match(h);
      if (!b)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = b[1] !== void 0 ? b[1] : "", this.operator === "=" && (this.operator = ""), b[2] ? this.semver = new l(b[2], this.options.loose) : this.semver = e;
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
      return this.operator === "" ? this.value === "" ? !0 : new c(u.value, h).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new c(this.value, h).test(u.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || o(this.semver, "<", u.semver, h) && this.operator.startsWith(">") && u.operator.startsWith("<") || o(this.semver, ">", u.semver, h) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  vo = t;
  const r = Qi, { safeRe: n, t: s } = In, o = md, a = Qs, l = Ae, c = at();
  return vo;
}
const yS = at(), _S = (e, t, r) => {
  try {
    t = new yS(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var to = _S;
const $S = at(), gS = (e, t) => new $S(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var vS = gS;
const ES = Ae, wS = at(), SS = (e, t, r) => {
  let n = null, s = null, o = null;
  try {
    o = new wS(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || s.compare(a) === -1) && (n = a, s = new ES(n, r));
  }), n;
};
var bS = SS;
const PS = Ae, OS = at(), NS = (e, t, r) => {
  let n = null, s = null, o = null;
  try {
    o = new OS(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || s.compare(a) === 1) && (n = a, s = new PS(n, r));
  }), n;
};
var RS = NS;
const Eo = Ae, TS = at(), dl = Zs, IS = (e, t) => {
  e = new TS(e, t);
  let r = new Eo("0.0.0");
  if (e.test(r) || (r = new Eo("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let o = null;
    s.forEach((a) => {
      const l = new Eo(a.semver.version);
      switch (a.operator) {
        case ">":
          l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
        case "":
        case ">=":
          (!o || dl(l, o)) && (o = l);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || dl(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var kS = IS;
const CS = at(), jS = (e, t) => {
  try {
    return new CS(e, t).range || "*";
  } catch {
    return null;
  }
};
var AS = jS;
const DS = Ae, yd = eo(), { ANY: LS } = yd, MS = at(), FS = to, hl = Zs, pl = ec, US = rc, VS = tc, qS = (e, t, r, n) => {
  e = new DS(e, n), t = new MS(t, n);
  let s, o, a, l, c;
  switch (r) {
    case ">":
      s = hl, o = US, a = pl, l = ">", c = ">=";
      break;
    case "<":
      s = pl, o = VS, a = hl, l = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (FS(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const u = t.set[f];
    let h = null, b = null;
    if (u.forEach((g) => {
      g.semver === LS && (g = new yd(">=0.0.0")), h = h || g, b = b || g, s(g.semver, h.semver, n) ? h = g : a(g.semver, b.semver, n) && (b = g);
    }), h.operator === l || h.operator === c || (!b.operator || b.operator === l) && o(e, b.semver))
      return !1;
    if (b.operator === c && a(e, b.semver))
      return !1;
  }
  return !0;
};
var nc = qS;
const zS = nc, xS = (e, t, r) => zS(e, t, ">", r);
var GS = xS;
const BS = nc, KS = (e, t, r) => BS(e, t, "<", r);
var HS = KS;
const ml = at(), WS = (e, t, r) => (e = new ml(e, r), t = new ml(t, r), e.intersects(t, r));
var XS = WS;
const JS = to, YS = ot;
var QS = (e, t, r) => {
  const n = [];
  let s = null, o = null;
  const a = e.sort((u, h) => YS(u, h, r));
  for (const u of a)
    JS(u, t, r) ? (o = u, s || (s = u)) : (o && n.push([s, o]), o = null, s = null);
  s && n.push([s, null]);
  const l = [];
  for (const [u, h] of n)
    u === h ? l.push(u) : !h && u === a[0] ? l.push("*") : h ? u === a[0] ? l.push(`<=${h}`) : l.push(`${u} - ${h}`) : l.push(`>=${u}`);
  const c = l.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < f.length ? c : t;
};
const yl = at(), sc = eo(), { ANY: wo } = sc, rn = to, oc = ot, ZS = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new yl(e, r), t = new yl(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const o of t.set) {
      const a = tb(s, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, eb = [new sc(">=0.0.0-0")], _l = [new sc(">=0.0.0")], tb = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === wo) {
    if (t.length === 1 && t[0].semver === wo)
      return !0;
    r.includePrerelease ? e = eb : e = _l;
  }
  if (t.length === 1 && t[0].semver === wo) {
    if (r.includePrerelease)
      return !0;
    t = _l;
  }
  const n = /* @__PURE__ */ new Set();
  let s, o;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? s = $l(s, g, r) : g.operator === "<" || g.operator === "<=" ? o = gl(o, g, r) : n.add(g.semver);
  if (n.size > 1)
    return null;
  let a;
  if (s && o) {
    if (a = oc(s.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (s.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const g of n) {
    if (s && !rn(g, String(s), r) || o && !rn(g, String(o), r))
      return null;
    for (const v of t)
      if (!rn(g, String(v), r))
        return !1;
    return !0;
  }
  let l, c, f, u, h = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, b = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && o.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const g of t) {
    if (u = u || g.operator === ">" || g.operator === ">=", f = f || g.operator === "<" || g.operator === "<=", s) {
      if (b && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === b.major && g.semver.minor === b.minor && g.semver.patch === b.patch && (b = !1), g.operator === ">" || g.operator === ">=") {
        if (l = $l(s, g, r), l === g && l !== s)
          return !1;
      } else if (s.operator === ">=" && !rn(s.semver, String(g), r))
        return !1;
    }
    if (o) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === "<" || g.operator === "<=") {
        if (c = gl(o, g, r), c === g && c !== o)
          return !1;
      } else if (o.operator === "<=" && !rn(o.semver, String(g), r))
        return !1;
    }
    if (!g.operator && (o || s) && a !== 0)
      return !1;
  }
  return !(s && f && !o && a !== 0 || o && u && !s && a !== 0 || b || h);
}, $l = (e, t, r) => {
  if (!e)
    return t;
  const n = oc(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, gl = (e, t, r) => {
  if (!e)
    return t;
  const n = oc(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var rb = ZS;
const So = In, vl = Ys, nb = Ae, El = dd, sb = Wr, ob = fw, ab = pw, ib = yw, cb = $w, lb = Ew, ub = bw, fb = Nw, db = Iw, hb = ot, pb = Aw, mb = Mw, yb = Zi, _b = qw, $b = Gw, gb = Zs, vb = ec, Eb = hd, wb = pd, Sb = tc, bb = rc, Pb = md, Ob = hS, Nb = eo(), Rb = at(), Tb = to, Ib = vS, kb = bS, Cb = RS, jb = kS, Ab = AS, Db = nc, Lb = GS, Mb = HS, Fb = XS, Ub = QS, Vb = rb;
var qb = {
  parse: sb,
  valid: ob,
  clean: ab,
  inc: ib,
  diff: cb,
  major: lb,
  minor: ub,
  patch: fb,
  prerelease: db,
  compare: hb,
  rcompare: pb,
  compareLoose: mb,
  compareBuild: yb,
  sort: _b,
  rsort: $b,
  gt: gb,
  lt: vb,
  eq: Eb,
  neq: wb,
  gte: Sb,
  lte: bb,
  cmp: Pb,
  coerce: Ob,
  Comparator: Nb,
  Range: Rb,
  satisfies: Tb,
  toComparators: Ib,
  maxSatisfying: kb,
  minSatisfying: Cb,
  minVersion: jb,
  validRange: Ab,
  outside: Db,
  gtr: Lb,
  ltr: Mb,
  intersects: Fb,
  simplifyRange: Ub,
  subset: Vb,
  SemVer: nb,
  re: So.re,
  src: So.src,
  tokens: So.t,
  SEMVER_SPEC_VERSION: vl.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: vl.RELEASE_TYPES,
  compareIdentifiers: El.compareIdentifiers,
  rcompareIdentifiers: El.rcompareIdentifiers
}, ro = { exports: {} }, ac = { exports: {} };
const _d = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
ac.exports = _d;
ac.exports.default = _d;
var zb = ac.exports;
const xb = zb, Cs = /* @__PURE__ */ new WeakMap(), $d = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", o = function(...a) {
    if (Cs.set(o, ++n), n === 1)
      r = e.apply(this, a), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return xb(o, e), Cs.set(o, n), o;
};
ro.exports = $d;
ro.exports.default = $d;
ro.exports.callCount = (e) => {
  if (!Cs.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Cs.get(e);
};
var Gb = ro.exports;
(function(e, t) {
  var r = Cn && Cn.__classPrivateFieldSet || function(L, R, T, w, m) {
    if (w === "m") throw new TypeError("Private method is not writable");
    if (w === "a" && !m) throw new TypeError("Private accessor was defined without a setter");
    if (typeof R == "function" ? L !== R || !m : !R.has(L)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return w === "a" ? m.call(L, T) : m ? m.value = T : R.set(L, T), T;
  }, n = Cn && Cn.__classPrivateFieldGet || function(L, R, T, w) {
    if (T === "a" && !w) throw new TypeError("Private accessor was defined without a getter");
    if (typeof R == "function" ? L !== R || !w : !R.has(L)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? w : T === "a" ? w.call(L) : w ? w.value : R.get(L);
  }, s, o, a, l, c, f;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const u = eu, h = Ls, b = Ut, g = Ms, v = Gd, _ = tu, y = th, p = dh, E = yh, O = ft, N = O$, I = FE, z = XE, W = qb, ae = Gb, U = "aes-256-cbc", X = () => /* @__PURE__ */ Object.create(null), V = (L) => L != null;
  let q = "";
  try {
    delete require.cache[__filename], q = b.dirname((o = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && o !== void 0 ? o : ".");
  } catch {
  }
  const G = (L, R) => {
    const T = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), w = typeof R;
    if (T.has(w))
      throw new TypeError(`Setting a value of type \`${w}\` for key \`${L}\` is not allowed as it's not supported by JSON`);
  }, j = "__internal__", A = `${j}.migrations.version`;
  class D {
    constructor(R = {}) {
      var T;
      a.set(this, void 0), l.set(this, void 0), c.set(this, void 0), f.set(this, {}), this._deserialize = (d) => JSON.parse(d), this._serialize = (d) => JSON.stringify(d, void 0, "	");
      const w = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...R
      }, m = ae(() => {
        const d = p.sync({ cwd: q }), P = d && JSON.parse(h.readFileSync(d, "utf8"));
        return P ?? {};
      });
      if (!w.cwd) {
        if (w.projectName || (w.projectName = m().name), !w.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        w.cwd = E(w.projectName, { suffix: w.projectSuffix }).config;
      }
      if (r(this, c, w, "f"), w.schema) {
        if (typeof w.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const d = new N.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, I.default)(d);
        const P = {
          type: "object",
          properties: w.schema
        };
        r(this, a, d.compile(P), "f");
        for (const [k, C] of Object.entries(w.schema))
          C != null && C.default && (n(this, f, "f")[k] = C.default);
      }
      w.defaults && r(this, f, {
        ...n(this, f, "f"),
        ...w.defaults
      }, "f"), w.serialize && (this._serialize = w.serialize), w.deserialize && (this._deserialize = w.deserialize), this.events = new _.EventEmitter(), r(this, l, w.encryptionKey, "f");
      const S = w.fileExtension ? `.${w.fileExtension}` : "";
      this.path = b.resolve(w.cwd, `${(T = w.configName) !== null && T !== void 0 ? T : "config"}${S}`);
      const $ = this.store, i = Object.assign(X(), w.defaults, $);
      this._validate(i);
      try {
        v.deepEqual($, i);
      } catch {
        this.store = i;
      }
      if (w.watch && this._watch(), w.migrations) {
        if (w.projectVersion || (w.projectVersion = m().version), !w.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(w.migrations, w.projectVersion, w.beforeEachMigration);
      }
    }
    get(R, T) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(R, T);
      const { store: w } = this;
      return R in w ? w[R] : T;
    }
    set(R, T) {
      if (typeof R != "string" && typeof R != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof R}`);
      if (typeof R != "object" && T === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(R))
        throw new TypeError(`Please don't use the ${j} key, as it's used to manage this module internal operations.`);
      const { store: w } = this, m = (S, $) => {
        G(S, $), n(this, c, "f").accessPropertiesByDotNotation ? y.set(w, S, $) : w[S] = $;
      };
      if (typeof R == "object") {
        const S = R;
        for (const [$, i] of Object.entries(S))
          m($, i);
      } else
        m(R, T);
      this.store = w;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(R) {
      return n(this, c, "f").accessPropertiesByDotNotation ? y.has(this.store, R) : R in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...R) {
      for (const T of R)
        V(n(this, f, "f")[T]) && this.set(T, n(this, f, "f")[T]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(R) {
      const { store: T } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? y.delete(T, R) : delete T[R], this.store = T;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = X();
      for (const R of Object.keys(n(this, f, "f")))
        this.reset(R);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(R, T) {
      if (typeof R != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof R}`);
      if (typeof T != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof T}`);
      return this._handleChange(() => this.get(R), T);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(R) {
      if (typeof R != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof R}`);
      return this._handleChange(() => this.store, R);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const R = h.readFileSync(this.path, n(this, l, "f") ? null : "utf8"), T = this._encryptData(R), w = this._deserialize(T);
        return this._validate(w), Object.assign(X(), w);
      } catch (R) {
        if ((R == null ? void 0 : R.code) === "ENOENT")
          return this._ensureDirectory(), X();
        if (n(this, c, "f").clearInvalidConfig && R.name === "SyntaxError")
          return X();
        throw R;
      }
    }
    set store(R) {
      this._ensureDirectory(), this._validate(R), this._write(R), this.events.emit("change");
    }
    *[(a = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [R, T] of Object.entries(this.store))
        yield [R, T];
    }
    _encryptData(R) {
      if (!n(this, l, "f"))
        return R.toString();
      try {
        if (n(this, l, "f"))
          try {
            if (R.slice(16, 17).toString() === ":") {
              const T = R.slice(0, 16), w = g.pbkdf2Sync(n(this, l, "f"), T.toString(), 1e4, 32, "sha512"), m = g.createDecipheriv(U, w, T);
              R = Buffer.concat([m.update(Buffer.from(R.slice(17))), m.final()]).toString("utf8");
            } else {
              const T = g.createDecipher(U, n(this, l, "f"));
              R = Buffer.concat([T.update(Buffer.from(R)), T.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return R.toString();
    }
    _handleChange(R, T) {
      let w = R();
      const m = () => {
        const S = w, $ = R();
        (0, u.isDeepStrictEqual)($, S) || (w = $, T.call(this, $, S));
      };
      return this.events.on("change", m), () => this.events.removeListener("change", m);
    }
    _validate(R) {
      if (!n(this, a, "f") || n(this, a, "f").call(this, R) || !n(this, a, "f").errors)
        return;
      const w = n(this, a, "f").errors.map(({ instancePath: m, message: S = "" }) => `\`${m.slice(1)}\` ${S}`);
      throw new Error("Config schema violation: " + w.join("; "));
    }
    _ensureDirectory() {
      h.mkdirSync(b.dirname(this.path), { recursive: !0 });
    }
    _write(R) {
      let T = this._serialize(R);
      if (n(this, l, "f")) {
        const w = g.randomBytes(16), m = g.pbkdf2Sync(n(this, l, "f"), w.toString(), 1e4, 32, "sha512"), S = g.createCipheriv(U, m, w);
        T = Buffer.concat([w, Buffer.from(":"), S.update(Buffer.from(T)), S.final()]);
      }
      if (process.env.SNAP)
        h.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
      else
        try {
          O.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
        } catch (w) {
          if ((w == null ? void 0 : w.code) === "EXDEV") {
            h.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
            return;
          }
          throw w;
        }
    }
    _watch() {
      this._ensureDirectory(), h.existsSync(this.path) || this._write(X()), process.platform === "win32" ? h.watch(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 100 })) : h.watchFile(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(R, T, w) {
      let m = this._get(A, "0.0.0");
      const S = Object.keys(R).filter((i) => this._shouldPerformMigration(i, m, T));
      let $ = { ...this.store };
      for (const i of S)
        try {
          w && w(this, {
            fromVersion: m,
            toVersion: i,
            finalVersion: T,
            versions: S
          });
          const d = R[i];
          d(this), this._set(A, i), m = i, $ = { ...this.store };
        } catch (d) {
          throw this.store = $, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${d}`);
        }
      (this._isVersionInRangeFormat(m) || !W.eq(m, T)) && this._set(A, T);
    }
    _containsReservedKey(R) {
      return typeof R == "object" && Object.keys(R)[0] === j ? !0 : typeof R != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!R.startsWith(`${j}.`) : !1;
    }
    _isVersionInRangeFormat(R) {
      return W.clean(R) === null;
    }
    _shouldPerformMigration(R, T, w) {
      return this._isVersionInRangeFormat(R) ? T !== "0.0.0" && W.satisfies(T, R) ? !1 : W.satisfies(w, R) : !(W.lte(R, T) || W.gt(R, w));
    }
    _get(R, T) {
      return y.get(this.store, R, T);
    }
    _set(R, T) {
      const { store: w } = this;
      y.set(w, R, T), this.store = w;
    }
  }
  t.default = D, e.exports = D, e.exports.default = D;
})(Lo, Lo.exports);
var Bb = Lo.exports;
const wl = Ut, { app: ys, ipcMain: ra, ipcRenderer: Sl, shell: Kb } = zd, Hb = Bb;
let bl = !1;
const Pl = () => {
  if (!ra || !ys)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: ys.getPath("userData"),
    appVersion: ys.getVersion()
  };
  return bl || (ra.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), bl = !0), e;
};
class Wb extends Hb {
  constructor(t) {
    let r, n;
    if (Sl) {
      const s = Sl.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else ra && ys && ({ defaultCwd: r, appVersion: n } = Pl());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = wl.isAbsolute(t.cwd) ? t.cwd : wl.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Pl();
  }
  async openInEditor() {
    const t = await Kb.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var Xb = Wb;
const Jb = /* @__PURE__ */ nu(Xb);
var js = { exports: {} };
const gd = ["nodebuffer", "arraybuffer", "fragments"], vd = typeof Blob < "u";
vd && gd.push("blob");
var Vt = {
  BINARY_TYPES: gd,
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
  hasBlob: vd,
  kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
  kListener: Symbol("kListener"),
  kStatusCode: Symbol("status-code"),
  kWebSocket: Symbol("websocket"),
  NOOP: () => {
  }
}, Qn = { exports: {} };
function Ed(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Zn = { exports: {} }, bo, Ol;
function Yb() {
  if (Ol) return bo;
  Ol = 1;
  var e = Ls, t = Ut, r = ru, n = typeof __webpack_require__ == "function" ? __non_webpack_require__ : Ed, s = process.config && process.config.variables || {}, o = !!process.env.PREBUILDS_ONLY, a = process.versions.modules, l = U() ? "electron" : ae() ? "node-webkit" : "node", c = process.env.npm_config_arch || r.arch(), f = process.env.npm_config_platform || r.platform(), u = process.env.LIBC || (X(f) ? "musl" : "glibc"), h = process.env.ARM_VERSION || (c === "arm64" ? "8" : s.arm_version) || "", b = (process.versions.uv || "").split(".")[0];
  bo = g;
  function g(V) {
    return n(g.resolve(V));
  }
  g.resolve = g.path = function(V) {
    V = t.resolve(V || ".");
    try {
      var q = n(t.join(V, "package.json")).name.toUpperCase().replace(/-/g, "_");
      process.env[q + "_PREBUILD"] && (V = process.env[q + "_PREBUILD"]);
    } catch {
    }
    if (!o) {
      var G = _(t.join(V, "build/Release"), y);
      if (G) return G;
      var j = _(t.join(V, "build/Debug"), y);
      if (j) return j;
    }
    var A = R(V);
    if (A) return A;
    var D = R(t.dirname(process.execPath));
    if (D) return D;
    var L = [
      "platform=" + f,
      "arch=" + c,
      "runtime=" + l,
      "abi=" + a,
      "uv=" + b,
      h ? "armv=" + h : "",
      "libc=" + u,
      "node=" + process.versions.node,
      process.versions.electron ? "electron=" + process.versions.electron : "",
      typeof __webpack_require__ == "function" ? "webpack=true" : ""
      // eslint-disable-line
    ].filter(Boolean).join(" ");
    throw new Error("No native build was found for " + L + `
    loaded from: ` + V + `
`);
    function R(T) {
      var w = v(t.join(T, "prebuilds")).map(p), m = w.filter(E(f, c)).sort(O)[0];
      if (m) {
        var S = t.join(T, "prebuilds", m.name), $ = v(S).map(N), i = $.filter(I(l, a)), d = i.sort(W(l))[0];
        if (d) return t.join(S, d.file);
      }
    }
  };
  function v(V) {
    try {
      return e.readdirSync(V);
    } catch {
      return [];
    }
  }
  function _(V, q) {
    var G = v(V).filter(q);
    return G[0] && t.join(V, G[0]);
  }
  function y(V) {
    return /\.node$/.test(V);
  }
  function p(V) {
    var q = V.split("-");
    if (q.length === 2) {
      var G = q[0], j = q[1].split("+");
      if (G && j.length && j.every(Boolean))
        return { name: V, platform: G, architectures: j };
    }
  }
  function E(V, q) {
    return function(G) {
      return G == null || G.platform !== V ? !1 : G.architectures.includes(q);
    };
  }
  function O(V, q) {
    return V.architectures.length - q.architectures.length;
  }
  function N(V) {
    var q = V.split("."), G = q.pop(), j = { file: V, specificity: 0 };
    if (G === "node") {
      for (var A = 0; A < q.length; A++) {
        var D = q[A];
        if (D === "node" || D === "electron" || D === "node-webkit")
          j.runtime = D;
        else if (D === "napi")
          j.napi = !0;
        else if (D.slice(0, 3) === "abi")
          j.abi = D.slice(3);
        else if (D.slice(0, 2) === "uv")
          j.uv = D.slice(2);
        else if (D.slice(0, 4) === "armv")
          j.armv = D.slice(4);
        else if (D === "glibc" || D === "musl")
          j.libc = D;
        else
          continue;
        j.specificity++;
      }
      return j;
    }
  }
  function I(V, q) {
    return function(G) {
      return !(G == null || G.runtime && G.runtime !== V && !z(G) || G.abi && G.abi !== q && !G.napi || G.uv && G.uv !== b || G.armv && G.armv !== h || G.libc && G.libc !== u);
    };
  }
  function z(V) {
    return V.runtime === "node" && V.napi;
  }
  function W(V) {
    return function(q, G) {
      return q.runtime !== G.runtime ? q.runtime === V ? -1 : 1 : q.abi !== G.abi ? q.abi ? -1 : 1 : q.specificity !== G.specificity ? q.specificity > G.specificity ? -1 : 1 : 0;
    };
  }
  function ae() {
    return !!(process.versions && process.versions.nw);
  }
  function U() {
    return process.versions && process.versions.electron || process.env.ELECTRON_RUN_AS_NODE ? !0 : typeof window < "u" && window.process && window.process.type === "renderer";
  }
  function X(V) {
    return V === "linux" && e.existsSync("/etc/alpine-release");
  }
  return g.parseTags = N, g.matchTags = I, g.compareTags = W, g.parseTuple = p, g.matchTuple = E, g.compareTuples = O, bo;
}
var Nl;
function wd() {
  if (Nl) return Zn.exports;
  Nl = 1;
  const e = typeof __webpack_require__ == "function" ? __non_webpack_require__ : Ed;
  return typeof e.addon == "function" ? Zn.exports = e.addon.bind(e) : Zn.exports = Yb(), Zn.exports;
}
var Po, Rl;
function Qb() {
  return Rl || (Rl = 1, Po = { mask: (r, n, s, o, a) => {
    for (var l = 0; l < a; l++)
      s[o + l] = r[l] ^ n[l & 3];
  }, unmask: (r, n) => {
    const s = r.length;
    for (var o = 0; o < s; o++)
      r[o] ^= n[o & 3];
  } }), Po;
}
var Tl;
function Zb() {
  if (Tl) return Qn.exports;
  Tl = 1;
  try {
    Qn.exports = wd()(__dirname);
  } catch {
    Qn.exports = Qb();
  }
  return Qn.exports;
}
var e1, t1;
const { EMPTY_BUFFER: r1 } = Vt, na = Buffer[Symbol.species];
function n1(e, t) {
  if (e.length === 0) return r1;
  if (e.length === 1) return e[0];
  const r = Buffer.allocUnsafe(t);
  let n = 0;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    r.set(o, n), n += o.length;
  }
  return n < t ? new na(r.buffer, r.byteOffset, n) : r;
}
function Sd(e, t, r, n, s) {
  for (let o = 0; o < s; o++)
    r[n + o] = e[o] ^ t[o & 3];
}
function bd(e, t) {
  for (let r = 0; r < e.length; r++)
    e[r] ^= t[r & 3];
}
function s1(e) {
  return e.length === e.buffer.byteLength ? e.buffer : e.buffer.slice(e.byteOffset, e.byteOffset + e.length);
}
function sa(e) {
  if (sa.readOnly = !0, Buffer.isBuffer(e)) return e;
  let t;
  return e instanceof ArrayBuffer ? t = new na(e) : ArrayBuffer.isView(e) ? t = new na(e.buffer, e.byteOffset, e.byteLength) : (t = Buffer.from(e), sa.readOnly = !1), t;
}
js.exports = {
  concat: n1,
  mask: Sd,
  toArrayBuffer: s1,
  toBuffer: sa,
  unmask: bd
};
if (!process.env.WS_NO_BUFFER_UTIL)
  try {
    const e = Zb();
    t1 = js.exports.mask = function(t, r, n, s, o) {
      o < 48 ? Sd(t, r, n, s, o) : e.mask(t, r, n, s, o);
    }, e1 = js.exports.unmask = function(t, r) {
      t.length < 32 ? bd(t, r) : e.unmask(t, r);
    };
  } catch {
  }
var no = js.exports;
const Il = Symbol("kDone"), Oo = Symbol("kRun");
let o1 = class {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(t) {
    this[Il] = () => {
      this.pending--, this[Oo]();
    }, this.concurrency = t || 1 / 0, this.jobs = [], this.pending = 0;
  }
  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(t) {
    this.jobs.push(t), this[Oo]();
  }
  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [Oo]() {
    if (this.pending !== this.concurrency && this.jobs.length) {
      const t = this.jobs.shift();
      this.pending++, t(this[Il]);
    }
  }
};
var a1 = o1;
const nn = Jd, kl = no, i1 = a1, { kStatusCode: Pd } = Vt, c1 = Buffer[Symbol.species], l1 = Buffer.from([0, 0, 255, 255]), As = Symbol("permessage-deflate"), _t = Symbol("total-length"), Rr = Symbol("callback"), Tt = Symbol("buffers"), Ar = Symbol("error");
let es, u1 = class {
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
    if (this._maxPayload = n | 0, this._options = t || {}, this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024, this._isServer = !!r, this._deflate = null, this._inflate = null, this.params = null, !es) {
      const s = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
      es = new i1(s);
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
      const t = this._deflate[Rr];
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
    es.add((s) => {
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
    es.add((s) => {
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
      const o = `${s}_max_window_bits`, a = typeof this.params[o] != "number" ? nn.Z_DEFAULT_WINDOWBITS : this.params[o];
      this._inflate = nn.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits: a
      }), this._inflate[As] = this, this._inflate[_t] = 0, this._inflate[Tt] = [], this._inflate.on("error", d1), this._inflate.on("data", Od);
    }
    this._inflate[Rr] = n, this._inflate.write(t), r && this._inflate.write(l1), this._inflate.flush(() => {
      const o = this._inflate[Ar];
      if (o) {
        this._inflate.close(), this._inflate = null, n(o);
        return;
      }
      const a = kl.concat(
        this._inflate[Tt],
        this._inflate[_t]
      );
      this._inflate._readableState.endEmitted ? (this._inflate.close(), this._inflate = null) : (this._inflate[_t] = 0, this._inflate[Tt] = [], r && this.params[`${s}_no_context_takeover`] && this._inflate.reset()), n(null, a);
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
      const o = `${s}_max_window_bits`, a = typeof this.params[o] != "number" ? nn.Z_DEFAULT_WINDOWBITS : this.params[o];
      this._deflate = nn.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits: a
      }), this._deflate[_t] = 0, this._deflate[Tt] = [], this._deflate.on("data", f1);
    }
    this._deflate[Rr] = n, this._deflate.write(t), this._deflate.flush(nn.Z_SYNC_FLUSH, () => {
      if (!this._deflate)
        return;
      let o = kl.concat(
        this._deflate[Tt],
        this._deflate[_t]
      );
      r && (o = new c1(o.buffer, o.byteOffset, o.length - 4)), this._deflate[Rr] = null, this._deflate[_t] = 0, this._deflate[Tt] = [], r && this.params[`${s}_no_context_takeover`] && this._deflate.reset(), n(null, o);
    });
  }
};
var ic = u1;
function f1(e) {
  this[Tt].push(e), this[_t] += e.length;
}
function Od(e) {
  if (this[_t] += e.length, this[As]._maxPayload < 1 || this[_t] <= this[As]._maxPayload) {
    this[Tt].push(e);
    return;
  }
  this[Ar] = new RangeError("Max payload size exceeded"), this[Ar].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH", this[Ar][Pd] = 1009, this.removeListener("data", Od), this.reset();
}
function d1(e) {
  if (this[As]._inflate = null, this[Ar]) {
    this[Rr](this[Ar]);
    return;
  }
  e[Pd] = 1007, this[Rr](e);
}
var Ds = { exports: {} }, ts = { exports: {} }, No, Cl;
function h1() {
  if (Cl) return No;
  Cl = 1;
  function e(t) {
    const r = t.length;
    let n = 0;
    for (; n < r; )
      if (!(t[n] & 128))
        n++;
      else if ((t[n] & 224) === 192) {
        if (n + 1 === r || (t[n + 1] & 192) !== 128 || (t[n] & 254) === 192)
          return !1;
        n += 2;
      } else if ((t[n] & 240) === 224) {
        if (n + 2 >= r || (t[n + 1] & 192) !== 128 || (t[n + 2] & 192) !== 128 || t[n] === 224 && (t[n + 1] & 224) === 128 || // overlong
        t[n] === 237 && (t[n + 1] & 224) === 160)
          return !1;
        n += 3;
      } else if ((t[n] & 248) === 240) {
        if (n + 3 >= r || (t[n + 1] & 192) !== 128 || (t[n + 2] & 192) !== 128 || (t[n + 3] & 192) !== 128 || t[n] === 240 && (t[n + 1] & 240) === 128 || // overlong
        t[n] === 244 && t[n + 1] > 143 || t[n] > 244)
          return !1;
        n += 4;
      } else
        return !1;
    return !0;
  }
  return No = e, No;
}
var jl;
function p1() {
  if (jl) return ts.exports;
  jl = 1;
  try {
    ts.exports = wd()(__dirname);
  } catch {
    ts.exports = h1();
  }
  return ts.exports;
}
var Al;
const { isUtf8: Dl } = Yd, { hasBlob: m1 } = Vt, y1 = [
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
function _1(e) {
  return e >= 1e3 && e <= 1014 && e !== 1004 && e !== 1005 && e !== 1006 || e >= 3e3 && e <= 4999;
}
function oa(e) {
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
function $1(e) {
  return m1 && typeof e == "object" && typeof e.arrayBuffer == "function" && typeof e.type == "string" && typeof e.stream == "function" && (e[Symbol.toStringTag] === "Blob" || e[Symbol.toStringTag] === "File");
}
Ds.exports = {
  isBlob: $1,
  isValidStatusCode: _1,
  isValidUTF8: oa,
  tokenChars: y1
};
if (Dl)
  Al = Ds.exports.isValidUTF8 = function(e) {
    return e.length < 24 ? oa(e) : Dl(e);
  };
else if (!process.env.WS_NO_UTF_8_VALIDATE)
  try {
    const e = p1();
    Al = Ds.exports.isValidUTF8 = function(t) {
      return t.length < 32 ? oa(t) : e(t);
    };
  } catch {
  }
var kn = Ds.exports;
const { Writable: g1 } = Sn, Ll = ic, {
  BINARY_TYPES: v1,
  EMPTY_BUFFER: Ml,
  kStatusCode: E1,
  kWebSocket: w1
} = Vt, { concat: Ro, toArrayBuffer: S1, unmask: b1 } = no, { isValidStatusCode: P1, isValidUTF8: Fl } = kn, rs = Buffer[Symbol.species], Ge = 0, Ul = 1, Vl = 2, ql = 3, To = 4, Io = 5, ns = 6;
let O1 = class extends g1 {
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
    super(), this._allowSynchronousEvents = t.allowSynchronousEvents !== void 0 ? t.allowSynchronousEvents : !0, this._binaryType = t.binaryType || v1[0], this._extensions = t.extensions || {}, this._isServer = !!t.isServer, this._maxPayload = t.maxPayload | 0, this._skipUTF8Validation = !!t.skipUTF8Validation, this[w1] = void 0, this._bufferedBytes = 0, this._buffers = [], this._compressed = !1, this._payloadLength = 0, this._mask = void 0, this._fragmented = 0, this._masked = !1, this._fin = !1, this._opcode = 0, this._totalPayloadLength = 0, this._messageLength = 0, this._fragments = [], this._errored = !1, this._loop = !1, this._state = Ge;
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
    if (this._opcode === 8 && this._state == Ge) return n();
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
      return this._buffers[0] = new rs(
        n.buffer,
        n.byteOffset + t,
        n.length - t
      ), new rs(n.buffer, n.byteOffset, t);
    }
    const r = Buffer.allocUnsafe(t);
    do {
      const n = this._buffers[0], s = r.length - t;
      t >= n.length ? r.set(this._buffers.shift(), s) : (r.set(new Uint8Array(n.buffer, n.byteOffset, t), s), this._buffers[0] = new rs(
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
        case Ge:
          this.getInfo(t);
          break;
        case Ul:
          this.getPayloadLength16(t);
          break;
        case Vl:
          this.getPayloadLength64(t);
          break;
        case ql:
          this.getMask();
          break;
        case To:
          this.getData(t);
          break;
        case Io:
        case ns:
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
    if (n && !this._extensions[Ll.extensionName]) {
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
    this._payloadLength === 126 ? this._state = Ul : this._payloadLength === 127 ? this._state = Vl : this.haveLength(t);
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
    this._masked ? this._state = ql : this._state = To;
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
    this._mask = this.consume(4), this._state = To;
  }
  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @private
   */
  getData(t) {
    let r = Ml;
    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = !1;
        return;
      }
      r = this.consume(this._payloadLength), this._masked && this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3] && b1(r, this._mask);
    }
    if (this._opcode > 7) {
      this.controlMessage(r, t);
      return;
    }
    if (this._compressed) {
      this._state = Io, this.decompress(r, t);
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
    this._extensions[Ll.extensionName].decompress(t, this._fin, (s, o) => {
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
      this.dataMessage(r), this._state === Ge && this.startLoop(r);
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
      this._state = Ge;
      return;
    }
    const r = this._messageLength, n = this._fragments;
    if (this._totalPayloadLength = 0, this._messageLength = 0, this._fragmented = 0, this._fragments = [], this._opcode === 2) {
      let s;
      this._binaryType === "nodebuffer" ? s = Ro(n, r) : this._binaryType === "arraybuffer" ? s = S1(Ro(n, r)) : this._binaryType === "blob" ? s = new Blob(n) : s = n, this._allowSynchronousEvents ? (this.emit("message", s, !0), this._state = Ge) : (this._state = ns, setImmediate(() => {
        this.emit("message", s, !0), this._state = Ge, this.startLoop(t);
      }));
    } else {
      const s = Ro(n, r);
      if (!this._skipUTF8Validation && !Fl(s)) {
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
      this._state === Io || this._allowSynchronousEvents ? (this.emit("message", s, !1), this._state = Ge) : (this._state = ns, setImmediate(() => {
        this.emit("message", s, !1), this._state = Ge, this.startLoop(t);
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
        this._loop = !1, this.emit("conclude", 1005, Ml), this.end();
      else {
        const n = t.readUInt16BE(0);
        if (!P1(n)) {
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
        const s = new rs(
          t.buffer,
          t.byteOffset + 2,
          t.length - 2
        );
        if (!this._skipUTF8Validation && !Fl(s)) {
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
      this._state = Ge;
      return;
    }
    this._allowSynchronousEvents ? (this.emit(this._opcode === 9 ? "ping" : "pong", t), this._state = Ge) : (this._state = ns, setImmediate(() => {
      this.emit(this._opcode === 9 ? "ping" : "pong", t), this._state = Ge, this.startLoop(r);
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
    return Error.captureStackTrace(a, this.createError), a.code = o, a[E1] = s, a;
  }
};
var N1 = O1;
const { Duplex: YP } = Sn, { randomFillSync: R1 } = Ms, zl = ic, { EMPTY_BUFFER: T1, kWebSocket: I1, NOOP: k1 } = Vt, { isBlob: wr, isValidStatusCode: C1 } = kn, { mask: xl, toBuffer: sr } = no, Be = Symbol("kByteLength"), j1 = Buffer.alloc(4), _s = 8 * 1024;
let or, Sr = _s;
const Ye = 0, A1 = 1, D1 = 2;
let L1 = class ar {
  /**
   * Creates a Sender instance.
   *
   * @param {Duplex} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(t, r, n) {
    this._extensions = r || {}, n && (this._generateMask = n, this._maskBuffer = Buffer.alloc(4)), this._socket = t, this._firstFragment = !0, this._compress = !1, this._bufferedBytes = 0, this._queue = [], this._state = Ye, this.onerror = k1, this[I1] = void 0;
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
    r.mask && (n = r.maskBuffer || j1, r.generateMask ? r.generateMask(n) : (Sr === _s && (or === void 0 && (or = Buffer.alloc(_s)), R1(or, 0, _s), Sr = 0), n[0] = or[Sr++], n[1] = or[Sr++], n[2] = or[Sr++], n[3] = or[Sr++]), a = (n[0] | n[1] | n[2] | n[3]) === 0, o = 6);
    let l;
    typeof t == "string" ? (!r.mask || a) && r[Be] !== void 0 ? l = r[Be] : (t = Buffer.from(t), l = t.length) : (l = t.length, s = r.mask && r.readOnly && !a);
    let c = l;
    l >= 65536 ? (o += 8, c = 127) : l > 125 && (o += 2, c = 126);
    const f = Buffer.allocUnsafe(s ? l + o : o);
    return f[0] = r.fin ? r.opcode | 128 : r.opcode, r.rsv1 && (f[0] |= 64), f[1] = c, c === 126 ? f.writeUInt16BE(l, 2) : c === 127 && (f[2] = f[3] = 0, f.writeUIntBE(l, 4, 6)), r.mask ? (f[1] |= 128, f[o - 4] = n[0], f[o - 3] = n[1], f[o - 2] = n[2], f[o - 1] = n[3], a ? [f, t] : s ? (xl(t, n, f, o, l), [f]) : (xl(t, n, t, 0, l), [f, t])) : [f, t];
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
      o = T1;
    else {
      if (typeof t != "number" || !C1(t))
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
      [Be]: o.length,
      fin: !0,
      generateMask: this._generateMask,
      mask: n,
      maskBuffer: this._maskBuffer,
      opcode: 8,
      readOnly: !1,
      rsv1: !1
    };
    this._state !== Ye ? this.enqueue([this.dispatch, o, !1, a, s]) : this.sendFrame(ar.frame(o, a), s);
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
    if (typeof t == "string" ? (s = Buffer.byteLength(t), o = !1) : wr(t) ? (s = t.size, o = !1) : (t = sr(t), s = t.length, o = sr.readOnly), s > 125)
      throw new RangeError("The data size must not be greater than 125 bytes");
    const a = {
      [Be]: s,
      fin: !0,
      generateMask: this._generateMask,
      mask: r,
      maskBuffer: this._maskBuffer,
      opcode: 9,
      readOnly: o,
      rsv1: !1
    };
    wr(t) ? this._state !== Ye ? this.enqueue([this.getBlobData, t, !1, a, n]) : this.getBlobData(t, !1, a, n) : this._state !== Ye ? this.enqueue([this.dispatch, t, !1, a, n]) : this.sendFrame(ar.frame(t, a), n);
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
    if (typeof t == "string" ? (s = Buffer.byteLength(t), o = !1) : wr(t) ? (s = t.size, o = !1) : (t = sr(t), s = t.length, o = sr.readOnly), s > 125)
      throw new RangeError("The data size must not be greater than 125 bytes");
    const a = {
      [Be]: s,
      fin: !0,
      generateMask: this._generateMask,
      mask: r,
      maskBuffer: this._maskBuffer,
      opcode: 10,
      readOnly: o,
      rsv1: !1
    };
    wr(t) ? this._state !== Ye ? this.enqueue([this.getBlobData, t, !1, a, n]) : this.getBlobData(t, !1, a, n) : this._state !== Ye ? this.enqueue([this.dispatch, t, !1, a, n]) : this.sendFrame(ar.frame(t, a), n);
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
    const s = this._extensions[zl.extensionName];
    let o = r.binary ? 2 : 1, a = r.compress, l, c;
    typeof t == "string" ? (l = Buffer.byteLength(t), c = !1) : wr(t) ? (l = t.size, c = !1) : (t = sr(t), l = t.length, c = sr.readOnly), this._firstFragment ? (this._firstFragment = !1, a && s && s.params[s._isServer ? "server_no_context_takeover" : "client_no_context_takeover"] && (a = l >= s._threshold), this._compress = a) : (a = !1, o = 0), r.fin && (this._firstFragment = !0);
    const f = {
      [Be]: l,
      fin: r.fin,
      generateMask: this._generateMask,
      mask: r.mask,
      maskBuffer: this._maskBuffer,
      opcode: o,
      readOnly: c,
      rsv1: a
    };
    wr(t) ? this._state !== Ye ? this.enqueue([this.getBlobData, t, this._compress, f, n]) : this.getBlobData(t, this._compress, f, n) : this._state !== Ye ? this.enqueue([this.dispatch, t, this._compress, f, n]) : this.dispatch(t, this._compress, f, n);
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
    this._bufferedBytes += n[Be], this._state = D1, t.arrayBuffer().then((o) => {
      if (this._socket.destroyed) {
        const l = new Error(
          "The socket was closed while the blob was being read"
        );
        process.nextTick(aa, this, l, s);
        return;
      }
      this._bufferedBytes -= n[Be];
      const a = sr(o);
      r ? this.dispatch(a, r, n, s) : (this._state = Ye, this.sendFrame(ar.frame(a, n), s), this.dequeue());
    }).catch((o) => {
      process.nextTick(F1, this, o, s);
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
      this.sendFrame(ar.frame(t, n), s);
      return;
    }
    const o = this._extensions[zl.extensionName];
    this._bufferedBytes += n[Be], this._state = A1, o.compress(t, n.fin, (a, l) => {
      if (this._socket.destroyed) {
        const c = new Error(
          "The socket was closed while data was being compressed"
        );
        aa(this, c, s);
        return;
      }
      this._bufferedBytes -= n[Be], this._state = Ye, n.readOnly = !1, this.sendFrame(ar.frame(l, n), s), this.dequeue();
    });
  }
  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    for (; this._state === Ye && this._queue.length; ) {
      const t = this._queue.shift();
      this._bufferedBytes -= t[3][Be], Reflect.apply(t[0], this, t.slice(1));
    }
  }
  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(t) {
    this._bufferedBytes += t[3][Be], this._queue.push(t);
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
var M1 = L1;
function aa(e, t, r) {
  typeof r == "function" && r(t);
  for (let n = 0; n < e._queue.length; n++) {
    const s = e._queue[n], o = s[s.length - 1];
    typeof o == "function" && o(t);
  }
}
function F1(e, t, r) {
  aa(e, t, r), e.onerror(t);
}
const { kForOnEventAttribute: sn, kListener: ko } = Vt, Gl = Symbol("kCode"), Bl = Symbol("kData"), Kl = Symbol("kError"), Hl = Symbol("kMessage"), Wl = Symbol("kReason"), Tr = Symbol("kTarget"), Xl = Symbol("kType"), Jl = Symbol("kWasClean");
class Xr {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(t) {
    this[Tr] = null, this[Xl] = t;
  }
  /**
   * @type {*}
   */
  get target() {
    return this[Tr];
  }
  /**
   * @type {String}
   */
  get type() {
    return this[Xl];
  }
}
Object.defineProperty(Xr.prototype, "target", { enumerable: !0 });
Object.defineProperty(Xr.prototype, "type", { enumerable: !0 });
class so extends Xr {
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
    super(t), this[Gl] = r.code === void 0 ? 0 : r.code, this[Wl] = r.reason === void 0 ? "" : r.reason, this[Jl] = r.wasClean === void 0 ? !1 : r.wasClean;
  }
  /**
   * @type {Number}
   */
  get code() {
    return this[Gl];
  }
  /**
   * @type {String}
   */
  get reason() {
    return this[Wl];
  }
  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[Jl];
  }
}
Object.defineProperty(so.prototype, "code", { enumerable: !0 });
Object.defineProperty(so.prototype, "reason", { enumerable: !0 });
Object.defineProperty(so.prototype, "wasClean", { enumerable: !0 });
class cc extends Xr {
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
    super(t), this[Kl] = r.error === void 0 ? null : r.error, this[Hl] = r.message === void 0 ? "" : r.message;
  }
  /**
   * @type {*}
   */
  get error() {
    return this[Kl];
  }
  /**
   * @type {String}
   */
  get message() {
    return this[Hl];
  }
}
Object.defineProperty(cc.prototype, "error", { enumerable: !0 });
Object.defineProperty(cc.prototype, "message", { enumerable: !0 });
class Nd extends Xr {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(t, r = {}) {
    super(t), this[Bl] = r.data === void 0 ? null : r.data;
  }
  /**
   * @type {*}
   */
  get data() {
    return this[Bl];
  }
}
Object.defineProperty(Nd.prototype, "data", { enumerable: !0 });
const U1 = {
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
      if (!r[sn] && s[ko] === t && !s[sn])
        return;
    let n;
    if (e === "message")
      n = function(o, a) {
        const l = new Nd("message", {
          data: a ? o : o.toString()
        });
        l[Tr] = this, ss(t, this, l);
      };
    else if (e === "close")
      n = function(o, a) {
        const l = new so("close", {
          code: o,
          reason: a.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });
        l[Tr] = this, ss(t, this, l);
      };
    else if (e === "error")
      n = function(o) {
        const a = new cc("error", {
          error: o,
          message: o.message
        });
        a[Tr] = this, ss(t, this, a);
      };
    else if (e === "open")
      n = function() {
        const o = new Xr("open");
        o[Tr] = this, ss(t, this, o);
      };
    else
      return;
    n[sn] = !!r[sn], n[ko] = t, r.once ? this.once(e, n) : this.on(e, n);
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
      if (r[ko] === t && !r[sn]) {
        this.removeListener(e, r);
        break;
      }
  }
};
var V1 = {
  EventTarget: U1
};
function ss(e, t, r) {
  typeof e == "object" && e.handleEvent ? e.handleEvent.call(e, r) : e.call(t, r);
}
const { tokenChars: on } = kn;
function it(e, t, r) {
  e[t] === void 0 ? e[t] = [r] : e[t].push(r);
}
function q1(e) {
  const t = /* @__PURE__ */ Object.create(null);
  let r = /* @__PURE__ */ Object.create(null), n = !1, s = !1, o = !1, a, l, c = -1, f = -1, u = -1, h = 0;
  for (; h < e.length; h++)
    if (f = e.charCodeAt(h), a === void 0)
      if (u === -1 && on[f] === 1)
        c === -1 && (c = h);
      else if (h !== 0 && (f === 32 || f === 9))
        u === -1 && c !== -1 && (u = h);
      else if (f === 59 || f === 44) {
        if (c === -1)
          throw new SyntaxError(`Unexpected character at index ${h}`);
        u === -1 && (u = h);
        const g = e.slice(c, u);
        f === 44 ? (it(t, g, r), r = /* @__PURE__ */ Object.create(null)) : a = g, c = u = -1;
      } else
        throw new SyntaxError(`Unexpected character at index ${h}`);
    else if (l === void 0)
      if (u === -1 && on[f] === 1)
        c === -1 && (c = h);
      else if (f === 32 || f === 9)
        u === -1 && c !== -1 && (u = h);
      else if (f === 59 || f === 44) {
        if (c === -1)
          throw new SyntaxError(`Unexpected character at index ${h}`);
        u === -1 && (u = h), it(r, e.slice(c, u), !0), f === 44 && (it(t, a, r), r = /* @__PURE__ */ Object.create(null), a = void 0), c = u = -1;
      } else if (f === 61 && c !== -1 && u === -1)
        l = e.slice(c, h), c = u = -1;
      else
        throw new SyntaxError(`Unexpected character at index ${h}`);
    else if (s) {
      if (on[f] !== 1)
        throw new SyntaxError(`Unexpected character at index ${h}`);
      c === -1 ? c = h : n || (n = !0), s = !1;
    } else if (o)
      if (on[f] === 1)
        c === -1 && (c = h);
      else if (f === 34 && c !== -1)
        o = !1, u = h;
      else if (f === 92)
        s = !0;
      else
        throw new SyntaxError(`Unexpected character at index ${h}`);
    else if (f === 34 && e.charCodeAt(h - 1) === 61)
      o = !0;
    else if (u === -1 && on[f] === 1)
      c === -1 && (c = h);
    else if (c !== -1 && (f === 32 || f === 9))
      u === -1 && (u = h);
    else if (f === 59 || f === 44) {
      if (c === -1)
        throw new SyntaxError(`Unexpected character at index ${h}`);
      u === -1 && (u = h);
      let g = e.slice(c, u);
      n && (g = g.replace(/\\/g, ""), n = !1), it(r, l, g), f === 44 && (it(t, a, r), r = /* @__PURE__ */ Object.create(null), a = void 0), l = void 0, c = u = -1;
    } else
      throw new SyntaxError(`Unexpected character at index ${h}`);
  if (c === -1 || o || f === 32 || f === 9)
    throw new SyntaxError("Unexpected end of input");
  u === -1 && (u = h);
  const b = e.slice(c, u);
  return a === void 0 ? it(t, b, r) : (l === void 0 ? it(r, b, !0) : n ? it(r, l, b.replace(/\\/g, "")) : it(r, l, b), it(t, a, r)), t;
}
function z1(e) {
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
var x1 = { format: z1, parse: q1 };
const G1 = tu, B1 = Bd, K1 = Kd, Rd = Hd, H1 = Wd, { randomBytes: W1, createHash: X1 } = Ms, { Duplex: QP, Readable: ZP } = Sn, { URL: Co } = Xd, kt = ic, J1 = N1, Y1 = M1, { isBlob: Q1 } = kn, {
  BINARY_TYPES: Yl,
  EMPTY_BUFFER: os,
  GUID: Z1,
  kForOnEventAttribute: jo,
  kListener: eP,
  kStatusCode: tP,
  kWebSocket: we,
  NOOP: Td
} = Vt, {
  EventTarget: { addEventListener: rP, removeEventListener: nP }
} = V1, { format: sP, parse: oP } = x1, { toBuffer: aP } = no, iP = 30 * 1e3, Id = Symbol("kAborted"), Ao = [8, 13], St = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"], cP = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
class Q extends G1 {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(t, r, n) {
    super(), this._binaryType = Yl[0], this._closeCode = 1006, this._closeFrameReceived = !1, this._closeFrameSent = !1, this._closeMessage = os, this._closeTimer = null, this._errorEmitted = !1, this._extensions = {}, this._paused = !1, this._protocol = "", this._readyState = Q.CONNECTING, this._receiver = null, this._sender = null, this._socket = null, t !== null ? (this._bufferedAmount = 0, this._isServer = !1, this._redirects = 0, r === void 0 ? r = [] : Array.isArray(r) || (typeof r == "object" && r !== null ? (n = r, r = []) : r = [r]), kd(this, t, r, n)) : (this._autoPong = n.autoPong, this._isServer = !0);
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
    Yl.includes(t) && (this._binaryType = t, this._receiver && (this._receiver._binaryType = t));
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
    const s = new J1({
      allowSynchronousEvents: n.allowSynchronousEvents,
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: n.maxPayload,
      skipUTF8Validation: n.skipUTF8Validation
    }), o = new Y1(t, this._extensions, n.generateMask);
    this._receiver = s, this._sender = o, this._socket = t, s[we] = this, o[we] = this, t[we] = this, s.on("conclude", dP), s.on("drain", hP), s.on("error", pP), s.on("message", mP), s.on("ping", yP), s.on("pong", _P), o.onerror = $P, t.setTimeout && t.setTimeout(0), t.setNoDelay && t.setNoDelay(), r.length > 0 && t.unshift(r), t.on("close", Ad), t.on("data", oo), t.on("end", Dd), t.on("error", Ld), this._readyState = Q.OPEN, this.emit("open");
  }
  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = Q.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
      return;
    }
    this._extensions[kt.extensionName] && this._extensions[kt.extensionName].cleanup(), this._receiver.removeAllListeners(), this._readyState = Q.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
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
    if (this.readyState !== Q.CLOSED) {
      if (this.readyState === Q.CONNECTING) {
        ze(this, this._req, "WebSocket was closed before the connection was established");
        return;
      }
      if (this.readyState === Q.CLOSING) {
        this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end();
        return;
      }
      this._readyState = Q.CLOSING, this._sender.close(t, r, !this._isServer, (n) => {
        n || (this._closeFrameSent = !0, (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end());
      }), jd(this);
    }
  }
  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    this.readyState === Q.CONNECTING || this.readyState === Q.CLOSED || (this._paused = !0, this._socket.pause());
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
    if (this.readyState === Q.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof t == "function" ? (n = t, t = r = void 0) : typeof r == "function" && (n = r, r = void 0), typeof t == "number" && (t = t.toString()), this.readyState !== Q.OPEN) {
      Do(this, t, n);
      return;
    }
    r === void 0 && (r = !this._isServer), this._sender.ping(t || os, r, n);
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
    if (this.readyState === Q.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof t == "function" ? (n = t, t = r = void 0) : typeof r == "function" && (n = r, r = void 0), typeof t == "number" && (t = t.toString()), this.readyState !== Q.OPEN) {
      Do(this, t, n);
      return;
    }
    r === void 0 && (r = !this._isServer), this._sender.pong(t || os, r, n);
  }
  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    this.readyState === Q.CONNECTING || this.readyState === Q.CLOSED || (this._paused = !1, this._receiver._writableState.needDrain || this._socket.resume());
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
    if (this.readyState === Q.CONNECTING)
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    if (typeof r == "function" && (n = r, r = {}), typeof t == "number" && (t = t.toString()), this.readyState !== Q.OPEN) {
      Do(this, t, n);
      return;
    }
    const s = {
      binary: typeof t != "string",
      mask: !this._isServer,
      compress: !0,
      fin: !0,
      ...r
    };
    this._extensions[kt.extensionName] || (s.compress = !1), this._sender.send(t || os, s, n);
  }
  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState !== Q.CLOSED) {
      if (this.readyState === Q.CONNECTING) {
        ze(this, this._req, "WebSocket was closed before the connection was established");
        return;
      }
      this._socket && (this._readyState = Q.CLOSING, this._socket.destroy());
    }
  }
}
Object.defineProperty(Q, "CONNECTING", {
  enumerable: !0,
  value: St.indexOf("CONNECTING")
});
Object.defineProperty(Q.prototype, "CONNECTING", {
  enumerable: !0,
  value: St.indexOf("CONNECTING")
});
Object.defineProperty(Q, "OPEN", {
  enumerable: !0,
  value: St.indexOf("OPEN")
});
Object.defineProperty(Q.prototype, "OPEN", {
  enumerable: !0,
  value: St.indexOf("OPEN")
});
Object.defineProperty(Q, "CLOSING", {
  enumerable: !0,
  value: St.indexOf("CLOSING")
});
Object.defineProperty(Q.prototype, "CLOSING", {
  enumerable: !0,
  value: St.indexOf("CLOSING")
});
Object.defineProperty(Q, "CLOSED", {
  enumerable: !0,
  value: St.indexOf("CLOSED")
});
Object.defineProperty(Q.prototype, "CLOSED", {
  enumerable: !0,
  value: St.indexOf("CLOSED")
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
  Object.defineProperty(Q.prototype, e, { enumerable: !0 });
});
["open", "error", "close", "message"].forEach((e) => {
  Object.defineProperty(Q.prototype, `on${e}`, {
    enumerable: !0,
    get() {
      for (const t of this.listeners(e))
        if (t[jo]) return t[eP];
      return null;
    },
    set(t) {
      for (const r of this.listeners(e))
        if (r[jo]) {
          this.removeListener(e, r);
          break;
        }
      typeof t == "function" && this.addEventListener(e, t, {
        [jo]: !0
      });
    }
  });
});
Q.prototype.addEventListener = rP;
Q.prototype.removeEventListener = nP;
var lP = Q;
function kd(e, t, r, n) {
  const s = {
    allowSynchronousEvents: !0,
    autoPong: !0,
    protocolVersion: Ao[1],
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
  if (e._autoPong = s.autoPong, !Ao.includes(s.protocolVersion))
    throw new RangeError(
      `Unsupported protocol version: ${s.protocolVersion} (supported versions: ${Ao.join(", ")})`
    );
  let o;
  if (t instanceof Co)
    o = t;
  else
    try {
      o = new Co(t);
    } catch {
      throw new SyntaxError(`Invalid URL: ${t}`);
    }
  o.protocol === "http:" ? o.protocol = "ws:" : o.protocol === "https:" && (o.protocol = "wss:"), e._url = o.href;
  const a = o.protocol === "wss:", l = o.protocol === "ws+unix:";
  let c;
  if (o.protocol !== "ws:" && !a && !l ? c = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"` : l && !o.pathname ? c = "The URL's pathname is empty" : o.hash && (c = "The URL contains a fragment identifier"), c) {
    const _ = new SyntaxError(c);
    if (e._redirects === 0)
      throw _;
    $s(e, _);
    return;
  }
  const f = a ? 443 : 80, u = W1(16).toString("base64"), h = a ? B1.request : K1.request, b = /* @__PURE__ */ new Set();
  let g;
  if (s.createConnection = s.createConnection || (a ? fP : uP), s.defaultPort = s.defaultPort || f, s.port = o.port || f, s.host = o.hostname.startsWith("[") ? o.hostname.slice(1, -1) : o.hostname, s.headers = {
    ...s.headers,
    "Sec-WebSocket-Version": s.protocolVersion,
    "Sec-WebSocket-Key": u,
    Connection: "Upgrade",
    Upgrade: "websocket"
  }, s.path = o.pathname + o.search, s.timeout = s.handshakeTimeout, s.perMessageDeflate && (g = new kt(
    s.perMessageDeflate !== !0 ? s.perMessageDeflate : {},
    !1,
    s.maxPayload
  ), s.headers["Sec-WebSocket-Extensions"] = sP({
    [kt.extensionName]: g.offer()
  })), r.length) {
    for (const _ of r) {
      if (typeof _ != "string" || !cP.test(_) || b.has(_))
        throw new SyntaxError(
          "An invalid or duplicated subprotocol was specified"
        );
      b.add(_);
    }
    s.headers["Sec-WebSocket-Protocol"] = r.join(",");
  }
  if (s.origin && (s.protocolVersion < 13 ? s.headers["Sec-WebSocket-Origin"] = s.origin : s.headers.Origin = s.origin), (o.username || o.password) && (s.auth = `${o.username}:${o.password}`), l) {
    const _ = s.path.split(":");
    s.socketPath = _[0], s.path = _[1];
  }
  let v;
  if (s.followRedirects) {
    if (e._redirects === 0) {
      e._originalIpc = l, e._originalSecure = a, e._originalHostOrSocketPath = l ? s.socketPath : o.host;
      const _ = n && n.headers;
      if (n = { ...n, headers: {} }, _)
        for (const [y, p] of Object.entries(_))
          n.headers[y.toLowerCase()] = p;
    } else if (e.listenerCount("redirect") === 0) {
      const _ = l ? e._originalIpc ? s.socketPath === e._originalHostOrSocketPath : !1 : e._originalIpc ? !1 : o.host === e._originalHostOrSocketPath;
      (!_ || e._originalSecure && !a) && (delete s.headers.authorization, delete s.headers.cookie, _ || delete s.headers.host, s.auth = void 0);
    }
    s.auth && !n.headers.authorization && (n.headers.authorization = "Basic " + Buffer.from(s.auth).toString("base64")), v = e._req = h(s), e._redirects && e.emit("redirect", e.url, v);
  } else
    v = e._req = h(s);
  s.timeout && v.on("timeout", () => {
    ze(e, v, "Opening handshake has timed out");
  }), v.on("error", (_) => {
    v === null || v[Id] || (v = e._req = null, $s(e, _));
  }), v.on("response", (_) => {
    const y = _.headers.location, p = _.statusCode;
    if (y && s.followRedirects && p >= 300 && p < 400) {
      if (++e._redirects > s.maxRedirects) {
        ze(e, v, "Maximum redirects exceeded");
        return;
      }
      v.abort();
      let E;
      try {
        E = new Co(y, t);
      } catch {
        const N = new SyntaxError(`Invalid URL: ${y}`);
        $s(e, N);
        return;
      }
      kd(e, E, r, n);
    } else e.emit("unexpected-response", v, _) || ze(
      e,
      v,
      `Unexpected server response: ${_.statusCode}`
    );
  }), v.on("upgrade", (_, y, p) => {
    if (e.emit("upgrade", _), e.readyState !== Q.CONNECTING) return;
    v = e._req = null;
    const E = _.headers.upgrade;
    if (E === void 0 || E.toLowerCase() !== "websocket") {
      ze(e, y, "Invalid Upgrade header");
      return;
    }
    const O = X1("sha1").update(u + Z1).digest("base64");
    if (_.headers["sec-websocket-accept"] !== O) {
      ze(e, y, "Invalid Sec-WebSocket-Accept header");
      return;
    }
    const N = _.headers["sec-websocket-protocol"];
    let I;
    if (N !== void 0 ? b.size ? b.has(N) || (I = "Server sent an invalid subprotocol") : I = "Server sent a subprotocol but none was requested" : b.size && (I = "Server sent no subprotocol"), I) {
      ze(e, y, I);
      return;
    }
    N && (e._protocol = N);
    const z = _.headers["sec-websocket-extensions"];
    if (z !== void 0) {
      if (!g) {
        ze(e, y, "Server sent a Sec-WebSocket-Extensions header but no extension was requested");
        return;
      }
      let W;
      try {
        W = oP(z);
      } catch {
        ze(e, y, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      const ae = Object.keys(W);
      if (ae.length !== 1 || ae[0] !== kt.extensionName) {
        ze(e, y, "Server indicated an extension that was not requested");
        return;
      }
      try {
        g.accept(W[kt.extensionName]);
      } catch {
        ze(e, y, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      e._extensions[kt.extensionName] = g;
    }
    e.setSocket(y, p, {
      allowSynchronousEvents: s.allowSynchronousEvents,
      generateMask: s.generateMask,
      maxPayload: s.maxPayload,
      skipUTF8Validation: s.skipUTF8Validation
    });
  }), s.finishRequest ? s.finishRequest(v, e) : v.end();
}
function $s(e, t) {
  e._readyState = Q.CLOSING, e._errorEmitted = !0, e.emit("error", t), e.emitClose();
}
function uP(e) {
  return e.path = e.socketPath, Rd.connect(e);
}
function fP(e) {
  return e.path = void 0, !e.servername && e.servername !== "" && (e.servername = Rd.isIP(e.host) ? "" : e.host), H1.connect(e);
}
function ze(e, t, r) {
  e._readyState = Q.CLOSING;
  const n = new Error(r);
  Error.captureStackTrace(n, ze), t.setHeader ? (t[Id] = !0, t.abort(), t.socket && !t.socket.destroyed && t.socket.destroy(), process.nextTick($s, e, n)) : (t.destroy(n), t.once("error", e.emit.bind(e, "error")), t.once("close", e.emitClose.bind(e)));
}
function Do(e, t, r) {
  if (t) {
    const n = Q1(t) ? t.size : aP(t).length;
    e._socket ? e._sender._bufferedBytes += n : e._bufferedAmount += n;
  }
  if (r) {
    const n = new Error(
      `WebSocket is not open: readyState ${e.readyState} (${St[e.readyState]})`
    );
    process.nextTick(r, n);
  }
}
function dP(e, t) {
  const r = this[we];
  r._closeFrameReceived = !0, r._closeMessage = t, r._closeCode = e, r._socket[we] !== void 0 && (r._socket.removeListener("data", oo), process.nextTick(Cd, r._socket), e === 1005 ? r.close() : r.close(e, t));
}
function hP() {
  const e = this[we];
  e.isPaused || e._socket.resume();
}
function pP(e) {
  const t = this[we];
  t._socket[we] !== void 0 && (t._socket.removeListener("data", oo), process.nextTick(Cd, t._socket), t.close(e[tP])), t._errorEmitted || (t._errorEmitted = !0, t.emit("error", e));
}
function Ql() {
  this[we].emitClose();
}
function mP(e, t) {
  this[we].emit("message", e, t);
}
function yP(e) {
  const t = this[we];
  t._autoPong && t.pong(e, !this._isServer, Td), t.emit("ping", e);
}
function _P(e) {
  this[we].emit("pong", e);
}
function Cd(e) {
  e.resume();
}
function $P(e) {
  const t = this[we];
  t.readyState !== Q.CLOSED && (t.readyState === Q.OPEN && (t._readyState = Q.CLOSING, jd(t)), this._socket.end(), t._errorEmitted || (t._errorEmitted = !0, t.emit("error", e)));
}
function jd(e) {
  e._closeTimer = setTimeout(
    e._socket.destroy.bind(e._socket),
    iP
  );
}
function Ad() {
  const e = this[we];
  this.removeListener("close", Ad), this.removeListener("data", oo), this.removeListener("end", Dd), e._readyState = Q.CLOSING;
  let t;
  !this._readableState.endEmitted && !e._closeFrameReceived && !e._receiver._writableState.errorEmitted && (t = e._socket.read()) !== null && e._receiver.write(t), e._receiver.end(), this[we] = void 0, clearTimeout(e._closeTimer), e._receiver._writableState.finished || e._receiver._writableState.errorEmitted ? e.emitClose() : (e._receiver.on("error", Ql), e._receiver.on("finish", Ql));
}
function oo(e) {
  this[we]._receiver.write(e) || this.pause();
}
function Dd() {
  const e = this[we];
  e._readyState = Q.CLOSING, e._receiver.end(), this.end();
}
function Ld() {
  const e = this[we];
  this.removeListener("error", Ld), this.on("error", Td), e && (e._readyState = Q.CLOSING, this.destroy());
}
const qr = /* @__PURE__ */ nu(lP), { Duplex: eO } = Sn, { tokenChars: tO } = kn, { Duplex: rO } = Sn, { createHash: nO } = Ms, { GUID: sO, kWebSocket: oO } = Vt, Md = Lt.dirname(xd(import.meta.url));
process.env.APP_ROOT = Lt.join(Md, "..");
const un = process.env.VITE_DEV_SERVER_URL, aO = Lt.join(process.env.APP_ROOT, "dist-electron"), Fd = Lt.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = un ? Lt.join(process.env.APP_ROOT, "public") : Fd;
let et, he = null, ir = /* @__PURE__ */ new Map(), gs = null, br = !1;
const gP = {
  stocks: {
    type: "array",
    default: []
  },
  pollInterval: {
    type: "number",
    default: 5e3
  }
}, as = new Jb({
  schema: gP,
  name: "app-store"
});
function vP() {
  if ((he == null ? void 0 : he.readyState) === qr.OPEN || br)
    return console.log("[Crypto] Already connected or connecting"), Promise.resolve();
  br = !0;
  const e = "wss://wspap.okx.com:8443/ws/v5/public";
  return console.log("[Crypto] WebSocket connecting to OKX:", e), new Promise((t, r) => {
    try {
      he = new qr(e), he.on("open", () => {
        console.log("✅ [Crypto] WebSocket connected to OKX"), br = !1, EP(), wP(), t();
      }), he.on("message", (n) => {
        bP(n.toString());
      }), he.on("error", (n) => {
        console.error("❌ [Crypto] WebSocket error:", n), br = !1, r(n);
      }), he.on("close", () => {
        console.log("❌ [Crypto] WebSocket closed - not reconnecting (OKX mode)"), br = !1, Ud();
      });
    } catch (n) {
      br = !1, r(n);
    }
  });
}
function EP() {
  gs = setInterval(() => {
    (he == null ? void 0 : he.readyState) === qr.OPEN && (he.ping(), console.log("[Crypto] Heartbeat ping sent"));
  }, 3e4);
}
function Ud() {
  gs && (clearInterval(gs), gs = null);
}
function wP() {
  console.log("[Crypto] Resubscribing to all symbols..."), ir.forEach((e, t) => {
    e.forEach((r) => {
      const n = SP(r);
      n && Vd(n);
    });
  });
}
function SP(e) {
  return {
    BTC: "BTC-USDT",
    ETH: "ETH-USDT",
    SOL: "SOL-USDT",
    XRP: "XRP-USDT",
    ADA: "ADA-USDT"
  }[e];
}
function Vd(e) {
  if ((he == null ? void 0 : he.readyState) === qr.OPEN) {
    const t = {
      op: "subscribe",
      args: [
        {
          channel: "ticker",
          instId: e
        }
      ]
    };
    he.send(JSON.stringify(t)), console.log(`✅ [Crypto] Subscribed to OKX ticker for ${e}`);
  } else
    console.warn(`⚠️ [Crypto] Cannot subscribe to ${e}: WebSocket not connected`);
}
function bP(e) {
  var t;
  try {
    const r = JSON.parse(e);
    if (((t = r.arg) == null ? void 0 : t.channel) === "ticker" && r.data && Array.isArray(r.data)) {
      const n = r.data[0], s = n.instId;
      console.log(`📨 [Crypto] Received OKX ticker data for ${s}`), console.log("[Crypto] Raw data:", {
        instId: s,
        price: n.last,
        open24h: n.open24h,
        high24h: n.high24h,
        low24h: n.low24h
      });
      const o = s.split("-")[0], a = parseFloat(n.last), l = parseFloat(n.open24h), c = (a - l) / l * 100, f = {
        symbol: o,
        name: o,
        price: a,
        change24h: c,
        changeAmount: a - l,
        volume: parseFloat(n.volCcy24h || "0"),
        marketCap: void 0,
        type: "crypto",
        dataSource: "okx",
        isRealtime: !0,
        lastUpdate: parseInt(n.ts)
      };
      et && (et.webContents.send("crypto-ticker-update", f), console.log("[Crypto] Sent to renderer:", f.symbol));
    }
  } catch (r) {
    console.error("❌ [Crypto] Failed to parse WebSocket message:", r);
  }
}
function PP() {
  bt.handle("electron-store-get", (e, t) => as.get(t)), bt.handle("electron-store-set", (e, t, r) => (as.set(t, r), !0)), bt.handle("electron-store-get-all", () => as.store), bt.handle("electron-store-reset", () => (as.reset(), !0)), bt.handle("crypto-subscribe", async (e, t) => {
    console.log(`[Crypto IPC] Subscribe request for ${t}`), ir.has("main") || ir.set("main", /* @__PURE__ */ new Set()), ir.get("main").add(t), await vP();
    const r = t.toLowerCase() + "usdt";
    return Vd(r), !0;
  }), bt.handle("crypto-unsubscribe", (e, t) => {
    if (console.log(`[Crypto IPC] Unsubscribe request for ${t}`), ir.has("main") && ir.get("main").delete(t), (he == null ? void 0 : he.readyState) === qr.OPEN) {
      const r = t.toLowerCase() + "usdt", n = {
        method: "UNSUBSCRIBE",
        params: [`${r}@ticker`],
        id: Date.now()
      };
      he.send(JSON.stringify(n)), console.log(`✅ [Crypto] Unsubscribed from ${r}`);
    }
    return !0;
  }), bt.handle("crypto-disconnect", () => (console.log("[Crypto IPC] Disconnect request"), Ud(), he && (he.close(), he = null), ir.clear(), !0)), bt.handle("crypto-is-connected", () => {
    const e = (he == null ? void 0 : he.readyState) === qr.OPEN;
    return console.log(`[Crypto IPC] Connection status: ${e}`), e;
  });
}
function qd() {
  et = new Zl({
    title: "Electron Stock App",
    icon: Lt.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: Lt.join(Md, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      sandbox: !0
    }
  }), un && (console.log("[Main] Opening dev tools for development"), et.webContents.openDevTools()), et.webContents.on("did-finish-load", () => {
    console.log("[Main] Window loaded, sending test message"), et == null || et.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), un ? (console.log("[Main] Loading dev server:", un), et.loadURL(un)) : (console.log("[Main] Loading production HTML"), et.loadFile(Lt.join(Fd, "index.html")));
}
vs.on("window-all-closed", () => {
  process.platform !== "darwin" && (vs.quit(), et = null);
});
vs.on("activate", () => {
  Zl.getAllWindows().length === 0 && qd();
});
vs.whenReady().then(() => {
  PP(), qd();
});
export {
  aO as MAIN_DIST,
  Fd as RENDERER_DIST,
  un as VITE_DEV_SERVER_URL
};
