var Hex = {
    make: (q,r) => {
        return { q, r };
    },
    add: ({ q: q1, r: r1 }, { q: q2, r: r2 }) => {
        return { q: q1 + q2, r: r1 + r2 };
    },
    neg: ({ q, r }) => {
        return { q: -q, r: -r };
    },
    sub: (a, b) => {
        return Hex.add(a, Hex.neg(b));
    },
    mul: ({ q, r }, k) => {
        return { q: q * k, r: r * k };
    },
    toPixel: ({ q, r }) => {
        const x = Config.hex_size * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r);
        const y = Config.hex_size * (3/2 * r);
        return { x, y };
    },
    toHex: (x, y) => {
        const q = (Math.sqrt(3)/3 * x - 1/3 * y) / Config.hex_size;
        const r = (2/3 * y) / Config.hex_size;
        return { q, r };
    },
    hex_round : function(hex){
        frac = {
            q : hex.q,
            r : hex.r,
            s : -hex.q-hex.r
        }
        let q = Math.round(frac.q)
        let r = Math.round(frac.r)
        let s = Math.round(frac.s)

        let q_diff = Math.abs(q - frac.q)
        let r_diff = Math.abs(r - frac.r)
        let s_diff = Math.abs(s - frac.s)

        if (q_diff > r_diff && q_diff > s_diff) q = -r-s
        else if (r_diff > s_diff) r = -q-s
        else s = -q-r

        return { q, r };
    },
    toString: ({q,r}) => {
        return `${q},${r}`;
    },
    fromString: (str) => {
        const [q, r] = str.split(',').map(Number);
        return { q, r };
    },
    ifEqual: (a, b) => {
        return a.q == b.q && a.r == b.r;
    },
}