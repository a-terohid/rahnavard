import { FaMountain } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";

export const navItems = [
  { 
    name: "لوازم کوهنوردی", 
    href: "/mountaineering-supplies",
    icon : <FaMountain/>,
    children: [
      { name: "چادر کوهنوردی", href: "/mountaineering-supplies/tent" },
      { name: "کوله‌پشتی کوهنوردی", href: "/mountaineering-supplies/backpack" },
      { name: "کیسه‌خواب کوهنوردی", href: "/mountaineering-supplies/sleeping-bag" },
      { name: "ظروف کوهنوردی", href: "/mountaineering-supplies/cookware" },
      { name: "کمل‌بک کوهنوردی", href: "/mountaineering-supplies/hydration-pack" },
      { name: "سرشعله کوهنوردی", href: "/mountaineering-supplies/stove" },
      { name: "کیف کمری کوهنوردی", href: "/mountaineering-supplies/waist-bag" },
      { name: "باتوم کوهنوردی", href: "/mountaineering-supplies/trekking-pole" },
      { name: "چاقو کوهنوردی", href: "/mountaineering-supplies/knife" },
      { name: "پانچو کوهنوردی", href: "/mountaineering-supplies/poncho" },
    ]
  },
  { 
    name: "لوازم کمپینگ", 
    href: "/camping-supplies",
    icon : <GiCampingTent/>,
    children: [
      { name: "سایبان کمپینگ و مسافرتی", href: "/camping-supplies/travel-canopy" },
      { name: "هاردکیس (باکس پلیمری)", href: "/camping-supplies/hardcase" },
      { name: "چادر مسافرتی", href: "/camping-supplies/tent" },
      { name: "کول باکس", href: "/camping-supplies/cool-box" },
      { name: "میز و صندلی مسافرتی", href: "/camping-supplies/table-chair" },
      { name: "زیر انداز", href: "/camping-supplies/ground-mat" },
    ]
  },
];