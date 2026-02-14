
import React, { useState, useRef } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Star, 
  Clock, 
  Users, 
  AlertCircle, 
  BookOpen, 
  Globe, 
  CheckCircle2, 
  Calendar, 
  Utensils, 
  ShoppingCart, 
  Activity, 
  RefreshCw, 
  Zap,
  Play
} from 'lucide-react';
import { IMAGES } from './assets';

// --- Localization ---

type Language = 'PT' | 'EN' | 'FR';

const translations: Record<Language, any> = {
  PT: {
    hero: {
      topLabel: "Introdução Alimentar Sem Estresse",
      badge: "Método Comprovado",
      title1: "Método De",
      title2: "Introdução Alimentar",
      title3: "Sem Estresse",
      text: "Alimente seu bebê de 4 a 12 meses com confiança, segurança e tranquilidade. Um método claro para mães modernas que querem fazer o melhor.",
      button: "Quero começar agora →",
      socialProof: "+2.000 mães",
      socialProofSub: "já confiam no método"
    },
    video: {
      title: "Conheça por dentro",
      subtitle: "Veja como o Método e o App NutriBébé vão transformar sua rotina",
    },
    problem: {
      title: "Você se identifica?",
      subtitle: "Se você sente alguma dessas dificuldades, saiba que não está sozinha.",
      items: [
        "Medo de errar e prejudicar a saúde do bebê",
        "Dúvida sobre quando e como começar",
        "Confusão com informações contraditórias",
        "Rotina corrida e falta de praticidade",
        "Insegurança com texturas e engasgos",
        "Desejo de alimentar bem sem estresse"
      ],
      final: "Você precisa de um método claro e confiável."
    },
    method: {
      badge: "Como funciona",
      title1: "Um guia completo",
      title2: "passo a passo",
      text: "Tenha clareza e segurança em cada etapa da alimentação do seu bebê.",
      items: [
        "Sinais reais de prontidão",
        "Alimentos certos por fase",
        "Evolução segura de texturas",
        "Quantidades reais por idade",
        "Rotina simples e organizada",
        "Evitar erros e engasgos"
      ],
      result: "Bebê bem alimentado e mãe tranquila",
      button: "Quero começar agora →"
    },
    nutribebe: {
      headline_sub: "Seu assistente inteligente para cada refeição",
      subheadline: "O único aplicativo que transforma teoria em ação diária — é como tener uma nutricionista no seu bolso.",
      insideTitle: "Veja por dentro do",
      mainText1: "Com o método, você entende.",
      mainText2: "Com o NutriBébé, você aplica com facilidade.",
      features: [
        { title: "Planejador de cardápios por idade (4–24 meses)", desc: "Cardápios adaptados automaticamente à evolução do seu bebê.", icon: "calendar" },
        { title: "Texturas adequadas com um clique", desc: "Liso, amassado ou pedaços — de acordo com a idade e progressão.", icon: "utensils" },
        { title: "Lista de compras inteligente", desc: "Gerada automaticamente com base no cardápio escolhido.", icon: "cart" },
        { title: "Acompanhamento do progresso", desc: "Visualize as etapas alcançadas e os próximos alimentos a introduzir.", icon: "activity" },
        { title: "Opção “Novo cardápio”", desc: "Crie outro cardápio com um clique sempre que quiser variar as refeições.", icon: "refresh" }
      ],
      value: "Incluído gratuitamente com sua inscrição no método.",
      access: "Acesso imediato e ilimitado."
    },
    testimonials: { title: "Resultados Reais", subtitle: "Veja o que as mães estão compartilhando sobre o método" },
    curriculum: { title: "O que você recebe", subtitle: "Conteúdo completo + bônus exclusivos", mainTitle: "Conteúdo Principal", items: ["ACESSO AO APLICATIVO NUTRIBÉBÉ", "Início da introdução (4-12 meses)", "Sinais de prontidão", "Alimentos por fase", "Texturas: liso ao pedaço", "Quantidades por idade", "Rotina francesa para bebês", "O que evitar", "Organização do prato"], bonusTitle: "Bônus Exclusivos", bonusSub: "Grátis apenas hoje", bonusItems: [{ title: "Guia Visual Prático", sub: "Etapas explicadas visualmente" }, { title: "Planner de Cardápios", sub: "Organização semanal sem estresse" }, { title: "Receitas Testadas", sub: "Preparações rápidas e nutritivas" }], unlimited: "Acesso Vitalício", unlimitedSub: "Assista no seu tempo e ritmo" },
    offer: { badge: "Oferta especial", title: "Acesso ao Método", subtitle: "Tudo para a introdução alimentar", items: ["8 modules completos", "Acesso ao aplicativo NutriBébé", "Materiais para download", "3 bônus exclusivos", "Acesso vitálício", "Garantia de 14 dias"], from: "De 47€", toLabel: "por apenas", button: "Quero acesso agora →", launchNote: "Tarifa de lançamento excepcional. Este preço foi voluntariamente reduzido para as primeiras mães inscritas. Retornará em breve ao seu preço normal.", trust: "Pagamento 100% seguro" },
    guarantee: { title: "Garantia de 14 dias", text: "Teste sem riscos. Se não for para você, devolvemos seu dinheiro sem buroacia. Queremos sua total segurança." },
    about: { badge: "Sobre a autora", title: "Dra. Marie Dupont", role: "Nutricionista Infantil", bio: "Com 15 anos de experiência, Marie desenvolveu este método para ajudar mães a alimentarem seus bebês com confiança e carinho.", points: ["15 anos de experiência", "Especialista em bebês", "Método Nutri-Francês"] },
    faq: { title: "Dúvidas Comuns", subtitle: "Tire suas dúvidas", items: [{ q: "Qual a idade ideal?", a: "Para bebês entre 4 e 12 meses que estão iniciando a alimentação sólida." }, { q: "Serve para iniciantes?", a: "Sim! É um passo a passo desenhado para quem nunca passou pelo processo." }, { q: "Preciso cozinhar bem?", a: "Não. Focamos em praticidade para a rotina corrida de uma mãe." }] },
    final: { title1: "Sua jornada sem", title2: "estresse começa aqui", text: "Seu bebê merece o melhor. Você merece tranquilidade.", button: "Começar agora →" },
    footer: { copyright: "© 2026 Dra. Marie Dupont. Todos os direitos reservados." }
  },
  EN: {
    hero: {
      topLabel: "Stress-Free Baby Feeding",
      badge: "Proven Method",
      title1: "Baby Feeding",
      title2: "Method",
      title3: "Stress-Free",
      text: "Feed your baby from 4 to 12 months with confidence and peace of mind. A clear method for modern mothers who want the best.",
      button: "Get started now →",
      socialProof: "+2,000 mothers",
      socialProofSub: "already trust us"
    },
    video: { title: "Inside Look", subtitle: "Discover how the Method and NutriBébé App work", },
    problem: { title: "Do you feel this?", subtitle: "You're not alone in these challenges.", items: ["Fear of making mistakes with baby's health", "Not knowing when to start", "Confused by contradictory info", "Busy routine, need practicality", "Worry about choking and textures", "Want to feed well without guilt"], final: "You need a reliable method." },
    method: { badge: "The Method", title1: "A step-by-step", title2: "guide", text: "Gain total safety at every stage of your baby's nutrition.", items: ["Readiness signals", "Foods by stage", "Texture progression", "Real portion sizes", "Organized routine", "Common mistake prevention"], result: "Well-fed baby, happy mom", button: "Start now →" },
    nutribebe: { headline_sub: "Your smart assistant for every meal", subheadline: "The only app that turns theory into daily action — it's like having a nutritionist in your pocket.", insideTitle: "Inside", mainText1: "With the method, you understand.", mainText2: "With NutriBébé, you apply it easily.", features: [ { title: "Age-specific menu planner (4–24 months)", desc: "Menus automatically adapted to your baby's evolution.", icon: "calendar" }, { title: "Correct textures with one click", desc: "Smooth, mashed, or pieces — according to age and progress.", icon: "utensils" }, { title: "Smart shopping list", desc: "Generated automatically based on the chosen menu.", icon: "cart" }, { title: "Progress tracking", desc: "Visualize milestones achieved and next foods to introduce.", icon: "activity" }, { title: "“New menu” option", desc: "Create another menu with one click whenever you want variety.", icon: "refresh" } ], value: "Included for free with your registration in the method.", access: "Immediate and unlimited access." },
    testimonials: { title: "Real Results", subtitle: "See what mothers are sharing about the method" },
    curriculum: { title: "What's Included", subtitle: "Complete course + bonuses", mainTitle: "Main Lessons", items: ["ACCESS TO THE NUTRIBÉBÉ APP", "Starting solids (4-12m)", "Readiness signals", "Food stages", "Safe textures", "Portion sizes", "French baby routine", "What to avoid", "Plate organization"], bonusTitle: "Free Bonuses", bonusSub: "Today only", bonusItems: [{ title: "Visual Guide", sub: "Stages explained visually" }, { title: "Menu Planner", sub: "Weekly stress-free organization" }, { title: "Tested Recipes", sub: "Fast and nutritious" }], unlimited: "Lifetime Access", unlimitedSub: "Watch at your own pace" },
    offer: { badge: "Special Offer", title: "Method Access", subtitle: "The ultimate feeding guide", items: ["8 full modules", "NutriBébé App Access", "Downloadable materials", "3 exclusive bonuses", "Lifetime access", "14-day guarantee"], from: "Was 47€", toLabel: "now for only", button: "Get access now →", launchNote: "Exceptional launch price. This price has been voluntarily reduced for the first registered mothers. It will soon return to its normal rate.", trust: "100% secure payment" },
    guarantee: { title: "14-Day Guarantee", text: "Risk-free trial. If it's not for you, we'll refund you. Your peace of mind is our priority." },
    about: { badge: "The Author", title: "Dr. Marie Dupont", role: "Pediatric Nutritionist", bio: "With 15 years of experience, Marie created this method to help moms feed their babies with confidence.", points: ["15 years experience", "Baby specialist", "French Nutri-Method"] },
    faq: { title: "FAQ", subtitle: "Quick answers", items: [{ q: "What age?", a: "Ideal for babies 4-12 months starting solids." }, { q: "Is it for beginners?", a: "Yes, designed for first-time parents." }, { q: "Need to be a chef?", a: "No, we focus on practical daily life." }] },
    final: { title1: "Start your", title2: "journey today", text: "Your baby deserves the best. You deserve calm.", button: "Start now →" },
    footer: { copyright: "© 2026 Dr. Marie Dupont. All rights reserved." }
  },
  FR: {
    hero: {
      topLabel: "Introduction Alimentaire Sans Stress",
      badge: "Méthode Éprouvée",
      title1: "Méthode d'",
      title2: "Introduction Alimentaire",
      title3: "Sans Stress",
      text: "Nourrissez votre bébé de 4 à 12 mois avec confiance et sérénité. Une méthode claire pour les mamans modernes.",
      button: "Commencer maintenant →",
      socialProof: "+2 000 mamans",
      socialProofSub: "nous font confiance"
    },
    video: { title: "Aperçu exclusif", subtitle: "Découvrez comment la Méthode et l'App NutriBébé fonctionnent", },
    problem: { title: "Vous ressentez cela ?", subtitle: "Vous n'êtes pas seule face à ces défis.", items: ["Peur de mal faire pour la santé de bébé", "Incertitude sur le moment de débuter", "Infos contradictoires et confuses", "Besoin de praticité au quotidien", "Crainte des fausses routes et textures", "Vouloir bien nourrir sans culpabilité"], final: "Il vous faut une méthode fiable." },
    method: { badge: "La Méthode", title1: "Un guide complet", title2: "étape par étape", text: "Gagnez en sécurité à chaque étape de la nutrition de votre bébé.", items: ["Signes de maturité", "Aliments par étape", "Progression des textures", "Quantités réelles", "Routine organisée", "Prévention des erreurs"], result: "Bébé bien nourri, maman sereine", button: "Commencer maintenant →" },
    nutribebe: { headline_sub: "Votre assistant intelligent pour chaque repas", subheadline: "La seule application qui transforme la théorie en action quotidienne — c'est comme avoir une nutritionniste dans votre poche.", insideTitle: "Aperçu de", mainText1: "Avec la méthode, vous comprenez.", mainText2: "Avec NutriBébé, vous appliquez avec facilité.", features: [ { title: "Planner de menus par âge (4–24 mois)", desc: "Menus adaptés automatiquement à l'évolution de votre bébé.", icon: "calendar" }, { title: "Textures adaptées en un clic", desc: "Lisse, écrasé ou morceaux — selon l'âge et la progression.", icon: "utensils" }, { title: "Liste de courses inteligente", desc: "Générée automatiquement selon le menu choisi.", icon: "cart" }, { title: "Suivi du progrès", desc: "Visualisez les étapes franchies e os próximos aliments a introduzir.", icon: "activity" }, { title: "Option “Nouveau menu”", desc: "Créez um outro menu em um clic quand vous voulez varier.", icon: "refresh" } ], value: "Inclus gratuitement avec votre inscription à la méthode.", access: "Accès immédiat et illimité." },
    testimonials: { title: "Résultats Réels", subtitle: "Découvrez ce que les mamans partagent sur la méthode" },
    curriculum: { title: "Le Programme", subtitle: "Contenu complet + bonus exclusifs", mainTitle: "Cours Principaux", items: ["ACCÈS À L'APPLICATION NUTRIBÉBÉ", "Débuter la diversification (4-12m)", "Signes de maturité", "Les étapes alimentaires", "Textures sécurisées", "Quantités par âge", "Routine bébé à la française", "Les interdits", "Organisation de l'assiette"], bonusTitle: "Bonus Gratuits", bonusSub: "Seulement aujourd'hui", bonusItems: [{ title: "Guide Visuel Pratique", sub: "Les étapes en images" }, { title: "Planner de Menus", sub: "Organisation hebdo sans stress" }, { title: "Recettes Testées", sub: "Rapides et nutritives" }], unlimited: "Accès à Vie", unlimitedSub: "À consulter à votre rythme" },
    offer: { badge: "Offre Spéciale", title: "Accès à la Méthode", subtitle: "Le guide ultime de diversification", items: ["8 modules complets", "Accès à l'application NutriBébé", "Documents à télécharger", "3 bonus exclusifs", "Accès à vie", "Garantie 14 jours"], from: "Au lieu de 47€", toLabel: "maintenant pour", button: "Accéder maintenant →", launchNote: "Tarif de lancement exceptionnel. Ce prix a été volontairement réduit pour les premières mamans inscrites. Il reviendra prochainement à son tarif normal.", trust: "Paiement 100% sécurisé" },
    guarantee: { title: "Garantie 14 Jours", text: "Testez sans risque. Si ça ne vous convient pas, nous vous remboursons. Votre sérénité est notre priorité." },
    about: { badge: "L'Auteure", title: "Dr Marie Dupont", role: "Nutritionniste Pédiatrique", bio: "Avec 15 ans d'expérience, Marie a créé cette méthode para ajudar as mamães a alimentar seu bébé com confiance.", points: ["15 ans d'expertise", "Spécialiste bébés", "Nutri-Méthode Française"] },
    faq: { title: "Questions", subtitle: "Réponses rapides", items: [{ q: "Quel âge ?", a: "Idéal pour les bébés de 4 à 12 meses débutant la diversification." }, { q: "Pour débutants ?", a: "Oui, conçu para les parents novices." }, { q: "Besoin d'être chef ?", a: "No, focus sur la vie quotidienne pratique." }] },
    final: { title1: "Commencez votre", title2: "aventure aujourd'hui", text: "Bébé mérite le melhor. Vous méritez le calme.", button: "Commencer maintenant →" },
    footer: { copyright: "© 2026 Dr Marie Dupont. Tous droits réservés." }
  }
};

// --- Reusable Components ---

const Badge = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-3 py-1 text-[10px] md:text-xs font-extrabold tracking-widest uppercase rounded-full border border-brand-rose/30 text-brand-rose bg-brand-rose/10 ${className}`}>
    {children}
  </span>
);

const Button = ({ children, className = "" , onClick }: { children?: React.ReactNode, className?: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`bg-brand-rose text-white font-bold py-3.5 md:py-4 px-8 md:px-10 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm md:text-base w-full md:w-auto ${className}`}
  >
    {children}
  </button>
);

const Accordion: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        className="w-full py-4 md:py-5 flex justify-between items-center text-left hover:text-brand-rose transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-sm md:text-base font-semibold text-gray-700 pr-4">{question}</span>
        {isOpen ? <ChevronUp size={18} className="text-gray-400 shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
      </button>
      {isOpen && (
        <div className="pb-5 text-sm md:text-base text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const LanguageSwitcher = ({ current, setLang, isDark = false }: { current: Language, setLang: (l: Language) => void, isDark?: boolean }) => (
  <div className={`flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold ${isDark ? 'text-white' : 'text-gray-500'}`}>
    {['FR', 'EN', 'PT'].map((l) => (
      <React.Fragment key={l}>
        <button 
          onClick={() => setLang(l as Language)} 
          className={`py-2 px-1 ${current === l ? 'text-brand-rose underline underline-offset-4' : 'hover:text-brand-rose'} transition-colors uppercase`}
        >
          {l}
        </button>
        {l !== 'PT' && <span className="opacity-30">|</span>}
      </React.Fragment>
    ))}
  </div>
);

// --- Sections ---

const Navbar = () => (
  <nav className="bg-[#1D2B3A] text-white h-1.5 md:h-2 sticky top-0 z-50 shadow-sm">
    <div className="w-full h-full bg-gradient-to-r from-brand-rose/20 to-transparent"></div>
  </nav>
);

const Hero = ({ t, onCTAClick }: { t: any, onCTAClick: () => void }) => {
  return (
    <section className="bg-brand-light pt-12 pb-20 md:pt-20 md:pb-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="mb-6 md:mb-8 text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-40 text-brand-dark">
            {t.hero.topLabel}
          </div>
          <Badge className="mb-4 md:mb-6">{t.hero.badge}</Badge>
          <h1 className="flex flex-col items-center md:items-start gap-1 mb-6 md:mb-10">
            <span className="text-2xl md:text-5xl lg:text-6xl font-poppins font-bold text-brand-dark leading-tight tracking-tight opacity-90">
              {t.hero.title1} <br /> {t.hero.title2}
            </span>
            <span className="text-5xl md:text-8xl lg:text-9xl font-serif italic text-brand-rose mt-2 drop-shadow-sm select-none">
              {t.hero.title3}
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto md:mx-0 mb-8 md:mb-14 leading-relaxed text-sm md:text-lg font-medium italic">
            {t.hero.text}
          </p>

          <div className="md:hidden w-full max-w-[240px] mb-8 relative">
            <img 
              src={IMAGES.hero.mockup} 
              alt="Hero Mockup Mobile" 
              className="w-full h-auto drop-shadow-xl mx-auto"
            />
          </div>

          <Button onClick={onCTAClick} className="shadow-xl shadow-brand-rose/20">{t.hero.button}</Button>
        </div>
        
        <div className="hidden md:block flex-1 relative w-full md:max-w-none">
          <div className="relative inline-block w-full">
            <img 
              src={IMAGES.hero.mockup} 
              alt="Hero Mockup Desktop" 
              className="w-full h-auto drop-shadow-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-500"
              fetchPriority="high"
            />
            <div className="absolute bottom-8 -left-12 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl items-center gap-4 border border-gray-100 whitespace-nowrap z-10 flex">
              <div className="w-10 h-10 bg-brand-rose/20 rounded-full flex items-center justify-center">
                <Users size={20} className="text-brand-rose" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-brand-dark">{t.hero.socialProof}</p>
                <p className="text-[10px] font-medium text-gray-500 leading-tight">{t.hero.socialProofSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoSection = ({ t }: { t: any }) => {
  return (
    <section className="py-16 md:py-24 px-4 bg-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif font-bold mb-3 text-gray-800">{t.video.title}</h2>
        <p className="text-gray-500 mb-10 md:mb-14 text-sm md:text-lg max-w-2xl mx-auto">{t.video.subtitle}</p>
        
        <div className="relative aspect-video rounded-3xl md:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(233,165,165,0.2)] border-4 md:border-8 border-white bg-brand-light">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/3c1S0KxFLO0?si=O3KHEixpSGwzB_sC" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const ProblemSection = ({ t }: { t: any }) => (
  <section className="bg-brand-yellow py-16 md:py-20 px-4 text-center">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">{t.problem.title}</h2>
      <p className="text-gray-500 mb-10 md:mb-12 text-sm md:text-base">{t.problem.subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
        {t.problem.items.map((text: string, idx: number) => (
          <div key={idx} className="bg-white/70 backdrop-blur p-6 md:p-8 rounded-2xl md:rounded-3xl flex items-start gap-4 text-left border border-white/60 shadow-sm">
            <div className="text-brand-rose shrink-0 mt-0.5"><AlertCircle size={20} /></div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">{text}</p>
          </div>
        ))}
      </div>
      <p className="text-gray-700 font-semibold text-base md:text-lg">{t.problem.final}</p>
    </div>
  </section>
);

const MethodDescription = ({ t, onCTAClick }: { t: any, onCTAClick: () => void }) => (
  <section className="py-16 md:py-24 px-4 text-center bg-white">
    <div className="max-w-4xl mx-auto">
      <Badge className="mb-6">{t.method.badge}</Badge>
      <h2 className="text-2xl md:text-5xl font-serif font-bold text-slate-800 leading-tight mb-4 md:mb-6">
        {t.method.title1} <br className="hidden md:block" /> <span className="italic text-brand-rose">{t.method.title2}</span>
      </h2>
      <p className="text-gray-600 mb-10 md:mb-12 leading-relaxed text-sm md:text-lg max-w-2xl mx-auto">{t.method.text}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-left mb-10 md:mb-12">
        {t.method.items.map((item: string, i: number) => (
          <div key={i} className="flex items-center gap-3 md:gap-4 bg-gray-50 p-4 md:p-5 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold text-gray-700 border border-gray-100">
            <Check size={18} className="text-brand-rose shrink-0" />
            {item}
          </div>
        ))}
      </div>
      <Button onClick={onCTAClick} className="shadow-xl shadow-brand-rose/20">{t.method.button}</Button>
    </div>
  </section>
);

const NutribebeSection = ({ t }: { t: any }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar': return <Calendar className="text-brand-rose" size={24} />;
      case 'utensils': return <Utensils className="text-brand-rose" size={24} />;
      case 'cart': return <ShoppingCart className="text-brand-rose" size={24} />;
      case 'activity': return <Activity className="text-brand-rose" size={24} />;
      case 'refresh': return <RefreshCw className="text-brand-rose" size={24} />;
      default: return <Zap className="text-brand-rose" size={24} />;
    }
  };

  const carouselImages = [
    "https://i.imgur.com/ExTTmFS.png",
    "https://i.imgur.com/PxOhGST.png",
    "https://i.imgur.com/aE7WZ2o.png",
    "https://i.imgur.com/dLlZ9ee.png"
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-brand-light py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Headline Section */}
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <h2 className="text-4xl md:text-7xl font-serif italic text-brand-rose drop-shadow-sm mb-2">NutriBébé</h2>
          <p className="text-xl md:text-4xl font-poppins font-bold text-brand-dark tracking-tight max-w-2xl">{t.nutribebe.headline_sub}</p>
        </div>
        
        {/* App Image Preview */}
        <div className="max-w-xl mx-auto mb-12 md:mb-16">
          <img 
            src="https://i.imgur.com/0YQ6ZhE.png" 
            alt="NutriBébé App Preview" 
            className="w-full h-auto mx-auto mix-blend-multiply"
            loading="lazy"
          />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {t.nutribebe.features.map((feature: any, i: number) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center">
              <div className="mb-4 bg-brand-rose/10 p-4 rounded-2xl">{getIcon(feature.icon)}</div>
              <h3 className="font-bold text-gray-800 mb-3 text-sm md:text-base">{feature.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Inside Look Section (Slider with Navigation) */}
        <div className="mb-12 relative">
          <h3 className="text-lg md:text-2xl font-serif font-bold text-brand-dark mb-10 italic">
            {t.nutribebe.insideTitle} <span className="text-brand-rose font-bold">NutriBébé</span>
          </h3>
          
          <div className="relative group max-w-6xl mx-auto">
            {/* Arrows */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/40 backdrop-blur-md p-3 rounded-full shadow-lg text-brand-dark hover:bg-white transition-all -ml-4 md:-ml-8 opacity-0 group-hover:opacity-100 hidden md:flex"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/40 backdrop-blur-md p-3 rounded-full shadow-lg text-brand-dark hover:bg-white transition-all -mr-4 md:-mr-8 opacity-0 group-hover:opacity-100 hidden md:flex"
              aria-label="Próximo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Carousel Container */}
            <div 
              ref={scrollRef}
              className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar scroll-smooth"
            >
              {carouselImages.map((src, idx) => (
                <div key={idx} className="flex-none w-[85%] md:w-[32%] snap-center">
                  <div className="transition-transform duration-300 transform hover:scale-[1.01]">
                    <img 
                      src={src} 
                      alt={`App Screen ${idx + 1}`} 
                      className="w-full h-auto rounded-[2rem] mix-blend-multiply object-contain" 
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text Callout - Below Carousel */}
        <div className="mb-16 max-w-2xl mx-auto space-y-1">
          <p className="text-gray-700 font-medium text-base md:text-lg">{t.nutribebe.mainText1}</p>
          <p className="text-gray-700 font-medium text-base md:text-lg">
            Com o <span className="text-brand-rose font-bold">NutriBébé</span>, você aplica com facilidade.
          </p>
        </div>

        {/* Value Callout */}
        <div className="bg-white p-8 md:p-12 rounded-[2rem] border-2 border-dashed border-brand-rose/30 inline-block max-w-2xl shadow-inner">
          <p className="text-brand-rose font-extrabold text-lg md:text-2xl mb-4 tracking-tight">{t.nutribebe.value}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-gray-500 text-sm font-bold uppercase tracking-widest">
            <span>• {t.nutribebe.access}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ t }: { t: any }) => {
  return (
    <section className="bg-gray-50 py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-serif font-bold mb-2">{t.testimonials.title}</h2>
        <p className="text-gray-500 mb-10 md:mb-16 text-sm md:text-base">{t.testimonials.subtitle}</p>
        
        <div className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar scroll-smooth">
          {IMAGES.testimonials.map((url, i) => (
            <div key={i} className="flex-none w-[85%] md:w-[32%] snap-center">
              <div className="bg-white rounded-2xl md:rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 transform transition-transform hover:scale-[1.02] duration-300">
                <img 
                  src={url} 
                  alt={`Depoimento ${i + 1}`} 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex md:hidden justify-center gap-1.5 mt-4">
          {IMAGES.testimonials.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-rose/30" />
          ))}
        </div>
      </div>
    </section>
  );
};

const Curriculum = ({ t }: { t: any }) => (
  <section className="py-16 md:py-24 px-4 text-center">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">{t.curriculum.title}</h2>
      <p className="text-gray-500 mb-10 md:mb-16 text-sm md:text-base">{t.curriculum.subtitle}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 text-left">
        <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-gray-100 shadow-lg">
          <div className="flex items-center gap-3 md:gap-4 mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-rose/10 text-brand-rose rounded-full flex items-center justify-center shrink-0"><BookOpen size={24} /></div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">{t.curriculum.mainTitle}</h3>
          </div>
          <div className="space-y-4 md:space-y-6">
            {t.curriculum.items.map((item: string, i: number) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="w-6 h-6 md:w-8 md:h-8 shrink-0 bg-brand-rose/10 text-brand-rose text-[10px] md:text-xs font-bold rounded-full flex items-center justify-center border border-brand-rose/20">{i + 1}</span>
                <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6 md:space-y-10">
          <div className="bg-[#EBF1F5] p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-gray-200">
             <div className="flex items-center gap-3 md:gap-4 mb-6">
                <Star className="text-blue-500 shrink-0" fill="currentColor" size={20} />
                <div>
                   <h3 className="text-sm md:text-base font-extrabold text-gray-800 uppercase tracking-wider">{t.curriculum.bonusTitle}</h3>
                   <p className="text-[10px] md:text-xs text-blue-600 font-bold">{t.curriculum.bonusSub}</p>
                </div>
             </div>
             <div className="space-y-3">
               {t.curriculum.bonusItems.map((bonus: any, i: number) => (
                 <div key={i} className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm md:text-base font-bold text-gray-800">{bonus.title}</p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{bonus.sub}</p>
                 </div>
               ))}
             </div>
          </div>
          <div className="bg-gray-50 p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-gray-100 flex items-center gap-6 shadow-sm">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-rose text-white rounded-full flex items-center justify-center font-bold text-xl md:text-2xl shadow-lg shrink-0">∞</div>
            <div>
              <p className="text-base md:text-lg font-bold text-gray-800">{t.curriculum.unlimited}</p>
              <p className="text-sm text-gray-500 font-medium">{t.curriculum.unlimitedSub}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Offer = ({ t, onCheckout }: { t: any, onCheckout: () => void }) => (
  <section id="offer-section" className="bg-brand-yellow py-16 md:py-24 px-4 text-center">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 md:p-20 rounded-3xl md:rounded-[50px] shadow-2xl border border-white/80">
        <Badge className="mb-6 md:mb-8">{t.offer.badge}</Badge>
        <h2 className="text-2xl md:text-5xl font-serif font-bold text-gray-800 mb-4 md:mb-6">{t.offer.title}</h2>
        <p className="text-gray-500 mb-8 md:mb-12 text-sm md:text-lg">{t.offer.subtitle}</p>
        <div className="space-y-4 mb-10 md:mb-16 text-left max-w-sm mx-auto">
          {t.offer.items.map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-4">
              <Check size={18} className="text-brand-rose shrink-0" />
              <p className="text-sm md:text-base text-gray-700 font-semibold">{item}</p>
            </div>
          ))}
        </div>
        <div className="mb-8 flex flex-col items-center">
          <p className="text-gray-400 text-base md:text-lg line-through font-medium">{t.offer.from}</p>
          <p className="text-brand-dark text-3xl md:text-5xl font-poppins font-extrabold flex items-baseline gap-2">
            <span className="text-sm md:text-xl font-medium">{t.offer.toLabel}</span>
            9,90€
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 mb-8">
          <Button onClick={onCheckout} className="text-base md:text-lg px-12 py-4">{t.offer.button}</Button>
          <p className="text-[10px] md:text-xs text-gray-500 max-w-md italic font-medium leading-relaxed">
            {t.offer.launchNote}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-3 text-green-600 text-[10px] md:text-xs uppercase font-extrabold tracking-widest bg-green-50 py-3 px-6 rounded-full inline-flex border border-green-100">
          <CheckCircle2 size={16} /> {t.offer.trust}
        </div>
      </div>
    </div>
  </section>
);

const Guarantee = ({ t }: { t: any }) => (
  <section className="bg-[#FFF9F2] py-16 md:py-24 px-4 text-center">
    <div className="max-w-3xl mx-auto">
      <img 
        src={IMAGES.trust.guaranteeBadge} 
        className="w-32 md:w-56 h-auto mx-auto mb-8 md:mb-10 filter drop-shadow-xl" 
        alt="Garantia" 
        loading="lazy"
      />
      <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-8 text-gray-800">{t.guarantee.title}</h2>
      <p className="text-gray-600 leading-relaxed text-sm md:text-lg font-medium max-w-xl mx-auto">{t.guarantee.text}</p>
    </div>
  </section>
);

const About = ({ t }: { t: any }) => (
  <section className="py-16 md:py-24 px-4">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
      <img 
        src={IMAGES.authority.bioPhoto} 
        className="rounded-3xl md:rounded-[40px] shadow-2xl w-full max-w-md mx-auto md:max-w-none" 
        alt="Marie Dupont" 
        loading="lazy"
      />
      <div className="text-left">
        <Badge className="mb-4 md:mb-6">{t.about.badge}</Badge>
        <h2 className="text-2xl md:text-5xl font-serif font-bold text-gray-800 mb-2">{t.about.title}</h2>
        <p className="text-brand-rose font-extrabold text-xs md:text-base mb-6 md:mb-8 uppercase tracking-wide">{t.about.role}</p>
        <p className="text-gray-600 mb-8 md:mb-10 leading-relaxed text-sm md:text-lg font-medium">{t.about.bio}</p>
        <div className="space-y-4 md:space-y-5">
          {t.about.points.map((p: string, i: number) => (
            <div key={i} className="flex items-center gap-4 md:gap-5 text-sm md:text-base text-gray-700 font-bold">
              <div className="text-brand-rose shrink-0"><Clock size={18} /></div>
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FAQ = ({ t }: { t: any }) => (
  <section className="bg-gray-50 py-16 md:py-24 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">{t.faq.title}</h2>
      <p className="text-gray-500 mb-10 md:mb-16 text-sm md:text-base">{t.faq.subtitle}</p>
      <div className="text-left bg-white p-6 md:p-10 rounded-2xl md:rounded-[40px] shadow-sm border border-gray-100">
        {t.faq.items.map((item: any, i: number) => (
          <Accordion key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = ({ t, onCheckout }: { t: any, onCheckout: () => void }) => (
  <section className="bg-brand-yellow py-16 md:py-24 px-4 text-center">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-5xl font-serif font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
        {t.final.title1} <br /> {t.final.title2}
      </h2>
      <p className="text-gray-600 mb-10 md:mb-14 text-sm md:text-lg font-medium max-w-lg mx-auto">{t.final.text}</p>
      <Button onClick={onCheckout} className="px-12 py-4 md:px-16 md:py-6 text-base md:text-xl">{t.final.button}</Button>
    </div>
  </section>
);

const Footer = ({ t, lang, setLang }: { t: any, lang: Language, setLang: (l: Language) => void }) => (
  <footer className="bg-[#1D2B3A] text-white py-12 md:py-20 px-4 text-center border-t border-white/5">
    <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-gray-400">
          <Globe size={16} />
          <LanguageSwitcher current={lang} setLang={setLang} isDark={true} />
        </div>
      </div>
      <div className="w-12 h-px bg-white/10"></div>
      <p className="text-[10px] md:text-xs text-gray-500 font-medium tracking-wide uppercase">
        {t.footer.copyright}
      </p>
    </div>
  </footer>
);

export default function App() {
  const [lang, setLang] = useState<Language>('FR');
  const t = translations[lang];
  const checkoutLink = "https://pay.hotmart.com/D104406321F?off=rx5rn4dr";

  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToCheckout = () => {
    window.location.href = checkoutLink;
  };

  return (
    <div className="min-h-screen selection:bg-brand-rose/20 selection:text-brand-rose">
      <Navbar />
      <Hero t={t} onCTAClick={scrollToOffer} />
      <VideoSection t={t} />
      <ProblemSection t={t} />
      <MethodDescription t={t} onCTAClick={scrollToOffer} />
      <NutribebeSection t={t} />
      <Testimonials t={t} />
      <Curriculum t={t} />
      <Offer t={t} onCheckout={goToCheckout} />
      <Guarantee t={t} />
      <About t={t} />
      <FAQ t={t} />
      <FinalCTA t={t} onCheckout={goToCheckout} />
      <Footer t={t} lang={lang} setLang={setLang} />
    </div>
  );
}
