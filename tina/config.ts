import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.VITE_TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "dispatch",
        label: "Dossiers (Makaleler)",
        path: "src/content/dispatches",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            slugify: (values: Record<string, any>) => {
              return `${values?.dossierId || values?.id || "new-dossier"}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "dossierId",
            label: "ID (örn: dossier-009)",
            required: true,
          },
          {
            type: "string",
            name: "number",
            label: "Numara (örn: DOSSIER #009)",
            required: true,
          },
          {
            type: "string",
            name: "status",
            label: "Durum (örn: CLIMATE ANALYSIS)",
          },
          {
            type: "string",
            name: "title",
            label: "Başlık",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "Alt Başlık",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "readTime",
            label: "Okuma Süresi (örn: 8 min read)",
          },
          {
            type: "string",
            name: "category",
            label: "Kategori",
          },
          {
            type: "datetime",
            name: "date",
            label: "Tarih",
          },
          {
            type: "number",
            name: "views",
            label: "Görüntülenme Sayısı",
          },
          {
            type: "string",
            name: "summary",
            label: "Özet",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Kapak Görseli",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Makale İçeriği (Yeni Makaleler İçin)",
          },
        ],
      },
    ],
  },
});
