'use client';


export function contrastingColor(color: string) {
    return (luma(color) >= 165) ? '000' : 'fff';
}

function luma(color: string) {
    const [r, g, b] = hexToRGBArray(color);
    return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
}

function hexToRGBArray(_color: string) {
    let color = _color;
    if (color.length === 3) {
        color = `${color.charAt(0).repeat(2)}${color.charAt(1).repeat(2)}${color.charAt(2).repeat(2)}`;
    }
    else if (color.length !== 6) throw new Error(`Invalid hex color: ${color}`);

    return [
        parseInt(color.slice(0, 2), 16),
        parseInt(color.slice(2, 4), 16),
        parseInt(color.slice(4, 6), 16),
    ] as const;
}
