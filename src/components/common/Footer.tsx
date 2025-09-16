import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerSections = {
  soporte: {
    title: "Soporte",
    links: [
      { name: "Centro de ayuda", href: "#" },
      { name: "Contacto", href: "#" },
      { name: "Chat en vivo", href: "#" },
      { name: "Garantías", href: "#" },
      { name: "Devoluciones", href: "#" },
    ],
  },
  empresa: {
    title: "Empresa",
    links: [
      { name: "Acerca de nosotros", href: "#" },
      { name: "Carreras", href: "#" },
      { name: "Prensa", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Afiliados", href: "#" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Términos y condiciones", href: "#" },
      { name: "Política de privacidad", href: "#" },
      { name: "Política de cookies", href: "#" },
      { name: "Aviso legal", href: "#" },
      { name: "GDPR", href: "#" },
    ],
  },
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">StoreApp</h3>
            <p className="text-muted-foreground mb-6 text-pretty">
              Tu tienda de tecnología de confianza. Ofrecemos los mejores
              productos con garantía, envío gratis y soporte técnico
              especializado.
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+52 221-1577-8176</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>soporte@storeapp.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Xicotepec, Puebla</span>
              </div>
            </div>
          </div>

          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-card-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 StoreApp. Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground mr-2">
                Síguenos:
              </span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
