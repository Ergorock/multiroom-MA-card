/*!
 * Multiroom Card
 * Carte Lovelace pour gérer, grouper et alimenter les enceintes Music Assistant.
 */
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const t$2 = globalThis, e$2 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$4 = new WeakMap;

let n$3 = class n {
    constructor(t, e, o) {
        if (this._$cssResult$ = true, o !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if (e$2 && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = o$4.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), 
            e && o$4.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
};

const r$4 = t => new n$3("string" == typeof t ? t : t + "", void 0, s$2), i$3 = (t, ...e) => {
    const o = 1 === t.length ? t[0] : e.reduce((e, s, o) => e + (t => {
        if (true === t._$cssResult$) return t.cssText;
        if ("number" == typeof t) return t;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s) + t[o + 1], t[0]);
    return new n$3(o, t, s$2);
}, S$1 = (s, o) => {
    if (e$2) s.adoptedStyleSheets = o.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet); else for (const e of o) {
        const o = document.createElement("style"), n = t$2.litNonce;
        void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
}, c$2 = e$2 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
    let e = "";
    for (const s of t.cssRules) e += s.cssText;
    return r$4(e);
})(t) : t;

const {is: i$2, defineProperty: e$1, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$3, getPrototypeOf: n$2} = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t, s) => t, u$1 = {
    toAttribute(t, s) {
        switch (s) {
          case Boolean:
            t = t ? l$1 : null;
            break;

          case Object:
          case Array:
            t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute(t, s) {
        let i = t;
        switch (s) {
          case Boolean:
            i = null !== t;
            break;

          case Number:
            i = null === t ? null : Number(t);
            break;

          case Object:
          case Array:
            try {
                i = JSON.parse(t);
            } catch (t) {
                i = null;
            }
        }
        return i;
    }
}, f$1 = (t, s) => !i$2(t, s), b$1 = {
    attribute: true,
    type: String,
    converter: u$1,
    reflect: false,
    useDefault: false,
    hasChanged: f$1
};

Symbol.metadata ??= Symbol("metadata"), a$1.litPropertyMetadata ??= new WeakMap;

let y$1 = class y extends HTMLElement {
    static addInitializer(t) {
        this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [ ...this._$Eh.keys() ];
    }
    static createProperty(t, s = b$1) {
        if (s.state && (s.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = true), 
        this.elementProperties.set(t, s), !s.noAccessor) {
            const i = Symbol(), h = this.getPropertyDescriptor(t, i, s);
            void 0 !== h && e$1(this.prototype, t, h);
        }
    }
    static getPropertyDescriptor(t, s, i) {
        const {get: e, set: r} = h$1(this.prototype, t) ?? {
            get() {
                return this[s];
            },
            set(t) {
                this[s] = t;
            }
        };
        return {
            get: e,
            set(s) {
                const h = e?.call(this);
                r?.call(this, s), this.requestUpdate(t, h, i);
            },
            configurable: true,
            enumerable: true
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? b$1;
    }
    static _$Ei() {
        if (this.hasOwnProperty(d$1("elementProperties"))) return;
        const t = n$2(this);
        t.finalize(), void 0 !== t.l && (this.l = [ ...t.l ]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
        if (this.hasOwnProperty(d$1("finalized"))) return;
        if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
            const t = this.properties, s = [ ...r$3(t), ...o$3(t) ];
            for (const i of s) this.createProperty(i, t[i]);
        }
        const t = this[Symbol.metadata];
        if (null !== t) {
            const s = litPropertyMetadata.get(t);
            if (void 0 !== s) for (const [t, i] of s) this.elementProperties.set(t, i);
        }
        this._$Eh = new Map;
        for (const [t, s] of this.elementProperties) {
            const i = this._$Eu(t, s);
            void 0 !== i && this._$Eh.set(i, t);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
        const i = [];
        if (Array.isArray(s)) {
            const e = new Set(s.flat(1 / 0).reverse());
            for (const s of e) i.unshift(c$2(s));
        } else void 0 !== s && i.push(c$2(s));
        return i;
    }
    static _$Eu(t, s) {
        const i = s.attribute;
        return false === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor() {
        super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, 
        this._$Em = null, this._$Ev();
    }
    _$Ev() {
        this._$ES = new Promise(t => this.enableUpdating = t), this._$AL = new Map, this._$E_(), 
        this.requestUpdate(), this.constructor.l?.forEach(t => t(this));
    }
    addController(t) {
        (this._$EO ??= new Set).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
        this._$EO?.delete(t);
    }
    _$E_() {
        const t = new Map, s = this.constructor.elementProperties;
        for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
        t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
        const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return S$1(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach(t => t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$EO?.forEach(t => t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
        this._$AK(t, i);
    }
    _$ET(t, s) {
        const i = this.constructor.elementProperties.get(t), e = this.constructor._$Eu(t, i);
        if (void 0 !== e && true === i.reflect) {
            const h = (void 0 !== i.converter?.toAttribute ? i.converter : u$1).toAttribute(s, i.type);
            this._$Em = t, null == h ? this.removeAttribute(e) : this.setAttribute(e, h), this._$Em = null;
        }
    }
    _$AK(t, s) {
        const i = this.constructor, e = i._$Eh.get(t);
        if (void 0 !== e && this._$Em !== e) {
            const t = i.getPropertyOptions(e), h = "function" == typeof t.converter ? {
                fromAttribute: t.converter
            } : void 0 !== t.converter?.fromAttribute ? t.converter : u$1;
            this._$Em = e;
            const r = h.fromAttribute(s, t.type);
            this[e] = r ?? this._$Ej?.get(e) ?? r, this._$Em = null;
        }
    }
    requestUpdate(t, s, i, e = false, h) {
        if (void 0 !== t) {
            const r = this.constructor;
            if (false === e && (h = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? f$1)(h, s) || i.useDefault && i.reflect && h === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
            this.C(t, s, i);
        }
        false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t, s, {useDefault: i, reflect: e, wrapped: h}, r) {
        i && !(this._$Ej ??= new Map).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), true !== h || void 0 !== r) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), 
        this._$AL.set(t, s)), true === e && this._$Em !== t && (this._$Eq ??= new Set).add(t));
    }
    async _$EP() {
        this.isUpdatePending = true;
        try {
            await this._$ES;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
                for (const [t, s] of this._$Ep) this[t] = s;
                this._$Ep = void 0;
            }
            const t = this.constructor.elementProperties;
            if (t.size > 0) for (const [s, i] of t) {
                const {wrapped: t} = i, e = this[s];
                true !== t || this._$AL.has(s) || void 0 === e || this.C(s, void 0, i, e);
            }
        }
        let t = false;
        const s = this._$AL;
        try {
            t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach(t => t.hostUpdate?.()), 
            this.update(s)) : this._$EM();
        } catch (s) {
            throw t = false, this._$EM(), s;
        }
        t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$EO?.forEach(t => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, 
        this.firstUpdated(t)), this.updated(t);
    }
    _$EM() {
        this._$AL = new Map, this.isUpdatePending = false;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$ES;
    }
    shouldUpdate(t) {
        return true;
    }
    update(t) {
        this._$Eq &&= this._$Eq.forEach(t => this._$ET(t, this[t])), this._$EM();
    }
    updated(t) {}
    firstUpdated(t) {}
};

y$1.elementStyles = [], y$1.shadowRootOptions = {
    mode: "open"
}, y$1[d$1("elementProperties")] = new Map, y$1[d$1("finalized")] = new Map, p$1?.({
    ReactiveElement: y$1
}), (a$1.reactiveElementVersions ??= []).push("2.1.2");

const t$1 = globalThis, i$1 = t => t, s$1 = t$1.trustedTypes, e = s$1 ? s$1.createPolicy("lit-html", {
    createHTML: t => t
}) : void 0, h = "$lit$", o$2 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$1 = "?" + o$2, r$2 = `<${n$1}>`, l = document, c = () => l.createComment(""), a = t => null === t || "object" != typeof t && "function" != typeof t, u = Array.isArray, d = t => u(t) || "function" == typeof t?.[Symbol.iterator], f = "[ \t\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y = /^(?:script|style|textarea|title)$/i, x = t => (i, ...s) => ({
    _$litType$: t,
    strings: i,
    values: s
}), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = new WeakMap, P = l.createTreeWalker(l, 129);

function V(t, i) {
    if (!u(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== e ? e.createHTML(i) : i;
}

const N = (t, i) => {
    const s = t.length - 1, e = [];
    let n, l = 2 === i ? "<svg>" : 3 === i ? "<math>" : "", c = v;
    for (let i = 0; i < s; i++) {
        const s = t[i];
        let a, u, d = -1, f = 0;
        for (;f < s.length && (c.lastIndex = f, u = c.exec(s), null !== u); ) f = c.lastIndex, 
        c === v ? "!--" === u[1] ? c = _ : void 0 !== u[1] ? c = m : void 0 !== u[2] ? (y.test(u[2]) && (n = RegExp("</" + u[2], "g")), 
        c = p) : void 0 !== u[3] && (c = p) : c === p ? ">" === u[0] ? (c = n ?? v, d = -1) : void 0 === u[1] ? d = -2 : (d = c.lastIndex - u[2].length, 
        a = u[1], c = void 0 === u[3] ? p : '"' === u[3] ? $ : g) : c === $ || c === g ? c = p : c === _ || c === m ? c = v : (c = p, 
        n = void 0);
        const x = c === p && t[i + 1].startsWith("/>") ? " " : "";
        l += c === v ? s + r$2 : d >= 0 ? (e.push(a), s.slice(0, d) + h + s.slice(d) + o$2 + x) : s + o$2 + (-2 === d ? i : x);
    }
    return [ V(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : 3 === i ? "</math>" : "")), e ];
};

class S {
    constructor({strings: t, _$litType$: i}, e) {
        let r;
        this.parts = [];
        let l = 0, a = 0;
        const u = t.length - 1, d = this.parts, [f, v] = N(t, i);
        if (this.el = S.createElement(f, e), P.currentNode = this.el.content, 2 === i || 3 === i) {
            const t = this.el.content.firstChild;
            t.replaceWith(...t.childNodes);
        }
        for (;null !== (r = P.nextNode()) && d.length < u; ) {
            if (1 === r.nodeType) {
                if (r.hasAttributes()) for (const t of r.getAttributeNames()) if (t.endsWith(h)) {
                    const i = v[a++], s = r.getAttribute(t).split(o$2), e = /([.?@])?(.*)/.exec(i);
                    d.push({
                        type: 1,
                        index: l,
                        name: e[2],
                        strings: s,
                        ctor: "." === e[1] ? I : "?" === e[1] ? L : "@" === e[1] ? z : H
                    }), r.removeAttribute(t);
                } else t.startsWith(o$2) && (d.push({
                    type: 6,
                    index: l
                }), r.removeAttribute(t));
                if (y.test(r.tagName)) {
                    const t = r.textContent.split(o$2), i = t.length - 1;
                    if (i > 0) {
                        r.textContent = s$1 ? s$1.emptyScript : "";
                        for (let s = 0; s < i; s++) r.append(t[s], c()), P.nextNode(), d.push({
                            type: 2,
                            index: ++l
                        });
                        r.append(t[i], c());
                    }
                }
            } else if (8 === r.nodeType) if (r.data === n$1) d.push({
                type: 2,
                index: l
            }); else {
                let t = -1;
                for (;-1 !== (t = r.data.indexOf(o$2, t + 1)); ) d.push({
                    type: 7,
                    index: l
                }), t += o$2.length - 1;
            }
            l++;
        }
    }
    static createElement(t, i) {
        const s = l.createElement("template");
        return s.innerHTML = t, s;
    }
}

function M(t, i, s = t, e) {
    if (i === E) return i;
    let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
    const o = a(i) ? void 0 : i._$litDirective$;
    return h?.constructor !== o && (h?._$AO?.(false), void 0 === o ? h = void 0 : (h = new o(t), 
    h._$AT(t, s, e)), void 0 !== e ? (s._$Co ??= [])[e] = h : s._$Cl = h), void 0 !== h && (i = M(t, h._$AS(t, i.values), h, e)), 
    i;
}

class R {
    constructor(t, i) {
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    u(t) {
        const {el: {content: i}, parts: s} = this._$AD, e = (t?.creationScope ?? l).importNode(i, true);
        P.currentNode = e;
        let h = P.nextNode(), o = 0, n = 0, r = s[0];
        for (;void 0 !== r; ) {
            if (o === r.index) {
                let i;
                2 === r.type ? i = new k(h, h.nextSibling, this, t) : 1 === r.type ? i = new r.ctor(h, r.name, r.strings, this, t) : 6 === r.type && (i = new Z(h, this, t)), 
                this._$AV.push(i), r = s[++n];
            }
            o !== r?.index && (h = P.nextNode(), o++);
        }
        return P.currentNode = l, e;
    }
    p(t) {
        let i = 0;
        for (const s of this._$AV) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), 
        i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}

class k {
    get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, i, s, e) {
        this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t, this._$AB = i, 
        this._$AM = s, this.options = e, this._$Cv = e?.isConnected ?? true;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        t = M(this, t, i), a(t) ? t === A || null == t || "" === t ? (this._$AH !== A && this._$AR(), 
        this._$AH = A) : t !== this._$AH && t !== E && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : d(t) ? this.k(t) : this._(t);
    }
    O(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
    _(t) {
        this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t : this.T(l.createTextNode(t)), 
        this._$AH = t;
    }
    $(t) {
        const {values: i, _$litType$: s} = t, e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = S.createElement(V(s.h, s.h[0]), this.options)), 
        s);
        if (this._$AH?._$AD === e) this._$AH.p(i); else {
            const t = new R(e, this), s = t.u(this.options);
            t.p(i), this.T(s), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = C.get(t.strings);
        return void 0 === i && C.set(t.strings, i = new S(t)), i;
    }
    k(t) {
        u(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const h of t) e === i.length ? i.push(s = new k(this.O(c()), this.O(c()), this, this.options)) : s = i[e], 
        s._$AI(h), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, s) {
        for (this._$AP?.(false, true, s); t !== this._$AB; ) {
            const s = i$1(t).nextSibling;
            i$1(t).remove(), t = s;
        }
    }
    setConnected(t) {
        void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t));
    }
}

class H {
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    constructor(t, i, s, e, h) {
        this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t, this.name = i, 
        this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), 
        this.strings = s) : this._$AH = A;
    }
    _$AI(t, i = this, s, e) {
        const h = this.strings;
        let o = false;
        if (void 0 === h) t = M(this, t, i, 0), o = !a(t) || t !== this._$AH && t !== E, 
        o && (this._$AH = t); else {
            const e = t;
            let n, r;
            for (t = h[0], n = 0; n < h.length - 1; n++) r = M(this, e[s + n], i, n), r === E && (r = this._$AH[n]), 
            o ||= !a(r) || r !== this._$AH[n], r === A ? t = A : t !== A && (t += (r ?? "") + h[n + 1]), 
            this._$AH[n] = r;
        }
        o && !e && this.j(t);
    }
    j(t) {
        t === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
}

class I extends H {
    constructor() {
        super(...arguments), this.type = 3;
    }
    j(t) {
        this.element[this.name] = t === A ? void 0 : t;
    }
}

class L extends H {
    constructor() {
        super(...arguments), this.type = 4;
    }
    j(t) {
        this.element.toggleAttribute(this.name, !!t && t !== A);
    }
}

class z extends H {
    constructor(t, i, s, e, h) {
        super(t, i, s, e, h), this.type = 5;
    }
    _$AI(t, i = this) {
        if ((t = M(this, t, i, 0) ?? A) === E) return;
        const s = this._$AH, e = t === A && s !== A || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, h = t !== A && (s === A || e);
        e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), 
        this._$AH = t;
    }
    handleEvent(t) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
}

class Z {
    constructor(t, i, s) {
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        M(this, t);
    }
}

const B = t$1.litHtmlPolyfillSupport;

B?.(S, k), (t$1.litHtmlVersions ??= []).push("3.3.3");

const D = (t, i, s) => {
    const e = s?.renderBefore ?? i;
    let h = e._$litPart$;
    if (void 0 === h) {
        const t = s?.renderBefore ?? null;
        e._$litPart$ = h = new k(i.insertBefore(c(), t), t, void 0, s ?? {});
    }
    return h._$AI(t), h;
};

const s = globalThis;

class i extends y$1 {
    constructor() {
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        const t = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
        const r = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), 
        this._$Do = D(r, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
        return E;
    }
}

i._$litElement$ = true, i["finalized"] = true, s.litElementHydrateSupport?.({
    LitElement: i
});

const o$1 = s.litElementPolyfillSupport;

o$1?.({
    LitElement: i
});

(s.litElementVersions ??= []).push("4.2.2");

const t = t => (e, o) => {
    void 0 !== o ? o.addInitializer(() => {
        customElements.define(t, e);
    }) : customElements.define(t, e);
};

const o = {
    attribute: true,
    type: String,
    converter: u$1,
    reflect: false,
    hasChanged: f$1
}, r$1 = (t = o, e, r) => {
    const {kind: n, metadata: i} = r;
    let s = globalThis.litPropertyMetadata.get(i);
    if (void 0 === s && globalThis.litPropertyMetadata.set(i, s = new Map), "setter" === n && ((t = Object.create(t)).wrapped = true), 
    s.set(r.name, t), "accessor" === n) {
        const {name: o} = r;
        return {
            set(r) {
                const n = e.get.call(this);
                e.set.call(this, r), this.requestUpdate(o, n, t, true, r);
            },
            init(e) {
                return void 0 !== e && this.C(o, void 0, t, e), e;
            }
        };
    }
    if ("setter" === n) {
        const {name: o} = r;
        return function(r) {
            const n = this[o];
            e.call(this, r), this.requestUpdate(o, n, t, true, r);
        };
    }
    throw Error("Unsupported decorator location: " + n);
};

function n(t) {
    return (e, o) => "object" == typeof o ? r$1(t, e, o) : ((t, e, o) => {
        const r = e.hasOwnProperty(o);
        return e.constructor.createProperty(o, t), r ? Object.getOwnPropertyDescriptor(e, o) : void 0;
    })(t, e, o);
}

function r(r) {
    return n({
        ...r,
        state: true,
        attribute: false
    });
}

const cardStyles = i$3`
  :host {
    container-type: inline-size;
    --mr-radius: var(--ha-card-border-radius, 12px);
    --mr-accent: var(--primary-color, #03a9f4);
    --mr-muted: var(--secondary-text-color, #727272);
    --mr-surface: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
    --mr-divider: var(--divider-color, rgba(127, 127, 127, 0.2));
  }
  ha-card {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px 16px 8px;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }
  .tabs {
    display: flex;
    background: var(--mr-surface);
    border-radius: 999px;
    padding: 3px;
    gap: 2px;
  }
  .tab {
    border: none;
    background: none;
    color: var(--mr-muted);
    border-radius: 999px;
    padding: 6px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font: inherit;
    font-size: 0.875rem;
  }
  .tab[aria-selected="true"] {
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
  .tab ha-icon {
    --mdc-icon-size: 18px;
  }
  .content {
    padding: 8px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Lecture en cours */
  .now-playing {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 10px;
    border-radius: var(--mr-radius);
    background: var(--mr-surface);
    margin: 0 16px;
  }
  .art {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    background: var(--mr-divider) center / cover no-repeat;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mr-muted);
  }
  .np-text {
    flex: 1;
    min-width: 0;
  }
  .np-title,
  .np-sub,
  .np-target {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .np-title {
    font-weight: 500;
  }
  .np-sub,
  .np-target {
    font-size: 0.85rem;
    color: var(--mr-muted);
  }
  .np-target {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .np-target ha-icon {
    --mdc-icon-size: 14px;
  }
  .controls {
    display: flex;
    align-items: center;
  }

  /* Boutons */
  .icon-btn {
    border: none;
    background: none;
    color: var(--primary-text-color);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
  }
  .icon-btn:hover {
    background: var(--mr-divider);
  }
  .icon-btn.primary {
    background: var(--mr-accent);
    color: var(--text-primary-color, #fff);
  }
  .icon-btn.active {
    color: var(--mr-accent);
  }
  .icon-btn[disabled] {
    opacity: 0.4;
    cursor: default;
  }
  .btn {
    border: 1px solid var(--mr-divider);
    background: none;
    color: var(--primary-text-color);
    border-radius: 999px;
    padding: 6px 12px;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn ha-icon {
    --mdc-icon-size: 18px;
  }
  .btn:hover {
    background: var(--mr-surface);
  }
  .btn.primary {
    background: var(--mr-accent);
    border-color: var(--mr-accent);
    color: var(--text-primary-color, #fff);
  }
  .toolbar {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  /* Groupes / enceintes */
  .group {
    border: 1px solid var(--mr-divider);
    border-radius: var(--mr-radius);
    overflow: hidden;
  }
  .group.target {
    border-color: var(--mr-accent);
    box-shadow: 0 0 0 1px var(--mr-accent);
  }
  .group-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 8px 10px 12px;
    cursor: pointer;
  }
  .group-head .art {
    width: 44px;
    height: 44px;
  }
  .group-info {
    flex: 1;
    min-width: 0;
  }
  .group-name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .group-state {
    font-size: 0.8rem;
    color: var(--mr-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .badge {
    font-size: 0.7rem;
    padding: 1px 6px;
    border-radius: 999px;
    background: var(--mr-accent);
    color: var(--text-primary-color, #fff);
    margin-left: 6px;
    vertical-align: middle;
  }
  .members {
    border-top: 1px solid var(--mr-divider);
    padding: 4px 8px 8px 12px;
  }
  .member {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
  }
  .member-name {
    width: 30%;
    min-width: 70px;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .member-name.leader {
    font-weight: 500;
  }
  .member.group-volume .member-name {
    color: var(--mr-muted);
  }
  .vol-value {
    width: 32px;
    text-align: right;
    font-size: 0.8rem;
    color: var(--mr-muted);
    font-variant-numeric: tabular-nums;
  }
  .icon-spacer {
    width: 36px;
    flex-shrink: 0;
    display: inline-flex;
    justify-content: center;
    color: var(--mr-muted);
  }
  input[type="range"] {
    flex: 1;
    min-width: 60px;
    accent-color: var(--mr-accent);
    cursor: pointer;
  }

  /* Sélecteur de membres */
  .picker {
    border-top: 1px solid var(--mr-divider);
    padding: 8px 12px 12px;
    background: var(--mr-surface);
  }
  .picker-title {
    font-size: 0.8rem;
    color: var(--mr-muted);
    margin-bottom: 6px;
  }
  .picker-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
  }
  .chip {
    border: 1px solid var(--mr-divider);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    border-radius: 999px;
    padding: 5px 10px 5px 8px;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .chip ha-icon {
    --mdc-icon-size: 16px;
  }
  .chip[aria-pressed="true"] {
    background: var(--mr-accent);
    border-color: var(--mr-accent);
    color: var(--text-primary-color, #fff);
  }
  .chip[disabled] {
    opacity: 0.4;
    cursor: default;
  }
  .picker-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  /* Navigation médias */
  .target-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: var(--mr-muted);
  }
  select {
    flex: 1;
    font: inherit;
    padding: 6px 8px;
    border-radius: 8px;
    border: 1px solid var(--mr-divider);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .chips {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 2px;
  }
  .search-box {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--mr-divider);
    border-radius: 999px;
    padding: 2px 6px 2px 12px;
  }
  .search-box:focus-within {
    border-color: var(--mr-accent);
  }
  .search-box input {
    flex: 1;
    border: none;
    outline: none;
    background: none;
    font: inherit;
    padding: 8px 0;
    color: var(--primary-text-color);
  }
  .section-title {
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--mr-muted);
    margin-top: 4px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 10px;
  }
  .tile {
    position: relative;
    cursor: pointer;
    min-width: 0;
  }
  .tile .art {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    border-radius: 10px;
  }
  .tile .art ha-icon {
    --mdc-icon-size: 40px;
  }
  .tile.round .art {
    border-radius: 50%;
  }
  .tile-name {
    font-size: 0.85rem;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tile-sub {
    font-size: 0.75rem;
    color: var(--mr-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tile-actions {
    position: absolute;
    top: 6px;
    right: 6px;
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .tile:hover .tile-actions,
  .tile:focus-within .tile-actions {
    opacity: 1;
  }
  .tile-actions .icon-btn {
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
  .tile-actions ha-icon {
    --mdc-icon-size: 18px;
  }
  .list {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
    cursor: pointer;
    border-radius: 8px;
  }
  .row:hover {
    background: var(--mr-surface);
  }
  .row .art {
    width: 40px;
    height: 40px;
    border-radius: 6px;
  }
  .row-text {
    flex: 1;
    min-width: 0;
  }
  .empty {
    color: var(--mr-muted);
    text-align: center;
    padding: 24px 8px;
    font-size: 0.9rem;
  }
  .error {
    color: var(--error-color, #db4437);
    font-size: 0.85rem;
  }
  .toast {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary-text-color);
    color: var(--card-background-color, #fff);
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.85rem;
    pointer-events: none;
    white-space: nowrap;
  }

  /* File de lecture */
  .queue-head {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--mr-muted);
    font-size: 0.85rem;
  }
  .queue-title {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .queue-count {
    font-variant-numeric: tabular-nums;
  }
  .row.past {
    opacity: 0.55;
  }
  .row.current {
    cursor: default;
    background: var(--mr-surface);
    padding-left: 6px;
    padding-right: 10px;
  }
  .row.current .tile-name {
    font-weight: 500;
    color: var(--mr-accent);
  }
  .now-icon {
    color: var(--mr-accent);
    --mdc-icon-size: 20px;
  }

  /* Lancement en cours */
  .art-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .art-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    background: rgba(0, 0, 0, 0.45);
    color: #fff;
  }
  .tile .art-overlay {
    border-radius: 10px;
  }
  .tile.round .art-overlay {
    border-radius: 50%;
  }
  .row .art-overlay {
    border-radius: 6px;
  }
  .tile .art-overlay ha-icon {
    --mdc-icon-size: 40px;
  }
  .busy {
    cursor: progress;
    opacity: 0.6;
  }

  /* Annonces */
  .chip.all {
    border-style: dashed;
  }
  .presets {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .preset {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    max-width: 100%;
    padding: 2px 2px 2px 10px;
    border-radius: 10px;
    background: var(--mr-surface);
    cursor: pointer;
  }
  .preset > ha-icon {
    --mdc-icon-size: 18px;
    color: var(--mr-muted);
  }
  .preset .icon-btn {
    width: 30px;
    height: 30px;
  }
  .preset .icon-btn ha-icon {
    --mdc-icon-size: 18px;
  }
  .preset-name {
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  textarea,
  .save-row input {
    box-sizing: border-box;
    width: 100%;
    font: inherit;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid var(--mr-divider);
    background: var(--mr-surface);
    color: var(--primary-text-color);
    resize: vertical;
  }
  textarea:focus,
  .save-row input:focus {
    outline: 2px solid var(--mr-accent);
    outline-offset: -1px;
  }
  .save-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .vol-label {
    min-width: 64px;
    border: none;
    background: none;
    padding: 0;
    font: inherit;
    font-size: 0.8rem;
    text-align: right;
    color: var(--mr-muted);
    cursor: pointer;
  }
  .btn[disabled] {
    opacity: 0.5;
    cursor: progress;
  }

  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Carte étroite : seul l'onglet actif garde son libellé. */
  @container (max-width: 560px) {
    .tab:not([aria-selected="true"]) span {
      display: none;
    }
  }

  @media (hover: none) {
    .tile-actions {
      opacity: 1;
    }
  }
`;

const DOMAIN = "music_assistant";

const FEATURE_GROUPING = 524288;

const isMaPlayer = e => !!e && e.entity_id.startsWith("media_player.") && e.attributes.mass_player_type !== undefined;

const supportsGrouping = e => !!e && ((e.attributes.supported_features ?? 0) & FEATURE_GROUPING) !== 0;

const isUnavailable = e => !e || e.state === "unavailable" || e.state === "unknown";

function playerName(hass, entityId) {
    return hass.states[entityId]?.attributes.friendly_name ?? entityId;
}

function discoverPlayers(hass, showUnavailable) {
    return Object.values(hass.states).filter(e => isMaPlayer(e) && (showUnavailable || !isUnavailable(e))).sort((a, b) => playerName(hass, a.entity_id).localeCompare(playerName(hass, b.entity_id))).map(e => e.entity_id);
}

function computeGroups(hass, players) {
    const groups = [];
    const assigned = new Set;
    for (const id of players) {
        const members = hass.states[id]?.attributes.group_members ?? [];
        if (members.length > 1 && members[0] === id) {
            const visible = members.filter(m => players.includes(m));
            groups.push({
                leader: id,
                members: visible
            });
            visible.forEach(m => assigned.add(m));
        }
    }
    for (const id of players) {
        if (!assigned.has(id)) groups.push({
            leader: id,
            members: [ id ]
        });
    }
    return groups;
}

function groupOf(groups, entityId) {
    return groups.find(g => g.members.includes(entityId));
}

async function findConfigEntryId(hass) {
    try {
        const entries = await hass.callWS({
            type: "config_entries/get",
            domain: DOMAIN
        });
        return (entries.find(e => e.state === "loaded") ?? entries[0])?.entry_id;
    } catch {
        return undefined;
    }
}

async function callWithResponse(hass, service, data) {
    const res = await hass.callWS({
        type: "call_service",
        domain: DOMAIN,
        service: service,
        service_data: data,
        return_response: true
    });
    return res.response;
}

async function getFavorites(hass, configEntryId, mediaType, limit = 100) {
    const res = await callWithResponse(hass, "get_library", {
        config_entry_id: configEntryId,
        media_type: mediaType,
        favorite: true,
        limit: limit,
        order_by: "name"
    });
    return res?.items ?? [];
}

async function search(hass, configEntryId, query, mediaTypes, limit = 8) {
    const data = {
        config_entry_id: configEntryId,
        name: query,
        limit: limit
    };
    if (mediaTypes?.length) data.media_type = mediaTypes;
    return callWithResponse(hass, "search", data);
}

function playMedia(hass, entityId, item, enqueue = "play") {
    return hass.callService(DOMAIN, "play_media", {
        entity_id: entityId,
        media_id: item.uri,
        media_type: item.media_type,
        enqueue: enqueue
    });
}

const QUEUE_DOMAIN = "mass_queue";

const hasQueueActions = hass => !!hass.services?.[QUEUE_DOMAIN];

async function getQueueInfo(hass, entityId) {
    const res = await hass.callWS({
        type: "call_service",
        domain: DOMAIN,
        service: "get_queue",
        target: {
            entity_id: entityId
        },
        return_response: true
    });
    return res.response?.[entityId];
}

async function getQueueItems(hass, entityId, before, after) {
    const res = await hass.callWS({
        type: "call_service",
        domain: QUEUE_DOMAIN,
        service: "get_queue_items",
        service_data: {
            entity: entityId,
            limit_before: before,
            limit_after: after
        },
        return_response: true
    });
    return res.response?.[entityId] ?? [];
}

function queueItemCommand(hass, service, entityId, queueItemId) {
    return hass.callService(QUEUE_DOMAIN, service, {
        entity: entityId,
        queue_item_id: queueItemId
    });
}

function transferQueue(hass, source, target) {
    return hass.callService(DOMAIN, "transfer_queue", {
        entity_id: target,
        source_player: source,
        auto_play: true
    });
}

function join(hass, leader, members) {
    return hass.callService("media_player", "join", {
        entity_id: leader,
        group_members: members
    });
}

function unjoin(hass, entityId) {
    return hass.callService("media_player", "unjoin", {
        entity_id: entityId
    });
}

function setVolume(hass, entityId, volume) {
    return hass.callService("media_player", "volume_set", {
        entity_id: entityId,
        volume_level: Math.max(0, Math.min(1, volume))
    });
}

function mediaCommand(hass, entityId, service, data = {}) {
    return hass.callService("media_player", service, {
        entity_id: entityId,
        ...data
    });
}

function itemSubtitle(item) {
    const artists = item.artists?.map(a => a.name).join(", ");
    if (item.media_type === "track") return [ artists, item.album?.name ].filter(Boolean).join(" · ");
    if (item.media_type === "album") return artists ?? "";
    if (item.media_type === "playlist") return item.owner ?? "";
    return "";
}

const FEATURE_ANNOUNCE = 1048576;

const STORAGE_KEY = "multiroom-card-announce";

const LEGACY_STORAGE_KEY = "annonce-card";

async function getUserData(hass, key) {
    const res = await hass.callWS({
        type: "frontend/get_user_data",
        key: key
    });
    return res?.value ?? undefined;
}

async function loadAnnounceData(hass) {
    const data = await getUserData(hass, STORAGE_KEY) ?? await getUserData(hass, LEGACY_STORAGE_KEY) ?? {};
    return {
        presets: Array.isArray(data.presets) ? data.presets : [],
        selected: Array.isArray(data.selected) ? data.selected : [],
        volume: data.volume ?? null
    };
}

function saveAnnounceData(hass, data) {
    return hass.callWS({
        type: "frontend/set_user_data",
        key: STORAGE_KEY,
        value: data
    });
}

function defaultTtsEngine(hass) {
    return Object.keys(hass.states).find(id => id.startsWith("tts."));
}

function playAnnouncement(hass, entities, message, ttsEngine, volume) {
    const data = {
        entity_id: entities,
        message: message
    };
    if (ttsEngine) data.tts_entity_id = ttsEngine;
    if (volume != null) data.announce_volume = Math.max(1, Math.min(100, volume));
    return hass.callService("music_assistant", "play_announcement", data);
}

const SCHEMA = [ {
    name: "title",
    selector: {
        text: {}
    }
}, {
    name: "entities",
    selector: {
        entity: {
            multiple: true,
            filter: {
                domain: "media_player",
                integration: "music_assistant"
            }
        }
    }
}, {
    name: "favorite_types",
    selector: {
        select: {
            multiple: true,
            options: [ {
                value: "playlist",
                label: "Playlists"
            }, {
                value: "album",
                label: "Albums"
            }, {
                value: "artist",
                label: "Artistes"
            }, {
                value: "track",
                label: "Titres"
            }, {
                value: "radio",
                label: "Radios"
            }, {
                value: "podcast",
                label: "Podcasts"
            }, {
                value: "audiobook",
                label: "Livres audio"
            } ]
        }
    }
}, {
    name: "default_tab",
    selector: {
        select: {
            mode: "dropdown",
            options: [ {
                value: "speakers",
                label: "Enceintes"
            }, {
                value: "queue",
                label: "File de lecture"
            }, {
                value: "favorites",
                label: "Favoris"
            }, {
                value: "search",
                label: "Recherche"
            }, {
                value: "announce",
                label: "Annonces"
            } ]
        }
    }
}, {
    name: "tts_engine",
    selector: {
        entity: {
            domain: "tts"
        }
    }
}, {
    name: "announce_volume",
    selector: {
        number: {
            min: 0,
            max: 100,
            step: 5,
            mode: "slider"
        }
    }
}, {
    name: "show_unavailable",
    selector: {
        boolean: {}
    }
}, {
    name: "config_entry_id",
    selector: {
        config_entry: {
            integration: "music_assistant"
        }
    }
} ];

const LABELS = {
    title: "Titre",
    entities: "Enceintes (vide = toutes les enceintes Music Assistant)",
    favorite_types: "Types de favoris affichés",
    default_tab: "Onglet par défaut",
    tts_engine: "Moteur de synthèse vocale des annonces (vide = automatique)",
    announce_volume: "Volume d'annonce par défaut",
    show_unavailable: "Afficher les enceintes indisponibles",
    config_entry_id: "Instance Music Assistant (vide = automatique)"
};

let MultiroomCardEditor = class MultiroomCardEditor extends i {
    setConfig(config) {
        this._config = config;
    }
    render() {
        if (!this.hass || !this._config) return A;
        return b`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${SCHEMA}
      .computeLabel=${s => LABELS[s.name] ?? s.name}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
    }
    _valueChanged(ev) {
        const config = {
            ...ev.detail.value
        };
        for (const key of Object.keys(config)) {
            const v = config[key];
            if (v === "" || v === undefined || Array.isArray(v) && v.length === 0) delete config[key];
        }
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: {
                config: config
            },
            bubbles: true,
            composed: true
        }));
    }
};

__decorate([ n({
    attribute: false
}) ], MultiroomCardEditor.prototype, "hass", void 0);

__decorate([ r() ], MultiroomCardEditor.prototype, "_config", void 0);

MultiroomCardEditor = __decorate([ t("multiroom-card-editor") ], MultiroomCardEditor);

const VERSION = "0.4.1";

const QUEUE_PAGE = 50;

const QUEUE_BEFORE = 5;

const MEDIA_TYPES = {
    playlist: {
        label: "Playlist",
        plural: "Playlists",
        icon: "mdi:playlist-music"
    },
    album: {
        label: "Album",
        plural: "Albums",
        icon: "mdi:album"
    },
    artist: {
        label: "Artiste",
        plural: "Artistes",
        icon: "mdi:account-music"
    },
    track: {
        label: "Titre",
        plural: "Titres",
        icon: "mdi:music-note"
    },
    radio: {
        label: "Radio",
        plural: "Radios",
        icon: "mdi:radio"
    },
    podcast: {
        label: "Podcast",
        plural: "Podcasts",
        icon: "mdi:podcast"
    },
    audiobook: {
        label: "Livre audio",
        plural: "Livres audio",
        icon: "mdi:book-music"
    }
};

const DEFAULT_FAVORITE_TYPES = [ "playlist", "album", "artist", "radio", "track" ];

const SEARCH_SECTIONS = [ {
    key: "artists",
    type: "artist"
}, {
    key: "albums",
    type: "album"
}, {
    key: "tracks",
    type: "track"
}, {
    key: "playlists",
    type: "playlist"
}, {
    key: "radio",
    type: "radio"
}, {
    key: "podcasts",
    type: "podcast"
}, {
    key: "audiobooks",
    type: "audiobook"
} ];

const STATE_LABELS = {
    playing: "Lecture",
    paused: "En pause",
    idle: "Inactif",
    off: "Éteint",
    on: "Allumé",
    buffering: "Chargement",
    unavailable: "Indisponible",
    unknown: "Inconnu"
};

let MultiroomCard = class MultiroomCard extends i {
    constructor() {
        super(...arguments);
        this._tab = "speakers";
        this._editMode = "group";
        this._selection = new Set;
        this._volumes = new Map;
        this._favType = "playlist";
        this._favorites = new Map;
        this._favLoading = false;
        this._query = "";
        this._searching = false;
        this._ann = {
            presets: [],
            selected: [],
            volume: null
        };
        this._annMessage = "";
        this._annSaving = false;
        this._annName = "";
        this._annSending = false;
        this._queueLoading = false;
        this._queueAfter = QUEUE_PAGE;
        this._searchSeq = 0;
    }
    static getConfigElement() {
        return document.createElement("multiroom-card-editor");
    }
    static getStubConfig() {
        return {
            title: "Multiroom"
        };
    }
    setConfig(config) {
        if (!config) throw new Error("Configuration invalide");
        this._config = {
            ...config
        };
        this._tab = config.default_tab ?? this._tab;
        const types = this._favoriteTypes;
        if (!types.includes(this._favType)) this._favType = types[0];
        this._entryId = config.config_entry_id ?? this._entryId;
        if (config.announce_volume != null && this._ann.volume == null) {
            this._ann = {
                ...this._ann,
                volume: config.announce_volume
            };
        }
    }
    getCardSize() {
        return 6;
    }
    getGridOptions() {
        return {
            columns: 12,
            min_columns: 6,
            rows: "auto"
        };
    }
    get _favoriteTypes() {
        return this._config.favorite_types?.length ? this._config.favorite_types : DEFAULT_FAVORITE_TYPES;
    }
    get _players() {
        if (this._config.entities?.length) {
            return this._config.entities.filter(id => this.hass.states[id] && (this._config.show_unavailable || !isUnavailable(this.hass.states[id])));
        }
        return discoverPlayers(this.hass, !!this._config.show_unavailable);
    }
    willUpdate(changed) {
        if (changed.has("hass") && this.hass && !changed.get("hass")) this._loadAnnounceData();
        if (changed.has("hass") && this.hass && !this._entryId && !changed.get("hass")) {
            findConfigEntryId(this.hass).then(id => {
                if (id) this._entryId = id; else if (!this._config.config_entry_id) this._error = "Config entry Music Assistant introuvable : renseignez config_entry_id.";
            });
        }
    }
    updated(changed) {
        if ((changed.has("_tab") || changed.has("_favType") || changed.has("_entryId")) && this._tab === "favorites") {
            this._loadFavorites();
        }
        if (this._tab === "queue") {
            const leader = this._resolveTarget(computeGroups(this.hass, this._players))?.leader;
            const s = leader ? this.hass.states[leader] : undefined;
            const key = `${leader}|${s?.attributes.media_content_id}|${this._queueAfter}`;
            if (leader && key !== this._queueKey) {
                this._queueKey = key;
                this._loadQueue(leader);
            }
        }
    }
    _resolveTarget(groups) {
        if (this._target) {
            const g = groupOf(groups, this._target);
            if (g) return g;
        }
        const playing = groups.find(g => this.hass.states[g.leader]?.state === "playing");
        return playing ?? groups.find(g => !isUnavailable(this.hass.states[g.leader])) ?? groups[0];
    }
    async _run(action, success) {
        try {
            await action;
            if (success) this._showToast(success);
        } catch (err) {
            this._showToast(`Erreur : ${err?.message ?? err}`);
        }
    }
    _showToast(msg, duration = 2500) {
        this._toast = msg;
        clearTimeout(this._toastTimer);
        if (duration > 0) this._toastTimer = window.setTimeout(() => this._toast = undefined, duration);
    }
    _startEditing(group, mode, ev) {
        ev.stopPropagation();
        if (this._editing === group.leader && this._editMode === mode) {
            this._editing = undefined;
            return;
        }
        this._editing = group.leader;
        this._editMode = mode;
        this._selection = new Set(group.members);
    }
    async _transfer(source, target) {
        this._editing = undefined;
        await this._run(transferQueue(this.hass, source.leader, target.leader), `Lecture transférée vers ${this._groupLabel(target)}`);
        this._target = target.leader;
    }
    _toggleSelection(id) {
        const next = new Set(this._selection);
        next.has(id) ? next.delete(id) : next.add(id);
        this._selection = next;
    }
    async _applyGroup(group) {
        const toAdd = [ ...this._selection ].filter(id => !group.members.includes(id));
        const toRemove = group.members.filter(id => id !== group.leader && !this._selection.has(id));
        this._editing = undefined;
        const ops = [];
        if (toRemove.length) ops.push(unjoin(this.hass, toRemove));
        if (toAdd.length) ops.push(join(this.hass, group.leader, toAdd));
        if (ops.length) await this._run(Promise.all(ops), "Groupe mis à jour");
    }
    _groupAll(target) {
        const others = this._players.filter(id => id !== target.leader && !isUnavailable(this.hass.states[id]) && supportsGrouping(this.hass.states[id]));
        if (others.length) this._run(join(this.hass, target.leader, others), "Toutes les enceintes groupées");
    }
    _ungroupAll(groups) {
        const members = groups.flatMap(g => g.members.filter(m => m !== g.leader));
        if (members.length) this._run(unjoin(this.hass, members), "Enceintes dégroupées");
    }
    _onVolumeInput(id, ev) {
        const value = Number(ev.target.value) / 100;
        this._volumes = new Map(this._volumes).set(id, value);
    }
    async _onVolumeChange(id, ev) {
        const value = Number(ev.target.value) / 100;
        await this._run(setVolume(this.hass, id, value));
        this._clearVolume(id);
    }
    async _onGroupVolumeChange(group, ev) {
        const value = Number(ev.target.value) / 100;
        const delta = value - this._groupVolume(group, false);
        await this._run(Promise.all(group.members.map(m => setVolume(this.hass, m, (this.hass.states[m]?.attributes.volume_level ?? 0) + delta))));
        this._clearVolume(`group:${group.leader}`);
    }
    _clearVolume(key) {
        const next = new Map(this._volumes);
        next.delete(key);
        this._volumes = next;
    }
    _volume(id) {
        return this._volumes.get(id) ?? this.hass.states[id]?.attributes.volume_level ?? 0;
    }
    _groupVolume(group, withDrag = true) {
        const drag = this._volumes.get(`group:${group.leader}`);
        if (withDrag && drag !== undefined) return drag;
        const levels = group.members.map(m => this.hass.states[m]?.attributes.volume_level ?? 0);
        return levels.reduce((a, b) => a + b, 0) / Math.max(levels.length, 1);
    }
    async _loadFavorites(force = false) {
        if (!this._entryId) return;
        const type = this._favType;
        if (!force && this._favorites.has(type)) return;
        this._favLoading = true;
        try {
            const items = await getFavorites(this.hass, this._entryId, type);
            this._favorites = new Map(this._favorites).set(type, items);
            this._error = undefined;
        } catch (err) {
            this._error = `Impossible de charger les favoris : ${err?.message ?? err}`;
        } finally {
            this._favLoading = false;
        }
    }
    _onSearchInput(ev) {
        this._query = ev.target.value;
        clearTimeout(this._searchTimer);
        this._searchTimer = window.setTimeout(() => this._doSearch(), 400);
    }
    _setSearchType(type) {
        this._searchType = type;
        this._doSearch();
    }
    async _doSearch() {
        const query = this._query.trim();
        if (query.length < 2 || !this._entryId) {
            this._results = undefined;
            return;
        }
        const seq = ++this._searchSeq;
        this._searching = true;
        try {
            const res = await search(this.hass, this._entryId, query, this._searchType ? [ this._searchType ] : undefined, this._searchType ? 25 : 8);
            if (seq === this._searchSeq) {
                this._results = res;
                this._error = undefined;
            }
        } catch (err) {
            if (seq === this._searchSeq) this._error = `Recherche impossible : ${err?.message ?? err}`;
        } finally {
            if (seq === this._searchSeq) this._searching = false;
        }
    }
    async _play(item, target, enqueue, ev) {
        ev?.stopPropagation();
        if (!target) {
            this._showToast("Aucune enceinte disponible");
            return;
        }
        if (this._pendingUri) return;
        const labels = {
            play: "Lecture",
            next: "Lu ensuite",
            add: "Ajouté à la file"
        };
        this._pendingUri = item.uri;
        this._showToast(`Lancement : ${item.name}…`, 0);
        await this._run(playMedia(this.hass, target.leader, item, enqueue), `${labels[enqueue] ?? "Lecture"} : ${item.name} · ${this._groupLabel(target)}`);
        this._pendingUri = undefined;
    }
    async _loadQueue(entity) {
        if (!hasQueueActions(this.hass)) return;
        this._queueLoading = true;
        try {
            const [info, items] = await Promise.all([ getQueueInfo(this.hass, entity).catch(() => undefined), getQueueItems(this.hass, entity, QUEUE_BEFORE, this._queueAfter) ]);
            this._queue = {
                entity: entity,
                items: items,
                info: info
            };
            this._error = undefined;
        } catch (err) {
            this._error = `Impossible de lire la file : ${err?.message ?? err}`;
        } finally {
            this._queueLoading = false;
        }
    }
    async _queueAction(service, item, message, ev) {
        ev?.stopPropagation();
        if (!this._queue) return;
        const entity = this._queue.entity;
        await this._run(queueItemCommand(this.hass, service, entity, item.queue_item_id), message);
        this._loadQueue(entity);
    }
    async _loadAnnounceData() {
        try {
            const data = await loadAnnounceData(this.hass);
            this._ann = {
                ...data,
                volume: data.volume ?? this._config.announce_volume ?? null
            };
        } catch (err) {
            console.warn("multiroom-card : lecture des annonces enregistrées impossible", err);
        }
    }
    _updateAnn(patch) {
        this._ann = {
            ...this._ann,
            ...patch
        };
        saveAnnounceData(this.hass, this._ann).catch(err => this._showToast(`Enregistrement impossible : ${err?.message ?? err}`));
    }
    get _announcePlayers() {
        return this._players.filter(id => ((this.hass.states[id]?.attributes.supported_features ?? 0) & FEATURE_ANNOUNCE) !== 0);
    }
    get _presets() {
        return [ ...this._config.announcements ?? [], ...this._ann.presets.map((p, userIndex) => ({
            ...p,
            userIndex: userIndex
        })) ];
    }
    _toggleAnnSpeaker(id) {
        const selected = new Set(this._ann.selected);
        selected.has(id) ? selected.delete(id) : selected.add(id);
        this._updateAnn({
            selected: [ ...selected ]
        });
    }
    _toggleAnnEverywhere(all) {
        const available = this._announcePlayers.filter(id => !isUnavailable(this.hass.states[id]));
        this._updateAnn({
            selected: all ? [] : available
        });
    }
    async _announce(message) {
        message = message.trim();
        if (!message) return this._showToast("Le message est vide");
        const targets = this._ann.selected.filter(id => this._announcePlayers.includes(id) && !isUnavailable(this.hass.states[id]));
        if (!targets.length) return this._showToast("Sélectionnez au moins une enceinte");
        const engine = this._config.tts_engine ?? defaultTtsEngine(this.hass);
        if (!engine) return this._showToast("Aucun moteur de synthèse vocale configuré");
        this._annSending = true;
        await this._run(playAnnouncement(this.hass, targets, message, engine, this._ann.volume), `Annonce envoyée sur ${targets.length} enceinte${targets.length > 1 ? "s" : ""}`);
        this._annSending = false;
    }
    _startSavePreset() {
        const message = this._annMessage.trim();
        if (!message) return this._showToast("Écrivez d'abord un message");
        this._annName = message.slice(0, 30);
        this._annSaving = true;
    }
    _confirmSavePreset() {
        const name = this._annName.trim();
        if (!name) return;
        this._updateAnn({
            presets: [ ...this._ann.presets, {
                name: name,
                message: this._annMessage.trim()
            } ]
        });
        this._annSaving = false;
        this._showToast(`Annonce « ${name} » enregistrée`);
    }
    _deletePreset(userIndex, ev) {
        ev.stopPropagation();
        this._updateAnn({
            presets: this._ann.presets.filter((_, i) => i !== userIndex)
        });
    }
    _groupLabel(group) {
        return group.members.map(m => playerName(this.hass, m)).join(" + ");
    }
    render() {
        if (!this._config || !this.hass) return A;
        const players = this._players;
        const groups = computeGroups(this.hass, players);
        const target = this._resolveTarget(groups);
        return b`
      <ha-card style="position: relative">
        <div class="header">
          <div class="title">${this._config.title ?? ""}</div>
          <div class="tabs" role="tablist">
            ${this._renderTab("speakers", "mdi:speaker-multiple", "Enceintes")}
            ${this._renderTab("queue", "mdi:playlist-play", "File")}
            ${this._renderTab("favorites", "mdi:heart", "Favoris")}
            ${this._renderTab("search", "mdi:magnify", "Recherche")}
            ${this._renderTab("announce", "mdi:bullhorn", "Annonces")}
          </div>
        </div>
        ${target ? this._renderNowPlaying(target) : A}
        <div class="content">
          ${this._error ? b`<div class="error">${this._error}</div>` : A}
          ${players.length === 0 ? b`<div class="empty">Aucun lecteur Music Assistant trouvé.</div>` : this._tab === "speakers" ? this._renderSpeakers(groups, target) : this._tab === "queue" ? this._renderQueue(target) : this._tab === "favorites" ? this._renderFavorites(groups, target) : this._tab === "search" ? this._renderSearch(groups, target) : this._renderAnnounce()}
        </div>
        ${this._toast ? b`<div class="toast">${this._toast}</div>` : A}
      </ha-card>
    `;
    }
    _renderTab(tab, icon, label) {
        return b`<button
      class="tab"
      role="tab"
      aria-selected=${this._tab === tab}
      title=${label}
      @click=${() => this._tab = tab}
    >
      <ha-icon .icon=${icon}></ha-icon><span>${label}</span>
    </button>`;
    }
    _art(picture, icon = "mdi:music") {
        const url = picture ? picture.startsWith("/") ? this.hass.hassUrl(picture) : picture : undefined;
        return b`<div class="art" style=${url ? `background-image:url("${url}")` : ""}>
      ${url ? A : b`<ha-icon .icon=${icon}></ha-icon>`}
    </div>`;
    }
    _renderNowPlaying(target) {
        const s = this.hass.states[target.leader];
        const a = s?.attributes ?? {};
        const playing = s?.state === "playing";
        const hasMedia = !!a.media_title;
        return b`
      <div class="now-playing">
        ${this._art(a.entity_picture, "mdi:speaker")}
        <div class="np-text">
          <div class="np-title">${hasMedia ? a.media_title : STATE_LABELS[s?.state ?? ""] ?? s?.state}</div>
          ${hasMedia ? b`<div class="np-sub">${[ a.media_artist, a.media_album_name ].filter(Boolean).join(" · ")}</div>` : A}
          <div class="np-target">
            <ha-icon icon="mdi:speaker-wireless"></ha-icon>${this._groupLabel(target)}
          </div>
        </div>
        <div class="controls">
          <button
            class="icon-btn"
            title="Précédent"
            @click=${() => this._run(mediaCommand(this.hass, target.leader, "media_previous_track"))}
          >
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button
            class="icon-btn primary"
            title=${playing ? "Pause" : "Lecture"}
            @click=${() => this._run(mediaCommand(this.hass, target.leader, "media_play_pause"))}
          >
            <ha-icon .icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button
            class="icon-btn"
            title="Suivant"
            @click=${() => this._run(mediaCommand(this.hass, target.leader, "media_next_track"))}
          >
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `;
    }
    _renderSpeakers(groups, target) {
        const hasGroups = groups.some(g => g.members.length > 1);
        return b`
      <div class="toolbar">
        ${target ? b`<button class="btn" @click=${() => this._groupAll(target)}>
              <ha-icon icon="mdi:link-variant"></ha-icon>Tout grouper sur ${playerName(this.hass, target.leader)}
            </button>` : A}
        ${hasGroups ? b`<button class="btn" @click=${() => this._ungroupAll(groups)}>
              <ha-icon icon="mdi:link-variant-off"></ha-icon>Tout dégrouper
            </button>` : A}
      </div>
      ${groups.map(g => this._renderGroup(g, g.leader === target?.leader, groups))}
    `;
    }
    _renderGroup(group, isTarget, groups) {
        const leader = this.hass.states[group.leader];
        const a = leader?.attributes ?? {};
        const unavailable = isUnavailable(leader);
        const multi = group.members.length > 1;
        const playing = leader?.state === "playing";
        const hasQueue = !!a.media_title;
        const stateText = a.media_title ? [ a.media_title, a.media_artist ].filter(Boolean).join(" — ") : STATE_LABELS[leader?.state ?? ""] ?? leader?.state;
        return b`
      <div class="group ${isTarget ? "target" : ""}">
        <div class="group-head" @click=${() => this._target = group.leader} title="Choisir comme enceinte active">
          ${this._art(a.entity_picture, multi ? "mdi:speaker-multiple" : "mdi:speaker")}
          <div class="group-info">
            <div class="group-name">
              ${this._groupLabel(group)}${isTarget ? b`<span class="badge">active</span>` : A}
            </div>
            <div class="group-state">${stateText}</div>
          </div>
          ${unavailable ? A : b`
                <button
                  class="icon-btn"
                  title=${playing ? "Pause" : "Lecture"}
                  @click=${ev => {
            ev.stopPropagation();
            this._run(mediaCommand(this.hass, group.leader, "media_play_pause"));
        }}
                >
                  <ha-icon .icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon>
                </button>
                ${hasQueue ? b`<button
                      class="icon-btn ${this._isEditing(group, "transfer") ? "active" : ""}"
                      title="Transférer la lecture vers une autre enceinte"
                      @click=${ev => this._startEditing(group, "transfer", ev)}
                    >
                      <ha-icon icon="mdi:transfer-right"></ha-icon>
                    </button>` : A}
                ${supportsGrouping(leader) ? b`<button
                      class="icon-btn ${this._isEditing(group, "group") ? "active" : ""}"
                      title="Ajouter / retirer des enceintes"
                      @click=${ev => this._startEditing(group, "group", ev)}
                    >
                      <ha-icon icon="mdi:speaker-multiple"></ha-icon>
                    </button>` : A}
                ${multi ? b`<button
                      class="icon-btn"
                      title="Dégrouper"
                      @click=${ev => {
            ev.stopPropagation();
            this._run(unjoin(this.hass, group.members.filter(m => m !== group.leader)), "Groupe dissous");
        }}
                    >
                      <ha-icon icon="mdi:link-variant-off"></ha-icon>
                    </button>` : A}
              `}
        </div>
        ${unavailable ? A : b`<div class="members">
              ${multi ? this._renderGroupVolume(group) : A}
              ${group.members.map(m => this._renderMember(group, m))}
            </div>`}
        ${this._isEditing(group, "group") ? this._renderPicker(group) : A}
        ${this._isEditing(group, "transfer") ? this._renderTransferPicker(group, groups) : A}
      </div>
    `;
    }
    _isEditing(group, mode) {
        return this._editing === group.leader && this._editMode === mode;
    }
    _renderTransferPicker(source, groups) {
        const targets = groups.filter(g => g.leader !== source.leader && !isUnavailable(this.hass.states[g.leader]));
        return b`
      <div class="picker">
        <div class="picker-title">Transférer la lecture de ${this._groupLabel(source)} vers :</div>
        <div class="picker-list">
          ${targets.length ? targets.map(g => b`<button class="chip" @click=${() => this._transfer(source, g)}>
                  <ha-icon icon="mdi:speaker-wireless"></ha-icon>${this._groupLabel(g)}
                </button>`) : b`<span class="picker-title">Aucune autre enceinte disponible.</span>`}
        </div>
        <div class="picker-actions">
          <button class="btn" @click=${() => this._editing = undefined}>Annuler</button>
        </div>
      </div>
    `;
    }
    _renderGroupVolume(group) {
        const vol = Math.round(this._groupVolume(group) * 100);
        return b`
      <div class="member group-volume">
        <span class="icon-spacer"><ha-icon icon="mdi:volume-high"></ha-icon></span>
        <span class="member-name">Groupe</span>
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(vol)}
          @input=${ev => this._onVolumeInput(`group:${group.leader}`, ev)}
          @change=${ev => this._onGroupVolumeChange(group, ev)}
        />
        <span class="vol-value">${vol}</span>
        <span class="icon-spacer"></span>
      </div>
    `;
    }
    _renderMember(group, id) {
        const a = this.hass.states[id]?.attributes ?? {};
        const muted = !!a.is_volume_muted;
        const vol = Math.round(this._volume(id) * 100);
        const isLeader = id === group.leader;
        return b`
      <div class="member">
        <button
          class="icon-btn"
          title=${muted ? "Réactiver le son" : "Couper le son"}
          @click=${() => this._run(mediaCommand(this.hass, id, "volume_mute", {
            is_volume_muted: !muted
        }))}
        >
          <ha-icon .icon=${muted ? "mdi:volume-off" : "mdi:volume-medium"}></ha-icon>
        </button>
        <span class="member-name ${isLeader && group.members.length > 1 ? "leader" : ""}"
          >${playerName(this.hass, id)}</span
        >
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(vol)}
          @input=${ev => this._onVolumeInput(id, ev)}
          @change=${ev => this._onVolumeChange(id, ev)}
        />
        <span class="vol-value">${vol}</span>
        ${group.members.length > 1 && !isLeader ? b`<button
              class="icon-btn"
              title="Retirer du groupe"
              @click=${() => this._run(unjoin(this.hass, id), `${playerName(this.hass, id)} retirée du groupe`)}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>` : group.members.length > 1 ? b`<span class="icon-spacer"></span>` : A}
      </div>
    `;
    }
    _renderPicker(group) {
        const candidates = this._players.filter(id => id !== group.leader);
        return b`
      <div class="picker">
        <div class="picker-title">Enceintes jouant avec ${playerName(this.hass, group.leader)} :</div>
        <div class="picker-list">
          ${candidates.map(id => {
            const s = this.hass.states[id];
            const disabled = isUnavailable(s) || !supportsGrouping(s);
            const selected = this._selection.has(id);
            return b`<button
              class="chip"
              aria-pressed=${selected}
              ?disabled=${disabled}
              @click=${() => this._toggleSelection(id)}
            >
              <ha-icon .icon=${selected ? "mdi:check" : "mdi:plus"}></ha-icon>${playerName(this.hass, id)}
            </button>`;
        })}
        </div>
        <div class="picker-actions">
          <button class="btn" @click=${() => this._editing = undefined}>Annuler</button>
          <button class="btn primary" @click=${() => this._applyGroup(group)}>Appliquer</button>
        </div>
      </div>
    `;
    }
    _renderTargetSelect(groups, target) {
        const available = groups.filter(g => !isUnavailable(this.hass.states[g.leader]));
        return b`
      <div class="target-row">
        <ha-icon icon="mdi:speaker-wireless"></ha-icon>
        <span>Lire sur</span>
        <select @change=${ev => this._target = ev.target.value}>
          ${available.map(g => b`<option value=${g.leader} ?selected=${g.leader === target?.leader}>
              ${this._groupLabel(g)}
            </option>`)}
        </select>
      </div>
    `;
    }
    _renderFavorites(groups, target) {
        const items = this._favorites.get(this._favType);
        return b`
      ${this._renderTargetSelect(groups, target)}
      <div class="chips">
        ${this._favoriteTypes.map(t => b`<button class="chip" aria-pressed=${this._favType === t} @click=${() => this._favType = t}>
            <ha-icon .icon=${MEDIA_TYPES[t].icon}></ha-icon>${MEDIA_TYPES[t].plural}
          </button>`)}
        <button class="icon-btn" title="Rafraîchir" @click=${() => this._loadFavorites(true)}>
          <ha-icon icon="mdi:refresh"></ha-icon>
        </button>
      </div>
      ${!this._entryId ? A : this._favLoading && !items ? b`<div class="empty">Chargement…</div>` : !items?.length ? b`<div class="empty">Aucun favori de ce type.</div>` : b`<div class="grid">${items.map(i => this._renderTile(i, target))}</div>`}
    `;
    }
    _renderSearch(groups, target) {
        const types = Object.keys(MEDIA_TYPES);
        const sections = this._results ? SEARCH_SECTIONS.filter(s => this._results[s.key]?.length) : [];
        return b`
      ${this._renderTargetSelect(groups, target)}
      <div class="search-box">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          placeholder="Artiste, album, titre, radio…"
          .value=${this._query}
          @input=${this._onSearchInput}
          @keydown=${ev => {
            if (ev.key !== "Enter") return;
            this._doSearch();
            ev.target.blur();
        }}
        />
        ${this._searching ? b`<ha-icon icon="mdi:loading" class="spin"></ha-icon>` : A}
      </div>
      <div class="chips">
        <button class="chip" aria-pressed=${!this._searchType} @click=${() => this._setSearchType(undefined)}>
          Tout
        </button>
        ${types.map(t => b`<button
            class="chip"
            aria-pressed=${this._searchType === t}
            @click=${() => this._setSearchType(t)}
          >
            <ha-icon .icon=${MEDIA_TYPES[t].icon}></ha-icon>${MEDIA_TYPES[t].plural}
          </button>`)}
      </div>
      ${this._query.trim().length < 2 ? b`<div class="empty">Recherchez dans toutes les sources connectées à Music Assistant.</div>` : this._results && !sections.length && !this._searching ? b`<div class="empty">Aucun résultat pour « ${this._query} ».</div>` : sections.map(s => b`
                <div class="section-title">${MEDIA_TYPES[s.type].plural}</div>
                ${s.type === "track" ? b`<div class="list">${this._results[s.key].map(i => this._renderRow(i, target))}</div>` : b`<div class="grid">${this._results[s.key].map(i => this._renderTile(i, target))}</div>`}
              `)}
    `;
    }
    _renderQueue(target) {
        if (!hasQueueActions(this.hass)) {
            return b`<div class="empty">
        L'affichage de la file nécessite l'intégration « Music Assistant Queue Actions » (mass_queue, via HACS).
      </div>`;
        }
        if (!target) return b`<div class="empty">Aucune enceinte disponible.</div>`;
        const queue = this._queue?.entity === target.leader ? this._queue : undefined;
        if (!queue) return b`<div class="empty">${this._queueLoading ? "Chargement…" : "File vide."}</div>`;
        const {items: items, info: info} = queue;
        const leader = this.hass.states[target.leader];
        let current = items.findIndex(i => i.queue_item_id === info?.current_item?.queue_item_id);
        if (current < 0) current = items.findIndex(i => i.media_content_id === leader?.attributes.media_content_id);
        const position = info?.current_index != null ? info.current_index + 1 : undefined;
        const remaining = info && info.current_index != null ? info.items - info.current_index - 1 : 0;
        const shownAfter = current >= 0 ? items.length - current - 1 : items.length;
        return b`
      <div class="queue-head">
        <ha-icon icon="mdi:speaker-wireless"></ha-icon>
        <span class="queue-title">${this._groupLabel(target)}</span>
        ${info ? b`<span class="queue-count">${position ?? "–"} / ${info.items}</span>` : A}
        <button class="icon-btn" title="Rafraîchir" @click=${() => this._loadQueue(target.leader)}>
          <ha-icon class=${this._queueLoading ? "spin" : ""} icon="mdi:refresh"></ha-icon>
        </button>
      </div>
      ${items.length ? b`<div class="list">
            ${items.map((item, i) => this._renderQueueRow(item, i < current ? "past" : i === current ? "current" : ""))}
          </div>` : b`<div class="empty">File vide.</div>`}
      ${remaining > shownAfter && this._queueAfter < 1e3 ? b`<div class="picker-actions">
            <button class="btn" @click=${() => this._queueAfter = Math.min(1e3, this._queueAfter + QUEUE_PAGE)}>
              <ha-icon icon="mdi:chevron-down"></ha-icon>Afficher plus (${remaining - shownAfter} restants)
            </button>
          </div>` : A}
    `;
    }
    _renderQueueRow(item, status) {
        const art = this._art(item.media_image, "mdi:music-note");
        if (status === "current") {
            return b`<div class="row current">
        ${art}
        <div class="row-text">
          <div class="tile-name">${item.media_title}</div>
          <div class="tile-sub">${item.media_artist ?? ""}</div>
        </div>
        <ha-icon class="now-icon" icon="mdi:volume-high"></ha-icon>
      </div>`;
        }
        return b`<div
      class="row ${status}"
      title=${`Lire ${item.media_title}`}
      @click=${() => this._queueAction("play_queue_item", item, `Lecture : ${item.media_title}`)}
    >
      ${art}
      <div class="row-text">
        <div class="tile-name">${item.media_title}</div>
        <div class="tile-sub">${item.media_artist ?? ""}</div>
      </div>
      ${status === "past" ? A : b`<button
            class="icon-btn"
            title="Lire ensuite"
            @click=${ev => this._queueAction("move_queue_item_next", item, `${item.media_title} sera lu ensuite`, ev)}
          >
            <ha-icon icon="mdi:playlist-play"></ha-icon>
          </button>`}
      <button
        class="icon-btn"
        title="Retirer de la file"
        @click=${ev => this._queueAction("remove_queue_item", item, `${item.media_title} retiré de la file`, ev)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </button>
    </div>`;
    }
    _renderAnnounce() {
        const speakers = this._announcePlayers;
        const available = speakers.filter(id => !isUnavailable(this.hass.states[id]));
        const allSelected = available.length > 0 && available.every(id => this._ann.selected.includes(id));
        const presets = this._presets;
        const volume = this._ann.volume;
        return b`
      <div class="section-title">Enceintes</div>
      <div class="picker-list">
        ${speakers.map(id => b`<button
            class="chip"
            aria-pressed=${this._ann.selected.includes(id)}
            ?disabled=${isUnavailable(this.hass.states[id])}
            @click=${() => this._toggleAnnSpeaker(id)}
          >
            <ha-icon icon="mdi:speaker"></ha-icon>${playerName(this.hass, id)}
          </button>`)}
        ${speakers.length > 1 ? b`<button class="chip all" aria-pressed=${allSelected} @click=${() => this._toggleAnnEverywhere(allSelected)}>
              <ha-icon icon="mdi:home-sound-out"></ha-icon>Partout
            </button>` : A}
        ${speakers.length ? A : b`<span class="picker-title">Aucune enceinte compatible.</span>`}
      </div>

      <div class="section-title">Annonces enregistrées</div>
      <div class="presets">
        ${presets.length ? presets.map(p => b`<div
                class="preset"
                title=${p.message}
                @click=${() => this._annMessage = p.message}
              >
                <ha-icon .icon=${p.icon ?? "mdi:message-text-outline"}></ha-icon>
                <span class="preset-name">${p.name}</span>
                <button
                  class="icon-btn"
                  title="Diffuser maintenant"
                  ?disabled=${this._annSending}
                  @click=${ev => {
            ev.stopPropagation();
            this._announce(p.message);
        }}
                >
                  <ha-icon icon="mdi:play"></ha-icon>
                </button>
                ${p.userIndex !== undefined ? b`<button
                      class="icon-btn"
                      title="Supprimer"
                      @click=${ev => this._deletePreset(p.userIndex, ev)}
                    >
                      <ha-icon icon="mdi:close"></ha-icon>
                    </button>` : A}
              </div>`) : b`<span class="picker-title">Aucune annonce. Écrivez un message puis « Enregistrer ».</span>`}
      </div>

      <div class="section-title">Message</div>
      <textarea
        rows="2"
        placeholder="Tapez votre message…"
        .value=${this._annMessage}
        @input=${ev => this._annMessage = ev.target.value}
        @keydown=${ev => ev.key === "Enter" && (ev.ctrlKey || ev.metaKey) && this._announce(this._annMessage)}
      ></textarea>

      ${this._annSaving ? b`<div class="save-row">
            <input
              type="text"
              placeholder="Nom de l'annonce"
              .value=${this._annName}
              @input=${ev => this._annName = ev.target.value}
              @keydown=${ev => ev.key === "Enter" && this._confirmSavePreset()}
            />
            <button class="btn" @click=${this._confirmSavePreset}>OK</button>
            <button class="btn" @click=${() => this._annSaving = false}>Annuler</button>
          </div>` : A}

      <div class="member">
        <span class="icon-spacer"><ha-icon icon="mdi:volume-high"></ha-icon></span>
        <span class="member-name">Volume</span>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          .value=${String(volume ?? 30)}
          @input=${ev => this._ann = {
            ...this._ann,
            volume: Number(ev.target.value)
        }}
          @change=${() => this._updateAnn({})}
        />
        <button
          class="vol-label"
          title="Cliquer pour ne pas changer le volume des enceintes"
          @click=${() => this._updateAnn({
            volume: null
        })}
        >
          ${volume == null ? "inchangé" : `${volume} %`}
        </button>
      </div>

      <div class="picker-actions">
        <button class="btn" @click=${this._startSavePreset}>
          <ha-icon icon="mdi:content-save-outline"></ha-icon>Enregistrer
        </button>
        <button
          class="btn primary"
          ?disabled=${this._annSending}
          @click=${() => this._announce(this._annMessage)}
        >
          <ha-icon icon="mdi:bullhorn-outline"></ha-icon>Annoncer
        </button>
      </div>
    `;
    }
    _typeIcon(item) {
        return MEDIA_TYPES[item.media_type]?.icon ?? "mdi:music";
    }
    _itemImage(item) {
        return item.image ?? item.album?.image ?? undefined;
    }
    _pendingClass(item) {
        if (!this._pendingUri) return "";
        return this._pendingUri === item.uri ? "pending" : "busy";
    }
    _itemArt(item) {
        return b`<div class="art-wrap">
      ${this._art(this._itemImage(item), this._typeIcon(item))}
      ${this._pendingUri === item.uri ? b`<div class="art-overlay"><ha-icon class="spin" icon="mdi:loading"></ha-icon></div>` : A}
    </div>`;
    }
    _renderTile(item, target) {
        return b`
      <div
        class="tile ${item.media_type === "artist" ? "round" : ""} ${this._pendingClass(item)}"
        tabindex="0"
        title=${`Lire ${item.name}`}
        @click=${() => this._play(item, target, "play")}
        @keydown=${ev => ev.key === "Enter" && this._play(item, target, "play")}
      >
        ${this._itemArt(item)}
        <div class="tile-actions">
          <button class="icon-btn" title="Lire ensuite" @click=${ev => this._play(item, target, "next", ev)}>
            <ha-icon icon="mdi:playlist-play"></ha-icon>
          </button>
          <button class="icon-btn" title="Ajouter à la file" @click=${ev => this._play(item, target, "add", ev)}>
            <ha-icon icon="mdi:playlist-plus"></ha-icon>
          </button>
        </div>
        <div class="tile-name">${item.name}</div>
        <div class="tile-sub">${itemSubtitle(item)}</div>
      </div>
    `;
    }
    _renderRow(item, target) {
        return b`
      <div
        class="row ${this._pendingClass(item)}"
        @click=${() => this._play(item, target, "play")}
        title=${`Lire ${item.name}`}
      >
        ${this._itemArt(item)}
        <div class="row-text">
          <div class="tile-name">${item.name}</div>
          <div class="tile-sub">${itemSubtitle(item)}</div>
        </div>
        <button class="icon-btn" title="Lire ensuite" @click=${ev => this._play(item, target, "next", ev)}>
          <ha-icon icon="mdi:playlist-play"></ha-icon>
        </button>
        <button class="icon-btn" title="Ajouter à la file" @click=${ev => this._play(item, target, "add", ev)}>
          <ha-icon icon="mdi:playlist-plus"></ha-icon>
        </button>
      </div>
    `;
    }
};

MultiroomCard.styles = cardStyles;

__decorate([ n({
    attribute: false
}) ], MultiroomCard.prototype, "hass", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_config", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_tab", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_target", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_editing", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_editMode", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_selection", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_volumes", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_entryId", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_favType", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_favorites", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_favLoading", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_query", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_searchType", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_results", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_searching", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_error", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_toast", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_ann", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_annMessage", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_annSaving", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_annName", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_annSending", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_pendingUri", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_queue", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_queueLoading", void 0);

__decorate([ r() ], MultiroomCard.prototype, "_queueAfter", void 0);

MultiroomCard = __decorate([ t("multiroom-card") ], MultiroomCard);

window.customCards = window.customCards ?? [];

window.customCards.push({
    type: "multiroom-card",
    name: "Multiroom Card",
    description: "Gérer, grouper et alimenter les enceintes Music Assistant.",
    preview: false
});

console.info(`%c MULTIROOM-CARD %c v${VERSION} `, "color:#fff;background:#03a9f4", "color:#03a9f4");

export { MultiroomCard };
