import localFont from "next/font/local";

 export const Vazirmatn = localFont({
    display: 'swap',
    variable: '--font-Vazirmatn',
    src: [
        {
            path: "../../public/Fonts/vazirmatn/fonts/webfonts/Vazirmatn-Thin.woff2",
            weight: "200",
            style: "normal",
        },
         {
            path: "../../public/Fonts/vazirmatn/fonts/webfonts/Vazirmatn-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/Fonts/vazirmatn/fonts/webfonts/Vazirmatn-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/Fonts/vazirmatn/fonts/webfonts/Vazirmatn-SemiBold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/Fonts/vazirmatn/fonts/webfonts/Vazirmatn-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/Fonts/vazirmatn/fonts/webfonts/Vazirmatn-ExtraBold.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/Fonts/vazirmatn/fonts/webfonts/Vazirmatn-Black.woff2",
            weight: "900",
            style: "normal",
        },
    ]
})


export const FONTS =  Vazirmatn.variable 