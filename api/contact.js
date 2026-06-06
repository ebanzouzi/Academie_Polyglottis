// 1. CHARGEMENT DES VARIABLES D'ENVIRONNEMENT
// Note : Sur Vercel en production, dotenv n'est pas obligatoire mais on le laisse pour tes tests en local.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const nodemailer = require("nodemailer");

// CONFIGURATION DU TRANSPORTEUR SÉCURISÉ
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// C'EST ICI QUE LA MAGIE OPÈRE : On exporte une fonction Serverless à la place de app.post()
module.exports = async (req, res) => {
  // On gère la sécurité : Vercel reçoit des requêtes de plusieurs types, on ne veut que le POST
  if (req.method !== "POST") {
    return res
      .status(450)
      .json({ error: "Méthode non autorisée. Utilisez POST." });
  }

  const { name, phone, email, subject, message } = req.body;

  if (!name || !phone || !email || !subject) {
    return res
      .status(400)
      .json({ error: "Veuillez remplir tous les champs obligatoires." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_DG,
    replyTo: email,
    subject: `🌐 Nouveau Contact Site - ${subject}`,
    html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                <h2 style="color: #1a691b;">Académie Polyglottis - Nouvelle Demande</h2>
                <p><strong>Nom Complet :</strong> ${name}</p>
                <p><strong>Téléphone / WhatsApp :</strong> ${phone}</p>
                <p><strong>Adresse Email :</strong> ${email}</p>
                <p><strong>Objet de la demande :</strong> ${subject}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p><strong>Message :</strong></p>
                <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; font-style: italic;">"${message || "Aucun message supplémentaire."}"</p>
            </div>
        `,
  };

  try {
    // On utilise "await" pour s'assurer que Vercel attend que le mail soit envoyé avant de fermer la fonction
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès !");
    return res
      .status(200)
      .json({ message: "Votre message a été transmis avec succès !" });
  } catch (error) {
    console.log("Erreur Nodemailer :", error);
    return res
      .status(500)
      .json({ error: "Le serveur de messagerie est indisponible." });
  }
};
