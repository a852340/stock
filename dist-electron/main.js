import zd, { app as vs, BrowserWindow as eu, ipcMain as bt } from "electron";
import { fileURLToPath as Gd } from "node:url";
import Lt from "node:path";
import Ut from "path";
import tu from "util";
import Ls from "fs";
import Ms from "crypto";
import Kd from "assert";
import ru from "events";
import nu from "os";
import Bd from "https";
import Hd from "http";
import Wd from "net";
import Xd from "tls";
import wn from "stream";
import Jd from "url";
import Yd from "zlib";
import Qd from "buffer";
var kn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function su(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Lo = { exports: {} }, Zd = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const tr = Zd, eh = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), th = (e) => !e.some((t) => eh.has(t));
function Cn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return th(r) ? r : [];
}
var rh = {
  get(e, t, r) {
    if (!tr(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = Cn(t);
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
    const n = e, s = Cn(t);
    for (let o = 0; o < s.length; o++) {
      const a = s[o];
      tr(e[a]) || (e[a] = {}), o === s.length - 1 && (e[a] = r), e = e[a];
    }
    return n;
  },
  delete(e, t) {
    if (!tr(e) || typeof t != "string")
      return !1;
    const r = Cn(t);
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
    const r = Cn(t);
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
}, ca = { exports: {} }, la = { exports: {} }, ua = { exports: {} }, fa = { exports: {} };
const ou = Ls;
fa.exports = (e) => new Promise((t) => {
  ou.access(e, (r) => {
    t(!r);
  });
});
fa.exports.sync = (e) => {
  try {
    return ou.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var nh = fa.exports, da = { exports: {} }, ha = { exports: {} };
const au = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ha.exports = au;
ha.exports.default = au;
var sh = ha.exports;
const oh = sh, iu = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (l, c, ...f) => {
    r++;
    const u = oh(l, ...f);
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
da.exports = iu;
da.exports.default = iu;
var ah = da.exports;
const uc = ah;
class cu extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const ih = (e, t) => Promise.resolve(e).then(t), ch = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new cu(t[0])));
var lh = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = uc(r.concurrency), s = [...e].map((a) => [a, n(ih, a, t)]), o = uc(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((a) => o(ch, a))).then(() => {
  }).catch((a) => a instanceof cu ? a.value : Promise.reject(a));
};
const lu = Ut, uu = nh, uh = lh;
ua.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), uh(e, (r) => uu(lu.resolve(t.cwd, r)), t));
ua.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (uu.sync(lu.resolve(t.cwd, r)))
      return r;
};
var fh = ua.exports;
const Ct = Ut, fu = fh;
la.exports = (e, t = {}) => {
  const r = Ct.resolve(t.cwd || ""), { root: n } = Ct.parse(r), s = [].concat(e);
  return new Promise((o) => {
    (function a(l) {
      fu(s, { cwd: l }).then((c) => {
        c ? o(Ct.join(l, c)) : l === n ? o(null) : a(Ct.dirname(l));
      });
    })(r);
  });
};
la.exports.sync = (e, t = {}) => {
  let r = Ct.resolve(t.cwd || "");
  const { root: n } = Ct.parse(r), s = [].concat(e);
  for (; ; ) {
    const o = fu.sync(s, { cwd: r });
    if (o)
      return Ct.join(r, o);
    if (r === n)
      return null;
    r = Ct.dirname(r);
  }
};
var dh = la.exports;
const du = dh;
ca.exports = async ({ cwd: e } = {}) => du("package.json", { cwd: e });
ca.exports.sync = ({ cwd: e } = {}) => du.sync("package.json", { cwd: e });
var hh = ca.exports, pa = { exports: {} };
const ye = Ut, hu = nu, It = hu.homedir(), ma = hu.tmpdir(), { env: Nr } = process, ph = (e) => {
  const t = ye.join(It, "Library");
  return {
    data: ye.join(t, "Application Support", e),
    config: ye.join(t, "Preferences", e),
    cache: ye.join(t, "Caches", e),
    log: ye.join(t, "Logs", e),
    temp: ye.join(ma, e)
  };
}, mh = (e) => {
  const t = Nr.APPDATA || ye.join(It, "AppData", "Roaming"), r = Nr.LOCALAPPDATA || ye.join(It, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: ye.join(r, e, "Data"),
    config: ye.join(t, e, "Config"),
    cache: ye.join(r, e, "Cache"),
    log: ye.join(r, e, "Log"),
    temp: ye.join(ma, e)
  };
}, yh = (e) => {
  const t = ye.basename(It);
  return {
    data: ye.join(Nr.XDG_DATA_HOME || ye.join(It, ".local", "share"), e),
    config: ye.join(Nr.XDG_CONFIG_HOME || ye.join(It, ".config"), e),
    cache: ye.join(Nr.XDG_CACHE_HOME || ye.join(It, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: ye.join(Nr.XDG_STATE_HOME || ye.join(It, ".local", "state"), e),
    temp: ye.join(ma, t, e)
  };
}, pu = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? ph(e) : process.platform === "win32" ? mh(e) : yh(e);
};
pa.exports = pu;
pa.exports.default = pu;
var _h = pa.exports, ft = {}, ce = {};
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.NOOP = ce.LIMIT_FILES_DESCRIPTORS = ce.LIMIT_BASENAME_LENGTH = ce.IS_USER_ROOT = ce.IS_POSIX = ce.DEFAULT_TIMEOUT_SYNC = ce.DEFAULT_TIMEOUT_ASYNC = ce.DEFAULT_WRITE_OPTIONS = ce.DEFAULT_READ_OPTIONS = ce.DEFAULT_FOLDER_MODE = ce.DEFAULT_FILE_MODE = ce.DEFAULT_ENCODING = void 0;
const $h = "utf8";
ce.DEFAULT_ENCODING = $h;
const gh = 438;
ce.DEFAULT_FILE_MODE = gh;
const vh = 511;
ce.DEFAULT_FOLDER_MODE = vh;
const Eh = {};
ce.DEFAULT_READ_OPTIONS = Eh;
const wh = {};
ce.DEFAULT_WRITE_OPTIONS = wh;
const Sh = 5e3;
ce.DEFAULT_TIMEOUT_ASYNC = Sh;
const bh = 100;
ce.DEFAULT_TIMEOUT_SYNC = bh;
const Ph = !!process.getuid;
ce.IS_POSIX = Ph;
const Oh = process.getuid ? !process.getuid() : !1;
ce.IS_USER_ROOT = Oh;
const Nh = 128;
ce.LIMIT_BASENAME_LENGTH = Nh;
const Rh = 1e4;
ce.LIMIT_FILES_DESCRIPTORS = Rh;
const Th = () => {
};
ce.NOOP = Th;
var Fs = {}, Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.attemptifySync = Dr.attemptifyAsync = void 0;
const mu = ce, Ih = (e, t = mu.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
Dr.attemptifyAsync = Ih;
const kh = (e, t = mu.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
Dr.attemptifySync = kh;
var ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
const Ch = ce, yu = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Ch.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!yu.isChangeErrorOk(e))
      throw e;
  }
};
ya.default = yu;
var Lr = {}, _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
const jh = ce, he = {
  interval: 25,
  intervalId: void 0,
  limit: jh.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    he.intervalId || (he.intervalId = setInterval(he.tick, he.interval));
  },
  reset: () => {
    he.intervalId && (clearInterval(he.intervalId), delete he.intervalId);
  },
  add: (e) => {
    he.queueWaiting.add(e), he.queueActive.size < he.limit / 2 ? he.tick() : he.init();
  },
  remove: (e) => {
    he.queueWaiting.delete(e), he.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => he.remove(r), r = () => e(t);
    he.add(r);
  }),
  tick: () => {
    if (!(he.queueActive.size >= he.limit)) {
      if (!he.queueWaiting.size)
        return he.reset();
      for (const e of he.queueWaiting) {
        if (he.queueActive.size >= he.limit)
          break;
        he.queueWaiting.delete(e), he.queueActive.add(e), e();
      }
    }
  }
};
_a.default = he;
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.retryifySync = Lr.retryifyAsync = void 0;
const Ah = _a, Dh = (e, t) => function(r) {
  return function n() {
    return Ah.default.schedule().then((s) => e.apply(void 0, arguments).then((o) => (s(), o), (o) => {
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
Lr.retryifyAsync = Dh;
const Lh = (e, t) => function(r) {
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
Lr.retryifySync = Lh;
Object.defineProperty(Fs, "__esModule", { value: !0 });
const le = Ls, Ie = tu, ke = Dr, Ee = ya, De = Lr, Mh = {
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
Fs.default = Mh;
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
const Fh = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
$a.default = Fh;
var ga = {};
Object.defineProperty(ga, "__esModule", { value: !0 });
const jn = {}, Mo = {
  next: (e) => {
    const t = jn[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Mo.next(e)) : delete jn[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = jn[e];
    r || (r = jn[e] = []), r.push(t), !(r.length > 1) && t(() => Mo.next(e));
  })
};
ga.default = Mo;
var va = {};
Object.defineProperty(va, "__esModule", { value: !0 });
const Uh = Ut, fc = ce, dc = Fs, qe = {
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
    qe.store[e] && (delete qe.store[e], dc.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    qe.store[e] && (delete qe.store[e], dc.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in qe.store)
      qe.purgeSync(e);
  },
  truncate: (e) => {
    const t = Uh.basename(e);
    if (t.length <= fc.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - fc.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", qe.purgeSyncAll);
va.default = qe;
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.writeFileSync = ft.writeFile = ft.readFileSync = ft.readFile = void 0;
const _u = Ut, Pe = ce, ie = Fs, ze = $a, Vh = ga, jt = va;
function $u(e, t = Pe.DEFAULT_READ_OPTIONS) {
  var r;
  if (ze.default.isString(t))
    return $u(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Pe.DEFAULT_TIMEOUT_ASYNC);
  return ie.default.readFileRetry(n)(e, t);
}
ft.readFile = $u;
function gu(e, t = Pe.DEFAULT_READ_OPTIONS) {
  var r;
  if (ze.default.isString(t))
    return gu(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Pe.DEFAULT_TIMEOUT_SYNC);
  return ie.default.readFileSyncRetry(n)(e, t);
}
ft.readFileSync = gu;
const vu = (e, t, r, n) => {
  if (ze.default.isFunction(r))
    return vu(e, t, Pe.DEFAULT_WRITE_OPTIONS, r);
  const s = Eu(e, t, r);
  return n && s.then(n, n), s;
};
ft.writeFile = vu;
const Eu = async (e, t, r = Pe.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (ze.default.isString(r))
    return Eu(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Pe.DEFAULT_TIMEOUT_ASYNC);
  let o = null, a = null, l = null, c = null, f = null;
  try {
    r.schedule && (o = await r.schedule(e)), a = await Vh.default.schedule(e), e = await ie.default.realpathAttempt(e) || e, [c, l] = jt.default.get(e, r.tmpCreate || jt.default.create, r.tmpPurge !== !1);
    const u = Pe.IS_POSIX && ze.default.isUndefined(r.chown), h = ze.default.isUndefined(r.mode);
    if (u || h) {
      const g = await ie.default.statAttempt(e);
      g && (r = { ...r }, u && (r.chown = { uid: g.uid, gid: g.gid }), h && (r.mode = g.mode));
    }
    const b = _u.dirname(e);
    await ie.default.mkdirAttempt(b, {
      mode: Pe.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), f = await ie.default.openRetry(s)(c, "w", r.mode || Pe.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), ze.default.isString(t) ? await ie.default.writeRetry(s)(f, t, 0, r.encoding || Pe.DEFAULT_ENCODING) : ze.default.isUndefined(t) || await ie.default.writeRetry(s)(f, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await ie.default.fsyncRetry(s)(f) : ie.default.fsyncAttempt(f)), await ie.default.closeRetry(s)(f), f = null, r.chown && await ie.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await ie.default.chmodAttempt(c, r.mode);
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
}, wu = (e, t, r = Pe.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (ze.default.isString(r))
    return wu(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Pe.DEFAULT_TIMEOUT_SYNC);
  let o = null, a = null, l = null;
  try {
    e = ie.default.realpathSyncAttempt(e) || e, [a, o] = jt.default.get(e, r.tmpCreate || jt.default.create, r.tmpPurge !== !1);
    const c = Pe.IS_POSIX && ze.default.isUndefined(r.chown), f = ze.default.isUndefined(r.mode);
    if (c || f) {
      const h = ie.default.statSyncAttempt(e);
      h && (r = { ...r }, c && (r.chown = { uid: h.uid, gid: h.gid }), f && (r.mode = h.mode));
    }
    const u = _u.dirname(e);
    ie.default.mkdirSyncAttempt(u, {
      mode: Pe.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), l = ie.default.openSyncRetry(s)(a, "w", r.mode || Pe.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(a), ze.default.isString(t) ? ie.default.writeSyncRetry(s)(l, t, 0, r.encoding || Pe.DEFAULT_ENCODING) : ze.default.isUndefined(t) || ie.default.writeSyncRetry(s)(l, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? ie.default.fsyncSyncRetry(s)(l) : ie.default.fsyncAttempt(l)), ie.default.closeSyncRetry(s)(l), l = null, r.chown && ie.default.chownSyncAttempt(a, r.chown.uid, r.chown.gid), r.mode && ie.default.chmodSyncAttempt(a, r.mode);
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
ft.writeFileSync = wu;
var Fo = { exports: {} }, Su = {}, rt = {}, Mr = {}, Sn = {}, se = {}, vn = {};
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
})(vn);
var Uo = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = vn;
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
  const t = vn, r = Uo;
  var n = vn;
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
  class x extends v {
    constructor(i, d, P) {
      super(), this.name = i, this.args = d, this.async = P;
    }
    render(i) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(i);
    }
  }
  x.kind = "func";
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
      const K = this._scope.toName(i);
      return this._for(new N(C, K, d, P), () => k(K));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, d, P, k = r.varKinds.const) {
      const C = this._scope.toName(i);
      if (this.opts.es5) {
        const K = d instanceof t.Name ? d : this.var("_arr", d);
        return this.forRange("_i", 0, (0, t._)`${K}.length`, (z) => {
          this.var(C, (0, t._)`${K}[${z}]`), P(C);
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
      return this._blockNode(new x(i, d, P)), k && this.code(k).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(x);
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
    return new t._Code($._items.reduce((C, K) => (K instanceof t.Name && (K = P(K)), K instanceof t._Code ? C.push(...K._items) : C.push(K), C), []));
    function P(C) {
      const K = d[C.str];
      return K === void 0 || i[C.str] !== 1 ? C : (delete i[C.str], K);
    }
    function k(C) {
      return C instanceof t._Code && C._items.some((K) => K instanceof t.Name && i[K.str] === 1 && d[K.str] !== void 0);
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
const fe = se, qh = vn;
function xh(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = xh;
function zh(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (bu(e, t), !Pu(t, e.self.RULES.all));
}
M.alwaysValidSchema = zh;
function bu(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const o in t)
    s[o] || Ru(e, `unknown keyword: "${o}"`);
}
M.checkUnknownRules = bu;
function Pu(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = Pu;
function Gh(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = Gh;
function Kh({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, fe._)`${r}`;
  }
  return (0, fe._)`${e}${t}${(0, fe.getProperty)(n)}`;
}
M.schemaRefOrVal = Kh;
function Bh(e) {
  return Ou(decodeURIComponent(e));
}
M.unescapeFragment = Bh;
function Hh(e) {
  return encodeURIComponent(Ea(e));
}
M.escapeFragment = Hh;
function Ea(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = Ea;
function Ou(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Ou;
function Wh(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = Wh;
function hc({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, o, a, l) => {
    const c = a === void 0 ? o : a instanceof fe.Name ? (o instanceof fe.Name ? e(s, o, a) : t(s, o, a), a) : o instanceof fe.Name ? (t(s, a, o), o) : r(o, a);
    return l === fe.Name && !(c instanceof fe.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: hc({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, fe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, fe._)`${r} || {}`).code((0, fe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, fe._)`${r} || {}`), wa(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Nu
  }),
  items: hc({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, fe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, fe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Nu(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, fe._)`{}`);
  return t !== void 0 && wa(e, r, t), r;
}
M.evaluatedPropsToName = Nu;
function wa(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, fe._)`${t}${(0, fe.getProperty)(n)}`, !0));
}
M.setEvaluated = wa;
const pc = {};
function Xh(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: pc[t.code] || (pc[t.code] = new qh._Code(t.code))
  });
}
M.useFunc = Xh;
var Vo;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Vo || (M.Type = Vo = {}));
function Jh(e, t, r) {
  if (e instanceof fe.Name) {
    const n = t === Vo.Num;
    return r ? n ? (0, fe._)`"[" + ${e} + "]"` : (0, fe._)`"['" + ${e} + "']"` : n ? (0, fe._)`"/" + ${e}` : (0, fe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, fe.getProperty)(e).toString() : "/" + Ea(e);
}
M.getErrorPath = Jh;
function Ru(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = Ru;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
const Re = se, Yh = {
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
mt.default = Yh;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = se, r = M, n = mt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: p }) => p ? (0, t.str)`"${y}" keyword must be ${p} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, p = e.keywordError, E, O) {
    const { it: N } = y, { gen: I, compositeRule: x, allErrors: W } = N, ae = h(y, p, E);
    O ?? (x || W) ? c(I, ae) : f(N, (0, t._)`[${ae}]`);
  }
  e.reportError = s;
  function o(y, p = e.keywordError, E) {
    const { it: O } = y, { gen: N, compositeRule: I, allErrors: x } = O, W = h(y, p, E);
    c(N, W), I || x || f(O, n.default.vErrors);
  }
  e.reportExtraError = o;
  function a(y, p) {
    y.assign(n.default.errors, p), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(p, () => y.assign((0, t._)`${n.default.vErrors}.length`, p), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function l({ gen: y, keyword: p, schemaValue: E, data: O, errsCount: N, it: I }) {
    if (N === void 0)
      throw new Error("ajv implementation error");
    const x = y.name("err");
    y.forRange("i", N, n.default.errors, (W) => {
      y.const(x, (0, t._)`${n.default.vErrors}[${W}]`), y.if((0, t._)`${x}.instancePath === undefined`, () => y.assign((0, t._)`${x}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${x}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && (y.assign((0, t._)`${x}.schema`, E), y.assign((0, t._)`${x}.data`, O));
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
    const { keyword: N, data: I, schemaValue: x, it: W } = y, { opts: ae, propertyName: U, topSchemaRef: X, schemaPath: V } = W;
    O.push([u.keyword, N], [u.params, typeof p == "function" ? p(y) : p || (0, t._)`{}`]), ae.messages && O.push([u.message, typeof E == "function" ? E(y) : E]), ae.verbose && O.push([u.schema, x], [u.parentSchema, (0, t._)`${X}${V}`], [n.default.data, I]), U && O.push([u.propertyName, U]);
  }
})(Sn);
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.boolOrEmptySchema = Mr.topBoolOrEmptySchema = void 0;
const Qh = Sn, Zh = se, ep = mt, tp = {
  message: "boolean schema is false"
};
function rp(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Tu(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(ep.default.data) : (t.assign((0, Zh._)`${n}.errors`, null), t.return(!0));
}
Mr.topBoolOrEmptySchema = rp;
function np(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Tu(e)) : r.var(t, !0);
}
Mr.boolOrEmptySchema = np;
function Tu(e, t) {
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
  (0, Qh.reportError)(s, tp, void 0, t);
}
var ge = {}, pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.getRules = pr.isJSONType = void 0;
const sp = ["string", "number", "integer", "boolean", "null", "object", "array"], op = new Set(sp);
function ap(e) {
  return typeof e == "string" && op.has(e);
}
pr.isJSONType = ap;
function ip() {
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
pr.getRules = ip;
var $t = {};
Object.defineProperty($t, "__esModule", { value: !0 });
$t.shouldUseRule = $t.shouldUseGroup = $t.schemaHasRulesForType = void 0;
function cp({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Iu(e, n);
}
$t.schemaHasRulesForType = cp;
function Iu(e, t) {
  return t.rules.some((r) => ku(e, r));
}
$t.shouldUseGroup = Iu;
function ku(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
$t.shouldUseRule = ku;
Object.defineProperty(ge, "__esModule", { value: !0 });
ge.reportTypeError = ge.checkDataTypes = ge.checkDataType = ge.coerceAndCheckDataType = ge.getJSONTypes = ge.getSchemaTypes = ge.DataType = void 0;
const lp = pr, up = $t, fp = Sn, Z = se, Cu = M;
var Ir;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Ir || (ge.DataType = Ir = {}));
function dp(e) {
  const t = ju(e.type);
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
ge.getSchemaTypes = dp;
function ju(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(lp.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ge.getJSONTypes = ju;
function hp(e, t) {
  const { gen: r, data: n, opts: s } = e, o = pp(t, s.coerceTypes), a = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, up.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const l = Sa(t, n, s.strictNumbers, Ir.Wrong);
    r.if(l, () => {
      o.length ? mp(e, t, o) : ba(e);
    });
  }
  return a;
}
ge.coerceAndCheckDataType = hp;
const Au = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function pp(e, t) {
  return t ? e.filter((r) => Au.has(r) || t === "array" && r === "array") : [];
}
function mp(e, t, r) {
  const { gen: n, data: s, opts: o } = e, a = n.let("dataType", (0, Z._)`typeof ${s}`), l = n.let("coerced", (0, Z._)`undefined`);
  o.coerceTypes === "array" && n.if((0, Z._)`${a} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Z._)`${s}[0]`).assign(a, (0, Z._)`typeof ${s}`).if(Sa(t, s, o.strictNumbers), () => n.assign(l, s))), n.if((0, Z._)`${l} !== undefined`);
  for (const f of r)
    (Au.has(f) || f === "array" && o.coerceTypes === "array") && c(f);
  n.else(), ba(e), n.endIf(), n.if((0, Z._)`${l} !== undefined`, () => {
    n.assign(s, l), yp(e, l);
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
function yp({ gen: e, parentData: t, parentDataProperty: r }, n) {
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
function Sa(e, t, r, n) {
  if (e.length === 1)
    return qo(e[0], t, r, n);
  let s;
  const o = (0, Cu.toHash)(e);
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
ge.checkDataTypes = Sa;
const _p = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Z._)`{type: ${e}}` : (0, Z._)`{type: ${t}}`
};
function ba(e) {
  const t = $p(e);
  (0, fp.reportError)(t, _p);
}
ge.reportTypeError = ba;
function $p(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Cu.schemaRefOrVal)(e, n, "type");
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
const $r = se, gp = M;
function vp(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      mc(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, o) => mc(e, o, s.default));
}
Us.assignDefaults = vp;
function mc(e, t, r) {
  const { gen: n, compositeRule: s, data: o, opts: a } = e;
  if (r === void 0)
    return;
  const l = (0, $r._)`${o}${(0, $r.getProperty)(t)}`;
  if (s) {
    (0, gp.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, $r._)`${l} === undefined`;
  a.useDefaults === "empty" && (c = (0, $r._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, $r._)`${l} = ${(0, $r.stringify)(r)}`);
}
var dt = {}, re = {};
Object.defineProperty(re, "__esModule", { value: !0 });
re.validateUnion = re.validateArray = re.usePattern = re.callValidateCode = re.schemaProperties = re.allSchemaProperties = re.noPropertyInData = re.propertyInData = re.isOwnProperty = re.hasPropFunc = re.reportMissingProp = re.checkMissingProp = re.checkReportMissingProp = void 0;
const pe = se, Pa = M, Pt = mt, Ep = M;
function wp(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Na(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, pe._)`${t}` }, !0), e.error();
  });
}
re.checkReportMissingProp = wp;
function Sp({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, pe.or)(...n.map((o) => (0, pe.and)(Na(e, t, o, r.ownProperties), (0, pe._)`${s} = ${o}`)));
}
re.checkMissingProp = Sp;
function bp(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
re.reportMissingProp = bp;
function Du(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, pe._)`Object.prototype.hasOwnProperty`
  });
}
re.hasPropFunc = Du;
function Oa(e, t, r) {
  return (0, pe._)`${Du(e)}.call(${t}, ${r})`;
}
re.isOwnProperty = Oa;
function Pp(e, t, r, n) {
  const s = (0, pe._)`${t}${(0, pe.getProperty)(r)} !== undefined`;
  return n ? (0, pe._)`${s} && ${Oa(e, t, r)}` : s;
}
re.propertyInData = Pp;
function Na(e, t, r, n) {
  const s = (0, pe._)`${t}${(0, pe.getProperty)(r)} === undefined`;
  return n ? (0, pe.or)(s, (0, pe.not)(Oa(e, t, r))) : s;
}
re.noPropertyInData = Na;
function Lu(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
re.allSchemaProperties = Lu;
function Op(e, t) {
  return Lu(t).filter((r) => !(0, Pa.alwaysValidSchema)(e, t[r]));
}
re.schemaProperties = Op;
function Np({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: o }, it: a }, l, c, f) {
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
re.callValidateCode = Np;
const Rp = (0, pe._)`new RegExp`;
function Tp({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, o = s(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, pe._)`${s.code === "new RegExp" ? Rp : (0, Ep.useFunc)(e, s)}(${r}, ${n})`
  });
}
re.usePattern = Tp;
function Ip(e) {
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
        dataPropType: Pa.Type.Num
      }, o), t.if((0, pe.not)(o), l);
    });
  }
}
re.validateArray = Ip;
function kp(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, Pa.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
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
re.validateUnion = kp;
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.validateKeywordUsage = dt.validSchemaType = dt.funcKeywordCode = dt.macroKeywordCode = void 0;
const Ce = se, cr = mt, Cp = re, jp = Sn;
function Ap(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: o, it: a } = e, l = t.macro.call(a.self, s, o, a), c = Mu(r, n, l);
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
dt.macroKeywordCode = Ap;
function Dp(e, t) {
  var r;
  const { gen: n, keyword: s, schema: o, parentSchema: a, $data: l, it: c } = e;
  Mp(c, t);
  const f = !l && t.compile ? t.compile.call(c.self, o, a, c) : t.validate, u = Mu(n, s, f), h = n.let("valid");
  e.block$data(h, b), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function b() {
    if (t.errors === !1)
      _(), t.modifying && yc(e), y(() => e.error());
    else {
      const p = t.async ? g() : v();
      t.modifying && yc(e), y(() => Lp(e, p));
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
    n.assign(h, (0, Ce._)`${p}${(0, Cp.callValidateCode)(e, u, E, O)}`, t.modifying);
  }
  function y(p) {
    var E;
    n.if((0, Ce.not)((E = t.valid) !== null && E !== void 0 ? E : h), p);
  }
}
dt.funcKeywordCode = Dp;
function yc(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ce._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Lp(e, t) {
  const { gen: r } = e;
  r.if((0, Ce._)`Array.isArray(${t})`, () => {
    r.assign(cr.default.vErrors, (0, Ce._)`${cr.default.vErrors} === null ? ${t} : ${cr.default.vErrors}.concat(${t})`).assign(cr.default.errors, (0, Ce._)`${cr.default.vErrors}.length`), (0, jp.extendErrors)(e);
  }, () => e.error());
}
function Mp({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Mu(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ce.stringify)(r) });
}
function Fp(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
dt.validSchemaType = Fp;
function Up({ schema: e, opts: t, self: r, errSchemaPath: n }, s, o) {
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
dt.validateKeywordUsage = Up;
var Mt = {};
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.extendSubschemaMode = Mt.extendSubschemaData = Mt.getSubschema = void 0;
const lt = se, Fu = M;
function Vp(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: o, topSchemaRef: a }) {
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
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Fu.escapeFragment)(r)}`
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
Mt.getSubschema = Vp;
function qp(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: o, propertyName: a }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: u, opts: h } = t, b = l.let("data", (0, lt._)`${t.data}${(0, lt.getProperty)(r)}`, !0);
    c(b), e.errorPath = (0, lt.str)`${f}${(0, Fu.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, lt._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
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
Mt.extendSubschemaData = qp;
function xp(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Mt.extendSubschemaMode = xp;
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
}, Uu = { exports: {} }, At = Uu.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  as(t, n, s, e, "", e);
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
function as(e, t, r, n, s, o, a, l, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, o, a, l, c, f);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in At.arrayKeywords)
          for (var b = 0; b < h.length; b++)
            as(e, t, r, h[b], s + "/" + u + "/" + b, o, s, u, n, b);
      } else if (u in At.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            as(e, t, r, h[g], s + "/" + u + "/" + zp(g), o, s, u, n, g);
      } else (u in At.keywords || e.allKeys && !(u in At.skipKeywords)) && as(e, t, r, h, s + "/" + u, o, s, u, n);
    }
    r(n, s, o, a, l, c, f);
  }
}
function zp(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Gp = Uu.exports;
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.getSchemaRefs = Oe.resolveUrl = Oe.normalizeId = Oe._getFullPath = Oe.getFullPath = Oe.inlineRef = void 0;
const Kp = M, Bp = Vs, Hp = Gp, Wp = /* @__PURE__ */ new Set([
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
function Xp(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !xo(e) : t ? Vu(e) <= t : !1;
}
Oe.inlineRef = Xp;
const Jp = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function xo(e) {
  for (const t in e) {
    if (Jp.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(xo) || typeof r == "object" && xo(r))
      return !0;
  }
  return !1;
}
function Vu(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Wp.has(r) && (typeof e[r] == "object" && (0, Kp.eachItem)(e[r], (n) => t += Vu(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function qu(e, t = "", r) {
  r !== !1 && (t = kr(t));
  const n = e.parse(t);
  return xu(e, n);
}
Oe.getFullPath = qu;
function xu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Oe._getFullPath = xu;
const Yp = /#\/?$/;
function kr(e) {
  return e ? e.replace(Yp, "") : "";
}
Oe.normalizeId = kr;
function Qp(e, t, r) {
  return r = kr(r), e.resolve(t, r);
}
Oe.resolveUrl = Qp;
const Zp = /^[a-z_][-a-z0-9._]*$/i;
function em(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = kr(e[r] || t), o = { "": s }, a = qu(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return Hp(e, { allKeys: !0 }, (h, b, g, v) => {
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
        if (!Zp.test(O))
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
Oe.getSchemaRefs = em;
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.getData = rt.KeywordCxt = rt.validateFunctionCode = void 0;
const zu = Mr, _c = ge, Ra = $t, Es = ge, tm = Us, un = dt, io = Mt, B = se, J = mt, rm = Oe, gt = M, Qr = Sn;
function nm(e) {
  if (Bu(e) && (Hu(e), Ku(e))) {
    am(e);
    return;
  }
  Gu(e, () => (0, zu.topBoolOrEmptySchema)(e));
}
rt.validateFunctionCode = nm;
function Gu({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, o) {
  s.code.es5 ? e.func(t, (0, B._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, B._)`"use strict"; ${$c(r, s)}`), om(e, s), e.code(o);
  }) : e.func(t, (0, B._)`${J.default.data}, ${sm(s)}`, n.$async, () => e.code($c(r, s)).code(o));
}
function sm(e) {
  return (0, B._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, B._)`, ${J.default.dynamicAnchors}={}` : B.nil}}={}`;
}
function om(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, B._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, B._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, B._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, B._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, B._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, B._)`""`), e.var(J.default.parentData, (0, B._)`undefined`), e.var(J.default.parentDataProperty, (0, B._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, B._)`{}`);
  });
}
function am(e) {
  const { schema: t, opts: r, gen: n } = e;
  Gu(e, () => {
    r.$comment && t.$comment && Xu(e), fm(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && im(e), Wu(e), pm(e);
  });
}
function im(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, B._)`${r}.evaluated`), t.if((0, B._)`${e.evaluated}.dynamicProps`, () => t.assign((0, B._)`${e.evaluated}.props`, (0, B._)`undefined`)), t.if((0, B._)`${e.evaluated}.dynamicItems`, () => t.assign((0, B._)`${e.evaluated}.items`, (0, B._)`undefined`));
}
function $c(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, B._)`/*# sourceURL=${r} */` : B.nil;
}
function cm(e, t) {
  if (Bu(e) && (Hu(e), Ku(e))) {
    lm(e, t);
    return;
  }
  (0, zu.boolOrEmptySchema)(e, t);
}
function Ku({ schema: e, self: t }) {
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
function lm(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Xu(e), dm(e), hm(e);
  const o = n.const("_errs", J.default.errors);
  Wu(e, o), n.var(t, (0, B._)`${o} === ${J.default.errors}`);
}
function Hu(e) {
  (0, gt.checkUnknownRules)(e), um(e);
}
function Wu(e, t) {
  if (e.opts.jtd)
    return gc(e, [], !1, t);
  const r = (0, _c.getSchemaTypes)(e.schema), n = (0, _c.coerceAndCheckDataType)(e, r);
  gc(e, r, !n, t);
}
function um(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, gt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function fm(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, gt.checkStrictMode)(e, "default is ignored in the schema root");
}
function dm(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, rm.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function hm(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Xu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const o = r.$comment;
  if (s.$comment === !0)
    e.code((0, B._)`${J.default.self}.logger.log(${o})`);
  else if (typeof s.$comment == "function") {
    const a = (0, B.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, B._)`${J.default.self}.opts.$comment(${o}, ${a}, ${l}.schema)`);
  }
}
function pm(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: o } = e;
  r.$async ? t.if((0, B._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, B._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, B._)`${n}.errors`, J.default.vErrors), o.unevaluated && mm(e), t.return((0, B._)`${J.default.errors} === 0`));
}
function mm({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof B.Name && e.assign((0, B._)`${t}.props`, r), n instanceof B.Name && e.assign((0, B._)`${t}.items`, n);
}
function gc(e, t, r, n) {
  const { gen: s, schema: o, data: a, allErrors: l, opts: c, self: f } = e, { RULES: u } = f;
  if (o.$ref && (c.ignoreKeywordsWithRef || !(0, gt.schemaHasRulesButRef)(o, u))) {
    s.block(() => Qu(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || ym(e, t), s.block(() => {
    for (const b of u.rules)
      h(b);
    h(u.post);
  });
  function h(b) {
    (0, Ra.shouldUseGroup)(o, b) && (b.type ? (s.if((0, Es.checkDataType)(b.type, a, c.strictNumbers)), vc(e, b), t.length === 1 && t[0] === b.type && r && (s.else(), (0, Es.reportTypeError)(e)), s.endIf()) : vc(e, b), l || s.if((0, B._)`${J.default.errors} === ${n || 0}`));
  }
}
function vc(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, tm.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, Ra.shouldUseRule)(n, o) && Qu(e, o.keyword, o.definition, t.type);
  });
}
function ym(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (_m(e, t), e.opts.allowUnionTypes || $m(e, t), gm(e, e.dataTypes));
}
function _m(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Ju(e.dataTypes, r) || Ta(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Em(e, t);
  }
}
function $m(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Ta(e, "use allowUnionTypes to allow union type keyword");
}
function gm(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Ra.shouldUseRule)(e.schema, s)) {
      const { type: o } = s.definition;
      o.length && !o.some((a) => vm(t, a)) && Ta(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function vm(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Ju(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Em(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Ju(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Ta(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, gt.checkStrictMode)(e, t, e.opts.strictTypes);
}
let Yu = class {
  constructor(t, r, n) {
    if ((0, un.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, gt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Zu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, un.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", J.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, B.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, B.not)(t), void 0, r);
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
    this.fail((0, B._)`${r} !== undefined && (${(0, B.or)(this.invalid$data(), t)})`);
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
  block$data(t, r, n = B.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = B.nil, r = B.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: o, def: a } = this;
    n.if((0, B.or)((0, B._)`${s} === undefined`, r)), t !== B.nil && n.assign(t, !0), (o.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== B.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: o } = this;
    return (0, B.or)(a(), l());
    function a() {
      if (n.length) {
        if (!(r instanceof B.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, B._)`${(0, Es.checkDataTypes)(c, r, o.opts.strictNumbers, Es.DataType.Wrong)}`;
      }
      return B.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, B._)`!${c}(${r})`;
      }
      return B.nil;
    }
  }
  subschema(t, r) {
    const n = (0, io.getSubschema)(this.it, t);
    (0, io.extendSubschemaData)(n, this.it, t), (0, io.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return cm(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = gt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = gt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, B.Name)), !0;
  }
};
rt.KeywordCxt = Yu;
function Qu(e, t, r, n) {
  const s = new Yu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, un.funcKeywordCode)(s, r) : "macro" in r ? (0, un.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, un.funcKeywordCode)(s, r);
}
const wm = /^\/(?:[^~]|~0|~1)*$/, Sm = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Zu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, o;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!wm.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, o = J.default.rootData;
  } else {
    const f = Sm.exec(e);
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
    f && (o = (0, B._)`${o}${(0, B.getProperty)((0, gt.unescapeJsonPointer)(f))}`, a = (0, B._)`${a} && ${o}`);
  return a;
  function c(f, u) {
    return `Cannot access ${f} ${u} levels up, current level is ${t}`;
  }
}
rt.getData = Zu;
var bn = {};
Object.defineProperty(bn, "__esModule", { value: !0 });
let bm = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
bn.default = bm;
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
const co = Oe;
let Pm = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, co.resolveUrl)(t, r, n), this.missingSchema = (0, co.normalizeId)((0, co.getFullPath)(t, this.missingRef));
  }
};
xr.default = Pm;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.resolveSchema = Fe.getCompilingSchema = Fe.resolveRef = Fe.compileSchema = Fe.SchemaEnv = void 0;
const Xe = se, Om = bn, rr = mt, et = Oe, Ec = M, Nm = rt;
let qs = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, et.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Fe.SchemaEnv = qs;
function Ia(e) {
  const t = ef.call(this, e);
  if (t)
    return t;
  const r = (0, et.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: o } = this.opts, a = new Xe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: o });
  let l;
  e.$async && (l = a.scopeValue("Error", {
    ref: Om.default,
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
    this._compilations.add(e), (0, Nm.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
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
Fe.compileSchema = Ia;
function Rm(e, t, r) {
  var n;
  r = (0, et.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let o = km.call(this, e, r);
  if (o === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    a && (o = new qs({ schema: a, schemaId: l, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = Tm.call(this, o);
}
Fe.resolveRef = Rm;
function Tm(e) {
  return (0, et.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Ia.call(this, e);
}
function ef(e) {
  for (const t of this._compilations)
    if (Im(t, e))
      return t;
}
Fe.getCompilingSchema = ef;
function Im(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function km(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || xs.call(this, e, t);
}
function xs(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, et._getFullPath)(this.opts.uriResolver, r);
  let s = (0, et.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return lo.call(this, r, e);
  const o = (0, et.normalizeId)(n), a = this.refs[o] || this.schemas[o];
  if (typeof a == "string") {
    const l = xs.call(this, e, a);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : lo.call(this, r, l);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || Ia.call(this, a), o === (0, et.normalizeId)(t)) {
      const { schema: l } = a, { schemaId: c } = this.opts, f = l[c];
      return f && (s = (0, et.resolveUrl)(this.opts.uriResolver, s, f)), new qs({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return lo.call(this, r, a);
  }
}
Fe.resolveSchema = xs;
const Cm = /* @__PURE__ */ new Set([
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
    const c = r[(0, Ec.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !Cm.has(l) && f && (t = (0, et.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, Ec.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, et.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = xs.call(this, n, l);
  }
  const { schemaId: a } = this.opts;
  if (o = o || new qs({ schema: r, schemaId: a, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const jm = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Am = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Dm = "object", Lm = [
  "$data"
], Mm = {
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
}, Fm = !1, Um = {
  $id: jm,
  description: Am,
  type: Dm,
  required: Lm,
  properties: Mm,
  additionalProperties: Fm
};
var ka = {}, zs = { exports: {} };
const Vm = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), tf = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function rf(e) {
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
const qm = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function wc(e) {
  return e.length = 0, !0;
}
function xm(e, t, r) {
  if (e.length) {
    const n = rf(e);
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
  let o = !1, a = !1, l = xm;
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
        l = wc;
      } else {
        s.push(f);
        continue;
      }
  }
  return s.length && (l === wc ? r.zone = s.join("") : a ? n.push(s.join("")) : n.push(rf(s))), r.address = n.join(""), r;
}
function nf(e) {
  if (Gm(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = zm(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function Gm(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function Km(e) {
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
function Hm(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!tf(r)) {
      const n = nf(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var sf = {
  nonSimpleDomain: qm,
  recomposeAuthority: Hm,
  normalizeComponentEncoding: Bm,
  removeDotSegments: Km,
  isIPv4: tf,
  isUUID: Vm,
  normalizeIPv6: nf
};
const { isUUID: Wm } = sf, Xm = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function of(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function af(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function cf(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function Jm(e) {
  return e.secure = of(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function Ym(e) {
  if ((e.port === (of(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Qm(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Xm);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, o = Ca(s);
    e.path = void 0, o && (e = o.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Zm(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, o = Ca(s);
  o && (e = o.serialize(e, t));
  const a = e, l = e.nss;
  return a.path = `${n || t.nid}:${l}`, t.skipEscape = !0, a;
}
function ey(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Wm(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function ty(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const lf = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: af,
    serialize: cf
  }
), ry = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: lf.domainHost,
    parse: af,
    serialize: cf
  }
), is = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: Jm,
    serialize: Ym
  }
), ny = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: is.domainHost,
    parse: is.parse,
    serialize: is.serialize
  }
), sy = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: Qm,
    serialize: Zm,
    skipNormalize: !0
  }
), oy = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: ey,
    serialize: ty,
    skipNormalize: !0
  }
), ws = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: lf,
    https: ry,
    ws: is,
    wss: ny,
    urn: sy,
    "urn:uuid": oy
  }
);
Object.setPrototypeOf(ws, null);
function Ca(e) {
  return e && (ws[
    /** @type {SchemeName} */
    e
  ] || ws[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var ay = {
  SCHEMES: ws,
  getSchemeHandler: Ca
};
const { normalizeIPv6: iy, removeDotSegments: an, recomposeAuthority: cy, normalizeComponentEncoding: An, isIPv4: ly, nonSimpleDomain: uy } = sf, { SCHEMES: fy, getSchemeHandler: uf } = ay;
function dy(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  ht(wt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  wt(ht(e, t), t)), e;
}
function hy(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = ff(wt(e, n), wt(t, n), n, !0);
  return n.skipEscape = !0, ht(s, n);
}
function ff(e, t, r, n) {
  const s = {};
  return n || (e = wt(ht(e, r), r), t = wt(ht(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = an(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = an(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = an(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = an(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function py(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ht(An(wt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ht(An(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ht(An(wt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ht(An(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
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
  }, n = Object.assign({}, t), s = [], o = uf(n.scheme || r.scheme);
  o && o.serialize && o.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const a = cy(r);
  if (a !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(a), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let l = r.path;
    !n.absolutePath && (!o || !o.absolutePath) && (l = an(l)), a === void 0 && l[0] === "/" && l[1] === "/" && (l = "/%2F" + l.slice(2)), s.push(l);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const my = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
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
  const o = e.match(my);
  if (o) {
    if (n.scheme = o[1], n.userinfo = o[3], n.host = o[4], n.port = parseInt(o[5], 10), n.path = o[6] || "", n.query = o[7], n.fragment = o[8], isNaN(n.port) && (n.port = o[5]), n.host)
      if (ly(n.host) === !1) {
        const c = iy(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const a = uf(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!a || !a.unicodeSupport) && n.host && (r.domainHost || a && a.domainHost) && s === !1 && uy(n.host))
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
const ja = {
  SCHEMES: fy,
  normalize: dy,
  resolve: hy,
  resolveComponent: ff,
  equal: py,
  serialize: ht,
  parse: wt
};
zs.exports = ja;
zs.exports.default = ja;
zs.exports.fastUri = ja;
var df = zs.exports;
Object.defineProperty(ka, "__esModule", { value: !0 });
const hf = df;
hf.code = 'require("ajv/dist/runtime/uri").default';
ka.default = hf;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = rt;
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
  const n = bn, s = xr, o = pr, a = Fe, l = se, c = Oe, f = ge, u = M, h = Um, b = ka, g = (w, m) => new RegExp(w, m);
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
    var m, S, $, i, d, P, k, C, K, z, oe, Ve, qt, xt, zt, Gt, Kt, Bt, Ht, Wt, Xt, Jt, Yt, Qt, Zt;
    const We = w.strict, er = (m = w.code) === null || m === void 0 ? void 0 : m.optimize, Jr = er === !0 || er === void 0 ? 1 : er || 0, Yr = ($ = (S = w.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : g, ao = (i = w.uriResolver) !== null && i !== void 0 ? i : b.default;
    return {
      strictSchema: (P = (d = w.strictSchema) !== null && d !== void 0 ? d : We) !== null && P !== void 0 ? P : !0,
      strictNumbers: (C = (k = w.strictNumbers) !== null && k !== void 0 ? k : We) !== null && C !== void 0 ? C : !0,
      strictTypes: (z = (K = w.strictTypes) !== null && K !== void 0 ? K : We) !== null && z !== void 0 ? z : "log",
      strictTuples: (Ve = (oe = w.strictTuples) !== null && oe !== void 0 ? oe : We) !== null && Ve !== void 0 ? Ve : "log",
      strictRequired: (xt = (qt = w.strictRequired) !== null && qt !== void 0 ? qt : We) !== null && xt !== void 0 ? xt : !1,
      code: w.code ? { ...w.code, optimize: Jr, regExp: Yr } : { optimize: Jr, regExp: Yr },
      loopRequired: (zt = w.loopRequired) !== null && zt !== void 0 ? zt : E,
      loopEnum: (Gt = w.loopEnum) !== null && Gt !== void 0 ? Gt : E,
      meta: (Kt = w.meta) !== null && Kt !== void 0 ? Kt : !0,
      messages: (Bt = w.messages) !== null && Bt !== void 0 ? Bt : !0,
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
      async function i(z, oe) {
        await d.call(this, z.$schema);
        const Ve = this._addSchema(z, oe);
        return Ve.validate || P.call(this, Ve);
      }
      async function d(z) {
        z && !this.getSchema(z) && await i.call(this, { $ref: z }, !0);
      }
      async function P(z) {
        try {
          return this._compileSchemaEnv(z);
        } catch (oe) {
          if (!(oe instanceof s.default))
            throw oe;
          return k.call(this, oe), await C.call(this, oe.missingSchema), P.call(this, z);
        }
      }
      function k({ missingSchema: z, missingRef: oe }) {
        if (this.refs[z])
          throw new Error(`AnySchema ${z} is loaded but ${oe} cannot be resolved`);
      }
      async function C(z) {
        const oe = await K.call(this, z);
        this.refs[z] || await d.call(this, oe.$schema), this.refs[z] || this.addSchema(oe, z, S);
      }
      async function K(z) {
        const oe = this._loading[z];
        if (oe)
          return oe;
        try {
          return await (this._loading[z] = $(z));
        } finally {
          delete this._loading[z];
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
      for (; typeof (S = x.call(this, m)) == "string"; )
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
          const S = x.call(this, m);
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
          const { $data: K } = C.definition, z = P[k];
          K && z && (P[k] = T(z));
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
      const K = c.getSchemaRefs.call(this, m, $);
      return C = new a.SchemaEnv({ schema: m, schemaId: k, meta: S, baseId: $, localRefs: K }), this._cache.set(C.schema, C), d && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = C), i && this.validateSchema(m, !0), C;
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
  function x(w) {
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
})(Su);
var Aa = {}, Da = {}, La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const yy = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
La.default = yy;
var mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.callRef = mr.getValidate = void 0;
const _y = xr, Sc = re, Le = se, gr = mt, bc = Fe, Dn = M, $y = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: o, validateName: a, opts: l, self: c } = n, { root: f } = o;
    if ((r === "#" || r === "#/") && s === f.baseId)
      return h();
    const u = bc.resolveRef.call(c, f, s, r);
    if (u === void 0)
      throw new _y.default(n.opts.uriResolver, s, r);
    if (u instanceof bc.SchemaEnv)
      return b(u);
    return g(u);
    function h() {
      if (o === f)
        return cs(e, a, o, o.$async);
      const v = t.scopeValue("root", { ref: f });
      return cs(e, (0, Le._)`${v}.validate`, f, f.$async);
    }
    function b(v) {
      const _ = pf(e, v);
      cs(e, _, v, v.$async);
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
function pf(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Le._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
mr.getValidate = pf;
function cs(e, t, r, n) {
  const { gen: s, it: o } = e, { allErrors: a, schemaEnv: l, opts: c } = o, f = c.passContext ? gr.default.this : Le.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Le._)`await ${(0, Sc.callValidateCode)(e, t, f)}`), g(t), a || s.assign(v, !0);
    }, (_) => {
      s.if((0, Le._)`!(${_} instanceof ${o.ValidationError})`, () => s.throw(_)), b(_), a || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, Sc.callValidateCode)(e, t, f), () => g(t), () => b(t));
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
        y.props !== void 0 && (o.props = Dn.mergeEvaluated.props(s, y.props, o.props));
      else {
        const p = s.var("props", (0, Le._)`${v}.evaluated.props`);
        o.props = Dn.mergeEvaluated.props(s, p, o.props, Le.Name);
      }
    if (o.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (o.items = Dn.mergeEvaluated.items(s, y.items, o.items));
      else {
        const p = s.var("items", (0, Le._)`${v}.evaluated.items`);
        o.items = Dn.mergeEvaluated.items(s, p, o.items, Le.Name);
      }
  }
}
mr.callRef = cs;
mr.default = $y;
Object.defineProperty(Da, "__esModule", { value: !0 });
const gy = La, vy = mr, Ey = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  gy.default,
  vy.default
];
Da.default = Ey;
var Ma = {}, Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const Ss = se, Ot = Ss.operators, bs = {
  maximum: { okStr: "<=", ok: Ot.LTE, fail: Ot.GT },
  minimum: { okStr: ">=", ok: Ot.GTE, fail: Ot.LT },
  exclusiveMaximum: { okStr: "<", ok: Ot.LT, fail: Ot.GTE },
  exclusiveMinimum: { okStr: ">", ok: Ot.GT, fail: Ot.LTE }
}, wy = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ss.str)`must be ${bs[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ss._)`{comparison: ${bs[e].okStr}, limit: ${t}}`
}, Sy = {
  keyword: Object.keys(bs),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: wy,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ss._)`${r} ${bs[t].fail} ${n} || isNaN(${r})`);
  }
};
Fa.default = Sy;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const fn = se, by = {
  message: ({ schemaCode: e }) => (0, fn.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, fn._)`{multipleOf: ${e}}`
}, Py = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: by,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, o = s.opts.multipleOfPrecision, a = t.let("res"), l = o ? (0, fn._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, fn._)`${a} !== parseInt(${a})`;
    e.fail$data((0, fn._)`(${n} === 0 || (${a} = ${r}/${n}, ${l}))`);
  }
};
Ua.default = Py;
var Va = {}, qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
function mf(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
qa.default = mf;
mf.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Va, "__esModule", { value: !0 });
const lr = se, Oy = M, Ny = qa, Ry = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, lr.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, lr._)`{limit: ${e}}`
}, Ty = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Ry,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, o = t === "maxLength" ? lr.operators.GT : lr.operators.LT, a = s.opts.unicode === !1 ? (0, lr._)`${r}.length` : (0, lr._)`${(0, Oy.useFunc)(e.gen, Ny.default)}(${r})`;
    e.fail$data((0, lr._)`${a} ${o} ${n}`);
  }
};
Va.default = Ty;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const Iy = re, Ps = se, ky = {
  message: ({ schemaCode: e }) => (0, Ps.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Ps._)`{pattern: ${e}}`
}, Cy = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: ky,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: o } = e, a = o.opts.unicodeRegExp ? "u" : "", l = r ? (0, Ps._)`(new RegExp(${s}, ${a}))` : (0, Iy.usePattern)(e, n);
    e.fail$data((0, Ps._)`!${l}.test(${t})`);
  }
};
xa.default = Cy;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const dn = se, jy = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, dn.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, dn._)`{limit: ${e}}`
}, Ay = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: jy,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? dn.operators.GT : dn.operators.LT;
    e.fail$data((0, dn._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
za.default = Ay;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const Zr = re, hn = se, Dy = M, Ly = {
  message: ({ params: { missingProperty: e } }) => (0, hn.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, hn._)`{missingProperty: ${e}}`
}, My = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Ly,
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
          (0, Dy.checkStrictMode)(a, p, a.opts.strictRequired);
        }
    }
    function f() {
      if (c || o)
        e.block$data(hn.nil, h);
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
        t.assign(v, (0, Zr.propertyInData)(t, s, g, l.ownProperties)), t.if((0, hn.not)(v), () => {
          e.error(), t.break();
        });
      }, hn.nil);
    }
  }
};
Ga.default = My;
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const pn = se, Fy = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, pn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, pn._)`{limit: ${e}}`
}, Uy = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Fy,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? pn.operators.GT : pn.operators.LT;
    e.fail$data((0, pn._)`${r}.length ${s} ${n}`);
  }
};
Ka.default = Uy;
var Ba = {}, Pn = {};
Object.defineProperty(Pn, "__esModule", { value: !0 });
const yf = Vs;
yf.code = 'require("ajv/dist/runtime/equal").default';
Pn.default = yf;
Object.defineProperty(Ba, "__esModule", { value: !0 });
const uo = ge, Se = se, Vy = M, qy = Pn, xy = {
  message: ({ params: { i: e, j: t } }) => (0, Se.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Se._)`{i: ${e}, j: ${t}}`
}, zy = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: xy,
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
      const y = (0, Vy.useFunc)(t, qy.default), p = t.name("outer");
      t.label(p).for((0, Se._)`;${v}--;`, () => t.for((0, Se._)`${_} = ${v}; ${_}--;`, () => t.if((0, Se._)`${y}(${r}[${v}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
Ba.default = zy;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const zo = se, Gy = M, Ky = Pn, By = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, zo._)`{allowedValue: ${e}}`
}, Hy = {
  keyword: "const",
  $data: !0,
  error: By,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, zo._)`!${(0, Gy.useFunc)(t, Ky.default)}(${r}, ${s})`) : e.fail((0, zo._)`${o} !== ${r}`);
  }
};
Ha.default = Hy;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const cn = se, Wy = M, Xy = Pn, Jy = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, cn._)`{allowedValues: ${e}}`
}, Yy = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Jy,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: o, it: a } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= a.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, Wy.useFunc)(t, Xy.default));
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
Wa.default = Yy;
Object.defineProperty(Ma, "__esModule", { value: !0 });
const Qy = Fa, Zy = Ua, e_ = Va, t_ = xa, r_ = za, n_ = Ga, s_ = Ka, o_ = Ba, a_ = Ha, i_ = Wa, c_ = [
  // number
  Qy.default,
  Zy.default,
  // string
  e_.default,
  t_.default,
  // object
  r_.default,
  n_.default,
  // array
  s_.default,
  o_.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  a_.default,
  i_.default
];
Ma.default = c_;
var Xa = {}, zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.validateAdditionalItems = void 0;
const ur = se, Go = M, l_ = {
  message: ({ params: { len: e } }) => (0, ur.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ur._)`{limit: ${e}}`
}, u_ = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: l_,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Go.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    _f(e, n);
  }
};
function _f(e, t) {
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
zr.validateAdditionalItems = _f;
zr.default = u_;
var Ja = {}, Gr = {};
Object.defineProperty(Gr, "__esModule", { value: !0 });
Gr.validateTuple = void 0;
const Pc = se, ls = M, f_ = re, d_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return $f(e, "additionalItems", t);
    r.items = !0, !(0, ls.alwaysValidSchema)(r, t) && e.ok((0, f_.validateArray)(e));
  }
};
function $f(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: o, keyword: a, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = ls.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), f = n.const("len", (0, Pc._)`${o}.length`);
  r.forEach((h, b) => {
    (0, ls.alwaysValidSchema)(l, h) || (n.if((0, Pc._)`${f} > ${b}`, () => e.subschema({
      keyword: a,
      schemaProp: b,
      dataProp: b
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: b, errSchemaPath: g } = l, v = r.length, _ = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (b.strictTuples && !_) {
      const y = `"${a}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, ls.checkStrictMode)(l, y, b.strictTuples);
    }
  }
}
Gr.validateTuple = $f;
Gr.default = d_;
Object.defineProperty(Ja, "__esModule", { value: !0 });
const h_ = Gr, p_ = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, h_.validateTuple)(e, "items")
};
Ja.default = p_;
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Oc = se, m_ = M, y_ = re, __ = zr, $_ = {
  message: ({ params: { len: e } }) => (0, Oc.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Oc._)`{limit: ${e}}`
}, g_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: $_,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, m_.alwaysValidSchema)(n, t) && (s ? (0, __.validateAdditionalItems)(e, s) : e.ok((0, y_.validateArray)(e)));
  }
};
Ya.default = g_;
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const Be = se, Ln = M, v_ = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Be.str)`must contain at least ${e} valid item(s)` : (0, Be.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Be._)`{minContains: ${e}}` : (0, Be._)`{minContains: ${e}, maxContains: ${t}}`
}, E_ = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: v_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    let a, l;
    const { minContains: c, maxContains: f } = n;
    o.opts.next ? (a = c === void 0 ? 1 : c, l = f) : a = 1;
    const u = t.const("len", (0, Be._)`${s}.length`);
    if (e.setParams({ min: a, max: l }), l === void 0 && a === 0) {
      (0, Ln.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && a > l) {
      (0, Ln.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Ln.alwaysValidSchema)(o, r)) {
      let _ = (0, Be._)`${u} >= ${a}`;
      l !== void 0 && (_ = (0, Be._)`${_} && ${u} <= ${l}`), e.pass(_);
      return;
    }
    o.items = !0;
    const h = t.name("valid");
    l === void 0 && a === 1 ? g(h, () => t.if(h, () => t.break())) : a === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, Be._)`${s}.length > 0`, b)) : (t.let(h, !1), b()), e.result(h, () => e.reset());
    function b() {
      const _ = t.name("_valid"), y = t.let("count", 0);
      g(_, () => t.if(_, () => v(y)));
    }
    function g(_, y) {
      t.forRange("i", 0, u, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: Ln.Type.Num,
          compositeRule: !0
        }, _), y();
      });
    }
    function v(_) {
      t.code((0, Be._)`${_}++`), l === void 0 ? t.if((0, Be._)`${_} >= ${a}`, () => t.assign(h, !0).break()) : (t.if((0, Be._)`${_} > ${l}`, () => t.assign(h, !1).break()), a === 1 ? t.assign(h, !0) : t.if((0, Be._)`${_} >= ${a}`, () => t.assign(h, !0)));
    }
  }
};
Qa.default = E_;
var gf = {};
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
})(gf);
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
const vf = se, w_ = M, S_ = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, vf._)`{propertyName: ${e.propertyName}}`
}, b_ = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: S_,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, w_.alwaysValidSchema)(s, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, o), t.if((0, vf.not)(o), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
Za.default = b_;
var Gs = {};
Object.defineProperty(Gs, "__esModule", { value: !0 });
const Mn = re, Qe = se, P_ = mt, Fn = M, O_ = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Qe._)`{additionalProperty: ${e.additionalProperty}}`
}, N_ = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: O_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: o, it: a } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, Fn.alwaysValidSchema)(a, r))
      return;
    const f = (0, Mn.allSchemaProperties)(n.properties), u = (0, Mn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Qe._)`${o} === ${P_.default.errors}`);
    function h() {
      t.forIn("key", s, (y) => {
        !f.length && !u.length ? v(y) : t.if(b(y), () => v(y));
      });
    }
    function b(y) {
      let p;
      if (f.length > 8) {
        const E = (0, Fn.schemaRefOrVal)(a, n.properties, "properties");
        p = (0, Mn.isOwnProperty)(t, E, y);
      } else f.length ? p = (0, Qe.or)(...f.map((E) => (0, Qe._)`${y} === ${E}`)) : p = Qe.nil;
      return u.length && (p = (0, Qe.or)(p, ...u.map((E) => (0, Qe._)`${(0, Mn.usePattern)(e, E)}.test(${y})`))), (0, Qe.not)(p);
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
      if (typeof r == "object" && !(0, Fn.alwaysValidSchema)(a, r)) {
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
        dataPropType: Fn.Type.Str
      };
      E === !1 && Object.assign(O, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(O, p);
    }
  }
};
Gs.default = N_;
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
const R_ = rt, Nc = re, fo = M, Rc = Gs, T_ = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Rc.default.code(new R_.KeywordCxt(o, Rc.default, "additionalProperties"));
    const a = (0, Nc.allSchemaProperties)(r);
    for (const h of a)
      o.definedProperties.add(h);
    o.opts.unevaluated && a.length && o.props !== !0 && (o.props = fo.mergeEvaluated.props(t, (0, fo.toHash)(a), o.props));
    const l = a.filter((h) => !(0, fo.alwaysValidSchema)(o, r[h]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const h of l)
      f(h) ? u(h) : (t.if((0, Nc.propertyInData)(t, s, h, o.opts.ownProperties)), u(h), o.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
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
ei.default = T_;
var ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
const Tc = re, Un = se, Ic = M, kc = M, I_ = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: o } = e, { opts: a } = o, l = (0, Tc.allSchemaProperties)(r), c = l.filter((_) => (0, Ic.alwaysValidSchema)(o, r[_]));
    if (l.length === 0 || c.length === l.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && s.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof Un.Name) && (o.props = (0, kc.evaluatedPropsToName)(t, o.props));
    const { props: h } = o;
    b();
    function b() {
      for (const _ of l)
        f && g(_), o.allErrors ? v(_) : (t.var(u, !0), v(_), t.if(u));
    }
    function g(_) {
      for (const y in f)
        new RegExp(_).test(y) && (0, Ic.checkStrictMode)(o, `property ${y} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function v(_) {
      t.forIn("key", n, (y) => {
        t.if((0, Un._)`${(0, Tc.usePattern)(e, _)}.test(${y})`, () => {
          const p = c.includes(_);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: y,
            dataPropType: kc.Type.Str
          }, u), o.opts.unevaluated && h !== !0 ? t.assign((0, Un._)`${h}[${y}]`, !0) : !p && !o.allErrors && t.if((0, Un.not)(u), () => t.break());
        });
      });
    }
  }
};
ti.default = I_;
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
const k_ = M, C_ = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, k_.alwaysValidSchema)(n, r)) {
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
ri.default = C_;
var ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
const j_ = re, A_ = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: j_.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
ni.default = A_;
var si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
const us = se, D_ = M, L_ = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, us._)`{passingSchemas: ${e.passing}}`
}, M_ = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: L_,
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
        (0, D_.alwaysValidSchema)(s, u) ? t.var(c, !0) : b = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, us._)`${c} && ${a}`).assign(a, !1).assign(l, (0, us._)`[${l}, ${h}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(l, h), b && e.mergeEvaluated(b, us.Name);
        });
      });
    }
  }
};
si.default = M_;
var oi = {};
Object.defineProperty(oi, "__esModule", { value: !0 });
const F_ = M, U_ = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((o, a) => {
      if ((0, F_.alwaysValidSchema)(n, o))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: a }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
oi.default = U_;
var ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
const Os = se, Ef = M, V_ = {
  message: ({ params: e }) => (0, Os.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Os._)`{failingKeyword: ${e.ifClause}}`
}, q_ = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: V_,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Ef.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Cc(n, "then"), o = Cc(n, "else");
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
function Cc(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Ef.alwaysValidSchema)(e, r);
}
ai.default = q_;
var ii = {};
Object.defineProperty(ii, "__esModule", { value: !0 });
const x_ = M, z_ = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, x_.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
ii.default = z_;
Object.defineProperty(Xa, "__esModule", { value: !0 });
const G_ = zr, K_ = Ja, B_ = Gr, H_ = Ya, W_ = Qa, X_ = gf, J_ = Za, Y_ = Gs, Q_ = ei, Z_ = ti, e$ = ri, t$ = ni, r$ = si, n$ = oi, s$ = ai, o$ = ii;
function a$(e = !1) {
  const t = [
    // any
    e$.default,
    t$.default,
    r$.default,
    n$.default,
    s$.default,
    o$.default,
    // object
    J_.default,
    Y_.default,
    X_.default,
    Q_.default,
    Z_.default
  ];
  return e ? t.push(K_.default, H_.default) : t.push(G_.default, B_.default), t.push(W_.default), t;
}
Xa.default = a$;
var ci = {}, li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
const _e = se, i$ = {
  message: ({ schemaCode: e }) => (0, _e.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, _e._)`{format: ${e}}`
}, c$ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: i$,
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
        const x = I instanceof RegExp ? (0, _e.regexpCode)(I) : c.code.formats ? (0, _e._)`${c.code.formats}${(0, _e.getProperty)(o)}` : void 0, W = r.scopeValue("formats", { key: o, ref: I, code: x });
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
li.default = c$;
Object.defineProperty(ci, "__esModule", { value: !0 });
const l$ = li, u$ = [l$.default];
ci.default = u$;
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
Object.defineProperty(Aa, "__esModule", { value: !0 });
const f$ = Da, d$ = Ma, h$ = Xa, p$ = ci, jc = Fr, m$ = [
  f$.default,
  d$.default,
  (0, h$.default)(),
  p$.default,
  jc.metadataVocabulary,
  jc.contentVocabulary
];
Aa.default = m$;
var ui = {}, Ks = {};
Object.defineProperty(Ks, "__esModule", { value: !0 });
Ks.DiscrError = void 0;
var Ac;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ac || (Ks.DiscrError = Ac = {}));
Object.defineProperty(ui, "__esModule", { value: !0 });
const Pr = se, Ko = Ks, Dc = Fe, y$ = xr, _$ = M, $$ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ko.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Pr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, g$ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: $$,
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
    t.if((0, Pr._)`typeof ${f} == "string"`, () => u(), () => e.error(!1, { discrError: Ko.DiscrError.Tag, tag: f, tagName: l })), e.ok(c);
    function u() {
      const g = b();
      t.if(!1);
      for (const v in g)
        t.elseIf((0, Pr._)`${f} === ${v}`), t.assign(c, h(g[v]));
      t.else(), e.error(!1, { discrError: Ko.DiscrError.Mapping, tag: f, tagName: l }), t.endIf();
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
        if (I != null && I.$ref && !(0, _$.schemaHasRulesButRef)(I, o.self.RULES)) {
          const W = I.$ref;
          if (I = Dc.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, W), I instanceof Dc.SchemaEnv && (I = I.schema), I === void 0)
            throw new y$.default(o.opts.uriResolver, o.baseId, W);
        }
        const x = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[l];
        if (typeof x != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        y = y && (_ || p(I)), E(x, N);
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
          for (const x of N.enum)
            O(x, I);
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
ui.default = g$;
const v$ = "http://json-schema.org/draft-07/schema#", E$ = "http://json-schema.org/draft-07/schema#", w$ = "Core schema meta-schema", S$ = {
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
}, b$ = [
  "object",
  "boolean"
], P$ = {
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
}, O$ = {
  $schema: v$,
  $id: E$,
  title: w$,
  definitions: S$,
  type: b$,
  properties: P$,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Su, n = Aa, s = ui, o = O$, a = ["/properties"], l = "http://json-schema.org/draft-07/schema";
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
  var f = rt;
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
  var h = bn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var b = xr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return b.default;
  } });
})(Fo, Fo.exports);
var N$ = Fo.exports, Bo = { exports: {} }, wf = {};
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
    float: { type: "number", validate: x },
    // C-type double
    double: { type: "number", validate: x },
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
  function x() {
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
})(wf);
var Sf = {}, Ho = { exports: {} }, bf = {}, nt = {}, Ur = {}, On = {}, te = {}, En = {};
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
var Wo = {};
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
})(Wo);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = En, r = Wo;
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
  class x extends v {
    constructor(i, d, P) {
      super(), this.name = i, this.args = d, this.async = P;
    }
    render(i) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(i);
    }
  }
  x.kind = "func";
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
      const K = this._scope.toName(i);
      return this._for(new N(C, K, d, P), () => k(K));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, d, P, k = r.varKinds.const) {
      const C = this._scope.toName(i);
      if (this.opts.es5) {
        const K = d instanceof t.Name ? d : this.var("_arr", d);
        return this.forRange("_i", 0, (0, t._)`${K}.length`, (z) => {
          this.var(C, (0, t._)`${K}[${z}]`), P(C);
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
      return this._blockNode(new x(i, d, P)), k && this.code(k).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(x);
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
    return new t._Code($._items.reduce((C, K) => (K instanceof t.Name && (K = P(K)), K instanceof t._Code ? C.push(...K._items) : C.push(K), C), []));
    function P(C) {
      const K = d[C.str];
      return K === void 0 || i[C.str] !== 1 ? C : (delete i[C.str], K);
    }
    function k(C) {
      return C instanceof t._Code && C._items.some((K) => K instanceof t.Name && i[K.str] === 1 && d[K.str] !== void 0);
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
const de = te, R$ = En;
function T$(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
F.toHash = T$;
function I$(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Pf(e, t), !Of(t, e.self.RULES.all));
}
F.alwaysValidSchema = I$;
function Pf(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const o in t)
    s[o] || Tf(e, `unknown keyword: "${o}"`);
}
F.checkUnknownRules = Pf;
function Of(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
F.schemaHasRules = Of;
function k$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
F.schemaHasRulesButRef = k$;
function C$({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, de._)`${r}`;
  }
  return (0, de._)`${e}${t}${(0, de.getProperty)(n)}`;
}
F.schemaRefOrVal = C$;
function j$(e) {
  return Nf(decodeURIComponent(e));
}
F.unescapeFragment = j$;
function A$(e) {
  return encodeURIComponent(fi(e));
}
F.escapeFragment = A$;
function fi(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
F.escapeJsonPointer = fi;
function Nf(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
F.unescapeJsonPointer = Nf;
function D$(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
F.eachItem = D$;
function Lc({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, o, a, l) => {
    const c = a === void 0 ? o : a instanceof de.Name ? (o instanceof de.Name ? e(s, o, a) : t(s, o, a), a) : o instanceof de.Name ? (t(s, a, o), o) : r(o, a);
    return l === de.Name && !(c instanceof de.Name) ? n(s, c) : c;
  };
}
F.mergeEvaluated = {
  props: Lc({
    mergeNames: (e, t, r) => e.if((0, de._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, de._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, de._)`${r} || {}`).code((0, de._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, de._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, de._)`${r} || {}`), di(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Rf
  }),
  items: Lc({
    mergeNames: (e, t, r) => e.if((0, de._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, de._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, de._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, de._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Rf(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, de._)`{}`);
  return t !== void 0 && di(e, r, t), r;
}
F.evaluatedPropsToName = Rf;
function di(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, de._)`${t}${(0, de.getProperty)(n)}`, !0));
}
F.setEvaluated = di;
const Mc = {};
function L$(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Mc[t.code] || (Mc[t.code] = new R$._Code(t.code))
  });
}
F.useFunc = L$;
var Xo;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Xo || (F.Type = Xo = {}));
function M$(e, t, r) {
  if (e instanceof de.Name) {
    const n = t === Xo.Num;
    return r ? n ? (0, de._)`"[" + ${e} + "]"` : (0, de._)`"['" + ${e} + "']"` : n ? (0, de._)`"/" + ${e}` : (0, de._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, de.getProperty)(e).toString() : "/" + fi(e);
}
F.getErrorPath = M$;
function Tf(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
F.checkStrictMode = Tf;
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
const Te = te, F$ = {
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
yt.default = F$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = F, n = yt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: p }) => p ? (0, t.str)`"${y}" keyword must be ${p} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, p = e.keywordError, E, O) {
    const { it: N } = y, { gen: I, compositeRule: x, allErrors: W } = N, ae = h(y, p, E);
    O ?? (x || W) ? c(I, ae) : f(N, (0, t._)`[${ae}]`);
  }
  e.reportError = s;
  function o(y, p = e.keywordError, E) {
    const { it: O } = y, { gen: N, compositeRule: I, allErrors: x } = O, W = h(y, p, E);
    c(N, W), I || x || f(O, n.default.vErrors);
  }
  e.reportExtraError = o;
  function a(y, p) {
    y.assign(n.default.errors, p), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(p, () => y.assign((0, t._)`${n.default.vErrors}.length`, p), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function l({ gen: y, keyword: p, schemaValue: E, data: O, errsCount: N, it: I }) {
    if (N === void 0)
      throw new Error("ajv implementation error");
    const x = y.name("err");
    y.forRange("i", N, n.default.errors, (W) => {
      y.const(x, (0, t._)`${n.default.vErrors}[${W}]`), y.if((0, t._)`${x}.instancePath === undefined`, () => y.assign((0, t._)`${x}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${x}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && (y.assign((0, t._)`${x}.schema`, E), y.assign((0, t._)`${x}.data`, O));
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
    const { keyword: N, data: I, schemaValue: x, it: W } = y, { opts: ae, propertyName: U, topSchemaRef: X, schemaPath: V } = W;
    O.push([u.keyword, N], [u.params, typeof p == "function" ? p(y) : p || (0, t._)`{}`]), ae.messages && O.push([u.message, typeof E == "function" ? E(y) : E]), ae.verbose && O.push([u.schema, x], [u.parentSchema, (0, t._)`${X}${V}`], [n.default.data, I]), U && O.push([u.propertyName, U]);
  }
})(On);
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.boolOrEmptySchema = Ur.topBoolOrEmptySchema = void 0;
const U$ = On, V$ = te, q$ = yt, x$ = {
  message: "boolean schema is false"
};
function z$(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? If(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(q$.default.data) : (t.assign((0, V$._)`${n}.errors`, null), t.return(!0));
}
Ur.topBoolOrEmptySchema = z$;
function G$(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), If(e)) : r.var(t, !0);
}
Ur.boolOrEmptySchema = G$;
function If(e, t) {
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
  (0, U$.reportError)(s, x$, void 0, t);
}
var ve = {}, yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.getRules = yr.isJSONType = void 0;
const K$ = ["string", "number", "integer", "boolean", "null", "object", "array"], B$ = new Set(K$);
function H$(e) {
  return typeof e == "string" && B$.has(e);
}
yr.isJSONType = H$;
function W$() {
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
yr.getRules = W$;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.shouldUseRule = vt.shouldUseGroup = vt.schemaHasRulesForType = void 0;
function X$({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && kf(e, n);
}
vt.schemaHasRulesForType = X$;
function kf(e, t) {
  return t.rules.some((r) => Cf(e, r));
}
vt.shouldUseGroup = kf;
function Cf(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
vt.shouldUseRule = Cf;
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.reportTypeError = ve.checkDataTypes = ve.checkDataType = ve.coerceAndCheckDataType = ve.getJSONTypes = ve.getSchemaTypes = ve.DataType = void 0;
const J$ = yr, Y$ = vt, Q$ = On, ee = te, jf = F;
var Cr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Cr || (ve.DataType = Cr = {}));
function Z$(e) {
  const t = Af(e.type);
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
ve.getSchemaTypes = Z$;
function Af(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(J$.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ve.getJSONTypes = Af;
function eg(e, t) {
  const { gen: r, data: n, opts: s } = e, o = tg(t, s.coerceTypes), a = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, Y$.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const l = hi(t, n, s.strictNumbers, Cr.Wrong);
    r.if(l, () => {
      o.length ? rg(e, t, o) : pi(e);
    });
  }
  return a;
}
ve.coerceAndCheckDataType = eg;
const Df = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function tg(e, t) {
  return t ? e.filter((r) => Df.has(r) || t === "array" && r === "array") : [];
}
function rg(e, t, r) {
  const { gen: n, data: s, opts: o } = e, a = n.let("dataType", (0, ee._)`typeof ${s}`), l = n.let("coerced", (0, ee._)`undefined`);
  o.coerceTypes === "array" && n.if((0, ee._)`${a} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, ee._)`${s}[0]`).assign(a, (0, ee._)`typeof ${s}`).if(hi(t, s, o.strictNumbers), () => n.assign(l, s))), n.if((0, ee._)`${l} !== undefined`);
  for (const f of r)
    (Df.has(f) || f === "array" && o.coerceTypes === "array") && c(f);
  n.else(), pi(e), n.endIf(), n.if((0, ee._)`${l} !== undefined`, () => {
    n.assign(s, l), ng(e, l);
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
function ng({ gen: e, parentData: t, parentDataProperty: r }, n) {
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
function hi(e, t, r, n) {
  if (e.length === 1)
    return Jo(e[0], t, r, n);
  let s;
  const o = (0, jf.toHash)(e);
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
ve.checkDataTypes = hi;
const sg = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ee._)`{type: ${e}}` : (0, ee._)`{type: ${t}}`
};
function pi(e) {
  const t = og(e);
  (0, Q$.reportError)(t, sg);
}
ve.reportTypeError = pi;
function og(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, jf.schemaRefOrVal)(e, n, "type");
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
var Bs = {};
Object.defineProperty(Bs, "__esModule", { value: !0 });
Bs.assignDefaults = void 0;
const vr = te, ag = F;
function ig(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Fc(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, o) => Fc(e, o, s.default));
}
Bs.assignDefaults = ig;
function Fc(e, t, r) {
  const { gen: n, compositeRule: s, data: o, opts: a } = e;
  if (r === void 0)
    return;
  const l = (0, vr._)`${o}${(0, vr.getProperty)(t)}`;
  if (s) {
    (0, ag.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, vr._)`${l} === undefined`;
  a.useDefaults === "empty" && (c = (0, vr._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, vr._)`${l} = ${(0, vr.stringify)(r)}`);
}
var pt = {}, ne = {};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.validateUnion = ne.validateArray = ne.usePattern = ne.callValidateCode = ne.schemaProperties = ne.allSchemaProperties = ne.noPropertyInData = ne.propertyInData = ne.isOwnProperty = ne.hasPropFunc = ne.reportMissingProp = ne.checkMissingProp = ne.checkReportMissingProp = void 0;
const me = te, mi = F, Nt = yt, cg = F;
function lg(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(_i(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, me._)`${t}` }, !0), e.error();
  });
}
ne.checkReportMissingProp = lg;
function ug({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, me.or)(...n.map((o) => (0, me.and)(_i(e, t, o, r.ownProperties), (0, me._)`${s} = ${o}`)));
}
ne.checkMissingProp = ug;
function fg(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ne.reportMissingProp = fg;
function Lf(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, me._)`Object.prototype.hasOwnProperty`
  });
}
ne.hasPropFunc = Lf;
function yi(e, t, r) {
  return (0, me._)`${Lf(e)}.call(${t}, ${r})`;
}
ne.isOwnProperty = yi;
function dg(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} !== undefined`;
  return n ? (0, me._)`${s} && ${yi(e, t, r)}` : s;
}
ne.propertyInData = dg;
function _i(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} === undefined`;
  return n ? (0, me.or)(s, (0, me.not)(yi(e, t, r))) : s;
}
ne.noPropertyInData = _i;
function Mf(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ne.allSchemaProperties = Mf;
function hg(e, t) {
  return Mf(t).filter((r) => !(0, mi.alwaysValidSchema)(e, t[r]));
}
ne.schemaProperties = hg;
function pg({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: o }, it: a }, l, c, f) {
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
ne.callValidateCode = pg;
const mg = (0, me._)`new RegExp`;
function yg({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, o = s(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, me._)`${s.code === "new RegExp" ? mg : (0, cg.useFunc)(e, s)}(${r}, ${n})`
  });
}
ne.usePattern = yg;
function _g(e) {
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
        dataPropType: mi.Type.Num
      }, o), t.if((0, me.not)(o), l);
    });
  }
}
ne.validateArray = _g;
function $g(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, mi.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
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
ne.validateUnion = $g;
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.validateKeywordUsage = pt.validSchemaType = pt.funcKeywordCode = pt.macroKeywordCode = void 0;
const je = te, fr = yt, gg = ne, vg = On;
function Eg(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: o, it: a } = e, l = t.macro.call(a.self, s, o, a), c = Ff(r, n, l);
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
pt.macroKeywordCode = Eg;
function wg(e, t) {
  var r;
  const { gen: n, keyword: s, schema: o, parentSchema: a, $data: l, it: c } = e;
  bg(c, t);
  const f = !l && t.compile ? t.compile.call(c.self, o, a, c) : t.validate, u = Ff(n, s, f), h = n.let("valid");
  e.block$data(h, b), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function b() {
    if (t.errors === !1)
      _(), t.modifying && Uc(e), y(() => e.error());
    else {
      const p = t.async ? g() : v();
      t.modifying && Uc(e), y(() => Sg(e, p));
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
    n.assign(h, (0, je._)`${p}${(0, gg.callValidateCode)(e, u, E, O)}`, t.modifying);
  }
  function y(p) {
    var E;
    n.if((0, je.not)((E = t.valid) !== null && E !== void 0 ? E : h), p);
  }
}
pt.funcKeywordCode = wg;
function Uc(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, je._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Sg(e, t) {
  const { gen: r } = e;
  r.if((0, je._)`Array.isArray(${t})`, () => {
    r.assign(fr.default.vErrors, (0, je._)`${fr.default.vErrors} === null ? ${t} : ${fr.default.vErrors}.concat(${t})`).assign(fr.default.errors, (0, je._)`${fr.default.vErrors}.length`), (0, vg.extendErrors)(e);
  }, () => e.error());
}
function bg({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Ff(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, je.stringify)(r) });
}
function Pg(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
pt.validSchemaType = Pg;
function Og({ schema: e, opts: t, self: r, errSchemaPath: n }, s, o) {
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
pt.validateKeywordUsage = Og;
var Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.extendSubschemaMode = Ft.extendSubschemaData = Ft.getSubschema = void 0;
const ut = te, Uf = F;
function Ng(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: o, topSchemaRef: a }) {
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
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Uf.escapeFragment)(r)}`
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
Ft.getSubschema = Ng;
function Rg(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: o, propertyName: a }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: u, opts: h } = t, b = l.let("data", (0, ut._)`${t.data}${(0, ut.getProperty)(r)}`, !0);
    c(b), e.errorPath = (0, ut.str)`${f}${(0, Uf.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, ut._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
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
Ft.extendSubschemaData = Rg;
function Tg(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Ft.extendSubschemaMode = Tg;
var Ne = {}, Vf = { exports: {} }, Dt = Vf.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  fs(t, n, s, e, "", e);
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
function fs(e, t, r, n, s, o, a, l, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, o, a, l, c, f);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Dt.arrayKeywords)
          for (var b = 0; b < h.length; b++)
            fs(e, t, r, h[b], s + "/" + u + "/" + b, o, s, u, n, b);
      } else if (u in Dt.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            fs(e, t, r, h[g], s + "/" + u + "/" + Ig(g), o, s, u, n, g);
      } else (u in Dt.keywords || e.allKeys && !(u in Dt.skipKeywords)) && fs(e, t, r, h, s + "/" + u, o, s, u, n);
    }
    r(n, s, o, a, l, c, f);
  }
}
function Ig(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var kg = Vf.exports;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.getSchemaRefs = Ne.resolveUrl = Ne.normalizeId = Ne._getFullPath = Ne.getFullPath = Ne.inlineRef = void 0;
const Cg = F, jg = Vs, Ag = kg, Dg = /* @__PURE__ */ new Set([
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
function Lg(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Yo(e) : t ? qf(e) <= t : !1;
}
Ne.inlineRef = Lg;
const Mg = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Yo(e) {
  for (const t in e) {
    if (Mg.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Yo) || typeof r == "object" && Yo(r))
      return !0;
  }
  return !1;
}
function qf(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Dg.has(r) && (typeof e[r] == "object" && (0, Cg.eachItem)(e[r], (n) => t += qf(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function xf(e, t = "", r) {
  r !== !1 && (t = jr(t));
  const n = e.parse(t);
  return zf(e, n);
}
Ne.getFullPath = xf;
function zf(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ne._getFullPath = zf;
const Fg = /#\/?$/;
function jr(e) {
  return e ? e.replace(Fg, "") : "";
}
Ne.normalizeId = jr;
function Ug(e, t, r) {
  return r = jr(r), e.resolve(t, r);
}
Ne.resolveUrl = Ug;
const Vg = /^[a-z_][-a-z0-9._]*$/i;
function qg(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = jr(e[r] || t), o = { "": s }, a = xf(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return Ag(e, { allKeys: !0 }, (h, b, g, v) => {
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
        if (!Vg.test(O))
          throw new Error(`invalid anchor "${O}"`);
        p.call(this, `#${O}`);
      }
    }
  }), l;
  function f(h, b, g) {
    if (b !== void 0 && !jg(h, b))
      throw u(g);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Ne.getSchemaRefs = qg;
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.getData = nt.KeywordCxt = nt.validateFunctionCode = void 0;
const Gf = Ur, Vc = ve, $i = vt, Ns = ve, xg = Bs, mn = pt, ho = Ft, H = te, Y = yt, zg = Ne, Et = F, en = On;
function Gg(e) {
  if (Hf(e) && (Wf(e), Bf(e))) {
    Hg(e);
    return;
  }
  Kf(e, () => (0, Gf.topBoolOrEmptySchema)(e));
}
nt.validateFunctionCode = Gg;
function Kf({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, o) {
  s.code.es5 ? e.func(t, (0, H._)`${Y.default.data}, ${Y.default.valCxt}`, n.$async, () => {
    e.code((0, H._)`"use strict"; ${qc(r, s)}`), Bg(e, s), e.code(o);
  }) : e.func(t, (0, H._)`${Y.default.data}, ${Kg(s)}`, n.$async, () => e.code(qc(r, s)).code(o));
}
function Kg(e) {
  return (0, H._)`{${Y.default.instancePath}="", ${Y.default.parentData}, ${Y.default.parentDataProperty}, ${Y.default.rootData}=${Y.default.data}${e.dynamicRef ? (0, H._)`, ${Y.default.dynamicAnchors}={}` : H.nil}}={}`;
}
function Bg(e, t) {
  e.if(Y.default.valCxt, () => {
    e.var(Y.default.instancePath, (0, H._)`${Y.default.valCxt}.${Y.default.instancePath}`), e.var(Y.default.parentData, (0, H._)`${Y.default.valCxt}.${Y.default.parentData}`), e.var(Y.default.parentDataProperty, (0, H._)`${Y.default.valCxt}.${Y.default.parentDataProperty}`), e.var(Y.default.rootData, (0, H._)`${Y.default.valCxt}.${Y.default.rootData}`), t.dynamicRef && e.var(Y.default.dynamicAnchors, (0, H._)`${Y.default.valCxt}.${Y.default.dynamicAnchors}`);
  }, () => {
    e.var(Y.default.instancePath, (0, H._)`""`), e.var(Y.default.parentData, (0, H._)`undefined`), e.var(Y.default.parentDataProperty, (0, H._)`undefined`), e.var(Y.default.rootData, Y.default.data), t.dynamicRef && e.var(Y.default.dynamicAnchors, (0, H._)`{}`);
  });
}
function Hg(e) {
  const { schema: t, opts: r, gen: n } = e;
  Kf(e, () => {
    r.$comment && t.$comment && Jf(e), Qg(e), n.let(Y.default.vErrors, null), n.let(Y.default.errors, 0), r.unevaluated && Wg(e), Xf(e), t0(e);
  });
}
function Wg(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, H._)`${r}.evaluated`), t.if((0, H._)`${e.evaluated}.dynamicProps`, () => t.assign((0, H._)`${e.evaluated}.props`, (0, H._)`undefined`)), t.if((0, H._)`${e.evaluated}.dynamicItems`, () => t.assign((0, H._)`${e.evaluated}.items`, (0, H._)`undefined`));
}
function qc(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, H._)`/*# sourceURL=${r} */` : H.nil;
}
function Xg(e, t) {
  if (Hf(e) && (Wf(e), Bf(e))) {
    Jg(e, t);
    return;
  }
  (0, Gf.boolOrEmptySchema)(e, t);
}
function Bf({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Hf(e) {
  return typeof e.schema != "boolean";
}
function Jg(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Jf(e), Zg(e), e0(e);
  const o = n.const("_errs", Y.default.errors);
  Xf(e, o), n.var(t, (0, H._)`${o} === ${Y.default.errors}`);
}
function Wf(e) {
  (0, Et.checkUnknownRules)(e), Yg(e);
}
function Xf(e, t) {
  if (e.opts.jtd)
    return xc(e, [], !1, t);
  const r = (0, Vc.getSchemaTypes)(e.schema), n = (0, Vc.coerceAndCheckDataType)(e, r);
  xc(e, r, !n, t);
}
function Yg(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Et.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Qg(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Et.checkStrictMode)(e, "default is ignored in the schema root");
}
function Zg(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, zg.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function e0(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Jf({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const o = r.$comment;
  if (s.$comment === !0)
    e.code((0, H._)`${Y.default.self}.logger.log(${o})`);
  else if (typeof s.$comment == "function") {
    const a = (0, H.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, H._)`${Y.default.self}.opts.$comment(${o}, ${a}, ${l}.schema)`);
  }
}
function t0(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: o } = e;
  r.$async ? t.if((0, H._)`${Y.default.errors} === 0`, () => t.return(Y.default.data), () => t.throw((0, H._)`new ${s}(${Y.default.vErrors})`)) : (t.assign((0, H._)`${n}.errors`, Y.default.vErrors), o.unevaluated && r0(e), t.return((0, H._)`${Y.default.errors} === 0`));
}
function r0({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof H.Name && e.assign((0, H._)`${t}.props`, r), n instanceof H.Name && e.assign((0, H._)`${t}.items`, n);
}
function xc(e, t, r, n) {
  const { gen: s, schema: o, data: a, allErrors: l, opts: c, self: f } = e, { RULES: u } = f;
  if (o.$ref && (c.ignoreKeywordsWithRef || !(0, Et.schemaHasRulesButRef)(o, u))) {
    s.block(() => Zf(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || n0(e, t), s.block(() => {
    for (const b of u.rules)
      h(b);
    h(u.post);
  });
  function h(b) {
    (0, $i.shouldUseGroup)(o, b) && (b.type ? (s.if((0, Ns.checkDataType)(b.type, a, c.strictNumbers)), zc(e, b), t.length === 1 && t[0] === b.type && r && (s.else(), (0, Ns.reportTypeError)(e)), s.endIf()) : zc(e, b), l || s.if((0, H._)`${Y.default.errors} === ${n || 0}`));
  }
}
function zc(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, xg.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, $i.shouldUseRule)(n, o) && Zf(e, o.keyword, o.definition, t.type);
  });
}
function n0(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (s0(e, t), e.opts.allowUnionTypes || o0(e, t), a0(e, e.dataTypes));
}
function s0(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Yf(e.dataTypes, r) || gi(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), c0(e, t);
  }
}
function o0(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && gi(e, "use allowUnionTypes to allow union type keyword");
}
function a0(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, $i.shouldUseRule)(e.schema, s)) {
      const { type: o } = s.definition;
      o.length && !o.some((a) => i0(t, a)) && gi(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function i0(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Yf(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function c0(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Yf(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function gi(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Et.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Qf {
  constructor(t, r, n) {
    if ((0, mn.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Et.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", ed(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, mn.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    return Xg(s, r), s;
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
nt.KeywordCxt = Qf;
function Zf(e, t, r, n) {
  const s = new Qf(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, mn.funcKeywordCode)(s, r) : "macro" in r ? (0, mn.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, mn.funcKeywordCode)(s, r);
}
const l0 = /^\/(?:[^~]|~0|~1)*$/, u0 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function ed(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, o;
  if (e === "")
    return Y.default.rootData;
  if (e[0] === "/") {
    if (!l0.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, o = Y.default.rootData;
  } else {
    const f = u0.exec(e);
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
nt.getData = ed;
var Nn = {};
Object.defineProperty(Nn, "__esModule", { value: !0 });
class f0 extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Nn.default = f0;
var Kr = {};
Object.defineProperty(Kr, "__esModule", { value: !0 });
const po = Ne;
class d0 extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, po.resolveUrl)(t, r, n), this.missingSchema = (0, po.normalizeId)((0, po.getFullPath)(t, this.missingRef));
  }
}
Kr.default = d0;
var Ue = {};
Object.defineProperty(Ue, "__esModule", { value: !0 });
Ue.resolveSchema = Ue.getCompilingSchema = Ue.resolveRef = Ue.compileSchema = Ue.SchemaEnv = void 0;
const Je = te, h0 = Nn, nr = yt, tt = Ne, Gc = F, p0 = nt;
class Hs {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, tt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Ue.SchemaEnv = Hs;
function vi(e) {
  const t = td.call(this, e);
  if (t)
    return t;
  const r = (0, tt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: o } = this.opts, a = new Je.CodeGen(this.scope, { es5: n, lines: s, ownProperties: o });
  let l;
  e.$async && (l = a.scopeValue("Error", {
    ref: h0.default,
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
    this._compilations.add(e), (0, p0.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
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
Ue.compileSchema = vi;
function m0(e, t, r) {
  var n;
  r = (0, tt.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let o = $0.call(this, e, r);
  if (o === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    a && (o = new Hs({ schema: a, schemaId: l, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = y0.call(this, o);
}
Ue.resolveRef = m0;
function y0(e) {
  return (0, tt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : vi.call(this, e);
}
function td(e) {
  for (const t of this._compilations)
    if (_0(t, e))
      return t;
}
Ue.getCompilingSchema = td;
function _0(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function $0(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Ws.call(this, e, t);
}
function Ws(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, tt._getFullPath)(this.opts.uriResolver, r);
  let s = (0, tt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return mo.call(this, r, e);
  const o = (0, tt.normalizeId)(n), a = this.refs[o] || this.schemas[o];
  if (typeof a == "string") {
    const l = Ws.call(this, e, a);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : mo.call(this, r, l);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || vi.call(this, a), o === (0, tt.normalizeId)(t)) {
      const { schema: l } = a, { schemaId: c } = this.opts, f = l[c];
      return f && (s = (0, tt.resolveUrl)(this.opts.uriResolver, s, f)), new Hs({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return mo.call(this, r, a);
  }
}
Ue.resolveSchema = Ws;
const g0 = /* @__PURE__ */ new Set([
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
    const c = r[(0, Gc.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !g0.has(l) && f && (t = (0, tt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, Gc.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, tt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = Ws.call(this, n, l);
  }
  const { schemaId: a } = this.opts;
  if (o = o || new Hs({ schema: r, schemaId: a, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const v0 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", E0 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", w0 = "object", S0 = [
  "$data"
], b0 = {
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
}, P0 = !1, O0 = {
  $id: v0,
  description: E0,
  type: w0,
  required: S0,
  properties: b0,
  additionalProperties: P0
};
var Ei = {};
Object.defineProperty(Ei, "__esModule", { value: !0 });
const rd = df;
rd.code = 'require("ajv/dist/runtime/uri").default';
Ei.default = rd;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = nt;
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
  const n = Nn, s = Kr, o = yr, a = Ue, l = te, c = Ne, f = ve, u = F, h = O0, b = Ei, g = (w, m) => new RegExp(w, m);
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
    var m, S, $, i, d, P, k, C, K, z, oe, Ve, qt, xt, zt, Gt, Kt, Bt, Ht, Wt, Xt, Jt, Yt, Qt, Zt;
    const We = w.strict, er = (m = w.code) === null || m === void 0 ? void 0 : m.optimize, Jr = er === !0 || er === void 0 ? 1 : er || 0, Yr = ($ = (S = w.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : g, ao = (i = w.uriResolver) !== null && i !== void 0 ? i : b.default;
    return {
      strictSchema: (P = (d = w.strictSchema) !== null && d !== void 0 ? d : We) !== null && P !== void 0 ? P : !0,
      strictNumbers: (C = (k = w.strictNumbers) !== null && k !== void 0 ? k : We) !== null && C !== void 0 ? C : !0,
      strictTypes: (z = (K = w.strictTypes) !== null && K !== void 0 ? K : We) !== null && z !== void 0 ? z : "log",
      strictTuples: (Ve = (oe = w.strictTuples) !== null && oe !== void 0 ? oe : We) !== null && Ve !== void 0 ? Ve : "log",
      strictRequired: (xt = (qt = w.strictRequired) !== null && qt !== void 0 ? qt : We) !== null && xt !== void 0 ? xt : !1,
      code: w.code ? { ...w.code, optimize: Jr, regExp: Yr } : { optimize: Jr, regExp: Yr },
      loopRequired: (zt = w.loopRequired) !== null && zt !== void 0 ? zt : E,
      loopEnum: (Gt = w.loopEnum) !== null && Gt !== void 0 ? Gt : E,
      meta: (Kt = w.meta) !== null && Kt !== void 0 ? Kt : !0,
      messages: (Bt = w.messages) !== null && Bt !== void 0 ? Bt : !0,
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
      async function i(z, oe) {
        await d.call(this, z.$schema);
        const Ve = this._addSchema(z, oe);
        return Ve.validate || P.call(this, Ve);
      }
      async function d(z) {
        z && !this.getSchema(z) && await i.call(this, { $ref: z }, !0);
      }
      async function P(z) {
        try {
          return this._compileSchemaEnv(z);
        } catch (oe) {
          if (!(oe instanceof s.default))
            throw oe;
          return k.call(this, oe), await C.call(this, oe.missingSchema), P.call(this, z);
        }
      }
      function k({ missingSchema: z, missingRef: oe }) {
        if (this.refs[z])
          throw new Error(`AnySchema ${z} is loaded but ${oe} cannot be resolved`);
      }
      async function C(z) {
        const oe = await K.call(this, z);
        this.refs[z] || await d.call(this, oe.$schema), this.refs[z] || this.addSchema(oe, z, S);
      }
      async function K(z) {
        const oe = this._loading[z];
        if (oe)
          return oe;
        try {
          return await (this._loading[z] = $(z));
        } finally {
          delete this._loading[z];
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
      for (; typeof (S = x.call(this, m)) == "string"; )
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
          const S = x.call(this, m);
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
          const { $data: K } = C.definition, z = P[k];
          K && z && (P[k] = T(z));
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
      const K = c.getSchemaRefs.call(this, m, $);
      return C = new a.SchemaEnv({ schema: m, schemaId: k, meta: S, baseId: $, localRefs: K }), this._cache.set(C.schema, C), d && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = C), i && this.validateSchema(m, !0), C;
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
  function x(w) {
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
})(bf);
var wi = {}, Si = {}, bi = {};
Object.defineProperty(bi, "__esModule", { value: !0 });
const N0 = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
bi.default = N0;
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.callRef = _r.getValidate = void 0;
const R0 = Kr, Kc = ne, Me = te, Er = yt, Bc = Ue, Vn = F, T0 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: o, validateName: a, opts: l, self: c } = n, { root: f } = o;
    if ((r === "#" || r === "#/") && s === f.baseId)
      return h();
    const u = Bc.resolveRef.call(c, f, s, r);
    if (u === void 0)
      throw new R0.default(n.opts.uriResolver, s, r);
    if (u instanceof Bc.SchemaEnv)
      return b(u);
    return g(u);
    function h() {
      if (o === f)
        return ds(e, a, o, o.$async);
      const v = t.scopeValue("root", { ref: f });
      return ds(e, (0, Me._)`${v}.validate`, f, f.$async);
    }
    function b(v) {
      const _ = nd(e, v);
      ds(e, _, v, v.$async);
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
function nd(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Me._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
_r.getValidate = nd;
function ds(e, t, r, n) {
  const { gen: s, it: o } = e, { allErrors: a, schemaEnv: l, opts: c } = o, f = c.passContext ? Er.default.this : Me.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Me._)`await ${(0, Kc.callValidateCode)(e, t, f)}`), g(t), a || s.assign(v, !0);
    }, (_) => {
      s.if((0, Me._)`!(${_} instanceof ${o.ValidationError})`, () => s.throw(_)), b(_), a || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, Kc.callValidateCode)(e, t, f), () => g(t), () => b(t));
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
        y.props !== void 0 && (o.props = Vn.mergeEvaluated.props(s, y.props, o.props));
      else {
        const p = s.var("props", (0, Me._)`${v}.evaluated.props`);
        o.props = Vn.mergeEvaluated.props(s, p, o.props, Me.Name);
      }
    if (o.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (o.items = Vn.mergeEvaluated.items(s, y.items, o.items));
      else {
        const p = s.var("items", (0, Me._)`${v}.evaluated.items`);
        o.items = Vn.mergeEvaluated.items(s, p, o.items, Me.Name);
      }
  }
}
_r.callRef = ds;
_r.default = T0;
Object.defineProperty(Si, "__esModule", { value: !0 });
const I0 = bi, k0 = _r, C0 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  I0.default,
  k0.default
];
Si.default = C0;
var Pi = {}, Oi = {};
Object.defineProperty(Oi, "__esModule", { value: !0 });
const Rs = te, Rt = Rs.operators, Ts = {
  maximum: { okStr: "<=", ok: Rt.LTE, fail: Rt.GT },
  minimum: { okStr: ">=", ok: Rt.GTE, fail: Rt.LT },
  exclusiveMaximum: { okStr: "<", ok: Rt.LT, fail: Rt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Rt.GT, fail: Rt.LTE }
}, j0 = {
  message: ({ keyword: e, schemaCode: t }) => (0, Rs.str)`must be ${Ts[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Rs._)`{comparison: ${Ts[e].okStr}, limit: ${t}}`
}, A0 = {
  keyword: Object.keys(Ts),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: j0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Rs._)`${r} ${Ts[t].fail} ${n} || isNaN(${r})`);
  }
};
Oi.default = A0;
var Ni = {};
Object.defineProperty(Ni, "__esModule", { value: !0 });
const yn = te, D0 = {
  message: ({ schemaCode: e }) => (0, yn.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, yn._)`{multipleOf: ${e}}`
}, L0 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: D0,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, o = s.opts.multipleOfPrecision, a = t.let("res"), l = o ? (0, yn._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, yn._)`${a} !== parseInt(${a})`;
    e.fail$data((0, yn._)`(${n} === 0 || (${a} = ${r}/${n}, ${l}))`);
  }
};
Ni.default = L0;
var Ri = {}, Ti = {};
Object.defineProperty(Ti, "__esModule", { value: !0 });
function sd(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ti.default = sd;
sd.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ri, "__esModule", { value: !0 });
const dr = te, M0 = F, F0 = Ti, U0 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, dr.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, dr._)`{limit: ${e}}`
}, V0 = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: U0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, o = t === "maxLength" ? dr.operators.GT : dr.operators.LT, a = s.opts.unicode === !1 ? (0, dr._)`${r}.length` : (0, dr._)`${(0, M0.useFunc)(e.gen, F0.default)}(${r})`;
    e.fail$data((0, dr._)`${a} ${o} ${n}`);
  }
};
Ri.default = V0;
var Ii = {};
Object.defineProperty(Ii, "__esModule", { value: !0 });
const q0 = ne, Is = te, x0 = {
  message: ({ schemaCode: e }) => (0, Is.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Is._)`{pattern: ${e}}`
}, z0 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: x0,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: o } = e, a = o.opts.unicodeRegExp ? "u" : "", l = r ? (0, Is._)`(new RegExp(${s}, ${a}))` : (0, q0.usePattern)(e, n);
    e.fail$data((0, Is._)`!${l}.test(${t})`);
  }
};
Ii.default = z0;
var ki = {};
Object.defineProperty(ki, "__esModule", { value: !0 });
const _n = te, G0 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, _n.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, _n._)`{limit: ${e}}`
}, K0 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: G0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? _n.operators.GT : _n.operators.LT;
    e.fail$data((0, _n._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
ki.default = K0;
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
const tn = ne, $n = te, B0 = F, H0 = {
  message: ({ params: { missingProperty: e } }) => (0, $n.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, $n._)`{missingProperty: ${e}}`
}, W0 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: H0,
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
        e.block$data($n.nil, h);
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
        t.assign(v, (0, tn.propertyInData)(t, s, g, l.ownProperties)), t.if((0, $n.not)(v), () => {
          e.error(), t.break();
        });
      }, $n.nil);
    }
  }
};
Ci.default = W0;
var ji = {};
Object.defineProperty(ji, "__esModule", { value: !0 });
const gn = te, X0 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, gn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, gn._)`{limit: ${e}}`
}, J0 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: X0,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? gn.operators.GT : gn.operators.LT;
    e.fail$data((0, gn._)`${r}.length ${s} ${n}`);
  }
};
ji.default = J0;
var Ai = {}, Rn = {};
Object.defineProperty(Rn, "__esModule", { value: !0 });
const od = Vs;
od.code = 'require("ajv/dist/runtime/equal").default';
Rn.default = od;
Object.defineProperty(Ai, "__esModule", { value: !0 });
const yo = ve, be = te, Y0 = F, Q0 = Rn, Z0 = {
  message: ({ params: { i: e, j: t } }) => (0, be.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, be._)`{i: ${e}, j: ${t}}`
}, ev = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Z0,
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
      const y = (0, Y0.useFunc)(t, Q0.default), p = t.name("outer");
      t.label(p).for((0, be._)`;${v}--;`, () => t.for((0, be._)`${_} = ${v}; ${_}--;`, () => t.if((0, be._)`${y}(${r}[${v}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
Ai.default = ev;
var Di = {};
Object.defineProperty(Di, "__esModule", { value: !0 });
const Qo = te, tv = F, rv = Rn, nv = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Qo._)`{allowedValue: ${e}}`
}, sv = {
  keyword: "const",
  $data: !0,
  error: nv,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, Qo._)`!${(0, tv.useFunc)(t, rv.default)}(${r}, ${s})`) : e.fail((0, Qo._)`${o} !== ${r}`);
  }
};
Di.default = sv;
var Li = {};
Object.defineProperty(Li, "__esModule", { value: !0 });
const ln = te, ov = F, av = Rn, iv = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, ln._)`{allowedValues: ${e}}`
}, cv = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: iv,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: o, it: a } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= a.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, ov.useFunc)(t, av.default));
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
Li.default = cv;
Object.defineProperty(Pi, "__esModule", { value: !0 });
const lv = Oi, uv = Ni, fv = Ri, dv = Ii, hv = ki, pv = Ci, mv = ji, yv = Ai, _v = Di, $v = Li, gv = [
  // number
  lv.default,
  uv.default,
  // string
  fv.default,
  dv.default,
  // object
  hv.default,
  pv.default,
  // array
  mv.default,
  yv.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  _v.default,
  $v.default
];
Pi.default = gv;
var Mi = {}, Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.validateAdditionalItems = void 0;
const hr = te, Zo = F, vv = {
  message: ({ params: { len: e } }) => (0, hr.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, hr._)`{limit: ${e}}`
}, Ev = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: vv,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Zo.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    ad(e, n);
  }
};
function ad(e, t) {
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
Br.validateAdditionalItems = ad;
Br.default = Ev;
var Fi = {}, Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.validateTuple = void 0;
const Hc = te, hs = F, wv = ne, Sv = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return id(e, "additionalItems", t);
    r.items = !0, !(0, hs.alwaysValidSchema)(r, t) && e.ok((0, wv.validateArray)(e));
  }
};
function id(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: o, keyword: a, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = hs.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), f = n.const("len", (0, Hc._)`${o}.length`);
  r.forEach((h, b) => {
    (0, hs.alwaysValidSchema)(l, h) || (n.if((0, Hc._)`${f} > ${b}`, () => e.subschema({
      keyword: a,
      schemaProp: b,
      dataProp: b
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: b, errSchemaPath: g } = l, v = r.length, _ = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (b.strictTuples && !_) {
      const y = `"${a}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, hs.checkStrictMode)(l, y, b.strictTuples);
    }
  }
}
Hr.validateTuple = id;
Hr.default = Sv;
Object.defineProperty(Fi, "__esModule", { value: !0 });
const bv = Hr, Pv = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, bv.validateTuple)(e, "items")
};
Fi.default = Pv;
var Ui = {};
Object.defineProperty(Ui, "__esModule", { value: !0 });
const Wc = te, Ov = F, Nv = ne, Rv = Br, Tv = {
  message: ({ params: { len: e } }) => (0, Wc.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Wc._)`{limit: ${e}}`
}, Iv = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Tv,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Ov.alwaysValidSchema)(n, t) && (s ? (0, Rv.validateAdditionalItems)(e, s) : e.ok((0, Nv.validateArray)(e)));
  }
};
Ui.default = Iv;
var Vi = {};
Object.defineProperty(Vi, "__esModule", { value: !0 });
const He = te, qn = F, kv = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He.str)`must contain at least ${e} valid item(s)` : (0, He.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He._)`{minContains: ${e}}` : (0, He._)`{minContains: ${e}, maxContains: ${t}}`
}, Cv = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: kv,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    let a, l;
    const { minContains: c, maxContains: f } = n;
    o.opts.next ? (a = c === void 0 ? 1 : c, l = f) : a = 1;
    const u = t.const("len", (0, He._)`${s}.length`);
    if (e.setParams({ min: a, max: l }), l === void 0 && a === 0) {
      (0, qn.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && a > l) {
      (0, qn.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, qn.alwaysValidSchema)(o, r)) {
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
          dataPropType: qn.Type.Num,
          compositeRule: !0
        }, _), y();
      });
    }
    function v(_) {
      t.code((0, He._)`${_}++`), l === void 0 ? t.if((0, He._)`${_} >= ${a}`, () => t.assign(h, !0).break()) : (t.if((0, He._)`${_} > ${l}`, () => t.assign(h, !1).break()), a === 1 ? t.assign(h, !0) : t.if((0, He._)`${_} >= ${a}`, () => t.assign(h, !0)));
    }
  }
};
Vi.default = Cv;
var cd = {};
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
})(cd);
var qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
const ld = te, jv = F, Av = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, ld._)`{propertyName: ${e.propertyName}}`
}, Dv = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Av,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, jv.alwaysValidSchema)(s, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, o), t.if((0, ld.not)(o), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
qi.default = Dv;
var Xs = {};
Object.defineProperty(Xs, "__esModule", { value: !0 });
const xn = ne, Ze = te, Lv = yt, zn = F, Mv = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ze._)`{additionalProperty: ${e.additionalProperty}}`
}, Fv = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Mv,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: o, it: a } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, zn.alwaysValidSchema)(a, r))
      return;
    const f = (0, xn.allSchemaProperties)(n.properties), u = (0, xn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Ze._)`${o} === ${Lv.default.errors}`);
    function h() {
      t.forIn("key", s, (y) => {
        !f.length && !u.length ? v(y) : t.if(b(y), () => v(y));
      });
    }
    function b(y) {
      let p;
      if (f.length > 8) {
        const E = (0, zn.schemaRefOrVal)(a, n.properties, "properties");
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
      if (typeof r == "object" && !(0, zn.alwaysValidSchema)(a, r)) {
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
        dataPropType: zn.Type.Str
      };
      E === !1 && Object.assign(O, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(O, p);
    }
  }
};
Xs.default = Fv;
var xi = {};
Object.defineProperty(xi, "__esModule", { value: !0 });
const Uv = nt, Xc = ne, _o = F, Jc = Xs, Vv = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Jc.default.code(new Uv.KeywordCxt(o, Jc.default, "additionalProperties"));
    const a = (0, Xc.allSchemaProperties)(r);
    for (const h of a)
      o.definedProperties.add(h);
    o.opts.unevaluated && a.length && o.props !== !0 && (o.props = _o.mergeEvaluated.props(t, (0, _o.toHash)(a), o.props));
    const l = a.filter((h) => !(0, _o.alwaysValidSchema)(o, r[h]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const h of l)
      f(h) ? u(h) : (t.if((0, Xc.propertyInData)(t, s, h, o.opts.ownProperties)), u(h), o.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
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
xi.default = Vv;
var zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
const Yc = ne, Gn = te, Qc = F, Zc = F, qv = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: o } = e, { opts: a } = o, l = (0, Yc.allSchemaProperties)(r), c = l.filter((_) => (0, Qc.alwaysValidSchema)(o, r[_]));
    if (l.length === 0 || c.length === l.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && s.properties, u = t.name("valid");
    o.props !== !0 && !(o.props instanceof Gn.Name) && (o.props = (0, Zc.evaluatedPropsToName)(t, o.props));
    const { props: h } = o;
    b();
    function b() {
      for (const _ of l)
        f && g(_), o.allErrors ? v(_) : (t.var(u, !0), v(_), t.if(u));
    }
    function g(_) {
      for (const y in f)
        new RegExp(_).test(y) && (0, Qc.checkStrictMode)(o, `property ${y} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function v(_) {
      t.forIn("key", n, (y) => {
        t.if((0, Gn._)`${(0, Yc.usePattern)(e, _)}.test(${y})`, () => {
          const p = c.includes(_);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: y,
            dataPropType: Zc.Type.Str
          }, u), o.opts.unevaluated && h !== !0 ? t.assign((0, Gn._)`${h}[${y}]`, !0) : !p && !o.allErrors && t.if((0, Gn.not)(u), () => t.break());
        });
      });
    }
  }
};
zi.default = qv;
var Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
const xv = F, zv = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, xv.alwaysValidSchema)(n, r)) {
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
Gi.default = zv;
var Ki = {};
Object.defineProperty(Ki, "__esModule", { value: !0 });
const Gv = ne, Kv = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Gv.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ki.default = Kv;
var Bi = {};
Object.defineProperty(Bi, "__esModule", { value: !0 });
const ps = te, Bv = F, Hv = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ps._)`{passingSchemas: ${e.passing}}`
}, Wv = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Hv,
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
        }, c), h > 0 && t.if((0, ps._)`${c} && ${a}`).assign(a, !1).assign(l, (0, ps._)`[${l}, ${h}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(l, h), b && e.mergeEvaluated(b, ps.Name);
        });
      });
    }
  }
};
Bi.default = Wv;
var Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
const Xv = F, Jv = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((o, a) => {
      if ((0, Xv.alwaysValidSchema)(n, o))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: a }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
Hi.default = Jv;
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
const ks = te, ud = F, Yv = {
  message: ({ params: e }) => (0, ks.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, ks._)`{failingKeyword: ${e.ifClause}}`
}, Qv = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Yv,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, ud.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = el(n, "then"), o = el(n, "else");
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
function el(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, ud.alwaysValidSchema)(e, r);
}
Wi.default = Qv;
var Xi = {};
Object.defineProperty(Xi, "__esModule", { value: !0 });
const Zv = F, eE = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Zv.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Xi.default = eE;
Object.defineProperty(Mi, "__esModule", { value: !0 });
const tE = Br, rE = Fi, nE = Hr, sE = Ui, oE = Vi, aE = cd, iE = qi, cE = Xs, lE = xi, uE = zi, fE = Gi, dE = Ki, hE = Bi, pE = Hi, mE = Wi, yE = Xi;
function _E(e = !1) {
  const t = [
    // any
    fE.default,
    dE.default,
    hE.default,
    pE.default,
    mE.default,
    yE.default,
    // object
    iE.default,
    cE.default,
    aE.default,
    lE.default,
    uE.default
  ];
  return e ? t.push(rE.default, sE.default) : t.push(tE.default, nE.default), t.push(oE.default), t;
}
Mi.default = _E;
var Ji = {}, Yi = {};
Object.defineProperty(Yi, "__esModule", { value: !0 });
const $e = te, $E = {
  message: ({ schemaCode: e }) => (0, $e.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, $e._)`{format: ${e}}`
}, gE = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: $E,
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
        const x = I instanceof RegExp ? (0, $e.regexpCode)(I) : c.code.formats ? (0, $e._)`${c.code.formats}${(0, $e.getProperty)(o)}` : void 0, W = r.scopeValue("formats", { key: o, ref: I, code: x });
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
Yi.default = gE;
Object.defineProperty(Ji, "__esModule", { value: !0 });
const vE = Yi, EE = [vE.default];
Ji.default = EE;
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
Object.defineProperty(wi, "__esModule", { value: !0 });
const wE = Si, SE = Pi, bE = Mi, PE = Ji, tl = Vr, OE = [
  wE.default,
  SE.default,
  (0, bE.default)(),
  PE.default,
  tl.metadataVocabulary,
  tl.contentVocabulary
];
wi.default = OE;
var Qi = {}, Js = {};
Object.defineProperty(Js, "__esModule", { value: !0 });
Js.DiscrError = void 0;
var rl;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(rl || (Js.DiscrError = rl = {}));
Object.defineProperty(Qi, "__esModule", { value: !0 });
const Or = te, ea = Js, nl = Ue, NE = Kr, RE = F, TE = {
  message: ({ params: { discrError: e, tagName: t } }) => e === ea.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Or._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, IE = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: TE,
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
        if (I != null && I.$ref && !(0, RE.schemaHasRulesButRef)(I, o.self.RULES)) {
          const W = I.$ref;
          if (I = nl.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, W), I instanceof nl.SchemaEnv && (I = I.schema), I === void 0)
            throw new NE.default(o.opts.uriResolver, o.baseId, W);
        }
        const x = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[l];
        if (typeof x != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        y = y && (_ || p(I)), E(x, N);
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
          for (const x of N.enum)
            O(x, I);
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
Qi.default = IE;
const kE = "http://json-schema.org/draft-07/schema#", CE = "http://json-schema.org/draft-07/schema#", jE = "Core schema meta-schema", AE = {
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
}, DE = [
  "object",
  "boolean"
], LE = {
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
}, ME = {
  $schema: kE,
  $id: CE,
  title: jE,
  definitions: AE,
  type: DE,
  properties: LE,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = bf, n = wi, s = Qi, o = ME, a = ["/properties"], l = "http://json-schema.org/draft-07/schema";
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
  var h = Nn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var b = Kr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return b.default;
  } });
})(Ho, Ho.exports);
var FE = Ho.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = FE, r = te, n = r.operators, s = {
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
})(Sf);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = wf, n = Sf, s = te, o = new s.Name("fullFormats"), a = new s.Name("fastFormats"), l = (f, u = { keywords: !0 }) => {
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
})(Bo, Bo.exports);
var UE = Bo.exports;
const VE = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), o = Object.getOwnPropertyDescriptor(t, r);
  !qE(s, o) && n || Object.defineProperty(e, r, o);
}, qE = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, xE = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, zE = (e, t) => `/* Wrapped ${e}*/
${t}`, GE = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), KE = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), BE = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = zE.bind(null, n, t.toString());
  Object.defineProperty(s, "name", KE), Object.defineProperty(e, "toString", { ...GE, value: s });
}, HE = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    VE(e, t, s, r);
  return xE(e, t), BE(e, t, n), e;
};
var WE = HE;
const XE = WE;
var JE = (e, t = {}) => {
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
  return XE(l, e), l.cancel = () => {
    o && (clearTimeout(o), o = void 0);
  }, l;
}, ta = { exports: {} };
const YE = "2.0.0", fd = 256, QE = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, ZE = 16, ew = fd - 6, tw = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ys = {
  MAX_LENGTH: fd,
  MAX_SAFE_COMPONENT_LENGTH: ZE,
  MAX_SAFE_BUILD_LENGTH: ew,
  MAX_SAFE_INTEGER: QE,
  RELEASE_TYPES: tw,
  SEMVER_SPEC_VERSION: YE,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const rw = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Qs = rw;
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
var Tn = ta.exports;
const nw = Object.freeze({ loose: !0 }), sw = Object.freeze({}), ow = (e) => e ? typeof e != "object" ? nw : e : sw;
var Zi = ow;
const sl = /^[0-9]+$/, dd = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = sl.test(e), n = sl.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, aw = (e, t) => dd(t, e);
var hd = {
  compareIdentifiers: dd,
  rcompareIdentifiers: aw
};
const Kn = Qs, { MAX_LENGTH: ol, MAX_SAFE_INTEGER: Bn } = Ys, { safeRe: Hn, t: Wn } = Tn, iw = Zi, { compareIdentifiers: $o } = hd;
let cw = class it {
  constructor(t, r) {
    if (r = iw(r), t instanceof it) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > ol)
      throw new TypeError(
        `version is longer than ${ol} characters`
      );
    Kn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Hn[Wn.LOOSE] : Hn[Wn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Bn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Bn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Bn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const o = +s;
        if (o >= 0 && o < Bn)
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
    if (Kn("SemVer.compare", this.version, this.options, t), !(t instanceof it)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new it(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof it || (t = new it(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof it || (t = new it(t, this.options)), this.prerelease.length && !t.prerelease.length)
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
    t instanceof it || (t = new it(t, this.options));
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
        const s = `-${r}`.match(this.options.loose ? Hn[Wn.PRERELEASELOOSE] : Hn[Wn.PRERELEASE]);
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
var Ae = cw;
const al = Ae, lw = (e, t, r = !1) => {
  if (e instanceof al)
    return e;
  try {
    return new al(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Wr = lw;
const uw = Wr, fw = (e, t) => {
  const r = uw(e, t);
  return r ? r.version : null;
};
var dw = fw;
const hw = Wr, pw = (e, t) => {
  const r = hw(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var mw = pw;
const il = Ae, yw = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new il(
      e instanceof il ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var _w = yw;
const cl = Wr, $w = (e, t) => {
  const r = cl(e, null, !0), n = cl(t, null, !0), s = r.compare(n);
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
var gw = $w;
const vw = Ae, Ew = (e, t) => new vw(e, t).major;
var ww = Ew;
const Sw = Ae, bw = (e, t) => new Sw(e, t).minor;
var Pw = bw;
const Ow = Ae, Nw = (e, t) => new Ow(e, t).patch;
var Rw = Nw;
const Tw = Wr, Iw = (e, t) => {
  const r = Tw(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var kw = Iw;
const ll = Ae, Cw = (e, t, r) => new ll(e, r).compare(new ll(t, r));
var st = Cw;
const jw = st, Aw = (e, t, r) => jw(t, e, r);
var Dw = Aw;
const Lw = st, Mw = (e, t) => Lw(e, t, !0);
var Fw = Mw;
const ul = Ae, Uw = (e, t, r) => {
  const n = new ul(e, r), s = new ul(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var ec = Uw;
const Vw = ec, qw = (e, t) => e.sort((r, n) => Vw(r, n, t));
var xw = qw;
const zw = ec, Gw = (e, t) => e.sort((r, n) => zw(n, r, t));
var Kw = Gw;
const Bw = st, Hw = (e, t, r) => Bw(e, t, r) > 0;
var Zs = Hw;
const Ww = st, Xw = (e, t, r) => Ww(e, t, r) < 0;
var tc = Xw;
const Jw = st, Yw = (e, t, r) => Jw(e, t, r) === 0;
var pd = Yw;
const Qw = st, Zw = (e, t, r) => Qw(e, t, r) !== 0;
var md = Zw;
const eS = st, tS = (e, t, r) => eS(e, t, r) >= 0;
var rc = tS;
const rS = st, nS = (e, t, r) => rS(e, t, r) <= 0;
var nc = nS;
const sS = pd, oS = md, aS = Zs, iS = rc, cS = tc, lS = nc, uS = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return sS(e, r, n);
    case "!=":
      return oS(e, r, n);
    case ">":
      return aS(e, r, n);
    case ">=":
      return iS(e, r, n);
    case "<":
      return cS(e, r, n);
    case "<=":
      return lS(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var yd = uS;
const fS = Ae, dS = Wr, { safeRe: Xn, t: Jn } = Tn, hS = (e, t) => {
  if (e instanceof fS)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Xn[Jn.COERCEFULL] : Xn[Jn.COERCE]);
  else {
    const c = t.includePrerelease ? Xn[Jn.COERCERTLFULL] : Xn[Jn.COERCERTL];
    let f;
    for (; (f = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), c.lastIndex = f.index + f[1].length + f[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", l = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return dS(`${n}.${s}.${o}${a}${l}`, t);
};
var pS = hS;
class mS {
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
var yS = mS, go, fl;
function ot() {
  if (fl) return go;
  fl = 1;
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
  const r = yS, n = new r(), s = Zi, o = eo(), a = Qs, l = Ae, {
    safeRe: c,
    t: f,
    comparatorTrimReplace: u,
    tildeTrimReplace: h,
    caretTrimReplace: b
  } = Tn, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: v } = Ys, _ = (j) => j.value === "<0.0.0-0", y = (j) => j.value === "", p = (j, A) => {
    let D = !0;
    const L = j.slice();
    let R = L.pop();
    for (; D && L.length; )
      D = L.every((T) => R.intersects(T, A)), R = L.pop();
    return D;
  }, E = (j, A) => (j = j.replace(c[f.BUILD], ""), a("comp", j, A), j = x(j, A), a("caret", j), j = N(j, A), a("tildes", j), j = ae(j, A), a("xrange", j), j = X(j, A), a("stars", j), j), O = (j) => !j || j.toLowerCase() === "x" || j === "*", N = (j, A) => j.trim().split(/\s+/).map((D) => I(D, A)).join(" "), I = (j, A) => {
    const D = A.loose ? c[f.TILDELOOSE] : c[f.TILDE];
    return j.replace(D, (L, R, T, w, m) => {
      a("tilde", j, L, R, T, w, m);
      let S;
      return O(R) ? S = "" : O(T) ? S = `>=${R}.0.0 <${+R + 1}.0.0-0` : O(w) ? S = `>=${R}.${T}.0 <${R}.${+T + 1}.0-0` : m ? (a("replaceTilde pr", m), S = `>=${R}.${T}.${w}-${m} <${R}.${+T + 1}.0-0`) : S = `>=${R}.${T}.${w} <${R}.${+T + 1}.0-0`, a("tilde return", S), S;
    });
  }, x = (j, A) => j.trim().split(/\s+/).map((D) => W(D, A)).join(" "), W = (j, A) => {
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
var vo, dl;
function eo() {
  if (dl) return vo;
  dl = 1;
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
  const r = Zi, { safeRe: n, t: s } = Tn, o = yd, a = Qs, l = Ae, c = ot();
  return vo;
}
const _S = ot(), $S = (e, t, r) => {
  try {
    t = new _S(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var to = $S;
const gS = ot(), vS = (e, t) => new gS(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var ES = vS;
const wS = Ae, SS = ot(), bS = (e, t, r) => {
  let n = null, s = null, o = null;
  try {
    o = new SS(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || s.compare(a) === -1) && (n = a, s = new wS(n, r));
  }), n;
};
var PS = bS;
const OS = Ae, NS = ot(), RS = (e, t, r) => {
  let n = null, s = null, o = null;
  try {
    o = new NS(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || s.compare(a) === 1) && (n = a, s = new OS(n, r));
  }), n;
};
var TS = RS;
const Eo = Ae, IS = ot(), hl = Zs, kS = (e, t) => {
  e = new IS(e, t);
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
          (!o || hl(l, o)) && (o = l);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || hl(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var CS = kS;
const jS = ot(), AS = (e, t) => {
  try {
    return new jS(e, t).range || "*";
  } catch {
    return null;
  }
};
var DS = AS;
const LS = Ae, _d = eo(), { ANY: MS } = _d, FS = ot(), US = to, pl = Zs, ml = tc, VS = nc, qS = rc, xS = (e, t, r, n) => {
  e = new LS(e, n), t = new FS(t, n);
  let s, o, a, l, c;
  switch (r) {
    case ">":
      s = pl, o = VS, a = ml, l = ">", c = ">=";
      break;
    case "<":
      s = ml, o = qS, a = pl, l = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (US(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const u = t.set[f];
    let h = null, b = null;
    if (u.forEach((g) => {
      g.semver === MS && (g = new _d(">=0.0.0")), h = h || g, b = b || g, s(g.semver, h.semver, n) ? h = g : a(g.semver, b.semver, n) && (b = g);
    }), h.operator === l || h.operator === c || (!b.operator || b.operator === l) && o(e, b.semver))
      return !1;
    if (b.operator === c && a(e, b.semver))
      return !1;
  }
  return !0;
};
var sc = xS;
const zS = sc, GS = (e, t, r) => zS(e, t, ">", r);
var KS = GS;
const BS = sc, HS = (e, t, r) => BS(e, t, "<", r);
var WS = HS;
const yl = ot(), XS = (e, t, r) => (e = new yl(e, r), t = new yl(t, r), e.intersects(t, r));
var JS = XS;
const YS = to, QS = st;
var ZS = (e, t, r) => {
  const n = [];
  let s = null, o = null;
  const a = e.sort((u, h) => QS(u, h, r));
  for (const u of a)
    YS(u, t, r) ? (o = u, s || (s = u)) : (o && n.push([s, o]), o = null, s = null);
  s && n.push([s, null]);
  const l = [];
  for (const [u, h] of n)
    u === h ? l.push(u) : !h && u === a[0] ? l.push("*") : h ? u === a[0] ? l.push(`<=${h}`) : l.push(`${u} - ${h}`) : l.push(`>=${u}`);
  const c = l.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < f.length ? c : t;
};
const _l = ot(), oc = eo(), { ANY: wo } = oc, rn = to, ac = st, eb = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new _l(e, r), t = new _l(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const o of t.set) {
      const a = rb(s, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, tb = [new oc(">=0.0.0-0")], $l = [new oc(">=0.0.0")], rb = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === wo) {
    if (t.length === 1 && t[0].semver === wo)
      return !0;
    r.includePrerelease ? e = tb : e = $l;
  }
  if (t.length === 1 && t[0].semver === wo) {
    if (r.includePrerelease)
      return !0;
    t = $l;
  }
  const n = /* @__PURE__ */ new Set();
  let s, o;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? s = gl(s, g, r) : g.operator === "<" || g.operator === "<=" ? o = vl(o, g, r) : n.add(g.semver);
  if (n.size > 1)
    return null;
  let a;
  if (s && o) {
    if (a = ac(s.semver, o.semver, r), a > 0)
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
        if (l = gl(s, g, r), l === g && l !== s)
          return !1;
      } else if (s.operator === ">=" && !rn(s.semver, String(g), r))
        return !1;
    }
    if (o) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === "<" || g.operator === "<=") {
        if (c = vl(o, g, r), c === g && c !== o)
          return !1;
      } else if (o.operator === "<=" && !rn(o.semver, String(g), r))
        return !1;
    }
    if (!g.operator && (o || s) && a !== 0)
      return !1;
  }
  return !(s && f && !o && a !== 0 || o && u && !s && a !== 0 || b || h);
}, gl = (e, t, r) => {
  if (!e)
    return t;
  const n = ac(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, vl = (e, t, r) => {
  if (!e)
    return t;
  const n = ac(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var nb = eb;
const So = Tn, El = Ys, sb = Ae, wl = hd, ob = Wr, ab = dw, ib = mw, cb = _w, lb = gw, ub = ww, fb = Pw, db = Rw, hb = kw, pb = st, mb = Dw, yb = Fw, _b = ec, $b = xw, gb = Kw, vb = Zs, Eb = tc, wb = pd, Sb = md, bb = rc, Pb = nc, Ob = yd, Nb = pS, Rb = eo(), Tb = ot(), Ib = to, kb = ES, Cb = PS, jb = TS, Ab = CS, Db = DS, Lb = sc, Mb = KS, Fb = WS, Ub = JS, Vb = ZS, qb = nb;
var xb = {
  parse: ob,
  valid: ab,
  clean: ib,
  inc: cb,
  diff: lb,
  major: ub,
  minor: fb,
  patch: db,
  prerelease: hb,
  compare: pb,
  rcompare: mb,
  compareLoose: yb,
  compareBuild: _b,
  sort: $b,
  rsort: gb,
  gt: vb,
  lt: Eb,
  eq: wb,
  neq: Sb,
  gte: bb,
  lte: Pb,
  cmp: Ob,
  coerce: Nb,
  Comparator: Rb,
  Range: Tb,
  satisfies: Ib,
  toComparators: kb,
  maxSatisfying: Cb,
  minSatisfying: jb,
  minVersion: Ab,
  validRange: Db,
  outside: Lb,
  gtr: Mb,
  ltr: Fb,
  intersects: Ub,
  simplifyRange: Vb,
  subset: qb,
  SemVer: sb,
  re: So.re,
  src: So.src,
  tokens: So.t,
  SEMVER_SPEC_VERSION: El.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: El.RELEASE_TYPES,
  compareIdentifiers: wl.compareIdentifiers,
  rcompareIdentifiers: wl.rcompareIdentifiers
}, ro = { exports: {} }, ic = { exports: {} };
const $d = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
ic.exports = $d;
ic.exports.default = $d;
var zb = ic.exports;
const Gb = zb, Cs = /* @__PURE__ */ new WeakMap(), gd = (e, t = {}) => {
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
  return Gb(o, e), Cs.set(o, n), o;
};
ro.exports = gd;
ro.exports.default = gd;
ro.exports.callCount = (e) => {
  if (!Cs.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Cs.get(e);
};
var Kb = ro.exports;
(function(e, t) {
  var r = kn && kn.__classPrivateFieldSet || function(L, R, T, w, m) {
    if (w === "m") throw new TypeError("Private method is not writable");
    if (w === "a" && !m) throw new TypeError("Private accessor was defined without a setter");
    if (typeof R == "function" ? L !== R || !m : !R.has(L)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return w === "a" ? m.call(L, T) : m ? m.value = T : R.set(L, T), T;
  }, n = kn && kn.__classPrivateFieldGet || function(L, R, T, w) {
    if (T === "a" && !w) throw new TypeError("Private accessor was defined without a getter");
    if (typeof R == "function" ? L !== R || !w : !R.has(L)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? w : T === "a" ? w.call(L) : w ? w.value : R.get(L);
  }, s, o, a, l, c, f;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const u = tu, h = Ls, b = Ut, g = Ms, v = Kd, _ = ru, y = rh, p = hh, E = _h, O = ft, N = N$, I = UE, x = JE, W = xb, ae = Kb, U = "aes-256-cbc", X = () => /* @__PURE__ */ Object.create(null), V = (L) => L != null;
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
      this._ensureDirectory(), h.existsSync(this.path) || this._write(X()), process.platform === "win32" ? h.watch(this.path, { persistent: !1 }, x(() => {
        this.events.emit("change");
      }, { wait: 100 })) : h.watchFile(this.path, { persistent: !1 }, x(() => {
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
const Sl = Ut, { app: ms, ipcMain: ra, ipcRenderer: bl, shell: Hb } = zd, Wb = Bb;
let Pl = !1;
const Ol = () => {
  if (!ra || !ms)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: ms.getPath("userData"),
    appVersion: ms.getVersion()
  };
  return Pl || (ra.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Pl = !0), e;
};
class Xb extends Wb {
  constructor(t) {
    let r, n;
    if (bl) {
      const s = bl.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else ra && ms && ({ defaultCwd: r, appVersion: n } = Ol());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = Sl.isAbsolute(t.cwd) ? t.cwd : Sl.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Ol();
  }
  async openInEditor() {
    const t = await Hb.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var Jb = Xb;
const Yb = /* @__PURE__ */ su(Jb);
var js = { exports: {} };
const vd = ["nodebuffer", "arraybuffer", "fragments"], Ed = typeof Blob < "u";
Ed && vd.push("blob");
var Vt = {
  BINARY_TYPES: vd,
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
  hasBlob: Ed,
  kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
  kListener: Symbol("kListener"),
  kStatusCode: Symbol("status-code"),
  kWebSocket: Symbol("websocket"),
  NOOP: () => {
  }
}, Yn = { exports: {} };
function wd(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Qn = { exports: {} }, bo, Nl;
function Qb() {
  if (Nl) return bo;
  Nl = 1;
  var e = Ls, t = Ut, r = nu, n = typeof __webpack_require__ == "function" ? __non_webpack_require__ : wd, s = process.config && process.config.variables || {}, o = !!process.env.PREBUILDS_ONLY, a = process.versions.modules, l = U() ? "electron" : ae() ? "node-webkit" : "node", c = process.env.npm_config_arch || r.arch(), f = process.env.npm_config_platform || r.platform(), u = process.env.LIBC || (X(f) ? "musl" : "glibc"), h = process.env.ARM_VERSION || (c === "arm64" ? "8" : s.arm_version) || "", b = (process.versions.uv || "").split(".")[0];
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
      return !(G == null || G.runtime && G.runtime !== V && !x(G) || G.abi && G.abi !== q && !G.napi || G.uv && G.uv !== b || G.armv && G.armv !== h || G.libc && G.libc !== u);
    };
  }
  function x(V) {
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
var Rl;
function Sd() {
  if (Rl) return Qn.exports;
  Rl = 1;
  const e = typeof __webpack_require__ == "function" ? __non_webpack_require__ : wd;
  return typeof e.addon == "function" ? Qn.exports = e.addon.bind(e) : Qn.exports = Qb(), Qn.exports;
}
var Po, Tl;
function Zb() {
  return Tl || (Tl = 1, Po = { mask: (r, n, s, o, a) => {
    for (var l = 0; l < a; l++)
      s[o + l] = r[l] ^ n[l & 3];
  }, unmask: (r, n) => {
    const s = r.length;
    for (var o = 0; o < s; o++)
      r[o] ^= n[o & 3];
  } }), Po;
}
var Il;
function e1() {
  if (Il) return Yn.exports;
  Il = 1;
  try {
    Yn.exports = Sd()(__dirname);
  } catch {
    Yn.exports = Zb();
  }
  return Yn.exports;
}
var t1, r1;
const { EMPTY_BUFFER: n1 } = Vt, na = Buffer[Symbol.species];
function s1(e, t) {
  if (e.length === 0) return n1;
  if (e.length === 1) return e[0];
  const r = Buffer.allocUnsafe(t);
  let n = 0;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    r.set(o, n), n += o.length;
  }
  return n < t ? new na(r.buffer, r.byteOffset, n) : r;
}
function bd(e, t, r, n, s) {
  for (let o = 0; o < s; o++)
    r[n + o] = e[o] ^ t[o & 3];
}
function Pd(e, t) {
  for (let r = 0; r < e.length; r++)
    e[r] ^= t[r & 3];
}
function o1(e) {
  return e.length === e.buffer.byteLength ? e.buffer : e.buffer.slice(e.byteOffset, e.byteOffset + e.length);
}
function sa(e) {
  if (sa.readOnly = !0, Buffer.isBuffer(e)) return e;
  let t;
  return e instanceof ArrayBuffer ? t = new na(e) : ArrayBuffer.isView(e) ? t = new na(e.buffer, e.byteOffset, e.byteLength) : (t = Buffer.from(e), sa.readOnly = !1), t;
}
js.exports = {
  concat: s1,
  mask: bd,
  toArrayBuffer: o1,
  toBuffer: sa,
  unmask: Pd
};
if (!process.env.WS_NO_BUFFER_UTIL)
  try {
    const e = e1();
    r1 = js.exports.mask = function(t, r, n, s, o) {
      o < 48 ? bd(t, r, n, s, o) : e.mask(t, r, n, s, o);
    }, t1 = js.exports.unmask = function(t, r) {
      t.length < 32 ? Pd(t, r) : e.unmask(t, r);
    };
  } catch {
  }
var no = js.exports;
const kl = Symbol("kDone"), Oo = Symbol("kRun");
let a1 = class {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(t) {
    this[kl] = () => {
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
      this.pending++, t(this[kl]);
    }
  }
};
var i1 = a1;
const nn = Yd, Cl = no, c1 = i1, { kStatusCode: Od } = Vt, l1 = Buffer[Symbol.species], u1 = Buffer.from([0, 0, 255, 255]), As = Symbol("permessage-deflate"), _t = Symbol("total-length"), Rr = Symbol("callback"), Tt = Symbol("buffers"), Ar = Symbol("error");
let Zn, f1 = class {
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
    if (this._maxPayload = n | 0, this._options = t || {}, this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024, this._isServer = !!r, this._deflate = null, this._inflate = null, this.params = null, !Zn) {
      const s = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
      Zn = new c1(s);
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
    Zn.add((s) => {
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
    Zn.add((s) => {
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
      }), this._inflate[As] = this, this._inflate[_t] = 0, this._inflate[Tt] = [], this._inflate.on("error", h1), this._inflate.on("data", Nd);
    }
    this._inflate[Rr] = n, this._inflate.write(t), r && this._inflate.write(u1), this._inflate.flush(() => {
      const o = this._inflate[Ar];
      if (o) {
        this._inflate.close(), this._inflate = null, n(o);
        return;
      }
      const a = Cl.concat(
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
      }), this._deflate[_t] = 0, this._deflate[Tt] = [], this._deflate.on("data", d1);
    }
    this._deflate[Rr] = n, this._deflate.write(t), this._deflate.flush(nn.Z_SYNC_FLUSH, () => {
      if (!this._deflate)
        return;
      let o = Cl.concat(
        this._deflate[Tt],
        this._deflate[_t]
      );
      r && (o = new l1(o.buffer, o.byteOffset, o.length - 4)), this._deflate[Rr] = null, this._deflate[_t] = 0, this._deflate[Tt] = [], r && this.params[`${s}_no_context_takeover`] && this._deflate.reset(), n(null, o);
    });
  }
};
var cc = f1;
function d1(e) {
  this[Tt].push(e), this[_t] += e.length;
}
function Nd(e) {
  if (this[_t] += e.length, this[As]._maxPayload < 1 || this[_t] <= this[As]._maxPayload) {
    this[Tt].push(e);
    return;
  }
  this[Ar] = new RangeError("Max payload size exceeded"), this[Ar].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH", this[Ar][Od] = 1009, this.removeListener("data", Nd), this.reset();
}
function h1(e) {
  if (this[As]._inflate = null, this[Ar]) {
    this[Rr](this[Ar]);
    return;
  }
  e[Od] = 1007, this[Rr](e);
}
var Ds = { exports: {} }, es = { exports: {} }, No, jl;
function p1() {
  if (jl) return No;
  jl = 1;
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
var Al;
function m1() {
  if (Al) return es.exports;
  Al = 1;
  try {
    es.exports = Sd()(__dirname);
  } catch {
    es.exports = p1();
  }
  return es.exports;
}
var Dl;
const { isUtf8: Ll } = Qd, { hasBlob: y1 } = Vt, _1 = [
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
function $1(e) {
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
function g1(e) {
  return y1 && typeof e == "object" && typeof e.arrayBuffer == "function" && typeof e.type == "string" && typeof e.stream == "function" && (e[Symbol.toStringTag] === "Blob" || e[Symbol.toStringTag] === "File");
}
Ds.exports = {
  isBlob: g1,
  isValidStatusCode: $1,
  isValidUTF8: oa,
  tokenChars: _1
};
if (Ll)
  Dl = Ds.exports.isValidUTF8 = function(e) {
    return e.length < 24 ? oa(e) : Ll(e);
  };
else if (!process.env.WS_NO_UTF_8_VALIDATE)
  try {
    const e = m1();
    Dl = Ds.exports.isValidUTF8 = function(t) {
      return t.length < 32 ? oa(t) : e(t);
    };
  } catch {
  }
var In = Ds.exports;
const { Writable: v1 } = wn, Ml = cc, {
  BINARY_TYPES: E1,
  EMPTY_BUFFER: Fl,
  kStatusCode: w1,
  kWebSocket: S1
} = Vt, { concat: Ro, toArrayBuffer: b1, unmask: P1 } = no, { isValidStatusCode: O1, isValidUTF8: Ul } = In, ts = Buffer[Symbol.species], Ge = 0, Vl = 1, ql = 2, xl = 3, To = 4, Io = 5, rs = 6;
let N1 = class extends v1 {
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
    super(), this._allowSynchronousEvents = t.allowSynchronousEvents !== void 0 ? t.allowSynchronousEvents : !0, this._binaryType = t.binaryType || E1[0], this._extensions = t.extensions || {}, this._isServer = !!t.isServer, this._maxPayload = t.maxPayload | 0, this._skipUTF8Validation = !!t.skipUTF8Validation, this[S1] = void 0, this._bufferedBytes = 0, this._buffers = [], this._compressed = !1, this._payloadLength = 0, this._mask = void 0, this._fragmented = 0, this._masked = !1, this._fin = !1, this._opcode = 0, this._totalPayloadLength = 0, this._messageLength = 0, this._fragments = [], this._errored = !1, this._loop = !1, this._state = Ge;
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
      return this._buffers[0] = new ts(
        n.buffer,
        n.byteOffset + t,
        n.length - t
      ), new ts(n.buffer, n.byteOffset, t);
    }
    const r = Buffer.allocUnsafe(t);
    do {
      const n = this._buffers[0], s = r.length - t;
      t >= n.length ? r.set(this._buffers.shift(), s) : (r.set(new Uint8Array(n.buffer, n.byteOffset, t), s), this._buffers[0] = new ts(
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
        case Vl:
          this.getPayloadLength16(t);
          break;
        case ql:
          this.getPayloadLength64(t);
          break;
        case xl:
          this.getMask();
          break;
        case To:
          this.getData(t);
          break;
        case Io:
        case rs:
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
    if (n && !this._extensions[Ml.extensionName]) {
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
    this._payloadLength === 126 ? this._state = Vl : this._payloadLength === 127 ? this._state = ql : this.haveLength(t);
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
    this._masked ? this._state = xl : this._state = To;
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
    let r = Fl;
    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = !1;
        return;
      }
      r = this.consume(this._payloadLength), this._masked && this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3] && P1(r, this._mask);
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
    this._extensions[Ml.extensionName].decompress(t, this._fin, (s, o) => {
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
      this._binaryType === "nodebuffer" ? s = Ro(n, r) : this._binaryType === "arraybuffer" ? s = b1(Ro(n, r)) : this._binaryType === "blob" ? s = new Blob(n) : s = n, this._allowSynchronousEvents ? (this.emit("message", s, !0), this._state = Ge) : (this._state = rs, setImmediate(() => {
        this.emit("message", s, !0), this._state = Ge, this.startLoop(t);
      }));
    } else {
      const s = Ro(n, r);
      if (!this._skipUTF8Validation && !Ul(s)) {
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
      this._state === Io || this._allowSynchronousEvents ? (this.emit("message", s, !1), this._state = Ge) : (this._state = rs, setImmediate(() => {
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
        this._loop = !1, this.emit("conclude", 1005, Fl), this.end();
      else {
        const n = t.readUInt16BE(0);
        if (!O1(n)) {
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
        const s = new ts(
          t.buffer,
          t.byteOffset + 2,
          t.length - 2
        );
        if (!this._skipUTF8Validation && !Ul(s)) {
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
    this._allowSynchronousEvents ? (this.emit(this._opcode === 9 ? "ping" : "pong", t), this._state = Ge) : (this._state = rs, setImmediate(() => {
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
    return Error.captureStackTrace(a, this.createError), a.code = o, a[w1] = s, a;
  }
};
var R1 = N1;
const { Duplex: YP } = wn, { randomFillSync: T1 } = Ms, zl = cc, { EMPTY_BUFFER: I1, kWebSocket: k1, NOOP: C1 } = Vt, { isBlob: wr, isValidStatusCode: j1 } = In, { mask: Gl, toBuffer: sr } = no, Ke = Symbol("kByteLength"), A1 = Buffer.alloc(4), ys = 8 * 1024;
let or, Sr = ys;
const Ye = 0, D1 = 1, L1 = 2;
let M1 = class ar {
  /**
   * Creates a Sender instance.
   *
   * @param {Duplex} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(t, r, n) {
    this._extensions = r || {}, n && (this._generateMask = n, this._maskBuffer = Buffer.alloc(4)), this._socket = t, this._firstFragment = !0, this._compress = !1, this._bufferedBytes = 0, this._queue = [], this._state = Ye, this.onerror = C1, this[k1] = void 0;
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
    r.mask && (n = r.maskBuffer || A1, r.generateMask ? r.generateMask(n) : (Sr === ys && (or === void 0 && (or = Buffer.alloc(ys)), T1(or, 0, ys), Sr = 0), n[0] = or[Sr++], n[1] = or[Sr++], n[2] = or[Sr++], n[3] = or[Sr++]), a = (n[0] | n[1] | n[2] | n[3]) === 0, o = 6);
    let l;
    typeof t == "string" ? (!r.mask || a) && r[Ke] !== void 0 ? l = r[Ke] : (t = Buffer.from(t), l = t.length) : (l = t.length, s = r.mask && r.readOnly && !a);
    let c = l;
    l >= 65536 ? (o += 8, c = 127) : l > 125 && (o += 2, c = 126);
    const f = Buffer.allocUnsafe(s ? l + o : o);
    return f[0] = r.fin ? r.opcode | 128 : r.opcode, r.rsv1 && (f[0] |= 64), f[1] = c, c === 126 ? f.writeUInt16BE(l, 2) : c === 127 && (f[2] = f[3] = 0, f.writeUIntBE(l, 4, 6)), r.mask ? (f[1] |= 128, f[o - 4] = n[0], f[o - 3] = n[1], f[o - 2] = n[2], f[o - 1] = n[3], a ? [f, t] : s ? (Gl(t, n, f, o, l), [f]) : (Gl(t, n, t, 0, l), [f, t])) : [f, t];
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
      o = I1;
    else {
      if (typeof t != "number" || !j1(t))
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
      [Ke]: o.length,
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
      [Ke]: s,
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
      [Ke]: s,
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
      [Ke]: l,
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
    this._bufferedBytes += n[Ke], this._state = L1, t.arrayBuffer().then((o) => {
      if (this._socket.destroyed) {
        const l = new Error(
          "The socket was closed while the blob was being read"
        );
        process.nextTick(aa, this, l, s);
        return;
      }
      this._bufferedBytes -= n[Ke];
      const a = sr(o);
      r ? this.dispatch(a, r, n, s) : (this._state = Ye, this.sendFrame(ar.frame(a, n), s), this.dequeue());
    }).catch((o) => {
      process.nextTick(U1, this, o, s);
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
    this._bufferedBytes += n[Ke], this._state = D1, o.compress(t, n.fin, (a, l) => {
      if (this._socket.destroyed) {
        const c = new Error(
          "The socket was closed while data was being compressed"
        );
        aa(this, c, s);
        return;
      }
      this._bufferedBytes -= n[Ke], this._state = Ye, n.readOnly = !1, this.sendFrame(ar.frame(l, n), s), this.dequeue();
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
      this._bufferedBytes -= t[3][Ke], Reflect.apply(t[0], this, t.slice(1));
    }
  }
  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(t) {
    this._bufferedBytes += t[3][Ke], this._queue.push(t);
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
var F1 = M1;
function aa(e, t, r) {
  typeof r == "function" && r(t);
  for (let n = 0; n < e._queue.length; n++) {
    const s = e._queue[n], o = s[s.length - 1];
    typeof o == "function" && o(t);
  }
}
function U1(e, t, r) {
  aa(e, t, r), e.onerror(t);
}
const { kForOnEventAttribute: sn, kListener: ko } = Vt, Kl = Symbol("kCode"), Bl = Symbol("kData"), Hl = Symbol("kError"), Wl = Symbol("kMessage"), Xl = Symbol("kReason"), Tr = Symbol("kTarget"), Jl = Symbol("kType"), Yl = Symbol("kWasClean");
class Xr {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(t) {
    this[Tr] = null, this[Jl] = t;
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
    return this[Jl];
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
    super(t), this[Kl] = r.code === void 0 ? 0 : r.code, this[Xl] = r.reason === void 0 ? "" : r.reason, this[Yl] = r.wasClean === void 0 ? !1 : r.wasClean;
  }
  /**
   * @type {Number}
   */
  get code() {
    return this[Kl];
  }
  /**
   * @type {String}
   */
  get reason() {
    return this[Xl];
  }
  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[Yl];
  }
}
Object.defineProperty(so.prototype, "code", { enumerable: !0 });
Object.defineProperty(so.prototype, "reason", { enumerable: !0 });
Object.defineProperty(so.prototype, "wasClean", { enumerable: !0 });
class lc extends Xr {
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
    super(t), this[Hl] = r.error === void 0 ? null : r.error, this[Wl] = r.message === void 0 ? "" : r.message;
  }
  /**
   * @type {*}
   */
  get error() {
    return this[Hl];
  }
  /**
   * @type {String}
   */
  get message() {
    return this[Wl];
  }
}
Object.defineProperty(lc.prototype, "error", { enumerable: !0 });
Object.defineProperty(lc.prototype, "message", { enumerable: !0 });
class Rd extends Xr {
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
Object.defineProperty(Rd.prototype, "data", { enumerable: !0 });
const V1 = {
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
        const l = new Rd("message", {
          data: a ? o : o.toString()
        });
        l[Tr] = this, ns(t, this, l);
      };
    else if (e === "close")
      n = function(o, a) {
        const l = new so("close", {
          code: o,
          reason: a.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });
        l[Tr] = this, ns(t, this, l);
      };
    else if (e === "error")
      n = function(o) {
        const a = new lc("error", {
          error: o,
          message: o.message
        });
        a[Tr] = this, ns(t, this, a);
      };
    else if (e === "open")
      n = function() {
        const o = new Xr("open");
        o[Tr] = this, ns(t, this, o);
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
var q1 = {
  EventTarget: V1
};
function ns(e, t, r) {
  typeof e == "object" && e.handleEvent ? e.handleEvent.call(e, r) : e.call(t, r);
}
const { tokenChars: on } = In;
function at(e, t, r) {
  e[t] === void 0 ? e[t] = [r] : e[t].push(r);
}
function x1(e) {
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
        f === 44 ? (at(t, g, r), r = /* @__PURE__ */ Object.create(null)) : a = g, c = u = -1;
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
        u === -1 && (u = h), at(r, e.slice(c, u), !0), f === 44 && (at(t, a, r), r = /* @__PURE__ */ Object.create(null), a = void 0), c = u = -1;
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
      n && (g = g.replace(/\\/g, ""), n = !1), at(r, l, g), f === 44 && (at(t, a, r), r = /* @__PURE__ */ Object.create(null), a = void 0), l = void 0, c = u = -1;
    } else
      throw new SyntaxError(`Unexpected character at index ${h}`);
  if (c === -1 || o || f === 32 || f === 9)
    throw new SyntaxError("Unexpected end of input");
  u === -1 && (u = h);
  const b = e.slice(c, u);
  return a === void 0 ? at(t, b, r) : (l === void 0 ? at(r, b, !0) : n ? at(r, l, b.replace(/\\/g, "")) : at(r, l, b), at(t, a, r)), t;
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
var G1 = { format: z1, parse: x1 };
const K1 = ru, B1 = Bd, H1 = Hd, Td = Wd, W1 = Xd, { randomBytes: X1, createHash: J1 } = Ms, { Duplex: QP, Readable: ZP } = wn, { URL: Co } = Jd, kt = cc, Y1 = R1, Q1 = F1, { isBlob: Z1 } = In, {
  BINARY_TYPES: Ql,
  EMPTY_BUFFER: ss,
  GUID: eP,
  kForOnEventAttribute: jo,
  kListener: tP,
  kStatusCode: rP,
  kWebSocket: we,
  NOOP: Id
} = Vt, {
  EventTarget: { addEventListener: nP, removeEventListener: sP }
} = q1, { format: oP, parse: aP } = G1, { toBuffer: iP } = no, cP = 30 * 1e3, kd = Symbol("kAborted"), Ao = [8, 13], St = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"], lP = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
class Q extends K1 {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(t, r, n) {
    super(), this._binaryType = Ql[0], this._closeCode = 1006, this._closeFrameReceived = !1, this._closeFrameSent = !1, this._closeMessage = ss, this._closeTimer = null, this._errorEmitted = !1, this._extensions = {}, this._paused = !1, this._protocol = "", this._readyState = Q.CONNECTING, this._receiver = null, this._sender = null, this._socket = null, t !== null ? (this._bufferedAmount = 0, this._isServer = !1, this._redirects = 0, r === void 0 ? r = [] : Array.isArray(r) || (typeof r == "object" && r !== null ? (n = r, r = []) : r = [r]), Cd(this, t, r, n)) : (this._autoPong = n.autoPong, this._isServer = !0);
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
    Ql.includes(t) && (this._binaryType = t, this._receiver && (this._receiver._binaryType = t));
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
    const s = new Y1({
      allowSynchronousEvents: n.allowSynchronousEvents,
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: n.maxPayload,
      skipUTF8Validation: n.skipUTF8Validation
    }), o = new Q1(t, this._extensions, n.generateMask);
    this._receiver = s, this._sender = o, this._socket = t, s[we] = this, o[we] = this, t[we] = this, s.on("conclude", hP), s.on("drain", pP), s.on("error", mP), s.on("message", yP), s.on("ping", _P), s.on("pong", $P), o.onerror = gP, t.setTimeout && t.setTimeout(0), t.setNoDelay && t.setNoDelay(), r.length > 0 && t.unshift(r), t.on("close", Dd), t.on("data", oo), t.on("end", Ld), t.on("error", Md), this._readyState = Q.OPEN, this.emit("open");
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
        xe(this, this._req, "WebSocket was closed before the connection was established");
        return;
      }
      if (this.readyState === Q.CLOSING) {
        this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end();
        return;
      }
      this._readyState = Q.CLOSING, this._sender.close(t, r, !this._isServer, (n) => {
        n || (this._closeFrameSent = !0, (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end());
      }), Ad(this);
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
    r === void 0 && (r = !this._isServer), this._sender.ping(t || ss, r, n);
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
    r === void 0 && (r = !this._isServer), this._sender.pong(t || ss, r, n);
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
    this._extensions[kt.extensionName] || (s.compress = !1), this._sender.send(t || ss, s, n);
  }
  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState !== Q.CLOSED) {
      if (this.readyState === Q.CONNECTING) {
        xe(this, this._req, "WebSocket was closed before the connection was established");
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
        if (t[jo]) return t[tP];
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
Q.prototype.addEventListener = nP;
Q.prototype.removeEventListener = sP;
var uP = Q;
function Cd(e, t, r, n) {
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
    _s(e, _);
    return;
  }
  const f = a ? 443 : 80, u = X1(16).toString("base64"), h = a ? B1.request : H1.request, b = /* @__PURE__ */ new Set();
  let g;
  if (s.createConnection = s.createConnection || (a ? dP : fP), s.defaultPort = s.defaultPort || f, s.port = o.port || f, s.host = o.hostname.startsWith("[") ? o.hostname.slice(1, -1) : o.hostname, s.headers = {
    ...s.headers,
    "Sec-WebSocket-Version": s.protocolVersion,
    "Sec-WebSocket-Key": u,
    Connection: "Upgrade",
    Upgrade: "websocket"
  }, s.path = o.pathname + o.search, s.timeout = s.handshakeTimeout, s.perMessageDeflate && (g = new kt(
    s.perMessageDeflate !== !0 ? s.perMessageDeflate : {},
    !1,
    s.maxPayload
  ), s.headers["Sec-WebSocket-Extensions"] = oP({
    [kt.extensionName]: g.offer()
  })), r.length) {
    for (const _ of r) {
      if (typeof _ != "string" || !lP.test(_) || b.has(_))
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
    xe(e, v, "Opening handshake has timed out");
  }), v.on("error", (_) => {
    v === null || v[kd] || (v = e._req = null, _s(e, _));
  }), v.on("response", (_) => {
    const y = _.headers.location, p = _.statusCode;
    if (y && s.followRedirects && p >= 300 && p < 400) {
      if (++e._redirects > s.maxRedirects) {
        xe(e, v, "Maximum redirects exceeded");
        return;
      }
      v.abort();
      let E;
      try {
        E = new Co(y, t);
      } catch {
        const N = new SyntaxError(`Invalid URL: ${y}`);
        _s(e, N);
        return;
      }
      Cd(e, E, r, n);
    } else e.emit("unexpected-response", v, _) || xe(
      e,
      v,
      `Unexpected server response: ${_.statusCode}`
    );
  }), v.on("upgrade", (_, y, p) => {
    if (e.emit("upgrade", _), e.readyState !== Q.CONNECTING) return;
    v = e._req = null;
    const E = _.headers.upgrade;
    if (E === void 0 || E.toLowerCase() !== "websocket") {
      xe(e, y, "Invalid Upgrade header");
      return;
    }
    const O = J1("sha1").update(u + eP).digest("base64");
    if (_.headers["sec-websocket-accept"] !== O) {
      xe(e, y, "Invalid Sec-WebSocket-Accept header");
      return;
    }
    const N = _.headers["sec-websocket-protocol"];
    let I;
    if (N !== void 0 ? b.size ? b.has(N) || (I = "Server sent an invalid subprotocol") : I = "Server sent a subprotocol but none was requested" : b.size && (I = "Server sent no subprotocol"), I) {
      xe(e, y, I);
      return;
    }
    N && (e._protocol = N);
    const x = _.headers["sec-websocket-extensions"];
    if (x !== void 0) {
      if (!g) {
        xe(e, y, "Server sent a Sec-WebSocket-Extensions header but no extension was requested");
        return;
      }
      let W;
      try {
        W = aP(x);
      } catch {
        xe(e, y, "Invalid Sec-WebSocket-Extensions header");
        return;
      }
      const ae = Object.keys(W);
      if (ae.length !== 1 || ae[0] !== kt.extensionName) {
        xe(e, y, "Server indicated an extension that was not requested");
        return;
      }
      try {
        g.accept(W[kt.extensionName]);
      } catch {
        xe(e, y, "Invalid Sec-WebSocket-Extensions header");
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
function _s(e, t) {
  e._readyState = Q.CLOSING, e._errorEmitted = !0, e.emit("error", t), e.emitClose();
}
function fP(e) {
  return e.path = e.socketPath, Td.connect(e);
}
function dP(e) {
  return e.path = void 0, !e.servername && e.servername !== "" && (e.servername = Td.isIP(e.host) ? "" : e.host), W1.connect(e);
}
function xe(e, t, r) {
  e._readyState = Q.CLOSING;
  const n = new Error(r);
  Error.captureStackTrace(n, xe), t.setHeader ? (t[kd] = !0, t.abort(), t.socket && !t.socket.destroyed && t.socket.destroy(), process.nextTick(_s, e, n)) : (t.destroy(n), t.once("error", e.emit.bind(e, "error")), t.once("close", e.emitClose.bind(e)));
}
function Do(e, t, r) {
  if (t) {
    const n = Z1(t) ? t.size : iP(t).length;
    e._socket ? e._sender._bufferedBytes += n : e._bufferedAmount += n;
  }
  if (r) {
    const n = new Error(
      `WebSocket is not open: readyState ${e.readyState} (${St[e.readyState]})`
    );
    process.nextTick(r, n);
  }
}
function hP(e, t) {
  const r = this[we];
  r._closeFrameReceived = !0, r._closeMessage = t, r._closeCode = e, r._socket[we] !== void 0 && (r._socket.removeListener("data", oo), process.nextTick(jd, r._socket), e === 1005 ? r.close() : r.close(e, t));
}
function pP() {
  const e = this[we];
  e.isPaused || e._socket.resume();
}
function mP(e) {
  const t = this[we];
  t._socket[we] !== void 0 && (t._socket.removeListener("data", oo), process.nextTick(jd, t._socket), t.close(e[rP])), t._errorEmitted || (t._errorEmitted = !0, t.emit("error", e));
}
function Zl() {
  this[we].emitClose();
}
function yP(e, t) {
  this[we].emit("message", e, t);
}
function _P(e) {
  const t = this[we];
  t._autoPong && t.pong(e, !this._isServer, Id), t.emit("ping", e);
}
function $P(e) {
  this[we].emit("pong", e);
}
function jd(e) {
  e.resume();
}
function gP(e) {
  const t = this[we];
  t.readyState !== Q.CLOSED && (t.readyState === Q.OPEN && (t._readyState = Q.CLOSING, Ad(t)), this._socket.end(), t._errorEmitted || (t._errorEmitted = !0, t.emit("error", e)));
}
function Ad(e) {
  e._closeTimer = setTimeout(
    e._socket.destroy.bind(e._socket),
    cP
  );
}
function Dd() {
  const e = this[we];
  this.removeListener("close", Dd), this.removeListener("data", oo), this.removeListener("end", Ld), e._readyState = Q.CLOSING;
  let t;
  !this._readableState.endEmitted && !e._closeFrameReceived && !e._receiver._writableState.errorEmitted && (t = e._socket.read()) !== null && e._receiver.write(t), e._receiver.end(), this[we] = void 0, clearTimeout(e._closeTimer), e._receiver._writableState.finished || e._receiver._writableState.errorEmitted ? e.emitClose() : (e._receiver.on("error", Zl), e._receiver.on("finish", Zl));
}
function oo(e) {
  this[we]._receiver.write(e) || this.pause();
}
function Ld() {
  const e = this[we];
  e._readyState = Q.CLOSING, e._receiver.end(), this.end();
}
function Md() {
  const e = this[we];
  this.removeListener("error", Md), this.on("error", Id), e && (e._readyState = Q.CLOSING, this.destroy());
}
const qr = /* @__PURE__ */ su(uP), { Duplex: eO } = wn, { tokenChars: tO } = In, { Duplex: rO } = wn, { createHash: nO } = Ms, { GUID: sO, kWebSocket: oO } = Vt, Fd = Lt.dirname(Gd(import.meta.url));
process.env.APP_ROOT = Lt.join(Fd, "..");
const $s = process.env.VITE_DEV_SERVER_URL, aO = Lt.join(process.env.APP_ROOT, "dist-electron"), Ud = Lt.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = $s ? Lt.join(process.env.APP_ROOT, "public") : Ud;
let ct, ue = null;
const ir = /* @__PURE__ */ new Map();
let gs = null, br = !1;
const vP = {
  stocks: {
    type: "array",
    default: []
  },
  pollInterval: {
    type: "number",
    default: 5e3
  }
}, os = new Yb({
  schema: vP,
  name: "app-store"
});
function EP() {
  if ((ue == null ? void 0 : ue.readyState) === qr.OPEN || br)
    return console.log("[OKX] Already connected or connecting"), Promise.resolve();
  br = !0;
  const e = "wss://wspap.okx.com:8443/ws/v5/public";
  return console.log("[OKX] 🔌 Connecting to:", e), new Promise((t, r) => {
    try {
      ue = new qr(e), ue.on("open", () => {
        console.log("[OKX] ✅ WebSocket opened - connection established"), br = !1, wP(), SP(), t();
      }), ue.on("message", (n) => {
        console.log("[OKX] 📨 Message received, length:", n.toString().length), bP(n.toString());
      }), ue.on("error", (n) => {
        console.error("[OKX] ❌ WebSocket error:", n), console.error("[OKX] Error details:", {
          message: n instanceof Error ? n.message : String(n),
          code: n instanceof Error && "code" in n ? n.code : "unknown"
        }), br = !1, r(n);
      }), ue.on("close", (n, s) => {
        console.log("[OKX] ❌ WebSocket closed"), console.log("[OKX] Close details:", { code: n, reason: s.toString() }), br = !1, Vd();
      });
    } catch (n) {
      console.error("[OKX] ❌ Exception during WebSocket creation:", n), br = !1, r(n);
    }
  });
}
function wP() {
  gs = setInterval(() => {
    (ue == null ? void 0 : ue.readyState) === qr.OPEN && (ue.ping(), console.log("[Crypto] Heartbeat ping sent"));
  }, 3e4);
}
function Vd() {
  gs && (clearInterval(gs), gs = null);
}
function SP() {
  console.log("[Crypto] Resubscribing to all symbols..."), ir.forEach((e) => {
    e.forEach((t) => {
      const r = ia(t);
      r && qd(r);
    });
  });
}
function ia(e) {
  return {
    BTC: "BTC-USDT",
    ETH: "ETH-USDT",
    SOL: "SOL-USDT",
    XRP: "XRP-USDT",
    ADA: "ADA-USDT"
  }[e];
}
function qd(e) {
  if ((ue == null ? void 0 : ue.readyState) === qr.OPEN) {
    const t = {
      op: "subscribe",
      args: [
        {
          channel: "tickers",
          instId: e
        }
      ]
    };
    console.log("[OKX] 📤 Sending subscribe message:"), console.log("[OKX]", JSON.stringify(t, null, 2)), ue.send(JSON.stringify(t)), console.log(`[OKX] ✅ Subscribe sent for ${e}`);
  } else {
    const t = ue == null ? void 0 : ue.readyState;
    console.warn(`[OKX] ⚠️ Cannot subscribe to ${e}`), console.warn(`[OKX] WebSocket state: ${t}`);
  }
}
function bP(e) {
  try {
    const t = JSON.parse(e);
    console.log("[OKX] 📨 Parsed message structure:"), console.log("[OKX]", JSON.stringify(t, null, 2));
    const r = t.arg, n = t.data;
    if (console.log("[OKX] Message analysis:", {
      hasArg: !!r,
      argChannel: r == null ? void 0 : r.channel,
      hasData: !!n,
      isDataArray: Array.isArray(n),
      isTickers: (r == null ? void 0 : r.channel) === "tickers"
    }), (r == null ? void 0 : r.channel) === "tickers" && n && Array.isArray(n)) {
      const s = n[0], o = String(s.instId);
      console.log(`[OKX] ✅ Ticker data received for ${o}`), console.log("[OKX] Ticker fields:", {
        instId: o,
        last: s.last,
        open24h: s.open24h,
        high24h: s.high24h,
        low24h: s.low24h,
        volCcy24h: s.volCcy24h,
        ts: s.ts
      });
      const a = o.split("-")[0], l = parseFloat(String(s.last)), c = parseFloat(String(s.open24h)), f = (l - c) / c * 100, u = {
        symbol: a,
        name: a,
        price: l,
        change24h: f,
        changeAmount: l - c,
        volume: parseFloat(String(s.volCcy24h) || "0"),
        marketCap: void 0,
        type: "crypto",
        dataSource: "okx",
        isRealtime: !0,
        lastUpdate: parseInt(String(s.ts))
      };
      console.log("[OKX] 📦 Sending to renderer:", u), ct ? (ct.webContents.send("crypto-ticker-update", u), console.log("[OKX] ✅ Data sent to renderer for symbol:", a)) : console.warn("[OKX] ⚠️ Window not available, cannot send data");
    } else
      console.log("[OKX] ℹ️ Non-ticker message, ignoring");
  } catch (t) {
    console.error("[OKX] ❌ Failed to parse WebSocket message:", t), console.error("[OKX] Raw data sample:", e.substring(0, 200));
  }
}
function PP() {
  bt.handle("electron-store-get", (e, t) => os.get(t)), bt.handle("electron-store-set", (e, t, r) => (os.set(t, r), !0)), bt.handle("electron-store-get-all", () => os.store), bt.handle("electron-store-reset", () => (os.reset(), !0)), bt.handle("crypto-subscribe", async (e, t) => {
    console.log(`[OKX] 📥 IPC Subscribe request for ${t}`), ir.has("main") || ir.set("main", /* @__PURE__ */ new Set()), ir.get("main").add(t), console.log("[OKX] Connecting WebSocket...");
    try {
      await EP(), console.log("[OKX] ✅ WebSocket connected");
    } catch (n) {
      throw console.error("[OKX] ❌ Failed to connect WebSocket:", n), n;
    }
    const r = ia(t);
    return r ? (console.log(`[OKX] Mapping ${t} -> ${r}`), qd(r)) : console.warn(`[OKX] ⚠️ No OKX symbol mapping for ${t}`), !0;
  }), bt.handle("crypto-unsubscribe", (e, t) => {
    if (console.log(`[OKX] 📥 IPC Unsubscribe request for ${t}`), ir.has("main") && ir.get("main").delete(t), (ue == null ? void 0 : ue.readyState) === qr.OPEN) {
      const r = ia(t);
      if (r) {
        const n = {
          op: "unsubscribe",
          args: [
            {
              channel: "tickers",
              instId: r
            }
          ]
        };
        console.log("[OKX] 📤 Sending unsubscribe message:", JSON.stringify(n)), ue.send(JSON.stringify(n)), console.log(`[OKX] ✅ Unsubscribe sent for ${r}`);
      }
    }
    return !0;
  }), bt.handle("crypto-disconnect", () => (console.log("[Crypto IPC] Disconnect request"), Vd(), ue && (ue.close(), ue = null), ir.clear(), !0)), bt.handle("crypto-is-connected", () => {
    const e = (ue == null ? void 0 : ue.readyState) === qr.OPEN;
    return console.log(`[Crypto IPC] Connection status: ${e}`), e;
  });
}
function xd() {
  ct = new eu({
    title: "Electron Stock App",
    icon: Lt.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: Lt.join(Fd, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      sandbox: !0
    }
  }), ct.webContents.on("did-finish-load", () => {
    console.log("[Main] Window loaded, sending test message"), ct == null || ct.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), $s ? (console.log("[Main] Loading dev server:", $s), ct.loadURL($s)) : (console.log("[Main] Loading production HTML"), ct.loadFile(Lt.join(Ud, "index.html")));
}
vs.on("window-all-closed", () => {
  process.platform !== "darwin" && (vs.quit(), ct = null);
});
vs.on("activate", () => {
  eu.getAllWindows().length === 0 && xd();
});
vs.whenReady().then(() => {
  PP(), xd();
});
export {
  aO as MAIN_DIST,
  Ud as RENDERER_DIST,
  $s as VITE_DEV_SERVER_URL
};
