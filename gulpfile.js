import {Core} from  "@newlogic-digital/core";
import postcssMixins from "postcss-mixins";

export default new Core().init({
    scripts: {
        importResolution: {
            directories: ["Components", "Sections", "Layout", "Libraries", "Utils/Functions"]
        },
        importMap: {
            build: false,
            trailingSlashes: /(vanillajs-datepicker)/
        }
    },
    styles: {
        purge: {
            enabled: true,
            content: ['src/scripts/**/*.js', 'src/templates/**/*.twig', 'temp/cdn/*.js'],
            options: {
                safelist: {
                    standard: [/(class|is-|to-|grecaptcha)/],
                    deep: [/(ui-wsw|wsw|datepicker)/]
                }
            }
        },
        vendor: {
            path: "Utils/vendor.css"
        },
        importResolution: {
            directories: ["Components", "Sections", "Layout", "Libraries", "Ui"]
        },
        themePath: "Utils/theme/{THEME}.{FORMAT}",
        postcss: {
            extend: [postcssMixins]
        }
    },
    tailwind: {
        darkMode: "class", // or "media" or "class"
        corePlugins: {
            preflight: false,
            container: false,
            ringWidth: false,
            ringColor: false,
            ringOpacity: false,
            ringOffsetWidth: false,
            ringOffsetColor: false,
            gradientColorStops: false,
            backgroundImage: false,
            boxShadow: false
        },
        theme: {
            extend: {
                colors: {
                    background: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-background), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-background), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-background))`
                    },
                    default: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-default), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-default), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-default))`
                    },
                    invert: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-invert), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-invert), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-invert))`
                    },
                    light: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-light), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-light), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-light))`
                    },
                    dark: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-dark), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-dark), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-dark))`
                    },
                    primary: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-primary), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-primary), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-primary))`
                    },
                    secondary: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-secondary), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-secondary), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-secondary))`
                    },
                    warning: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-warning), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-warning), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-warning))`
                    },
                    error: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-error), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-error), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-error))`
                    },
                    info: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-info), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-info), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-info))`
                    },
                    success: ({ opacityVariable, opacityValue }) => {
                        if (opacityValue !== undefined) {
                            return `rgba(var(--color-success), ${opacityValue})`
                        }
                        if (opacityVariable !== undefined) {
                            return `rgba(var(--color-success), var(${opacityVariable}, 1))`
                        }
                        return `rgb(var(--color-success))`
                    }
                }
            },
            fontFamily: {
                primary: "var(--font-primary)",
                secondary: "var(--font-secondary)"
            },
            fontWeight: {
                light: "var(--weight-light)",
                normal: "var(--weight-normal)",
                medium: "var(--weight-medium)",
                semibold: "var(--weight-semibold)",
                bold: "var(--weight-bold)",
                extrabold: "var(--weight-extrabold)"
            },
            zIndex: {
                "0": 0,
                "10": "var(--z-10)",
                "20": "var(--z-20)",
                "30": "var(--z-30)",
                "40": "var(--z-40)",
                "50": "var(--z-50)",
                "auto": "auto"
            },
            screens: {
                "m": {"max": "47.9375em"},
                "t": "48em",
                "d": "60em",
                "w": "76em",
                "hd": "88em",
                "touch": {"max": "59.9375em"},
            }
        },
        variants: {
            extend: {
                backgroundColor: ['checked'],
                borderColor: ['checked'],
                textColor: ['checked'],
            }
        },
        plugins: [],
    }
})