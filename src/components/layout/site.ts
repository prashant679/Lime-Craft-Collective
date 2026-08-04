export const SITE = {
  name: "Lime Craft Collective",
  whatsappUrl: "https://wa.me/918586096452",
  phoneDisplay: "+91 8586096452",
  phoneHref: "tel:+918586096452",
  email: "limecraftcollective@gmail.com",
  emailHref: "mailto:limecraftcollective@gmail.com",
  address: "F-1/298 Sangam Vihar, New Delhi – 110080",
  gstNumber: "07CZUPR8920H1ZK",
  instagramHandle: "@limecraftcollective",
  instagramUrl: "https://instagram.com/limecraftcollective",
} as const;

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Microtopping", href: "/services/microtopping" },
      { label: "Limewash", href: "/services/limewash" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];