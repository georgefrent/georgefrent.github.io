import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Heart,
  BookOpen,
  CalendarDays,
  Phone,
  PlayCircle,
  Video,
  Image as ImageIcon,
  ChevronRight,
  Clock,
  MapPin,
  Mail,
  ArrowLeft,
  Users,
  CheckCircle2,
  Headphones,
  Sparkles,
  UserCircle,
  Info,
} from "lucide-react";

// --- MOCK DATA (Ready to be replaced by an API/CMS) ---

const BLOG_POSTS = [
  {
    id: 1,
    title: "Méditation matinale guidée pour l'anxiété",
    excerpt:
      "Commencez votre journée avec clarté et un système nerveux apaisé. Écoutez cette pratique guidée de 10 minutes.",
    category: "Pratique Audio",
    mediaType: "audio",
    date: "5 Mars 2026",
    readTime: "10 min d'écoute",
    imageUrl:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>Les matins peuvent souvent être le moment le plus difficile pour ceux qui souffrent d'anxiété. La montée de cortisol au réveil peut déclencher une réaction de "lutte ou de fuite" avant même que vos pieds ne touchent le sol.</p>
      <br/>
      <p>Cette pratique audio guidée est conçue pour être écoutée pendant que vous êtes encore au lit. Nous nous concentrerons sur la respiration abdominale profonde pour signaler à votre système nerveux que vous êtes en sécurité.</p>
      <br/>
      <p><strong>Écoutez la session ci-dessous :</strong></p>
    `,
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Comprendre les distorsions cognitives",
    excerpt:
      "Regardez cette courte vidéo expliquant comment notre esprit nous joue parfois des tours et comment recadrer les pensées négatives.",
    category: "Psychoéducation",
    mediaType: "video",
    date: "28 Février 2026",
    readTime: "5 min de visionnage",
    imageUrl:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>Les distorsions cognitives sont des schémas de pensée exagérés ou irrationnels qui sont impliqués dans l'apparition ou la perpétuation d'états psychopathologiques, tels que la dépression et l'anxiété.</p>
      <br/>
      <p>Dans cette vidéo, je décompose les trois distorsions les plus courantes : la catastrophisation, la pensée tout ou rien et la personnalisation.</p>
    `,
    videoPoster:
      "https://images.unsplash.com/photo-1516302752946-6939a5924765?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "5 Techniques d'ancrage pour les crises de panique",
    excerpt:
      "Un guide visuel de la technique d'adaptation 5-4-3-2-1 et d'autres méthodes d'ancrage sensoriel.",
    category: "Ressources",
    mediaType: "article",
    date: "15 Février 2026",
    readTime: "4 min de lecture",
    imageUrl:
      "https://images.unsplash.com/photo-1528315582305-61266b0d9f4c?auto=format&fit=crop&q=80&w=800",
    content: `
      <p>Lorsque la panique frappe, vous perdez le contact avec le moment présent. Les techniques d'ancrage vous aident à revenir à l'"ici et maintenant".</p>
      <br/>
      <h3 class="text-xl font-semibold mb-2">La méthode 5-4-3-2-1</h3>
      <ul class="list-disc pl-5 mb-4">
        <li><strong>5</strong> choses que vous pouvez voir autour de vous.</li>
        <li><strong>4</strong> choses que vous pouvez ressentir physiquement (la chaise, vos vêtements).</li>
        <li><strong>3</strong> choses que vous pouvez entendre.</li>
        <li><strong>2</strong> choses que vous pouvez sentir (odorat).</li>
        <li><strong>1</strong> chose que vous pouvez goûter.</li>
      </ul>
      <p>Enregistrez l'image ci-dessous sur votre téléphone pour l'utiliser comme référence rapide lorsque vous vous sentez dépassé(e).</p>
    `,
  },
];

const MEETINGS = [
  {
    id: 1,
    title: "Cercle de pleine conscience",
    date: "Chaque Jeudi",
    time: "18:30 - 19:30",
    type: "Présentiel & En ligne",
    spotsLeft: 4,
    description:
      "Un environnement de groupe sûr et solidaire pour pratiquer la méditation de pleine conscience. Convient aux débutants comme aux pratiquants expérimentés.",
  },
  {
    id: 2,
    title: "Groupe de soutien Anxiété & Stress",
    date: "12 Mars 2026",
    time: "17:00 - 18:30",
    type: "Présentiel",
    spotsLeft: 2,
    description:
      "Une session interactive axée sur les techniques TCC pour gérer le stress quotidien et l'anxiété chronique. Limité à 8 participants.",
  },
  {
    id: 3,
    title: "Atelier intensif de respiration",
    date: "21 Mars 2026",
    time: "10:00 - 13:00",
    type: "En ligne (Zoom)",
    spotsLeft: 12,
    description:
      "Une plongée profonde dans les exercices de respiration somatique conçus pour libérer les tensions et les traumatismes stockés. Lien fourni lors de l'inscription.",
  },
];

// --- COMPONENTS ---

const Navbar = ({ currentRoute, setCurrentRoute }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Accueil" },
    { id: "blog", label: "Blog & Médias" },
    { id: "meetings", label: "Groupes de Parole" },
    { id: "contact", label: "Contact & Réservation" },
  ];

  const handleNav = (id) => {
    setCurrentRoute(id);
    setIsOpen(false);
  };

  return (
    <nav className="bg-stone-50 border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNav("home")}
          >
            <Sparkles className="h-8 w-8 text-teal-600 mr-2" />
            <span className="font-serif text-2xl font-medium text-stone-800">
              Dr. Munteanu
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentRoute === item.id
                    ? "text-teal-700 border-b-2 border-teal-600"
                    : "text-stone-500 hover:text-teal-600"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("contact")}
              className="bg-teal-700 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-teal-800 transition-all shadow-sm"
            >
              Prendre Rendez-vous
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-500 hover:text-teal-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-stone-50 border-b border-stone-200 shadow-lg absolute w-full left-0">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`block w-full text-left px-3 py-4 text-base font-medium rounded-md ${
                  currentRoute === item.id
                    ? "bg-teal-50 text-teal-700"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Home = ({ setCurrentRoute }) => (
  <div className="animate-in fade-in duration-500">
    {/* Hero Section */}
    <div className="relative bg-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-stone-100 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
          <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <span className="block text-sm font-semibold text-teal-600 tracking-wide uppercase mb-3">
                Psychologie Clinique & Psychothérapie
              </span>
              <h1 className="text-4xl tracking-tight font-serif font-medium text-stone-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Un espace sûr pour</span>{" "}
                <span className="block text-teal-700">
                  la guérison et la croissance.
                </span>
              </h1>
              <p className="mt-3 text-base text-stone-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                J'accompagne les individus à traverser l'anxiété, la dépression
                et les transitions de vie grâce à une thérapie compatissante et
                fondée sur des preuves.
              </p>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-full shadow">
                  <button
                    onClick={() => setCurrentRoute("contact")}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-teal-700 hover:bg-teal-800 md:py-4 md:text-lg md:px-10 transition-all"
                  >
                    Planifier une consultation
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => setCurrentRoute("meetings")}
                    className="w-full flex items-center justify-center px-8 py-3 border border-stone-300 text-base font-medium rounded-full text-stone-700 bg-white hover:bg-stone-50 md:py-4 md:text-lg md:px-10 transition-all"
                  >
                    Voir les groupes de parole
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200"
          alt="Salle de méditation paisible"
        />
      </div>
    </div>

    {/* Services/Features */}
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            Approche Thérapeutique
          </h2>
          <p className="mt-2 text-3xl leading-8 font-serif font-medium tracking-tight text-stone-900 sm:text-4xl">
            Soins intégratifs et bienveillants
          </p>
          <p className="mt-4 max-w-2xl text-xl text-stone-500 mx-auto">
            Combiner la science psychologique moderne avec des techniques
            holistiques de pleine conscience pour traiter la personne dans sa
            globalité.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-700 mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-3">
                Thérapie Individuelle
              </h3>
              <p className="text-stone-500">
                Des séances individuelles utilisant la thérapie
                cognitivo-comportementale (TCC) et l'ACT pour traiter l'anxiété,
                la dépression et les traumatismes.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-700 mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-3">
                Groupes de Soutien
              </h3>
              <p className="text-stone-500">
                Cercles de pleine conscience guidés hebdomadaires et groupes de
                soutien spécifiques. La guérison se produit souvent en
                communauté.
              </p>
              <button
                onClick={() => setCurrentRoute("meetings")}
                className="mt-4 text-teal-600 font-medium hover:text-teal-800 flex items-center"
              >
                En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-700 mb-6">
                <Headphones className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-3">
                Ressources Numériques
              </h3>
              <p className="text-stone-500">
                Accès à ma bibliothèque de méditations audio guidées, de vidéos
                éducatives et de fiches de travail thérapeutiques.
              </p>
              <button
                onClick={() => setCurrentRoute("blog")}
                className="mt-4 text-teal-600 font-medium hover:text-teal-800 flex items-center"
              >
                Explorer la bibliothèque{" "}
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Blog = ({ setActivePost }) => {
  const getMediaIcon = (type) => {
    switch (type) {
      case "audio":
        return <Headphones className="h-5 w-5 text-teal-600" />;
      case "video":
        return <Video className="h-5 w-5 text-teal-600" />;
      default:
        return <BookOpen className="h-5 w-5 text-teal-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-medium text-stone-900 mb-4">
          Blog & Bibliothèque de Médias
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          Explorez des articles, des méditations audio guidées et des vidéos
          éducatives créés pour soutenir votre parcours de bien-être mental.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            className="flex flex-col bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => setActivePost(post)}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                {getMediaIcon(post.mediaType)}
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-teal-700 shadow-sm uppercase tracking-wider">
                {post.category}
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-medium text-stone-900 mb-3 group-hover:text-teal-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-stone-600 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 font-medium border-t border-stone-100 pt-4 mt-auto">
                <span className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" /> {post.date}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogPost = ({ post, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className="flex items-center text-teal-600 hover:text-teal-800 font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" /> Retour à la bibliothèque
      </button>

      <div className="mb-10 text-center">
        <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
          {post.category}
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center text-stone-500 space-x-6">
          <span className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2" /> {post.date}
          </span>
          <span className="flex items-center">
            <Clock className="h-5 w-5 mr-2" /> {post.readTime}
          </span>
        </div>
      </div>

      {post.mediaType === "video" && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg bg-black">
          {/* Mock Video Player */}
          <div className="relative aspect-video flex items-center justify-center group cursor-pointer">
            <img
              src={post.videoPoster}
              alt="Video Poster"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
            />
            <PlayCircle className="h-20 w-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-10" />
          </div>
        </div>
      )}

      {post.mediaType === "audio" && (
        <div className="mb-10 p-6 bg-stone-100 rounded-2xl border border-stone-200 shadow-sm flex flex-col items-center">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <Headphones className="h-8 w-8 text-teal-600" />
          </div>
          <p className="text-stone-800 font-medium mb-4">
            {post.title} - Session Audio
          </p>
          <audio controls className="w-full max-w-md focus:outline-none">
            <source src={post.audioSrc} type="audio/mpeg" />
            Votre navigateur ne supporte pas l'élément audio.
          </audio>
        </div>
      )}

      {post.mediaType === "article" && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-sm">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full max-h-96 object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-lg prose-stone max-w-none text-stone-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between bg-stone-50 p-6 rounded-2xl">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="h-14 w-14 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 mr-4">
            <UserCircle className="h-10 w-10" />
          </div>
          <div>
            <p className="font-serif font-medium text-stone-900 text-lg">
              Dr. Elena Munteanu
            </p>
            <p className="text-stone-500 text-sm">Psychologue Clinicienne</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="bg-white border border-stone-300 text-stone-700 px-6 py-2 rounded-full font-medium hover:bg-stone-50 transition-colors"
        >
          Lire plus d'articles
        </button>
      </div>
    </div>
  );
};

const Meetings = () => {
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const handleBook = (id) => {
    // Simulate API call for booking
    setTimeout(() => {
      setBookingSuccess(id);
      setTimeout(() => setBookingSuccess(null), 3000);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-medium text-stone-900 mb-4">
          Thérapie de groupe & Méditation
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          Rejoignez nos sessions communautaires pour pratiquer la pleine
          conscience, partager des expériences et apprendre des stratégies
          d'adaptation dans un environnement bienveillant.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {MEETINGS.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                    {meeting.type}
                  </span>
                  {meeting.spotsLeft <= 3 && (
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold uppercase tracking-wide flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> Presque Complet
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-serif font-medium text-stone-900 mb-4">
                  {meeting.title}
                </h3>
                <p className="text-stone-600 mb-6">{meeting.description}</p>

                <div className="flex flex-wrap gap-6 text-sm text-stone-700 font-medium">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-teal-600" />{" "}
                    {meeting.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-teal-600" />{" "}
                    {meeting.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-teal-600" />{" "}
                    {meeting.spotsLeft} places disponibles
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-8 flex flex-col justify-center items-center sm:items-end">
                {bookingSuccess === meeting.id ? (
                  <div className="flex items-center text-teal-600 bg-teal-50 px-6 py-3 rounded-full font-medium w-full sm:w-auto justify-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" /> Demande Envoyée !
                  </div>
                ) : (
                  <button
                    onClick={() => handleBook(meeting.id)}
                    className="w-full sm:w-auto bg-teal-700 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-800 transition-colors shadow-sm"
                  >
                    Demander à rejoindre
                  </button>
                )}
                <p className="text-xs text-stone-400 mt-3 text-center sm:text-right">
                  Notre équipe vous contactera pour confirmer les détails.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      e.target.reset();
    }, 1200);
  };

  return (
    <div className="bg-stone-50 py-16 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info Side */}
            <div className="bg-teal-800 p-10 md:p-16 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-serif font-medium mb-4">
                  Prenons contact.
                </h2>
                <p className="text-teal-100 text-lg mb-10 max-w-md">
                  Que vous cherchiez à commencer une thérapie individuelle ou à
                  rejoindre une séance de groupe, n'hésitez pas à me contacter.
                  Je propose un premier appel gratuit de 15 minutes.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-teal-300 mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="font-medium text-lg mb-1">
                        Adresse du Cabinet
                      </h4>
                      <p className="text-teal-100">
                        15 Rue de la Paix
                        <br />
                        75002 Paris
                        <br />
                        France
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-teal-300 mr-4 shrink-0" />
                    <p className="text-teal-100 text-lg">+33 1 23 45 67 89</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-teal-300 mr-4 shrink-0" />
                    <p className="text-teal-100 text-lg">
                      contact@drmunteanu.fr
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <h4 className="font-medium mb-2 text-teal-200 uppercase tracking-wide text-sm">
                  Horaires d'Ouverture
                </h4>
                <p className="text-teal-100">Lundi - Jeudi : 10:00 - 19:00</p>
                <p className="text-teal-100">
                  Vendredi : Téléconsultation uniquement
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-10 md:p-16">
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-8">
                Envoyer un Message
              </h3>

              {formStatus === "success" ? (
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center animate-in zoom-in duration-300">
                  <div className="mx-auto w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-medium text-stone-900 mb-2">
                    Message Reçu
                  </h4>
                  <p className="text-stone-600">
                    Merci de m'avoir contacté. Je vous répondrai sous 24 à 48
                    heures ouvrables.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-6 text-teal-700 font-medium hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-stone-700 mb-1"
                      >
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="w-full border-stone-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-stone-50 px-4 py-3"
                        placeholder="Jeanne"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-stone-700 mb-1"
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        className="w-full border-stone-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-stone-50 px-4 py-3"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-stone-700 mb-1"
                    >
                      Adresse E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full border-stone-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-stone-50 px-4 py-3"
                      placeholder="jeanne@exemple.fr"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-sm font-medium text-stone-700 mb-1"
                    >
                      Je suis intéressé(e) par
                    </label>
                    <select
                      id="interest"
                      className="w-full border-stone-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-stone-50 px-4 py-3 text-stone-700"
                    >
                      <option>Thérapie Individuelle</option>
                      <option>Groupes de Parole / Méditation</option>
                      <option>Demande Générale</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-stone-700 mb-1"
                    >
                      Message (Optionnel)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full border-stone-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-stone-50 px-4 py-3 resize-none"
                      placeholder="Décrivez brièvement votre recherche..."
                    ></textarea>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start text-sm text-amber-800">
                    <Info className="h-5 w-5 mr-3 shrink-0 mt-0.5 text-amber-600" />
                    <p>
                      <strong>Avis de Confidentialité (HDS) :</strong> Pour
                      votre sécurité, veuillez ne pas inclure d'informations
                      médicales sensibles dans ce formulaire. Celui-ci est
                      réservé aux demandes de réservation générales.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full bg-teal-700 text-white font-medium py-3.5 px-4 rounded-xl shadow-sm hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting"
                      ? "Envoi en cours..."
                      : "Envoyer le Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-stone-900 text-stone-400 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      <div>
        <div className="flex items-center mb-4">
          <Sparkles className="h-6 w-6 text-teal-500 mr-2" />
          <span className="font-serif text-xl font-medium text-stone-100">
            Dr. Munteanu
          </span>
        </div>
        <p className="mb-4 text-stone-400">
          Soins psychologiques compatissants et formation à la pleine conscience
          pour vous aider à vivre une vie plus ancrée.
        </p>
      </div>
      <div>
        <h4 className="text-stone-100 font-medium mb-4 uppercase tracking-wider text-xs">
          Liens Utiles
        </h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-teal-400 transition-colors">
              Politique de Confidentialité
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-teal-400 transition-colors">
              Mentions Légales
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-teal-400 transition-colors">
              Conditions Générales (CGU)
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-stone-100 font-medium mb-4 uppercase tracking-wider text-xs">
          Urgence
        </h4>
        <p className="mb-2">
          Si vous êtes dans une situation de détresse vitale, n'utilisez pas ce
          site.
        </p>
        <p>
          Appelez le <strong>15 (SAMU)</strong> ou le <strong>112</strong>{" "}
          (Numéro d'urgence européen) immédiatement, ou rendez-vous aux urgences
          les plus proches.
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800 text-center text-xs">
      &copy; {new Date().getFullYear()} Dr. Elena Munteanu. Tous droits
      réservés.
    </div>
  </footer>
);

export default function App() {
  const [currentRoute, setCurrentRoute] = useState("home");
  const [activePost, setActivePost] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  // SEO: Update Document Title & Meta Description dynamically
  useEffect(() => {
    let pageTitle = "Dr. Munteanu | Psychologue Clinicienne";
    let pageDescription =
      "Psychothérapie et pleine conscience pour traiter l'anxiété et la dépression. Réservez une consultation en ligne ou en cabinet à Paris.";

    if (activePost) {
      pageTitle = `${activePost.title} | Dr. Munteanu`;
      pageDescription = activePost.excerpt.substring(0, 155); // Standard length for SEO description
    } else {
      switch (currentRoute) {
        case "blog":
          pageTitle = "Blog & Médias | Dr. Munteanu";
          pageDescription =
            "Explorez des articles, des méditations audio guidées et des vidéos éducatives.";
          break;
        case "meetings":
          pageTitle = "Thérapie de Groupe | Dr. Munteanu";
          pageDescription =
            "Rejoignez nos sessions de thérapie de groupe et nos cercles de méditation.";
          break;
        case "contact":
          pageTitle = "Contact & Réservation | Dr. Munteanu";
          pageDescription =
            "Contactez-moi pour réserver une séance de thérapie individuelle ou de groupe.";
          break;
      }
    }

    // Set Title
    document.title = pageTitle;

    // Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", pageDescription);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", pageDescription);
      document.head.appendChild(metaDescription);
    }
  }, [currentRoute, activePost]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute, activePost]);

  const renderContent = () => {
    if (activePost) {
      return <BlogPost post={activePost} onBack={() => setActivePost(null)} />;
    }

    switch (currentRoute) {
      case "home":
        return <Home setCurrentRoute={setCurrentRoute} />;
      case "blog":
        return <Blog setActivePost={setActivePost} />;
      case "meetings":
        return <Meetings />;
      case "contact":
        return <Contact />;
      default:
        return <Home setCurrentRoute={setCurrentRoute} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex flex-col selection:bg-teal-200 selection:text-teal-900">
      <Navbar
        currentRoute={currentRoute}
        setCurrentRoute={(route) => {
          setCurrentRoute(route);
          setActivePost(null);
        }}
      />
      <main className="grow">{renderContent()}</main>
      <Footer />

      {/* GDPR / RGPD Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-stone-900 border-t border-stone-800 p-4 sm:p-6 z-50 animate-in slide-in-from-bottom-full duration-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-stone-300 text-sm">
              <p>
                Nous utilisons des cookies pour vous garantir la meilleure
                expérience sur notre site web. Conformément à la réglementation
                européenne (RGPD), veuillez accepter notre politique
                d'utilisation des cookies pour continuer.
              </p>
            </div>
            <div className="flex gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setShowCookieBanner(false)}
                className="flex-1 sm:flex-none px-4 py-2 border border-stone-600 text-stone-300 rounded-lg hover:bg-stone-800 transition-colors text-sm font-medium"
              >
                Refuser
              </button>
              <button
                onClick={() => setShowCookieBanner(false)}
                className="flex-1 sm:flex-none px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
              >
                Tout Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
