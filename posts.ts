export const posts = [
  {
    id: 1,
    author: {
      avatar_url: "https://github.com/gmendes0.png",
      name: "Gabriel Mendes",
      role: "Web Developer",
    },
    published_at: new Date("2022-10-28 09:53:00"),
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },

      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },

      { type: "link", content: "jane.design/doctorcare" },
    ],
  },

  {
    id: 2,
    author: {
      avatar_url: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Educator @Rocketseat",
    },
    published_at: new Date("2022-10-20 22:05:00"),
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },

      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },

      { type: "link", content: "jane.design/doctorcare" },
    ],
  },
];
