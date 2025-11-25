import iu, { app as bn, BrowserWindow as rc, ipcMain as Gr } from "electron";
import { fileURLToPath as cu } from "node:url";
import Rt from "node:path";
import Wt from "path";
import nc from "util";
import Vs from "fs";
import lu from "crypto";
import uu from "assert";
import du from "events";
import fu from "os";
var Hr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function hu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $s = { exports: {} }, mu = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Ct = mu, pu = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), yu = (e) => !e.some((t) => pu.has(t));
function Br(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return yu(r) ? r : [];
}
var $u = {
  get(e, t, r) {
    if (!Ct(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = Br(t);
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
    if (!Ct(e) || typeof t != "string")
      return e;
    const n = e, s = Br(t);
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      Ct(e[i]) || (e[i] = {}), a === s.length - 1 && (e[i] = r), e = e[i];
    }
    return n;
  },
  delete(e, t) {
    if (!Ct(e) || typeof t != "string")
      return !1;
    const r = Br(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Ct(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Ct(e) || typeof t != "string")
      return !1;
    const r = Br(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Ct(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, Us = { exports: {} }, zs = { exports: {} }, qs = { exports: {} }, Ks = { exports: {} };
const sc = Vs;
Ks.exports = (e) => new Promise((t) => {
  sc.access(e, (r) => {
    t(!r);
  });
});
Ks.exports.sync = (e) => {
  try {
    return sc.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var _u = Ks.exports, Gs = { exports: {} }, Hs = { exports: {} };
const ac = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
Hs.exports = ac;
Hs.exports.default = ac;
var gu = Hs.exports;
const vu = gu, oc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (l, c, ...d) => {
    r++;
    const u = vu(l, ...d);
    c(u), u.then(n, n);
  }, a = (l, c, ...d) => {
    r < e ? s(l, c, ...d) : t.push(s.bind(null, l, c, ...d));
  }, i = (l, ...c) => new Promise((d) => a(l, d, ...c));
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
Gs.exports = oc;
Gs.exports.default = oc;
var Eu = Gs.exports;
const Vo = Eu;
class ic extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const wu = (e, t) => Promise.resolve(e).then(t), Su = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new ic(t[0])));
var bu = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = Vo(r.concurrency), s = [...e].map((i) => [i, n(wu, i, t)]), a = Vo(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => a(Su, i))).then(() => {
  }).catch((i) => i instanceof ic ? i.value : Promise.reject(i));
};
const cc = Wt, lc = _u, Pu = bu;
qs.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), Pu(e, (r) => lc(cc.resolve(t.cwd, r)), t));
qs.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (lc.sync(cc.resolve(t.cwd, r)))
      return r;
};
var Nu = qs.exports;
const bt = Wt, uc = Nu;
zs.exports = (e, t = {}) => {
  const r = bt.resolve(t.cwd || ""), { root: n } = bt.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function i(l) {
      uc(s, { cwd: l }).then((c) => {
        c ? a(bt.join(l, c)) : l === n ? a(null) : i(bt.dirname(l));
      });
    })(r);
  });
};
zs.exports.sync = (e, t = {}) => {
  let r = bt.resolve(t.cwd || "");
  const { root: n } = bt.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = uc.sync(s, { cwd: r });
    if (a)
      return bt.join(r, a);
    if (r === n)
      return null;
    r = bt.dirname(r);
  }
};
var Ou = zs.exports;
const dc = Ou;
Us.exports = async ({ cwd: e } = {}) => dc("package.json", { cwd: e });
Us.exports.sync = ({ cwd: e } = {}) => dc.sync("package.json", { cwd: e });
var Ru = Us.exports, Bs = { exports: {} };
const $e = Wt, fc = fu, St = fc.homedir(), Ws = fc.tmpdir(), { env: xt } = process, Tu = (e) => {
  const t = $e.join(St, "Library");
  return {
    data: $e.join(t, "Application Support", e),
    config: $e.join(t, "Preferences", e),
    cache: $e.join(t, "Caches", e),
    log: $e.join(t, "Logs", e),
    temp: $e.join(Ws, e)
  };
}, Iu = (e) => {
  const t = xt.APPDATA || $e.join(St, "AppData", "Roaming"), r = xt.LOCALAPPDATA || $e.join(St, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: $e.join(r, e, "Data"),
    config: $e.join(t, e, "Config"),
    cache: $e.join(r, e, "Cache"),
    log: $e.join(r, e, "Log"),
    temp: $e.join(Ws, e)
  };
}, ju = (e) => {
  const t = $e.basename(St);
  return {
    data: $e.join(xt.XDG_DATA_HOME || $e.join(St, ".local", "share"), e),
    config: $e.join(xt.XDG_CONFIG_HOME || $e.join(St, ".config"), e),
    cache: $e.join(xt.XDG_CACHE_HOME || $e.join(St, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: $e.join(xt.XDG_STATE_HOME || $e.join(St, ".local", "state"), e),
    temp: $e.join(Ws, t, e)
  };
}, hc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Tu(e) : process.platform === "win32" ? Iu(e) : ju(e);
};
Bs.exports = hc;
Bs.exports.default = hc;
var Au = Bs.exports, ct = {}, ue = {};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.NOOP = ue.LIMIT_FILES_DESCRIPTORS = ue.LIMIT_BASENAME_LENGTH = ue.IS_USER_ROOT = ue.IS_POSIX = ue.DEFAULT_TIMEOUT_SYNC = ue.DEFAULT_TIMEOUT_ASYNC = ue.DEFAULT_WRITE_OPTIONS = ue.DEFAULT_READ_OPTIONS = ue.DEFAULT_FOLDER_MODE = ue.DEFAULT_FILE_MODE = ue.DEFAULT_ENCODING = void 0;
const ku = "utf8";
ue.DEFAULT_ENCODING = ku;
const Cu = 438;
ue.DEFAULT_FILE_MODE = Cu;
const Du = 511;
ue.DEFAULT_FOLDER_MODE = Du;
const Mu = {};
ue.DEFAULT_READ_OPTIONS = Mu;
const Lu = {};
ue.DEFAULT_WRITE_OPTIONS = Lu;
const Fu = 5e3;
ue.DEFAULT_TIMEOUT_ASYNC = Fu;
const Vu = 100;
ue.DEFAULT_TIMEOUT_SYNC = Vu;
const Uu = !!process.getuid;
ue.IS_POSIX = Uu;
const zu = process.getuid ? !process.getuid() : !1;
ue.IS_USER_ROOT = zu;
const qu = 128;
ue.LIMIT_BASENAME_LENGTH = qu;
const Ku = 1e4;
ue.LIMIT_FILES_DESCRIPTORS = Ku;
const Gu = () => {
};
ue.NOOP = Gu;
var Mn = {}, sr = {};
Object.defineProperty(sr, "__esModule", { value: !0 });
sr.attemptifySync = sr.attemptifyAsync = void 0;
const mc = ue, Hu = (e, t = mc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
sr.attemptifyAsync = Hu;
const Bu = (e, t = mc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
sr.attemptifySync = Bu;
var Js = {};
Object.defineProperty(Js, "__esModule", { value: !0 });
const Wu = ue, pc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Wu.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!pc.isChangeErrorOk(e))
      throw e;
  }
};
Js.default = pc;
var ar = {}, Xs = {};
Object.defineProperty(Xs, "__esModule", { value: !0 });
const Ju = ue, me = {
  interval: 25,
  intervalId: void 0,
  limit: Ju.LIMIT_FILES_DESCRIPTORS,
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
Xs.default = me;
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.retryifySync = ar.retryifyAsync = void 0;
const Xu = Xs, Yu = (e, t) => function(r) {
  return function n() {
    return Xu.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
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
ar.retryifyAsync = Yu;
const Qu = (e, t) => function(r) {
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
ar.retryifySync = Qu;
Object.defineProperty(Mn, "__esModule", { value: !0 });
const de = Vs, De = nc, Me = sr, Ne = Js, Ve = ar, Zu = {
  chmodAttempt: Me.attemptifyAsync(De.promisify(de.chmod), Ne.default.onChangeError),
  chownAttempt: Me.attemptifyAsync(De.promisify(de.chown), Ne.default.onChangeError),
  closeAttempt: Me.attemptifyAsync(De.promisify(de.close)),
  fsyncAttempt: Me.attemptifyAsync(De.promisify(de.fsync)),
  mkdirAttempt: Me.attemptifyAsync(De.promisify(de.mkdir)),
  realpathAttempt: Me.attemptifyAsync(De.promisify(de.realpath)),
  statAttempt: Me.attemptifyAsync(De.promisify(de.stat)),
  unlinkAttempt: Me.attemptifyAsync(De.promisify(de.unlink)),
  closeRetry: Ve.retryifyAsync(De.promisify(de.close), Ne.default.isRetriableError),
  fsyncRetry: Ve.retryifyAsync(De.promisify(de.fsync), Ne.default.isRetriableError),
  openRetry: Ve.retryifyAsync(De.promisify(de.open), Ne.default.isRetriableError),
  readFileRetry: Ve.retryifyAsync(De.promisify(de.readFile), Ne.default.isRetriableError),
  renameRetry: Ve.retryifyAsync(De.promisify(de.rename), Ne.default.isRetriableError),
  statRetry: Ve.retryifyAsync(De.promisify(de.stat), Ne.default.isRetriableError),
  writeRetry: Ve.retryifyAsync(De.promisify(de.write), Ne.default.isRetriableError),
  chmodSyncAttempt: Me.attemptifySync(de.chmodSync, Ne.default.onChangeError),
  chownSyncAttempt: Me.attemptifySync(de.chownSync, Ne.default.onChangeError),
  closeSyncAttempt: Me.attemptifySync(de.closeSync),
  mkdirSyncAttempt: Me.attemptifySync(de.mkdirSync),
  realpathSyncAttempt: Me.attemptifySync(de.realpathSync),
  statSyncAttempt: Me.attemptifySync(de.statSync),
  unlinkSyncAttempt: Me.attemptifySync(de.unlinkSync),
  closeSyncRetry: Ve.retryifySync(de.closeSync, Ne.default.isRetriableError),
  fsyncSyncRetry: Ve.retryifySync(de.fsyncSync, Ne.default.isRetriableError),
  openSyncRetry: Ve.retryifySync(de.openSync, Ne.default.isRetriableError),
  readFileSyncRetry: Ve.retryifySync(de.readFileSync, Ne.default.isRetriableError),
  renameSyncRetry: Ve.retryifySync(de.renameSync, Ne.default.isRetriableError),
  statSyncRetry: Ve.retryifySync(de.statSync, Ne.default.isRetriableError),
  writeSyncRetry: Ve.retryifySync(de.writeSync, Ne.default.isRetriableError)
};
Mn.default = Zu;
var Ys = {};
Object.defineProperty(Ys, "__esModule", { value: !0 });
const xu = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
Ys.default = xu;
var Qs = {};
Object.defineProperty(Qs, "__esModule", { value: !0 });
const Wr = {}, _s = {
  next: (e) => {
    const t = Wr[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => _s.next(e)) : delete Wr[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = Wr[e];
    r || (r = Wr[e] = []), r.push(t), !(r.length > 1) && t(() => _s.next(e));
  })
};
Qs.default = _s;
var Zs = {};
Object.defineProperty(Zs, "__esModule", { value: !0 });
const ed = Wt, Uo = ue, zo = Mn, Ge = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = Ge.truncate(t(e));
    return n in Ge.store ? Ge.get(e, t, r) : (Ge.store[n] = r, [n, () => delete Ge.store[n]]);
  },
  purge: (e) => {
    Ge.store[e] && (delete Ge.store[e], zo.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    Ge.store[e] && (delete Ge.store[e], zo.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in Ge.store)
      Ge.purgeSync(e);
  },
  truncate: (e) => {
    const t = ed.basename(e);
    if (t.length <= Uo.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Uo.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", Ge.purgeSyncAll);
Zs.default = Ge;
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.writeFileSync = ct.writeFile = ct.readFileSync = ct.readFile = void 0;
const yc = Wt, Te = ue, le = Mn, He = Ys, td = Qs, Pt = Zs;
function $c(e, t = Te.DEFAULT_READ_OPTIONS) {
  var r;
  if (He.default.isString(t))
    return $c(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Te.DEFAULT_TIMEOUT_ASYNC);
  return le.default.readFileRetry(n)(e, t);
}
ct.readFile = $c;
function _c(e, t = Te.DEFAULT_READ_OPTIONS) {
  var r;
  if (He.default.isString(t))
    return _c(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Te.DEFAULT_TIMEOUT_SYNC);
  return le.default.readFileSyncRetry(n)(e, t);
}
ct.readFileSync = _c;
const gc = (e, t, r, n) => {
  if (He.default.isFunction(r))
    return gc(e, t, Te.DEFAULT_WRITE_OPTIONS, r);
  const s = vc(e, t, r);
  return n && s.then(n, n), s;
};
ct.writeFile = gc;
const vc = async (e, t, r = Te.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (He.default.isString(r))
    return vc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Te.DEFAULT_TIMEOUT_ASYNC);
  let a = null, i = null, l = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), i = await td.default.schedule(e), e = await le.default.realpathAttempt(e) || e, [c, l] = Pt.default.get(e, r.tmpCreate || Pt.default.create, r.tmpPurge !== !1);
    const u = Te.IS_POSIX && He.default.isUndefined(r.chown), h = He.default.isUndefined(r.mode);
    if (u || h) {
      const y = await le.default.statAttempt(e);
      y && (r = { ...r }, u && (r.chown = { uid: y.uid, gid: y.gid }), h && (r.mode = y.mode));
    }
    const S = yc.dirname(e);
    await le.default.mkdirAttempt(S, {
      mode: Te.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await le.default.openRetry(s)(c, "w", r.mode || Te.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), He.default.isString(t) ? await le.default.writeRetry(s)(d, t, 0, r.encoding || Te.DEFAULT_ENCODING) : He.default.isUndefined(t) || await le.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await le.default.fsyncRetry(s)(d) : le.default.fsyncAttempt(d)), await le.default.closeRetry(s)(d), d = null, r.chown && await le.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await le.default.chmodAttempt(c, r.mode);
    try {
      await le.default.renameRetry(s)(c, e);
    } catch (y) {
      if (y.code !== "ENAMETOOLONG")
        throw y;
      await le.default.renameRetry(s)(c, Pt.default.truncate(e));
    }
    l(), c = null;
  } finally {
    d && await le.default.closeAttempt(d), c && Pt.default.purge(c), a && a(), i && i();
  }
}, Ec = (e, t, r = Te.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (He.default.isString(r))
    return Ec(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Te.DEFAULT_TIMEOUT_SYNC);
  let a = null, i = null, l = null;
  try {
    e = le.default.realpathSyncAttempt(e) || e, [i, a] = Pt.default.get(e, r.tmpCreate || Pt.default.create, r.tmpPurge !== !1);
    const c = Te.IS_POSIX && He.default.isUndefined(r.chown), d = He.default.isUndefined(r.mode);
    if (c || d) {
      const h = le.default.statSyncAttempt(e);
      h && (r = { ...r }, c && (r.chown = { uid: h.uid, gid: h.gid }), d && (r.mode = h.mode));
    }
    const u = yc.dirname(e);
    le.default.mkdirSyncAttempt(u, {
      mode: Te.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), l = le.default.openSyncRetry(s)(i, "w", r.mode || Te.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), He.default.isString(t) ? le.default.writeSyncRetry(s)(l, t, 0, r.encoding || Te.DEFAULT_ENCODING) : He.default.isUndefined(t) || le.default.writeSyncRetry(s)(l, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? le.default.fsyncSyncRetry(s)(l) : le.default.fsyncAttempt(l)), le.default.closeSyncRetry(s)(l), l = null, r.chown && le.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && le.default.chmodSyncAttempt(i, r.mode);
    try {
      le.default.renameSyncRetry(s)(i, e);
    } catch (h) {
      if (h.code !== "ENAMETOOLONG")
        throw h;
      le.default.renameSyncRetry(s)(i, Pt.default.truncate(e));
    }
    a(), i = null;
  } finally {
    l && le.default.closeSyncAttempt(l), i && Pt.default.purge(i);
  }
};
ct.writeFileSync = Ec;
var gs = { exports: {} }, wc = {}, rt = {}, or = {}, Lr = {}, oe = {}, Dr = {};
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
  function s(m, ...E) {
    const N = [m[0]];
    let R = 0;
    for (; R < E.length; )
      l(N, E[R]), N.push(m[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(m, ...E) {
    const N = [y(m[0])];
    let R = 0;
    for (; R < E.length; )
      N.push(a), l(N, E[R]), N.push(a, y(m[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function l(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(h(E));
  }
  e.addCodeArg = l;
  function c(m) {
    let E = 1;
    for (; E < m.length - 1; ) {
      if (m[E] === a) {
        const N = d(m[E - 1], m[E + 1]);
        if (N !== void 0) {
          m.splice(E - 1, 3, N);
          continue;
        }
        m[E++] = "+";
      }
      E++;
    }
  }
  function d(m, E) {
    if (E === '""')
      return m;
    if (m === '""')
      return E;
    if (typeof m == "string")
      return E instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${m.slice(0, -1)}${E}"` : E[0] === '"' ? m.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(m instanceof r))
      return `"${m}${E.slice(1)}`;
  }
  function u(m, E) {
    return E.emptyStr() ? m : m.emptyStr() ? E : i`${m}${E}`;
  }
  e.strConcat = u;
  function h(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : y(Array.isArray(m) ? m.join(",") : m);
  }
  function S(m) {
    return new n(y(m));
  }
  e.stringify = S;
  function y(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = y;
  function v(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = v;
  function g(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function _(m) {
    return new n(m.toString());
  }
  e.regexpCode = _;
})(Dr);
var vs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Dr;
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
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, h;
      if (!((h = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class l extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, u) {
      var h;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const S = this.toName(d), { prefix: y } = S, v = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let g = this._values[y];
      if (g) {
        const E = g.get(v);
        if (E)
          return E;
      } else
        g = this._values[y] = /* @__PURE__ */ new Map();
      g.set(v, S);
      const _ = this._scope[y] || (this._scope[y] = []), m = _.length;
      return _[m] = u.ref, S.setValue(u, { property: y, itemIndex: m }), S;
    }
    getValue(d, u) {
      const h = this._values[d];
      if (h)
        return h.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, h) {
      return this._reduceValues(d, (S) => {
        if (S.value === void 0)
          throw new Error(`CodeGen: name "${S}" has no value`);
        return S.value.code;
      }, u, h);
    }
    _reduceValues(d, u, h = {}, S) {
      let y = t.nil;
      for (const v in d) {
        const g = d[v];
        if (!g)
          continue;
        const _ = h[v] = h[v] || /* @__PURE__ */ new Map();
        g.forEach((m) => {
          if (_.has(m))
            return;
          _.set(m, n.Started);
          let E = u(m);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            y = (0, t._)`${y}${N} ${m} = ${E};${this.opts._n}`;
          } else if (E = S == null ? void 0 : S(m))
            y = (0, t._)`${y}${E}${this.opts._n}`;
          else
            throw new r(m);
          _.set(m, n.Completed);
        });
      }
      return y;
    }
  }
  e.ValueScope = l;
})(vs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Dr, r = vs;
  var n = Dr;
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
  var s = vs;
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
    constructor(o, f, P) {
      super(), this.varKind = o, this.name = f, this.rhs = P;
    }
    render({ es5: o, _n: f }) {
      const P = o ? r.varKinds.var : this.varKind, k = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${k};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = M(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends a {
    constructor(o, f, P) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = P;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = M(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return re(o, this.rhs);
    }
  }
  class c extends l {
    constructor(o, f, P, k) {
      super(o, P, k), this.op = f;
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
  class u extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class h extends a {
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
  class S extends a {
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
      return this.code = M(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class y extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, P) => f + P.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const P = o[f].optimizeNodes();
        Array.isArray(P) ? o.splice(f, 1, ...P) : P ? o[f] = P : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: P } = this;
      let k = P.length;
      for (; k--; ) {
        const C = P[k];
        C.optimizeNames(o, f) || (L(o, C.names), P.splice(k, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Z(o, f.names), {});
    }
  }
  class v extends y {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends y {
  }
  class _ extends v {
  }
  _.kind = "else";
  class m extends v {
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
        const P = f.optimizeNodes();
        f = this.else = Array.isArray(P) ? new _(P) : P;
      }
      if (f)
        return o === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(H(o), f instanceof m ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = M(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return re(o, this.condition), this.else && Z(o, this.else.names), o;
    }
  }
  m.kind = "if";
  class E extends v {
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
        return this.iteration = M(this.iteration, o, f), this;
    }
    get names() {
      return Z(super.names, this.iteration.names);
    }
  }
  class R extends E {
    constructor(o, f, P, k) {
      super(), this.varKind = o, this.name = f, this.from = P, this.to = k;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: P, from: k, to: C } = this;
      return `for(${f} ${P}=${k}; ${P}<${C}; ${P}++)` + super.render(o);
    }
    get names() {
      const o = re(super.names, this.from);
      return re(o, this.to);
    }
  }
  class j extends E {
    constructor(o, f, P, k) {
      super(), this.loop = o, this.varKind = f, this.name = P, this.iterable = k;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = M(this.iterable, o, f), this;
    }
    get names() {
      return Z(super.names, this.iterable.names);
    }
  }
  class q extends v {
    constructor(o, f, P) {
      super(), this.name = o, this.args = f, this.async = P;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  q.kind = "func";
  class J extends y {
    render(o) {
      return "return " + super.render(o);
    }
  }
  J.kind = "return";
  class ce extends v {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var P, k;
      return super.optimizeNames(o, f), (P = this.catch) === null || P === void 0 || P.optimizeNames(o, f), (k = this.finally) === null || k === void 0 || k.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Z(o, this.catch.names), this.finally && Z(o, this.finally.names), o;
    }
  }
  class K extends v {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  K.kind = "catch";
  class Y extends v {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  Y.kind = "finally";
  class ie {
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
      const P = this._extScope.value(o, f);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
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
    _def(o, f, P, k) {
      const C = this._scope.toName(f);
      return P !== void 0 && k && (this._constants[C.str] = P), this._leafNode(new i(o, C, P)), C;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, P) {
      return this._def(r.varKinds.const, o, f, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, P) {
      return this._def(r.varKinds.let, o, f, P);
    }
    // `var` declaration with optional assignment
    var(o, f, P) {
      return this._def(r.varKinds.var, o, f, P);
    }
    // assignment code
    assign(o, f, P) {
      return this._leafNode(new l(o, f, P));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new S(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [P, k] of o)
        f.length > 1 && f.push(","), f.push(P), (P !== k || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, k));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, P) {
      if (this._blockNode(new m(o)), f && P)
        this.code(f).else().code(P).endIf();
      else if (f)
        this.code(f).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new m(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, _);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, P, k, C = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const B = this._scope.toName(o);
      return this._for(new R(C, B, f, P), () => k(B));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, P, k = r.varKinds.const) {
      const C = this._scope.toName(o);
      if (this.opts.es5) {
        const B = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${B}.length`, (G) => {
          this.var(C, (0, t._)`${B}[${G}]`), P(C);
        });
      }
      return this._for(new j("of", k, C, f), () => P(C));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, P, k = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, P);
      const C = this._scope.toName(o);
      return this._for(new j("in", k, C, f), () => P(C));
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
      return this._leafNode(new u(o));
    }
    // `return` statement
    return(o) {
      const f = new J();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(J);
    }
    // `try` statement
    try(o, f, P) {
      if (!f && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const k = new ce();
      if (this._blockNode(k), this.code(o), f) {
        const C = this.name("e");
        this._currNode = k.catch = new K(C), f(C);
      }
      return P && (this._currNode = k.finally = new Y(), this.code(P)), this._endBlockNode(K, Y);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new h(o));
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
      const P = this._nodes.length - f;
      if (P < 0 || o !== void 0 && P !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, P, k) {
      return this._blockNode(new q(o, f, P)), k && this.code(k).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(q);
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
      const P = this._currNode;
      if (P instanceof o || f && P instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof m))
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
  e.CodeGen = ie;
  function Z($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) + (o[f] || 0);
    return $;
  }
  function re($, o) {
    return o instanceof t._CodeOrName ? Z($, o.names) : $;
  }
  function M($, o, f) {
    if ($ instanceof t.Name)
      return P($);
    if (!k($))
      return $;
    return new t._Code($._items.reduce((C, B) => (B instanceof t.Name && (B = P(B)), B instanceof t._Code ? C.push(...B._items) : C.push(B), C), []));
    function P(C) {
      const B = f[C.str];
      return B === void 0 || o[C.str] !== 1 ? C : (delete o[C.str], B);
    }
    function k(C) {
      return C instanceof t._Code && C._items.some((B) => B instanceof t.Name && o[B.str] === 1 && f[B.str] !== void 0);
    }
  }
  function L($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) - (o[f] || 0);
  }
  function H($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${b($)}`;
  }
  e.not = H;
  const V = p(e.operators.AND);
  function I(...$) {
    return $.reduce(V);
  }
  e.and = I;
  const A = p(e.operators.OR);
  function w(...$) {
    return $.reduce(A);
  }
  e.or = w;
  function p($) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${b(o)} ${$} ${b(f)}`;
  }
  function b($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(oe);
var U = {};
Object.defineProperty(U, "__esModule", { value: !0 });
U.checkStrictMode = U.getErrorPath = U.Type = U.useFunc = U.setEvaluated = U.evaluatedPropsToName = U.mergeEvaluated = U.eachItem = U.unescapeJsonPointer = U.escapeJsonPointer = U.escapeFragment = U.unescapeFragment = U.schemaRefOrVal = U.schemaHasRulesButRef = U.schemaHasRules = U.checkUnknownRules = U.alwaysValidSchema = U.toHash = void 0;
const fe = oe, rd = Dr;
function nd(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
U.toHash = nd;
function sd(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Sc(e, t), !bc(t, e.self.RULES.all));
}
U.alwaysValidSchema = sd;
function Sc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Oc(e, `unknown keyword: "${a}"`);
}
U.checkUnknownRules = Sc;
function bc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
U.schemaHasRules = bc;
function ad(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
U.schemaHasRulesButRef = ad;
function od({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, fe._)`${r}`;
  }
  return (0, fe._)`${e}${t}${(0, fe.getProperty)(n)}`;
}
U.schemaRefOrVal = od;
function id(e) {
  return Pc(decodeURIComponent(e));
}
U.unescapeFragment = id;
function cd(e) {
  return encodeURIComponent(xs(e));
}
U.escapeFragment = cd;
function xs(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
U.escapeJsonPointer = xs;
function Pc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
U.unescapeJsonPointer = Pc;
function ld(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
U.eachItem = ld;
function qo({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, l) => {
    const c = i === void 0 ? a : i instanceof fe.Name ? (a instanceof fe.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof fe.Name ? (t(s, i, a), a) : r(a, i);
    return l === fe.Name && !(c instanceof fe.Name) ? n(s, c) : c;
  };
}
U.mergeEvaluated = {
  props: qo({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, fe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, fe._)`${r} || {}`).code((0, fe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, fe._)`${r} || {}`), ea(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Nc
  }),
  items: qo({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, fe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, fe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Nc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, fe._)`{}`);
  return t !== void 0 && ea(e, r, t), r;
}
U.evaluatedPropsToName = Nc;
function ea(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, fe._)`${t}${(0, fe.getProperty)(n)}`, !0));
}
U.setEvaluated = ea;
const Ko = {};
function ud(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Ko[t.code] || (Ko[t.code] = new rd._Code(t.code))
  });
}
U.useFunc = ud;
var Es;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Es || (U.Type = Es = {}));
function dd(e, t, r) {
  if (e instanceof fe.Name) {
    const n = t === Es.Num;
    return r ? n ? (0, fe._)`"[" + ${e} + "]"` : (0, fe._)`"['" + ${e} + "']"` : n ? (0, fe._)`"/" + ${e}` : (0, fe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, fe.getProperty)(e).toString() : "/" + xs(e);
}
U.getErrorPath = dd;
function Oc(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
U.checkStrictMode = Oc;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
const ke = oe, fd = {
  // validation function arguments
  data: new ke.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new ke.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new ke.Name("instancePath"),
  parentData: new ke.Name("parentData"),
  parentDataProperty: new ke.Name("parentDataProperty"),
  rootData: new ke.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new ke.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new ke.Name("vErrors"),
  // null or array of validation errors
  errors: new ke.Name("errors"),
  // counter of validation errors
  this: new ke.Name("this"),
  // "globals"
  self: new ke.Name("self"),
  scope: new ke.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new ke.Name("json"),
  jsonPos: new ke.Name("jsonPos"),
  jsonLen: new ke.Name("jsonLen"),
  jsonPart: new ke.Name("jsonPart")
};
dt.default = fd;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = oe, r = U, n = dt;
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: m }) => m ? (0, t.str)`"${_}" keyword must be ${m} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function s(_, m = e.keywordError, E, N) {
    const { it: R } = _, { gen: j, compositeRule: q, allErrors: J } = R, ce = h(_, m, E);
    N ?? (q || J) ? c(j, ce) : d(R, (0, t._)`[${ce}]`);
  }
  e.reportError = s;
  function a(_, m = e.keywordError, E) {
    const { it: N } = _, { gen: R, compositeRule: j, allErrors: q } = N, J = h(_, m, E);
    c(R, J), j || q || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(_, m) {
    _.assign(n.default.errors, m), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(m, () => _.assign((0, t._)`${n.default.vErrors}.length`, m), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function l({ gen: _, keyword: m, schemaValue: E, data: N, errsCount: R, it: j }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const q = _.name("err");
    _.forRange("i", R, n.default.errors, (J) => {
      _.const(q, (0, t._)`${n.default.vErrors}[${J}]`), _.if((0, t._)`${q}.instancePath === undefined`, () => _.assign((0, t._)`${q}.instancePath`, (0, t.strConcat)(n.default.instancePath, j.errorPath))), _.assign((0, t._)`${q}.schemaPath`, (0, t.str)`${j.errSchemaPath}/${m}`), j.opts.verbose && (_.assign((0, t._)`${q}.schema`, E), _.assign((0, t._)`${q}.data`, N));
    });
  }
  e.extendErrors = l;
  function c(_, m) {
    const E = _.const("err", m);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function d(_, m) {
    const { gen: E, validateName: N, schemaEnv: R } = _;
    R.$async ? E.throw((0, t._)`new ${_.ValidationError}(${m})`) : (E.assign((0, t._)`${N}.errors`, m), E.return(!1));
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
  function h(_, m, E) {
    const { createErrors: N } = _.it;
    return N === !1 ? (0, t._)`{}` : S(_, m, E);
  }
  function S(_, m, E = {}) {
    const { gen: N, it: R } = _, j = [
      y(R, E),
      v(_, E)
    ];
    return g(_, m, j), N.object(...j);
  }
  function y({ errorPath: _ }, { instancePath: m }) {
    const E = m ? (0, t.str)`${_}${(0, r.getErrorPath)(m, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function v({ keyword: _, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: N }) {
    let R = N ? m : (0, t.str)`${m}/${_}`;
    return E && (R = (0, t.str)`${R}${(0, r.getErrorPath)(E, r.Type.Str)}`), [u.schemaPath, R];
  }
  function g(_, { params: m, message: E }, N) {
    const { keyword: R, data: j, schemaValue: q, it: J } = _, { opts: ce, propertyName: K, topSchemaRef: Y, schemaPath: ie } = J;
    N.push([u.keyword, R], [u.params, typeof m == "function" ? m(_) : m || (0, t._)`{}`]), ce.messages && N.push([u.message, typeof E == "function" ? E(_) : E]), ce.verbose && N.push([u.schema, q], [u.parentSchema, (0, t._)`${Y}${ie}`], [n.default.data, j]), K && N.push([u.propertyName, K]);
  }
})(Lr);
Object.defineProperty(or, "__esModule", { value: !0 });
or.boolOrEmptySchema = or.topBoolOrEmptySchema = void 0;
const hd = Lr, md = oe, pd = dt, yd = {
  message: "boolean schema is false"
};
function $d(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Rc(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(pd.default.data) : (t.assign((0, md._)`${n}.errors`, null), t.return(!0));
}
or.topBoolOrEmptySchema = $d;
function _d(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Rc(e)) : r.var(t, !0);
}
or.boolOrEmptySchema = _d;
function Rc(e, t) {
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
  (0, hd.reportError)(s, yd, void 0, t);
}
var we = {}, Kt = {};
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.getRules = Kt.isJSONType = void 0;
const gd = ["string", "number", "integer", "boolean", "null", "object", "array"], vd = new Set(gd);
function Ed(e) {
  return typeof e == "string" && vd.has(e);
}
Kt.isJSONType = Ed;
function wd() {
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
Kt.getRules = wd;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.shouldUseRule = mt.shouldUseGroup = mt.schemaHasRulesForType = void 0;
function Sd({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Tc(e, n);
}
mt.schemaHasRulesForType = Sd;
function Tc(e, t) {
  return t.rules.some((r) => Ic(e, r));
}
mt.shouldUseGroup = Tc;
function Ic(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
mt.shouldUseRule = Ic;
Object.defineProperty(we, "__esModule", { value: !0 });
we.reportTypeError = we.checkDataTypes = we.checkDataType = we.coerceAndCheckDataType = we.getJSONTypes = we.getSchemaTypes = we.DataType = void 0;
const bd = Kt, Pd = mt, Nd = Lr, ee = oe, jc = U;
var er;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(er || (we.DataType = er = {}));
function Od(e) {
  const t = Ac(e.type);
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
we.getSchemaTypes = Od;
function Ac(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(bd.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
we.getJSONTypes = Ac;
function Rd(e, t) {
  const { gen: r, data: n, opts: s } = e, a = Td(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Pd.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const l = ta(t, n, s.strictNumbers, er.Wrong);
    r.if(l, () => {
      a.length ? Id(e, t, a) : ra(e);
    });
  }
  return i;
}
we.coerceAndCheckDataType = Rd;
const kc = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Td(e, t) {
  return t ? e.filter((r) => kc.has(r) || t === "array" && r === "array") : [];
}
function Id(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, ee._)`typeof ${s}`), l = n.let("coerced", (0, ee._)`undefined`);
  a.coerceTypes === "array" && n.if((0, ee._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, ee._)`${s}[0]`).assign(i, (0, ee._)`typeof ${s}`).if(ta(t, s, a.strictNumbers), () => n.assign(l, s))), n.if((0, ee._)`${l} !== undefined`);
  for (const d of r)
    (kc.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), ra(e), n.endIf(), n.if((0, ee._)`${l} !== undefined`, () => {
    n.assign(s, l), jd(e, l);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, ee._)`${i} == "number" || ${i} == "boolean"`).assign(l, (0, ee._)`"" + ${s}`).elseIf((0, ee._)`${s} === null`).assign(l, (0, ee._)`""`);
        return;
      case "number":
        n.elseIf((0, ee._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, ee._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, ee._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, ee._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, ee._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, ee._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, ee._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, ee._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(l, (0, ee._)`[${s}]`);
    }
  }
}
function jd({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ee._)`${t} !== undefined`, () => e.assign((0, ee._)`${t}[${r}]`, n));
}
function ws(e, t, r, n = er.Correct) {
  const s = n === er.Correct ? ee.operators.EQ : ee.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, ee._)`${t} ${s} null`;
    case "array":
      a = (0, ee._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, ee._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, ee._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, ee._)`typeof ${t} ${s} ${e}`;
  }
  return n === er.Correct ? a : (0, ee.not)(a);
  function i(l = ee.nil) {
    return (0, ee.and)((0, ee._)`typeof ${t} == "number"`, l, r ? (0, ee._)`isFinite(${t})` : ee.nil);
  }
}
we.checkDataType = ws;
function ta(e, t, r, n) {
  if (e.length === 1)
    return ws(e[0], t, r, n);
  let s;
  const a = (0, jc.toHash)(e);
  if (a.array && a.object) {
    const i = (0, ee._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, ee._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = ee.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, ee.and)(s, ws(i, t, r, n));
  return s;
}
we.checkDataTypes = ta;
const Ad = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ee._)`{type: ${e}}` : (0, ee._)`{type: ${t}}`
};
function ra(e) {
  const t = kd(e);
  (0, Nd.reportError)(t, Ad);
}
we.reportTypeError = ra;
function kd(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, jc.schemaRefOrVal)(e, n, "type");
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
var Ln = {};
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.assignDefaults = void 0;
const Jt = oe, Cd = U;
function Dd(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Go(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Go(e, a, s.default));
}
Ln.assignDefaults = Dd;
function Go(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const l = (0, Jt._)`${a}${(0, Jt.getProperty)(t)}`;
  if (s) {
    (0, Cd.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, Jt._)`${l} === undefined`;
  i.useDefaults === "empty" && (c = (0, Jt._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, Jt._)`${l} = ${(0, Jt.stringify)(r)}`);
}
var lt = {}, se = {};
Object.defineProperty(se, "__esModule", { value: !0 });
se.validateUnion = se.validateArray = se.usePattern = se.callValidateCode = se.schemaProperties = se.allSchemaProperties = se.noPropertyInData = se.propertyInData = se.isOwnProperty = se.hasPropFunc = se.reportMissingProp = se.checkMissingProp = se.checkReportMissingProp = void 0;
const pe = oe, na = U, _t = dt, Md = U;
function Ld(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(aa(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, pe._)`${t}` }, !0), e.error();
  });
}
se.checkReportMissingProp = Ld;
function Fd({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, pe.or)(...n.map((a) => (0, pe.and)(aa(e, t, a, r.ownProperties), (0, pe._)`${s} = ${a}`)));
}
se.checkMissingProp = Fd;
function Vd(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
se.reportMissingProp = Vd;
function Cc(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, pe._)`Object.prototype.hasOwnProperty`
  });
}
se.hasPropFunc = Cc;
function sa(e, t, r) {
  return (0, pe._)`${Cc(e)}.call(${t}, ${r})`;
}
se.isOwnProperty = sa;
function Ud(e, t, r, n) {
  const s = (0, pe._)`${t}${(0, pe.getProperty)(r)} !== undefined`;
  return n ? (0, pe._)`${s} && ${sa(e, t, r)}` : s;
}
se.propertyInData = Ud;
function aa(e, t, r, n) {
  const s = (0, pe._)`${t}${(0, pe.getProperty)(r)} === undefined`;
  return n ? (0, pe.or)(s, (0, pe.not)(sa(e, t, r))) : s;
}
se.noPropertyInData = aa;
function Dc(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
se.allSchemaProperties = Dc;
function zd(e, t) {
  return Dc(t).filter((r) => !(0, na.alwaysValidSchema)(e, t[r]));
}
se.schemaProperties = zd;
function qd({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, l, c, d) {
  const u = d ? (0, pe._)`${e}, ${t}, ${n}${s}` : t, h = [
    [_t.default.instancePath, (0, pe.strConcat)(_t.default.instancePath, a)],
    [_t.default.parentData, i.parentData],
    [_t.default.parentDataProperty, i.parentDataProperty],
    [_t.default.rootData, _t.default.rootData]
  ];
  i.opts.dynamicRef && h.push([_t.default.dynamicAnchors, _t.default.dynamicAnchors]);
  const S = (0, pe._)`${u}, ${r.object(...h)}`;
  return c !== pe.nil ? (0, pe._)`${l}.call(${c}, ${S})` : (0, pe._)`${l}(${S})`;
}
se.callValidateCode = qd;
const Kd = (0, pe._)`new RegExp`;
function Gd({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, pe._)`${s.code === "new RegExp" ? Kd : (0, Md.useFunc)(e, s)}(${r}, ${n})`
  });
}
se.usePattern = Gd;
function Hd(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return i(() => t.assign(l, !1)), l;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(l) {
    const c = t.const("len", (0, pe._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: na.Type.Num
      }, a), t.if((0, pe.not)(a), l);
    });
  }
}
se.validateArray = Hd;
function Bd(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, na.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, l);
    t.assign(i, (0, pe._)`${i} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, pe.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
se.validateUnion = Bd;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.validateKeywordUsage = lt.validSchemaType = lt.funcKeywordCode = lt.macroKeywordCode = void 0;
const Le = oe, Ft = dt, Wd = se, Jd = Lr;
function Xd(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, l = t.macro.call(i.self, s, a, i), c = Mc(r, n, l);
  i.opts.validateSchema !== !1 && i.self.validateSchema(l, !0);
  const d = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: Le.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
lt.macroKeywordCode = Xd;
function Yd(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: l, it: c } = e;
  Zd(c, t);
  const d = !l && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, u = Mc(n, s, d), h = n.let("valid");
  e.block$data(h, S), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function S() {
    if (t.errors === !1)
      g(), t.modifying && Ho(e), _(() => e.error());
    else {
      const m = t.async ? y() : v();
      t.modifying && Ho(e), _(() => Qd(e, m));
    }
  }
  function y() {
    const m = n.let("ruleErrs", null);
    return n.try(() => g((0, Le._)`await `), (E) => n.assign(h, !1).if((0, Le._)`${E} instanceof ${c.ValidationError}`, () => n.assign(m, (0, Le._)`${E}.errors`), () => n.throw(E))), m;
  }
  function v() {
    const m = (0, Le._)`${u}.errors`;
    return n.assign(m, null), g(Le.nil), m;
  }
  function g(m = t.async ? (0, Le._)`await ` : Le.nil) {
    const E = c.opts.passContext ? Ft.default.this : Ft.default.self, N = !("compile" in t && !l || t.schema === !1);
    n.assign(h, (0, Le._)`${m}${(0, Wd.callValidateCode)(e, u, E, N)}`, t.modifying);
  }
  function _(m) {
    var E;
    n.if((0, Le.not)((E = t.valid) !== null && E !== void 0 ? E : h), m);
  }
}
lt.funcKeywordCode = Yd;
function Ho(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Le._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Qd(e, t) {
  const { gen: r } = e;
  r.if((0, Le._)`Array.isArray(${t})`, () => {
    r.assign(Ft.default.vErrors, (0, Le._)`${Ft.default.vErrors} === null ? ${t} : ${Ft.default.vErrors}.concat(${t})`).assign(Ft.default.errors, (0, Le._)`${Ft.default.vErrors}.length`), (0, Jd.extendErrors)(e);
  }, () => e.error());
}
function Zd({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Mc(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Le.stringify)(r) });
}
function xd(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
lt.validSchemaType = xd;
function ef({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
lt.validateKeywordUsage = ef;
var Tt = {};
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.extendSubschemaMode = Tt.extendSubschemaData = Tt.getSubschema = void 0;
const it = oe, Lc = U;
function tf(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, it._)`${e.schemaPath}${(0, it.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, it._)`${e.schemaPath}${(0, it.getProperty)(t)}${(0, it.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Lc.escapeFragment)(r)}`
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
Tt.getSubschema = tf;
function rf(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: h } = t, S = l.let("data", (0, it._)`${t.data}${(0, it.getProperty)(r)}`, !0);
    c(S), e.errorPath = (0, it.str)`${d}${(0, Lc.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, it._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof it.Name ? s : l.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Tt.extendSubschemaData = rf;
function nf(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Tt.extendSubschemaMode = nf;
var Ie = {}, Fn = function e(t, r) {
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
}, Fc = { exports: {} }, Nt = Fc.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  mn(t, n, s, e, "", e);
};
Nt.keywords = {
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
Nt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Nt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Nt.skipKeywords = {
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
function mn(e, t, r, n, s, a, i, l, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, l, c, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Nt.arrayKeywords)
          for (var S = 0; S < h.length; S++)
            mn(e, t, r, h[S], s + "/" + u + "/" + S, a, s, u, n, S);
      } else if (u in Nt.propsKeywords) {
        if (h && typeof h == "object")
          for (var y in h)
            mn(e, t, r, h[y], s + "/" + u + "/" + sf(y), a, s, u, n, y);
      } else (u in Nt.keywords || e.allKeys && !(u in Nt.skipKeywords)) && mn(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, i, l, c, d);
  }
}
function sf(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var af = Fc.exports;
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.getSchemaRefs = Ie.resolveUrl = Ie.normalizeId = Ie._getFullPath = Ie.getFullPath = Ie.inlineRef = void 0;
const of = U, cf = Fn, lf = af, uf = /* @__PURE__ */ new Set([
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
function df(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Ss(e) : t ? Vc(e) <= t : !1;
}
Ie.inlineRef = df;
const ff = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Ss(e) {
  for (const t in e) {
    if (ff.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Ss) || typeof r == "object" && Ss(r))
      return !0;
  }
  return !1;
}
function Vc(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !uf.has(r) && (typeof e[r] == "object" && (0, of.eachItem)(e[r], (n) => t += Vc(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Uc(e, t = "", r) {
  r !== !1 && (t = tr(t));
  const n = e.parse(t);
  return zc(e, n);
}
Ie.getFullPath = Uc;
function zc(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ie._getFullPath = zc;
const hf = /#\/?$/;
function tr(e) {
  return e ? e.replace(hf, "") : "";
}
Ie.normalizeId = tr;
function mf(e, t, r) {
  return r = tr(r), e.resolve(t, r);
}
Ie.resolveUrl = mf;
const pf = /^[a-z_][-a-z0-9._]*$/i;
function yf(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = tr(e[r] || t), a = { "": s }, i = Uc(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return lf(e, { allKeys: !0 }, (h, S, y, v) => {
    if (v === void 0)
      return;
    const g = i + S;
    let _ = a[v];
    typeof h[r] == "string" && (_ = m.call(this, h[r])), E.call(this, h.$anchor), E.call(this, h.$dynamicAnchor), a[S] = _;
    function m(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = tr(_ ? R(_, N) : N), c.has(N))
        throw u(N);
      c.add(N);
      let j = this.refs[N];
      return typeof j == "string" && (j = this.refs[j]), typeof j == "object" ? d(h, j.schema, N) : N !== tr(g) && (N[0] === "#" ? (d(h, l[N], N), l[N] = h) : this.refs[N] = g), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!pf.test(N))
          throw new Error(`invalid anchor "${N}"`);
        m.call(this, `#${N}`);
      }
    }
  }), l;
  function d(h, S, y) {
    if (S !== void 0 && !cf(h, S))
      throw u(y);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Ie.getSchemaRefs = yf;
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.getData = rt.KeywordCxt = rt.validateFunctionCode = void 0;
const qc = or, Bo = we, oa = mt, Pn = we, $f = Ln, Nr = lt, rs = Tt, X = oe, Q = dt, _f = Ie, pt = U, _r = Lr;
function gf(e) {
  if (Hc(e) && (Bc(e), Gc(e))) {
    wf(e);
    return;
  }
  Kc(e, () => (0, qc.topBoolOrEmptySchema)(e));
}
rt.validateFunctionCode = gf;
function Kc({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, X._)`${Q.default.data}, ${Q.default.valCxt}`, n.$async, () => {
    e.code((0, X._)`"use strict"; ${Wo(r, s)}`), Ef(e, s), e.code(a);
  }) : e.func(t, (0, X._)`${Q.default.data}, ${vf(s)}`, n.$async, () => e.code(Wo(r, s)).code(a));
}
function vf(e) {
  return (0, X._)`{${Q.default.instancePath}="", ${Q.default.parentData}, ${Q.default.parentDataProperty}, ${Q.default.rootData}=${Q.default.data}${e.dynamicRef ? (0, X._)`, ${Q.default.dynamicAnchors}={}` : X.nil}}={}`;
}
function Ef(e, t) {
  e.if(Q.default.valCxt, () => {
    e.var(Q.default.instancePath, (0, X._)`${Q.default.valCxt}.${Q.default.instancePath}`), e.var(Q.default.parentData, (0, X._)`${Q.default.valCxt}.${Q.default.parentData}`), e.var(Q.default.parentDataProperty, (0, X._)`${Q.default.valCxt}.${Q.default.parentDataProperty}`), e.var(Q.default.rootData, (0, X._)`${Q.default.valCxt}.${Q.default.rootData}`), t.dynamicRef && e.var(Q.default.dynamicAnchors, (0, X._)`${Q.default.valCxt}.${Q.default.dynamicAnchors}`);
  }, () => {
    e.var(Q.default.instancePath, (0, X._)`""`), e.var(Q.default.parentData, (0, X._)`undefined`), e.var(Q.default.parentDataProperty, (0, X._)`undefined`), e.var(Q.default.rootData, Q.default.data), t.dynamicRef && e.var(Q.default.dynamicAnchors, (0, X._)`{}`);
  });
}
function wf(e) {
  const { schema: t, opts: r, gen: n } = e;
  Kc(e, () => {
    r.$comment && t.$comment && Jc(e), Of(e), n.let(Q.default.vErrors, null), n.let(Q.default.errors, 0), r.unevaluated && Sf(e), Wc(e), If(e);
  });
}
function Sf(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, X._)`${r}.evaluated`), t.if((0, X._)`${e.evaluated}.dynamicProps`, () => t.assign((0, X._)`${e.evaluated}.props`, (0, X._)`undefined`)), t.if((0, X._)`${e.evaluated}.dynamicItems`, () => t.assign((0, X._)`${e.evaluated}.items`, (0, X._)`undefined`));
}
function Wo(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, X._)`/*# sourceURL=${r} */` : X.nil;
}
function bf(e, t) {
  if (Hc(e) && (Bc(e), Gc(e))) {
    Pf(e, t);
    return;
  }
  (0, qc.boolOrEmptySchema)(e, t);
}
function Gc({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Hc(e) {
  return typeof e.schema != "boolean";
}
function Pf(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Jc(e), Rf(e), Tf(e);
  const a = n.const("_errs", Q.default.errors);
  Wc(e, a), n.var(t, (0, X._)`${a} === ${Q.default.errors}`);
}
function Bc(e) {
  (0, pt.checkUnknownRules)(e), Nf(e);
}
function Wc(e, t) {
  if (e.opts.jtd)
    return Jo(e, [], !1, t);
  const r = (0, Bo.getSchemaTypes)(e.schema), n = (0, Bo.coerceAndCheckDataType)(e, r);
  Jo(e, r, !n, t);
}
function Nf(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, pt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Of(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, pt.checkStrictMode)(e, "default is ignored in the schema root");
}
function Rf(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, _f.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Tf(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Jc({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, X._)`${Q.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, X.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, X._)`${Q.default.self}.opts.$comment(${a}, ${i}, ${l}.schema)`);
  }
}
function If(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, X._)`${Q.default.errors} === 0`, () => t.return(Q.default.data), () => t.throw((0, X._)`new ${s}(${Q.default.vErrors})`)) : (t.assign((0, X._)`${n}.errors`, Q.default.vErrors), a.unevaluated && jf(e), t.return((0, X._)`${Q.default.errors} === 0`));
}
function jf({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof X.Name && e.assign((0, X._)`${t}.props`, r), n instanceof X.Name && e.assign((0, X._)`${t}.items`, n);
}
function Jo(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: l, opts: c, self: d } = e, { RULES: u } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, pt.schemaHasRulesButRef)(a, u))) {
    s.block(() => Qc(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || Af(e, t), s.block(() => {
    for (const S of u.rules)
      h(S);
    h(u.post);
  });
  function h(S) {
    (0, oa.shouldUseGroup)(a, S) && (S.type ? (s.if((0, Pn.checkDataType)(S.type, i, c.strictNumbers)), Xo(e, S), t.length === 1 && t[0] === S.type && r && (s.else(), (0, Pn.reportTypeError)(e)), s.endIf()) : Xo(e, S), l || s.if((0, X._)`${Q.default.errors} === ${n || 0}`));
  }
}
function Xo(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, $f.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, oa.shouldUseRule)(n, a) && Qc(e, a.keyword, a.definition, t.type);
  });
}
function Af(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (kf(e, t), e.opts.allowUnionTypes || Cf(e, t), Df(e, e.dataTypes));
}
function kf(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Xc(e.dataTypes, r) || ia(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Lf(e, t);
  }
}
function Cf(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && ia(e, "use allowUnionTypes to allow union type keyword");
}
function Df(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, oa.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => Mf(t, i)) && ia(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function Mf(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Xc(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Lf(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Xc(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function ia(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, pt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Yc {
  constructor(t, r, n) {
    if ((0, Nr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, pt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Zc(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Nr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? _r.reportExtraError : _r.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, _r.reportError)(this, this.def.$dataError || _r.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, _r.resetErrorsCount)(this.gen, this.errsCount);
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
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, X.or)((0, X._)`${s} === undefined`, r)), t !== X.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== X.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, X.or)(i(), l());
    function i() {
      if (n.length) {
        if (!(r instanceof X.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, X._)`${(0, Pn.checkDataTypes)(c, r, a.opts.strictNumbers, Pn.DataType.Wrong)}`;
      }
      return X.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, X._)`!${c}(${r})`;
      }
      return X.nil;
    }
  }
  subschema(t, r) {
    const n = (0, rs.getSubschema)(this.it, t);
    (0, rs.extendSubschemaData)(n, this.it, t), (0, rs.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return bf(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = pt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = pt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, X.Name)), !0;
  }
}
rt.KeywordCxt = Yc;
function Qc(e, t, r, n) {
  const s = new Yc(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Nr.funcKeywordCode)(s, r) : "macro" in r ? (0, Nr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Nr.funcKeywordCode)(s, r);
}
const Ff = /^\/(?:[^~]|~0|~1)*$/, Vf = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Zc(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return Q.default.rootData;
  if (e[0] === "/") {
    if (!Ff.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = Q.default.rootData;
  } else {
    const d = Vf.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (a = r[t - u], !s)
      return a;
  }
  let i = a;
  const l = s.split("/");
  for (const d of l)
    d && (a = (0, X._)`${a}${(0, X.getProperty)((0, pt.unescapeJsonPointer)(d))}`, i = (0, X._)`${i} && ${a}`);
  return i;
  function c(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
rt.getData = Zc;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
let Uf = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
Fr.default = Uf;
var lr = {};
Object.defineProperty(lr, "__esModule", { value: !0 });
const ns = Ie;
let zf = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, ns.resolveUrl)(t, r, n), this.missingSchema = (0, ns.normalizeId)((0, ns.getFullPath)(t, this.missingRef));
  }
};
lr.default = zf;
var qe = {};
Object.defineProperty(qe, "__esModule", { value: !0 });
qe.resolveSchema = qe.getCompilingSchema = qe.resolveRef = qe.compileSchema = qe.SchemaEnv = void 0;
const Xe = oe, qf = Fr, Dt = dt, et = Ie, Yo = U, Kf = rt;
let Vn = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, et.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
qe.SchemaEnv = Vn;
function ca(e) {
  const t = xc.call(this, e);
  if (t)
    return t;
  const r = (0, et.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Xe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let l;
  e.$async && (l = i.scopeValue("Error", {
    ref: qf.default,
    code: (0, Xe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Dt.default.data,
    parentData: Dt.default.parentData,
    parentDataProperty: Dt.default.parentDataProperty,
    dataNames: [Dt.default.data],
    dataPathArr: [Xe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Xe.stringify)(e.schema) } : { ref: e.schema }),
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
    this._compilations.add(e), (0, Kf.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    u = `${i.scopeRefs(Dt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const y = new Function(`${Dt.default.self}`, `${Dt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: y }), y.errors = null, y.schema = e.schema, y.schemaEnv = e, e.$async && (y.$async = !0), this.opts.code.source === !0 && (y.source = { validateName: c, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: v, items: g } = d;
      y.evaluated = {
        props: v instanceof Xe.Name ? void 0 : v,
        items: g instanceof Xe.Name ? void 0 : g,
        dynamicProps: v instanceof Xe.Name,
        dynamicItems: g instanceof Xe.Name
      }, y.source && (y.source.evaluated = (0, Xe.stringify)(y.evaluated));
    }
    return e.validate = y, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
qe.compileSchema = ca;
function Gf(e, t, r) {
  var n;
  r = (0, et.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Wf.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    i && (a = new Vn({ schema: i, schemaId: l, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = Hf.call(this, a);
}
qe.resolveRef = Gf;
function Hf(e) {
  return (0, et.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : ca.call(this, e);
}
function xc(e) {
  for (const t of this._compilations)
    if (Bf(t, e))
      return t;
}
qe.getCompilingSchema = xc;
function Bf(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Wf(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Un.call(this, e, t);
}
function Un(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, et._getFullPath)(this.opts.uriResolver, r);
  let s = (0, et.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return ss.call(this, r, e);
  const a = (0, et.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const l = Un.call(this, e, i);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : ss.call(this, r, l);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || ca.call(this, i), a === (0, et.normalizeId)(t)) {
      const { schema: l } = i, { schemaId: c } = this.opts, d = l[c];
      return d && (s = (0, et.resolveUrl)(this.opts.uriResolver, s, d)), new Vn({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return ss.call(this, r, i);
  }
}
qe.resolveSchema = Un;
const Jf = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function ss(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Yo.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !Jf.has(l) && d && (t = (0, et.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Yo.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, et.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Un.call(this, n, l);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Vn({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Xf = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Yf = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Qf = "object", Zf = [
  "$data"
], xf = {
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
}, eh = !1, th = {
  $id: Xf,
  description: Yf,
  type: Qf,
  required: Zf,
  properties: xf,
  additionalProperties: eh
};
var la = {}, zn = { exports: {} };
const rh = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), el = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function tl(e) {
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
const nh = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Qo(e) {
  return e.length = 0, !0;
}
function sh(e, t, r) {
  if (e.length) {
    const n = tl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function ah(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, l = sh;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (a === !0 && (i = !0), !l(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!l(s, n, r))
          break;
        l = Qo;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (l === Qo ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(tl(s))), r.address = n.join(""), r;
}
function rl(e) {
  if (oh(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = ah(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function oh(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function ih(e) {
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
function ch(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function lh(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!el(r)) {
      const n = rl(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var nl = {
  nonSimpleDomain: nh,
  recomposeAuthority: lh,
  normalizeComponentEncoding: ch,
  removeDotSegments: ih,
  isIPv4: el,
  isUUID: rh,
  normalizeIPv6: rl
};
const { isUUID: uh } = nl, dh = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function sl(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function al(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function ol(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function fh(e) {
  return e.secure = sl(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function hh(e) {
  if ((e.port === (sl(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function mh(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(dh);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = ua(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function ph(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = ua(s);
  a && (e = a.serialize(e, t));
  const i = e, l = e.nss;
  return i.path = `${n || t.nid}:${l}`, t.skipEscape = !0, i;
}
function yh(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !uh(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function $h(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const il = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: al,
    serialize: ol
  }
), _h = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: il.domainHost,
    parse: al,
    serialize: ol
  }
), pn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: fh,
    serialize: hh
  }
), gh = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: pn.domainHost,
    parse: pn.parse,
    serialize: pn.serialize
  }
), vh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: mh,
    serialize: ph,
    skipNormalize: !0
  }
), Eh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: yh,
    serialize: $h,
    skipNormalize: !0
  }
), Nn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: il,
    https: _h,
    ws: pn,
    wss: gh,
    urn: vh,
    "urn:uuid": Eh
  }
);
Object.setPrototypeOf(Nn, null);
function ua(e) {
  return e && (Nn[
    /** @type {SchemeName} */
    e
  ] || Nn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var wh = {
  SCHEMES: Nn,
  getSchemeHandler: ua
};
const { normalizeIPv6: Sh, removeDotSegments: Sr, recomposeAuthority: bh, normalizeComponentEncoding: Jr, isIPv4: Ph, nonSimpleDomain: Nh } = nl, { SCHEMES: Oh, getSchemeHandler: cl } = wh;
function Rh(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  ut($t(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  $t(ut(e, t), t)), e;
}
function Th(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = ll($t(e, n), $t(t, n), n, !0);
  return n.skipEscape = !0, ut(s, n);
}
function ll(e, t, r, n) {
  const s = {};
  return n || (e = $t(ut(e, r), r), t = $t(ut(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Sr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Sr(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Sr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Sr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function Ih(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ut(Jr($t(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ut(Jr(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ut(Jr($t(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ut(Jr(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ut(e, t) {
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
  }, n = Object.assign({}, t), s = [], a = cl(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = bh(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let l = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (l = Sr(l)), i === void 0 && l[0] === "/" && l[1] === "/" && (l = "/%2F" + l.slice(2)), s.push(l);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const jh = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function $t(e, t) {
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
  const a = e.match(jh);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (Ph(n.host) === !1) {
        const c = Sh(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = cl(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && Nh(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (l) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + l;
      }
    (!i || i && !i.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const da = {
  SCHEMES: Oh,
  normalize: Rh,
  resolve: Th,
  resolveComponent: ll,
  equal: Ih,
  serialize: ut,
  parse: $t
};
zn.exports = da;
zn.exports.default = da;
zn.exports.fastUri = da;
var ul = zn.exports;
Object.defineProperty(la, "__esModule", { value: !0 });
const dl = ul;
dl.code = 'require("ajv/dist/runtime/uri").default';
la.default = dl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = rt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = oe;
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
  const n = Fr, s = lr, a = Kt, i = qe, l = oe, c = Ie, d = we, u = U, h = th, S = la, y = (w, p) => new RegExp(w, p);
  y.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  ]), _ = {
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
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function N(w) {
    var p, b, $, o, f, P, k, C, B, G, O, T, D, F, W, x, _e, Ce, be, Pe, ge, at, Ae, jt, At;
    const Je = w.strict, kt = (p = w.code) === null || p === void 0 ? void 0 : p.optimize, yr = kt === !0 || kt === void 0 ? 1 : kt || 0, $r = ($ = (b = w.code) === null || b === void 0 ? void 0 : b.regExp) !== null && $ !== void 0 ? $ : y, ts = (o = w.uriResolver) !== null && o !== void 0 ? o : S.default;
    return {
      strictSchema: (P = (f = w.strictSchema) !== null && f !== void 0 ? f : Je) !== null && P !== void 0 ? P : !0,
      strictNumbers: (C = (k = w.strictNumbers) !== null && k !== void 0 ? k : Je) !== null && C !== void 0 ? C : !0,
      strictTypes: (G = (B = w.strictTypes) !== null && B !== void 0 ? B : Je) !== null && G !== void 0 ? G : "log",
      strictTuples: (T = (O = w.strictTuples) !== null && O !== void 0 ? O : Je) !== null && T !== void 0 ? T : "log",
      strictRequired: (F = (D = w.strictRequired) !== null && D !== void 0 ? D : Je) !== null && F !== void 0 ? F : !1,
      code: w.code ? { ...w.code, optimize: yr, regExp: $r } : { optimize: yr, regExp: $r },
      loopRequired: (W = w.loopRequired) !== null && W !== void 0 ? W : E,
      loopEnum: (x = w.loopEnum) !== null && x !== void 0 ? x : E,
      meta: (_e = w.meta) !== null && _e !== void 0 ? _e : !0,
      messages: (Ce = w.messages) !== null && Ce !== void 0 ? Ce : !0,
      inlineRefs: (be = w.inlineRefs) !== null && be !== void 0 ? be : !0,
      schemaId: (Pe = w.schemaId) !== null && Pe !== void 0 ? Pe : "$id",
      addUsedSchema: (ge = w.addUsedSchema) !== null && ge !== void 0 ? ge : !0,
      validateSchema: (at = w.validateSchema) !== null && at !== void 0 ? at : !0,
      validateFormats: (Ae = w.validateFormats) !== null && Ae !== void 0 ? Ae : !0,
      unicodeRegExp: (jt = w.unicodeRegExp) !== null && jt !== void 0 ? jt : !0,
      int32range: (At = w.int32range) !== null && At !== void 0 ? At : !0,
      uriResolver: ts
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: b, lines: $ } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: g, es5: b, lines: $ }), this.logger = Z(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), j.call(this, _, p, "NOT SUPPORTED"), j.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = Y.call(this), p.formats && ce.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && K.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), J.call(this), p.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: b, schemaId: $ } = this.opts;
      let o = h;
      $ === "id" && (o = { ...h }, o.id = o.$id, delete o.$id), b && p && this.addMetaSchema(o, o[$], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: b } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[b] || p : void 0;
    }
    validate(p, b) {
      let $;
      if (typeof p == "string") {
        if ($ = this.getSchema(p), !$)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        $ = this.compile(p);
      const o = $(b);
      return "$async" in $ || (this.errors = $.errors), o;
    }
    compile(p, b) {
      const $ = this._addSchema(p, b);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, b) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return o.call(this, p, b);
      async function o(G, O) {
        await f.call(this, G.$schema);
        const T = this._addSchema(G, O);
        return T.validate || P.call(this, T);
      }
      async function f(G) {
        G && !this.getSchema(G) && await o.call(this, { $ref: G }, !0);
      }
      async function P(G) {
        try {
          return this._compileSchemaEnv(G);
        } catch (O) {
          if (!(O instanceof s.default))
            throw O;
          return k.call(this, O), await C.call(this, O.missingSchema), P.call(this, G);
        }
      }
      function k({ missingSchema: G, missingRef: O }) {
        if (this.refs[G])
          throw new Error(`AnySchema ${G} is loaded but ${O} cannot be resolved`);
      }
      async function C(G) {
        const O = await B.call(this, G);
        this.refs[G] || await f.call(this, O.$schema), this.refs[G] || this.addSchema(O, G, b);
      }
      async function B(G) {
        const O = this._loading[G];
        if (O)
          return O;
        try {
          return await (this._loading[G] = $(G));
        } finally {
          delete this._loading[G];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, b, $, o = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const P of p)
          this.addSchema(P, void 0, $, o);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: P } = this.opts;
        if (f = p[P], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return b = (0, c.normalizeId)(b || f), this._checkUnique(b), this.schemas[b] = this._addSchema(p, $, b, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, b, $ = this.opts.validateSchema) {
      return this.addSchema(p, b, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, b) {
      if (typeof p == "boolean")
        return !0;
      let $;
      if ($ = p.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate($, p);
      if (!o && b) {
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
      let b;
      for (; typeof (b = q.call(this, p)) == "string"; )
        p = b;
      if (b === void 0) {
        const { schemaId: $ } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: $ });
        if (b = i.resolveSchema.call(this, o, p), !b)
          return;
        this.refs[p] = b;
      }
      return b.validate || this._compileSchemaEnv(b);
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
          const b = q.call(this, p);
          return typeof b == "object" && this._cache.delete(b.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const b = p;
          this._cache.delete(b);
          let $ = p[this.opts.schemaId];
          return $ && ($ = (0, c.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const b of p)
        this.addKeyword(b);
      return this;
    }
    addKeyword(p, b) {
      let $;
      if (typeof p == "string")
        $ = p, typeof b == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), b.keyword = $);
      else if (typeof p == "object" && b === void 0) {
        if (b = p, $ = b.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (M.call(this, $, b), !b)
        return (0, u.eachItem)($, (f) => L.call(this, f)), this;
      V.call(this, b);
      const o = {
        ...b,
        type: (0, d.getJSONTypes)(b.type),
        schemaType: (0, d.getJSONTypes)(b.schemaType)
      };
      return (0, u.eachItem)($, o.type.length === 0 ? (f) => L.call(this, f, o) : (f) => o.type.forEach((P) => L.call(this, f, o, P))), this;
    }
    getKeyword(p) {
      const b = this.RULES.all[p];
      return typeof b == "object" ? b.definition : !!b;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: b } = this;
      delete b.keywords[p], delete b.all[p];
      for (const $ of b.rules) {
        const o = $.rules.findIndex((f) => f.keyword === p);
        o >= 0 && $.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, b) {
      return typeof b == "string" && (b = new RegExp(b)), this.formats[p] = b, this;
    }
    errorsText(p = this.errors, { separator: b = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((o) => `${$}${o.instancePath} ${o.message}`).reduce((o, f) => o + b + f);
    }
    $dataMetaSchema(p, b) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const o of b) {
        const f = o.split("/").slice(1);
        let P = p;
        for (const k of f)
          P = P[k];
        for (const k in $) {
          const C = $[k];
          if (typeof C != "object")
            continue;
          const { $data: B } = C.definition, G = P[k];
          B && G && (P[k] = A(G));
        }
      }
      return p;
    }
    _removeAllSchemas(p, b) {
      for (const $ in p) {
        const o = p[$];
        (!b || b.test($)) && (typeof o == "string" ? delete p[$] : o && !o.meta && (this._cache.delete(o.schema), delete p[$]));
      }
    }
    _addSchema(p, b, $, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let P;
      const { schemaId: k } = this.opts;
      if (typeof p == "object")
        P = p[k];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let C = this._cache.get(p);
      if (C !== void 0)
        return C;
      $ = (0, c.normalizeId)(P || $);
      const B = c.getSchemaRefs.call(this, p, $);
      return C = new i.SchemaEnv({ schema: p, schemaId: k, meta: b, baseId: $, localRefs: B }), this._cache.set(C.schema, C), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = C), o && this.validateSchema(p, !0), C;
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
      const b = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, p);
      } finally {
        this.opts = b;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function j(w, p, b, $ = "error") {
    for (const o in w) {
      const f = o;
      f in p && this.logger[$](`${b}: option ${o}. ${w[f]}`);
    }
  }
  function q(w) {
    return w = (0, c.normalizeId)(w), this.schemas[w] || this.refs[w];
  }
  function J() {
    const w = this.opts.schemas;
    if (w)
      if (Array.isArray(w))
        this.addSchema(w);
      else
        for (const p in w)
          this.addSchema(w[p], p);
  }
  function ce() {
    for (const w in this.opts.formats) {
      const p = this.opts.formats[w];
      p && this.addFormat(w, p);
    }
  }
  function K(w) {
    if (Array.isArray(w)) {
      this.addVocabulary(w);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in w) {
      const b = w[p];
      b.keyword || (b.keyword = p), this.addKeyword(b);
    }
  }
  function Y() {
    const w = { ...this.opts };
    for (const p of v)
      delete w[p];
    return w;
  }
  const ie = { log() {
  }, warn() {
  }, error() {
  } };
  function Z(w) {
    if (w === !1)
      return ie;
    if (w === void 0)
      return console;
    if (w.log && w.warn && w.error)
      return w;
    throw new Error("logger must implement log, warn and error methods");
  }
  const re = /^[a-z_$][a-z0-9_$:-]*$/i;
  function M(w, p) {
    const { RULES: b } = this;
    if ((0, u.eachItem)(w, ($) => {
      if (b.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!re.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(w, p, b) {
    var $;
    const o = p == null ? void 0 : p.post;
    if (b && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let P = o ? f.post : f.rules.find(({ type: C }) => C === b);
    if (P || (P = { type: b, rules: [] }, f.rules.push(P)), f.keywords[w] = !0, !p)
      return;
    const k = {
      keyword: w,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? H.call(this, P, k, p.before) : P.rules.push(k), f.all[w] = k, ($ = p.implements) === null || $ === void 0 || $.forEach((C) => this.addKeyword(C));
  }
  function H(w, p, b) {
    const $ = w.rules.findIndex((o) => o.keyword === b);
    $ >= 0 ? w.rules.splice($, 0, p) : (w.rules.push(p), this.logger.warn(`rule ${b} is not defined`));
  }
  function V(w) {
    let { metaSchema: p } = w;
    p !== void 0 && (w.$data && this.opts.$data && (p = A(p)), w.validateSchema = this.compile(p, !0));
  }
  const I = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function A(w) {
    return { anyOf: [w, I] };
  }
})(wc);
var fa = {}, ha = {}, ma = {};
Object.defineProperty(ma, "__esModule", { value: !0 });
const Ah = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ma.default = Ah;
var Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.callRef = Gt.getValidate = void 0;
const kh = lr, Zo = se, Ue = oe, Xt = dt, xo = qe, Xr = U, Ch = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: l, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = xo.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new kh.default(n.opts.uriResolver, s, r);
    if (u instanceof xo.SchemaEnv)
      return S(u);
    return y(u);
    function h() {
      if (a === d)
        return yn(e, i, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return yn(e, (0, Ue._)`${v}.validate`, d, d.$async);
    }
    function S(v) {
      const g = fl(e, v);
      yn(e, g, v, v.$async);
    }
    function y(v) {
      const g = t.scopeValue("schema", l.code.source === !0 ? { ref: v, code: (0, Ue.stringify)(v) } : { ref: v }), _ = t.name("valid"), m = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Ue.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(m), e.ok(_);
    }
  }
};
function fl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ue._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Gt.getValidate = fl;
function yn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: l, opts: c } = a, d = c.passContext ? Xt.default.this : Ue.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Ue._)`await ${(0, Zo.callValidateCode)(e, t, d)}`), y(t), i || s.assign(v, !0);
    }, (g) => {
      s.if((0, Ue._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), S(g), i || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, Zo.callValidateCode)(e, t, d), () => y(t), () => S(t));
  }
  function S(v) {
    const g = (0, Ue._)`${v}.errors`;
    s.assign(Xt.default.vErrors, (0, Ue._)`${Xt.default.vErrors} === null ? ${g} : ${Xt.default.vErrors}.concat(${g})`), s.assign(Xt.default.errors, (0, Ue._)`${Xt.default.vErrors}.length`);
  }
  function y(v) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const _ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (a.props = Xr.mergeEvaluated.props(s, _.props, a.props));
      else {
        const m = s.var("props", (0, Ue._)`${v}.evaluated.props`);
        a.props = Xr.mergeEvaluated.props(s, m, a.props, Ue.Name);
      }
    if (a.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (a.items = Xr.mergeEvaluated.items(s, _.items, a.items));
      else {
        const m = s.var("items", (0, Ue._)`${v}.evaluated.items`);
        a.items = Xr.mergeEvaluated.items(s, m, a.items, Ue.Name);
      }
  }
}
Gt.callRef = yn;
Gt.default = Ch;
Object.defineProperty(ha, "__esModule", { value: !0 });
const Dh = ma, Mh = Gt, Lh = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Dh.default,
  Mh.default
];
ha.default = Lh;
var pa = {}, ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
const On = oe, gt = On.operators, Rn = {
  maximum: { okStr: "<=", ok: gt.LTE, fail: gt.GT },
  minimum: { okStr: ">=", ok: gt.GTE, fail: gt.LT },
  exclusiveMaximum: { okStr: "<", ok: gt.LT, fail: gt.GTE },
  exclusiveMinimum: { okStr: ">", ok: gt.GT, fail: gt.LTE }
}, Fh = {
  message: ({ keyword: e, schemaCode: t }) => (0, On.str)`must be ${Rn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, On._)`{comparison: ${Rn[e].okStr}, limit: ${t}}`
}, Vh = {
  keyword: Object.keys(Rn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Fh,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, On._)`${r} ${Rn[t].fail} ${n} || isNaN(${r})`);
  }
};
ya.default = Vh;
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
const Or = oe, Uh = {
  message: ({ schemaCode: e }) => (0, Or.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Or._)`{multipleOf: ${e}}`
}, zh = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Uh,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), l = a ? (0, Or._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Or._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Or._)`(${n} === 0 || (${i} = ${r}/${n}, ${l}))`);
  }
};
$a.default = zh;
var _a = {}, ga = {};
Object.defineProperty(ga, "__esModule", { value: !0 });
function hl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
ga.default = hl;
hl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(_a, "__esModule", { value: !0 });
const Vt = oe, qh = U, Kh = ga, Gh = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Vt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Vt._)`{limit: ${e}}`
}, Hh = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Gh,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Vt.operators.GT : Vt.operators.LT, i = s.opts.unicode === !1 ? (0, Vt._)`${r}.length` : (0, Vt._)`${(0, qh.useFunc)(e.gen, Kh.default)}(${r})`;
    e.fail$data((0, Vt._)`${i} ${a} ${n}`);
  }
};
_a.default = Hh;
var va = {};
Object.defineProperty(va, "__esModule", { value: !0 });
const Bh = se, Tn = oe, Wh = {
  message: ({ schemaCode: e }) => (0, Tn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Tn._)`{pattern: ${e}}`
}, Jh = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Wh,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", l = r ? (0, Tn._)`(new RegExp(${s}, ${i}))` : (0, Bh.usePattern)(e, n);
    e.fail$data((0, Tn._)`!${l}.test(${t})`);
  }
};
va.default = Jh;
var Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
const Rr = oe, Xh = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Rr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Rr._)`{limit: ${e}}`
}, Yh = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Xh,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Rr.operators.GT : Rr.operators.LT;
    e.fail$data((0, Rr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Ea.default = Yh;
var wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
const gr = se, Tr = oe, Qh = U, Zh = {
  message: ({ params: { missingProperty: e } }) => (0, Tr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Tr._)`{missingProperty: ${e}}`
}, xh = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Zh,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: l } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (i.allErrors ? d() : u(), l.strictRequired) {
      const y = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const g of r)
        if ((y == null ? void 0 : y[g]) === void 0 && !v.has(g)) {
          const _ = i.schemaEnv.baseId + i.errSchemaPath, m = `required property "${g}" is not defined at "${_}" (strictRequired)`;
          (0, Qh.checkStrictMode)(i, m, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Tr.nil, h);
      else
        for (const y of r)
          (0, gr.checkReportMissingProp)(e, y);
    }
    function u() {
      const y = t.let("missing");
      if (c || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => S(y, v)), e.ok(v);
      } else
        t.if((0, gr.checkMissingProp)(e, r, y)), (0, gr.reportMissingProp)(e, y), t.else();
    }
    function h() {
      t.forOf("prop", n, (y) => {
        e.setParams({ missingProperty: y }), t.if((0, gr.noPropertyInData)(t, s, y, l.ownProperties), () => e.error());
      });
    }
    function S(y, v) {
      e.setParams({ missingProperty: y }), t.forOf(y, n, () => {
        t.assign(v, (0, gr.propertyInData)(t, s, y, l.ownProperties)), t.if((0, Tr.not)(v), () => {
          e.error(), t.break();
        });
      }, Tr.nil);
    }
  }
};
wa.default = xh;
var Sa = {};
Object.defineProperty(Sa, "__esModule", { value: !0 });
const Ir = oe, em = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Ir.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Ir._)`{limit: ${e}}`
}, tm = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: em,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Ir.operators.GT : Ir.operators.LT;
    e.fail$data((0, Ir._)`${r}.length ${s} ${n}`);
  }
};
Sa.default = tm;
var ba = {}, Vr = {};
Object.defineProperty(Vr, "__esModule", { value: !0 });
const ml = Fn;
ml.code = 'require("ajv/dist/runtime/equal").default';
Vr.default = ml;
Object.defineProperty(ba, "__esModule", { value: !0 });
const as = we, Oe = oe, rm = U, nm = Vr, sm = {
  message: ({ params: { i: e, j: t } }) => (0, Oe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Oe._)`{i: ${e}, j: ${t}}`
}, am = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: sm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, as.getSchemaTypes)(a.items) : [];
    e.block$data(c, u, (0, Oe._)`${i} === false`), e.ok(c);
    function u() {
      const v = t.let("i", (0, Oe._)`${r}.length`), g = t.let("j");
      e.setParams({ i: v, j: g }), t.assign(c, !0), t.if((0, Oe._)`${v} > 1`, () => (h() ? S : y)(v, g));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function S(v, g) {
      const _ = t.name("item"), m = (0, as.checkDataTypes)(d, _, l.opts.strictNumbers, as.DataType.Wrong), E = t.const("indices", (0, Oe._)`{}`);
      t.for((0, Oe._)`;${v}--;`, () => {
        t.let(_, (0, Oe._)`${r}[${v}]`), t.if(m, (0, Oe._)`continue`), d.length > 1 && t.if((0, Oe._)`typeof ${_} == "string"`, (0, Oe._)`${_} += "_"`), t.if((0, Oe._)`typeof ${E}[${_}] == "number"`, () => {
          t.assign(g, (0, Oe._)`${E}[${_}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Oe._)`${E}[${_}] = ${v}`);
      });
    }
    function y(v, g) {
      const _ = (0, rm.useFunc)(t, nm.default), m = t.name("outer");
      t.label(m).for((0, Oe._)`;${v}--;`, () => t.for((0, Oe._)`${g} = ${v}; ${g}--;`, () => t.if((0, Oe._)`${_}(${r}[${v}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
ba.default = am;
var Pa = {};
Object.defineProperty(Pa, "__esModule", { value: !0 });
const bs = oe, om = U, im = Vr, cm = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, bs._)`{allowedValue: ${e}}`
}, lm = {
  keyword: "const",
  $data: !0,
  error: cm,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, bs._)`!${(0, om.useFunc)(t, im.default)}(${r}, ${s})`) : e.fail((0, bs._)`${a} !== ${r}`);
  }
};
Pa.default = lm;
var Na = {};
Object.defineProperty(Na, "__esModule", { value: !0 });
const br = oe, um = U, dm = Vr, fm = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, br._)`{allowedValues: ${e}}`
}, hm = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: fm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, um.useFunc)(t, dm.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const y = t.const("vSchema", a);
      u = (0, br.or)(...s.map((v, g) => S(y, g)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (y) => t.if((0, br._)`${d()}(${r}, ${y})`, () => t.assign(u, !0).break()));
    }
    function S(y, v) {
      const g = s[v];
      return typeof g == "object" && g !== null ? (0, br._)`${d()}(${r}, ${y}[${v}])` : (0, br._)`${r} === ${g}`;
    }
  }
};
Na.default = hm;
Object.defineProperty(pa, "__esModule", { value: !0 });
const mm = ya, pm = $a, ym = _a, $m = va, _m = Ea, gm = wa, vm = Sa, Em = ba, wm = Pa, Sm = Na, bm = [
  // number
  mm.default,
  pm.default,
  // string
  ym.default,
  $m.default,
  // object
  _m.default,
  gm.default,
  // array
  vm.default,
  Em.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  wm.default,
  Sm.default
];
pa.default = bm;
var Oa = {}, ur = {};
Object.defineProperty(ur, "__esModule", { value: !0 });
ur.validateAdditionalItems = void 0;
const Ut = oe, Ps = U, Pm = {
  message: ({ params: { len: e } }) => (0, Ut.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ut._)`{limit: ${e}}`
}, Nm = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Pm,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ps.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    pl(e, n);
  }
};
function pl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const l = r.const("len", (0, Ut._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Ut._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ps.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Ut._)`${l} <= ${t.length}`);
    r.if((0, Ut.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: Ps.Type.Num }, d), i.allErrors || r.if((0, Ut.not)(d), () => r.break());
    });
  }
}
ur.validateAdditionalItems = pl;
ur.default = Nm;
var Ra = {}, dr = {};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.validateTuple = void 0;
const ei = oe, $n = U, Om = se, Rm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return yl(e, "additionalItems", t);
    r.items = !0, !(0, $n.alwaysValidSchema)(r, t) && e.ok((0, Om.validateArray)(e));
  }
};
function yl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = $n.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), d = n.const("len", (0, ei._)`${a}.length`);
  r.forEach((h, S) => {
    (0, $n.alwaysValidSchema)(l, h) || (n.if((0, ei._)`${d} > ${S}`, () => e.subschema({
      keyword: i,
      schemaProp: S,
      dataProp: S
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: S, errSchemaPath: y } = l, v = r.length, g = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (S.strictTuples && !g) {
      const _ = `"${i}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${y}"`;
      (0, $n.checkStrictMode)(l, _, S.strictTuples);
    }
  }
}
dr.validateTuple = yl;
dr.default = Rm;
Object.defineProperty(Ra, "__esModule", { value: !0 });
const Tm = dr, Im = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Tm.validateTuple)(e, "items")
};
Ra.default = Im;
var Ta = {};
Object.defineProperty(Ta, "__esModule", { value: !0 });
const ti = oe, jm = U, Am = se, km = ur, Cm = {
  message: ({ params: { len: e } }) => (0, ti.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ti._)`{limit: ${e}}`
}, Dm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Cm,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, jm.alwaysValidSchema)(n, t) && (s ? (0, km.validateAdditionalItems)(e, s) : e.ok((0, Am.validateArray)(e)));
  }
};
Ta.default = Dm;
var Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
const Be = oe, Yr = U, Mm = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Be.str)`must contain at least ${e} valid item(s)` : (0, Be.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Be._)`{minContains: ${e}}` : (0, Be._)`{minContains: ${e}, maxContains: ${t}}`
}, Lm = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Mm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, l;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, l = d) : i = 1;
    const u = t.const("len", (0, Be._)`${s}.length`);
    if (e.setParams({ min: i, max: l }), l === void 0 && i === 0) {
      (0, Yr.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && i > l) {
      (0, Yr.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Yr.alwaysValidSchema)(a, r)) {
      let g = (0, Be._)`${u} >= ${i}`;
      l !== void 0 && (g = (0, Be._)`${g} && ${u} <= ${l}`), e.pass(g);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    l === void 0 && i === 1 ? y(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, Be._)`${s}.length > 0`, S)) : (t.let(h, !1), S()), e.result(h, () => e.reset());
    function S() {
      const g = t.name("_valid"), _ = t.let("count", 0);
      y(g, () => t.if(g, () => v(_)));
    }
    function y(g, _) {
      t.forRange("i", 0, u, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: Yr.Type.Num,
          compositeRule: !0
        }, g), _();
      });
    }
    function v(g) {
      t.code((0, Be._)`${g}++`), l === void 0 ? t.if((0, Be._)`${g} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, Be._)`${g} > ${l}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, Be._)`${g} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
Ia.default = Lm;
var $l = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = oe, r = U, n = se;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, u] = a(c);
      i(c, d), l(c, u);
    }
  };
  function a({ schema: c }) {
    const d = {}, u = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const S = Array.isArray(c[h]) ? d : u;
      S[h] = c[h];
    }
    return [d, u];
  }
  function i(c, d = c.schema) {
    const { gen: u, data: h, it: S } = c;
    if (Object.keys(d).length === 0)
      return;
    const y = u.let("missing");
    for (const v in d) {
      const g = d[v];
      if (g.length === 0)
        continue;
      const _ = (0, n.propertyInData)(u, h, v, S.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: g.length,
        deps: g.join(", ")
      }), S.allErrors ? u.if(_, () => {
        for (const m of g)
          (0, n.checkReportMissingProp)(c, m);
      }) : (u.if((0, t._)`${_} && (${(0, n.checkMissingProp)(c, g, y)})`), (0, n.reportMissingProp)(c, y), u.else());
    }
  }
  e.validatePropertyDeps = i;
  function l(c, d = c.schema) {
    const { gen: u, data: h, keyword: S, it: y } = c, v = u.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(y, d[g]) || (u.if(
        (0, n.propertyInData)(u, h, g, y.opts.ownProperties),
        () => {
          const _ = c.subschema({ keyword: S, schemaProp: g }, v);
          c.mergeValidEvaluated(_, v);
        },
        () => u.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = l, e.default = s;
})($l);
var ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
const _l = oe, Fm = U, Vm = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, _l._)`{propertyName: ${e.propertyName}}`
}, Um = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Vm,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Fm.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, _l.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
ja.default = Um;
var qn = {};
Object.defineProperty(qn, "__esModule", { value: !0 });
const Qr = se, Ze = oe, zm = dt, Zr = U, qm = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ze._)`{additionalProperty: ${e.additionalProperty}}`
}, Km = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: qm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, Zr.alwaysValidSchema)(i, r))
      return;
    const d = (0, Qr.allSchemaProperties)(n.properties), u = (0, Qr.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Ze._)`${a} === ${zm.default.errors}`);
    function h() {
      t.forIn("key", s, (_) => {
        !d.length && !u.length ? v(_) : t.if(S(_), () => v(_));
      });
    }
    function S(_) {
      let m;
      if (d.length > 8) {
        const E = (0, Zr.schemaRefOrVal)(i, n.properties, "properties");
        m = (0, Qr.isOwnProperty)(t, E, _);
      } else d.length ? m = (0, Ze.or)(...d.map((E) => (0, Ze._)`${_} === ${E}`)) : m = Ze.nil;
      return u.length && (m = (0, Ze.or)(m, ...u.map((E) => (0, Ze._)`${(0, Qr.usePattern)(e, E)}.test(${_})`))), (0, Ze.not)(m);
    }
    function y(_) {
      t.code((0, Ze._)`delete ${s}[${_}]`);
    }
    function v(_) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        y(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Zr.alwaysValidSchema)(i, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (g(_, m, !1), t.if((0, Ze.not)(m), () => {
          e.reset(), y(_);
        })) : (g(_, m), l || t.if((0, Ze.not)(m), () => t.break()));
      }
    }
    function g(_, m, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: Zr.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, m);
    }
  }
};
qn.default = Km;
var Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const Gm = rt, ri = se, os = U, ni = qn, Hm = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && ni.default.code(new Gm.KeywordCxt(a, ni.default, "additionalProperties"));
    const i = (0, ri.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = os.mergeEvaluated.props(t, (0, os.toHash)(i), a.props));
    const l = i.filter((h) => !(0, os.alwaysValidSchema)(a, r[h]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const h of l)
      d(h) ? u(h) : (t.if((0, ri.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
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
Aa.default = Hm;
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const si = se, xr = oe, ai = U, oi = U, Bm = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, l = (0, si.allSchemaProperties)(r), c = l.filter((g) => (0, ai.alwaysValidSchema)(a, r[g]));
    if (l.length === 0 || c.length === l.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof xr.Name) && (a.props = (0, oi.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    S();
    function S() {
      for (const g of l)
        d && y(g), a.allErrors ? v(g) : (t.var(u, !0), v(g), t.if(u));
    }
    function y(g) {
      for (const _ in d)
        new RegExp(g).test(_) && (0, ai.checkStrictMode)(a, `property ${_} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function v(g) {
      t.forIn("key", n, (_) => {
        t.if((0, xr._)`${(0, si.usePattern)(e, g)}.test(${_})`, () => {
          const m = c.includes(g);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: _,
            dataPropType: oi.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, xr._)`${h}[${_}]`, !0) : !m && !a.allErrors && t.if((0, xr.not)(u), () => t.break());
        });
      });
    }
  }
};
ka.default = Bm;
var Ca = {};
Object.defineProperty(Ca, "__esModule", { value: !0 });
const Wm = U, Jm = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Wm.alwaysValidSchema)(n, r)) {
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
Ca.default = Jm;
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const Xm = se, Ym = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Xm.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Da.default = Ym;
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const _n = oe, Qm = U, Zm = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, _n._)`{passingSchemas: ${e.passing}}`
}, xm = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Zm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let S;
        (0, Qm.alwaysValidSchema)(s, u) ? t.var(c, !0) : S = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, _n._)`${c} && ${i}`).assign(i, !1).assign(l, (0, _n._)`[${l}, ${h}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(l, h), S && e.mergeEvaluated(S, _n.Name);
        });
      });
    }
  }
};
Ma.default = xm;
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const ep = U, tp = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, ep.alwaysValidSchema)(n, a))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
La.default = tp;
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const In = oe, gl = U, rp = {
  message: ({ params: e }) => (0, In.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, In._)`{failingKeyword: ${e.ifClause}}`
}, np = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: rp,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, gl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = ii(n, "then"), a = ii(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, d("then", u), d("else", u));
    } else s ? t.if(l, d("then")) : t.if((0, In.not)(l), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const S = e.subschema({ keyword: u }, l);
        t.assign(i, l), e.mergeValidEvaluated(S, i), h ? t.assign(h, (0, In._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function ii(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, gl.alwaysValidSchema)(e, r);
}
Fa.default = np;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const sp = U, ap = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, sp.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Va.default = ap;
Object.defineProperty(Oa, "__esModule", { value: !0 });
const op = ur, ip = Ra, cp = dr, lp = Ta, up = Ia, dp = $l, fp = ja, hp = qn, mp = Aa, pp = ka, yp = Ca, $p = Da, _p = Ma, gp = La, vp = Fa, Ep = Va;
function wp(e = !1) {
  const t = [
    // any
    yp.default,
    $p.default,
    _p.default,
    gp.default,
    vp.default,
    Ep.default,
    // object
    fp.default,
    hp.default,
    dp.default,
    mp.default,
    pp.default
  ];
  return e ? t.push(ip.default, lp.default) : t.push(op.default, cp.default), t.push(up.default), t;
}
Oa.default = wp;
var Ua = {}, za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const ve = oe, Sp = {
  message: ({ schemaCode: e }) => (0, ve.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ve._)`{format: ${e}}`
}, bp = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Sp,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: l } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: h } = l;
    if (!c.validateFormats)
      return;
    s ? S() : y();
    function S() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, ve._)`${v}[${i}]`), _ = r.let("fType"), m = r.let("format");
      r.if((0, ve._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(_, (0, ve._)`${g}.type || "string"`).assign(m, (0, ve._)`${g}.validate`), () => r.assign(_, (0, ve._)`"string"`).assign(m, g)), e.fail$data((0, ve.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? ve.nil : (0, ve._)`${i} && !${m}`;
      }
      function N() {
        const R = u.$async ? (0, ve._)`(${g}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, ve._)`${m}(${n})`, j = (0, ve._)`(typeof ${m} == "function" ? ${R} : ${m}.test(${n}))`;
        return (0, ve._)`${m} && ${m} !== true && ${_} === ${t} && !${j}`;
      }
    }
    function y() {
      const v = h.formats[a];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [g, _, m] = N(v);
      g === t && e.pass(R());
      function E() {
        if (c.strictSchema === !1) {
          h.logger.warn(j());
          return;
        }
        throw new Error(j());
        function j() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(j) {
        const q = j instanceof RegExp ? (0, ve.regexpCode)(j) : c.code.formats ? (0, ve._)`${c.code.formats}${(0, ve.getProperty)(a)}` : void 0, J = r.scopeValue("formats", { key: a, ref: j, code: q });
        return typeof j == "object" && !(j instanceof RegExp) ? [j.type || "string", j.validate, (0, ve._)`${J}.validate`] : ["string", j, J];
      }
      function R() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, ve._)`await ${m}(${n})`;
        }
        return typeof _ == "function" ? (0, ve._)`${m}(${n})` : (0, ve._)`${m}.test(${n})`;
      }
    }
  }
};
za.default = bp;
Object.defineProperty(Ua, "__esModule", { value: !0 });
const Pp = za, Np = [Pp.default];
Ua.default = Np;
var ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.contentVocabulary = ir.metadataVocabulary = void 0;
ir.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
ir.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(fa, "__esModule", { value: !0 });
const Op = ha, Rp = pa, Tp = Oa, Ip = Ua, ci = ir, jp = [
  Op.default,
  Rp.default,
  (0, Tp.default)(),
  Ip.default,
  ci.metadataVocabulary,
  ci.contentVocabulary
];
fa.default = jp;
var qa = {}, Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.DiscrError = void 0;
var li;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(li || (Kn.DiscrError = li = {}));
Object.defineProperty(qa, "__esModule", { value: !0 });
const Qt = oe, Ns = Kn, ui = qe, Ap = lr, kp = U, Cp = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ns.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Qt._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, Dp = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Cp,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, Qt._)`${r}${(0, Qt.getProperty)(l)}`);
    t.if((0, Qt._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: Ns.DiscrError.Tag, tag: d, tagName: l })), e.ok(c);
    function u() {
      const y = S();
      t.if(!1);
      for (const v in y)
        t.elseIf((0, Qt._)`${d} === ${v}`), t.assign(c, h(y[v]));
      t.else(), e.error(!1, { discrError: Ns.DiscrError.Mapping, tag: d, tagName: l }), t.endIf();
    }
    function h(y) {
      const v = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: y }, v);
      return e.mergeEvaluated(g, Qt.Name), v;
    }
    function S() {
      var y;
      const v = {}, g = m(s);
      let _ = !0;
      for (let R = 0; R < i.length; R++) {
        let j = i[R];
        if (j != null && j.$ref && !(0, kp.schemaHasRulesButRef)(j, a.self.RULES)) {
          const J = j.$ref;
          if (j = ui.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, J), j instanceof ui.SchemaEnv && (j = j.schema), j === void 0)
            throw new Ap.default(a.opts.uriResolver, a.baseId, J);
        }
        const q = (y = j == null ? void 0 : j.properties) === null || y === void 0 ? void 0 : y[l];
        if (typeof q != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        _ = _ && (g || m(j)), E(q, R);
      }
      if (!_)
        throw new Error(`discriminator: "${l}" must be required`);
      return v;
      function m({ required: R }) {
        return Array.isArray(R) && R.includes(l);
      }
      function E(R, j) {
        if (R.const)
          N(R.const, j);
        else if (R.enum)
          for (const q of R.enum)
            N(q, j);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function N(R, j) {
        if (typeof R != "string" || R in v)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        v[R] = j;
      }
    }
  }
};
qa.default = Dp;
const Mp = "http://json-schema.org/draft-07/schema#", Lp = "http://json-schema.org/draft-07/schema#", Fp = "Core schema meta-schema", Vp = {
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
}, Up = [
  "object",
  "boolean"
], zp = {
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
}, qp = {
  $schema: Mp,
  $id: Lp,
  title: Fp,
  definitions: Vp,
  type: Up,
  properties: zp,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = wc, n = fa, s = qa, a = qp, i = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(v, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = rt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = oe;
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
  var h = Fr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var S = lr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return S.default;
  } });
})(gs, gs.exports);
var Kp = gs.exports, Os = { exports: {} }, vl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(K, Y) {
    return { validate: K, compare: Y };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, d),
    "date-time": t(h, S),
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
    regex: ce,
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
    byte: m,
    // signed 32 bit integer
    int32: { type: "number", validate: R },
    // signed 64 bit integer
    int64: { type: "number", validate: j },
    // C-type float
    float: { type: "number", validate: q },
    // C-type double
    double: { type: "number", validate: q },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, S),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(K) {
    return K % 4 === 0 && (K % 100 !== 0 || K % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(K) {
    const Y = n.exec(K);
    if (!Y)
      return !1;
    const ie = +Y[1], Z = +Y[2], re = +Y[3];
    return Z >= 1 && Z <= 12 && re >= 1 && re <= (Z === 2 && r(ie) ? 29 : s[Z]);
  }
  function i(K, Y) {
    if (K && Y)
      return K > Y ? 1 : K < Y ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(K, Y) {
    const ie = l.exec(K);
    if (!ie)
      return !1;
    const Z = +ie[1], re = +ie[2], M = +ie[3], L = ie[5];
    return (Z <= 23 && re <= 59 && M <= 59 || Z === 23 && re === 59 && M === 60) && (!Y || L !== "");
  }
  function d(K, Y) {
    if (!(K && Y))
      return;
    const ie = l.exec(K), Z = l.exec(Y);
    if (ie && Z)
      return K = ie[1] + ie[2] + ie[3] + (ie[4] || ""), Y = Z[1] + Z[2] + Z[3] + (Z[4] || ""), K > Y ? 1 : K < Y ? -1 : 0;
  }
  const u = /t|\s/i;
  function h(K) {
    const Y = K.split(u);
    return Y.length === 2 && a(Y[0]) && c(Y[1], !0);
  }
  function S(K, Y) {
    if (!(K && Y))
      return;
    const [ie, Z] = K.split(u), [re, M] = Y.split(u), L = i(ie, re);
    if (L !== void 0)
      return L || d(Z, M);
  }
  const y = /\/|:/, v = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(K) {
    return y.test(K) && v.test(K);
  }
  const _ = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function m(K) {
    return _.lastIndex = 0, _.test(K);
  }
  const E = -2147483648, N = 2 ** 31 - 1;
  function R(K) {
    return Number.isInteger(K) && K <= N && K >= E;
  }
  function j(K) {
    return Number.isInteger(K);
  }
  function q() {
    return !0;
  }
  const J = /[^\\]\\Z/;
  function ce(K) {
    if (J.test(K))
      return !1;
    try {
      return new RegExp(K), !0;
    } catch {
      return !1;
    }
  }
})(vl);
var El = {}, Rs = { exports: {} }, wl = {}, ft = {}, Mt = {}, Ur = {}, ne = {}, Mr = {};
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
  function s(m, ...E) {
    const N = [m[0]];
    let R = 0;
    for (; R < E.length; )
      l(N, E[R]), N.push(m[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(m, ...E) {
    const N = [y(m[0])];
    let R = 0;
    for (; R < E.length; )
      N.push(a), l(N, E[R]), N.push(a, y(m[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function l(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(h(E));
  }
  e.addCodeArg = l;
  function c(m) {
    let E = 1;
    for (; E < m.length - 1; ) {
      if (m[E] === a) {
        const N = d(m[E - 1], m[E + 1]);
        if (N !== void 0) {
          m.splice(E - 1, 3, N);
          continue;
        }
        m[E++] = "+";
      }
      E++;
    }
  }
  function d(m, E) {
    if (E === '""')
      return m;
    if (m === '""')
      return E;
    if (typeof m == "string")
      return E instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${m.slice(0, -1)}${E}"` : E[0] === '"' ? m.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(m instanceof r))
      return `"${m}${E.slice(1)}`;
  }
  function u(m, E) {
    return E.emptyStr() ? m : m.emptyStr() ? E : i`${m}${E}`;
  }
  e.strConcat = u;
  function h(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : y(Array.isArray(m) ? m.join(",") : m);
  }
  function S(m) {
    return new n(y(m));
  }
  e.stringify = S;
  function y(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = y;
  function v(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = v;
  function g(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function _(m) {
    return new n(m.toString());
  }
  e.regexpCode = _;
})(Mr);
var Ts = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Mr;
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
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, h;
      if (!((h = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class l extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, u) {
      var h;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const S = this.toName(d), { prefix: y } = S, v = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let g = this._values[y];
      if (g) {
        const E = g.get(v);
        if (E)
          return E;
      } else
        g = this._values[y] = /* @__PURE__ */ new Map();
      g.set(v, S);
      const _ = this._scope[y] || (this._scope[y] = []), m = _.length;
      return _[m] = u.ref, S.setValue(u, { property: y, itemIndex: m }), S;
    }
    getValue(d, u) {
      const h = this._values[d];
      if (h)
        return h.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, h) {
      return this._reduceValues(d, (S) => {
        if (S.value === void 0)
          throw new Error(`CodeGen: name "${S}" has no value`);
        return S.value.code;
      }, u, h);
    }
    _reduceValues(d, u, h = {}, S) {
      let y = t.nil;
      for (const v in d) {
        const g = d[v];
        if (!g)
          continue;
        const _ = h[v] = h[v] || /* @__PURE__ */ new Map();
        g.forEach((m) => {
          if (_.has(m))
            return;
          _.set(m, n.Started);
          let E = u(m);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            y = (0, t._)`${y}${N} ${m} = ${E};${this.opts._n}`;
          } else if (E = S == null ? void 0 : S(m))
            y = (0, t._)`${y}${E}${this.opts._n}`;
          else
            throw new r(m);
          _.set(m, n.Completed);
        });
      }
      return y;
    }
  }
  e.ValueScope = l;
})(Ts);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Mr, r = Ts;
  var n = Mr;
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
  var s = Ts;
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
    constructor(o, f, P) {
      super(), this.varKind = o, this.name = f, this.rhs = P;
    }
    render({ es5: o, _n: f }) {
      const P = o ? r.varKinds.var : this.varKind, k = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${k};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = M(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends a {
    constructor(o, f, P) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = P;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = M(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return re(o, this.rhs);
    }
  }
  class c extends l {
    constructor(o, f, P, k) {
      super(o, P, k), this.op = f;
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
  class u extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class h extends a {
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
  class S extends a {
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
      return this.code = M(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class y extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, P) => f + P.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const P = o[f].optimizeNodes();
        Array.isArray(P) ? o.splice(f, 1, ...P) : P ? o[f] = P : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: P } = this;
      let k = P.length;
      for (; k--; ) {
        const C = P[k];
        C.optimizeNames(o, f) || (L(o, C.names), P.splice(k, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Z(o, f.names), {});
    }
  }
  class v extends y {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends y {
  }
  class _ extends v {
  }
  _.kind = "else";
  class m extends v {
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
        const P = f.optimizeNodes();
        f = this.else = Array.isArray(P) ? new _(P) : P;
      }
      if (f)
        return o === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(H(o), f instanceof m ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = M(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return re(o, this.condition), this.else && Z(o, this.else.names), o;
    }
  }
  m.kind = "if";
  class E extends v {
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
        return this.iteration = M(this.iteration, o, f), this;
    }
    get names() {
      return Z(super.names, this.iteration.names);
    }
  }
  class R extends E {
    constructor(o, f, P, k) {
      super(), this.varKind = o, this.name = f, this.from = P, this.to = k;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: P, from: k, to: C } = this;
      return `for(${f} ${P}=${k}; ${P}<${C}; ${P}++)` + super.render(o);
    }
    get names() {
      const o = re(super.names, this.from);
      return re(o, this.to);
    }
  }
  class j extends E {
    constructor(o, f, P, k) {
      super(), this.loop = o, this.varKind = f, this.name = P, this.iterable = k;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = M(this.iterable, o, f), this;
    }
    get names() {
      return Z(super.names, this.iterable.names);
    }
  }
  class q extends v {
    constructor(o, f, P) {
      super(), this.name = o, this.args = f, this.async = P;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  q.kind = "func";
  class J extends y {
    render(o) {
      return "return " + super.render(o);
    }
  }
  J.kind = "return";
  class ce extends v {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var P, k;
      return super.optimizeNames(o, f), (P = this.catch) === null || P === void 0 || P.optimizeNames(o, f), (k = this.finally) === null || k === void 0 || k.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Z(o, this.catch.names), this.finally && Z(o, this.finally.names), o;
    }
  }
  class K extends v {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  K.kind = "catch";
  class Y extends v {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  Y.kind = "finally";
  class ie {
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
      const P = this._extScope.value(o, f);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
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
    _def(o, f, P, k) {
      const C = this._scope.toName(f);
      return P !== void 0 && k && (this._constants[C.str] = P), this._leafNode(new i(o, C, P)), C;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, P) {
      return this._def(r.varKinds.const, o, f, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, P) {
      return this._def(r.varKinds.let, o, f, P);
    }
    // `var` declaration with optional assignment
    var(o, f, P) {
      return this._def(r.varKinds.var, o, f, P);
    }
    // assignment code
    assign(o, f, P) {
      return this._leafNode(new l(o, f, P));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new S(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [P, k] of o)
        f.length > 1 && f.push(","), f.push(P), (P !== k || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, k));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, P) {
      if (this._blockNode(new m(o)), f && P)
        this.code(f).else().code(P).endIf();
      else if (f)
        this.code(f).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new m(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, _);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, P, k, C = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const B = this._scope.toName(o);
      return this._for(new R(C, B, f, P), () => k(B));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, P, k = r.varKinds.const) {
      const C = this._scope.toName(o);
      if (this.opts.es5) {
        const B = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${B}.length`, (G) => {
          this.var(C, (0, t._)`${B}[${G}]`), P(C);
        });
      }
      return this._for(new j("of", k, C, f), () => P(C));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, P, k = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, P);
      const C = this._scope.toName(o);
      return this._for(new j("in", k, C, f), () => P(C));
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
      return this._leafNode(new u(o));
    }
    // `return` statement
    return(o) {
      const f = new J();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(J);
    }
    // `try` statement
    try(o, f, P) {
      if (!f && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const k = new ce();
      if (this._blockNode(k), this.code(o), f) {
        const C = this.name("e");
        this._currNode = k.catch = new K(C), f(C);
      }
      return P && (this._currNode = k.finally = new Y(), this.code(P)), this._endBlockNode(K, Y);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new h(o));
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
      const P = this._nodes.length - f;
      if (P < 0 || o !== void 0 && P !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, P, k) {
      return this._blockNode(new q(o, f, P)), k && this.code(k).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(q);
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
      const P = this._currNode;
      if (P instanceof o || f && P instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof m))
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
  e.CodeGen = ie;
  function Z($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) + (o[f] || 0);
    return $;
  }
  function re($, o) {
    return o instanceof t._CodeOrName ? Z($, o.names) : $;
  }
  function M($, o, f) {
    if ($ instanceof t.Name)
      return P($);
    if (!k($))
      return $;
    return new t._Code($._items.reduce((C, B) => (B instanceof t.Name && (B = P(B)), B instanceof t._Code ? C.push(...B._items) : C.push(B), C), []));
    function P(C) {
      const B = f[C.str];
      return B === void 0 || o[C.str] !== 1 ? C : (delete o[C.str], B);
    }
    function k(C) {
      return C instanceof t._Code && C._items.some((B) => B instanceof t.Name && o[B.str] === 1 && f[B.str] !== void 0);
    }
  }
  function L($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) - (o[f] || 0);
  }
  function H($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${b($)}`;
  }
  e.not = H;
  const V = p(e.operators.AND);
  function I(...$) {
    return $.reduce(V);
  }
  e.and = I;
  const A = p(e.operators.OR);
  function w(...$) {
    return $.reduce(A);
  }
  e.or = w;
  function p($) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${b(o)} ${$} ${b(f)}`;
  }
  function b($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(ne);
var z = {};
Object.defineProperty(z, "__esModule", { value: !0 });
z.checkStrictMode = z.getErrorPath = z.Type = z.useFunc = z.setEvaluated = z.evaluatedPropsToName = z.mergeEvaluated = z.eachItem = z.unescapeJsonPointer = z.escapeJsonPointer = z.escapeFragment = z.unescapeFragment = z.schemaRefOrVal = z.schemaHasRulesButRef = z.schemaHasRules = z.checkUnknownRules = z.alwaysValidSchema = z.toHash = void 0;
const he = ne, Gp = Mr;
function Hp(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
z.toHash = Hp;
function Bp(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Sl(e, t), !bl(t, e.self.RULES.all));
}
z.alwaysValidSchema = Bp;
function Sl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Ol(e, `unknown keyword: "${a}"`);
}
z.checkUnknownRules = Sl;
function bl(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
z.schemaHasRules = bl;
function Wp(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
z.schemaHasRulesButRef = Wp;
function Jp({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, he._)`${r}`;
  }
  return (0, he._)`${e}${t}${(0, he.getProperty)(n)}`;
}
z.schemaRefOrVal = Jp;
function Xp(e) {
  return Pl(decodeURIComponent(e));
}
z.unescapeFragment = Xp;
function Yp(e) {
  return encodeURIComponent(Ka(e));
}
z.escapeFragment = Yp;
function Ka(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
z.escapeJsonPointer = Ka;
function Pl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
z.unescapeJsonPointer = Pl;
function Qp(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
z.eachItem = Qp;
function di({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, l) => {
    const c = i === void 0 ? a : i instanceof he.Name ? (a instanceof he.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof he.Name ? (t(s, i, a), a) : r(a, i);
    return l === he.Name && !(c instanceof he.Name) ? n(s, c) : c;
  };
}
z.mergeEvaluated = {
  props: di({
    mergeNames: (e, t, r) => e.if((0, he._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, he._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, he._)`${r} || {}`).code((0, he._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, he._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, he._)`${r} || {}`), Ga(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Nl
  }),
  items: di({
    mergeNames: (e, t, r) => e.if((0, he._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, he._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, he._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, he._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Nl(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, he._)`{}`);
  return t !== void 0 && Ga(e, r, t), r;
}
z.evaluatedPropsToName = Nl;
function Ga(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, he._)`${t}${(0, he.getProperty)(n)}`, !0));
}
z.setEvaluated = Ga;
const fi = {};
function Zp(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: fi[t.code] || (fi[t.code] = new Gp._Code(t.code))
  });
}
z.useFunc = Zp;
var Is;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Is || (z.Type = Is = {}));
function xp(e, t, r) {
  if (e instanceof he.Name) {
    const n = t === Is.Num;
    return r ? n ? (0, he._)`"[" + ${e} + "]"` : (0, he._)`"['" + ${e} + "']"` : n ? (0, he._)`"/" + ${e}` : (0, he._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, he.getProperty)(e).toString() : "/" + Ka(e);
}
z.getErrorPath = xp;
function Ol(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
z.checkStrictMode = Ol;
var en = {}, hi;
function It() {
  if (hi) return en;
  hi = 1, Object.defineProperty(en, "__esModule", { value: !0 });
  const e = ne, t = {
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
  return en.default = t, en;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ne, r = z, n = It();
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: m }) => m ? (0, t.str)`"${_}" keyword must be ${m} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function s(_, m = e.keywordError, E, N) {
    const { it: R } = _, { gen: j, compositeRule: q, allErrors: J } = R, ce = h(_, m, E);
    N ?? (q || J) ? c(j, ce) : d(R, (0, t._)`[${ce}]`);
  }
  e.reportError = s;
  function a(_, m = e.keywordError, E) {
    const { it: N } = _, { gen: R, compositeRule: j, allErrors: q } = N, J = h(_, m, E);
    c(R, J), j || q || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(_, m) {
    _.assign(n.default.errors, m), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(m, () => _.assign((0, t._)`${n.default.vErrors}.length`, m), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function l({ gen: _, keyword: m, schemaValue: E, data: N, errsCount: R, it: j }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const q = _.name("err");
    _.forRange("i", R, n.default.errors, (J) => {
      _.const(q, (0, t._)`${n.default.vErrors}[${J}]`), _.if((0, t._)`${q}.instancePath === undefined`, () => _.assign((0, t._)`${q}.instancePath`, (0, t.strConcat)(n.default.instancePath, j.errorPath))), _.assign((0, t._)`${q}.schemaPath`, (0, t.str)`${j.errSchemaPath}/${m}`), j.opts.verbose && (_.assign((0, t._)`${q}.schema`, E), _.assign((0, t._)`${q}.data`, N));
    });
  }
  e.extendErrors = l;
  function c(_, m) {
    const E = _.const("err", m);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function d(_, m) {
    const { gen: E, validateName: N, schemaEnv: R } = _;
    R.$async ? E.throw((0, t._)`new ${_.ValidationError}(${m})`) : (E.assign((0, t._)`${N}.errors`, m), E.return(!1));
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
  function h(_, m, E) {
    const { createErrors: N } = _.it;
    return N === !1 ? (0, t._)`{}` : S(_, m, E);
  }
  function S(_, m, E = {}) {
    const { gen: N, it: R } = _, j = [
      y(R, E),
      v(_, E)
    ];
    return g(_, m, j), N.object(...j);
  }
  function y({ errorPath: _ }, { instancePath: m }) {
    const E = m ? (0, t.str)`${_}${(0, r.getErrorPath)(m, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function v({ keyword: _, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: N }) {
    let R = N ? m : (0, t.str)`${m}/${_}`;
    return E && (R = (0, t.str)`${R}${(0, r.getErrorPath)(E, r.Type.Str)}`), [u.schemaPath, R];
  }
  function g(_, { params: m, message: E }, N) {
    const { keyword: R, data: j, schemaValue: q, it: J } = _, { opts: ce, propertyName: K, topSchemaRef: Y, schemaPath: ie } = J;
    N.push([u.keyword, R], [u.params, typeof m == "function" ? m(_) : m || (0, t._)`{}`]), ce.messages && N.push([u.message, typeof E == "function" ? E(_) : E]), ce.verbose && N.push([u.schema, q], [u.parentSchema, (0, t._)`${Y}${ie}`], [n.default.data, j]), K && N.push([u.propertyName, K]);
  }
})(Ur);
var mi;
function ey() {
  if (mi) return Mt;
  mi = 1, Object.defineProperty(Mt, "__esModule", { value: !0 }), Mt.boolOrEmptySchema = Mt.topBoolOrEmptySchema = void 0;
  const e = Ur, t = ne, r = It(), n = {
    message: "boolean schema is false"
  };
  function s(l) {
    const { gen: c, schema: d, validateName: u } = l;
    d === !1 ? i(l, !1) : typeof d == "object" && d.$async === !0 ? c.return(r.default.data) : (c.assign((0, t._)`${u}.errors`, null), c.return(!0));
  }
  Mt.topBoolOrEmptySchema = s;
  function a(l, c) {
    const { gen: d, schema: u } = l;
    u === !1 ? (d.var(c, !1), i(l)) : d.var(c, !0);
  }
  Mt.boolOrEmptySchema = a;
  function i(l, c) {
    const { gen: d, data: u } = l, h = {
      gen: d,
      keyword: "false schema",
      data: u,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: l
    };
    (0, e.reportError)(h, n, void 0, c);
  }
  return Mt;
}
var Se = {}, Ht = {};
Object.defineProperty(Ht, "__esModule", { value: !0 });
Ht.getRules = Ht.isJSONType = void 0;
const ty = ["string", "number", "integer", "boolean", "null", "object", "array"], ry = new Set(ty);
function ny(e) {
  return typeof e == "string" && ry.has(e);
}
Ht.isJSONType = ny;
function sy() {
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
Ht.getRules = sy;
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.shouldUseRule = yt.shouldUseGroup = yt.schemaHasRulesForType = void 0;
function ay({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Rl(e, n);
}
yt.schemaHasRulesForType = ay;
function Rl(e, t) {
  return t.rules.some((r) => Tl(e, r));
}
yt.shouldUseGroup = Rl;
function Tl(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
yt.shouldUseRule = Tl;
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.reportTypeError = Se.checkDataTypes = Se.checkDataType = Se.coerceAndCheckDataType = Se.getJSONTypes = Se.getSchemaTypes = Se.DataType = void 0;
const oy = Ht, iy = yt, cy = Ur, te = ne, Il = z;
var rr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(rr || (Se.DataType = rr = {}));
function ly(e) {
  const t = jl(e.type);
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
Se.getSchemaTypes = ly;
function jl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(oy.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Se.getJSONTypes = jl;
function uy(e, t) {
  const { gen: r, data: n, opts: s } = e, a = dy(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, iy.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const l = Ha(t, n, s.strictNumbers, rr.Wrong);
    r.if(l, () => {
      a.length ? fy(e, t, a) : Ba(e);
    });
  }
  return i;
}
Se.coerceAndCheckDataType = uy;
const Al = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function dy(e, t) {
  return t ? e.filter((r) => Al.has(r) || t === "array" && r === "array") : [];
}
function fy(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, te._)`typeof ${s}`), l = n.let("coerced", (0, te._)`undefined`);
  a.coerceTypes === "array" && n.if((0, te._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, te._)`${s}[0]`).assign(i, (0, te._)`typeof ${s}`).if(Ha(t, s, a.strictNumbers), () => n.assign(l, s))), n.if((0, te._)`${l} !== undefined`);
  for (const d of r)
    (Al.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), Ba(e), n.endIf(), n.if((0, te._)`${l} !== undefined`, () => {
    n.assign(s, l), hy(e, l);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, te._)`${i} == "number" || ${i} == "boolean"`).assign(l, (0, te._)`"" + ${s}`).elseIf((0, te._)`${s} === null`).assign(l, (0, te._)`""`);
        return;
      case "number":
        n.elseIf((0, te._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, te._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, te._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, te._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, te._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, te._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, te._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, te._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(l, (0, te._)`[${s}]`);
    }
  }
}
function hy({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, te._)`${t} !== undefined`, () => e.assign((0, te._)`${t}[${r}]`, n));
}
function js(e, t, r, n = rr.Correct) {
  const s = n === rr.Correct ? te.operators.EQ : te.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, te._)`${t} ${s} null`;
    case "array":
      a = (0, te._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, te._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, te._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, te._)`typeof ${t} ${s} ${e}`;
  }
  return n === rr.Correct ? a : (0, te.not)(a);
  function i(l = te.nil) {
    return (0, te.and)((0, te._)`typeof ${t} == "number"`, l, r ? (0, te._)`isFinite(${t})` : te.nil);
  }
}
Se.checkDataType = js;
function Ha(e, t, r, n) {
  if (e.length === 1)
    return js(e[0], t, r, n);
  let s;
  const a = (0, Il.toHash)(e);
  if (a.array && a.object) {
    const i = (0, te._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, te._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = te.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, te.and)(s, js(i, t, r, n));
  return s;
}
Se.checkDataTypes = Ha;
const my = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, te._)`{type: ${e}}` : (0, te._)`{type: ${t}}`
};
function Ba(e) {
  const t = py(e);
  (0, cy.reportError)(t, my);
}
Se.reportTypeError = Ba;
function py(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Il.schemaRefOrVal)(e, n, "type");
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
var vr = {}, pi;
function yy() {
  if (pi) return vr;
  pi = 1, Object.defineProperty(vr, "__esModule", { value: !0 }), vr.assignDefaults = void 0;
  const e = ne, t = z;
  function r(s, a) {
    const { properties: i, items: l } = s.schema;
    if (a === "object" && i)
      for (const c in i)
        n(s, c, i[c].default);
    else a === "array" && Array.isArray(l) && l.forEach((c, d) => n(s, d, c.default));
  }
  vr.assignDefaults = r;
  function n(s, a, i) {
    const { gen: l, compositeRule: c, data: d, opts: u } = s;
    if (i === void 0)
      return;
    const h = (0, e._)`${d}${(0, e.getProperty)(a)}`;
    if (c) {
      (0, t.checkStrictMode)(s, `default is ignored for: ${h}`);
      return;
    }
    let S = (0, e._)`${h} === undefined`;
    u.useDefaults === "empty" && (S = (0, e._)`${S} || ${h} === null || ${h} === ""`), l.if(S, (0, e._)`${h} = ${(0, e.stringify)(i)}`);
  }
  return vr;
}
var Ye = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.validateUnion = ae.validateArray = ae.usePattern = ae.callValidateCode = ae.schemaProperties = ae.allSchemaProperties = ae.noPropertyInData = ae.propertyInData = ae.isOwnProperty = ae.hasPropFunc = ae.reportMissingProp = ae.checkMissingProp = ae.checkReportMissingProp = void 0;
const ye = ne, Wa = z, vt = It(), $y = z;
function _y(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Xa(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, ye._)`${t}` }, !0), e.error();
  });
}
ae.checkReportMissingProp = _y;
function gy({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, ye.or)(...n.map((a) => (0, ye.and)(Xa(e, t, a, r.ownProperties), (0, ye._)`${s} = ${a}`)));
}
ae.checkMissingProp = gy;
function vy(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ae.reportMissingProp = vy;
function kl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, ye._)`Object.prototype.hasOwnProperty`
  });
}
ae.hasPropFunc = kl;
function Ja(e, t, r) {
  return (0, ye._)`${kl(e)}.call(${t}, ${r})`;
}
ae.isOwnProperty = Ja;
function Ey(e, t, r, n) {
  const s = (0, ye._)`${t}${(0, ye.getProperty)(r)} !== undefined`;
  return n ? (0, ye._)`${s} && ${Ja(e, t, r)}` : s;
}
ae.propertyInData = Ey;
function Xa(e, t, r, n) {
  const s = (0, ye._)`${t}${(0, ye.getProperty)(r)} === undefined`;
  return n ? (0, ye.or)(s, (0, ye.not)(Ja(e, t, r))) : s;
}
ae.noPropertyInData = Xa;
function Cl(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ae.allSchemaProperties = Cl;
function wy(e, t) {
  return Cl(t).filter((r) => !(0, Wa.alwaysValidSchema)(e, t[r]));
}
ae.schemaProperties = wy;
function Sy({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, l, c, d) {
  const u = d ? (0, ye._)`${e}, ${t}, ${n}${s}` : t, h = [
    [vt.default.instancePath, (0, ye.strConcat)(vt.default.instancePath, a)],
    [vt.default.parentData, i.parentData],
    [vt.default.parentDataProperty, i.parentDataProperty],
    [vt.default.rootData, vt.default.rootData]
  ];
  i.opts.dynamicRef && h.push([vt.default.dynamicAnchors, vt.default.dynamicAnchors]);
  const S = (0, ye._)`${u}, ${r.object(...h)}`;
  return c !== ye.nil ? (0, ye._)`${l}.call(${c}, ${S})` : (0, ye._)`${l}(${S})`;
}
ae.callValidateCode = Sy;
const by = (0, ye._)`new RegExp`;
function Py({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, ye._)`${s.code === "new RegExp" ? by : (0, $y.useFunc)(e, s)}(${r}, ${n})`
  });
}
ae.usePattern = Py;
function Ny(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return i(() => t.assign(l, !1)), l;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(l) {
    const c = t.const("len", (0, ye._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: Wa.Type.Num
      }, a), t.if((0, ye.not)(a), l);
    });
  }
}
ae.validateArray = Ny;
function Oy(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, Wa.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, l);
    t.assign(i, (0, ye._)`${i} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, ye.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
ae.validateUnion = Oy;
var yi;
function Ry() {
  if (yi) return Ye;
  yi = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.validateKeywordUsage = Ye.validSchemaType = Ye.funcKeywordCode = Ye.macroKeywordCode = void 0;
  const e = ne, t = It(), r = ae, n = Ur;
  function s(S, y) {
    const { gen: v, keyword: g, schema: _, parentSchema: m, it: E } = S, N = y.macro.call(E.self, _, m, E), R = d(v, g, N);
    E.opts.validateSchema !== !1 && E.self.validateSchema(N, !0);
    const j = v.name("valid");
    S.subschema({
      schema: N,
      schemaPath: e.nil,
      errSchemaPath: `${E.errSchemaPath}/${g}`,
      topSchemaRef: R,
      compositeRule: !0
    }, j), S.pass(j, () => S.error(!0));
  }
  Ye.macroKeywordCode = s;
  function a(S, y) {
    var v;
    const { gen: g, keyword: _, schema: m, parentSchema: E, $data: N, it: R } = S;
    c(R, y);
    const j = !N && y.compile ? y.compile.call(R.self, m, E, R) : y.validate, q = d(g, _, j), J = g.let("valid");
    S.block$data(J, ce), S.ok((v = y.valid) !== null && v !== void 0 ? v : J);
    function ce() {
      if (y.errors === !1)
        ie(), y.modifying && i(S), Z(() => S.error());
      else {
        const re = y.async ? K() : Y();
        y.modifying && i(S), Z(() => l(S, re));
      }
    }
    function K() {
      const re = g.let("ruleErrs", null);
      return g.try(() => ie((0, e._)`await `), (M) => g.assign(J, !1).if((0, e._)`${M} instanceof ${R.ValidationError}`, () => g.assign(re, (0, e._)`${M}.errors`), () => g.throw(M))), re;
    }
    function Y() {
      const re = (0, e._)`${q}.errors`;
      return g.assign(re, null), ie(e.nil), re;
    }
    function ie(re = y.async ? (0, e._)`await ` : e.nil) {
      const M = R.opts.passContext ? t.default.this : t.default.self, L = !("compile" in y && !N || y.schema === !1);
      g.assign(J, (0, e._)`${re}${(0, r.callValidateCode)(S, q, M, L)}`, y.modifying);
    }
    function Z(re) {
      var M;
      g.if((0, e.not)((M = y.valid) !== null && M !== void 0 ? M : J), re);
    }
  }
  Ye.funcKeywordCode = a;
  function i(S) {
    const { gen: y, data: v, it: g } = S;
    y.if(g.parentData, () => y.assign(v, (0, e._)`${g.parentData}[${g.parentDataProperty}]`));
  }
  function l(S, y) {
    const { gen: v } = S;
    v.if((0, e._)`Array.isArray(${y})`, () => {
      v.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${y} : ${t.default.vErrors}.concat(${y})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(S);
    }, () => S.error());
  }
  function c({ schemaEnv: S }, y) {
    if (y.async && !S.$async)
      throw new Error("async keyword in sync schema");
  }
  function d(S, y, v) {
    if (v === void 0)
      throw new Error(`keyword "${y}" failed to compile`);
    return S.scopeValue("keyword", typeof v == "function" ? { ref: v } : { ref: v, code: (0, e.stringify)(v) });
  }
  function u(S, y, v = !1) {
    return !y.length || y.some((g) => g === "array" ? Array.isArray(S) : g === "object" ? S && typeof S == "object" && !Array.isArray(S) : typeof S == g || v && typeof S > "u");
  }
  Ye.validSchemaType = u;
  function h({ schema: S, opts: y, self: v, errSchemaPath: g }, _, m) {
    if (Array.isArray(_.keyword) ? !_.keyword.includes(m) : _.keyword !== m)
      throw new Error("ajv implementation error");
    const E = _.dependencies;
    if (E != null && E.some((N) => !Object.prototype.hasOwnProperty.call(S, N)))
      throw new Error(`parent schema must have dependencies of ${m}: ${E.join(",")}`);
    if (_.validateSchema && !_.validateSchema(S[m])) {
      const R = `keyword "${m}" value is invalid at path "${g}": ` + v.errorsText(_.validateSchema.errors);
      if (y.validateSchema === "log")
        v.logger.error(R);
      else
        throw new Error(R);
    }
  }
  return Ye.validateKeywordUsage = h, Ye;
}
var ht = {}, $i;
function Ty() {
  if ($i) return ht;
  $i = 1, Object.defineProperty(ht, "__esModule", { value: !0 }), ht.extendSubschemaMode = ht.extendSubschemaData = ht.getSubschema = void 0;
  const e = ne, t = z;
  function r(a, { keyword: i, schemaProp: l, schema: c, schemaPath: d, errSchemaPath: u, topSchemaRef: h }) {
    if (i !== void 0 && c !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (i !== void 0) {
      const S = a.schema[i];
      return l === void 0 ? {
        schema: S,
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(i)}`,
        errSchemaPath: `${a.errSchemaPath}/${i}`
      } : {
        schema: S[l],
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(i)}${(0, e.getProperty)(l)}`,
        errSchemaPath: `${a.errSchemaPath}/${i}/${(0, t.escapeFragment)(l)}`
      };
    }
    if (c !== void 0) {
      if (d === void 0 || u === void 0 || h === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: c,
        schemaPath: d,
        topSchemaRef: h,
        errSchemaPath: u
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  ht.getSubschema = r;
  function n(a, i, { dataProp: l, dataPropType: c, data: d, dataTypes: u, propertyName: h }) {
    if (d !== void 0 && l !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: S } = i;
    if (l !== void 0) {
      const { errorPath: v, dataPathArr: g, opts: _ } = i, m = S.let("data", (0, e._)`${i.data}${(0, e.getProperty)(l)}`, !0);
      y(m), a.errorPath = (0, e.str)`${v}${(0, t.getErrorPath)(l, c, _.jsPropertySyntax)}`, a.parentDataProperty = (0, e._)`${l}`, a.dataPathArr = [...g, a.parentDataProperty];
    }
    if (d !== void 0) {
      const v = d instanceof e.Name ? d : S.let("data", d, !0);
      y(v), h !== void 0 && (a.propertyName = h);
    }
    u && (a.dataTypes = u);
    function y(v) {
      a.data = v, a.dataLevel = i.dataLevel + 1, a.dataTypes = [], i.definedProperties = /* @__PURE__ */ new Set(), a.parentData = i.data, a.dataNames = [...i.dataNames, v];
    }
  }
  ht.extendSubschemaData = n;
  function s(a, { jtdDiscriminator: i, jtdMetadata: l, compositeRule: c, createErrors: d, allErrors: u }) {
    c !== void 0 && (a.compositeRule = c), d !== void 0 && (a.createErrors = d), u !== void 0 && (a.allErrors = u), a.jtdDiscriminator = i, a.jtdMetadata = l;
  }
  return ht.extendSubschemaMode = s, ht;
}
var je = {}, Dl = { exports: {} }, Ot = Dl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  gn(t, n, s, e, "", e);
};
Ot.keywords = {
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
Ot.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Ot.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Ot.skipKeywords = {
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
function gn(e, t, r, n, s, a, i, l, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, l, c, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Ot.arrayKeywords)
          for (var S = 0; S < h.length; S++)
            gn(e, t, r, h[S], s + "/" + u + "/" + S, a, s, u, n, S);
      } else if (u in Ot.propsKeywords) {
        if (h && typeof h == "object")
          for (var y in h)
            gn(e, t, r, h[y], s + "/" + u + "/" + Iy(y), a, s, u, n, y);
      } else (u in Ot.keywords || e.allKeys && !(u in Ot.skipKeywords)) && gn(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, i, l, c, d);
  }
}
function Iy(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var jy = Dl.exports;
Object.defineProperty(je, "__esModule", { value: !0 });
je.getSchemaRefs = je.resolveUrl = je.normalizeId = je._getFullPath = je.getFullPath = je.inlineRef = void 0;
const Ay = z, ky = Fn, Cy = jy, Dy = /* @__PURE__ */ new Set([
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
function My(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !As(e) : t ? Ml(e) <= t : !1;
}
je.inlineRef = My;
const Ly = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function As(e) {
  for (const t in e) {
    if (Ly.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(As) || typeof r == "object" && As(r))
      return !0;
  }
  return !1;
}
function Ml(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Dy.has(r) && (typeof e[r] == "object" && (0, Ay.eachItem)(e[r], (n) => t += Ml(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Ll(e, t = "", r) {
  r !== !1 && (t = nr(t));
  const n = e.parse(t);
  return Fl(e, n);
}
je.getFullPath = Ll;
function Fl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
je._getFullPath = Fl;
const Fy = /#\/?$/;
function nr(e) {
  return e ? e.replace(Fy, "") : "";
}
je.normalizeId = nr;
function Vy(e, t, r) {
  return r = nr(r), e.resolve(t, r);
}
je.resolveUrl = Vy;
const Uy = /^[a-z_][-a-z0-9._]*$/i;
function zy(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = nr(e[r] || t), a = { "": s }, i = Ll(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return Cy(e, { allKeys: !0 }, (h, S, y, v) => {
    if (v === void 0)
      return;
    const g = i + S;
    let _ = a[v];
    typeof h[r] == "string" && (_ = m.call(this, h[r])), E.call(this, h.$anchor), E.call(this, h.$dynamicAnchor), a[S] = _;
    function m(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = nr(_ ? R(_, N) : N), c.has(N))
        throw u(N);
      c.add(N);
      let j = this.refs[N];
      return typeof j == "string" && (j = this.refs[j]), typeof j == "object" ? d(h, j.schema, N) : N !== nr(g) && (N[0] === "#" ? (d(h, l[N], N), l[N] = h) : this.refs[N] = g), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!Uy.test(N))
          throw new Error(`invalid anchor "${N}"`);
        m.call(this, `#${N}`);
      }
    }
  }), l;
  function d(h, S, y) {
    if (S !== void 0 && !ky(h, S))
      throw u(y);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
je.getSchemaRefs = zy;
var _i;
function Gn() {
  if (_i) return ft;
  _i = 1, Object.defineProperty(ft, "__esModule", { value: !0 }), ft.getData = ft.KeywordCxt = ft.validateFunctionCode = void 0;
  const e = ey(), t = Se, r = yt, n = Se, s = yy(), a = Ry(), i = Ty(), l = ne, c = It(), d = je, u = z, h = Ur;
  function S(O) {
    if (j(O) && (J(O), R(O))) {
      _(O);
      return;
    }
    y(O, () => (0, e.topBoolOrEmptySchema)(O));
  }
  ft.validateFunctionCode = S;
  function y({ gen: O, validateName: T, schema: D, schemaEnv: F, opts: W }, x) {
    W.code.es5 ? O.func(T, (0, l._)`${c.default.data}, ${c.default.valCxt}`, F.$async, () => {
      O.code((0, l._)`"use strict"; ${E(D, W)}`), g(O, W), O.code(x);
    }) : O.func(T, (0, l._)`${c.default.data}, ${v(W)}`, F.$async, () => O.code(E(D, W)).code(x));
  }
  function v(O) {
    return (0, l._)`{${c.default.instancePath}="", ${c.default.parentData}, ${c.default.parentDataProperty}, ${c.default.rootData}=${c.default.data}${O.dynamicRef ? (0, l._)`, ${c.default.dynamicAnchors}={}` : l.nil}}={}`;
  }
  function g(O, T) {
    O.if(c.default.valCxt, () => {
      O.var(c.default.instancePath, (0, l._)`${c.default.valCxt}.${c.default.instancePath}`), O.var(c.default.parentData, (0, l._)`${c.default.valCxt}.${c.default.parentData}`), O.var(c.default.parentDataProperty, (0, l._)`${c.default.valCxt}.${c.default.parentDataProperty}`), O.var(c.default.rootData, (0, l._)`${c.default.valCxt}.${c.default.rootData}`), T.dynamicRef && O.var(c.default.dynamicAnchors, (0, l._)`${c.default.valCxt}.${c.default.dynamicAnchors}`);
    }, () => {
      O.var(c.default.instancePath, (0, l._)`""`), O.var(c.default.parentData, (0, l._)`undefined`), O.var(c.default.parentDataProperty, (0, l._)`undefined`), O.var(c.default.rootData, c.default.data), T.dynamicRef && O.var(c.default.dynamicAnchors, (0, l._)`{}`);
    });
  }
  function _(O) {
    const { schema: T, opts: D, gen: F } = O;
    y(O, () => {
      D.$comment && T.$comment && re(O), Y(O), F.let(c.default.vErrors, null), F.let(c.default.errors, 0), D.unevaluated && m(O), ce(O), M(O);
    });
  }
  function m(O) {
    const { gen: T, validateName: D } = O;
    O.evaluated = T.const("evaluated", (0, l._)`${D}.evaluated`), T.if((0, l._)`${O.evaluated}.dynamicProps`, () => T.assign((0, l._)`${O.evaluated}.props`, (0, l._)`undefined`)), T.if((0, l._)`${O.evaluated}.dynamicItems`, () => T.assign((0, l._)`${O.evaluated}.items`, (0, l._)`undefined`));
  }
  function E(O, T) {
    const D = typeof O == "object" && O[T.schemaId];
    return D && (T.code.source || T.code.process) ? (0, l._)`/*# sourceURL=${D} */` : l.nil;
  }
  function N(O, T) {
    if (j(O) && (J(O), R(O))) {
      q(O, T);
      return;
    }
    (0, e.boolOrEmptySchema)(O, T);
  }
  function R({ schema: O, self: T }) {
    if (typeof O == "boolean")
      return !O;
    for (const D in O)
      if (T.RULES.all[D])
        return !0;
    return !1;
  }
  function j(O) {
    return typeof O.schema != "boolean";
  }
  function q(O, T) {
    const { schema: D, gen: F, opts: W } = O;
    W.$comment && D.$comment && re(O), ie(O), Z(O);
    const x = F.const("_errs", c.default.errors);
    ce(O, x), F.var(T, (0, l._)`${x} === ${c.default.errors}`);
  }
  function J(O) {
    (0, u.checkUnknownRules)(O), K(O);
  }
  function ce(O, T) {
    if (O.opts.jtd)
      return H(O, [], !1, T);
    const D = (0, t.getSchemaTypes)(O.schema), F = (0, t.coerceAndCheckDataType)(O, D);
    H(O, D, !F, T);
  }
  function K(O) {
    const { schema: T, errSchemaPath: D, opts: F, self: W } = O;
    T.$ref && F.ignoreKeywordsWithRef && (0, u.schemaHasRulesButRef)(T, W.RULES) && W.logger.warn(`$ref: keywords ignored in schema at path "${D}"`);
  }
  function Y(O) {
    const { schema: T, opts: D } = O;
    T.default !== void 0 && D.useDefaults && D.strictSchema && (0, u.checkStrictMode)(O, "default is ignored in the schema root");
  }
  function ie(O) {
    const T = O.schema[O.opts.schemaId];
    T && (O.baseId = (0, d.resolveUrl)(O.opts.uriResolver, O.baseId, T));
  }
  function Z(O) {
    if (O.schema.$async && !O.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function re({ gen: O, schemaEnv: T, schema: D, errSchemaPath: F, opts: W }) {
    const x = D.$comment;
    if (W.$comment === !0)
      O.code((0, l._)`${c.default.self}.logger.log(${x})`);
    else if (typeof W.$comment == "function") {
      const _e = (0, l.str)`${F}/$comment`, Ce = O.scopeValue("root", { ref: T.root });
      O.code((0, l._)`${c.default.self}.opts.$comment(${x}, ${_e}, ${Ce}.schema)`);
    }
  }
  function M(O) {
    const { gen: T, schemaEnv: D, validateName: F, ValidationError: W, opts: x } = O;
    D.$async ? T.if((0, l._)`${c.default.errors} === 0`, () => T.return(c.default.data), () => T.throw((0, l._)`new ${W}(${c.default.vErrors})`)) : (T.assign((0, l._)`${F}.errors`, c.default.vErrors), x.unevaluated && L(O), T.return((0, l._)`${c.default.errors} === 0`));
  }
  function L({ gen: O, evaluated: T, props: D, items: F }) {
    D instanceof l.Name && O.assign((0, l._)`${T}.props`, D), F instanceof l.Name && O.assign((0, l._)`${T}.items`, F);
  }
  function H(O, T, D, F) {
    const { gen: W, schema: x, data: _e, allErrors: Ce, opts: be, self: Pe } = O, { RULES: ge } = Pe;
    if (x.$ref && (be.ignoreKeywordsWithRef || !(0, u.schemaHasRulesButRef)(x, ge))) {
      W.block(() => k(O, "$ref", ge.all.$ref.definition));
      return;
    }
    be.jtd || I(O, T), W.block(() => {
      for (const Ae of ge.rules)
        at(Ae);
      at(ge.post);
    });
    function at(Ae) {
      (0, r.shouldUseGroup)(x, Ae) && (Ae.type ? (W.if((0, n.checkDataType)(Ae.type, _e, be.strictNumbers)), V(O, Ae), T.length === 1 && T[0] === Ae.type && D && (W.else(), (0, n.reportTypeError)(O)), W.endIf()) : V(O, Ae), Ce || W.if((0, l._)`${c.default.errors} === ${F || 0}`));
    }
  }
  function V(O, T) {
    const { gen: D, schema: F, opts: { useDefaults: W } } = O;
    W && (0, s.assignDefaults)(O, T.type), D.block(() => {
      for (const x of T.rules)
        (0, r.shouldUseRule)(F, x) && k(O, x.keyword, x.definition, T.type);
    });
  }
  function I(O, T) {
    O.schemaEnv.meta || !O.opts.strictTypes || (A(O, T), O.opts.allowUnionTypes || w(O, T), p(O, O.dataTypes));
  }
  function A(O, T) {
    if (T.length) {
      if (!O.dataTypes.length) {
        O.dataTypes = T;
        return;
      }
      T.forEach((D) => {
        $(O.dataTypes, D) || f(O, `type "${D}" not allowed by context "${O.dataTypes.join(",")}"`);
      }), o(O, T);
    }
  }
  function w(O, T) {
    T.length > 1 && !(T.length === 2 && T.includes("null")) && f(O, "use allowUnionTypes to allow union type keyword");
  }
  function p(O, T) {
    const D = O.self.RULES.all;
    for (const F in D) {
      const W = D[F];
      if (typeof W == "object" && (0, r.shouldUseRule)(O.schema, W)) {
        const { type: x } = W.definition;
        x.length && !x.some((_e) => b(T, _e)) && f(O, `missing type "${x.join(",")}" for keyword "${F}"`);
      }
    }
  }
  function b(O, T) {
    return O.includes(T) || T === "number" && O.includes("integer");
  }
  function $(O, T) {
    return O.includes(T) || T === "integer" && O.includes("number");
  }
  function o(O, T) {
    const D = [];
    for (const F of O.dataTypes)
      $(T, F) ? D.push(F) : T.includes("integer") && F === "number" && D.push("integer");
    O.dataTypes = D;
  }
  function f(O, T) {
    const D = O.schemaEnv.baseId + O.errSchemaPath;
    T += ` at "${D}" (strictTypes)`, (0, u.checkStrictMode)(O, T, O.opts.strictTypes);
  }
  class P {
    constructor(T, D, F) {
      if ((0, a.validateKeywordUsage)(T, D, F), this.gen = T.gen, this.allErrors = T.allErrors, this.keyword = F, this.data = T.data, this.schema = T.schema[F], this.$data = D.$data && T.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, u.schemaRefOrVal)(T, this.schema, F, this.$data), this.schemaType = D.schemaType, this.parentSchema = T.schema, this.params = {}, this.it = T, this.def = D, this.$data)
        this.schemaCode = T.gen.const("vSchema", G(this.$data, T));
      else if (this.schemaCode = this.schemaValue, !(0, a.validSchemaType)(this.schema, D.schemaType, D.allowUndefined))
        throw new Error(`${F} value must be ${JSON.stringify(D.schemaType)}`);
      ("code" in D ? D.trackErrors : D.errors !== !1) && (this.errsCount = T.gen.const("_errs", c.default.errors));
    }
    result(T, D, F) {
      this.failResult((0, l.not)(T), D, F);
    }
    failResult(T, D, F) {
      this.gen.if(T), F ? F() : this.error(), D ? (this.gen.else(), D(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
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
    error(T, D, F) {
      if (D) {
        this.setParams(D), this._error(T, F), this.setParams({});
        return;
      }
      this._error(T, F);
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
    block$data(T, D, F = l.nil) {
      this.gen.block(() => {
        this.check$data(T, F), D();
      });
    }
    check$data(T = l.nil, D = l.nil) {
      if (!this.$data)
        return;
      const { gen: F, schemaCode: W, schemaType: x, def: _e } = this;
      F.if((0, l.or)((0, l._)`${W} === undefined`, D)), T !== l.nil && F.assign(T, !0), (x.length || _e.validateSchema) && (F.elseIf(this.invalid$data()), this.$dataError(), T !== l.nil && F.assign(T, !1)), F.else();
    }
    invalid$data() {
      const { gen: T, schemaCode: D, schemaType: F, def: W, it: x } = this;
      return (0, l.or)(_e(), Ce());
      function _e() {
        if (F.length) {
          if (!(D instanceof l.Name))
            throw new Error("ajv implementation error");
          const be = Array.isArray(F) ? F : [F];
          return (0, l._)`${(0, n.checkDataTypes)(be, D, x.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return l.nil;
      }
      function Ce() {
        if (W.validateSchema) {
          const be = T.scopeValue("validate$data", { ref: W.validateSchema });
          return (0, l._)`!${be}(${D})`;
        }
        return l.nil;
      }
    }
    subschema(T, D) {
      const F = (0, i.getSubschema)(this.it, T);
      (0, i.extendSubschemaData)(F, this.it, T), (0, i.extendSubschemaMode)(F, T);
      const W = { ...this.it, ...F, items: void 0, props: void 0 };
      return N(W, D), W;
    }
    mergeEvaluated(T, D) {
      const { it: F, gen: W } = this;
      F.opts.unevaluated && (F.props !== !0 && T.props !== void 0 && (F.props = u.mergeEvaluated.props(W, T.props, F.props, D)), F.items !== !0 && T.items !== void 0 && (F.items = u.mergeEvaluated.items(W, T.items, F.items, D)));
    }
    mergeValidEvaluated(T, D) {
      const { it: F, gen: W } = this;
      if (F.opts.unevaluated && (F.props !== !0 || F.items !== !0))
        return W.if(D, () => this.mergeEvaluated(T, l.Name)), !0;
    }
  }
  ft.KeywordCxt = P;
  function k(O, T, D, F) {
    const W = new P(O, D, T);
    "code" in D ? D.code(W, F) : W.$data && D.validate ? (0, a.funcKeywordCode)(W, D) : "macro" in D ? (0, a.macroKeywordCode)(W, D) : (D.compile || D.validate) && (0, a.funcKeywordCode)(W, D);
  }
  const C = /^\/(?:[^~]|~0|~1)*$/, B = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function G(O, { dataLevel: T, dataNames: D, dataPathArr: F }) {
    let W, x;
    if (O === "")
      return c.default.rootData;
    if (O[0] === "/") {
      if (!C.test(O))
        throw new Error(`Invalid JSON-pointer: ${O}`);
      W = O, x = c.default.rootData;
    } else {
      const Pe = B.exec(O);
      if (!Pe)
        throw new Error(`Invalid JSON-pointer: ${O}`);
      const ge = +Pe[1];
      if (W = Pe[2], W === "#") {
        if (ge >= T)
          throw new Error(be("property/index", ge));
        return F[T - ge];
      }
      if (ge > T)
        throw new Error(be("data", ge));
      if (x = D[T - ge], !W)
        return x;
    }
    let _e = x;
    const Ce = W.split("/");
    for (const Pe of Ce)
      Pe && (x = (0, l._)`${x}${(0, l.getProperty)((0, u.unescapeJsonPointer)(Pe))}`, _e = (0, l._)`${_e} && ${x}`);
    return _e;
    function be(Pe, ge) {
      return `Cannot access ${Pe} ${ge} levels up, current level is ${T}`;
    }
  }
  return ft.getData = G, ft;
}
var zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
class qy extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
zr.default = qy;
var fr = {};
Object.defineProperty(fr, "__esModule", { value: !0 });
const is = je;
class Ky extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, is.resolveUrl)(t, r, n), this.missingSchema = (0, is.normalizeId)((0, is.getFullPath)(t, this.missingRef));
  }
}
fr.default = Ky;
var Ke = {};
Object.defineProperty(Ke, "__esModule", { value: !0 });
Ke.resolveSchema = Ke.getCompilingSchema = Ke.resolveRef = Ke.compileSchema = Ke.SchemaEnv = void 0;
const Qe = ne, Gy = zr, Lt = It(), tt = je, gi = z, Hy = Gn();
class Hn {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, tt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Ke.SchemaEnv = Hn;
function Ya(e) {
  const t = Vl.call(this, e);
  if (t)
    return t;
  const r = (0, tt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Qe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let l;
  e.$async && (l = i.scopeValue("Error", {
    ref: Gy.default,
    code: (0, Qe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Lt.default.data,
    parentData: Lt.default.parentData,
    parentDataProperty: Lt.default.parentDataProperty,
    dataNames: [Lt.default.data],
    dataPathArr: [Qe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Qe.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Qe.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Qe._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, Hy.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    u = `${i.scopeRefs(Lt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const y = new Function(`${Lt.default.self}`, `${Lt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: y }), y.errors = null, y.schema = e.schema, y.schemaEnv = e, e.$async && (y.$async = !0), this.opts.code.source === !0 && (y.source = { validateName: c, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: v, items: g } = d;
      y.evaluated = {
        props: v instanceof Qe.Name ? void 0 : v,
        items: g instanceof Qe.Name ? void 0 : g,
        dynamicProps: v instanceof Qe.Name,
        dynamicItems: g instanceof Qe.Name
      }, y.source && (y.source.evaluated = (0, Qe.stringify)(y.evaluated));
    }
    return e.validate = y, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Ke.compileSchema = Ya;
function By(e, t, r) {
  var n;
  r = (0, tt.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Xy.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    i && (a = new Hn({ schema: i, schemaId: l, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = Wy.call(this, a);
}
Ke.resolveRef = By;
function Wy(e) {
  return (0, tt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Ya.call(this, e);
}
function Vl(e) {
  for (const t of this._compilations)
    if (Jy(t, e))
      return t;
}
Ke.getCompilingSchema = Vl;
function Jy(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Xy(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Bn.call(this, e, t);
}
function Bn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, tt._getFullPath)(this.opts.uriResolver, r);
  let s = (0, tt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return cs.call(this, r, e);
  const a = (0, tt.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const l = Bn.call(this, e, i);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : cs.call(this, r, l);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || Ya.call(this, i), a === (0, tt.normalizeId)(t)) {
      const { schema: l } = i, { schemaId: c } = this.opts, d = l[c];
      return d && (s = (0, tt.resolveUrl)(this.opts.uriResolver, s, d)), new Hn({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return cs.call(this, r, i);
  }
}
Ke.resolveSchema = Bn;
const Yy = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function cs(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, gi.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !Yy.has(l) && d && (t = (0, tt.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, gi.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, tt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Bn.call(this, n, l);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Hn({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Qy = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Zy = "Meta-schema for $data reference (JSON AnySchema extension proposal)", xy = "object", e$ = [
  "$data"
], t$ = {
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
}, r$ = !1, n$ = {
  $id: Qy,
  description: Zy,
  type: xy,
  required: e$,
  properties: t$,
  additionalProperties: r$
};
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const Ul = ul;
Ul.code = 'require("ajv/dist/runtime/uri").default';
Qa.default = Ul;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Gn();
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ne;
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
  const n = zr, s = fr, a = Ht, i = Ke, l = ne, c = je, d = Se, u = z, h = n$, S = Qa, y = (w, p) => new RegExp(w, p);
  y.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  ]), _ = {
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
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function N(w) {
    var p, b, $, o, f, P, k, C, B, G, O, T, D, F, W, x, _e, Ce, be, Pe, ge, at, Ae, jt, At;
    const Je = w.strict, kt = (p = w.code) === null || p === void 0 ? void 0 : p.optimize, yr = kt === !0 || kt === void 0 ? 1 : kt || 0, $r = ($ = (b = w.code) === null || b === void 0 ? void 0 : b.regExp) !== null && $ !== void 0 ? $ : y, ts = (o = w.uriResolver) !== null && o !== void 0 ? o : S.default;
    return {
      strictSchema: (P = (f = w.strictSchema) !== null && f !== void 0 ? f : Je) !== null && P !== void 0 ? P : !0,
      strictNumbers: (C = (k = w.strictNumbers) !== null && k !== void 0 ? k : Je) !== null && C !== void 0 ? C : !0,
      strictTypes: (G = (B = w.strictTypes) !== null && B !== void 0 ? B : Je) !== null && G !== void 0 ? G : "log",
      strictTuples: (T = (O = w.strictTuples) !== null && O !== void 0 ? O : Je) !== null && T !== void 0 ? T : "log",
      strictRequired: (F = (D = w.strictRequired) !== null && D !== void 0 ? D : Je) !== null && F !== void 0 ? F : !1,
      code: w.code ? { ...w.code, optimize: yr, regExp: $r } : { optimize: yr, regExp: $r },
      loopRequired: (W = w.loopRequired) !== null && W !== void 0 ? W : E,
      loopEnum: (x = w.loopEnum) !== null && x !== void 0 ? x : E,
      meta: (_e = w.meta) !== null && _e !== void 0 ? _e : !0,
      messages: (Ce = w.messages) !== null && Ce !== void 0 ? Ce : !0,
      inlineRefs: (be = w.inlineRefs) !== null && be !== void 0 ? be : !0,
      schemaId: (Pe = w.schemaId) !== null && Pe !== void 0 ? Pe : "$id",
      addUsedSchema: (ge = w.addUsedSchema) !== null && ge !== void 0 ? ge : !0,
      validateSchema: (at = w.validateSchema) !== null && at !== void 0 ? at : !0,
      validateFormats: (Ae = w.validateFormats) !== null && Ae !== void 0 ? Ae : !0,
      unicodeRegExp: (jt = w.unicodeRegExp) !== null && jt !== void 0 ? jt : !0,
      int32range: (At = w.int32range) !== null && At !== void 0 ? At : !0,
      uriResolver: ts
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: b, lines: $ } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: g, es5: b, lines: $ }), this.logger = Z(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), j.call(this, _, p, "NOT SUPPORTED"), j.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = Y.call(this), p.formats && ce.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && K.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), J.call(this), p.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: b, schemaId: $ } = this.opts;
      let o = h;
      $ === "id" && (o = { ...h }, o.id = o.$id, delete o.$id), b && p && this.addMetaSchema(o, o[$], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: b } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[b] || p : void 0;
    }
    validate(p, b) {
      let $;
      if (typeof p == "string") {
        if ($ = this.getSchema(p), !$)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        $ = this.compile(p);
      const o = $(b);
      return "$async" in $ || (this.errors = $.errors), o;
    }
    compile(p, b) {
      const $ = this._addSchema(p, b);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, b) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return o.call(this, p, b);
      async function o(G, O) {
        await f.call(this, G.$schema);
        const T = this._addSchema(G, O);
        return T.validate || P.call(this, T);
      }
      async function f(G) {
        G && !this.getSchema(G) && await o.call(this, { $ref: G }, !0);
      }
      async function P(G) {
        try {
          return this._compileSchemaEnv(G);
        } catch (O) {
          if (!(O instanceof s.default))
            throw O;
          return k.call(this, O), await C.call(this, O.missingSchema), P.call(this, G);
        }
      }
      function k({ missingSchema: G, missingRef: O }) {
        if (this.refs[G])
          throw new Error(`AnySchema ${G} is loaded but ${O} cannot be resolved`);
      }
      async function C(G) {
        const O = await B.call(this, G);
        this.refs[G] || await f.call(this, O.$schema), this.refs[G] || this.addSchema(O, G, b);
      }
      async function B(G) {
        const O = this._loading[G];
        if (O)
          return O;
        try {
          return await (this._loading[G] = $(G));
        } finally {
          delete this._loading[G];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, b, $, o = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const P of p)
          this.addSchema(P, void 0, $, o);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: P } = this.opts;
        if (f = p[P], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return b = (0, c.normalizeId)(b || f), this._checkUnique(b), this.schemas[b] = this._addSchema(p, $, b, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, b, $ = this.opts.validateSchema) {
      return this.addSchema(p, b, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, b) {
      if (typeof p == "boolean")
        return !0;
      let $;
      if ($ = p.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate($, p);
      if (!o && b) {
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
      let b;
      for (; typeof (b = q.call(this, p)) == "string"; )
        p = b;
      if (b === void 0) {
        const { schemaId: $ } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: $ });
        if (b = i.resolveSchema.call(this, o, p), !b)
          return;
        this.refs[p] = b;
      }
      return b.validate || this._compileSchemaEnv(b);
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
          const b = q.call(this, p);
          return typeof b == "object" && this._cache.delete(b.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const b = p;
          this._cache.delete(b);
          let $ = p[this.opts.schemaId];
          return $ && ($ = (0, c.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const b of p)
        this.addKeyword(b);
      return this;
    }
    addKeyword(p, b) {
      let $;
      if (typeof p == "string")
        $ = p, typeof b == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), b.keyword = $);
      else if (typeof p == "object" && b === void 0) {
        if (b = p, $ = b.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (M.call(this, $, b), !b)
        return (0, u.eachItem)($, (f) => L.call(this, f)), this;
      V.call(this, b);
      const o = {
        ...b,
        type: (0, d.getJSONTypes)(b.type),
        schemaType: (0, d.getJSONTypes)(b.schemaType)
      };
      return (0, u.eachItem)($, o.type.length === 0 ? (f) => L.call(this, f, o) : (f) => o.type.forEach((P) => L.call(this, f, o, P))), this;
    }
    getKeyword(p) {
      const b = this.RULES.all[p];
      return typeof b == "object" ? b.definition : !!b;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: b } = this;
      delete b.keywords[p], delete b.all[p];
      for (const $ of b.rules) {
        const o = $.rules.findIndex((f) => f.keyword === p);
        o >= 0 && $.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, b) {
      return typeof b == "string" && (b = new RegExp(b)), this.formats[p] = b, this;
    }
    errorsText(p = this.errors, { separator: b = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((o) => `${$}${o.instancePath} ${o.message}`).reduce((o, f) => o + b + f);
    }
    $dataMetaSchema(p, b) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const o of b) {
        const f = o.split("/").slice(1);
        let P = p;
        for (const k of f)
          P = P[k];
        for (const k in $) {
          const C = $[k];
          if (typeof C != "object")
            continue;
          const { $data: B } = C.definition, G = P[k];
          B && G && (P[k] = A(G));
        }
      }
      return p;
    }
    _removeAllSchemas(p, b) {
      for (const $ in p) {
        const o = p[$];
        (!b || b.test($)) && (typeof o == "string" ? delete p[$] : o && !o.meta && (this._cache.delete(o.schema), delete p[$]));
      }
    }
    _addSchema(p, b, $, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let P;
      const { schemaId: k } = this.opts;
      if (typeof p == "object")
        P = p[k];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let C = this._cache.get(p);
      if (C !== void 0)
        return C;
      $ = (0, c.normalizeId)(P || $);
      const B = c.getSchemaRefs.call(this, p, $);
      return C = new i.SchemaEnv({ schema: p, schemaId: k, meta: b, baseId: $, localRefs: B }), this._cache.set(C.schema, C), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = C), o && this.validateSchema(p, !0), C;
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
      const b = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, p);
      } finally {
        this.opts = b;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function j(w, p, b, $ = "error") {
    for (const o in w) {
      const f = o;
      f in p && this.logger[$](`${b}: option ${o}. ${w[f]}`);
    }
  }
  function q(w) {
    return w = (0, c.normalizeId)(w), this.schemas[w] || this.refs[w];
  }
  function J() {
    const w = this.opts.schemas;
    if (w)
      if (Array.isArray(w))
        this.addSchema(w);
      else
        for (const p in w)
          this.addSchema(w[p], p);
  }
  function ce() {
    for (const w in this.opts.formats) {
      const p = this.opts.formats[w];
      p && this.addFormat(w, p);
    }
  }
  function K(w) {
    if (Array.isArray(w)) {
      this.addVocabulary(w);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in w) {
      const b = w[p];
      b.keyword || (b.keyword = p), this.addKeyword(b);
    }
  }
  function Y() {
    const w = { ...this.opts };
    for (const p of v)
      delete w[p];
    return w;
  }
  const ie = { log() {
  }, warn() {
  }, error() {
  } };
  function Z(w) {
    if (w === !1)
      return ie;
    if (w === void 0)
      return console;
    if (w.log && w.warn && w.error)
      return w;
    throw new Error("logger must implement log, warn and error methods");
  }
  const re = /^[a-z_$][a-z0-9_$:-]*$/i;
  function M(w, p) {
    const { RULES: b } = this;
    if ((0, u.eachItem)(w, ($) => {
      if (b.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!re.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(w, p, b) {
    var $;
    const o = p == null ? void 0 : p.post;
    if (b && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let P = o ? f.post : f.rules.find(({ type: C }) => C === b);
    if (P || (P = { type: b, rules: [] }, f.rules.push(P)), f.keywords[w] = !0, !p)
      return;
    const k = {
      keyword: w,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? H.call(this, P, k, p.before) : P.rules.push(k), f.all[w] = k, ($ = p.implements) === null || $ === void 0 || $.forEach((C) => this.addKeyword(C));
  }
  function H(w, p, b) {
    const $ = w.rules.findIndex((o) => o.keyword === b);
    $ >= 0 ? w.rules.splice($, 0, p) : (w.rules.push(p), this.logger.warn(`rule ${b} is not defined`));
  }
  function V(w) {
    let { metaSchema: p } = w;
    p !== void 0 && (w.$data && this.opts.$data && (p = A(p)), w.validateSchema = this.compile(p, !0));
  }
  const I = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function A(w) {
    return { anyOf: [w, I] };
  }
})(wl);
var Za = {}, xa = {}, eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
const s$ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
eo.default = s$;
var Bt = {};
Object.defineProperty(Bt, "__esModule", { value: !0 });
Bt.callRef = Bt.getValidate = void 0;
const a$ = fr, vi = ae, ze = ne, Yt = It(), Ei = Ke, tn = z, o$ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: l, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = Ei.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new a$.default(n.opts.uriResolver, s, r);
    if (u instanceof Ei.SchemaEnv)
      return S(u);
    return y(u);
    function h() {
      if (a === d)
        return vn(e, i, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return vn(e, (0, ze._)`${v}.validate`, d, d.$async);
    }
    function S(v) {
      const g = zl(e, v);
      vn(e, g, v, v.$async);
    }
    function y(v) {
      const g = t.scopeValue("schema", l.code.source === !0 ? { ref: v, code: (0, ze.stringify)(v) } : { ref: v }), _ = t.name("valid"), m = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: ze.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(m), e.ok(_);
    }
  }
};
function zl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, ze._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Bt.getValidate = zl;
function vn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: l, opts: c } = a, d = c.passContext ? Yt.default.this : ze.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, ze._)`await ${(0, vi.callValidateCode)(e, t, d)}`), y(t), i || s.assign(v, !0);
    }, (g) => {
      s.if((0, ze._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), S(g), i || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, vi.callValidateCode)(e, t, d), () => y(t), () => S(t));
  }
  function S(v) {
    const g = (0, ze._)`${v}.errors`;
    s.assign(Yt.default.vErrors, (0, ze._)`${Yt.default.vErrors} === null ? ${g} : ${Yt.default.vErrors}.concat(${g})`), s.assign(Yt.default.errors, (0, ze._)`${Yt.default.vErrors}.length`);
  }
  function y(v) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const _ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (a.props = tn.mergeEvaluated.props(s, _.props, a.props));
      else {
        const m = s.var("props", (0, ze._)`${v}.evaluated.props`);
        a.props = tn.mergeEvaluated.props(s, m, a.props, ze.Name);
      }
    if (a.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (a.items = tn.mergeEvaluated.items(s, _.items, a.items));
      else {
        const m = s.var("items", (0, ze._)`${v}.evaluated.items`);
        a.items = tn.mergeEvaluated.items(s, m, a.items, ze.Name);
      }
  }
}
Bt.callRef = vn;
Bt.default = o$;
Object.defineProperty(xa, "__esModule", { value: !0 });
const i$ = eo, c$ = Bt, l$ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  i$.default,
  c$.default
];
xa.default = l$;
var to = {}, ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
const jn = ne, Et = jn.operators, An = {
  maximum: { okStr: "<=", ok: Et.LTE, fail: Et.GT },
  minimum: { okStr: ">=", ok: Et.GTE, fail: Et.LT },
  exclusiveMaximum: { okStr: "<", ok: Et.LT, fail: Et.GTE },
  exclusiveMinimum: { okStr: ">", ok: Et.GT, fail: Et.LTE }
}, u$ = {
  message: ({ keyword: e, schemaCode: t }) => (0, jn.str)`must be ${An[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, jn._)`{comparison: ${An[e].okStr}, limit: ${t}}`
}, d$ = {
  keyword: Object.keys(An),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: u$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, jn._)`${r} ${An[t].fail} ${n} || isNaN(${r})`);
  }
};
ro.default = d$;
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
const jr = ne, f$ = {
  message: ({ schemaCode: e }) => (0, jr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, jr._)`{multipleOf: ${e}}`
}, h$ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: f$,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), l = a ? (0, jr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, jr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, jr._)`(${n} === 0 || (${i} = ${r}/${n}, ${l}))`);
  }
};
no.default = h$;
var so = {}, ao = {};
Object.defineProperty(ao, "__esModule", { value: !0 });
function ql(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
ao.default = ql;
ql.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(so, "__esModule", { value: !0 });
const zt = ne, m$ = z, p$ = ao, y$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, zt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, zt._)`{limit: ${e}}`
}, $$ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: y$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? zt.operators.GT : zt.operators.LT, i = s.opts.unicode === !1 ? (0, zt._)`${r}.length` : (0, zt._)`${(0, m$.useFunc)(e.gen, p$.default)}(${r})`;
    e.fail$data((0, zt._)`${i} ${a} ${n}`);
  }
};
so.default = $$;
var oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
const _$ = ae, kn = ne, g$ = {
  message: ({ schemaCode: e }) => (0, kn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, kn._)`{pattern: ${e}}`
}, v$ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: g$,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", l = r ? (0, kn._)`(new RegExp(${s}, ${i}))` : (0, _$.usePattern)(e, n);
    e.fail$data((0, kn._)`!${l}.test(${t})`);
  }
};
oo.default = v$;
var io = {};
Object.defineProperty(io, "__esModule", { value: !0 });
const Ar = ne, E$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Ar.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Ar._)`{limit: ${e}}`
}, w$ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: E$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Ar.operators.GT : Ar.operators.LT;
    e.fail$data((0, Ar._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
io.default = w$;
var co = {};
Object.defineProperty(co, "__esModule", { value: !0 });
const Er = ae, kr = ne, S$ = z, b$ = {
  message: ({ params: { missingProperty: e } }) => (0, kr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, kr._)`{missingProperty: ${e}}`
}, P$ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: b$,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: l } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (i.allErrors ? d() : u(), l.strictRequired) {
      const y = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const g of r)
        if ((y == null ? void 0 : y[g]) === void 0 && !v.has(g)) {
          const _ = i.schemaEnv.baseId + i.errSchemaPath, m = `required property "${g}" is not defined at "${_}" (strictRequired)`;
          (0, S$.checkStrictMode)(i, m, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(kr.nil, h);
      else
        for (const y of r)
          (0, Er.checkReportMissingProp)(e, y);
    }
    function u() {
      const y = t.let("missing");
      if (c || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => S(y, v)), e.ok(v);
      } else
        t.if((0, Er.checkMissingProp)(e, r, y)), (0, Er.reportMissingProp)(e, y), t.else();
    }
    function h() {
      t.forOf("prop", n, (y) => {
        e.setParams({ missingProperty: y }), t.if((0, Er.noPropertyInData)(t, s, y, l.ownProperties), () => e.error());
      });
    }
    function S(y, v) {
      e.setParams({ missingProperty: y }), t.forOf(y, n, () => {
        t.assign(v, (0, Er.propertyInData)(t, s, y, l.ownProperties)), t.if((0, kr.not)(v), () => {
          e.error(), t.break();
        });
      }, kr.nil);
    }
  }
};
co.default = P$;
var lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
const Cr = ne, N$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Cr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Cr._)`{limit: ${e}}`
}, O$ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: N$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Cr.operators.GT : Cr.operators.LT;
    e.fail$data((0, Cr._)`${r}.length ${s} ${n}`);
  }
};
lo.default = O$;
var uo = {}, qr = {};
Object.defineProperty(qr, "__esModule", { value: !0 });
const Kl = Fn;
Kl.code = 'require("ajv/dist/runtime/equal").default';
qr.default = Kl;
Object.defineProperty(uo, "__esModule", { value: !0 });
const ls = Se, Re = ne, R$ = z, T$ = qr, I$ = {
  message: ({ params: { i: e, j: t } }) => (0, Re.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Re._)`{i: ${e}, j: ${t}}`
}, j$ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: I$,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, ls.getSchemaTypes)(a.items) : [];
    e.block$data(c, u, (0, Re._)`${i} === false`), e.ok(c);
    function u() {
      const v = t.let("i", (0, Re._)`${r}.length`), g = t.let("j");
      e.setParams({ i: v, j: g }), t.assign(c, !0), t.if((0, Re._)`${v} > 1`, () => (h() ? S : y)(v, g));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function S(v, g) {
      const _ = t.name("item"), m = (0, ls.checkDataTypes)(d, _, l.opts.strictNumbers, ls.DataType.Wrong), E = t.const("indices", (0, Re._)`{}`);
      t.for((0, Re._)`;${v}--;`, () => {
        t.let(_, (0, Re._)`${r}[${v}]`), t.if(m, (0, Re._)`continue`), d.length > 1 && t.if((0, Re._)`typeof ${_} == "string"`, (0, Re._)`${_} += "_"`), t.if((0, Re._)`typeof ${E}[${_}] == "number"`, () => {
          t.assign(g, (0, Re._)`${E}[${_}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Re._)`${E}[${_}] = ${v}`);
      });
    }
    function y(v, g) {
      const _ = (0, R$.useFunc)(t, T$.default), m = t.name("outer");
      t.label(m).for((0, Re._)`;${v}--;`, () => t.for((0, Re._)`${g} = ${v}; ${g}--;`, () => t.if((0, Re._)`${_}(${r}[${v}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
uo.default = j$;
var fo = {};
Object.defineProperty(fo, "__esModule", { value: !0 });
const ks = ne, A$ = z, k$ = qr, C$ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, ks._)`{allowedValue: ${e}}`
}, D$ = {
  keyword: "const",
  $data: !0,
  error: C$,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, ks._)`!${(0, A$.useFunc)(t, k$.default)}(${r}, ${s})`) : e.fail((0, ks._)`${a} !== ${r}`);
  }
};
fo.default = D$;
var ho = {};
Object.defineProperty(ho, "__esModule", { value: !0 });
const Pr = ne, M$ = z, L$ = qr, F$ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Pr._)`{allowedValues: ${e}}`
}, V$ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: F$,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, M$.useFunc)(t, L$.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const y = t.const("vSchema", a);
      u = (0, Pr.or)(...s.map((v, g) => S(y, g)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (y) => t.if((0, Pr._)`${d()}(${r}, ${y})`, () => t.assign(u, !0).break()));
    }
    function S(y, v) {
      const g = s[v];
      return typeof g == "object" && g !== null ? (0, Pr._)`${d()}(${r}, ${y}[${v}])` : (0, Pr._)`${r} === ${g}`;
    }
  }
};
ho.default = V$;
Object.defineProperty(to, "__esModule", { value: !0 });
const U$ = ro, z$ = no, q$ = so, K$ = oo, G$ = io, H$ = co, B$ = lo, W$ = uo, J$ = fo, X$ = ho, Y$ = [
  // number
  U$.default,
  z$.default,
  // string
  q$.default,
  K$.default,
  // object
  G$.default,
  H$.default,
  // array
  B$.default,
  W$.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  J$.default,
  X$.default
];
to.default = Y$;
var mo = {}, hr = {};
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.validateAdditionalItems = void 0;
const qt = ne, Cs = z, Q$ = {
  message: ({ params: { len: e } }) => (0, qt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, qt._)`{limit: ${e}}`
}, Z$ = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Q$,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Cs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Gl(e, n);
  }
};
function Gl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const l = r.const("len", (0, qt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, qt._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Cs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, qt._)`${l} <= ${t.length}`);
    r.if((0, qt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: Cs.Type.Num }, d), i.allErrors || r.if((0, qt.not)(d), () => r.break());
    });
  }
}
hr.validateAdditionalItems = Gl;
hr.default = Z$;
var po = {}, mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.validateTuple = void 0;
const wi = ne, En = z, x$ = ae, e_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Hl(e, "additionalItems", t);
    r.items = !0, !(0, En.alwaysValidSchema)(r, t) && e.ok((0, x$.validateArray)(e));
  }
};
function Hl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = En.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), d = n.const("len", (0, wi._)`${a}.length`);
  r.forEach((h, S) => {
    (0, En.alwaysValidSchema)(l, h) || (n.if((0, wi._)`${d} > ${S}`, () => e.subschema({
      keyword: i,
      schemaProp: S,
      dataProp: S
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: S, errSchemaPath: y } = l, v = r.length, g = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (S.strictTuples && !g) {
      const _ = `"${i}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${y}"`;
      (0, En.checkStrictMode)(l, _, S.strictTuples);
    }
  }
}
mr.validateTuple = Hl;
mr.default = e_;
Object.defineProperty(po, "__esModule", { value: !0 });
const t_ = mr, r_ = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, t_.validateTuple)(e, "items")
};
po.default = r_;
var yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
const Si = ne, n_ = z, s_ = ae, a_ = hr, o_ = {
  message: ({ params: { len: e } }) => (0, Si.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Si._)`{limit: ${e}}`
}, i_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: o_,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, n_.alwaysValidSchema)(n, t) && (s ? (0, a_.validateAdditionalItems)(e, s) : e.ok((0, s_.validateArray)(e)));
  }
};
yo.default = i_;
var $o = {};
Object.defineProperty($o, "__esModule", { value: !0 });
const We = ne, rn = z, c_ = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, We.str)`must contain at least ${e} valid item(s)` : (0, We.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, We._)`{minContains: ${e}}` : (0, We._)`{minContains: ${e}, maxContains: ${t}}`
}, l_ = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: c_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, l;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, l = d) : i = 1;
    const u = t.const("len", (0, We._)`${s}.length`);
    if (e.setParams({ min: i, max: l }), l === void 0 && i === 0) {
      (0, rn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && i > l) {
      (0, rn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, rn.alwaysValidSchema)(a, r)) {
      let g = (0, We._)`${u} >= ${i}`;
      l !== void 0 && (g = (0, We._)`${g} && ${u} <= ${l}`), e.pass(g);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    l === void 0 && i === 1 ? y(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, We._)`${s}.length > 0`, S)) : (t.let(h, !1), S()), e.result(h, () => e.reset());
    function S() {
      const g = t.name("_valid"), _ = t.let("count", 0);
      y(g, () => t.if(g, () => v(_)));
    }
    function y(g, _) {
      t.forRange("i", 0, u, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: rn.Type.Num,
          compositeRule: !0
        }, g), _();
      });
    }
    function v(g) {
      t.code((0, We._)`${g}++`), l === void 0 ? t.if((0, We._)`${g} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, We._)`${g} > ${l}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, We._)`${g} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
$o.default = l_;
var Bl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ne, r = z, n = ae;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, u] = a(c);
      i(c, d), l(c, u);
    }
  };
  function a({ schema: c }) {
    const d = {}, u = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const S = Array.isArray(c[h]) ? d : u;
      S[h] = c[h];
    }
    return [d, u];
  }
  function i(c, d = c.schema) {
    const { gen: u, data: h, it: S } = c;
    if (Object.keys(d).length === 0)
      return;
    const y = u.let("missing");
    for (const v in d) {
      const g = d[v];
      if (g.length === 0)
        continue;
      const _ = (0, n.propertyInData)(u, h, v, S.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: g.length,
        deps: g.join(", ")
      }), S.allErrors ? u.if(_, () => {
        for (const m of g)
          (0, n.checkReportMissingProp)(c, m);
      }) : (u.if((0, t._)`${_} && (${(0, n.checkMissingProp)(c, g, y)})`), (0, n.reportMissingProp)(c, y), u.else());
    }
  }
  e.validatePropertyDeps = i;
  function l(c, d = c.schema) {
    const { gen: u, data: h, keyword: S, it: y } = c, v = u.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(y, d[g]) || (u.if(
        (0, n.propertyInData)(u, h, g, y.opts.ownProperties),
        () => {
          const _ = c.subschema({ keyword: S, schemaProp: g }, v);
          c.mergeValidEvaluated(_, v);
        },
        () => u.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = l, e.default = s;
})(Bl);
var _o = {};
Object.defineProperty(_o, "__esModule", { value: !0 });
const Wl = ne, u_ = z, d_ = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Wl._)`{propertyName: ${e.propertyName}}`
}, f_ = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: d_,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, u_.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Wl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
_o.default = f_;
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
const nn = ae, xe = ne, h_ = It(), sn = z, m_ = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, xe._)`{additionalProperty: ${e.additionalProperty}}`
}, p_ = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: m_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, sn.alwaysValidSchema)(i, r))
      return;
    const d = (0, nn.allSchemaProperties)(n.properties), u = (0, nn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, xe._)`${a} === ${h_.default.errors}`);
    function h() {
      t.forIn("key", s, (_) => {
        !d.length && !u.length ? v(_) : t.if(S(_), () => v(_));
      });
    }
    function S(_) {
      let m;
      if (d.length > 8) {
        const E = (0, sn.schemaRefOrVal)(i, n.properties, "properties");
        m = (0, nn.isOwnProperty)(t, E, _);
      } else d.length ? m = (0, xe.or)(...d.map((E) => (0, xe._)`${_} === ${E}`)) : m = xe.nil;
      return u.length && (m = (0, xe.or)(m, ...u.map((E) => (0, xe._)`${(0, nn.usePattern)(e, E)}.test(${_})`))), (0, xe.not)(m);
    }
    function y(_) {
      t.code((0, xe._)`delete ${s}[${_}]`);
    }
    function v(_) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        y(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, sn.alwaysValidSchema)(i, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (g(_, m, !1), t.if((0, xe.not)(m), () => {
          e.reset(), y(_);
        })) : (g(_, m), l || t.if((0, xe.not)(m), () => t.break()));
      }
    }
    function g(_, m, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: sn.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, m);
    }
  }
};
Wn.default = p_;
var go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
const y_ = Gn(), bi = ae, us = z, Pi = Wn, $_ = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Pi.default.code(new y_.KeywordCxt(a, Pi.default, "additionalProperties"));
    const i = (0, bi.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = us.mergeEvaluated.props(t, (0, us.toHash)(i), a.props));
    const l = i.filter((h) => !(0, us.alwaysValidSchema)(a, r[h]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const h of l)
      d(h) ? u(h) : (t.if((0, bi.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
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
go.default = $_;
var vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
const Ni = ae, an = ne, Oi = z, Ri = z, __ = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, l = (0, Ni.allSchemaProperties)(r), c = l.filter((g) => (0, Oi.alwaysValidSchema)(a, r[g]));
    if (l.length === 0 || c.length === l.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof an.Name) && (a.props = (0, Ri.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    S();
    function S() {
      for (const g of l)
        d && y(g), a.allErrors ? v(g) : (t.var(u, !0), v(g), t.if(u));
    }
    function y(g) {
      for (const _ in d)
        new RegExp(g).test(_) && (0, Oi.checkStrictMode)(a, `property ${_} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function v(g) {
      t.forIn("key", n, (_) => {
        t.if((0, an._)`${(0, Ni.usePattern)(e, g)}.test(${_})`, () => {
          const m = c.includes(g);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: _,
            dataPropType: Ri.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, an._)`${h}[${_}]`, !0) : !m && !a.allErrors && t.if((0, an.not)(u), () => t.break());
        });
      });
    }
  }
};
vo.default = __;
var Eo = {};
Object.defineProperty(Eo, "__esModule", { value: !0 });
const g_ = z, v_ = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, g_.alwaysValidSchema)(n, r)) {
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
Eo.default = v_;
var wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
const E_ = ae, w_ = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: E_.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
wo.default = w_;
var So = {};
Object.defineProperty(So, "__esModule", { value: !0 });
const wn = ne, S_ = z, b_ = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, wn._)`{passingSchemas: ${e.passing}}`
}, P_ = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: b_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let S;
        (0, S_.alwaysValidSchema)(s, u) ? t.var(c, !0) : S = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, wn._)`${c} && ${i}`).assign(i, !1).assign(l, (0, wn._)`[${l}, ${h}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(l, h), S && e.mergeEvaluated(S, wn.Name);
        });
      });
    }
  }
};
So.default = P_;
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const N_ = z, O_ = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, N_.alwaysValidSchema)(n, a))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
bo.default = O_;
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
const Cn = ne, Jl = z, R_ = {
  message: ({ params: e }) => (0, Cn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Cn._)`{failingKeyword: ${e.ifClause}}`
}, T_ = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: R_,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Jl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Ti(n, "then"), a = Ti(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, d("then", u), d("else", u));
    } else s ? t.if(l, d("then")) : t.if((0, Cn.not)(l), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const S = e.subschema({ keyword: u }, l);
        t.assign(i, l), e.mergeValidEvaluated(S, i), h ? t.assign(h, (0, Cn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Ti(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Jl.alwaysValidSchema)(e, r);
}
Po.default = T_;
var No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
const I_ = z, j_ = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, I_.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
No.default = j_;
Object.defineProperty(mo, "__esModule", { value: !0 });
const A_ = hr, k_ = po, C_ = mr, D_ = yo, M_ = $o, L_ = Bl, F_ = _o, V_ = Wn, U_ = go, z_ = vo, q_ = Eo, K_ = wo, G_ = So, H_ = bo, B_ = Po, W_ = No;
function J_(e = !1) {
  const t = [
    // any
    q_.default,
    K_.default,
    G_.default,
    H_.default,
    B_.default,
    W_.default,
    // object
    F_.default,
    V_.default,
    L_.default,
    U_.default,
    z_.default
  ];
  return e ? t.push(k_.default, D_.default) : t.push(A_.default, C_.default), t.push(M_.default), t;
}
mo.default = J_;
var Oo = {}, Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const Ee = ne, X_ = {
  message: ({ schemaCode: e }) => (0, Ee.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Ee._)`{format: ${e}}`
}, Y_ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: X_,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: l } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: h } = l;
    if (!c.validateFormats)
      return;
    s ? S() : y();
    function S() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, Ee._)`${v}[${i}]`), _ = r.let("fType"), m = r.let("format");
      r.if((0, Ee._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(_, (0, Ee._)`${g}.type || "string"`).assign(m, (0, Ee._)`${g}.validate`), () => r.assign(_, (0, Ee._)`"string"`).assign(m, g)), e.fail$data((0, Ee.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? Ee.nil : (0, Ee._)`${i} && !${m}`;
      }
      function N() {
        const R = u.$async ? (0, Ee._)`(${g}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, Ee._)`${m}(${n})`, j = (0, Ee._)`(typeof ${m} == "function" ? ${R} : ${m}.test(${n}))`;
        return (0, Ee._)`${m} && ${m} !== true && ${_} === ${t} && !${j}`;
      }
    }
    function y() {
      const v = h.formats[a];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [g, _, m] = N(v);
      g === t && e.pass(R());
      function E() {
        if (c.strictSchema === !1) {
          h.logger.warn(j());
          return;
        }
        throw new Error(j());
        function j() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(j) {
        const q = j instanceof RegExp ? (0, Ee.regexpCode)(j) : c.code.formats ? (0, Ee._)`${c.code.formats}${(0, Ee.getProperty)(a)}` : void 0, J = r.scopeValue("formats", { key: a, ref: j, code: q });
        return typeof j == "object" && !(j instanceof RegExp) ? [j.type || "string", j.validate, (0, Ee._)`${J}.validate`] : ["string", j, J];
      }
      function R() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, Ee._)`await ${m}(${n})`;
        }
        return typeof _ == "function" ? (0, Ee._)`${m}(${n})` : (0, Ee._)`${m}.test(${n})`;
      }
    }
  }
};
Ro.default = Y_;
Object.defineProperty(Oo, "__esModule", { value: !0 });
const Q_ = Ro, Z_ = [Q_.default];
Oo.default = Z_;
var cr = {};
Object.defineProperty(cr, "__esModule", { value: !0 });
cr.contentVocabulary = cr.metadataVocabulary = void 0;
cr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
cr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Za, "__esModule", { value: !0 });
const x_ = xa, eg = to, tg = mo, rg = Oo, Ii = cr, ng = [
  x_.default,
  eg.default,
  (0, tg.default)(),
  rg.default,
  Ii.metadataVocabulary,
  Ii.contentVocabulary
];
Za.default = ng;
var To = {}, Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.DiscrError = void 0;
var ji;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(ji || (Jn.DiscrError = ji = {}));
Object.defineProperty(To, "__esModule", { value: !0 });
const Zt = ne, Ds = Jn, Ai = Ke, sg = fr, ag = z, og = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ds.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Zt._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, ig = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: og,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, Zt._)`${r}${(0, Zt.getProperty)(l)}`);
    t.if((0, Zt._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: Ds.DiscrError.Tag, tag: d, tagName: l })), e.ok(c);
    function u() {
      const y = S();
      t.if(!1);
      for (const v in y)
        t.elseIf((0, Zt._)`${d} === ${v}`), t.assign(c, h(y[v]));
      t.else(), e.error(!1, { discrError: Ds.DiscrError.Mapping, tag: d, tagName: l }), t.endIf();
    }
    function h(y) {
      const v = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: y }, v);
      return e.mergeEvaluated(g, Zt.Name), v;
    }
    function S() {
      var y;
      const v = {}, g = m(s);
      let _ = !0;
      for (let R = 0; R < i.length; R++) {
        let j = i[R];
        if (j != null && j.$ref && !(0, ag.schemaHasRulesButRef)(j, a.self.RULES)) {
          const J = j.$ref;
          if (j = Ai.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, J), j instanceof Ai.SchemaEnv && (j = j.schema), j === void 0)
            throw new sg.default(a.opts.uriResolver, a.baseId, J);
        }
        const q = (y = j == null ? void 0 : j.properties) === null || y === void 0 ? void 0 : y[l];
        if (typeof q != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        _ = _ && (g || m(j)), E(q, R);
      }
      if (!_)
        throw new Error(`discriminator: "${l}" must be required`);
      return v;
      function m({ required: R }) {
        return Array.isArray(R) && R.includes(l);
      }
      function E(R, j) {
        if (R.const)
          N(R.const, j);
        else if (R.enum)
          for (const q of R.enum)
            N(q, j);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function N(R, j) {
        if (typeof R != "string" || R in v)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        v[R] = j;
      }
    }
  }
};
To.default = ig;
const cg = "http://json-schema.org/draft-07/schema#", lg = "http://json-schema.org/draft-07/schema#", ug = "Core schema meta-schema", dg = {
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
}, fg = [
  "object",
  "boolean"
], hg = {
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
}, mg = {
  $schema: cg,
  $id: lg,
  title: ug,
  definitions: dg,
  type: fg,
  properties: hg,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = wl, n = Za, s = To, a = mg, i = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(v, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = Gn();
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = ne;
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
  var h = zr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var S = fr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return S.default;
  } });
})(Rs, Rs.exports);
var pg = Rs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = pg, r = ne, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: l, schemaCode: c }) => r.str`should be ${s[l].okStr} ${c}`,
    params: ({ keyword: l, schemaCode: c }) => r._`{comparison: ${s[l].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(l) {
      const { gen: c, data: d, schemaCode: u, keyword: h, it: S } = l, { opts: y, self: v } = S;
      if (!y.validateFormats)
        return;
      const g = new t.KeywordCxt(S, v.RULES.all.format.definition, "format");
      g.$data ? _() : m();
      function _() {
        const N = c.scopeValue("formats", {
          ref: v.formats,
          code: y.code.formats
        }), R = c.const("fmt", r._`${N}[${g.schemaCode}]`);
        l.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, E(R)));
      }
      function m() {
        const N = g.schema, R = v.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${h}": format "${N}" does not define "compare" function`);
        const j = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: y.code.formats ? r._`${y.code.formats}${r.getProperty(N)}` : void 0
        });
        l.fail$data(E(j));
      }
      function E(N) {
        return r._`${N}.compare(${d}, ${u}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = i;
})(El);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = vl, n = El, s = ne, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), l = (d, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return c(d, u, r.fullFormats, a), d;
    const [h, S] = u.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], y = u.formats || r.formatNames;
    return c(d, y, h, S), u.keywords && n.default(d), d;
  };
  l.get = (d, u = "full") => {
    const S = (u === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!S)
      throw new Error(`Unknown format "${d}"`);
    return S;
  };
  function c(d, u, h, S) {
    var y, v;
    (y = (v = d.opts.code).formats) !== null && y !== void 0 || (v.formats = s._`require("ajv-formats/dist/formats").${S}`);
    for (const g of u)
      d.addFormat(g, h[g]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})(Os, Os.exports);
var yg = Os.exports;
const $g = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !_g(s, a) && n || Object.defineProperty(e, r, a);
}, _g = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, gg = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, vg = (e, t) => `/* Wrapped ${e}*/
${t}`, Eg = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), wg = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Sg = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = vg.bind(null, n, t.toString());
  Object.defineProperty(s, "name", wg), Object.defineProperty(e, "toString", { ...Eg, value: s });
}, bg = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    $g(e, t, s, r);
  return gg(e, t), Sg(e, t, n), e;
};
var Pg = bg;
const Ng = Pg;
var Og = (e, t = {}) => {
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
  const l = function(...c) {
    const d = this, u = () => {
      a = void 0, s && (i = e.apply(d, c));
    }, h = n && !a;
    return clearTimeout(a), a = setTimeout(u, r), h && (i = e.apply(d, c)), i;
  };
  return Ng(l, e), l.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, l;
}, Ms = { exports: {} };
const Rg = "2.0.0", Xl = 256, Tg = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Ig = 16, jg = Xl - 6, Ag = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Xn = {
  MAX_LENGTH: Xl,
  MAX_SAFE_COMPONENT_LENGTH: Ig,
  MAX_SAFE_BUILD_LENGTH: jg,
  MAX_SAFE_INTEGER: Tg,
  RELEASE_TYPES: Ag,
  SEMVER_SPEC_VERSION: Rg,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const kg = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Yn = kg;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = Xn, a = Yn;
  t = e.exports = {};
  const i = t.re = [], l = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], u = t.t = {};
  let h = 0;
  const S = "[a-zA-Z0-9-]", y = [
    ["\\s", 1],
    ["\\d", s],
    [S, n]
  ], v = (_) => {
    for (const [m, E] of y)
      _ = _.split(`${m}*`).join(`${m}{0,${E}}`).split(`${m}+`).join(`${m}{1,${E}}`);
    return _;
  }, g = (_, m, E) => {
    const N = v(m), R = h++;
    a(_, R, m), u[_] = R, c[R] = m, d[R] = N, i[R] = new RegExp(m, E ? "g" : void 0), l[R] = new RegExp(N, E ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${S}*`), g("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${S}+`), g("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), g("FULL", `^${c[u.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), g("LOOSE", `^${c[u.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), g("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[u.COERCE], !0), g("COERCERTLFULL", c[u.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Ms, Ms.exports);
var Kr = Ms.exports;
const Cg = Object.freeze({ loose: !0 }), Dg = Object.freeze({}), Mg = (e) => e ? typeof e != "object" ? Cg : e : Dg;
var Io = Mg;
const ki = /^[0-9]+$/, Yl = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = ki.test(e), n = ki.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Lg = (e, t) => Yl(t, e);
var Ql = {
  compareIdentifiers: Yl,
  rcompareIdentifiers: Lg
};
const on = Yn, { MAX_LENGTH: Ci, MAX_SAFE_INTEGER: cn } = Xn, { safeRe: ln, t: un } = Kr, Fg = Io, { compareIdentifiers: ds } = Ql;
let Vg = class ot {
  constructor(t, r) {
    if (r = Fg(r), t instanceof ot) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Ci)
      throw new TypeError(
        `version is longer than ${Ci} characters`
      );
    on("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? ln[un.LOOSE] : ln[un.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > cn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > cn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > cn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < cn)
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
    if (on("SemVer.compare", this.version, this.options, t), !(t instanceof ot)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ot(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ot || (t = new ot(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof ot || (t = new ot(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (on("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return ds(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof ot || (t = new ot(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (on("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return ds(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? ln[un.PRERELEASELOOSE] : ln[un.PRERELEASE]);
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
          n === !1 && (a = [r]), ds(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Fe = Vg;
const Di = Fe, Ug = (e, t, r = !1) => {
  if (e instanceof Di)
    return e;
  try {
    return new Di(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var pr = Ug;
const zg = pr, qg = (e, t) => {
  const r = zg(e, t);
  return r ? r.version : null;
};
var Kg = qg;
const Gg = pr, Hg = (e, t) => {
  const r = Gg(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Bg = Hg;
const Mi = Fe, Wg = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new Mi(
      e instanceof Mi ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var Jg = Wg;
const Li = pr, Xg = (e, t) => {
  const r = Li(e, null, !0), n = Li(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, i = a ? r : n, l = a ? n : r, c = !!i.prerelease.length;
  if (!!l.prerelease.length && !c) {
    if (!l.patch && !l.minor)
      return "major";
    if (l.compareMain(i) === 0)
      return l.minor && !l.patch ? "minor" : "patch";
  }
  const u = c ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var Yg = Xg;
const Qg = Fe, Zg = (e, t) => new Qg(e, t).major;
var xg = Zg;
const e0 = Fe, t0 = (e, t) => new e0(e, t).minor;
var r0 = t0;
const n0 = Fe, s0 = (e, t) => new n0(e, t).patch;
var a0 = s0;
const o0 = pr, i0 = (e, t) => {
  const r = o0(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var c0 = i0;
const Fi = Fe, l0 = (e, t, r) => new Fi(e, r).compare(new Fi(t, r));
var nt = l0;
const u0 = nt, d0 = (e, t, r) => u0(t, e, r);
var f0 = d0;
const h0 = nt, m0 = (e, t) => h0(e, t, !0);
var p0 = m0;
const Vi = Fe, y0 = (e, t, r) => {
  const n = new Vi(e, r), s = new Vi(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var jo = y0;
const $0 = jo, _0 = (e, t) => e.sort((r, n) => $0(r, n, t));
var g0 = _0;
const v0 = jo, E0 = (e, t) => e.sort((r, n) => v0(n, r, t));
var w0 = E0;
const S0 = nt, b0 = (e, t, r) => S0(e, t, r) > 0;
var Qn = b0;
const P0 = nt, N0 = (e, t, r) => P0(e, t, r) < 0;
var Ao = N0;
const O0 = nt, R0 = (e, t, r) => O0(e, t, r) === 0;
var Zl = R0;
const T0 = nt, I0 = (e, t, r) => T0(e, t, r) !== 0;
var xl = I0;
const j0 = nt, A0 = (e, t, r) => j0(e, t, r) >= 0;
var ko = A0;
const k0 = nt, C0 = (e, t, r) => k0(e, t, r) <= 0;
var Co = C0;
const D0 = Zl, M0 = xl, L0 = Qn, F0 = ko, V0 = Ao, U0 = Co, z0 = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return D0(e, r, n);
    case "!=":
      return M0(e, r, n);
    case ">":
      return L0(e, r, n);
    case ">=":
      return F0(e, r, n);
    case "<":
      return V0(e, r, n);
    case "<=":
      return U0(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var eu = z0;
const q0 = Fe, K0 = pr, { safeRe: dn, t: fn } = Kr, G0 = (e, t) => {
  if (e instanceof q0)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? dn[fn.COERCEFULL] : dn[fn.COERCE]);
  else {
    const c = t.includePrerelease ? dn[fn.COERCERTLFULL] : dn[fn.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", l = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return K0(`${n}.${s}.${a}${i}${l}`, t);
};
var H0 = G0;
class B0 {
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
var W0 = B0, fs, Ui;
function st() {
  if (Ui) return fs;
  Ui = 1;
  const e = /\s+/g;
  class t {
    constructor(L, H) {
      if (H = s(H), L instanceof t)
        return L.loose === !!H.loose && L.includePrerelease === !!H.includePrerelease ? L : new t(L.raw, H);
      if (L instanceof a)
        return this.raw = L.value, this.set = [[L]], this.formatted = void 0, this;
      if (this.options = H, this.loose = !!H.loose, this.includePrerelease = !!H.includePrerelease, this.raw = L.trim().replace(e, " "), this.set = this.raw.split("||").map((V) => this.parseRange(V.trim())).filter((V) => V.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const V = this.set[0];
        if (this.set = this.set.filter((I) => !g(I[0])), this.set.length === 0)
          this.set = [V];
        else if (this.set.length > 1) {
          for (const I of this.set)
            if (I.length === 1 && _(I[0])) {
              this.set = [I];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let L = 0; L < this.set.length; L++) {
          L > 0 && (this.formatted += "||");
          const H = this.set[L];
          for (let V = 0; V < H.length; V++)
            V > 0 && (this.formatted += " "), this.formatted += H[V].toString().trim();
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
    parseRange(L) {
      const V = ((this.options.includePrerelease && y) | (this.options.loose && v)) + ":" + L, I = n.get(V);
      if (I)
        return I;
      const A = this.options.loose, w = A ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      L = L.replace(w, Z(this.options.includePrerelease)), i("hyphen replace", L), L = L.replace(c[d.COMPARATORTRIM], u), i("comparator trim", L), L = L.replace(c[d.TILDETRIM], h), i("tilde trim", L), L = L.replace(c[d.CARETTRIM], S), i("caret trim", L);
      let p = L.split(" ").map((f) => E(f, this.options)).join(" ").split(/\s+/).map((f) => ie(f, this.options));
      A && (p = p.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", p);
      const b = /* @__PURE__ */ new Map(), $ = p.map((f) => new a(f, this.options));
      for (const f of $) {
        if (g(f))
          return [f];
        b.set(f.value, f);
      }
      b.size > 1 && b.has("") && b.delete("");
      const o = [...b.values()];
      return n.set(V, o), o;
    }
    intersects(L, H) {
      if (!(L instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((V) => m(V, H) && L.set.some((I) => m(I, H) && V.every((A) => I.every((w) => A.intersects(w, H)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(L) {
      if (!L)
        return !1;
      if (typeof L == "string")
        try {
          L = new l(L, this.options);
        } catch {
          return !1;
        }
      for (let H = 0; H < this.set.length; H++)
        if (re(this.set[H], L, this.options))
          return !0;
      return !1;
    }
  }
  fs = t;
  const r = W0, n = new r(), s = Io, a = Zn(), i = Yn, l = Fe, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: u,
    tildeTrimReplace: h,
    caretTrimReplace: S
  } = Kr, { FLAG_INCLUDE_PRERELEASE: y, FLAG_LOOSE: v } = Xn, g = (M) => M.value === "<0.0.0-0", _ = (M) => M.value === "", m = (M, L) => {
    let H = !0;
    const V = M.slice();
    let I = V.pop();
    for (; H && V.length; )
      H = V.every((A) => I.intersects(A, L)), I = V.pop();
    return H;
  }, E = (M, L) => (M = M.replace(c[d.BUILD], ""), i("comp", M, L), M = q(M, L), i("caret", M), M = R(M, L), i("tildes", M), M = ce(M, L), i("xrange", M), M = Y(M, L), i("stars", M), M), N = (M) => !M || M.toLowerCase() === "x" || M === "*", R = (M, L) => M.trim().split(/\s+/).map((H) => j(H, L)).join(" "), j = (M, L) => {
    const H = L.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return M.replace(H, (V, I, A, w, p) => {
      i("tilde", M, V, I, A, w, p);
      let b;
      return N(I) ? b = "" : N(A) ? b = `>=${I}.0.0 <${+I + 1}.0.0-0` : N(w) ? b = `>=${I}.${A}.0 <${I}.${+A + 1}.0-0` : p ? (i("replaceTilde pr", p), b = `>=${I}.${A}.${w}-${p} <${I}.${+A + 1}.0-0`) : b = `>=${I}.${A}.${w} <${I}.${+A + 1}.0-0`, i("tilde return", b), b;
    });
  }, q = (M, L) => M.trim().split(/\s+/).map((H) => J(H, L)).join(" "), J = (M, L) => {
    i("caret", M, L);
    const H = L.loose ? c[d.CARETLOOSE] : c[d.CARET], V = L.includePrerelease ? "-0" : "";
    return M.replace(H, (I, A, w, p, b) => {
      i("caret", M, I, A, w, p, b);
      let $;
      return N(A) ? $ = "" : N(w) ? $ = `>=${A}.0.0${V} <${+A + 1}.0.0-0` : N(p) ? A === "0" ? $ = `>=${A}.${w}.0${V} <${A}.${+w + 1}.0-0` : $ = `>=${A}.${w}.0${V} <${+A + 1}.0.0-0` : b ? (i("replaceCaret pr", b), A === "0" ? w === "0" ? $ = `>=${A}.${w}.${p}-${b} <${A}.${w}.${+p + 1}-0` : $ = `>=${A}.${w}.${p}-${b} <${A}.${+w + 1}.0-0` : $ = `>=${A}.${w}.${p}-${b} <${+A + 1}.0.0-0`) : (i("no pr"), A === "0" ? w === "0" ? $ = `>=${A}.${w}.${p}${V} <${A}.${w}.${+p + 1}-0` : $ = `>=${A}.${w}.${p}${V} <${A}.${+w + 1}.0-0` : $ = `>=${A}.${w}.${p} <${+A + 1}.0.0-0`), i("caret return", $), $;
    });
  }, ce = (M, L) => (i("replaceXRanges", M, L), M.split(/\s+/).map((H) => K(H, L)).join(" ")), K = (M, L) => {
    M = M.trim();
    const H = L.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return M.replace(H, (V, I, A, w, p, b) => {
      i("xRange", M, V, I, A, w, p, b);
      const $ = N(A), o = $ || N(w), f = o || N(p), P = f;
      return I === "=" && P && (I = ""), b = L.includePrerelease ? "-0" : "", $ ? I === ">" || I === "<" ? V = "<0.0.0-0" : V = "*" : I && P ? (o && (w = 0), p = 0, I === ">" ? (I = ">=", o ? (A = +A + 1, w = 0, p = 0) : (w = +w + 1, p = 0)) : I === "<=" && (I = "<", o ? A = +A + 1 : w = +w + 1), I === "<" && (b = "-0"), V = `${I + A}.${w}.${p}${b}`) : o ? V = `>=${A}.0.0${b} <${+A + 1}.0.0-0` : f && (V = `>=${A}.${w}.0${b} <${A}.${+w + 1}.0-0`), i("xRange return", V), V;
    });
  }, Y = (M, L) => (i("replaceStars", M, L), M.trim().replace(c[d.STAR], "")), ie = (M, L) => (i("replaceGTE0", M, L), M.trim().replace(c[L.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Z = (M) => (L, H, V, I, A, w, p, b, $, o, f, P) => (N(V) ? H = "" : N(I) ? H = `>=${V}.0.0${M ? "-0" : ""}` : N(A) ? H = `>=${V}.${I}.0${M ? "-0" : ""}` : w ? H = `>=${H}` : H = `>=${H}${M ? "-0" : ""}`, N($) ? b = "" : N(o) ? b = `<${+$ + 1}.0.0-0` : N(f) ? b = `<${$}.${+o + 1}.0-0` : P ? b = `<=${$}.${o}.${f}-${P}` : M ? b = `<${$}.${o}.${+f + 1}-0` : b = `<=${b}`, `${H} ${b}`.trim()), re = (M, L, H) => {
    for (let V = 0; V < M.length; V++)
      if (!M[V].test(L))
        return !1;
    if (L.prerelease.length && !H.includePrerelease) {
      for (let V = 0; V < M.length; V++)
        if (i(M[V].semver), M[V].semver !== a.ANY && M[V].semver.prerelease.length > 0) {
          const I = M[V].semver;
          if (I.major === L.major && I.minor === L.minor && I.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return fs;
}
var hs, zi;
function Zn() {
  if (zi) return hs;
  zi = 1;
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
      u = u.trim().split(/\s+/).join(" "), i("comparator", u, h), this.options = h, this.loose = !!h.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(u) {
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], S = u.match(h);
      if (!S)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = S[1] !== void 0 ? S[1] : "", this.operator === "=" && (this.operator = ""), S[2] ? this.semver = new l(S[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (i("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new l(u, this.options);
        } catch {
          return !1;
        }
      return a(u, this.operator, this.semver, this.options);
    }
    intersects(u, h) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(u.value, h).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new c(this.value, h).test(u.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || a(this.semver, "<", u.semver, h) && this.operator.startsWith(">") && u.operator.startsWith("<") || a(this.semver, ">", u.semver, h) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  hs = t;
  const r = Io, { safeRe: n, t: s } = Kr, a = eu, i = Yn, l = Fe, c = st();
  return hs;
}
const J0 = st(), X0 = (e, t, r) => {
  try {
    t = new J0(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var xn = X0;
const Y0 = st(), Q0 = (e, t) => new Y0(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Z0 = Q0;
const x0 = Fe, ev = st(), tv = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new ev(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new x0(n, r));
  }), n;
};
var rv = tv;
const nv = Fe, sv = st(), av = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new sv(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new nv(n, r));
  }), n;
};
var ov = av;
const ms = Fe, iv = st(), qi = Qn, cv = (e, t) => {
  e = new iv(e, t);
  let r = new ms("0.0.0");
  if (e.test(r) || (r = new ms("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const l = new ms(i.semver.version);
      switch (i.operator) {
        case ">":
          l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
        case "":
        case ">=":
          (!a || qi(l, a)) && (a = l);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), a && (!r || qi(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var lv = cv;
const uv = st(), dv = (e, t) => {
  try {
    return new uv(e, t).range || "*";
  } catch {
    return null;
  }
};
var fv = dv;
const hv = Fe, tu = Zn(), { ANY: mv } = tu, pv = st(), yv = xn, Ki = Qn, Gi = Ao, $v = Co, _v = ko, gv = (e, t, r, n) => {
  e = new hv(e, n), t = new pv(t, n);
  let s, a, i, l, c;
  switch (r) {
    case ">":
      s = Ki, a = $v, i = Gi, l = ">", c = ">=";
      break;
    case "<":
      s = Gi, a = _v, i = Ki, l = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (yv(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const u = t.set[d];
    let h = null, S = null;
    if (u.forEach((y) => {
      y.semver === mv && (y = new tu(">=0.0.0")), h = h || y, S = S || y, s(y.semver, h.semver, n) ? h = y : i(y.semver, S.semver, n) && (S = y);
    }), h.operator === l || h.operator === c || (!S.operator || S.operator === l) && a(e, S.semver))
      return !1;
    if (S.operator === c && i(e, S.semver))
      return !1;
  }
  return !0;
};
var Do = gv;
const vv = Do, Ev = (e, t, r) => vv(e, t, ">", r);
var wv = Ev;
const Sv = Do, bv = (e, t, r) => Sv(e, t, "<", r);
var Pv = bv;
const Hi = st(), Nv = (e, t, r) => (e = new Hi(e, r), t = new Hi(t, r), e.intersects(t, r));
var Ov = Nv;
const Rv = xn, Tv = nt;
var Iv = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((u, h) => Tv(u, h, r));
  for (const u of i)
    Rv(u, t, r) ? (a = u, s || (s = u)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const l = [];
  for (const [u, h] of n)
    u === h ? l.push(u) : !h && u === i[0] ? l.push("*") : h ? u === i[0] ? l.push(`<=${h}`) : l.push(`${u} - ${h}`) : l.push(`>=${u}`);
  const c = l.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const Bi = st(), Mo = Zn(), { ANY: ps } = Mo, wr = xn, Lo = nt, jv = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Bi(e, r), t = new Bi(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = kv(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, Av = [new Mo(">=0.0.0-0")], Wi = [new Mo(">=0.0.0")], kv = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ps) {
    if (t.length === 1 && t[0].semver === ps)
      return !0;
    r.includePrerelease ? e = Av : e = Wi;
  }
  if (t.length === 1 && t[0].semver === ps) {
    if (r.includePrerelease)
      return !0;
    t = Wi;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const y of e)
    y.operator === ">" || y.operator === ">=" ? s = Ji(s, y, r) : y.operator === "<" || y.operator === "<=" ? a = Xi(a, y, r) : n.add(y.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && a) {
    if (i = Lo(s.semver, a.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const y of n) {
    if (s && !wr(y, String(s), r) || a && !wr(y, String(a), r))
      return null;
    for (const v of t)
      if (!wr(y, String(v), r))
        return !1;
    return !0;
  }
  let l, c, d, u, h = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, S = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && a.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const y of t) {
    if (u = u || y.operator === ">" || y.operator === ">=", d = d || y.operator === "<" || y.operator === "<=", s) {
      if (S && y.semver.prerelease && y.semver.prerelease.length && y.semver.major === S.major && y.semver.minor === S.minor && y.semver.patch === S.patch && (S = !1), y.operator === ">" || y.operator === ">=") {
        if (l = Ji(s, y, r), l === y && l !== s)
          return !1;
      } else if (s.operator === ">=" && !wr(s.semver, String(y), r))
        return !1;
    }
    if (a) {
      if (h && y.semver.prerelease && y.semver.prerelease.length && y.semver.major === h.major && y.semver.minor === h.minor && y.semver.patch === h.patch && (h = !1), y.operator === "<" || y.operator === "<=") {
        if (c = Xi(a, y, r), c === y && c !== a)
          return !1;
      } else if (a.operator === "<=" && !wr(a.semver, String(y), r))
        return !1;
    }
    if (!y.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && u && !s && i !== 0 || S || h);
}, Ji = (e, t, r) => {
  if (!e)
    return t;
  const n = Lo(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Xi = (e, t, r) => {
  if (!e)
    return t;
  const n = Lo(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Cv = jv;
const ys = Kr, Yi = Xn, Dv = Fe, Qi = Ql, Mv = pr, Lv = Kg, Fv = Bg, Vv = Jg, Uv = Yg, zv = xg, qv = r0, Kv = a0, Gv = c0, Hv = nt, Bv = f0, Wv = p0, Jv = jo, Xv = g0, Yv = w0, Qv = Qn, Zv = Ao, xv = Zl, eE = xl, tE = ko, rE = Co, nE = eu, sE = H0, aE = Zn(), oE = st(), iE = xn, cE = Z0, lE = rv, uE = ov, dE = lv, fE = fv, hE = Do, mE = wv, pE = Pv, yE = Ov, $E = Iv, _E = Cv;
var gE = {
  parse: Mv,
  valid: Lv,
  clean: Fv,
  inc: Vv,
  diff: Uv,
  major: zv,
  minor: qv,
  patch: Kv,
  prerelease: Gv,
  compare: Hv,
  rcompare: Bv,
  compareLoose: Wv,
  compareBuild: Jv,
  sort: Xv,
  rsort: Yv,
  gt: Qv,
  lt: Zv,
  eq: xv,
  neq: eE,
  gte: tE,
  lte: rE,
  cmp: nE,
  coerce: sE,
  Comparator: aE,
  Range: oE,
  satisfies: iE,
  toComparators: cE,
  maxSatisfying: lE,
  minSatisfying: uE,
  minVersion: dE,
  validRange: fE,
  outside: hE,
  gtr: mE,
  ltr: pE,
  intersects: yE,
  simplifyRange: $E,
  subset: _E,
  SemVer: Dv,
  re: ys.re,
  src: ys.src,
  tokens: ys.t,
  SEMVER_SPEC_VERSION: Yi.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Yi.RELEASE_TYPES,
  compareIdentifiers: Qi.compareIdentifiers,
  rcompareIdentifiers: Qi.rcompareIdentifiers
}, es = { exports: {} }, Fo = { exports: {} };
const ru = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
Fo.exports = ru;
Fo.exports.default = ru;
var vE = Fo.exports;
const EE = vE, Dn = /* @__PURE__ */ new WeakMap(), nu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...i) {
    if (Dn.set(a, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return EE(a, e), Dn.set(a, n), a;
};
es.exports = nu;
es.exports.default = nu;
es.exports.callCount = (e) => {
  if (!Dn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Dn.get(e);
};
var wE = es.exports;
(function(e, t) {
  var r = Hr && Hr.__classPrivateFieldSet || function(V, I, A, w, p) {
    if (w === "m") throw new TypeError("Private method is not writable");
    if (w === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof I == "function" ? V !== I || !p : !I.has(V)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return w === "a" ? p.call(V, A) : p ? p.value = A : I.set(V, A), A;
  }, n = Hr && Hr.__classPrivateFieldGet || function(V, I, A, w) {
    if (A === "a" && !w) throw new TypeError("Private accessor was defined without a getter");
    if (typeof I == "function" ? V !== I || !w : !I.has(V)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return A === "m" ? w : A === "a" ? w.call(V) : w ? w.value : I.get(V);
  }, s, a, i, l, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const u = nc, h = Vs, S = Wt, y = lu, v = uu, g = du, _ = $u, m = Ru, E = Au, N = ct, R = Kp, j = yg, q = Og, J = gE, ce = wE, K = "aes-256-cbc", Y = () => /* @__PURE__ */ Object.create(null), ie = (V) => V != null;
  let Z = "";
  try {
    delete require.cache[__filename], Z = S.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const re = (V, I) => {
    const A = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), w = typeof I;
    if (A.has(w))
      throw new TypeError(`Setting a value of type \`${w}\` for key \`${V}\` is not allowed as it's not supported by JSON`);
  }, M = "__internal__", L = `${M}.migrations.version`;
  class H {
    constructor(I = {}) {
      var A;
      i.set(this, void 0), l.set(this, void 0), c.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const w = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...I
      }, p = ce(() => {
        const f = m.sync({ cwd: Z }), P = f && JSON.parse(h.readFileSync(f, "utf8"));
        return P ?? {};
      });
      if (!w.cwd) {
        if (w.projectName || (w.projectName = p().name), !w.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        w.cwd = E(w.projectName, { suffix: w.projectSuffix }).config;
      }
      if (r(this, c, w, "f"), w.schema) {
        if (typeof w.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new R.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, j.default)(f);
        const P = {
          type: "object",
          properties: w.schema
        };
        r(this, i, f.compile(P), "f");
        for (const [k, C] of Object.entries(w.schema))
          C != null && C.default && (n(this, d, "f")[k] = C.default);
      }
      w.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...w.defaults
      }, "f"), w.serialize && (this._serialize = w.serialize), w.deserialize && (this._deserialize = w.deserialize), this.events = new g.EventEmitter(), r(this, l, w.encryptionKey, "f");
      const b = w.fileExtension ? `.${w.fileExtension}` : "";
      this.path = S.resolve(w.cwd, `${(A = w.configName) !== null && A !== void 0 ? A : "config"}${b}`);
      const $ = this.store, o = Object.assign(Y(), w.defaults, $);
      this._validate(o);
      try {
        v.deepEqual($, o);
      } catch {
        this.store = o;
      }
      if (w.watch && this._watch(), w.migrations) {
        if (w.projectVersion || (w.projectVersion = p().version), !w.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(w.migrations, w.projectVersion, w.beforeEachMigration);
      }
    }
    get(I, A) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(I, A);
      const { store: w } = this;
      return I in w ? w[I] : A;
    }
    set(I, A) {
      if (typeof I != "string" && typeof I != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof I}`);
      if (typeof I != "object" && A === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(I))
        throw new TypeError(`Please don't use the ${M} key, as it's used to manage this module internal operations.`);
      const { store: w } = this, p = (b, $) => {
        re(b, $), n(this, c, "f").accessPropertiesByDotNotation ? _.set(w, b, $) : w[b] = $;
      };
      if (typeof I == "object") {
        const b = I;
        for (const [$, o] of Object.entries(b))
          p($, o);
      } else
        p(I, A);
      this.store = w;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(I) {
      return n(this, c, "f").accessPropertiesByDotNotation ? _.has(this.store, I) : I in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...I) {
      for (const A of I)
        ie(n(this, d, "f")[A]) && this.set(A, n(this, d, "f")[A]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(I) {
      const { store: A } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? _.delete(A, I) : delete A[I], this.store = A;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = Y();
      for (const I of Object.keys(n(this, d, "f")))
        this.reset(I);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(I, A) {
      if (typeof I != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof I}`);
      if (typeof A != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof A}`);
      return this._handleChange(() => this.get(I), A);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(I) {
      if (typeof I != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof I}`);
      return this._handleChange(() => this.store, I);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const I = h.readFileSync(this.path, n(this, l, "f") ? null : "utf8"), A = this._encryptData(I), w = this._deserialize(A);
        return this._validate(w), Object.assign(Y(), w);
      } catch (I) {
        if ((I == null ? void 0 : I.code) === "ENOENT")
          return this._ensureDirectory(), Y();
        if (n(this, c, "f").clearInvalidConfig && I.name === "SyntaxError")
          return Y();
        throw I;
      }
    }
    set store(I) {
      this._ensureDirectory(), this._validate(I), this._write(I), this.events.emit("change");
    }
    *[(i = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [I, A] of Object.entries(this.store))
        yield [I, A];
    }
    _encryptData(I) {
      if (!n(this, l, "f"))
        return I.toString();
      try {
        if (n(this, l, "f"))
          try {
            if (I.slice(16, 17).toString() === ":") {
              const A = I.slice(0, 16), w = y.pbkdf2Sync(n(this, l, "f"), A.toString(), 1e4, 32, "sha512"), p = y.createDecipheriv(K, w, A);
              I = Buffer.concat([p.update(Buffer.from(I.slice(17))), p.final()]).toString("utf8");
            } else {
              const A = y.createDecipher(K, n(this, l, "f"));
              I = Buffer.concat([A.update(Buffer.from(I)), A.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return I.toString();
    }
    _handleChange(I, A) {
      let w = I();
      const p = () => {
        const b = w, $ = I();
        (0, u.isDeepStrictEqual)($, b) || (w = $, A.call(this, $, b));
      };
      return this.events.on("change", p), () => this.events.removeListener("change", p);
    }
    _validate(I) {
      if (!n(this, i, "f") || n(this, i, "f").call(this, I) || !n(this, i, "f").errors)
        return;
      const w = n(this, i, "f").errors.map(({ instancePath: p, message: b = "" }) => `\`${p.slice(1)}\` ${b}`);
      throw new Error("Config schema violation: " + w.join("; "));
    }
    _ensureDirectory() {
      h.mkdirSync(S.dirname(this.path), { recursive: !0 });
    }
    _write(I) {
      let A = this._serialize(I);
      if (n(this, l, "f")) {
        const w = y.randomBytes(16), p = y.pbkdf2Sync(n(this, l, "f"), w.toString(), 1e4, 32, "sha512"), b = y.createCipheriv(K, p, w);
        A = Buffer.concat([w, Buffer.from(":"), b.update(Buffer.from(A)), b.final()]);
      }
      if (process.env.SNAP)
        h.writeFileSync(this.path, A, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, A, { mode: n(this, c, "f").configFileMode });
        } catch (w) {
          if ((w == null ? void 0 : w.code) === "EXDEV") {
            h.writeFileSync(this.path, A, { mode: n(this, c, "f").configFileMode });
            return;
          }
          throw w;
        }
    }
    _watch() {
      this._ensureDirectory(), h.existsSync(this.path) || this._write(Y()), process.platform === "win32" ? h.watch(this.path, { persistent: !1 }, q(() => {
        this.events.emit("change");
      }, { wait: 100 })) : h.watchFile(this.path, { persistent: !1 }, q(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(I, A, w) {
      let p = this._get(L, "0.0.0");
      const b = Object.keys(I).filter((o) => this._shouldPerformMigration(o, p, A));
      let $ = { ...this.store };
      for (const o of b)
        try {
          w && w(this, {
            fromVersion: p,
            toVersion: o,
            finalVersion: A,
            versions: b
          });
          const f = I[o];
          f(this), this._set(L, o), p = o, $ = { ...this.store };
        } catch (f) {
          throw this.store = $, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(p) || !J.eq(p, A)) && this._set(L, A);
    }
    _containsReservedKey(I) {
      return typeof I == "object" && Object.keys(I)[0] === M ? !0 : typeof I != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!I.startsWith(`${M}.`) : !1;
    }
    _isVersionInRangeFormat(I) {
      return J.clean(I) === null;
    }
    _shouldPerformMigration(I, A, w) {
      return this._isVersionInRangeFormat(I) ? A !== "0.0.0" && J.satisfies(A, I) ? !1 : J.satisfies(w, I) : !(J.lte(I, A) || J.gt(I, w));
    }
    _get(I, A) {
      return _.get(this.store, I, A);
    }
    _set(I, A) {
      const { store: w } = this;
      _.set(w, I, A), this.store = w;
    }
  }
  t.default = H, e.exports = H, e.exports.default = H;
})($s, $s.exports);
var SE = $s.exports;
const Zi = Wt, { app: Sn, ipcMain: Ls, ipcRenderer: xi, shell: bE } = iu, PE = SE;
let ec = !1;
const tc = () => {
  if (!Ls || !Sn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Sn.getPath("userData"),
    appVersion: Sn.getVersion()
  };
  return ec || (Ls.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), ec = !0), e;
};
class NE extends PE {
  constructor(t) {
    let r, n;
    if (xi) {
      const s = xi.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else Ls && Sn && ({ defaultCwd: r, appVersion: n } = tc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = Zi.isAbsolute(t.cwd) ? t.cwd : Zi.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    tc();
  }
  async openInEditor() {
    const t = await bE.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var OE = NE;
const RE = /* @__PURE__ */ hu(OE), su = Rt.dirname(cu(import.meta.url));
process.env.APP_ROOT = Rt.join(su, "..");
const Fs = process.env.VITE_DEV_SERVER_URL, GE = Rt.join(process.env.APP_ROOT, "dist-electron"), au = Rt.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Fs ? Rt.join(process.env.APP_ROOT, "public") : au;
let wt;
const TE = {
  stocks: {
    type: "array",
    default: []
  },
  pollInterval: {
    type: "number",
    default: 5e3
  }
}, hn = new RE({
  schema: TE,
  name: "app-store"
});
function IE() {
  Gr.handle("electron-store-get", (e, t) => hn.get(t)), Gr.handle("electron-store-set", (e, t, r) => (hn.set(t, r), !0)), Gr.handle("electron-store-get-all", () => hn.store), Gr.handle("electron-store-reset", () => (hn.reset(), !0));
}
function ou() {
  wt = new rc({
    title: "Electron Stock App",
    icon: Rt.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: Rt.join(su, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !1
    }
  }), wt.webContents.on("did-finish-load", () => {
    wt == null || wt.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Fs ? wt.loadURL(Fs) : wt.loadFile(Rt.join(au, "index.html"));
}
bn.on("window-all-closed", () => {
  process.platform !== "darwin" && (bn.quit(), wt = null);
});
bn.on("activate", () => {
  rc.getAllWindows().length === 0 && ou();
});
bn.whenReady().then(() => {
  IE(), ou();
});
export {
  GE as MAIN_DIST,
  au as RENDERER_DIST,
  Fs as VITE_DEV_SERVER_URL
};
